import { describe, it, expect } from "vitest";
import {
  calculateBoilerSize,
  getBaseboardOutputPerFoot,
  BoilerSizingInput,
} from "./boiler";

describe("Hydronic Boiler Sizing Engine", () => {
  it("sizes boiler accurately for 100 linear feet of baseboard @ 180°F AWT", () => {
    // 100 ft @ 580 BTU/ft = 58,000 BTU net. 58,000 * 1.15 = 66,700 BTU gross DOE capacity.
    // Approximate input @ 95% AFUE: 66,700 / 0.95 = 70,210 BTU -> candidate nominal 75,000 BTU
    const input: BoilerSizingInput = {
      mode: "baseboard",
      heatingMedium: "hot_water",
      baseboardLinearFeet: 100,
      waterTempF: 180,
      hasIndirectDhw: true,
      hasDhwPriority: true, // Priority active: 0 BTU adder
      boilerAfuePercent: 95,
    };

    const res = calculateBoilerSize(input);
    expect(res.connectedEmitterLoadBtu).toBe(58000);
    expect(res.dhwPickupBtu).toBe(0);
    expect(res.totalNetAhriLoadBtu).toBe(58000);
    expect(res.pipingAndPickupFactor).toBe(1.15);
    expect(res.grossDoeCapacityBtu).toBe(66700);
    expect(res.recommendedBoilerInputBtu).toBe(75000);
    expect(res.candidateBoilerInputRange).toContain("75k");
  });

  it("calculates cast-iron radiator EDR steam boiler sizing with 1.33x pickup factor", () => {
    // 300 sq ft EDR @ 240 BTU/sq ft = 72,000 BTU net. 72,000 * 1.33 = 95,760 BTU gross DOE capacity.
    // Approximate input @ 82% AFUE: 95,760 / 0.82 = 116,780 BTU -> candidate nominal 120,000 BTU
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
    expect(res.recommendedBoilerInputBtu).toBe(120000);
  });

  it("calculates hot water radiator EDR at 150 BTU/sq ft EDR", () => {
    // 400 sq ft EDR @ 150 BTU/sq ft = 60,000 BTU net. 60,000 * 1.15 = 69,000 BTU gross DOE capacity.
    const input: BoilerSizingInput = {
      mode: "radiator_edr",
      heatingMedium: "hot_water",
      radiatorEdrSqFt: 400,
      boilerAfuePercent: 84,
    };

    const res = calculateBoilerSize(input);
    expect(res.connectedEmitterLoadBtu).toBe(60000);
    expect(res.pipingAndPickupFactor).toBe(1.15);
    expect(res.grossDoeCapacityBtu).toBe(69000);
  });

  it("scales copper fin-tube baseboard output per foot across water temperatures", () => {
    expect(getBaseboardOutputPerFoot(180)).toBe(580);
    expect(getBaseboardOutputPerFoot(160)).toBe(450);
    expect(getBaseboardOutputPerFoot(140)).toBe(330);
    expect(getBaseboardOutputPerFoot(120)).toBe(210);
  });

  it("adds DHW recovery pickup allowance when priority relay is disabled", () => {
    const input: BoilerSizingInput = {
      mode: "baseboard",
      heatingMedium: "hot_water",
      baseboardLinearFeet: 100,
      waterTempF: 180,
      hasIndirectDhw: true,
      hasDhwPriority: false, // Priority OFF: adds 35,000 BTU allowance
      dhwPickupAllowanceBtu: 35000,
      boilerAfuePercent: 95,
    };

    const res = calculateBoilerSize(input);
    expect(res.connectedEmitterLoadBtu).toBe(58000);
    expect(res.dhwPickupBtu).toBe(35000);
    expect(res.totalNetAhriLoadBtu).toBe(93000);
    expect(res.grossDoeCapacityBtu).toBe(Math.round(93000 * 1.15)); // 106,950 BTU
  });
});
