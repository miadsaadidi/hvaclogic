/**
 * HVACLogic Combustion Air & Confined Space Computational Engine
 * Conforms to NFPA 54 (National Fuel Gas Code Section 9.3) & IFGC (International Fuel Gas Code Section 304).
 */

export type LouverMaterial = "metal" | "wood" | "direct_screen" | "custom";

export interface GasAppliance {
  id: string;
  name: string;
  inputBtuHr: number;
}

export interface CombustionAirInput {
  appliances: GasAppliance[];
  roomLengthFt: number;
  roomWidthFt: number;
  roomHeightFt: number;
  louverMaterial: LouverMaterial;
  customLouverPercent?: number; // Optional user-specified free area percentage (e.g. 60%)
}

export interface CombustionAirOpeningMethod {
  methodId: string;
  title: string;
  codeReference: string;
  description: string;
  codeRule: string;
  netFreeAreaSqIn: number;
  grossLouverAreaSqIn: number;
  calculatedRoundDiameterIn: number;
  recommendedRoundDuctDiameterIn: number;
  location: string;
  codeLimitations?: string;
}

export interface CombustionAirOutput {
  totalInputBtuHr: number;
  roomVolumeCuFt: number;
  requiredUnconfinedVolumeCuFt: number;
  isConfinedSpace: boolean;
  volumePercentageOfRequired: number;
  volumeDeficitCuFt: number;
  louverFreeAreaFraction: number;
  louverFreeAreaPercentage: number;
  louverDescription: string;
  methods: CombustionAirOpeningMethod[];
  summary: string;
}

export const LOUVER_PRESETS: Record<Exclude<LouverMaterial, "custom">, { freeAreaFraction: number; label: string; description: string }> = {
  metal: {
    freeAreaFraction: 0.75,
    label: "Metal Louvers (Assumed 75% Free Area)",
    description: "Standard stamped sheet metal louvers. Reference free area is 75% unless manufacturer data specifies otherwise.",
  },
  wood: {
    freeAreaFraction: 0.25,
    label: "Wood Louvers / Slats (Assumed 25% Free Area)",
    description: "Constructed wood architectural louvers or thick fixed slats. Reference free area is 25%.",
  },
  direct_screen: {
    freeAreaFraction: 1.0,
    label: "Unobstructed Screen / Direct Opening (100% Free Area)",
    description: "Open ductwork or coarse wire mesh screen (mesh ≥ 1/4 in.) with negligible airflow restriction.",
  },
};

/**
 * Evaluates mechanical room confined space threshold and sizes NFPA 54 / IFGC combustion air openings.
 */
