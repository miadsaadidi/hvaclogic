import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { PtChartTool } from "@/components/calculator/tools/PtChartTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("pt-chart")!;

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

export default function PtChartPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="A refrigerant Pressure-Temperature (PT) chart maps the exact saturation temperature of a refrigerant at any given pressure. For next-generation A2L R-454B (Opteon XL41), a standard 40°F evaporator coil operates at 115.5 PSIG (dew point), and a 110°F condenser operates at 365.2 PSIG (bubble point). For pure R-32, 40°F saturation occurs at 119.0 PSIG. For legacy R-410A systems, 40°F saturation occurs at 118.0 PSIG."
      formulaSnippet="T_sat = f(P_gauge, Refrigerant_NIST) | PSIA = PSIG + 14.696 | Glide = T_dew - T_bubble"
      authorityCitation="NIST REFPROP Thermodynamic Formulations & AHRI Standard 700"
      toolComponent={<PtChartTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="refrigeration" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Refrigerant Vapor-Liquid Equilibrium &amp; Saturation Thermodynamics"
              formula="ln(P_sat / P_c) = (T_c / T) * [a1 * (1 - T/T_c) + a2 * (1 - T/T_c)^1.5 + a3 * (1 - T/T_c)^3] | PSIA = PSIG + 14.696"
              variables={[
                { symbol: "P_sat", label: "Saturation Pressure", description: "Equilibrium vapor pressure where liquid and gas coexist in phase change", unit: "PSIA or Bar" },
                { symbol: "T_sat", label: "Saturation Temperature", description: "Boiling or condensing temperature corresponding to the measured manifold pressure", unit: "°F or °C" },
                { symbol: "Glide", label: "Zeotropic Temperature Glide", description: "Temperature span between bubble point (100% liquid) and dew point (100% vapor) at constant pressure", unit: "°F" },
                { symbol: "PSIG", label: "Gauge Pressure", description: "Pressure relative to ambient atmospheric pressure (0 PSIG = 14.696 PSIA)", unit: "PSIG" },
              ]}
              notes="All values are derived directly from NIST REFPROP v10.0 formulation equations. For zeotropic blends like R-454B and R-407C, always use the Dew Point curve for Superheat and the Bubble Point curve for Subcooling."
              sourceStandard="NIST Standard Reference Database 23 & AHRI Standard 700 / ASHRAE 34"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Understanding Temperature Glide in A2L Refrigerants (R-454B &amp; R-407C)
            </h3>
            <p>
              Unlike single-component refrigerants (like R-32 or R-22) and near-azeotropes (like R-410A), zeotropic blends change phase over a temperature range known as <strong>temperature glide</strong>:
            </p>
            <ul>
              <li><strong>Bubble Point (Liquid Saturation):</strong> The temperature at which liquid refrigerant first begins to boil. Used to calculate <strong>TXV Subcooling</strong> on the high-side liquid line.</li>
              <li><strong>Dew Point (Vapor Saturation):</strong> The temperature at which the last drop of liquid evaporates into gas. Used to calculate <strong>Superheat</strong> on the low-side suction line.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Refrigerant</th>
                <th scope="col">Safety Group</th>
                <th scope="col">GWP Rating</th>
                <th scope="col">40&deg;F Evaporator (Suction)</th>
                <th scope="col">110&deg;F Condenser (Liquid)</th>
                <th scope="col">Temperature Glide</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>R-454B (Opteon XL41)</strong></td>
                <td>A2L (Low GWP)</td>
                <td>466</td>
                <td>115.0 PSIG</td>
                <td>365.0 PSIG</td>
                <td>1.5&deg;F</td>
              </tr>
              <tr>
                <td><strong>R-32</strong></td>
                <td>A2L (Low GWP)</td>
                <td>675</td>
                <td>119.0 PSIG</td>
                <td>382.0 PSIG</td>
                <td>0.0&deg;F (Pure)</td>
              </tr>
              <tr>
                <td><strong>R-410A (Puron)</strong></td>
                <td>A1 (Standard)</td>
                <td>2,088</td>
                <td>118.0 PSIG</td>
                <td>365.0 PSIG</td>
                <td>0.2&deg;F (Near-Azeotrope)</td>
              </tr>
              <tr>
                <td><strong>R-22 (Freon)</strong></td>
                <td>A1 (Legacy)</td>
                <td>1,810</td>
                <td>68.5 PSIG</td>
                <td>226.0 PSIG</td>
                <td>0.0&deg;F (Pure)</td>
              </tr>
              <tr>
                <td><strong>R-134a</strong></td>
                <td>A1 (Medium Temp)</td>
                <td>1,430</td>
                <td>35.1 PSIG</td>
                <td>146.4 PSIG</td>
                <td>0.0&deg;F (Pure)</td>
              </tr>
              <tr>
                <td><strong>R-404A</strong></td>
                <td>A1 (Commercial)</td>
                <td>3,922</td>
                <td>86.5 PSIG</td>
                <td>273.5 PSIG</td>
                <td>0.9&deg;F</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> A service technician is commissioning a new 2025 residential heat pump charged with <strong>R-454B</strong>. The low-side suction manifold pressure reads <strong>115 PSIG</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Select Dew Point Curve:</strong> Since suction pressure measures vapor evaporating off the coil, select the <strong>Dew Point curve</strong>.</li>
              <li><strong>Look Up Saturation Temp:</strong> At 115 PSIG, R-454B dew point saturation temperature is <strong>40.0&deg;F</strong>.</li>
              <li><strong>Measure Suction Line Pipe Temp:</strong> The clamp-on thermocouple measures <strong>52.0&deg;F</strong>.</li>
              <li><strong>Calculate Superheat:</strong> Actual Superheat = 52.0&deg;F - 40.0&deg;F = <strong>12.0&deg;F</strong> (optimal for residential cooling).</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
