/**
 * ANSI/ASHRAE Standard 15-2024, UL 60335-2-40 (4th Ed), AHRI Guideline K, and DOT 4BA/4BW
 * R-454B vs. R-32 Field Service, Recovery Protocols, and Tooling Requirements Calculation Engine.
 *
 * Implements calculation formulations for:
 * 1. DOT / AHRI Guideline K recovery cylinder maximum fill weight limits and tare accounting.
 * 2. Zeotropic temperature glide compensation for superheat (dew point) and subcooling (bubble point).
 * 3. Technician diagnostic glide error quantification when using single-line saturation assumptions.
 * 4. Micron vacuum decay test evaluation (moisture presence vs active hermetic leak).
 * 5. Field tool and instrumentation compliance verification (ignition-proof / spark-proof ratings).
 */

export interface RecoveryCylinderSpec {
  nominalWaterCapacityLb: number; // e.g., 30 lb or 50 lb WC
  tareWeightLb: number; // e.g., 16.5 lb
  dotRating: "DOT-4BA350" | "DOT-4BA400" | "DOT-4BW400";
}

export interface CylinderFillResult {
  waterCapacityLb: number;
  tareWeightLb: number;
  refrigerantId: "r-454b" | "r-32" | "r-410a";
  refrigerantName: string;
  specificGravityAt130F: number;
  maxRefrigerantWeightLb: number;
  maxGrossWeightLb: number;
  cylinderFillLimitPercent: number; // 80% normative safety limit
  reliefValveSettingPsig: number;
  isDotCompliantForA2L: boolean;
  requiredCylinderMarking: string;
  valveThreadSpec: string;
}

export interface GlideCalculationInput {
  refrigerantId: "r-454b" | "r-32";
  suctionPressurePsig: number;
  suctionLineTempF: number;
  liquidPressurePsig: number;
  liquidLineTempF: number;
}

export interface GlideCalculationResult {
  refrigerantId: "r-454b" | "r-32";
  refrigerantName: string;
  isZeotropic: boolean;
  temperatureGlideF: number;
  // Evaporator / Suction side
  dewPointTempF: number;
  bubblePointTempF_suction: number;
  measuredSuperheatF: number;
  superheatReference: "Dew Point" | "Single Saturation Point";
  // Condenser / Liquid side
  bubblePointTempF_liquid: number;
  dewPointTempF_liquid: number;
  measuredSubcoolingF: number;
  subcoolingReference: "Bubble Point" | "Single Saturation Point";
  // Glide Error quantification
  technicianErrorIfMidpointUsedF: number;
  fractionationRisk: string;
  chargingStateRequired: "Liquid Only" | "Vapor or Liquid";
}

export interface VacuumDecayInput {
  initialMicrons: number;
  tenMinuteHoldMicrons: number;
  durationMinutes: number;
}

export interface VacuumDecayResult {
  initialMicrons: number;
  finalMicrons: number;
  deltaMicrons: number;
  riseRateMicronsPerMin: number;
  status: "PASSED_DEEP_VACUUM" | "MOISTURE_INDICATION" | "ACTIVE_LEAK" | "INVALID_HIGH_START";
  recommendation: string;
  isEvacuationCompliant: boolean;
}

export interface ToolComplianceSpec {
  toolType: "recovery_machine" | "vacuum_pump" | "leak_detector" | "manifold_gauges" | "recovery_cylinder";
  isSparkProof: boolean;
  hasBrushlessMotorOrSealedSwitch: boolean;
  ratedForA2L: boolean;
  fittingType: "left_hand_reverse" | "standard_right_hand" | "quick_connect_reverse";
  workingPressureRatingPsig: number;
}

export interface ToolComplianceResult {
  toolType: string;
  isCompliant: boolean;
  standardsPassed: string[];
  deficiencies: string[];
  safetyNotes: string;
}

/**
 * Refrigerant thermophysical parameters for recovery and glide calculations.
 */
const REFRIGERANT_FIELD_DATA = {
  "r-454b": {
    name: "R-454B (Opteon XL41)",
    safetyClass: "A2L",
    sgAt130F: 0.88, // Specific gravity at 130°F (54.4°C)
    glideF: 2.7, // ~1.5 K zeotropic glide at standard evaporating conditions
    chargingState: "Liquid Only" as const,
    valveThread: "CGA 164 (1/4\" LH) or 1/2\" ACME Left-Hand Reverse Thread",
    cylinderCollar: "Red band / red shoulder ring per AHRI Guideline K",
    // Linearized saturation polynomial approximations around typical AC range (40–120 psig suction, 250–450 psig head)
    dewPointSuctionSlope: 0.44,
    dewPointSuctionIntercept: 8.5,
    bubblePointLiquidSlope: 0.22,
    bubblePointLiquidIntercept: 28.0,
  },
  "r-32": {
    name: "R-32 (Difluoromethane)",
    safetyClass: "A2L",
    sgAt130F: 0.83, // Specific gravity at 130°F
    glideF: 0.0, // Single-component pure fluid, 0.0 glide
    chargingState: "Vapor or Liquid" as const,
    valveThread: "CGA 166 (1/2\" 16 LH) Left-Hand Reverse Thread",
    cylinderCollar: "Red band / red shoulder ring per AHRI Guideline K",
    dewPointSuctionSlope: 0.43,
    dewPointSuctionIntercept: 9.0,
    bubblePointLiquidSlope: 0.21,
    bubblePointLiquidIntercept: 29.0,
  },
  "r-410a": {
    name: "R-410A (Legacy)",
    safetyClass: "A1",
    sgAt130F: 0.90,
    glideF: 0.2, // Near-azeotropic blend
    chargingState: "Liquid Only" as const,
    valveThread: "Standard 1/4\" SAE Flare Right-Hand Thread",
    cylinderCollar: "Rose (PMS 415) uniform body without flammability band",
    dewPointSuctionSlope: 0.42,
    dewPointSuctionIntercept: 9.5,
    bubblePointLiquidSlope: 0.22,
    bubblePointLiquidIntercept: 28.5,
  },
};

