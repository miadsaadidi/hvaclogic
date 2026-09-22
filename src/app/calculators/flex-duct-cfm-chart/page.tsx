import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { FlexDuctChartTool } from "@/components/calculator/tools/FlexDuctChartTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("flex-duct-cfm-chart")!;

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

export default function FlexDuctCfmChartPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Flexible duct CFM capacity under standard code installation tension (4% compression) at a standard 0.08 in. wg friction rate: 4-inch = 30 CFM, 5-inch = 54 CFM, 6-inch = 84 CFM (a standard 6-inch flexible duct carries approximately 75 to 85 CFM), 7-inch = 126 CFM, 8-inch = 177 CFM, 9-inch = 242 CFM, 10-inch = 321 CFM, 12-inch = 521 CFM, 14-inch = 772 CFM, 16-inch = 1,097 CFM, 18-inch = 1,497 CFM, and 20-inch = 1,972 CFM. Under 15% longitudinal attic sag, delivered airflow drops by 22%."
      formulaSnippet="Q_flex = Q_stretched * C_sag | C_sag = (1.0 / F_multiplier)^0.54 | Support_Spacing_Max = 4_ft"
      authorityCitation="ASHRAE RP-1333 (Culp et al.), Air Diffusion Council (ADC) & ACCA Manual D"
      toolComponent={<FlexDuctChartTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <h2>How to Size Flexible HVAC Ductwork &amp; Account for Sag</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Flexible duct sizing requires derating nominal catalog airflow based on installation tension and sag. Unlike smooth galvanized sheet metal, flexible duct features a helical wire core surrounded by a flexible polymer membrane. When compressed, bunched, or allowed to sag between supports, internal convolutions disrupt laminar flow and generate substantial boundary-layer turbulence.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Determine Room Design Airflow (CFM)</strong>: Calculate the required cooling or heating airflow from whole-building Manual J heat gain loads or via the <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>HVAC CFM Sizer</Link>.
            </li>
            <li>
              <strong>Select Target Design Friction Rate</strong>: Standard residential supply runouts operate at <strong>0.08 to 0.10 in. wg per 100 ft</strong>. Quiet return runouts operate at <strong>0.05 to 0.08 in. wg</strong> to maintain low velocity. To compute your system-specific friction rate from blower external static pressure and fitting resistance, use the <Link href="/calculators/duct-friction-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Duct Friction Loss &amp; TEL Sizer</Link>.
            </li>
            <li>
              <strong>Apply ASHRAE RP-1333 Compression Deratings</strong>: Cross-reference empirical laboratory measurements from ASHRAE Research Project RP-1333:
              <ul>
                <li><strong>0% Compression (Fully Stretched)</strong>: Ideal laboratory test condition (C_sag = 1.00).</li>
                <li><strong>4% Compression (Standard Code Installation)</strong>: Properly pulled taut with straps every 4 feet (C_sag = 0.93, friction multiplier 1.15x).</li>
                <li><strong>15% Compression (Moderate Attic Sag)</strong>: Typical loose attic installation (C_sag = 0.78, 22% capacity loss, friction multiplier 1.60x).</li>
                <li><strong>30% Compression (Severe Sag / Choked)</strong>: Severe installation droop (C_sag = 0.65, 35% capacity loss, friction multiplier 2.20x).</li>
              </ul>
            </li>
            <li>
              <strong>Observe Installation Standards vs. Design Heuristics</strong>:
              <ul>
                <li><strong>Mandatory Building Code (IRC M1601.4.3)</strong>: Flexible ducts must be supported at maximum 4-foot intervals with support straps at least 1.5 inches wide.</li>
                <li><strong>ADC 5th Edition Standard</strong>: Maximum allowable sag between supports shall not exceed 0.5 inches per linear foot of span (4.2% droop).</li>
                <li><strong>ACCA Manual D / ENERGY STAR Guideline (Design Heuristic)</strong>: Limit flexible branch runouts to 14 to 25 feet maximum to avoid excessive cumulative friction losses.</li>
              </ul>
            </li>
          </ol>

          <FormulaCard
            title="Flexible Duct Airflow &amp; Sag Derating Governing Equations"
            formula="Q_{\text{flex}} = Q_{\text{stretched}} \times C_{\text{sag}} \quad | \quad \text{Velocity}_{\text{FPM}} = \frac{Q_{\text{flex}}}{A_{\text{duct}}}"
            variables={[
              { symbol: "Q_{\\text{flex}}", label: "Derated Field Airflow", description: "Delivered volumetric airflow in flexible duct accounting for core compression and sag", unit: "CFM" },
              { symbol: "Q_{\\text{stretched}}", label: "Fully Stretched Airflow", description: "Baseline catalog airflow at zero compression (100% factory tension per ADC standard)", unit: "CFM" },
              { symbol: "C_{\\text{sag}}", label: "Capacity Derate Factor", description: "Fractional capacity multiplier: 1.00 (0% sag), 0.93 (4% sag), 0.78 (15% sag), 0.65 (30% sag)", unit: "Multiplier" },
              { symbol: "A_{\\text{duct}}", label: "Cross-Sectional Area", description: "Internal duct cross-sectional area: \\pi \\times (D/24)^2", unit: "sq ft" },
              { symbol: "\\text{Velocity}_{\\text{FPM}}", label: "Duct Air Velocity", description: "Airflow velocity across duct cross-section (recommended \\le 700–900 FPM for supply branches)", unit: "FPM" },
            ]}
            notes="Flexible duct runs should be kept as short and straight as possible. For main trunk lines and extended runs, use rigid galvanized sheet metal sized with the Digital Ductulator."
            sourceStandard="ASHRAE RP-1333 (Culp et al., Texas A&M ESL), ADC 5th Edition & ACCA Manual D"
          />

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Downstream Sizing &amp; Design Workflows
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Size Rigid Metal Trunks: <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> — compare flexible duct runouts with equivalent round and rectangular sheet metal trunks.<br />
              • Compute System Static &amp; TEL: <Link href="/calculators/duct-friction-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Duct Friction Loss &amp; TEL Sizer</Link> — determine available static pressure and exact design friction rate.<br />
              • Calculate Sensible Room Airflow: <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>HVAC CFM &amp; Airflow Sizer</Link> — determine required supply CFM from room heat load and coil delta-T.<br />
              • Ducted Hydro-Air Coil Integration: <Link href="/calculators/boiler-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Hydronic Boiler Sizer</Link> — evaluate boiler heating input and water-to-air fan coil delivery capacity for ducted hydronic systems.<br />
              • Explore Air Distribution Pillar: <Link href="/airflow-ducts" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Airflow &amp; Duct Sizing Hub</Link> — access the full suite of duct design tools and standards.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <>
          <h2>Flexible Duct vs. Rigid Sheet Metal Airflow Comparison Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Direct comparison of delivered airflow capacity (CFM) between smooth rigid galvanized sheet metal (Colebrook roughness &epsilon; = 0.0003 ft) and flexible ductwork across standard diameters at 0.08&quot; and 0.10&quot; WG friction rates:
          </p>

          <div className="scenario-table" style={{ marginBottom: "2rem" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Diameter</th>
                  <th scope="col">Rigid Metal (0.08&quot; WG)</th>
                  <th scope="col">Rigid Metal (0.10&quot; WG)</th>
                  <th scope="col">Stretched Flex (0.10&quot; WG)</th>
                  <th scope="col">Code Flex 4% Sag (0.10&quot; WG)</th>
                  <th scope="col">Attic Flex 15% Sag (0.10&quot; WG)</th>
                  <th scope="col">Airflow Reduction vs Metal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>6&quot; Round</strong></td>
                  <td>98 CFM</td>
                  <td>111 CFM</td>
                  <td>105 CFM</td>
                  <td>98 CFM</td>
                  <td>82 CFM</td>
                  <td>-12% to -26%</td>
                </tr>
                <tr>
                  <td><strong>8&quot; Round</strong></td>
                  <td>205 CFM</td>
                  <td>232 CFM</td>
                  <td>220 CFM</td>
                  <td>205 CFM</td>
                  <td>172 CFM</td>
                  <td>-12% to -26%</td>
                </tr>
                <tr>
                  <td><strong>10&quot; Round</strong></td>
                  <td>367 CFM</td>
                  <td>416 CFM</td>
                  <td>395 CFM</td>
                  <td>367 CFM</td>
                  <td>308 CFM</td>
                  <td>-12% to -26%</td>
                </tr>
                <tr>
                  <td><strong>12&quot; Round</strong></td>
                  <td>596 CFM</td>
                  <td>675 CFM</td>
                  <td>640 CFM</td>
                  <td>595 CFM</td>
                  <td>499 CFM</td>
                  <td>-12% to -26%</td>
                </tr>
                <tr>
                  <td><strong>14&quot; Round</strong></td>
                  <td>884 CFM</td>
                  <td>1,001 CFM</td>
                  <td>950 CFM</td>
                  <td>884 CFM</td>
                  <td>741 CFM</td>
                  <td>-12% to -26%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Flexible Duct CFM Sizing &amp; Friction Rate Reference Matrix (4&quot; to 20&quot;)</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Airflow capacity (CFM) across all 12 standard flexible duct diameters under code-compliant 4% installed tension (C_sag = 0.93), comparing quiet return (0.05&quot; WG), standard supply (0.08&quot; WG), and high-velocity (0.10&quot; WG) friction rates:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Flex Diameter</th>
                  <th scope="col">Cross-Section Area</th>
                  <th scope="col">0.05&quot; WG (Quiet Return)</th>
                  <th scope="col">0.08&quot; WG (Standard Supply)</th>
                  <th scope="col">0.10&quot; WG (High Velocity)</th>
                  <th scope="col">Typical Residential Application</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>4&quot; Flex Duct</strong></td>
                  <td>0.087 sq ft</td>
                  <td>23 CFM</td>
                  <td>30 CFM</td>
                  <td>35 CFM</td>
                  <td>Small Powder Room / Half Bath (&lt;50 sq ft)</td>
                </tr>
                <tr>
                  <td><strong>5&quot; Flex Duct</strong></td>
                  <td>0.136 sq ft</td>
                  <td>42 CFM</td>
                  <td>54 CFM</td>
                  <td>62 CFM</td>
                  <td>Walk-in Closet / Small Laundry (50–100 sq ft)</td>
                </tr>
                <tr>
                  <td><strong>6&quot; Flex Duct</strong></td>
                  <td>0.196 sq ft</td>
                  <td>65 CFM</td>
                  <td>84 CFM</td>
                  <td>98 CFM</td>
                  <td>Standard Bedroom / Home Office (100–160 sq ft)</td>
                </tr>
                <tr>
                  <td><strong>7&quot; Flex Duct</strong></td>
                  <td>0.267 sq ft</td>
                  <td>98 CFM</td>
                  <td>126 CFM</td>
                  <td>144 CFM</td>
                  <td>Large Bedroom / Guest Room (160–220 sq ft)</td>
                </tr>
                <tr>
                  <td><strong>8&quot; Flex Duct</strong></td>
                  <td>0.349 sq ft</td>
                  <td>140 CFM</td>
                  <td>177 CFM</td>
                  <td>205 CFM</td>
                  <td>Master Bedroom / Open Dining (220–320 sq ft)</td>
                </tr>
                <tr>
                  <td><strong>9&quot; Flex Duct</strong></td>
                  <td>0.442 sq ft</td>
                  <td>191 CFM</td>
                  <td>242 CFM</td>
                  <td>279 CFM</td>
                  <td>Large Living Room / Kitchen (320–420 sq ft)</td>
                </tr>
                <tr>
                  <td><strong>10&quot; Flex Duct</strong></td>
                  <td>0.545 sq ft</td>
                  <td>256 CFM</td>
                  <td>321 CFM</td>
                  <td>367 CFM</td>
                  <td>Open Concept Great Room (420–550 sq ft)</td>
                </tr>
                <tr>
                  <td><strong>12&quot; Flex Duct</strong></td>
                  <td>0.785 sq ft</td>
                  <td>409 CFM</td>
                  <td>521 CFM</td>
                  <td>595 CFM</td>
                  <td>Branch Trunk / 400–500 CFM Zone (1.0 to 1.5 Tons)</td>
                </tr>
                <tr>
                  <td><strong>14&quot; Flex Duct</strong></td>
                  <td>1.069 sq ft</td>
                  <td>614 CFM</td>
                  <td>772 CFM</td>
                  <td>884 CFM</td>
                  <td>Main Supply Trunk / Return (2.0 Tons AC)</td>
                </tr>
                <tr>
                  <td><strong>16&quot; Flex Duct</strong></td>
                  <td>1.396 sq ft</td>
                  <td>865 CFM</td>
                  <td>1,097 CFM</td>
                  <td>1,246 CFM</td>
                  <td>Central Return Air Trunk (3.0 Tons AC)</td>
                </tr>
                <tr>
                  <td><strong>18&quot; Flex Duct</strong></td>
                  <td>1.767 sq ft</td>
                  <td>1,190 CFM</td>
                  <td>1,497 CFM</td>
                  <td>1,702 CFM</td>
                  <td>Main System Trunk (4.0 to 5.0 Tons AC)</td>
                </tr>
                <tr>
                  <td><strong>20&quot; Flex Duct</strong></td>
                  <td>2.182 sq ft</td>
                  <td>1,562 CFM</td>
                  <td>1,972 CFM</td>
                  <td>2,241 CFM</td>
                  <td>Central Return Air Drop (5.0 Tons AC)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example 1: Sizing an 8-Inch Flexible Duct Bedroom Branch</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Sizing a flexible supply branch duct for a 200 sq ft master bedroom requiring <strong>150 CFM</strong> of cooling airflow at a standard 0.08 in. wg friction rate.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)", marginBottom: "1.5rem" }}>
            <p><strong>Step 1: Compare Nominal Diameters at 0.08 in. wg Friction (4% Code Tension)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              7-inch Flex = 126 CFM (Undersized: delivers 16% less airflow than required, leading to hot spots)
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              8-inch Flex = 177 CFM at 4% tension (Sufficient capacity to deliver 150 CFM with modest damper throttling)
            </p>

            <p><strong>Step 2: Acoustic Velocity Check per ACCA Manual D Table A1-1</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Area = pi * (8/24)^2 = 0.349 sq ft  |  Velocity = 150 CFM / 0.349 sq ft = 430 FPM
            </p>

            <p><strong>Step 3: Installation &amp; Hanging Verification</strong></p>
            <p style={{ color: "var(--ink-secondary)" }}>
              ✓ <strong>Conclusion:</strong> An 8-inch flexible duct operating at 430 FPM provides whisper-quiet airflow well below the ACCA NC-25 bedroom noise threshold (700 FPM maximum). Connect to the <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> to check equivalent rigid sheet metal sizing.
            </p>
          </div>

          <h2>Worked Example 2: Sizing a 400 CFM Branch Line &amp; Evaluating 15% Attic Sag Derating</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Sizing a flexible duct runout for a 1-Ton multi-room zone requiring <strong>400 CFM</strong> of airflow at 0.08 in. wg friction rate, and calculating the risk of attic sag.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Determine Required Diameter under Code Installation (4% Sag)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              10-inch Flex at 0.08&quot; WG = 321 CFM (Undersized by 79 CFM / 20% deficit)
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              12-inch Flex at 0.08&quot; WG = 521 CFM (Sufficient capacity; delivers 400 CFM at low friction and ~510 FPM)
            </p>

            <p><strong>Step 2: Quantify Airflow Penalty if Installed with 15% Attic Sag</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              ASHRAE RP-1333 15% Sag Derate Factor = 0.78  |  Friction Multiplier = 1.60x
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              12-inch Flex Capacity with 15% Sag = 521 CFM * 0.78 = 406 CFM (Just meets 400 CFM requirement)
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              If 10-inch Flex was installed with 15% Sag = 321 CFM * 0.78 = 250 CFM (Severe 37.5% airflow restriction)
            </p>

            <p><strong>Step 3: Practical Installation Rule</strong></p>
            <p style={{ color: "var(--ink-secondary)" }}>
              ✓ <strong>Conclusion:</strong> Sizing for 400 CFM requires a <strong>12-inch flexible duct</strong>. To ensure full airflow delivery without excessive static pressure penalties, install wide hanger supports every 4 feet to prevent 15% longitudinal sag.
            </p>
          </div>
        </>
      }
    />
  );
}
