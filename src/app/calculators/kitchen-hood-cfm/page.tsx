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
      directAnswer="For residential kitchen ventilation, the Home Ventilating Institute (HVI) recommends sizing range hoods at 100 CFM per linear foot of cooktop width for wall-mounted hoods, and 150 CFM per linear foot for island hoods. For gas cooktops, an industry field rule of thumb is 100 CFM per 10,000 BTU/hr total burner rating (subject to manufacturer specifications). Under IRC Section M1503.6 and local codes, range hoods exceeding 400 CFM trigger a make-up air review to prevent building depressurization."
      formulaSnippet="CFM_hvi_wall = (Width_in / 12) * 100 | CFM_hvi_island = (Width_in / 12) * 150 | CFM_gas_thumb = Total_Gas_BTU / 100"
      authorityCitation="Home Ventilating Institute (HVI) Guidelines & IRC Section M1503.6 (Technical References)"
      toolComponent={<KitchenHoodTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Kitchen Ventilation Sizing &amp; Duct Physics Framework"
              formula="\text{CFM}_{\text{wall}} = \frac{W_{\text{in}}}{12} \cdot 100 \quad | \quad \text{CFM}_{\text{island}} = \frac{W_{\text{in}}}{12} \cdot 150 \quad | \quad \text{CFM}_{\text{gas}} = \frac{\text{BTU}_{\text{total}}}{100}"
              variables={[
                { symbol: "W_{\\text{in}}", label: "Cooktop Width", description: "Nominal cooktop width in inches (converted to linear feet)", unit: "Inches" },
                { symbol: "\\text{CFM}_{\\text{wall}}", label: "HVI Wall-Mount Baseline", description: "HVI recommendation: 100 CFM per linear foot of cooktop width for wall or under-cabinet hoods", unit: "CFM" },
                { symbol: "\\text{CFM}_{\\text{island}}", label: "HVI Island-Mount Baseline", description: "HVI recommendation: 150 CFM per linear foot of cooktop width for island hoods", unit: "CFM" },
                { symbol: "\\text{BTU}_{\\text{total}}", label: "Total Gas Burner Rating", description: "Combined maximum thermal heat output of all gas surface burners", unit: "BTU/hr" },
                { symbol: "\\text{CFM}_{\\text{gas}}", label: "Gas Rule-of-Thumb Benchmark", description: "Industry field rule of thumb: 100 CFM per 10,000 BTU/hr (verify with appliance manufacturer)", unit: "CFM" },
                { symbol: "\\text{IRC M1503.6}", label: "Make-Up Air Review Trigger", description: "Model code threshold where exhaust systems exceeding 400 CFM trigger make-up air review", unit: "Threshold (>400 CFM)" },
              ]}
              notes="Duct runs and fittings impose static pressure resistance (in. wg), requiring blowers rated to deliver target CFM at design external static pressure. Review IRC M1503.6 and local amendments for make-up air damper requirements when exhaust exceeds 400 CFM."
              sourceStandard="Home Ventilating Institute (HVI) & International Residential Code (IRC) Section M1503.6 (Technical References)"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Understanding Kitchen Ventilation, Duct Static Pressure, and Make-Up Air
            </h3>
            <p>
              Effective kitchen ventilation requires balancing thermal plume capture, duct aerodynamic resistance, and room air balance:
            </p>
            <ul>
              <li>
                <strong>Thermal Plume Capture &amp; Canopy Sizing:</strong> Cooking generates thermal plumes containing moisture, grease aerosols, and combustion byproducts. Island hoods lack wall boundaries to direct the convective plume, which is why HVI recommends higher airflow rates (150 CFM/linear ft) and an oversized canopy (typically 3 inches of overhang on each open side).
              </li>
              <li>
                <strong>Duct Resistance Creates Static Pressure Loss, Not CFM:</strong> Longer duct runs, 90° elbows, and wall caps create friction resistance (measured in inches of water gauge, in. wg), not additional airflow. Range hood blowers must be selected using manufacturer fan performance curves showing delivered CFM at the calculated total external static pressure.
              </li>
              <li>
                <strong>Make-Up Air Code Review (IRC Section M1503.6):</strong> When exhaust airflow exceeds 400 CFM, modern tight building envelopes can experience depressurization. IRC Section M1503.6 and locally adopted mechanical codes typically require an interlocked make-up air supply to prevent backdrafting of combustion appliances and maintain air balance.
              </li>
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
                <th scope="col">Typical Burner Output</th>
                <th scope="col">HVI Linear Recommendation</th>
                <th scope="col">Gas Rule-of-Thumb Benchmark</th>
                <th scope="col">Illustrative Duct Diameter</th>
                <th scope="col">Make-Up Air Code Review</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>30&quot; Electric / Induction</strong></td>
                <td>N/A (Radiant / Induction)</td>
                <td>250 CFM Wall / 375 CFM Island</td>
                <td>N/A</td>
                <td>6&quot; Round</td>
                <td><span style={{ color: "var(--accent-success)", fontWeight: 600 }}>≤ 400 CFM (Review Local Code)</span></td>
              </tr>
              <tr>
                <td><strong>30&quot; Standard Gas (4 Burners)</strong></td>
                <td>45,000 BTU/hr</td>
                <td>250 CFM Wall / 375 CFM Island</td>
                <td>450 CFM</td>
                <td>7&quot; Round</td>
                <td><span style={{ color: "var(--accent-danger)", fontWeight: 600 }}>⚠️ Review Triggered (&gt;400 CFM)</span></td>
              </tr>
              <tr>
                <td><strong>36&quot; Pro-Style Gas (6 Burners)</strong></td>
                <td>60,000 BTU/hr</td>
                <td>300 CFM Wall / 450 CFM Island</td>
                <td>600 CFM</td>
                <td>8&quot; Round</td>
                <td><span style={{ color: "var(--accent-danger)", fontWeight: 600 }}>⚠️ Review Triggered (&gt;400 CFM)</span></td>
              </tr>
              <tr>
                <td><strong>48&quot; Commercial-Style Gas</strong></td>
                <td>90,000 BTU/hr</td>
                <td>400 CFM Wall / 600 CFM Island</td>
                <td>900 CFM</td>
                <td>10&quot; Round</td>
                <td><span style={{ color: "var(--accent-danger)", fontWeight: 600 }}>⚠️ Review Triggered (&gt;400 CFM)</span></td>
              </tr>
              <tr>
                <td><strong>60&quot; Custom Estate Range</strong></td>
                <td>120,000 BTU/hr</td>
                <td>500 CFM Wall / 750 CFM Island</td>
                <td>1,200 CFM</td>
                <td>10&quot;–12&quot; Round</td>
                <td><span style={{ color: "var(--accent-danger)", fontWeight: 600 }}>⚠️ Review Triggered (&gt;400 CFM)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a kitchen range hood and exhaust duct for a 36-inch pro-style gas cooktop with 6 burners totaling <strong>60,000 BTU/hr</strong>, installed on a center kitchen island with a 15-foot duct run and two 90&deg; elbows.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>
                <strong>Evaluate Sizing Benchmarks:</strong> The gas burner rule-of-thumb (60,000 BTU/hr ÷ 100) indicates <strong>600 CFM</strong>. The HVI island linear rate (3.0 ft × 150 CFM/ft) suggests <strong>450 CFM</strong>. A 600 CFM target is selected to handle high-output gas searing.
              </li>
              <li>
                <strong>Canopy Dimensions:</strong> For island cooking, a <strong>42-inch wide hood canopy</strong> (3-inch overhang on each side) is recommended to improve plume capture against ambient cross-drafts.
              </li>
              <li>
                <strong>Calculate Duct Equivalent Length:</strong> 15 ft straight + (2 × 10 ft 90° elbows) + 25 ft wall cap with damper = <strong>60 equivalent feet</strong>.
              </li>
              <li>
                <strong>Estimate Duct Static Pressure Drop:</strong> With an 8-inch rigid metal duct (Area = 0.349 sq ft, Velocity ≈ 1,719 FPM at 600 CFM), estimated friction is ~0.15 in. wg per 100 ft:
                <br />
                <code>Static Drop ≈ (0.15 in. wg / 100 ft) × 60 ft = 0.09 in. wg</code>.
              </li>
              <li>
                <strong>Verify Equipment Fan Curve:</strong> Select a range hood rated to deliver at least <strong>600 CFM at ~0.10–0.20 in. wg external static pressure</strong> per manufacturer test data.
              </li>
              <li>
                <strong>Make-Up Air Code Review:</strong> Because 600 CFM exceeds the 400 CFM threshold, review IRC Section M1503.6 and local code requirements for an interlocked make-up air system.
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
