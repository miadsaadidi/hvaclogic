import { describe, it, expect } from "vitest";
import { calculateFurnaceBtu } from "./furnace-btu";

describe("Furnace BTU & Heating Sizing Engine", () => {
  it("calculates baseline 2,000 sq ft furnace sizing screening estimate in Zone 4 at 96% AFUE", () => {
    // 2000 sq ft * 50 BTU/sqft = 100,000 BTU estimated load
    // Approximate input = 100,000 / 0.96 ≈ 104,167 BTU
    const res = calculateFurnaceBtu({
      floorAreaSqFt: 2000,
      climateZone: 4,
      afueRatingPercent: 96,
      insulationGrade: "average",
      ceilingHeightFeet: 8,
      temperatureRiseF: 45,
    });

    expect(res.estimatedHeatingLoadBtu).toBe(100000);
    expect(res.approximateInputRequirementBtu).toBe(104167);
    expect(res.candidateNominalInputBtu).toBe(120000);
    expect(res.candidateNominalRange).toContain("100k to 120k");
    expect(res.flueExhaustType).toBe("PVC / CPVC Direct Vent (Condensing)");
    expect(res.theoreticalHeatingCfm).toBe(2058); // 100000 / (1.08 * 45) ≈ 2058 CFM
  });

  it("calculates 80% non-condensing furnace input and flue exhaust type correctly", () => {
    // 1500 sq ft * 40 BTU/sqft (Zone 3) = 60,000 BTU estimated load
    // Approximate input @ 80% = 60,000 / 0.80 = 75,000 BTU
    const res = calculateFurnaceBtu({
      floorAreaSqFt: 1500,
      climateZone: 3,
      afueRatingPercent: 80,
      insulationGrade: "average",
    });

    expect(res.estimatedHeatingLoadBtu).toBe(60000);
    expect(res.approximateInputRequirementBtu).toBe(75000);
    expect(res.candidateNominalInputBtu).toBe(80000);
    expect(res.flueExhaustType).toBe("Metal B-Vent Chimney");
  });

  it("applies bounded ceiling height and documented insulation multipliers accurately", () => {
    // 2000 sq ft, Zone 4 (50 BTU/sqft)
    // 10ft ceiling: 1 + (10 - 8) * 0.04 = 1.08
    // Good insulation: 0.85
    // Net Load = 2000 * 50 * 1.08 * 0.85 = 91,800 BTU
    const res = calculateFurnaceBtu({
      floorAreaSqFt: 2000,
      climateZone: 4,
      ceilingHeightFeet: 10,
      insulationGrade: "good",
      afueRatingPercent: 96,
    });

    expect(res.estimatedHeatingLoadBtu).toBe(91800);
    expect(res.approximateInputRequirementBtu).toBe(Math.round(91800 / 0.96));
  });
});
