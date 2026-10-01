/**
 * HVACLogic — Whole-Home BTU & Load Sizing Screening Engine
 *
 * This preliminary screening model estimates heating and cooling loads based on:
 *   - Conditioned floor area and ceiling height volume factor (H / 8)
 *   - IECC climate zone baseline heat gain/loss factors
 *   - Envelope insulation quality and fenestration performance multipliers
 *   - Internal occupant and baseline equipment heat gains
 *   - Duct thermal loss/gain allowance factors (1.05 conditioned, 1.15 unconditioned attic)
 *
 * Technical References:
 *   - ANSI/ACCA Manual J (8th Edition — Residential Load Calculation reference methodology)
 *   - ASHRAE Handbook of Fundamentals (Chapter 18: Nonresidential Cooling and Heating Load Calculation)
 *
 * Note: For code-compliant permit submittals, a room-by-room ACCA Manual J calculation
 * using component-level U*A*DeltaT transmission, fenestration solar heat gain (SHGC),
 * and measured infiltration (ACH50) is required.
 */

export interface LoadSizingInput {
  areaSqFt: number;
  ceilingHeightFt: number; // default 9 ft
  climateZone: "zone_1" | "zone_2" | "zone_3" | "zone_4" | "zone_5" | "zone_6" | "zone_7";
  insulationGrade: "poor" | "average" | "good" | "superior";
  windowQuality: "single_pane" | "double_clear" | "double_low_e" | "triple_low_e";
  occupants: number;
  ductLocation?: "conditioned" | "unconditioned_attic" | "unconditioned_crawlspace";
}

export interface LoadBreakdownItem {
  label: string;
  btu: number;
  percentage: number;
  color: string;
}

export interface LoadSizingOutput {
  sensibleCoolingBtu: number;
  latentCoolingBtu: number;
  totalCoolingBtu: number;
  coolingTonnage: number;
  sensibleHeatRatio: number;
  totalHeatingBtu: number;
  recommendedFurnaceBtu: number;
  recommendedHeatPumpTons: number;
  recommendedCfm: number;
  breakdown: LoadBreakdownItem[];
}

// Preliminary climate zone screening factors (cooling & heating BTU/hr per sq ft benchmark)
export const CLIMATE_FACTORS: Record<string, { coolingBtuPerSqFt: number; heatingBtuPerSqFt: number }> = {
  zone_1: { coolingBtuPerSqFt: 18.5, heatingBtuPerSqFt: 14.0 }, // Very Hot-Humid (Miami / Hawaii)
  zone_2: { coolingBtuPerSqFt: 16.5, heatingBtuPerSqFt: 18.0 }, // Hot-Humid (Houston / Orlando / Phoenix)
  zone_3: { coolingBtuPerSqFt: 15.0, heatingBtuPerSqFt: 24.0 }, // Warm-Humid (Atlanta / Dallas)
  zone_4: { coolingBtuPerSqFt: 14.25, heatingBtuPerSqFt: 24.0 }, // Mixed-Humid (St. Louis / DC / Seattle)
  zone_5: { coolingBtuPerSqFt: 13.0, heatingBtuPerSqFt: 34.0 }, // Cold (Chicago / Boston / Denver)
  zone_6: { coolingBtuPerSqFt: 11.5, heatingBtuPerSqFt: 42.0 }, // Very Cold (Minneapolis / Burlington)
  zone_7: { coolingBtuPerSqFt: 10.0, heatingBtuPerSqFt: 50.0 }, // Subarctic (Duluth / Fairbanks)
};

export const INSULATION_MULTIPLIERS = {
  poor: 1.35, // Pre-1980 uninsulated walls / R-11 attic
  average: 1.00, // Standard 1990-2010 R-13 walls / R-30 attic
  good: 0.85, // 2012-2021 IECC R-20 walls / R-49 attic
  superior: 0.70, // Continuous exterior foam / R-60 attic
};

export const WINDOW_MULTIPLIERS = {
  single_pane: 1.25,
  double_clear: 1.05,
  double_low_e: 0.95,
  triple_low_e: 0.80,
};

