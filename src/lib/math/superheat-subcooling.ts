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
  // Ambient & Indoor conditions (for fixed orifice target SH)
  indoorWetBulbF?: number;
  outdoorDryBulbF?: number;
  // Target subcooling (for TXV/EEV)
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
  evaporatorSatTempF: number; // Dew point
  condenserSatTempF?: number; // Bubble point
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
 * Standard EPA / ACCA Target Superheat Equation for Fixed Metering Devices:
 * Target SH = (3 * T_wb_in - T_db_out - 80) / 2
 * Valid when T_wb_in is 50-76°F and T_db_out is 55-115°F
 */
export function calculateTargetSuperheat(indoorWetBulbF: number, outdoorDryBulbF: number): number {
  const raw = (3 * indoorWetBulbF - outdoorDryBulbF - 80) / 2;
  // Clamp between practical field engineering limits (5°F to 35°F)
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
    // TXV / EEV uses target subcooling from nameplate (default 10°F)
    targetSC = input.targetSubcoolingF ?? 10.0;
    if (actualSC !== undefined) {
      scDelta = Math.round((actualSC - targetSC) * 10) / 10;
    }
  }

  // 4. Decision Tree Multi-Point Diagnosis (per Document 12 safety standards)
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
      statusLabel: "Coil Freezing Hazard (Sat < 32°F)",
      badgeColor: "danger",
      summary: `Evaporator saturation temperature (${p.evapSatTemp}°F) is below 32°F freezing threshold. Coil icing imminent.`,
      primaryDiagnosis: "Severe Airflow Starvation or Severe Refrigerant Undercharge",
      recommendedChecks: [
        "Inspect indoor air filter and check for dirty/matted evaporator coil",
        "Verify blower motor operation and static pressure drop across coil",
        "Check refrigerant charge if airflow is verified > 350 CFM/ton",
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
        statusLabel: "Optimal Charge (Within ±3°F)",
        badgeColor: "success",
        summary: `Actual Superheat (${p.actualSH}°F) matches calculated target (${target}°F) within ACCA tolerance.`,
        primaryDiagnosis: "Normal Refrigerant Charge & Optimal Evaporator Performance",
        recommendedChecks: [
          "System charge is operating within manufacturer specification",
          "Ensure indoor return air filters remain clean for continued efficiency",
        ],
        safetyNotice,
      };
    } else if (diff > 3.0) {
      // High Superheat
      return {
        status: "undercharged",
        statusLabel: "High Superheat (Starved Evaporator)",
        badgeColor: "danger",
        summary: `Actual Superheat (${p.actualSH}°F) is ${diff.toFixed(1)}°F higher than target (${target}°F).`,
        primaryDiagnosis: "Undercharged System or Metering Orifice Restriction",
        recommendedChecks: [
          "Perform electronic leak check on service ports, flare fittings, and U-bends",
          "Inspect liquid line filter drier for temperature drop (ΔT > 2°F indicates restriction)",
          "Verify piston orifice sizing matches outdoor unit specification",
        ],
        safetyNotice,
      };
    } else {
      // Low Superheat
      return {
        status: "overcharged",
        statusLabel: "Low Superheat (Flooded Evaporator)",
        badgeColor: "warning",
        summary: `Actual Superheat (${p.actualSH}°F) is ${Math.abs(diff).toFixed(1)}°F lower than target (${target}°F). Risk of liquid floodback.`,
        primaryDiagnosis: "System Overcharge or Low Indoor Airflow",
        recommendedChecks: [
          "Verify indoor airflow (check dirty air filter, duct dampers, blower speed)",
          "Ensure indoor return air wet bulb is not unusually low (<50°F)",
          "If airflow is verified normal, recover excess refrigerant according to EPA Section 608",
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

  // If we also have superheat reading for TXV
  const isHighSH = p.actualSH > 18.0;
  const isLowSH = p.actualSH < 6.0;
  const isHighSC = scDiff > 3.0;
  const isLowSC = scDiff < -3.0;

  if (isHighSH && isLowSC) {
    return {
      status: "undercharged",
      statusLabel: "Undercharged (High SH / Low SC)",
      badgeColor: "danger",
      summary: `High Superheat (${p.actualSH}°F) combined with Low Subcooling (${actualSC}°F) indicates a starved condenser and evaporator.`,
      primaryDiagnosis: "Refrigerant Undercharge / Active System Leak",
      recommendedChecks: [
        "Perform thorough electronic leak detection before adding refrigerant",
        "Inspect Schrader valves, braze joints, and service access fittings with soap bubbles",
        "Verify system holds vacuum or pressure test before recharging",
      ],
      safetyNotice,
    };
  }

  if (isLowSH && isHighSC) {
    return {
      status: "overcharged",
      statusLabel: "Overcharged (Low SH / High SC)",
      badgeColor: "warning",
      summary: `Low Superheat (${p.actualSH}°F) and High Subcooling (${actualSC}°F) indicates liquid refrigerant stacking in condenser.`,
      primaryDiagnosis: "Refrigerant Overcharge",
      recommendedChecks: [
        "Recover refrigerant into certified recovery cylinder (do not vent)",
        "Check for over-feeding TXV (loose sensing bulb or failed internal spring)",
      ],
      safetyNotice,
    };
  }

  if (isHighSH && isHighSC) {
    return {
      status: "restriction",
      statusLabel: "Liquid Line Restriction (High SH / High SC)",
      badgeColor: "danger",
      summary: `High Superheat (${p.actualSH}°F) with High Subcooling (${actualSC}°F) indicates refrigerant is backed up in the condenser and cannot reach evaporator.`,
      primaryDiagnosis: "Liquid Line Restriction / Plugged Filter Drier / Closed TXV",
      recommendedChecks: [
        "Measure temperature drop across liquid line filter drier (ΔT > 2°F confirms restricted drier)",
        "Check TXV thermal sensing bulb contact and insulation on suction line",
        "Check for kinked liquid line tubing or plugged TXV inlet screen",
      ],
      safetyNotice,
    };
  }

  if (isLowSH && isLowSC) {
    return {
      status: "low_airflow",
      statusLabel: "Low Evaporator Airflow (Low SH / Low SC)",
      badgeColor: "warning",
      summary: `Low Superheat (${p.actualSH}°F) with Low Subcooling (${actualSC}°F) indicates low heat load absorption in the evaporator.`,
      primaryDiagnosis: "Low Indoor Airflow / Dirty Filter / Blower Failure",
      recommendedChecks: [
        "Replace dirty 1-inch or 4-inch pleated air filter",
        "Inspect evaporator coil for lint, dust, or grease coating",
        "Verify blower motor capacitor, belt tension, and ECM speed tap setting",
      ],
      safetyNotice,
    };
  }

  if (isOptimalSC) {
    return {
      status: "optimal",
      statusLabel: "Optimal Charge (Subcooling on Target)",
      badgeColor: "success",
      summary: `Actual Subcooling (${actualSC}°F) matches target (${targetSC}°F) within manufacturer ±3°F tolerance band.`,
      primaryDiagnosis: "Optimal Refrigerant Charge & Balanced TXV Operation",
      recommendedChecks: [
        "Refrigerant charge is balanced and operating at peak energy efficiency",
        "Record liquid pressure, suction pressure, and line temperatures in service log",
      ],
      safetyNotice,
    };
  }

  return {
    status: isHighSC ? "overcharged" : "undercharged",
    statusLabel: isHighSC ? "High Subcooling" : "Low Subcooling",
    badgeColor: isHighSC ? "warning" : "danger",
    summary: `Subcooling (${actualSC}°F) is out of target range (${targetSC}°F ± 3°F).`,
    primaryDiagnosis: isHighSC ? "Potential Overcharge" : "Potential Undercharge",
    recommendedChecks: [
      "Verify TXV bulb mounting and thermal insulation",
      "Check airflow before making refrigerant adjustments",
    ],
    safetyNotice,
  };
}
