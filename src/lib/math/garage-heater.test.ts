import { describe, it, expect } from "vitest";
import {
  calculateGarageHeater,
  GarageHeaterInput,
} from "./garage-heater";

describe("Garage & Workshop Heater Sizing Engine", () => {
  it("sizes heater for standard 2-car garage in cold climate (10°F outdoor)", () => {
    const input: GarageHeaterInput = {
      preset: "2_car", // 22x24 = 528 sq ft
      ceilingHeightFt: 9,
      isAttached: true,
      insulationLevel: "average", // R-13 walls, R-19 ceiling, R-6 door
      targetIndoorTempF: 60,
      outdoorDesignTempF: 10, // Delta T = 50°F
    };

    const res = calculateGarageHeater(input);
    expect(res.floorAreaSqFt).toBe(528);
    expect(res.totalPeakHeatLossBtu).toBeGreaterThan(8000);
    expect(res.totalPeakHeatLossBtu).toBeLessThan(25000);
    expect(res.recommendedGasHeaterBtu).toBe(30000);
    expect(res.recommendedElectricHeaterKw).toBe(3.0);
    expect(res.recommendedCircuitBreakerAmps).toBe(20);
  });

  it("handles large uninsulated pole barn shop with high ceiling", () => {
    const input: GarageHeaterInput = {
      preset: "pole_barn_shop", // 30x40 = 1,200 sq ft
      ceilingHeightFt: 14,
      isAttached: false,
      insulationLevel: "uninsulated",
      targetIndoorTempF: 65,
      outdoorDesignTempF: 0, // Delta T = 65°F
    };

    const res = calculateGarageHeater(input);
    expect(res.floorAreaSqFt).toBe(1200);
    expect(res.isRadiantRecommended).toBe(true);
    expect(res.recommendedGasHeaterBtu).toBeGreaterThanOrEqual(100000);
  });
});
