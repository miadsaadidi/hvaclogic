/**
 * HVACLogic Kitchen Range Hood CFM & Ventilation Computational Engine
 * Implements Home Ventilating Institute (HVI) sizing guidelines,
 * industry gas BTU rules of thumb, and IRC Section M1503.6 make-up air review criteria.
 */

export type CooktopType = "gas" | "electric" | "induction";
export type HoodMountingType = "wall" | "island" | "under_cabinet";

export interface KitchenHoodInput {
  cooktopType: CooktopType;
  cooktopWidthInches: number; // e.g. 24, 30, 36, 42, 48, 60
  gasTotalBtu?: number; // Total burner output (e.g. 40,000 to 120,000 BTU/hr)
  mountingType: HoodMountingType;
  ductRunLengthFeet?: number;
  elbowCount90?: number;
  elbowCount45?: number;
  kitchenVolumeCuFt?: number;
}

export interface KitchenHoodOutput {
  recommendedCfm: number;
  hviLinearWidthCfm: number;
  gasRuleOfThumbCfm: number;
  recommendedDuctDiameterInches: number;
  ductAreaSqFt: number;
  ductAirVelocityFpm: number;
  ductEquivalentLengthFeet: number;
  estimatedStaticPressureLossInWg: number;
  recommendedHoodWidthInches: number;
  isMakeUpAirRequired: boolean; // Triggers IRC M1503.6 review (> 400 CFM)
  makeUpAirCfmRequired: number;
  governingReason: string;
  codeNotice: string;
}

/**
 * Calculates recommended kitchen range hood exhaust airflow (CFM),
 * illustrative duct sizing, equivalent length, and IRC make-up air review triggers.
 */
export function calculateKitchenHoodCfm(input: KitchenHoodInput): KitchenHoodOutput {
  const widthInches = Math.max(20, Math.min(72, input.cooktopWidthInches));
  const widthFeet = widthInches / 12;
  const mounting = input.mountingType || "wall";
  const type = input.cooktopType || "gas";
  const straightLength = Math.max(0, input.ductRunLengthFeet ?? 10);
  const elbows90 = Math.max(0, input.elbowCount90 ?? 1);
  const elbows45 = Math.max(0, input.elbowCount45 ?? 0);

  // 1. HVI Linear Width Sizing Guideline
  // Wall / under-cabinet: 100 CFM per linear foot of cooktop width
  // Island: 150 CFM per linear foot of cooktop width
  const hviRatePerFoot = mounting === "island" ? 150 : 100;
  const hviLinearWidthCfm = Math.round(widthFeet * hviRatePerFoot);

  // 2. Gas Cooktop Rule of Thumb (100 CFM per 10,000 BTU/hr total burner rating)
  let gasRuleOfThumbCfm = 0;
  if (type === "gas") {
    const btu = input.gasTotalBtu && input.gasTotalBtu > 0 ? input.gasTotalBtu : widthInches * 1500;
    gasRuleOfThumbCfm = Math.round(btu / 100);
  }

  // 3. Base Recommended Airflow
  // For gas, select the greater of HVI linear width guideline or gas BTU rule-of-thumb
  let rawCfm = type === "gas" ? Math.max(hviLinearWidthCfm, gasRuleOfThumbCfm) : hviLinearWidthCfm;
  // Round up to nearest standard 50 CFM step
  const recommendedCfm = Math.ceil(rawCfm / 50) * 50;

  // 4. Illustrative Duct Sizing & Velocity (Smooth rigid metal duct)
  let recommendedDuctDiameterInches = 6;
  if (recommendedCfm > 900) {
    recommendedDuctDiameterInches = 10;
  } else if (recommendedCfm > 600) {
    recommendedDuctDiameterInches = 8;
  } else if (recommendedCfm > 350) {
    recommendedDuctDiameterInches = 7;
  }

  const radiusFeet = recommendedDuctDiameterInches / 24;
  const ductAreaSqFt = Number((Math.PI * Math.pow(radiusFeet, 2)).toFixed(3));
  const ductAirVelocityFpm = Math.round(recommendedCfm / ductAreaSqFt);

  // 5. Duct Equivalent Length (90° elbow ≈ 10 ft, 45° elbow ≈ 5 ft, roof/wall cap with backdraft damper ≈ 25 ft)
  const ductEquivalentLengthFeet = straightLength + (elbows90 * 10) + (elbows45 * 5) + 25;

  // 6. Estimated Static Pressure Loss (in. wg)
  // Approximate Darcy-Weisbach / Colebrook friction for smooth rigid steel duct
  // Typical friction rate: ~0.10 to 0.20 in. wg per 100 ft at standard duct velocities
  const estimatedFrictionRatePer100Ft = ductAirVelocityFpm > 1500 ? 0.15 : 0.10;
  const estimatedStaticPressureLossInWg = Number(((estimatedFrictionRatePer100Ft * ductEquivalentLengthFeet) / 100).toFixed(2));

  // 7. Recommended Hood Canopy Width (Island hoods typically overlap cooktop by 3" on each side)
  const recommendedHoodWidthInches = mounting === "island" ? widthInches + 6 : widthInches;

  // 8. IRC Section M1503.6 Make-Up Air Review Trigger (> 400 CFM)
  const isMakeUpAirRequired = recommendedCfm > 400;
  const makeUpAirCfmRequired = isMakeUpAirRequired ? recommendedCfm : 0;

  let codeNotice = "Exhaust is ≤ 400 CFM. Review local codes for make-up air exemptions.";
  if (isMakeUpAirRequired) {
    codeNotice = `Make-up air review triggered (Exhaust exceeds 400 CFM). Verify IRC Section M1503.6 and locally adopted mechanical code requirements for interlocked make-up air dampers.`;
  }

  const governingReason = type === "gas"
    ? `Based on ${gasRuleOfThumbCfm.toLocaleString()} CFM gas burner rule-of-thumb (${(input.gasTotalBtu || widthInches * 1500).toLocaleString()} BTU/hr) and ${hviLinearWidthCfm} CFM HVI linear width recommendation (${hviRatePerFoot} CFM/ft ${mounting === "island" ? "island" : "wall"}).`
    : `Based on HVI linear width recommendation (${widthInches}" cooktop at ${hviRatePerFoot} CFM/ft ${mounting === "island" ? "island" : "wall"}).`;

  return {
    recommendedCfm,
    hviLinearWidthCfm,
    gasRuleOfThumbCfm,
    recommendedDuctDiameterInches,
    ductAreaSqFt,
    ductAirVelocityFpm,
    ductEquivalentLengthFeet,
    estimatedStaticPressureLossInWg,
    recommendedHoodWidthInches,
    isMakeUpAirRequired,
    makeUpAirCfmRequired,
    governingReason,
    codeNotice,
  };
}
