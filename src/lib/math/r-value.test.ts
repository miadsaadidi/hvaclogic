import { describe, it, expect } from "vitest";
import {
  calculateLayerRValue,
  getIeccCodeRequirements,
  calculateAssemblyThermal,
  AssemblyInput,
} from "./r-value";

describe("Insulation R-Value & U-Factor Engine", () => {
  it("calculates individual material R-values accurately", () => {
    // 3.5" fiberglass batt @ 3.14 R/in = R-10.99 (~R-11)
    const battR = calculateLayerRValue("fiberglass_batt", 3.5);
    expect(battR).toBe(10.99);

    // 2.0" closed-cell spray foam @ 6.5 R/in = R-13.0
    const foamR = calculateLayerRValue("closed_cell_foam", 2.0);
    expect(foamR).toBe(13.0);

    // 1/2" drywall fixed = R-0.45
    const drywallR = calculateLayerRValue("drywall_half_inch", 0.5);
    expect(drywallR).toBe(0.45);
  });

  it("calculates standard 2x6 wall assembly (R-20 + 1\" Polyiso continuous) with IECC compliance", () => {
    // Assembly: Drywall (0.45) + Rockwool 5.5" (22.0) + OSB (0.62) + 1" Polyiso (6.0) + Vinyl (0.60) + Air films (0.85) = R-30.52
    const input: AssemblyInput = {
      assemblyType: "exterior_wall",
      climateZone: 5, // Zone 5 requires R-25 / U-0.045
      layers: [
        { id: "1", materialKey: "drywall_half_inch", name: "1/2\" Drywall", thicknessInches: 0.5, rValuePerInch: 0.9, calculatedRValue: 0.45 },
        { id: "2", materialKey: "rockwool_mineral_wool", name: "Rockwool 5.5\"", thicknessInches: 5.5, rValuePerInch: 4.0, calculatedRValue: 22.0 },
        { id: "3", materialKey: "osb_sheathing", name: "7/16\" OSB", thicknessInches: 0.44, rValuePerInch: 1.41, calculatedRValue: 0.62 },
        { id: "4", materialKey: "polyiso_continuous", name: "1\" Polyiso", thicknessInches: 1.0, rValuePerInch: 6.0, calculatedRValue: 6.0 },
        { id: "5", materialKey: "vinyl_siding", name: "Vinyl Siding", thicknessInches: 0.6, rValuePerInch: 1.0, calculatedRValue: 0.60 },
      ],
      includeAirFilms: true,
    };

    const res = calculateAssemblyThermal(input);
    expect(res.totalRValue).toBeGreaterThan(30);
    expect(res.overallUFactor).toBeLessThan(0.035);
    expect(res.isIeccCompliant).toBe(true);
    expect(res.complianceStatusBadge).toContain("IECC 2021/2024 Compliant");
  });

  it("checks IECC code minimums across climate zones", () => {
    const atticZone2 = getIeccCodeRequirements("attic_ceiling", 2);
    expect(atticZone2.minR).toBe(38);

    const atticZone5 = getIeccCodeRequirements("attic_ceiling", 5);
    expect(atticZone5.minR).toBe(49);
  });
});
