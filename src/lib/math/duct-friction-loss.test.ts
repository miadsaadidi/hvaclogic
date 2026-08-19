import { describe, it, expect } from "vitest";
import {
  calculateDuctFrictionLoss,
  DuctFrictionLossInput,
} from "./duct-friction-loss";

describe("ACCA Manual D Duct Friction Loss & TEL Engine", () => {
  it("calculates standard residential duct system TEL and friction rate", () => {
    const input: DuctFrictionLossInput = {
      straightDuctSupplyFt: 60,
      straightDuctReturnFt: 40,
      supplyFittings: [
        { fittingId: "plenum_supply_straight", quantity: 1 }, // 10 ft
        { fittingId: "elbow_90_smooth", quantity: 3 }, // 3 * 10 = 30 ft
        { fittingId: "branch_takeoff_conical", quantity: 4 }, // 4 * 15 = 60 ft
        { fittingId: "register_boot_90", quantity: 4 }, // 4 * 30 = 120 ft
      ],
      returnFittings: [
        { fittingId: "return_air_drop_90", quantity: 1 }, // 30 ft
        { fittingId: "return_grille_boot", quantity: 2 }, // 2 * 20 = 40 ft
      ],
      blowerTespInWg: 0.50,
      evaporatorCoilDropInWg: 0.20,
      filterDropInWg: 0.10,
      supplyRegisterDropInWg: 0.03,
      returnGrilleDropInWg: 0.03,
      otherDevicesDropInWg: 0.00,
    };

    const res = calculateDuctFrictionLoss(input);
    // Total straight = 100 ft.
    // Supply fittings = 10 + 30 + 60 + 120 = 220 ft.
    // Return fittings = 30 + 40 = 70 ft.
    // Total TEL = 100 + 220 + 70 = 390 ft.
    expect(res.totalEquivalentLengthTelFt).toBe(390);

    // Component losses = 0.20 + 0.10 + 0.03 + 0.03 = 0.36 in.wg
    expect(res.totalComponentLossInWg).toBe(0.36);

    // ASP = 0.50 - 0.36 = 0.14 in.wg
    expect(res.availableStaticPressureAspInWg).toBe(0.14);

    // FR = (0.14 * 100) / 390 = 0.03589 -> ~0.036 in.wg/100ft
    expect(res.designFrictionRateFr).toBeCloseTo(0.036, 2);
    expect(res.frictionRateStatus).toBe("borderline_low");
  });

  it("handles high static blower with standard duct run", () => {
    const input: DuctFrictionLossInput = {
      straightDuctSupplyFt: 40,
      straightDuctReturnFt: 25,
      supplyFittings: [
        { fittingId: "elbow_90_smooth", quantity: 2 }, // 20 ft
      ],
      returnFittings: [
        { fittingId: "return_air_drop_90", quantity: 1 }, // 30 ft
      ],
      blowerTespInWg: 0.80, // High static ECM
      evaporatorCoilDropInWg: 0.22,
      filterDropInWg: 0.12,
      supplyRegisterDropInWg: 0.03,
      returnGrilleDropInWg: 0.03,
    };

    const res = calculateDuctFrictionLoss(input);
    // TEL = 65 + 50 = 115 ft.
    expect(res.totalEquivalentLengthTelFt).toBe(115);
    expect(res.availableStaticPressureAspInWg).toBe(0.40);
    // FR = (0.40 * 100) / 115 = 0.348
    expect(res.designFrictionRateFr).toBeGreaterThan(0.20);
    expect(res.frictionRateStatus).toBe("critical_undersized");
  });
});
