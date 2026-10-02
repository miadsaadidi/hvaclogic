import { describe, it, expect } from "vitest";
import { standardsRegistry } from "./standards-registry";

describe("Centralized Standards & Regulatory Registry Integrity", () => {
  it("verifies all standards entries have valid primary metadata", () => {
    expect(standardsRegistry.length).toBeGreaterThanOrEqual(10);

    standardsRegistry.forEach((entry) => {
      expect(entry.id).toBeDefined();
      expect(entry.name).toBeDefined();
      expect(entry.editionYear).toBeGreaterThan(1990);
      expect(entry.publisher).toBeDefined();
      expect(entry.legalStatus).toBeDefined();
      expect(entry.officialSourceUrl).toMatch(/^https:\/\//);
      expect(entry.responsibleAuthor).toBe("Miad S.");
      expect(entry.lastVerifiedDate).toBeDefined();
      expect(entry.nextReviewDate).toBeDefined();
      expect(entry.applicableCalculators.length).toBeGreaterThan(0);
    });
  });

  it("verifies EPA AIM Act entry specifies federal statutory regulation status and primary eCFR link", () => {
    const epaAim = standardsRegistry.find((s) => s.id === "epa-aim-act-2024");
    expect(epaAim).toBeDefined();
    expect(epaAim?.legalStatus).toBe("Federal Regulation");
    expect(epaAim?.jurisdictionScope).toBe("Federal (US)");
    expect(epaAim?.officialSourceUrl).toContain("ecfr.gov");
    expect(epaAim?.responsibleAuthor).toBe("Miad S.");
  });

  it("verifies DOE 10 CFR Part 430 Appendix M1 entry specifies federal regulation and SEER2 baseline", () => {
    const doeM1 = standardsRegistry.find((s) => s.id === "doe-10cfr430-m1");
    expect(doeM1).toBeDefined();
    expect(doeM1?.legalStatus).toBe("Federal Regulation");
    expect(doeM1?.officialSourceUrl).toContain("ecfr.gov");
    expect(doeM1?.responsibleAuthor).toBe("Miad S.");
  });

  it("verifies consensus standards (ASHRAE, ACCA, SMACNA) are distinguished from federal statutory laws", () => {
    const ashraeFund = standardsRegistry.find((s) => s.id === "ashrae-fund-2021");
    expect(ashraeFund?.legalStatus).toBe("Consensus Standard");

    const accaManualJ = standardsRegistry.find((s) => s.id === "acca-manual-j-8th");
    expect(accaManualJ?.legalStatus).toBe("Industry Methodology");

    const smacnaDuct = standardsRegistry.find((s) => s.id === "smacna-duct-2020");
    expect(smacnaDuct?.legalStatus).toBe("Industry Methodology");
  });
});
