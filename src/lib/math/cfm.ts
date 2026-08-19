/**
 * HVACLogic CFM & Airflow Computational Engine
 * Implements ASHRAE Fundamentals, ACCA Manual D, and SMACNA fluid standards.
 */

export type CfmCalculationMode = "duct-velocity" | "thermal-load" | "room-ach" | "tonnage" | "electric-heat";

export interface DuctVelocityCfmInput {
  shape: "round" | "rectangular";
  diameterInches?: number;
  widthInches?: number;
  heightInches?: number;
  velocityFpm: number;
}

export interface ThermalLoadCfmInput {
  sensibleBtuPerHour: number;
  temperatureDeltaF: number; // e.g. 18-22°F for AC, 30-60°F for furnace
}

export interface RoomAchCfmInput {
  lengthFeet: number;
  widthFeet: number;
  heightFeet: number;
  airChangesPerHour: number;
}

export interface TonnageCfmInput {
  coolingTons: number;
  cfmPerTon: number; // Standard 400, Humid 350, Dry 450
}

export interface ElectricHeatCfmInput {
  kilowatts: number;
  temperatureDeltaF: number;
}

export interface CfmCalculationResult {
  mode: CfmCalculationMode;
  cfm: number;
  velocityFpm?: number;
  areaSqFt?: number;
  airTurnoverMinutes?: number; // Time to cycle 100% room air
  velocityCategory?: "whisper" | "standard" | "noisy" | "excessive";
  acousticRecommendation?: string;
  explanation: string;
}

export const ACH_PRESETS = [
  { label: "Residential Living / Bedrooms (4-6 ACH)", ach: 5 },
  { label: "Kitchen / Cooking Zone (7-8 ACH)", ach: 7.5 },
  { label: "Bathroom / Exhaust (8-10 ACH)", ach: 8.5 },
  { label: "Basement / Storage (3-4 ACH)", ach: 3.5 },
  { label: "Commercial Office (6-8 ACH)", ach: 6 },
  { label: "Classroom / Conference (8-12 ACH)", ach: 10 },
  { label: "Cleanroom / Medical Lab (15-25 ACH)", ach: 20 },
];

export const CFM_PER_TON_PRESETS = [
  { label: "Standard Residential (400 CFM/ton)", rate: 400 },
  { label: "Humid Climate / High Latent (350 CFM/ton)", rate: 350 },
  { label: "Dry Climate / High Sensible (450 CFM/ton)", rate: 450 },
];

/**
 * Categorizes duct air velocity based on residential/commercial acoustic comfort limits (SMACNA).
 */
export function categorizeVelocity(fpm: number): {
  category: "whisper" | "standard" | "noisy" | "excessive";
  recommendation: string;
} {
  if (fpm < 600) {
    return {
      category: "whisper",
      recommendation: "Whisper-quiet acoustic performance (<600 FPM), ideal for quiet residential master bedrooms.",
    };
  }
  if (fpm <= 900) {
    return {
      category: "standard",
      recommendation: "Standard residential supply branch velocity (600–900 FPM), well within NC-30 noise limits.",
    };
  }
  if (fpm <= 1200) {
    return {
      category: "noisy",
      recommendation: "Moderate velocity (900–1,200 FPM), suitable for main supply trunks or commercial spaces.",
    };
  }
  return {
    category: "excessive",
    recommendation: "High air velocity (>1,200 FPM). Warning: Noticeable turbulent airflow noise and register whistle.",
  };
}

/**
 * 1. Calculates CFM from duct dimensions and air velocity
 * CFM = Velocity (FPM) × Area (sq ft)
 */
