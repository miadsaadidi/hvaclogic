import { describe, it, expect } from "vitest";
import { ENGINEERING_STANDARDS, getStandardsByOrg, getAllStandardCodes } from "./standards-matrix";

describe("Engineering Standards Matrix", () => {
  it("should have at least 8 key engineering standards", () => {
    expect(ENGINEERING_STANDARDS.length).toBeGreaterThanOrEqual(8);
  });

  it("should filter by organization correctly", () => {
    const ashraeStandards = getStandardsByOrg("ASHRAE");
    expect(ashraeStandards.length).toBeGreaterThanOrEqual(2);
    ashraeStandards.forEach((s) => expect(s.organization).toBe("ASHRAE"));

    const accaStandards = getStandardsByOrg("ACCA");
    expect(accaStandards.length).toBeGreaterThanOrEqual(3);
  });

  it("should have valid clauses and applicable calculators", () => {
    ENGINEERING_STANDARDS.forEach((std) => {
      expect(std.code).toBeDefined();
      expect(std.title).toBeDefined();
      expect(std.scope).toBeDefined();
      expect(std.clauses.length).toBeGreaterThanOrEqual(1);
      std.clauses.forEach((c) => {
        expect(c.clauseNumber).toBeDefined();
        expect(c.title).toBeDefined();
        expect(c.summary).toBeDefined();
        expect(c.applicableCalculators.length).toBeGreaterThanOrEqual(1);
        c.applicableCalculators.forEach((calc) => {
          expect(calc.name).toBeDefined();
          expect(calc.route.startsWith("/calculators/")).toBe(true);
        });
      });
    });
  });

  it("should return unique codes", () => {
    const codes = getAllStandardCodes();
    const unique = new Set(codes);
    expect(codes.length).toBe(unique.size);
  });
});
