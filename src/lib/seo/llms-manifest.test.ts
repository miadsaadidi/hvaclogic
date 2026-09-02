import { describe, it, expect } from "vitest";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { GET as getLlmsTxt } from "@/app/llms.txt/route";
import { GET as getLlmsFullTxt } from "@/app/llms-full.txt/route";

describe("LLM Manifests (/llms.txt & /llms-full.txt)", () => {
  it("should generate /llms.txt with all registered calculator routes and standards", async () => {
    const res = await getLlmsTxt();
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/markdown");

    const text = await res.text();
    expect(text).toContain("# HVACLogic");
    expect(text).toContain("ASHRAE");
    expect(text).toContain("ACCA");
    expect(text).toContain("Sensible Heat Constant");

    // All registered calculator slugs should be listed
    for (const calc of calculatorRegistry) {
      expect(text).toContain(calc.route);
    }
  });

  it("should generate /llms-full.txt with complete engineering formulas", async () => {
    const res = await getLlmsFullTxt();
    expect(res.status).toBe(200);
    const text = await res.text();

    expect(text).toContain("SECTION 1: AIRFLOW & AIR DISTRIBUTION DYNAMICS");
    expect(text).toContain("Darcy-Weisbach");
    expect(text).toContain("Huebscher Equivalent Circular Diameter");
    expect(text).toContain("SECTION 2: COOLING LOADS & FIELD DIAGNOSTICS");
    expect(text).toContain("NIST REFPROP");
    expect(text).toContain("SECTION 3: HEATING SYSTEMS & HYDRONIC SIZING");
    expect(text).toContain("SECTION 4: BUILDING SCIENCE & THERMAL ENVELOPE");
  });
});
