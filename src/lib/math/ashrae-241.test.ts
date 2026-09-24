import { describe, it, expect } from "vitest";
import {
  calculateAshrae241Compliance,
  ASHRAE_241_TABLE_5_1,
  BIOAEROSOL_FILTER_EFFICIENCIES,
  Ashrae241Input,
} from "./ashrae-241";

describe("ASHRAE Standard 241-2023 Computational Engine", () => {
  it("computes Table 5-1 required ECA for a standard classroom (ages 5-8)", () => {
    // Classroom: 25 occupants, 900 sq ft, 9 ft ceiling
    // ECA_p = 42.4 CFM/person -> 25 * 42.4 = 1060 CFM
    // ECA_a = 0.12 CFM/sq ft -> 900 * 0.12 = 108 CFM
    // Total Required = 1060 + 108 = 1168 CFM
    const input: Ashrae241Input = {
      spaceType: "classroom_age_5_8",
      floorAreaSqFt: 900,
      occupants: 25,
      ceilingHeightFt: 9,
      outdoorAirCfm: 300,
      recirculatedAirCfm: 1200,
      centralFilterMerv: "merv_13", // 85% capture -> 1020 CFM
    };

    const res = calculateAshrae241Compliance(input);

    expect(res.requiredPeopleEcaCfm).toBe(1060);
    expect(res.requiredAreaEcaCfm).toBe(108);
    expect(res.totalRequiredEcaCfm).toBe(1168);
    // Room volume = 900 * 9 = 8100 cu ft
    // Required ACH = (1168 * 60) / 8100 = 8.65 -> 8.7 ACH
    expect(res.requiredAchEquiv).toBe(8.7);

    // Delivered: 300 OA + (1200 * 0.85 = 1020) = 1320 CFM
    expect(res.deliveredOutdoorAirCfm).toBe(300);
    expect(res.deliveredCentralFilterCfm).toBe(1020);
    expect(res.totalDeliveredEcaCfm).toBe(1320);

    // Margin = 1320 - 1168 = +152 CFM
    expect(res.ecaMarginCfm).toBe(152);
    expect(res.isCompliant).toBe(true);
    expect(res.status).toBe("compliant");
  });

  it("identifies infection risk management deficit when using low-efficiency MERV 8 filters", () => {
    // Same classroom with standard MERV 8 filter (20% efficiency)
    // Delivered: 300 OA + (1200 * 0.20 = 240) = 540 CFM vs 1168 required
    const input: Ashrae241Input = {
      spaceType: "classroom_age_5_8",
      floorAreaSqFt: 900,
      occupants: 25,
      ceilingHeightFt: 9,
      outdoorAirCfm: 300,
      recirculatedAirCfm: 1200,
      centralFilterMerv: "merv_8",
    };

    const res = calculateAshrae241Compliance(input);

    expect(res.deliveredCentralFilterCfm).toBe(240);
    expect(res.totalDeliveredEcaCfm).toBe(540);
    expect(res.ecaMarginCfm).toBe(-628);
    expect(res.isCompliant).toBe(false);
    expect(res.status).toBe("critical_deficit");
    expect(res.recommendations.some((r) => r.includes("Deficit of 628 CFM"))).toBe(true);
    expect(res.recommendations.some((r) => r.includes("MERV 13"))).toBe(true);
  });

  it("evaluates hybrid multi-technology compliance with portable in-room HEPA and UV-C", () => {
    // Conference room: 20 occupants, 600 sq ft
    // ECA_p = 31.8 -> 636 CFM; ECA_a = 0.16 -> 96 CFM; Total Required = 732 CFM
    // Delivery: 150 OA + (400 recirc * 0.50 MERV 11 = 200) + (2x 150 CFM CADR portable * 0.9 mix = 270) + 150 UV-C = 770 CFM
    const input: Ashrae241Input = {
      spaceType: "conference_room",
      floorAreaSqFt: 600,
      occupants: 20,
      outdoorAirCfm: 150,
      recirculatedAirCfm: 400,
      centralFilterMerv: "merv_11",
      inRoomAirCleanerCadrCfm: 300,
      mixingFactor: 0.9,
      uvcEquivalentCfm: 150,
    };

    const res = calculateAshrae241Compliance(input);

    expect(res.totalRequiredEcaCfm).toBe(732);
    expect(res.deliveredOutdoorAirCfm).toBe(150);
    expect(res.deliveredCentralFilterCfm).toBe(200);
    expect(res.deliveredInRoomCfm).toBe(270);
    expect(res.deliveredUvcCfm).toBe(150);
    expect(res.totalDeliveredEcaCfm).toBe(770);
    expect(res.ecaMarginCfm).toBe(38);
    expect(res.isCompliant).toBe(true);
    expect(res.status).toBe("compliant");
  });

  it("evaluates healthcare patient rooms with high-intensity ventilation requirements", () => {
    const config = ASHRAE_241_TABLE_5_1.healthcare_patient_room;
    expect(config.ecaP_Cfm).toBe(53.0);
    expect(config.ecaA_Cfm_sqft).toBe(0.20);

    const input: Ashrae241Input = {
      spaceType: "healthcare_patient_room",
      floorAreaSqFt: 250,
      occupants: 2,
      outdoorAirCfm: 120,
      recirculatedAirCfm: 300,
      centralFilterMerv: "merv_16_hepa", // 99.97% -> 299.9 CFM
    };

    const res = calculateAshrae241Compliance(input);
    // Required: 2 * 53 + 250 * 0.20 = 106 + 50 = 156 CFM
    expect(res.totalRequiredEcaCfm).toBe(156);
    // Delivered: 120 + 299.9 = 419.9 CFM
    expect(res.totalDeliveredEcaCfm).toBe(419.9);
    expect(res.complianceRatio).toBeGreaterThan(2.0);
    expect(res.status).toBe("exceeds");
  });

  it("verifies particle removal efficiencies across all MERV tiers", () => {
    expect(BIOAEROSOL_FILTER_EFFICIENCIES.merv_8.efficiency).toBe(0.20);
    expect(BIOAEROSOL_FILTER_EFFICIENCIES.merv_11.efficiency).toBe(0.50);
    expect(BIOAEROSOL_FILTER_EFFICIENCIES.merv_13.efficiency).toBe(0.85);
    expect(BIOAEROSOL_FILTER_EFFICIENCIES.merv_14.efficiency).toBe(0.90);
    expect(BIOAEROSOL_FILTER_EFFICIENCIES.merv_15.efficiency).toBe(0.95);
    expect(BIOAEROSOL_FILTER_EFFICIENCIES.merv_16_hepa.efficiency).toBe(0.9997);
  });
});
