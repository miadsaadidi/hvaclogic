import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { CfmCalculatorTool } from "@/components/calculator/tools/CfmCalculatorTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("cfm-calculator")!;

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

export default function CfmCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="To calculate HVAC CFM (Cubic Feet per Minute), multiply duct air velocity (FPM) by cross-sectional duct area (sq ft): CFM = Velocity (FPM) × Area (sq ft). For thermal sizing, calculate sensible heat: CFM = Sensible BTU / (1.08 × ΔT), or use the standard residential rule of 400 CFM per nominal cooling ton."
      formulaSnippet="CFM = Velocity (FPM) * Duct_Area (sq ft) | CFM = Q_sensible / (1.08 * ΔT) | CFM = AC_Tonnage * 400"
      authorityCitation="ASHRAE Handbook of Fundamentals & ACCA Manual D Duct Design"
      toolComponent={<CfmCalculatorTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <h2>How to Calculate HVAC Airflow (CFM) Across System Types</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Airflow volume in HVAC systems is quantified in <strong>Cubic Feet per Minute (CFM)</strong>. Correct airflow ensures proper heat exchange across cooling evaporators and heating coils, prevents coil icing, and maintains rated equipment SEER2/AFUE efficiency.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Thermal Sensible Heat Method (Coil Sizing)</strong>: When sizing by thermal heat transfer, use the fundamental sensible heat equation: <code>CFM = Sensible BTU / (1.08 × ΔT)</code>. For standard air conditioning with a 20°F coil delta-T, this equates to 400 CFM per ton of cooling.</li>
            <li><strong>Fluid Velocity &amp; Area Method (Duct Airflow)</strong>: When measuring in-duct velocity with an anemometer or pitot tube, calculate volumetric flow as: <code>CFM = Velocity (FPM) × Free Duct Area (sq ft)</code>. Connect to the <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> to solve duct dimensions.</li>
            <li><strong>Room Air Turnover Method (ACH Method)</strong>: For ventilation and dilution requirements per ASHRAE Standard 62.1/62.2, calculate total volume (Length × Width × Ceiling Height) and multiply by desired Air Changes per Hour: <code>CFM = (Volume × ACH) / 60</code>.</li>
            <li><strong>Nominal AC Tonnage Rule</strong>: Standard residential systems operate at <strong>400 CFM/ton</strong> in moderate climates, 350 CFM/ton in humid zones (for enhanced latent dehumidification), and 450 CFM/ton in dry arid climates.</li>
          </ol>

          <FormulaCard
            title="Fundamental CFM Airflow & Fluid Dynamics Equations"
            formula="\text{CFM} = \text{FPM} \cdot \frac{\text{Area}_{\text{sq in}}}{144} \quad | \quad \text{CFM} = \frac{Q_{\text{sensible}}}{1.08 \cdot \Delta T} \quad | \quad \text{CFM} = \frac{\text{Volume} \cdot \text{ACH}}{60}"
            variables={[
              { symbol: "\\text{CFM}", label: "Volumetric Airflow Rate", description: "Standard volumetric air delivery at sea level density (0.075 lb/ft³)", unit: "CFM (ft³/min)" },
              { symbol: "\\text{FPM}", label: "Air Velocity", description: "Average linear fluid speed inside duct or register face", unit: "FPM (ft/min)" },
              { symbol: "\\text{Area}", label: "Duct Cross-Section", description: "Internal free open cross-sectional flow area (Area = Width × Height)", unit: "sq in or sq ft" },
              { symbol: "Q_{\\text{sensible}}", label: "Sensible Heat Load", description: "Pure dry-bulb cooling or heating load requirement", unit: "BTU/hr" },
              { symbol: "1.08", label: "Air Heat Capacity Factor", description: "Constant: air density (0.075 lb/ft³) × specific heat (0.24 BTU/lb·°F) × 60 min/hr", unit: "Constant" },
              { symbol: "\\Delta T", label: "Temperature Difference", description: "Air temperature drop across cooling coil (18–22°F) or rise across furnace (30–60°F)", unit: "°F" },
            ]}
            notes="All air calculations assume standard dry air density (0.075 lb/ft³) at sea level. For high-altitude installations above 3,000 ft, derate the 1.08 constant by the barometric pressure ratio."
            sourceStandard="ASHRAE Standard 62.1 & ACCA Manual D (3rd Edition)"
          />

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Downstream Duct Sizing &amp; Distribution Workflows
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Size Main Supply Trunks: <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> — convert total room CFM to equal-friction round and rectangular sheet metal trunks.<br />
              • Size Flexible Branch Runouts: <Link href="/calculators/flex-duct-cfm-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Flexible Duct CFM Chart</Link> — determine flexible duct runout diameters accounting for installation tension and sag.<br />
              • Compute System Friction &amp; TEL: <Link href="/calculators/duct-friction-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Duct Friction Loss Sizer</Link> — verify blower static pressure and fitting resistance.<br />
              • Infection Control Clean Airflow: <Link href="/research/ashrae-241-equivalent-clean-airflow" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>ASHRAE 241 Monograph</Link> &amp; <Link href="/datasets/ashrae-241-clean-airflow-benchmarks" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Clean Airflow Dataset</Link> — determine multi-zone Equivalent Clean Airflow (ECA) for pathogen risk management.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <>
          <h2>Nominal AC Cooling Tonnage to Airflow (CFM) Benchmark Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Design airflow benchmarks and recommended duct trunk sizes across nominal residential equipment sizes:
          </p>

          <div className="scenario-table" style={{ marginBottom: "2rem" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">AC Cooling Capacity</th>
                  <th scope="col">Standard Airflow (400 CFM/ton)</th>
                  <th scope="col">Humid Climate (350 CFM/ton)</th>
                  <th scope="col">Dry Arid (450 CFM/ton)</th>
                  <th scope="col">Recommended Main Supply Trunk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1.5 Tons (18,000 BTU)</strong></td>
                  <td>600 CFM</td>
                  <td>525 CFM</td>
                  <td>675 CFM</td>
                  <td>10&quot; Round / 12&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>2.0 Tons (24,000 BTU)</strong></td>
                  <td>800 CFM</td>
                  <td>700 CFM</td>
                  <td>900 CFM</td>
                  <td>12&quot; Round / 14&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>2.5 Tons (30,000 BTU)</strong></td>
                  <td>1,000 CFM</td>
                  <td>875 CFM</td>
                  <td>1,125 CFM</td>
                  <td>12&quot; Round / 16&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>3.0 Tons (36,000 BTU)</strong></td>
                  <td>1,200 CFM</td>
                  <td>1,050 CFM</td>
                  <td>1,350 CFM</td>
                  <td>14&quot; Round / 18&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>3.5 Tons (42,000 BTU)</strong></td>
                  <td>1,400 CFM</td>
                  <td>1,225 CFM</td>
                  <td>1,575 CFM</td>
                  <td>14&quot; Round / 20&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>4.0 Tons (48,000 BTU)</strong></td>
                  <td>1,600 CFM</td>
                  <td>1,400 CFM</td>
                  <td>1,800 CFM</td>
                  <td>16&quot; Round / 22&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>5.0 Tons (60,000 BTU)</strong></td>
                  <td>2,000 CFM</td>
                  <td>1,750 CFM</td>
                  <td>2,250 CFM</td>
                  <td>18&quot; Round / 24&quot; × 10&quot; Rect</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Airflow (CFM) to Duct Sizing Workflow Bridge Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Connecting delivered airflow (CFM) to primary sheet metal trunks and typical branch runout counts at standard 0.08&quot; WG design friction:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Airflow Volume (CFM)</th>
                  <th scope="col">Primary Trunk (Round)</th>
                  <th scope="col">Primary Trunk (Rectangular)</th>
                  <th scope="col">Typical 6&quot; Flex Branches (84 CFM)</th>
                  <th scope="col">Typical 8&quot; Flex Branches (177 CFM)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>400 CFM (1.0 Ton)</strong></td>
                  <td>9&quot; Round</td>
                  <td>10&quot; × 8&quot;</td>
                  <td>4–5 Branches</td>
                  <td>2–3 Branches</td>
                </tr>
                <tr>
                  <td><strong>800 CFM (2.0 Tons)</strong></td>
                  <td>12&quot; Round</td>
                  <td>14&quot; × 8&quot;</td>
                  <td>9–10 Branches</td>
                  <td>4–5 Branches</td>
                </tr>
                <tr>
                  <td><strong>1,200 CFM (3.0 Tons)</strong></td>
                  <td>14&quot; Round</td>
                  <td>18&quot; × 8&quot;</td>
                  <td>14–15 Branches</td>
                  <td>6–7 Branches</td>
                </tr>
                <tr>
                  <td><strong>1,600 CFM (4.0 Tons)</strong></td>
                  <td>16&quot; Round</td>
                  <td>22&quot; × 8&quot;</td>
                  <td>19–20 Branches</td>
                  <td>9 Branches</td>
                </tr>
                <tr>
                  <td><strong>2,000 CFM (5.0 Tons)</strong></td>
                  <td>18&quot; Round</td>
                  <td>24&quot; × 10&quot;</td>
                  <td>23–24 Branches</td>
                  <td>11–12 Branches</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Sizing Airflow for a 3-Ton Residential Heat Pump</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Calculate the design airflow requirement for a 3.0 Ton central heat pump system in a moderate climate with <strong>24,000 BTU/hr sensible cooling load</strong> and an entering/leaving coil air temperature split of <strong>20.0°F</strong>.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Calculate Thermal Sensible Airflow</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              CFM = Sensible BTU / (1.08 * Delta T) = 24,000 / (1.08 * 20.0) = 1,111 CFM
            </p>

            <p><strong>Step 2: Compare with Nominal Cooling Tonnage Rule</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Nominal Airflow = 3.0 Tons * 400 CFM/ton = 1,200 CFM (Provides 89 CFM safety margin for coil moisture removal)
            </p>

            <p><strong>Step 3: Size Main Duct Cross-Section</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Across a 14-inch round duct (Area = 1.069 sq ft): Velocity = 1,200 / 1.069 = 1,122 FPM
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Conclusion:</strong> 1,200 CFM provides balanced cooling and dehumidification. Connect to the <Link href="/calculators/filter-sizing-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>MERV Filter Sizing Calculator</Link> to ensure return air velocity stays below 300 FPM.
            </p>
          </div>
        </>
      }
    />
  );
}
