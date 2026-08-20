import {
  ChargeRefrigerant,
  getChargeProfile,
  OutdoorUnitPosition,
  RefrigerantSafetyGroup,
} from "@/lib/data/refrigerant-charge-profiles";

export type RefrigerantChargeInput =
  | {
      mode: "oem_profile";
      profileId: string;
      linePairId: string;
      actualLengthFt: number;
      verticalSeparationFt: number;
      outdoorUnitPosition: OutdoorUnitPosition;
      factoryBaseChargeOz: number;
    }
  | {
      mode: "custom_oem_rate";
      refrigerant: ChargeRefrigerant;
      liquidLineOd: string;
      suctionLineOd: string;
      actualLengthFt: number;
      factoryAllowanceFt: number;
      adderRateOzPerFt: number;
      factoryBaseChargeOz: number;
      verticalSeparationFt: number;
      outdoorUnitPosition: OutdoorUnitPosition;
      manualReference: string;
    };

export type RefrigerantChargeErrorCode =
  | "unknown_profile"
  | "unsupported_line_pair"
  | "invalid_actual_length"
  | "invalid_factory_allowance"
  | "invalid_adder_rate"
  | "invalid_factory_charge"
  | "invalid_vertical_separation"
  | "missing_manual_reference"
  | "length_out_of_range"
  | "vertical_limit_exceeded"
  | "invalid_level_position"
  | "negative_total_charge";

export interface RefrigerantChargeError {
  code: RefrigerantChargeErrorCode;
  message: string;
}

export interface RefrigerantChargeOutput {
  mode: RefrigerantChargeInput["mode"];
  refrigerant: ChargeRefrigerant;
  safetyGroup: RefrigerantSafetyGroup;
  profileId?: string;
  profileLabel: string;
  sourceLabel: string;
  sourceUrl?: string;
  sourceInternalId?: string;
  liquidLineOd: string;
  suctionLineOd: string;
  actualLengthFt: number;
  factoryAllowanceFt: number;
  excessLengthFt: number;
  verticalSeparationFt: number;
  outdoorUnitPosition: OutdoorUnitPosition;
  adderRateOzPerFt: number;
  chargeAdjustmentOz: number;
  chargeAdjustmentFormatted: string;
  adjustmentAction: "add" | "remove" | "none";
  factoryBaseChargeOz: number;
  factoryBaseChargeFormatted: string;
  initialTargetChargeOz: number;
  initialTargetChargeFormatted: string;
  isLongLine: boolean;
  warnings: string[];
  limitsNote: string;
  finalChargeProcedure: string;
}

export type RefrigerantChargeResult =
  | { ok: true; output: RefrigerantChargeOutput }
  | { ok: false; errors: RefrigerantChargeError[] };

const SAFETY_GROUPS: Record<ChargeRefrigerant, RefrigerantSafetyGroup> = {
  R454B: "A2L",
  R32: "A2L",
  R410A: "A1",
};

function isFiniteNonNegative(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}

function roundDisplayOunces(value: number): number {
  return Math.round((value + 1e-9) * 10) / 10;
}

export function formatChargeWeight(totalOz: number): string {
  if (!Number.isFinite(totalOz)) return "Invalid charge";

  const sign = totalOz < 0 ? "-" : "";
  const roundedOz = roundDisplayOunces(Math.abs(totalOz));
  const pounds = Math.floor(roundedOz / 16);
  const ounces = roundDisplayOunces(roundedOz - pounds * 16);
  const ouncesLabel = Number.isInteger(ounces) ? ounces.toFixed(0) : ounces.toFixed(1);

  if (pounds === 0) return `${sign}${ouncesLabel} oz`;
  return `${sign}${pounds} lb ${ouncesLabel} oz`;
}

