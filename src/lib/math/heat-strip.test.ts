import { describe, it, expect } from "vitest";
import {
  calculateHeatStripSizing,
  getRecommendedWireGauge,
  getNextStandardBreaker,
  selectStandardHeatStripKw,
  HeatStripInput,
} from "./heat-strip";

describe("Heat Pump Auxiliary Electric Heat Strip Computational Engine", () => {
  it("sizes supplemental resistance heating for 45,000 BTU loss with 24,000 BTU heat pump output", () => {
    const input: HeatStripInput = {
      designHeatLossBtu: 45000,
      heatPumpCapacityAtDesignBtu: 24000,
      nominalTonnage: 3.0,
      sizingObjective: "supplemental_deficit",
      systemAirflowCfm: 1200,
      voltage: 240,
      phase: 1,
    };

    const res = calculateHeatStripSizing(input);

    // Deficit = 45,000 - 24,000 = 21,000 BTU/hr
    // Required kW = 21,000 / 3412.142 ≈ 6.15 kW -> Nearest standard is 8.0 kW (or 7.5kW)
    expect(res.netHeatingDeficitBtu).toBe(21000);
    expect(res.exactRequiredKw).toBeCloseTo(6.15, 1);
    expect(res.selectedStandardKw).toBe(7.5);
    expect(res.totalDeliveredBtu).toBe(Math.round(7.5 * 3412.142));
    expect(res.coveragePercentage).toBeGreaterThanOrEqual(100);

    // Electrical checks at 240V 1-phase
    // FLA = 7.5 * 1000 / 240 = 31.25A -> MCA = 31.25 * 1.25 = 39.06A -> 40A or 45A breaker
    expect(res.totalFlaAmps).toBe(31.3);
    expect(res.totalMcaAmps).toBe(39.1);
    expect(res.totalMopdBreakerAmps).toBe(40);
    expect(res.isMultiCircuitRequired).toBe(false);
    expect(res.circuitBranches.length).toBe(1);
    expect(res.circuitBranches[0].wireGaugeAwg).toBe("8 AWG Cu");

    // Airflow checks (1200 CFM with 7.5 kW)
    // Min required = 7.5 * 45 = 338 CFM
    expect(res.airflowStatus).toBe("Adequate");
    expect(res.estimatedTempRiseF).toBeLessThan(30);
  });

  it("handles 100% emergency backup mode with NEC multi-circuit partitioning (>48A FLA)", () => {
    const input: HeatStripInput = {
      designHeatLossBtu: 50000,
      heatPumpCapacityAtDesignBtu: 0, // Compressor failure scenario
      sizingObjective: "full_emergency_backup",
      voltage: 240,
      phase: 1,
    };

    const res = calculateHeatStripSizing(input);

    // Required kW = 50,000 / 3412.142 ≈ 14.65 kW -> Standard size is 15.0 kW
    expect(res.exactRequiredKw).toBeCloseTo(14.65, 1);
    expect(res.selectedStandardKw).toBe(15.0);

    // FLA = 15,000 / 240 = 62.5A (> 48A FLA threshold per NEC 424.22)
    expect(res.totalFlaAmps).toBe(62.5);
    expect(res.isMultiCircuitRequired).toBe(true);
    expect(res.circuitBranches.length).toBe(2);

    // Branch 1: 10 kW (FLA = 41.7A, MCA = 52.1A -> 60A breaker, 6 AWG Cu)
    // Branch 2: 5 kW (FLA = 20.8A, MCA = 26.0A -> 30A breaker, 10 AWG Cu)
    expect(res.circuitBranches[0].assignedKw).toBe(10);
    expect(res.circuitBranches[0].breakerAmps).toBe(60);
    expect(res.circuitBranches[0].wireGaugeAwg).toBe("6 AWG Cu");

    expect(res.circuitBranches[1].assignedKw).toBe(5);
    expect(res.circuitBranches[1].breakerAmps).toBe(30);
    expect(res.circuitBranches[1].wireGaugeAwg).toBe("10 AWG Cu");

    expect(res.recommendedStages).toBe(3);
  });

  it("calculates defrost cycle tempering capacity correctly", () => {
    const input: HeatStripInput = {
      designHeatLossBtu: 36000,
      heatPumpCapacityAtDesignBtu: 30000,
      nominalTonnage: 3.0,
      sizingObjective: "defrost_tempering",
    };

    const res = calculateHeatStripSizing(input);

    // Defrost penalty = 3.0 tons * 12,000 * 0.75 = 27,000 BTU/hr ≈ 7.91 kW -> Standard 8.0 kW
    expect(res.defrostTemperingKw).toBeCloseTo(7.91, 1);
    expect(res.selectedStandardKw).toBe(8.0);
  });

  it("detects airflow starvation when CFM is below safe thermal rise limits", () => {
    const input: HeatStripInput = {
      designHeatLossBtu: 50000,
      heatPumpCapacityAtDesignBtu: 0,
      nominalTonnage: 4.0,
      sizingObjective: "full_emergency_backup",
      systemAirflowCfm: 400, // Starved airflow for a 15 kW element (needs ~675 CFM)
    };

    const res = calculateHeatStripSizing(input);
    expect(res.airflowStatus).toBe("Critical Starvation");
    expect(res.estimatedTempRiseF).toBeGreaterThan(100);
  });

  it("utility helpers: selectStandardHeatStripKw, getNextStandardBreaker, getRecommendedWireGauge", () => {
    expect(selectStandardHeatStripKw(4.2)).toBe(4.8);
    expect(selectStandardHeatStripKw(9.2)).toBe(9.6);
    expect(selectStandardHeatStripKw(18.5)).toBe(19.2);

    expect(getNextStandardBreaker(28)).toBe(30);
    expect(getNextStandardBreaker(54)).toBe(60);
    expect(getNextStandardBreaker(92)).toBe(100);

    expect(getRecommendedWireGauge(18)).toBe("12 AWG Cu");
    expect(getRecommendedWireGauge(45)).toBe("8 AWG Cu");
    expect(getRecommendedWireGauge(80)).toBe("4 AWG Cu");
  });
});
