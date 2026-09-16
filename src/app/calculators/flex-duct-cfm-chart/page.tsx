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
      directAnswer="Flexible duct CFM capacity at standard 0.08 in. wg friction rate (proper 4% tension): 4-inch = 35 CFM, 5-inch = 55 CFM, 6-inch = 80 CFM, 7-inch = 115 CFM, 8-inch = 160 CFM, 10-inch = 290 CFM, 12-inch = 460 CFM, 14-inch = 690 CFM, 16-inch = 960 CFM, 18-inch = 1,300 CFM, and 20-inch = 1,720 CFM. Under 15% longitudinal attic sag, subtract 22% delivered airflow."
      formulaSnippet="Q_flex = Q_galv * (1 / (Sag_Friction_Multiplier)^0.54) | Max_Hanger_Spacing = 4_ft"
      authorityCitation="ASHRAE RP-1333 (Culp et al.), Air Diffusion Council (ADC) & ACCA Manual D"
      toolComponent={<FlexDuctChartTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <h2>How to Size Flexible HVAC Ductwork &amp; Account for Sag</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Flexible duct sizing requires derating nominal catalog airflow based on installation tension and sag. Unlike rigid sheet metal, flexible duct features a helical wire core that generates substantial boundary-layer turbulence when compressed or bunched.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Determine Room Design Airflow (CFM)</strong>: Calculate the required cooling or heating airflow from sensible heat load calculations or the <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>HVAC CFM Sizer</Link>.</li>
            <li><strong>Select Target Friction Rate</strong>: Standard residential supply runouts operate at <strong>0.08 to 0.10 in. wg per 100 ft</strong>. Quiet return runouts operate at 0.05 to 0.08 in. wg.</li>
            <li><strong>Apply ASHRAE RP-1333 Sag Multipliers</strong>: Cross-reference empirical laboratory measurements from ASHRAE Research Project RP-1333. A 15% longitudinal sag increases fluid friction factor by 1.60×, reducing delivered airflow by 22%.</li>
            <li><strong>Support and Clamp Connections</strong>: Install support hanger straps (minimum 1.5 inches wide) at maximum 4-foot intervals, keep maximum sag between supports under 0.5 inches per foot, and seal outer vapor barrier with UL 181-rated mastic.</li>
          </ol>

          <FormulaCard
            title="Flexible Duct Airflow &amp; Sag Derating Fluid Equations"
            formula="Q_{\text{flex}} = Q_{\text{straight}} \cdot C_{\text{sag}} \quad | \quad C_{\text{sag}} = \left(\frac{1.0}{F_{\text{multiplier}}}\right)^{0.54}"
            variables={[
              { symbol: "Q_{\\text{flex}}", label: "Derated Field Airflow", description: "Delivered volumetric airflow in flexible duct accounting for core sag and compression", unit: "CFM" },
              { symbol: "Q_{\\text{straight}}", label: "Fully Stretched Airflow", description: "Rated catalog airflow at zero compression (100% factory tension)", unit: "CFM" },
              { symbol: "F_{\\text{multiplier}}", label: "RP-1333 Friction Factor", description: "Empirical friction penalty: 1.00 (0% sag), 1.15 (4% sag), 1.60 (15% sag), 2.20 (30% sag)", unit: "Dimensionless" },
              { symbol: "C_{\\text{sag}}", label: "Capacity Derate Factor", description: "Fractional capacity multiplier derived from Darcy-Weisbach flow exponent", unit: "Multiplier" },
            ]}
            notes="Flexible duct runs should be kept as short and straight as possible (recommended max 14 ft per run). For main trunk lines, use rigid sheet metal sized via the Digital Ductulator."
            sourceStandard="ASHRAE Research Project RP-1333 (Culp et al., Texas A&M ESL), ADC 5th Edition & SMACNA"
          />
        </>
      }
      comparisonTableSection={
        <>
          <h2>Flexible Duct CFM Sizing &amp; Friction Rate Reference Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Airflow capacity (CFM) across standard flexible duct diameters (4&quot; to 14&quot;) under code-compliant 4% installed tension:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Flex Diameter</th>
                  <th scope="col">0.05 in.wg (Quiet Return)</th>
                  <th scope="col">0.08 in.wg (Standard Supply)</th>
                  <th scope="col">0.10 in.wg (High Velocity)</th>
                  <th scope="col">Typical Room Application</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>4&quot; Flex Duct</strong></td>
                  <td>23 CFM</td>
                  <td>30 CFM</td>
                  <td>35 CFM</td>
                  <td>Small Powder Room / Half Bath</td>
                </tr>
                <tr>
                  <td><strong>5&quot; Flex Duct</strong></td>
                  <td>42 CFM</td>
                  <td>54 CFM</td>
                  <td>62 CFM</td>
                  <td>Walk-in Closet / Small Laundry</td>
                </tr>
                <tr>
                  <td><strong>6&quot; Flex Duct</strong></td>
                  <td>65 CFM</td>
                  <td>84 CFM</td>
                  <td>98 CFM</td>
                  <td>Standard Bedroom (120–160 sq ft)</td>
                </tr>
                <tr>
                  <td><strong>7&quot; Flex Duct</strong></td>
                  <td>98 CFM</td>
                  <td>126 CFM</td>
                  <td>144 CFM</td>
                  <td>Large Bedroom / Home Office</td>
                </tr>
                <tr>
                  <td><strong>8&quot; Flex Duct</strong></td>
                  <td>140 CFM</td>
                  <td>177 CFM</td>
                  <td>205 CFM</td>
                  <td>Master Bedroom / Dining Room</td>
                </tr>
                <tr>
                  <td><strong>10&quot; Flex Duct</strong></td>
                  <td>256 CFM</td>
                  <td>321 CFM</td>
                  <td>367 CFM</td>
                  <td>Great Room / Open Concept Living</td>
                </tr>
                <tr>
                  <td><strong>12&quot; Flex Duct</strong></td>
                  <td>409 CFM</td>
                  <td>521 CFM</td>
                  <td>595 CFM</td>
                  <td>Branch Trunk (1.0 to 1.5 Tons)</td>
                </tr>
                <tr>
                  <td><strong>14&quot; Flex Duct</strong></td>
                  <td>614 CFM</td>
                  <td>772 CFM</td>
                  <td>884 CFM</td>
                  <td>Main Return Drop (2.0 Tons)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Sizing an 8-Inch Flexible Duct Bedroom Branch</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Sizing a flexible supply branch duct for a 200 sq ft master bedroom requiring <strong>150 CFM</strong> of cooling airflow at a standard 0.08 in. wg friction rate.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Compare Nominal Diameters at 0.08 in. wg Friction</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              7-inch Flex = 126 CFM (Undersized: would choke airflow by 16% and cause room comfort issues)
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              8-inch Flex = 177 CFM at 4% code tension (Sufficient capacity to deliver 150 CFM)
            </p>

            <p><strong>Step 2: Acoustic Velocity Check</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Area = pi * (4/12)^2 = 0.349 sq ft  |  Velocity = 150 CFM / 0.349 sq ft = 430 FPM
            </p>

            <p><strong>Step 3: Installation &amp; Hanging Verification</strong></p>
            <p style={{ color: "var(--ink-secondary)" }}>
              ✓ <strong>Conclusion:</strong> 8-inch flexible duct operating at 430 FPM provides whisper-quiet airflow below ACCA NC-25 bedroom noise criteria. Connect to the <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> or <Link href="/calculators/duct-friction-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Duct Friction Loss Sizer</Link> for total trunk equivalent length analysis.
            </p>
          </div>
        </>
      }
    />
  );
}
