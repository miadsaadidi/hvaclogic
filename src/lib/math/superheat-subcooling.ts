/**
 * HVACLogic — Superheat & Subcooling Field Diagnostic Computational Engine
 *
 * Technical References:
 *   - ANSI/ASHRAE Standard 34 / NIST REFPROP (Refrigerant Thermophysical Saturation Properties)
 *   - ACCA Technician Field Guidelines / OEM Equipment Charging Procedures
 *   - EPA Section 608 (Refrigerant Handling, Recovery & Environmental Compliance)
 *
 * Important Diagnostic Note:
 * This tool computes saturation temperatures from measured manifold pressures and evaluates
 * superheat and subcooling relative to target values. Proper system assessment requires
 * verifying indoor airflow, operating conditions, and manufacturer-specific charging charts.
 */

import { getRefrigerantSaturationTemp, REFRIGERANTS } from "./refrigerants";

export type MeteringDevice = "fixed_orifice" | "txv_eev";

export interface ChargingInput {
  meteringDevice: MeteringDevice;
  refrigerantId: string;
  // Pressures (psig)
  suctionPressurePsig: number;
  liquidPressurePsig?: number;
  // Temperatures (°F)
  suctionLineTempF: number;
  liquidLineTempF?: number;
  // Ambient & Indoor conditions (for fixed orifice target SH correlation)
  indoorWetBulbF?: number;
  outdoorDryBulbF?: number;
  // Target subcooling (for TXV/EEV systems from OEM data plate)
  targetSubcoolingF?: number;
}

export type ChargeStatus = "optimal" | "undercharged" | "overcharged" | "restriction" | "low_airflow" | "warning";

export interface DiagnosticResult {
  status: ChargeStatus;
  statusLabel: string;
  badgeColor: "success" | "warning" | "danger" | "info";
  summary: string;
  primaryDiagnosis: string;
  recommendedChecks: string[];
  safetyNotice?: string;
}

export interface ChargingOutput {
  refrigerant: {
    id: string;
    name: string;
    safetyClass: string;
    isA2L: boolean;
    hasGlide: boolean;
  };
  meteringDevice: MeteringDevice;
  // Saturation temperatures
  evaporatorSatTempF: number; // Dew point for vapor line
  condenserSatTempF?: number; // Bubble point for liquid line
  // Actual values
  actualSuperheatF: number;
  actualSubcoolingF?: number;
  // Targets
  targetSuperheatF?: number;
  targetSubcoolingF?: number;
  // Deltas
  superheatDeltaF?: number;
  subcoolingDeltaF?: number;
  // Diagnosis
  diagnostic: DiagnosticResult;
}

/**
 * Standard Field Diagnostic Target Superheat Correlation for Fixed Metering Devices:
 * Target SH = (3 * T_wb_in - T_db_out - 80) / 2
 * Applicable when T_wb_in is 50–76°F and T_db_out is 55–115°F per standard field guidelines.
 */
export function calculateTargetSuperheat(indoorWetBulbF: number, outdoorDryBulbF: number): number {
  const raw = (3 * indoorWetBulbF - outdoorDryBulbF - 80) / 2;
  // Practical diagnostic limits (5°F to 35°F)
  return Math.round(Math.max(5, Math.min(35, raw)) * 10) / 10;
}

/**
 * Master Superheat & Subcooling Diagnostic Solver
 */
export function calculateChargingDiagnostic(input: ChargingInput): ChargingOutput {
  const refrig = REFRIGERANTS[input.refrigerantId.toLowerCase()] || REFRIGERANTS.r410a;
  const isA2L = refrig.safetyClass === "A2L";

  // 1. Evaporator Saturation Temperature (Dew Point for vapor line)
  const evapSatTemp = getRefrigerantSaturationTemp(refrig.id, input.suctionPressurePsig, "dew");
  const actualSH = Math.round((input.suctionLineTempF - evapSatTemp) * 10) / 10;

  // 2. Condenser Saturation Temperature (Bubble Point for liquid line) if liquid pressure provided
  let condSatTemp: number | undefined;
  let actualSC: number | undefined;
  if (input.liquidPressurePsig !== undefined && input.liquidLineTempF !== undefined) {
    condSatTemp = getRefrigerantSaturationTemp(refrig.id, input.liquidPressurePsig, "bubble");
    actualSC = Math.round((condSatTemp - input.liquidLineTempF) * 10) / 10;
  }

  // 3. Targets
  let targetSH: number | undefined;
  let targetSC: number | undefined;
  let shDelta: number | undefined;
  let scDelta: number | undefined;

  if (input.meteringDevice === "fixed_orifice") {
    const wb = input.indoorWetBulbF ?? 67;
    const db = input.outdoorDryBulbF ?? 95;
    targetSH = calculateTargetSuperheat(wb, db);
    shDelta = Math.round((actualSH - targetSH) * 10) / 10;
  } else {
    // TXV / EEV uses target subcooling from manufacturer data plate (default reference 10°F)
    targetSC = input.targetSubcoolingF ?? 10.0;
    if (actualSC !== undefined) {
      scDelta = Math.round((actualSC - targetSC) * 10) / 10;
    }
  }

  // 4. Decision Tree Multi-Point Diagnosis
  const diagnostic = evaluateSystemHealth({
    metering: input.meteringDevice,
    actualSH,
    targetSH,
    actualSC,
    targetSC,
    isA2L,
    evapSatTemp,
  });

  return {
    refrigerant: {
      id: refrig.id,
      name: refrig.name,
      safetyClass: refrig.safetyClass,
      isA2L,
      hasGlide: refrig.hasGlide,
    },
    meteringDevice: input.meteringDevice,
    evaporatorSatTempF: evapSatTemp,
    condenserSatTempF: condSatTemp,
    actualSuperheatF: actualSH,
    actualSubcoolingF: actualSC,
    targetSuperheatF: targetSH,
    targetSubcoolingF: targetSC,
    superheatDeltaF: shDelta,
    subcoolingDeltaF: scDelta,
    diagnostic,
  };
}

