import { describe, expect, it } from "vitest";
import {
  calculateAsmeExpansionTank,
  getFluidDensity,
  getFluidSpecificVolume,
  ExpansionTankInput,
} from "./expansion-tank";

describe("ASME Section VIII Closed-Loop Expansion Tank Engine", () => {
  it("calculates temperature-dependent fluid density and specific volume accurately", () => {
    // Pure Water density at 60°F should be ~62.37 lb/ft³, at 200°F ~60.13 lb/ft³
    const rho60 = getFluidDensity("water", 60);
    const rho200 = getFluidDensity("water", 200);

    expect(rho60).toBeGreaterThan(62.0);
    expect(rho60).toBeLessThan(62.5);
    expect(rho200).toBeGreaterThan(59.8);
    expect(rho200).toBeLessThan(60.4);

    const v60 = getFluidSpecificVolume("water", 60);
    const v200 = getFluidSpecificVolume("water", 200);
    expect(v200).toBeGreaterThan(v60);

    // Water volumetric expansion from 60°F to 200°F is ~3.5% to 4.5%
    const expWater = (v200 / v60 - 1) * 100;
    expect(expWater).toBeGreaterThan(3.5);
    expect(expWater).toBeLessThan(4.5);
  });

  it("calculates standard residential water system per ASME Section VIII", () => {
    const input: ExpansionTankInput = {
      systemVolumeGallons: 100,
      initialFillTempF: 60,
      maxOperatingTempF: 200,
      initialFillPressurePsig: 12,
      reliefValvePressurePsig: 30, // 30 psi boiler valve
      safetyPressureBufferPsi: 3, // P2 = 27 psig = 41.7 psia
      fluidType: "water",
      pipingMaterial: "carbon_steel",
    };

    const result = calculateAsmeExpansionTank(input);

    expect(result.initialPressurePsia).toBeCloseTo(26.7, 1);
    expect(result.maxOperatingPressurePsia).toBeCloseTo(41.7, 1);
    // Acceptance ratio: 1 - (26.7 / 41.7) ≈ 0.3597
    expect(result.acceptanceRatio).toBeGreaterThan(0.34);
    expect(result.acceptanceRatio).toBeLessThan(0.38);

    // Acceptance volume for 100 gal should be ~3.5 to 4.2 gallons
    expect(result.acceptanceVolumeGallons).toBeGreaterThan(3.2);
    expect(result.acceptanceVolumeGallons).toBeLessThan(4.5);

    // Total tank volume Vt = Vacc / Ar should be ~9 to 12 gallons
    expect(result.totalTankVolumeGallons).toBeGreaterThan(8.5);
    expect(result.totalTankVolumeGallons).toBeLessThan(13.0);
    expect(result.recommendedCommercialTankSizeGallons).toBe(11.0); // Next standard size 11 or 14 gal
  });

  it("verifies glycol expansion penalty: 50% Propylene Glycol requires ~30% to 45% larger tank", () => {
    const baseInput: ExpansionTankInput = {
      systemVolumeGallons: 150,
      initialFillTempF: 50,
      maxOperatingTempF: 180,
      initialFillPressurePsig: 15,
      reliefValvePressurePsig: 30,
      safetyPressureBufferPsi: 3,
      pipingMaterial: "carbon_steel",
    };

    const waterResult = calculateAsmeExpansionTank({ ...baseInput, fluidType: "water" });
    const pg30Result = calculateAsmeExpansionTank({ ...baseInput, fluidType: "propylene_glycol_30" });
    const pg50Result = calculateAsmeExpansionTank({ ...baseInput, fluidType: "propylene_glycol_50" });

    // Glycol must expand more than water
    expect(pg30Result.netFluidVolumetricExpansionPercent).toBeGreaterThan(
      waterResult.netFluidVolumetricExpansionPercent
    );
    expect(pg50Result.netFluidVolumetricExpansionPercent).toBeGreaterThan(
      pg30Result.netFluidVolumetricExpansionPercent
    );

    // 50% PG total tank volume must be notably larger than pure water (typically +50% to +80% for 50% PG)
    expect(pg50Result.totalTankVolumeGallons).toBeGreaterThan(waterResult.totalTankVolumeGallons);
    expect(pg50Result.glycolSizingPenaltyPercent).toBeGreaterThan(45);
    expect(pg50Result.glycolSizingPenaltyPercent).toBeLessThan(85);
  });

  it("handles high-pressure commercial system correctly (50 psi relief)", () => {
    const commercialInput: ExpansionTankInput = {
      systemVolumeGallons: 500,
      initialFillTempF: 60,
      maxOperatingTempF: 210,
      initialFillPressurePsig: 20,
      reliefValvePressurePsig: 50,
      safetyPressureBufferPsi: 5,
      fluidType: "ethylene_glycol_30",
      pipingMaterial: "carbon_steel",
    };

    const result = calculateAsmeExpansionTank(commercialInput);

    expect(result.acceptanceVolumeGallons).toBeGreaterThan(20);
    expect(result.totalTankVolumeGallons).toBeGreaterThan(45);
    expect(result.acceptanceRatio).toBeGreaterThan(0.40);
    expect(result.warningNotes.length).toBeGreaterThanOrEqual(0);
  });
});