export function calculateCombustionAir(input: CombustionAirInput): CombustionAirOutput {
  const totalInputBtuHr = input.appliances.reduce((acc, app) => acc + Math.max(0, app.inputBtuHr), 0);
  const roomVolumeCuFt = Math.max(10, input.roomLengthFt * input.roomWidthFt * input.roomHeightFt);

  // NFPA 54 Section 9.3.2.1 / IFGC Section 304.5.1 Standard Method: 50 cu ft per 1,000 BTU/hr total input (20 BTU/hr per cu ft)
  const requiredUnconfinedVolumeCuFt = (totalInputBtuHr / 1000) * 50;
  const isConfinedSpace = roomVolumeCuFt < requiredUnconfinedVolumeCuFt;
  const volumePercentageOfRequired = Math.round((roomVolumeCuFt / Math.max(1, requiredUnconfinedVolumeCuFt)) * 100);
  const volumeDeficitCuFt = Math.max(0, requiredUnconfinedVolumeCuFt - roomVolumeCuFt);

  let freeAreaFraction = 0.75;
  let louverDescription = "Metal Louvers (Assumed 75% Free Area)";

  if (input.louverMaterial === "custom") {
    const pct = input.customLouverPercent !== undefined && input.customLouverPercent > 0 && input.customLouverPercent <= 100
      ? input.customLouverPercent
      : 75;
    freeAreaFraction = pct / 100;
    louverDescription = `Custom Louver (${pct}% Specified Free Area)`;
  } else {
    const preset = LOUVER_PRESETS[input.louverMaterial] || LOUVER_PRESETS.metal;
    freeAreaFraction = preset.freeAreaFraction;
    louverDescription = preset.label;
  }

  const computeGrossAndDiameters = (netSqIn: number) => {
    const grossSqIn = Math.round(netSqIn / freeAreaFraction);
    // Exact equivalent geometric diameter derived from gross opening area: D = sqrt(4 * A / pi)
    const rawDia = Math.sqrt((4 * grossSqIn) / Math.PI);
    const calculatedRoundDiameterIn = Math.round(rawDia * 10) / 10;
    // Standard discrete commercial round duct trade sizes (e.g. 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18 in.)
    const standardDuctTiers = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 24];
    const recommendedRoundDuctDiameterIn = standardDuctTiers.find((d) => d >= Math.ceil(rawDia)) || Math.ceil(rawDia);
    return { grossSqIn, calculatedRoundDiameterIn, recommendedRoundDuctDiameterIn };
  };

  const methods: CombustionAirOpeningMethod[] = [];

  // Method 1: Two Permanent Openings — Indoor Air (NFPA 54 §9.3.2.1 / IFGC §304.5.3)
  // Rule: 1 sq in. per 1,000 BTU/hr total input, but not less than 100 sq in. each opening.
  const indoorNetSqIn = Math.max(100, Math.round((totalInputBtuHr / 1000) * 1.0));
  const indoorGeom = computeGrossAndDiameters(indoorNetSqIn);
  methods.push({
    methodId: "indoor_two_openings",
    title: "1. Indoor Air (2 Openings to Communicating Spaces)",
    codeReference: "NFPA 54 Section 9.3.2.1 / IFGC Section 304.5.3",
    codeRule: "1 sq in. per 1,000 BTU/hr total input (minimum 100 sq in. net free area per opening).",
    description: "Two permanent openings communicating with adjacent indoor spaces possessing adequate volume.",
    netFreeAreaSqIn: indoorNetSqIn,
    grossLouverAreaSqIn: indoorGeom.grossSqIn,
    calculatedRoundDiameterIn: indoorGeom.calculatedRoundDiameterIn,
    recommendedRoundDuctDiameterIn: indoorGeom.recommendedRoundDuctDiameterIn,
    location: "One upper opening commencing within 12\" of the top of enclosure, one lower within 12\" of the floor.",
    codeLimitations: "Adjacent rooms must not be confined and must provide sufficient combined volume without tight air sealing.",
  });

  // Method 2: Two Permanent Openings — Outdoor Air via Vertical Ducts (NFPA 54 §9.3.3.1(1) / IFGC §304.6.1(1))
  // Rule: 1 sq in. per 4,000 BTU/hr total input each opening.
  const vertNetSqIn = Math.max(10, Math.round(totalInputBtuHr / 4000));
  const vertGeom = computeGrossAndDiameters(vertNetSqIn);
  methods.push({
    methodId: "outdoor_vertical_two_openings",
    title: "2. Outdoor Air — Vertical Ducts (2 Openings)",
    codeReference: "NFPA 54 Section 9.3.3.1(1) / IFGC Section 304.6.1(1)",
    codeRule: "1 sq in. per 4,000 BTU/hr total input each opening.",
    description: "Two vertical ducts communicating directly with outdoors or ventilated attic/crawl spaces.",
    netFreeAreaSqIn: vertNetSqIn,
    grossLouverAreaSqIn: vertGeom.grossSqIn,
    calculatedRoundDiameterIn: vertGeom.calculatedRoundDiameterIn,
    recommendedRoundDuctDiameterIn: vertGeom.recommendedRoundDuctDiameterIn,
    location: "One upper opening within 12\" of enclosure ceiling, one lower opening within 12\" of floor.",
    codeLimitations: "Ducts must be vertical or have a slope not exceeding 45° from vertical.",
  });

  // Method 3: Two Permanent Openings — Outdoor Air via Horizontal Ducts (NFPA 54 §9.3.3.1(2) / IFGC §304.6.1(2))
  // Rule: 1 sq in. per 2,000 BTU/hr total input each opening.
  const horizNetSqIn = Math.max(10, Math.round(totalInputBtuHr / 2000));
  const horizGeom = computeGrossAndDiameters(horizNetSqIn);
  methods.push({
    methodId: "outdoor_horizontal_two_openings",
    title: "3. Outdoor Air — Horizontal Ducts (2 Openings)",
    codeReference: "NFPA 54 Section 9.3.3.1(2) / IFGC Section 304.6.1(2)",
    codeRule: "1 sq in. per 2,000 BTU/hr total input each opening.",
    description: "Two horizontal ducts penetrating exterior walls directly to outdoor air.",
    netFreeAreaSqIn: horizNetSqIn,
    grossLouverAreaSqIn: horizGeom.grossSqIn,
    calculatedRoundDiameterIn: horizGeom.calculatedRoundDiameterIn,
    recommendedRoundDuctDiameterIn: horizGeom.recommendedRoundDuctDiameterIn,
    location: "One upper opening within 12\" of enclosure ceiling, one lower opening within 12\" of floor.",
    codeLimitations: "Ducts must have a cross-sectional area not less than the required opening free area.",
  });

  // Method 4: One Permanent Opening — Outdoor Air (NFPA 54 §9.3.3.2 / IFGC §304.6.2)
  // Rule: 1 sq in. per 3,000 BTU/hr total input (minimum sum of all appliance draft hood / flue collar areas, min 100 sq in recommended practice).
  const singleNetSqIn = Math.max(10, Math.round(totalInputBtuHr / 3000));
  const singleGeom = computeGrossAndDiameters(singleNetSqIn);
  methods.push({
    methodId: "outdoor_single_opening",
    title: "4. Outdoor Air — Single Opening",
    codeReference: "NFPA 54 Section 9.3.3.2 / IFGC Section 304.6.2",
    codeRule: "1 sq in. per 3,000 BTU/hr total input (minimum required free area).",
    description: "One opening direct to outdoors or through a vertical/horizontal duct to outdoors.",
    netFreeAreaSqIn: singleNetSqIn,
    grossLouverAreaSqIn: singleGeom.grossSqIn,
    calculatedRoundDiameterIn: singleGeom.calculatedRoundDiameterIn,
    recommendedRoundDuctDiameterIn: singleGeom.recommendedRoundDuctDiameterIn,
    location: "Commencing within 12\" of enclosure ceiling.",
    codeLimitations: "Equipment must maintain clearances of at least 1\" from sides and back, and 6\" from the front.",
  });

  const summary = isConfinedSpace
    ? `Mechanical room volume of ${roomVolumeCuFt.toLocaleString()} cu ft is CONFINED for ${totalInputBtuHr.toLocaleString()} BTU/hr total gas appliance input under the NFPA 54 / IFGC Standard Method (requires ${requiredUnconfinedVolumeCuFt.toLocaleString()} cu ft). Permanent combustion air openings sized per the selected code method are required.`
    : `Mechanical room volume of ${roomVolumeCuFt.toLocaleString()} cu ft meets the NFPA 54 / IFGC Standard Method unconfined threshold (50 cu ft / 1,000 BTU/hr) for ${totalInputBtuHr.toLocaleString()} BTU/hr total gas load. Note: This assumes standard building infiltration (≥0.40 ACH); where tight construction is present, the Known Air Infiltration Rate method or outdoor air openings are required by code.`;

  return {
    totalInputBtuHr,
    roomVolumeCuFt,
    requiredUnconfinedVolumeCuFt,
    isConfinedSpace,
    volumePercentageOfRequired,
    volumeDeficitCuFt,
    louverFreeAreaFraction: freeAreaFraction,
    louverFreeAreaPercentage: Math.round(freeAreaFraction * 100),
    louverDescription,
    methods,
    summary,
  };
}
