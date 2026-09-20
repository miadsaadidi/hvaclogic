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
                { symbol: "V_unconfined", label: "Required Unconfined Volume", description: "Minimum mechanical room volume required to avoid permanent combustion air openings (NFPA 54 Section 9.3.2.1)", unit: "cu ft" },
                { symbol: "Q_total", label: "Total Combined Gas Input", description: "Sum of nameplate input BTU/hr for all gas appliances in room", unit: "BTU/hr" },
                { symbol: "Area_vert", label: "Vertical Duct Net Free Area", description: "Net free area required for each of two vertical outdoor air ducts (NFPA 54 Section 9.3.3.1)", unit: "sq in." },
                { symbol: "Area_horiz", label: "Horizontal Duct Net Free Area", description: "Net free area required for each of two horizontal outdoor air ducts (NFPA 54 Section 9.3.3.2)", unit: "sq in." },
                { symbol: "Free_Area_Fraction", label: "Louver Free Area", description: "0.75 for metal louvers (Section 9.3.7.1), 0.25 for wooden louvers (Section 9.3.7.2)", unit: "Dimensionless" },
              ]}
              notes="NFPA 54 mandates that when 2 permanent openings are installed, the upper opening must commence within 12 inches of the top of the enclosure, and the lower opening must commence within 12 inches of the bottom."
              sourceStandard="National Fuel Gas Code (NFPA 54 / ANSI Z223.1 Section 9.3) & IFGC Section 304"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Why Combustion Air Is Critical for Life Safety
            </h3>
            <p>
              Fuel-burning appliances consume approximately 15 cubic feet of air for every 1,000 BTU of natural gas burned (including excess air required for draft stability). In modern weather-sealed homes, unvented mechanical closets quickly experience severe oxygen depletion.
            </p>
            <p>
              Oxygen starvation causes incomplete combustion, generating high concentrations of toxic <strong>carbon monoxide (CO)</strong> gas, soot formation, rollout burner flames, and dangerous flue backdrafting when exhaust appliances (such as kitchen range hoods or bath fans) depressurize the building.
            </p>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderTop: "4px solid var(--accent-orange, #f59e0b)", borderRadius: "0.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", marginTop: 0, marginBottom: "0.75rem" }}>
              Standard Residential Equipment Combustion Air Reference Matrix
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--ink-secondary)", marginBottom: "1rem" }}>
              Verified reference sizing per NFPA 54 Section 9.3 for typical furnace and water heater combinations:
            </p>
            <div className="scenario-table" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                <thead>
                  <tr style={{ background: "var(--surface-sunken)", textAlign: "left" }}>
                    <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-color)" }}>Appliance Pairing</th>
                    <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-color)" }}>Total Gas Input</th>
                    <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-color)" }}>Unconfined Threshold (50 ft³/kBTU)</th>
                    <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-color)" }}>Vertical Ducts (1 sq in / 4k BTU)</th>
                    <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-color)" }}>Horizontal Ducts (1 sq in / 2k BTU)</th>
                    <th style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-color)" }}>Metal Louver (75%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.5rem 0.75rem" }}>60k Furnace + 36k Water Heater</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}><strong>96,000 BTU/hr</strong></td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>4,800 cu ft</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>24 sq in. (Ø 6&quot;)</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>48 sq in. (Ø 8&quot;)</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>32 sq in. (6&quot;&times;6&quot;)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.5rem 0.75rem" }}>80k Furnace + 40k Water Heater</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}><strong>120,000 BTU/hr</strong></td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>6,000 cu ft</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>30 sq in. (Ø 8&quot;)</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>60 sq in. (Ø 10&quot;)</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>40 sq in. (6&quot;&times;8&quot;)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.5rem 0.75rem" }}>100k Furnace + 50k Water Heater</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}><strong>150,000 BTU/hr</strong></td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>7,500 cu ft</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>37.5 sq in. (Ø 8&quot;)</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>75 sq in. (Ø 10&quot;)</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>50 sq in. (8&quot;&times;8&quot;)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.5rem 0.75rem" }}>120k Furnace + 50k Water Heater + 40k Unit Heater</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}><strong>210,000 BTU/hr</strong></td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>10,500 cu ft</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>52.5 sq in. (Ø 10&quot;)</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>105 sq in. (Ø 12&quot;)</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>70 sq in. (8&quot;&times;10&quot;)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.5rem 0.75rem" }}>150k Hydronic Boiler + 50k Water Heater</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}><strong>200,000 BTU/hr</strong></td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>10,000 cu ft</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>50 sq in. (Ø 10&quot;)</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>100 sq in. (Ø 12&quot;)</td>
                    <td style={{ padding: "0.5rem 0.75rem" }}>66.7 sq in. (8&quot;&times;10&quot;)</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                <td>Closets adjacent to large unconfined basements</td>
              </tr>
              <tr>
                <td><strong>Outdoor Air via Vertical Ducts</strong></td>
                <td>2 Openings (Top 12&quot; &amp; Bottom 12&quot;)</td>
                <td>1 sq in. per 4,000 BTU/hr each</td>
                <td>Direct attic or roof penetrations</td>
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
                <td>Direct exterior wall with mandatory clearances</td>
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
              <li><strong>Check Confined Space Threshold:</strong> Required Volume = (120,000 / 1000) &times; 50 = <strong>6,000 cu ft</strong> (NFPA 54 Section 9.3.2.1).</li>
              <li><strong>Evaluate Room Volume:</strong> Closet volume is 512 cu ft &lt; 6,000 cu ft &rarr; <strong>CONFINED SPACE (Deficit of 5,488 cu ft)</strong>. Permanent combustion air openings are legally required.</li>
              <li><strong>Size Vertical Outdoor Ducts:</strong> Net Free Area = 120,000 / 4,000 = <strong>30 sq in. Net Free Area each</strong> (one top, one bottom per Section 9.3.3.1).</li>
              <li><strong>Adjust for Metal Louver (75% Free Area):</strong> Gross Louver Area = 30 / 0.75 = <strong>40 sq in. Gross Opening each</strong> (Section 9.3.7.1).</li>
              <li><strong>Determine Round Duct Diameter:</strong> D = &radic;(4 &times; 40 / &pi;) = &radic;50.93 = <strong>7.14&quot; &rarr; Standard Ø 8-inch Round Duct</strong> for both upper and lower intakes.</li>
            </ol>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderTop: "4px solid var(--primary-accent, #0284c7)", borderRadius: "0.5rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Related Heating &amp; Ventilation Workflows</h4>
            <p style={{ fontSize: "0.875rem", marginBottom: "0.75rem" }}>
              Connect combustion air sizing with primary heating load and ventilation tools:
            </p>
            <ul style={{ paddingLeft: "1.2rem", margin: 0, fontSize: "0.875rem" }}>
              <li>
                <Link href="/calculators/furnace-size-calculator" style={{ color: "var(--primary-accent, #0284c7)", fontWeight: 600 }}>
                  Furnace Sizing &amp; AFUE Efficiency Calculator
                </Link> — Determine input vs. output BTU capacity and verify heating airflow.
              </li>
              <li>
                <Link href="/calculators/boiler-size-calculator" style={{ color: "var(--primary-accent, #0284c7)", fontWeight: 600 }}>
                  Hydronic Boiler &amp; Baseboard Sizing Calculator
                </Link> — Size residential hydronic boilers and DHW priority loads.
              </li>
              <li>
                <Link href="/calculators/kitchen-hood-cfm" style={{ color: "var(--primary-accent, #0284c7)", fontWeight: 600 }}>
                  Kitchen Range Hood CFM &amp; Make-Up Air Sizer
                </Link> — Check mandatory IRC M1503.6 make-up air code requirements (&gt;400 CFM).
              </li>
              <li>
                <Link href="/calculators/garage-heater-sizing" style={{ color: "var(--primary-accent, #0284c7)", fontWeight: 600 }}>
                  Garage &amp; Workshop Heater Sizing Tool
                </Link> — Size unit heaters with slab conduction and freeze-protection modes.
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
