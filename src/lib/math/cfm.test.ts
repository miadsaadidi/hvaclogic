import { describe, it, expect } from "vitest";
import {
  calculateCfmFromDuctVelocity,
  calculateCfmFromThermalLoad,
  calculateCfmFromRoomAch,
  calculateCfmFromTonnage,
  calculateCfmFromElectricHeat,
  categorizeVelocity,
} from "./cfm";

describe("HVAC CFM & Airflow Computational Engine", () => {
  it("calculates CFM from round duct diameter and velocity correctly", () => {
    // 8" round duct @ 800 FPM
    // Area = pi * (4/12)^2 = 0.34906 sq ft. CFM = 800 * 0.34906 = ~279 CFM
    const res = calculateCfmFromDuctVelocity({
      shape: "round",
      diameterInches: 8,
      velocityFpm: 800,
    });
    expect(res.cfm).toBe(279);
    expect(res.velocityCategory).toBe("standard");
  });

  it("calculates CFM from rectangular duct dimensions and velocity correctly", () => {
    // 12x8 duct @ 700 FPM
    // Area = (12 * 8) / 144 = 0.6667 sq ft. CFM = 700 * 0.6667 = ~467 CFM
    const res = calculateCfmFromDuctVelocity({
      shape: "rectangular",
      widthInches: 12,
      heightInches: 8,
      velocityFpm: 700,
    });
    expect(res.cfm).toBe(467);
    expect(res.areaSqFt).toBe(0.667);
  });

  it("calculates CFM from sensible cooling load and delta T", () => {
    // 24,000 BTU/hr sensible @ 20°F delta T -> 24000 / (1.08 * 20) = 1111 CFM
    const res = calculateCfmFromThermalLoad({
      sensibleBtuPerHour: 24000,
      temperatureDeltaF: 20,
    });
    expect(res.cfm).toBe(1111);
  });

  it("calculates CFM from room volume and air changes per hour (ACH)", () => {
    // 20x15 room, 9ft ceiling = 2700 cu ft. At 6 ACH -> (2700 * 6) / 60 = 270 CFM
    const res = calculateCfmFromRoomAch({
      lengthFeet: 20,
      widthFeet: 15,
      heightFeet: 9,
      airChangesPerHour: 6,
    });
    expect(res.cfm).toBe(270);
    expect(res.airTurnoverMinutes).toBe(10);
  });

  it("calculates CFM from nominal cooling tonnage", () => {
    // 3 Tons @ 400 CFM/ton = 1200 CFM
    const res = calculateCfmFromTonnage({
      coolingTons: 3,
      cfmPerTon: 400,
    });
    expect(res.cfm).toBe(1200);
  });

  it("calculates CFM for electric heat strip elements", () => {
    // 10 kW heat strip @ 40°F delta T -> (10 * 3412.142) / (1.08 * 40) = 790 CFM
    const res = calculateCfmFromElectricHeat({
      kilowatts: 10,
      temperatureDeltaF: 40,
    });
    expect(res.cfm).toBe(790);
  });

  it("accurately categorizes acoustic velocity thresholds", () => {
    expect(categorizeVelocity(500).category).toBe("whisper");
    expect(categorizeVelocity(750).category).toBe("standard");
    expect(categorizeVelocity(1100).category).toBe("noisy");
    expect(categorizeVelocity(1400).category).toBe("excessive");
  });
});
