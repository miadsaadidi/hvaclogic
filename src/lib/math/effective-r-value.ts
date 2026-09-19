/**
 * HVACLogic Building Envelope Thermal Bridging & Effective Assembly U-Factor Computational Engine
 * Complies with ANSI/ASHRAE/IES Standard 90.1-2022 (Normative Appendix A),
 * ASHRAE Handbook—Fundamentals 2021 (Chapters 25 & 27), and IECC 2021/2024.
 */

export type FramingMaterial = "wood" | "steel";
export type StudDepth = "3.5" | "5.5" | "6.0" | "7.25" | "8.0";
export type StudSpacing = 16 | 24;

export interface AssemblyThermalInput {
  framingMaterial: FramingMaterial;
  studDepth: StudDepth;
  studSpacing: StudSpacing;
  cavityNominalR: number; // e.g. 0, 11, 13, 15, 19, 21, 25
  continuousInsulationType: "none" | "xps" | "eps" | "polyiso" | "mineral_wool" | "custom";
  continuousInsulationThicknessInches?: number;
  customCiRValue?: number;
  sheathingR?: number; // default: 0.62 (7/16" OSB)
  claddingR?: number; // default: 0.60 (vinyl) or 0.80 (wood)
  interiorFinishR?: number; // default: 0.45 (1/2" gypsum drywall)
  includeAirFilms?: boolean; // default: true (interior 0.68 + exterior 0.17 = 0.85)
}

export interface AssemblyThermalOutput {
  framingMaterial: FramingMaterial;
  studDescription: string;
  studSpacing: StudSpacing;
  nominalCavityR: number;
  effectiveCavityR: number;
  cavityDeratePercent: number; // % loss due to thermal bridging
  continuousInsulationR: number;
  baseContinuousLayersR: number; // Air films + drywall + sheathing + cladding
  totalAssemblyEffectiveR: number; // Whole-wall effective R-value
  totalAssemblyUFactor: number; // Whole-wall U-factor (BTU/hr·ft²·°F)
  framingFactorPercent: number; // Area fraction of framing (e.g. 25% or 22%)
  calculationMethod: string;
  standardReference: string;
}

/**
 * ASHRAE 90.1-2022 Table A9.2-1 & A3.3-1:
 * Effective Cavity R-Values for Cold-Formed Steel Stud Wall Systems
 */
export const STEEL_STUD_EFFECTIVE_CAVITY_R: Record<string, number> = {
  // 3.5" Studs @ 16" O.C.
  "3.5_16_0": 0.0,
  "3.5_16_11": 5.5,
  "3.5_16_13": 6.0,
  "3.5_16_15": 6.4,
  // 3.5" Studs @ 24" O.C.
  "3.5_24_0": 0.0,
  "3.5_24_11": 6.6,
  "3.5_24_13": 7.2,
  "3.5_24_15": 7.8,
  // 6.0" Studs @ 16" O.C.
  "6.0_16_0": 0.0,
  "6.0_16_19": 7.1,
  "6.0_16_21": 7.4,
  // 6.0" Studs @ 24" O.C.
  "6.0_24_0": 0.0,
  "6.0_24_19": 8.6,
  "6.0_24_21": 9.0,
  // 8.0" Studs @ 16" O.C.
  "8.0_16_0": 0.0,
  "8.0_16_25": 7.8,
  // 8.0" Studs @ 24" O.C.
  "8.0_24_0": 0.0,
  "8.0_24_25": 9.6,
};

/**
 * Standard Continuous Exterior Insulation (ci) Material Properties (ASTM Specifications)
 */
export const CONTINUOUS_INSULATION_R_PER_INCH: Record<string, number> = {
  none: 0.0,
  xps: 5.0, // ASTM C578 Type IV Extruded Polystyrene
  eps: 4.0, // ASTM C578 Type II Expanded Polystyrene
  polyiso: 6.0, // ASTM C1289 Type I/II Foil/Glass Faced Polyisocyanurate
  mineral_wool: 4.2, // ASTM C612 Type IVB Semi-Rigid/Rigid Mineral Wool Board
};

/**
 * Calculates continuous exterior insulation R-value
 */
export function calculateContinuousInsulationR(
  type: AssemblyThermalInput["continuousInsulationType"],
  thicknessInches: number = 0,
  customR: number = 0
): number {
  if (type === "none") return 0;
  if (type === "custom") return Math.max(0, customR);
  const rate = CONTINUOUS_INSULATION_R_PER_INCH[type] || 0;
  return Math.round(Math.max(0, thicknessInches) * rate * 10) / 10;
}

/**
 * Master Thermal Bridging & Effective Assembly U-Factor Solver
 */
