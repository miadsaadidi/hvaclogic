/**
 * HVACLogic Flexible Duct CFM & Friction Computational Engine
 * Implements:
 * - ASHRAE Research Project RP-1333 (Culp, Haberl, Medina): "Air Duct Friction Losses for Flexible Ductwork"
 *   URL: https://technologyportal.ashrae.org/Report/Detail/583
 * - ADC (Air Diffusion Council) Flexible Duct Performance Standards
 * - ACCA Manual D (3rd Edition) & SMACNA Flexible Duct Construction Standards
 */

export const STANDARD_FLEX_DIAMETERS = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20] as const;
export type FlexDiameter = typeof STANDARD_FLEX_DIAMETERS[number];

export const STANDARD_FRICTION_RATES = [0.05, 0.08, 0.10, 0.15] as const;
export type FrictionRate = typeof STANDARD_FRICTION_RATES[number];

export type SagCompressionLevel = 0 | 4 | 15 | 30;

export interface FlexDuctRow {
  diameterInches: number;
  areaSqFt: number;
  // CFM at standard friction rates (derated for selected sag)
  cfmAt005: number;
  cfmAt008: number;
  cfmAt010: number;
  cfmAt015: number;
  // Velocity at nominal 0.08 in.wg
  velocityAt008Fpm: number;
  acousticCategory: "whisper" | "standard" | "moderate" | "high";
  recommendedRoomType: string;
}

export interface FlexDuctMatrixOutput {
  sagCompressionPercent: SagCompressionLevel;
  frictionMultiplier: number;
  capacityDerateFactor: number;
  rows: FlexDuctRow[];
}

/**
 * Air Diffusion Council (ADC) & ASHRAE empirical sag compression factors.
 */
export const SAG_COMPRESSION_FACTORS: Record<SagCompressionLevel, { frictionMultiplier: number; capacityFactor: number; label: string; description: string }> = {
  0: {
    frictionMultiplier: 1.0,
    capacityFactor: 1.0,
    label: "0% Compression (Fully Stretched Baseline)",
    description: "Reference manufacturer baseline with duct pulled 100% straight and taut (zero installation sag).",
  },
  4: {
    frictionMultiplier: 1.15,
    capacityFactor: 0.93,
    label: "4% Compression (Reference Installed Baseline)",
    description: "Reference installation condition representing taut field installation with proper support spacing.",
  },
  15: {
    frictionMultiplier: 1.60,
    capacityFactor: 0.78,
    label: "15% Compression (Modeled Moderate Sag)",
    description: "Modeled loose installation with moderate sag between supports, increasing friction and resistance.",
  },
  30: {
    frictionMultiplier: 2.20,
    capacityFactor: 0.65,
    label: "30% Compression (Modeled Severe Sag / Choked)",
    description: "Modeled severe installation droop or compressed duct run causing internal helix bunching.",
  },
};

/**
 * Standard baseline flexible duct CFM values at 0% compression (fully stretched)
 * derived from ADC Flexible Duct Performance Charts.
 */
const BASELINE_FLEX_CFM_STRETCHED: Record<number, Record<FrictionRate, number>> = {
  4: { 0.05: 25, 0.08: 32, 0.10: 38, 0.15: 48 },
  5: { 0.05: 45, 0.08: 58, 0.10: 67, 0.15: 84 },
  6: { 0.05: 70, 0.08: 90, 0.10: 105, 0.15: 130 },
  7: { 0.05: 105, 0.08: 135, 0.10: 155, 0.15: 195 },
  8: { 0.05: 150, 0.08: 190, 0.10: 220, 0.15: 275 },
  9: { 0.05: 205, 0.08: 260, 0.10: 300, 0.15: 375 },
  10: { 0.05: 275, 0.08: 345, 0.10: 395, 0.15: 495 },
  12: { 0.05: 440, 0.08: 560, 0.10: 640, 0.15: 800 },
  14: { 0.05: 660, 0.08: 830, 0.10: 950, 0.15: 1190 },
  16: { 0.05: 930, 0.08: 1180, 0.10: 1340, 0.15: 1680 },
  18: { 0.05: 1280, 0.08: 1610, 0.10: 1830, 0.15: 2290 },
  20: { 0.05: 1680, 0.08: 2120, 0.10: 2410, 0.15: 3020 },
};

