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

          <h2>How to Read a Refrigerant PT Chart (Dew Point vs. Bubble Point)</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            A Pressure-Temperature (PT) chart defines the thermodynamic saturation curve where liquid and vapor phases coexist in equilibrium. With the industry transition to A2L low-GWP refrigerants like <strong>R-454B (Opteon XL41)</strong> and pure <strong>R-32</strong> under EPA Section 608, understanding the difference between dew point and bubble point is essential for accurate diagnostics.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Identify Refrigerant Chemical Composition</strong>: Single-component refrigerants (like pure R-32 or R-22) and near-azeotropic blends (like R-410A) boil and condense at a single temperature. Zeotropic blends (like R-454B and R-407C) exhibit <em>temperature glide</em> and have distinct boiling (bubble) and condensation (dew) saturation curves.</li>
            <li><strong>Select Dew Point for Superheat Verification</strong>: When measuring low-side suction pressure on the evaporator coil, reference the <strong>Dew Point curve</strong> to determine true vapor saturation temperature. Cross-check results with the <Link href="/calculators/superheat-subcooling-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Target Superheat Calculator</Link>.</li>
            <li><strong>Select Bubble Point for Subcooling Verification</strong>: When measuring high-side liquid pressure before the expansion valve, reference the <strong>Bubble Point curve</strong> to determine true liquid saturation temperature.</li>
            <li><strong>Apply Gauge vs. Absolute Pressure Conversions</strong>: Standard field manifold gauges read gauge pressure (PSIG). Absolute pressure is calculated as <code>PSIA = PSIG + 14.696</code> at sea level.</li>
          </ol>

          <FormulaCard
            title="Refrigerant Vapor-Liquid Equilibrium & Saturation Thermodynamics"
            formula="\ln(P_{\text{sat}} / P_c) = \frac{T_c}{T} \cdot \left[ a_1 \left(1 - \frac{T}{T_c}\right) + a_2 \left(1 - \frac{T}{T_c}\right)^{1.5} + a_3 \left(1 - \frac{T}{T_c}\right)^3 \right] \quad | \quad \text{PSIA} = \text{PSIG} + 14.696"
            variables={[
              { symbol: "P_{\\text{sat}}", label: "Saturation Pressure", description: "Equilibrium vapor pressure where liquid and gas coexist in phase change", unit: "PSIA or Bar" },
              { symbol: "T_{\\text{sat}}", label: "Saturation Temperature", description: "Boiling or condensing temperature corresponding to the measured manifold pressure", unit: "°F or °C" },
              { symbol: "\\text{Glide}", label: "Zeotropic Temperature Glide", description: "Temperature span between bubble point (100% liquid) and dew point (100% vapor) at constant pressure", unit: "°F" },
              { symbol: "\\text{PSIG}", label: "Gauge Pressure", description: "Pressure relative to ambient atmospheric pressure (0 PSIG = 14.696 PSIA at sea level)", unit: "PSIG" },
            ]}
            notes="All values are derived directly from NIST Standard Reference Database 23 (REFPROP v10.0) formulations. For zeotropic blends (R-454B, R-407C), always use Dew Point for superheat and Bubble Point for subcooling."
            sourceStandard="NIST Standard Reference Database 23 & AHRI Standard 700 / ASHRAE Standard 34"
          />
        </>
      }
      comparisonTableSection={
        <>
          <h2>Refrigerant Saturation & Pressure-Temperature Benchmark Table</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Operating saturation pressures across standard residential cooling design points (40°F Evaporator Suction / 110°F Condenser Liquid):
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Refrigerant Blend</th>
                  <th scope="col">ASHRAE Safety Class</th>
                  <th scope="col">GWP Rating</th>
                  <th scope="col">40°F Evaporator (Suction)</th>
                  <th scope="col">110°F Condenser (Liquid)</th>
                  <th scope="col">Temperature Glide</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>R-454B (Opteon XL41)</strong></td>
                  <td>A2L (Mildly Flammable)</td>
                  <td>466</td>
                  <td>115.0 PSIG (Dew)</td>
                  <td>365.0 PSIG (Bubble)</td>
                  <td>1.5°F</td>
                </tr>
                <tr>
                  <td><strong>R-32</strong></td>
                  <td>A2L (Mildly Flammable)</td>
                  <td>675</td>
                  <td>119.0 PSIG</td>
                  <td>382.0 PSIG</td>
                  <td>0.0°F (Pure)</td>
                </tr>
                <tr>
                  <td><strong>R-410A (Puron)</strong></td>
                  <td>A1 (Non-Toxic/Non-Flammable)</td>
                  <td>2,088</td>
                  <td>118.0 PSIG</td>
                  <td>365.0 PSIG</td>
                  <td>0.2°F (Near-Azeotrope)</td>
                </tr>
                <tr>
                  <td><strong>R-22 (Freon Legacy)</strong></td>
                  <td>A1 (Non-Toxic/Non-Flammable)</td>
                  <td>1,810</td>
                  <td>68.5 PSIG</td>
                  <td>226.0 PSIG</td>
                  <td>0.0°F (Pure)</td>
                </tr>
                <tr>
                  <td><strong>R-134a</strong></td>
                  <td>A1 (Medium-Temp)</td>
                  <td>1,430</td>
                  <td>35.1 PSIG</td>
                  <td>146.4 PSIG</td>
                  <td>0.0°F (Pure)</td>
                </tr>
                <tr>
                  <td><strong>R-404A</strong></td>
                  <td>A1 (Commercial Low-Temp)</td>
                  <td>3,922</td>
                  <td>86.5 PSIG</td>
                  <td>273.5 PSIG</td>
                  <td>0.9°F</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Verifying Suction Superheat on an R-454B Heat Pump</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> A technician is commissioning an R-454B residential split system. The digital suction manifold reads <strong>115.0 PSIG</strong> at the outdoor service valve, and the pipe clamp thermocouple reads <strong>52.0°F</strong>.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Select the Dew Point Curve</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Because suction line measurement reflects evaporating vapor leaving the coil, use the Dew Point saturation curve for R-454B.
            </p>

            <p><strong>Step 2: Look Up Vapor Saturation Temperature (T_sat_dew)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              At 115.0 PSIG R-454B: T_sat_dew = 40.0°F
            </p>

            <p><strong>Step 3: Calculate Actual Suction Superheat</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Actual Superheat = T_suction - T_sat_dew = 52.0°F - 40.0°F = 12.0°F Superheat
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Evaluation:</strong> 12.0°F superheat indicates adequate coil heat absorption without risk of liquid floodback to the compressor. For full diagnostics, cross-reference the <Link href="/calculators/superheat-subcooling-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Superheat & Subcooling Charging Sizer</Link>.
            </p>
          </div>
        </>
      }
    />
  );
}
