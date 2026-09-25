/**
 * HVACLogic Hydrothermal Building Envelope & Interstitial Condensation Engine
 * Complies with ASHRAE Handbook of Fundamentals 2021 (Chapter 26: Heat, Air, and Moisture Control in Building Assemblies)
 * and the Glaser Dew Point Method (EN ISO 13788 / ASHRAE Fundamentals).
 */

import { getSaturationVaporPressurePsia } from "./psychrometric";

export interface AssemblyLayer {
  id: string;
  name: string;
  thicknessInches: number;
  rValue: number; // Thermal resistance (hr·ft²·°F/Btu)
  permRating: number; // Vapor permeance in US Perms (grains / (hr·ft²·in.Hg))
  description?: string;
}

export interface EnvironmentalConditions {
  indoorDryBulbF: number;
  indoorRelativeHumidityPercent: number;
  outdoorDryBulbF: number;
  outdoorRelativeHumidityPercent: number;
}

export interface InterfaceProfilePoint {
  layerIndex: number;
  interfaceName: string;
  distanceFromInteriorInches: number;
  temperatureF: number;
  saturationVaporPressureInHg: number;
  actualVaporPressureInHg: number;
  relativeHumidityPercent: number;
  dewPointF: number;
  isCondensationPlane: boolean;
  saturationVaporPressurePsia: number;
  actualVaporPressurePsia: number;
}

export interface CondensationAssessment {
  hasInterstitialCondensation: boolean;
  condensationPlanes: string[];
  maxRelativeHumidityPercent: number;
  criticalPlaneName: string;
  condensationRateGrainsPerHrFt2: number; // Condensation mass flux
  vaporDriveDirection: "Outward (Winter Heating)" | "Inward (Summer Cooling)";
  moldGrowthRisk: "Low / Safe (RH < 70%)" | "Moderate / Caution (70% <= RH < 80%)" | "Critical Risk (RH >= 80% or Liquid Condensation)";
  totalRValue: number;
  totalVaporResistanceRep: number; // Total rep (1/perm)
  overallUFactor: number;
  profile: InterfaceProfilePoint[];
}

// Convert psia to in.Hg (1 psi = 2.03602 in.Hg)
export const PSI_TO_IN_HG = 2.03602;

/**
 * Calculates partial vapor pressure in in.Hg from dry bulb (°F) and relative humidity (%)
 */
export function calculateVaporPressureInHg(tempF: number, rhPercent: number): number {
  const pSatPsia = getSaturationVaporPressurePsia(tempF);
  const pSatInHg = pSatPsia * PSI_TO_IN_HG;
  const clampedRh = Math.max(0, Math.min(100, rhPercent)) / 100;
  return pSatInHg * clampedRh;
}

/**
 * Inverts Hyland-Wexler saturation pressure to determine dew point temperature (°F)
 */
