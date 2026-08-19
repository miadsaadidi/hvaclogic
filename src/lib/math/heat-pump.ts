/**
 * HVACLogic Heat Pump Sizing & Thermal Balance Point Computational Engine
 * Implements ACCA Manual J (8th Ed), ACCA Manual S (Equipment Selection),
 * AHRI Standard 210/240-2023, and NEEP Cold-Climate ASHP Specifications.
 */

export type HeatPumpCompressorType = "inverter_cold_climate" | "inverter_standard" | "single_stage_standard";

export interface HeatPumpInput {
  nominalTonnage: number; // 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0
  compressorType: HeatPumpCompressorType;
  outdoorDesignTempF: number; // e.g. -5°F to 35°F
  designHeatingLossBtu: number; // e.g. 45,000 BTU/hr at outdoor design temp
  designCoolingLoadBtu?: number; // e.g. 30,000 BTU/hr
  indoorSetpointF?: number; // Default 70°F
}

export interface CurvePoint {
  outdoorTempF: number;
  buildingHeatLossBtu: number;
  heatPumpCapacityBtu: number;
  auxiliaryDeficitBtu: number;
}

export interface HeatPumpOutput {
  nominalTonnage: number;
  nominalCoolingBtu: number;
  nominalHeatingBtu47F: number;
  heatingCapacityAtDesignBtu: number;
  buildingHeatLossAtDesignBtu: number;
  thermalBalancePointF: number;
  auxiliaryHeatDeficitBtu: number;
  recommendedAuxHeatStripKw: number;
  isColdClimateQualified: boolean;
  manualSCoolingRatio: number;
  manualSOversizingStatus: "Optimal (ACCA Manual S Compliant)" | "Slightly Oversized in Cooling" | "Significantly Oversized";
  curvePoints: CurvePoint[];
  summaryExplanation: string;
}

export const COMPRESSOR_PERFORMANCE_FACTORS: Record<HeatPumpCompressorType, { label: string; ratio17F: number; ratio5F: number; ratioMinus5F: number; isColdClimate: boolean }> = {
  inverter_cold_climate: {
    label: "Cold-Climate Inverter (NEEP ccASHP / Hyper-Heat)",
    ratio17F: 0.88,
    ratio5F: 0.76,
    ratioMinus5F: 0.65,
    isColdClimate: true,
  },
  inverter_standard: {
    label: "Standard Inverter (Variable Speed)",
    ratio17F: 0.68,
    ratio5F: 0.52,
    ratioMinus5F: 0.38,
    isColdClimate: false,
  },
  single_stage_standard: {
    label: "Single-Stage Standard Efficiency",
    ratio17F: 0.55,
    ratio5F: 0.35,
    ratioMinus5F: 0.20,
    isColdClimate: false,
  },
};

const STANDARD_HEAT_STRIP_SIZES_KW = [0, 5, 8, 10, 15, 20, 25];

/**
 * Calculates heat pump heating output at any arbitrary outdoor temperature
 */
export function getHeatPumpCapacityAtTemp(nominalHeatingBtu: number, tempF: number, type: HeatPumpCompressorType): number {
  const factors = COMPRESSOR_PERFORMANCE_FACTORS[type];
  if (tempF >= 47) {
    // Slight boost above 47°F up to 60°F
    const boost = 1 + (tempF - 47) * 0.005;
    return Math.round(nominalHeatingBtu * Math.min(1.15, boost));
  } else if (tempF >= 17) {
    const frac = (tempF - 17) / (47 - 17);
    const multiplier = factors.ratio17F + frac * (1.0 - factors.ratio17F);
    return Math.round(nominalHeatingBtu * multiplier);
  } else if (tempF >= 5) {
    const frac = (tempF - 5) / (17 - 5);
    const multiplier = factors.ratio5F + frac * (factors.ratio17F - factors.ratio5F);
    return Math.round(nominalHeatingBtu * multiplier);
  } else {
    const frac = (tempF - (-5)) / (5 - (-5));
    const multiplier = factors.ratioMinus5F + frac * (factors.ratio5F - factors.ratioMinus5F);
    return Math.round(nominalHeatingBtu * Math.max(0.1, multiplier));
  }
}

/**
 * Calculates building heat loss at any arbitrary outdoor temperature based on design point
 */
export function getBuildingHeatLossAtTemp(designHeatLoss: number, designOutdoorTempF: number, currentTempF: number, indoorSetpoint: number = 70): number {
  if (currentTempF >= indoorSetpoint) return 0;
  const designDeltaT = Math.max(10, indoorSetpoint - designOutdoorTempF);
  const currentDeltaT = Math.max(0, indoorSetpoint - currentTempF);
  return Math.round(designHeatLoss * (currentDeltaT / designDeltaT));
}

/**
 * Calculates whole-home heat pump thermal balance point, low-ambient derating, and backup heat strips.
 */
