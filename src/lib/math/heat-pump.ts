/**
 * HVACLogic Heat Pump Sizing & Thermal Balance Point Computational Engine
 * Implements:
 * - ANSI/ACCA 3 Manual S - Residential Equipment Selection, 3rd Edition (2023), Version 1.02
 *   including Addendum A (2024) and Addendum B (2024)
 * - ACCA Manual J (8th Edition)
 * - ANSI/AHRI Standard 210/240-2023 (Unitary Air-Conditioners & Air-Source Heat Pumps)
 * - Northeast Energy Efficiency Partnerships (NEEP) ccASHP Specification v4.0
 */

export type HeatPumpCompressorType = "inverter_cold_climate" | "inverter_standard" | "single_stage_standard";

export interface HeatPumpInput {
  nominalTonnage: number; // 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0
  compressorType: HeatPumpCompressorType;
  outdoorDesignTempF: number; // e.g. -5°F to 35°F
  designHeatingLossBtu: number; // e.g. 45,000 BTU/hr at outdoor design temp
  designCoolingLoadBtu?: number; // e.g. 30,000 BTU/hr
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
  heatingCapacityAtDesignBtu: number;
  buildingHeatLossAtDesignBtu: number;
  thermalBalancePointF: number;
  auxiliaryHeatDeficitBtu: number;
  recommendedAuxHeatStripKw: number;
  isColdClimateQualified: boolean;
  manualSCoolingRatio: number;
  manualSOversizingStatus: "Optimal (ACCA Manual S 3rd Ed)" | "Heating-Priority Sizing (Manual S Addendum B)" | "Significantly Oversized (Risk of Low-Load Cycling)" | "Undersized for Cooling Load";
  // Dual-Fuel Economic Switchover Outputs
  dualFuelEnabled: boolean;
  economicBalancePointF: number | null;
  economicCopThreshold: number | null;
  heatPumpCostPerMbtuAtDesign: number;
  furnaceCostPerMbtu: number;
  curvePoints: CurvePoint[];
  summaryExplanation: string;
  economicExplanation: string;
  governingStandard: string;
}

/**
 * Baseline compressor performance factors calibrated to AHRI 210/240 standard test points:
 * - 47°F: Standard rated heating capacity
 * - 17°F: Low-temperature heating rating
 * - 5°F: Cold-climate rating point (NEEP ccASHP requires >= 70% capacity retention & COP >= 1.75)
 * - -5°F: Extreme low-ambient rating point
 *
 * NOTE: These factors represent baseline category models for simulation and pre-design screening.
 * Final submittals and AHRI certificate filings must use manufacturer expanded performance tables.
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
    label: "Cold-Climate Inverter (NEEP ccASHP / Hyper-Heat)",
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
    label: "Standard Inverter (Variable Speed)",
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
    label: "Single-Stage Standard Efficiency",
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
 * Calculates heat pump heating output at any arbitrary outdoor temperature.
 * Uses piecewise linear interpolation between AHRI 210/240 and NEEP benchmark test points.
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
 * Calculates representative Coefficient of Performance (COP) at any outdoor temperature
 * based on AHRI 210/240 and NEEP performance curves.
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
 * Calculates building heat loss at any arbitrary outdoor temperature based on design point.
 * Follows ACCA Manual J steady-state conduction & infiltration delta-T proportion.
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
 * Calculates whole-home heat pump thermal balance point, ACCA Manual S 3rd Edition sizing status,
 * dual-fuel economic switchover balance point, and auxiliary backup requirements.
 */
