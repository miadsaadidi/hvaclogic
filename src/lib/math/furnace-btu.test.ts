import { describe, it, expect } from "vitest";
import { calculateFurnaceBtu } from "./furnace-btu";

describe("Furnace BTU & Heating Sizing Engine", () => {
  it("calculates baseline 2,000 sq ft furnace sizing in Zone 4 at 96% AFUE accurately", () => {
    // 2000 sq ft * 50 BTU/sqft = 100,000 BTU net heat loss
    // Output BTU = 100,000. Input BTU = 100,000 / 0.96 = ~104,167 BTU
    const res = calculateFurnaceBtu({
      floorAreaSqFt: 2000,
      climateZone: 4,
      afueRatingPercent: 96,
      insulationGrade: "average",
      ceilingHeightFeet: 8,
      temperatureRiseF: 45,
    });

    expect(res.netHeatLossBtu).toBe(100000);
    expect(res.requiredOutputBtu).toBe(100000);
    expect(res.requiredInputBtu).toBe(104167);
    expect(res.nominalFurnaceModelBtu).toBe(120000);
    expect(res.flueExhaustType).toBe("PVC / CPVC Direct Vent (Condensing)");
    expect(res.requiredHeatingCfm).toBe(2058); // 100000 / (1.08 * 45) = ~2058 CFM
  });

  it("calculates 80% non-condensing furnace input and flue exhaust type correctly", () => {
    // 1500 sq ft * 40 BTU/sqft (Zone 3) = 60,000 BTU net loss
    // Input BTU @ 80% = 60,000 / 0.80 = 75,000 BTU
    const res = calculateFurnaceBtu({
      floorAreaSqFt: 1500,
      climateZone: 3,
      afueRatingPercent: 80,
      insulationGrade: "average",
    });

    expect(res.netHeatLossBtu).toBe(60000);
    expect(res.requiredInputBtu).toBe(75000);
    expect(res.nominalFurnaceModelBtu).toBe(80000);
    expect(res.flueExhaustType).toBe("Metal B-Vent Chimney");
  });

  it("applies ceiling height and insulation grade multipliers accurately", () => {
    // 2000 sq ft, Zone 4 (50 BTU), 10ft ceiling (10/8 = 1.25), good insulation (0.88)
    // 2000 * 50 * 1.25 * 0.88 = 110,000 BTU
    const res = calculateFurnaceBtu({
      floorAreaSqFt: 2000,
      climateZone: 4,
      ceilingHeightFeet: 10,
      insulationGrade: "good",
      afueRatingPercent: 96,
    });

    expect(res.netHeatLossBtu).toBe(110000);
  });
});
