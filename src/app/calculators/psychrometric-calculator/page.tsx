import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { PsychrometricTool } from "@/components/calculator/tools/PsychrometricTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("psychrometric-calculator")!;

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

export default function PsychrometricCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Moist air psychrometric properties describe the thermodynamic state of air and water vapor mixtures. By inputting any two independent parameters (such as Dry Bulb and Relative Humidity), you can instantly solve for Dew Point, Wet Bulb, Specific Enthalpy, Humidity Ratio (grains/lb), Specific Volume, and Moist Air Density with barometric altitude compensation."
      formulaSnippet="W = 0.621945 * (P_w / (P_atm - P_w)) | h = 0.240 * T_db + W * (1061 + 0.444 * T_db) | P_atm = 14.696 * (1 - 6.8754e-6 * Alt)^5.2559"
      authorityCitation="ASHRAE Handbook of Fundamentals 2021 (Chapter 1, Psychrometrics) & Hyland-Wexler Formulations"
      toolComponent={<PsychrometricTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="refrigeration" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="ASHRAE Thermodynamic Moist Air &amp; Psychrometric Equations"
              formula="P_ws = exp(C8/T_R + C9 + C10*T_R + C11*T_R^2 + C12*T_R^3 + C13*ln(T_R)) | W = 0.621945 * P_w / (P_atm - P_w) | h = 0.240*T_db + W*(1061 + 0.444*T_db)"
              variables={[
                { symbol: "T_db", label: "Dry Bulb Temperature", description: "Standard ambient temperature measured by a shielded thermometer", unit: "°F" },
                { symbol: "T_wb", label: "Wet Bulb Temperature", description: "Equilibrium temperature reached by evaporating water into moist air", unit: "°F" },
                { symbol: "T_dp", label: "Dew Point Temperature", description: "Temperature at which water vapor begins condensing into liquid droplets", unit: "°F" },
                { symbol: "RH", label: "Relative Humidity", description: "Ratio of actual water vapor pressure to saturation vapor pressure at T_db", unit: "%" },
                { symbol: "W", label: "Humidity Ratio", description: "Mass of water vapor per unit mass of dry air (7,000 grains = 1 lb)", unit: "grains/lb" },
                { symbol: "h", label: "Specific Enthalpy", description: "Total heat content (sensible + latent) of moist air per pound of dry air", unit: "BTU/lb" },
              ]}
              notes="At sea level, standard atmospheric pressure is 14.696 psia (29.921 in.Hg). For every 1,000 feet of elevation gain, atmospheric pressure drops by approximately 0.5 psia, decreasing air density."
              sourceStandard="ASHRAE Handbook of Fundamentals 2021 (Chapter 1) & ASHRAE Standard 55"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              The 6 Core Psychrometric Lines Explained
            </h3>
            <p>
              A psychrometric chart graphically represents all thermodynamic states of moist air at a specific barometric pressure:
            </p>
            <ul>
              <li><strong>Dry Bulb Lines:</strong> Vertical lines extending upward from the bottom temperature axis.</li>
              <li><strong>Humidity Ratio Lines:</strong> Horizontal lines reading moisture content in grains of water per pound of dry air.</li>
              <li><strong>Relative Humidity Curves:</strong> Curved lines sweeping upward from left to right. The outermost 100% curve is the <strong>Saturation Boundary</strong>.</li>
              <li><strong>Enthalpy &amp; Wet Bulb Lines:</strong> Diagonal downward-sloping lines representing constant heat content and evaporative cooling paths.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Air Conditioning State</th>
                <th scope="col">Dry Bulb</th>
                <th scope="col">Relative Humidity</th>
                <th scope="col">Wet Bulb</th>
                <th scope="col">Dew Point</th>
                <th scope="col">Enthalpy (h)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Indoor Comfort (ASHRAE 55)</strong></td>
                <td>75.0&deg;F</td>
                <td>50.0%</td>
                <td>62.5&deg;F</td>
                <td>55.1&deg;F</td>
                <td>28.14 BTU/lb</td>
              </tr>
              <tr>
                <td><strong>Return Air Entering Coil</strong></td>
                <td>80.0&deg;F</td>
                <td>51.2%</td>
                <td>67.0&deg;F</td>
                <td>60.4&deg;F</td>
                <td>31.52 BTU/lb</td>
              </tr>
              <tr>
                <td><strong>Supply Air Leaving Coil</strong></td>
                <td>55.0&deg;F</td>
                <td>90.0%</td>
                <td>53.5&deg;F</td>
                <td>52.1&deg;F</td>
                <td>22.35 BTU/lb</td>
              </tr>
              <tr>
                <td><strong>Hot Summer Outdoor Ambient</strong></td>
                <td>95.0&deg;F</td>
                <td>40.0%</td>
                <td>75.2&deg;F</td>
                <td>67.9&deg;F</td>
                <td>38.60 BTU/lb</td>
              </tr>
              <tr>
                <td><strong>Cold Winter Infiltration Air</strong></td>
                <td>32.0&deg;F</td>
                <td>70.0%</td>
                <td>29.5&deg;F</td>
                <td>24.0&deg;F</td>
                <td>10.35 BTU/lb</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> An HVAC technician measures the return air entering an evaporator coil at <strong>80.0&deg;F Dry Bulb</strong> and <strong>67.0&deg;F Wet Bulb</strong> at sea level elevation.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Calculate Saturation Vapor Pressure:</strong> At 80.0&deg;F, saturation pressure is 0.507 psia. At 67.0&deg;F wet bulb, saturation pressure is 0.329 psia.</li>
              <li><strong>Solve Psychrometric Energy Balance:</strong> Actual water vapor pressure is <strong>0.260 psia</strong>.</li>
              <li><strong>Determine Relative Humidity:</strong> RH = (0.260 / 0.507) &times; 100% = <strong>51.2%</strong>.</li>
              <li><strong>Calculate Dew Point:</strong> Dew point temperature is <strong>60.4&deg;F</strong>.</li>
              <li><strong>Calculate Specific Enthalpy:</strong> Specific enthalpy is <strong>31.52 BTU/lb</strong>.</li>
              <li><strong>Total System Capacity Check:</strong> If supply air leaving the coil is measured at 22.35 BTU/lb enthalpy with 1,200 CFM airflow, total cooling capacity is: Q = 4.5 &times; 1200 &times; (31.52 - 22.35) = <strong>49,518 BTU/hr</strong> (4.1 Tons).</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
