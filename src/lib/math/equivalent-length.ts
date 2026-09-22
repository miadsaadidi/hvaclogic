/**
 * HVACLogic ACCA Manual D Equivalent Length & Total Effective Length (TEL) Engine
 * Conforms to ACCA Manual D (3rd Edition, Appendix 3 Fitting Equivalent Lengths)
 * and ASHRAE Fundamentals Chapter 21 (Duct Design).
 */

export type FittingGroup =
  | "group1_supply_trunk"
  | "group2_trunk_elbows"
  | "group3_branch_runouts"
  | "group4_supply_boots"
  | "group5_return_fittings";

export interface AccaFittingDefinition {
  id: string;
  name: string;
  group: FittingGroup;
  defaultEqLengthFt: number;
  description: string;
  resistanceCategory: "low" | "medium" | "high" | "severe";
  systemSide: "supply" | "return" | "both";
  iconType: "elbow" | "takeoff" | "boot" | "tee" | "transition" | "grille";
}

/**
 * Authoritative ACCA Manual D Appendix 3 Fitting Equivalent Length Catalog.
 * Based on ANSI/ACCA 1 Manual D (Residential Duct Systems).
 */
export const ACCA_MANUAL_D_FITTINGS: AccaFittingDefinition[] = [
  // --- GROUP 1: SUPPLY TRUNK TAKEOFFS & HEADERS ---
  {
    id: "g1_starting_collar_flush",
    name: "Starting Collar - Flush / Straight Takeoff",
    group: "group1_supply_trunk",
    defaultEqLengthFt: 35,
    description: "Standard flush rectangular collar mounted directly onto furnace/air handler plenum wall.",
    resistanceCategory: "medium",
    systemSide: "supply",
    iconType: "takeoff",
  },
  {
    id: "g1_starting_collar_conical",
    name: "Starting Collar - Bellmouth / Conical Entry",
    group: "group1_supply_trunk",
    defaultEqLengthFt: 10,
    description: "Aerodynamic flared conical collar minimizing vena contracta entrance separation.",
    resistanceCategory: "low",
    systemSide: "supply",
    iconType: "takeoff",
  },
  {
    id: "g1_starting_collar_shoe",
    name: "Starting Collar - Side Takeoff with 45° Entry Shoe",
    group: "group1_supply_trunk",
    defaultEqLengthFt: 15,
    description: "High-efficiency 45° leading shoe collar on main supply plenum.",
    resistanceCategory: "low",
    systemSide: "supply",
    iconType: "takeoff",
  },
  {
    id: "g1_top_takeoff",
    name: "Extended Plenum Top Takeoff (90° Turn)",
    group: "group1_supply_trunk",
    defaultEqLengthFt: 25,
    description: "Trunk branch exiting the top cap of an extended vertical plenum.",
    resistanceCategory: "medium",
    systemSide: "supply",
    iconType: "takeoff",
  },
  {
    id: "g1_bullhead_tee",
    name: "Plenum Bullhead Tee (High Shock Loss)",
    group: "group1_supply_trunk",
    defaultEqLengthFt: 50,
    description: "Plenum discharge splitting symmetrically into opposing trunks without splitter vane (severe turbulence).",
    resistanceCategory: "severe",
    systemSide: "supply",
    iconType: "tee",
  },

  // --- GROUP 2: TRUNK ELBOWS & TRANSITIONS ---
  {
    id: "g2_elbow_90_mitered_novanes",
    name: "90° Rectangular Elbow - Mitered (No Vanes)",
    group: "group2_trunk_elbows",
    defaultEqLengthFt: 50,
    description: "Sharp square corner mitered elbow creating massive flow detachment and recirculation vortex.",
    resistanceCategory: "severe",
    systemSide: "both",
    iconType: "elbow",
  },
  {
    id: "g2_elbow_90_mitered_vaned",
    name: "90° Rectangular Elbow - Mitered with Turning Vanes",
    group: "group2_trunk_elbows",
    defaultEqLengthFt: 10,
    description: "Engineered turning vanes straightening airflow through square mitered corner.",
    resistanceCategory: "low",
    systemSide: "both",
    iconType: "elbow",
  },
  {
    id: "g2_elbow_90_radius_smooth",
    name: "90° Rectangular Elbow - Long Radius (R/W = 1.5)",
    group: "group2_trunk_elbows",
    defaultEqLengthFt: 10,
    description: "Smooth radius bend with centerline radius equal to 1.5× duct width.",
    resistanceCategory: "low",
    systemSide: "both",
    iconType: "elbow",
  },
  {
    id: "g2_elbow_90_radius_standard",
    name: "90° Rectangular Elbow - Standard Radius (R/W = 1.0)",
    group: "group2_trunk_elbows",
    defaultEqLengthFt: 15,
    description: "Standard radius bend with curved inner heel and outer throat.",
    resistanceCategory: "low",
    systemSide: "both",
    iconType: "elbow",
  },
  {
    id: "g2_elbow_90_radius_short",
    name: "90° Rectangular Elbow - Short Radius (R/W = 0.5)",
    group: "group2_trunk_elbows",
    defaultEqLengthFt: 30,
    description: "Tight radius bend constrained by building framing space.",
    resistanceCategory: "medium",
    systemSide: "both",
    iconType: "elbow",
  },
  {
    id: "g2_elbow_45_radius",
    name: "45° Rectangular Offset Elbow",
    group: "group2_trunk_elbows",
    defaultEqLengthFt: 8,
    description: "Smooth 45-degree directional jog in main trunk duct.",
    resistanceCategory: "low",
    systemSide: "both",
    iconType: "elbow",
  },
  {
    id: "g2_transition_gradual",
    name: "Trunk Reducer / Transition (Gradual Slope ≤ 30°)",
    group: "group2_trunk_elbows",
    defaultEqLengthFt: 10,
    description: "Gradual reduction in trunk cross-section maintaining static regain.",
    resistanceCategory: "low",
    systemSide: "both",
    iconType: "transition",
  },
  {
    id: "g2_transition_abrupt",
    name: "Trunk Reducer / Transition (Abrupt Step)",
    group: "group2_trunk_elbows",
    defaultEqLengthFt: 25,
    description: "Sudden cross-section contraction without aerodynamic slope taper.",
    resistanceCategory: "medium",
    systemSide: "both",
    iconType: "transition",
  },

  // --- GROUP 3: BRANCH RUNOUT TAKEOFFS & ELBOWS ---
  {
    id: "g3_takeoff_conical_spinin",
    name: "Branch Takeoff - Conical Bellmouth Spin-In",
    group: "group3_branch_runouts",
    defaultEqLengthFt: 15,
    description: "Round conical takeoff fitting with aerodynamic funnel entry from trunk.",
    resistanceCategory: "low",
    systemSide: "supply",
    iconType: "takeoff",
  },
  {
    id: "g3_takeoff_shoe",
    name: "Branch Takeoff - 45° High-Efficiency Shoe",
    group: "group3_branch_runouts",
    defaultEqLengthFt: 15,
    description: "Sheet metal scoop or 45° forward-facing shoe drawing air into branch.",
    resistanceCategory: "low",
    systemSide: "supply",
    iconType: "takeoff",
  },
  {
    id: "g3_takeoff_straight_collar",
    name: "Branch Takeoff - Straight 90° Collar / Dovetail",
    group: "group3_branch_runouts",
    defaultEqLengthFt: 35,
    description: "Square 90-degree cylindrical collar without aerodynamic throat or cone.",
    resistanceCategory: "high",
    systemSide: "supply",
    iconType: "takeoff",
  },
  {
    id: "g3_round_elbow_90_smooth",
    name: "90° Round Rigid Elbow - Smooth / Die-Stamped (r/d = 1.5)",
    group: "group3_branch_runouts",
    defaultEqLengthFt: 12,
    description: "Continuous smooth curve rigid metal round elbow.",
    resistanceCategory: "low",
    systemSide: "both",
    iconType: "elbow",
  },
  {
    id: "g3_round_elbow_90_4piece",
    name: "90° Round Rigid Elbow - 4-Piece Adjustable Segmented",
    group: "group3_branch_runouts",
    defaultEqLengthFt: 20,
    description: "Standard 4-piece field adjustable round elbow.",
    resistanceCategory: "medium",
    systemSide: "both",
    iconType: "elbow",
  },
  {
    id: "g3_round_elbow_90_3piece",
    name: "90° Round Rigid Elbow - 3-Piece Segmented",
    group: "group3_branch_runouts",
    defaultEqLengthFt: 30,
    description: "Coarse 3-piece segmented round elbow with sharper seam angles.",
    resistanceCategory: "medium",
    systemSide: "both",
    iconType: "elbow",
  },
  {
    id: "g3_round_elbow_45",
    name: "45° Round Rigid Elbow",
    group: "group3_branch_runouts",
    defaultEqLengthFt: 6,
    description: "Gentle 45° directional deflection in branch pipe.",
    resistanceCategory: "low",
    systemSide: "both",
    iconType: "elbow",
  },
  {
    id: "g3_flex_duct_turn_supported",
    name: "Flexible Duct 90° Bend (Well-Supported, No Sag)",
    group: "group3_branch_runouts",
    defaultEqLengthFt: 25,
    description: "Flexible duct turn with large radius core support strap avoiding pinch-off.",
    resistanceCategory: "medium",
    systemSide: "both",
    iconType: "elbow",
  },

  // --- GROUP 4: SUPPLY REGISTER BOOTS & TERMINATIONS ---
  {
    id: "g4_boot_90_angle",
    name: "90° Angle Boot (Round to Floor/Wall Register)",
    group: "group4_supply_boots",
    defaultEqLengthFt: 30,
    description: "Right-angle boot converting round runout pipe into rectangular diffuser face.",
    resistanceCategory: "medium",
    systemSide: "supply",
    iconType: "boot",
  },
  {
    id: "g4_boot_end",
    name: "End Boot (Straight In-Line Register Termination)",
    group: "group4_supply_boots",
    defaultEqLengthFt: 25,
    description: "Axial termination boot on branch pipe into register opening.",
    resistanceCategory: "medium",
    systemSide: "supply",
    iconType: "boot",
  },
  {
    id: "g4_boot_straight",
    name: "Straight Boot / Register Transition (Axial)",
    group: "group4_supply_boots",
    defaultEqLengthFt: 10,
    description: "Direct straight collar transition from duct to supply grille.",
    resistanceCategory: "low",
    systemSide: "supply",
    iconType: "boot",
  },
  {
    id: "g4_boot_wall_stack",
    name: "Wall Stack Head Transition Boot",
    group: "group4_supply_boots",
    defaultEqLengthFt: 20,
    description: "Boot transitioning round branch duct into vertical stud cavity wall stack.",
    resistanceCategory: "medium",
    systemSide: "supply",
    iconType: "boot",
  },

  // --- GROUP 5: RETURN AIR DROP & GRILLE FITTINGS ---
  {
    id: "g5_return_drop_90_unvaned",
    name: "Return Air Drop - 90° Elbow into Blower (No Vanes)",
    group: "group5_return_fittings",
    defaultEqLengthFt: 50,
    description: "Vertical return air drop turning 90° into furnace/blower cabinet without turning vanes.",
    resistanceCategory: "severe",
    systemSide: "return",
    iconType: "elbow",
  },
  {
    id: "g5_return_drop_90_vaned",
    name: "Return Air Drop - 90° Elbow with Turning Vanes",
    group: "group5_return_fittings",
    defaultEqLengthFt: 15,
    description: "Return drop fitted with aerodynamic turning vanes directing air smoothly into blower.",
    resistanceCategory: "low",
    systemSide: "return",
    iconType: "elbow",
  },
  {
    id: "g5_return_drop_45_angle",
    name: "Return Air Drop - 45° Angle Drop into Blower",
    group: "group5_return_fittings",
    defaultEqLengthFt: 15,
    description: "Slanted 45-degree return transition reducing turbulence at blower inlet.",
    resistanceCategory: "low",
    systemSide: "return",
    iconType: "transition",
  },
  {
    id: "g5_return_filter_box_boot",
    name: "Return Filter Box / Plenum Boot Transition",
    group: "group5_return_fittings",
    defaultEqLengthFt: 25,
    description: "Transition box accommodating media filter rack at return intake.",
    resistanceCategory: "medium",
    systemSide: "return",
    iconType: "boot",
  },
  {
    id: "g5_return_ceiling_collar",
    name: "Return Grille Ceiling Collar / Box",
    group: "group5_return_fittings",
    defaultEqLengthFt: 20,
    description: "Top-entry box collar mounting return grille in ceiling.",
    resistanceCategory: "medium",
    systemSide: "return",
    iconType: "grille",
  },
  {
    id: "g5_return_panning_cavity",
    name: "Stud / Joist Cavity Panning Transition (Unlined)",
    group: "group5_return_fittings",
    defaultEqLengthFt: 35,
    description: "Building cavity return path with restrictive rough framing entry.",
    resistanceCategory: "high",
    systemSide: "return",
    iconType: "grille",
  },
];

