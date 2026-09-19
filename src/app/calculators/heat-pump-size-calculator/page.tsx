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
      directAnswer="A heat pump's thermal balance point is the outdoor temperature where building heat loss equals equipment heating capacity. Modern cold-climate variable-speed inverter heat pumps (ccASHP) maintain 75% to 100% capacity down to 5°F, achieving a thermal balance point between 15°F and 25°F. In dual-fuel hybrid systems, the economic balance point marks the outdoor temperature where operating the heat pump costs the same per delivered BTU as firing the auxiliary gas furnace."
      formulaSnippet="T_thermal: Q_loss(T) = Q_hp(T) | COP_econ = 29.3071 * AFUE * (Elec_Rate / Gas_Rate) | Aux_kW = (Q_loss@Design - Q_hp@Design) / 3412.14"
      authorityCitation="ANSI/ACCA 3 Manual S (3rd Edition, 2023 with Addendum A/B), ANSI/AHRI Standard 210/240-2023, & NEEP ccASHP Specification v4.0"
      toolComponent={<HeatPumpSizeTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <h2>How to Size a Heat Pump &amp; Determine Thermal and Economic Balance Points</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Heat pump equipment selection requires simultaneous thermodynamic optimization across summer cooling sensible/latent loads and winter low-ambient heating output. Unlike fuel-fired combustion furnaces whose heating output remains constant regardless of weather, an air-source heat pump&apos;s heating capacity drops as ambient air temperature falls, precisely while structural building heat loss increases linearly.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Determine Design Heating &amp; Cooling Loads</strong>: Compute peak summer sensible/latent cooling loads and 99% winter design heat loss using the{" "}
              <Link href="/calculators/heat-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Building Heat Loss Sizer</Link>{" "}
              and regional winter design dry-bulb values from{" "}
              <Link href="/ashrae-climatic-data" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>ASHRAE Climatic Design Data</Link>. Building envelope performance can be audited with the{" "}
              <Link href="/calculators/effective-r-value-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Effective R-Value Calculator</Link>.
            </li>
            <li>
              <strong>Select Compressor Architecture &amp; Low-Ambient Technology</strong>: Distinguish between <em>Cold-Climate Variable-Speed Inverters (ccASHP)</em> with flash vapor injection, <em>Standard Inverters</em>, and <em>Single-Stage</em> units. Cold-climate systems maintain 75% to 100% of nominal capacity down to 5&deg;F (-15&deg;C) by boosting refrigerant mass flow at high compression ratios.
            </li>
            <li>
              <strong>Calculate the Thermal Balance Point</strong>: Solve for the outdoor temperature where the building heat loss line intersects the equipment maximum heating capacity curve. Above this temperature (T &gt; T<sub>thermal</sub>), the heat pump satisfies 100% of the heating demand without auxiliary backup, modulating compressor displacement between minimum turndown and maximum output to track the envelope load.
            </li>
            <li>
              <strong>Evaluate Dual-Fuel Economic Switchover (T<sub>economic</sub>)</strong>: In hybrid dual-fuel systems (heat pump paired with a condensing gas furnace), calculate the fuel parity COP threshold. Above the economic balance point, running the heat pump is cheaper per delivered BTU; below it, burning natural gas in the furnace is more economical. Cross-reference equipment sizing with the{" "}
              <Link href="/calculators/furnace-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Furnace Sizing Calculator</Link>.
            </li>
            <li>
              <strong>Size Auxiliary Electric Resistance Heat (kW)</strong>: If using an all-electric air handler, calculate the capacity deficit at the 99% winter design temperature and convert to standard electric strip increments (kW = BTU / 3,412.14). Confirm adequate duct airflow with the{" "}
              <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Airflow CFM Calculator</Link>.
            </li>
            <li>
              <strong>Verify ANSI/ACCA Manual S (3rd Edition) Compliance</strong>: Verify cooling sizing ratios against Manual S 3rd Edition limits (90%&ndash;115% for single-speed, 90%&ndash;130% for variable-capacity). In heating-dominant zones, apply Addendum B <em>Variable-Capacity Equipment Sizing Condition</em> provisions to prioritize heating capacity without causing summer low-load cycling. Check cooling sensible loads with the{" "}
              <Link href="/calculators/ac-tonnage-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>AC Tonnage Calculator</Link>.
            </li>
          </ol>

          <FormulaCard
            title="Heat Pump Balance Point Thermodynamics &amp; Dual-Fuel Economic Parity"
            formula="T_{\text{thermal}}: Q_{\text{loss}}(T) = Q_{\text{hp}}(T) \quad | \quad \text{COP}_{\text{economic}} = 29.3071 \cdot \text{AFUE} \cdot \frac{\text{Rate}_{\text{elec}}}{\text{Rate}_{\text{gas}}} \quad | \quad Q_{\text{aux}} = \max(0, Q_{\text{loss}}(T_{\text{des}}) - Q_{\text{hp}}(T_{\text{des}}))"
            variables={[
              { symbol: "T_{\\text{thermal}}", label: "Thermal Balance Point", description: "Outdoor temperature where heat pump maximum heating output exactly equals building envelope heat loss", unit: "°F" },
              { symbol: "T_{\\text{economic}}", label: "Economic Balance Point", description: "Outdoor switchover temperature where heat pump operating cost per MBTU equals gas furnace cost per MBTU", unit: "°F" },
              { symbol: "\\text{COP}_{\\text{economic}}", label: "Fuel Parity COP", description: "Threshold heat pump coefficient of performance required to achieve cost parity with gas heating", unit: "Ratio" },
              { symbol: "Q_{\\text{loss}}(T)", label: "Building Heat Loss Function", description: "Steady-state conductive and infiltration loss per ACCA Manual J at ambient temperature T", unit: "BTU/hr" },
              { symbol: "Q_{\\text{hp}}(T)", label: "Heat Pump Heating Output", description: "Delivered compressor heating capacity at ambient temperature T per expanded manufacturer ratings", unit: "BTU/hr" },
              { symbol: "Q_{\\text{aux}}", label: "Supplemental Heat Deficit", description: "Unmet heating load required from electric resistance elements or backup furnace at winter design", unit: "BTU/hr" },
              { symbol: "\\text{Aux}_{\\text{kW}}", label: "Electric Strip Element Size", description: "Nominal electric heater capacity matched to design deficit (1 kW = 3,412.14 BTU/hr)", unit: "kW" },
            ]}
            notes="Under ANSI/ACCA 3 Manual S (3rd Edition, 2023) and published Addendum B (2024), variable-capacity heat pumps selected as the primary heat source can exceed traditional 115% cooling caps (up to 130%–150% of cooling load) to carry low-ambient heating loads, provided the equipment's minimum modulating turndown satisfies part-load sensible and latent humidity requirements."
            sourceStandard="ANSI/ACCA 3 Manual S (3rd Ed, 2023 with Addenda A/B), ANSI/AHRI Standard 210/240-2023, and NEEP ccASHP Specification v4.0"
          />

          <h2>Thermodynamic Distinction: Thermal Balance Point vs. Economic Switchover</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Practitioners often conflate the <strong>thermal balance point</strong> with the <strong>economic balance point</strong>. They represent two fundamentally distinct engineering phenomena:
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Thermal Balance Point (T<sub>thermal</sub>)</strong> is dictated by the <em>laws of thermodynamics and structural heat transfer</em>. It is the exact outdoor dry-bulb temperature where building heat loss exceeds the heat pump&apos;s physical capacity. Below T<sub>thermal</sub>, supplementary heat is strictly required to prevent the indoor space from cooling below the thermostat setpoint. Above T<sub>thermal</sub>, modulating variable-capacity inverters throttle down along their modulation envelope to match the building heat loss curve without backup elements.
            </li>
            <li>
              <strong>Economic Balance Point (T<sub>economic</sub>)</strong> is dictated by <em>utility tariffs and relative fuel conversion efficiencies</em>. When a heat pump operates in a hybrid dual-fuel configuration with a gas furnace, each fuel delivers thermal energy at a distinct unit cost ($/MBTU). As outdoor temperatures decline, heat pump COP derates (from ~3.8 at 47&deg;F to ~2.0 at 5&deg;F), increasing the electrical cost per delivered BTU. The outdoor temperature where the cost of heat pump operation surpasses that of the furnace is the economic switchover point.
            </li>
          </ul>

          <h2>Why Heat Pump Capacity Derates at Low Ambient Temperatures</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            The capacity decline of vapor-compression heat pumps in cold weather is governed by thermodynamic principles outlined in ASHRAE Fundamentals (Chapter 18) and AHRI 210/240:
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Decreased Suction Vapor Density</strong>: As outdoor evaporator boiling temperatures fall (e.g., evaporating at -10&deg;F to absorb heat from 5&deg;F air), the specific volume of the suction vapor expands dramatically per refrigerant phase equilibrium (inspect saturated pressures in the{" "}
              <Link href="/calculators/pt-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Refrigerant PT Chart</Link>). Because positive displacement compressors pump a fixed volumetric displacement per revolution, lower vapor density directly reduces refrigerant mass flow rate (m&#775; = &rho; &times; V&#775;), reducing delivered heating capacity (Q = m&#775; &times; &Delta;h).
            </li>
            <li>
              <strong>Elevated Compression Ratios</strong>: Sub-zero evaporator saturation pressures combined with indoor condenser condensing pressures (e.g., 105&deg;F&ndash;115&deg;F) force compression ratios above 5:1 or 6:1, degrading volumetric efficiency and increasing compressor motor thermal stress.
            </li>
            <li>
              <strong>Cold-Climate Inverter Vapor Injection</strong>: Modern cold-climate heat pumps (ccASHP) mitigate this loss through variable-speed inverter compressors and flash-tank economizer vapor injection. By subcooling liquid refrigerant and injecting intermediate-pressure vapor directly into compressor scroll pockets, mass flow through the indoor heating coil is maintained even at -15&deg;F. Field commissioning should verify subcooling and superheat tolerances with the{" "}
              <Link href="/calculators/superheat-subcooling-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Superheat &amp; Subcooling Sizer</Link>.
            </li>
          </ul>
        </>
      }
      comparisonTableSection={
        <>
          <h2>Representative Low-Ambient Capacity &amp; COP Performance Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Comparative heating capacity retention and Coefficient of Performance (COP) across standardized AHRI 210/240-2023 rating test points (47&deg;F high-temp, 17&deg;F low-temp, and 5&deg;F cold-climate test conditions). Data illustrates representative category baselines; final equipment submittals must verify specific OEM expanded rating tables.
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Nominal Cooling Size</th>
                  <th scope="col">47&deg;F Rated Capacity</th>
                  <th scope="col">Cold-Climate ccASHP (5&deg;F / COP ~2.0)</th>
                  <th scope="col">Standard Inverter (5&deg;F / COP ~1.6)</th>
                  <th scope="col">Single-Stage (5&deg;F / COP ~1.3)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>2.0 Tons (24,000 BTU)</strong></td>
                  <td>25,200 BTU/hr</td>
                  <td>19,150 BTU/hr (76% retention)</td>
                  <td>13,100 BTU/hr (52% retention)</td>
                  <td>8,800 BTU/hr (35% retention)</td>
                </tr>
                <tr>
                  <td><strong>2.5 Tons (30,000 BTU)</strong></td>
                  <td>31,500 BTU/hr</td>
                  <td>23,940 BTU/hr (76% retention)</td>
                  <td>16,380 BTU/hr (52% retention)</td>
                  <td>11,000 BTU/hr (35% retention)</td>
                </tr>
                <tr>
                  <td><strong>3.0 Tons (36,000 BTU)</strong></td>
                  <td>37,800 BTU/hr</td>
                  <td>28,720 BTU/hr (76% retention)</td>
                  <td>19,650 BTU/hr (52% retention)</td>
                  <td>13,200 BTU/hr (35% retention)</td>
                </tr>
                <tr>
                  <td><strong>3.5 Tons (42,000 BTU)</strong></td>
                  <td>44,100 BTU/hr</td>
                  <td>33,500 BTU/hr (76% retention)</td>
                  <td>22,900 BTU/hr (52% retention)</td>
                  <td>15,400 BTU/hr (35% retention)</td>
                </tr>
                <tr>
                  <td><strong>4.0 Tons (48,000 BTU)</strong></td>
                  <td>50,400 BTU/hr</td>
                  <td>38,300 BTU/hr (76% retention)</td>
                  <td>26,200 BTU/hr (52% retention)</td>
                  <td>17,600 BTU/hr (35% retention)</td>
                </tr>
                <tr>
                  <td><strong>5.0 Tons (60,000 BTU)</strong></td>
                  <td>63,000 BTU/hr</td>
                  <td>47,800 BTU/hr (76% retention)</td>
                  <td>32,700 BTU/hr (52% retention)</td>
                  <td>22,000 BTU/hr (35% retention)</td>
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
            <strong>Scenario:</strong> Equipment selection for a 2,200 sq ft single-family home in Climate Zone 5 (Chicago / Minneapolis border). Winter 99% design temperature is <strong>5&deg;F</strong>, peak design heat loss is <strong>42,000 BTU/hr</strong>, and summer design sensible/latent cooling load is <strong>32,000 BTU/hr</strong>. Local utility rates are $0.16/kWh electricity and $1.40/therm natural gas (with a 95% AFUE backup furnace).
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Select Heat Pump Architecture (3.0 Ton Cold-Climate ccASHP)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Nominal Cooling: 36,000 BTU/hr (3.0 Ton) | Nominal Heating @ 47&deg;F: 37,800 BTU/hr | Output @ 5&deg;F Design: 28,720 BTU/hr (76% retention)
            </p>

            <p><strong>Step 2: Solve for Thermal Balance Point (T<sub>thermal</sub>)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Building loss slope: Q_loss(T) = 42,000 &times; (70 - T) / (70 - 5) = 646.15 &times; (70 - T) BTU/hr.<br />
              Intersection with heat pump capacity curve occurs at <strong>22&deg;F</strong>. Above 22&deg;F, heat pump satisfies 100% of heating load with zero backup.
            </p>

            <p><strong>Step 3: Calculate Supplemental Heating Deficit &amp; Auxiliary Heat Strip Size</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Deficit at 5&deg;F Design = 42,000 BTU/hr - 28,720 BTU/hr = 13,280 BTU/hr.<br />
              Auxiliary Electric Strip Rating = 13,280 / 3,412.14 = 3.89 kW ==&gt; <strong>Select standard 5.0 kW auxiliary electric resistance strip</strong>.
            </p>

            <p><strong>Step 4: Solve for Dual-Fuel Economic Switchover Balance Point (T<sub>economic</sub>)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Furnace Cost / MBTU = ($1.40 &times; 10) / 0.95 = $14.74 / MBTU.<br />
              Fuel Parity COP = 29.3071 &times; 0.95 &times; ($0.16 / $1.40) = <strong>3.18</strong>.<br />
              Heat pump COP exceeds 3.18 at temperatures above <strong>31&deg;F</strong>. Below 31&deg;F, operating the 95% AFUE gas furnace is cheaper per delivered BTU than the heat pump.
            </p>

            <p><strong>Step 5: ANSI/ACCA 3 Manual S (3rd Edition) Compliance Check</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Cooling Sizing Ratio = 36,000 / 32,000 = 1.125 (112.5% of design cooling load, strictly within the 130% variable-capacity limit per Manual S 3rd Ed).
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Engineering Recommendation:</strong> A 3.0-Ton ccASHP with a 5.0 kW backup strip provides complete thermal comfort. If paired in a dual-fuel hybrid configuration with a gas furnace, program the outdoor thermostat changeover setpoint to 31&deg;F for economic optimization, or 22&deg;F for maximum decarbonization.
            </p>
          </div>
        </>
      }
    />
  );
}
