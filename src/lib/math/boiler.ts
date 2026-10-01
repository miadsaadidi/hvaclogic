/**
 * HVACLogic Hydronic Boiler & Radiator Sizing Computational Engine
 *
 * Technical References:
 * - I=B=R Hydronics Institute / AHRI Testing & Rating Standard for Heating Boilers
 * - AHRI Directory of Certified Product Performance (Residential Hydronic Heating Boilers)
 * - ASME Boiler and Pressure Vessel Code (Section IV - Rules for Construction of Heating Boilers)
 * - ANSI/ACCA Manual S (3rd Edition) - Residential Equipment Selection Principles
 * - ASHRAE Handbook—HVAC Systems and Equipment (Hydronic Radiators, Baseboards, and Boilers)
 *
 * NOTE: Sizing boilers from connected radiation estimates total installed emitter heat emission capacity.
 * For building heating load determination, an ACCA Manual J load calculation is the authoritative reference
 * to avoid oversizing replacement equipment on oversized vintage radiation.
 */

export type BoilerSizingMode = "baseboard" | "radiator_edr" | "heat_loss";
export type HeatingMedium = "hot_water" | "steam";

export interface BoilerSizingInput {
  mode: BoilerSizingMode;
  heatingMedium: HeatingMedium;
  baseboardLinearFeet?: number; // e.g. 20 to 500 linear ft
  waterTempF?: number; // e.g. 120°F, 140°F, 160°F, 180°F
  radiatorEdrSqFt?: number; // e.g. 50 to 1,500 sq ft EDR
  buildingHeatLossBtu?: number; // e.g. 20,000 to 250,000 BTU/hr
  hasIndirectDhw?: boolean;
  hasDhwPriority?: boolean; // When priority is active, space heating circulator is temporarily paused
  dhwPickupAllowanceBtu?: number; // Optional custom DHW allowance (default 35,000 BTU/hr when priority is off)
  boilerAfuePercent?: number; // e.g. 82% to 96%
}

export interface BoilerSizingOutput {
  mode: BoilerSizingMode;
  heatingMedium: HeatingMedium;
  connectedEmitterLoadBtu: number;
  dhwPickupBtu: number;
  totalNetAhriLoadBtu: number;
  pipingAndPickupFactor: number;
  grossDoeCapacityBtu: number; // Required minimum DOE Heating Capacity
  candidateBoilerInputRange: string;
  recommendedBoilerInputBtu: number; // Illustrative primary candidate nominal input
  recommendedBoilerInputKw: number;
  boilerAfuePercent: number;
  isCondensingEligible: boolean;
  condensingAnnualSavingsBtu: number;
  summary: string;
  technicalDisclaimers: string[];
}

/**
 * Standard rated output for residential 3/4" copper tube with aluminum fins (BTU/hr per linear foot)
 * based on standard catalog ratings with 65°F entering air at 1.0 GPM flow rate:
 * - 180°F AWT: 580 BTU/hr-ft
 * - 160°F AWT: 450 BTU/hr-ft
 * - 140°F AWT: 330 BTU/hr-ft
 * - 120°F AWT: 210 BTU/hr-ft
 */
export function getBaseboardOutputPerFoot(waterTempF: number): number {
  if (waterTempF >= 180) return 580;
  if (waterTempF >= 160) return 450;
  if (waterTempF >= 140) return 330;
  return 210;
}

// Standard residential hydronic boiler nominal input increments (BTU/hr)
const STANDARD_BOILER_NOMINAL_INPUTS = [
  50000, 60000, 70000, 75000, 80000, 90000, 100000, 110000, 120000, 135000, 150000, 175000, 200000,
];

/**
 * Calculates connected radiation load, net I=B=R rating requirement,
 * required DOE Heating Capacity, and candidate nominal boiler sizing.
 */
