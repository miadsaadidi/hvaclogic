import { describe, it, expect } from "vitest";
import {
  calculateBoilerSize,
  getBaseboardOutputPerFoot,
  BoilerSizingInput,
} from "./boiler";

describe("Hydronic Boiler Sizing Engine", () => {
  it("sizes boiler accurately for 100 linear feet of baseboard @ 180°F AWT", () => {
    // 100 ft @ 580 BTU/ft = 58,000 BTU net. 58,000 * 1.15 = 66,700 BTU gross. 66,700 / 0.95 = ~70,210 -> 75,000 BTU input
    const input: BoilerSizingInput = {
      mode: "baseboard",
      heatingMedium: "hot_water",
      baseboardLinearFeet: 100,
      waterTempF: 180,
      hasIndirectDhw: true,
      hasDhwPriority: true, // No DHW adder
      boilerAfuePercent: 95,
    };

    const res = calculateBoilerSize(input);
    expect(res.connectedEmitterLoadBtu).toBe(58000);
    expect(res.dhwPickupBtu).toBe(0);
    expect(res.pipingAndPickupFactor).toBe(1.15);
    expect(res.grossDoeCapacityBtu).toBe(66700);
    expect(res.recommendedBoilerInputBtu).toBe(75000);
  });

  it("calculates cast-iron radiator EDR steam boiler sizing with 1.33x pickup", () => {
    // 300 sq ft EDR @ 240 BTU/sq ft = 72,000 BTU net. 72,000 * 1.33 = 95,760 BTU gross. 95,760 / 0.82 = ~116,780 -> 120,000 BTU input
    const input: BoilerSizingInput = {
      mode: "radiator_edr",
      heatingMedium: "steam",
      radiatorEdrSqFt: 300,
      boilerAfuePercent: 82,
    };

    const res = calculateBoilerSize(input);
    expect(res.connectedEmitterLoadBtu).toBe(72000);
    expect(res.pipingAndPickupFactor).toBe(1.33);
    expect(res.grossDoeCapacityBtu).toBe(95760);
    expect(res.recommendedBoilerInputBtu).toBeGreaterThanOrEqual(115000);
  });

  it("scales baseboard output per foot across water temperatures", () => {
    expect(getBaseboardOutputPerFoot(180)).toBe(580);
    expect(getBaseboardOutputPerFoot(140)).toBe(330);
    expect(getBaseboardOutputPerFoot(120)).toBe(210);
  });
});
