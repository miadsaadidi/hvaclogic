/**
 * HVACLogic Heat Pump Auxiliary Electric Heat Strip Sizing & Deficit Computational Engine
 *
 * Implements:
 * - Thermal heating deficit analysis between design heat loss and heat pump output
 * - Standard commercially manufactured resistance element sizing algorithms
 * - Electrical load calculations (FLA, MCA continuous duty) referenced to NEC Article 424 principles
 * - Sensible airflow temperature rise screening (Delta T = Q / (1.08 * CFM))
 */

export type ElectricalVoltage = 240 | 208 | 480;
export type ElectricalPhase = 1 | 3;
export type SizingObjective = "supplemental_deficit" | "full_emergency_backup" | "defrost_tempering";

export interface HeatStripInput {
  designHeatLossBtu: number; // Building heat loss at winter design condition (BTU/hr)
  heatPumpCapacityAtDesignBtu: number; // Manufacturer-rated delivered capacity at design temp (BTU/hr)
  nominalTonnage?: number; // Nominal heat pump tons (informational / defrost screening)
  sizingObjective?: SizingObjective; // Default: 'supplemental_deficit'
  systemAirflowCfm?: number; // Air handler blower airflow (CFM)
  voltage?: ElectricalVoltage; // Default: 240V
  phase?: ElectricalPhase; // Default: 1-phase
  safetyOversizeFactor?: number; // Optional sizing margin (1.00 = 0% margin, 1.15 = 15% margin)
}

export interface ElectricCircuitBranch {
  circuitNumber: number;
  assignedKw: number;
  flaAmps: number;
  mcaAmps: number;
  suggestedBreakerAmps: number;
  suggestedWireGaugeAwg: string;
}

export interface HeatStripOutput {
  sizingObjective: SizingObjective;
  designHeatLossBtu: number;
  heatPumpCapacityAtDesignBtu: number;
  netHeatingDeficitBtu: number;
  theoreticalRequiredKw: number;
  selectedStandardKw: number;
  totalDeliveredBtu: number;
  excessCapacityKw: number;
  excessCapacityBtu: number;
  coveragePercentage: number;
  sizingMarginPercentage: number;
  
  // Electrical Specifications
  voltage: ElectricalVoltage;
  phase: ElectricalPhase;
  totalFlaAmps: number;
  totalMcaAmps: number;
  suggestedMopdBreakerAmps: number;
  isMultiCircuitRequired: boolean;
  circuitBranches: ElectricCircuitBranch[];
  
  // Airflow & Temperature Rise Screening
  systemAirflowCfm: number;
  screeningAirflowCfm: number;
  airflowScreeningStatus: "Adequate Airflow" | "Low Airflow Warning" | "Critical Starvation";
  estimatedTempRiseF: number;
  
  // Staging
  recommendedStages: number;
  stageBreakdownKw: number[];
  controlRecommendation: string;
  summary: string;
}

/**
 * Standard commercially manufactured electric heat strip element capacities (kW)
 */
export const STANDARD_HEAT_STRIP_SIZES_KW = [
  2.5, 3.0, 4.8, 5.0, 7.5, 8.0, 9.6, 10.0, 12.0, 14.4, 15.0, 19.2, 20.0, 24.0, 25.0
];

/**
 * Standard NEC Molded Case Circuit Breaker sizes (Amperes)
 */
export const STANDARD_BREAKER_SIZES_AMPS = [
  15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 110, 125, 150, 175, 200
];

/**
 * Derives illustrative copper wire gauge (75°C THHN/THWN copper) per NEC Table 310.16
 */
export function getRecommendedWireGauge(mcaAmps: number): string {
  if (mcaAmps <= 15) return "14 AWG Cu";
  if (mcaAmps <= 20) return "12 AWG Cu";
  if (mcaAmps <= 30) return "10 AWG Cu";
  if (mcaAmps <= 50) return "8 AWG Cu";
  if (mcaAmps <= 65) return "6 AWG Cu";
  if (mcaAmps <= 85) return "4 AWG Cu";
  if (mcaAmps <= 100) return "3 AWG Cu";
  if (mcaAmps <= 115) return "2 AWG Cu";
  if (mcaAmps <= 130) return "1 AWG Cu";
  if (mcaAmps <= 150) return "1/0 AWG Cu";
  if (mcaAmps <= 175) return "2/0 AWG Cu";
  return "3/0 AWG Cu";
}

