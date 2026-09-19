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

  it("calculates dual-fuel economic switchover balance point and fuel parity COP correctly", () => {
    // Electricity: $0.16/kWh, Gas: $1.40/therm, AFUE: 0.95
    // Parity COP = 29.3071 * 0.95 * (0.16 / 1.40) ≈ 3.18
    const res = calculateHeatPumpSizing({
      nominalTonnage: 3.0,
      compressorType: "inverter_cold_climate",
      outdoorDesignTempF: 5,
      designHeatingLossBtu: 40000,
      designCoolingLoadBtu: 34000,
      dualFuelEnabled: true,
      electricityRatePerKwh: 0.16,
      naturalGasRatePerTherm: 1.40,
      furnaceAfue: 0.95,
    });

    expect(res.economicCopThreshold).toBeCloseTo(3.18, 1);
    expect(res.economicBalancePointF).not.toBeNull();
    // Cold climate ccASHP COP is ~3.8 at 47°F and ~2.7 at 17°F, so economic balance point should be ~30°F
    expect(res.economicBalancePointF).toBeGreaterThanOrEqual(25);
    expect(res.economicBalancePointF).toBeLessThanOrEqual(35);
    // Thermal balance point is based on capacity vs load, whereas economic is based on fuel parity
    expect(res.thermalBalancePointF).not.toEqual(res.economicBalancePointF);
  });

  it("evaluates ACCA Manual S 3rd Edition sizing tolerances accurately", () => {
    // Inverter with 36k nominal cooling on 30k cooling load = 1.20 ratio (<= 1.30 -> Optimal)
    const optimalInverter = calculateHeatPumpSizing({
      nominalTonnage: 3.0,
      compressorType: "inverter_cold_climate",
      outdoorDesignTempF: 5,
      designHeatingLossBtu: 40000,
      designCoolingLoadBtu: 30000,
    });
    expect(optimalInverter.manualSOversizingStatus).toBe("Optimal (ACCA Manual S 3rd Ed)");

    // Inverter with 36k nominal cooling on 25k cooling load = 1.44 ratio (between 1.30 and 1.50 -> Addendum B heating priority)
    const heatingPriorityInverter = calculateHeatPumpSizing({
      nominalTonnage: 3.0,
      compressorType: "inverter_cold_climate",
      outdoorDesignTempF: 5,
      designHeatingLossBtu: 50000,
      designCoolingLoadBtu: 25000,
    });
    expect(heatingPriorityInverter.manualSOversizingStatus).toBe("Heating-Priority Sizing (Manual S Addendum B)");

    // Single-stage with 36k nominal on 25k load = 1.44 (> 1.30 -> Significantly Oversized)
    const oversizedSingleStage = calculateHeatPumpSizing({
      nominalTonnage: 3.0,
      compressorType: "single_stage_standard",
      outdoorDesignTempF: 20,
      designHeatingLossBtu: 35000,
      designCoolingLoadBtu: 25000,
    });
    expect(oversizedSingleStage.manualSOversizingStatus).toBe("Significantly Oversized (Risk of Low-Load Cycling)");
  });
});
