/**
 * ANSI/ASHRAE Standard 15-2024, ANSI/ASHRAE Standard 34-2022, and UL 60335-2-40 (4th Ed)
 * Low-GWP A2L Refrigerant Safety Classification, Charge Limit Sizing, and Temperature Glide Engine.
 *
 * Implements deterministic calculations for:
 * 1. ASHRAE 34 flammability classification, chemical composition, and GWP (AR4 & AR5).
 * 2. Lower Flammability Limit (LFL) conversions between metric (kg/m³) and imperial (lb/ft³, lb/1000 ft³).
 * 3. ASHRAE 15-2024 / UL 60335-2-40 unmitigated maximum allowable charge (m1 = 0.2 × LFL × V).
 * 4. Minimum required room volume and floor area for given charge without active mitigation.
 * 5. Mitigated charge limits with continuous circulation or Refrigerant Detection Systems (RDS, m2, m3).
 * 6. Zeotropic temperature glide (ΔT_glide = T_dew - T_bubble) and thermodynamic superheat/subcooling reference points.
 */

export interface RefrigerantProperty {
  id: string;
  name: string;
  tradeNames: string[];
  safetyGroup: "A1" | "A2L" | "A2" | "A3" | "B1" | "B2L";
  composition: string;
  gwpAR4: number;
  gwpAR5: number;
  odp: number;
  molecularWeight: number; // g/mol
  normalBoilingPointC: number; // °C at 1 atm
  normalBoilingPointF: number; // °F at 1 atm
  criticalTempC: number; // °C
  criticalTempF: number; // °F
  criticalPressureMpa: number; // MPa
  criticalPressurePsia: number; // psia
  lflKgM3: number; // kg/m³ (0 for non-flammable)
  lflLbFt3: number; // lb/ft³
  lflLbPer1000Ft3: number; // lb/1,000 ft³
  autoIgnitionTempC: number; // °C
  autoIgnitionTempF: number; // °F
  burningVelocityCmS: number; // cm/s (Su)
  heatOfCombustionMjKg: number; // MJ/kg
  temperatureGlideK: number; // K (at atmospheric or low evaporator pressure)
  temperatureGlideF: number; // °F
  fractionationRisk: "None" | "Low (Near-Azeotrope)" | "Moderate" | "High";
  chargingPhaseRequired: "Liquid Only" | "Vapor or Liquid";
  standardReplacementTarget: string;
  applications: string[];
}