/**
 * Finds next standard breaker size meeting or exceeding calculated MCA
 */
export function getNextStandardBreaker(mcaAmps: number): number {
  for (const breaker of STANDARD_BREAKER_SIZES_AMPS) {
    if (breaker >= mcaAmps) {
      return breaker;
    }
  }
  return 200;
}

/**
 * Selects the smallest standard manufactured heat strip size >= target kW
 */
export function selectStandardHeatStripKw(targetKw: number): number {
  if (targetKw <= 0) return 0;
  for (const size of STANDARD_HEAT_STRIP_SIZES_KW) {
    if (size >= targetKw - 0.001) {
      return size;
    }
  }
  return STANDARD_HEAT_STRIP_SIZES_KW[STANDARD_HEAT_STRIP_SIZES_KW.length - 1];
}

/**
 * Computes deterministic heat strip thermal sizing, calculated electrical parameters, and airflow screening.
 */
export function calculateHeatStripSizing(input: HeatStripInput): HeatStripOutput {
  const designLoss = Math.max(0, input.designHeatLossBtu);
  const hpCapacity = Math.max(0, input.heatPumpCapacityAtDesignBtu);
  const tonnage = input.nominalTonnage || (designLoss > 0 ? designLoss / 12000 : 3.0);
  const objective = input.sizingObjective || "supplemental_deficit";
  const voltage = input.voltage || 240;
  const phase = input.phase || 1;
  const safetyFactor = Math.max(1.0, Math.min(1.5, input.safetyOversizeFactor || 1.0));
  const sizingMarginPercentage = Math.round((safetyFactor - 1.0) * 100);

  // 1. Deficit Calculation
  const netDeficitBtu = Math.max(0, designLoss - hpCapacity);
  
  // Defrost tempering screening: ~75% nominal cooling capacity
  const defrostCoolingPenaltyBtu = tonnage * 12000 * 0.75;
  const defrostTemperingTheoreticalKw = defrostCoolingPenaltyBtu / 3412.142;

  let theoreticalKw = 0;
  if (objective === "supplemental_deficit") {
    theoreticalKw = netDeficitBtu / 3412.142;
  } else if (objective === "full_emergency_backup") {
    theoreticalKw = designLoss / 3412.142;
  } else if (objective === "defrost_tempering") {
    theoreticalKw = defrostTemperingTheoreticalKw;
  }

  const theoreticalRequiredKw = Number(theoreticalKw.toFixed(2));
  const targetWithMarginKw = theoreticalKw * safetyFactor;
  const selectedStandardKw = selectStandardHeatStripKw(targetWithMarginKw);
  const totalDeliveredBtu = Math.round(selectedStandardKw * 3412.142);
  
  const excessCapacityKw = Number(Math.max(0, selectedStandardKw - theoreticalRequiredKw).toFixed(2));
  const excessCapacityBtu = Math.round(excessCapacityKw * 3412.142);

  const coveragePercentage = designLoss > 0 
    ? Number((((objective === "supplemental_deficit" ? hpCapacity : 0) + totalDeliveredBtu) / designLoss * 100).toFixed(1))
    : 100;

  // 2. Electrical Load Calculations
  // Continuous duty factor = 125% per NEC 424.3(B)
  const voltageDivisor = phase === 3 ? voltage * Math.sqrt(3) : voltage;
  const rawFla = (selectedStandardKw * 1000) / voltageDivisor;
  const totalFlaAmps = Number(rawFla.toFixed(2));
  const totalMcaAmps = Number((rawFla * 1.25).toFixed(2));
  const suggestedMopdBreakerAmps = getNextStandardBreaker(totalMcaAmps);

  // NEC 424.22 limits single branch circuit load for fixed space heating to 48A FLA (60A breaker)
  const isMultiCircuitRequired = phase === 1 && totalFlaAmps > 48;
  const circuitBranches: ElectricCircuitBranch[] = [];

  if (isMultiCircuitRequired && selectedStandardKw > 10) {
    const kw1 = selectedStandardKw >= 20 ? selectedStandardKw / 2 : 10;
    const kw2 = selectedStandardKw - kw1;
    
    const rawFla1 = (kw1 * 1000) / voltageDivisor;
    const fla1 = Number(rawFla1.toFixed(2));
    const mca1 = Number((rawFla1 * 1.25).toFixed(2));
    const breaker1 = getNextStandardBreaker(mca1);
    
    const rawFla2 = (kw2 * 1000) / voltageDivisor;
    const fla2 = Number(rawFla2.toFixed(2));
    const mca2 = Number((rawFla2 * 1.25).toFixed(2));
    const breaker2 = getNextStandardBreaker(mca2);

    circuitBranches.push({
      circuitNumber: 1,
      assignedKw: kw1,
      flaAmps: fla1,
      mcaAmps: mca1,
      suggestedBreakerAmps: breaker1,
      suggestedWireGaugeAwg: getRecommendedWireGauge(mca1),
    });

    circuitBranches.push({
      circuitNumber: 2,
      assignedKw: kw2,
      flaAmps: fla2,
      mcaAmps: mca2,
      suggestedBreakerAmps: breaker2,
      suggestedWireGaugeAwg: getRecommendedWireGauge(mca2),
    });
  } else {
    circuitBranches.push({
      circuitNumber: 1,
      assignedKw: selectedStandardKw,
      flaAmps: totalFlaAmps,
      mcaAmps: totalMcaAmps,
      suggestedBreakerAmps: suggestedMopdBreakerAmps,
      suggestedWireGaugeAwg: getRecommendedWireGauge(totalMcaAmps),
    });
  }

  // 3. Airflow Screening & Temperature Rise
  const screeningAirflowCfm = Math.round(selectedStandardKw * 45);
  const actualCfm = input.systemAirflowCfm || (tonnage > 0 ? tonnage * 400 : screeningAirflowCfm);
  
  // Delta T = (kW * 3412.142) / (1.08 * CFM)
  const estimatedTempRiseF = actualCfm > 0 
    ? Number(((selectedStandardKw * 3412.142) / (1.08 * actualCfm)).toFixed(1))
    : 0;

  let airflowScreeningStatus: "Adequate Airflow" | "Low Airflow Warning" | "Critical Starvation" = "Adequate Airflow";
  if (actualCfm < screeningAirflowCfm * 0.75) {
    airflowScreeningStatus = "Critical Starvation";
  } else if (actualCfm < screeningAirflowCfm * 0.90) {
    airflowScreeningStatus = "Low Airflow Warning";
  }

  // 4. Illustrative Staging Configurations
  let recommendedStages = 1;
  let stageBreakdownKw: number[] = [selectedStandardKw];
  let controlRecommendation = "Single-stage operation (W1). Compare staging capabilities with manufacturer air-handler kit.";

  if (selectedStandardKw >= 15) {
    recommendedStages = 3;
    stageBreakdownKw = selectedStandardKw === 15 ? [5, 5, 5] : [10, 5, 5];
    controlRecommendation = "3-stage sequenced control (W1/W2/W3) recommended with outdoor ambient lockout.";
  } else if (selectedStandardKw >= 7.5) {
    recommendedStages = 2;
    stageBreakdownKw = selectedStandardKw === 10 ? [5, 5] : selectedStandardKw === 7.5 ? [4.8, 2.7] : [selectedStandardKw / 2, selectedStandardKw / 2];
    controlRecommendation = "2-stage sequenced control (W1/W2) or staged multi-stage thermostat.";
  }

  const summary = `Theoretical deficit requirement is ${theoreticalRequiredKw} kW (${netDeficitBtu.toLocaleString()} BTU/hr). Selected available nominal element: ${selectedStandardKw} kW (${totalDeliveredBtu.toLocaleString()} BTU/hr, +${excessCapacityKw} kW margin). Calculated electrical load: ${totalFlaAmps} A FLA / ${totalMcaAmps} A MCA @ ${voltage}V.`;

  return {
    sizingObjective: objective,
    designHeatLossBtu: designLoss,
    heatPumpCapacityAtDesignBtu: hpCapacity,
    netHeatingDeficitBtu: netDeficitBtu,
    theoreticalRequiredKw,
    selectedStandardKw,
    totalDeliveredBtu,
    excessCapacityKw,
    excessCapacityBtu,
    coveragePercentage,
    sizingMarginPercentage,
    voltage,
    phase,
    totalFlaAmps,
    totalMcaAmps,
    suggestedMopdBreakerAmps,
    isMultiCircuitRequired,
    circuitBranches,
    systemAirflowCfm: actualCfm,
    screeningAirflowCfm,
    airflowScreeningStatus,
    estimatedTempRiseF,
    recommendedStages,
    stageBreakdownKw,
    controlRecommendation,
    summary,
  };
}
