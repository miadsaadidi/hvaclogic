import { describe, it, expect } from "vitest";
import { solveRefrigerantPt, convertToPsig, convertFromPsig, generatePtMatrix } from "./pt-chart";
import { REFRIGERANTS } from "./refrigerants";

describe("Refrigerant PT Chart & Saturation Engine", () => {
  it("converts R-410A suction pressure (118 psig) to standard 40°F evaporator saturation", () => {
    const res = solveRefrigerantPt({
      refrigerantId: "r410a",
      lookupMode: "pressure_to_temp",
      inputValue: 118,
      pressureUnit: "psig",
    });

    expect(res.satTempF).toBeCloseTo(40.0, 1);
    expect(res.pressurePsia).toBeCloseTo(132.7, 1);
    expect(res.operatingPhase).toBe("Evaporating / Suction Core (Low Side)");
  });

  it("accurately computes R-454B A2L bubble and dew saturation glide at 112 psig and 118 psig", () => {
    const res112 = solveRefrigerantPt({
      refrigerantId: "r454b",
      lookupMode: "pressure_to_temp",
      inputValue: 112,
      pressureUnit: "psig",
      curveType: "dew",
    });

    expect(res112.refrigerant.safetyClass).toBe("A2L");
    expect(res112.satTempF).toBeCloseTo(40.0, 1);
    expect(res112.bubbleSatTempF).toBeCloseTo(38.5, 1);
    expect(res112.dewSatTempF).toBeCloseTo(40.0, 1);
    expect(res112.glideF).toBeCloseTo(1.5, 1);

    const res118 = solveRefrigerantPt({
      refrigerantId: "r454b",
      lookupMode: "pressure_to_temp",
      inputValue: 118,
      pressureUnit: "psig",
      curveType: "bubble",
    });

    expect(res118.satTempF).toBeCloseTo(40.0, 1);
    expect(res118.bubbleSatTempF).toBeCloseTo(40.0, 1);
    expect(res118.dewSatTempF).toBeCloseTo(41.5, 1);
    expect(res118.glideF).toBeCloseTo(1.5, 1);
  });

  it("performs reverse temperature to saturation pressure lookup (R-22 @ 40°F -> 68.5 psig)", () => {
    const res = solveRefrigerantPt({
      refrigerantId: "r22",
      lookupMode: "temp_to_pressure",
      inputValue: 40,
      temperatureUnit: "F",
    });

    expect(res.pressurePsig).toBeCloseTo(68.5, 0);
  });

  it("performs reverse temperature to saturation pressure lookup for R-32 @ 40°F -> 119.0 psig", () => {
    const res = solveRefrigerantPt({
      refrigerantId: "r32",
      lookupMode: "temp_to_pressure",
      inputValue: 40,
      temperatureUnit: "F",
    });

    expect(res.pressurePsig).toBeCloseTo(119.0, 0);
  });

  it("accurately handles R-407C high temperature glide (~10°F)", () => {
    const res = solveRefrigerantPt({
      refrigerantId: "r407c",
      lookupMode: "pressure_to_temp",
      inputValue: 63.5,
      pressureUnit: "psig",
      curveType: "dew",
    });

    expect(res.satTempF).toBeCloseTo(40.0, 1);
    expect(res.bubbleSatTempF).toBeCloseTo(30.0, 1);
    expect(res.dewSatTempF).toBeCloseTo(40.0, 1);
    expect(res.glideF).toBeCloseTo(10.0, 1);
  });

  it("handles multi-unit conversions (bar and kPa)", () => {
    const psigFromBar = convertToPsig(20, "bar");
    expect(psigFromBar).toBeCloseTo(275.4, 0);

    const barFromPsig = convertFromPsig(118, "bar");
    expect(barFromPsig).toBeCloseTo(9.15, 1);
  });

  it("generates complete reference PT table matrix for all supported refrigerants", () => {
    const refrigerants = Object.keys(REFRIGERANTS);
    for (const refId of refrigerants) {
      const matrix = generatePtMatrix(refId);
      expect(matrix.length).toBeGreaterThan(25);
      const row40 = matrix.find((r) => r.tempF === 40);
      expect(row40).toBeDefined();
      expect(row40!.pressurePsig).toBeGreaterThan(0);
    }
  });
});
