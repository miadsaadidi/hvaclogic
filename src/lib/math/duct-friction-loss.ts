/**
 * HVACLogic Duct Total Equivalent Length (TEL) & Friction Rate Engine
 * Conforms to ACCA Manual D (3rd Edition, Appendix 3 Fitting Equivalent Lengths).
 */

export interface DuctFittingItem {
  id: string;
  name: string;
  defaultEqLengthFt: number;
  category: "supply" | "return" | "branch";
}

export const ACCA_FITTING_DATABASE: DuctFittingItem[] = [
  { id: "plenum_supply_straight", name: "Supply Plenum (End Takeoff / Straight)", defaultEqLengthFt: 10, category: "supply" },
  { id: "plenum_supply_tee", name: "Supply Plenum (Bullhead Tee 90°)", defaultEqLengthFt: 35, category: "supply" },
  { id: "elbow_90_smooth", name: "90° Trunk Elbow (Smooth Radius R/W=1.5)", defaultEqLengthFt: 10, category: "supply" },
  { id: "elbow_90_mitered_vanes", name: "90° Mitered Elbow with Turning Vanes", defaultEqLengthFt: 15, category: "supply" },
  { id: "elbow_90_mitered_novanes", name: "90° Mitered Elbow (No Vanes - High Resistance)", defaultEqLengthFt: 45, category: "supply" },
  { id: "elbow_45_smooth", name: "45° Trunk Offset Elbow", defaultEqLengthFt: 5, category: "supply" },
  { id: "branch_takeoff_conical", name: "Conical Spin-In Branch Takeoff", defaultEqLengthFt: 15, category: "branch" },
  { id: "branch_takeoff_dovetail", name: "Standard Dovetail / Square Takeoff", defaultEqLengthFt: 35, category: "branch" },
  { id: "register_boot_90", name: "90° Register Boot (Wall/Floor)", defaultEqLengthFt: 30, category: "branch" },
  { id: "register_boot_straight", name: "Straight Register Boot", defaultEqLengthFt: 10, category: "branch" },
  { id: "return_air_drop_90", name: "Return Air Drop with 90° Turning Ell", defaultEqLengthFt: 30, category: "return" },
  { id: "return_grille_boot", name: "Return Grille Transition Boot", defaultEqLengthFt: 20, category: "return" },
];

export interface SelectedFitting {
  fittingId: string;
  quantity: number;
  customEqLengthFt?: number;
}

export interface DuctFrictionLossInput {
  straightDuctSupplyFt: number;
  straightDuctReturnFt: number;
  supplyFittings: SelectedFitting[];
  returnFittings: SelectedFitting[];
  blowerTespInWg: number; // Total External Static Pressure rating (e.g. 0.50 or 0.80)
  evaporatorCoilDropInWg: number; // e.g. 0.20
  filterDropInWg: number; // e.g. 0.10 to 0.20
  supplyRegisterDropInWg: number; // e.g. 0.03
  returnGrilleDropInWg: number; // e.g. 0.03
  otherDevicesDropInWg?: number; // e.g. 0.02
}

export interface DuctFrictionLossOutput {
  supplyStraightLengthFt: number;
  supplyFittingsLengthFt: number;
  totalSupplyLengthFt: number;
  returnStraightLengthFt: number;
  returnFittingsLengthFt: number;
  totalReturnLengthFt: number;
  totalEquivalentLengthTelFt: number;
  blowerTespInWg: number;
  totalComponentLossInWg: number;
  availableStaticPressureAspInWg: number;
  designFrictionRateFr: number; // in. wg / 100 ft
  frictionRateStatus: "optimal" | "borderline_low" | "borderline_high" | "critical_undersized";
  summary: string;
}

/**
 * Computes Total Equivalent Length (TEL), Available Static Pressure (ASP),
 * and ACCA Manual D Design Friction Rate (FR).
 */
