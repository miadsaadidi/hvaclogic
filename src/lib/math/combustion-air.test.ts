import { describe, it, expect } from "vitest";
import {
  calculateCombustionAir,
  CombustionAirInput,
} from "./combustion-air";

describe("NFPA 54 / IFGC Combustion Air Sizing Engine", () => {
  it("sizes all 4 methods for 80k furnace + 40k water heater in 512 cu ft confined mechanical room", () => {
    const input: CombustionAirInput = {
      appliances: [
        { id: "furnace", name: "Gas Furnace", inputBtuHr: 80000 },
        { id: "water_heater", name: "Gas Water Heater", inputBtuHr: 40000 },
      ],
      roomLengthFt: 8,
      roomWidthFt: 8,
      roomHeightFt: 8, // Volume = 512 cu ft
      louverMaterial: "metal", // 75% free area
    };

    const res = calculateCombustionAir(input);
    expect(res.totalInputBtuHr).toBe(120000);
    // Required unconfined volume: (120,000 / 1000) * 50 = 6,000 cu ft
    expect(res.requiredUnconfinedVolumeCuFt).toBe(6000);
    expect(res.isConfinedSpace).toBe(true);
    expect(res.volumeDeficitCuFt).toBe(6000 - 512);

    // Method 1 (Indoor 2 openings): 120 sq in net each. With 75% louver = 120 / 0.75 = 160 sq in gross.
    const indoor = res.methods.find((m) => m.methodId === "indoor_two_openings");
    expect(indoor?.netFreeAreaSqIn).toBe(120);
    expect(indoor?.grossLouverAreaSqIn).toBe(160);
    expect(indoor?.calculatedRoundDiameterIn).toBe(14.3); // sqrt(4*160/pi) = 14.27 -> 14.3 in
    expect(indoor?.recommendedRoundDuctDiameterIn).toBe(16);

    // Method 2 (Outdoor Vertical 2 openings): 120,000 / 4,000 = 30 sq in net each.
    // Gross @ 75% = 30 / 0.75 = 40 sq in gross.
    const vert = res.methods.find((m) => m.methodId === "outdoor_vertical_two_openings");
    expect(vert?.netFreeAreaSqIn).toBe(30);
    expect(vert?.grossLouverAreaSqIn).toBe(40);
    expect(vert?.calculatedRoundDiameterIn).toBe(7.1); // sqrt(4*40/pi) = 7.136 -> 7.1 in
    expect(vert?.recommendedRoundDuctDiameterIn).toBe(8);

    // Method 3 (Outdoor Horizontal 2 openings): 120,000 / 2,000 = 60 sq in net each.
    // Gross @ 75% = 60 / 0.75 = 80 sq in gross.
    const horiz = res.methods.find((m) => m.methodId === "outdoor_horizontal_two_openings");
    expect(horiz?.netFreeAreaSqIn).toBe(60);
    expect(horiz?.grossLouverAreaSqIn).toBe(80);
    expect(horiz?.calculatedRoundDiameterIn).toBe(10.1); // sqrt(4*80/pi) = 10.09 -> 10.1 in
    expect(horiz?.recommendedRoundDuctDiameterIn).toBe(12);

    // Method 4 (Outdoor Single Opening): 120,000 / 3,000 = 40 sq in net.
    // Gross @ 75% = 40 / 0.75 = 53 sq in gross.
    const single = res.methods.find((m) => m.methodId === "outdoor_single_opening");
    expect(single?.netFreeAreaSqIn).toBe(40);
    expect(single?.grossLouverAreaSqIn).toBe(53);
    expect(single?.calculatedRoundDiameterIn).toBe(8.2); // sqrt(4*53/pi) = 8.21 -> 8.2 in
    expect(single?.recommendedRoundDuctDiameterIn).toBe(9);

    // Summary text regression check
    expect(res.summary).toContain("CONFINED for 120,000 BTU/hr total gas appliance input under the NFPA 54 / IFGC Standard Method");
  });

  it("detects unconfined space in large open basement and qualifies Standard Method / ACH boundary", () => {
    const input: CombustionAirInput = {
      appliances: [
        { id: "furnace", name: "Gas Furnace", inputBtuHr: 60000 },
      ],
      roomLengthFt: 40,
      roomWidthFt: 30,
      roomHeightFt: 8, // Volume = 9,600 cu ft
      louverMaterial: "metal",
    };

    const res = calculateCombustionAir(input);
    // Required = (60,000 / 1000) * 50 = 3,000 cu ft
    expect(res.requiredUnconfinedVolumeCuFt).toBe(3000);
    expect(res.isConfinedSpace).toBe(false);

    expect(res.summary).toContain("meets the NFPA 54 / IFGC Standard Method unconfined threshold (50 cu ft / 1,000 BTU/hr)");
  });

  it("handles custom louver free area percentage", () => {
    const input: CombustionAirInput = {
      appliances: [
        { id: "furnace", name: "Gas Furnace", inputBtuHr: 100000 },
      ],
      roomLengthFt: 10,
      roomWidthFt: 10,
      roomHeightFt: 8,
      louverMaterial: "custom",
      customLouverPercent: 50, // 50% free area
    };

    const res = calculateCombustionAir(input);
    expect(res.louverFreeAreaPercentage).toBe(50);
    // Vertical: 100,000 / 4,000 = 25 sq in net. Gross @ 50% = 25 / 0.50 = 50 sq in.
    const vert = res.methods.find((m) => m.methodId === "outdoor_vertical_two_openings");
    expect(vert?.netFreeAreaSqIn).toBe(25);
    expect(vert?.grossLouverAreaSqIn).toBe(50);
  });

  it("enforces indoor 100 sq in minimum for small appliances", () => {
    const input: CombustionAirInput = {
      appliances: [
        { id: "water_heater", name: "Small Gas Water Heater", inputBtuHr: 30000 },
      ],
      roomLengthFt: 6,
      roomWidthFt: 6,
      roomHeightFt: 8,
      louverMaterial: "direct_screen", // 100% free area
    };

    const res = calculateCombustionAir(input);
    // 30,000 / 1,000 = 30 sq in, but code minimum is 100 sq in for indoor air method
    const indoor = res.methods.find((m) => m.methodId === "indoor_two_openings");
    expect(indoor?.netFreeAreaSqIn).toBe(100);
    expect(indoor?.grossLouverAreaSqIn).toBe(100);
  });
});