interface HealthEvalParams {
  metering: MeteringDevice;
  actualSH: number;
  targetSH?: number;
  actualSC?: number;
  targetSC?: number;
  isA2L: boolean;
  evapSatTemp: number;
}

function evaluateSystemHealth(p: HealthEvalParams): DiagnosticResult {
  const safetyNotice = p.isA2L
    ? "⚠️ A2L Mild Flammability Notice: Use spark-proof recovery equipment, A2L rated vacuum pumps, and verify leak detection before torch work."
    : undefined;

  // Freezing Risk Alert
  if (p.evapSatTemp < 32.0) {
    return {
      status: "warning",
      statusLabel: "Low Saturation Hazard (Sat < 32°F)",
      badgeColor: "danger",
      summary: `Evaporator saturation temperature (${p.evapSatTemp}°F) is below the 32°F freezing threshold, indicating risk of coil frost or icing under extended operation.`,
      primaryDiagnosis: "Potential Severe Airflow Restriction or Severe Refrigerant Undercharge",
      recommendedChecks: [
        "Inspect indoor air filter and check for dirty/matted evaporator coil surfaces",
        "Verify blower motor operation, speed tap, and external static pressure",
        "Check refrigerant charge after verifying design airflow (> 350 CFM/ton)",
      ],
      safetyNotice,
    };
  }

  // Fixed Orifice Diagnostic Evaluation
  if (p.metering === "fixed_orifice") {
    const target = p.targetSH ?? 12.0;
    const diff = p.actualSH - target;

    if (Math.abs(diff) <= 3.0) {
      return {
        status: "optimal",
        statusLabel: "Within Target Band (±3°F)",
        badgeColor: "success",
        summary: `Actual Superheat (${p.actualSH}°F) is within ±3°F of calculated target (${target}°F). No charging adjustment indicated by this measurement alone.`,
        primaryDiagnosis: "Measured Parameters Within Configured Target Band",
        recommendedChecks: [
          "Operating parameters match standard field correlation under current conditions",
          "Verify indoor airflow and clean filters for sustained performance",
        ],
        safetyNotice,
      };
    } else if (diff > 3.0) {
      // High Superheat
      return {
        status: "undercharged",
        statusLabel: "High Superheat (Starved Evaporator Pattern)",
        badgeColor: "danger",
        summary: `Actual Superheat (${p.actualSH}°F) is ${diff.toFixed(1)}°F above target (${target}°F), indicating less liquid refrigerant vaporizing in the coil.`,
        primaryDiagnosis: "Pattern Suggests Potential Undercharge, Orifice Restriction, or Elevated Indoor Load",
        recommendedChecks: [
          "Check indoor airflow and ensure return air wet bulb is within valid operating range",
          "Inspect liquid line filter drier for temperature drop (compare with OEM recommendations)",
          "Perform electronic leak detection before considering refrigerant addition",
          "Verify piston orifice sizing matches manufacturer equipment pairing",
        ],
        safetyNotice,
      };
    } else {
      // Low Superheat
      return {
        status: "overcharged",
        statusLabel: "Low Superheat (Flooded Evaporator Pattern)",
        badgeColor: "warning",
        summary: `Actual Superheat (${p.actualSH}°F) is ${Math.abs(diff).toFixed(1)}°F below target (${target}°F), indicating excess liquid in evaporator or low heat absorption.`,
        primaryDiagnosis: "Pattern Suggests Potential Overcharge or Low Indoor Airflow",
        recommendedChecks: [
          "Verify indoor airflow (check filter, blower wheel cleanliness, duct static pressure)",
          "Verify return air wet bulb is not unusually low (<50°F)",
          "If airflow and load are normal, recover excess refrigerant into certified cylinder per EPA guidelines",
        ],
        safetyNotice,
      };
    }
  }

  // TXV / EEV Diagnostic Evaluation (Multi-point if both SH and SC available)
  const targetSC = p.targetSC ?? 10.0;
  const actualSC = p.actualSC ?? 10.0;
  const scDiff = actualSC - targetSC;
  const isOptimalSC = Math.abs(scDiff) <= 3.0;

  // Multi-point cross-referencing thresholds
  const isHighSH = p.actualSH > 18.0;
  const isLowSH = p.actualSH < 6.0;
  const isHighSC = scDiff > 3.0;
  const isLowSC = scDiff < -3.0;

  if (isHighSH && isLowSC) {
    return {
      status: "undercharged",
      statusLabel: "Undercharge Pattern (High SH / Low SC)",
      badgeColor: "danger",
      summary: `High Superheat (${p.actualSH}°F) combined with Low Subcooling (${actualSC}°F) indicates a starved condenser and evaporator.`,
      primaryDiagnosis: "Pattern Consistent with Refrigerant Undercharge or Active Leak",
      recommendedChecks: [
        "Perform electronic leak detection on service ports, flare fittings, and coil joints",
        "Verify system holds pressure/vacuum before adding refrigerant",
        "Check that indoor airflow meets design requirements",
      ],
      safetyNotice,
    };
  }

  if (isLowSH && isHighSC) {
    return {
      status: "overcharged",
      statusLabel: "Overcharge Pattern (Low SH / High SC)",
      badgeColor: "warning",
      summary: `Low Superheat (${p.actualSH}°F) and High Subcooling (${actualSC}°F) indicates liquid refrigerant stacking in the condenser.`,
      primaryDiagnosis: "Pattern Consistent with Refrigerant Overcharge or TXV Over-feeding",
      recommendedChecks: [
        "Inspect TXV thermal bulb contact, orientation, and insulation on suction line",
        "If TXV operation and airflow are verified, recover refrigerant into certified recovery cylinder",
      ],
      safetyNotice,
    };
  }

  if (isHighSH && isHighSC) {
    return {
      status: "restriction",
      statusLabel: "Restriction Pattern (High SH / High SC)",
      badgeColor: "danger",
      summary: `High Superheat (${p.actualSH}°F) with High Subcooling (${actualSC}°F) indicates liquid refrigerant is backed up in the condenser and restricted before the evaporator.`,
      primaryDiagnosis: "Pattern Consistent with Liquid Line Restriction, Restricted Filter Drier, or Throttled TXV",
      recommendedChecks: [
        "Inspect liquid line filter drier for abnormal temperature drop across the component",
        "Check TXV thermal sensing bulb charge, mechanical contact, and inlet screen",
        "Check for kinked liquid line tubing or restricted solenoid valves",
      ],
      safetyNotice,
    };
  }

  if (isLowSH && isLowSC) {
    return {
      status: "low_airflow",
      statusLabel: "Low Load / Airflow Pattern (Low SH / Low SC)",
      badgeColor: "warning",
      summary: `Low Superheat (${p.actualSH}°F) with Low Subcooling (${actualSC}°F) indicates low heat absorption across the evaporator coil.`,
      primaryDiagnosis: "Pattern Consistent with Low Indoor Airflow or Low Evaporator Heat Load",
      recommendedChecks: [
        "Inspect indoor air filter and check for dirty or matted coil fins",
        "Verify blower motor speed setting, belt tension, and duct static pressure",
        "Verify return air temperature and sensible heat load",
      ],
      safetyNotice,
    };
  }

  if (isOptimalSC) {
    return {
      status: "optimal",
      statusLabel: "Subcooling Within Target Band (±3°F)",
      badgeColor: "success",
      summary: `Actual Subcooling (${actualSC}°F) is within ±3°F of target (${targetSC}°F). No charging adjustment indicated by this measurement alone.`,
      primaryDiagnosis: "Subcooling Within Configured Target Band",
      recommendedChecks: [
        "Subcooling matches manufacturer data plate target under current operating conditions",
        "Record liquid pressure, suction pressure, and line temperatures in service log",
        "Verify superheat is within normal operating range (typically 8°F–18°F for TXV)",
      ],
      safetyNotice,
    };
  }

  return {
    status: isHighSC ? "overcharged" : "undercharged",
    statusLabel: isHighSC ? "High Subcooling" : "Low Subcooling",
    badgeColor: isHighSC ? "warning" : "danger",
    summary: `Subcooling (${actualSC}°F) is outside target range (${targetSC}°F ± 3°F).`,
    primaryDiagnosis: isHighSC ? "Potential Overcharge or Partial High-Side Stacking" : "Potential Undercharge or High Heat Load",
    recommendedChecks: [
      "Verify TXV bulb mounting, contact, and insulation",
      "Verify indoor airflow and outdoor ambient conditions before adjusting refrigerant",
    ],
    safetyNotice,
  };
}

