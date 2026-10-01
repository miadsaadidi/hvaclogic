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
      directAnswer="For preliminary cooling capacity screening, required central air conditioning tonnage is estimated by dividing conditioned floor area by regional climate screening factors (typically 450 to 650 sq ft per ton for standard residential construction) and adjusting for ceiling height. For example, a 2,000 sq ft home in a moderate climate (~550 sq ft/ton) with standard 8-foot ceilings indicates an estimated screening requirement of approximately 3.5 Tons (42,000 BTU/hr). Formal equipment sizing requires a comprehensive ACCA Manual J load calculation and ACCA Manual S equipment selection."
      formulaSnippet="Preliminary AC Tonnage = (Floor Area / Climate Base Factor) * [1 + (Ceiling - 8) / 16]"
      authorityCitation="ACCA Manual J & ACCA Manual S (Reference Methodologies)"
      toolComponent={<AcTonnageTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="cooling-loads" />

          <h2>Cooling Capacity Screening &amp; HVAC Equipment Selection Principles</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Air conditioning cooling capacity is rated in <strong>Tons of Refrigeration</strong>, where 1 Ton equals exactly <strong>12,000 BTU/hr</strong> (representing the heat absorption rate required to melt one short ton of ice in 24 hours). While preliminary rules of thumb provide useful initial approximations, professional system design follows a rigorous multi-step standard:
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Detailed Thermal Load Calculation (ACCA Manual J)</strong>: Calculates room-by-room sensible heat gain (envelope transmission, fenestration solar radiation, internal occupants/appliances, infiltration) and latent moisture loads at local ASHRAE outdoor design conditions.</li>
            <li><strong>Preliminary Area Screening (HVACLogic Sizing Model)</strong>: Uses regional climate factors (sq ft per ton) and room ceiling height adjustments ($1 + (H - 8)/16$) as a quick screening estimation tool for preliminary equipment scoping.</li>
            <li><strong>Equipment Capacity Selection (ACCA Manual S)</strong>: Matches the calculated sensible and latent loads to manufacturer expanded performance data at local outdoor and indoor design temperatures, ensuring proper sensible heat ratio (SHR) and continuous humidity removal.</li>
            <li><strong>Seasonal Energy &amp; Operating Cost Modeling (SEER2 / EFLH)</strong>: Estimates annual electrical operating expenses using Equivalent Full-Load Hours (EFLH) across certified AHRI SEER2 efficiency tiers.</li>
          </ol>

          <FormulaCard
            title="HVACLogic Preliminary AC Tonnage &amp; SEER2 Operating Cost Model"
            formula="Tonnage_{exact} = \frac{\text{Area}}{\text{Base Factor}} \times \left(1 + \frac{H - 8}{16}\right)  \quad | \quad \text{Annual Cost} = \frac{\text{BTU} \times \text{Hours}}{\text{SEER2} \times 1000} \times \text{Rate}"
            variables={[
              { symbol: "Tonnage_{exact}", label: "Calculated Screening Tonnage", description: "Raw calculated cooling tonnage before standard nominal capacity rounding", unit: "Tons" },
              { symbol: "Area", label: "Conditioned Floor Area", description: "Gross finished living area in square feet", unit: "sq ft" },
              { symbol: "Base Factor", label: "Climate Screening Benchmark", description: "Mild: 650 sq ft/ton | Moderate: 550 sq ft/ton | Hot/Humid: 450 sq ft/ton | Desert: 350 sq ft/ton", unit: "sq ft/ton" },
              { symbol: "H", label: "Ceiling Height", description: "Average room ceiling height in feet (baseline 8 ft)", unit: "feet" },
              { symbol: "BTU", label: "Nominal Cooling Capacity", description: "Standard nominal equipment steps: 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0 Tons (12k BTU/ton)", unit: "BTU/hr" },
              { symbol: "SEER2", label: "Seasonal Energy Efficiency", description: "AHRI certified seasonal cooling efficiency rating under test conditions", unit: "BTU/W·h" },
              { symbol: "Hours", label: "Equivalent Full-Load Cooling Hours", description: "Annual compressor operating hours baseline (screening default 1,000 hrs/yr)", unit: "hrs/yr" },
              { symbol: "Rate", label: "Electricity Tariff", description: "Residential electric utility rate per kilowatt-hour", unit: "$/kWh" },
            ]}
            notes="This screening model provides preliminary capacity estimates. Final equipment selection per ACCA Manual S requires matching the calculated sensible and latent loads from Manual J to the manufacturer's expanded performance data at local outdoor and indoor design wet-bulb and dry-bulb temperatures."
            sourceStandard="Technical References: ACCA Manual J (8th Edition), ACCA Manual S & AHRI Standard 210/240"
          />
        </>
      }
      comparisonTableSection={
        <>
          <h2>Preliminary Square Footage to AC Tonnage Screening Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Representative screening benchmarks for standard residential construction with 8-foot ceilings:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Home Size (sq ft)</th>
                  <th scope="col">Moderate Climate (~550 sq ft/ton)</th>
                  <th scope="col">Hot / Humid (~450 sq ft/ton)</th>
                  <th scope="col">Desert Extreme (~350 sq ft/ton)</th>
                  <th scope="col">Nominal Airflow Guideline</th>
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
                  <td>2.0 – 2.5 Tons</td>
                  <td>2.5 – 3.0 Tons</td>
                  <td>3.0 – 3.5 Tons</td>
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
                  <td>3.5 Tons (42k BTU)</td>
                  <td>4.0 – 4.5 Tons</td>
                  <td>4.5 – 5.0 Tons</td>
                  <td>1,400 – 1,800 CFM</td>
                </tr>
                <tr>
                  <td><strong>2,300 – 2,800 sq ft</strong></td>
                  <td>4.0 – 5.0 Tons</td>
                  <td>5.0 Tons (or Dual)</td>
                  <td>Dual Zone (2.5T + 2.5T)</td>
                  <td>1,600 – 2,000 CFM</td>
                </tr>
                <tr>
                  <td><strong>3,000+ sq ft</strong></td>
                  <td>5.0 Tons (or Dual)</td>
                  <td>Dual Systems (2x 3.0T)</td>
                  <td>Dual Systems (2x 3.5T)</td>
                  <td>2,000+ CFM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Preliminary AC Tonnage &amp; SEER2 Operating Cost Calculation</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Estimate cooling capacity and annual operating expenses for a 2,000 sq ft single-family home in a Moderate climate region (~550 sq ft/ton benchmark) with standard 8-foot ceilings. Electricity is billed at $0.16/kWh, and cooling operates for an estimated 1,000 equivalent full-load hours annually.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Calculate Exact Screening Tonnage</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Exact Tonnage = (2,000 sq ft / 550 sq ft/ton) * (1 + (8 - 8)/16) = 3.64 Tons raw
            </p>

            <p><strong>Step 2: Select Nominal Residential Capacity &amp; Airflow Guideline</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Nominal Equipment Step = 3.5 Tons (42,000 BTU/hr)<br />
              Nominal Airflow Guideline = 3.5 Tons * 400 CFM/ton = 1,400 CFM
            </p>

            <p><strong>Step 3: Calculate Annual Operating Costs (1,000 EFLH at $0.16/kWh)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Legacy 10-SEER Unit: (42,000 BTU/hr * 1,000 hrs) / (10.0 * 1,000) * $0.16 = $672.00 / yr<br />
              New 16-SEER2 Unit:   (42,000 BTU/hr * 1,000 hrs) / (16.0 * 1,000) * $0.16 = $420.00 / yr
            </p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-success)", margin: "0.5rem 0" }}>
              Estimated Annual Savings = $672.00 - $420.00 = $252.00 / year ($2,520 over 10 years)
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.75rem" }}>
              ✓ <strong>Engineering Note:</strong> This calculation is a preliminary screening estimate. Final equipment selection should always be verified per ACCA Manual S using manufacturer expanded performance tables at local indoor and outdoor design conditions.
            </p>
          </div>
        </>
      }
    />
  );
}
