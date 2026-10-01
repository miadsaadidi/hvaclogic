import { describe, it, expect } from "vitest";
import {
  calculateEffectiveAssemblyThermal,
  calculateContinuousInsulationR,
  ASHRAE_STEEL_STUD_TABLE_A9_2_2,
} from "./effective-r-value";

describe("Building Envelope Thermal Bridging & Effective Assembly Engine", () => {
  it("calculates continuous exterior insulation R-values correctly across material classes", () => {
    expect(calculateContinuousInsulationR("none")).toBe(0);
    expect(calculateContinuousInsulationR("xps", 1.0)).toBe(5.0);
    expect(calculateContinuousInsulationR("xps", 2.0)).toBe(10.0);
    expect(calculateContinuousInsulationR("eps", 1.5)).toBe(6.0);
    expect(calculateContinuousInsulationR("polyiso", 1.0)).toBe(6.0);
    expect(calculateContinuousInsulationR("polyiso", 1.5)).toBe(9.0);
    expect(calculateContinuousInsulationR("polyiso", 2.0)).toBe(12.0);
    expect(calculateContinuousInsulationR("mineral_wool", 2.0)).toBe(8.4);
    expect(calculateContinuousInsulationR("custom", 0, 7.5)).toBe(7.5);
  });

  it("accurately replicates ASHRAE 90.1 Table A9.2-2 steel stud effective cavity R-values", () => {
    // 3.5" Studs @ 16" O.C.
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["3.5_16_11"]?.rEff).toBe(5.5);
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["3.5_16_13"]?.rEff).toBe(6.0);
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["3.5_16_15"]?.rEff).toBe(6.4);

    // 3.5" Studs @ 24" O.C.
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["3.5_24_11"]?.rEff).toBe(6.6);
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["3.5_24_13"]?.rEff).toBe(7.2);
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["3.5_24_15"]?.rEff).toBe(7.8);

    // 6.0" Studs @ 16" O.C.
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["6.0_16_19"]?.rEff).toBe(7.1);
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["6.0_16_21"]?.rEff).toBe(7.4);

    // 6.0" Studs @ 24" O.C.
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["6.0_24_19"]?.rEff).toBe(8.6);
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["6.0_24_21"]?.rEff).toBe(9.0);

    // 8.0" Studs
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["8.0_16_25"]?.rEff).toBe(7.8);
    expect(ASHRAE_STEEL_STUD_TABLE_A9_2_2["8.0_24_25"]?.rEff).toBe(9.6);
  });

  it("computes cold-formed steel 6.0\" 16\" O.C. with R-19 cavity (Case A: No CI)", () => {
    const result = calculateEffectiveAssemblyThermal({
      framingMaterial: "steel",
      studDepth: "6.0",
      studSpacing: 16,
      cavityNominalR: 19,
      continuousInsulationType: "none",
    });

    expect(result.effectiveCavityR).toBe(7.1);
    expect(result.cavityDeratePercent).toBeCloseTo(62.6, 1); // (19 - 7.1) / 19 = 62.63%
    expect(result.baseContinuousLayersR).toBe(2.52);
    expect(result.totalAssemblyEffectiveR).toBe(9.62); // 2.52 + 7.1 = 9.62
    // U = 1 / 9.62 = 0.10395 -> 0.104
    expect(result.totalAssemblyUFactor).toBe(0.104);
    expect(result.isSourceTabulated).toBe(true);
  });

  it("computes cold-formed steel 6.0\" 16\" O.C. with R-19 cavity + 1.5\" Polyiso CI (Case B: With CI)", () => {
    const result = calculateEffectiveAssemblyThermal({
      framingMaterial: "steel",
      studDepth: "6.0",
      studSpacing: 16,
      cavityNominalR: 19,
      continuousInsulationType: "polyiso",
      continuousInsulationThicknessInches: 1.5,
    });

    expect(result.effectiveCavityR).toBe(7.1);
    expect(result.continuousInsulationR).toBe(9.0); // 1.5 * 6.0 = 9.0
    expect(result.totalAssemblyEffectiveR).toBe(18.62); // 2.52 + 9.0 + 7.1 = 18.62
    // U = 1 / 18.62 = 0.0537 -> 0.054
    expect(result.totalAssemblyUFactor).toBe(0.054);
  });

  it("computes wood 2x4 @ 16\" O.C. with R-13 cavity using exact parallel-path area weighting", () => {
    const result = calculateEffectiveAssemblyThermal({
      framingMaterial: "wood",
      studDepth: "3.5",
      studSpacing: 16,
      cavityNominalR: 13,
      continuousInsulationType: "none",
      framingFactorPercent: 25,
    });

    expect(result.framingFactorPercent).toBe(25);
    // Base layers = 2.52
    // Wood stud = 3.5 * 1.25 = 4.38
    // Framing path R = 2.52 + 4.38 = 6.90 -> U_framing = 1 / 6.90 = 0.144928
    // Cavity path R = 2.52 + 13 = 15.52 -> U_cavity = 1 / 15.52 = 0.064433
    // U_assembly = 0.25 * 0.144928 + 0.75 * 0.064433 = 0.036232 + 0.048325 = 0.084557 -> 0.085
    expect(result.totalAssemblyUFactor).toBe(0.085);
    expect(result.totalAssemblyEffectiveR).toBe(11.83); // 1 / 0.084557 = 11.826 -> 11.83
    expect(result.effectiveCavityR).toBe(9.3); // 11.83 - 2.52 = 9.31 -> 9.3
  });
});
