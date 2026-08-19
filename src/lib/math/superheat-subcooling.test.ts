import { describe, it, expect } from "vitest";
import {
  calculateTargetSuperheat,
  calculateChargingDiagnostic,
} from "./superheat-subcooling";
import {
  getRefrigerantSaturationTemp,
  getRefrigerantSaturationPressure,
} from "./refrigerants";

describe("Refrigerant PT Saturation Engine (GOLD-PT-01)", () => {
  it("interpolates saturation temperatures accurately against NIST tables", () => {
    // R-410A
    expect(getRefrigerantSaturationTemp("r410a", 118.0)).toBeCloseTo(40.0, 1);
    expect(getRefrigerantSaturationTemp("r410a", 335.0)).toBeCloseTo(103.5, 1);

    // R-32
    expect(getRefrigerantSaturationTemp("r32", 120.0)).toBeCloseTo(38.6, 1);
    expect(getRefrigerantSaturationTemp("r32", 340.0)).toBeCloseTo(102.1, 1);

    // R-454B (Zeotropic Glide: Bubble for Liquid, Dew for Vapor)
    expect(getRefrigerantSaturationTemp("r454b", 335.0, "bubble")).toBeCloseTo(104.2, 1);
    expect(getRefrigerantSaturationTemp("r454b", 118.0, "dew")).toBeCloseTo(41.5, 1);

    // R-22 Legacy
    expect(getRefrigerantSaturationTemp("r22", 68.5)).toBeCloseTo(40.0, 1);
    expect(getRefrigerantSaturationTemp("r22", 226.0)).toBeCloseTo(110.0, 1);

    // R-134a
    expect(getRefrigerantSaturationTemp("r134a", 35.0)).toBeCloseTo(40.0, 1);
    expect(getRefrigerantSaturationTemp("r134a", 124.0)).toBeCloseTo(100.0, 1);
  });

  it("performs inverse pressure lookups accurately", () => {
    expect(getRefrigerantSaturationPressure("r410a", 40.0)).toBeCloseTo(118.0, 0);
  });
});

describe("Superheat & Subcooling Diagnostic Tool (GOLD-SHSC-01)", () => {
  it("calculates Fixed Orifice Target Superheat formula accurately", () => {
    // Target SH = (3 * 67 - 95 - 80) / 2 = (201 - 175) / 2 = 13.0°F
    const target = calculateTargetSuperheat(67, 95);
    expect(target).toBe(13.0);
  });

  it("evaluates Golden Reference Fixed Orifice charging test (Optimal)", () => {
    const result = calculateChargingDiagnostic({
      meteringDevice: "fixed_orifice",
      refrigerantId: "r410a",
      suctionPressurePsig: 118.0, // Saturation = 40.0°F
      suctionLineTempF: 54.0, // Actual SH = 14.0°F
      indoorWetBulbF: 67.0,
      outdoorDryBulbF: 95.0, // Target SH = 13.0°F
    });

    expect(result.evaporatorSatTempF).toBe(40.0);
    expect(result.actualSuperheatF).toBe(14.0);
    expect(result.targetSuperheatF).toBe(13.0);
    expect(result.superheatDeltaF).toBe(1.0);
    expect(result.diagnostic.status).toBe("optimal");
  });

  it("evaluates Golden Reference TXV R-454B with Zeotropic Glide (Optimal)", () => {
    const result = calculateChargingDiagnostic({
      meteringDevice: "txv_eev",
      refrigerantId: "r454b",
      suctionPressurePsig: 118.0, // Dew = 41.5°F
      suctionLineTempF: 52.0, // Actual SH = 10.5°F
      liquidPressurePsig: 335.0, // Bubble = 104.2°F
      liquidLineTempF: 94.0, // Actual SC = 10.2°F
      targetSubcoolingF: 10.0,
    });

    expect(result.evaporatorSatTempF).toBe(41.5);
    expect(result.condenserSatTempF).toBe(104.2);
    expect(result.actualSuperheatF).toBe(10.5);
    expect(result.actualSubcoolingF).toBe(10.2);
    expect(result.diagnostic.status).toBe("optimal");
    expect(result.refrigerant.isA2L).toBe(true);
  });

  it("diagnoses Liquid Line Restriction (High SH + High SC)", () => {
    const result = calculateChargingDiagnostic({
      meteringDevice: "txv_eev",
      refrigerantId: "r410a",
      suctionPressurePsig: 105.0, // Sat = 35.5°F
      suctionLineTempF: 65.0, // Actual SH = 29.5°F (High)
      liquidPressurePsig: 375.0, // Sat = 112.1°F
      liquidLineTempF: 90.0, // Actual SC = 22.1°F (High)
      targetSubcoolingF: 10.0,
    });

    expect(result.diagnostic.status).toBe("restriction");
    expect(result.diagnostic.primaryDiagnosis).toContain("Restriction");
  });

  it("diagnoses Refrigerant Undercharge (High SH + Low SC)", () => {
    const result = calculateChargingDiagnostic({
      meteringDevice: "txv_eev",
      refrigerantId: "r410a",
      suctionPressurePsig: 100.0, // Sat = 36.5°F
      suctionLineTempF: 65.0, // Actual SH = 28.5°F (High)
      liquidPressurePsig: 250.0, // Sat = 87.7°F
      liquidLineTempF: 84.0, // Actual SC = 3.7°F (Low vs 10.0°F)
      targetSubcoolingF: 10.0,
    });

    expect(result.diagnostic.status).toBe("undercharged");
    expect(result.diagnostic.primaryDiagnosis).toContain("Undercharge");
  });

  it("diagnoses Low Evaporator Airflow (Low SH + Low SC)", () => {
    const result = calculateChargingDiagnostic({
      meteringDevice: "txv_eev",
      refrigerantId: "r410a",
      suctionPressurePsig: 100.0, // Sat = 36.5°F
      suctionLineTempF: 40.0, // Actual SH = 3.5°F (Low)
      liquidPressurePsig: 275.0, // Sat = 94.0°F
      liquidLineTempF: 89.0, // Actual SC = 5.0°F (Low vs 10.0°F)
      targetSubcoolingF: 10.0,
    });

    expect(result.diagnostic.status).toBe("low_airflow");
    expect(result.diagnostic.primaryDiagnosis).toContain("Airflow");
  });
});
