/**
 * HVACLogic Whole-Building Heat Loss & Infiltration Computational Engine
 * Implements ASHRAE Handbook of Fundamentals and ACCA Manual J (8th Edition).
 */

export type WindowGlazingType = "single_pane" | "double_clear" | "double_low_e" | "triple_pane";
export type FoundationType = "slab_on_grade" | "conditioned_basement" | "unconditioned_crawlspace";
export type AirTightnessTier = "tight_modern" | "average_code" | "semi_leaky" | "very_leaky_historic";

export interface BuildingHeatLossInput {
  floorAreaSqFt: number; // e.g. 500 to 10,000 sq ft
  ceilingHeightFeet?: number; // default 9 ft
  indoorTempF?: number; // default 70°F
  outdoorDesignTempF: number; // e.g. -15°F to 35°F
  wallInsulationR: number; // e.g. R-11 to R-35
  ceilingInsulationR: number; // e.g. R-19 to R-60
  windowGlazing: WindowGlazingType;
  windowAreaSqFt?: number; // default 15% of floor area
  foundation: FoundationType;
  airTightness: AirTightnessTier;
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
  infiltrationCfm: number;
  naturalAch: number;
  breakdown: HeatLossBreakdown;
  breakdownPercentages: {
    wallsPercent: number;
    ceilingPercent: number;
    windowsPercent: number;
    doorsPercent: number;
    foundationPercent: number;
    infiltrationPercent: number;
  };
  recommendedFurnaceBtu: number;
  recommendedHeatPumpTons: number;
  summary: string;
}

const WINDOW_U_FACTORS: Record<WindowGlazingType, { label: string; uFactor: number }> = {
  single_pane: { label: "Single-Pane Clear Glass (U-1.10)", uFactor: 1.10 },
  double_clear: { label: "Double-Pane Clear Glass (U-0.50)", uFactor: 0.50 },
  double_low_e: { label: "Double-Pane Low-E Argon (U-0.28)", uFactor: 0.28 },
  triple_pane: { label: "Triple-Pane High Performance (U-0.18)", uFactor: 0.18 },
};

const AIR_TIGHTNESS_TIERS: Record<AirTightnessTier, { label: string; naturalAch: number }> = {
  tight_modern: { label: "Tight Modern (<3 ACH50)", naturalAch: 0.20 },
  average_code: { label: "Standard Code (3–5 ACH50)", naturalAch: 0.38 },
  semi_leaky: { label: "Semi-Leaky 1980s (6–8 ACH50)", naturalAch: 0.65 },
  very_leaky_historic: { label: "Unsealed Historic (>10 ACH50)", naturalAch: 1.10 },
};

/**
 * Calculates whole-house conductive transmission and infiltration heat loss.
 */
export function calculateBuildingHeatLoss(input: BuildingHeatLossInput): BuildingHeatLossOutput {
  const area = Math.max(200, Math.min(15000, input.floorAreaSqFt));
  const height = Math.max(7, Math.min(20, input.ceilingHeightFeet ?? 9));
  const tIndoor = input.indoorTempF ?? 70;
  const tOutdoor = input.outdoorDesignTempF;
  const deltaT = Math.max(10, tIndoor - tOutdoor);

  // Geometric Estimations
  const perimeter = 4 * Math.sqrt(area); // Square footprint approximation
  const grossWallArea = perimeter * height;
  const windowArea = input.windowAreaSqFt ?? Math.round(area * 0.15);
  const doorArea = 40; // 2 standard exterior doors
  const netWallArea = Math.max(100, grossWallArea - windowArea - doorArea);
  const ceilingArea = area;
  const volume = area * height;

  // 1. Conductive Losses: Q = U * A * Delta T
  const wallR = Math.max(4, input.wallInsulationR + 1.5); // Framing + air films
  const uWall = 1 / wallR;
  const wallsBtu = Math.round(uWall * netWallArea * deltaT);

  const ceilingR = Math.max(10, input.ceilingInsulationR + 1.0);
  const uCeiling = 1 / ceilingR;
  const ceilingBtu = Math.round(uCeiling * ceilingArea * deltaT);

  const uWindow = WINDOW_U_FACTORS[input.windowGlazing].uFactor;
  const windowsBtu = Math.round(uWindow * windowArea * deltaT);

  const uDoor = 0.35; // Insulated fiberglass/steel door
  const doorsBtu = Math.round(uDoor * doorArea * deltaT);

  // Foundation Loss
  let fFactor = 0.50; // Slab on grade uninsulated
  if (input.foundation === "conditioned_basement") fFactor = 0.25;
  else if (input.foundation === "unconditioned_crawlspace") fFactor = 0.35;
  const foundationBtu = Math.round(fFactor * perimeter * deltaT);

  // 2. Air Infiltration Heat Loss: Q = 1.08 * CFM * Delta T
  const naturalAch = AIR_TIGHTNESS_TIERS[input.airTightness].naturalAch;
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
    wallsPercent: Math.round((wallsBtu / totalHeatLossBtu) * 100),
    ceilingPercent: Math.round((ceilingBtu / totalHeatLossBtu) * 100),
    windowsPercent: Math.round((windowsBtu / totalHeatLossBtu) * 100),
    doorsPercent: Math.round((doorsBtu / totalHeatLossBtu) * 100),
    foundationPercent: Math.round((foundationBtu / totalHeatLossBtu) * 100),
    infiltrationPercent: Math.round((infiltrationBtu / totalHeatLossBtu) * 100),
  };

  // Recommended Equipment Sizing with ACCA Manual S buffer (1.15x for furnace)
  const rawFurnaceBtu = totalHeatLossBtu * 1.15;
  const recommendedFurnaceBtu = Math.ceil(rawFurnaceBtu / 10000) * 10000;
  const recommendedHeatPumpTons = Number((totalHeatLossBtu / 12000).toFixed(1));

  const summary = `At ${tOutdoor}°F outdoor design temperature (ΔT = ${deltaT}°F), total building heat loss is ${totalHeatLossBtu.toLocaleString()} BTU/hr (${totalHeatLossKw} kW). Envelope conductive loss represents ${100 - breakdownPercentages.infiltrationPercent}% while air leakage accounts for ${breakdownPercentages.infiltrationPercent}% (${infiltrationCfm} CFM).`;

  return {
    totalHeatLossBtu,
    totalHeatLossKw,
    heatLossPerSqFtBtu,
    temperatureDifferenceDeltaT: deltaT,
    infiltrationCfm,
    naturalAch,
    breakdown,
    breakdownPercentages,
    recommendedFurnaceBtu,
    recommendedHeatPumpTons,
    summary,
  };
}
