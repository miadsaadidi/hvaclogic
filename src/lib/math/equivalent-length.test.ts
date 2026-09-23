import { describe, expect, it } from "vitest";
import {
  calculateEquivalentLength,
  ACCA_MANUAL_D_FITTINGS,
  EquivalentLengthInput,
} from "./equivalent-length";

describe("ACCA Manual D Equivalent Length & TEL Engine", () => {
  it("contains complete ACCA Manual D Appendix 3 fitting catalog across all 5 groups", () => {
    expect(ACCA_MANUAL_D_FITTINGS.length).toBeGreaterThanOrEqual(20);

    const groups = new Set(ACCA_MANUAL_D_FITTINGS.map((f) => f.group));
    expect(groups.has("group1_supply_trunk")).toBe(true);
    expect(groups.has("group2_trunk_elbows")).toBe(true);
    expect(groups.has("group3_branch_runouts")).toBe(true);
    expect(groups.has("group4_supply_boots")).toBe(true);
    expect(groups.has("group5_return_fittings")).toBe(true);
  });

  it("calculates basic straight duct run with zero fittings correctly", () => {
    const input: EquivalentLengthInput = {
      straightSupplyFt: 60,
      straightReturnFt: 40,
      fittings: [],
      blowerTespInWg: 0.50,
      coilPressureDropInWg: 0.20,
      filterPressureDropInWg: 0.10,
      supplyRegisterPressureDropInWg: 0.03,
      returnGrillePressureDropInWg: 0.03,
    };

    const result = calculateEquivalentLength(input);

    expect(result.straightSupplyFt).toBe(60);
    expect(result.straightReturnFt).toBe(40);
    expect(result.fittingsSupplyFt).toBe(0);
    expect(result.fittingsReturnFt).toBe(0);
    expect(result.cumulativeTelFt).toBe(100);
    expect(result.totalComponentDropInWg).toBe(0.36);
    expect(result.availableStaticPressureAspInWg).toBe(0.14);
    // FR = (0.14 * 100) / 100 = 0.14
    expect(result.designFrictionRateFr).toBe(0.14);
    expect(result.frictionRateStatus).toBe("borderline_high");
    expect(result.fittingRatioPercent).toBe(0);
  });

  it("accurately accumulates supply and return fittings and computes fitting resistance ratio", () => {
    const input: EquivalentLengthInput = {
      straightSupplyFt: 50,
      straightReturnFt: 30,
      fittings: [
        // Supply: Starting collar (15) + 2x Radius Elbow (2x10=20) + Conical takeoff (15) + 90 Boot (30) = 80 ft
        { id: "1", fittingDefId: "g1_starting_collar_shoe", equivalentLengthFt: 15, quantity: 1, systemSide: "supply" },
        { id: "2", fittingDefId: "g2_elbow_90_radius_smooth", equivalentLengthFt: 10, quantity: 2, systemSide: "supply" },
        { id: "3", fittingDefId: "g3_takeoff_conical_spinin", equivalentLengthFt: 15, quantity: 1, systemSide: "supply" },
        { id: "4", fittingDefId: "g4_boot_90_angle", equivalentLengthFt: 30, quantity: 1, systemSide: "supply" },
        // Return: Ceiling collar (20) + Return drop vaned (15) = 35 ft
        { id: "5", fittingDefId: "g5_return_ceiling_collar", equivalentLengthFt: 20, quantity: 1, systemSide: "return" },
        { id: "6", fittingDefId: "g5_return_drop_90_vaned", equivalentLengthFt: 15, quantity: 1, systemSide: "return" },
      ],
      blowerTespInWg: 0.50,
      coilPressureDropInWg: 0.20,
      filterPressureDropInWg: 0.10,
      supplyRegisterPressureDropInWg: 0.03,
      returnGrillePressureDropInWg: 0.03,
    };

    const result = calculateEquivalentLength(input);

    expect(result.fittingsSupplyFt).toBe(80);
    expect(result.totalSupplyTelFt).toBe(130); // 50 straight + 80 fittings
    expect(result.fittingsReturnFt).toBe(35);
    expect(result.totalReturnTelFt).toBe(65); // 30 straight + 35 fittings
    expect(result.cumulativeTelFt).toBe(195); // 130 + 65
    expect(result.straightLengthTotalFt).toBe(80);
    expect(result.fittingLengthTotalFt).toBe(115);
    // Fitting ratio: 115 / 195 = 58.97% -> 59%
    expect(result.fittingRatioPercent).toBe(59);

    // FR = (0.14 * 100) / 195 = 0.07179... -> 0.072 in. wg/100 ft
    expect(result.designFrictionRateFr).toBe(0.072);
    expect(result.frictionRateStatus).toBe("optimal");
    expect(result.statusBadgeColor).toBe("emerald");
  });

  it("identifies high-resistance fittings and generates actionable engineering optimization advice", () => {
    const input: EquivalentLengthInput = {
      straightSupplyFt: 60,
      straightReturnFt: 40,
      fittings: [
        // 2x unvaned mitered elbows = 2 * 50 = 100 ft
        { id: "miter_1", fittingDefId: "g2_elbow_90_mitered_novanes", equivalentLengthFt: 50, quantity: 2, systemSide: "supply" },
        // 1x unvaned return drop = 50 ft
        { id: "ret_1", fittingDefId: "g5_return_drop_90_unvaned", equivalentLengthFt: 50, quantity: 1, systemSide: "return" },
      ],
      blowerTespInWg: 0.50,
      coilPressureDropInWg: 0.22,
      filterPressureDropInWg: 0.14,
      supplyRegisterPressureDropInWg: 0.03,
      returnGrillePressureDropInWg: 0.03,
    };

    const result = calculateEquivalentLength(input);

    expect(result.severeResistanceFittingCount).toBe(3);
    expect(result.optimizations.length).toBe(2);

    // Mitered elbows optimization
    const miterOpt = result.optimizations.find((o) => o.fittingInstanceId === "miter_1");
    expect(miterOpt).toBeDefined();
    expect(miterOpt?.currentEqLengthTotalFt).toBe(100);
    expect(miterOpt?.potentialEqLengthTotalFt).toBe(20);
    expect(miterOpt?.potentialSavingsFt).toBe(80);

    // Return drop optimization
    const retOpt = result.optimizations.find((o) => o.fittingInstanceId === "ret_1");
    expect(retOpt).toBeDefined();
    expect(retOpt?.currentEqLengthTotalFt).toBe(50);
    expect(retOpt?.potentialEqLengthTotalFt).toBe(15);
    expect(retOpt?.potentialSavingsFt).toBe(35);
  });

  it("correctly flags borderline low and critical high friction rates", () => {
    // Excessive TEL -> Low friction rate (< 0.05)
    const longRun = calculateEquivalentLength({
      straightSupplyFt: 150,
      straightReturnFt: 120,
      fittings: [
        { id: "1", fittingDefId: "g2_elbow_90_mitered_novanes", equivalentLengthFt: 50, quantity: 4, systemSide: "supply" },
      ],
      blowerTespInWg: 0.50,
      coilPressureDropInWg: 0.25,
      filterPressureDropInWg: 0.15,
      supplyRegisterPressureDropInWg: 0.04,
      returnGrillePressureDropInWg: 0.04,
    });
    // ASP = 0.50 - 0.48 = 0.02
    // TEL = 150 + 120 + 200 = 470
    // FR = (0.02 * 100) / 470 = 0.004 in. wg/100 ft
    expect(longRun.frictionRateStatus).toBe("borderline_low");
    expect(longRun.statusBadgeColor).toBe("amber");

    // Very short run + high ASP -> High friction rate (> 0.18)
    const shortRun = calculateEquivalentLength({
      straightSupplyFt: 15,
      straightReturnFt: 10,
      fittings: [],
      blowerTespInWg: 0.80,
      coilPressureDropInWg: 0.15,
      filterPressureDropInWg: 0.08,
      supplyRegisterPressureDropInWg: 0.03,
      returnGrillePressureDropInWg: 0.03,
    });
    // ASP = 0.80 - 0.29 = 0.51
    // TEL = 25
    // FR = (0.51 * 100) / 25 = 2.04 in. wg/100 ft
    expect(shortRun.frictionRateStatus).toBe("critical_undersized");
    expect(shortRun.statusBadgeColor).toBe("rose");
  });
});
