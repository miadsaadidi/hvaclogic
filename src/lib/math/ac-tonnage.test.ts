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
    expect(result.exactTonnage).toBe(2.73);
    expect(result.recommendedTonnage).toBe(2.5);
    expect(result.recommendedBtu).toBe(30000);
    expect(result.nominalCfm).toBe(1000);
    expect(result.annualOperatingCost).toBeGreaterThan(0);
    expect(result.annualSavingsVsLegacy).toBeGreaterThan(0);
  });

  it("GOLD-TON-02: sizes 2,000 sq ft in moderate climate matching worked example", () => {
    const result = calculateAcTonnage({
      areaSqFt: 2000,
      climateSeverity: "moderate",
      ceilingHeightFt: 8,
      seerRating: 16,
      electricRateKwh: 0.16,
      coolingHoursPerYear: 1000,
    });

    // 2000 / 550 = 3.636... -> 3.64 Exact Tonnage -> 3.5 Tons (42,000 BTU/hr)
    expect(result.exactTonnage).toBe(3.64);
    expect(result.recommendedTonnage).toBe(3.5);
    expect(result.recommendedBtu).toBe(42000);
    expect(result.nominalCfm).toBe(1400);
    // Annual kWh = (42,000 * 1000) / (16 * 1000) = 2,625 kWh * $0.16 = $420
    expect(result.annualOperatingCost).toBe(420);
    // Legacy 10 SEER = (42,000 * 1000) / (10 * 1000) = 4,200 kWh * $0.16 = $672
    expect(result.seer10OperatingCost).toBe(672);
    expect(result.annualSavingsVsLegacy).toBe(252);
  });

  it("adjusts capacity for higher ceiling heights", () => {
    const standardHeight = calculateAcTonnage({ areaSqFt: 2000, climateSeverity: "moderate", ceilingHeightFt: 8 });
    const highCeiling = calculateAcTonnage({ areaSqFt: 2000, climateSeverity: "moderate", ceilingHeightFt: 12 });

    expect(highCeiling.exactTonnage).toBeGreaterThan(standardHeight.exactTonnage);
    // Height factor for 12ft: 1 + (12 - 8)/16 = 1.25 -> 3.636 * 1.25 = 4.545 -> standard residential jump to 5.0 Tons
    expect(highCeiling.exactTonnage).toBe(4.55);
    expect(highCeiling.recommendedTonnage).toBe(5.0);
  });

  it("scales accurately across climate severity", () => {
    const mild = calculateAcTonnage({ areaSqFt: 1800, climateSeverity: "mild" });
    const moderate = calculateAcTonnage({ areaSqFt: 1800, climateSeverity: "moderate" });
    const hotHumid = calculateAcTonnage({ areaSqFt: 1800, climateSeverity: "hot_humid" });
    const desert = calculateAcTonnage({ areaSqFt: 1800, climateSeverity: "extreme_heat" });

    expect(mild.exactTonnage).toBeLessThan(moderate.exactTonnage);
    expect(moderate.exactTonnage).toBeLessThan(hotHumid.exactTonnage);
    expect(hotHumid.exactTonnage).toBeLessThan(desert.exactTonnage);
    expect(desert.recommendedTonnage).toBeGreaterThan(mild.recommendedTonnage);
  });
});