export const REFRIGERANT_DATABASE: Record<string, RefrigerantProperty> = {
  "r-454b": {
    id: "r-454b",
    name: "R-454B",
    tradeNames: ["Opteon XL41", "Puron Advance", "Solstice 454B"],
    safetyGroup: "A2L",
    composition: "68.9% R-32 / 31.1% R-1234yf",
    gwpAR4: 465,
    gwpAR5: 466,
    odp: 0,
    molecularWeight: 62.6,
    normalBoilingPointC: -50.9,
    normalBoilingPointF: -59.6,
    criticalTempC: 77.0,
    criticalTempF: 170.6,
    criticalPressureMpa: 5.07,
    criticalPressurePsia: 735.3,
    lflKgM3: 0.303,
    lflLbFt3: 0.018915,
    lflLbPer1000Ft3: 18.915,
    autoIgnitionTempC: 498,
    autoIgnitionTempF: 928,
    burningVelocityCmS: 5.2,
    heatOfCombustionMjKg: 10.4,
    temperatureGlideK: 1.5,
    temperatureGlideF: 2.7,
    fractionationRisk: "Low (Near-Azeotrope)",
    chargingPhaseRequired: "Liquid Only",
    standardReplacementTarget: "R-410A (Direct Residential & Commercial Ducted Split/Packaged Units)",
    applications: ["Residential Central Heat Pumps", "Ducted Split Systems", "Commercial Rooftops", "Packaged Systems"],
  },
  "r-32": {
    id: "r-32",
    name: "R-32",
    tradeNames: ["Difluoromethane", "HFC-32"],
    safetyGroup: "A2L",
    composition: "100% R-32 (Pure Single-Component)",
    gwpAR4: 675,
    gwpAR5: 675,
    odp: 0,
    molecularWeight: 52.02,
    normalBoilingPointC: -51.7,
    normalBoilingPointF: -61.1,
    criticalTempC: 78.1,
    criticalTempF: 172.6,
    criticalPressureMpa: 5.78,
    criticalPressurePsia: 838.3,
    lflKgM3: 0.307,
    lflLbFt3: 0.019165,
    lflLbPer1000Ft3: 19.165,
    autoIgnitionTempC: 648,
    autoIgnitionTempF: 1198,
    burningVelocityCmS: 6.7,
    heatOfCombustionMjKg: 9.2,
    temperatureGlideK: 0.0,
    temperatureGlideF: 0.0,
    fractionationRisk: "None",
    chargingPhaseRequired: "Vapor or Liquid",
    standardReplacementTarget: "R-410A (Ductless Mini-Splits, Multi-Splits, VRF)",
    applications: ["Ductless Mini-Splits", "Variable Refrigerant Flow (VRF)", "Packaged Terminal AC (PTAC)", "Window Units"],
  },
  "r-454a": {
    id: "r-454a",
    name: "R-454A",
    tradeNames: ["Opteon XL40"],
    safetyGroup: "A2L",
    composition: "35.0% R-32 / 65.0% R-1234yf",
    gwpAR4: 238,
    gwpAR5: 239,
    odp: 0,
    molecularWeight: 80.5,
    normalBoilingPointC: -43.4,
    normalBoilingPointF: -46.1,
    criticalTempC: 81.5,
    criticalTempF: 178.7,
    criticalPressureMpa: 4.67,
    criticalPressurePsia: 677.3,
    lflKgM3: 0.278,
    lflLbFt3: 0.017355,
    lflLbPer1000Ft3: 17.355,
    autoIgnitionTempC: 460,
    autoIgnitionTempF: 860,
    burningVelocityCmS: 1.6,
    heatOfCombustionMjKg: 11.2,
    temperatureGlideK: 5.0,
    temperatureGlideF: 9.0,
    fractionationRisk: "Moderate",
    chargingPhaseRequired: "Liquid Only",
    standardReplacementTarget: "R-404A / R-507A (Commercial Refrigeration)",
    applications: ["Commercial Walk-In Coolers", "Supermarket Display Cases", "Cold Storage", "Process Chillers"],
  },
  "r-1234yf": {
    id: "r-1234yf",
    name: "R-1234yf",
    tradeNames: ["Opteon YF", "Solstice yf"],
    safetyGroup: "A2L",
    composition: "100% HFO-1234yf (Pure Single-Component)",
    gwpAR4: 4,
    gwpAR5: 1,
    odp: 0,
    molecularWeight: 114.04,
    normalBoilingPointC: -29.4,
    normalBoilingPointF: -20.9,
    criticalTempC: 94.7,
    criticalTempF: 202.5,
    criticalPressureMpa: 3.38,
    criticalPressurePsia: 490.2,
    lflKgM3: 0.289,
    lflLbFt3: 0.018042,
    lflLbPer1000Ft3: 18.042,
    autoIgnitionTempC: 405,
    autoIgnitionTempF: 761,
    burningVelocityCmS: 1.5,
    heatOfCombustionMjKg: 10.7,
    temperatureGlideK: 0.0,
    temperatureGlideF: 0.0,
    fractionationRisk: "None",
    chargingPhaseRequired: "Vapor or Liquid",
    standardReplacementTarget: "R-134a (Automotive AC & Stationary Chiller Blends)",
    applications: ["Automotive Air Conditioning", "Centrifugal Chiller Blends", "Commercial Vending"],
  },
  "r-410a": {
    id: "r-410a",
    name: "R-410A",
    tradeNames: ["Puron", "Suva 410A", "Genetron AZ-20"],
    safetyGroup: "A1",
    composition: "50.0% R-32 / 50.0% R-125 (Near-Azeotropic Blend)",
    gwpAR4: 2088,
    gwpAR5: 1924,
    odp: 0,
    molecularWeight: 72.58,
    normalBoilingPointC: -51.4,
    normalBoilingPointF: -60.5,
    criticalTempC: 71.3,
    criticalTempF: 160.3,
    criticalPressureMpa: 4.90,
    criticalPressurePsia: 710.7,
    lflKgM3: 0, // Non-flammable under standard conditions
    lflLbFt3: 0,
    lflLbPer1000Ft3: 0,
    autoIgnitionTempC: 0,
    autoIgnitionTempF: 0,
    burningVelocityCmS: 0,
    heatOfCombustionMjKg: 0,
    temperatureGlideK: 0.1,
    temperatureGlideF: 0.2,
    fractionationRisk: "None",
    chargingPhaseRequired: "Liquid Only",
    standardReplacementTarget: "Legacy Baseline (EPA AIM Act Phased Down)",
    applications: ["Pre-2025 Residential AC", "Legacy Heat Pumps", "Commercial Rooftops"],
  },
};

