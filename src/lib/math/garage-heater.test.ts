import { describe, it, expect } from "vitest";
import {
  calculateGarageHeater,
  GarageHeaterInput,
} from "./garage-heater";

describe("Garage & Workshop Heater Sizing Engine", () => {
  it("sizes heater for standard 2-car garage with exact reproducible arithmetic (10°F outdoor)", () => {
    const input: GarageHeaterInput = {
      preset: "2_car", // 22x24 = 528 sq ft, 9ft ceiling
      ceilingHeightFt: 9,
      isAttached: true,
      insulationLevel: "average", // R-13 walls (U=0.07), R-19 ceiling (U=0.045), R-6 door (U=0.20), F_slab=0.50, ACH=0.45
      targetIndoorTempF: 60,
      outdoorDesignTempF: 10, // Delta T = 50°F
      warmupMarginPercent: 10,
    };

    const res = calculateGarageHeater(input);

    expect(res.floorAreaSqFt).toBe(528);
    expect(res.volumeCuFt).toBe(4752);
    expect(res.temperatureDifferenceDeltaT).toBe(50);

    // Individual component losses
    expect(res.overheadDoorLossBtu).toBe(1120); // 112 sq ft * 0.20 * 50
    expect(res.wallLossBtu).toBe(1750); // 500 sq ft net * 0.07 * 50
    expect(res.ceilingLossBtu).toBe(1188); // 528 sq ft * 0.045 * 50
    expect(res.slabEdgeLossBtu).toBe(2300); // 92 ft * 0.50 * 50
    expect(res.infiltrationLossBtu).toBe(1925); // 1.08 * 35.64 CFM * 50 = 1924.56 -> 1925

    // Base steady state and margin
    expect(res.baseSteadyStateLossBtu).toBe(8283);
    expect(res.warmupMarginBtu).toBe(828); // 8283 * 0.10 = 828.3 -> 828
    expect(res.totalPeakHeatLossBtu).toBe(9111);

    // Equipment selection
    expect(res.requiredElectricKw).toBe(2.67);
    expect(res.recommendedElectricHeaterKw).toBe(3.0);
    expect(res.recommendedElectricAmps240V).toBe(12.5); // 3000W / 240V
    expect(res.minimumCircuitAmpacity).toBe(15.6); // 12.5A * 1.25
    expect(res.recommendedCircuitBreakerAmps).toBe(20);

    expect(res.requiredGasOutputBtu).toBe(9111);
    expect(res.requiredGasInputBtu).toBe(11111); // 9111 / 0.82
    expect(res.recommendedGasHeaterBtu).toBe(30000); // Smallest standard gas unit heater tier
    expect(res.deliveredGasOutputBtu).toBe(24600); // 30000 * 0.82
  });

  it("handles 0% warm-up margin for pure steady-state sizing", () => {
    const input: GarageHeaterInput = {
      preset: "2_car",
      ceilingHeightFt: 9,
      isAttached: true,
      insulationLevel: "average",
      targetIndoorTempF: 60,
      outdoorDesignTempF: 10,
      warmupMarginPercent: 0,
    };

    const res = calculateGarageHeater(input);
    expect(res.warmupMarginBtu).toBe(0);
    expect(res.totalPeakHeatLossBtu).toBe(res.baseSteadyStateLossBtu);
    expect(res.totalPeakHeatLossBtu).toBe(8283);
  });

  it("handles large uninsulated pole barn shop with high ceiling (14ft) and recommends radiant tube", () => {
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
    expect(res.volumeCuFt).toBe(16800);
    expect(res.isRadiantRecommended).toBe(true);
    expect(res.totalPeakHeatLossBtu).toBeGreaterThan(80000);
    expect(res.recommendedGasHeaterBtu).toBeGreaterThanOrEqual(100000);
  });

  it("allows custom infiltration ACH override", () => {
    const input: GarageHeaterInput = {
      preset: "2_car",
      ceilingHeightFt: 9,
      isAttached: true,
      insulationLevel: "average",
      targetIndoorTempF: 60,
      outdoorDesignTempF: 10,
      infiltrationAch: 1.0, // High draft
    };

    const res = calculateGarageHeater(input);
    expect(res.infiltrationCfm).toBe(79.2); // (4752 * 1.0) / 60
    expect(res.infiltrationLossBtu).toBe(4277); // 1.08 * 79.2 * 50 = 4276.8 -> 4277
  });
});
