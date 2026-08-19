import { describe, it, expect } from "vitest";
import {
  calculateRoundDiameter,
  calculateVelocityFpm,
  getVelocityCategory,
  huebscherEquivalentRound,
  solveRectangularDimension,
  calculateDuct,
} from "./duct";

describe("Duct Sizing & Airflow Math Engine", () => {
  it("GOLD-DUCT-01: calculates 1,200 CFM at 0.08 in.wg friction rate", () => {
    const result = calculateDuct({
      cfm: 1200,
      friction: 0.08,
      lockMode: "lock_height",
      lockedDimension: 10,
    });

    // Golden Reference Expected: De = 14.2 in, Rectangular: ~17.4" x 10", Velocity: ~1,087 FPM
    expect(result.roundDiameter).toBeCloseTo(14.2, 1);
    expect(result.rectangularHeight).toBe(10);
    expect(result.rectangularWidth).toBeCloseTo(17.4, 0);
    expect(result.velocityFpm).toBeGreaterThan(1000);
    expect(result.velocityFpm).toBeLessThan(1200);
  });

  it("Huebscher Equivalence: verifies known round-to-rectangular conversions", () => {
    // A 12" x 12" duct has equivalent round De = 1.30 * (144)^0.625 / (24)^0.25 ≈ 13.1"
    const de = huebscherEquivalentRound(12, 12);
    expect(de).toBeCloseTo(13.1, 1);
  });

  it("1D Solver: accurately inverts Huebscher equation", () => {
    const targetDe = 14.2;
    const height = 10;
    const width = solveRectangularDimension(targetDe, height);
    const verifyDe = huebscherEquivalentRound(width, height);
    expect(verifyDe).toBeCloseTo(targetDe, 1);
  });

  it("Velocity Categorization: matches SMACNA comfort thresholds", () => {
    expect(getVelocityCategory(600)).toBe("quiet");
    expect(getVelocityCategory(700)).toBe("quiet");
    expect(getVelocityCategory(850)).toBe("moderate");
    expect(getVelocityCategory(1200)).toBe("noisy");
  });

  it("Handles zero and boundary conditions safely", () => {
    expect(calculateRoundDiameter(0, 0.08)).toBe(0);
    expect(calculateVelocityFpm(0, 12)).toBe(0);
    expect(calculateVelocityFpm(1000, 0)).toBe(0);
  });
});
