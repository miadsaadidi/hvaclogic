/**
 * HVAC Lab — Duct Sizing & Airflow Math Engine
 * Reference Standards: ASHRAE Fundamentals Ch. 21, SMACNA HVAC Duct Design, Huebscher Equation
 */

export interface DuctCalculationInput {
  cfm: number;
  friction: number; // in. wg / 100 ft
  materialRoughness?: number; // default 0.0003 ft (galvanized)
  lockMode?: "none" | "lock_height" | "lock_width" | "ratio_1_1" | "ratio_1_2" | "ratio_1_3";
  lockedDimension?: number; // in
  compressionSag?: number; // 0, 0.04, 0.15, 0.30
}

export interface DuctCalculationOutput {
  roundDiameter: number; // inches
  rectangularWidth: number; // inches
  rectangularHeight: number; // inches
  roundAreaSqFt: number;
  rectangularAreaSqFt: number;
  velocityFpm: number;
  velocityCategory: "quiet" | "moderate" | "noisy";
  aspectRatio: number;
  effectiveFriction: number;
}

/**
 * Calculates equivalent round duct diameter (inches) from CFM and friction rate (in.wg/100ft)
 * Derived from ASHRAE / Darcy-Colebrook: D_e = (0.06855 * Q^1.9 / hf)^(1 / 5.02)
 */
export function calculateRoundDiameter(cfm: number, friction: number): number {
  if (cfm <= 0 || friction <= 0) return 0;
  return Math.pow((0.06855 * Math.pow(cfm, 1.9)) / friction, 1 / 5.02);
}

/**
 * Calculates air velocity (FPM) in a round duct of diameter D (inches) carrying CFM airflow
 * Velocity = Q (CFM) * 144 / (pi * (D/2)^2)
 */
export function calculateVelocityFpm(cfm: number, diameterInches: number): number {
  if (cfm <= 0 || diameterInches <= 0) return 0;
  const areaSqFt = (Math.PI * Math.pow(diameterInches / 2, 2)) / 144;
  return cfm / areaSqFt;
}

/**
 * Categorizes velocity for residential / commercial acoustic comfort (SMACNA/ACCA)
 */
export function getVelocityCategory(velocityFpm: number): "quiet" | "moderate" | "noisy" {
  if (velocityFpm <= 700) return "quiet"; // Recommended for residential branch ducts
  if (velocityFpm <= 1000) return "moderate"; // Acceptable for supply trunks
  return "noisy"; // High velocity, potential turbulence & noise
}

/**
 * Huebscher equation: Computes equivalent round diameter from rectangular dimensions a x b
 * De = 1.30 * (a * b)^0.625 / (a + b)^0.25
 */
export function huebscherEquivalentRound(a: number, b: number): number {
  if (a <= 0 || b <= 0) return 0;
  return (1.30 * Math.pow(a * b, 0.625)) / Math.pow(a + b, 0.25);
}

/**
 * 1D Newton-Raphson solver to find rectangular width 'a' given equivalent round diameter 'De' and fixed height 'b'
 */
export function solveRectangularDimension(de: number, fixedDim: number): number {
  if (de <= 0 || fixedDim <= 0) return 0;

  // Initial estimate: a_0 = De^2 / fixedDim
  let a = Math.max(1, (de * de) / fixedDim);

  for (let i = 0; i < 30; i++) {
    const f = huebscherEquivalentRound(a, fixedDim) - de;
    if (Math.abs(f) < 1e-6) break;

    // Numerical derivative
    const delta = 1e-4;
    const f_plus = huebscherEquivalentRound(a + delta, fixedDim) - de;
    const df = (f_plus - f) / delta;

    if (df === 0) break;
    const nextA = a - f / df;
    if (nextA <= 0) {
      a = a / 2;
    } else {
      a = nextA;
    }
  }

  return Math.round(a * 10) / 10;
}

/**
 * Complete Duct Sizing Calculation Master Function
 */
export function calculateDuct(input: DuctCalculationInput): DuctCalculationOutput {
  const cfm = Math.max(0, input.cfm);
  let friction = Math.max(0.001, input.friction);

  // Apply flexible duct compression sag derate if provided
  if (input.compressionSag && input.compressionSag > 0) {
    friction = friction * (1 + 2.5 * input.compressionSag);
  }

  const roundDiameter = calculateRoundDiameter(cfm, friction);
  const velocityFpm = calculateVelocityFpm(cfm, roundDiameter);
  const velocityCategory = getVelocityCategory(velocityFpm);
  const roundAreaSqFt = (Math.PI * Math.pow(roundDiameter / 2, 2)) / 144;

  let width = 0;
  let height = 0;

  const mode = input.lockMode ?? "none";
  const locked = input.lockedDimension ?? 10;

  if (mode === "lock_height") {
    height = Math.max(3, locked);
    width = solveRectangularDimension(roundDiameter, height);
  } else if (mode === "lock_width") {
    width = Math.max(3, locked);
    height = solveRectangularDimension(roundDiameter, width);
  } else if (mode === "ratio_1_1") {
    // Square duct: De = 1.30 * a^1.25 / (2a)^0.25 = 1.093 * a => a = De / 1.093
    const side = Math.round((roundDiameter / 1.093) * 10) / 10;
    width = side;
    height = side;
  } else if (mode === "ratio_1_2") {
    // Aspect ratio 2:1 => a = 2b => b = De / 1.172
    const b = Math.round((roundDiameter / 1.172) * 10) / 10;
    height = b;
    width = Math.round(b * 2 * 10) / 10;
  } else if (mode === "ratio_1_3") {
    // Aspect ratio 3:1 => a = 3b => b = De / 1.218
    const b = Math.round((roundDiameter / 1.218) * 10) / 10;
    height = b;
    width = Math.round(b * 3 * 10) / 10;
  } else {
    // Default aspect ratio ~ 1.5:1
    const defaultHeight = Math.max(4, Math.round((roundDiameter * 0.8) / 2) * 2);
    height = defaultHeight;
    width = solveRectangularDimension(roundDiameter, height);
  }

  const rectangularAreaSqFt = (width * height) / 144;
  const aspectRatio = height > 0 ? Math.round((Math.max(width, height) / Math.min(width, height)) * 10) / 10 : 1;

  return {
    roundDiameter: Math.round(roundDiameter * 10) / 10,
    rectangularWidth: width,
    rectangularHeight: height,
    roundAreaSqFt: Math.round(roundAreaSqFt * 100) / 100,
    rectangularAreaSqFt: Math.round(rectangularAreaSqFt * 100) / 100,
    velocityFpm: Math.round(velocityFpm),
    velocityCategory,
    aspectRatio,
    effectiveFriction: Math.round(friction * 1000) / 1000,
  };
}