export function calculateDewPointFromVaporPressureInHg(vaporPressureInHg: number): number {
  const pVaporPsia = vaporPressureInHg / PSI_TO_IN_HG;
  if (pVaporPsia <= 0.0001) return -40;

  // Numerical approximation / bisection for dew point
  let low = -40;
  let high = 140;
  for (let i = 0; i < 24; i++) {
    const mid = (low + high) / 2;
    const pMid = getSaturationVaporPressurePsia(mid);
    if (pMid < pVaporPsia) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

/**
 * Standard Archetype Wall Assemblies for Hydrothermal Analysis per ASHRAE 90.1 & IECC
 */
export const STANDARD_WALL_ASSEMBLIES: Record<string, { name: string; description: string; climateRecommendation: string; layers: AssemblyLayer[] }> = {
  "2x6-wood-kraft-batt": {
    name: "2x6 Wood Stud with R-20 Fiberglass Batt & Kraft Vapor Retarder (Class II)",
    description: "Traditional residential exterior wall in IECC Climate Zones 4-6 with interior gypsum, kraft-faced cavity batt, OSB sheathing, housewrap, and vinyl siding.",
    climateRecommendation: "Mixed-Humid & Cold Climates (IECC Zones 4–6)",
    layers: [
      { id: "int-air", name: "Indoor Air Film (RSI 0.12 / R-0.68)", thicknessInches: 0, rValue: 0.68, permRating: 100 },
      { id: "gypsum", name: "1/2\" Interior Gypsum Board (Drywall with Latex Paint)", thicknessInches: 0.5, rValue: 0.45, permRating: 5.0 },
      { id: "kraft-retarder", name: "Kraft Paper Vapor Retarder (Class II)", thicknessInches: 0.01, rValue: 0.01, permRating: 0.8 },
      { id: "cavity-batt", name: "5.5\" R-20 Fiberglass Batt in 2x6 Cavity", thicknessInches: 5.5, rValue: 20.0, permRating: 30.0 },
      { id: "osb-sheathing", name: "7/16\" OSB Structural Sheathing", thicknessInches: 0.4375, rValue: 0.55, permRating: 1.5 },
      { id: "wrb-housewrap", name: "Spunbonded Polyolefin Weather-Resistive Barrier (Housewrap)", thicknessInches: 0.02, rValue: 0.01, permRating: 40.0 },
      { id: "air-cavity", name: "3/4\" Ventilated Rainscreen Siding Cavity", thicknessInches: 0.75, rValue: 0.91, permRating: 100 },
      { id: "vinyl-siding", name: "Vinyl Exterior Siding", thicknessInches: 0.05, rValue: 0.61, permRating: 40.0 },
      { id: "ext-air", name: "Outdoor Air Film (Winter 15 mph wind, R-0.17)", thicknessInches: 0, rValue: 0.17, permRating: 100 },
    ],
  },
  "2x6-wood-poly-vapor-barrier": {
    name: "2x6 Wood Stud with 6-mil Polyethylene Sheet (Class I Vapor Impermeable)",
    description: "Very cold climate wall assembly (IECC Zone 7) with 6-mil polyethylene barrier directly behind drywall.",
    climateRecommendation: "Severe Cold Climates (IECC Zone 7/8 only; risky in cooling climates)",
    layers: [
      { id: "int-air", name: "Indoor Air Film", thicknessInches: 0, rValue: 0.68, permRating: 100 },
      { id: "gypsum", name: "1/2\" Interior Gypsum Board", thicknessInches: 0.5, rValue: 0.45, permRating: 5.0 },
      { id: "poly-barrier", name: "6-mil Polyethylene Vapor Barrier (Class I)", thicknessInches: 0.006, rValue: 0.01, permRating: 0.06 },
      { id: "cavity-batt", name: "5.5\" R-20 Fiberglass Batt", thicknessInches: 5.5, rValue: 20.0, permRating: 30.0 },
      { id: "osb-sheathing", name: "7/16\" OSB Sheathing", thicknessInches: 0.4375, rValue: 0.55, permRating: 1.5 },
      { id: "wrb-housewrap", name: "WRB Housewrap", thicknessInches: 0.02, rValue: 0.01, permRating: 40.0 },
      { id: "vinyl-siding", name: "Exterior Cladding & Air Film", thicknessInches: 0.5, rValue: 1.69, permRating: 50.0 },
    ],
  },
  "high-performance-continuous-ci": {
    name: "High-Performance 2x6 Wall with R-7.5 Continuous Exterior Rigid Insulation (ci)",
    description: "Modern high-performance building envelope with R-20 cavity batt + R-7.5 exterior continuous insulation (ci) preventing condensation by keeping the OSB warm in winter.",
    climateRecommendation: "Universal High-Performance Envelope (IECC 2024 / ASHRAE 90.1 Compliant)",
    layers: [
      { id: "int-air", name: "Indoor Air Film", thicknessInches: 0, rValue: 0.68, permRating: 100 },
      { id: "gypsum", name: "1/2\" Interior Gypsum Board with Smart Vapor Retarder", thicknessInches: 0.5, rValue: 0.45, permRating: 1.0 },
      { id: "cavity-batt", name: "5.5\" R-20 Fiberglass Batt", thicknessInches: 5.5, rValue: 20.0, permRating: 30.0 },
      { id: "osb-sheathing", name: "7/16\" OSB Structural Sheathing", thicknessInches: 0.4375, rValue: 0.55, permRating: 1.5 },
      { id: "rigid-ci", name: "1.5\" R-7.5 Exterior Polyiso Continuous Rigid Board (ci)", thicknessInches: 1.5, rValue: 7.5, permRating: 1.2 },
      { id: "wrb-housewrap", name: "Vapor Permeable WRB / Drainage Plane", thicknessInches: 0.02, rValue: 0.01, permRating: 30.0 },
      { id: "rainscreen-siding", name: "Ventilated Rainscreen & Siding", thicknessInches: 0.75, rValue: 1.69, permRating: 80.0 },
    ],
  },
};

/**
 * Performs Glaser Dew Point Method hydrothermal analysis across a multi-layer wall assembly.
 * Evaluates interface temperatures, saturation vapor pressures, actual vapor pressures,
 * relative humidity profiles, and flags interstitial condensation planes per ASHRAE Fundamentals 2021 Ch. 26.
 */
export function evaluateAssemblyCondensation(
  layers: AssemblyLayer[],
  conditions: EnvironmentalConditions
): CondensationAssessment {
  if (!layers || layers.length === 0) {
    throw new Error("Assembly must contain at least one layer.");
  }

  // Calculate total thermal resistance and vapor resistance
  const totalRValue = layers.reduce((sum, layer) => sum + Math.max(0.001, layer.rValue), 0);
  const overallUFactor = 1 / totalRValue;

  // Vapor resistance for each layer = 1 / permRating (Rep = 1/Perm = hr·ft²·in.Hg / grain)
  const layerReps = layers.map((layer) => 1 / Math.max(0.01, layer.permRating));
  const totalVaporResistanceRep = layerReps.reduce((sum, rep) => sum + rep, 0);

  // Calculate boundary vapor pressures (in.Hg)
  const pVaporIn = calculateVaporPressureInHg(conditions.indoorDryBulbF, conditions.indoorRelativeHumidityPercent);
  const pVaporOut = calculateVaporPressureInHg(conditions.outdoorDryBulbF, conditions.outdoorRelativeHumidityPercent);

  const deltaT = conditions.indoorDryBulbF - conditions.outdoorDryBulbF;
  const deltaPv = pVaporIn - pVaporOut;
  const vaporDriveDirection = deltaPv >= 0 ? "Outward (Winter Heating)" : "Inward (Summer Cooling)";

  let cumR = 0;
  let cumRep = 0;
  let cumDistance = 0;

  const profile: InterfaceProfilePoint[] = [];
  const condensationPlanes: string[] = [];
  let maxRelativeHumidityPercent = 0;
  let criticalPlaneName = "";
  let maxCondensationRate = 0;

  // Boundary 0: Interior Air Boundary
  const pSatInInitial = getSaturationVaporPressurePsia(conditions.indoorDryBulbF) * PSI_TO_IN_HG;
  profile.push({
    layerIndex: 0,
    interfaceName: "Interior Surface (Indoor Ambient)",
    distanceFromInteriorInches: 0,
    temperatureF: conditions.indoorDryBulbF,
    saturationVaporPressureInHg: pSatInInitial,
    actualVaporPressureInHg: pVaporIn,
    relativeHumidityPercent: conditions.indoorRelativeHumidityPercent,
    dewPointF: calculateDewPointFromVaporPressureInHg(pVaporIn),
    isCondensationPlane: pVaporIn >= pSatInInitial,
    saturationVaporPressurePsia: pSatInInitial / PSI_TO_IN_HG,
    actualVaporPressurePsia: pVaporIn / PSI_TO_IN_HG,
  });

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    cumR += Math.max(0.001, layer.rValue);
    cumRep += layerReps[i];
    cumDistance += layer.thicknessInches;

    // Interface temperature per Fourier's Law
    const tInterface = conditions.indoorDryBulbF - deltaT * (cumR / totalRValue);
    // Saturated vapor pressure at interface temperature via Hyland-Wexler
    const pSatPsia = getSaturationVaporPressurePsia(tInterface);
    const pSatInHg = pSatPsia * PSI_TO_IN_HG;

    // Fick's Law unconstrained vapor pressure at interface
    const pVaporInterface = pVaporIn - deltaPv * (cumRep / totalVaporResistanceRep);

    const isCondensation = pVaporInterface >= pSatInHg;
    const effectiveVaporPressure = Math.min(pVaporInterface, pSatInHg);
    const rhPercent = Math.min(100, Math.max(0, (pVaporInterface / pSatInHg) * 100));

    if (rhPercent > maxRelativeHumidityPercent) {
      maxRelativeHumidityPercent = rhPercent;
      criticalPlaneName = `Interface after ${layer.name}`;
    }

    if (isCondensation) {
      condensationPlanes.push(`Interface after ${layer.name}`);

      // Glaser Condensation Rate (grains / hr·ft²)
      // Flux in = (Pv_in - Psat_int) / Rep_in_to_plane
      // Flux out = (Psat_int - Pv_out) / Rep_plane_to_out
      const repInToPlane = Math.max(0.01, cumRep);
      const repPlaneToOut = Math.max(0.01, totalVaporResistanceRep - cumRep);
      const fluxIn = (pVaporIn - pSatInHg) / repInToPlane;
      const fluxOut = (pSatInHg - pVaporOut) / repPlaneToOut;
      const rate = Math.max(0, fluxIn - fluxOut);
      if (rate > maxCondensationRate) {
        maxCondensationRate = rate;
      }
    }

    profile.push({
      layerIndex: i + 1,
      interfaceName: `Interface after ${layer.name}`,
      distanceFromInteriorInches: Number(cumDistance.toFixed(4)),
      temperatureF: Number(tInterface.toFixed(2)),
      saturationVaporPressureInHg: Number(pSatInHg.toFixed(4)),
      actualVaporPressureInHg: Number(effectiveVaporPressure.toFixed(4)),
      relativeHumidityPercent: Number(rhPercent.toFixed(1)),
      dewPointF: Number(calculateDewPointFromVaporPressureInHg(effectiveVaporPressure).toFixed(2)),
      isCondensationPlane: isCondensation,
      saturationVaporPressurePsia: Number(pSatPsia.toFixed(5)),
      actualVaporPressurePsia: Number((effectiveVaporPressure / PSI_TO_IN_HG).toFixed(5)),
    });
  }

  const hasInterstitialCondensation = condensationPlanes.length > 0;

  let moldGrowthRisk: CondensationAssessment["moldGrowthRisk"] = "Low / Safe (RH < 70%)";
  if (hasInterstitialCondensation || maxRelativeHumidityPercent >= 80) {
    moldGrowthRisk = "Critical Risk (RH >= 80% or Liquid Condensation)";
  } else if (maxRelativeHumidityPercent >= 70) {
    moldGrowthRisk = "Moderate / Caution (70% <= RH < 80%)";
  }

  return {
    hasInterstitialCondensation,
    condensationPlanes,
    maxRelativeHumidityPercent: Number(maxRelativeHumidityPercent.toFixed(1)),
    criticalPlaneName,
    condensationRateGrainsPerHrFt2: Number(maxCondensationRate.toFixed(3)),
    vaporDriveDirection,
    moldGrowthRisk,
    totalRValue: Number(totalRValue.toFixed(2)),
    totalVaporResistanceRep: Number(totalVaporResistanceRep.toFixed(3)),
    overallUFactor: Number(overallUFactor.toFixed(4)),
    profile,
  };
}
