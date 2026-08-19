/**
 * HVACLogic ASHRAE Fundamentals Moist Air Psychrometric Engine
 * Complies with ASHRAE Handbook of Fundamentals 2021 (Chapter 1, Psychrometrics)
 * and Hyland-Wexler thermodynamic formulations.
 */

export interface PsychrometricInput {
  dryBulbF: number; // Dry bulb temperature in °F (range: -20°F to 140°F)
  relativeHumidityPercent?: number; // 0 to 100%
  wetBulbF?: number; // Wet bulb temperature in °F
  dewPointF?: number; // Dew point temperature in °F
  altitudeFeet?: number; // Elevation above sea level (feet)
}

export interface PsychrometricOutput {
  dryBulbF: number;
  wetBulbF: number;
  dewPointF: number;
  relativeHumidityPercent: number;
  humidityRatioLbPerLb: number;
  humidityRatioGrainsPerLb: number; // 7,000 grains = 1 lb
  specificEnthalpyBtuPerLb: number;
  specificVolumeCuFtPerLb: number;
  airDensityLbPerCuFt: number;
  vaporPressurePsia: number;
  saturationPressurePsia: number;
  atmosphericPressurePsia: number;
  comfortZoneStatus: "Ideal Comfort (ASHRAE 55)" | "Dry / Low Humidity" | "Humid / Sticky" | "Cold / Unconditioned" | "Hot / Overheating";
}

/**
 * Calculates standard barometric pressure at a given altitude in feet (ASHRAE Standard Atmosphere)
 */
export function getBarometricPressurePsia(altitudeFeet: number = 0): number {
  const h = Math.max(-1000, Math.min(15000, altitudeFeet));
  return 14.696 * Math.pow(1 - 6.8754e-6 * h, 5.2559);
}

/**
 * Saturation vapor pressure of water over liquid in psia (Hyland-Wexler / ASHRAE 2021)
 */
export function getSaturationVaporPressurePsia(tempF: number): number {
  const tRankine = tempF + 459.67;

  if (tempF >= 32) {
    const c8 = -1.0440397e4;
    const c9 = -1.129465e1;
    const c10 = -2.7022355e-2;
    const c11 = 1.289036e-5;
    const c12 = -2.4780681e-9;
    const c13 = 6.5459673;

    const lnPws =
      c8 / tRankine +
      c9 +
      c10 * tRankine +
      c11 * Math.pow(tRankine, 2) +
      c12 * Math.pow(tRankine, 3) +
      c13 * Math.log(tRankine);

    return Math.exp(lnPws);
  } else {
    // Over ice
    const c1 = -1.0214165e4;
    const c2 = -4.8932428;
    const c3 = -5.3765794e-3;
    const c4 = 1.9202377e-7;
    const c5 = 3.5575832e-10;
    const c6 = -9.0344688e-14;
    const c7 = 4.1635019;

    const lnPws =
      c1 / tRankine +
      c2 +
      c3 * tRankine +
      c4 * Math.pow(tRankine, 2) +
      c5 * Math.pow(tRankine, 3) +
      c6 * Math.pow(tRankine, 4) +
      c7 * Math.log(tRankine);

    return Math.exp(lnPws);
  }
}

/**
 * Calculates Dew Point Temperature (°F) from partial vapor pressure (psia)
 */
export function getDewPointTempF(vaporPressurePsia: number): number {
  const p = Math.max(0.0001, vaporPressurePsia);
  const alpha = Math.log(p);

  // ASHRAE formulation for Dew Point
  if (p >= 0.08865) {
    // Tdp >= 32°F
    return (
      100.45 +
      33.193 * alpha +
      2.319 * Math.pow(alpha, 2) +
      0.17074 * Math.pow(alpha, 3) +
      1.2063 * Math.pow(p, 0.1984)
    );
  } else {
    // Tdp < 32°F
    return 90.12 + 26.142 * alpha + 0.8927 * Math.pow(alpha, 2);
  }
}

/**
 * Calculates Wet Bulb Temperature (°F) via numerical bisection on ASHRAE psychrometric equation
 */
export function getWetBulbTempF(dryBulbF: number, humidityRatio: number, patm: number): number {
  let low = -20;
  let high = dryBulbF;
  let wetBulb = dryBulbF;

  for (let i = 0; i < 30; i++) {
    wetBulb = (low + high) / 2;
    const pwsWb = getSaturationVaporPressurePsia(wetBulb);
    const wsWb = 0.621945 * (pwsWb / (patm - pwsWb));

    // ASHRAE psychrometric wet bulb energy balance
    const calcW =
      ((1093 - 0.556 * wetBulb) * wsWb - 0.24 * (dryBulbF - wetBulb)) /
      (1093 + 0.444 * dryBulbF - wetBulb);

    if (calcW < humidityRatio) {
      low = wetBulb;
    } else {
      high = wetBulb;
    }
  }

  return Math.round(wetBulb * 10) / 10;
}

