import { describe, it, expect } from "vitest";
import { solveRefrigerantPt, convertToPsig, convertFromPsig, generatePtMatrix } from "./pt-chart";

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

  it("accurately computes R-454B A2L bubble and dew saturation glide at 115 psig", () => {
    const res = solveRefrigerantPt({
      refrigerantId: "r454b",
      lookupMode: "pressure_to_temp",
      inputValue: 115,
      pressureUnit: "psig",
    });

    expect(res.refrigerant.safetyClass).toBe("A2L");
    expect(res.warningNotice).toContain("A2L Mildly Flammable");
    expect(res.bubbleSatTempF).toBeDefined();
    expect(res.dewSatTempF).toBeDefined();
    expect(res.glideF).toBeGreaterThan(0);
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

  it("handles multi-unit conversions (bar and kPa)", () => {
    const psigFromBar = convertToPsig(20, "bar");
    expect(psigFromBar).toBeCloseTo(275.4, 0);

    const barFromPsig = convertFromPsig(118, "bar");
    expect(barFromPsig).toBeCloseTo(9.15, 1);
  });

  it("generates complete reference PT table matrix", () => {
    const matrix = generatePtMatrix("r410a");
    expect(matrix.length).toBeGreaterThan(25);
    const row40 = matrix.find((r) => r.tempF === 40);
    expect(row40).toBeDefined();
    expect(row40!.pressurePsig).toBeCloseTo(118, 0);
  });
});