export function calculateDuctFrictionLoss(input: DuctFrictionLossInput): DuctFrictionLossOutput {
  const supplyStraight = Math.max(0, input.straightDuctSupplyFt);
  const returnStraight = Math.max(0, input.straightDuctReturnFt);

  // Accumulate Supply Fittings
  let supplyFittingsLength = 0;
  for (const item of input.supplyFittings) {
    const dbItem = ACCA_FITTING_DATABASE.find((f) => f.id === item.fittingId);
    const len = item.customEqLengthFt ?? dbItem?.defaultEqLengthFt ?? 10;
    supplyFittingsLength += len * Math.max(0, item.quantity);
  }

  // Accumulate Return Fittings
  let returnFittingsLength = 0;
  for (const item of input.returnFittings) {
    const dbItem = ACCA_FITTING_DATABASE.find((f) => f.id === item.fittingId);
    const len = item.customEqLengthFt ?? dbItem?.defaultEqLengthFt ?? 10;
    returnFittingsLength += len * Math.max(0, item.quantity);
  }

  const totalSupplyLength = supplyStraight + supplyFittingsLength;
  const totalReturnLength = returnStraight + returnFittingsLength;
  const totalEquivalentLengthTelFt = Math.max(20, totalSupplyLength + totalReturnLength);

  // Compute Total Component Pressure Deductions
  const coilDrop = Math.max(0, input.evaporatorCoilDropInWg);
  const filterDrop = Math.max(0, input.filterDropInWg);
  const supplyRegDrop = Math.max(0, input.supplyRegisterDropInWg);
  const returnGrilleDrop = Math.max(0, input.returnGrilleDropInWg);
  const otherDrop = Math.max(0, input.otherDevicesDropInWg ?? 0);

  const totalComponentLossInWg = Math.round((coilDrop + filterDrop + supplyRegDrop + returnGrilleDrop + otherDrop) * 1000) / 1000;

  // Available Static Pressure for Ductwork Distribution: ASP = TESP - Component Losses
  const rawAsp = input.blowerTespInWg - totalComponentLossInWg;
  const availableStaticPressureAspInWg = Math.max(0.01, Math.round(rawAsp * 1000) / 1000);

  // ACCA Manual D Friction Rate Equation: FR = (ASP * 100) / TEL
  const rawFr = (availableStaticPressureAspInWg * 100) / totalEquivalentLengthTelFt;
  const designFrictionRateFr = Math.round(rawFr * 1000) / 1000;

  // Friction Rate Evaluation (Standard residential target: 0.06 to 0.12 in.wg / 100 ft)
  let frictionRateStatus: DuctFrictionLossOutput["frictionRateStatus"] = "optimal";
  if (designFrictionRateFr < 0.05) {
    frictionRateStatus = "borderline_low"; // Requires huge duct cross-sections
  } else if (designFrictionRateFr > 0.18) {
    frictionRateStatus = "critical_undersized"; // Severe duct velocity noise
  } else if (designFrictionRateFr > 0.12) {
    frictionRateStatus = "borderline_high";
  }

  const summary = `With a Total Equivalent Length (TEL) of ${totalEquivalentLengthTelFt} ft and Available Static Pressure (ASP) of ${availableStaticPressureAspInWg.toFixed(3)}" w.g., the ACCA Manual D Design Friction Rate is ${designFrictionRateFr.toFixed(3)}" w.g. per 100 ft (${frictionRateStatus.replace("_", " ")}).`;

  return {
    supplyStraightLengthFt: supplyStraight,
    supplyFittingsLengthFt: supplyFittingsLength,
    totalSupplyLengthFt: totalSupplyLength,
    returnStraightLengthFt: returnStraight,
    returnFittingsLengthFt: returnFittingsLength,
    totalReturnLengthFt: totalReturnLength,
    totalEquivalentLengthTelFt,
    blowerTespInWg: input.blowerTespInWg,
    totalComponentLossInWg,
    availableStaticPressureAspInWg,
    designFrictionRateFr,
    frictionRateStatus,
    summary,
  };
}
