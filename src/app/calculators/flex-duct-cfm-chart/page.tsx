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
      directAnswer="A standard 6-inch flexible duct carries approximately 75 to 85 CFM at a 0.08 to 0.10 in. wg friction rate under proper installation tension. An 8-inch flex duct delivers 150 to 190 CFM, while a 10-inch flex duct handles 300 to 345 CFM. Unstretched flex duct with 15% attic sag loses approximately 22% of its rated airflow capacity."
      formulaSnippet="Q_flex = Q_galv * (1 / (Sag_Friction_Multiplier)^0.54) | Max_Hanger_Spacing = 4_ft"
      authorityCitation="Air Diffusion Council (ADC) Flexible Duct Performance & ACCA Manual D"
      toolComponent={<FlexDuctChartTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Flexible Duct Airflow &amp; Sag Derating Fluid Equations"
              formula="Q_flex = Q_straight * C_sag | C_sag = (1.0 / F_multiplier)^0.54"
              variables={[
                { symbol: "Q_flex", label: "Derated Field Airflow", description: "Delivered volumetric airflow in flexible duct accounting for core sag and compression", unit: "CFM" },
                { symbol: "Q_straight", label: "Fully Stretched Airflow", description: "Rated catalog airflow at zero compression (100% factory tension)", unit: "CFM" },
                { symbol: "F_multiplier", label: "ADC Friction Factor", description: "Empirical friction penalty (1.00 for 0% sag, 1.15 for 4% sag, 1.60 for 15% sag, 2.20 for 30% sag)", unit: "Dimensionless" },
                { symbol: "C_sag", label: "Capacity Derate Factor", description: "Fractional capacity multiplier derived from Darcy-Weisbach flow exponent", unit: "Multiplier" },
              ]}
              notes="Flexible duct must never be compressed or bunched. Always install with maximum 4% tension and support with 1.5-inch wide hanger straps every 4 feet."
              sourceStandard="Air Diffusion Council (ADC) 5th Edition & SMACNA Flexible Duct Standard"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              How Installation Sag Affects Airflow Delivery
            </h3>
            <p>
              Unlike rigid galvanized steel sheet metal, flexible duct contains a spiral wire helix and a corrugated inner plastic liner. When flex duct is allowed to sag between ceiling joists:
            </p>
            <ul>
              <li><strong>4% Sag (Code Compliant):</strong> Properly supported with straps every 4 ft causes minimal friction loss (~7% CFM reduction).</li>
              <li><strong>15% Sag (Common Attic Defect):</strong> Unsupported runs droop 2 to 3 inches between trusses, creating internal turbulent eddies and increasing friction by <strong>60%</strong> (22% loss in delivered CFM).</li>
              <li><strong>30% Sag (Severe Choking):</strong> Bunched or kinked ductwork chokes airflow by <strong>35% to 45%</strong>, causing hot/cold spots and high blower static pressure.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Flex Diameter</th>
                <th scope="col">0.05 in.wg (Quiet)</th>
                <th scope="col">0.08 in.wg (Standard)</th>
                <th scope="col">0.10 in.wg (Standard)</th>
                <th scope="col">Typical Room Sizing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>4&quot; Flex Duct</strong></td>
                <td>23 CFM</td>
                <td>30 CFM</td>
                <td>35 CFM</td>
                <td>Small Bathroom / Powder Room</td>
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
                <td>Master Bedroom / Dining Area</td>
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
                <td>Main Branch Trunk (1.0 to 1.5 Tons)</td>
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
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a flexible supply branch duct for a 200 sq ft master bedroom requiring 150 CFM of cooling airflow at a standard 0.08 in. wg friction rate.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Step-by-Step Selection:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Check 7-Inch Flex:</strong> Delivers 126 CFM at 0.08 in. wg (undersized for 150 CFM target; would cause air starvation).</li>
              <li><strong>Check 8-Inch Flex:</strong> Delivers 177 CFM at 0.08 in. wg with 4% code tension (perfect match, allowing balance damper adjustment).</li>
              <li><strong>Acoustic Velocity Check:</strong> Air velocity inside the 8-inch duct is 150 / 0.349 = <strong>430 FPM</strong> (well within whisper-quiet master bedroom standards &lt;600 FPM).</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
