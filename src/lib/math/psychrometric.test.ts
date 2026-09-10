import { describe, it, expect } from "vitest";
import {
  calculatePsychrometrics,
  getBarometricPressurePsia,
  getSaturationVaporPressurePsia,
  getEnhancementFactor,
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
    expect(res.seaLevelDivergencePercent).toBe(0);
    expect(res.lewisRelationFactor).toBe(1);
    expect(res.enhancementFactor).toBeCloseTo(1.0041, 3);
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

  it("evaluates academic elevation benchmark & sea-level divergence at 5,280 ft (Denver)", () => {
    const res = calculatePsychrometrics({
      dryBulbF: 75,
      relativeHumidityPercent: 50,
      altitudeFeet: 5280,
    });

    // At 5,280 ft, humidity ratio is ~79.7 grains/lb vs 64.9 grains/lb at sea level (~22.8% to 23.5% divergence)
    expect(res.seaLevelDivergencePercent).toBeGreaterThan(21.0);
    expect(res.seaLevelDivergencePercent).toBeLessThan(25.0);
    // Lewis relation scaling factor is ~1.21x (faster skin evaporation at elevation)
    expect(res.lewisRelationFactor).toBeGreaterThan(1.18);
    expect(res.lewisRelationFactor).toBeLessThan(1.24);
    // Real-gas enhancement factor remains slightly above 1.0
    expect(res.enhancementFactor).toBeGreaterThan(1.002);
    expect(res.enhancementFactor).toBeLessThan(1.005);
  });

  it("computes virial enhancement factor f(p, T) within ASHRAE RP-1485 physical bounds", () => {
    const fSeaLevel = getEnhancementFactor(14.696, 75);
    const fDenver = getEnhancementFactor(12.1, 75);
    const fVacuum = getEnhancementFactor(0, 75);

    expect(fSeaLevel).toBeCloseTo(1.0041, 4);
    expect(fDenver).toBeLessThan(fSeaLevel);
    expect(fVacuum).toBe(1.0);
  });
});

