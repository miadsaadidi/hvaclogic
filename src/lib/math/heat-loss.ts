/**
 * HVACLogic Whole-Building Heat Loss & Infiltration Computational Engine
 * Implements simplified building envelope transmission (Q = U * A * ΔT),
 * slab perimeter F-factor loss (Q = F * P * ΔT), and air infiltration sensible loss (Q = 1.08 * CFM * ΔT).
 */

export type WindowGlazingType = "single_pane" | "double_clear" | "double_low_e" | "triple_pane";
export type FoundationType = "slab_on_grade" | "conditioned_basement" | "unconditioned_crawlspace";
export type AirTightnessTier = "tight_modern" | "average_code" | "semi_leaky" | "very_leaky_historic";

export interface BuildingHeatLossInput {
  floorAreaSqFt: number; // Conditioned floor area (sq ft)
  ceilingHeightFeet?: number; // Ceiling height (ft, default 9)
  indoorTempF?: number; // Indoor heating setpoint (°F, default 70)
  outdoorDesignTempF: number; // 99% Winter outdoor design temp (°F)
  wallInsulationR: number; // Nominal cavity R-value (used in nominal_r mode)
  wallAssemblyMode?: "nominal_r" | "effective_u"; // default: "nominal_r"
  customWallUFactor?: number; // Assembly U-Factor (BTU/hr·ft²·°F, used in effective_u mode)
  ceilingInsulationR: number; // Ceiling/attic nominal R-value
  windowGlazing: WindowGlazingType;
  windowAreaSqFt?: number; // Total window glazing area (sq ft, default 15% of floor area)
  doorAreaSqFt?: number; // Exterior door area (sq ft, default 40 sq ft)
  foundation: FoundationType;
  airTightness: AirTightnessTier;
  customAchNat?: number; // Optional manual natural ACH override
}

export interface HeatLossBreakdown {
  wallsBtu: number;
  ceilingBtu: number;
  windowsBtu: number;
  doorsBtu: number;
  foundationBtu: number;
  infiltrationBtu: number;
}

export interface BuildingHeatLossOutput {
  totalHeatLossBtu: number;
  totalHeatLossKw: number;
  heatLossPerSqFtBtu: number;
  temperatureDifferenceDeltaT: number;
  grossWallAreaSqFt: number;
  netWallAreaSqFt: number;
  ceilingAreaSqFt: number;
  windowAreaSqFt: number;
  doorAreaSqFt: number;
  perimeterFeet: number;
  buildingVolumeCuFt: number;
  infiltrationCfm: number;
  naturalAch: number;
  airTightnessTier: AirTightnessTier;
  airTightnessDescription: string;
  wallAssemblyMode: "nominal_r" | "effective_u";
  wallUFactor: number;
  effectiveWallR: number;
  ceilingUFactor: number;
  effectiveCeilingR: number;
  windowUFactor: number;
  doorUFactor: number;
  foundationFFactor: number;
  breakdown: HeatLossBreakdown;
  breakdownPercentages: {
    wallsPercent: number;
    ceilingPercent: number;
    windowsPercent: number;
    doorsPercent: number;
    foundationPercent: number;
    infiltrationPercent: number;
  };
  preliminaryLoadBtu: number;
  summary: string;
}

export const WINDOW_U_FACTORS: Record<WindowGlazingType, { label: string; uFactor: number }> = {
  single_pane: { label: "Single-Pane Clear Glass (U-1.10)", uFactor: 1.10 },
  double_clear: { label: "Double-Pane Clear Glass (U-0.50)", uFactor: 0.50 },
  double_low_e: { label: "Double-Pane Low-E Argon (U-0.28)", uFactor: 0.28 },
  triple_pane: { label: "Triple-Pane High Performance (U-0.18)", uFactor: 0.18 },
};

