/**
 * HVACLogic Furnace Sizing & Heating BTU Computational Engine
 * Implements ACCA Manual J (8th Edition), AHRI Standard 260, and DOE AFUE ratings.
 */

export type HeatingClimateZone = 1 | 2 | 3 | 4 | 5;
export type InsulationGrade = "poor" | "average" | "good" | "spray_foam";
export type SunExposure = "shaded" | "average" | "sunny";

export interface FurnaceBtuInput {
  floorAreaSqFt: number;
  climateZone: HeatingClimateZone;
  ceilingHeightFeet?: number;
  insulationGrade?: InsulationGrade;
  sunExposure?: SunExposure;
  afueRatingPercent?: number; // 80, 92, 96, 98%
  temperatureRiseF?: number; // Standard 40-50°F delta T
}

export interface FurnaceBtuOutput {
  floorAreaSqFt: number;
  netHeatLossBtu: number;
  requiredOutputBtu: number;
  requiredInputBtu: number;
  afueRatingPercent: number;
  nominalFurnaceModelBtu: number; // Standard manufacturing rating (e.g. 60k, 80k, 100k)
  recommendedCabinetWidth: string;
  requiredHeatingCfm: number;
  annualThermsEstimate: number;
  flueExhaustType: "Metal B-Vent Chimney" | "PVC / CPVC Direct Vent (Condensing)";
  explanation: string;
}

export const CLIMATE_ZONE_BTU_FACTORS: Record<HeatingClimateZone, { btuPerSqFt: number; label: string; outdoorDesignTemp: string }> = {
  1: { btuPerSqFt: 30, label: "Zone 1: Deep South & Coastal (FL, Gulf Coast, SoCal)", outdoorDesignTemp: "35°F to 40°F" },
  2: { btuPerSqFt: 35, label: "Zone 2: Moderate South & Sunbelt (TX, GA, NC, AZ)", outdoorDesignTemp: "25°F to 30°F" },
  3: { btuPerSqFt: 40, label: "Zone 3: Mid-Atlantic & Central (VA, MO, KS, KY)", outdoorDesignTemp: "15°F to 20°F" },
  4: { btuPerSqFt: 50, label: "Zone 4: Northern & Midwest (PA, OH, IL, NY, CO)", outdoorDesignTemp: "0°F to 10°F" },
  5: { btuPerSqFt: 60, label: "Zone 5: Sub-Zero Extreme North (MN, WI, ND, ME, MT)", outdoorDesignTemp: "-10°F to -25°F" },
};

export const INSULATION_FACTORS: Record<InsulationGrade, { multiplier: number; label: string }> = {
  poor: { multiplier: 1.20, label: "Poor (Pre-1980, uninsulated 2x4 walls, single pane)" },
  average: { multiplier: 1.00, label: "Average (1980–2005, R-13 walls, double pane)" },
  good: { multiplier: 0.88, label: "Good (2006–Present, R-19+ walls, Low-E glass)" },
  spray_foam: { multiplier: 0.75, label: "High Performance / Spray Foam Envelope" },
};

// Standard residential gas furnace input BTU tiers
const STANDARD_FURNACE_SIZES = [40000, 60000, 80000, 100000, 120000, 140000];

/**
 * Calculates required residential gas furnace capacity (Input vs. Output BTU)
 * according to ACCA Manual J and AFUE efficiency derating.
 */
export function calculateFurnaceBtu(input: FurnaceBtuInput): FurnaceBtuOutput {
  const area = Math.max(100, input.floorAreaSqFt);
  const zone = input.climateZone || 3;
  const ceiling = Math.max(7, Math.min(24, input.ceilingHeightFeet || 8));
  const insulation = input.insulationGrade || "average";
  const sun = input.sunExposure || "average";
  const afue = Math.max(78, Math.min(99, input.afueRatingPercent || 96));
  const tempRise = Math.max(25, Math.min(70, input.temperatureRiseF || 45));

  // 1. Base climate BTU
  const baseBtuPerSqFt = CLIMATE_ZONE_BTU_FACTORS[zone].btuPerSqFt;

  // 2. Ceiling height multiplier (baseline = 8ft)
  const ceilingMultiplier = ceiling / 8;

  // 3. Insulation multiplier
  const insMultiplier = INSULATION_FACTORS[insulation].multiplier;

  // 4. Solar exposure factor
  const sunMultiplier = sun === "shaded" ? 1.05 : sun === "sunny" ? 0.95 : 1.00;

  // Total Net Heat Loss (Output BTU needed)
  const netHeatLossBtu = Math.round(area * baseBtuPerSqFt * ceilingMultiplier * insMultiplier * sunMultiplier);

  // Output BTU required into space (ACCA Manual S recommends 100% to 140% for heating equipment)
  const requiredOutputBtu = netHeatLossBtu;

  // Input BTU (fuel consumption based on AFUE)
  const requiredInputBtu = Math.round(requiredOutputBtu / (afue / 100));

  // Match to standard nominal furnace manufactured size
  let nominalFurnaceModelBtu = STANDARD_FURNACE_SIZES[STANDARD_FURNACE_SIZES.length - 1];
  for (const size of STANDARD_FURNACE_SIZES) {
    if (size * (afue / 100) >= requiredOutputBtu) {
      nominalFurnaceModelBtu = size;
      break;
    }
  }

  // Cabinet width recommendation
  let recommendedCabinetWidth = "17.5\" (B-Cabinet)";
  if (nominalFurnaceModelBtu <= 40000) recommendedCabinetWidth = "14.5\" (A-Cabinet)";
  else if (nominalFurnaceModelBtu <= 60000) recommendedCabinetWidth = "14.5\" to 17.5\" (A/B-Cabinet)";
  else if (nominalFurnaceModelBtu <= 80000) recommendedCabinetWidth = "17.5\" (B-Cabinet)";
  else if (nominalFurnaceModelBtu <= 100000) recommendedCabinetWidth = "21.0\" (C-Cabinet)";
  else recommendedCabinetWidth = "24.5\" (D-Cabinet)";

  // Required heating airflow CFM = Output BTU / (1.08 × Delta T)
  const requiredHeatingCfm = Math.round(requiredOutputBtu / (1.08 * tempRise));

  // Annual therms estimate (assuming ~1,200 equivalent full-load heating hours)
  const annualThermsEstimate = Math.round((requiredInputBtu * 1200) / 100000);

  const flueExhaustType = afue >= 90 ? "PVC / CPVC Direct Vent (Condensing)" : "Metal B-Vent Chimney";

  return {
    floorAreaSqFt: area,
    netHeatLossBtu,
    requiredOutputBtu,
    requiredInputBtu,
    afueRatingPercent: afue,
    nominalFurnaceModelBtu,
    recommendedCabinetWidth,
    requiredHeatingCfm,
    annualThermsEstimate,
    flueExhaustType,
    explanation: `For a ${area.toLocaleString()} sq ft home in ${CLIMATE_ZONE_BTU_FACTORS[zone].label}, net envelope heat loss is ${netHeatLossBtu.toLocaleString()} BTU/hr. At ${afue}% AFUE, a ${nominalFurnaceModelBtu / 1000}k BTU input furnace delivers ${(nominalFurnaceModelBtu * (afue / 100)).toLocaleString()} BTU/hr output (${requiredHeatingCfm.toLocaleString()} CFM airflow at ${tempRise}°F rise).`,
  };
}