export function calculateCfmFromDuctVelocity(input: DuctVelocityCfmInput): CfmCalculationResult {
  let areaSqFt = 0;

  if (input.shape === "round") {
    const d = Math.max(1, input.diameterInches || 6);
    const radiusFeet = d / 24; // inches to radius in feet
    areaSqFt = Math.PI * Math.pow(radiusFeet, 2);
  } else {
    const w = Math.max(1, input.widthInches || 10);
    const h = Math.max(1, input.heightInches || 8);
    areaSqFt = (w * h) / 144;
  }

  const cfm = Math.round(input.velocityFpm * areaSqFt);
  const acoustic = categorizeVelocity(input.velocityFpm);

  return {
    mode: "duct-velocity",
    cfm,
    velocityFpm: input.velocityFpm,
    areaSqFt: Number(areaSqFt.toFixed(3)),
    velocityCategory: acoustic.category,
    acousticRecommendation: acoustic.recommendation,
    explanation: `Airflow computed from ${input.shape} duct cross-sectional area (${areaSqFt.toFixed(2)} sq ft) at ${input.velocityFpm.toLocaleString()} FPM air velocity.`,
  };
}

/**
 * 2. Calculates CFM from sensible heat load and temperature delta
 * CFM = Q_sensible / (1.08 × ΔT)
 */
export function calculateCfmFromThermalLoad(input: ThermalLoadCfmInput): CfmCalculationResult {
  const btu = Math.max(100, input.sensibleBtuPerHour);
  const deltaT = Math.max(1, input.temperatureDeltaF);

  // Standard air density constant: 1.08 = 0.075 lb/ft³ × 0.24 BTU/lb·°F × 60 min/hr
  const cfm = Math.round(btu / (1.08 * deltaT));

  return {
    mode: "thermal-load",
    cfm,
    explanation: `Airflow computed from sensible heat equation: ${btu.toLocaleString()} BTU/hr / (1.08 × ${deltaT}°F ΔT) = ${cfm.toLocaleString()} CFM.`,
  };
}

/**
 * 3. Calculates CFM from room volume and air changes per hour (ACH)
 * CFM = (Length × Width × Height × ACH) / 60
 */
export function calculateCfmFromRoomAch(input: RoomAchCfmInput): CfmCalculationResult {
  const length = Math.max(1, input.lengthFeet);
  const width = Math.max(1, input.widthFeet);
  const height = Math.max(1, input.heightFeet);
  const ach = Math.max(0.1, input.airChangesPerHour);

  const roomVolumeCuFt = length * width * height;
  const cfm = Math.round((roomVolumeCuFt * ach) / 60);
  const airTurnoverMinutes = Number((60 / ach).toFixed(1));

  return {
    mode: "room-ach",
    cfm,
    areaSqFt: length * width,
    airTurnoverMinutes,
    explanation: `Room volume of ${roomVolumeCuFt.toLocaleString()} cu ft cycled at ${ach} Air Changes per Hour requires ${cfm.toLocaleString()} CFM (full air turnover every ${airTurnoverMinutes} minutes).`,
  };
}

/**
 * 4. Calculates CFM from equipment nominal cooling tonnage
 * CFM = Tonnage × CFM_per_ton (Standard 400 CFM/ton)
 */
export function calculateCfmFromTonnage(input: TonnageCfmInput): CfmCalculationResult {
  const tons = Math.max(0.25, input.coolingTons);
  const rate = Math.max(250, input.cfmPerTon);
  const cfm = Math.round(tons * rate);

  return {
    mode: "tonnage",
    cfm,
    explanation: `${tons} Tons cooling capacity × ${rate} CFM/ton equipment design rate = ${cfm.toLocaleString()} CFM total blower airflow.`,
  };
}

/**
 * 5. Calculates CFM for electric heat strip blower verification
 * CFM = (kW × 3,412.142) / (1.08 × ΔT)
 */
export function calculateCfmFromElectricHeat(input: ElectricHeatCfmInput): CfmCalculationResult {
  const kw = Math.max(0.5, input.kilowatts);
  const deltaT = Math.max(5, input.temperatureDeltaF);
  const btu = kw * 3412.142;
  const cfm = Math.round(btu / (1.08 * deltaT));

  return {
    mode: "electric-heat",
    cfm,
    explanation: `${kw} kW electric strip element (${Math.round(btu).toLocaleString()} BTU/hr) at ${deltaT}°F temperature rise requires ${cfm.toLocaleString()} CFM.`,
  };
}
