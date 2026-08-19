/**
 * HVACLogic Kitchen Range Hood CFM & Make-Up Air Computational Engine
 * Complies with Home Ventilating Institute (HVI), IRC Section M1503.6, and ASHRAE 62.2.
 */

export type CooktopType = "gas" | "electric" | "induction";
export type HoodMountingType = "wall" | "island" | "under_cabinet";

export interface KitchenHoodInput {
  cooktopType: CooktopType;
  cooktopWidthInches: number; // 24, 30, 36, 42, 48, 60
  gasTotalBtu?: number; // Total burner output (e.g. 40,000 to 120,000 BTU)
  mountingType: HoodMountingType;
  ductRunLengthFeet?: number;
  elbowCount90?: number;
  elbowCount45?: number;
  kitchenVolumeCuFt?: number;
}

export interface KitchenHoodOutput {
  recommendedCfm: number;
  baseThermalCfm: number;
  mountingMultiplier: number;
  ductEquivalentLengthFeet: number;
  ductResistanceAdderCfm: number;
  recommendedDuctDiameterInches: number;
  recommendedHoodWidthInches: number;
  isMakeUpAirRequired: boolean; // IRC M1503.6 (> 400 CFM)
  makeUpAirCfmRequired: number;
  governingReason: string;
  codeNotice: string;
}

/**
 * Calculates required kitchen range hood exhaust airflow (CFM),
 * equivalent duct friction losses, and mandatory IRC make-up air code requirements.
 */
export function calculateKitchenHoodCfm(input: KitchenHoodInput): KitchenHoodOutput {
  const widthInches = Math.max(20, Math.min(72, input.cooktopWidthInches));
  const widthFeet = widthInches / 12;
  const mounting = input.mountingType || "wall";
  const type = input.cooktopType || "gas";
  const straightLength = Math.max(0, input.ductRunLengthFeet ?? 10);
  const elbows90 = Math.max(0, input.elbowCount90 ?? 1);
  const elbows45 = Math.max(0, input.elbowCount45 ?? 0);
  const volume = Math.max(0, input.kitchenVolumeCuFt ?? 1200);

  // 1. Base Thermal Heat Calculation (HVI Standard)
  let baseThermalCfm = 0;
  if (type === "gas") {
    // 100 CFM per 10,000 BTU total cooktop burner rating
    const btu = input.gasTotalBtu && input.gasTotalBtu > 0 ? input.gasTotalBtu : widthInches * 1500; // ~45k BTU for 30", 60k for 36"
    baseThermalCfm = Math.round(btu / 100);
  } else {
    // Electric / Induction: 100 CFM per linear foot of cooktop width (HVI minimum)
    baseThermalCfm = Math.round(widthFeet * 100);
  }

  // 2. Mounting Capture Multiplier
  // Island hoods have no back wall to guide convective thermal plume, requiring 30% higher velocity
  const mountingMultiplier = mounting === "island" ? 1.30 : 1.00;
  let adjustedCfm = Math.round(baseThermalCfm * mountingMultiplier);

  // 3. Duct Equivalent Length & Static Pressure Loss
  // 90° elbow = 10 ft equivalent, 45° elbow = 5 ft, roof/wall cap with damper = 30 ft
  const ductEquivalentLengthFeet = straightLength + (elbows90 * 10) + (elbows45 * 5) + 30;

  // Add 1 CFM for every 1 foot of equivalent duct over 30 ft baseline
  let ductResistanceAdderCfm = 0;
  if (ductEquivalentLengthFeet > 30) {
    ductResistanceAdderCfm = Math.round((ductEquivalentLengthFeet - 30) * 0.8);
  }

  // 4. Room Air Turnover Check (ASHRAE 62.2: 15 Air Changes per Hour for Kitchens)
  const achCfm = Math.round((volume * 15) / 60);

  // 5. Final Recommended CFM (Round up to nearest 50 CFM)
  let rawCfm = Math.max(adjustedCfm + ductResistanceAdderCfm, achCfm);
  const recommendedCfm = Math.ceil(rawCfm / 50) * 50;

  // 6. Recommended Round Rigid Duct Diameter
  let recommendedDuctDiameterInches = 6;
  if (recommendedCfm > 900) {
    recommendedDuctDiameterInches = 10;
  } else if (recommendedCfm > 600) {
    recommendedDuctDiameterInches = 8;
  } else if (recommendedCfm > 350) {
    recommendedDuctDiameterInches = 7;
  }

  // 7. Recommended Hood Canopy Width (Island hoods should overlap cooktop by 3" on each side)
  const recommendedHoodWidthInches = mounting === "island" ? widthInches + 6 : widthInches;

  // 8. IRC Section M1503.6 Make-Up Air Code Enforcement (> 400 CFM)
  const isMakeUpAirRequired = recommendedCfm > 400;
  const makeUpAirCfmRequired = isMakeUpAirRequired ? recommendedCfm : 0;

  let codeNotice = "✓ Compliant with IRC M1503.6: Exhaust is ≤ 400 CFM. No dedicated make-up air damper required.";
  if (isMakeUpAirRequired) {
    codeNotice = `⚠️ IRC Section M1503.6 MANDATORY CODE ALERT: Kitchen exhaust exceeds 400 CFM (${recommendedCfm} CFM). A dedicated motorized make-up air supply damper interlocked with the range hood is legally required to prevent negative pressure and carbon monoxide backdrafting.`;
  }

  const governingReason = type === "gas"
    ? `Based on ${input.gasTotalBtu ? input.gasTotalBtu.toLocaleString() : (widthInches * 1500).toLocaleString()} BTU gas cooktop rating (100 CFM / 10k BTU) with ${mounting === "island" ? "30% island open-air capture penalty" : "standard wall capture"}.`
    : `Based on ${widthInches}" electric cooktop width (100 CFM per linear foot) with ${mounting === "island" ? "30% island open-air capture penalty" : "wall capture"}.`;

  return {
    recommendedCfm,
    baseThermalCfm,
    mountingMultiplier,
    ductEquivalentLengthFeet,
    ductResistanceAdderCfm,
    recommendedDuctDiameterInches,
    recommendedHoodWidthInches,
    isMakeUpAirRequired,
    makeUpAirCfmRequired,
    governingReason,
    codeNotice,
  };
}