export interface SelectedAccumulatorFitting {
  id: string; // Unique instance ID in run
  fittingDefId: string; // Reference to ACCA_MANUAL_D_FITTINGS or "custom"
  customName?: string;
  equivalentLengthFt: number;
  quantity: number;
  systemSide: "supply" | "return";
}

export interface EquivalentLengthInput {
  straightSupplyFt: number;
  straightReturnFt: number;
  fittings: SelectedAccumulatorFitting[];
  // Static Pressure Budget
  blowerTespInWg: number; // e.g. 0.50 or 0.80
  coilPressureDropInWg: number; // e.g. 0.20
  filterPressureDropInWg: number; // e.g. 0.10
  supplyRegisterPressureDropInWg: number; // e.g. 0.03
  returnGrillePressureDropInWg: number; // e.g. 0.03
  otherAccessoriesDropInWg?: number; // e.g. 0.00
}

export interface FittingOptimizationRecommendation {
  fittingInstanceId: string;
  fittingName: string;
  currentEqLengthTotalFt: number;
  suggestedAlternativeName: string;
  potentialEqLengthTotalFt: number;
  potentialSavingsFt: number;
  explanation: string;
}

export interface EquivalentLengthOutput {
  // Supply Run
  straightSupplyFt: number;
  fittingsSupplyFt: number;
  totalSupplyTelFt: number;
  supplyFittingCount: number;

