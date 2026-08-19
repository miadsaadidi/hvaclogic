import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { GarageHeaterTool } from "@/components/calculator/tools/GarageHeaterTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("garage-heater-sizing")!;

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

export default function GarageHeaterSizingPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Garage heater sizing calculates the heating capacity required to keep an attached or detached garage warm, accounting for uninsulated concrete slab heat sinks and overhead door air leakage. Total garage heat loss is calculated as: Q_total = (Q_walls + Q_ceiling + Q_door + Q_slab + Q_infiltration) * 1.10. Standard 2-car garages typically require a 30,000 to 45,000 BTU gas unit heater or a 5.0 to 7.5 kW electric heater."
      formulaSnippet="Q_total = (sum(U*A) + F_slab*P + 1.08*CFM_inf) * Delta_T * 1.10 | Electric_kW = Q_total / 3412.14"
      authorityCitation="ASHRAE Handbook of Fundamentals & ACCA Manual J (Table 4A Slab & Garage Loss)"
      toolComponent={<GarageHeaterTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Garage &amp; Workshop Heat Loss &amp; Electrical Sizing Equations"
              formula="Q_garage = [(U_w*A_w + U_c*A_c + U_d*A_d + F_slab*P_slab) + 1.08*CFM_inf] * (T_in - T_out) * 1.10 | kW = Q_garage / 3412.14 | Amps = (kW * 1000) / 240V | Breaker = Amps * 1.25"
              variables={[
                { symbol: "Q_garage", label: "Peak Garage Heat Loss", description: "Total heating demand accounting for uninsulated concrete slab edge conduction", unit: "BTU/hr" },
                { symbol: "F_slab", label: "Slab Edge F-Factor", description: "Perimeter heat loss coefficient through uninsulated concrete slab edges (0.50 to 0.60)", unit: "BTU/hr·ft·°F" },
                { symbol: "U_d", label: "Overhead Door U-Factor", description: "Thermal transmittance of the large roll-up sectional garage door (0.10 insulated to 1.15 steel)", unit: "BTU/hr·ft²·°F" },
                { symbol: "kW", label: "Electric Heating Power", description: "Required electrical output for forced-air unit heaters", unit: "kW" },
                { symbol: "Breaker", label: "240V Continuous Load Breaker", description: "NEC continuous load 125% circuit breaker sizing", unit: "Amps" },
              ]}
              notes="Garages feature massive uninsulated concrete slab thermal mass. Applying a 1.10 to 1.15 warm-up recovery multiplier ensures fast recovery after opening overhead garage doors."
              sourceStandard="ASHRAE Standard 90.2 & National Electrical Code (NEC Article 424)"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Gas Unit Heaters vs. Electric Forced-Air Heaters
            </h3>
            <p>
              When choosing a heater for a residential garage or workshop:
            </p>
            <ul>
              <li><strong>Forced-Air Gas Unit Heaters (e.g. Modine Hot Dawg, Mr. Heater Big Maxx):</strong> Fuel with Natural Gas or LP Propane. Ideal for cold climates where electricity rates are high. They vent exhaust gases horizontally through sidewall B-vent or power-exhaust pipes.</li>
              <li><strong>Electric Forced-Air Unit Heaters (e.g. Fahrenheat, King, Dimplex):</strong> Extremely simple to install (zero chimneys, fuel piping, or combustion air needed). They require a dedicated 240V 2-pole circuit breaker (e.g., 30A for 5 kW, 40A for 7.5 kW).</li>
              <li><strong>Radiant Tube Infrared Heaters:</strong> Best for high-ceiling shops (&ge;12 ft) because they heat objects and concrete floors directly without blowing dust.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Garage Size / Layout</th>
                <th scope="col">Square Footage</th>
                <th scope="col">Insulation Level</th>
                <th scope="col">Recommended Gas Heater</th>
                <th scope="col">Recommended Electric</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1-Car Garage (12&apos; &times; 22&apos;)</strong></td>
                <td>264 sq ft</td>
                <td>Poor / Uninsulated</td>
                <td>30,000 BTU/hr</td>
                <td>3.0 to 4.0 kW (20A Breaker)</td>
              </tr>
              <tr>
                <td><strong>2-Car Garage (22&apos; &times; 24&apos;)</strong></td>
                <td>528 sq ft</td>
                <td>Average (R-13 Walls)</td>
                <td>30,000 to 45,000 BTU/hr</td>
                <td>5.0 kW (30A Breaker)</td>
              </tr>
              <tr>
                <td><strong>2.5-Car Garage (24&apos; &times; 26&apos;)</strong></td>
                <td>624 sq ft</td>
                <td>Average (Insulated Door)</td>
                <td>45,000 BTU/hr</td>
                <td>7.5 kW (40A Breaker)</td>
              </tr>
              <tr>
                <td><strong>3-Car Garage (24&apos; &times; 32&apos;)</strong></td>
                <td>768 sq ft</td>
                <td>Insulated (R-19/R-38)</td>
                <td>60,000 BTU/hr</td>
                <td>7.5 to 10.0 kW (50A Breaker)</td>
              </tr>
              <tr>
                <td><strong>Pole Barn Shop (30&apos; &times; 40&apos;)</strong></td>
                <td>1,200 sq ft</td>
                <td>Uninsulated / 14&apos; Ceiling</td>
                <td>100,000 to 125,000 BTU/hr</td>
                <td>15.0 kW (80A Breaker)</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a heater for a <strong>2-car attached garage (22&apos; &times; 24&apos; = 528 sq ft)</strong> with a 9-foot ceiling in Ohio. The garage has average R-13 walls, an R-6 insulated overhead door, and uninsulated slab. The target setpoint is <strong>60.0&deg;F</strong> and outdoor design temperature is <strong>10.0&deg;F</strong> (&Delta;T = 50.0&deg;F).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Calculate Temperature Difference:</strong> &Delta;T = 60.0 - 10.0 = <strong>50.0&deg;F</strong>.</li>
              <li><strong>Overhead Door Conduction:</strong> 112 sq ft @ U-0.20 &times; 50.0&deg;F = <strong>1,120 BTU/hr</strong>.</li>
              <li><strong>Exposed Wall Conduction:</strong> 500 sq ft net wall @ U-0.07 &times; 50.0&deg;F = <strong>1,750 BTU/hr</strong>.</li>
              <li><strong>Ceiling Conduction:</strong> 528 sq ft ceiling @ U-0.045 &times; 50.0&deg;F = <strong>1,188 BTU/hr</strong>.</li>
              <li><strong>Concrete Slab Edge Conduction:</strong> 92 ft perimeter @ F-0.50 &times; 50.0&deg;F = <strong>2,300 BTU/hr</strong>.</li>
              <li><strong>Air Infiltration Leakage:</strong> 4,752 cu ft @ 0.45 ACH = 35.6 CFM. Infiltration = 1.08 &times; 35.6 &times; 50.0 = <strong>1,922 BTU/hr</strong>.</li>
              <li><strong>Total Peak Heat Loss:</strong> (1,120 + 1,750 + 1,188 + 2,300 + 1,922) &times; 1.10 warm-up factor = <strong>9,111 BTU/hr</strong> (2.7 kW).</li>
              <li><strong>Heater Selection:</strong>
                <ul style={{ marginTop: "0.25rem" }}>
                  <li><strong>Gas Unit Heater:</strong> Standard <strong>30,000 BTU/hr</strong> (e.g. Modine Hot Dawg HD30 or Mr. Heater Big Maxx MHU45).</li>
                  <li><strong>Electric Forced-Air Heater:</strong> <strong>3.0 kW to 5.0 kW</strong> (12.5A to 20.8A @ 240V, wired to a <strong>20A to 30A 2-pole breaker</strong>).</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
