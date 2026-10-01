import { describe, it, expect } from "vitest";
import { calculateKitchenHoodCfm } from "./kitchen-hood";

describe("Kitchen Range Hood CFM & Make-Up Air Engine", () => {
  it("sizes a standard 30-inch gas stove (45,000 BTU) wall-mounted hood accurately", () => {
    // 45,000 BTU / 100 = 450 CFM gas rule-of-thumb.
    // HVI linear width = (30/12) * 100 = 250 CFM.
    // Recommended CFM = max(250, 450) = 450 -> rounded to 450 CFM.
    // Equivalent duct = 10 + 10(90-elbow) + 25(cap) = 45 ft eqv.
    const res = calculateKitchenHoodCfm({
      cooktopType: "gas",
      cooktopWidthInches: 30,
      gasTotalBtu: 45000,
      mountingType: "wall",
      ductRunLengthFeet: 10,
      elbowCount90: 1,
    });

    expect(res.recommendedCfm).toBe(450);
    expect(res.gasRuleOfThumbCfm).toBe(450);
    expect(res.hviLinearWidthCfm).toBe(250);
    expect(res.isMakeUpAirRequired).toBe(true); // > 400 CFM
    expect(res.codeNotice).toContain("Make-up air review triggered");
    expect(res.recommendedDuctDiameterInches).toBe(7);
    expect(res.ductEquivalentLengthFeet).toBe(45);
    expect(res.estimatedStaticPressureLossInWg).toBeGreaterThan(0);
  });

  it("sizes a 30-inch electric cooktop under 400 CFM using HVI linear foot rate", () => {
    // 30" electric = (30/12) * 100 = 250 CFM.
    // Recommended = 250 CFM.
    const res = calculateKitchenHoodCfm({
      cooktopType: "electric",
      cooktopWidthInches: 30,
      mountingType: "wall",
      ductRunLengthFeet: 5,
      elbowCount90: 0,
    });

    expect(res.recommendedCfm).toBe(250);
    expect(res.hviLinearWidthCfm).toBe(250);
    expect(res.isMakeUpAirRequired).toBe(false); // <= 400 CFM
    expect(res.codeNotice).toContain("Exhaust is ≤ 400 CFM");
    expect(res.recommendedDuctDiameterInches).toBe(6);
  });

  it("applies HVI island 150 CFM/ft rate and recommends 6-inch wider canopy", () => {
    // 36" island electric: (36/12) * 150 = 450 CFM -> recommended 450 CFM
    const res = calculateKitchenHoodCfm({
      cooktopType: "electric",
      cooktopWidthInches: 36,
      mountingType: "island",
      ductRunLengthFeet: 15,
      elbowCount90: 2,
    });

    expect(res.hviLinearWidthCfm).toBe(450);
    expect(res.recommendedHoodWidthInches).toBe(42); // 36" + 6" overlap
    expect(res.recommendedCfm).toBe(450);
    expect(res.recommendedDuctDiameterInches).toBe(7);
  });
});
