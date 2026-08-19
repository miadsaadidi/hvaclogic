/**
 * HVACLogic Insulation R-Value & Assembly U-Factor Computational Engine
 * Implements ASHRAE Handbook of Fundamentals 2021 and IECC 2021 / 2024 Energy Codes.
 */

export interface MaterialLayer {
  id: string;
  materialKey: string;
  name: string;
  thicknessInches: number;
  rValuePerInch: number;
  calculatedRValue: number;
}

export interface AssemblyInput {
  assemblyType: "exterior_wall" | "attic_ceiling" | "floor_crawlspace" | "basement_wall";
  climateZone: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  layers: MaterialLayer[];
  includeAirFilms?: boolean;
}

export interface AssemblyOutput {
  assemblyType: string;
  climateZone: number;
  totalRValue: number;
  overallUFactor: number;
  ieccRequiredRValue: number;
  ieccMaxUFactor: number;
  isIeccCompliant: boolean;
  complianceDeltaR: number;
  complianceStatusBadge: string;
  annualHeatLossBtuPerSqFt: number; // Based on 4,000 Heating Degree Days baseline
  summary: string;
}

export interface MaterialMeta {
  key: string;
  name: string;
  category: "cladding" | "sheathing" | "insulation" | "interior" | "air_film";
  rPerInch: number;
  defaultThicknessInches: number;
  fixedThickness?: boolean;
  fixedRValue?: number;
}

export const STANDARD_BUILDING_MATERIALS: Record<string, MaterialMeta> = {
  interior_air_film: { key: "interior_air_film", name: "Interior Still Air Film", category: "air_film", rPerInch: 0, defaultThicknessInches: 0, fixedThickness: true, fixedRValue: 0.68 },
  drywall_half_inch: { key: "drywall_half_inch", name: "1/2\" Gypsum Drywall Board", category: "interior", rPerInch: 0.9, defaultThicknessInches: 0.5, fixedThickness: true, fixedRValue: 0.45 },
  fiberglass_batt: { key: "fiberglass_batt", name: "Fiberglass Batt Insulation", category: "insulation", rPerInch: 3.14, defaultThicknessInches: 3.5 },
  rockwool_mineral_wool: { key: "rockwool_mineral_wool", name: "Rockwool Mineral Wool Batt", category: "insulation", rPerInch: 4.0, defaultThicknessInches: 3.5 },
  cellulose_loose_fill: { key: "cellulose_loose_fill", name: "Cellulose Loose-Fill Insulation", category: "insulation", rPerInch: 3.5, defaultThicknessInches: 10.0 },
  closed_cell_foam: { key: "closed_cell_foam", name: "Closed-Cell Spray Foam (2 lb)", category: "insulation", rPerInch: 6.5, defaultThicknessInches: 2.0 },
  open_cell_foam: { key: "open_cell_foam", name: "Open-Cell Spray Foam (0.5 lb)", category: "insulation", rPerInch: 3.7, defaultThicknessInches: 3.5 },
  polyiso_continuous: { key: "polyiso_continuous", name: "Polyiso Foil-Faced Sheathing", category: "sheathing", rPerInch: 6.0, defaultThicknessInches: 1.0 },
  xps_rigid_foam: { key: "xps_rigid_foam", name: "XPS Rigid Foam (Extruded)", category: "sheathing", rPerInch: 5.0, defaultThicknessInches: 1.0 },
  eps_rigid_foam: { key: "eps_rigid_foam", name: "EPS Rigid Foam (Expanded)", category: "sheathing", rPerInch: 3.85, defaultThicknessInches: 1.0 },
  osb_sheathing: { key: "osb_sheathing", name: "7/16\" OSB / Plywood Sheathing", category: "sheathing", rPerInch: 1.41, defaultThicknessInches: 0.44, fixedThickness: true, fixedRValue: 0.62 },
  wood_siding: { key: "wood_siding", name: "Wood Bevel Lap Siding", category: "cladding", rPerInch: 1.05, defaultThicknessInches: 0.75, fixedThickness: true, fixedRValue: 0.80 },
  vinyl_siding: { key: "vinyl_siding", name: "Vinyl Siding (Hollow-Backed)", category: "cladding", rPerInch: 1.0, defaultThicknessInches: 0.60, fixedThickness: true, fixedRValue: 0.60 },
  brick_veneer: { key: "brick_veneer", name: "4\" Brick Clay Veneer", category: "cladding", rPerInch: 0.20, defaultThicknessInches: 4.0, fixedThickness: true, fixedRValue: 0.80 },
  exterior_air_film: { key: "exterior_air_film", name: "Exterior 15mph Wind Air Film", category: "air_film", rPerInch: 0, defaultThicknessInches: 0, fixedThickness: true, fixedRValue: 0.17 },
};

