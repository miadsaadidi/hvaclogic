/**
 * HVACLogic MERV Filter Sizing & Airflow Resistance Estimator
 *
 * Geometric face area and velocity calculations:
 *   Face Area (sq ft) = (Width_in * Height_in * Filter_Count) / 144
 *   Face Velocity (FPM) = System_CFM / Total_Face_Area
 *
 * Airflow Resistance:
 *   Filter pressure drop depends on the specific manufacturer's test curves (tested per ASHRAE 52.2).
 *   For general reference and preliminary sizing when manufacturer curves are not available,
 *   this engine provides an HVACLogic empirical reference estimate:
 *   DeltaP_clean = k_merv * (FaceVelocity / 300)^1.35 * DepthFactor
 *
 * Technical References:
 *   - ANSI/ASHRAE Standard 52.2 (Method of Testing General Ventilation Air-Cleaning Devices for Removal Efficiency by Particle Size)
 *   - ACCA Manual D (Residential Duct Systems — filter pressure loss budgeting)
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
  filterCount: number; // Number of parallel filter grilles (assumes balanced parallel airflow)
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

export const MERV_BASE_COEFFICIENTS: Record<MervRating, { k: number; label: string; minEfficiency: string }> = {
  merv_4: { k: 0.05, label: "MERV 4 (Fiberglass Mesh)", minEfficiency: "Equipment protection (<20% E3)" },
  merv_8: { k: 0.12, label: "MERV 8 (Standard Pleated)", minEfficiency: "Dust & pollen capture (70–85% E3)" },
  merv_11: { k: 0.18, label: "MERV 11 (Enhanced Pleated)", minEfficiency: "Allergens & pet dander (≥65% E2, ≥85% E3)" },
  merv_13: { k: 0.25, label: "MERV 13 (Fine Particulate)", minEfficiency: "Fine dust, smoke & droplet nuclei (≥50% E1, ≥85% E2, ≥90% E3)" },
  merv_16: { k: 0.38, label: "MERV 16 (High-Efficiency Media)", minEfficiency: "Submicron particulate & smoke (≥95% E1, E2, E3)" },
};

export const DEPTH_FACTORS: Record<FilterDepthInches, number> = {
  1: 1.00,
  2: 0.65,
  4: 0.38,
  5: 0.30,
};

/**
 * Calculates filter face area, face velocity (FPM), and empirical reference static pressure drop.
 */
export function calculateFilterSizing(input: FilterSizingInput): FilterSizingOutput {
  const cfm = Math.max(50, input.airflowCfm);
  const width = Math.max(6, input.filterWidthInches);
  const height = Math.max(6, input.filterHeightInches);
  const count = Math.max(1, input.filterCount);
  const depth = input.filterDepthInches;

  // Total Face Area (sq ft) - Assumes parallel return grilles with reasonably balanced distribution
  const singleAreaSqFt = (width * height) / 144;
  const totalFaceAreaSqFt = Math.round(singleAreaSqFt * count * 100) / 100;

  // Face Velocity (FPM) = CFM / Total Face Area
  const rawFpm = cfm / totalFaceAreaSqFt;
  const faceVelocityFpm = Math.round(rawFpm);

  // HVACLogic Empirical Pressure Drop Model: k * (FPM / 300)^1.35 * depthFactor
  const mervInfo = MERV_BASE_COEFFICIENTS[input.mervRating];
  const depthFactor = DEPTH_FACTORS[depth] || 1.0;
  const rawCleanDrop = mervInfo.k * Math.pow(rawFpm / 300, 1.35) * depthFactor;
  const initialCleanPressureDropInWg = Math.round(rawCleanDrop * 1000) / 1000;

  // Illustrative loaded filter estimate (~1.9x clean drop reference multiplier for typical dust accumulation)
  const estimatedLoadedPressureDropInWg = Math.round(initialCleanPressureDropInWg * 1.9 * 1000) / 1000;

  // Reference CFM capacity guideline (illustrative 300 FPM for 1"-2" media, 450 FPM for 4"-5" deep media)
  const recommendedMaxCfm = Math.round(totalFaceAreaSqFt * (depth >= 4 ? 450 : 300));

  // Face Velocity Assessment (illustrative design reference)
  let velocityStatus: FilterSizingOutput["velocityStatus"] = "optimal";
  if (faceVelocityFpm > 450) {
    velocityStatus = "excessive";
  } else if (faceVelocityFpm > 300 && depth === 1) {
    velocityStatus = "acceptable_deep_only";
  }

  // Estimated Resistance Assessment (based on typical residential static pressure budget allocations)
  let pressureDropStatus: FilterSizingOutput["pressureDropStatus"] = "low_resistance";
  if (initialCleanPressureDropInWg > 0.28) {
    pressureDropStatus = "severe_choke";
  } else if (initialCleanPressureDropInWg > 0.18) {
    pressureDropStatus = "high_risk";
  } else if (initialCleanPressureDropInWg > 0.10) {
    pressureDropStatus = "moderate";
  }

  const dimensionsStr = count > 1 ? `(${count}) ${width}"x${height}"x${depth}"` : `${width}"x${height}"x${depth}"`;

  const summary = `At ${cfm.toLocaleString()} CFM across ${dimensionsStr} filter area (${totalFaceAreaSqFt} sq ft), calculated face velocity is ${faceVelocityFpm} FPM. Estimated clean initial pressure drop is ${initialCleanPressureDropInWg.toFixed(3)}" w.g. for ${mervInfo.label} (model estimate). Always verify against manufacturer product data sheets for final submittals.`;

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
