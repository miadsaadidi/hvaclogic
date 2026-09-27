import { describe, it, expect } from "vitest";
import {
  calculateCylinderFillWeight,
  calculateGlideCompensatedState,
  evaluateVacuumDecay,
  validateToolCompliance,
  RecoveryCylinderSpec,
} from "./a2l-field-service";

describe("A2L Field Service & Recovery Calculation Engine", () => {
  describe("DOT / AHRI Guideline K Recovery Cylinder Sizing", () => {
    const standard30LbCylinder: RecoveryCylinderSpec = {
      nominalWaterCapacityLb: 30, // 30 lb WC
      tareWeightLb: 16.5,
      dotRating: "DOT-4BA400",
    };

    const legacy350Cylinder: RecoveryCylinderSpec = {
      nominalWaterCapacityLb: 30,
      tareWeightLb: 16.5,
      dotRating: "DOT-4BA350",
    };

    it("correctly calculates R-454B fill weight limit at 80% capacity", () => {
      // 0.80 * 30 * 0.88 = 21.12 lb -> 21.1 lb
      const result = calculateCylinderFillWeight(standard30LbCylinder, "r-454b");
      expect(result.maxRefrigerantWeightLb).toBeCloseTo(21.1, 1);
      expect(result.maxGrossWeightLb).toBeCloseTo(37.6, 1);
      expect(result.isDotCompliantForA2L).toBe(true);
      expect(result.valveThreadSpec).toContain("CGA 164");
    });

    it("correctly calculates R-32 fill weight limit at 80% capacity", () => {
      // 0.80 * 30 * 0.83 = 19.92 lb -> 19.9 lb
      const result = calculateCylinderFillWeight(standard30LbCylinder, "r-32");
      expect(result.maxRefrigerantWeightLb).toBeCloseTo(19.9, 1);
      expect(result.maxGrossWeightLb).toBeCloseTo(36.4, 1);
      expect(result.isDotCompliantForA2L).toBe(true);
      expect(result.valveThreadSpec).toContain("CGA 166");
    });

    it("flags non-compliant DOT-4BA350 cylinders for A2L service", () => {
      const result = calculateCylinderFillWeight(legacy350Cylinder, "r-454b");
      expect(result.isDotCompliantForA2L).toBe(false);
      expect(result.reliefValveSettingPsig).toBe(350);
    });
  });

  describe("Zeotropic Glide & State-Point Mechanics", () => {
    it("evaluates R-454B temperature glide and separates dew vs bubble points", () => {
      const result = calculateGlideCompensatedState({
        refrigerantId: "r-454b",
        suctionPressurePsig: 110,
        suctionLineTempF: 65,
        liquidPressurePsig: 350,
        liquidLineTempF: 95,
      });

      expect(result.isZeotropic).toBe(true);
      expect(result.temperatureGlideF).toBe(2.7);
      expect(result.superheatReference).toBe("Dew Point");
      expect(result.subcoolingReference).toBe("Bubble Point");
      expect(result.chargingStateRequired).toBe("Liquid Only");
      expect(result.technicianErrorIfMidpointUsedF).toBeGreaterThan(1.0);
    });

    it("evaluates R-32 as a pure fluid with zero glide", () => {
      const result = calculateGlideCompensatedState({
        refrigerantId: "r-32",
        suctionPressurePsig: 110,
        suctionLineTempF: 65,
        liquidPressurePsig: 350,
        liquidLineTempF: 95,
      });

      expect(result.isZeotropic).toBe(false);
      expect(result.temperatureGlideF).toBe(0.0);
      expect(result.technicianErrorIfMidpointUsedF).toBe(0);
      expect(result.chargingStateRequired).toBe("Vapor or Liquid");
    });
  });

  describe("Vacuum Decay & Dehydration Diagnostics", () => {
    it("passes dry hermetic vacuum hold below 500 microns", () => {
      const result = evaluateVacuumDecay({
        initialMicrons: 350,
        tenMinuteHoldMicrons: 420,
        durationMinutes: 10,
      });

      expect(result.status).toBe("PASSED_DEEP_VACUUM");
      expect(result.isEvacuationCompliant).toBe(true);
    });

    it("identifies moisture presence when vacuum stabilizes between 500 and 1,000 microns", () => {
      const result = evaluateVacuumDecay({
        initialMicrons: 400,
        tenMinuteHoldMicrons: 780,
        durationMinutes: 10,
      });

      expect(result.status).toBe("MOISTURE_INDICATION");
      expect(result.isEvacuationCompliant).toBe(false);
      expect(result.recommendation).toContain("Oxygen-Free Nitrogen");
    });

    it("detects active hermetic leak when vacuum decays past 1,000 microns", () => {
      const result = evaluateVacuumDecay({
        initialMicrons: 450,
        tenMinuteHoldMicrons: 2200,
        durationMinutes: 10,
      });

      expect(result.status).toBe("ACTIVE_LEAK");
      expect(result.isEvacuationCompliant).toBe(false);
    });
  });

  describe("Tooling & Instrument Verification", () => {
    it("validates certified brushless spark-proof recovery machine", () => {
      const result = validateToolCompliance({
        toolType: "recovery_machine",
        isSparkProof: true,
        hasBrushlessMotorOrSealedSwitch: true,
        ratedForA2L: true,
        fittingType: "left_hand_reverse",
        workingPressureRatingPsig: 850,
      });

      expect(result.isCompliant).toBe(true);
      expect(result.deficiencies.length).toBe(0);
    });

    it("flags non-compliant brushed motor tool without A2L certification", () => {
      const result = validateToolCompliance({
        toolType: "recovery_machine",
        isSparkProof: false,
        hasBrushlessMotorOrSealedSwitch: false,
        ratedForA2L: false,
        fittingType: "standard_right_hand",
        workingPressureRatingPsig: 500,
      });

      expect(result.isCompliant).toBe(false);
      expect(result.deficiencies.length).toBeGreaterThan(1);
    });
  });
});
