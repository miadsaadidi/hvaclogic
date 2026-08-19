import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { KitchenHoodTool } from "@/components/calculator/tools/KitchenHoodTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("kitchen-hood-cfm")!;

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

export default function KitchenHoodCfmPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="For gas cooktops, calculate range hood CFM by dividing total burner BTU by 100 (100 CFM per 10,000 BTU): CFM = Total BTU / 100. For electric cooktops, provide 100 CFM per linear foot of width. Island hoods require a 30% airflow multiplier. Under IRC Section M1503.6, any hood exceeding 400 CFM legally requires a dedicated motorized make-up air damper."
      formulaSnippet="CFM_gas = (Total_Gas_BTU / 100) * Mount_Factor + Duct_Loss | MakeUp_Air_Required = CFM > 400"
      authorityCitation="Home Ventilating Institute (HVI) & International Residential Code (IRC) Section M1503.6"
      toolComponent={<KitchenHoodTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Kitchen Ventilation Exhaust &amp; Make-Up Air Code Equations"
              formula="CFM_gas = (BTU_total / 100) * F_mount + F_duct | CFM_electric = (Width_inches / 12) * 100 * F_mount | IRC_M1503.6: Exhaust > 400 CFM -> MakeUp_Air = Exhaust_CFM"
              variables={[
                { symbol: "BTU_total", label: "Cooktop Total Burner Rating", description: "Combined maximum thermal heat output of all gas surface burners", unit: "BTU/hr" },
                { symbol: "F_mount", label: "Mounting Style Multiplier", description: "1.00 for wall-mount / under-cabinet; 1.30 for 360° open-air island canopies", unit: "Multiplier" },
                { symbol: "F_duct", label: "Duct Friction Static Loss", description: "Airflow addition for equivalent duct runs exceeding 30 feet (+1 CFM per foot)", unit: "CFM" },
                { symbol: "IRC M1503.6", label: "Mandatory Make-Up Air Trigger", description: "Legal building code requirement to interlock motorized supply damper when exhaust exceeds 400 CFM", unit: "Threshold (>400 CFM)" },
              ]}
              notes="Range hood exhaust must always vent directly to the outdoor atmosphere through smooth-wall galvanized rigid metal duct. Flexible foil or vinyl ducts are prohibited by fire code due to grease accumulation hazards."
              sourceStandard="IRC Section M1503.6, IMC Section 505, and HVI Publication 920"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Why IRC Section M1503.6 Mandates Make-Up Air Over 400 CFM
            </h3>
            <p>
              Modern energy-efficient homes are built with tight building envelopes. When a powerful 600 to 1,200 CFM commercial range hood operates without incoming make-up air:
            </p>
            <ul>
              <li><strong>Dangerous Flue Backdrafting:</strong> High negative house pressure pulls deadly carbon monoxide and combustion exhaust backward down the flues of atmospheric gas water heaters and standard furnaces.</li>
              <li><strong>Depressurization &amp; Door Whistling:</strong> Creates powerful pressure differentials that slam exterior doors, pull radon and crawlspace odors into living areas, and starve the exhaust blower.</li>
              <li><strong>Motorized Interlock Solution:</strong> An IRC-compliant make-up air damper automatically opens an outdoor fresh air intake whenever the kitchen hood blower turns on.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Cooktop Type &amp; Width</th>
                <th scope="col">Burner Rating</th>
                <th scope="col">Wall Hood CFM</th>
                <th scope="col">Island Hood CFM</th>
                <th scope="col">Duct Diameter</th>
                <th scope="col">Make-Up Air Code</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>30&quot; Electric / Induction</strong></td>
                <td>N/A (Radiant/Induction)</td>
                <td>300 CFM</td>
                <td>400 CFM</td>
                <td>6&quot; Round</td>
                <td><span style={{ color: "var(--accent-success)", fontWeight: 600 }}>✓ Exempt (≤400)</span></td>
              </tr>
              <tr>
                <td><strong>30&quot; Standard Gas (4 Burners)</strong></td>
                <td>45,000 BTU/hr</td>
                <td>500 CFM</td>
                <td>600 CFM</td>
                <td>7&quot; Round</td>
                <td><span style={{ color: "var(--accent-danger)", fontWeight: 600 }}>⚠️ Mandatory (&gt;400)</span></td>
              </tr>
              <tr>
                <td><strong>36&quot; Pro Gas (5–6 Burners)</strong></td>
                <td>60,000 BTU/hr</td>
                <td>600 CFM</td>
                <td>800 CFM</td>
                <td>8&quot; Round</td>
                <td><span style={{ color: "var(--accent-danger)", fontWeight: 600 }}>⚠️ Mandatory (&gt;400)</span></td>
              </tr>
              <tr>
                <td><strong>48&quot; Commercial Style Gas</strong></td>
                <td>90,000 BTU/hr</td>
                <td>900 CFM</td>
                <td>1,200 CFM</td>
                <td>10&quot; Round</td>
                <td><span style={{ color: "var(--accent-danger)", fontWeight: 600 }}>⚠️ Mandatory (&gt;400)</span></td>
              </tr>
              <tr>
                <td><strong>60&quot; Custom Estate Range</strong></td>
                <td>120,000 BTU/hr</td>
                <td>1,200 CFM</td>
                <td>1,500 CFM</td>
                <td>10&quot;–12&quot; Round</td>
                <td><span style={{ color: "var(--accent-danger)", fontWeight: 600 }}>⚠️ Mandatory (&gt;400)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a kitchen range hood for a 36-inch pro-style gas cooktop with 6 burners totaling <strong>60,000 BTU/hr</strong>, mounted on a center kitchen island with a 15-foot duct run and two 90&deg; elbows.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Base Thermal BTU Sizing:</strong> 60,000 BTU / 100 = <strong>600 CFM</strong>.</li>
              <li><strong>Apply Island Capture Multiplier:</strong> 600 CFM × 1.30 = <strong>780 CFM</strong>.</li>
              <li><strong>Equivalent Duct Friction Loss:</strong> 15 ft straight + (2 × 10 ft elbows) + 30 ft wall cap = <strong>65 equivalent feet</strong>. Adding duct resistance (+28 CFM) gives 808 CFM, which rounds to <strong>850 CFM</strong>.</li>
              <li><strong>Recommended Hardware:</strong> 42-inch wide island canopy (3-inch overlap on each side) paired with an <strong>8-inch rigid metal duct</strong>.</li>
              <li><strong>IRC M1503.6 Code Requirement:</strong> Because 850 CFM exceeds 400 CFM, an interlocked <strong>850 CFM motorized make-up air damper</strong> is legally required.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
