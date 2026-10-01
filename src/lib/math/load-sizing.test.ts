import { describe, it, expect } from "vitest";
import { calculateHeatLoad } from "./load-sizing";

describe("Whole-Home BTU & Load Sizing Screening Engine", () => {
  it("GOLD-LOAD-01: sizes a 2,000 sq ft home in Climate Zone 4 (default inputs)", () => {
    const result = calculateHeatLoad({
      areaSqFt: 2000,
      ceilingHeightFt: 9,
      climateZone: "zone_4",
      insulationGrade: "average",
      windowQuality: "double_low_e",
      occupants: 4,
    });

    // Exact Golden Reference for Screening Model:
    // Base Cooling = 2000 * 14.25 * (9/8) * 1.0 * 0.95 = 30,459.375 BTU/hr
    // Sensible = (30459.375 * 0.85 + 2120) * 1.15 = 32,212 BTU/hr
    // Latent = (30459.375 * 0.15 + 800) * 1.15 = 6,174 BTU/hr
    // Total Cooling = 38,386 BTU/hr (3.2 Tons)
    // Total Heating = 2000 * 24 * (9/8) * 1.0 * 0.95 * 1.15 = 58,995 BTU/hr
    // Recommended CFM = 32212 / (1.08 * 20) = ~1490 CFM
    expect(result.sensibleCoolingBtu).toBe(32212);
    expect(result.latentCoolingBtu).toBe(6174);
    expect(result.totalCoolingBtu).toBe(38386);
    expect(result.coolingTonnage).toBe(3.2);
    expect(result.totalHeatingBtu).toBe(58995);
    expect(result.recommendedCfm).toBe(1490);
    expect(result.recommendedFurnaceBtu).toBe(80000);
    expect(result.breakdown.length).toBe(5);
  });

  it("adjusts load proportionally for cold climate zones", () => {
    const warmZone = calculateHeatLoad({
      areaSqFt: 2000,
      ceilingHeightFt: 8,
      climateZone: "zone_2",
      insulationGrade: "average",
      windowQuality: "double_clear",
      occupants: 3,
    });

    const coldZone = calculateHeatLoad({
      areaSqFt: 2000,
      ceilingHeightFt: 8,
      climateZone: "zone_6",
      insulationGrade: "average",
      windowQuality: "double_clear",
      occupants: 3,
    });

    // Cold zone requires substantially higher heating BTU
    expect(coldZone.totalHeatingBtu).toBeGreaterThan(warmZone.totalHeatingBtu * 1.8);
  });
});
