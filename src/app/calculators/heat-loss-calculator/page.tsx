import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { HeatLossTool } from "@/components/calculator/tools/HeatLossTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("heat-loss-calculator")!;

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

export default function HeatLossCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Whole-building heat loss calculates the rate of thermal energy escaping a home under winter design weather conditions. Total heat loss is the sum of conductive transmission through building envelope assemblies (walls, ceilings, windows, slabs) and cold air infiltration leakage: Q_total = sum(U * A * Delta T) + (1.08 * CFM_inf * Delta T). Accurate heat loss calculations prevent furnace oversizing and ensure heat pump comfort."
      formulaSnippet="Q_total = Q_walls + Q_ceiling + Q_windows + Q_doors + Q_foundation + (1.08 * CFM_inf * Delta T)"
      authorityCitation="ASHRAE Handbook of Fundamentals 2021 & ACCA Manual J (8th Edition)"
      toolComponent={<HeatLossTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Whole-Building Peak Heat Loss &amp; Infiltration Equations"
              formula="Q_conductive = sum(U_i * A_i) * (T_indoor - T_outdoor) | Q_infiltration = 1.08 * CFM_inf * (T_indoor - T_outdoor) | Q_total = Q_conductive + Q_infiltration"
              variables={[
                { symbol: "Q_total", label: "Peak Building Heat Loss", description: "Total heating power required to maintain setpoint at design temperature", unit: "BTU/hr" },
                { symbol: "U_i", label: "Assembly U-Factor", description: "Thermal transmittance of each surface (1 / R-value)", unit: "BTU/hr·ft²·°F" },
                { symbol: "A_i", label: "Surface Area", description: "Net surface area of walls, roof, glazing, and doors", unit: "sq ft" },
                { symbol: "Delta T", label: "Design Temperature Difference", description: "Indoor setpoint minus the 99% ASHRAE winter design outdoor temperature", unit: "°F" },
                { symbol: "CFM_inf", label: "Infiltration Airflow", description: "Natural air leakage volume entering through envelope cracks", unit: "CFM" },
              ]}
              notes="Air leakage is governed by the sensible heat equation with air constant 1.08 (0.075 lb/cu ft × 0.240 BTU/lb·°F × 60 min/hr)."
              sourceStandard="ACCA Manual J Residential Load Calculation & ASHRAE Standard 90.2"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Conductive Transmission vs. Air Infiltration
            </h3>
            <p>
              A home loses heat through two primary thermodynamic pathways:
            </p>
            <ul>
              <li><strong>Conductive Transmission (Q = U &times; A &times; &Delta;T):</strong> Heat traveling directly through solid materials (glass, drywall, wood framing, siding). Upgrading to Low-E windows or continuous insulation reduces conductive heat flow.</li>
              <li><strong>Air Infiltration (Q = 1.08 &times; CFM &times; &Delta;T):</strong> Cold outside air rushing through unsealed gaps around windows, rim joists, can lights, and electrical outlets. Air sealing with closed-cell spray foam or acoustic caulking is often the most cost-effective way to slash heating bills.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Building Envelope Vintage</th>
                <th scope="col">2,000 Sq Ft Heat Loss</th>
                <th scope="col">Intensity</th>
                <th scope="col">Infiltration %</th>
                <th scope="col">Recommended Furnace</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>2020s High-Efficiency Tight Home</strong></td>
                <td>19,500 BTU/hr (5.7 kW)</td>
                <td>9.8 BTU/sq ft</td>
                <td>12%</td>
                <td>30,000 BTU / 2.0 Ton Heat Pump</td>
              </tr>
              <tr>
                <td><strong>1990s Standard Code Suburban</strong></td>
                <td>32,450 BTU/hr (9.5 kW)</td>
                <td>16.2 BTU/sq ft</td>
                <td>22%</td>
                <td>40,000 BTU / 3.0 Ton Heat Pump</td>
              </tr>
              <tr>
                <td><strong>1970s Semi-Insulated Ranch</strong></td>
                <td>48,900 BTU/hr (14.3 kW)</td>
                <td>24.5 BTU/sq ft</td>
                <td>31%</td>
                <td>60,000 BTU / 4.0 Ton Heat Pump</td>
              </tr>
              <tr>
                <td><strong>Pre-1950 Historic Leaky (Uninsulated)</strong></td>
                <td>74,200 BTU/hr (21.7 kW)</td>
                <td>37.1 BTU/sq ft</td>
                <td>42%</td>
                <td>90,000 BTU / Dual-Fuel System</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Calculating peak heat loss for a <strong>2,000 sq ft home</strong> in Denver, Colorado where outdoor 99% design temperature is <strong>10.0&deg;F</strong> and indoor setpoint is <strong>70.0&deg;F</strong> (&Delta;T = 60.0&deg;F).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Calculate Temperature Difference:</strong> &Delta;T = 70.0 - 10.0 = <strong>60.0&deg;F</strong>.</li>
              <li><strong>Above-Grade Wall Conduction:</strong> 1,270 sq ft net wall @ R-19 (U-0.049) &times; 60.0&deg;F = <strong>3,733 BTU/hr</strong>.</li>
              <li><strong>Ceiling &amp; Attic Conduction:</strong> 2,000 sq ft ceiling @ R-38 (U-0.026) &times; 60.0&deg;F = <strong>3,120 BTU/hr</strong>.</li>
              <li><strong>Window Conduction:</strong> 300 sq ft Low-E glass @ U-0.28 &times; 60.0&deg;F = <strong>5,040 BTU/hr</strong>.</li>
              <li><strong>Slab Perimeter Conduction:</strong> 179 ft perimeter @ F-0.50 &times; 60.0&deg;F = <strong>5,370 BTU/hr</strong>.</li>
              <li><strong>Air Infiltration Leakage:</strong> 18,000 cu ft volume @ 0.38 ACHnat = 114 CFM. Infiltration loss = 1.08 &times; 114 &times; 60.0 = <strong>7,387 BTU/hr</strong>.</li>
              <li><strong>Total Peak Heat Loss:</strong> 3,733 + 3,120 + 5,040 + 840 + 5,370 + 7,387 = <strong>25,490 BTU/hr</strong> (7.5 kW).</li>
              <li><strong>Equipment Recommendation:</strong> Adding a 15% ACCA Manual S safety factor yields 29,313 BTU/hr, matching a <strong>30,000 to 40,000 BTU 96% AFUE furnace</strong> or a <strong>2.5 Ton cold-climate heat pump</strong>.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
