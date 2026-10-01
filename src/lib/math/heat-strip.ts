/**
 * HVACLogic Heat Pump Auxiliary Electric Heat Strip Sizing & Deficit Computational Engine
 *
 * Implements:
 * - ANSI/ACCA 3 Manual S - Residential Equipment Selection, 3rd Edition (2023) Section 4
 * - ACCA Manual J (8th Edition) Heating Design Loss
 * - National Electrical Code (NEC / NFPA 70) Article 220 & Article 424 (Fixed Electric Space Heating)
 * - ASHRAE Handbook - Fundamentals (2021) Space Heating Loads
 * - UL 1995 / UL 60335-2-40 Electric Element Heating Air Handler Standards
 */

export type ElectricalVoltage = 240 | 208 | 480;
export type ElectricalPhase = 1 | 3;
export type SizingObjective = "supplemental_deficit" | "full_emergency_backup" | "defrost_tempering";

export interface HeatStripInput {
  designHeatLossBtu: number; // e.g., 45,000 BTU/hr at 99% winter design temp
  heatPumpCapacityAtDesignBtu: number; // e.g., 24,000 BTU/hr delivered at winter design temp
  nominalTonnage?: number; // e.g., 3.0 tons (for defrost tempering calculations)
  sizingObjective?: SizingObjective; // Default: 'supplemental_deficit'
  systemAirflowCfm?: number; // e.g., 1200 CFM
  voltage?: ElectricalVoltage; // Default: 240V
  phase?: ElectricalPhase; // Default: 1-phase
  safetyOversizeFactor?: number; // Default: 1.00 (1.00 to 1.25)
}

export interface ElectricCircuitBranch {
  circuitNumber: number;
  assignedKw: number;
  flaAmps: number;
  mcaAmps: number;
  breakerAmps: number;
  wireGaugeAwg: string;
}

export interface HeatStripOutput {
  sizingObjective: SizingObjective;
  designHeatLossBtu: number;
  heatPumpCapacityAtDesignBtu: number;
  netHeatingDeficitBtu: number;
  exactRequiredKw: number;
  selectedStandardKw: number;
  totalDeliveredBtu: number;
  coveragePercentage: number;
  defrostTemperingKw: number;
  
  // Electrical Specifications per NEC 424
  voltage: ElectricalVoltage;
  phase: ElectricalPhase;
  totalFlaAmps: number;
  totalMcaAmps: number;
  totalMopdBreakerAmps: number;
  isMultiCircuitRequired: boolean;
  circuitBranches: ElectricCircuitBranch[];
  
  // Airflow & Temperature Rise
  systemAirflowCfm: number;
  minRequiredAirflowCfm: number;
  airflowStatus: "Adequate" | "Low Airflow Warning" | "Critical Starvation";
  estimatedTempRiseF: number;
  
