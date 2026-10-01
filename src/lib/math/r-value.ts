/**
 * HVACLogic Insulation R-Value & Assembly U-Factor Computational Engine
 * Implements 1-D series thermal-resistance summation per ASHRAE Handbook of Fundamentals
 * and provides contextual comparisons against IECC 2021 / 2024 prescriptive benchmarks.
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
  climateZone: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  layers: MaterialLayer[];
  includeAirFilms?: boolean;
  customHdd?: number;
}

export interface AssemblyOutput {
  assemblyType: string;
  climateZone: number;
  totalRValue: number;
  overallUFactor: number;
  airFilmRValue: number;
  layerSumRValue: number;
  ieccRequiredRValue: number;
  ieccMaxUFactor: number;
  ieccPrescriptiveTarget: string;
  isIeccNominalMet: boolean;
  complianceDeltaR: number;
  annualHeatLossBtuPerSqFt: number;
  hddBase65: number;
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
  interior_air_film: { key: "interior_air_film", name: "Interior Still Air Film (Vertical)", category: "air_film", rPerInch: 0, defaultThicknessInches: 0, fixedThickness: true, fixedRValue: 0.68 },
  drywall_half_inch: { key: "drywall_half_inch", name: "1/2\" Gypsum Drywall Board", category: "interior", rPerInch: 0.9, defaultThicknessInches: 0.5, fixedThickness: true, fixedRValue: 0.45 },
  drywall_five_eighths: { key: "drywall_five_eighths", name: "5/8\" Type X Gypsum Board", category: "interior", rPerInch: 0.9, defaultThicknessInches: 0.625, fixedThickness: true, fixedRValue: 0.56 },
  fiberglass_batt: { key: "fiberglass_batt", name: "Fiberglass Batt (Standard)", category: "insulation", rPerInch: 3.14, defaultThicknessInches: 3.5 },
  fiberglass_hd_batt: { key: "fiberglass_hd_batt", name: "Fiberglass High-Density Batt (R-13/R-21)", category: "insulation", rPerInch: 3.75, defaultThicknessInches: 5.5 },
  rockwool_mineral_wool: { key: "rockwool_mineral_wool", name: "Rockwool Mineral Wool Batt", category: "insulation", rPerInch: 4.0, defaultThicknessInches: 5.5 },
  cellulose_loose_fill: { key: "cellulose_loose_fill", name: "Cellulose Loose-Fill Insulation", category: "insulation", rPerInch: 3.5, defaultThicknessInches: 14.0 },
  closed_cell_foam: { key: "closed_cell_foam", name: "Closed-Cell Spray Foam (2 lb/cu ft)", category: "insulation", rPerInch: 6.5, defaultThicknessInches: 2.0 },
  open_cell_foam: { key: "open_cell_foam", name: "Open-Cell Spray Foam (0.5 lb/cu ft)", category: "insulation", rPerInch: 3.7, defaultThicknessInches: 3.5 },
  polyiso_continuous: { key: "polyiso_continuous", name: "Polyiso Continuous Sheathing (ci)", category: "sheathing", rPerInch: 6.0, defaultThicknessInches: 1.0 },
  xps_rigid_foam: { key: "xps_rigid_foam", name: "XPS Rigid Extruded Polystyrene (ci)", category: "sheathing", rPerInch: 5.0, defaultThicknessInches: 1.0 },
  eps_rigid_foam: { key: "eps_rigid_foam", name: "EPS Rigid Expanded Polystyrene (ci)", category: "sheathing", rPerInch: 3.85, defaultThicknessInches: 1.0 },
  osb_sheathing: { key: "osb_sheathing", name: "7/16\" OSB / Plywood Sheathing", category: "sheathing", rPerInch: 1.41, defaultThicknessInches: 0.44, fixedThickness: true, fixedRValue: 0.62 },
  wood_siding: { key: "wood_siding", name: "Wood Bevel Lap Siding", category: "cladding", rPerInch: 1.05, defaultThicknessInches: 0.75, fixedThickness: true, fixedRValue: 0.80 },
  vinyl_siding: { key: "vinyl_siding", name: "Vinyl Siding (Hollow-Backed)", category: "cladding", rPerInch: 1.0, defaultThicknessInches: 0.60, fixedThickness: true, fixedRValue: 0.60 },
  brick_veneer: { key: "brick_veneer", name: "4\" Brick Clay Veneer", category: "cladding", rPerInch: 0.20, defaultThicknessInches: 4.0, fixedThickness: true, fixedRValue: 0.80 },
  exterior_air_film: { key: "exterior_air_film", name: "Exterior Air Film (15 mph Wind)", category: "air_film", rPerInch: 0, defaultThicknessInches: 0, fixedThickness: true, fixedRValue: 0.17 },
};

/**
 * Standard Climate Zone Heating Degree Days (HDD base 65°F)
 */
export const ZONE_HDD_BASELINES: Record<number, { name: string; hdd: number }> = {
  1: { name: "Zone 1 (Miami, FL)", hdd: 500 },
  2: { name: "Zone 2 (Houston, TX / Phoenix, AZ)", hdd: 1500 },
  3: { name: "Zone 3 (Atlanta, GA / Dallas, TX)", hdd: 2800 },
  4: { name: "Zone 4 (Washington DC / Seattle, WA)", hdd: 4500 },
  5: { name: "Zone 5 (Chicago, IL / Boston, MA)", hdd: 6000 },
  6: { name: "Zone 6 (Minneapolis, MN)", hdd: 7500 },
  7: { name: "Zone 7 (Duluth, MN / Fargo, ND)", hdd: 9000 },
  8: { name: "Zone 8 (Fairbanks, AK)", hdd: 12000 },
};

