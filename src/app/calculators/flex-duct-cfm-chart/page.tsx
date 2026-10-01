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
      directAnswer="Flexible duct CFM capacity under a 4% modeled compression reference baseline at a standard 0.08 in. wg per 100 ft friction rate: 4-inch = 30 CFM, 5-inch = 54 CFM, 6-inch = 84 CFM (carrying ~84 CFM at 0.08 and 98 CFM at 0.10), 7-inch = 126 CFM, 8-inch = 177 CFM (and 205 CFM at 0.10), 9-inch = 242 CFM, 10-inch = 321 CFM, 12-inch = 521 CFM, 14-inch = 772 CFM, 16-inch = 1,097 CFM, 18-inch = 1,497 CFM, and 20-inch = 1,972 CFM. Under a modeled 15% longitudinal attic sag, delivered airflow capacity is reduced by approximately 22% compared to the fully stretched manufacturer baseline."
      formulaSnippet="Q_flex = Q_stretched * C_sag | C_sag = (1.0 / F_multiplier)^0.54 | Support_Spacing_Max = 4_ft (IRC M1601.4.3)"
      authorityCitation="ASHRAE Research Project RP-1333 (Texas A&M ESL), Air Diffusion Council (ADC 5th Ed) & ACCA Manual D (References)"
      toolComponent={<FlexDuctChartTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <h2>How to Size Flexible HVAC Ductwork &amp; Account for Sag</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Flexible duct sizing requires accounting for installation tension, sag, and core compression. Unlike smooth galvanized sheet metal, flexible duct features a helical wire core surrounded by a polymer membrane. When compressed, bunched, or allowed to sag between supports, internal convolutions increase friction losses and boundary-layer resistance.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Determine Room Design Airflow (CFM)</strong>: Calculate required heating or cooling airflow from room-by-room Manual J heat load calculations or the <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>HVAC CFM Sizer</Link>. Note: Floor area rules-of-thumb do not replace room-by-room load calculations.
            </li>
            <li>
              <strong>Select Target Design Friction Rate</strong>: Standard residential supply runouts operate at <strong>0.08 to 0.10 in. wg per 100 ft</strong>. Quiet return runouts operate at <strong>0.05 to 0.08 in. wg</strong> to maintain lower velocities. To compute your system-specific friction rate from blower available static pressure (ASP) and total equivalent length (TEL), use the <Link href="/calculators/duct-friction-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Duct Friction Loss &amp; TEL Sizer</Link>.
            </li>
            <li>
              <strong>Apply Installation Compression &amp; Sag Deratings</strong>:
              <ul>
                <li><strong>0% Compression (Fully Stretched Baseline)</strong>: Manufacturer catalog test condition with duct pulled 100% straight and taut (C_sag = 1.00).</li>
                <li><strong>4% Compression (Reference Installed Baseline)</strong>: Reference installation condition representing taut field installation with proper support spacing (C_sag = 0.93, 1.15× friction multiplier).</li>
                <li><strong>15% Compression (Modeled Moderate Attic Sag)</strong>: Modeled loose installation with moderate sag between supports (C_sag = 0.78, ~22% capacity reduction, 1.60× friction multiplier).</li>
                <li><strong>30% Compression (Modeled Severe Sag / Choked)</strong>: Modeled severe installation droop or bunching (C_sag = 0.65, ~35% capacity reduction, 2.20× friction multiplier).</li>
              </ul>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                <em>Modeling Note:</em> Friction multipliers (1.15×, 1.60×, 2.20×) reflect empirical laboratory measurements from ASHRAE Research Project RP-1333 (Culp et al., Texas A&amp;M ESL). Airflow capacity multipliers (C_sag = [1/F_multiplier]^0.54) represent HVACLogic modeled values derived from the Darcy-Weisbach flow relation under fixed available static pressure drop.
              </p>
            </li>
            <li>
              <strong>Reference Installation Standards &amp; Guidelines</strong>:
              <ul>
                <li><strong>Mandatory Building Code (IRC Section M1601.4.3)</strong>: Flexible ducts must be supported at maximum 4-foot intervals with support straps at least 1.5 inches wide.</li>
                <li><strong>ADC 5th Edition Standard</strong>: Maximum allowable sag between supports shall not exceed 0.5 inches per linear foot of span (~4.2% droop).</li>
                <li><strong>ACCA Manual D Design Heuristic</strong>: Keep flexible branch runouts as short and straight as practical (commonly under 15 to 25 feet where feasible) to prevent excessive cumulative friction losses.</li>
              </ul>
            </li>
          </ol>

          <FormulaCard
            title="Flexible Duct Airflow &amp; Sag Modeling Equations"
            formula="Q_{\text{flex}} = Q_{\text{stretched}} \times C_{\text{sag}} \quad | \quad C_{\text{sag}} = \left(\frac{1}{F_{\text{multiplier}}}\right)^{0.54} \quad | \quad \text{Velocity}_{\text{FPM}} = \frac{Q_{\text{flex}}}{A_{\text{duct}}}"
            variables={[
              { symbol: "Q_{\\text{flex}}", label: "Derated Modeled Airflow", description: "Delivered volumetric airflow in flexible duct accounting for core compression and sag", unit: "CFM" },
              { symbol: "Q_{\\text{stretched}}", label: "Fully Stretched Baseline Airflow", description: "Baseline catalog airflow at 0% compression (100% factory tension per ADC standard charts)", unit: "CFM" },
              { symbol: "C_{\\text{sag}}", label: "Capacity Derate Factor", description: "HVACLogic modeled capacity multiplier: 1.00 (0% sag), 0.93 (4% baseline), 0.78 (15% sag), 0.65 (30% sag)", unit: "Multiplier" },
              { symbol: "F_{\\text{multiplier}}", label: "Friction Loss Multiplier", description: "Empirical friction factor increase from ASHRAE RP-1333: 1.00 (0%), 1.15 (4%), 1.60 (15%), 2.20 (30%)", unit: "Multiplier" },
              { symbol: "A_{\\text{duct}}", label: "Internal Cross-Section Area", description: "Internal duct cross-sectional area: \\pi \\times (D/24)^2", unit: "sq ft" },
              { symbol: "\\text{Velocity}_{\\text{FPM}}", label: "Duct Air Velocity", description: "Mean airflow velocity across duct cross-section (recommended \\le 700–900 FPM for supply branches)", unit: "FPM" },
            ]}
            notes="Friction multipliers derive from ASHRAE RP-1333 laboratory test data. Airflow capacity multipliers represent an HVACLogic model under constant pressure drop assumptions. Flexible duct runs should be kept short, straight, and properly supported. Main trunks should use rigid sheet metal sized with the Digital Ductulator."
            sourceStandard="ASHRAE RP-1333 Research Project (Culp et al.), ADC 5th Edition & ACCA Manual D (References)"
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
            Direct comparison of delivered airflow capacity (CFM) between smooth rigid galvanized sheet metal and flexible ductwork across standard diameters at 0.08&quot; and 0.10&quot; WG friction rates:
          </p>

          <div className="scenario-table" style={{ marginBottom: "2rem" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Diameter</th>
                  <th scope="col">Rigid Metal (0.08&quot; WG)</th>
                  <th scope="col">Rigid Metal (0.10&quot; WG)</th>
                  <th scope="col">Stretched Flex (0.10&quot; WG)</th>
                  <th scope="col">Flex 4% Baseline (0.10&quot; WG)</th>
                  <th scope="col">Flex 15% Sag (0.10&quot; WG)</th>
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
            Airflow capacity (CFM) across all 12 standard flexible duct diameters under the reference 4% installed compression baseline (C_sag = 0.93), comparing low-resistance return (0.05&quot; WG), standard supply (0.08&quot; WG), and high-velocity (0.10&quot; WG) friction rates:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Flex Diameter</th>
                  <th scope="col">Cross-Section Area</th>
                  <th scope="col">0.05&quot; WG (Low Resistance)</th>
                  <th scope="col">0.08&quot; WG (Standard Supply)</th>
                  <th scope="col">0.10&quot; WG (High Velocity)</th>
                  <th scope="col">Airflow Application Guide</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>4&quot; Flex Duct</strong></td>
                  <td>0.087 sq ft</td>
                  <td>23 CFM</td>
                  <td>30 CFM</td>
                  <td>35 CFM</td>
                  <td>Small Exhaust / Low Airflow Branch (&lt;35 CFM)</td>
                </tr>
                <tr>
                  <td><strong>5&quot; Flex Duct</strong></td>
                  <td>0.136 sq ft</td>
                  <td>42 CFM</td>
                  <td>54 CFM</td>
                  <td>62 CFM</td>
                  <td>Small Supply Branch (40–60 CFM)</td>
                </tr>
                <tr>
                  <td><strong>6&quot; Flex Duct</strong></td>
                  <td>0.196 sq ft</td>
                  <td>65 CFM</td>
                  <td>84 CFM</td>
                  <td>98 CFM</td>
                  <td>Standard Supply Branch (65–100 CFM)</td>
                </tr>
                <tr>
                  <td><strong>7&quot; Flex Duct</strong></td>
                  <td>0.267 sq ft</td>
                  <td>98 CFM</td>
                  <td>126 CFM</td>
                  <td>144 CFM</td>
                  <td>Medium Supply Branch (100–145 CFM)</td>
                </tr>
                <tr>
                  <td><strong>8&quot; Flex Duct</strong></td>
                  <td>0.349 sq ft</td>
                  <td>140 CFM</td>
                  <td>177 CFM</td>
                  <td>205 CFM</td>
                  <td>Medium-Large Supply Branch (145–205 CFM)</td>
                </tr>
                <tr>
                  <td><strong>9&quot; Flex Duct</strong></td>
                  <td>0.442 sq ft</td>
                  <td>191 CFM</td>
                  <td>242 CFM</td>
                  <td>279 CFM</td>
                  <td>Large Supply Branch (200–280 CFM)</td>
                </tr>
                <tr>
                  <td><strong>10&quot; Flex Duct</strong></td>
                  <td>0.545 sq ft</td>
                  <td>256 CFM</td>
                  <td>321 CFM</td>
                  <td>367 CFM</td>
                  <td>High Airflow Branch (280–370 CFM)</td>
                </tr>
                <tr>
                  <td><strong>12&quot; Flex Duct</strong></td>
                  <td>0.785 sq ft</td>
                  <td>409 CFM</td>
                  <td>521 CFM</td>
                  <td>595 CFM</td>
                  <td>Zone Trunk / Branch Trunk (400–600 CFM)</td>
                </tr>
                <tr>
                  <td><strong>14&quot; Flex Duct</strong></td>
                  <td>1.069 sq ft</td>
                  <td>614 CFM</td>
                  <td>772 CFM</td>
                  <td>884 CFM</td>
                  <td>Main Trunk / Return Run (600–900 CFM)</td>
                </tr>
                <tr>
                  <td><strong>16&quot; Flex Duct</strong></td>
                  <td>1.396 sq ft</td>
                  <td>865 CFM</td>
                  <td>1,097 CFM</td>
                  <td>1,246 CFM</td>
                  <td>Central Return / Major Trunk (900–1,250 CFM)</td>
                </tr>
                <tr>
                  <td><strong>18&quot; Flex Duct</strong></td>
                  <td>1.767 sq ft</td>
                  <td>1,190 CFM</td>
                  <td>1,497 CFM</td>
                  <td>1,702 CFM</td>
                  <td>Main Return Drop / System Trunk (1,250–1,700 CFM)</td>
                </tr>
                <tr>
                  <td><strong>20&quot; Flex Duct</strong></td>
                  <td>2.182 sq ft</td>
                  <td>1,562 CFM</td>
                  <td>1,972 CFM</td>
                  <td>2,241 CFM</td>
                  <td>Large Central Return Drop (1,700–2,250 CFM)</td>
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
            <strong>Scenario:</strong> Sizing a flexible supply branch duct for a room requiring <strong>150 CFM</strong> of design cooling airflow at a standard 0.08 in. wg per 100 ft friction rate.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)", marginBottom: "1.5rem" }}>
            <p><strong>Step 1: Compare Nominal Diameters at 0.08 in. wg Friction (4% Reference Baseline)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              7-inch Flex = 126 CFM (Undersized: delivers ~16% less airflow than required)
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              8-inch Flex = 177 CFM at 4% baseline (Sufficient capacity to deliver 150 CFM with modest damper adjustment)
            </p>

            <p><strong>Step 2: Air Velocity Check per ACCA Manual D Guidelines</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Area = \pi \times (8/24)^2 = 0.349 sq ft  |  Velocity = 150 CFM / 0.349 sq ft = 430 FPM
            </p>

            <p><strong>Step 3: Installation &amp; Hanging Verification</strong></p>
            <p style={{ color: "var(--ink-secondary)" }}>
              ✓ <strong>Observation:</strong> An 8-inch flexible duct operating at 430 FPM provides quiet airflow below typical residential supply branch noise targets (700 FPM guideline). Connect to the <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> to check equivalent rigid sheet metal sizing.
            </p>
          </div>

          <h2>Worked Example 2: Sizing a 400 CFM Branch Line &amp; Evaluating 15% Attic Sag Derating</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Sizing a flexible duct runout for a zone requiring <strong>400 CFM</strong> of airflow at a 0.08 in. wg friction rate, and calculating the modeled impact of 15% installation sag.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Determine Required Diameter under 4% Reference Baseline</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              10-inch Flex at 0.08&quot; WG = 321 CFM (Undersized by 79 CFM / ~20% deficit)
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              12-inch Flex at 0.08&quot; WG = 521 CFM (Sufficient capacity; delivers 400 CFM at low friction and ~510 FPM)
            </p>

            <p><strong>Step 2: Evaluate Airflow Capacity if Installed with Modeled 15% Attic Sag</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              12-inch Baseline Stretched Capacity = 560 CFM  |  15% Sag Derate Factor (C_sag) = 0.78
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              12-inch Flex Capacity with 15% Sag = 560 CFM \times 0.78 = 437 CFM (Still satisfies the 400 CFM requirement)
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              If 10-inch Flex was installed with 15% Sag = 345 CFM \times 0.78 = 269 CFM (Severe 33% airflow restriction below 400 CFM)
            </p>

            <p><strong>Step 3: Practical Installation Rule</strong></p>
            <p style={{ color: "var(--ink-secondary)" }}>
              ✓ <strong>Observation:</strong> Sizing for 400 CFM under standard friction typically requires a <strong>12-inch flexible duct</strong> to provide adequate airflow and tolerate potential installation sag. Supporting flexible duct at 4-foot intervals per IRC Section M1601.4.3 helps prevent excessive longitudinal sag.
            </p>
          </div>
        </>
      }
    />
  );
}
