/**
 * HVACLogic Flexible Duct CFM & Friction Computational Engine
 * Implements ADC (Air Diffusion Council) Flexible Duct Performance Standards,
 * ACCA Manual D (3rd Edition), and ASHRAE Fundamentals Chapter 21.
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
    label: "0% Compression (Fully Stretched Lab Tension)",
    description: "Ideal test condition; maximum rated airflow with zero installation droop.",
  },
  4: {
    frictionMultiplier: 1.15,
    capacityFactor: 0.93,
    label: "4% Compression (Standard Code Installed Tension)",
    description: "Properly hung with support straps every 4 feet; standard residential field baseline.",
  },
  15: {
    frictionMultiplier: 1.60,
    capacityFactor: 0.78,
    label: "15% Compression (Moderate Attic Sag)",
    description: "Typical loose attic installation with 1.5\" to 2.5\" droop between joists.",
  },
  30: {
    frictionMultiplier: 2.20,
    capacityFactor: 0.65,
    label: "30% Compression (Choked / Severe Sag)",
    description: "Severe installation droop causing internal helix constriction and major airflow choking.",
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
  4: "Small Bathroom / Powder Room (<50 sq ft)",
  5: "Standard Bathroom / Walk-in Closet (50–100 sq ft)",
  6: "Small Bedroom / Home Office (100–160 sq ft)",
  7: "Standard Bedroom / Guest Room (160–220 sq ft)",
  8: "Master Bedroom / Open Dining (220–320 sq ft)",
  9: "Large Living Room / Kitchen (320–420 sq ft)",
  10: "Open Concept Great Room (420–550 sq ft)",
  12: "Trunk Run / Multi-Branch Zone (2–3 rooms)",
  14: "Main Supply Trunk (2.0 to 2.5 Tons AC)",
  16: "Central Return Duct (3.0 to 3.5 Tons AC)",
  18: "Main System Trunk (4.0 to 5.0 Tons AC)",
  20: "Central Return Air Drop (5.0 Tons AC)",
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
