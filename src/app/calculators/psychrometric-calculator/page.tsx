import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { PsychrometricTool } from "@/components/calculator/tools/PsychrometricTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("psychrometric-calculator")!;

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

export default function PsychrometricCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Moist air psychrometric properties describe the thermodynamic state of air and water vapor mixtures. By inputting any of the three supported parameter pairs (Dry Bulb + Relative Humidity, Dry Bulb + Wet Bulb, or Dry Bulb + Dew Point), you can calculate Dew Point, Wet Bulb, Specific Enthalpy, Humidity Ratio (grains/lb), Specific Volume, and Moist Air Density with barometric altitude adjustment."
      formulaSnippet="P_ws = f_HW(T_R) | W = 0.621945 * (P_w / (P_atm - P_w)) | h = 0.240 * T_db + W * (1061 + 0.444 * T_db)"
      authorityCitation="ASHRAE Handbook—Fundamentals 2021 (Chapter 1, Psychrometrics) & ANSI/ASHRAE Standard 55-2023"
      toolComponent={<PsychrometricTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="refrigeration" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Moist Air Thermodynamic Formulations &amp; Psychrometric Equations"
              formula="P_{\text{ws}} = \exp\left(\frac{C_8}{T_R} + C_9 + C_{10} T_R + C_{11} T_R^2 + C_{12} T_R^3 + C_{13} \ln T_R\right) \quad | \quad W = 0.621945 \cdot \frac{P_w}{P_{\text{atm}} - P_w} \quad | \quad h = 0.240 \cdot T_{\text{db}} + W \cdot (1061 + 0.444 \cdot T_{\text{db}})"
              variables={[
                { symbol: "T_{\\text{db}}", label: "Dry Bulb Temperature", description: "Standard ambient temperature measured by a shielded thermometer", unit: "°F" },
                { symbol: "T_{\\text{wb}}", label: "Wet Bulb Temperature", description: "Equilibrium temperature reached by adiabatic evaporative cooling in moist air", unit: "°F" },
                { symbol: "T_{\\text{dp}}", label: "Dew Point Temperature", description: "Saturation temperature at which water vapor begins condensing into liquid droplets", unit: "°F" },
                { symbol: "\\text{RH}", label: "Relative Humidity", description: "Ratio of actual water vapor partial pressure (P_w) to saturation vapor pressure (P_ws) at T_db", unit: "%" },
                { symbol: "W", label: "Humidity Ratio", description: "Mass of water vapor per unit mass of dry air (7,000 grains = 1 lb dry air)", unit: "grains/lb (or lb/lb)" },
                { symbol: "h", label: "Specific Enthalpy", description: "Total heat content (sensible heat of air + latent heat of water vapor) per pound of dry air", unit: "BTU/lb dry air" },
              ]}
              notes="Saturation vapor pressure calculations use the Hyland-Wexler formulations adopted in ASHRAE Handbook—Fundamentals 2021 (Chapter 1). At sea level, standard atmospheric pressure is 14.696 psia (29.921 in.Hg). For every 1,000 feet of altitude gain, atmospheric pressure decreases according to the standard atmosphere model, reducing moist-air density."
              sourceStandard="ASHRAE Handbook—Fundamentals 2021 (Chapter 1, Psychrometrics) & ANSI/ASHRAE Standard 55-2023"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Moist-Air Thermodynamic Property Reference
            </h3>
            <p>
              Psychrometric calculations solve simultaneous mass and energy balances for dry air and water vapor mixtures. Key properties include:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
              <li>
                <strong>Dew Point Temperature (<em>T_dp</em>)</strong>: Governed by partial vapor pressure <em>P_w</em>. In cooling systems, surface temperatures below <em>T_dp</em> initiate moisture condensation. Compare entering air <em>T_dp</em> with refrigerant evaporating temperature using the <Link href="/calculators/pt-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Refrigerant PT Chart</Link> to verify dehumidification conditions.
              </li>
              <li>
                <strong>Specific Enthalpy (<em>h</em>)</strong>: Represents total heat content: sensible heat (<em>0.240 &times; T_db</em>) plus latent heat associated with evaporated water vapor (<em>W &times; [1061 + 0.444 &times; T_db]</em>). Enthalpy differences across a cooling or heating coil (<em>&Delta;h</em>) quantify total thermal load transfer.
              </li>
              <li>
                <strong>Wet Bulb Temperature (<em>T_wb</em>)</strong>: Reflects the combined dry-bulb and moisture evaporative potential. Entering wet bulb is the governing air-side variable for fixed-orifice target superheat diagnostics per ACCA field procedures.
              </li>
            </ul>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Supporting Research &amp; Technical References
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Refrigerant Saturation: <Link href="/calculators/pt-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Refrigerant PT Chart &amp; Saturation Calculator</Link> — cross-reference evaporator saturation temperature against moist-air dew point.<br />
              • Airflow Measurement: <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>CFM Airflow Calculator</Link> — calculate total volumetric supply air flow rate entering cooling coils.<br />
              • Field Diagnostics: <Link href="/calculators/superheat-subcooling-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Target Superheat &amp; Subcooling Calculator</Link> — evaluate refrigerant charge balance using entering wet-bulb conditions per ACCA field procedures.<br />
              • Building Envelope Physics: <Link href="/guides/psychrometrics-building-envelope-physics" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Psychrometrics &amp; Building Envelope Physics Guide</Link> — interstitial condensation risk modeling and vapor retarder mechanics.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <>
          <h2>Standard HVAC Psychrometric Reference States (Sea Level: 14.696 psia)</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Representative thermodynamic state points calculated across standard residential and commercial HVAC design conditions:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Operating Reference State</th>
                  <th scope="col">Calculation Basis &amp; Reference</th>
                  <th scope="col">Dry Bulb</th>
                  <th scope="col">Wet Bulb</th>
                  <th scope="col">Relative Humidity</th>
                  <th scope="col">Dew Point</th>
                  <th scope="col">Enthalpy (h)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Representative Indoor Summer Comfort State</strong></td>
                  <td>ANSI/ASHRAE Standard 55-2023 Reference Point</td>
                  <td>75.0°F</td>
                  <td>62.5°F</td>
                  <td>50.0%</td>
                  <td>55.1°F</td>
                  <td>28.14 BTU/lb</td>
                </tr>
                <tr>
                  <td><strong>Cooling Coil Entering Air (AHRI Rating Condition A)</strong></td>
                  <td>AHRI Standard 210/240-2023 Reference Point</td>
                  <td>80.0°F</td>
                  <td>67.0°F</td>
                  <td>51.2%</td>
                  <td>60.4°F</td>
                  <td>31.52 BTU/lb</td>
                </tr>
                <tr>
                  <td><strong>Cooling Coil Leaving Air (Supply Reference)</strong></td>
                  <td>AHRI 210/240 Nominal Supply Benchmark</td>
                  <td>55.0°F</td>
                  <td>53.5°F</td>
                  <td>91.2%</td>
                  <td>52.5°F</td>
                  <td>22.35 BTU/lb</td>
                </tr>
                <tr>
                  <td><strong>Outdoor Ambient Air (AHRI Rating Condition A)</strong></td>
                  <td>AHRI Standard 210/240-2023 Outdoor Condition</td>
                  <td>95.0°F</td>
                  <td>75.0°F</td>
                  <td>40.0%</td>
                  <td>66.5°F</td>
                  <td>38.60 BTU/lb</td>
                </tr>
                <tr>
                  <td><strong>Winter Heating Ambient Baseline</strong></td>
                  <td>ASHRAE 90.1 / Fundamentals Ch. 14 Baseline</td>
                  <td>32.0°F</td>
                  <td>29.5°F</td>
                  <td>70.0%</td>
                  <td>23.7°F</td>
                  <td>10.35 BTU/lb</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> An HVAC technician measures return air entering an evaporator coil at <strong>80.0°F Dry Bulb</strong> and <strong>67.0°F Wet Bulb</strong> at standard sea level barometric pressure (14.696 psia).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps (ASHRAE Fundamentals Formulation):</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Calculate Saturation Vapor Pressures (Hyland-Wexler):</strong> At 80.0°F, saturation pressure is <em>P_ws(80°F) = 0.507 psia</em>. At 67.0°F wet bulb, saturation pressure is <em>P_ws(67°F) = 0.329 psia</em>.</li>
              <li><strong>Solve Psychrometric Energy Balance:</strong> Actual water vapor partial pressure is <em>P_w = 0.260 psia</em>.</li>
              <li><strong>Determine Relative Humidity:</strong> <em>RH = (0.260 / 0.507) &times; 100% = 51.2%</em>.</li>
              <li><strong>Calculate Dew Point Temperature:</strong> Dew point temperature is <strong>60.4°F</strong>. If the evaporator coil surface operates below 60.4°F (cross-check via <Link href="/calculators/pt-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>PT Chart</Link>), moisture condenses out of the airstream.</li>
              <li><strong>Calculate Specific Enthalpy &amp; Humidity Ratio:</strong> Specific enthalpy is <strong>31.52 BTU/lb dry air</strong>; humidity ratio is <strong>78.4 grains/lb</strong> (0.0112 lb/lb).</li>
              <li>
                <strong>Secondary Coil Capacity Illustration (Standard Air Density Approximation):</strong> If supply air leaving the coil is measured at 22.35 BTU/lb enthalpy with 1,200 CFM airflow (verified via <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>CFM Calculator</Link>), total cooling capacity is evaluated under standard sea-level air density (&rho; = 0.075 lb/ft³, where 60 min/hr &times; 0.075 lb/ft³ = 4.5):
                <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 0" }}>
                  Q_total = 4.5 &times; CFM &times; &Delta;h = 4.5 &times; 1200 &times; (31.52 - 22.35) = 49,518 BTU/hr (4.13 Tons)
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", margin: "0.25rem 0 0" }}>
                  <em>Note: The 4.5 multiplier is an engineering approximation strictly valid for standard air density (&rho; = 0.075 lb/ft³ at sea level). For high-altitude installations, adjust density directly using local barometric pressure.</em>
                </p>
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