/**
 * Calculates thermal R-value for an individual material layer
 */
export function calculateLayerRValue(materialKey: string, thicknessInches: number): number {
  const meta = STANDARD_BUILDING_MATERIALS[materialKey];
  if (!meta) return 0;
  if (meta.fixedRValue !== undefined) return meta.fixedRValue;
  const t = Math.max(0.1, thicknessInches);
  return Math.round(t * meta.rPerInch * 100) / 100;
}

/**
 * IECC 2021 / IECC 2024 Residential Building Envelope Minimum R-Value Prescriptions
 */
export function getIeccCodeRequirements(assemblyType: AssemblyInput["assemblyType"], climateZone: number): { minR: number; maxU: number } {
  if (assemblyType === "attic_ceiling") {
    if (climateZone <= 3) return { minR: 38, maxU: 0.030 };
    return { minR: 49, maxU: 0.024 }; // IECC 2021/2024 requires R-49 / R-60 in zones 4-8
  } else if (assemblyType === "floor_crawlspace") {
    if (climateZone <= 2) return { minR: 13, maxU: 0.064 };
    if (climateZone <= 4) return { minR: 19, maxU: 0.047 };
    return { minR: 30, maxU: 0.033 };
  } else if (assemblyType === "basement_wall") {
    if (climateZone <= 2) return { minR: 0, maxU: 0.360 };
    if (climateZone <= 4) return { minR: 10, maxU: 0.091 };
    return { minR: 15, maxU: 0.050 };
  } else {
    // Exterior Wall (IECC 2021/2024)
    if (climateZone <= 2) return { minR: 13, maxU: 0.084 };
    if (climateZone === 3) return { minR: 20, maxU: 0.060 }; // R-20 or R-13+5ci
    return { minR: 25, maxU: 0.045 }; // R-20+5ci or R-13+10ci (equivalent total assembly R-25)
  }
}

/**
 * Calculates whole assembly Total R-Value, Overall U-Factor, and IECC Code Compliance.
 */
export function calculateAssemblyThermal(input: AssemblyInput): AssemblyOutput {
  const { assemblyType, climateZone, layers, includeAirFilms = true } = input;

  let layerRSum = layers.reduce((acc, layer) => {
    return acc + (layer.calculatedRValue || calculateLayerRValue(layer.materialKey, layer.thicknessInches));
  }, 0);

  // Air Films (ASHRAE Standard: Interior 0.68 + Exterior 0.17 = 0.85)
  if (includeAirFilms) {
    layerRSum += 0.68 + 0.17;
  }

  const totalRValue = Math.round(layerRSum * 10) / 10;
  const overallUFactor = totalRValue > 0 ? Math.round((1 / totalRValue) * 1000) / 1000 : 1.0;

  const iecc = getIeccCodeRequirements(assemblyType, climateZone);
  const isIeccCompliant = totalRValue >= iecc.minR || overallUFactor <= iecc.maxU;
  const complianceDeltaR = Math.round((totalRValue - iecc.minR) * 10) / 10;

  const complianceStatusBadge = isIeccCompliant
    ? `✓ IECC 2021/2024 Compliant (+R-${complianceDeltaR >= 0 ? complianceDeltaR : 0} Margin)`
    : `⚠️ Non-Compliant (Deficit: -R-${Math.abs(complianceDeltaR)})`;

  // Annual heat loss: Q = U * 24 * HDD (baseline 4,500 Heating Degree Days)
  const annualHeatLossBtuPerSqFt = Math.round(overallUFactor * 24 * 4500);

  const summary = `Total Assembly R-Value is R-${totalRValue.toFixed(1)} with an overall U-factor of ${overallUFactor.toFixed(3)} BTU/hr·ft²·°F (${isIeccCompliant ? "Meets" : "Fails"} IECC Zone ${climateZone} code requirement of R-${iecc.minR}).`;

  return {
    assemblyType,
    climateZone,
    totalRValue,
    overallUFactor,
    ieccRequiredRValue: iecc.minR,
    ieccMaxUFactor: iecc.maxU,
    isIeccCompliant,
    complianceDeltaR,
    complianceStatusBadge,
    annualHeatLossBtuPerSqFt,
    summary,
  };
}
