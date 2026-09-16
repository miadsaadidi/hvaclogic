import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { HeatPumpSizeTool } from "@/components/calculator/tools/HeatPumpSizeTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("heat-pump-size-calculator")!;

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

export default function HeatPumpSizeCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="A heat pump's thermal balance point is the outdoor temperature where building heat loss equals the heat pump's maximum heating capacity. Modern cold-climate variable-speed inverter heat pumps maintain 75% to 100% capacity down to 5°F, achieving a thermal balance point between 15°F and 25°F. Below this balance point, supplemental electric resistance heat strips (5 to 15 kW) supply the deficit."
      formulaSnippet="T_balance: Building_Loss(T) = HeatPump_Output(T) | Aux_kW = (Design_Loss - HP_Output@Design) / 3412.14"
      authorityCitation="ACCA Manual S (Equipment Selection) & NEEP Cold-Climate Air-Source Heat Pump Specification"
      toolComponent={<HeatPumpSizeTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <h2>How to Size a Heat Pump &amp; Determine Thermal Balance Point</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Heat pump sizing requires balancing summer cooling capacity with winter low-ambient heating output. Unlike gas furnaces, air-source heat pump heating capacity drops as outdoor ambient temperatures fall, while building heat loss increases linearly.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Determine Design Cooling &amp; Heating Loads</strong>: Calculate peak summer cooling load (BTU/hr) and winter design heat loss using <Link href="/calculators/heat-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Building Heat Loss Sizer</Link> and <Link href="/ashrae-climatic-data" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>ASHRAE 99% Climatic Data</Link>.</li>
            <li><strong>Select Heat Pump Compressor Technology</strong>: Choose between <em>Cold-Climate Inverter (ccASHP)</em>, <em>Standard Inverter</em>, or <em>Single-Stage</em> systems. Cold-climate units maintain 75% to 100% capacity down to 5°F (-15°C) using flash vapor injection.</li>
            <li><strong>Determine the Thermal Balance Point</strong>: Plot building heat loss against heat pump heating capacity. The temperature intersection is the <strong>Thermal Balance Point</strong> (typically 15°F to 25°F for cold-climate inverters). Above this temperature, the heat pump meets 100% of the heating demand.</li>
            <li><strong>Size Auxiliary Electric Heat Strips (kW)</strong>: Calculate the heating deficit at the 99% winter design temperature and convert to kilowatt electrical strip elements (<code>kW = BTU / 3,412.14</code>).</li>
            <li><strong>Verify ACCA Manual S Sizing Limits</strong>: Ensure cooling capacity does not exceed 115% of cooling load for single-speed systems or 130% for modulating variable-speed inverters.</li>
          </ol>

          <FormulaCard
            title="Heat Pump Low-Ambient Thermodynamics &amp; Thermal Balance Point Equations"
            formula="Q_{\text{loss}}(T) = Q_{\text{design}} \cdot \frac{T_{\text{in}} - T}{T_{\text{in}} - T_{\text{design}}} \quad | \quad Q_{\text{deficit}} = \max(0, Q_{\text{loss}}(T_{\text{design}}) - Q_{\text{hp}}(T_{\text{design}})) \quad | \quad \text{Aux}_{\text{kW}} = \frac{Q_{\text{deficit}}}{3412.14}"
            variables={[
              { symbol: "T_{\\text{balance}}", label: "Thermal Balance Point", description: "Outdoor temperature where heat pump capacity line crosses building heat loss slope", unit: "°F" },
              { symbol: "Q_{\\text{loss}}(T)", label: "Building Heat Loss Function", description: "Convective and conductive envelope heat loss at outdoor temperature T", unit: "BTU/hr" },
              { symbol: "Q_{\\text{hp}}(T)", label: "Heat Pump Heating Capacity", description: "Derated heating output delivered by the refrigerant cycle at outdoor temperature T", unit: "BTU/hr" },
              { symbol: "Q_{\\text{deficit}}", label: "Supplemental Heating Deficit", description: "Unmet heating load required from auxiliary electric resistance strips or dual-fuel furnace", unit: "BTU/hr" },
              { symbol: "Aux_{\\text{kW}}", label: "Auxiliary Heat Strip Rating", description: "Electric strip element size needed at the winter design temperature (1 kW = 3,412.14 BTU)", unit: "kW" },
            ]}
            notes="Under ACCA Manual S, variable-speed inverter heat pumps can be sized up to 130% of the design cooling load to increase low-ambient winter heating capacity without causing summer short-cycling. Cross-reference regional 99% winter design temperatures in the ASHRAE Climatic Design Conditions Database."
            sourceStandard="ACCA Manual S (2nd Edition), AHRI 210/240-2023, and NEEP ccASHP Specification"
          />
        </>
      }
      comparisonTableSection={
        <>
          <h2>Cold-Climate Heat Pump Low-Ambient Capacity Comparison Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Heating capacity derate comparison at AHRI standard test points (47°F vs. 5°F low-ambient rating):
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Nominal Cooling Tonnage</th>
                  <th scope="col">47°F Heating Rating</th>
                  <th scope="col">Cold-Climate ccASHP (5°F)</th>
                  <th scope="col">Standard Inverter (5°F)</th>
                  <th scope="col">Single-Stage (5°F)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>2.0 Tons (24,000 BTU)</strong></td>
                  <td>25,200 BTU/hr</td>
                  <td>19,150 BTU/hr (76%)</td>
                  <td>13,100 BTU/hr (52%)</td>
                  <td>8,800 BTU/hr (35%)</td>
                </tr>
                <tr>
                  <td><strong>2.5 Tons (30,000 BTU)</strong></td>
                  <td>31,500 BTU/hr</td>
                  <td>23,940 BTU/hr (76%)</td>
                  <td>16,380 BTU/hr (52%)</td>
                  <td>11,000 BTU/hr (35%)</td>
                </tr>
                <tr>
                  <td><strong>3.0 Tons (36,000 BTU)</strong></td>
                  <td>37,800 BTU/hr</td>
                  <td>28,720 BTU/hr (76%)</td>
                  <td>19,650 BTU/hr (52%)</td>
                  <td>13,200 BTU/hr (35%)</td>
                </tr>
                <tr>
                  <td><strong>3.5 Tons (42,000 BTU)</strong></td>
                  <td>44,100 BTU/hr</td>
                  <td>33,500 BTU/hr (76%)</td>
                  <td>22,900 BTU/hr (52%)</td>
                  <td>15,400 BTU/hr (35%)</td>
                </tr>
                <tr>
                  <td><strong>4.0 Tons (48,000 BTU)</strong></td>
                  <td>50,400 BTU/hr</td>
                  <td>38,300 BTU/hr (76%)</td>
                  <td>26,200 BTU/hr (52%)</td>
                  <td>17,600 BTU/hr (35%)</td>
                </tr>
                <tr>
                  <td><strong>5.0 Tons (60,000 BTU)</strong></td>
                  <td>63,000 BTU/hr</td>
                  <td>47,800 BTU/hr (76%)</td>
                  <td>32,700 BTU/hr (52%)</td>
                  <td>22,000 BTU/hr (35%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Sizing a Cold-Climate Heat Pump for a 2,000 sq ft Home</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Sizing a cold-climate heat pump for a 2,000 sq ft home in Climate Zone 5 (Chicago). Winter design temperature is <strong>5°F</strong>, peak winter heat loss is <strong>42,000 BTU/hr</strong>, and summer cooling load is <strong>32,000 BTU/hr</strong>.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Select Equipment Capacity (3.0 Ton ccASHP)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              A 3.0-Ton (36,000 BTU) Cold-Climate Inverter delivers 37,800 BTU/hr at 47°F and 28,720 BTU/hr at 5°F.
            </p>

            <p><strong>Step 2: Determine Thermal Balance Point</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Heat pump output line crosses building heat loss curve at 22°F. Above 22°F, heat pump provides 100% of heating without backup strips.
            </p>

            <p><strong>Step 3: Calculate Supplemental Heating Deficit at 5°F Winter Design</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Heating Deficit = 42,000 BTU/hr (Loss) - 28,720 BTU/hr (HP Output) = 13,280 BTU/hr deficit
            </p>

            <p><strong>Step 4: Size Auxiliary Electric Backup Heat Strip</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Aux kW = 13,280 BTU / 3,412.14 = 3.89 kW ==&gt; Select standard 5.0 kW auxiliary electric heat strip
            </p>

            <p><strong>Step 5: ACCA Manual S Sizing Ratio Verification</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Cooling Sizing Ratio = 36,000 / 32,000 = 1.125 (112.5% of cooling load, within ACCA Manual S 130% limit)
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Conclusion:</strong> 3.0 Ton ccASHP + 5 kW electric strip provides full winter comfort and optimal summer humidity removal. Cross-reference with the <Link href="/calculators/furnace-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Furnace Sizing Calculator</Link> for dual-fuel comparison.
            </p>
          </div>
        </>
      }
    />
  );
}
