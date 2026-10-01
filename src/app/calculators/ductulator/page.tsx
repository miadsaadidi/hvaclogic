import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { DuctulatorTool } from "@/components/calculator/tools/DuctulatorTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("ductulator")!;

export const metadata: Metadata = {
  title: calculator.seoTitle,
  description: calculator.metaDescription,
  alternates: {
    canonical: `https://hvaclogic.org/calculators/${calculator.id}`,
  },
  openGraph: {
    title: calculator.seoTitle,
    description: calculator.metaDescription,
    url: `https://hvaclogic.org/calculators/${calculator.id}`,
    siteName: "HVACLogic",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: calculator.seoTitle,
    description: calculator.metaDescription,
  },
};

export default function DuctulatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="To size an air duct, select the airflow volume (CFM) and target friction rate (commonly 0.08 to 0.10 in. wg per 100 ft as an example starting range for residential supply trunks). Use the equal friction duct-sizing correlation to calculate equivalent round diameter, and solve Huebscher's formula to find equivalent rectangular dimensions."
      formulaSnippet="D_e = (0.06855 * Q^1.9 / hf)^(1 / 5.02)  |  D_e = 1.30 * (a * b)^0.625 / (a + b)^0.25"
      authorityCitation="ASHRAE Handbook—Fundamentals (Duct Design) & SMACNA HVAC Duct Design Standard (References)"
      toolComponent={<DuctulatorTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <h2>How to Size HVAC Ductwork (Equal Friction Method)</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            The <strong>Equal Friction Method</strong> is a common duct-sizing methodology described in ACCA Manual D and ASHRAE Fundamentals. It selects duct dimensions to maintain a chosen friction-loss rate per unit length (such as in. wg per 100 ft) across straight sections, subject to available static pressure, total equivalent length, airflow requirements, duct geometry, fittings, and acoustic design limits.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Determine Design Airflow (CFM)</strong>: Calculate required airflow based on room sensible heat load (<code>CFM = BTU / (1.08 × ΔT)</code>) or equipment design airflow (e.g. 400 CFM/ton nominal rule-of-thumb baseline; always verify with equipment manufacturer blower performance curves and room load requirements).</li>
            <li><strong>Select Target Friction Rate</strong>: Common residential supply trunk starting ranges are <strong>0.08 to 0.10 in. wg per 100 ft</strong>, with return trunks often sized at 0.05 to 0.08 in. wg. Actual design friction rate depends on equipment available static pressure (ASP), total equivalent length (TEL), component pressure drops, and airflow needs, which can be evaluated with the <Link href="/calculators/duct-friction-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Duct Friction Loss &amp; TEL Sizer</Link>.</li>
            <li><strong>Calculate Equivalent Round Diameter (De)</strong>: Use the equal-friction duct-sizing correlation (<code>De = [0.06855 × Q^1.9 / hf]^(1/5.02)</code>) to determine the internal circular diameter carrying equivalent airflow at standard dry air density (0.075 lb/ft³). For flexible duct runouts, consider installation conditions and sag/compression via the <Link href="/calculators/flex-duct-cfm-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Flex Duct Sizing Chart</Link>.</li>
            <li><strong>Convert to Rectangular Fabrication Dimensions</strong>: Apply Huebscher&apos;s formula to determine rectangular trunk width and height. Lower aspect ratios (closer to 1:1 or 2:1) are generally preferred where practical because they reduce duct surface perimeter, material, and friction losses, while aspect ratios above 3:1 or 4:1 increase fabrication and pressure drop considerations per SMACNA design guidance.</li>
          </ol>

          <FormulaCard
            title="Duct Sizing Calculation Equations & Physical Derivations"
            formula="Round: D_e = [ (0.06855 * Q^1.9) / hf ]^(1 / 5.02)  |  Rectangular: D_e = 1.30 * (a * b)^0.625 / (a + b)^0.25"
            variables={[
              { symbol: "D_e", label: "Equivalent Round Diameter", description: "Internal circular duct diameter carrying equivalent airflow at the selected friction rate", unit: "inches" },
              { symbol: "Q", label: "Airflow Volume", description: "Volumetric airflow rate under standard air density conditions (0.075 lb/ft³)", unit: "CFM" },
              { symbol: "hf", label: "Friction Loss Rate", description: "Static pressure head loss per 100 linear feet of straight duct", unit: "in. wg / 100 ft" },
              { symbol: "a", label: "Rectangular Duct Width", description: "Longer or cross-sectional horizontal width dimension", unit: "inches" },
              { symbol: "b", label: "Rectangular Duct Height", description: "Shorter or vertical height dimension (often constrained by joist depth)", unit: "inches" },
              { symbol: "V", label: "Air Velocity", description: "Mean air stream velocity: V = Q * 144 / (pi * (D/2)^2)", unit: "FPM" },
            ]}
            notes="Equations assume standard dry air density (0.075 lb/ft³) at 70°F and 29.921 in. Hg barometric pressure with clean galvanized steel roughness (epsilon ≈ 0.0003 ft). Rectangular conversion is solved via Huebscher's formulation."
            sourceStandard="ASHRAE Handbook—Fundamentals (Ch. 21) & SMACNA HVAC Duct Construction Guidelines (References)"
          />

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Airflow &amp; Duct Design Workflows
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Size Flexible Runouts: <Link href="/calculators/flex-duct-cfm-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Flexible Duct CFM Chart</Link> — compare airflow capacities under modeled sag and installation compression levels.<br />
              • Compute System Friction Rate: <Link href="/calculators/duct-friction-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Duct Friction Loss &amp; TEL Sizer</Link> — calculate Available Static Pressure (ASP) and Total Equivalent Length.<br />
              • Determine Supply CFM: <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>HVAC CFM &amp; Airflow Sizer</Link> — compute volumetric requirements from sensible room loads.<br />
              • Hydro-Air &amp; Central Heating Plants: <Link href="/calculators/boiler-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Hydronic Boiler Sizer</Link> — size hot water supply loops for hydro-air duct heating coils and dual-fuel systems.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <>
          <h2>Example HVAC Duct Sizing Reference Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Example round and rectangular duct sizes calculated at a nominal residential supply friction rate of 0.08 in. wg per 100 ft (actual design dimensions depend on chosen friction rate, fittings, and physical space):
          </p>

          <div className="scenario-table" style={{ marginBottom: "2rem" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Airflow (CFM)</th>
                  <th scope="col">Example Application</th>
                  <th scope="col">Round Diameter (in)</th>
                  <th scope="col">Rectangular (8&quot; Height)</th>
                  <th scope="col">Rectangular (10&quot; Height)</th>
                  <th scope="col">Velocity (FPM)</th>
                  <th scope="col">Velocity Guide</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>150 CFM</strong></td>
                  <td>Branch Runout</td>
                  <td>6.5&quot;</td>
                  <td>6&quot; × 8&quot;</td>
                  <td>—</td>
                  <td>650 FPM</td>
                  <td><span style={{ color: "var(--accent-success)" }}>Quiet Target (&lt;700 FPM)</span></td>
                </tr>
                <tr>
                  <td><strong>400 CFM</strong></td>
                  <td>~1.0 Ton Nominal</td>
                  <td>9.0&quot;</td>
                  <td>10&quot; × 8&quot;</td>
                  <td>8&quot; × 10&quot;</td>
                  <td>905 FPM</td>
                  <td><span style={{ color: "var(--accent-warning)" }}>Standard Trunk Range</span></td>
                </tr>
                <tr>
                  <td><strong>600 CFM</strong></td>
                  <td>~1.5 Tons Nominal</td>
                  <td>10.7&quot;</td>
                  <td>14&quot; × 8&quot;</td>
                  <td>11&quot; × 10&quot;</td>
                  <td>960 FPM</td>
                  <td><span style={{ color: "var(--accent-warning)" }}>Standard Trunk Range</span></td>
                </tr>
                <tr>
                  <td><strong>800 CFM</strong></td>
                  <td>~2.0 Tons Nominal</td>
                  <td>12.0&quot;</td>
                  <td>18&quot; × 8&quot;</td>
                  <td>13&quot; × 10&quot;</td>
                  <td>1,018 FPM</td>
                  <td><span style={{ color: "var(--accent-warning)" }}>Standard Trunk Range</span></td>
                </tr>
                <tr>
                  <td><strong>1,000 CFM</strong></td>
                  <td>~2.5 Tons Nominal</td>
                  <td>13.2&quot;</td>
                  <td>22&quot; × 8&quot;</td>
                  <td>16&quot; × 10&quot;</td>
                  <td>1,050 FPM</td>
                  <td><span style={{ color: "var(--accent-warning)" }}>Standard Trunk Range</span></td>
                </tr>
                <tr>
                  <td><strong>1,200 CFM</strong></td>
                  <td>~3.0 Tons Nominal</td>
                  <td>14.2&quot;</td>
                  <td>26&quot; × 8&quot;</td>
                  <td>18&quot; × 10&quot;</td>
                  <td>1,087 FPM</td>
                  <td><span style={{ color: "var(--accent-warning)" }}>Standard Trunk Range</span></td>
                </tr>
                <tr>
                  <td><strong>1,600 CFM</strong></td>
                  <td>~4.0 Tons Nominal</td>
                  <td>16.0&quot;</td>
                  <td>34&quot; × 8&quot;</td>
                  <td>24&quot; × 10&quot;</td>
                  <td>1,145 FPM</td>
                  <td><span style={{ color: "var(--accent-danger)" }}>Elevated Velocity Range</span></td>
                </tr>
                <tr>
                  <td><strong>2,000 CFM</strong></td>
                  <td>~5.0 Tons Nominal</td>
                  <td>17.5&quot;</td>
                  <td>42&quot; × 8&quot;</td>
                  <td>30&quot; × 10&quot;</td>
                  <td>1,195 FPM</td>
                  <td><span style={{ color: "var(--accent-danger)" }}>Elevated Velocity Range</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Duct Air Velocity &amp; Acoustic Design Target Ranges</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Reference air velocity target ranges (FPM) by system application and target Noise Criteria (NC) heuristics. High velocity may increase airflow noise and dynamic pressure losses depending on duct geometry, fittings, terminal devices (grilles/diffusers), and acoustic design criteria:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Application / Duct Section</th>
                  <th scope="col">Target NC Range</th>
                  <th scope="col">Recommended Target (FPM)</th>
                  <th scope="col">Maximum Velocity Guideline (FPM)</th>
                  <th scope="col">Reference Source</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Residential Supply Branch Runout</strong></td>
                  <td>NC 25–30</td>
                  <td>400–600 FPM</td>
                  <td>700–900 FPM</td>
                  <td>ACCA Manual D (Reference Table)</td>
                </tr>
                <tr>
                  <td><strong>Residential Main Supply Trunk</strong></td>
                  <td>NC 25–30</td>
                  <td>700–900 FPM</td>
                  <td>1,000 FPM</td>
                  <td>ACCA Manual D / SMACNA Guidance</td>
                </tr>
                <tr>
                  <td><strong>Residential Return Air Trunk</strong></td>
                  <td>NC 25–30</td>
                  <td>500–700 FPM</td>
                  <td>800 FPM</td>
                  <td>ACCA Manual D (Reference Table)</td>
                </tr>
                <tr>
                  <td><strong>Commercial Supply Trunk (Office)</strong></td>
                  <td>NC 30–35</td>
                  <td>1,000–1,300 FPM</td>
                  <td>1,500 FPM</td>
                  <td>ASHRAE Fundamentals (Ch. 21)</td>
                </tr>
                <tr>
                  <td><strong>Commercial Main Riser / Shaft</strong></td>
                  <td>NC 35–40</td>
                  <td>1,500–1,800 FPM</td>
                  <td>2,000 FPM</td>
                  <td>SMACNA Duct Design Guidelines</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Sizing a 3-Ton Central AC Supply Trunk</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Sizing a main supply trunk for a nominal 3.0 Ton central heat pump system in a residential home. The cooling system supplies 1,200 CFM. Space between floor joists restricts the maximum duct height to 10 inches. Size the trunk assuming an example friction rate of 0.08 in. wg per 100 ft.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Calculate Equivalent Round Diameter (De)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              D_e = [ (0.06855 * 1200^1.9) / 0.08 ]^(1 / 5.02) = [ 48,385.7 / 0.08 ]^0.1992 = 14.22 inches
            </p>

            <p><strong>Step 2: Solve Rectangular Equivalence with Locked Height (b = 10&quot;)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              14.22 = 1.30 * (a * 10)^0.625 / (a + 10)^0.25  ==&gt;  Width &apos;a&apos; = 17.4 inches
            </p>
            <p style={{ color: "var(--ink-secondary)" }}>
              Round up to standard sheet metal fabrication sizing: <strong>18&quot; Width × 10&quot; Height</strong> (Aspect Ratio = 1.8:1, a practical ratio well within common design recommendations).
            </p>

            <p style={{ marginTop: "1rem" }}><strong>Step 3: Verify Velocity and Design Range</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Area = (18 * 10) / 144 = 1.25 sq ft  |  Velocity = 1200 / 1.25 = 960 FPM
            </p>
            <p style={{ color: "var(--ink-secondary)" }}>
              ✓ <strong>Observation:</strong> Velocity is 960 FPM, which falls within common residential supply trunk design targets (&le; 1,000 FPM). For final design, verify actual blower available static pressure and fitting equivalent lengths.
            </p>
          </div>
        </>
      }
    />
  );
}