export function calculateBoilerSize(input: BoilerSizingInput): BoilerSizingOutput {
  const {
    mode,
    heatingMedium,
    baseboardLinearFeet = 100,
    waterTempF = 180,
    radiatorEdrSqFt = 300,
    buildingHeatLossBtu = 55000,
    hasIndirectDhw = false,
    hasDhwPriority = true,
    dhwPickupAllowanceBtu = 35000,
    boilerAfuePercent = 95,
  } = input;

  // 1. Calculate Connected Space Heating Load (BTU/hr)
  let connectedEmitterLoadBtu = 0;
  if (mode === "baseboard") {
    const btuPerFoot = getBaseboardOutputPerFoot(waterTempF);
    connectedEmitterLoadBtu = Math.round(baseboardLinearFeet * btuPerFoot);
  } else if (mode === "radiator_edr") {
    // 150 BTU/hr per sq ft EDR for Hot Water @ 180°F AWT (170°F–180°F range)
    // 240 BTU/hr per sq ft EDR for Low-Pressure Steam @ 215°F (1 psig saturated steam)
    const edrMultiplier = heatingMedium === "steam" ? 240 : 150;
    connectedEmitterLoadBtu = Math.round(radiatorEdrSqFt * edrMultiplier);
  } else {
    // Whole-house heat loss mode
    connectedEmitterLoadBtu = Math.round(buildingHeatLossBtu);
  }

  // 2. Domestic Hot Water (DHW) Indirect Tank Pickup
  // When DHW Priority Relay is active, space heating circulators pause during DHW calls (0 BTU space-heating adder assumption)
  // When DHW Priority is disabled, add indirect tank recovery allowance (default 35,000 BTU/hr)
  let dhwPickupBtu = 0;
  if (hasIndirectDhw && !hasDhwPriority) {
    dhwPickupBtu = Math.max(0, dhwPickupAllowanceBtu);
  }

  // 3. Total Net AHRI / I=B=R Radiation Load (BTU/hr)
  const totalNetAhriLoadBtu = connectedEmitterLoadBtu + dhwPickupBtu;

  // 4. I=B=R Piping & Pick-Up Allowance
  // Standard factor: 1.15x for residential hot water systems, 1.33x for residential steam systems
  // Accounts for heat absorption by piping distribution and system pick-up from a cold start
  const pipingAndPickupFactor = heatingMedium === "steam" ? 1.33 : 1.15;
  const grossDoeCapacityBtu = Math.round(totalNetAhriLoadBtu * pipingAndPickupFactor);

  // 5. Candidate Nominal Boiler Sizing Range
  // Approximate nominal input required: grossDoeCapacity / (AFUE / 100)
  const afueFraction = Math.max(0.70, Math.min(0.99, boilerAfuePercent / 100));
  const approximateInputDemandBtu = Math.round(grossDoeCapacityBtu / afueFraction);

  let recommendedBoilerInputBtu = STANDARD_BOILER_NOMINAL_INPUTS[STANDARD_BOILER_NOMINAL_INPUTS.length - 1];
  for (const size of STANDARD_BOILER_NOMINAL_INPUTS) {
    if (size >= approximateInputDemandBtu) {
      recommendedBoilerInputBtu = size;
      break;
    }
  }

  // Create candidate nominal range string
  const idx = STANDARD_BOILER_NOMINAL_INPUTS.indexOf(recommendedBoilerInputBtu);
  let candidateBoilerInputRange = `${recommendedBoilerInputBtu.toLocaleString()} BTU/hr Input`;
  if (idx > 0) {
    const lower = STANDARD_BOILER_NOMINAL_INPUTS[idx - 1];
    candidateBoilerInputRange = `${lower / 1000}k to ${recommendedBoilerInputBtu / 1000}k BTU/hr Input`;
  } else {
    candidateBoilerInputRange = `50k to 60k BTU/hr Input`;
  }

  const recommendedBoilerInputKw = Math.round((recommendedBoilerInputBtu / 3412.14) * 10) / 10;

  // 6. Condensing Evaluation (Return water temp <= 130°F allows continuous flue-gas condensing)
  const isCondensingEligible = waterTempF <= 140 && heatingMedium === "hot_water";

  // Fuel Savings Comparison: 82% Non-Condensing vs 95% Condensing Mod-Con
  const standardFuelBtu = grossDoeCapacityBtu / 0.82;
  const condensingFuelBtu = grossDoeCapacityBtu / 0.95;
  const condensingAnnualSavingsBtu = Math.max(0, Math.round(standardFuelBtu - condensingFuelBtu));

  const technicalDisclaimers = [
    "Radiation vs. Heat Loss: Sizing by connected radiation measures heat emitter dissipation capacity. If the building envelope has been upgraded with modern insulation/windows, perform an ACCA Manual J calculation to prevent boiler oversizing.",
    "Piping & Pickup Allowance: The 1.15 (water) and 1.33 (steam) multipliers reflect the standard I=B=R piping and pickup allowance; they represent warm-up and piping dissipation rather than instantaneous combustion loss.",
    "DHW Priority: Priority switching assumes indirect domestic hot water calls are brief enough that room temperature does not drop noticeably. For heavy commercial or continuous hot water demands, verify dedicated boiler capacity.",
    "DOE Rating Submittals: AFUE is an annual seasonal rating. Verify exact manufacturer-rated DOE Heating Capacity on equipment submittal data sheets.",
  ];

  const summary = `Connected Net Radiation Load is ${totalNetAhriLoadBtu.toLocaleString()} BTU/hr. Applying the ${pipingAndPickupFactor}x I=B=R piping & pickup allowance requires a minimum DOE Heating Capacity of ${grossDoeCapacityBtu.toLocaleString()} BTU/hr. At ${boilerAfuePercent}% AFUE, candidate nominal boilers typically fall in the ${candidateBoilerInputRange} range (${recommendedBoilerInputKw} kW).`;

  return {
    mode,
    heatingMedium,
    connectedEmitterLoadBtu,
    dhwPickupBtu,
    totalNetAhriLoadBtu,
    pipingAndPickupFactor,
    grossDoeCapacityBtu,
    candidateBoilerInputRange,
    recommendedBoilerInputBtu,
    recommendedBoilerInputKw,
    boilerAfuePercent,
    isCondensingEligible,
    condensingAnnualSavingsBtu,
    summary,
    technicalDisclaimers,
  };
}
