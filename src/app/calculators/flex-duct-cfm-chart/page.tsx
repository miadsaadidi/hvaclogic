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

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Flexible Duct Airflow &amp; Sag Derating Fluid Equations"
              formula="Q_flex = Q_straight * C_sag | C_sag = (1.0 / F_multiplier)^0.54"
              variables={[
                { symbol: "Q_flex", label: "Derated Field Airflow", description: "Delivered volumetric airflow in flexible duct accounting for core sag and compression", unit: "CFM" },
                { symbol: "Q_straight", label: "Fully Stretched Airflow", description: "Rated catalog airflow at zero compression (100% factory tension)", unit: "CFM" },
                { symbol: "F_multiplier", label: "RP-1333 / ADC Friction Factor", description: "Empirical friction penalty (1.00 for 0% sag, 1.15 for 4% sag, 1.60 for 15% sag, 2.20 for 30% sag)", unit: "Dimensionless" },
                { symbol: "C_sag", label: "Capacity Derate Factor", description: "Fractional capacity multiplier derived from Darcy-Weisbach flow exponent", unit: "Multiplier" },
              ]}
              notes="Flexible duct must never be compressed or bunched. Always install with maximum 4% tension, support with 1.5-inch wide hanger straps every 4 feet, and seal with heat-rated UL 181 mastic."
              sourceStandard="ASHRAE Research Project RP-1333 (Culp et al., Texas A&M ESL), ADC 5th Edition & SMACNA"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              How Installation Sag &amp; Longitudinal Compression Restrict Airflow Delivery
            </h3>
            <p>
              Unlike rigid galvanized steel sheet metal, flexible duct contains an internal helical wire coil encased in a flexible polymer membrane. As established by the definitive laboratory measurements of Dr. Charles H. Culp, P.E., Ph.D. and the Energy Systems Laboratory at Texas A&amp;M University in{" "}
              <a
                href="https://technologyportal.ashrae.org/Report/Detail/583"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent-cooling)", textDecoration: "underline", fontWeight: 600 }}
              >
                ASHRAE Research Project RP-1333 (&quot;Air Duct Friction Losses for Flexible Ductwork&quot;)
              </a>
              , longitudinal compression severely disrupts boundary-layer fluid flow:
            </p>
            <ul>
              <li><strong>4% Sag / Compression (Code Installed Tension):</strong> When stretched taut and hung with 1.5-inch straps every 4 ft, core corrugations remain shallow, causing minor friction increase (~1.15&times; multiplier, ~7% CFM loss).</li>
              <li><strong>15% Sag / Compression (Common Attic Defect):</strong> Unsupported runs droop 2 to 3 inches between ceiling joists, generating intense internal turbulent vortexes that increase friction by <strong>60%</strong> (22% loss in delivered CFM).</li>
              <li><strong>30% Sag / Unstretched (Severe Choking):</strong> When installers in a hurry fail to pull runs taut—or even leave flexible duct partially compressed in its original shipping bag—effective friction spikes by <strong>2.20&times;</strong>, choking airflow by 35% to 45% and starving downstream diffusers.</li>
            </ul>

            <div style={{ marginTop: "1rem", padding: "0.85rem 1rem", borderRadius: "0.5rem", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.25)" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f59e0b", marginBottom: "0.25rem" }}>
                ⚠️ Critical Field Failure Mode: Hot Attic Adhesive Breakdown
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", margin: 0, lineHeight: 1.5 }}>
                Field investigations documented by Dr. Culp highlight another severe hazard: standard duct taping glue quickly loses its adhesion properties inside hot unconditioned attics (120&deg;F–150&deg;F+). Over time, tape seals peel away, causing supply ducts to dump air-conditioned airflow directly into the attic or negative-pressure returns to ingest attic insulation dust and unconditioned air. Always seal connections with mastic and UL 181-rated mechanical clamp bands.
              </p>
            </div>
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
