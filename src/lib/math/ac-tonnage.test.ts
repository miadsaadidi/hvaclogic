import { describe, it, expect } from "vitest";
import { calculateAcTonnage } from "./ac-tonnage";

describe("AC Tonnage & SEER2 Sizing Math Engine", () => {
  it("GOLD-TON-01: sizes 1,500 sq ft in moderate climate", () => {
    const result = calculateAcTonnage({
      areaSqFt: 1500,
      climateSeverity: "moderate",
      seerRating: 15,
      electricRateKwh: 0.16,
    });

    // Golden Reference Expected: ~2.5 Tons (30,000 BTU/hr), Nominal Airflow ~1,000 CFM
    expect(result.recommendedTonnage).toBe(2.5);
    expect(result.recommendedBtu).toBe(30000);
    expect(result.nominalCfm).toBe(1000);
    expect(result.annualOperatingCost).toBeGreaterThan(0);
    expect(result.annualSavingsVsLegacy).toBeGreaterThan(0);
  });

  it("scales accurately across climate severity", () => {
    const mild = calculateAcTonnage({ areaSqFt: 1800, climateSeverity: "mild" });
    const desert = calculateAcTonnage({ areaSqFt: 1800, climateSeverity: "extreme_heat" });

    expect(desert.recommendedTonnage).toBeGreaterThan(mild.recommendedTonnage);
  });
});