  // Return Run
  straightReturnFt: number;
  fittingsReturnFt: number;
  totalReturnTelFt: number;
  returnFittingCount: number;

  // Cumulative TEL
  cumulativeTelFt: number;
  straightLengthTotalFt: number;
  fittingLengthTotalFt: number;
  fittingRatioPercent: number; // e.g. 65% of resistance is in fittings!

  // Available Static Pressure Budget
  blowerTespInWg: number;
  totalComponentDropInWg: number;
  availableStaticPressureAspInWg: number;

  // ACCA Manual D Friction Rate
  designFrictionRateFr: number; // in. wg / 100 ft
  frictionRateStatus: "optimal" | "borderline_low" | "borderline_high" | "critical_undersized";
  statusBadgeColor: "emerald" | "amber" | "rose" | "blue";
  statusDescription: string;

  // Optimizations & Aerodynamic Warnings
  severeResistanceFittingCount: number;
  optimizations: FittingOptimizationRecommendation[];
  summary: string;
}

/**
 * Calculates ACCA Manual D Total Effective Length (TEL), component pressure budget,
 * and design friction rate (FR) with actionable fitting optimizations.
 */
export function calculateEquivalentLength(input: EquivalentLengthInput): EquivalentLengthOutput {
  const straightSupply = Math.max(0, input.straightSupplyFt);
  const straightReturn = Math.max(0, input.straightReturnFt);

  let fittingsSupplyFt = 0;
  let supplyFittingCount = 0;

  let fittingsReturnFt = 0;
  let returnFittingCount = 0;

  let severeResistanceFittingCount = 0;
  const optimizations: FittingOptimizationRecommendation[] = [];

  for (const item of input.fittings) {
    const qty = Math.max(0, Math.floor(item.quantity));
    if (qty === 0) continue;

    const unitLen = Math.max(0, item.equivalentLengthFt);
    const subtotal = unitLen * qty;

    if (item.systemSide === "supply") {
      fittingsSupplyFt += subtotal;
      supplyFittingCount += qty;
    } else {
      fittingsReturnFt += subtotal;
      returnFittingCount += qty;
    }

    const def = ACCA_MANUAL_D_FITTINGS.find((f) => f.id === item.fittingDefId);
    if (def?.resistanceCategory === "severe" || def?.resistanceCategory === "high") {
      severeResistanceFittingCount += qty;
    }

    // Check for high-impact replacement recommendations
    if (item.fittingDefId === "g2_elbow_90_mitered_novanes") {
      const improvedLen = 10 * qty; // vaned or radius
      const savings = subtotal - improvedLen;
      optimizations.push({
        fittingInstanceId: item.id,
        fittingName: "90° Mitered Rectangular Elbow (No Vanes)",
        currentEqLengthTotalFt: subtotal,
        suggestedAlternativeName: "Mitered Elbow with Turning Vanes or Long Radius (R/W=1.5)",
        potentialEqLengthTotalFt: improvedLen,
        potentialSavingsFt: savings,
        explanation: `Adding turning vanes or using a radius elbow reduces resistance from 50 ft to 10 ft per elbow, shedding ${savings} equivalent feet from your critical run.`,
      });
    } else if (item.fittingDefId === "g1_bullhead_tee") {
      const improvedLen = 15 * qty;
      const savings = subtotal - improvedLen;
      optimizations.push({
        fittingInstanceId: item.id,
        fittingName: "Plenum Bullhead Tee",
        currentEqLengthTotalFt: subtotal,
        suggestedAlternativeName: "Radius Heel Splitter or Side Takeoffs with Shoes",
        potentialEqLengthTotalFt: improvedLen,
        potentialSavingsFt: savings,
        explanation: `Eliminating the bullhead tee shock loss saves ${savings} equivalent feet, preventing severe pressure collapse at the trunk start.`,
      });
    } else if (item.fittingDefId === "g3_takeoff_straight_collar") {
      const improvedLen = 15 * qty;
      const savings = subtotal - improvedLen;
      optimizations.push({
        fittingInstanceId: item.id,
        fittingName: "Straight 90° Branch Collar",
        currentEqLengthTotalFt: subtotal,
        suggestedAlternativeName: "Conical Bellmouth Spin-In",
        potentialEqLengthTotalFt: improvedLen,
        potentialSavingsFt: savings,
        explanation: `Upgrading straight spin-in collars to conical bellmouth takeoffs saves ${savings} equivalent feet on branch runouts.`,
      });
    } else if (item.fittingDefId === "g5_return_drop_90_unvaned") {
      const improvedLen = 15 * qty;
      const savings = subtotal - improvedLen;
      optimizations.push({
        fittingInstanceId: item.id,
        fittingName: "Return Drop 90° Elbow (Unvaned)",
        currentEqLengthTotalFt: subtotal,
        suggestedAlternativeName: "Return Drop with Turning Vanes or 45° Angle Drop",
        potentialEqLengthTotalFt: improvedLen,
        potentialSavingsFt: savings,
        explanation: `Installing turning vanes at the blower return intake reduces dynamic friction by ${savings} equivalent feet, protecting blower suction pressure.`,
      });
    }
  }

  const totalSupplyTelFt = straightSupply + fittingsSupplyFt;
  const totalReturnTelFt = straightReturn + fittingsReturnFt;
  const cumulativeTelFt = Math.max(10, totalSupplyTelFt + totalReturnTelFt);

  const straightLengthTotalFt = straightSupply + straightReturn;
  const fittingLengthTotalFt = fittingsSupplyFt + fittingsReturnFt;
  const fittingRatioPercent = cumulativeTelFt > 0 ? Math.round((fittingLengthTotalFt / cumulativeTelFt) * 100) : 0;

  // Component static deductions
  const coilDrop = Math.max(0, input.coilPressureDropInWg);
  const filterDrop = Math.max(0, input.filterPressureDropInWg);
  const supplyRegDrop = Math.max(0, input.supplyRegisterPressureDropInWg);
  const returnGrilleDrop = Math.max(0, input.returnGrillePressureDropInWg);
  const otherDrop = Math.max(0, input.otherAccessoriesDropInWg ?? 0);

  const totalComponentDropInWg = Math.round((coilDrop + filterDrop + supplyRegDrop + returnGrilleDrop + otherDrop) * 1000) / 1000;

  // Available Static Pressure: ASP = TESP - sum(CVP)
  const rawAsp = input.blowerTespInWg - totalComponentDropInWg;
  const availableStaticPressureAspInWg = Math.max(0.01, Math.round(rawAsp * 1000) / 1000);

  // Design Friction Rate: FR = (ASP * 100) / TEL
  const rawFr = (availableStaticPressureAspInWg * 100) / cumulativeTelFt;
  const designFrictionRateFr = Math.round(rawFr * 1000) / 1000;

  let frictionRateStatus: EquivalentLengthOutput["frictionRateStatus"] = "optimal";
  let statusBadgeColor: EquivalentLengthOutput["statusBadgeColor"] = "emerald";
  let statusDescription = "Target Design Range: Standard residential ductwork operates with minimal aerodynamic noise and balanced air distribution.";

  if (designFrictionRateFr < 0.05) {
    frictionRateStatus = "borderline_low";
    statusBadgeColor = "amber";
    statusDescription = "Low Friction Rate: Requires substantially oversized duct dimensions to move design CFM. Consider reducing TEL by replacing high-loss fittings.";
  } else if (designFrictionRateFr > 0.18) {
    frictionRateStatus = "critical_undersized";
    statusBadgeColor = "rose";
    statusDescription = "Critical High Friction Rate: Extreme duct restriction. Severe air rush noise and insufficient blower static pressure will choke design CFM.";
  } else if (designFrictionRateFr > 0.12) {
    frictionRateStatus = "borderline_high";
    statusBadgeColor = "amber";
    statusDescription = "Borderline High: Elevated air velocities may cause audible air register noise. High-velocity grilles or duct enlargement recommended.";
  }

  const summary = `Critical run Total Effective Length is ${cumulativeTelFt} ft (Supply: ${totalSupplyTelFt} ft, Return: ${totalReturnTelFt} ft), with fittings accounting for ${fittingRatioPercent}% of resistance. With ASP = ${availableStaticPressureAspInWg.toFixed(3)}" w.g., the ACCA Manual D Design Friction Rate is ${designFrictionRateFr.toFixed(3)}" w.g./100 ft (${frictionRateStatus.replace("_", " ")}).`;

  return {
    straightSupplyFt: straightSupply,
    fittingsSupplyFt,
    totalSupplyTelFt,
    supplyFittingCount,
    straightReturnFt: straightReturn,
    fittingsReturnFt,
    totalReturnTelFt,
    returnFittingCount,
    cumulativeTelFt,
    straightLengthTotalFt,
    fittingLengthTotalFt,
    fittingRatioPercent,
    blowerTespInWg: input.blowerTespInWg,
    totalComponentDropInWg,
    availableStaticPressureAspInWg,
    designFrictionRateFr,
    frictionRateStatus,
    statusBadgeColor,
    statusDescription,
    severeResistanceFittingCount,
    optimizations,
    summary,
  };
}
