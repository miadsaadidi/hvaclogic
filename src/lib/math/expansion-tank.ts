/**
 * HVACLogic ASME Section VIII Closed-Loop Hydronic Expansion Tank Sizing Engine
 * Conforms to:
 * - ASME Boiler and Pressure Vessel Code (BPVC), Section VIII, Division 1
 * - ASHRAE Handbook - HVAC Systems and Equipment, Chapter 15 (Hydronic Systems)
 */

export type FluidType =
  | "water"
  | "propylene_glycol_20"
  | "propylene_glycol_30"
  | "propylene_glycol_40"
  | "propylene_glycol_50"
  | "ethylene_glycol_20"
  | "ethylene_glycol_30"
  | "ethylene_glycol_40"
  | "ethylene_glycol_50";

export type PipingMaterial = "carbon_steel" | "copper" | "pex";

export interface FluidProperties {
  densityLbPerCuFt: number;
  specificVolumeCuFtPerLb: number;
}

/**
 * Calculates fluid density (lb/ft³) for pure water and industrial glycol mixtures
 * as a function of temperature (°F).
 * Based on ASHRAE Fundamentals Chapter 31 & Dow Chemical Heat Transfer Fluid Data.
 */
export function getFluidDensity(fluid: FluidType, tempF: number): number {
  // Clamp temperature between 32°F and 250°F
  const t = Math.max(32, Math.min(250, tempF));

  switch (fluid) {
    case "water": {
      // High-precision polynomial for liquid water density (lb/ft³)
      // ρ(T) = 62.42 - 0.0035*(T - 39.2) - 0.000072*(T - 39.2)^2
      const deltaT = t - 39.2;
      return 62.426 - 0.00315 * deltaT - 0.0000705 * Math.pow(deltaT, 2);
    }
    case "propylene_glycol_20": {
      // 20% PG: Base density ~63.35 at 60°F, derating to ~61.0 at 200°F
      return 63.35 - 0.0155 * (t - 60) - 0.000012 * Math.pow(t - 60, 2);
    }
    case "propylene_glycol_30": {
      // 30% PG: Base density ~64.10 at 60°F, derating to ~61.4 at 200°F
      return 64.10 - 0.0178 * (t - 60) - 0.000014 * Math.pow(t - 60, 2);
    }
    case "propylene_glycol_40": {
      // 40% PG: Base density ~64.80 at 60°F, derating to ~61.8 at 200°F
      return 64.80 - 0.0198 * (t - 60) - 0.000016 * Math.pow(t - 60, 2);
    }
    case "propylene_glycol_50": {
      // 50% PG: Base density ~65.50 at 60°F, derating to ~62.2 at 200°F
      return 65.50 - 0.0220 * (t - 60) - 0.000018 * Math.pow(t - 60, 2);
    }
    case "ethylene_glycol_20": {
      // 20% EG: Base density ~63.90 at 60°F, derating to ~61.6 at 200°F
      return 63.90 - 0.0150 * (t - 60) - 0.000010 * Math.pow(t - 60, 2);
    }
    case "ethylene_glycol_30": {
      // 30% EG: Base density ~64.95 at 60°F, derating to ~62.3 at 200°F
      return 64.95 - 0.0170 * (t - 60) - 0.000012 * Math.pow(t - 60, 2);
    }
    case "ethylene_glycol_40": {
      // 40% EG: Base density ~66.00 at 60°F, derating to ~63.0 at 200°F
      return 66.00 - 0.0188 * (t - 60) - 0.000014 * Math.pow(t - 60, 2);
    }
    case "ethylene_glycol_50": {
      // 50% EG: Base density ~67.10 at 60°F, derating to ~63.8 at 200°F
      return 67.10 - 0.0205 * (t - 60) - 0.000016 * Math.pow(t - 60, 2);
    }
  }
}

/**
 * Returns specific volume ν = 1 / ρ (ft³/lb)
 */
export function getFluidSpecificVolume(fluid: FluidType, tempF: number): number {
  const density = getFluidDensity(fluid, tempF);
  return 1 / density;
}

/**
 * Linear thermal expansion coefficient for piping materials (in/in/°F)
 */
export function getPipingExpansionCoefficient(material: PipingMaterial): number {
  switch (material) {
    case "carbon_steel":
      return 0.0000065; // 6.5 x 10^-6
    case "copper":
      return 0.0000095; // 9.5 x 10^-6
    case "pex":
      return 0.000085; // 8.5 x 10^-5
  }
}