/**
 * Calculates thermal R-value for an individual material layer.
 */
export function calculateLayerRValue(materialKey: string, thicknessInches: number): number {
  const meta = STANDARD_BUILDING_MATERIALS[materialKey];
  if (!meta) return 0;
  if (meta.fixedRValue !== undefined) return meta.fixedRValue;
  const t = Math.max(0.1, thicknessInches);
  return Math.round(t * meta.rPerInch * 100) / 100;
}

/**
 * Standard Surface Air Film Thermal Resistances (ASHRAE Fundamentals Ch. 26).
 */
export function getSurfaceAirFilms(assemblyType: AssemblyInput["assemblyType"]): { rInterior: number; rExterior: number; totalAirFilmR: number } {
  if (assemblyType === "attic_ceiling") {
    // Upward winter heat flow (horizontal surface)
    return { rInterior: 0.61, rExterior: 0.17, totalAirFilmR: 0.78 };
  } else if (assemblyType === "floor_crawlspace") {
    // Downward winter heat flow over unconditioned space
    return { rInterior: 0.92, rExterior: 0.17, totalAirFilmR: 1.09 };
  } else {
    // Vertical surface (exterior walls, basement walls)
    return { rInterior: 0.68, rExterior: 0.17, totalAirFilmR: 0.85 };
  }
}

/**
 * IECC 2021 / 2024 Prescriptive Envelope References (Tables R402.1.2 & R402.1.3).
 */
export function getIeccCodeRequirements(assemblyType: AssemblyInput["assemblyType"], climateZone: number): { minR: number; maxU: number; description: string } {
  const zone = Math.min(8, Math.max(1, climateZone));
  
  if (assemblyType === "attic_ceiling") {
    if (zone <= 3) return { minR: 38, maxU: 0.030, description: "R-38 (U-0.030 max)" };
    return { minR: 49, maxU: 0.024, description: "R-49 to R-60 (U-0.024 max)" };
  } else if (assemblyType === "floor_crawlspace") {
    if (zone <= 2) return { minR: 13, maxU: 0.064, description: "R-13 (U-0.064 max)" };
    if (zone <= 4) return { minR: 19, maxU: 0.047, description: "R-19 (U-0.047 max)" };
    return { minR: 30, maxU: 0.033, description: "R-30 (U-0.033 max)" };
  } else if (assemblyType === "basement_wall") {
    if (zone <= 2) return { minR: 0, maxU: 0.360, description: "Uninsulated (U-0.360 max)" };
    if (zone <= 4) return { minR: 10, maxU: 0.091, description: "R-10 continuous or R-13 cavity" };
    return { minR: 15, maxU: 0.050, description: "R-15 continuous or R-19 cavity" };
  } else {
    // Exterior Wall (IECC 2021/2024 Table R402.1.2 / R402.1.3)
    if (zone <= 2) return { minR: 13, maxU: 0.084, description: "R-13 cavity (U-0.084 max)" };
    if (zone === 3) return { minR: 20, maxU: 0.060, description: "R-20 cavity or R-13 + R-5 ci (U-0.060 max)" };
    if (zone <= 5) return { minR: 25, maxU: 0.045, description: "R-20 + R-5 ci or R-13 + R-10 ci (U-0.045 max)" };
    return { minR: 30, maxU: 0.045, description: "R-20 + R-5 ci or R-13 + R-10 ci (U-0.045 max)" };
  }
}

/**
 * Calculates 1-D series layer stack Total R-Value, 1-D U-Factor, and provides reference code comparisons.
 */
export function calculateAssemblyThermal(input: AssemblyInput): AssemblyOutput {
  const { assemblyType, climateZone, layers, includeAirFilms = true, customHdd } = input;

  const layerSumRValue = layers.reduce((acc, layer) => {
    return acc + (layer.calculatedRValue !== undefined ? layer.calculatedRValue : calculateLayerRValue(layer.materialKey, layer.thicknessInches));
  }, 0);

  const airFilms = getSurfaceAirFilms(assemblyType);
  const airFilmRValue = includeAirFilms ? airFilms.totalAirFilmR : 0;

  const totalRValue = Math.round((layerSumRValue + airFilmRValue) * 100) / 100;
  const overallUFactor = totalRValue > 0 ? Math.round((1 / totalRValue) * 10000) / 10000 : 1.0;

  const iecc = getIeccCodeRequirements(assemblyType, climateZone);
  const isIeccNominalMet = totalRValue >= iecc.minR;
  const complianceDeltaR = Math.round((totalRValue - iecc.minR) * 10) / 10;

  const hddBase65 = customHdd ?? (ZONE_HDD_BASELINES[climateZone]?.hdd ?? 6000);
  // Annual heat loss: Q = U * 24 * HDD (BTU/ft²·yr)
  const annualHeatLossBtuPerSqFt = Math.round(overallUFactor * 24 * hddBase65);

  const summary = `1-D Layer Stack R-Value is R-${totalRValue.toFixed(2)} (U-${overallUFactor.toFixed(4)} BTU/hr·ft²·°F) including R-${airFilmRValue.toFixed(2)} surface air films. Prescriptive IECC Zone ${climateZone} reference: ${iecc.description}.`;

  return {
    assemblyType,
    climateZone,
    totalRValue,
    overallUFactor,
    airFilmRValue,
    layerSumRValue: Math.round(layerSumRValue * 100) / 100,
    ieccRequiredRValue: iecc.minR,
    ieccMaxUFactor: iecc.maxU,
    ieccPrescriptiveTarget: iecc.description,
    isIeccNominalMet,
    complianceDeltaR,
    annualHeatLossBtuPerSqFt,
    hddBase65,
    summary,
  };
}
