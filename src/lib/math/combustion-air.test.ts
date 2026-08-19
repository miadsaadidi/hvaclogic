import { describe, it, expect } from "vitest";
import {
  calculateCombustionAir,
  CombustionAirInput,
} from "./combustion-air";

describe("NFPA 54 / IFGC Combustion Air Sizing Engine", () => {
  it("detects confined space for 80k furnace + 40k water heater in small closet", () => {
    const input: CombustionAirInput = {
      appliances: [
        { id: "furnace", name: "Gas Furnace", inputBtuHr: 80000 },
        { id: "water_heater", name: "Gas Water Heater", inputBtuHr: 40000 },
      ],
      roomLengthFt: 8,
      roomWidthFt: 6,
      roomHeightFt: 8, // Volume = 384 cu ft
      louverMaterial: "metal", // 75% free area
    };

    const res = calculateCombustionAir(input);
    expect(res.totalInputBtuHr).toBe(120000);
    // Required = (120,000 / 1000) * 50 = 6,000 cu ft
    expect(res.requiredUnconfinedVolumeCuFt).toBe(6000);
    expect(res.isConfinedSpace).toBe(true);
    expect(res.volumeDeficitCuFt).toBe(6000 - 384);

    // Method 1 (Indoor 2 openings): 120 sq in net each. With metal louver (1.33x) = 160 sq in.
    const indoor = res.methods.find((m) => m.methodId === "indoor_two_openings");
    expect(indoor?.netFreeAreaSqIn).toBe(120);
    expect(indoor?.grossLouverAreaSqIn).toBe(160);

    // Method 2 (Outdoor Vertical 2 openings): 120,000 / 4,000 = 30 sq in net each.
    const vert = res.methods.find((m) => m.methodId === "outdoor_vertical_two_openings");
    expect(vert?.netFreeAreaSqIn).toBe(30);

    // Method 3 (Outdoor Horizontal 2 openings): 120,000 / 2,000 = 60 sq in net each.
    const horiz = res.methods.find((m) => m.methodId === "outdoor_horizontal_two_openings");
    expect(horiz?.netFreeAreaSqIn).toBe(60);
  });

  it("detects unconfined space in large open basement", () => {
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
  });
});