export const AIR_TIGHTNESS_TIERS: Record<AirTightnessTier, { label: string; ach50Estimate: string; naturalAch: number }> = {
  tight_modern: { label: "Tight Modern (<3 ACH50)", ach50Estimate: "<3 ACH50 (ACHnat ~0.20)", naturalAch: 0.20 },
  average_code: { label: "Standard Code (3–5 ACH50)", ach50Estimate: "3–5 ACH50 (ACHnat ~0.38)", naturalAch: 0.38 },
  semi_leaky: { label: "Semi-Leaky 1980s (6–8 ACH50)", ach50Estimate: "6–8 ACH50 (ACHnat ~0.65)", naturalAch: 0.65 },
  very_leaky_historic: { label: "Unsealed Historic (>10 ACH50)", ach50Estimate: ">10 ACH50 (ACHnat ~1.10)", naturalAch: 1.10 },
};

export const FOUNDATION_F_FACTORS: Record<FoundationType, { label: string; fFactor: number; description: string }> = {
  slab_on_grade: { label: "Slab-on-Grade (Uninsulated Edge)", fFactor: 0.50, description: "F-0.50 BTU/hr·ft·°F perimeter conduction factor" },
  conditioned_basement: { label: "Conditioned Basement Wall", fFactor: 0.25, description: "F-0.25 BTU/hr·ft·°F perimeter basement heat factor" },
  unconditioned_crawlspace: { label: "Unconditioned Vented Crawlspace", fFactor: 0.35, description: "F-0.35 BTU/hr·ft·°F crawlspace perimeter factor" },
};

/**
 * Calculates preliminary whole-building conductive transmission and air infiltration heat loss.
 */
