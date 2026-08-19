/**
 * HVACLogic MERV Filter Sizing & Static Pressure Drop Computational Engine
 * Conforms to ASHRAE 52.2 (Method of Testing General Ventilation Air-Cleaning Devices) & ACCA Manual D.
 */

export type MervRating = "merv_4" | "merv_8" | "merv_11" | "merv_13" | "merv_16";
export type FilterDepthInches = 1 | 2 | 4 | 5;

export interface FilterSizeOption {
  id: string;
  label: string;
  widthInches: number;
  heightInches: number;
}

export const STANDARD_FILTER_SIZES: FilterSizeOption[] = [
  { id: "16x20", label: "16\" x 20\"", widthInches: 16, heightInches: 20 },
  { id: "16x25", label: "16\" x 25\"", widthInches: 16, heightInches: 25 },
  { id: "20x20", label: "20\" x 20\"", widthInches: 20, heightInches: 20 },
  { id: "20x25", label: "20\" x 25\"", widthInches: 20, heightInches: 25 },
  { id: "20x30", label: "20\" x 30\"", widthInches: 20, heightInches: 30 },
  { id: "24x24", label: "24\" x 24\"", widthInches: 24, heightInches: 24 },
];

export interface FilterSizingInput {
  airflowCfm: number; // System CFM (e.g. 1200 CFM for 3-ton)
  filterWidthInches: number;
  filterHeightInches: number;
  filterDepthInches: FilterDepthInches;
  filterCount: number; // Number of parallel filter grilles
  mervRating: MervRating;
}

export interface FilterSizingOutput {
  airflowCfm: number;
  filterDimensionsStr: string;
  filterCount: number;
  totalFaceAreaSqFt: number;
  faceVelocityFpm: number;
  initialCleanPressureDropInWg: number;
  estimatedLoadedPressureDropInWg: number;
  velocityStatus: "optimal" | "acceptable_deep_only" | "excessive";
  pressureDropStatus: "low_resistance" | "moderate" | "high_risk" | "severe_choke";
  recommendedMaxCfm: number;
  summary: string;
}

const MERV_BASE_COEFFICIENTS: Record<MervRating, { k: number; label: string; minEfficiency: string }> = {
  merv_4: { k: 0.05, label: "MERV 4 (Fiberglass Mesh)", minEfficiency: "<20% particle capture" },
  merv_8: { k: 0.12, label: "MERV 8 (Standard Pleated)", minEfficiency: "70-85% dust & pollen" },
  merv_11: { k: 0.18, label: "MERV 11 (Enhanced Residential)", minEfficiency: "85% allergens & pet dander" },
  merv_13: { k: 0.25, label: "MERV 13 (ASHRAE 241 / Smoke)", minEfficiency: "90% bacteria & droplet nuclei" },
  merv_16: { k: 0.38, label: "MERV 16 (Hospital / HEPA-tier)", minEfficiency: "95%+ virus carrier particles" },
};

const DEPTH_FACTORS: Record<FilterDepthInches, number> = {
  1: 1.00,
  2: 0.65,
  4: 0.38,
  5: 0.30,
};

/**
 * Calculates filter face area, face velocity (FPM), and empirical static pressure drop.
 */
export function calculateFilterSizing(input: FilterSizingInput): FilterSizingOutput {
  const cfm = Math.max(50, input.airflowCfm);
  const width = Math.max(6, input.filterWidthInches);
  const height = Math.max(6, input.filterHeightInches);
  const count = Math.max(1, input.filterCount);
  const depth = input.filterDepthInches;

  // Total Face Area (sq ft)
  const singleAreaSqFt = (width * height) / 144;
  const totalFaceAreaSqFt = Math.round(singleAreaSqFt * count * 100) / 100;

  // Face Velocity (FPM) = CFM / Total Area
  const rawFpm = cfm / totalFaceAreaSqFt;
  const faceVelocityFpm = Math.round(rawFpm);

  // Pressure Drop = k * (FPM / 300)^1.35 * depthFactor
  const mervInfo = MERV_BASE_COEFFICIENTS[input.mervRating];
  const depthFactor = DEPTH_FACTORS[depth] || 1.0;
  const rawCleanDrop = mervInfo.k * Math.pow(rawFpm / 300, 1.35) * depthFactor;
  const initialCleanPressureDropInWg = Math.round(rawCleanDrop * 1000) / 1000;
  const estimatedLoadedPressureDropInWg = Math.round(initialCleanPressureDropInWg * 1.9 * 1000) / 1000;

  // Max Recommended CFM at 300 FPM design guideline
  const recommendedMaxCfm = Math.round(totalFaceAreaSqFt * (depth >= 4 ? 450 : 300));

  // Velocity Status Assessment
  let velocityStatus: FilterSizingOutput["velocityStatus"] = "optimal";
  if (faceVelocityFpm > 450) {
    velocityStatus = "excessive";
  } else if (faceVelocityFpm > 300 && depth === 1) {
    velocityStatus = "acceptable_deep_only";
  }

  // Pressure Drop Status Assessment
  let pressureDropStatus: FilterSizingOutput["pressureDropStatus"] = "low_resistance";
  if (initialCleanPressureDropInWg > 0.28) {
    pressureDropStatus = "severe_choke";
  } else if (initialCleanPressureDropInWg > 0.18) {
    pressureDropStatus = "high_risk";
  } else if (initialCleanPressureDropInWg > 0.10) {
    pressureDropStatus = "moderate";
  }

  const dimensionsStr = count > 1 ? `(${count}) ${width}"x${height}"x${depth}"` : `${width}"x${height}"x${depth}"`;

  const summary = `At ${cfm.toLocaleString()} CFM across ${dimensionsStr} filter area (${totalFaceAreaSqFt} sq ft), face velocity is ${faceVelocityFpm} FPM. Initial clean static pressure drop is ${initialCleanPressureDropInWg.toFixed(3)}" w.g. for ${mervInfo.label} (${pressureDropStatus.replace("_", " ")}).`;

  return {
    airflowCfm: cfm,
    filterDimensionsStr: dimensionsStr,
    filterCount: count,
    totalFaceAreaSqFt,
    faceVelocityFpm,
    initialCleanPressureDropInWg,
    estimatedLoadedPressureDropInWg,
    velocityStatus,
    pressureDropStatus,
    recommendedMaxCfm,
    summary,
  };
}