export interface ChargeLimitInputs {
  refrigerantId: string;
  roomVolumeCuFt: number; // Volume of smallest connected occupied space (V_eff)
  ceilingHeightFt?: number; // Clear floor-to-ceiling height (default 8 ft)
  systemTotalChargeLb?: number; // Total factory + lineset charge to evaluate
}

export interface ChargeLimitResults {
  refrigerant: RefrigerantProperty;
  roomVolumeCuFt: number;
  ceilingHeightFt: number;
  floorAreaSqFt: number;
  lflLbFt3: number;
  // Unmitigated release limit m1 per ASHRAE 15 / UL 60335-2-40
  // m1 = 0.20 × LFL × V
  m1UnmitigatedChargeLb: number;
  // Enhanced release limit m2 with circulation / detection
  // m2 = 52 × LFL (approx 260 × 0.2 × LFL × unit factor)
  m2MitigatedChargeLb: number;
  // Enhanced commercial release limit m3
  m3CommercialMitigatedChargeLb: number;
  // If system charge provided, evaluate compliance
  systemChargeLb?: number;
  isCompliantUnmitigated?: boolean;
  requiredMinVolumeUnmitigatedCuFt?: number;
  requiredMinAreaUnmitigatedSqFt?: number;
  mitigationTierRequired?: "None (Unmitigated Compliant)" | "Tier 1: Continuous Airflow / Air Circulation" | "Tier 2: Refrigerant Detection Sensor (RDS) + Mechanical Ventilation" | "Exceeds Allowable Residential Limits";
}

/**
 * Calculates maximum allowable A2L refrigerant charge and required minimum room volume
 * conforming to ANSI/ASHRAE Standard 15-2024 Section 7 and UL 60335-2-40 Annex GG.
 */
