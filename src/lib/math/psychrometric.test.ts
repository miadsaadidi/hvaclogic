import { describe, it, expect } from "vitest";
import {
  calculatePsychrometrics,
  getBarometricPressurePsia,
  getSaturationVaporPressurePsia,
} from "./psychrometric";

describe("ASHRAE Moist Air Psychrometric Engine", () => {
  it("calculates standard indoor comfort state point (75°F DB, 50% RH) accurately", () => {
    const res = calculatePsychrometrics({
      dryBulbF: 75,
      relativeHumidityPercent: 50,
      altitudeFeet: 0,
    });

    expect(res.dryBulbF).toBe(75);
    expect(res.relativeHumidityPercent).toBe(50);
    // Standard 75°F/50% RH has dew point ~55.1°F, wet bulb ~62.5°F, enthalpy ~28.1 BTU/lb
    expect(res.dewPointF).toBeGreaterThan(54);
    expect(res.dewPointF).toBeLessThan(56);
    expect(res.wetBulbF).toBeGreaterThan(61.5);
    expect(res.wetBulbF).toBeLessThan(63.5);
    expect(res.specificEnthalpyBtuPerLb).toBeGreaterThan(27.5);
    expect(res.specificEnthalpyBtuPerLb).toBeLessThan(28.5);
    expect(res.comfortZoneStatus).toBe("Ideal Comfort (ASHRAE 55)");
  });

  it("calculates summer entering coil state (80°F DB, 67°F WB)", () => {
    const res = calculatePsychrometrics({
      dryBulbF: 80,
      wetBulbF: 67,
      altitudeFeet: 0,
    });

    expect(res.dryBulbF).toBe(80);
    expect(res.wetBulbF).toBe(67);
    // At 80°F DB and 67°F WB, RH is ~51.2% and enthalpy is ~31.5 BTU/lb
    expect(res.relativeHumidityPercent).toBeGreaterThan(50);
    expect(res.relativeHumidityPercent).toBeLessThan(53);
    expect(res.specificEnthalpyBtuPerLb).toBeGreaterThan(31.0);
    expect(res.specificEnthalpyBtuPerLb).toBeLessThan(32.5);
  });

  it("adjusts barometric pressure accurately for high altitude (Mile High Denver 5,280 ft)", () => {
    const seaLevelP = getBarometricPressurePsia(0);
    const denverP = getBarometricPressurePsia(5280);

    expect(seaLevelP).toBeCloseTo(14.696, 2);
    expect(denverP).toBeCloseTo(12.10, 1); // ~12.10 psia in Denver (5,280 ft)
  });
});
