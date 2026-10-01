import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { HeatStripTool } from "@/components/calculator/tools/HeatStripTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("heat-strip-size-calculator")!;

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

export default function HeatStripSizeCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Auxiliary electric heat strips are sized per ACCA Manual S (3rd Edition, Section 4) to satisfy the exact capacity deficit between peak building design heat loss (from ACCA Manual J) and the heat pump's delivered output at the local 99% winter outdoor design temperature: kW = (Design Heat Loss BTU/hr - Heat Pump Output @ Design BTU/hr) / 3,412.14. Under National Electrical Code (NEC) Article 424.3(B), electric resistance space heating is classified as a continuous load requiring a 125% Minimum Circuit Ampacity (MCA = FLA × 1.25). Furthermore, NEC 424.22(B) mandates that resistance loads exceeding 48A FLA (approx. >10 kW @ 240V) must be subdivided into multiple individual branch circuits protected by max 60A overcurrent devices."
      formulaSnippet="kW_deficit = (Q_loss@Design - Q_hp@Design) / 3412.14 | MCA = (kW * 1000 / V) * 1.25 | Delta_T = (kW * 3412.14) / (1.08 * CFM)"
      authorityCitation="ANSI/ACCA 3 Manual S (3rd Edition, 2023 Section 4), ACCA Manual J (8th Edition), NFPA 70 (NEC Articles 220 & 424), and UL 1995 / UL 60335-2-40"
      toolComponent={<HeatStripTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <h2>How to Size Electric Heat Strips for Heat Pumps (ACCA Manual S &amp; NEC 424)</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Electric resistance heat strips serve three distinct operational roles in residential and light-commercial heat pump split systems: 
            <strong> supplemental heating</strong> (covering low-ambient heating deficits below the thermal balance point), 
            <strong> emergency backup heating</strong> (sustaining indoor comfort during mechanical compressor failure), and 
            <strong> defrost cycle tempering</strong> (reheating conditioned air to offset the cold draft created when the heat pump reverses into cooling mode). Sizing must be performed deterministically rather than relying on arbitrary square-footage rules.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Determine 99% Design Heat Loss (ACCA Manual J)</strong>: Calculate total structural building heat loss at the local 99% winter design dry-bulb temperature using the{" "}
              <Link href="/calculators/heat-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Building Heat Loss Calculator</Link>{" "}
              and regional climatic datasets from{" "}
              <Link href="/ashrae-climatic-data" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>ASHRAE Climatic Design Data</Link>.
            </li>
            <li>
              <strong>Determine Heat Pump Output at Winter Design Temperature</strong>: Obtain the heat pump&apos;s delivered heating capacity at the 99% design temperature from manufacturer expanded performance tables or the{" "}
              <Link href="/calculators/heat-pump-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Heat Pump Balance Point Sizer</Link>. For inverter-driven cold climate heat pumps (ccASHP), output at 5&deg;F is often 75% to 100% of nominal capacity, drastically reducing the required heat strip size.
            </li>
            <li>
              <strong>Calculate Net Heating Deficit (kW)</strong>: Subtract delivered heat pump capacity from peak design loss:
              <br />
              <code>Q<sub>deficit</sub> = Q<sub>loss</sub> - Q<sub>hp</sub></code> &rarr; <code>Required kW = Q<sub>deficit</sub> / 3,412.14</code>. Select the nearest standard commercial manufactured element (e.g., 4.8 kW, 5 kW, 7.5 kW, 8 kW, 9.6 kW, 10 kW, 15 kW, or 20 kW).
            </li>
            <li>
              <strong>Evaluate 100% Emergency Heat Backup Mode</strong>: In harsh northern climates (ASHRAE Climate Zones 5–8) or mission-critical homes without secondary fuel sources, verify whether the client requires the resistance elements to carry 100% of the heating load if the outdoor compressor locks out: <code>kW<sub>emergency</sub> = Q<sub>loss</sub> / 3,412.14</code>.
            </li>
            <li>
              <strong>Calculate Electrical Circuit Parameters (NEC Article 424)</strong>: Compute Full Load Amps (<code>FLA = kW &times; 1000 / Voltage</code>), Minimum Circuit Ampacity (<code>MCA = FLA &times; 1.25</code>), and Maximum Overcurrent Protection Device (MOPD breaker size). Cross-reference conductor sizing in NEC Table 310.16.
            </li>
            <li>
              <strong>Verify Multi-Circuit Partitioning (NEC 424.22)</strong>: For total loads drawing &gt;48A FLA (such as 15 kW and 20 kW elements at 240V), verify that the air handler provides internal dual-breaker distribution or requires dual branch circuit homeruns from the electrical panel.
            </li>
            <li>
              <strong>Verify Blower Airflow &amp; Temperature Rise</strong>: Check that the air handler delivers at least 40 to 50 CFM per kW (min safe threshold: 45 CFM/kW) using the{" "}
              <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>HVAC CFM Airflow Calculator</Link>{" "}
              and verify duct sizing with the{" "}
              <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link>.
            </li>
          </ol>

          <FormulaCard
            title="ACCA Manual S Auxiliary Heating Deficit &amp; NEC Article 424 Sizing Equations"
            formula="Q_{\text{deficit}} = \max(0, Q_{\text{loss}}(T_{\text{des}}) - Q_{\text{hp}}(T_{\text{des}})) \quad\Bigg|\quad \text{kW}_{\text{req}} = \frac{Q_{\text{deficit}}}{3{,}412.14} \quad\Bigg|\quad \text{MCA} = \left(\frac{\text{kW} \cdot 1000}{V \cdot \sqrt{\Phi}}\right) \cdot 1.25"
            variables={[
              { symbol: "Q_{\\text{deficit}}", label: "Heating Deficit", description: "Unmet building heat load required from auxiliary resistance elements at design temperature", unit: "BTU/hr" },
              { symbol: "Q_{\\text{loss}}(T_{\\text{des}})", label: "Design Heat Loss", description: "Peak steady-state heat loss of the structure per ACCA Manual J at 99% winter outdoor design temp", unit: "BTU/hr" },
              { symbol: "Q_{\\text{hp}}(T_{\\text{des}})", label: "Heat Pump Output @ Design", description: "Delivered thermal capacity of the heat pump compressor at outdoor design temperature", unit: "BTU/hr" },
              { symbol: "\\text{kW}_{\\text{req}}", label: "Required Strip Capacity", description: "Theoretical electric resistance power required (1 kW = 3,412.142 BTU/hr)", unit: "kW" },
              { symbol: "\\text{MCA}", label: "Minimum Circuit Ampacity", description: "Conductor sizing rating including 125% continuous duty multiplier per NEC 424.3(B)", unit: "Amperes (A)" },
              { symbol: "V", label: "Nominal Line Voltage", description: "Operating voltage supplied to the air handler (typically 240V 1-phase or 208V/480V 3-phase)", unit: "Volts (V)" },
              { symbol: "\\Delta T", label: "Airflow Temperature Rise", description: "Sensible temperature rise across the heating element: Delta T = (kW * 3412.14) / (1.08 * CFM)", unit: "°F" },
            ]}
            notes="Under ANSI/ACCA 3 Manual S (3rd Edition, 2023) Section 4, auxiliary heat strip sizing must not exceed the calculated deficit plus a reasonable safety buffer (max 15% to 25%), avoiding severe electrical panel overload and excessive utility demand charges. Sizing must coordinate with NEC 424 for overcurrent protection."
            sourceStandard="ANSI/ACCA 3 Manual S (3rd Ed, 2023), ACCA Manual J (8th Ed), and NFPA 70 (NEC Article 424)"
          />
        </>
      }
      comparisonTableSection={
        <div style={{ overflowX: "auto" }}>
          <table className="table" style={{ width: "100%", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--border-color)" }}>
                <th>Nominal Size (kW)</th>
                <th>Delivered Heat (BTU/hr)</th>
                <th>240V 1Ø FLA</th>
                <th>240V 1Ø MCA (125%)</th>
                <th>MOPD Breaker</th>
                <th>Copper Conductor (75°C)</th>
                <th>Min Airflow (CFM)</th>
                <th>Typical Staging</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>4.8 / 5.0 kW</strong></td>
                <td>16,378 / 17,060</td>
                <td>20.8 A</td>
                <td>26.0 A</td>
                <td>30 A 2-Pole</td>
                <td>10 AWG Cu</td>
                <td>225 CFM</td>
                <td>Single Stage (W1)</td>
              </tr>
              <tr>
                <td><strong>7.5 / 8.0 kW</strong></td>
                <td>25,591 / 27,297</td>
                <td>33.3 A</td>
                <td>41.7 A</td>
                <td>45 A 2-Pole</td>
                <td>8 AWG Cu</td>
                <td>360 CFM</td>
                <td>2-Stage (4 kW + 4 kW)</td>
              </tr>
              <tr>
                <td><strong>9.6 / 10.0 kW</strong></td>
                <td>32,757 / 34,121</td>
                <td>41.7 A</td>
                <td>52.1 A</td>
                <td>60 A 2-Pole</td>
                <td>6 AWG Cu</td>
                <td>450 CFM</td>
                <td>2-Stage (5 kW + 5 kW)</td>
              </tr>
              <tr>
                <td><strong>14.4 / 15.0 kW</strong></td>
                <td>49,135 / 51,182</td>
                <td>62.5 A</td>
                <td>78.1 A</td>
                <td>Split: 60A + 30A</td>
                <td>Split: 6 AWG + 10 AWG</td>
                <td>675 CFM</td>
                <td>3-Stage (5 kW × 3)</td>
              </tr>
              <tr>
                <td><strong>19.2 / 20.0 kW</strong></td>
                <td>65,513 / 68,243</td>
                <td>83.3 A</td>
                <td>104.2 A</td>
                <td>Split: 60A + 60A</td>
                <td>Split: 6 AWG + 6 AWG</td>
                <td>900 CFM</td>
                <td>3-Stage (10 kW + 5 kW + 5 kW)</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing auxiliary electric resistance heat per ACCA Manual S (3rd Edition) for a 2,200 sq ft home in Columbus, Ohio (Climate Zone 5A, 99% Winter Design Temperature = <strong>5°F</strong>). Whole-building heat loss from ACCA Manual J is <strong>45,000 BTU/hr</strong>. The installed equipment is a 3.0-Ton variable-speed cold-climate heat pump (ccASHP) delivering <strong>24,000 BTU/hr</strong> at 5°F. Blower airflow is <strong>1,200 CFM</strong> at 240V single-phase.
          </p>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Step-by-Step Calculation:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>
                <strong>Calculate Heating Deficit:</strong>
                <br />
                <code>Q<sub>deficit</sub> = 45,000 BTU/hr - 24,000 BTU/hr = 21,000 BTU/hr</code>
              </li>
              <li>
                <strong>Convert to Required Electric Power (kW):</strong>
                <br />
                <code>kW<sub>req</sub> = 21,000 / 3,412.142 = 6.15 kW</code>
              </li>
              <li>
                <strong>Select Standard Manufactured Size:</strong>
                <br />
                Standard 5.0 kW delivers 17,060 BTU/hr (shortfall of 3,940 BTU/hr). Standard <strong>7.5 kW / 8.0 kW</strong> delivers 25,591 / 27,297 BTU/hr, covering 100%+ of the deficit. Selected: <strong>8.0 kW</strong>.
              </li>
              <li>
                <strong>Calculate NEC 424 Electrical Ampacity &amp; Overcurrent Protection:</strong>
                <br />
                <code>FLA = (8.0 × 1000) / 240V = 33.3 A</code>
                <br />
                <code>MCA = 33.3 A × 1.25 = 41.7 A</code> (Continuous duty safety factor)
                <br />
                <strong>MOPD Breaker</strong>: <strong>45A 2-Pole Breaker</strong> | <strong>Wire Gauge</strong>: <strong>8 AWG THHN/THWN Cu</strong> (rated 50A @ 75°C).
              </li>
              <li>
                <strong>Verify Temperature Rise and Airflow Safety:</strong>
                <br />
                <code>ΔT = (8.0 × 3,412.142) / (1.08 × 1,200 CFM) = 27,297 / 1,296 = 21.1°F</code>
                <br />
                The 21.1°F rise is well within the 35°F–60°F limit, and 1,200 CFM easily exceeds the minimum required threshold of 360 CFM (8 kW × 45 CFM/kW).
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
