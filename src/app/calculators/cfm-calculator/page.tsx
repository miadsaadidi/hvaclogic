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
      directAnswer="To calculate HVAC airflow (CFM), multiply average air velocity (FPM) by cross-sectional duct area (sq ft): CFM = Velocity (FPM) × Area (sq ft). For thermal load calculations, use the sensible heat relationship: CFM = Sensible BTU/hr ÷ (1.08 × ΔT). For ventilation volume conversions, use CFM = (Room Volume × ACH) ÷ 60. In residential cooling, 400 CFM per nominal cooling ton serves as a standard nominal design benchmark."
      formulaSnippet="CFM = Velocity (FPM) * Duct_Area (sq ft) | CFM = Q_sensible / (1.08 * ΔT) | CFM = (Volume * ACH) / 60"
      authorityCitation="ASHRAE Handbook of Fundamentals & ACCA Manual D (Technical References)"
      toolComponent={<CfmCalculatorTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <h2>How to Calculate HVAC Airflow (CFM) Across System Applications</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Airflow volume in HVAC systems is quantified in <strong>Cubic Feet per Minute (CFM)</strong>. Determining the proper airflow rate is essential for effective heat transfer across cooling evaporators and heating exchangers, maintaining appropriate static pressure, and achieving intended ventilation rates.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Sensible Heat Load Method (Thermal Sizing)</strong>: When sizing airflow to satisfy thermal loads, apply the fundamental sensible heat relationship: <code>CFM = Sensible BTU/hr ÷ (1.08 × ΔT)</code>. The 1.08 factor is an engineering approximation based on standard sea-level air density (0.075 lb/ft³) and specific heat (0.24 BTU/lb·°F). For high-altitude installations, adjust the constant based on local air density.
            </li>
            <li>
              <strong>Volumetric Flow Relationship (Duct Velocity &amp; Area)</strong>: In fluid mechanics, volumetric airflow equals average fluid velocity multiplied by duct cross-sectional area: <code>CFM = Velocity (FPM) × Free Duct Area (sq ft)</code>. Duct velocity ranges (such as 600–900 FPM in residential branches and 900–1,200 FPM in main trunks) serve as acoustic and friction design guidelines; actual noise levels also depend on duct geometry, fittings, static pressure, and terminal devices. Connect to the <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> for detailed duct sizing.
            </li>
            <li>
              <strong>Room Air Turnover Method (ACH Dimensional Conversion)</strong>: The equation <code>CFM = (Room Volume × ACH) ÷ 60</code> converts desired Air Changes per Hour into a continuous flow rate. The appropriate ACH must be selected separately based on specific space occupancy, room function, and applicable ventilation standards (such as ASHRAE Standard 62.1 or 62.2).
            </li>
            <li>
              <strong>Nominal Equipment Tonnage Benchmarks</strong>: In residential cooling design, <strong>400 CFM/ton</strong> is widely used as a nominal rule-of-thumb benchmark (with ~350 CFM/ton commonly used in humid climates to enhance latent moisture removal, and ~450 CFM/ton in dry climates with high sensible heat ratios). Actual equipment airflow must always be verified against manufacturer expanded performance tables and specific entering air conditions.
            </li>
          </ol>

          <FormulaCard
            title="Fundamental Airflow & Sensible Heat Transfer Equations"
            formula="\text{CFM} = \text{FPM} \cdot \frac{\text{Area}_{\text{sq in}}}{144} \quad | \quad \text{CFM} = \frac{Q_{\text{sensible}}}{1.08 \cdot \Delta T} \quad | \quad \text{CFM} = \frac{\text{Volume} \cdot \text{ACH}}{60}"
            variables={[
              { symbol: "\\text{CFM}", label: "Volumetric Airflow Rate", description: "Volumetric air delivery rate", unit: "CFM (ft³/min)" },
              { symbol: "\\text{FPM}", label: "Air Velocity", description: "Average linear fluid speed inside duct or register face", unit: "FPM (ft/min)" },
              { symbol: "\\text{Area}", label: "Duct Cross-Section", description: "Internal free open cross-sectional flow area (Area = Width × Height or π × r²)", unit: "sq in or sq ft" },
              { symbol: "Q_{\\text{sensible}}", label: "Sensible Heat Load", description: "Sensible heating or cooling load requirement", unit: "BTU/hr" },
              { symbol: "1.08", label: "Air Heat Capacity Factor", description: "Engineering factor: air density (0.075 lb/ft³) × specific heat (0.24 BTU/lb·°F) × 60 min/hr at standard sea-level air", unit: "Constant" },
              { symbol: "\\Delta T", label: "Temperature Difference", description: "Dry-bulb temperature difference across cooling coil (typically 18–22°F) or heating equipment (typically 30–60°F)", unit: "°F" },
            ]}
            notes="Calculations assume standard dry air density (0.075 lb/ft³) at sea level. For high-altitude installations (above 3,000 ft) or non-standard temperatures, adjust the 1.08 factor using local air density: factor = ρ_actual × 0.24 × 60."
            sourceStandard="ASHRAE Handbook of Fundamentals & ACCA Manual D (Technical References)"
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
            Representative airflow benchmarks and typical duct trunk dimensions across nominal residential equipment sizes. <em>Note: Actual airflow requirements depend on equipment manufacturer data, sensible heat ratio, entering air conditions, and system design.</em>
          </p>

          <div className="scenario-table" style={{ marginBottom: "2rem" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Nominal AC Capacity</th>
                  <th scope="col">Nominal Baseline (400 CFM/ton)</th>
                  <th scope="col">Humid Design Benchmark (350 CFM/ton)</th>
                  <th scope="col">Dry Arid Benchmark (450 CFM/ton)</th>
                  <th scope="col">Example Main Supply Trunk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1.5 Tons (18,000 BTU/hr nom.)</strong></td>
                  <td>600 CFM</td>
                  <td>525 CFM</td>
                  <td>675 CFM</td>
                  <td>10&quot; Round / 12&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>2.0 Tons (24,000 BTU/hr nom.)</strong></td>
                  <td>800 CFM</td>
                  <td>700 CFM</td>
                  <td>900 CFM</td>
                  <td>12&quot; Round / 14&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>2.5 Tons (30,000 BTU/hr nom.)</strong></td>
                  <td>1,000 CFM</td>
                  <td>875 CFM</td>
                  <td>1,125 CFM</td>
                  <td>12&quot; Round / 16&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>3.0 Tons (36,000 BTU/hr nom.)</strong></td>
                  <td>1,200 CFM</td>
                  <td>1,050 CFM</td>
                  <td>1,350 CFM</td>
                  <td>14&quot; Round / 18&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>3.5 Tons (42,000 BTU/hr nom.)</strong></td>
                  <td>1,400 CFM</td>
                  <td>1,225 CFM</td>
                  <td>1,575 CFM</td>
                  <td>14&quot; Round / 20&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>4.0 Tons (48,000 BTU/hr nom.)</strong></td>
                  <td>1,600 CFM</td>
                  <td>1,400 CFM</td>
                  <td>1,800 CFM</td>
                  <td>16&quot; Round / 22&quot; × 8&quot; Rect</td>
                </tr>
                <tr>
                  <td><strong>5.0 Tons (60,000 BTU/hr nom.)</strong></td>
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
            Representative duct sizes and branch runout counts based on an assumed 0.08&quot; WG per 100 ft design friction rate. <em>Actual duct sizing depends on available static pressure, total equivalent length, and fitting geometry:</em>
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Airflow Volume (CFM)</th>
                  <th scope="col">Example Round Trunk</th>
                  <th scope="col">Example Rectangular Trunk</th>
                  <th scope="col">Typical 6&quot; Flex Branches (~84 CFM)</th>
                  <th scope="col">Typical 8&quot; Flex Branches (~177 CFM)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>400 CFM (1.0 Ton nom.)</strong></td>
                  <td>9&quot; Round</td>
                  <td>10&quot; × 8&quot;</td>
                  <td>4–5 Branches</td>
                  <td>2–3 Branches</td>
                </tr>
                <tr>
                  <td><strong>800 CFM (2.0 Tons nom.)</strong></td>
                  <td>12&quot; Round</td>
                  <td>14&quot; × 8&quot;</td>
                  <td>9–10 Branches</td>
                  <td>4–5 Branches</td>
                </tr>
                <tr>
                  <td><strong>1,200 CFM (3.0 Tons nom.)</strong></td>
                  <td>14&quot; Round</td>
                  <td>18&quot; × 8&quot;</td>
                  <td>14–15 Branches</td>
                  <td>6–7 Branches</td>
                </tr>
                <tr>
                  <td><strong>1,600 CFM (4.0 Tons nom.)</strong></td>
                  <td>16&quot; Round</td>
                  <td>22&quot; × 8&quot;</td>
                  <td>19–20 Branches</td>
                  <td>9 Branches</td>
                </tr>
                <tr>
                  <td><strong>2,000 CFM (5.0 Tons nom.)</strong></td>
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
          <h2>Worked Example: Calculating Airflow for a 3-Ton Heat Pump System</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Determine the design airflow requirement for a nominal 3.0-ton heat pump system operating with a <strong>24,000 BTU/hr sensible cooling load</strong> and a design coil temperature drop of <strong>20.0°F</strong>.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Calculate Sensible Heat Airflow Requirement</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              CFM = Sensible BTU/hr ÷ (1.08 × ΔT) = 24,000 ÷ (1.08 × 20.0) = 1,111 CFM
            </p>

            <p><strong>Step 2: Compare with Nominal Blower Benchmark</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Nominal Baseline Airflow = 3.0 Tons × 400 CFM/ton = 1,200 CFM
            </p>

            <p><strong>Step 3: Evaluate Duct Air Velocity</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Across a 14-inch round duct (Area = 1.069 sq ft): Velocity = 1,200 CFM ÷ 1.069 sq ft = 1,122 FPM
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Summary:</strong> The sensible load requires approximately 1,111 CFM, aligning closely with the nominal 1,200 CFM blower setting. Size and verify return air paths using the <Link href="/calculators/filter-sizing-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Filter Sizing Calculator</Link> and <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Ductulator</Link>.
            </p>
          </div>
        </>
      }
    />
  );
}
