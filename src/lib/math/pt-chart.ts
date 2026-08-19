/**
 * HVACLogic High-Precision Refrigerant Pressure-Temperature Saturation Engine
 * Complies with NIST REFPROP v10.0, Chemours Opteon XL41 (R-454B), and AHRI standards.
 */

import {
  REFRIGERANTS,
  RefrigerantMeta,
  getRefrigerantSaturationTemp,
  getRefrigerantSaturationPressure,
} from "./refrigerants";

export { REFRIGERANTS, type RefrigerantMeta };

export type PressureUnit = "psig" | "psia" | "bar" | "kPa";
export type TemperatureUnit = "F" | "C";
export type SaturationCurveType = "bubble" | "dew";

export interface PtLookupInput {
  refrigerantId: string;
  lookupMode: "pressure_to_temp" | "temp_to_pressure";
  inputValue: number; // Value in specified input unit
  pressureUnit?: PressureUnit;
  temperatureUnit?: TemperatureUnit;
  curveType?: SaturationCurveType;
}

export interface PtLookupOutput {
  refrigerant: RefrigerantMeta;
  pressurePsig: number;
  pressurePsia: number;
  pressureBar: number;
  pressureKpa: number;
  satTempF: number;
  satTempC: number;
  bubbleSatTempF?: number;
  dewSatTempF?: number;
  glideF?: number;
  operatingPhase: "Evaporating / Suction Core (Low Side)" | "Condensing / Liquid Line (High Side)" | "Sub-Ambient / Heat Pump Heating";
  warningNotice?: string;
}

export interface PtTableRow {
  pressurePsig: number;
  pressureBar: number;
  tempF: number;
  tempC: number;
  bubbleTempF?: number;
  dewTempF?: number;
  glideF?: number;
}

// Pressure conversion helpers
export function convertToPsig(val: number, unit: PressureUnit): number {
  switch (unit) {
    case "psig":
      return val;
    case "psia":
      return val - 14.696;
    case "bar":
      return (val * 14.5038) - 14.696;
    case "kPa":
      return (val * 0.145038) - 14.696;
  }
}

export function convertFromPsig(psig: number, targetUnit: PressureUnit): number {
  switch (targetUnit) {
    case "psig":
      return Number(psig.toFixed(1));
    case "psia":
      return Number((psig + 14.696).toFixed(1));
    case "bar":
      return Number(((psig + 14.696) / 14.5038).toFixed(2));
    case "kPa":
      return Number(((psig + 14.696) / 0.145038).toFixed(1));
  }
}

export function convertToFahrenheit(val: number, unit: TemperatureUnit): number {
  return unit === "F" ? val : (val * 9) / 5 + 32;
}

export function convertFromFahrenheit(tempF: number, targetUnit: TemperatureUnit): number {
  return targetUnit === "F" ? Number(tempF.toFixed(1)) : Number((((tempF - 32) * 5) / 9).toFixed(1));
}

/**
 * Solves for complete saturation thermodynamic state from either pressure or temperature.
 */
export function solveRefrigerantPt(input: PtLookupInput): PtLookupOutput {
  const ref = REFRIGERANTS[input.refrigerantId] || REFRIGERANTS.r410a;
  const pUnit = input.pressureUnit || "psig";
  const tUnit = input.temperatureUnit || "F";
  const curve = input.curveType || (ref.hasGlide ? "dew" : "dew");

  let pressurePsig = 0;
  let satTempF = 0;

  if (input.lookupMode === "pressure_to_temp") {
    pressurePsig = Math.max(0, convertToPsig(input.inputValue, pUnit));
    satTempF = getRefrigerantSaturationTemp(ref.id, pressurePsig, curve);
  } else {
    const tempF = convertToFahrenheit(input.inputValue, tUnit);
    pressurePsig = Math.max(0, getRefrigerantSaturationPressure(ref.id, tempF, curve));
    satTempF = tempF;
  }

  const pressurePsia = Number((pressurePsig + 14.696).toFixed(1));
  const pressureBar = Number((pressurePsia / 14.5038).toFixed(2));
  const pressureKpa = Number((pressurePsia / 0.145038).toFixed(1));
  const satTempC = Number((((satTempF - 32) * 5) / 9).toFixed(1));

  let bubbleSatTempF: number | undefined;
  let dewSatTempF: number | undefined;
  let glideF: number | undefined;

  if (ref.hasGlide) {
    bubbleSatTempF = getRefrigerantSaturationTemp(ref.id, pressurePsig, "bubble");
    dewSatTempF = getRefrigerantSaturationTemp(ref.id, pressurePsig, "dew");
    glideF = Number((dewSatTempF - bubbleSatTempF).toFixed(1));
  }

  let operatingPhase: PtLookupOutput["operatingPhase"] = "Evaporating / Suction Core (Low Side)";
  if (satTempF >= 85) {
    operatingPhase = "Condensing / Liquid Line (High Side)";
  } else if (satTempF < 30) {
    operatingPhase = "Sub-Ambient / Heat Pump Heating";
  }

  let warningNotice: string | undefined;
  if (ref.safetyClass === "A2L") {
    warningNotice = "⚠️ A2L Mildly Flammable: Ensure spark-free recovery equipment and verify room volume minimums under ASHRAE Standard 15 / 34.";
  }

  return {
    refrigerant: ref,
    pressurePsig: Number(pressurePsig.toFixed(1)),
    pressurePsia,
    pressureBar,
    pressureKpa,
    satTempF: Number(satTempF.toFixed(1)),
    satTempC,
    bubbleSatTempF,
    dewSatTempF,
    glideF,
    operatingPhase,
    warningNotice,
  };
}

/**
 * Generates a full reference PT table matrix for print/export.
 */
export function generatePtMatrix(refrigerantId: string): PtTableRow[] {
  const ref = REFRIGERANTS[refrigerantId] || REFRIGERANTS.r410a;
  const rows: PtTableRow[] = [];

  // Standard temperature scale from -20°F to 130°F in 5°F increments
  for (let tempF = -20; tempF <= 130; tempF += 5) {
    const pressPsig = getRefrigerantSaturationPressure(ref.id, tempF, "dew");
    const pressBar = Number(((pressPsig + 14.696) / 14.5038).toFixed(2));
    const tempC = Number((((tempF - 32) * 5) / 9).toFixed(1));

    let bubbleTempF: number | undefined;
    let dewTempF: number | undefined;
    let glideF: number | undefined;

    if (ref.hasGlide) {
      bubbleTempF = getRefrigerantSaturationTemp(ref.id, pressPsig, "bubble");
      dewTempF = tempF;
      glideF = Number((dewTempF - bubbleTempF).toFixed(1));
    }

    rows.push({
      pressurePsig: pressPsig,
      pressureBar: pressBar,
      tempF,
      tempC,
      bubbleTempF,
      dewTempF,
      glideF,
    });
  }

  return rows;
}