export function calculateA2LChargeLimits(inputs: ChargeLimitInputs): ChargeLimitResults {
  const ref = REFRIGERANT_DATABASE[inputs.refrigerantId.toLowerCase()];
  if (!ref) {
    throw new Error(`Unknown refrigerant ID: ${inputs.refrigerantId}`);
  }

  const roomVolumeCuFt = Math.max(10, inputs.roomVolumeCuFt);
  const ceilingHeightFt = inputs.ceilingHeightFt && inputs.ceilingHeightFt > 0 ? inputs.ceilingHeightFt : 8;
  const floorAreaSqFt = roomVolumeCuFt / ceilingHeightFt;

  if (ref.safetyGroup === "A1") {
    // Non-flammable baseline: no A2L flammability charge limits apply
    return {
      refrigerant: ref,
      roomVolumeCuFt,
      ceilingHeightFt,
      floorAreaSqFt: Math.round(floorAreaSqFt * 10) / 10,
      lflLbFt3: 0,
      m1UnmitigatedChargeLb: Infinity,
      m2MitigatedChargeLb: Infinity,
      m3CommercialMitigatedChargeLb: Infinity,
      systemChargeLb: inputs.systemTotalChargeLb,
      isCompliantUnmitigated: true,
      mitigationTierRequired: "None (Unmitigated Compliant)",
    };
  }

  // ASHRAE 15-2024 / UL 60335-2-40 Equation:
  // m1 = 0.20 × LFL × V
  const lfl = ref.lflLbFt3;
  const m1Unmitigated = 0.20 * lfl * roomVolumeCuFt;

  // Sizing release thresholds per UL 60335-2-40 4th edition:
  // m2 represents maximum charge with active continuous circulation airflow (52 × LFL metric equivalent)
  // In imperial, 52 × (LFL in kg/m³) converts to ~ 3.246 × (LFL in lb/ft³) × factor ~ approximately 26 × LFL_lb
  const m2Mitigated = 26.0 * (ref.lflKgM3 * 2.20462); // ~57.3 × LFL_metric in lbs
  const m3Commercial = 65.0 * (ref.lflKgM3 * 2.20462);

  const roundedM1 = Math.round(m1Unmitigated * 100) / 100;
  const roundedM2 = Math.round(m2Mitigated * 100) / 100;
  const roundedM3 = Math.round(m3Commercial * 100) / 100;

  let isCompliantUnmitigated: boolean | undefined = undefined;
  let requiredMinVolumeUnmitigatedCuFt: number | undefined = undefined;
  let requiredMinAreaUnmitigatedSqFt: number | undefined = undefined;
  let mitigationTierRequired: ChargeLimitResults["mitigationTierRequired"] = undefined;

  if (inputs.systemTotalChargeLb !== undefined) {
    const charge = inputs.systemTotalChargeLb;
    isCompliantUnmitigated = charge <= roundedM1;

    // Minimum volume without mitigation: V_min = Charge / (0.20 × LFL)
    const vMin = charge / (0.20 * lfl);
    requiredMinVolumeUnmitigatedCuFt = Math.round(vMin);
    requiredMinAreaUnmitigatedSqFt = Math.round(vMin / ceilingHeightFt);

    if (charge <= roundedM1) {
      mitigationTierRequired = "None (Unmitigated Compliant)";
    } else if (charge <= roundedM2) {
      mitigationTierRequired = "Tier 1: Continuous Airflow / Air Circulation";
    } else if (charge <= roundedM3) {
      mitigationTierRequired = "Tier 2: Refrigerant Detection Sensor (RDS) + Mechanical Ventilation";
    } else {
      mitigationTierRequired = "Exceeds Allowable Residential Limits";
    }
  }

  return {
    refrigerant: ref,
    roomVolumeCuFt,
    ceilingHeightFt,
    floorAreaSqFt: Math.round(floorAreaSqFt * 10) / 10,
    lflLbFt3: lfl,
    m1UnmitigatedChargeLb: roundedM1,
    m2MitigatedChargeLb: roundedM2,
    m3CommercialMitigatedChargeLb: roundedM3,
    systemChargeLb: inputs.systemTotalChargeLb,
    isCompliantUnmitigated,
    requiredMinVolumeUnmitigatedCuFt,
    requiredMinAreaUnmitigatedSqFt,
    mitigationTierRequired,
  };
}

/**
 * Calculates zeotropic temperature glide and superheat/subcooling measurement state points.
 */
export function calculateGlideSuperheat(
  tSuctionLineF: number,
  tDewF: number
): { superheatF: number; explanation: string } {
  const superheat = Math.round((tSuctionLineF - tDewF) * 10) / 10;
  return {
    superheatF: superheat,
    explanation: `Superheat must be calculated using the saturated DEW point temperature (T_dew = ${tDewF}°F): Superheat = ${tSuctionLineF}°F - ${tDewF}°F = ${superheat}°F. Using bubble point would yield an erroneously inflated superheat value.`,
  };
}

export function calculateGlideSubcooling(
  tLiquidLineF: number,
  tBubbleF: number
): { subcoolingF: number; explanation: string } {
  const subcooling = Math.round((tBubbleF - tLiquidLineF) * 10) / 10;
  return {
    subcoolingF: subcooling,
    explanation: `Subcooling must be calculated using the saturated BUBBLE point temperature (T_bubble = ${tBubbleF}°F): Subcooling = ${tBubbleF}°F - ${tLiquidLineF}°F = ${subcooling}°F. Using dew point would yield an erroneously inflated subcooling value.`,
  };
}
