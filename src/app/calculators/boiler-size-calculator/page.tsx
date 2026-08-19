import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { BoilerSizeTool } from "@/components/calculator/tools/BoilerSizeTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("boiler-size-calculator")!;

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

export default function BoilerSizeCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Hydronic boiler sizing matches boiler heating capacity to connected radiation emitters (copper fin-tube baseboards or cast-iron radiators) or whole-building heat loss. Boiler Gross Input is calculated as: Gross_Input = (Net_Load * Piping_Factor) / AFUE. Copper fin-tube baseboard produces ~580 BTU/hr per linear foot at 180°F, while cast-iron radiators produce 150 BTU/hr per sq ft EDR for hot water and 240 BTU/hr for steam."
      formulaSnippet="Q_baseboard = Linear_Feet * Rating(WaterTemp) | Q_edr = EDR_sqft * 150 (Hot Water) | Gross_Input = (Q_net * 1.15) / AFUE"
      authorityCitation="I=B=R Hydronics Institute, AHRI Directory of Certified Boilers, & ASHRAE HVAC Systems 2020"
      toolComponent={<BoilerSizeTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Hydronic Boiler, Baseboard &amp; Radiator EDR Equations"
              formula="Q_baseboard = Linear_Feet * BTU_per_ft(T_water) | Q_edr_water = EDR * 150 | Q_edr_steam = EDR * 240 | Q_gross = Q_net * 1.15 (Water) or 1.33 (Steam) | Input_BTU = Q_gross / (AFUE / 100)"
              variables={[
                { symbol: "Q_net", label: "AHRI Net Radiation Load", description: "Combined heat output capacity of all installed baseboards, radiators, and indirect DHW", unit: "BTU/hr" },
                { symbol: "EDR", label: "Equivalent Direct Radiation", description: "Standard measure of cast-iron radiator heating surface area (1 sq ft = 240 BTU/hr steam @ 215°F)", unit: "sq ft EDR" },
                { symbol: "Piping Factor", label: "I=B=R Piping & Pick-Up Allowance", description: "Standard 1.15 multiplier for hot water (15% loss) or 1.33 for steam systems (33% pick-up)", unit: "Multiplier" },
                { symbol: "AFUE", label: "Annual Fuel Utilization Efficiency", description: "Thermal seasonal combustion efficiency of the boiler (82% cast-iron to 96% condensing)", unit: "%" },
              ]}
              notes="In systems equipped with a Domestic Hot Water (DHW) Priority Zone Relay, the boiler temporality suspends space heating circulators during hot water calls, eliminating the need to oversize the boiler for domestic water."
              sourceStandard="I=B=R Hydronics Institute Testing Standards & AHRI Standard 1500"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              The 3 Methods of Hydronic Boiler Sizing
            </h3>
            <p>
              Professional hydronic heating contractors size replacement boilers using three complementary methods:
            </p>
            <ul>
              <li><strong>Fin-Tube Baseboard Measuring:</strong> Measuring the active finned element length (excluding empty sheet metal covers). Standard 3/4&quot; residential copper fin-tube yields 580 BTU/hr per foot at 180&deg;F AWT.</li>
              <li><strong>Cast-Iron Radiator EDR Survey:</strong> Counting the tubes, columns, height, and sections of vintage cast-iron radiators to calculate total Equivalent Direct Radiation.</li>
              <li><strong>ACCA Manual J Heat Loss:</strong> Measuring room envelope heat losses to ensure the boiler is not oversized for modern insulated buildings (which frequently have more radiator surface area than the home actually needs).</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Heating System Type</th>
                <th scope="col">Emitter Rating</th>
                <th scope="col">Water Temp</th>
                <th scope="col">I=B=R Multiplier</th>
                <th scope="col">Typical Boiler Size</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Standard Fin-Tube Baseboard (100 ft)</strong></td>
                <td>580 BTU/linear ft</td>
                <td>180&deg;F AWT</td>
                <td>1.15&times;</td>
                <td>75,000 BTU / 95% Mod-Con</td>
              </tr>
              <tr>
                <td><strong>Low-Temp Condensing Baseboard (150 ft)</strong></td>
                <td>330 BTU/linear ft</td>
                <td>140&deg;F AWT</td>
                <td>1.15&times;</td>
                <td>65,000 BTU / 96% Mod-Con</td>
              </tr>
              <tr>
                <td><strong>Vintage Hot Water Radiators (400 EDR)</strong></td>
                <td>150 BTU/sq ft EDR</td>
                <td>170&deg;F–180&deg;F</td>
                <td>1.15&times;</td>
                <td>85,000 BTU / 84% Cast-Iron</td>
              </tr>
              <tr>
                <td><strong>Low-Pressure Steam Radiators (300 EDR)</strong></td>
                <td>240 BTU/sq ft EDR</td>
                <td>215&deg;F Steam</td>
                <td>1.33&times;</td>
                <td>120,000 BTU / 82% Steam</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a replacement condensing modulating boiler for a home with <strong>100 linear feet</strong> of standard copper fin-tube baseboard and a <strong>45-gallon indirect domestic water heater</strong> with a DHW Priority Zone Controller.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Calculate Connected Baseboard Load:</strong> 100 ft &times; 580 BTU/ft (@ 180&deg;F) = <strong>58,000 BTU/hr</strong>.</li>
              <li><strong>Evaluate DHW Priority:</strong> Because a priority relay is installed, the DHW pickup adder is <strong>0 BTU/hr</strong> (space heating pauses for &lt;15 min during DHW calls).</li>
              <li><strong>Calculate AHRI Net Rating:</strong> Q_net = <strong>58,000 BTU/hr</strong>.</li>
              <li><strong>Apply I=B=R Piping &amp; Pick-Up Factor:</strong> 58,000 &times; 1.15 = <strong>66,700 BTU/hr DOE Heating Capacity</strong>.</li>
              <li><strong>Calculate Boiler Fuel Input:</strong> At 95% AFUE, Gross Input = 66,700 / 0.95 = <strong>70,210 BTU/hr</strong>.</li>
              <li><strong>Final Boiler Selection:</strong> Select a standard <strong>75,000 to 80,000 BTU/hr 95% AFUE Mod-Con Wall-Hung Gas Boiler</strong>.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
