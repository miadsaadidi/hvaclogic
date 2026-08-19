/**
 * HVACLogic Hydronic Boiler & Radiator Sizing Computational Engine
 * Implements I=B=R (Hydronics Institute), AHRI Standard Ratings, and ASHRAE Hydronics.
 */

export type BoilerSizingMode = "baseboard" | "radiator_edr" | "heat_loss";
export type HeatingMedium = "hot_water" | "steam";

export interface BoilerSizingInput {
  mode: BoilerSizingMode;
  heatingMedium: HeatingMedium;
  baseboardLinearFeet?: number; // e.g. 50 to 400 linear ft
  waterTempF?: number; // e.g. 120°F, 140°F, 160°F, 180°F
  radiatorEdrSqFt?: number; // e.g. 100 to 1,200 sq ft EDR
  buildingHeatLossBtu?: number; // e.g. 20,000 to 250,000 BTU/hr
  hasIndirectDhw?: boolean;
  hasDhwPriority?: boolean; // If true, space heat circulators de-energize during DHW demand (0 BTU adder)
  boilerAfuePercent?: number; // e.g. 82% to 96%
}

export interface BoilerSizingOutput {
  mode: BoilerSizingMode;
  heatingMedium: HeatingMedium;
  connectedEmitterLoadBtu: number;
  dhwPickupBtu: number;
  totalNetAhriLoadBtu: number;
  pipingAndPickupFactor: number;
  grossDoeCapacityBtu: number;
  recommendedBoilerInputBtu: number;
  recommendedBoilerInputKw: number;
  boilerAfuePercent: number;
  isCondensingEligible: boolean;
  condensingAnnualSavingsBtu: number;
  summary: string;
}

/**
 * Returns copper fin-tube baseboard BTU/hr per linear foot based on average water temperature.
 */
export function getBaseboardOutputPerFoot(waterTempF: number): number {
  if (waterTempF >= 180) return 580;
  if (waterTempF >= 160) return 450;
  if (waterTempF >= 140) return 330;
  return 210; // Low-temp hydronic heat pump / 120°F
}

/**
 * Calculates connected load, AHRI Net Rating, and recommended Boiler Gross Input.
 */
export function calculateBoilerSize(input: BoilerSizingInput): BoilerSizingOutput {
  const {
    mode,
    heatingMedium,
    baseboardLinearFeet = 100,
    waterTempF = 180,
    radiatorEdrSqFt = 300,
    buildingHeatLossBtu = 50000,
    hasIndirectDhw = false,
    hasDhwPriority = true,
    boilerAfuePercent = 95,
  } = input;

  // 1. Calculate Connected Space Heating Load
  let connectedEmitterLoadBtu = 0;
  if (mode === "baseboard") {
    const btuPerFoot = getBaseboardOutputPerFoot(waterTempF);
    connectedEmitterLoadBtu = Math.round(baseboardLinearFeet * btuPerFoot);
  } else if (mode === "radiator_edr") {
    // 150 BTU/hr per sq ft EDR for Hot Water @ 170°F-180°F, 240 BTU/hr for steam @ 215°F
    const edrMultiplier = heatingMedium === "steam" ? 240 : 150;
    connectedEmitterLoadBtu = Math.round(radiatorEdrSqFt * edrMultiplier);
  } else {
    connectedEmitterLoadBtu = Math.round(buildingHeatLossBtu);
  }

  // 2. Domestic Hot Water (DHW) Indirect Tank Pickup
  // When DHW Priority controller is enabled, space heating paused during DHW call -> 0 BTU adder
  let dhwPickupBtu = 0;
  if (hasIndirectDhw && !hasDhwPriority) {
    dhwPickupBtu = 35000; // Standard 40-50 gal indirect coil pickup allowance
  }

  // 3. Total Net AHRI Load
  const totalNetAhriLoadBtu = connectedEmitterLoadBtu + dhwPickupBtu;

  // 4. I=B=R Piping & Pick-Up Allowance (1.15x for water, 1.33x for steam)
  const pipingAndPickupFactor = heatingMedium === "steam" ? 1.33 : 1.15;
  const grossDoeCapacityBtu = Math.round(totalNetAhriLoadBtu * pipingAndPickupFactor);

  // 5. Recommended Boiler Fuel Input (BTU/hr)
  const afueFraction = Math.max(0.70, Math.min(0.99, boilerAfuePercent / 100));
  const rawInputBtu = grossDoeCapacityBtu / afueFraction;
  // Round up to nearest standard 5,000 or 10,000 BTU boiler increment
  const recommendedBoilerInputBtu = Math.ceil(rawInputBtu / 5000) * 5000;
  const recommendedBoilerInputKw = Math.round((recommendedBoilerInputBtu / 3412.14) * 10) / 10;

  // 6. Condensing Evaluation (Water Temp <= 140°F allows continuous flue-gas condensing)
  const isCondensingEligible = waterTempF <= 140 && heatingMedium === "hot_water";

  // Fuel Savings Comparison: 82% Non-Condensing vs 95% Condensing Mod-Con
  const standardFuelBtu = grossDoeCapacityBtu / 0.82;
  const condensingFuelBtu = grossDoeCapacityBtu / 0.95;
  const condensingAnnualSavingsBtu = Math.max(0, Math.round(standardFuelBtu - condensingFuelBtu));

  const summary = `Total AHRI Net Heating Load is ${totalNetAhriLoadBtu.toLocaleString()} BTU/hr. Applying a ${pipingAndPickupFactor}x I=B=R piping/pickup factor with ${boilerAfuePercent}% AFUE yields a recommended boiler size of ${recommendedBoilerInputBtu.toLocaleString()} BTU/hr Gross Input (${grossDoeCapacityBtu.toLocaleString()} BTU DOE Heating Output / ${recommendedBoilerInputKw} kW).`;

  return {
    mode,
    heatingMedium,
    connectedEmitterLoadBtu,
    dhwPickupBtu,
    totalNetAhriLoadBtu,
    pipingAndPickupFactor,
    grossDoeCapacityBtu,
    recommendedBoilerInputBtu,
    recommendedBoilerInputKw,
    boilerAfuePercent,
    isCondensingEligible,
    condensingAnnualSavingsBtu,
    summary,
  };
}
