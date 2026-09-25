import { describe, it, expect } from "vitest";
import {
  calculateVaporPressureInHg,
  calculateDewPointFromVaporPressureInHg,
  evaluateAssemblyCondensation,
  STANDARD_WALL_ASSEMBLIES,
  EnvironmentalConditions,
} from "./envelope-condensation";

describe("Building Envelope Hydrothermal & Glaser Condensation Engine", () => {
  it("computes vapor pressure and dew point accurately", () => {
    // 70°F and 50% RH
    const vp = calculateVaporPressureInHg(70, 50);
    expect(vp).toBeGreaterThan(0.3);
    expect(vp).toBeLessThan(0.4);

    const dp = calculateDewPointFromVaporPressureInHg(vp);
    expect(dp).toBeCloseTo(50.5, 1);
  });

  it("evaluates winter heating scenario for 2x6 wood stud wall (Zone 5)", () => {
    const assembly = STANDARD_WALL_ASSEMBLIES["2x6-wood-kraft-batt"];
    expect(assembly).toBeDefined();

    const winterConditions: EnvironmentalConditions = {
      indoorDryBulbF: 70,
      indoorRelativeHumidityPercent: 40,
      outdoorDryBulbF: 10,
      outdoorRelativeHumidityPercent: 80,
    };

    const result = evaluateAssemblyCondensation(assembly.layers, winterConditions);

    expect(result.vaporDriveDirection).toBe("Outward (Winter Heating)");
    expect(result.totalRValue).toBeGreaterThan(20);
    expect(result.overallUFactor).toBeLessThan(0.05);
    expect(result.profile.length).toBe(assembly.layers.length + 1);

    // Indoor air is 70°F, outdoor air boundary drops near 10°F
    expect(result.profile[0].temperatureF).toBe(70);
    expect(result.profile[result.profile.length - 1].temperatureF).toBeCloseTo(10, 0);
  });

  it("verifies condensation protection from exterior continuous rigid insulation (ci)", () => {
    const ciAssembly = STANDARD_WALL_ASSEMBLIES["high-performance-continuous-ci"];
    expect(ciAssembly).toBeDefined();

    const severeWinterConditions: EnvironmentalConditions = {
      indoorDryBulbF: 70,
      indoorRelativeHumidityPercent: 45,
      outdoorDryBulbF: 0,
      outdoorRelativeHumidityPercent: 75,
    };

    const result = evaluateAssemblyCondensation(ciAssembly.layers, severeWinterConditions);

    // Continuous insulation keeps OSB interface significantly warmer (over 20°F in 0°F weather vs ~3°F without ci)
    const osbPoint = result.profile.find((p) => p.interfaceName.includes("OSB"));
    expect(osbPoint).toBeDefined();
    if (osbPoint) {
      expect(osbPoint.temperatureF).toBeGreaterThan(20);
    }
  });

  it("handles summer cooling reverse vapor drive (Hot-Humid Climate)", () => {
    const assembly = STANDARD_WALL_ASSEMBLIES["2x6-wood-poly-vapor-barrier"];
    expect(assembly).toBeDefined();

    const summerHumidConditions: EnvironmentalConditions = {
      indoorDryBulbF: 72,
      indoorRelativeHumidityPercent: 50,
      outdoorDryBulbF: 95,
      outdoorRelativeHumidityPercent: 75,
    };

    const result = evaluateAssemblyCondensation(assembly.layers, summerHumidConditions);

    expect(result.vaporDriveDirection).toBe("Inward (Summer Cooling)");
    // Inward vapor drive against interior impermeable poly barrier often triggers severe summer condensation risk
    expect(result.profile.length).toBeGreaterThan(5);
  });
});
