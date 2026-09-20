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

  it("calculates wall conduction using effective assembly U-factor when wallAssemblyMode is 'effective_u'", () => {
    // 2,000 sq ft, perimeter = 4 * sqrt(2000) ≈ 178.885 ft
    // gross wall area = 178.885 * 9 ≈ 1610 sq ft
    // window area = 300 sq ft (15%), door = 40 sq ft -> net wall = 1270 sq ft
    // Delta T = 60°F
    const customUInput: BuildingHeatLossInput = {
      floorAreaSqFt: 2000,
      ceilingHeightFeet: 9,
      indoorTempF: 70,
      outdoorDesignTempF: 10,
      wallInsulationR: 19, // ignored in effective_u mode
      wallAssemblyMode: "effective_u",
      customWallUFactor: 0.052, // e.g. R-19.2 effective wall with stud bridging
      ceilingInsulationR: 38,
      windowGlazing: "double_low_e",
      foundation: "slab_on_grade",
      airTightness: "average_code",
    };

    const res = calculateBuildingHeatLoss(customUInput);
    expect(res.wallAssemblyMode).toBe("effective_u");
    expect(res.wallUFactor).toBe(0.052);
    expect(res.effectiveWallR).toBe(19.2);

    // Expected wall loss: round(0.052 * 1270 * 60) = 3962 BTU/hr
    expect(res.breakdown.wallsBtu).toBe(3962);
    expect(res.summary).toContain("ASHRAE 90.1 assembly U-0.052");
  });

  it("distinguishes unmitigated steel stud assembly thermal bridging from nominal cavity R-value", () => {
    // Baseline: uncorrected nominal R-13 cavity (assumed R-14.5 with films: U ≈ 0.069)
    const nominalInput: BuildingHeatLossInput = {
      floorAreaSqFt: 2000,
      outdoorDesignTempF: 10,
      wallInsulationR: 13,
      ceilingInsulationR: 38,
      windowGlazing: "double_low_e",
      foundation: "slab_on_grade",
      airTightness: "average_code",
    };

    // Bridged steel stud wall: per ASHRAE 90.1 Table A9.2-1, R-13 cavity in 3.5" steel stud @ 16" OC
    // derates to effective cavity R-6.0 + R-2.5 continuous layers = effective R-8.5 -> U = 1/8.5 ≈ 0.1176
    const bridgedSteelInput: BuildingHeatLossInput = {
      ...nominalInput,
      wallAssemblyMode: "effective_u",
      customWallUFactor: 0.1176,
    };

    const nominalRes = calculateBuildingHeatLoss(nominalInput);
    const steelRes = calculateBuildingHeatLoss(bridgedSteelInput);

    // Steel stud thermal bridging increases wall transmission heat loss significantly
    expect(steelRes.breakdown.wallsBtu).toBeGreaterThan(nominalRes.breakdown.wallsBtu * 1.5);
    expect(steelRes.totalHeatLossBtu).toBeGreaterThan(nominalRes.totalHeatLossBtu);
  });
});
