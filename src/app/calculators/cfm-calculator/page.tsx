import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { CfmCalculatorTool } from "@/components/calculator/tools/CfmCalculatorTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("cfm-calculator")!;

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

export default function CfmCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="To calculate HVAC CFM (Cubic Feet per Minute), multiply duct air velocity (FPM) by cross-sectional duct area (sq ft): CFM = Velocity (FPM) × Area (sq ft). For thermal sizing, calculate sensible heat: CFM = Sensible BTU / (1.08 × ΔT), or use the standard residential rule of 400 CFM per nominal cooling ton."
      formulaSnippet="CFM = Velocity (FPM) * Duct_Area (sq ft) | CFM = Q_sensible / (1.08 * ΔT) | CFM = AC_Tonnage * 400"
      authorityCitation="ASHRAE Handbook of Fundamentals & ACCA Manual D Duct Design"
      toolComponent={<CfmCalculatorTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Fundamental CFM Airflow & Fluid Dynamics Equations"
              formula="CFM = FPM * (Area_sq_in / 144) | CFM = Q_sensible / (1.08 * ΔT)"
              variables={[
                { symbol: "CFM", label: "Volumetric Airflow Rate", description: "Standard volumetric air delivery at sea level density", unit: "CFM (ft³/min)" },
                { symbol: "FPM", label: "Air Velocity", description: "Average linear fluid speed inside duct or grille core", unit: "FPM (ft/min)" },
                { symbol: "Area", label: "Duct Cross-Section", description: "Internal free open cross-sectional flow area", unit: "sq in or sq ft" },
                { symbol: "Q_sensible", label: "Sensible Heat Load", description: "Pure dry-bulb cooling or heating load requirement", unit: "BTU/hr" },
                { symbol: "1.08", label: "Air Heat Capacity Factor", description: "Constant derived from standard air density (0.075 lb/ft³) × specific heat (0.24 BTU/lb·°F) × 60 min/hr", unit: "Constant" },
                { symbol: "ΔT", label: "Temperature Split", description: "Air temperature difference across the heat exchanger (18–22°F for AC, 30–60°F for heating)", unit: "°F" },
              ]}
              notes="All air calculations assume standard atmospheric air density (0.075 lb/ft³). For high-altitude installations above 3,000 ft, derate density factor accordingly."
              sourceStandard="ASHRAE Standard 62.1 & ACCA Manual D (3rd Edition)"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Air Changes Per Hour (ACH) Sizing Guidelines
            </h3>
            <p>
              Different residential and commercial occupancy zones require specific hourly air turnover rates to maintain indoor air quality (IAQ) and thermal comfort:
            </p>
            <ul>
              <li><strong>Living Rooms &amp; Bedrooms:</strong> 4 to 6 ACH (provides standard conditioned comfort and low noise).</li>
              <li><strong>Kitchens &amp; Cooking Zones:</strong> 7 to 8 ACH (clears cooking odors and moisture buildup).</li>
              <li><strong>Bathrooms &amp; High Humidity:</strong> 8 to 10 ACH (rapid exhaust of water vapor to prevent mildew).</li>
              <li><strong>Commercial Conference Rooms:</strong> 8 to 12 ACH (ensures adequate fresh air delivery for dense occupancies).</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">AC Cooling Capacity</th>
                <th scope="col">Standard Airflow (400 CFM/ton)</th>
                <th scope="col">Humid Climate (350 CFM/ton)</th>
                <th scope="col">Dry Climate (450 CFM/ton)</th>
                <th scope="col">Recommended Main Trunk Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1.5 Tons (18,000 BTU)</strong></td>
                <td>600 CFM</td>
                <td>525 CFM</td>
                <td>675 CFM</td>
                <td>10&quot; Round / 12x8&quot; Rect</td>
              </tr>
              <tr>
                <td><strong>2.0 Tons (24,000 BTU)</strong></td>
                <td>800 CFM</td>
                <td>700 CFM</td>
                <td>900 CFM</td>
                <td>12&quot; Round / 14x8&quot; Rect</td>
              </tr>
              <tr>
                <td><strong>2.5 Tons (30,000 BTU)</strong></td>
                <td>1,000 CFM</td>
                <td>875 CFM</td>
                <td>1,125 CFM</td>
                <td>12&quot; Round / 16x8&quot; Rect</td>
              </tr>
              <tr>
                <td><strong>3.0 Tons (36,000 BTU)</strong></td>
                <td>1,200 CFM</td>
                <td>1,050 CFM</td>
                <td>1,350 CFM</td>
                <td>14&quot; Round / 18x8&quot; Rect</td>
              </tr>
              <tr>
                <td><strong>3.5 Tons (42,000 BTU)</strong></td>
                <td>1,400 CFM</td>
                <td>1,225 CFM</td>
                <td>1,575 CFM</td>
                <td>14&quot; Round / 20x8&quot; Rect</td>
              </tr>
              <tr>
                <td><strong>4.0 Tons (48,000 BTU)</strong></td>
                <td>1,600 CFM</td>
                <td>1,400 CFM</td>
                <td>1,800 CFM</td>
                <td>16&quot; Round / 22x8&quot; Rect</td>
              </tr>
              <tr>
                <td><strong>5.0 Tons (60,000 BTU)</strong></td>
                <td>2,000 CFM</td>
                <td>1,750 CFM</td>
                <td>2,250 CFM</td>
                <td>18&quot; Round / 24x10&quot; Rect</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing airflow for a 3-ton residential heat pump in a moderate climate requiring 24,000 BTU/hr sensible cooling at a 20&deg;F coil temperature drop (&Delta;T).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Thermal Sensible Equation:</strong> CFM = 24,000 / (1.08 × 20) = <strong>1,111 CFM</strong>.</li>
              <li><strong>Nominal Tonnage Cross-Check:</strong> 3.0 Tons × 400 CFM/ton = <strong>1,200 CFM</strong>.</li>
              <li><strong>Duct Air Velocity Verification:</strong> Across a 14-inch round supply trunk (Area = 1.069 sq ft), air velocity is 1,200 / 1.069 = <strong>1,122 FPM</strong> (well within SMACNA residential trunk noise limits).</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
