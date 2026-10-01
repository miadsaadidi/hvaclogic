import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { DuctFrictionTool } from "@/components/calculator/tools/DuctFrictionTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("duct-friction-loss-calculator")!;

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

export default function DuctFrictionLossPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Duct friction loss and Total Equivalent Length (TEL) calculations determine the calculated design friction rate (FR) used to size supply and return ducts based on the reference principles of ACCA Manual D. Available Static Pressure (ASP) is calculated as: ASP = Blower TESP - (Coil + Filter + Supply Register + Return Grille Drops). The design friction rate is calculated as: FR = (ASP * 100) / TEL. Common residential design reference ranges fall between 0.06 and 0.12 in. wg per 100 ft depending on equipment static capability, duct configuration, and design airflow."
      formulaSnippet="ASP = TESP - (DeltaP_coil + DeltaP_filter + DeltaP_supply_reg + DeltaP_return_grille) | FR = (ASP * 100) / TEL"
      authorityCitation="Reference Methodology: ACCA Manual D & ASHRAE / SMACNA Technical References"
      toolComponent={<DuctFrictionTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="ACCA Manual D Static Pressure &amp; Friction Rate Reference Model"
              formula="ASP = TESP - (DeltaP_coil + DeltaP_filter + DeltaP_supply_reg + DeltaP_return_grille + DeltaP_devices) | TEL = L_straight_supply + L_straight_return + sum(L_equiv_fittings) | FR = (ASP * 100) / TEL"
              variables={[
                { symbol: "ASP", label: "Available Static Pressure", description: "Pressure available for the duct distribution system after accounting for component losses at design airflow", unit: "in. wg" },
                { symbol: "TESP", label: "Total External Static Pressure", description: "Blower rated external static pressure at design airflow", unit: "in. wg" },
                { symbol: "TEL", label: "Total Equivalent Length", description: "Cumulative straight duct length plus representative fitting equivalent lengths along the evaluated design run", unit: "Feet" },
                { symbol: "FR", label: "Design Friction Rate", description: "Calculated friction rate used to select duct cross-sections on standard sizing charts or ductulators", unit: "in. wg / 100 ft" },
              ]}
              notes="Fitting equivalent lengths are representative reference values from ACCA Manual D Appendix 3. Actual aerodynamic resistance depends on fitting geometry, dimensions, throat radius, and turning vanes."
              sourceStandard="Reference Methodology: ACCA Manual D & ASHRAE Handbook of Fundamentals"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Understanding Duct TEL (Total Equivalent Length)
            </h3>
            <p>
              In duct system design, <strong>Total Equivalent Length (TEL)</strong> quantifies the cumulative aerodynamic resistance of the straight duct runs and all inline fittings along a selected design path. Every bend, transition, branch takeoff, and terminal creates turbulence and dynamic pressure losses. Reference methodologies convert these fitting losses into an equivalent length of straight ductwork:
            </p>
            <p style={{ background: "var(--surface-raised)", borderLeft: "3px solid var(--accent)", padding: "0.6rem 0.9rem", margin: "0.75rem 0", borderRadius: "0 4px 4px 0" }}>
              <strong>TEL Model:</strong> <code>TEL = (Straight Supply Run + Supply Fitting Equivalent Feet) + (Straight Return Run + Return Fitting Equivalent Feet)</code>
            </p>
            <p>
              While a duct layout might contain only 100 physical feet of straight ductwork, restrictive fittings (such as unvaned mitered 90° elbows adding 45 equivalent feet each) can increase the calculated TEL to <strong>350 to 450 equivalent feet</strong>, reducing the allowable design friction rate.
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              Available Static Pressure (ASP) &amp; Component Drop Considerations
            </h3>
            <p>
              Available Static Pressure represents the static pressure budget remaining to overcome duct friction after deducting all component pressure drops at the design airflow. Preset values for coils, air filters, and grilles serve as illustrative defaults; actual pressure drops must be verified from manufacturer performance data at design CFM.
            </p>
            <p>
              When high-efficiency filtration or wet cooling coils consume a large portion of blower static capacity, the remaining ASP decreases. Sizing ductwork with an assumed generic friction rate (such as 0.10 in. wg/100 ft) under low ASP conditions can increase total external static pressure above equipment design limits, reducing airflow and potentially impairing system efficiency and operating reliability.
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              Acoustics, Air Velocity, and Duct Design
            </h3>
            <p>
              Airflow velocity is one contributor to system noise. Maintaining moderate duct velocities helps minimize airflow hiss, but acoustic performance also depends on fitting aerodynamics, duct geometry, terminal grille design, acoustic lining, and mechanical vibration isolation.
            </p>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Downstream Sizing &amp; Distribution Workflows
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Detailed Fitting Accumulation: <Link href="/calculators/equivalent-length-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Equivalent Length Calculator</Link> — evaluate individual elbows, branch takeoffs, and register boots per Appendix 3 reference tables.<br />
              • Size Rigid Trunks with Calculated FR: <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> — apply your calculated design friction rate to size equal-friction main supply and return trunks.<br />
              • Check Flexible Branch Runouts: <Link href="/calculators/flex-duct-cfm-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Flexible Duct CFM Chart</Link> — select flexible branch diameters based on your design friction rate and installation sag.<br />
              • Verify System Airflow Volume: <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>HVAC CFM Sizer</Link> — determine whole-building sensible CFM before accumulating duct pressure drops.<br />
              • Central Heating &amp; Hydro-Air Coils: <Link href="/calculators/boiler-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Hydronic Boiler Sizer</Link> — evaluate heating plants powering ducted hot-water coils, accounting for coil static pressure drops in your ASP budget.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Fitting Description (ACCA Manual D Reference)</th>
                <th scope="col">Reference Group</th>
                <th scope="col">Representative Equivalent Length</th>
                <th scope="col">Aerodynamic Characteristics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>90° Trunk Elbow (Smooth Radius R/W = 1.5)</strong></td>
                <td>Group 2</td>
                <td>10 Feet</td>
                <td>Low Resistance (Smooth Radius)</td>
              </tr>
              <tr>
                <td><strong>90° Mitered Elbow (With Turning Vanes)</strong></td>
                <td>Group 2</td>
                <td>15 Feet</td>
                <td>Moderate Resistance</td>
              </tr>
              <tr>
                <td><strong>90° Mitered Elbow (No Vanes)</strong></td>
                <td>Group 2</td>
                <td>45 Feet</td>
                <td>High Resistance (Unvaned Mitered)</td>
              </tr>
              <tr>
                <td><strong>45° Trunk Offset Elbow</strong></td>
                <td>Group 2</td>
                <td>5 Feet</td>
                <td>Low Resistance</td>
              </tr>
              <tr>
                <td><strong>Conical Spin-In Branch Takeoff</strong></td>
                <td>Group 1</td>
                <td>15 Feet</td>
                <td>Smooth Flow Entry</td>
              </tr>
              <tr>
                <td><strong>Square / Dovetail Branch Takeoff</strong></td>
                <td>Group 1</td>
                <td>35 Feet</td>
                <td>Higher Entry Resistance</td>
              </tr>
              <tr>
                <td><strong>90° Floor/Wall Register Boot</strong></td>
                <td>Group 4</td>
                <td>30 Feet</td>
                <td>Standard Terminal Transition</td>
              </tr>
              <tr>
                <td><strong>Return Air Drop with 90° Turning Ell</strong></td>
                <td>Group 7</td>
                <td>30 Feet</td>
                <td>Standard Return Drop</td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            *Note: Equivalent length values are representative values from ACCA Manual D Appendix 3. Actual values depend on specific dimensions, aspect ratios, and construction.
          </p>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a residential duct system for a 3-ton heat pump (1,200 CFM). The air handler is rated at <strong>0.50&quot; w.g. TESP</strong>. Component losses at design airflow are: Evaporator coil = <strong>0.20&quot; w.g.</strong>, Air filter = <strong>0.10&quot; w.g.</strong>, Supply register = <strong>0.03&quot; w.g.</strong>, and Return grille = <strong>0.03&quot; w.g.</strong>
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Calculate Total Component Losses:</strong> 0.20 (Coil) + 0.10 (Filter) + 0.03 (Supply Reg.) + 0.03 (Return Grille) = <strong>0.360&quot; w.g.</strong></li>
              <li><strong>Calculate Available Static Pressure (ASP):</strong> ASP = 0.50 - 0.360 = <strong>0.140&quot; w.g.</strong></li>
              <li><strong>Accumulate Straight Duct Length:</strong> 60 ft Supply + 40 ft Return = <strong>100 ft</strong>.</li>
              <li><strong>Accumulate Fitting Equivalent Lengths:</strong>
                <ul style={{ marginTop: "0.25rem" }}>
                  <li>Supply: 1 Plenum (10 ft) + 3 Smooth 90° Elbows (30 ft) + 4 Conical Takeoffs (60 ft) + 4 Register Boots (120 ft) = <strong>220 ft</strong>.</li>
                  <li>Return: 1 Return Air Drop (30 ft) + 2 Return Grille Boots (40 ft) = <strong>70 ft</strong>.</li>
                </ul>
              </li>
              <li><strong>Calculate Supply and Return TEL:</strong> Supply TEL = 60 + 220 = <strong>280 ft</strong>; Return TEL = 40 + 70 = <strong>110 ft</strong>.</li>
              <li><strong>Total Equivalent Length (TEL):</strong> 280 ft + 110 ft = <strong>390 Feet</strong>.</li>
              <li><strong>Calculate Design Friction Rate (FR):</strong>
                <pre style={{ background: "rgba(0,0,0,0.3)", padding: "0.5rem", borderRadius: "4px", margin: "0.5rem 0", color: "#00d2ff" }}>
                  FR = (0.140&quot; ASP * 100) / 390 ft TEL = 0.03589... ≈ 0.036&quot; w.g. / 100 ft
                </pre>
              </li>
              <li><strong>Engineering Interpretation:</strong> A calculated friction rate of <strong>0.036&quot; w.g. / 100 ft</strong> indicates that duct cross-sections must be sized relatively large to keep total static pressure within the blower&apos;s 0.50&quot; capability. If space constraints require standard friction rates (e.g. 0.08&quot;), reducing component pressure drops or optimizing fitting aerodynamics will increase ASP and reduce TEL.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