export interface ExpansionTankInput {
  systemVolumeGallons: number; // Vs: Total system water/fluid content
  initialFillTempF: number; // T1: Typically 50°F to 60°F
  maxOperatingTempF: number; // T2: Typically 180°F to 200°F (heating) or 100°F (chilled water)
  initialFillPressurePsig: number; // P1 (gauge): Static head + 4-5 psi safety (typically 12 to 15 psig)
  reliefValvePressurePsig: number; // Prelief: Rating of boiler safety valve (typically 30 psig, 50 psig, or 125 psig)
  safetyPressureBufferPsi?: number; // Margin below relief valve (default: 3 psi or 10% of Prelief)
  fluidType?: FluidType; // Default: pure water
  pipingMaterial?: PipingMaterial; // Default: carbon_steel
  atmosphericPressurePsi?: number; // Patm: 14.7 psi (sea level)
}

export interface ExpansionTankOutput {
  // Sizing Results
  totalTankVolumeGallons: number; // Vt (ASME calculated minimum)
  acceptanceVolumeGallons: number; // Vacc: Net fluid volume entering tank
  acceptanceRatio: number; // Ar: Vacc / Vt
  recommendedCommercialTankSizeGallons: number; // Standard nominal size round-up

  // Fluid Thermodynamics
  fluidType: FluidType;
  initialFillTempF: number;
  maxOperatingTempF: number;
  initialDensityLbPerCuFt: number; // ρ1
  maxDensityLbPerCuFt: number; // ρ2
  initialSpecificVolumeCuFtPerLb: number; // ν1
  maxSpecificVolumeCuFtPerLb: number; // ν2
  netFluidVolumetricExpansionPercent: number; // ((ν2 / ν1) - 1) * 100

  // Pressure Schedule (Absolute & Gauge)
  initialPressurePsia: number; // P1
  initialPressurePsig: number;
  maxOperatingPressurePsia: number; // P2
  maxOperatingPressurePsig: number;
  reliefValvePressurePsig: number;
  safetyMarginPsi: number;

  // Thermal Piping Compensation
  pipingVolumetricExpansionGallons: number; // 3 * α * ΔT * Vs

  // Engineering Verification & Alerts
  glycolSizingPenaltyPercent: number; // Extra volume required compared to pure water
  warningNotes: string[];
  summary: string;
}

/**
 * Standard commercial diaphragm/bladder expansion tank sizes (gallons)
 * Conforming to ASME Section VIII manufacturer standards (Amtrol, Bell & Gossett, Taco, Wessels).
 */
export const STANDARD_ASME_TANK_SIZES = [
  2.1, 4.4, 7.6, 11.0, 14.0, 15.0, 22.0, 24.0, 32.0, 35.0, 44.0, 53.0, 68.0, 80.0,
  105.0, 132.0, 158.0, 211.0, 264.0, 317.0, 396.0, 528.0,
];

/**
 * Sizes an ASME Section VIII closed-loop diaphragm/bladder expansion tank.
 */