export function calculateHeatPumpSizing(input: HeatPumpInput): HeatPumpOutput {
  const tons = Math.max(1.0, Math.min(6.0, input.nominalTonnage));
  const nominalCoolingBtu = Math.round(tons * 12000);
  const nominalHeatingBtu47F = Math.round(nominalCoolingBtu * 1.05); // Heat pumps typically deliver ~105% heating capacity at 47°F rated condition
  const type = input.compressorType || "inverter_cold_climate";
  const outdoorDesign = input.outdoorDesignTempF;
  const designHeatingLoss = Math.max(5000, input.designHeatingLossBtu);
  const designCoolingLoad = input.designCoolingLoadBtu || nominalCoolingBtu;
  const indoorSetpoint = input.indoorSetpointF || 70;

  // Dual-fuel economic pricing assumptions
  const dualFuelEnabled = input.dualFuelEnabled ?? false;
  const elecRate = input.electricityRatePerKwh ?? 0.16; // $0.16 / kWh US national average
  const gasRate = input.naturalGasRatePerTherm ?? 1.40; // $1.40 / therm US national average
  const afue = input.furnaceAfue ?? 0.95; // 95% AFUE condensing gas furnace

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

  // 1. Find Thermal Balance Point (where Building Loss == Heat Pump Capacity)
  let thermalBalancePointF = outdoorDesign;
  for (let t = Math.round(outdoorDesign); t <= indoorSetpoint; t++) {
    const loss = getBuildingHeatLossAtTemp(designHeatingLoss, outdoorDesign, t, indoorSetpoint);
    const cap = getHeatPumpCapacityAtTemp(nominalHeatingBtu47F, t, type);
    if (cap >= loss) {
      thermalBalancePointF = t;
      break;
    }
  }

  // 2. Dual-Fuel Economic Parity COP and Economic Balance Point
  // Parity condition: Cost_HP = Cost_Furnace
  // (ElecRate * 293.071) / COP = (GasRate * 10) / AFUE
  // COP_economic = 29.3071 * AFUE * (ElecRate / GasRate)
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

  // 4. ACCA Manual S Sizing Evaluation per ANSI/ACCA 3 Manual S (3rd Edition, 2023 with Addenda A & B)
  // - Single-speed cooling limit: 90% to 115% of cooling load
  // - Variable-capacity (inverter):
  //   * Cooling selection: 90% to 130%
  //   * Addendum B "Variable-Capacity Equipment Sizing Condition" (primary heat source):
  //     permits sizing up to 100% of heating load or target balance point if minimum cooling
  //     capacity satisfies part-load sensible/latent requirements without excessive cycling.
  const manualSCoolingRatio = Number((nominalCoolingBtu / designCoolingLoad).toFixed(2));
  let manualSOversizingStatus: HeatPumpOutput["manualSOversizingStatus"] = "Optimal (ACCA Manual S 3rd Ed)";

  if (manualSCoolingRatio < 0.90) {
    manualSOversizingStatus = "Undersized for Cooling Load";
  } else if (type === "single_stage_standard") {
    if (manualSCoolingRatio <= 1.15) {
      manualSOversizingStatus = "Optimal (ACCA Manual S 3rd Ed)";
    } else if (manualSCoolingRatio <= 1.30) {
      manualSOversizingStatus = "Heating-Priority Sizing (Manual S Addendum B)";
    } else {
      manualSOversizingStatus = "Significantly Oversized (Risk of Low-Load Cycling)";
    }
  } else {
    // Variable-capacity inverters
    if (manualSCoolingRatio <= 1.30) {
      manualSOversizingStatus = "Optimal (ACCA Manual S 3rd Ed)";
    } else if (manualSCoolingRatio <= 1.50) {
      manualSOversizingStatus = "Heating-Priority Sizing (Manual S Addendum B)";
    } else {
      manualSOversizingStatus = "Significantly Oversized (Risk of Low-Load Cycling)";
    }
  }

  const isColdClimateQualified = COMPRESSOR_PERFORMANCE_FACTORS[type].isColdClimate;

  // Explanatory texts
  const summaryExplanation = `A ${tons}-ton ${COMPRESSOR_PERFORMANCE_FACTORS[type].label} carries 100% of the building heating load down to ${thermalBalancePointF}°F (Thermal Balance Point). At ${outdoorDesign}°F winter design, the heat pump delivers ${heatingCapacityAtDesignBtu.toLocaleString()} BTU/hr, requiring a ${recommendedAuxHeatStripKw} kW electric heat strip for the remaining ${auxiliaryDeficitBtu.toLocaleString()} BTU deficit.`;

  const economicExplanation =
    economicBalancePointF !== null
      ? `At current utility rates ($${elecRate.toFixed(2)}/kWh elec vs $${gasRate.toFixed(2)}/therm gas @ ${(afue * 100).toFixed(0)}% AFUE), fuel parity COP is ${economicCopThreshold}. The economic balance point is ${economicBalancePointF}°F. Above ${economicBalancePointF}°F, the heat pump is more economical; below ${economicBalancePointF}°F, the dual-fuel furnace is cheaper to operate.`
      : `Heat pump COP remains above the fuel parity threshold (${economicCopThreshold}) across the typical operating range.`;

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
    dualFuelEnabled,
    economicBalancePointF,
    economicCopThreshold,
    heatPumpCostPerMbtuAtDesign,
    furnaceCostPerMbtu,
    curvePoints,
    summaryExplanation,
    economicExplanation,
    governingStandard: "ANSI/ACCA 3 Manual S (3rd Edition, 2023 with Addendum A/B) & AHRI 210/240-2023",
  };
}

