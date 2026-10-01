import { describe, it, expect } from "vitest";
import {
  calculateLayerRValue,
  getSurfaceAirFilms,
  getIeccCodeRequirements,
  calculateAssemblyThermal,
  AssemblyInput,
} from "./r-value";

describe("Insulation R-Value & U-Factor 1-D Stack Engine", () => {
  it("calculates individual material R-values accurately", () => {
    // 3.5" fiberglass batt @ 3.14 R/in = R-10.99
    const battR = calculateLayerRValue("fiberglass_batt", 3.5);
    expect(battR).toBe(10.99);

    // 2.0" closed-cell spray foam @ 6.5 R/in = R-13.0
    const foamR = calculateLayerRValue("closed_cell_foam", 2.0);
    expect(foamR).toBe(13.0);

    // 1/2" drywall fixed = R-0.45
    const drywallR = calculateLayerRValue("drywall_half_inch", 0.5);
    expect(drywallR).toBe(0.45);

    // 1.0" polyiso @ 6.0 R/in = R-6.0
    const polyisoR = calculateLayerRValue("polyiso_continuous", 1.0);
    expect(polyisoR).toBe(6.0);
  });

  it("applies correct standard surface air film resistances per orientation", () => {
    const wallFilms = getSurfaceAirFilms("exterior_wall");
    expect(wallFilms.rInterior).toBe(0.68);
    expect(wallFilms.rExterior).toBe(0.17);
    expect(wallFilms.totalAirFilmR).toBe(0.85);

    const atticFilms = getSurfaceAirFilms("attic_ceiling");
    expect(atticFilms.rInterior).toBe(0.61);
    expect(atticFilms.totalAirFilmR).toBe(0.78);

    const floorFilms = getSurfaceAirFilms("floor_crawlspace");
    expect(floorFilms.rInterior).toBe(0.92);
    expect(floorFilms.totalAirFilmR).toBe(1.09);
  });

  it("calculates standard 2x6 high-performance wall 1-D series stack (R-30.52)", () => {
    // Assembly: Drywall (0.45) + Rockwool 5.5" (22.0) + OSB (0.62) + 1" Polyiso (6.0) + Vinyl (0.60) + Air films (0.85) = R-30.52
    const input: AssemblyInput = {
      assemblyType: "exterior_wall",
      climateZone: 5, // Zone 5 (6000 HDD)
      layers: [
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "rockwool_mineral_wool", name: "Rockwool 5.5\"", thicknessInches: 5.5, rValuePerInch: 4.0, calculatedRValue: 22.0 },
        { id: "3", materialKey: "osb_sheathing", name: "7/16\" OSB", thicknessInches: 0.44, rValuePerInch: 1.41, calculatedRValue: 0.62 },
        { id: "4", materialKey: "polyiso_continuous", name: "1\" Polyiso (ci)", thicknessInches: 1.0, rValuePerInch: 6.0, calculatedRValue: 6.0 },
        { id: "5", materialKey: "vinyl_siding", name: "Vinyl Siding", thicknessInches: 0.6, rValuePerInch: 1.0, calculatedRValue: 0.60 },
      ],
      includeAirFilms: true,
    };

    const res = calculateAssemblyThermal(input);
    expect(res.totalRValue).toBe(30.52);
    expect(res.overallUFactor).toBeCloseTo(0.0328, 4); // 1 / 30.52 = 0.032765 -> 0.0328
    expect(res.isIeccNominalMet).toBe(true);
    expect(res.airFilmRValue).toBe(0.85);
    expect(res.layerSumRValue).toBe(29.67);
    // Annual heat loss @ 6000 HDD: 0.0328 * 24 * 6000 = ~4,723 BTU/ft²
    expect(res.annualHeatLossBtuPerSqFt).toBe(Math.round(0.0328 * 24 * 6000));
  });

  it("calculates Chicago Zone 5 continuous insulation advanced wall (R-40.52 / U-0.0247)", () => {
    // Assembly: Drywall (0.45) + Cavity R-21 (21.0) + OSB (0.62) + 3" Polyiso (18.0) + Siding (0.60) + Air films (0.85) = R-41.52
    const input: AssemblyInput = {
      assemblyType: "exterior_wall",
      climateZone: 5,
      customHdd: 6000,
      layers: [
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "fiberglass_hd_batt", name: "R-21 High-Density Batt", thicknessInches: 5.5, rValuePerInch: 3.82, calculatedRValue: 21.0 },
        { id: "3", materialKey: "osb_sheathing", name: "7/16\" OSB", thicknessInches: 0.44, rValuePerInch: 1.41, calculatedRValue: 0.62 },
        { id: "4", materialKey: "polyiso_continuous", name: "3\" Polyiso Continuous (ci)", thicknessInches: 3.0, rValuePerInch: 6.0, calculatedRValue: 18.0 },
        { id: "5", materialKey: "vinyl_siding", name: "Vinyl Siding", thicknessInches: 0.6, rValuePerInch: 1.0, calculatedRValue: 0.60 },
      ],
      includeAirFilms: true,
    };

    const res = calculateAssemblyThermal(input);
    expect(res.totalRValue).toBe(41.52);
    expect(res.overallUFactor).toBeCloseTo(0.0241, 3);
    expect(res.annualHeatLossBtuPerSqFt).toBe(Math.round(res.overallUFactor * 24 * 6000));
  });

  it("provides prescriptive IECC code benchmarks across climate zones", () => {
    const atticZone2 = getIeccCodeRequirements("attic_ceiling", 2);
    expect(atticZone2.minR).toBe(38);

    const atticZone5 = getIeccCodeRequirements("attic_ceiling", 5);
    expect(atticZone5.minR).toBe(49);

    const wallZone3 = getIeccCodeRequirements("exterior_wall", 3);
    expect(wallZone3.minR).toBe(20);

    const wallZone5 = getIeccCodeRequirements("exterior_wall", 5);
    expect(wallZone5.minR).toBe(25);
  });
});