export function calculateAsmeExpansionTank(input: ExpansionTankInput): ExpansionTankOutput {
  const vs = Math.max(1, input.systemVolumeGallons);
  const t1 = Math.max(32, Math.min(120, input.initialFillTempF));
  const t2 = Math.max(t1 + 5, Math.min(250, input.maxOperatingTempF));
  const fluid = input.fluidType ?? "water";
  const pipeMaterial = input.pipingMaterial ?? "carbon_steel";
  const pAtm = input.atmosphericPressurePsi ?? 14.7;

  // Specific Volumes (ft³/lb)
  const v1 = getFluidSpecificVolume(fluid, t1);
  const v2 = getFluidSpecificVolume(fluid, t2);

  const rho1 = 1 / v1;
  const rho2 = 1 / v2;

  // Net fluid thermal expansion ratio: (v2 / v1) - 1
  const fluidExpansionRatio = v2 / v1 - 1;
  const netFluidVolumetricExpansionPercent = Math.round(fluidExpansionRatio * 10000) / 100;

  // Piping Volumetric Expansion: 3 * α * ΔT * Vs
  const alpha = getPipingExpansionCoefficient(pipeMaterial);
  const deltaT = t2 - t1;
  const pipingExpansionRatio = 3 * alpha * deltaT;
  const pipingVolumetricExpansionGallons = Math.round(pipingExpansionRatio * vs * 1000) / 1000;

  // Net Fluid Acceptance Volume: Vacc = Vs * ( (v2/v1 - 1) - 3*α*ΔT )
  const netExpansionRatio = Math.max(0.001, fluidExpansionRatio - pipingExpansionRatio);
  const acceptanceVolumeGallons = Math.round(vs * netExpansionRatio * 100) / 100;

  // Pressures (psig and psia)
  const p1Psig = Math.max(5, input.initialFillPressurePsig);
  const pReliefPsig = Math.max(p1Psig + 10, input.reliefValvePressurePsig);

  // Default safety margin: 10% of relief or 3 psi minimum
  const defaultSafety = Math.max(3, Math.round(pReliefPsig * 0.10 * 10) / 10);
  const safetyMarginPsi = input.safetyPressureBufferPsi ?? defaultSafety;

  const p2Psig = Math.max(p1Psig + 3, pReliefPsig - safetyMarginPsi);

  const p1Psia = p1Psig + pAtm;
  const p2Psia = p2Psig + pAtm;

  // Acceptance Ratio: Ar = 1 - (P1 / P2)
  const pressureRatio = p1Psia / p2Psia;
  const acceptanceRatio = Math.max(0.05, Math.round((1 - pressureRatio) * 1000) / 1000);

  // ASME Section VIII Minimum Total Tank Volume:
  // Vt = Vacc / (1 - (P1 / P2))
  const rawVt = acceptanceVolumeGallons / acceptanceRatio;
  const totalTankVolumeGallons = Math.max(1, Math.round(rawVt * 100) / 100);

  // Compare with Pure Water to calculate Glycol Penalty
  let glycolSizingPenaltyPercent = 0;
  if (fluid !== "water") {
    const v1Water = getFluidSpecificVolume("water", t1);
    const v2Water = getFluidSpecificVolume("water", t2);
    const waterNetRatio = v2Water / v1Water - 1 - pipingExpansionRatio;
    const waterVacc = vs * waterNetRatio;
    const waterVt = waterVacc / acceptanceRatio;
    if (waterVt > 0) {
      glycolSizingPenaltyPercent = Math.round(((totalTankVolumeGallons - waterVt) / waterVt) * 100);
    }
  }

  // Find next commercial standard tank size
  let recommendedCommercialTankSizeGallons = STANDARD_ASME_TANK_SIZES[STANDARD_ASME_TANK_SIZES.length - 1];
  for (const size of STANDARD_ASME_TANK_SIZES) {
    if (size >= totalTankVolumeGallons) {
      recommendedCommercialTankSizeGallons = size;
      break;
    }
  }

  // Engineering Warnings
  const warningNotes: string[] = [];
  if (acceptanceRatio < 0.25) {
    warningNotes.push(
      `Narrow pressure differential (P2 - P1 = ${(p2Psig - p1Psig).toFixed(1)} psi) results in a low acceptance ratio (${(acceptanceRatio * 100).toFixed(1)}%). Consider increasing relief valve setpoint or lowering cold fill pressure if static head allows.`
    );
  }
  if (glycolSizingPenaltyPercent > 20) {
    warningNotes.push(
      `High glycol concentration requires a ${glycolSizingPenaltyPercent}% larger tank volume than pure water due to elevated fluid thermal expansion.`
    );
  }
  if (totalTankVolumeGallons > recommendedCommercialTankSizeGallons) {
    warningNotes.push(
      `System requires custom commercial manifolded expansion tanks or a multi-tank battery exceeding ${recommendedCommercialTankSizeGallons} gallons.`
    );
  }

  const fluidLabel = fluid.replace(/_/g, " ").toUpperCase();
  const summary = `ASME Section VIII sizing for ${vs} gal (${fluidLabel}, ${t1}°F to ${t2}°F): Minimum tank volume is ${totalTankVolumeGallons} gallons (Acceptance: ${acceptanceVolumeGallons} gal, Ar: ${acceptanceRatio.toFixed(3)}). Recommended commercial ASME size: ${recommendedCommercialTankSizeGallons} gal.`;

  return {
    totalTankVolumeGallons,
    acceptanceVolumeGallons,
    acceptanceRatio,
    recommendedCommercialTankSizeGallons,
    fluidType: fluid,
    initialFillTempF: t1,
    maxOperatingTempF: t2,
    initialDensityLbPerCuFt: Math.round(rho1 * 100) / 100,
    maxDensityLbPerCuFt: Math.round(rho2 * 100) / 100,
    initialSpecificVolumeCuFtPerLb: Math.round(v1 * 1000000) / 1000000,
    maxSpecificVolumeCuFtPerLb: Math.round(v2 * 1000000) / 1000000,
    netFluidVolumetricExpansionPercent,
    initialPressurePsia: Math.round(p1Psia * 10) / 10,
    initialPressurePsig: p1Psig,
    maxOperatingPressurePsia: Math.round(p2Psia * 10) / 10,
    maxOperatingPressurePsig: p2Psig,
    reliefValvePressurePsig: pReliefPsig,
    safetyMarginPsi,
    pipingVolumetricExpansionGallons,
    glycolSizingPenaltyPercent,
    warningNotes,
    summary,
  };
}
