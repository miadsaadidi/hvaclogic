import { describe, it, expect } from "vitest";
import {
  calculateFilterSizing,
  FilterSizingInput,
} from "./filter-sizing";

describe("Filter Sizing & Airflow Resistance Engine", () => {
  it("calculates standard 16x25x1 MERV 8 at 1,000 CFM", () => {
    const input: FilterSizingInput = {
      airflowCfm: 1000,
      filterWidthInches: 16,
      filterHeightInches: 25,
      filterDepthInches: 1,
      filterCount: 1,
      mervRating: "merv_8",
    };

    const res = calculateFilterSizing(input);
    // Face area = (16 * 25) / 144 = 2.777 -> 2.78 sq ft
    expect(res.totalFaceAreaSqFt).toBe(2.78);
    // FPM = 1000 / 2.78 = ~360 FPM
    expect(res.faceVelocityFpm).toBeCloseTo(360, -1);
    // Clean drop for MERV 8 at 360 FPM
    expect(res.initialCleanPressureDropInWg).toBeGreaterThan(0.12);
    expect(res.initialCleanPressureDropInWg).toBeLessThan(0.20);
  });

  it("evaluates resistance when installing 1-inch MERV 13 on 1,400 CFM (3.5 Ton) system", () => {
    const input: FilterSizingInput = {
      airflowCfm: 1400,
      filterWidthInches: 16,
      filterHeightInches: 20, // 2.22 sq ft
      filterDepthInches: 1,
      filterCount: 1,
      mervRating: "merv_13",
    };

    const res = calculateFilterSizing(input);
    // FPM = 1400 / 2.22 = 630 FPM (excessive)
    expect(res.faceVelocityFpm).toBeGreaterThan(500);
    expect(res.velocityStatus).toBe("excessive");
    expect(res.initialCleanPressureDropInWg).toBeGreaterThan(0.30);
    expect(res.pressureDropStatus).toBe("severe_choke");
  });

  it("calculates lower static pressure drop for 4-inch deep media at equivalent airflow", () => {
    const input: FilterSizingInput = {
      airflowCfm: 1200,
      filterWidthInches: 20,
      filterHeightInches: 25, // 3.47 sq ft
      filterDepthInches: 4, // 4-inch media
      filterCount: 1,
      mervRating: "merv_13",
    };

    const res = calculateFilterSizing(input);
    // FPM = 1200 / 3.47 = 346 FPM
    expect(res.faceVelocityFpm).toBeLessThan(400);
    // 4" depthFactor is 0.38 -> drop should be ~0.11" w.g. instead of ~0.30" w.g.
    expect(res.initialCleanPressureDropInWg).toBeLessThan(0.16);
    expect(res.pressureDropStatus).toBe("moderate");
  });

  it("models parallel filter grilles correctly", () => {
    const input: FilterSizingInput = {
      airflowCfm: 1400,
      filterWidthInches: 16,
      filterHeightInches: 20,
      filterDepthInches: 1,
      filterCount: 2, // 2 parallel grilles = 4.44 sq ft
      mervRating: "merv_11",
    };

    const res = calculateFilterSizing(input);
    expect(res.totalFaceAreaSqFt).toBe(4.44);
    expect(res.faceVelocityFpm).toBeCloseTo(315, -1);
    expect(res.initialCleanPressureDropInWg).toBeLessThan(0.25);
  });
});
