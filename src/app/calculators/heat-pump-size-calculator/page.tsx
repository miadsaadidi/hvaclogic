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

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Heat Pump Low-Ambient Thermodynamics &amp; Thermal Balance Point Equations"
              formula="Q_loss(T) = Q_design * (70 - T) / (70 - T_design) | Q_deficit = max(0, Q_loss(T_design) - Q_hp(T_design)) | Aux_kW = Q_deficit / 3412.14"
              variables={[
                { symbol: "T_balance", label: "Thermal Balance Point", description: "Outdoor temperature where heat pump capacity line crosses building heat loss slope", unit: "°F" },
                { symbol: "Q_loss(T)", label: "Building Heat Loss Function", description: "Convective and conductive envelope heat loss at outdoor temperature T", unit: "BTU/hr" },
                { symbol: "Q_hp(T)", label: "Heat Pump Heating Capacity", description: "Derated heating output delivered by the refrigerant cycle at outdoor temperature T", unit: "BTU/hr" },
                { symbol: "Q_deficit", label: "Supplemental Heating Deficit", description: "Unmet heating load required from auxiliary electric resistance strips or dual-fuel furnace", unit: "BTU/hr" },
                { symbol: "Aux_kW", label: "Auxiliary Heat Strip Rating", description: "Electric strip element size needed at the winter design temperature (1 kW = 3,412.14 BTU)", unit: "kW" },
              ]}
              notes="Under ACCA Manual S, variable-speed inverter heat pumps can be sized up to 130% of the design cooling load to increase low-ambient winter heating capacity without causing summer short-cycling."
              sourceStandard="ACCA Manual S (2nd Edition), AHRI 210/240-2023, and NEEP ccASHP Specification"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Cold-Climate Inverter vs. Standard Heat Pumps in Winter
            </h3>
            <p>
              Air-source heat pump performance at freezing temperatures depends dramatically on compressor engineering:
            </p>
            <ul>
              <li><strong>Cold-Climate Inverters (ccASHP / Hyper-Heat):</strong> Feature vapor injection, high-compression scroll designs, and oversized outdoor coils. They maintain <strong>75% to 80% capacity at 5&deg;F</strong> and continue operating down to -15&deg;F.</li>
              <li><strong>Standard Single-Stage Heat Pumps:</strong> Drop to <strong>35% capacity at 5&deg;F</strong>, requiring large electric heat strips to turn on frequently at 30&deg;F to 35&deg;F.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Nominal Tonnage</th>
                <th scope="col">47&deg;F Heating Rating</th>
                <th scope="col">Cold-Climate (5&deg;F)</th>
                <th scope="col">Standard Inverter (5&deg;F)</th>
                <th scope="col">Single-Stage (5&deg;F)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>2.0 Tons (24k)</strong></td>
                <td>25,200 BTU</td>
                <td>19,150 BTU</td>
                <td>13,100 BTU</td>
                <td>8,800 BTU</td>
              </tr>
              <tr>
                <td><strong>2.5 Tons (30k)</strong></td>
                <td>31,500 BTU</td>
                <td>23,940 BTU</td>
                <td>16,380 BTU</td>
                <td>11,000 BTU</td>
              </tr>
              <tr>
                <td><strong>3.0 Tons (36k)</strong></td>
                <td>37,800 BTU</td>
                <td>28,720 BTU</td>
                <td>19,650 BTU</td>
                <td>13,200 BTU</td>
              </tr>
              <tr>
                <td><strong>3.5 Tons (42k)</strong></td>
                <td>44,100 BTU</td>
                <td>33,500 BTU</td>
                <td>22,900 BTU</td>
                <td>15,400 BTU</td>
              </tr>
              <tr>
                <td><strong>4.0 Tons (48k)</strong></td>
                <td>50,400 BTU</td>
                <td>38,300 BTU</td>
                <td>26,200 BTU</td>
                <td>17,600 BTU</td>
              </tr>
              <tr>
                <td><strong>5.0 Tons (60k)</strong></td>
                <td>63,000 BTU</td>
                <td>47,800 BTU</td>
                <td>32,700 BTU</td>
                <td>22,000 BTU</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a cold-climate heat pump for a 2,000 sq ft home with <strong>42,000 BTU/hr heat loss at 5&deg;F</strong> outdoor winter design temperature and a 32,000 BTU/hr summer cooling load.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Select Equipment:</strong> A 3.0-Ton (36,000 BTU) Cold-Climate Inverter heat pump delivers 37,800 BTU at 47&deg;F and <strong>28,720 BTU at 5&deg;F</strong>.</li>
              <li><strong>Determine Thermal Balance Point:</strong> The heat pump heating output line crosses the building heat loss curve at <strong>22&deg;F</strong> (100% heat pump heating above 22&deg;F).</li>
              <li><strong>Calculate Auxiliary Heat Deficit at 5&deg;F:</strong> 42,000 BTU - 28,720 BTU = <strong>13,280 BTU/hr deficit</strong>.</li>
              <li><strong>Size Electric Backup Heat Strip:</strong> 13,280 BTU / 3,412.14 = 3.89 kW $\rightarrow$ Select a standard <strong>5 kW or 8 kW backup heat strip</strong>.</li>
              <li><strong>ACCA Manual S Check:</strong> Cooling capacity ratio is 36,000 / 32,000 = <strong>1.12 (112%)</strong> (well within ACCA Manual S 130% inverter limits).</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
