/**
 * HVACLogic Building Envelope Thermal Bridging & Effective Assembly U-Factor Computational Engine
 * Complies with ANSI/ASHRAE/IES Standard 90.1-2022 (Normative Appendix A Table A9.2-2),
 * ASHRAE Handbook—Fundamentals (Chapters 25 & 27), and IECC Prescriptive Envelope Standards.
 */

export type FramingMaterial = "wood" | "steel";
export type StudDepth = "3.5" | "5.5" | "6.0" | "7.25" | "8.0";
export type StudSpacing = 16 | 24;

export interface AssemblyThermalInput {
  framingMaterial: FramingMaterial;
  studDepth: StudDepth;
  studSpacing: StudSpacing;
  cavityNominalR: number; // Nominal cavity insulation rating (e.g. 0, 11, 13, 15, 19, 21, 25)
  continuousInsulationType: "none" | "xps" | "eps" | "polyiso" | "mineral_wool" | "custom";
  continuousInsulationThicknessInches?: number;
  customCiRValue?: number;
  framingFactorPercent?: number; // Optional custom framing area fraction (e.g. 25% or 22%)
  sheathingR?: number; // default: 0.62 (7/16" OSB / Plywood)
  claddingR?: number; // default: 0.60 (Vinyl / architectural siding)
  interiorFinishR?: number; // default: 0.45 (1/2" Gypsum drywall)
  includeAirFilms?: boolean; // default: true (interior 0.68 + exterior 0.17 = 0.85)
}

export interface AssemblyThermalOutput {
  framingMaterial: FramingMaterial;
  studDescription: string;
  studSpacing: StudSpacing;
  nominalCavityR: number;
  effectiveCavityR: number;
  cavityDeratePercent: number; // Percentage reduction of cavity insulation due to direct framing bridging
  continuousInsulationR: number;
  baseContinuousLayersR: number; // Interior air film + drywall + sheathing + cladding + exterior air film
  framingPathR: number; // Resistance along framing path (wood)
  cavityPathR: number; // Resistance along cavity path (wood)
  totalAssemblyEffectiveR: number; // Whole-wall assembly effective R-value
  totalAssemblyUFactor: number; // Whole-wall assembly U-factor (BTU/hr·ft²·°F)
  framingFactorPercent: number; // Area fraction of framing (e.g. 25% or 22%)
  isSourceTabulated: boolean; // True if steel value is directly from ASHRAE Table A9.2-2
  calculationMethod: string;
  standardReference: string;
  summary: string;
}

/**
 * ANSI/ASHRAE/IES Standard 90.1-2022 Normative Appendix A, Table A9.2-2:
 * Effective Cavity R-Values for Cold-Formed Steel Stud Wall Systems
 */
export const ASHRAE_STEEL_STUD_TABLE_A9_2_2: Record<string, { rEff: number; isDirectTabulated: boolean }> = {
  // 3.5" Studs @ 16" O.C.
  "3.5_16_0": { rEff: 0.0, isDirectTabulated: true },
  "3.5_16_11": { rEff: 5.5, isDirectTabulated: true },
  "3.5_16_13": { rEff: 6.0, isDirectTabulated: true },
  "3.5_16_15": { rEff: 6.4, isDirectTabulated: true },
  // 3.5" Studs @ 24" O.C.
  "3.5_24_0": { rEff: 0.0, isDirectTabulated: true },
  "3.5_24_11": { rEff: 6.6, isDirectTabulated: true },
  "3.5_24_13": { rEff: 7.2, isDirectTabulated: true },
  "3.5_24_15": { rEff: 7.8, isDirectTabulated: true },
  // 6.0" Studs @ 16" O.C.
  "6.0_16_0": { rEff: 0.0, isDirectTabulated: true },
  "6.0_16_19": { rEff: 7.1, isDirectTabulated: true },
  "6.0_16_21": { rEff: 7.4, isDirectTabulated: true },
  // 6.0" Studs @ 24" O.C.
  "6.0_24_0": { rEff: 0.0, isDirectTabulated: true },
  "6.0_24_19": { rEff: 8.6, isDirectTabulated: true },
  "6.0_24_21": { rEff: 9.0, isDirectTabulated: true },
  // 8.0" Studs @ 16" O.C.
  "8.0_16_0": { rEff: 0.0, isDirectTabulated: true },
  "8.0_16_25": { rEff: 7.8, isDirectTabulated: true },
  // 8.0" Studs @ 24" O.C.
  "8.0_24_0": { rEff: 0.0, isDirectTabulated: true },
  "8.0_24_25": { rEff: 9.6, isDirectTabulated: true },
};