  // Staging & Controls
  recommendedStages: number;
  stageBreakdownKw: number[];
  controlRecommendation: string;
  governingStandard: string;
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
 * Derives recommended copper wire gauge (75°C THHN/THWN copper) per NEC Table 310.16
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
 * Finds next standard breaker size meeting or exceeding MCA
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
 * Selects the nearest standard manufactured heat strip size >= target kW
 */
export function selectStandardHeatStripKw(targetKw: number): number {
  if (targetKw <= 0) return 0;
  for (const size of STANDARD_HEAT_STRIP_SIZES_KW) {
    if (size >= targetKw - 0.05) {
      return size;
    }
  }
  return STANDARD_HEAT_STRIP_SIZES_KW[STANDARD_HEAT_STRIP_SIZES_KW.length - 1];
}

/**
 * Computes deterministic heat strip sizing, circuit breaker requirements, and airflow limits.
 */
export function calculateHeatStripSizing(input: HeatStripInput): HeatStripOutput {
  const designLoss = Math.max(0, input.designHeatLossBtu);
  const hpCapacity = Math.max(0, input.heatPumpCapacityAtDesignBtu);
  const tonnage = input.nominalTonnage || (designLoss > 0 ? designLoss / 12000 : 3.0);
  const objective = input.sizingObjective || "supplemental_deficit";
  const voltage = input.voltage || 240;
  const phase = input.phase || 1;
  const safetyFactor = Math.max(1.0, Math.min(1.5, input.safetyOversizeFactor || 1.0));

  // 1. Deficit Calculation
  const netDeficitBtu = Math.max(0, designLoss - hpCapacity);
  
  // Defrost tempering: Heat pump absorbs ~75% of nominal cooling from indoor coil during reverse defrost
  const defrostCoolingPenaltyBtu = tonnage * 12000 * 0.75;
  const defrostTemperingKw = Number((defrostCoolingPenaltyBtu / 3412.142).toFixed(2));

  let targetKw = 0;
  if (objective === "supplemental_deficit") {
    targetKw = (netDeficitBtu / 3412.142) * safetyFactor;
  } else if (objective === "full_emergency_backup") {
    targetKw = (designLoss / 3412.142) * safetyFactor;
  } else if (objective === "defrost_tempering") {
    targetKw = defrostTemperingKw * safetyFactor;
  }

  const exactRequiredKw = Number(targetKw.toFixed(2));
  const selectedStandardKw = selectStandardHeatStripKw(exactRequiredKw);
  const totalDeliveredBtu = Math.round(selectedStandardKw * 3412.142);
  
  const coveragePercentage = designLoss > 0 
    ? Number((((objective === "supplemental_deficit" ? hpCapacity : 0) + totalDeliveredBtu) / designLoss * 100).toFixed(1))
    : 100;

  // 2. Electrical Sizing per NEC 424.3(B) & 424.22(B)
  // Continuous duty factor = 125%
  const voltageDivisor = phase === 3 ? voltage * Math.sqrt(3) : voltage;
  const totalFlaAmps = Number(((selectedStandardKw * 1000) / voltageDivisor).toFixed(1));
  const totalMcaAmps = Number((totalFlaAmps * 1.25).toFixed(1));
  const totalMopdBreakerAmps = getNextStandardBreaker(totalMcaAmps);

  // NEC 424.22(B) requires resistance heating elements drawing > 48A to be divided into individual branch circuits <= 48A (60A breaker max)
  const isMultiCircuitRequired = phase === 1 && totalFlaAmps > 48;
  const circuitBranches: ElectricCircuitBranch[] = [];

  if (isMultiCircuitRequired && selectedStandardKw > 10) {
    // Partition into 2 balanced circuits (e.g., 15kW -> 10kW + 5kW, or 20kW -> 10kW + 10kW)
    const kw1 = selectedStandardKw >= 20 ? selectedStandardKw / 2 : 10;
    const kw2 = selectedStandardKw - kw1;
    
    const fla1 = Number(((kw1 * 1000) / voltageDivisor).toFixed(1));
    const mca1 = Number((fla1 * 1.25).toFixed(1));
    const breaker1 = getNextStandardBreaker(mca1);
    
    const fla2 = Number(((kw2 * 1000) / voltageDivisor).toFixed(1));
    const mca2 = Number((fla2 * 1.25).toFixed(1));
    const breaker2 = getNextStandardBreaker(mca2);

    circuitBranches.push({
      circuitNumber: 1,
      assignedKw: kw1,
      flaAmps: fla1,
      mcaAmps: mca1,
      breakerAmps: breaker1,
      wireGaugeAwg: getRecommendedWireGauge(mca1),
    });

    circuitBranches.push({
      circuitNumber: 2,
      assignedKw: kw2,
      flaAmps: fla2,
      mcaAmps: mca2,
      breakerAmps: breaker2,
      wireGaugeAwg: getRecommendedWireGauge(mca2),
    });
  } else {
    circuitBranches.push({
      circuitNumber: 1,
      assignedKw: selectedStandardKw,
      flaAmps: totalFlaAmps,
      mcaAmps: totalMcaAmps,
      breakerAmps: totalMopdBreakerAmps,
      wireGaugeAwg: getRecommendedWireGauge(totalMcaAmps),
    });
  }

  // 3. Airflow & Temperature Rise Analysis
  // Standard rule: 40 to 50 CFM per kW (min required = 45 CFM/kW)
  const minRequiredAirflowCfm = Math.round(selectedStandardKw * 45);
  const actualCfm = input.systemAirflowCfm || (tonnage > 0 ? tonnage * 400 : minRequiredAirflowCfm);
  
  // Delta T = (kW * 3412.142) / (1.08 * CFM)
  const estimatedTempRiseF = actualCfm > 0 
    ? Number(((selectedStandardKw * 3412.142) / (1.08 * actualCfm)).toFixed(1))
    : 0;

  let airflowStatus: "Adequate" | "Low Airflow Warning" | "Critical Starvation" = "Adequate";
  if (actualCfm < minRequiredAirflowCfm * 0.8) {
    airflowStatus = "Critical Starvation";
  } else if (actualCfm < minRequiredAirflowCfm) {
    airflowStatus = "Low Airflow Warning";
  }

  // 4. Staging & Control Recommendations
  let recommendedStages = 1;
  let stageBreakdownKw: number[] = [selectedStandardKw];
  let controlRecommendation = "Single-stage thermostat control (W1). Suitable for small residential supplemental loads.";

  if (selectedStandardKw >= 15) {
    recommendedStages = 3;
    stageBreakdownKw = selectedStandardKw === 15 ? [5, 5, 5] : [10, 5, 5];
    controlRecommendation = "3-stage sequenced control (W1/W2/W3) with outdoor low-ambient thermostat lockout (OT) to prevent simultaneous staging during mild ambient temps.";
  } else if (selectedStandardKw >= 8) {
    recommendedStages = 2;
    stageBreakdownKw = selectedStandardKw === 10 ? [5, 5] : [selectedStandardKw / 2, selectedStandardKw / 2];
    controlRecommendation = "2-stage sequenced staging (W1/W2) with 5–10 minute time delay or multi-stage heat pump thermostat.";
  }

  return {
    sizingObjective: objective,
    designHeatLossBtu: designLoss,
    heatPumpCapacityAtDesignBtu: hpCapacity,
    netHeatingDeficitBtu: netDeficitBtu,
    exactRequiredKw,
    selectedStandardKw,
    totalDeliveredBtu,
    coveragePercentage,
    defrostTemperingKw,
    voltage,
    phase,
    totalFlaAmps,
    totalMcaAmps,
    totalMopdBreakerAmps,
    isMultiCircuitRequired,
    circuitBranches,
    systemAirflowCfm: actualCfm,
    minRequiredAirflowCfm,
    airflowStatus,
    estimatedTempRiseF,
    recommendedStages,
    stageBreakdownKw,
    controlRecommendation,
    governingStandard: "ANSI/ACCA 3 Manual S (3rd Ed), ACCA Manual J (8th Ed), and NFPA 70 (NEC Article 424)",
  };
}