export function calculateHeatPumpSizing(input: HeatPumpInput): HeatPumpOutput {
  const tons = Math.max(1.0, Math.min(6.0, input.nominalTonnage));
  const nominalCoolingBtu = Math.round(tons * 12000);
  const nominalHeatingBtu47F = Math.round(nominalCoolingBtu * 1.05); // Heat pumps typically have ~105% heating capacity @ 47°F
  const type = input.compressorType || "inverter_cold_climate";
  const outdoorDesign = input.outdoorDesignTempF;
  const designHeatingLoss = Math.max(5000, input.designHeatingLossBtu);
  const designCoolingLoad = input.designCoolingLoadBtu || nominalCoolingBtu;
  const indoorSetpoint = input.indoorSetpointF || 70;

  // Capacity at winter outdoor design temperature
  const heatingCapacityAtDesignBtu = getHeatPumpCapacityAtTemp(nominalHeatingBtu47F, outdoorDesign, type);
  const buildingHeatLossAtDesignBtu = designHeatingLoss;

  // Deficit at design temperature
  const auxiliaryDeficitBtu = Math.max(0, buildingHeatLossAtDesignBtu - heatingCapacityAtDesignBtu);

  // Match auxiliary electric heat strip size (kW)
  const rawAuxKw = auxiliaryDeficitBtu / 3412.14;
  let recommendedAuxHeatStripKw = 0;
  if (rawAuxKw > 0) {
    for (const kw of STANDARD_HEAT_STRIP_SIZES_KW) {
      if (kw >= rawAuxKw) {
        recommendedAuxHeatStripKw = kw;
        break;
      }
    }
    if (recommendedAuxHeatStripKw === 0) recommendedAuxHeatStripKw = Math.ceil(rawAuxKw / 5) * 5;
  }

  // Find Thermal Balance Point (where Building Loss == Heat Pump Capacity)
  let thermalBalancePointF = outdoorDesign;
  for (let t = Math.round(outdoorDesign); t <= indoorSetpoint; t++) {
    const loss = getBuildingHeatLossAtTemp(designHeatingLoss, outdoorDesign, t, indoorSetpoint);
    const cap = getHeatPumpCapacityAtTemp(nominalHeatingBtu47F, t, type);
    if (cap >= loss) {
      thermalBalancePointF = t;
      break;
    }
  }

  // Generate 10-point curve matrix from -10°F to 60°F
  const curvePoints: CurvePoint[] = [];
  for (let t = -10; t <= 60; t += 5) {
    const loss = getBuildingHeatLossAtTemp(designHeatingLoss, outdoorDesign, t, indoorSetpoint);
    const cap = getHeatPumpCapacityAtTemp(nominalHeatingBtu47F, t, type);
    const deficit = Math.max(0, loss - cap);
    curvePoints.push({
      outdoorTempF: t,
      buildingHeatLossBtu: loss,
      heatPumpCapacityBtu: cap,
      auxiliaryDeficitBtu: deficit,
    });
  }

  // ACCA Manual S Cooling Check
  const manualSCoolingRatio = Number((nominalCoolingBtu / designCoolingLoad).toFixed(2));
  let manualSOversizingStatus: HeatPumpOutput["manualSOversizingStatus"] = "Optimal (ACCA Manual S Compliant)";
  if (type === "single_stage_standard") {
    if (manualSCoolingRatio > 1.15) manualSOversizingStatus = "Slightly Oversized in Cooling";
    if (manualSCoolingRatio > 1.30) manualSOversizingStatus = "Significantly Oversized";
  } else {
    // Inverters can modulate down, allowing up to 130% cooling oversizing
    if (manualSCoolingRatio > 1.30) manualSOversizingStatus = "Slightly Oversized in Cooling";
    if (manualSCoolingRatio > 1.50) manualSOversizingStatus = "Significantly Oversized";
  }

  const isColdClimateQualified = COMPRESSOR_PERFORMANCE_FACTORS[type].isColdClimate;

  return {
    nominalTonnage: tons,
    nominalCoolingBtu,
    nominalHeatingBtu47F,
    heatingCapacityAtDesignBtu,
    buildingHeatLossAtDesignBtu,
    thermalBalancePointF,
    auxiliaryHeatDeficitBtu: auxiliaryDeficitBtu,
    recommendedAuxHeatStripKw,
    isColdClimateQualified,
    manualSCoolingRatio,
    manualSOversizingStatus,
    curvePoints,
    summaryExplanation: `A ${tons}-ton ${COMPRESSOR_PERFORMANCE_FACTORS[type].label} carries 100% of the building heating load down to ${thermalBalancePointF}°F (Thermal Balance Point). At ${outdoorDesign}°F winter outdoor design, the heat pump delivers ${heatingCapacityAtDesignBtu.toLocaleString()} BTU/hr, requiring a ${recommendedAuxHeatStripKw} kW electric heat strip for the remaining ${auxiliaryDeficitBtu.toLocaleString()} BTU deficit.`,
  };
}
