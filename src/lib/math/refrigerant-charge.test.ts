import { describe, expect, it } from "vitest";
import {
  calculateRefrigerantCharge,
  formatChargeWeight,
} from "./refrigerant-charge";

describe("refrigerant line-set charge engine", () => {
  it("matches the R5A5S R-454B published 45 ft, 5/16-inch example", () => {
    const result = calculateRefrigerantCharge({
      mode: "oem_profile",
      profileId: "icp-r5a5s-r454b",
      linePairId: "r454b-liquid-5-16",
      actualLengthFt: 45,
      verticalSeparationFt: 0,
      outdoorUnitPosition: "level",
      factoryBaseChargeOz: 100,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.output.chargeAdjustmentOz).toBe(9);
    expect(result.output.adjustmentAction).toBe("add");
    expect(result.output.initialTargetChargeOz).toBe(109);
  });

  it("matches the R5A5S published 15 ft, 1/4-inch removal example", () => {
    const result = calculateRefrigerantCharge({
      mode: "oem_profile",
      profileId: "icp-r5a5s-r454b",
      linePairId: "r454b-liquid-1-4",
      actualLengthFt: 15,
      verticalSeparationFt: 0,
      outdoorUnitPosition: "level",
      factoryBaseChargeOz: 100,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.output.chargeAdjustmentOz).toBeCloseTo(-4.95, 8);
    expect(result.output.adjustmentAction).toBe("remove");
    expect(result.output.chargeAdjustmentFormatted).toBe("-5 oz");
  });

  it("uses the R-32 suction-line-specific rate", () => {
    const result = calculateRefrigerantCharge({
      mode: "oem_profile",
      profileId: "daikin-residential-r32-ag-tp-110",
      linePairId: "r32-3-8x7-8",
      actualLengthFt: 65,
      verticalSeparationFt: 0,
      outdoorUnitPosition: "level",
      factoryBaseChargeOz: 80,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.output.excessLengthFt).toBe(50);
    expect(result.output.adderRateOzPerFt).toBe(0.58);
    expect(result.output.chargeAdjustmentOz).toBeCloseTo(29, 8);
  });

  it("uses the precise R-410A line-pair rate", () => {
    const result = calculateRefrigerantCharge({
      mode: "oem_profile",
      profileId: "daikin-goodman-residential-r410a",
      linePairId: "r410a-3-8x1-1-8",
      actualLengthFt: 40,
      verticalSeparationFt: 0,
      outdoorUnitPosition: "level",
      factoryBaseChargeOz: 96,
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.output.chargeAdjustmentOz).toBeCloseTo(19.5, 8);
  });

  it("calculates a custom OEM rate and retains its manual reference", () => {
    const result = calculateRefrigerantCharge({
      mode: "custom_oem_rate",
      refrigerant: "R454B",
      liquidLineOd: '3/8"',
      suctionLineOd: '7/8"',
      actualLengthFt: 45,
      factoryAllowanceFt: 15,
      adderRateOzPerFt: 0.6,
      factoryBaseChargeOz: 90,
      verticalSeparationFt: 12,
      outdoorUnitPosition: "outdoor_above",
      manualReference: "Example OEM install manual, Table 7",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.output.chargeAdjustmentOz).toBe(18);
    expect(result.output.sourceLabel).toContain("Example OEM");
  });

  it("does not infer refrigerant removal in custom mode below the factory allowance", () => {
    const result = calculateRefrigerantCharge({
      mode: "custom_oem_rate",
      refrigerant: "R410A",
      liquidLineOd: '3/8"',
      suctionLineOd: '3/4"',
      actualLengthFt: 10,
      factoryAllowanceFt: 15,
      adderRateOzPerFt: 0.67,
      factoryBaseChargeOz: 80,
      verticalSeparationFt: 0,
      outdoorUnitPosition: "level",
      manualReference: "OEM manual page 18",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.output.chargeAdjustmentOz).toBe(0);
    expect(result.output.adjustmentAction).toBe("none");
    expect(result.output.warnings.join(" ")).toContain("does not authorize removal");
  });

  it("rejects unsupported line pairs and out-of-profile limits", () => {
    const unsupported = calculateRefrigerantCharge({
      mode: "oem_profile",
      profileId: "daikin-residential-r32-ag-tp-110",
      linePairId: "not-a-line-pair",
      actualLengthFt: 45,
      verticalSeparationFt: 0,
      outdoorUnitPosition: "level",
      factoryBaseChargeOz: 80,
    });
    const tooLong = calculateRefrigerantCharge({
      mode: "oem_profile",
      profileId: "daikin-residential-r32-ag-tp-110",
      linePairId: "r32-3-8x5-8",
      actualLengthFt: 191,
      verticalSeparationFt: 0,
      outdoorUnitPosition: "level",
      factoryBaseChargeOz: 80,
    });

    expect(unsupported).toMatchObject({ ok: false });
    expect(tooLong).toMatchObject({ ok: false });
    if (!unsupported.ok) expect(unsupported.errors[0].code).toBe("unsupported_line_pair");
    if (!tooLong.ok) expect(tooLong.errors[0].code).toBe("length_out_of_range");
  });

  it("rejects non-finite, negative, and incomplete custom inputs", () => {
    const result = calculateRefrigerantCharge({
      mode: "custom_oem_rate",
      refrigerant: "R32",
      liquidLineOd: '3/8"',
      suctionLineOd: '3/4"',
      actualLengthFt: Number.NaN,
      factoryAllowanceFt: -1,
      adderRateOzPerFt: 0,
      factoryBaseChargeOz: -5,
      verticalSeparationFt: Number.POSITIVE_INFINITY,
      outdoorUnitPosition: "outdoor_below",
      manualReference: "",
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.map((error) => error.code)).toEqual(
      expect.arrayContaining([
        "invalid_actual_length",
        "invalid_factory_allowance",
        "invalid_adder_rate",
        "invalid_factory_charge",
        "invalid_vertical_separation",
        "missing_manual_reference",
      ]),
    );
  });

  it("formats ounce rollover and signed adjustments correctly", () => {
    expect(formatChargeWeight(15.96)).toBe("1 lb 0 oz");
    expect(formatChargeWeight(17.14)).toBe("1 lb 1.1 oz");
    expect(formatChargeWeight(-4.95)).toBe("-5 oz");
  });
});