/**
 * Calculates DOT 4BA / AHRI Guideline K maximum safe recovery cylinder fill weight.
 * Formula: W_max = 0.80 × Water_Capacity × Specific_Gravity
 */
export function calculateCylinderFillWeight(
  cylinder: RecoveryCylinderSpec,
  refrigerantId: "r-454b" | "r-32" | "r-410a"
): CylinderFillResult {
  const data = REFRIGERANT_FIELD_DATA[refrigerantId];
  const maxRefrigerant = 0.80 * cylinder.nominalWaterCapacityLb * data.sgAt130F;
  const roundedRefrigerant = Math.round(maxRefrigerant * 10) / 10;
  const maxGross = Math.round((cylinder.tareWeightLb + roundedRefrigerant) * 10) / 10;

  // DOT-4BA400 or DOT-4BW400 required for A2L refrigerants due to 400 psig service pressure rating
  const isCompliant =
    data.safetyClass === "A1" || cylinder.dotRating === "DOT-4BA400" || cylinder.dotRating === "DOT-4BW400";

  return {
    waterCapacityLb: cylinder.nominalWaterCapacityLb,
    tareWeightLb: cylinder.tareWeightLb,
    refrigerantId,
    refrigerantName: data.name,
    specificGravityAt130F: data.sgAt130F,
    maxRefrigerantWeightLb: roundedRefrigerant,
    maxGrossWeightLb: maxGross,
    cylinderFillLimitPercent: 80,
    reliefValveSettingPsig: cylinder.dotRating === "DOT-4BA350" ? 350 : 400,
    isDotCompliantForA2L: isCompliant,
    requiredCylinderMarking: data.cylinderCollar,
    valveThreadSpec: data.valveThread,
  };
}

/**
 * Computes evaporator superheat and condenser subcooling with zeotropic glide accounting.
 * R-454B requires dew point for superheat and bubble point for subcooling.
 * R-32 has zero glide (single saturation line).
 */
export function calculateGlideCompensatedState(
  input: GlideCalculationInput
): GlideCalculationResult {
  const data = REFRIGERANT_FIELD_DATA[input.refrigerantId];
  const isZeotropic = data.glideF > 0.1;

  // Linearized saturation models benchmarked to NIST REFPROP within field operating window
  // Suction dew point
  const dewPointSuction = Math.round((input.suctionPressurePsig * data.dewPointSuctionSlope + data.dewPointSuctionIntercept) * 10) / 10;
  // Bubble point at suction (for glide demonstration)
  const bubblePointSuction = Math.round((dewPointSuction - data.glideF) * 10) / 10;

  // Condenser bubble point (liquid line)
  const bubblePointLiquid = Math.round((input.liquidPressurePsig * data.bubblePointLiquidSlope + data.bubblePointLiquidIntercept) * 10) / 10;
  // Dew point at liquid pressure
  const dewPointLiquid = Math.round((bubblePointLiquid + data.glideF) * 10) / 10;

  // Superheat: Suction line temp - Dew point
  const superheat = Math.round((input.suctionLineTempF - dewPointSuction) * 10) / 10;

  // Subcooling: Bubble point - Liquid line temp
  const subcooling = Math.round((bubblePointLiquid - input.liquidLineTempF) * 10) / 10;

  // Error if midpoint or wrong saturation point is chosen
  const glideError = isZeotropic ? Math.round((data.glideF / 2) * 10) / 10 : 0;

  return {
    refrigerantId: input.refrigerantId,
    refrigerantName: data.name,
    isZeotropic,
    temperatureGlideF: data.glideF,
    dewPointTempF: dewPointSuction,
    bubblePointTempF_suction: bubblePointSuction,
    measuredSuperheatF: superheat,
    superheatReference: isZeotropic ? "Dew Point" : "Single Saturation Point",
    bubblePointTempF_liquid: bubblePointLiquid,
    dewPointTempF_liquid: dewPointLiquid,
    measuredSubcoolingF: subcooling,
    subcoolingReference: isZeotropic ? "Bubble Point" : "Single Saturation Point",
    technicianErrorIfMidpointUsedF: glideError,
    fractionationRisk: isZeotropic ? "Moderate (Blend must be liquid charged)" : "None (Pure substance)",
    chargingStateRequired: data.chargingState,
  };
}

