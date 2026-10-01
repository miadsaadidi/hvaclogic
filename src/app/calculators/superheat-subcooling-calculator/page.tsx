import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { SuperheatSubcoolingTool } from "@/components/calculator/tools/SuperheatSubcoolingTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("superheat-subcooling-calculator")!;

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

export default function SuperheatSubcoolingPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="To calculate superheat, subtract the evaporator dew-point saturation temperature from the suction line temperature (Actual SH = T_suction - T_sat_dew). To calculate subcooling, subtract the liquid line temperature from the condenser bubble-point saturation temperature (Actual SC = T_sat_bubble - T_liquid). For fixed orifice systems, compare against the target superheat correlation; for TXV/EEV systems, compare against the manufacturer data plate subcooling specification (commonly 10°F ± 3°F illustrative tolerance band)."
      formulaSnippet="Target SH = (3 * T_wb_in - T_db_out - 80) / 2  |  Actual SH = T_suction - T_dew(P_suction)  |  Actual SC = T_bubble(P_liquid) - T_liquid"
      authorityCitation="Technical References: ACCA Field Guidelines, NIST REFPROP Database, EPA Section 608 Guidance"
      toolComponent={<SuperheatSubcoolingTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="refrigeration" />

          <h2>Refrigerant Charging Diagnostics &amp; Saturation Measurements</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Accurate refrigerant charge assessment is essential for equipment reliability, efficient heat transfer, and compressor motor cooling. Operating with an improper charge can reduce system cooling capacity, elevate discharge temperatures, or increase the risk of liquid floodback under low-load conditions.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Identify Metering Device &amp; Manufacturer Procedure</strong>: Determine whether the system utilizes a <em>Thermostatic Expansion Valve (TXV/EEV)</em> or a <em>Fixed Metering Device (Piston/Orifice)</em>. Systems with fixed metering devices are evaluated using <strong>Target Superheat</strong> correlations, while systems with TXVs are evaluated against the manufacturer&apos;s specified <strong>Target Subcooling</strong>.</li>
            <li><strong>Measure Pressures &amp; Determine Exact Saturation Temperatures</strong>: Connect accurate digital manifold gauges. For zeotropic blends with temperature glide (such as <strong>R-454B</strong> or <strong>R-407C</strong>), reference the <em>Dew Point</em> saturation curve for suction vapor line superheat and the <em>Bubble Point</em> curve for liquid line subcooling.</li>
            <li><strong>Measure Pipe Surface Temperatures</strong>: Attach insulated digital thermocouple pipe clamps on the suction line (typically 6 inches from the service valve) and the liquid line (before the filter drier).</li>
            <li><strong>Allow System Stabilization</strong>: Operate the system for 10 to 15 minutes to allow refrigeration pressures and temperatures to reach steady-state before recording final diagnostic readings.</li>
          </ol>

          <FormulaCard
            title="Thermodynamic Superheat &amp; Subcooling Diagnostic Equations"
            formula="\text{Target SH} = \frac{3 \cdot T_{\text{wb,in}} - T_{\text{db,out}} - 80}{2}  \quad | \quad \text{Actual SH} = T_{\text{suction}} - T_{\text{dew}}(P_{\text{suction}})  \quad | \quad \text{Actual SC} = T_{\text{bubble}}(P_{\text{liquid}}) - T_{\text{liquid}}"
            variables={[
              { symbol: "T_{\\text{wb,in}}", label: "Indoor Wet Bulb", description: "Entering indoor return air wet bulb temperature (measured at return grille)", unit: "°F" },
              { symbol: "T_{\\text{db,out}}", label: "Outdoor Dry Bulb", description: "Ambient outdoor condenser entering dry bulb temperature", unit: "°F" },
              { symbol: "T_{\\text{suction}}", label: "Suction Line Temp", description: "Vapor line surface temperature measured at service valve", unit: "°F" },
              { symbol: "T_{\\text{dew}}", label: "Evaporator Dew Saturation", description: "Saturation temperature corresponding to low-side vapor pressure (NIST REFPROP)", unit: "°F" },
              { symbol: "T_{\\text{liquid}}", label: "Liquid Line Temp", description: "High-side liquid copper line temperature", unit: "°F" },
              { symbol: "T_{\\text{bubble}}", label: "Condenser Bubble Saturation", description: "Saturation temperature corresponding to high-side liquid pressure (NIST REFPROP)", unit: "°F" },
            ]}
            notes="The target superheat correlation is a field diagnostic estimation tool applicable when indoor wet bulb is between 50°F and 76°F and outdoor dry bulb is between 55°F and 115°F. Final charging verification must always reference the equipment manufacturer's charging chart."
            sourceStandard="ACCA Field Guidelines, NIST REFPROP Database, EPA Section 608 Guidance"
          />
        </>
      }
      comparisonTableSection={
        <>
          <h2>Multi-Point Field Diagnostic Reference Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Cross-referencing Superheat (SH) and Subcooling (SC) helps technicians identify operating patterns and investigate root causes before adjusting refrigerant charge:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Superheat (SH)</th>
                  <th scope="col">Subcooling (SC)</th>
                  <th scope="col">Observed Diagnostic Pattern</th>
                  <th scope="col">Recommended Verification &amp; Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>High (&gt; Target + 3°F)</strong></td>
                  <td><strong>Low (&lt; Target - 3°F)</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}><strong>Pattern Suggests Potential Undercharge / Leak</strong></td>
                  <td>Perform electronic leak detection; check service ports and braze joints; verify indoor airflow before adding refrigerant.</td>
                </tr>
                <tr>
                  <td><strong>Low (&lt; Target - 3°F)</strong></td>
                  <td><strong>High (&gt; Target + 3°F)</strong></td>
                  <td style={{ color: "var(--accent-warning)" }}><strong>Pattern Suggests Potential Overcharge</strong></td>
                  <td>Inspect TXV sensing bulb contact and insulation; verify airflow; if overcharged, recover into certified cylinder per EPA regulations.</td>
                </tr>
                <tr>
                  <td><strong>High (&gt; Target + 3°F)</strong></td>
                  <td><strong>High (&gt; Target + 3°F)</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}><strong>Pattern Suggests Potential Liquid Line Restriction</strong></td>
                  <td>Inspect filter drier for abnormal temperature drop (compare with OEM specs); inspect TXV inlet screen and thermal bulb.</td>
                </tr>
                <tr>
                  <td><strong>Low (&lt; Target - 3°F)</strong></td>
                  <td><strong>Low (&lt; Target - 3°F)</strong></td>
                  <td style={{ color: "var(--accent-warning)" }}><strong>Pattern Suggests Low Airflow / Low Load</strong></td>
                  <td>Inspect air filter cleanliness, evaporator coil condition, blower motor operation, and duct static pressure.</td>
                </tr>
                <tr>
                  <td><strong>Within Target (±3°F)</strong></td>
                  <td><strong>Within Target (±3°F)</strong></td>
                  <td style={{ color: "var(--accent-success)" }}><strong>Parameters Within Target Band</strong></td>
                  <td>No charging adjustment indicated by this measurement alone; log operating pressures, temperatures, and ambient conditions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Charging Diagnostic Example: R-410A Piston System on a 95°F Summer Day</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> A technician is evaluating an R-410A split system with a fixed orifice piston. Outdoor ambient dry bulb is 95°F, indoor return wet bulb is 67°F. Manifold suction pressure reads 118 psig, and suction line surface temperature is 54°F.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Calculate Target Superheat Correlation</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Target SH = (3 * 67°F - 95°F - 80) / 2 = (201 - 175) / 2 = 13.0°F Target
            </p>

            <p><strong>Step 2: Determine Evaporator Saturation Temperature &amp; Actual Superheat</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              At 118 psig R-410A: T_dew = 40.0°F  |  Actual SH = 54.0°F - 40.0°F = 14.0°F Actual
            </p>

            <p><strong>Step 3: Evaluate Relative Delta</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-success)", margin: "0.5rem 0" }}>
              Delta = |14.0°F - 13.0°F| = 1.0°F (Within ±3.0°F diagnostic screening band)
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Finding:</strong> Measured superheat is approximately 1.0°F above the calculated target under stated conditions. No refrigerant charge adjustment is indicated by this measurement alone. Verify that indoor airflow and filter cleanliness remain normal.
            </p>
          </div>
        </>
      }
    />
  );
}
