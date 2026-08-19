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
      directAnswer="To calculate superheat, subtract evaporator saturation temperature from the suction line temperature (Actual SH = T_suction - T_sat_dew). To calculate subcooling, subtract liquid line temperature from the condenser saturation temperature (Actual SC = T_sat_bubble - T_liquid). Use target superheat for fixed orifice systems and manufacturer target subcooling (typically 10°F ± 3°F) for TXV/EEV systems."
      formulaSnippet="Target SH = (3 * T_wb_in - T_db_out - 80) / 2  |  Actual SC = T_sat(P_liquid) - T_liquid_line"
      authorityCitation="EPA Section 608 Technician Guide & AHRI Standard 210/240"
      toolComponent={<SuperheatSubcoolingTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="refrigeration" />

          <h2>How to Charge & Diagnose Air Conditioning and Heat Pump Systems</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Accurate refrigerant charging is critical for system longevity, compressor motor cooling, and rated SEER2 efficiency. An incorrect charge by even 10% reduces energy efficiency by 15% to 20% and significantly increases compressor failure rates.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Identify Metering Device Type</strong>: Check whether the indoor coil uses a <em>Thermostatic Expansion Valve (TXV/EEV)</em> or a <em>Fixed Metering Device (Piston/Orifice)</em>. TXV systems regulate superheat and must be charged by <strong>Subcooling</strong>. Fixed orifice systems must be charged by <strong>Target Superheat</strong>.</li>
            <li><strong>Measure Pressure & Calculate Saturation Temperature</strong>: Connect digital manifold gauges. For zeotropic blends like <strong>R-454B</strong> and <strong>R-407C</strong>, reference the <em>Dew Point</em> curve on suction vapor pressure and the <em>Bubble Point</em> curve on liquid pressure to account for temperature glide.</li>
            <li><strong>Measure Pipe Surface Temperatures</strong>: Insulate digital thermocouple pipe clamps on the suction line (6 inches from compressor service valve) and liquid line (before the filter drier).</li>
            <li><strong>Compare Against Target Tolerances</strong>: Charge is optimal when actual values fall within <strong>±3.0°F</strong> of design target under stabilized run conditions (minimum 15 minutes runtime).</li>
          </ol>

          <FormulaCard
            title="Thermodynamic Superheat & Subcooling Equations"
            formula="\text{Target SH} = \frac{3 \cdot T_{\text{wb,in}} - T_{\text{db,out}} - 80}{2}  \quad | \quad \text{Actual SH} = T_{\text{suction}} - T_{\text{dew}}(P_{\text{suction}})  \quad | \quad \text{Actual SC} = T_{\text{bubble}}(P_{\text{liquid}}) - T_{\text{liquid}}"
            variables={[
              { symbol: "T_{\\text{wb,in}}", label: "Indoor Wet Bulb", description: "Entering indoor return air wet bulb temperature (measured at return grille)", unit: "°F" },
              { symbol: "T_{\\text{db,out}}", label: "Outdoor Dry Bulb", description: "Ambient outdoor condenser entering dry bulb temperature", unit: "°F" },
              { symbol: "T_{\\text{suction}}", label: "Suction Line Temp", description: "Vapor line surface temperature measured at service valve", unit: "°F" },
              { symbol: "T_{\\text{dew}}", label: "Evaporator Dew Saturation", description: "Saturation temperature corresponding to low-side vapor pressure", unit: "°F" },
              { symbol: "T_{\\text{liquid}}", label: "Liquid Line Temp", description: "High-side liquid copper line temperature", unit: "°F" },
              { symbol: "T_{\\text{bubble}}", label: "Condenser Bubble Saturation", description: "Saturation temperature corresponding to high-side liquid pressure", unit: "°F" },
            ]}
            notes="Target superheat formula is valid only when indoor wet bulb is between 50°F and 76°F and outdoor dry bulb is between 55°F and 115°F per ACCA guidelines."
            sourceStandard="EPA Section 608 / ACCA Manual S / NIST REFPROP v10.0"
          />
        </>
      }
      comparisonTableSection={
        <>
          <h2>Multi-Point Field Diagnostic Decision Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Cross-referencing Superheat (SH) and Subcooling (SC) isolates underlying system faults before making refrigerant adjustments:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Superheat (SH)</th>
                  <th scope="col">Subcooling (SC)</th>
                  <th scope="col">Primary Root Cause</th>
                  <th scope="col">Corrective Field Procedure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>High (&gt; Target + 3°F)</strong></td>
                  <td><strong>Low (&lt; Target - 3°F)</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}><strong>Undercharged / System Leak</strong></td>
                  <td>Electronic leak detection; repair leak, evacuate &lt; 500 microns, recharge by weight.</td>
                </tr>
                <tr>
                  <td><strong>Low (&lt; Target - 3°F)</strong></td>
                  <td><strong>High (&gt; Target + 3°F)</strong></td>
                  <td style={{ color: "var(--accent-warning)" }}><strong>Overcharged System</strong></td>
                  <td>Recover refrigerant into certified recovery cylinder according to EPA rules.</td>
                </tr>
                <tr>
                  <td><strong>High (&gt; Target + 3°F)</strong></td>
                  <td><strong>High (&gt; Target + 3°F)</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}><strong>Liquid Line Restriction</strong></td>
                  <td>Check filter drier temperature drop (ΔT &gt; 2°F); inspect TXV screen and thermal bulb.</td>
                </tr>
                <tr>
                  <td><strong>Low (&lt; Target - 3°F)</strong></td>
                  <td><strong>Low (&lt; Target - 3°F)</strong></td>
                  <td style={{ color: "var(--accent-warning)" }}><strong>Low Evaporator Airflow</strong></td>
                  <td>Check dirty air filter, matted evaporator coil, blower capacitor, or duct static pressure.</td>
                </tr>
                <tr>
                  <td><strong>Optimal (±3°F)</strong></td>
                  <td><strong>Optimal (±3°F)</strong></td>
                  <td style={{ color: "var(--accent-success)" }}><strong>Optimal System Operation</strong></td>
                  <td>System charge balanced; log operating pressures and temperatures.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Charging an R-410A Piston System on a 95°F Summer Day</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> A technician is servicing an R-410A split AC system with a fixed orifice piston. Outdoor ambient dry bulb is 95°F, indoor return wet bulb is 67°F. Manifold suction pressure reads 118 psig, suction pipe surface temperature is 54°F.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Calculate Target Superheat</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Target SH = (3 * 67°F - 95°F - 80) / 2 = (201 - 175) / 2 = 13.0°F Target
            </p>

            <p><strong>Step 2: Determine Evaporator Saturation Temperature & Actual Superheat</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              At 118 psig R-410A: T_sat = 40.0°F  |  Actual SH = 54.0°F - 40.0°F = 14.0°F Actual
            </p>

            <p><strong>Step 3: Evaluate Diagnostic Tolerance</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-success)", margin: "0.5rem 0" }}>
              Delta = |14.0°F - 13.0°F| = 1.0°F (Within ±3.0°F ACCA allowable window)
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Diagnosis:</strong> 🟢 <strong>Optimal Charge</strong>. The evaporator is operating at peak design boiling capacity with adequate vapor superheat to protect the compressor against liquid slugging.
            </p>
          </div>
        </>
      }
      relatedToolsSection={
        <div style={{ marginBottom: "2rem" }}>
          <h2>Related Field Diagnostic Tools</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <Link href="/calculators/pt-chart" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>Refrigerant PT Chart</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Interactive saturation pressure-temperature curves for R-454B, R-32, R-410A, and R-22.</p>
            </Link>
            <Link href="/calculators/ac-model-decoder" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>AC Model Number Decoder</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Verify factory refrigerant charge and nominal tonnage from equipment nameplates.</p>
            </Link>
            <Link href="/calculators/btu-calculator" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>BTU Load Master Sizer</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Calculate heating and cooling capacity requirements for proper equipment sizing.</p>
            </Link>
          </div>
        </div>
      }
    />
  );
}
