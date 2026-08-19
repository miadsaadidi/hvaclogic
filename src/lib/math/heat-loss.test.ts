import { describe, it, expect } from "vitest";
import {
  calculateBuildingHeatLoss,
  BuildingHeatLossInput,
} from "./heat-loss";

describe("Building Heat Loss & Infiltration Engine", () => {
  it("calculates standard 2,000 sq ft home heat loss at 10°F design temperature", () => {
    const input: BuildingHeatLossInput = {
      floorAreaSqFt: 2000,
      ceilingHeightFeet: 9,
      indoorTempF: 70,
      outdoorDesignTempF: 10, // Delta T = 60°F
      wallInsulationR: 19,
      ceilingInsulationR: 38,
      windowGlazing: "double_low_e",
      foundation: "slab_on_grade",
      airTightness: "average_code",
    };

    const res = calculateBuildingHeatLoss(input);
    expect(res.temperatureDifferenceDeltaT).toBe(60);
    expect(res.totalHeatLossBtu).toBeGreaterThan(25000);
    expect(res.totalHeatLossBtu).toBeLessThan(45000);
    expect(res.totalHeatLossKw).toBeGreaterThan(7);
    expect(res.breakdownPercentages.infiltrationPercent).toBeGreaterThan(15);
    expect(res.recommendedFurnaceBtu).toBeGreaterThanOrEqual(30000);
  });

  it("reflects dramatic heat loss reduction in high-efficiency tight homes", () => {
    const leakyInput: BuildingHeatLossInput = {
      floorAreaSqFt: 2000,
      outdoorDesignTempF: 0,
      wallInsulationR: 11,
      ceilingInsulationR: 19,
      windowGlazing: "single_pane",
      foundation: "slab_on_grade",
      airTightness: "very_leaky_historic",
    };

    const tightInput: BuildingHeatLossInput = {
      floorAreaSqFt: 2000,
      outdoorDesignTempF: 0,
      wallInsulationR: 30,
      ceilingInsulationR: 60,
      windowGlazing: "triple_pane",
      foundation: "conditioned_basement",
      airTightness: "tight_modern",
    };

    const leakyRes = calculateBuildingHeatLoss(leakyInput);
    const tightRes = calculateBuildingHeatLoss(tightInput);

    // Tight high-perf envelope should cut heat loss by more than 50%
    expect(tightRes.totalHeatLossBtu).toBeLessThan(leakyRes.totalHeatLossBtu * 0.5);
  });
});
