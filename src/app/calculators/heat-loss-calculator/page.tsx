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
      directAnswer="Whole-building heat loss calculates the preliminary rate of thermal energy escaping a home under winter design weather conditions. Total peak heat loss is the sum of conductive transmission through envelope assemblies (walls, ceilings, windows, doors, slab/foundation) and sensible air infiltration leakage: Q_total = sum(U_i * A_i * Delta T) + (F * P * Delta T) + (1.08 * CFM_inf * Delta T). This tool provides a preliminary screening estimate; final HVAC equipment sizing requires a room-by-room ACCA Manual J load calculation and ACCA Manual S equipment selection."
      formulaSnippet="Q_total = Q_walls + Q_ceiling + Q_windows + Q_doors + Q_foundation + (1.08 * CFM_inf * Delta T)"
      authorityCitation="ASHRAE Handbook of Fundamentals & ACCA Manual J Reference Physics"
      toolComponent={<HeatLossTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Whole-Building Peak Heat Loss &amp; Infiltration Equations"
              formula="Q_conductive = sum(U_i * A_i * Delta T) + (F_slab * P * Delta T) | Q_infiltration = 1.08 * CFM_inf * Delta T | Q_total = Q_conductive + Q_infiltration"
              variables={[
                { symbol: "Q_total", label: "Peak Building Heat Loss", description: "Preliminary heating power required to maintain indoor temperature under winter design conditions", unit: "BTU/hr" },
                { symbol: "U_i", label: "Assembly U-Factor", description: "Overall thermal transmittance of building envelope surface (1 / R_effective)", unit: "BTU/hr·ft²·°F" },
                { symbol: "A_i", label: "Surface Area", description: "Net surface area of above-grade walls, ceiling/roof, windows, and exterior doors", unit: "sq ft" },
                { symbol: "F_slab", label: "Foundation F-Factor", description: "Linear heat loss coefficient per linear foot of exposed slab perimeter (e.g. F-0.50 for uninsulated slab)", unit: "BTU/hr·ft·°F" },
                { symbol: "Delta T", label: "Design Temperature Difference", description: "Indoor setpoint minus the local 99% ASHRAE winter design outdoor temperature", unit: "°F" },
                { symbol: "CFM_inf", label: "Infiltration Airflow", description: "Natural outdoor air leakage volume entering through envelope cracks (Volume * ACHnat / 60)", unit: "CFM" },
              ]}
              notes="This tool calculates a preliminary whole-building screening estimate. Air leakage is governed by the sensible heat equation with standard air constant 1.08. For detailed room-by-room heating loads, execute a complete ACCA Manual J calculation."
              sourceStandard="ASHRAE Handbook of Fundamentals & ACCA Manual J (8th Edition)"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Conductive Transmission, Foundation F-Factors &amp; Infiltration
            </h3>
            <p>
              A home loses heat through three primary physical pathways:
            </p>
            <ul>
              <li><strong>Envelope Conduction (Q = U &times; A &times; &Delta;T):</strong> Heat transferring through solid above-grade walls, roof/ceiling, windows, and exterior doors. To account for framing thermal bridging across wood or steel studs, derive exact assembly U-factors with the <Link href="/calculators/effective-r-value-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Effective R-Value Calculator</Link>.</li>
              <li><strong>Foundation Perimeter Conduction (Q = F &times; P &times; &Delta;T):</strong> Slab-on-grade heat loss occurs predominantly at the exposed slab edge perimeter rather than uniformly through the slab floor. ACCA Manual J and ASHRAE characterize slab loss using linear F-factors (e.g., F-0.50 for uninsulated edge slabs).</li>
              <li><strong>Air Infiltration Leakage (Q = 1.08 &times; CFM &times; &Delta;T):</strong> Cold outdoor air entering through unsealed envelope penetrations. Natural air changes per hour (ACHnat) are derived from blower-door tightness tiers (ACH50 / N-factor) multiplied by building volume.</li>
            </ul>

            <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.4rem" }}>
                Screening Estimates vs. ACCA Manual J &amp; Manual S Sizing
              </h4>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
                This calculator provides a preliminary building-level heat loss estimate based on simplified geometric baselines. It is not a substitute for a full room-by-room ACCA Manual J load calculation, which accounts for exact window orientations, duct heat losses, internal heat gains, and room boundary surfaces. Furthermore, equipment selection requires applying ACCA Manual S sizing limits against manufacturer-verified heating output tables at local design temperatures.
              </p>
            </div>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Building Envelope Vintage</th>
                <th scope="col">2,000 Sq Ft Peak Heat Loss</th>
                <th scope="col">Thermal Intensity</th>
                <th scope="col">Infiltration Share</th>
                <th scope="col">Preliminary Demand</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>2020s High-Efficiency Tight Home</strong></td>
                <td>15,950 BTU/hr (4.7 kW)</td>
                <td>8.0 BTU/sq ft·hr</td>
                <td>16%</td>
                <td>16.0 kBTU/hr Load Reference</td>
              </tr>
              <tr>
                <td><strong>1990s Standard Code Suburban</strong></td>
                <td>30,120 BTU/hr (8.8 kW)</td>
                <td>15.1 BTU/sq ft·hr</td>
                <td>25%</td>
                <td>30.1 kBTU/hr Load Reference</td>
              </tr>
              <tr>
                <td><strong>1960s Semi-Insulated Ranch</strong></td>
                <td>46,840 BTU/hr (13.7 kW)</td>
                <td>23.4 BTU/sq ft·hr</td>
                <td>32%</td>
                <td>46.8 kBTU/hr Load Reference</td>
              </tr>
              <tr>
                <td><strong>Pre-1940 Historic Leaky (Uninsulated)</strong></td>
                <td>72,650 BTU/hr (21.3 kW)</td>
                <td>36.3 BTU/sq ft·hr</td>
                <td>44%</td>
                <td>72.7 kBTU/hr Load Reference</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Calculating preliminary peak heat loss for a <strong>2,000 sq ft home</strong> in Denver, CO where 99% winter outdoor design temperature is <strong>10.0&deg;F</strong> and indoor heating setpoint is <strong>70.0&deg;F</strong> (&Delta;T = 60.0&deg;F).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Design Temperature Difference:</strong> &Delta;T = 70.0 - 10.0 = <strong>60.0&deg;F</strong>.</li>
              <li><strong>Building Dimensions:</strong> Perimeter P = 4 &times; &radic;2000 = <strong>178.9 ft</strong>. Gross wall area = 178.9 &times; 9 ft = 1,610 sq ft. Glazing (15%) = 300 sq ft. Doors = 40 sq ft. Net wall area = 1,270 sq ft. Volume = 18,000 cu ft.</li>
              <li><strong>Above-Grade Wall Conduction:</strong> 1,270 sq ft net wall @ nominal R-19 (estimated layer R-20.5, U-0.04878) &times; 60.0&deg;F = <strong>3,717 BTU/hr</strong>.</li>
              <li><strong>Ceiling &amp; Attic Conduction:</strong> 2,000 sq ft ceiling @ nominal R-38 (estimated layer R-39.0, U-0.02564) &times; 60.0&deg;F = <strong>3,077 BTU/hr</strong>.</li>
              <li><strong>Window Conduction:</strong> 300 sq ft Low-E glass @ U-0.28 &times; 60.0&deg;F = <strong>5,040 BTU/hr</strong>.</li>
              <li><strong>Exterior Doors Conduction:</strong> 40 sq ft insulated doors @ U-0.35 &times; 60.0&deg;F = <strong>840 BTU/hr</strong>.</li>
              <li><strong>Slab Perimeter Conduction:</strong> 178.9 ft perimeter @ F-0.50 &times; 60.0&deg;F = <strong>5,367 BTU/hr</strong>.</li>
              <li><strong>Air Infiltration Leakage:</strong> 18,000 cu ft volume @ 0.38 ACHnat = 114 CFM. Infiltration loss = 1.08 &times; 114 CFM &times; 60.0&deg;F = <strong>7,387 BTU/hr</strong>.</li>
              <li><strong>Total Preliminary Peak Heat Loss:</strong> 3,717 + 3,077 + 5,040 + 840 + 5,367 + 7,387 = <strong>25,428 BTU/hr</strong> (7.5 kW).</li>
              <li><strong>Equipment Sizing Note:</strong> This preliminary building load (25.4 kBTU/hr) represents the baseline screening rate. Equipment selection requires full room-by-room ACCA Manual J load calculations and manufacturer-verified heating output tables per ACCA Manual S.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
