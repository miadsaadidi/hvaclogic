import { describe, it, expect } from "vitest";
import { calculateHeatPumpSizing, getHeatPumpCapacityAtTemp, getBuildingHeatLossAtTemp } from "./heat-pump";

describe("Heat Pump Sizing & Thermal Balance Point Engine", () => {
  it("calculates 3-ton Cold Climate Inverter balance point and aux heat strip accurately", () => {
    // 3 Tons = 36k cooling, 37.8k heating @ 47°F
    // Design heat loss: 40,000 BTU at 5°F outdoor design
    const res = calculateHeatPumpSizing({
      nominalTonnage: 3.0,
      compressorType: "inverter_cold_climate",
      outdoorDesignTempF: 5,
      designHeatingLossBtu: 40000,
      designCoolingLoadBtu: 34000,
    });

    expect(res.nominalTonnage).toBe(3.0);
    expect(res.nominalHeatingBtu47F).toBe(37800);
    expect(res.isColdClimateQualified).toBe(true);
    expect(res.thermalBalancePointF).toBeGreaterThan(15);
    expect(res.thermalBalancePointF).toBeLessThan(30);
    expect(res.recommendedAuxHeatStripKw).toBeGreaterThanOrEqual(5);
  });

  it("evaluates single-stage heat pump severe low-ambient capacity drop", () => {
    // Single stage drops to 35% at 5°F
    const cap47 = getHeatPumpCapacityAtTemp(36000, 47, "single_stage_standard");
    const cap5 = getHeatPumpCapacityAtTemp(36000, 5, "single_stage_standard");

    expect(cap47).toBe(36000);
    expect(cap5).toBe(12600); // 36,000 * 0.35 = 12,600 BTU
  });

  it("calculates building heat loss slope accurately", () => {
    // 40,000 BTU loss at 10°F (Delta T = 60°F from 70°F)
    // At 40°F (Delta T = 30°F), loss should be exactly 20,000 BTU
    const loss40 = getBuildingHeatLossAtTemp(40000, 10, 40, 70);
    expect(loss40).toBe(20000);
  });
});