function commonInputErrors(input: RefrigerantChargeInput): RefrigerantChargeError[] {
  const errors: RefrigerantChargeError[] = [];
  if (!isFiniteNonNegative(input.actualLengthFt)) {
    errors.push({ code: "invalid_actual_length", message: "Actual line length must be a finite value of 0 ft or greater." });
  }
  if (!isFiniteNonNegative(input.factoryBaseChargeOz)) {
    errors.push({ code: "invalid_factory_charge", message: "Factory nameplate charge must be a finite value of 0 oz or greater." });
  }
  if (!isFiniteNonNegative(input.verticalSeparationFt)) {
    errors.push({ code: "invalid_vertical_separation", message: "Vertical separation must be a finite value of 0 ft or greater." });
  }
  if (input.outdoorUnitPosition === "level" && input.verticalSeparationFt !== 0) {
    errors.push({ code: "invalid_level_position", message: "Set vertical separation to 0 ft when the outdoor and indoor units are level." });
  }
  return errors;
}

export function calculateRefrigerantCharge(input: RefrigerantChargeInput): RefrigerantChargeResult {
  const errors = commonInputErrors(input);

  if (input.mode === "custom_oem_rate") {
    if (!isFiniteNonNegative(input.factoryAllowanceFt)) {
      errors.push({ code: "invalid_factory_allowance", message: "Factory allowance must be a finite value of 0 ft or greater." });
    }
    if (!Number.isFinite(input.adderRateOzPerFt) || input.adderRateOzPerFt <= 0) {
      errors.push({ code: "invalid_adder_rate", message: "The OEM adder rate must be greater than 0 oz/ft." });
    }
    if (!input.manualReference.trim()) {
      errors.push({ code: "missing_manual_reference", message: "Identify the equipment manual or charging table used for the custom rate." });
    }
    if (errors.length > 0) return { ok: false, errors };

    const excessLengthFt = Math.max(0, input.actualLengthFt - input.factoryAllowanceFt);
    const chargeAdjustmentOz = excessLengthFt * input.adderRateOzPerFt;
    const initialTargetChargeOz = input.factoryBaseChargeOz + chargeAdjustmentOz;
    const warnings: string[] = [];
    if (input.actualLengthFt < input.factoryAllowanceFt) {
      warnings.push("Custom excess-length mode does not authorize removal below the factory allowance. Follow the cited OEM manual.");
    }
    if (input.refrigerant === "R454B" || input.refrigerant === "R32") {
      warnings.push("A2L refrigerant: use listed A2L service equipment and verify the applicable occupied-space charge limit.");
    }

    return {
      ok: true,
      output: {
        mode: input.mode,
        refrigerant: input.refrigerant,
        safetyGroup: SAFETY_GROUPS[input.refrigerant],
        profileLabel: "Custom OEM rate",
        sourceLabel: input.manualReference.trim(),
        liquidLineOd: input.liquidLineOd,
        suctionLineOd: input.suctionLineOd,
        actualLengthFt: input.actualLengthFt,
        factoryAllowanceFt: input.factoryAllowanceFt,
        excessLengthFt,
        verticalSeparationFt: input.verticalSeparationFt,
        outdoorUnitPosition: input.outdoorUnitPosition,
        adderRateOzPerFt: input.adderRateOzPerFt,
        chargeAdjustmentOz,
        chargeAdjustmentFormatted: formatChargeWeight(chargeAdjustmentOz),
        adjustmentAction: chargeAdjustmentOz > 0 ? "add" : "none",
        factoryBaseChargeOz: input.factoryBaseChargeOz,
        factoryBaseChargeFormatted: formatChargeWeight(input.factoryBaseChargeOz),
        initialTargetChargeOz,
        initialTargetChargeFormatted: formatChargeWeight(initialTargetChargeOz),
        isLongLine: false,
        warnings,
        limitsNote: "Custom mode cannot validate model-specific maximum length, lift, accessories, or oil-management requirements.",
        finalChargeProcedure: "Complete the final charging procedure in the cited equipment manual after this initial weigh-in.",
      },
    };
  }

  const profile = getChargeProfile(input.profileId);
  if (!profile) {
    errors.push({ code: "unknown_profile", message: "Select a verified OEM charging profile." });
    return { ok: false, errors };
  }

  const linePair = profile.linePairs.find((item) => item.id === input.linePairId);
  if (!linePair) {
    errors.push({ code: "unsupported_line_pair", message: "The selected line pair is not supported by this OEM profile." });
  }
  if (Number.isFinite(input.actualLengthFt) && (input.actualLengthFt < profile.minimumLinearLengthFt || input.actualLengthFt > profile.maximumLinearLengthFt)) {
    errors.push({
      code: "length_out_of_range",
      message: `This profile is validated from ${profile.minimumLinearLengthFt} ft through ${profile.maximumLinearLengthFt} ft.`,
    });
  }
  const verticalLimit = profile.maximumVerticalSeparationFt[input.outdoorUnitPosition];
  if (verticalLimit !== undefined && input.verticalSeparationFt > verticalLimit) {
    errors.push({
      code: "vertical_limit_exceeded",
      message: `Vertical separation exceeds this profile's ${verticalLimit} ft limit for the selected unit position.`,
    });
  }
  if (errors.length > 0 || !linePair) return { ok: false, errors };

  const excessLengthFt = Math.max(0, input.actualLengthFt - profile.factoryAllowanceFt);
  const chargeAdjustmentOz = profile.calculationMethod.kind === "inventory_delta"
    ? input.actualLengthFt * linePair.adderRateOzPerFt - profile.calculationMethod.factoryLineInventoryOz
    : excessLengthFt * linePair.adderRateOzPerFt;
  const initialTargetChargeOz = input.factoryBaseChargeOz + chargeAdjustmentOz;
  if (initialTargetChargeOz < 0) {
    return {
      ok: false,
      errors: [{ code: "negative_total_charge", message: "The calculated adjustment exceeds the entered factory charge. Verify all source values." }],
    };
  }

  const warnings: string[] = [];
  const hasKnownVerticalLimit = input.outdoorUnitPosition === "level" || verticalLimit !== undefined;
  if (!hasKnownVerticalLimit && input.verticalSeparationFt > 0) {
    warnings.push("This family profile does not define one universal lift limit. Verify the selected model's piping table.");
  }
  const isLongLine =
    (profile.longLineLinearThresholdFt !== undefined && input.actualLengthFt > profile.longLineLinearThresholdFt) ||
    (profile.longLineVerticalThresholdFt !== undefined && input.verticalSeparationFt > profile.longLineVerticalThresholdFt);
  if (isLongLine) {
    warnings.push("Long-line application: install every accessory and piping modification required by the selected model's OEM guide.");
  }
  if (profile.safetyGroup === "A2L") {
    warnings.push("A2L refrigerant: use listed A2L service equipment and verify the applicable occupied-space charge limit.");
  }

  return {
    ok: true,
    output: {
      mode: input.mode,
      refrigerant: profile.refrigerant,
      safetyGroup: profile.safetyGroup,
      profileId: profile.id,
      profileLabel: `${profile.manufacturer} — ${profile.modelFamily}`,
      sourceLabel: `${profile.source.documentTitle}, ${profile.source.revision}`,
      sourceUrl: profile.source.url,
      sourceInternalId: profile.source.internalId,
      liquidLineOd: linePair.liquidLineOd,
      suctionLineOd: linePair.suctionLineOd,
      actualLengthFt: input.actualLengthFt,
      factoryAllowanceFt: profile.factoryAllowanceFt,
      excessLengthFt,
      verticalSeparationFt: input.verticalSeparationFt,
      outdoorUnitPosition: input.outdoorUnitPosition,
      adderRateOzPerFt: linePair.adderRateOzPerFt,
      chargeAdjustmentOz,
      chargeAdjustmentFormatted: formatChargeWeight(chargeAdjustmentOz),
      adjustmentAction: chargeAdjustmentOz > 0 ? "add" : chargeAdjustmentOz < 0 ? "remove" : "none",
      factoryBaseChargeOz: input.factoryBaseChargeOz,
      factoryBaseChargeFormatted: formatChargeWeight(input.factoryBaseChargeOz),
      initialTargetChargeOz,
      initialTargetChargeFormatted: formatChargeWeight(initialTargetChargeOz),
      isLongLine,
      warnings,
      limitsNote: profile.limitsNote,
      finalChargeProcedure: profile.finalChargeProcedure,
    },
  };
}
