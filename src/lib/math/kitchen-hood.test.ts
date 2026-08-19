import { describe, it, expect } from "vitest";
import { calculateKitchenHoodCfm } from "./kitchen-hood";

describe("Kitchen Range Hood CFM & Make-Up Air Engine", () => {
  it("sizes a standard 30-inch gas stove (45,000 BTU) wall-mounted hood accurately", () => {
    // 45,000 BTU / 100 = 450 CFM base thermal.
    // Equivalent duct = 10 + 10(90-elbow) + 30(cap) = 50 ft -> Adder = (50-30)*0.8 = 16 CFM
    // Total raw = 466 CFM -> rounded up to 500 CFM
    const res = calculateKitchenHoodCfm({
      cooktopType: "gas",
      cooktopWidthInches: 30,
      gasTotalBtu: 45000,
      mountingType: "wall",
      ductRunLengthFeet: 10,
      elbowCount90: 1,
    });

    expect(res.recommendedCfm).toBe(500);
    expect(res.isMakeUpAirRequired).toBe(true); // > 400 CFM
    expect(res.codeNotice).toContain("IRC Section M1503.6 MANDATORY CODE ALERT");
    expect(res.recommendedDuctDiameterInches).toBe(7);
  });

  it("sizes an electric cooktop under 400 CFM without triggering make-up air", () => {
    // 30" electric = 2.5 ft * 100 = 250 CFM.
    // Duct length = 5 ft, 0 elbows -> 35 ft equiv -> Adder = 4 CFM
    // Total raw = 254 -> rounded up to 300 CFM
    const res = calculateKitchenHoodCfm({
      cooktopType: "electric",
      cooktopWidthInches: 30,
      mountingType: "wall",
      ductRunLengthFeet: 5,
      elbowCount90: 0,
    });

    expect(res.recommendedCfm).toBe(300);
    expect(res.isMakeUpAirRequired).toBe(false); // <= 400 CFM
    expect(res.codeNotice).toContain("Compliant with IRC M1503.6");
    expect(res.recommendedDuctDiameterInches).toBe(6);
  });

  it("applies 30% island open-air capture penalty and recommends 6-inch wider canopy", () => {
    // 36" pro gas (60,000 BTU) -> 600 CFM * 1.30 = 780 CFM + duct losses -> ~850 CFM
    const res = calculateKitchenHoodCfm({
      cooktopType: "gas",
      cooktopWidthInches: 36,
      gasTotalBtu: 60000,
      mountingType: "island",
      ductRunLengthFeet: 15,
      elbowCount90: 2,
    });

    expect(res.mountingMultiplier).toBe(1.30);
    expect(res.recommendedHoodWidthInches).toBe(42); // 36" + 6" overlap
    expect(res.recommendedCfm).toBe(850);
    expect(res.recommendedDuctDiameterInches).toBe(8);
  });
});
