/**
 * HVACLogic Combustion Air & Confined Space Computational Engine
 * Conforms to NFPA 54 (National Fuel Gas Code Section 9.3) & IFGC (International Fuel Gas Code Chapter 3).
 */

export type LouverMaterial = "metal" | "wood" | "direct_screen";

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
}

export interface CombustionAirOpeningMethod {
  methodId: string;
  title: string;
  description: string;
  netFreeAreaSqIn: number;
  grossLouverAreaSqIn: number;
  recommendedRoundDuctDiameterIn: number;
  location: string;
}

export interface CombustionAirOutput {
  totalInputBtuHr: number;
  roomVolumeCuFt: number;
  requiredUnconfinedVolumeCuFt: number;
  isConfinedSpace: boolean;
  volumePercentageOfRequired: number;
  volumeDeficitCuFt: number;
  louverFreeAreaMultiplier: number;
  methods: CombustionAirOpeningMethod[];
  summary: string;
}

const LOUVER_MULTIPLIERS: Record<LouverMaterial, { freeAreaFraction: number; multiplier: number; label: string }> = {
  metal: { freeAreaFraction: 0.75, multiplier: 1.333, label: "Metal Louvers (75% Free Area)" },
  wood: { freeAreaFraction: 0.25, multiplier: 4.0, label: "Wood Louvers / Slats (25% Free Area)" },
  direct_screen: { freeAreaFraction: 1.0, multiplier: 1.0, label: "Direct Opening / Wire Screen (100% Free Area)" },
};

/**
 * Evaluates mechanical room confined space threshold and sizes NFPA 54 combustion air openings.
 */
export function calculateCombustionAir(input: CombustionAirInput): CombustionAirOutput {
  const totalInputBtuHr = input.appliances.reduce((acc, app) => acc + Math.max(0, app.inputBtuHr), 0);
  const roomVolumeCuFt = Math.max(10, input.roomLengthFt * input.roomWidthFt * input.roomHeightFt);

  // NFPA 54 Standard Standard Rule: 50 cu ft per 1,000 BTU/hr total input
  const requiredUnconfinedVolumeCuFt = (totalInputBtuHr / 1000) * 50;
  const isConfinedSpace = roomVolumeCuFt < requiredUnconfinedVolumeCuFt;
  const volumePercentageOfRequired = Math.round((roomVolumeCuFt / Math.max(1, requiredUnconfinedVolumeCuFt)) * 100);
  const volumeDeficitCuFt = Math.max(0, requiredUnconfinedVolumeCuFt - roomVolumeCuFt);

  const louverInfo = LOUVER_MULTIPLIERS[input.louverMaterial];
  const mult = louverInfo.multiplier;

  const roundDuctSize = (sqIn: number) => {
    const rawDia = Math.sqrt((4 * sqIn) / Math.PI);
    return Math.ceil(rawDia);
  };

  const methods: CombustionAirOpeningMethod[] = [];

  // Method 1: Two Permanent Openings - Indoor Air (1 sq in / 1,000 BTU, min 100 sq in each)
  const indoorNetSqIn = Math.max(100, Math.round((totalInputBtuHr / 1000) * 1.0));
  const indoorGrossSqIn = Math.round(indoorNetSqIn * mult);
  methods.push({
    methodId: "indoor_two_openings",
    title: "1. Indoor Air (2 Openings to Adjacent Space)",
    description: "1 sq in. per 1,000 BTU/hr total input (minimum 100 sq in. each opening).",
    netFreeAreaSqIn: indoorNetSqIn,
    grossLouverAreaSqIn: indoorGrossSqIn,
    recommendedRoundDuctDiameterIn: roundDuctSize(indoorGrossSqIn),
    location: "One upper within 12\" of ceiling, one lower within 12\" of floor.",
  });

  // Method 2: Two Permanent Openings - Outdoor Air via Vertical Ducts (1 sq in / 4,000 BTU each)
  const vertNetSqIn = Math.max(10, Math.round(totalInputBtuHr / 4000));
  const vertGrossSqIn = Math.round(vertNetSqIn * mult);
  methods.push({
    methodId: "outdoor_vertical_two_openings",
    title: "2. Outdoor Air — Vertical Ducts (2 Openings)",
    description: "1 sq in. per 4,000 BTU/hr total input for vertical ducts to ventilated attic/outdoors.",
    netFreeAreaSqIn: vertNetSqIn,
    grossLouverAreaSqIn: vertGrossSqIn,
    recommendedRoundDuctDiameterIn: roundDuctSize(vertGrossSqIn),
    location: "One upper within 12\" of ceiling, one lower within 12\" of floor.",
  });

  // Method 3: Two Permanent Openings - Outdoor Air via Horizontal Ducts (1 sq in / 2,000 BTU each)
  const horizNetSqIn = Math.max(10, Math.round(totalInputBtuHr / 2000));
  const horizGrossSqIn = Math.round(horizNetSqIn * mult);
  methods.push({
    methodId: "outdoor_horizontal_two_openings",
    title: "3. Outdoor Air — Horizontal Ducts (2 Openings)",
    description: "1 sq in. per 2,000 BTU/hr total input for horizontal ducts penetrating exterior walls.",
    netFreeAreaSqIn: horizNetSqIn,
    grossLouverAreaSqIn: horizGrossSqIn,
    recommendedRoundDuctDiameterIn: roundDuctSize(horizGrossSqIn),
    location: "One upper within 12\" of ceiling, one lower within 12\" of floor.",
  });

  // Method 4: One Permanent Opening - Outdoor Air (1 sq in / 3,000 BTU)
  const singleNetSqIn = Math.max(10, Math.round(totalInputBtuHr / 3000));
  const singleGrossSqIn = Math.round(singleNetSqIn * mult);
  methods.push({
    methodId: "outdoor_single_opening",
    title: "4. Outdoor Air — Single Opening",
    description: "1 sq in. per 3,000 BTU/hr total input for single opening direct to outdoors.",
    netFreeAreaSqIn: singleNetSqIn,
    grossLouverAreaSqIn: singleGrossSqIn,
    recommendedRoundDuctDiameterIn: roundDuctSize(singleGrossSqIn),
    location: "Commencing within 12\" of ceiling with equipment clearance requirements.",
  });

  const summary = isConfinedSpace
    ? `Mechanical room volume of ${roomVolumeCuFt.toLocaleString()} cu ft is CONFINED for ${totalInputBtuHr.toLocaleString()} BTU/hr total gas load (requires ${requiredUnconfinedVolumeCuFt.toLocaleString()} cu ft). Permanent combustion air openings are required by NFPA 54.`
    : `Mechanical room volume of ${roomVolumeCuFt.toLocaleString()} cu ft is UNCONFINED for ${totalInputBtuHr.toLocaleString()} BTU/hr total gas load (exceeds ${requiredUnconfinedVolumeCuFt.toLocaleString()} cu ft threshold). Natural infiltration provides adequate combustion air.`;

  return {
    totalInputBtuHr,
    roomVolumeCuFt,
    requiredUnconfinedVolumeCuFt,
    isConfinedSpace,
    volumePercentageOfRequired,
    volumeDeficitCuFt,
    louverFreeAreaMultiplier: mult,
    methods,
    summary,
  };
}