export function calculateBuildingHeatLoss(input: BuildingHeatLossInput): BuildingHeatLossOutput {
  const area = Math.max(200, Math.min(15000, input.floorAreaSqFt));
  const height = Math.max(7, Math.min(20, input.ceilingHeightFeet ?? 9));
  const tIndoor = input.indoorTempF ?? 70;
  const tOutdoor = input.outdoorDesignTempF;
  const deltaT = Math.max(5, tIndoor - tOutdoor);

  // Geometric Estimations (Square footprint baseline)
  const perimeter = 4 * Math.sqrt(area); // ft
  const grossWallArea = perimeter * height; // sq ft
  const windowArea = input.windowAreaSqFt ?? Math.round(area * 0.15); // sq ft (15% glazing default)
  const doorArea = input.doorAreaSqFt ?? 40; // sq ft (2 standard exterior doors)
  const netWallArea = Math.max(100, grossWallArea - windowArea - doorArea); // sq ft
  const ceilingArea = area; // sq ft
  const volume = area * height; // cu ft

  // 1. Above-Grade Wall Conduction: Q = U * A * Delta T
  const mode = input.wallAssemblyMode ?? "nominal_r";
  let uWall: number;
  let wallR: number;

  if (mode === "effective_u" && input.customWallUFactor && input.customWallUFactor > 0) {
    uWall = Number(input.customWallUFactor.toFixed(5));
    wallR = Number((1 / uWall).toFixed(1));
  } else {
    // Nominal cavity R with standard cladding/drywall/air-film layers buffer: R_total ≈ R_cavity + 1.5
    wallR = Math.max(4, input.wallInsulationR + 1.5);
    uWall = Number((1 / wallR).toFixed(5));
  }
  const wallsBtu = Math.round(uWall * netWallArea * deltaT);

  // 2. Ceiling / Attic Conduction: Q = U * A * Delta T
  const ceilingR = Math.max(10, input.ceilingInsulationR + 1.0);
  const uCeiling = Number((1 / ceilingR).toFixed(5));
  const ceilingBtu = Math.round(uCeiling * ceilingArea * deltaT);

  // 3. Glazing Conduction: Q = U * A * Delta T
  const uWindow = WINDOW_U_FACTORS[input.windowGlazing].uFactor;
  const windowsBtu = Math.round(uWindow * windowArea * deltaT);

  // 4. Exterior Doors Conduction: Q = U * A * Delta T (Standard Insulated Door U-0.35)
  const uDoor = 0.35;
  const doorsBtu = Math.round(uDoor * doorArea * deltaT);

  // 5. Foundation / Slab Perimeter Conduction: Q = F * Perimeter * Delta T
  const fFactor = FOUNDATION_F_FACTORS[input.foundation].fFactor;
  const foundationBtu = Math.round(fFactor * perimeter * deltaT);

  // 6. Air Infiltration Sensible Heat Loss: Q = 1.08 * CFM * Delta T
  const naturalAch = input.customAchNat ?? AIR_TIGHTNESS_TIERS[input.airTightness].naturalAch;
  const infiltrationCfm = Math.round((volume * naturalAch) / 60);
  const infiltrationBtu = Math.round(1.08 * infiltrationCfm * deltaT);

  // Total Peak Heat Loss
  const totalHeatLossBtu = wallsBtu + ceilingBtu + windowsBtu + doorsBtu + foundationBtu + infiltrationBtu;
  const totalHeatLossKw = Math.round((totalHeatLossBtu / 3412.14) * 10) / 10;
  const heatLossPerSqFtBtu = Math.round((totalHeatLossBtu / area) * 10) / 10;

  // Percentage Distribution
  const breakdown: HeatLossBreakdown = {
    wallsBtu,
    ceilingBtu,
    windowsBtu,
    doorsBtu,
    foundationBtu,
    infiltrationBtu,
  };

  const breakdownPercentages = {
    wallsPercent: Math.round((wallsBtu / Math.max(1, totalHeatLossBtu)) * 100),
    ceilingPercent: Math.round((ceilingBtu / Math.max(1, totalHeatLossBtu)) * 100),
    windowsPercent: Math.round((windowsBtu / Math.max(1, totalHeatLossBtu)) * 100),
    doorsPercent: Math.round((doorsBtu / Math.max(1, totalHeatLossBtu)) * 100),
    foundationPercent: Math.round((foundationBtu / Math.max(1, totalHeatLossBtu)) * 100),
    infiltrationPercent: Math.round((infiltrationBtu / Math.max(1, totalHeatLossBtu)) * 100),
  };

  const wallProvenance = mode === "effective_u"
    ? `Assembly U-${uWall.toFixed(4)} (effective R-${wallR.toFixed(1)})`
    : `nominal R-${input.wallInsulationR} (estimated layer R-${wallR.toFixed(1)})`;

  const summary = `At ${tOutdoor}°F outdoor design temperature (ΔT = ${deltaT}°F), preliminary peak heat loss is ${totalHeatLossBtu.toLocaleString()} BTU/hr (${totalHeatLossKw} kW) using ${wallProvenance}. Envelope conductive losses total ${(100 - breakdownPercentages.infiltrationPercent)}% and air infiltration accounts for ${breakdownPercentages.infiltrationPercent}% (${infiltrationCfm} CFM).`;

  return {
    totalHeatLossBtu,
    totalHeatLossKw,
    heatLossPerSqFtBtu,
    temperatureDifferenceDeltaT: deltaT,
    grossWallAreaSqFt: Math.round(grossWallArea),
    netWallAreaSqFt: Math.round(netWallArea),
    ceilingAreaSqFt: ceilingArea,
    windowAreaSqFt: windowArea,
    doorAreaSqFt: doorArea,
    perimeterFeet: Math.round(perimeter * 10) / 10,
    buildingVolumeCuFt: volume,
    infiltrationCfm,
    naturalAch,
    airTightnessTier: input.airTightness,
    airTightnessDescription: AIR_TIGHTNESS_TIERS[input.airTightness].label,
    wallAssemblyMode: mode,
    wallUFactor: uWall,
    effectiveWallR: wallR,
    ceilingUFactor: uCeiling,
    effectiveCeilingR: ceilingR,
    windowUFactor: uWindow,
    doorUFactor: uDoor,
    foundationFFactor: fFactor,
    breakdown,
    breakdownPercentages,
    preliminaryLoadBtu: totalHeatLossBtu,
    summary,
  };
}
