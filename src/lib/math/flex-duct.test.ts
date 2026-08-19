import { describe, it, expect } from "vitest";
import { generateFlexDuctMatrix, findRecommendedFlexDuct } from "./flex-duct";

describe("Flexible Duct CFM & Friction Engine", () => {
  it("generates 12 standard diameters across 4 friction rates at 4% compression", () => {
    const matrix = generateFlexDuctMatrix(4);
    expect(matrix.rows.length).toBe(12);

    // 6" flex duct at 4% sag and 0.08 friction
    const row6 = matrix.rows.find((r) => r.diameterInches === 6);
    expect(row6).toBeDefined();
    expect(row6!.cfmAt008).toBe(84); // 90 * 0.93 = ~84 CFM
    expect(row6!.cfmAt010).toBe(98);

    // 8" flex duct at 4% sag and 0.10 friction
    const row8 = matrix.rows.find((r) => r.diameterInches === 8);
    expect(row8!.cfmAt010).toBe(205); // 220 * 0.93 = 205 CFM
  });

  it("applies 15% and 30% sag compression penalties accurately", () => {
    const matStretched = generateFlexDuctMatrix(0);
    const matSag15 = generateFlexDuctMatrix(15);
    const matSag30 = generateFlexDuctMatrix(30);

    const cfm6Stretched = matStretched.rows.find((r) => r.diameterInches === 6)!.cfmAt008;
    const cfm6Sag15 = matSag15.rows.find((r) => r.diameterInches === 6)!.cfmAt008;
    const cfm6Sag30 = matSag30.rows.find((r) => r.diameterInches === 6)!.cfmAt008;

    expect(cfm6Stretched).toBe(90);
    expect(cfm6Sag15).toBe(70); // 90 * 0.78 = 70 CFM
    expect(cfm6Sag30).toBe(59); // 90 * 0.65 = ~59 CFM
  });

  it("finds the ideal flexible duct size for target CFM requirements", () => {
    // Sizing for a bedroom requiring 150 CFM at 0.08 friction, 4% sag
    const res = findRecommendedFlexDuct(150, 0.08, 4);
    expect(res.recommendedDiameter).toBe(8); // 8" delivers 177 CFM
    expect(res.isAdequate).toBe(true);
  });
});
