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
      directAnswer="Insulation R-value measures thermal resistance to 1-D conductive heat flow (hr·ft²·°F/BTU). Total 1-D series stack R-value is calculated by summing the individual thermal resistances of all continuous material layers plus interior and exterior surface air films: R_stack = sum(R_layer) + R_in_film + R_out_film (e.g., 0.68 + 0.17 = 0.85 for vertical walls). The 1-D stack U-factor is the exact mathematical reciprocal: U_stack = 1 / R_stack. Note: 1-D series summation applies to continuous cross-sections; to account for repeating framing thermal bridges, use the 2D parallel-path Effective R-Value calculator."
      formulaSnippet="R_stack = sum(R_layer) + R_in_film + R_out_film | U_stack = 1 / R_stack | Q_annual = U_stack * HDD65 * 24 BTU/ft²·yr"
      authorityCitation="ASHRAE Handbook of Fundamentals (Ch. 25 & 26) & IECC 2021/2024 Residential Energy Code"
      toolComponent={<RValueTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="building-science" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="1-D Series Thermal Resistance &amp; Heat Transmission Equations"
              formula="R_layer = Thickness_inches * (R / inch) | R_stack = sum(R_layers) + R_in_film + R_out_film | U_stack = 1 / R_stack | Q_annual = U_stack * HDD65 * 24"
              variables={[
                { symbol: "R_stack", label: "1-D Series Stack Thermal Resistance", description: "Combined thermal resistance of all series material layers and boundary surface air films", unit: "hr·ft²·°F/BTU" },
                { symbol: "U_stack", label: "1-D Thermal Transmittance", description: "Rate of conductive heat transfer per square foot per degree Fahrenheit temperature difference", unit: "BTU/hr·ft²·°F" },
                { symbol: "R_films", label: "Surface Air Film Resistance", description: "Boundary layer thermal resistances: Interior still air (0.68 vertical) + Exterior 15mph air (0.17)", unit: "hr·ft²·°F/BTU" },
                { symbol: "Q_annual", label: "Annual Heat Transmission", description: "Estimated cumulative conductive heat transfer across envelope per square foot per heating season", unit: "BTU/ft²·yr" },
              ]}
              notes="1-D series addition strictly represents homogeneous layer heat flow. For assemblies with repeating framing studs, fasteners, or structural penetrations, whole-wall effective thermal performance must be calculated using parallel-path or modified zone methods."
              sourceStandard="ASHRAE Fundamentals Ch. 25/26 & IECC 2021/2024 Table R402.1.2"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              1-D Layer Sum vs. 2D Whole-Assembly Effective R-Value
            </h3>
            <p>
              In building science, distinguishing between a 1-D series layer stack and a whole-wall assembly is critical:
            </p>
            <ul>
              <li><strong>1-D Layer Stack (This Calculator):</strong> Evaluates the uninterrupted path through insulation, sheathing, drywall, cladding, and surface air films. It defines the baseline thermal resistance through the clear wall section.</li>
              <li><strong>Framing Thermal Bridging:</strong> Structural wood (R-1.25/inch) and steel studs conduct heat significantly faster than cavity insulation. This reduces the effective performance of the framing section by 15% to 60%. Use our <Link href="/calculators/effective-r-value-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Effective R-Value &amp; Thermal Bridging Calculator</Link> to calculate the 2D area-weighted parallel-path U-factor.</li>
              <li><strong>Continuous Insulation (ci):</strong> Installing continuous rigid foam or mineral wool board across the exterior of the studs provides an unbroken thermal blanket, significantly mitigating structural thermal bridges.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Layer Stack Configuration</th>
                <th scope="col">1-D Stack R-Value</th>
                <th scope="col">1-D Stack U-Factor</th>
                <th scope="col">IECC Prescriptive Benchmark</th>
                <th scope="col">Thermal Characteristics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>2x4 Standard Wall (R-13 Cavity + 7/16&quot; OSB)</strong></td>
                <td>R-15.5</td>
                <td>0.065 U</td>
                <td>Zones 1–2 Baseline</td>
                <td>Mild climates; vulnerable to framing thermal bridging without exterior ci</td>
              </tr>
              <tr>
                <td><strong>2x6 Advanced Wall (R-22 Rockwool + 7/16&quot; OSB)</strong></td>
                <td>R-24.5</td>
                <td>0.041 U</td>
                <td>Zones 1–4 Baseline</td>
                <td>Standard residential construction; high cavity density and fire resistance</td>
              </tr>
              <tr>
                <td><strong>2x6 High-Perf Wall (R-22 + 1&quot; Polyiso ci)</strong></td>
                <td>R-30.5</td>
                <td>0.033 U</td>
                <td>Zones 1–7 Prescriptive Benchmark</td>
                <td>Continuous exterior insulation breaks wood stud thermal bridge path</td>
              </tr>
              <tr>
                <td><strong>Chicago CI Advanced Wall (R-21 + 3&quot; Polyiso ci)</strong></td>
                <td>R-41.5</td>
                <td>0.024 U</td>
                <td>Zones 5–8 High Performance</td>
                <td>Deep continuous thermal envelope for cold and very cold climate zones</td>
              </tr>
              <tr>
                <td><strong>Vented Attic (14&quot; Loose-Fill Cellulose)</strong></td>
                <td>R-50.2</td>
                <td>0.020 U</td>
                <td>Zones 4–8 Ceiling Benchmark</td>
                <td>Standard residential blown attic insulation with upward winter heat flow</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Calculating the 1-D series layer stack R-value, U-factor, and annual conductive heat loss for a 2x6 high-performance exterior wall in Chicago, IL (Climate Zone 5, 6,000 HDD₆₅).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Layer 1 (Interior Still Air Film):</strong> R = <strong>0.68 hr·ft²·°F/BTU</strong> (ASHRAE vertical surface standard).</li>
              <li><strong>Layer 2 (1/2-inch Gypsum Drywall):</strong> R = <strong>0.45 hr·ft²·°F/BTU</strong>.</li>
              <li><strong>Layer 3 (5.5-inch High-Density R-21 Cavity Batt):</strong> R = <strong>21.00 hr·ft²·°F/BTU</strong>.</li>
              <li><strong>Layer 4 (7/16-inch OSB Structural Sheathing):</strong> R = <strong>0.62 hr·ft²·°F/BTU</strong>.</li>
              <li><strong>Layer 5 (3.0-inch Polyiso Continuous Exterior Foam):</strong> 3.0 in &times; 6.0 R/in = R-<strong>18.00 hr·ft²·°F/BTU</strong>.</li>
              <li><strong>Layer 6 (Vinyl Siding Cladding):</strong> R = <strong>0.60 hr·ft²·°F/BTU</strong>.</li>
              <li><strong>Layer 7 (Exterior 15 mph Wind Air Film):</strong> R = <strong>0.17 hr·ft²·°F/BTU</strong>.</li>
              <li><strong>Total 1-D Series Stack R-Value:</strong> R_stack = 0.68 + 0.45 + 21.00 + 0.62 + 18.00 + 0.60 + 0.17 = <strong>R-41.52 hr·ft²·°F/BTU</strong>.</li>
              <li><strong>1-D Stack U-Factor:</strong> U_stack = 1 / 41.52 = <strong>0.0241 BTU/hr·ft²·°F</strong>.</li>
              <li><strong>Annual Conductive Transmission:</strong> Q_annual = 0.0241 &times; 24 &times; 6,000 HDD₆₅ = <strong>3,470 BTU/ft²·yr</strong>.</li>
              <li><strong>IECC Prescriptive Code Comparison:</strong> IECC 2021/2024 Table R402.1.2 requires a minimum of R-20+5ci (or maximum U-0.045). With R-21 cavity + R-18 continuous insulation (U-0.0241), this assembly substantially exceeds prescriptive code requirements.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
