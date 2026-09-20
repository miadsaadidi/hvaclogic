import { describe, it, expect } from "vitest";
import {
  calculateEffectiveAssemblyThermal,
  calculateContinuousInsulationR,
  STEEL_STUD_EFFECTIVE_CAVITY_R,
} from "./effective-r-value";

describe("Building Envelope Thermal Bridging & Effective Assembly Engine", () => {
  it("calculates continuous exterior insulation R-values correctly across material classes", () => {
    expect(calculateContinuousInsulationR("none")).toBe(0);
    expect(calculateContinuousInsulationR("xps", 1.0)).toBe(5.0);
    expect(calculateContinuousInsulationR("xps", 2.0)).toBe(10.0);
    expect(calculateContinuousInsulationR("eps", 1.5)).toBe(6.0);
    expect(calculateContinuousInsulationR("polyiso", 1.0)).toBe(6.0);
    expect(calculateContinuousInsulationR("polyiso", 2.0)).toBe(12.0);
    expect(calculateContinuousInsulationR("mineral_wool", 2.0)).toBe(8.4);
    expect(calculateContinuousInsulationR("custom", 0, 7.5)).toBe(7.5);
  });

  it("accurately replicates ASHRAE 90.1 Table A9.2-1 steel stud effective cavity R-values", () => {
    // 3.5" Studs @ 16" O.C.
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["3.5_16_11"]).toBe(5.5);
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["3.5_16_13"]).toBe(6.0);
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["3.5_16_15"]).toBe(6.4);

    // 3.5" Studs @ 24" O.C.
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["3.5_24_11"]).toBe(6.6);
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["3.5_24_13"]).toBe(7.2);
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["3.5_24_15"]).toBe(7.8);

    // 6.0" Studs @ 16" O.C.
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["6.0_16_19"]).toBe(7.1);
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["6.0_16_21"]).toBe(7.4);

    // 6.0" Studs @ 24" O.C.
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["6.0_24_19"]).toBe(8.6);
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["6.0_24_21"]).toBe(9.0);

    // 8.0" Studs
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["8.0_16_25"]).toBe(7.8);
    expect(STEEL_STUD_EFFECTIVE_CAVITY_R["8.0_24_25"]).toBe(9.6);
  });

  it("computes cold-formed steel 3.5\" 16\" O.C. with R-13 cavity correctly", () => {
    const result = calculateEffectiveAssemblyThermal({
      framingMaterial: "steel",
      studDepth: "3.5",
      studSpacing: 16,
      cavityNominalR: 13,
      continuousInsulationType: "none",
    });

    expect(result.effectiveCavityR).toBe(6.0);
    expect(result.cavityDeratePercent).toBeCloseTo(53.8, 1);
    // Base layers = 0.85 (air films) + 0.45 (gypsum) + 0.62 (OSB) + 0.60 (siding) = 2.52
    expect(result.baseContinuousLayersR).toBe(2.52);
    expect(result.totalAssemblyEffectiveR).toBe(8.52);
    // U = 1 / 8.52 = 0.11737... -> 0.117
    expect(result.totalAssemblyUFactor).toBe(0.117);
  });

  it("computes steel 3.5\" 16\" O.C. with R-13 cavity + 1\" XPS continuous insulation", () => {
    const result = calculateEffectiveAssemblyThermal({
      framingMaterial: "steel",
      studDepth: "3.5",
      studSpacing: 16,
      cavityNominalR: 13,
      continuousInsulationType: "xps",
      continuousInsulationThicknessInches: 1.0,
    });

    expect(result.effectiveCavityR).toBe(6.0);
    expect(result.continuousInsulationR).toBe(5.0);
    // Total R = 2.52 + 5.0 + 6.0 = 13.52
    expect(result.totalAssemblyEffectiveR).toBe(13.52);
    // U = 1 / 13.52 = 0.07396... -> 0.074
    expect(result.totalAssemblyUFactor).toBe(0.074);
  });

  it("computes wood 2x4 @ 16\" O.C. parallel-path heat transfer correctly", () => {
    const result = calculateEffectiveAssemblyThermal({
      framingMaterial: "wood",
      studDepth: "3.5",
      studSpacing: 16,
      cavityNominalR: 13,
      continuousInsulationType: "none",
    });

    // Wood framing factor: 25% framing, 75% cavity
    expect(result.framingFactorPercent).toBe(25);
    // Wood stud 3.5" * 1.25 = R-4.38
    // Common layers = 2.52
    // rFramingPath = 2.52 + 4.38 = 6.90 -> uFraming = 1 / 6.90 = 0.1449
    // rCavityPath = 2.52 + 13 = 15.52 -> uCavity = 1 / 15.52 = 0.0644
    // uAssembly = 0.25 * 0.1449 + 0.75 * 0.0644 = 0.03623 + 0.0483 = 0.0845...
    expect(result.totalAssemblyUFactor).toBeLessThan(0.09);
    expect(result.totalAssemblyUFactor).toBeGreaterThan(0.075);
    expect(result.totalAssemblyEffectiveR).toBeGreaterThan(11.0);
    expect(result.totalAssemblyEffectiveR).toBeLessThan(13.0);
  });
});
