import { describe, it, expect } from "vitest";
import {
  ashraeClimaticDataset,
  findLocationById,
  searchLocations,
} from "./ashrae-climatic-data";

describe("ASHRAE Climatic Design Conditions Dataset", () => {
  it("should contain entries for all 50 US states plus top Canadian metros", () => {
    expect(ashraeClimaticDataset.length).toBeGreaterThanOrEqual(50);
    const states = new Set(ashraeClimaticDataset.map((l) => l.state));
    expect(states.has("IL")).toBe(true);
    expect(states.has("TX")).toBe(true);
    expect(states.has("CA")).toBe(true);
    expect(states.has("NY")).toBe(true);
    expect(states.has("FL")).toBe(true);
  });

  it("should find specific locations by ID", () => {
    const chicago = findLocationById("il-chicago");
    expect(chicago).toBeDefined();
    expect(chicago?.city).toContain("Chicago");
    expect(chicago?.winterDb99).toBe(-2);
    expect(chicago?.summerDb04).toBe(90);
    expect(chicago?.climateZone).toBe("5A");

    const phoenix = findLocationById("az-phoenix");
    expect(phoenix).toBeDefined();
    expect(phoenix?.summerDb04).toBe(109);
    expect(phoenix?.climateZone).toBe("2B");
  });

  it("should search locations by query string across city, state, and zone", () => {
    const texasResults = searchLocations("Texas");
    expect(texasResults.length).toBeGreaterThanOrEqual(4);

    const zone5Results = searchLocations("Zone 5A");
    expect(zone5Results.length).toBeGreaterThanOrEqual(5);

    const emptyResults = searchLocations("");
    expect(emptyResults.length).toBe(ashraeClimaticDataset.length);
  });

  it("should have valid thermodynamic design values within physical bounds", () => {
    for (const loc of ashraeClimaticDataset) {
      expect(loc.winterDb99).toBeLessThan(loc.summerDb04);
      expect(loc.winterDb996).toBeLessThanOrEqual(loc.winterDb99);
      expect(loc.summerDb10).toBeLessThanOrEqual(loc.summerDb04);
      expect(loc.summerWb04).toBeLessThan(loc.summerDb04);
      expect(loc.elevationFt).toBeGreaterThanOrEqual(-300);
    }
  });
});
