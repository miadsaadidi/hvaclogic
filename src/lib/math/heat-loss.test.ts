import { describe, it, expect } from "vitest";
import {
  calculateBuildingHeatLoss,
  BuildingHeatLossInput,
} from "./heat-loss";

describe("Building Heat Loss & Infiltration Engine", () => {
  it("calculates exact Denver 2,000 sq ft baseline (25,428 BTU/hr) with full component breakdown", () => {
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
    expect(res.grossWallAreaSqFt).toBe(1610);
    expect(res.netWallAreaSqFt).toBe(1270);
    expect(res.windowAreaSqFt).toBe(300);
    expect(res.doorAreaSqFt).toBe(40);
    expect(res.perimeterFeet).toBeCloseTo(178.9, 1);
    expect(res.buildingVolumeCuFt).toBe(18000);
    expect(res.infiltrationCfm).toBe(114);

    // Exact component breakdown
    expect(res.breakdown.wallsBtu).toBe(3717);
    expect(res.breakdown.ceilingBtu).toBe(3077);
    expect(res.breakdown.windowsBtu).toBe(5040);
    expect(res.breakdown.doorsBtu).toBe(840);
    expect(res.breakdown.foundationBtu).toBe(5367);
    expect(res.breakdown.infiltrationBtu).toBe(7387);

    // Total = 3717 + 3077 + 5040 + 840 + 5367 + 7387 = 25,428 BTU/hr
    expect(res.totalHeatLossBtu).toBe(25428);
    expect(res.totalHeatLossKw).toBe(7.5);
    expect(res.heatLossPerSqFtBtu).toBe(12.7);
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
    expect(res.summary).toContain("Assembly U-0.0520");
  });

  it("distinguishes unmitigated steel stud assembly thermal bridging from nominal cavity R-value", () => {
    const nominalInput: BuildingHeatLossInput = {
      floorAreaSqFt: 2000,
      outdoorDesignTempF: 10,
      wallInsulationR: 13,
      ceilingInsulationR: 38,
      windowGlazing: "double_low_e",
      foundation: "slab_on_grade",
      airTightness: "average_code",
    };

    // Bridged steel stud wall: e.g. U = 0.1176
    const bridgedSteelInput: BuildingHeatLossInput = {
      ...nominalInput,
      wallAssemblyMode: "effective_u",
      customWallUFactor: 0.1176,
    };

    const nominalRes = calculateBuildingHeatLoss(nominalInput);
    const steelRes = calculateBuildingHeatLoss(bridgedSteelInput);

    expect(steelRes.breakdown.wallsBtu).toBeGreaterThan(nominalRes.breakdown.wallsBtu * 1.5);
    expect(steelRes.totalHeatLossBtu).toBeGreaterThan(nominalRes.totalHeatLossBtu);
  });
});
