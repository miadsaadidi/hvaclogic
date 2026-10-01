/**
 * HVACLogic — AC Tonnage & SEER2 Cooling Capacity Screening Engine
 *
 * This preliminary screening model estimates residential cooling capacity based on:
 *   - Conditioned floor area and ceiling height adjustment
 *   - Regional climate screening factors (sq ft per ton rule-of-thumb benchmarks)
 *   - Rounding to standard residential nominal tonnage increments (1.5 to 5.0 Tons)
 *   - Equivalent Full-Load Hour (EFLH) SEER2 annual energy cost estimation
 *
 * Technical References:
 *   - ANSI/ACCA Manual J (Residential Load Calculation reference methodology)
 *   - ANSI/ACCA Manual S (Residential Equipment Selection reference methodology)
 *   - AHRI Standard 210/240 (Performance Rating of Unitary Air-Conditioning & Heat Pump Equipment)
 *
 * Note: Square-footage estimation is a preliminary sizing heuristic.
 * Code-compliant system design requires an ACCA Manual J load calculation and ACCA Manual S equipment selection.
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

// Preliminary regional climate screening benchmarks (square feet per ton of cooling)
export const CLIMATE_SQFT_PER_TON: Record<string, number> = {
  mild: 650, // Northern Coastal / Pacific Northwest (~650 sq ft/ton)
  moderate: 550, // Mid-Atlantic / Midwest (~550 sq ft/ton)
  hot_humid: 450, // Southeast / Gulf Coast (~450 sq ft/ton)
  extreme_heat: 350, // Desert Southwest (~350 sq ft/ton)
};

export function calculateAcTonnage(input: AcTonnageInput): AcTonnageOutput {
  const area = Math.max(50, input.areaSqFt);
  const sqFtPerTon = CLIMATE_SQFT_PER_TON[input.climateSeverity] || 550;
  const ceiling = input.ceilingHeightFt ? Math.max(7, input.ceilingHeightFt) : 8;
  const heightFactor = 1 + (ceiling - 8) / 16; // Simplified volume proxy: +6.25% per foot above 8 ft

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
  const nominalCfm = Math.round(recommendedTonnage * 400); // 400 CFM/ton nominal reference guideline

  // SEER2 Operating Cost Modeling (Equivalent Full-Load Hours screening approach)
  // Annual kWh = (BTU/hr * cooling_hours) / (SEER2 * 1000)
  const seer = Math.max(10, input.seerRating || 15.0);
  const rate = Math.max(0.01, input.electricRateKwh || 0.16);
  const hours = input.coolingHoursPerYear || 1000;

  const annualKwh = (recommendedBtu * hours) / (seer * 1000);
  const annualOperatingCost = Math.round(annualKwh * rate);

  // Compare against legacy 10 SEER baseline unit
  const legacyKwh = (recommendedBtu * hours) / (10.0 * 1000);
  const seer10OperatingCost = Math.round(legacyKwh * rate);
  const annualSavingsVsLegacy = Math.max(0, seer10OperatingCost - annualOperatingCost);

  // Comparison matrix across standard SEER2 efficiency tiers
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