export function calculateEffectiveAssemblyThermal(input: AssemblyThermalInput): AssemblyThermalOutput {
  const {
    framingMaterial,
    studDepth,
    studSpacing,
    cavityNominalR,
    continuousInsulationType,
    continuousInsulationThicknessInches = 0,
    customCiRValue = 0,
    sheathingR = 0.62, // 7/16" OSB
    claddingR = 0.60, // Vinyl / wood siding baseline
    interiorFinishR = 0.45, // 1/2" Gypsum board
    includeAirFilms = true,
  } = input;

  const airFilmsR = includeAirFilms ? 0.68 + 0.17 : 0; // Interior 0.68 + Exterior 0.17
  const baseContinuousLayersR = Math.round((airFilmsR + interiorFinishR + sheathingR + claddingR) * 100) / 100;
  const continuousInsulationR = calculateContinuousInsulationR(
    continuousInsulationType,
    continuousInsulationThicknessInches,
    customCiRValue
  );

  let effectiveCavityR = 0;
  let totalAssemblyUFactor = 0;
  let totalAssemblyEffectiveR = 0;
  let framingFactorPercent = 0;
  let calculationMethod = "";
  let standardReference = "";

  if (framingMaterial === "steel") {
    // 1. Steel Stud Formulation: ASHRAE 90.1 Normative Appendix A (Table A9.2-1 & Section A3.3)
    // Normalizing depth key to standard gauge tables (3.5", 6.0", 8.0")
    let depthKey = studDepth;
    if (depthKey === "5.5") depthKey = "6.0";
    if (depthKey === "7.25") depthKey = "8.0";

    const lookupKey = `${depthKey}_${studSpacing}_${cavityNominalR}`;
    effectiveCavityR = STEEL_STUD_EFFECTIVE_CAVITY_R[lookupKey] ?? 0;

    // Fallback approximation if non-standard nominal R is provided
    if (effectiveCavityR === 0 && cavityNominalR > 0) {
      // Approximate interpolation based on ASHRAE Table A9.2-1 ratios
      const ratio = studSpacing === 16 ? 0.45 : 0.55;
      effectiveCavityR = Math.round(cavityNominalR * ratio * 10) / 10;
    }

    // Whole wall effective R is the series sum of continuous layers + effective cavity R
    totalAssemblyEffectiveR = Math.round((baseContinuousLayersR + continuousInsulationR + effectiveCavityR) * 100) / 100;
    totalAssemblyUFactor = totalAssemblyEffectiveR > 0 ? Math.round((1 / totalAssemblyEffectiveR) * 1000) / 1000 : 1.0;
    framingFactorPercent = studSpacing === 16 ? 25 : 22;
    calculationMethod = "ASHRAE 90.1 Appendix A Empirical Effective Cavity Insulation Method";
    standardReference = "ANSI/ASHRAE/IES Standard 90.1-2022 (Table A9.2-1 & Section A3.3)";
  } else {
    // 2. Wood Stud Formulation: Parallel-Path Isothermal Planes Method (ASHRAE Fundamentals Ch. 25/27 & 90.1 Sec. A3.1)
    const depthInches = parseFloat(studDepth);
    const woodRPerInch = 1.25; // Softwood lumber thermal resistance per inch
    const woodStudR = Math.round(depthInches * woodRPerInch * 100) / 100;

    framingFactorPercent = studSpacing === 16 ? 25 : 22;
    const fFraming = framingFactorPercent / 100;
    const fCavity = 1 - fFraming;

    const commonR = baseContinuousLayersR + continuousInsulationR;
    const rFramingPath = commonR + woodStudR;
    const rCavityPath = commonR + cavityNominalR;

    // Parallel path area-weighted U-factor
    const uFramingPath = 1 / rFramingPath;
    const uCavityPath = rCavityPath > 0 ? 1 / rCavityPath : 1.0;
    totalAssemblyUFactor = Math.round((fFraming * uFramingPath + fCavity * uCavityPath) * 1000) / 1000;
    totalAssemblyEffectiveR = totalAssemblyUFactor > 0 ? Math.round((1 / totalAssemblyUFactor) * 100) / 100 : commonR;

    // Derived effective cavity R from overall assembly resistance minus continuous layers
    effectiveCavityR = Math.round(Math.max(0, totalAssemblyEffectiveR - commonR) * 10) / 10;
    calculationMethod = "Parallel-Path Area-Weighted Isothermal Planes Method";
    standardReference = "ASHRAE Handbook—Fundamentals 2021 (Chapters 25 & 27) & ASHRAE 90.1 Section A3.1";
  }

  const cavityDeratePercent =
    cavityNominalR > 0
      ? Math.round(((cavityNominalR - effectiveCavityR) / cavityNominalR) * 1000) / 10
      : 0;

  const studDescription = `${framingMaterial === "wood" ? "Wood" : "Cold-Formed Steel"} ${studDepth}" Studs @ ${studSpacing}" O.C.`;

  return {
    framingMaterial,
    studDescription,
    studSpacing,
    nominalCavityR: cavityNominalR,
    effectiveCavityR,
    cavityDeratePercent,
    continuousInsulationR,
    baseContinuousLayersR,
    totalAssemblyEffectiveR,
    totalAssemblyUFactor,
    framingFactorPercent,
    calculationMethod,
    standardReference,
  };
}