/**
 * Comprehensive ASHRAE moist air state point solver
 */
export function calculatePsychrometrics(input: PsychrometricInput): PsychrometricOutput {
  const tdb = Math.max(-20, Math.min(140, input.dryBulbF));
  const altitude = input.altitudeFeet ?? 0;
  const patm = getBarometricPressurePsia(altitude);
  const pws = getSaturationVaporPressurePsia(tdb);

  let pw = 0;
  let rh = 50;

  if (input.relativeHumidityPercent !== undefined) {
    rh = Math.max(1, Math.min(100, input.relativeHumidityPercent));
    pw = (rh / 100) * pws;
  } else if (input.dewPointF !== undefined) {
    const tdp = Math.min(tdb, input.dewPointF);
    pw = getSaturationVaporPressurePsia(tdp);
    rh = Math.min(100, Math.max(1, (pw / pws) * 100));
  } else if (input.wetBulbF !== undefined) {
    const twb = Math.min(tdb, input.wetBulbF);
    const pwsWb = getSaturationVaporPressurePsia(twb);
    const wsWb = 0.621945 * (pwsWb / (patm - pwsWb));
    const w =
      ((1093 - 0.556 * twb) * wsWb - 0.24 * (tdb - twb)) /
      (1093 + 0.444 * tdb - twb);
    pw = (w * patm) / (0.621945 + w);
    rh = Math.min(100, Math.max(1, (pw / pws) * 100));
  } else {
    // Default 50% RH
    rh = 50;
    pw = 0.5 * pws;
  }

  // 1. Humidity Ratio W (lb water / lb dry air)
  const safePw = Math.min(patm * 0.95, pw);
  const humidityRatioLbPerLb = (0.621945 * safePw) / (patm - safePw);
  const humidityRatioGrainsPerLb = Math.round(humidityRatioLbPerLb * 7000 * 10) / 10;

  // 2. Dew Point Temperature (°F)
  const dewPointF = Math.round(getDewPointTempF(safePw) * 10) / 10;

  // 3. Wet Bulb Temperature (°F)
  const wetBulbF = getWetBulbTempF(tdb, humidityRatioLbPerLb, patm);

  // 4. Specific Enthalpy h (BTU/lb dry air)
  const specificEnthalpyBtuPerLb =
    Math.round((0.24 * tdb + humidityRatioLbPerLb * (1061 + 0.444 * tdb)) * 100) / 100;

  // 5. Specific Volume v (cu ft / lb dry air)
  const tRankine = tdb + 459.67;
  const specificVolumeCuFtPerLb =
    Math.round(((53.352 * tRankine * (1 + 1.607858 * humidityRatioLbPerLb)) / (patm * 144)) * 100) / 100;

  // 6. Air Density rho (lb / cu ft)
  const airDensityLbPerCuFt =
    Math.round(((1 + humidityRatioLbPerLb) / specificVolumeCuFtPerLb) * 1000) / 1000;

  // 7. Comfort Zone Classification (ASHRAE Standard 55)
  let comfortZoneStatus: PsychrometricOutput["comfortZoneStatus"] = "Ideal Comfort (ASHRAE 55)";
  if (tdb < 68) {
    comfortZoneStatus = "Cold / Unconditioned";
  } else if (tdb > 78) {
    comfortZoneStatus = "Hot / Overheating";
  } else if (rh < 30) {
    comfortZoneStatus = "Dry / Low Humidity";
  } else if (rh > 60 || dewPointF > 62) {
    comfortZoneStatus = "Humid / Sticky";
  }

  return {
    dryBulbF: tdb,
    wetBulbF,
    dewPointF,
    relativeHumidityPercent: Math.round(rh * 10) / 10,
    humidityRatioLbPerLb: Math.round(humidityRatioLbPerLb * 100000) / 100000,
    humidityRatioGrainsPerLb,
    specificEnthalpyBtuPerLb,
    specificVolumeCuFtPerLb,
    airDensityLbPerCuFt,
    vaporPressurePsia: Math.round(safePw * 1000) / 1000,
    saturationPressurePsia: Math.round(pws * 1000) / 1000,
    atmosphericPressurePsia: Math.round(patm * 100) / 100,
    comfortZoneStatus,
  };
}
