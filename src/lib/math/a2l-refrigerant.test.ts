import { describe, it, expect } from "vitest";
import {
  REFRIGERANT_DATABASE,
  calculateA2LChargeLimits,
  calculateGlideSuperheat,
  calculateGlideSubcooling,
} from "./a2l-refrigerant";

describe("A2L Low-GWP Refrigerant Engine (ASHRAE 15/34 & UL 60335-2-40)", () => {
  it("verifies thermodynamic and safety constants for R-454B", () => {
    const r454b = REFRIGERANT_DATABASE["r-454b"];
    expect(r454b).toBeDefined();
    expect(r454b.safetyGroup).toBe("A2L");
    expect(r454b.gwpAR5).toBe(466);
    expect(r454b.gwpAR4).toBe(465);
    expect(r454b.odp).toBe(0);
    expect(r454b.lflKgM3).toBe(0.303);
    expect(r454b.lflLbFt3).toBeCloseTo(0.018915, 5);
    expect(r454b.burningVelocityCmS).toBe(5.2);
    expect(r454b.temperatureGlideK).toBe(1.5);
    expect(r454b.chargingPhaseRequired).toBe("Liquid Only");
  });

  it("verifies thermodynamic and safety constants for R-32", () => {
    const r32 = REFRIGERANT_DATABASE["r-32"];
    expect(r32).toBeDefined();
    expect(r32.safetyGroup).toBe("A2L");
    expect(r32.gwpAR5).toBe(675);
    expect(r32.temperatureGlideK).toBe(0.0);
    expect(r32.fractionationRisk).toBe("None");
  });

  it("verifies thermodynamic constants for baseline R-410A", () => {
    const r410a = REFRIGERANT_DATABASE["r-410a"];
    expect(r410a).toBeDefined();
    expect(r410a.safetyGroup).toBe("A1");
    expect(r410a.gwpAR4).toBe(2088);
    expect(r410a.lflKgM3).toBe(0);
  });

  it("calculates unmitigated charge limit m1 correctly for R-454B in a 1,000 cu ft space", () => {
    const res = calculateA2LChargeLimits({
      refrigerantId: "r-454b",
      roomVolumeCuFt: 1000,
      ceilingHeightFt: 8,
    });

    // m1 = 0.20 × 0.018915 × 1000 = 3.783 lb => rounded to 3.78 lb
    expect(res.m1UnmitigatedChargeLb).toBe(3.78);
    expect(res.floorAreaSqFt).toBe(125);
    expect(res.refrigerant.name).toBe("R-454B");
  });

  it("evaluates residential compliance and minimum required room volume for a 5 lb system", () => {
    const res = calculateA2LChargeLimits({
      refrigerantId: "r-454b",
      roomVolumeCuFt: 1000, // m1 = 3.78 lb
      ceilingHeightFt: 8,
      systemTotalChargeLb: 5.0,
    });

    expect(res.isCompliantUnmitigated).toBe(false);
    expect(res.mitigationTierRequired).toBe("Tier 1: Continuous Airflow / Air Circulation");
    // V_min = 5.0 / (0.20 × 0.018915) = 1321.7 => 1322 cu ft
    expect(res.requiredMinVolumeUnmitigatedCuFt).toBe(1322);
    expect(res.requiredMinAreaUnmitigatedSqFt).toBe(165); // 1322 / 8 = 165 sq ft
  });

  it("evaluates residential compliance when system charge is under m1", () => {
    const res = calculateA2LChargeLimits({
      refrigerantId: "r-454b",
      roomVolumeCuFt: 2000, // m1 = 7.57 lb
      ceilingHeightFt: 8,
      systemTotalChargeLb: 5.0,
    });

    expect(res.isCompliantUnmitigated).toBe(true);
    expect(res.mitigationTierRequired).toBe("None (Unmitigated Compliant)");
  });

  it("handles non-flammable A1 refrigerant without restrictions", () => {
    const res = calculateA2LChargeLimits({
      refrigerantId: "r-410a",
      roomVolumeCuFt: 500,
      systemTotalChargeLb: 10.0,
    });

    expect(res.isCompliantUnmitigated).toBe(true);
    expect(res.m1UnmitigatedChargeLb).toBe(Infinity);
    expect(res.mitigationTierRequired).toBe("None (Unmitigated Compliant)");
  });

  it("throws error for unknown refrigerant", () => {
    expect(() =>
      calculateA2LChargeLimits({
        refrigerantId: "r-9999",
        roomVolumeCuFt: 1000,
      })
    ).toThrow("Unknown refrigerant ID: r-9999");
  });

  it("calculates zeotropic superheat using dew point", () => {
    // Suction line temperature = 52°F, Dew point at suction pressure = 42°F
    const res = calculateGlideSuperheat(52, 42);
    expect(res.superheatF).toBe(10);
    expect(res.explanation).toContain("DEW point");
  });

  it("calculates zeotropic subcooling using bubble point", () => {
    // Liquid line temperature = 95°F, Bubble point at head pressure = 105°F
    const res = calculateGlideSubcooling(95, 105);
    expect(res.subcoolingF).toBe(10);
    expect(res.explanation).toContain("BUBBLE point");
  });
});
