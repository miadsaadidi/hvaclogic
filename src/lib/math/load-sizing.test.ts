import { describe, it, expect } from "vitest";
import { calculateHeatLoad } from "./load-sizing";

describe("Whole-Home BTU & Load Sizing Math Engine", () => {
  it("GOLD-LOAD-01: sizes a 2,000 sq ft home in Climate Zone 4", () => {
    const result = calculateHeatLoad({
      areaSqFt: 2000,
      ceilingHeightFt: 9,
      climateZone: "zone_4",
      insulationGrade: "average",
      windowQuality: "double_low_e",
      occupants: 4,
    });

    // Golden Reference Expected: Total Cooling ~34,200 BTU/hr (approx 2.85 to 3.0 Tons), Heating ~48,000 to 55,000 BTU/hr
    expect(result.coolingTonnage).toBeGreaterThanOrEqual(2.5);
    expect(result.coolingTonnage).toBeLessThanOrEqual(3.5);
    expect(result.totalHeatingBtu).toBeGreaterThan(40000);
    expect(result.totalHeatingBtu).toBeLessThan(70000);
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
