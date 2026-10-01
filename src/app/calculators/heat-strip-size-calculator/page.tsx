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
      directAnswer="Auxiliary electric heat strips are sized to satisfy the capacity deficit between building design heat loss and the heat pump's delivered heating output at local winter design temperature: kW_deficit = (Design Heat Loss BTU/hr - Delivered HP Output BTU/hr) / 3,412.14. Under National Electrical Code (NEC) Article 424.3(B), fixed electric space heating is treated as a continuous load requiring a 125% Minimum Circuit Ampacity (MCA = FLA × 1.25). Actual equipment selection and branch circuit sizing must be confirmed against the specific air-handler manufacturer nameplate and approved heater kit ratings."
      formulaSnippet="kW_deficit = (Q_loss - Q_hp_design) / 3412.14 | MCA = (kW * 1000 / V) * 1.25 | Delta_T = (kW * 3412.14) / (1.08 * CFM)"
      authorityCitation="Thermal Heating Deficit Principles, NEC Article 424, and ACCA Manual J & S Sizing Context"
      toolComponent={<HeatStripTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <h2>How Auxiliary Electric Heat Strip Sizing Works</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Electric resistance heat strips in heat pump split systems fulfill three primary operational roles: 
            <strong> supplemental heating</strong> (covering low-ambient capacity deficits below the thermal balance point), 
            <strong> emergency backup heating</strong> (providing full indoor comfort if the compressor locks out), and 
            <strong> defrost cycle tempering</strong> (offsetting the cold indoor draft during reverse-cycle outdoor coil defrost). Sizing should be based on verified design heat-loss calculations and certified heat pump performance data.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Determine Winter Design Heat Loss (Manual J)</strong>: Calculate peak heating demand at the local 99% winter outdoor design temperature using our{" "}
              <Link href="/calculators/heat-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Building Heat Loss Calculator</Link>{" "}
              and regional climatic data from{" "}
              <Link href="/ashrae-climatic-data" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>ASHRAE Climatic Design Data</Link>.
            </li>
            <li>
              <strong>Obtain Certified Heat Pump Delivered Capacity</strong>: Extract the manufacturer-rated heating output at the local 99% design temperature from expanded performance tables or verify balance points with the{" "}
              <Link href="/calculators/heat-pump-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Heat Pump Sizing Calculator</Link>.
            </li>
            <li>
              <strong>Calculate Net Thermal Deficit &amp; Select Standard Element</strong>: Subtract delivered heat pump output from design loss:
              <br />
              <code>Q<sub>deficit</sub> = Q<sub>loss</sub> - Q<sub>hp</sub></code> &rarr; <code>Theoretical kW = Q<sub>deficit</sub> / 3,412.142</code>. Select the smallest standard manufactured nominal size (e.g., 4.8 kW, 5.0 kW, 7.5 kW, 8.0 kW, 9.6 kW, 10.0 kW, 15.0 kW, or 20.0 kW) that satisfies the requirement.
            </li>
            <li>
              <strong>Calculate Electrical Load Parameters</strong>: Compute Full Load Amps (<code>FLA = kW &times; 1000 / Voltage</code>) and Minimum Circuit Ampacity (<code>MCA = FLA &times; 1.25</code>) per NEC 424 continuous load guidelines. Confirm final conductor and overcurrent protection requirements against the air handler nameplate.
            </li>
            <li>
              <strong>Review Multi-Circuit Partitioning (NEC 424.22)</strong>: Where single-phase electric resistance loads exceed 48A FLA (typically &gt;10 kW @ 240V), verify whether the equipment manufacturer requires subdivision into multiple branch circuits.
            </li>
            <li>
              <strong>Screen Airflow Delivery &amp; Temperature Rise</strong>: Check that air handler CFM airflow provides acceptable sensible temperature rise across the heating element (<code>&Delta;T = Delivered BTU / (1.08 &times; CFM)</code>) and conforms to manufacturer allowable limits using our{" "}
              <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>HVAC CFM Calculator</Link>.
            </li>
          </ol>

          <FormulaCard
            title="Auxiliary Heating Deficit &amp; Electrical Load Calculation Equations"
            formula="Q_{\text{deficit}} = \max(0, Q_{\text{loss}} - Q_{\text{hp}}) \quad\Bigg|\quad \text{kW}_{\text{req}} = \frac{Q_{\text{deficit}}}{3{,}412.142} \quad\Bigg|\quad \text{MCA} = \left(\frac{\text{kW} \cdot 1000}{V \cdot \sqrt{\Phi}}\right) \cdot 1.25"
            variables={[
              { symbol: "Q_{\\text{deficit}}", label: "Heating Deficit", description: "Unmet building heat load required from auxiliary resistance elements at design temperature", unit: "BTU/hr" },
              { symbol: "Q_{\\text{loss}}", label: "Design Heat Loss", description: "Peak steady-state heat loss of the structure at 99% winter outdoor design condition", unit: "BTU/hr" },
              { symbol: "Q_{\\text{hp}}", label: "Delivered HP Output", description: "Manufacturer-rated heating capacity delivered by the heat pump at outdoor design temperature", unit: "BTU/hr" },
              { symbol: "\\text{kW}_{\\text{req}}", label: "Theoretical Power", description: "Calculated electric resistance power required (1 kW = 3,412.142 BTU/hr)", unit: "kW" },
              { symbol: "\\text{MCA}", label: "Calculated Ampacity", description: "Continuous load ampacity rating including 125% multiplier per NEC Article 424", unit: "Amperes (A)" },
              { symbol: "V", label: "Nominal Line Voltage", description: "Operating voltage supplied to the air handler (typically 240V 1-phase or 208V/480V 3-phase)", unit: "Volts (V)" },
              { symbol: "\\Delta T", label: "Temperature Rise", description: "Sensible temperature rise across the element: Delta T = Delivered BTU / (1.08 * CFM)", unit: "°F" },
            ]}
            notes="This calculator serves as a thermal/electrical sizing aid. Final heater kit selection, staging, overcurrent protection, and wiring must be verified against certified manufacturer performance tables and equipment nameplate ratings."
            sourceStandard="ASHRAE Fundamentals, NEC Article 424, and ACCA Manual J & S Sizing Context"
          />
        </>
      }
      comparisonTableSection={
        <div style={{ overflowX: "auto" }}>
          <table className="table" style={{ width: "100%", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--border-color)" }}>
                <th>Nominal Size</th>
                <th>Delivered Heat</th>
                <th>240V 1Ø FLA</th>
                <th>240V 1Ø MCA (125%)</th>
                <th>Illustrative Breaker</th>
                <th>Illustrative Wire (75°C)</th>
                <th>Screening Airflow</th>
                <th>Typical Staging</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>4.8 kW</strong></td>
                <td>16,378 BTU/hr</td>
                <td>20.00 A</td>
                <td>25.00 A</td>
                <td>30 A 2-Pole</td>
                <td>10 AWG Cu</td>
                <td>216 CFM</td>
                <td>Single Stage (W1)</td>
              </tr>
              <tr>
                <td><strong>5.0 kW</strong></td>
                <td>17,061 BTU/hr</td>
                <td>20.83 A</td>
                <td>26.04 A</td>
                <td>30 A 2-Pole</td>
                <td>10 AWG Cu</td>
                <td>225 CFM</td>
                <td>Single Stage (W1)</td>
              </tr>
              <tr>
                <td><strong>7.5 kW</strong></td>
                <td>25,591 BTU/hr</td>
                <td>31.25 A</td>
                <td>39.06 A</td>
                <td>40 A 2-Pole</td>
                <td>8 AWG Cu</td>
                <td>338 CFM</td>
                <td>2-Stage (4.8 kW + 2.7 kW)</td>
              </tr>
              <tr>
                <td><strong>8.0 kW</strong></td>
                <td>27,297 BTU/hr</td>
                <td>33.33 A</td>
                <td>41.67 A</td>
                <td>45 A 2-Pole</td>
                <td>8 AWG Cu</td>
                <td>360 CFM</td>
                <td>2-Stage (4.0 kW + 4.0 kW)</td>
              </tr>
              <tr>
                <td><strong>9.6 kW</strong></td>
                <td>32,757 BTU/hr</td>
                <td>40.00 A</td>
                <td>50.00 A</td>
                <td>50 A 2-Pole</td>
                <td>8 AWG Cu</td>
                <td>432 CFM</td>
                <td>2-Stage</td>
              </tr>
              <tr>
                <td><strong>10.0 kW</strong></td>
                <td>34,121 BTU/hr</td>
                <td>41.67 A</td>
                <td>52.08 A</td>
                <td>60 A 2-Pole</td>
                <td>6 AWG Cu</td>
                <td>450 CFM</td>
                <td>2-Stage (5.0 kW + 5.0 kW)</td>
              </tr>
              <tr>
                <td><strong>14.4 kW</strong></td>
                <td>49,135 BTU/hr</td>
                <td>60.00 A</td>
                <td>75.00 A</td>
                <td>Split 2-Circuit Feed</td>
                <td>Split 6 AWG + 10 AWG</td>
                <td>648 CFM</td>
                <td>3-Stage</td>
              </tr>
              <tr>
                <td><strong>15.0 kW</strong></td>
                <td>51,182 BTU/hr</td>
                <td>62.50 A</td>
                <td>78.13 A</td>
                <td>Split: 60A + 30A</td>
                <td>Split: 6 AWG + 10 AWG</td>
                <td>675 CFM</td>
                <td>3-Stage (5.0 kW × 3)</td>
              </tr>
              <tr>
                <td><strong>19.2 kW</strong></td>
                <td>65,513 BTU/hr</td>
                <td>80.00 A</td>
                <td>100.00 A</td>
                <td>Split 2-Circuit Feed</td>
                <td>Split 6 AWG + 6 AWG</td>
                <td>864 CFM</td>
                <td>3-Stage</td>
              </tr>
              <tr>
                <td><strong>20.0 kW</strong></td>
                <td>68,243 BTU/hr</td>
                <td>83.33 A</td>
                <td>104.17 A</td>
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
            <strong>Scenario:</strong> Sizing auxiliary electric resistance heat for a 2,200 sq ft home in Columbus, Ohio (99% Winter Design Temperature = <strong>5°F</strong>). Whole-building design heat loss is <strong>45,000 BTU/hr</strong>. The installed 3.0-Ton cold-climate heat pump delivers <strong>24,000 BTU/hr</strong> at 5°F. Blower airflow is <strong>1,200 CFM</strong> at 240V single-phase.
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
                <strong>Convert to Theoretical Required Power (kW):</strong>
                <br />
                <code>Theoretical kW = 21,000 / 3,412.142 = 6.15 kW</code>
              </li>
              <li>
                <strong>Select Standard Manufactured Nominal Size:</strong>
                <br />
                The smallest available standard element satisfying the 6.15 kW deficit is <strong>7.5 kW</strong> (delivering <strong>25,591 BTU/hr</strong> with a +1.35 kW margin).
              </li>
              <li>
                <strong>Calculate Electrical Load Parameters (240V 1-Phase):</strong>
                <br />
                <code>FLA = (7.5 × 1,000) / 240V = 31.25 A</code>
                <br />
                <code>MCA = 31.25 A × 1.25 = 39.06 A (39.1 A)</code>
                <br />
                <strong>Illustrative Circuit Reference:</strong> 40A or 45A 2-Pole Breaker with 8 AWG THHN/THWN copper conductor (rated 50A @ 75°C). Final overcurrent protection must be confirmed with the air handler nameplate.
              </li>
              <li>
                <strong>Verify Airflow Temperature Rise:</strong>
                <br />
                <code>ΔT = 25,591 BTU/hr / (1.08 × 1,200 CFM) = 19.7°F</code>
                <br />
                The 19.7°F temperature rise is well within standard air-handler operating parameters and 1,200 CFM exceeds the illustrative screening baseline of 338 CFM.
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
