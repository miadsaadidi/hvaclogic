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
      directAnswer="A heat pump's thermal balance point is the outdoor temperature at which building heat loss equals available equipment heating capacity under the specified design conditions. Cold-climate variable-speed inverter profiles (ccASHP) maintain approximately 75% to 85% of rated capacity down to 5°F, typically yielding a thermal balance point between 15°F and 25°F for representative building loads. In dual-fuel configurations, the economic balance point indicates the outdoor temperature where operating the heat pump equals the cost per delivered BTU of an auxiliary fuel furnace under entered utility rates."
      formulaSnippet="T_thermal: Q_loss(T) = Q_hp(T) | COP_econ = 29.3071 * AFUE * (Elec_Rate / Gas_Rate) | Aux_kW = (Q_loss@Design - Q_hp@Design) / 3412.14"
      authorityCitation="ACCA Manual S (3rd Edition, 2023 with Addenda A & B), ACCA Manual J (8th Edition), ANSI/AHRI Standard 210/240-2023, & ASHRAE Handbook—Fundamentals"
      toolComponent={<HeatPumpSizeTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <h2>Calculation Method &amp; Technical References</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Heat pump sizing requires simultaneous thermodynamic evaluation across cooling loads and low-ambient heating capacity. While fuel-fired combustion furnaces deliver constant heating output regardless of outdoor weather, an air-source heat pump&apos;s available heating capacity decreases as ambient air temperature falls, while structural building heat loss increases linearly.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Determine Supplied Design Heating &amp; Cooling Loads</strong>: Use pre-calculated peak summer cooling loads and winter 99% design heat loss from the{" "}
              <Link href="/calculators/heat-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Building Heat Loss Sizer</Link>{" "}
              and regional winter design conditions from{" "}
              <Link href="/ashrae-climatic-data" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>ASHRAE Climatic Design Data</Link>. This calculator evaluates performance based on your entered building design loads rather than calculating a full Manual J room-by-room load internally.
            </li>
            <li>
              <strong>Select Compressor Architecture &amp; Performance Profile</strong>: Select between <em>Cold-Climate Variable-Speed Inverters (Illustrative ccASHP)</em>, <em>Standard Inverters</em>, and <em>Single-Stage</em> baseline profiles. Cold-climate inverter architectures utilize enhanced vapor injection or expanded compression envelopes to maintain high capacity retention at 5&deg;F (-15&deg;C).
            </li>
            <li>
              <strong>Solve for the Thermal Balance Point</strong>: Find the outdoor temperature where the building heat loss line intersects the equipment heating capacity curve (<em>Q</em><sub>loss</sub>(<em>T</em>) = <em>Q</em><sub>hp</sub>(<em>T</em>)). Above <em>T</em><sub>thermal</sub>, the heat pump carries 100% of the heating demand without supplementary heating elements.
            </li>
            <li>
              <strong>Evaluate Dual-Fuel Economic Switchover (T<sub>economic</sub>)</strong>: In hybrid dual-fuel systems (heat pump paired with a fuel-fired furnace), calculate the fuel parity COP threshold. Above the economic balance point, operating the heat pump is cheaper per delivered BTU; below it, burning natural gas in the furnace is more economical. Cross-reference equipment with the{" "}
              <Link href="/calculators/furnace-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Furnace Sizing Calculator</Link>.
            </li>
            <li>
              <strong>Calculate Auxiliary Heating Deficit &amp; Resistance Sizing</strong>: If using an all-electric air handler, evaluate the heating deficit at the winter design temperature and convert to theoretical resistance kW (kW = BTU/hr / 3,412.14). Select a standard modular electric heater stage supported by your equipment configuration. Confirm adequate duct airflow with the{" "}
              <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Airflow CFM Calculator</Link>.
            </li>
            <li>
              <strong>Review Preliminary ACCA Manual S Sizing Ratio</strong>: Check the ratio of nominal equipment cooling capacity to design cooling load. In heating-dominant climates, variable-capacity equipment can be sized up to 130%–150% of cooling load under Manual S 3rd Edition provisions (Addendum B), provided minimum modulating turndown satisfies part-load sensible and latent humidity requirements.
            </li>
          </ol>

          <FormulaCard
            title="Heat Pump Balance Point Equations &amp; Economic Parity"
            formula="T_{\text{thermal}}: Q_{\text{loss}}(T) = Q_{\text{hp}}(T) \quad | \quad \text{COP}_{\text{economic}} = 29.3071 \cdot \text{AFUE} \cdot \frac{\text{Rate}_{\text{elec}}}{\text{Rate}_{\text{gas}}} \quad | \quad Q_{\text{aux}} = \max(0, Q_{\text{loss}}(T_{\text{des}}) - Q_{\text{hp}}(T_{\text{des}}))"
            variables={[
              { symbol: "T_{\\text{thermal}}", label: "Thermal Balance Point", description: "Outdoor temperature where heat pump maximum heating output equals building envelope heat loss", unit: "°F" },
              { symbol: "T_{\\text{economic}}", label: "Economic Balance Point", description: "Outdoor switchover temperature where heat pump operating cost per MBTU equals gas furnace cost per MBTU", unit: "°F" },
              { symbol: "\\text{COP}_{\\text{economic}}", label: "Fuel Parity COP", description: "Threshold heat pump coefficient of performance required to achieve cost parity with fuel heating", unit: "Ratio" },
              { symbol: "Q_{\\text{loss}}(T)", label: "Building Heat Loss Model", description: "Linear steady-state envelope heat loss at ambient temperature T: Q_loss(T) = Q_design * (T_set - T) / (T_set - T_des)", unit: "BTU/hr" },
              { symbol: "Q_{\\text{hp}}(T)", label: "Heat Pump Heating Output", description: "Delivered compressor heating capacity at ambient temperature T per piecewise performance curve", unit: "BTU/hr" },
              { symbol: "Q_{\\text{aux}}", label: "Supplemental Heat Deficit", description: "Unmet heating load required from electric resistance elements or backup furnace at winter design", unit: "BTU/hr" },
              { symbol: "\\text{Aux}_{\\text{kW}}", label: "Theoretical Electric Deficit", description: "Calculated resistance heating requirement matched to design deficit (1 kW = 3,412.14 BTU/hr)", unit: "kW" },
            ]}
            notes="Under ANSI/ACCA 3 Manual S (3rd Edition, 2023 with Addenda A & B), variable-capacity heat pumps selected as the primary heating source can exceed traditional 115% cooling caps to satisfy low-ambient heating loads, provided the equipment's minimum modulating turndown satisfies part-load sensible and latent humidity requirements. Sizing ratios shown are preliminary; verify equipment selection against manufacturer expanded performance tables."
            sourceStandard="ACCA Manual S (3rd Ed, 2023), ACCA Manual J (8th Ed), ANSI/AHRI Standard 210/240-2023, and NEEP ccASHP Specification Framework"
          />

          <h2>Thermodynamic Distinction: Thermal Balance Point vs. Economic Switchover</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            The <strong>thermal balance point</strong> and the <strong>economic balance point</strong> represent two fundamentally distinct engineering phenomena:
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Thermal Balance Point (T<sub>thermal</sub>)</strong> is determined by <em>building envelope heat loss and equipment heating capacity</em>. It is the outdoor dry-bulb temperature where building heat loss exceeds the heat pump&apos;s available capacity. Below T<sub>thermal</sub>, supplemental heating is required to maintain indoor setpoint temperature. Above T<sub>thermal</sub>, variable-capacity inverters modulate between minimum turndown and maximum output to match building heat loss.
            </li>
            <li>
              <strong>Economic Balance Point (T<sub>economic</sub>)</strong> is determined by <em>utility tariffs and relative fuel conversion efficiencies</em>. In a hybrid dual-fuel configuration with a gas furnace, each fuel delivers thermal energy at a distinct unit cost ($/MBTU). As outdoor temperatures decline, heat pump COP decreases, increasing electrical cost per delivered BTU. The outdoor temperature where heat pump operating cost exceeds furnace operating cost is the estimated economic switchover point.
            </li>
          </ul>

          <h2>Why Heat Pump Heating Capacity Derates at Low Ambient Temperatures</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            The capacity decline of vapor-compression heat pumps in cold weather is governed by thermodynamic principles outlined in ASHRAE Fundamentals and AHRI 210/240:
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Decreased Suction Vapor Density</strong>: As outdoor evaporator saturation temperatures drop, the specific volume of suction vapor expands significantly per refrigerant phase equilibrium (inspect saturated pressures in the{" "}
              <Link href="/calculators/pt-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Refrigerant PT Chart</Link>). Because positive displacement compressors pump a fixed volumetric displacement per revolution, lower vapor density directly reduces mass flow rate, lowering delivered heating capacity.
            </li>
            <li>
              <strong>Elevated Compression Ratios</strong>: Low evaporator saturation pressures combined with indoor condensing pressures force higher compression ratios, lowering volumetric efficiency and increasing compressor motor load.
            </li>
            <li>
              <strong>Cold-Climate Inverter Vapor Injection</strong>: Modern cold-climate heat pumps (ccASHP) mitigate low-temperature derating through variable-speed compressors and intermediate economizer vapor injection, boosting refrigerant mass flow through the indoor coil at low ambient temperatures.
            </li>
          </ul>
        </>
      }
      comparisonTableSection={
        <>
          <h2>Representative Low-Ambient Capacity &amp; COP Performance Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Comparative heating capacity and Coefficient of Performance (COP) across standard test points (47&deg;F rated, 17&deg;F intermediate, and 5&deg;F cold-climate). Data reflects representative illustrative category baselines; specific equipment selection must be verified using OEM expanded rating data.
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Nominal Size</th>
                  <th scope="col">47&deg;F Rated Baseline</th>
                  <th scope="col">ccASHP @ 17&deg;F (COP ~2.7)</th>
                  <th scope="col">ccASHP @ 5&deg;F (COP ~2.0)</th>
                  <th scope="col">Standard Inverter @ 5&deg;F (COP ~1.6)</th>
                  <th scope="col">Single-Stage @ 5&deg;F (COP ~1.3)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>2.0 Tons (24,000 BTU)</strong></td>
                  <td>25,200 BTU/hr</td>
                  <td>22,176 BTU/hr</td>
                  <td>19,152 BTU/hr (76%)</td>
                  <td>13,104 BTU/hr (52%)</td>
                  <td>8,820 BTU/hr (35%)</td>
                </tr>
                <tr>
                  <td><strong>2.5 Tons (30,000 BTU)</strong></td>
                  <td>31,500 BTU/hr</td>
                  <td>27,720 BTU/hr</td>
                  <td>23,940 BTU/hr (76%)</td>
                  <td>16,380 BTU/hr (52%)</td>
                  <td>11,025 BTU/hr (35%)</td>
                </tr>
                <tr>
                  <td><strong>3.0 Tons (36,000 BTU)</strong></td>
                  <td>37,800 BTU/hr</td>
                  <td>33,264 BTU/hr</td>
                  <td>28,728 BTU/hr (76%)</td>
                  <td>19,656 BTU/hr (52%)</td>
                  <td>13,230 BTU/hr (35%)</td>
                </tr>
                <tr>
                  <td><strong>3.5 Tons (42,000 BTU)</strong></td>
                  <td>44,100 BTU/hr</td>
                  <td>38,808 BTU/hr</td>
                  <td>33,516 BTU/hr (76%)</td>
                  <td>22,932 BTU/hr (52%)</td>
                  <td>15,435 BTU/hr (35%)</td>
                </tr>
                <tr>
                  <td><strong>4.0 Tons (48,000 BTU)</strong></td>
                  <td>50,400 BTU/hr</td>
                  <td>44,352 BTU/hr</td>
                  <td>38,304 BTU/hr (76%)</td>
                  <td>26,208 BTU/hr (52%)</td>
                  <td>17,640 BTU/hr (35%)</td>
                </tr>
                <tr>
                  <td><strong>5.0 Tons (60,000 BTU)</strong></td>
                  <td>63,000 BTU/hr</td>
                  <td>55,440 BTU/hr</td>
                  <td>47,880 BTU/hr (76%)</td>
                  <td>32,760 BTU/hr (52%)</td>
                  <td>22,050 BTU/hr (35%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Engineering Scenario: Cold-Climate Heat Pump with Dual-Fuel Option</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Sizing analysis for a 2,200 sq ft home in Climate Zone 5. Winter 99% design temperature is <strong>5&deg;F</strong>, peak design heat loss is <strong>42,000 BTU/hr</strong>, and summer design sensible/latent cooling load is <strong>32,000 BTU/hr</strong>. Local utility rates are $0.16/kWh electricity and $1.40/therm natural gas (paired with a 95% AFUE backup furnace).
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Representative Heat Pump Performance Model (3.0 Ton ccASHP)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Nominal Cooling: 36,000 BTU/hr (3.0 Ton) | Nominal Heating @ 47&deg;F: 37,800 BTU/hr | Capacity @ 17&deg;F: 33,264 BTU/hr | Output @ 5&deg;F Design: 28,728 BTU/hr (76% retention)
            </p>

            <p><strong>Step 2: Solve for Exact Thermal Balance Point (T<sub>thermal</sub>)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Building loss model: Q_loss(T) = 42,000 &times; (70 - T) / (70 - 5) = 646.15 &times; (70 - T) BTU/hr.<br />
              Exact continuous intersection with heat pump capacity curve occurs at <strong>18.2&deg;F</strong> (rounded to 18&deg;F). Above 18.2&deg;F, the heat pump delivers 100% of the building heating demand.
            </p>

            <p><strong>Step 3: Calculate Supplemental Heating Deficit &amp; Resistance Sizing</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Deficit at 5&deg;F Design = 42,000 BTU/hr - 28,728 BTU/hr = 13,272 BTU/hr.<br />
              Theoretical Resistance Requirement = 13,272 / 3,412.14 = <strong>3.89 kW</strong> ==&gt; Select standard <strong>5.0 kW modular electric heater stage</strong> (where supported by equipment).
            </p>

            <p><strong>Step 4: Solve for Dual-Fuel Economic Switchover Balance Point (T<sub>economic</sub>)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Furnace Cost / MBTU = ($1.40 &times; 10) / 0.95 = $14.74 / MBTU.<br />
              Fuel Parity COP = 29.3071 &times; 0.95 &times; ($0.16 / $1.40) = <strong>3.18</strong>.<br />
              Heat pump COP exceeds 3.18 at temperatures above approximately <strong>30.1&deg;F</strong> (estimated economic crossover). Below 30.1&deg;F, operating the 95% AFUE gas furnace is cheaper per delivered BTU under these entered utility rates.
            </p>

            <p><strong>Step 5: Preliminary ACCA Manual S Sizing Ratio</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Cooling Sizing Ratio = 36,000 / 32,000 = 1.125 (112.5% of design cooling load; within standard variable-capacity 90%–130% preliminary window). Verify equipment selection and part-load dehumidification against OEM expanded data.
            </p>
          </div>
        </>
      }
    />
  );
}
