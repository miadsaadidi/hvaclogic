import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { CombustionAirTool } from "@/components/calculator/tools/CombustionAirTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("combustion-air-calculator")!;

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

export default function CombustionAirPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Combustion air sizing determines whether a mechanical closet is a confined space and sizes permanent fresh air openings for gas furnaces and water heaters according to NFPA 54 / IFGC. An unconfined space requires at least 50 cubic feet per 1,000 BTU/hr of total gas appliance input. If confined, permanent outdoor openings must provide 1 sq in. per 4,000 BTU/hr for vertical ducts or 1 sq in. per 2,000 BTU/hr for horizontal ducts."
      formulaSnippet="V_req = (Total_BTU / 1000) * 50 cu ft | Area_vertical = Total_BTU / 4000 sq in | Area_horiz = Total_BTU / 2000 sq in"
      authorityCitation="NFPA 54 (National Fuel Gas Code Section 9.3) & International Fuel Gas Code (IFGC Chapter 3)"
      toolComponent={<CombustionAirTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="NFPA 54 / IFGC Combustion Air &amp; Confined Space Equations"
              formula="V_unconfined = (Q_total / 1000) * 50 cu ft | Area_indoor = max(100, Q_total / 1000) sq in | Area_vert = Q_total / 4000 sq in | Area_horiz = Q_total / 2000 sq in | Gross_Area = Net_Area / Free_Area_Fraction"
              variables={[
                { symbol: "V_unconfined", label: "Required Unconfined Volume", description: "Minimum mechanical room volume required to avoid permanent combustion air openings", unit: "cu ft" },
                { symbol: "Q_total", label: "Total Combined Gas Input", description: "Sum of nameplate input BTU/hr for all gas appliances in room", unit: "BTU/hr" },
                { symbol: "Area_vert", label: "Vertical Duct Net Free Area", description: "Net free area required for each of two vertical outdoor air ducts", unit: "sq in." },
                { symbol: "Area_horiz", label: "Horizontal Duct Net Free Area", description: "Net free area required for each of two horizontal outdoor air ducts", unit: "sq in." },
                { symbol: "Free_Area_Fraction", label: "Louver Free Area", description: "0.75 for metal louvers, 0.25 for wooden louvers", unit: "Dimensionless" },
              ]}
              notes="NFPA 54 mandates that when 2 permanent openings are installed, the upper opening must commence within 12 inches of the top of the enclosure, and the lower opening must commence within 12 inches of the bottom."
              sourceStandard="National Fuel Gas Code (NFPA 54 / ANSI Z223.1) & IFGC Section 304"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Why Combustion Air Is Critical for Safety
            </h3>
            <p>
              Fuel-burning appliances consume large volumes of oxygen during combustion (approximately 15 cubic feet of air per 1,000 BTU of natural gas burned). In a confined mechanical closet without dedicated combustion air, appliances quickly consume the available oxygen.
            </p>
            <p>
              Oxygen starvation leads to incomplete combustion, high production of deadly <strong>carbon monoxide (CO)</strong> gas, soot buildup, yellow burner flames, and dangerous flue gas backdrafting into the living space.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">NFPA 54 / IFGC Method</th>
                <th scope="col">Opening Count &amp; Location</th>
                <th scope="col">Net Free Area Ratio</th>
                <th scope="col">Best Application</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Indoor Air (Adjacent Space)</strong></td>
                <td>2 Openings (Top 12&quot; &amp; Bottom 12&quot;)</td>
                <td>1 sq in. per 1,000 BTU/hr (Min 100 sq in.)</td>
                <td>Closets adjacent to large open basements</td>
              </tr>
              <tr>
                <td><strong>Outdoor Air via Vertical Ducts</strong></td>
                <td>2 Openings (Top 12&quot; &amp; Bottom 12&quot;)</td>
                <td>1 sq in. per 4,000 BTU/hr each</td>
                <td>Attic or roof penetrations</td>
              </tr>
              <tr>
                <td><strong>Outdoor Air via Horizontal Ducts</strong></td>
                <td>2 Openings (Top 12&quot; &amp; Bottom 12&quot;)</td>
                <td>1 sq in. per 2,000 BTU/hr each</td>
                <td>Exterior sidewall penetrations</td>
              </tr>
              <tr>
                <td><strong>Outdoor Air (Single Opening)</strong></td>
                <td>1 Opening (Top 12&quot; of enclosure)</td>
                <td>1 sq in. per 3,000 BTU/hr</td>
                <td>Direct exterior wall with clearances</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing combustion air for a mechanical closet (8&apos; &times; 8&apos; &times; 8&apos; = 512 cu ft) containing an <strong>80,000 BTU/hr gas furnace</strong> and a <strong>40,000 BTU/hr gas water heater</strong>. Outdoor air will be supplied through <strong>vertical ducts with metal louvers (75% free area)</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Calculate Total Gas Input:</strong> 80,000 + 40,000 = <strong>120,000 BTU/hr</strong>.</li>
              <li><strong>Check Confined Space Threshold:</strong> Required Volume = (120,000 / 1000) &times; 50 = <strong>6,000 cu ft</strong>.</li>
              <li><strong>Evaluate Room Volume:</strong> Closet volume is 512 cu ft &lt; 6,000 cu ft &rarr; <strong>CONFINED SPACE (Deficit of 5,488 cu ft)</strong>. Permanent combustion air openings are legally required.</li>
              <li><strong>Size Vertical Outdoor Ducts:</strong> Net Free Area = 120,000 / 4,000 = <strong>30 sq in. Net Free Area each</strong> (one top, one bottom).</li>
              <li><strong>Adjust for Metal Louver (75% Free Area):</strong> Gross Louver Area = 30 / 0.75 = <strong>40 sq in. Gross Opening each</strong>.</li>
              <li><strong>Determine Round Duct Diameter:</strong> D = &radic;(4 &times; 40 / &pi;) = &radic;50.93 = <strong>7.14&quot; &rarr; Standard Ø 8-inch Round Duct</strong> for both upper and lower intakes.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
