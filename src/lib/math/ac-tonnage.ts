/**
 * HVAC Lab / HVAC Logic — AC Tonnage & SEER2 Sizing Math Engine
 * Reference: ACCA Manual S Sizing Heuristics & AHRI SEER2 Standards
 */

export interface AcTonnageInput {
  areaSqFt: number;
  climateSeverity: "mild" | "moderate" | "hot_humid" | "extreme_heat";
  ceilingHeightFt?: number;
  seerRating?: number; // default 15.0 SEER2
  electricRateKwh?: number; // default $0.16/kWh
  coolingHoursPerYear?: number; // default 1,000 hrs
}

export interface AcTonnageOutput {
  exactTonnage: number;
  recommendedTonnage: number; // Standard residential sizes: 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0
  recommendedBtu: number;
  nominalCfm: number;
  annualOperatingCost: number;
  seer10OperatingCost: number;
  annualSavingsVsLegacy: number;
  seerRatingsComparison: { seer: number; annualCost: number }[];
}

const CLIMATE_SQFT_PER_TON = {
  mild: 700, // Pacific Northwest / Northern Coastal (~700 sq ft/ton)
  moderate: 600, // Mid-Atlantic / Midwest (~600 sq ft/ton: 1,500 sq ft = 2.5 Ton)
  hot_humid: 500, // Southeast / Gulf Coast (~500 sq ft/ton)
  extreme_heat: 400, // Desert Southwest (Phoenix, Vegas — ~400 sq ft/ton)
};

export function calculateAcTonnage(input: AcTonnageInput): AcTonnageOutput {
  const area = Math.max(50, input.areaSqFt);
  const sqFtPerTon = CLIMATE_SQFT_PER_TON[input.climateSeverity] || 600;
  const ceiling = input.ceilingHeightFt ? Math.max(7, input.ceilingHeightFt) : 8;
  const heightFactor = ceiling / 8.0;

  const exactTonnage = (area / sqFtPerTon) * heightFactor;

  // Round to nearest standard residential tonnage (1.5 to 5.0 in 0.5T increments)
  const standardSizes = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0];
  let recommendedTonnage = standardSizes[0];

  for (const size of standardSizes) {
    if (exactTonnage <= size + 0.25) {
      recommendedTonnage = size;
      break;
    }
    recommendedTonnage = size;
  }

  const recommendedBtu = Math.round(recommendedTonnage * 12000);
  const nominalCfm = Math.round(recommendedTonnage * 400);

  // SEER2 Operating Cost Modeling
  // Annual kWh = (BTU/hr * cooling_hours) / (SEER * 1000)
  const seer = Math.max(10, input.seerRating || 15.0);
  const rate = Math.max(0.01, input.electricRateKwh || 0.16);
  const hours = input.coolingHoursPerYear || 1000;

  const annualKwh = (recommendedBtu * hours) / (seer * 1000);
  const annualOperatingCost = Math.round(annualKwh * rate);

  // Compare against legacy 10 SEER unit
  const legacyKwh = (recommendedBtu * hours) / (10.0 * 1000);
  const seer10OperatingCost = Math.round(legacyKwh * rate);
  const annualSavingsVsLegacy = Math.max(0, seer10OperatingCost - annualOperatingCost);

  // Comparison matrix across standard SEER levels
  const testSeers = [10, 14, 16, 18, 20, 24];
  const seerRatingsComparison = testSeers.map((s) => {
    const kwh = (recommendedBtu * hours) / (s * 1000);
    return {
      seer: s,
      annualCost: Math.round(kwh * rate),
    };
  });

  return {
    exactTonnage: Math.round(exactTonnage * 100) / 100,
    recommendedTonnage,
    recommendedBtu,
    nominalCfm,
    annualOperatingCost,
    seer10OperatingCost,
    annualSavingsVsLegacy,
    seerRatingsComparison,
  };
}