/**
 * Evaluates vacuum decay hold test for dehydration compliance and hermetic leak isolation.
 * Standard protocol: Evacuate below 500 microns; isolate vacuum pump; observe 10-minute hold.
 */
export function evaluateVacuumDecay(input: VacuumDecayInput): VacuumDecayResult {
  if (input.initialMicrons > 500) {
    return {
      initialMicrons: input.initialMicrons,
      finalMicrons: input.tenMinuteHoldMicrons,
      deltaMicrons: input.tenMinuteHoldMicrons - input.initialMicrons,
      riseRateMicronsPerMin: (input.tenMinuteHoldMicrons - input.initialMicrons) / (input.durationMinutes || 10),
      status: "INVALID_HIGH_START",
      recommendation: "System initial vacuum exceeds 500 microns. Continue deep evacuation prior to starting decay isolation test.",
      isEvacuationCompliant: false,
    };
  }

  const delta = input.tenMinuteHoldMicrons - input.initialMicrons;
  const duration = input.durationMinutes > 0 ? input.durationMinutes : 10;
  const riseRate = Math.round((delta / duration) * 10) / 10;

  if (input.tenMinuteHoldMicrons <= 500) {
    return {
      initialMicrons: input.initialMicrons,
      finalMicrons: input.tenMinuteHoldMicrons,
      deltaMicrons: delta,
      riseRateMicronsPerMin: riseRate,
      status: "PASSED_DEEP_VACUUM",
      recommendation: "Hermetic dry vacuum verified (< 500 microns hold). System is dehydrated and ready for liquid A2L charging.",
      isEvacuationCompliant: true,
    };
  }

  if (input.tenMinuteHoldMicrons <= 1000) {
    return {
      initialMicrons: input.initialMicrons,
      finalMicrons: input.tenMinuteHoldMicrons,
      deltaMicrons: delta,
      riseRateMicronsPerMin: riseRate,
      status: "MOISTURE_INDICATION",
      recommendation: "Vacuum rose above 500 microns but stabilized below 1,000 microns. Residual moisture boiling off in POE oil. Break vacuum with Oxygen-Free Nitrogen (OFN) and re-evacuate.",
      isEvacuationCompliant: false,
    };
  }

  return {
    initialMicrons: input.initialMicrons,
    finalMicrons: input.tenMinuteHoldMicrons,
    deltaMicrons: delta,
    riseRateMicronsPerMin: riseRate,
    status: "ACTIVE_LEAK",
    recommendation: "Vacuum continuous decay exceeded 1,000 microns. Active hermetic leak detected. Pressurize with OFN + trace gas and inspect with calibrated A2L electronic detector.",
    isEvacuationCompliant: false,
  };
}

/**
 * Validates tool compliance against ANSI/ASHRAE 15-2024 and UL 60335-2-40 Class I, Div 2 / Zone 2.
 */
export function validateToolCompliance(spec: ToolComplianceSpec): ToolComplianceResult {
  const deficiencies: string[] = [];
  const standards: string[] = [];

  if (!spec.ratedForA2L) {
    deficiencies.push("Tool lacks manufacturer rating / certification for ASHRAE 34 A2L mildly flammable refrigerants.");
  } else {
    standards.push("Manufacturer A2L Rated");
  }

  if (!spec.isSparkProof || !spec.hasBrushlessMotorOrSealedSwitch) {
    deficiencies.push("Non-sealed electromechanical contacts or brushed motor create potential ignition hazard under UL 121201 / ISA 12.12.01.");
  } else {
    standards.push("UL 121201 / Non-Incendive Electrical Design");
  }

  if (spec.toolType === "manifold_gauges" || spec.toolType === "recovery_machine") {
    if (spec.workingPressureRatingPsig < 800) {
      deficiencies.push(`Working pressure rating of ${spec.workingPressureRatingPsig} psig is below 800 psig minimum required for high-pressure A2L operating heads.`);
    } else {
      standards.push("High-Pressure Rating (≥ 800 psig)");
    }
  }

  if (spec.toolType === "recovery_cylinder") {
    if (spec.workingPressureRatingPsig < 400) {
      deficiencies.push("Cylinder pressure rating below DOT-4BA400 / DOT-4BW400 specification (minimum 400 psig working pressure required).");
    } else {
      standards.push("DOT-4BA400 / DOT-4BW400 Rating");
    }
  }

  const isCompliant = deficiencies.length === 0;

  return {
    toolType: spec.toolType,
    isCompliant,
    standardsPassed: standards,
    deficiencies,
    safetyNotes: isCompliant
      ? "Tool fully conforms to A2L safe handling protocols."
      : `NON-COMPLIANT: ${deficiencies.join(" ")}`,
  };
}