/**
 * Standard Continuous Exterior Insulation (CI) Nominal R-Values per Inch
 */
export const CONTINUOUS_INSULATION_R_PER_INCH: Record<string, { rPerInch: number; specification: string }> = {
  none: { rPerInch: 0.0, specification: "No exterior continuous insulation" },
  xps: { rPerInch: 5.0, specification: "ASTM C578 Type IV Extruded Polystyrene (XPS)" },
  eps: { rPerInch: 4.0, specification: "ASTM C578 Type II Expanded Polystyrene (EPS)" },
  polyiso: { rPerInch: 6.0, specification: "ASTM C1289 Type I/II Foil/Glass Faced Polyisocyanurate" },
  mineral_wool: { rPerInch: 4.2, specification: "ASTM C612 Type IVB Rigid Mineral Wool Board" },
};

/**
 * Calculates continuous exterior insulation R-value from material and thickness
 */
export function calculateContinuousInsulationR(
  type: AssemblyThermalInput["continuousInsulationType"],
  thicknessInches: number = 0,
  customR: number = 0
): number {
  if (type === "none") return 0;
  if (type === "custom") return Math.max(0, customR);
  const spec = CONTINUOUS_INSULATION_R_PER_INCH[type];
  const rate = spec ? spec.rPerInch : 0;
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
    sheathingR = 0.62, // 7/16" OSB / Plywood
    claddingR = 0.60, // Siding / Exterior finish
    interiorFinishR = 0.45, // 1/2" Gypsum board
    includeAirFilms = true,
  } = input;

  const airFilmsR = includeAirFilms ? 0.68 + 0.17 : 0; // Interior surface 0.68 + Exterior surface 0.17
  const baseContinuousLayersR = Math.round((airFilmsR + interiorFinishR + sheathingR + claddingR) * 100) / 100;
  const continuousInsulationR = calculateContinuousInsulationR(
    continuousInsulationType,
    continuousInsulationThicknessInches,
    customCiRValue
  );

  let effectiveCavityR = 0;
  let framingPathR = 0;
  let cavityPathR = 0;
  let totalAssemblyUFactor = 0;
  let totalAssemblyEffectiveR = 0;
  let framingFactorPercent = 0;
  let isSourceTabulated = false;
  let calculationMethod = "";
  let standardReference = "";

  const commonR = Math.round((baseContinuousLayersR + continuousInsulationR) * 100) / 100;

  if (framingMaterial === "steel") {
    // Cold-Formed Steel Framing: ASHRAE Standard 90.1-2022 Appendix A Table A9.2-2
    let depthKey = studDepth;
    if (depthKey === "5.5") depthKey = "6.0";
    if (depthKey === "7.25") depthKey = "8.0";

    const lookupKey = `${depthKey}_${studSpacing}_${cavityNominalR}`;
    const entry = ASHRAE_STEEL_STUD_TABLE_A9_2_2[lookupKey];

    if (entry) {
      effectiveCavityR = entry.rEff;
      isSourceTabulated = entry.isDirectTabulated;
    } else if (cavityNominalR > 0) {
      // Linear approximation for non-tabulated cavity R-values
      const ratio = studSpacing === 16 ? 0.38 : 0.46;
      effectiveCavityR = Math.round(cavityNominalR * ratio * 10) / 10;
      isSourceTabulated = false;
    } else {
      effectiveCavityR = 0;
      isSourceTabulated = true;
    }

    // In steel framing, R_eff_cavity already accounts for the 3D metal stud thermal bridging through the cavity.
    // Assembly R is the direct series sum of continuous layers plus effective cavity R.
    totalAssemblyEffectiveR = Math.round((commonR + effectiveCavityR) * 100) / 100;
    totalAssemblyUFactor = totalAssemblyEffectiveR > 0 ? Math.round((1 / totalAssemblyEffectiveR) * 1000) / 1000 : 1.0;
    framingFactorPercent = input.framingFactorPercent !== undefined && input.framingFactorPercent > 0
      ? input.framingFactorPercent
      : (studSpacing === 16 ? 25 : 22);

    framingPathR = commonR; // Not separately weighted in the ASHRAE empirical table method
    cavityPathR = commonR + cavityNominalR;

    calculationMethod = isSourceTabulated
      ? "ASHRAE 90.1 Appendix A Table A9.2-2 Empirical Effective Cavity Method"
      : "ASHRAE 90.1 Appendix A Empirical Effective Cavity Interpolation";
    standardReference = "ANSI/ASHRAE/IES Standard 90.1-2022 (Normative Appendix A Table A9.2-2 & Section A3.3)";
  } else {
    // Wood Framing: Parallel-Path Isothermal Planes Method (ASHRAE Fundamentals Ch. 25/27 & ASHRAE 90.1 Section A3.1)
    const depthInches = parseFloat(studDepth);
    const woodRPerInch = 1.25; // Softwood lumber thermal resistance: R-1.25 per inch
    const woodStudR = Math.round(depthInches * woodRPerInch * 100) / 100;

    framingFactorPercent = input.framingFactorPercent !== undefined && input.framingFactorPercent > 0
      ? input.framingFactorPercent
      : (studSpacing === 16 ? 25 : 22);

    const fFraming = framingFactorPercent / 100;
    const fCavity = 1 - fFraming;

    framingPathR = Math.round((commonR + woodStudR) * 100) / 100;
    cavityPathR = Math.round((commonR + cavityNominalR) * 100) / 100;

    // Parallel-path area-weighted U-factor: U = f_framing / R_framing + f_cavity / R_cavity
    const uFramingPath = framingPathR > 0 ? 1 / framingPathR : 1.0;
    const uCavityPath = cavityPathR > 0 ? 1 / cavityPathR : 1.0;
    const rawU = fFraming * uFramingPath + fCavity * uCavityPath;

    totalAssemblyUFactor = Math.round(rawU * 1000) / 1000;
    totalAssemblyEffectiveR = rawU > 0 ? Math.round((1 / rawU) * 100) / 100 : commonR;

    // Effective cavity R is the net cavity resistance derived by subtracting continuous layers from assembly R
    effectiveCavityR = Math.round(Math.max(0, totalAssemblyEffectiveR - commonR) * 10) / 10;
    isSourceTabulated = false;

    calculationMethod = "Parallel-Path Area-Weighted Isothermal Planes Method";
    standardReference = "ASHRAE Handbook of Fundamentals (Chapters 25 & 27) & ASHRAE 90.1 Section A3.1";
  }

  const cavityDeratePercent =
    cavityNominalR > 0
      ? Math.round(((cavityNominalR - effectiveCavityR) / cavityNominalR) * 1000) / 10
      : 0;

  const studDescription = `${framingMaterial === "wood" ? "Wood" : "Cold-Formed Steel"} ${studDepth}" Studs @ ${studSpacing}" O.C.`;

  const summary = `${studDescription} with nominal R-${cavityNominalR} cavity insulation yields an effective cavity resistance of R-${effectiveCavityR.toFixed(1)} (${cavityDeratePercent}% framing derate). With R-${baseContinuousLayersR.toFixed(2)} base layers and R-${continuousInsulationR.toFixed(1)} continuous insulation, whole-wall performance is R-${totalAssemblyEffectiveR.toFixed(2)} effective (U = ${totalAssemblyUFactor.toFixed(3)} BTU/hr·ft²·°F).`;

  return {
    framingMaterial,
    studDescription,
    studSpacing,
    nominalCavityR: cavityNominalR,
    effectiveCavityR,
    cavityDeratePercent,
    continuousInsulationR,
    baseContinuousLayersR,
    framingPathR,
    cavityPathR,
    totalAssemblyEffectiveR,
    totalAssemblyUFactor,
    framingFactorPercent,
    isSourceTabulated,
    calculationMethod,
    standardReference,
    summary,
  };
}
