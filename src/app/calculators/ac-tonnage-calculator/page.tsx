import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { AcTonnageTool } from "@/components/calculator/tools/AcTonnageTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("ac-tonnage-calculator")!;

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

export default function AcTonnageCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="To calculate required AC tonnage, divide your conditioned home area by your regional climate factor (typically 450 to 650 sq ft per ton for residential cooling). For example, a 2,000 sq ft home in a moderate climate requires approximately 3.0 to 3.5 Tons (36,000 to 42,000 BTU/hr) of nominal cooling capacity."
      formulaSnippet="Nominal AC Tonnage = (Floor Area / Climate Base Factor) * Height Multiplier"
      authorityCitation="ACCA Manual S (Equipment Selection) & AHRI Standard 210/240"
      toolComponent={<AcTonnageTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="cooling-loads" />

          <h2>How to Calculate Central AC Tonnage & Equipment Capacity</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Air conditioning capacity is measured in <strong>Tons of Refrigeration</strong>. One ton of cooling capacity equals exactly <strong>12,000 BTU/hr</strong> (the amount of thermal energy required to melt 1 short ton of ice in 24 hours). Selecting the appropriate nominal tonnage ensures proper sensible temperature pull-down and adequate latent dehumidification.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Measure Conditioned Floor Space</strong>: Calculate the total finished living area in square feet (excluding unconditioned garages and attics).</li>
            <li><strong>Apply Regional Climate Factor</strong>: Determine your climate severity benchmark. Mild northern regions require approximately 1 ton per 650 sq ft, while extreme hot/humid southern zones require 1 ton per 400 to 450 sq ft.</li>
            <li><strong>Adjust for Ceiling Height & Air Volume</strong>: Standard sizing assumes 8-foot ceilings. Modern 9-foot ceilings add 6.25% to cooling volume, while 10-foot or 12-foot cathedral ceilings require proportionally higher nominal airflow.</li>
            <li><strong>Model SEER2 Energy Consumption</strong>: Compare Seasonal Energy Efficiency Ratio (SEER2) ratings to evaluate 10-year utility operating cost savings of high-efficiency inverter heat pumps and central AC systems.</li>
          </ol>

          <FormulaCard
            title="AC Tonnage & Electrical Operating Cost Formulation"
            formula="Tonnage = \frac{\text{Area}}{\text{Base Factor}} \times \left(1 + \frac{H - 8}{16}\right)  \quad | \quad \text{Annual Cost} = \frac{\text{BTU} \times \text{Hours}}{\text{SEER2} \times 1000} \times \text{Rate}"
            variables={[
              { symbol: "Tonnage", label: "Nominal Cooling Capacity", description: "Standard available residential capacity steps: 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0 Tons", unit: "Tons" },
              { symbol: "Base Factor", label: "Regional Climate Multiplier", description: "Mild: 650 sq ft/ton | Moderate: 550 sq ft/ton | Hot/Humid: 450 sq ft/ton | Desert: 350 sq ft/ton", unit: "sq ft/ton" },
              { symbol: "H", label: "Ceiling Height", description: "Average ceiling height in feet (baseline 8 ft)", unit: "feet" },
              { symbol: "SEER2", label: "Seasonal Energy Efficiency", description: "DOE 2023 certified seasonal cooling efficiency rating (typically 14.3 to 22.0)", unit: "BTU/W·h" },
              { symbol: "Hours", label: "Equivalent Full-Load Cooling Hours", description: "Annual compressor operating hours (typically 1,000 to 1,800 hrs depending on region)", unit: "hrs/yr" },
              { symbol: "Rate", label: "Electricity Utility Tariff", description: "Local residential electricity cost per kilowatt-hour", unit: "$/kWh" },
            ]}
            notes="ACCA Manual S mandates that cooling equipment capacity should not exceed 115% of calculated Manual J sensible heat load for single-speed systems (130% for variable-speed inverters) to avoid short-cycling and high indoor humidity."
            sourceStandard="ACCA Manual S / AHRI Standard 210/240 / DOE 10 CFR Part 430"
          />
        </>
      }
      comparisonTableSection={
        <>
          <h2>Square Footage to AC Tonnage Sizing Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Recommended nominal tonnage and airflow (CFM) across typical residential home sizes:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Home Size (sq ft)</th>
                  <th scope="col">Moderate Climate</th>
                  <th scope="col">Hot / Humid Climate</th>
                  <th scope="col">Desert Extreme Heat</th>
                  <th scope="col">Design Airflow</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>600 – 900 sq ft</strong></td>
                  <td>1.5 Tons (18k BTU)</td>
                  <td>1.5 – 2.0 Tons</td>
                  <td>2.0 – 2.5 Tons</td>
                  <td>600 – 800 CFM</td>
                </tr>
                <tr>
                  <td><strong>1,000 – 1,300 sq ft</strong></td>
                  <td>2.0 Tons (24k BTU)</td>
                  <td>2.5 Tons (30k BTU)</td>
                  <td>3.0 Tons (36k BTU)</td>
                  <td>800 – 1,000 CFM</td>
                </tr>
                <tr>
                  <td><strong>1,400 – 1,700 sq ft</strong></td>
                  <td>2.5 – 3.0 Tons</td>
                  <td>3.0 – 3.5 Tons</td>
                  <td>3.5 – 4.0 Tons</td>
                  <td>1,000 – 1,200 CFM</td>
                </tr>
                <tr>
                  <td><strong>1,800 – 2,200 sq ft</strong></td>
                  <td>3.0 – 3.5 Tons</td>
                  <td>3.5 – 4.0 Tons</td>
                  <td>4.5 – 5.0 Tons</td>
                  <td>1,200 – 1,400 CFM</td>
                </tr>
                <tr>
                  <td><strong>2,300 – 2,800 sq ft</strong></td>
                  <td>3.5 – 4.0 Tons</td>
                  <td>4.5 – 5.0 Tons</td>
                  <td>Dual Zone (2.5T + 2.5T)</td>
                  <td>1,400 – 1,600 CFM</td>
                </tr>
                <tr>
                  <td><strong>3,000+ sq ft</strong></td>
                  <td>4.0 – 5.0 Tons (or Dual)</td>
                  <td>Dual Systems (2x 3.0T)</td>
                  <td>Dual Systems (2x 3.5T)</td>
                  <td>1,600 – 2,000+ CFM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Sizing a 2,000 sq ft Home with SEER2 Upgrade Analysis</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> A homeowner in Atlanta, GA (Zone 3, Hot-Humid) has a 2,000 sq ft home with 9-foot ceilings and is replacing an aging 10-SEER air conditioner. Electricity is billed at $0.16/kWh.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Calculate Exact Cooling Demand</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Exact Tonnage = (2,000 sq ft / 450 sq ft/ton) * (1 + (9 - 8)/16) = 4.44 * 1.0625 = 4.72 Tons raw
            </p>

            <p><strong>Step 2: Nominal Equipment Selection & Airflow Sizing</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Selected Nominal Capacity = 4.0 to 4.5 Tons (48,000 BTU/hr) | Airflow = 4.0 * 400 = 1,600 CFM
            </p>

            <p><strong>Step 3: Calculate Annual Electricity Cost & Upgrade Savings</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Old 10-SEER System: (48,000 BTU * 1,200 hrs) / (10 * 1,000) * $0.16 = $921.60 / yr
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-success)", margin: "0.5rem 0" }}>
              New 16-SEER2 Inverter: (48,000 BTU * 1,200 hrs) / (16 * 1,000) * $0.16 = $576.00 / yr
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Financial ROI:</strong> Upgrading to a 16-SEER2 system saves <strong>$345.60/year</strong> ($3,456 over 10 years), offsetting installation costs while providing vastly superior humidity removal.
            </p>
          </div>
        </>
      }
      relatedToolsSection={
        <div style={{ marginBottom: "2rem" }}>
          <h2>Related Cooling & Sizing Tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <Link href="/calculators/ac-model-decoder" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>AC Model Number Decoder</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Decode Carrier, Trane, Goodman, and Lennox serial plates to identify existing tonnage.</p>
            </Link>
            <Link href="/calculators/btu-calculator" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>BTU Heat Load Calculator</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Detailed Manual J room-by-room sensible and latent heat load calculation.</p>
            </Link>
            <Link href="/calculators/cfm-calculator" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>HVAC CFM Airflow Sizer</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Determine exact supply airflow volume based on cooling tonnage and sensible heat.</p>
            </Link>
          </div>
        </div>
      }
    />
  );
}
