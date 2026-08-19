import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { FurnaceBtuTool } from "@/components/calculator/tools/FurnaceBtuTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("furnace-size-calculator")!;

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

export default function FurnaceSizeCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="To calculate the right furnace size for your home, multiply the square footage by your regional heating climate factor (30 to 60 BTU/sq ft), then divide by the furnace AFUE efficiency rating: Required Input BTU = (Square Footage × Regional Factor) / (AFUE / 100). A 2,000 sq ft home in a moderate cold climate typically requires an 80,000 to 100,000 BTU input furnace."
      formulaSnippet="Input_BTU = (Floor_Area_sqft * Climate_Factor * Height_Factor * Ins_Factor) / (AFUE / 100)"
      authorityCitation="ACCA Manual J (8th Edition) & DOE Annual Fuel Utilization Efficiency (AFUE)"
      toolComponent={<FurnaceBtuTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Residential Furnace Heating &amp; AFUE Efficiency Thermodynamic Equations"
              formula="Q_output = Area_sqft * BTU_climate * (Height / 8) * F_ins | Q_input = Q_output / (AFUE / 100) | CFM = Q_output / (1.08 * Delta_T)"
              variables={[
                { symbol: "Q_output", label: "Net Delivered Heat Output", description: "Usable thermal heating energy delivered into living space supply registers", unit: "BTU/hr" },
                { symbol: "Q_input", label: "Furnace Gas Burner Rating", description: "Total chemical fuel energy consumed at the inshot burner manifold", unit: "BTU/hr" },
                { symbol: "BTU_climate", label: "Regional Climate Heating Factor", description: "Design load multiplier (30 BTU/sqft in South, 40–50 in Central/Midwest, 60 in Sub-Zero North)", unit: "BTU/sq ft" },
                { symbol: "AFUE", label: "Annual Fuel Utilization Efficiency", description: "Seasonal combustion efficiency (80% standard non-condensing, 96%+ two-stage condensing)", unit: "Percentage (%)" },
                { symbol: "CFM", label: "Required Heating Airflow", description: "Air delivery rate required across the heat exchanger to maintain rated temperature rise", unit: "CFM" },
                { symbol: "Delta_T", label: "Heat Exchanger Temperature Rise", description: "Supply air temperature minus return air temperature (typically 35°F to 65°F)", unit: "°F" },
              ]}
              notes="Furnaces must never be arbitrarily oversized. Oversized furnaces cause short-cycling, noisy duct expansion bangs, large temperature swings, and premature heat exchanger failure."
              sourceStandard="ACCA Manual J, Manual S, and DOE 10 CFR Part 430"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              80% Standard vs. 96%+ Condensing High-Efficiency Furnaces
            </h3>
            <p>
              When replacing a residential gas furnace, selecting between 80% and 96%+ AFUE has major mechanical and energy cost implications:
            </p>
            <ul>
              <li><strong>80% AFUE (Non-Condensing):</strong> Standard single-stage or two-stage furnace. Loses 20% of energy as hot exhaust gas up a metal B-vent chimney flue. Suitable for mild climates (Zones 1–2).</li>
              <li><strong>90%–98% AFUE (Condensing):</strong> Features a secondary stainless steel heat exchanger that captures latent heat from flue gas water vapor, cooling exhaust below 120&deg;F so it can be vented safely through side-wall PVC pipe. Highly recommended in northern zones (Zones 3–5).</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Home Square Footage</th>
                <th scope="col">Zone 2 (Sunbelt - 35 BTU)</th>
                <th scope="col">Zone 3 (Central - 40 BTU)</th>
                <th scope="col">Zone 4 (Midwest - 50 BTU)</th>
                <th scope="col">Zone 5 (North - 60 BTU)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1,200 sq ft</strong></td>
                <td>40k BTU (80%/96%)</td>
                <td>60k BTU (96%)</td>
                <td>60k BTU (96%)</td>
                <td>80k BTU (96%)</td>
              </tr>
              <tr>
                <td><strong>1,600 sq ft</strong></td>
                <td>60k BTU (80%/96%)</td>
                <td>60k BTU (96%)</td>
                <td>80k BTU (96%)</td>
                <td>100k BTU (96%)</td>
              </tr>
              <tr>
                <td><strong>2,000 sq ft</strong></td>
                <td>80k BTU (80%/96%)</td>
                <td>80k BTU (96%)</td>
                <td>100k BTU (96%)</td>
                <td>120k BTU (96%)</td>
              </tr>
              <tr>
                <td><strong>2,500 sq ft</strong></td>
                <td>80k BTU (80%/96%)</td>
                <td>100k BTU (96%)</td>
                <td>120k BTU (96%)</td>
                <td>140k BTU (96%)</td>
              </tr>
              <tr>
                <td><strong>3,000 sq ft</strong></td>
                <td>100k BTU (80%/96%)</td>
                <td>120k BTU (96%)</td>
                <td>140k BTU (96%)</td>
                <td>Dual-Zone Systems</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a replacement gas furnace for a 2,000 sq ft home in Chicago, Illinois (Zone 4, outdoor design temperature 0&deg;F) with standard 8-ft ceilings and average insulation.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Net Heat Loss (Output BTU):</strong> 2,000 sq ft × 50 BTU/sq ft = <strong>100,000 BTU/hr Output</strong>.</li>
              <li><strong>Input BTU (96% Condensing Furnace):</strong> 100,000 / 0.96 = <strong>104,167 BTU/hr Input</strong>.</li>
              <li><strong>Standard Commercial Model Selection:</strong> Select a standard nominal <strong>100k or 120k BTU Input</strong> condensing two-stage furnace.</li>
              <li><strong>Required Airflow CFM Check:</strong> At a standard 45&deg;F temperature rise (&Delta;T), required heating airflow is 100,000 / (1.08 × 45) = <strong>2,058 CFM</strong> (pairs with a 21-inch C-cabinet and 4.0–5.0 ton blower).</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