const RECOMMENDED_ROOM_TYPES: Record<number, string> = {
  4: "Small Exhaust / Low Airflow Branch (<35 CFM)",
  5: "Small Supply Branch (40–60 CFM)",
  6: "Standard Supply Branch (65–100 CFM)",
  7: "Medium Supply Branch (100–145 CFM)",
  8: "Medium-Large Supply Branch (145–205 CFM)",
  9: "Large Supply Branch (200–280 CFM)",
  10: "High Airflow Branch (280–370 CFM)",
  12: "Zone Trunk / Branch Trunk (400–600 CFM)",
  14: "Main Trunk / Return Run (600–900 CFM)",
  16: "Central Return / Major Trunk (900–1,250 CFM)",
  18: "Main Return Drop / System Trunk (1,250–1,700 CFM)",
  20: "Large Central Return Drop (1,700–2,250 CFM)",
};

/**
 * Calculates complete flexible duct CFM matrix derated for real-world installation sag.
 */
export function generateFlexDuctMatrix(sagPercent: SagCompressionLevel = 4): FlexDuctMatrixOutput {
  const sagConfig = SAG_COMPRESSION_FACTORS[sagPercent] || SAG_COMPRESSION_FACTORS[4];
  const derate = sagConfig.capacityFactor;

  const rows: FlexDuctRow[] = STANDARD_FLEX_DIAMETERS.map((d) => {
    const base = BASELINE_FLEX_CFM_STRETCHED[d];
    const areaSqFt = Number((Math.PI * Math.pow(d / 24, 2)).toFixed(3));

    const cfm005 = Math.round(base[0.05] * derate);
    const cfm008 = Math.round(base[0.08] * derate);
    const cfm010 = Math.round(base[0.10] * derate);
    const cfm015 = Math.round(base[0.15] * derate);

    const velocityAt008 = Math.round(cfm008 / areaSqFt);

    let acousticCategory: FlexDuctRow["acousticCategory"] = "standard";
    if (velocityAt008 < 600) acousticCategory = "whisper";
    else if (velocityAt008 <= 850) acousticCategory = "standard";
    else if (velocityAt008 <= 1100) acousticCategory = "moderate";
    else acousticCategory = "high";

    return {
      diameterInches: d,
      areaSqFt,
      cfmAt005: cfm005,
      cfmAt008: cfm008,
      cfmAt010: cfm010,
      cfmAt015: cfm015,
      velocityAt008Fpm: velocityAt008,
      acousticCategory,
      recommendedRoomType: RECOMMENDED_ROOM_TYPES[d] || "General Supply",
    };
  });

  return {
    sagCompressionPercent: sagPercent,
    frictionMultiplier: sagConfig.frictionMultiplier,
    capacityDerateFactor: derate,
    rows,
  };
}

/**
 * Recommends the ideal flexible duct diameter for a required CFM and target friction rate.
 */
export function findRecommendedFlexDuct(
  targetCfm: number,
  frictionRate: FrictionRate = 0.08,
  sagPercent: SagCompressionLevel = 4
): {
  recommendedDiameter: number;
  achievedCfm: number;
  velocityFpm: number;
  isAdequate: boolean;
} {
  const matrix = generateFlexDuctMatrix(sagPercent);
  const key = frictionRate === 0.05 ? "cfmAt005" : frictionRate === 0.08 ? "cfmAt008" : frictionRate === 0.10 ? "cfmAt010" : "cfmAt015";

  for (const row of matrix.rows) {
    if (row[key] >= targetCfm) {
      const velocityFpm = Math.round(targetCfm / row.areaSqFt);
      return {
        recommendedDiameter: row.diameterInches,
        achievedCfm: row[key],
        velocityFpm,
        isAdequate: true,
      };
    }
  }

  // Fallback to largest 20"
  const largest = matrix.rows[matrix.rows.length - 1];
  return {
    recommendedDiameter: largest.diameterInches,
    achievedCfm: largest[key],
    velocityFpm: Math.round(targetCfm / largest.areaSqFt),
    isAdequate: false,
  };
}
