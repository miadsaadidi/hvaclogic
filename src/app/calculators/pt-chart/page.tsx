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
      directAnswer="A refrigerant Pressure-Temperature (PT) chart maps the thermodynamic saturation curve where liquid and vapor phases coexist in equilibrium. For zeotropic blends such as R-454B and R-407C, the chart provides distinct Dew Point curves for vapor/superheat reference and Bubble Point curves for liquid/subcooling reference to account for temperature glide (~1.5°F for R-454B, ~10.0°F for R-407C). For pure single-component refrigerants such as R-32, R-22, and R-134a, boiling and condensing occur at an identical temperature along a single saturation curve."
      formulaSnippet="T_sat = f(P_gauge, Ref_Dataset) | PSIA = PSIG + 14.696 (sea level) | Glide = T_dew - T_bubble"
      authorityCitation="NIST Standard Reference Database 23 (REFPROP v10.0), ASHRAE Standard 34 & AHRI Standard 700"
      toolComponent={<PtChartTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="refrigeration" />

          <h2>PT Calculation Methodology &amp; Refrigerant Property Data</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            A Pressure-Temperature (PT) chart defines the thermodynamic saturation curve of a refrigerant. In practical HVAC/R service, saturation pressure indicates the exact temperature at which the refrigerant boils in the evaporator coil or condenses in the condenser coil. When servicing modern low-GWP A2L systems (such as <strong>R-454B</strong> and <strong>R-32</strong>) alongside legacy <strong>R-410A</strong> and <strong>R-22</strong> units, selecting the correct saturation curve is essential for accurate diagnostics.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Classify Pure vs. Zeotropic Refrigerants</strong>: Pure single-component substances (such as R-32, R-22, and R-134a) and near-azeotropic mixtures (such as R-410A) evaporate and condense at a constant temperature along a single saturation curve. In contrast, zeotropic blends (such as R-454B and R-407C) exhibit <em>temperature glide</em>, requiring separate dew and bubble curves.
            </li>
            <li>
              <strong>Use the Dew Point Curve for Superheat</strong>: When measuring low-side suction pressure at the evaporator outlet, reference the <strong>Dew Point (Vapor Saturation) curve</strong> to determine the true vapor saturation temperature (T_sat_dew). Cross-reference actual measurements using the <Link href="/calculators/superheat-subcooling-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Target Superheat &amp; Subcooling Calculator</Link>.
            </li>
            <li>
              <strong>Use the Bubble Point Curve for Subcooling</strong>: When measuring high-side liquid line pressure before the expansion device (TXV/EEV), reference the <strong>Bubble Point (Liquid Saturation) curve</strong> to determine the true liquid saturation temperature (T_sat_bubble).
            </li>
            <li>
              <strong>Convert Between Gauge and Absolute Pressure</strong>: Manifold gauges measure gauge pressure (PSIG). Thermodynamic property equations utilize absolute pressure (PSIA), calculated at standard sea-level barometric pressure as PSIA = PSIG + 14.696.
            </li>
          </ol>

          <h2>Refrigerant Saturation vs. Air-Side Psychrometric Dew Point</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            In direct-expansion (DX) cooling systems, evaporator heat transfer connects refrigerant-side phase equilibrium with air-side psychrometrics:
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Latent Dehumidification Threshold</strong>: Dehumidification begins only when the evaporator coil surface temperature (governed by refrigerant saturation temperature <em>T_sat_dew</em>) is lower than the entering moist-air dew point (<em>T_dp</em>). Determine entering air dew point using the <Link href="/calculators/psychrometric-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Psychrometric Calculator</Link>.
            </li>
            <li>
              <strong>Sensible-Only Cooling</strong>: If <em>T_sat_dew</em> remains above the entering air dew point (<em>T_sat_dew &gt; T_dp</em>), no moisture condenses on coil fins; the process is purely sensible cooling along a constant humidity ratio line (<em>W</em>).
            </li>
            <li>
              <strong>Coil Freeze Hazard (32°F Boundary)</strong>: When suction pressure drops such that <em>T_sat_dew &lt; 32.0°F (0°C)</em>, condensed moisture freezes into frost and ice on coil fins, starving airflow and risking liquid slugging to the compressor.
            </li>
          </ul>

          <FormulaCard
            title="Refrigerant Saturation Property Mapping & Vapor-Liquid Equilibrium"
            formula="T_{\text{sat}} = f(P_{\text{gauge}}, \text{Refrigerant Dataset}) \quad | \quad \text{PSIA} = \text{PSIG} + 14.696 \text{ (at sea level)}"
            variables={[
              { symbol: "P_{\\text{sat}}", label: "Saturation Pressure", description: "Equilibrium vapor pressure where liquid and gas coexist in phase change", unit: "PSIA, PSIG, or Bar" },
              { symbol: "T_{\\text{sat}}", label: "Saturation Temperature", description: "Boiling or condensing temperature corresponding to the measured manifold pressure", unit: "°F or °C" },
              { symbol: "\\text{Glide}", label: "Zeotropic Temperature Glide", description: "Temperature difference between bubble point (100% liquid) and dew point (100% vapor) at constant pressure", unit: "°F" },
              { symbol: "\\text{PSIG}", label: "Gauge Pressure", description: "Pressure relative to local atmospheric pressure (0 PSIG = 14.696 PSIA at standard sea level)", unit: "PSIG" },
            ]}
            notes="Saturation property calculations are derived from NIST Standard Reference Database 23 (REFPROP v10.0) reference tables and manufacturer thermophysical property data. For zeotropic blends (R-454B, R-407C), always evaluate Dew Point for suction superheat and Bubble Point for liquid subcooling."
            sourceStandard="NIST Standard Reference Database 23 (REFPROP v10.0), ASHRAE Standard 34 & AHRI Standard 700"
          />

          <div
            style={{
              marginTop: "1.5rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderLeft: "4px solid #10b981",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                2026 EPA A2L Refrigerant Transition &amp; Charge Standards
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
                ASHRAE 15-2024 unmitigated charge limits (m1), UL 60335-2-40 detection requirements, and zeotropic glide protocols.
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Link
                href="/guides/a2l-refrigerant-transition-guide"
                style={{
                  padding: "0.45rem 0.85rem",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  background: "#10b981",
                  color: "#ffffff",
                  borderRadius: "0.375rem",
                  textDecoration: "none",
                }}
              >
                A2L Transition Guide →
              </Link>
              <Link
                href="/datasets/a2l-refrigerant-flammability-glide-benchmark"
                style={{
                  padding: "0.45rem 0.85rem",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "var(--ink)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "0.375rem",
                  textDecoration: "none",
                }}
              >
                200-Vector Dataset →
              </Link>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Supporting Research &amp; Technical References
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Low-GWP A2L Transition: <Link href="/guides/a2l-refrigerant-transition-guide" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>A2L Refrigerant Transition &amp; Charge Limit Sizing Guide</Link> — ASHRAE 15-2024 charge calculations and UL 60335-2-40 mitigation tiers.<br />
              • Open Benchmark Dataset: <Link href="/datasets/a2l-refrigerant-flammability-glide-benchmark" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>A2L Refrigerant Flammability &amp; Glide Benchmark (200 Vectors)</Link> — downloadable CSV with deterministic state vectors.<br />
              • Air-Side Psychrometrics: <Link href="/calculators/psychrometric-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Moist Air Psychrometric Calculator</Link> — calculate moist-air dew point, wet bulb, and specific enthalpy across barometric elevations.<br />
              • Field Charging Diagnostics: <Link href="/calculators/superheat-subcooling-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Target Superheat &amp; Subcooling Calculator</Link> — evaluate target superheat for fixed orifices and subcooling benchmarks for TXVs per ACCA field procedures.<br />
              • Applied Research: <Link href="/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Thermodynamic Modeling of Zeotropic A2L Refrigerant Glide (Report HL-TR-2026-A2L05)</Link> — phase equilibrium derivations and saturation equations.<br />
              • Field Handling &amp; Tooling Protocols: <Link href="/research/r454b-r32-field-handling-protocols" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>R-454B vs. R-32 Field Service &amp; Recovery Protocols (Report HL-TR-2026-A2L02)</Link> — DOT 4BA cylinder recovery limits, spark-proof tool certification, and vacuum decay diagnostics.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <>
          <h2>Refrigerant Saturation &amp; Pressure-Temperature Benchmark Table</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Operating saturation pressures across standard residential cooling design benchmarks (40°F Evaporator Suction / 110°F Condenser Liquid):
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Refrigerant</th>
                  <th scope="col">ASHRAE Safety Class</th>
                  <th scope="col">GWP Rating</th>
                  <th scope="col">40°F Evaporator (Suction)</th>
                  <th scope="col">110°F Condenser (Liquid)</th>
                  <th scope="col">Temperature Glide</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>R-454B</strong></td>
                  <td>A2L (Lower Flammability)</td>
                  <td>466</td>
                  <td>112.0 PSIG (Dew)</td>
                  <td>361.8 PSIG (Bubble)</td>
                  <td>1.5°F</td>
                </tr>
                <tr>
                  <td><strong>R-32</strong></td>
                  <td>A2L (Lower Flammability)</td>
                  <td>675</td>
                  <td>119.0 PSIG</td>
                  <td>371.0 PSIG</td>
                  <td>0.0°F (Pure)</td>
                </tr>
                <tr>
                  <td><strong>R-410A</strong></td>
                  <td>A1 (Non-Flammable)</td>
                  <td>2,088</td>
                  <td>118.0 PSIG</td>
                  <td>365.0 PSIG</td>
                  <td>0.2°F (Near-Azeotrope)</td>
                </tr>
                <tr>
                  <td><strong>R-22</strong></td>
                  <td>A1 (Non-Flammable)</td>
                  <td>1,810</td>
                  <td>68.5 PSIG</td>
                  <td>226.0 PSIG</td>
                  <td>0.0°F (Pure)</td>
                </tr>
                <tr>
                  <td><strong>R-134a</strong></td>
                  <td>A1 (Non-Flammable)</td>
                  <td>1,430</td>
                  <td>35.0 PSIG</td>
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
                <tr>
                  <td><strong>R-407C</strong></td>
                  <td>A1 (R-22 Retrofit)</td>
                  <td>1,774</td>
                  <td>63.5 PSIG (Dew)</td>
                  <td>262.0 PSIG (Bubble)</td>
                  <td>10.0°F (High Glide)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example 1: Verifying Suction Superheat on an R-454B Heat Pump</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> A technician is commissioning an R-454B residential split heat pump in cooling mode. The digital manifold connected to the true suction service port reads <strong>118.0 PSIG</strong>, and a pipe-clamp thermocouple on the suction vapor line reads <strong>53.5°F</strong>.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)", marginBottom: "1.5rem" }}>
            <p><strong>Step 1: Select the Dew Point Saturation Curve</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Because suction line superheat represents vapor state leaving the evaporator, evaluate the Dew Point curve for zeotropic R-454B.
            </p>

            <p><strong>Step 2: Determine Vapor Saturation Temperature (T_sat_dew)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              At 118.0 PSIG R-454B: T_sat_dew = 41.5°F
            </p>

            <p><strong>Step 3: Calculate Actual Suction Superheat</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Actual Superheat = T_line - T_sat_dew = 53.5°F - 41.5°F = 12.0°F Superheat
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Diagnostic Result:</strong> 12.0°F superheat verifies that the evaporator coil is operating with full active boiling surface while protecting the compressor from liquid slugging. Cross-check against target superheat using the <Link href="/calculators/superheat-subcooling-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Superheat &amp; Subcooling Calculator</Link>.
            </p>
          </div>

          <h2>Worked Example 2: Verifying Liquid Line Subcooling on an R-454B System</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> The same technician measures high-side liquid line pressure at <strong>361.8 PSIG</strong> before the thermal expansion valve (TXV), with a pipe-clamp temperature of <strong>100.0°F</strong>.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Select the Bubble Point Saturation Curve</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Because liquid line subcooling measures 100% condensed liquid leaving the condenser, evaluate the Bubble Point curve for R-454B.
            </p>

            <p><strong>Step 2: Determine Liquid Saturation Temperature (T_sat_bubble)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              At 361.8 PSIG R-454B: T_sat_bubble = 110.0°F
            </p>

            <p><strong>Step 3: Calculate Actual Liquid Subcooling</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Actual Subcooling = T_sat_bubble - T_line = 110.0°F - 100.0°F = 10.0°F Subcooling
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Diagnostic Result:</strong> 10.0°F subcooling ensures a solid column of liquid enters the expansion valve without premature flash-gas formation.
            </p>
          </div>
        </>
      }
    />
  );
}
