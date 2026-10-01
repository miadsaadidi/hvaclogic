/**
 * HVACLogic Heat Pump Sizing & Thermal Balance Point Computational Engine
 *
 * Technical References:
 * - ANSI/ACCA 3 Manual S - Residential Equipment Selection (3rd Edition, 2023 with Addenda A & B)
 * - ACCA Manual J - Residential Load Calculation (8th Edition)
 * - ANSI/AHRI Standard 210/240-2023 (Unitary Air-Conditioners & Air-Source Heat Pumps)
 * - Northeast Energy Efficiency Partnerships (NEEP) ccASHP Specification Framework (v4.0)
 */

export type HeatPumpCompressorType = "inverter_cold_climate" | "inverter_standard" | "single_stage_standard";

export interface HeatPumpInput {
  nominalTonnage: number; // 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0
  compressorType: HeatPumpCompressorType;
  outdoorDesignTempF: number; // e.g. -5°F to 35°F
  designHeatingLossBtu: number; // e.g. 42,000 BTU/hr at outdoor design temp
  designCoolingLoadBtu?: number; // e.g. 32,000 BTU/hr
  indoorSetpointF?: number; // Default 70°F
  // Dual-fuel / Economic Switchover Parameters
  dualFuelEnabled?: boolean;
  electricityRatePerKwh?: number; // Default $0.16 / kWh
  naturalGasRatePerTherm?: number; // Default $1.40 / therm
  furnaceAfue?: number; // Default 0.95 (95% AFUE)
}

export interface CurvePoint {
  outdoorTempF: number;
  buildingHeatLossBtu: number;
  heatPumpCapacityBtu: number;
  auxiliaryDeficitBtu: number;
  cop: number;
  heatPumpCostPerMbtu: number;
  furnaceCostPerMbtu: number;
}

export interface HeatPumpOutput {
  nominalTonnage: number;
  nominalCoolingBtu: number;
  nominalHeatingBtu47F: number;
  heatingCapacity17FBtu: number;
  heatingCapacity5FBtu: number;
  heatingCapacityAtDesignBtu: number;
  buildingHeatLossAtDesignBtu: number;
  exactThermalBalancePointF: number;
  thermalBalancePointF: number;
  auxiliaryHeatDeficitBtu: number;
  rawAuxHeatStripKw: number;
  recommendedAuxHeatStripKw: number;
  isColdClimateProfile: boolean;
  manualSCoolingRatio: number;
  manualSOversizingStatus: string;
  // Dual-Fuel Economic Switchover Outputs
  dualFuelEnabled: boolean;
  economicBalancePointF: number | null;
  economicCopThreshold: number | null;
  heatPumpCostPerMbtuAtDesign: number;
  furnaceCostPerMbtu: number;
  curvePoints: CurvePoint[];
  summaryExplanation: string;
  economicExplanation: string;
  technicalReference: string;
}

/**
 * Illustrative baseline compressor performance factors based on typical category profiles:
 * - 47°F: Rated heating capacity baseline
 * - 17°F: Intermediate low-ambient test point
 * - 5°F: Cold-climate benchmark point
 * - -5°F: Extreme low-ambient point
 *
 * NOTE: These factors represent illustrative engineering category models for screening and educational analysis.
 * Actual project submittals and equipment selection must use specific OEM expanded performance tables.
 */
export const COMPRESSOR_PERFORMANCE_FACTORS: Record<
  HeatPumpCompressorType,
  {
    label: string;
    ratio17F: number;
    ratio5F: number;
    ratioMinus5F: number;
    isColdClimate: boolean;
    cop47F: number;
    cop17F: number;
    cop5F: number;
    copMinus5F: number;
  }
> = {
  inverter_cold_climate: {
    label: "Cold-Climate Inverter Profile (Illustrative ccASHP)",
    ratio17F: 0.88,
    ratio5F: 0.76,
    ratioMinus5F: 0.65,
    isColdClimate: true,
    cop47F: 3.8,
    cop17F: 2.7,
    cop5F: 2.0,
    copMinus5F: 1.5,
  },
  inverter_standard: {
    label: "Standard Inverter Profile (Variable Speed)",
    ratio17F: 0.68,
    ratio5F: 0.52,
    ratioMinus5F: 0.38,
    isColdClimate: false,
    cop47F: 3.3,
    cop17F: 2.3,
    cop5F: 1.6,
    copMinus5F: 1.2,
  },
  single_stage_standard: {
    label: "Single-Stage Standard Efficiency Profile",
    ratio17F: 0.55,
    ratio5F: 0.35,
    ratioMinus5F: 0.20,
    isColdClimate: false,
    cop47F: 3.0,
    cop17F: 1.9,
    cop5F: 1.3,
    copMinus5F: 1.0,
  },
};

