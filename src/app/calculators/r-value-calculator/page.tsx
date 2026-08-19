import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { RValueTool } from "@/components/calculator/tools/RValueTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("r-value-calculator")!;

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

export default function RValueCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Insulation R-value measures thermal resistance to conductive heat flow. Total assembly R-value is calculated by summing the individual thermal resistances of all material layers plus interior/exterior air films: R_total = sum(R_i) + 0.85. The overall assembly U-factor is the exact mathematical reciprocal: U = 1 / R_total. Higher R-values and lower U-factors indicate superior energy efficiency."
      formulaSnippet="R_total = R_drywall + R_cavity + R_sheathing + R_ci + R_siding + R_air_films | U_factor = 1 / R_total"
      authorityCitation="ASHRAE Handbook of Fundamentals 2021 & IECC 2021/2024 Residential Energy Code"
      toolComponent={<RValueTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="building-science" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Building Envelope Thermal Resistance &amp; U-Factor Equations"
              formula="R_layer = Thickness_inches * (R / inch) | R_total = sum(R_layers) + R_air_interior(0.68) + R_air_exterior(0.17) | U_factor = 1 / R_total"
              variables={[
                { symbol: "R_total", label: "Total Assembly Thermal Resistance", description: "Combined thermal resistance of all series material layers", unit: "hr·ft²·°F/BTU" },
                { symbol: "U_factor", label: "Overall Thermal Transmittance", description: "Rate of conductive heat transfer per square foot per degree Fahrenheit difference", unit: "BTU/hr·ft²·°F" },
                { symbol: "R_ci", label: "Continuous Insulation", description: "Uninterrupted rigid foam or mineral wool installed across framing members to eliminate thermal bridging", unit: "R-value" },
                { symbol: "IECC R402.1", label: "Energy Code Prescription", description: "Minimum legal envelope R-values across US climate zones 1 through 7", unit: "Prescriptive Min" },
              ]}
              notes="Adding continuous exterior insulation (ci) drastically reduces thermal bridging across wood and steel studs, increasing effective whole-wall thermal performance by up to 35%."
              sourceStandard="IECC 2021/2024 Table R402.1.2 and ASHRAE 90.1"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Cavity vs. Continuous Insulation (ci) Explained
            </h3>
            <p>
              In traditional wood-framed walls, wood studs have an R-value of only ~R-1.25 per inch (an R-4.4 thermal bridge for a 2x4). When heat bypasses the cavity insulation through the studs:
            </p>
            <ul>
              <li><strong>Thermal Bridging Penalty:</strong> A nominal &quot;R-13&quot; 2x4 wall has an effective whole-wall performance of only ~R-9.6 because 25% of the wall surface is solid wood framing.</li>
              <li><strong>The Continuous Insulation Solution:</strong> Adding 1 inch of exterior polyiso foam (R-6.0) or XPS (R-5.0) blankets the entire framing structure, stopping thermal bridges and preventing condensation inside wall cavities.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Wall / Attic Assembly</th>
                <th scope="col">Total R-Value</th>
                <th scope="col">Overall U-Factor</th>
                <th scope="col">IECC Compliance</th>
                <th scope="col">Best Application</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>2x4 Standard Builder Wall (R-13 Batt)</strong></td>
                <td>R-15.5</td>
                <td>0.065 U</td>
                <td>Zone 1–2 Only</td>
                <td>Mild Sunbelt climates</td>
              </tr>
              <tr>
                <td><strong>2x6 Advanced Wall (R-20 Rockwool)</strong></td>
                <td>R-24.5</td>
                <td>0.041 U</td>
                <td>Zones 1–4</td>
                <td>Standard modern construction</td>
              </tr>
              <tr>
                <td><strong>2x6 High-Perf Wall (R-20 + 1&quot; Polyiso ci)</strong></td>
                <td>R-30.5</td>
                <td>0.033 U</td>
                <td>Zones 1–7 (Full Pass)</td>
                <td>Cold climates &amp; Net Zero homes</td>
              </tr>
              <tr>
                <td><strong>R-49 Blown Attic Cellulose (14&quot;)</strong></td>
                <td>R-50.3</td>
                <td>0.020 U</td>
                <td>Zones 1–7 (Full Pass)</td>
                <td>Residential vented attics</td>
              </tr>
              <tr>
                <td><strong>4&quot; Closed-Cell Spray Foam Roof Deck</strong></td>
                <td>R-27.3</td>
                <td>0.037 U</td>
                <td>Zones 1–4</td>
                <td>Unvented cathedral ceilings</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Calculating the total assembly R-value and U-factor for a 2x6 high-performance exterior wall in Chicago (IECC Climate Zone 5).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Layer 1 (Interior Still Air Film):</strong> R = <strong>0.68</strong>.</li>
              <li><strong>Layer 2 (1/2-inch Drywall):</strong> R = <strong>0.45</strong>.</li>
              <li><strong>Layer 3 (5.5-inch Rockwool Cavity Batt):</strong> 5.5 &times; 4.0 = R-<strong>22.00</strong>.</li>
              <li><strong>Layer 4 (7/16-inch OSB Sheathing):</strong> R = <strong>0.62</strong>.</li>
              <li><strong>Layer 5 (1-inch Polyiso Continuous Sheathing):</strong> 1.0 &times; 6.0 = R-<strong>6.00</strong>.</li>
              <li><strong>Layer 6 (Vinyl Siding Cladding):</strong> R = <strong>0.60</strong>.</li>
              <li><strong>Layer 7 (Exterior 15mph Air Film):</strong> R = <strong>0.17</strong>.</li>
              <li><strong>Total Assembly R-Value:</strong> 0.68 + 0.45 + 22.00 + 0.62 + 6.00 + 0.60 + 0.17 = <strong>R-30.52</strong>.</li>
              <li><strong>Overall Assembly U-Factor:</strong> U = 1 / 30.52 = <strong>0.033 BTU/hr·ft²·°F</strong>.</li>
              <li><strong>IECC 2021/2024 Zone 5 Code Check:</strong> Required maximum U-factor is U-0.045 (R-25 equivalent). At U-0.033, this assembly <strong>exceeds code by +R-5.5 margin</strong>.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