export function calculateHeatLoad(input: LoadSizingInput): LoadSizingOutput {
  const area = Math.max(50, input.areaSqFt);
  const ceiling = Math.max(7, Math.min(25, input.ceilingHeightFt || 9));
  const heightMultiplier = ceiling / 8.0;

  const climate = CLIMATE_FACTORS[input.climateZone] || CLIMATE_FACTORS.zone_4;
  const insulMult = INSULATION_MULTIPLIERS[input.insulationGrade] || 1.0;
  const winMult = WINDOW_MULTIPLIERS[input.windowQuality] || 1.0;
  const occupants = Math.max(1, input.occupants || 2);

  // 1. Envelope Transmission & Solar Gain Baseline (Screening Model)
  const baseCooling = area * climate.coolingBtuPerSqFt * heightMultiplier * insulMult * winMult;
  const baseHeating = area * climate.heatingBtuPerSqFt * heightMultiplier * insulMult * winMult;

  // 2. Internal Heat Gains (230 BTU/hr sensible + 200 BTU/hr latent per person + 1,200 BTU/hr appliance baseline)
  const occupantSensible = occupants * 230;
  const occupantLatent = occupants * 200;
  const applianceSensible = 1200;

  // 3. Duct Gain/Loss Allowance (5% conditioned space, 15% unconditioned attic)
  const ductFactor = input.ductLocation === "conditioned" ? 1.05 : 1.15;

  const sensibleCooling = (baseCooling * 0.85 + occupantSensible + applianceSensible) * ductFactor;
  const latentCooling = (baseCooling * 0.15 + occupantLatent) * ductFactor;
  const totalCooling = sensibleCooling + latentCooling;
  const coolingTonnage = Math.round((totalCooling / 12000) * 10) / 10;

  const totalHeating = baseHeating * ductFactor;

  // Design supply airflow based on sensible heat formula: CFM = Q_sensible / (1.08 * DeltaT_cooling), assuming 20°F design temperature drop
  const recommendedCfm = Math.round((sensibleCooling / (1.08 * 20)) / 10) * 10;

  // Breakdown distribution approximation
  const wallBtu = Math.round(sensibleCooling * 0.32);
  const windowBtu = Math.round(sensibleCooling * 0.28);
  const roofBtu = Math.round(sensibleCooling * 0.20);
  const infiltrationBtu = Math.round(sensibleCooling * 0.12);
  const internalBtu = Math.round(sensibleCooling * 0.08);

  const breakdown: LoadBreakdownItem[] = [
    { label: "Walls & Framing", btu: wallBtu, percentage: 32, color: "#38bdf8" },
    { label: "Windows & Solar", btu: windowBtu, percentage: 28, color: "#00d2ff" },
    { label: "Ceiling & Roof", btu: roofBtu, percentage: 20, color: "#ff6b4a" },
    { label: "Infiltration & Leakage", btu: infiltrationBtu, percentage: 12, color: "#f59e0b" },
    { label: "Internal Occupants & Appliances", btu: internalBtu, percentage: 8, color: "#10b981" },
  ];

  const sensibleHeatRatio = totalCooling > 0 ? Math.round((sensibleCooling / totalCooling) * 100) / 100 : 0.78;
  const rawFurnaceInput = totalHeating / 0.96;
  let recommendedFurnaceBtu = 40000;
  if (rawFurnaceInput > 100000) recommendedFurnaceBtu = 120000;
  else if (rawFurnaceInput > 80000) recommendedFurnaceBtu = 100000;
  else if (rawFurnaceInput > 60000) recommendedFurnaceBtu = 80000;
  else if (rawFurnaceInput > 40000) recommendedFurnaceBtu = 60000;
  else recommendedFurnaceBtu = 40000;

  const recommendedHeatPumpTons = Math.max(1.5, Math.ceil(coolingTonnage * 2) / 2);

  return {
    sensibleCoolingBtu: Math.round(sensibleCooling),
    latentCoolingBtu: Math.round(latentCooling),
    totalCoolingBtu: Math.round(totalCooling),
    coolingTonnage,
    sensibleHeatRatio,
    totalHeatingBtu: Math.round(totalHeating),
    recommendedFurnaceBtu,
    recommendedHeatPumpTons,
    recommendedCfm,
    breakdown,
  };
}