const STANDARD_HEAT_STRIP_SIZES_KW = [0, 5, 8, 10, 15, 20, 25];

/**
 * Calculates heat pump heating output at any outdoor temperature using piecewise linear interpolation.
 */
export function getHeatPumpCapacityAtTemp(nominalHeatingBtu: number, tempF: number, type: HeatPumpCompressorType): number {
  const factors = COMPRESSOR_PERFORMANCE_FACTORS[type];
  if (tempF >= 47) {
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
 * Calculates representative Coefficient of Performance (COP) at any outdoor temperature.
 */
export function getHeatPumpCopAtTemp(tempF: number, type: HeatPumpCompressorType): number {
  const factors = COMPRESSOR_PERFORMANCE_FACTORS[type];
  if (tempF >= 47) {
    return Number((factors.cop47F + (tempF - 47) * 0.015).toFixed(2));
  } else if (tempF >= 17) {
    const frac = (tempF - 17) / (47 - 17);
    return Number((factors.cop17F + frac * (factors.cop47F - factors.cop17F)).toFixed(2));
  } else if (tempF >= 5) {
    const frac = (tempF - 5) / (17 - 5);
    return Number((factors.cop5F + frac * (factors.cop17F - factors.cop5F)).toFixed(2));
  } else {
    const frac = (tempF - (-5)) / (5 - (-5));
    const cop = factors.copMinus5F + frac * (factors.cop5F - factors.copMinus5F);
    return Number(Math.max(1.0, cop).toFixed(2));
  }
}

/**
 * Calculates building heat loss at an outdoor temperature using a linear steady-state delta-T model.
 * Q_loss(T) = Q_design * (T_indoor - T) / (T_indoor - T_design)
 */
export function getBuildingHeatLossAtTemp(
  designHeatLoss: number,
  designOutdoorTempF: number,
  currentTempF: number,
  indoorSetpoint: number = 70
): number {
  if (currentTempF >= indoorSetpoint) return 0;
  const designDeltaT = Math.max(10, indoorSetpoint - designOutdoorTempF);
  const currentDeltaT = Math.max(0, indoorSetpoint - currentTempF);
  return Math.round(designHeatLoss * (currentDeltaT / designDeltaT));
}

/**
 * Finds the exact continuous temperature where Q_loss(T) = Q_hp(T).
 */
export function findExactThermalBalancePoint(
  nominalHeatingBtu: number,
  designHeatLoss: number,
  designOutdoorTempF: number,
  type: HeatPumpCompressorType,
  indoorSetpoint: number = 70
): number {
  const designDeltaT = Math.max(10, indoorSetpoint - designOutdoorTempF);
  const lossSlope = designHeatLoss / designDeltaT; // BTU/hr per °F

  // Segments from cold to warm
  const segments: Array<{ t1: number; t2: number }> = [
    { t1: -20, t2: -5 },
    { t1: -5, t2: 5 },
    { t1: 5, t2: 17 },
    { t1: 17, t2: 47 },
    { t1: 47, t2: indoorSetpoint },
  ];

  for (const seg of segments) {
    const cap1 = getHeatPumpCapacityAtTemp(nominalHeatingBtu, seg.t1, type);
    const loss1 = getBuildingHeatLossAtTemp(designHeatLoss, designOutdoorTempF, seg.t1, indoorSetpoint);
    const cap2 = getHeatPumpCapacityAtTemp(nominalHeatingBtu, seg.t2, type);
    const loss2 = getBuildingHeatLossAtTemp(designHeatLoss, designOutdoorTempF, seg.t2, indoorSetpoint);

    if (cap1 <= loss1 && cap2 >= loss2) {
      const capSlope = (cap2 - cap1) / (seg.t2 - seg.t1);
      const denominator = capSlope + lossSlope;
      if (denominator > 0) {
        const delta = (loss1 - cap1) / denominator;
        const tIntersect = seg.t1 + delta;
        return Number(tIntersect.toFixed(1));
      }
    }
  }

  return Number(designOutdoorTempF.toFixed(1));
}

/**
 * Calculates operating cost per 1 Million BTU (MBTU) of delivered heat.
 * 1 kWh = 3,412.14 BTU => 1 MBTU = 293.071 kWh / COP
 */
export function calculateHeatPumpCostPerMbtu(electricityRatePerKwh: number, cop: number): number {
  if (cop <= 0) return 0;
  return Number(((electricityRatePerKwh * 293.071) / cop).toFixed(2));
}

/**
 * Calculates gas furnace operating cost per 1 Million BTU (MBTU) of delivered heat.
 * 1 Therm = 100,000 BTU => 1 MBTU = 10 Therms / AFUE
 */
export function calculateFurnaceCostPerMbtu(gasRatePerTherm: number, afue: number): number {
  if (afue <= 0) return 0;
  return Number(((gasRatePerTherm * 10) / afue).toFixed(2));
}

/**
 * Calculates heat pump thermal balance point, preliminary Manual S sizing ratio,
 * dual-fuel economic switchover balance point, and auxiliary backup requirements.
 */
export function calculateHeatPumpSizing(input: HeatPumpInput): HeatPumpOutput {
  const tons = Math.max(1.0, Math.min(6.0, input.nominalTonnage));
  const nominalCoolingBtu = Math.round(tons * 12000);
  const nominalHeatingBtu47F = Math.round(nominalCoolingBtu * 1.05); // Representative 47°F heating capacity ratio (~105% of cooling)
  const type = input.compressorType || "inverter_cold_climate";
  const outdoorDesign = input.outdoorDesignTempF;
  const designHeatingLoss = Math.max(5000, input.designHeatingLossBtu);
  const designCoolingLoad = input.designCoolingLoadBtu || nominalCoolingBtu;
  const indoorSetpoint = input.indoorSetpointF || 70;

  // Dual-fuel economic pricing assumptions
  const dualFuelEnabled = input.dualFuelEnabled ?? false;
  const elecRate = input.electricityRatePerKwh ?? 0.16; // $0.16 / kWh representative rate
  const gasRate = input.naturalGasRatePerTherm ?? 1.40; // $1.40 / therm representative rate
  const afue = input.furnaceAfue ?? 0.95; // 95% AFUE condensing gas furnace baseline

  // Capacity at key rating points
  const heatingCapacity17FBtu = getHeatPumpCapacityAtTemp(nominalHeatingBtu47F, 17, type);
  const heatingCapacity5FBtu = getHeatPumpCapacityAtTemp(nominalHeatingBtu47F, 5, type);
  const heatingCapacityAtDesignBtu = getHeatPumpCapacityAtTemp(nominalHeatingBtu47F, outdoorDesign, type);
  const buildingHeatLossAtDesignBtu = designHeatingLoss;

  // Deficit at design temperature
  const auxiliaryHeatDeficitBtu = Math.max(0, buildingHeatLossAtDesignBtu - heatingCapacityAtDesignBtu);

  // Theoretical resistance heater requirement (kW) and standard modular stage selection
  const rawAuxHeatStripKw = Number((auxiliaryHeatDeficitBtu / 3412.14).toFixed(2));
  let recommendedAuxHeatStripKw = 0;
  if (rawAuxHeatStripKw > 0) {
    for (const kw of STANDARD_HEAT_STRIP_SIZES_KW) {
      if (kw >= rawAuxHeatStripKw) {
        recommendedAuxHeatStripKw = kw;
        break;
      }
    }
    if (recommendedAuxHeatStripKw === 0) recommendedAuxHeatStripKw = Math.ceil(rawAuxHeatStripKw / 5) * 5;
  }

  // 1. Authoritative Thermal Balance Point
  const exactThermalBalancePointF = findExactThermalBalancePoint(nominalHeatingBtu47F, designHeatingLoss, outdoorDesign, type, indoorSetpoint);
  const thermalBalancePointF = Math.round(exactThermalBalancePointF);

  // 2. Dual-Fuel Economic Parity COP and Economic Balance Point
  // Parity condition: Cost_HP = Cost_Furnace => COP_economic = 29.3071 * AFUE * (ElecRate / GasRate)
  const economicCopThreshold = Number((29.3071 * afue * (elecRate / gasRate)).toFixed(2));
  const furnaceCostPerMbtu = calculateFurnaceCostPerMbtu(gasRate, afue);

  let economicBalancePointF: number | null = null;
  // Scan temperatures from -10°F to 60°F to find where heat pump COP matches economic threshold
  for (let t = -10; t <= 60; t++) {
    const copAtT = getHeatPumpCopAtTemp(t, type);
    if (copAtT >= economicCopThreshold) {
      economicBalancePointF = t;
      break;
    }
  }

  // Cost at design temperature
  const copAtDesign = getHeatPumpCopAtTemp(outdoorDesign, type);
  const heatPumpCostPerMbtuAtDesign = calculateHeatPumpCostPerMbtu(elecRate, copAtDesign);

  // 3. Generate 15-point curve matrix from -10°F to 60°F
  const curvePoints: CurvePoint[] = [];
  for (let t = -10; t <= 60; t += 5) {
    const loss = getBuildingHeatLossAtTemp(designHeatingLoss, outdoorDesign, t, indoorSetpoint);
    const cap = getHeatPumpCapacityAtTemp(nominalHeatingBtu47F, t, type);
    const deficit = Math.max(0, loss - cap);
    const cop = getHeatPumpCopAtTemp(t, type);
    const hpCost = calculateHeatPumpCostPerMbtu(elecRate, cop);
    curvePoints.push({
      outdoorTempF: t,
      buildingHeatLossBtu: loss,
      heatPumpCapacityBtu: cap,
      auxiliaryDeficitBtu: deficit,
      cop,
      heatPumpCostPerMbtu: hpCost,
      furnaceCostPerMbtu,
    });
  }

  // 4. ACCA Manual S Sizing Ratio Information
  const manualSCoolingRatio = Number((nominalCoolingBtu / designCoolingLoad).toFixed(2));
  let manualSOversizingStatus: string;

  if (manualSCoolingRatio < 0.90) {
    manualSOversizingStatus = "Undersized for stated cooling load (<90%)";
  } else if (type === "single_stage_standard") {
    if (manualSCoolingRatio <= 1.15) {
      manualSOversizingStatus = `${Math.round(manualSCoolingRatio * 100)}% of cooling load — standard single-stage sizing window (90%–115%)`;
    } else if (manualSCoolingRatio <= 1.30) {
      manualSOversizingStatus = `${Math.round(manualSCoolingRatio * 100)}% of cooling load — exceeds typical single-stage cooling cap; verify against OEM data`;
    } else {
      manualSOversizingStatus = `${Math.round(manualSCoolingRatio * 100)}% of cooling load — significantly oversized for cooling; risk of short-cycling`;
    }
  } else {
    // Variable-capacity inverters
    if (manualSCoolingRatio <= 1.30) {
      manualSOversizingStatus = `${Math.round(manualSCoolingRatio * 100)}% of cooling load — standard variable-capacity window (90%–130%)`;
    } else if (manualSCoolingRatio <= 1.50) {
      manualSOversizingStatus = `${Math.round(manualSCoolingRatio * 100)}% of cooling load — heating-priority sizing; verify minimum turndown capacity against cooling sensible/latent loads`;
    } else {
      manualSOversizingStatus = `${Math.round(manualSCoolingRatio * 100)}% of cooling load — exceeds typical variable-capacity window; verify part-load dehumidification`;
    }
  }

  const isColdClimateProfile = COMPRESSOR_PERFORMANCE_FACTORS[type].isColdClimate;

  // Explanatory texts
  const summaryExplanation = `An illustrative ${tons}-ton ${COMPRESSOR_PERFORMANCE_FACTORS[type].label} carries 100% of the building heating load down to approximately ${exactThermalBalancePointF}°F (Thermal Balance Point). At the ${outdoorDesign}°F winter design temperature, the heat pump delivers an estimated ${heatingCapacityAtDesignBtu.toLocaleString()} BTU/hr, leaving a ${auxiliaryHeatDeficitBtu.toLocaleString()} BTU/hr deficit (${rawAuxHeatStripKw} kW theoretical; nominal ${recommendedAuxHeatStripKw} kW modular stage).`;

  const economicExplanation =
    economicBalancePointF !== null
      ? `Under entered utility rates ($${elecRate.toFixed(2)}/kWh electricity vs $${gasRate.toFixed(2)}/therm natural gas @ ${(afue * 100).toFixed(0)}% AFUE), fuel parity COP is ${economicCopThreshold}. The estimated economic crossover is ${economicBalancePointF}°F. Above ${economicBalancePointF}°F, the heat pump is estimated to be cheaper per delivered BTU; below ${economicBalancePointF}°F, the gas furnace is more economical under these pricing assumptions.`
      : `Heat pump COP remains above the fuel parity threshold (${economicCopThreshold}) across the typical operating range.`;

  return {
    nominalTonnage: tons,
    nominalCoolingBtu,
    nominalHeatingBtu47F,
    heatingCapacity17FBtu,
    heatingCapacity5FBtu,
    heatingCapacityAtDesignBtu,
    buildingHeatLossAtDesignBtu,
    exactThermalBalancePointF,
    thermalBalancePointF,
    auxiliaryHeatDeficitBtu,
    rawAuxHeatStripKw,
    recommendedAuxHeatStripKw,
    isColdClimateProfile,
    manualSCoolingRatio,
    manualSOversizingStatus,
    dualFuelEnabled,
    economicBalancePointF,
    economicCopThreshold,
    heatPumpCostPerMbtuAtDesign,
    furnaceCostPerMbtu,
    curvePoints,
    summaryExplanation,
    economicExplanation,
    technicalReference: "ACCA Manual S (3rd Ed), ACCA Manual J (8th Ed), AHRI 210/240-2023, & ASHRAE Fundamentals",
  };
}


