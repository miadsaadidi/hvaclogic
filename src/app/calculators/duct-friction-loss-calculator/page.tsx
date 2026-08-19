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
      directAnswer="Duct friction loss and Total Equivalent Length (TEL) sizing determines the exact friction rate (FR) used to size supply and return ducts according to ACCA Manual D. Available Static Pressure (ASP) is calculated as: ASP = Blower TESP - (Coil + Filter + Register Drops). The design friction rate is: FR = (ASP * 100) / TEL. Standard residential friction rates range from 0.06 to 0.12 in. wg per 100 ft."
      formulaSnippet="ASP = TESP - (DeltaP_coil + DeltaP_filter + DeltaP_registers) | FR = (ASP * 100) / TEL"
      authorityCitation="ACCA Manual D (3rd Edition, Appendix 3 Fitting Equivalent Lengths) & SMACNA"
      toolComponent={<DuctFrictionTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="ACCA Manual D Static Pressure &amp; Friction Rate Equations"
              formula="ASP = TESP - (DeltaP_coil + DeltaP_filter + DeltaP_supply_boot + DeltaP_return_grille + DeltaP_damper) | TEL = L_straight_supply + L_straight_return + sum(L_equiv_fittings) | FR = (ASP * 100) / TEL"
              variables={[
                { symbol: "ASP", label: "Available Static Pressure", description: "Pressure remaining to overcome duct friction after component losses", unit: "in. wg" },
                { symbol: "TESP", label: "Total External Static Pressure", description: "Blower maximum rated static pressure at design CFM", unit: "in. wg" },
                { symbol: "TEL", label: "Total Equivalent Length", description: "Combined straight length and fitting aerodynamic resistance of the most restrictive run", unit: "Feet" },
                { symbol: "FR", label: "Design Friction Rate", description: "Friction rate setting used on standard ductulator wheels", unit: "in. wg / 100 ft" },
              ]}
              notes="Fittings with sharp turns (like 90° mitered elbows without turning vanes) add up to 45 equivalent feet each, rapidly eating into your static pressure budget and choking airflow."
              sourceStandard="ACCA Manual D (Residential Duct Systems) & ASHRAE Handbook of Fundamentals"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Why Manual D Available Static Pressure (ASP) Matters
            </h3>
            <p>
              Many contractors size ductwork using a blind rule-of-thumb friction rate (e.g. 0.10 in. wg/100ft). However, if your home has high-efficiency 1-inch MERV 13 air filters (0.22&quot; drop) and a wet evaporator coil (0.20&quot; drop) on a 0.50&quot; blower, only <strong>0.08&quot; ASP</strong> remains for ductwork.
            </p>
            <p>
              In a system with 350 ft TEL, the true design friction rate is <code>(0.08 * 100) / 350 = 0.023&quot;</code>. Sizing ducts at 0.10&quot; in this scenario causes high total static pressure, burned-out ECM blower motors, and frozen A/C coils.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">ACCA Fitting Description</th>
                <th scope="col">Group Number</th>
                <th scope="col">Equivalent Length (TEL)</th>
                <th scope="col">Aerodynamic Quality</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>90° Trunk Elbow (Smooth Radius R/W = 1.5)</strong></td>
                <td>Group 2</td>
                <td>10 Feet</td>
                <td>Excellent (Low Turbulence)</td>
              </tr>
              <tr>
                <td><strong>90° Mitered Elbow (With Turning Vanes)</strong></td>
                <td>Group 2</td>
                <td>15 Feet</td>
                <td>Good</td>
              </tr>
              <tr>
                <td><strong>90° Mitered Elbow (No Vanes)</strong></td>
                <td>Group 2</td>
                <td>45 Feet</td>
                <td>Poor (High Resistance Penalty)</td>
              </tr>
              <tr>
                <td><strong>45° Trunk Offset Elbow</strong></td>
                <td>Group 2</td>
                <td>5 Feet</td>
                <td>Excellent</td>
              </tr>
              <tr>
                <td><strong>Conical Spin-In Branch Takeoff</strong></td>
                <td>Group 1</td>
                <td>15 Feet</td>
                <td>Good (Smooth Entry)</td>
              </tr>
              <tr>
                <td><strong>Square / Dovetail Branch Takeoff</strong></td>
                <td>Group 1</td>
                <td>35 Feet</td>
                <td>Poor</td>
              </tr>
              <tr>
                <td><strong>90° Floor/Wall Register Boot</strong></td>
                <td>Group 4</td>
                <td>30 Feet</td>
                <td>Standard</td>
              </tr>
              <tr>
                <td><strong>Return Air Drop with 90° Turning Ell</strong></td>
                <td>Group 7</td>
                <td>30 Feet</td>
                <td>Standard</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a residential duct system for a 3-ton heat pump (1,200 CFM). The air handler is rated at <strong>0.50&quot; w.g. TESP</strong>. The wet coil drops <strong>0.20&quot;</strong>, a 1-inch MERV 11 filter drops <strong>0.12&quot;</strong>, and supply/return registers drop <strong>0.03&quot; each (0.06&quot; total)</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Calculate Total Component Losses:</strong> 0.20 (Coil) + 0.12 (Filter) + 0.06 (Registers) = <strong>0.38&quot; w.g.</strong></li>
              <li><strong>Calculate Available Static Pressure (ASP):</strong> ASP = 0.50 - 0.38 = <strong>0.12&quot; w.g.</strong></li>
              <li><strong>Accumulate Longest Run Straight Length:</strong> 60 ft Supply + 40 ft Return = <strong>100 ft</strong>.</li>
              <li><strong>Accumulate Fitting Equivalent Lengths:</strong>
                <ul style={{ marginTop: "0.25rem" }}>
                  <li>Supply: 1 Plenum (10ft) + 3 Smooth Elbows (30ft) + 4 Conical Takeoffs (60ft) + 4 Boots (120ft) = <strong>220 ft</strong>.</li>
                  <li>Return: 1 Return Drop (30ft) + 2 Grille Boots (40ft) = <strong>70 ft</strong>.</li>
                </ul>
              </li>
              <li><strong>Total Equivalent Length (TEL):</strong> 100 (Straight) + 220 (Supply Fittings) + 70 (Return Fittings) = <strong>390 Feet</strong>.</li>
              <li><strong>Solve ACCA Manual D Design Friction Rate (FR):</strong>
                <pre style={{ background: "rgba(0,0,0,0.3)", padding: "0.5rem", borderRadius: "4px", margin: "0.5rem 0", color: "#00d2ff" }}>
                  FR = (0.12&quot; ASP * 100) / 390 ft TEL = 0.031&quot; w.g. / 100 ft
                </pre>
              </li>
              <li><strong>Engineering Verdict:</strong> A friction rate of <strong>0.031&quot;</strong> indicates high system resistance. Sizing ducts at 0.031&quot; requires large trunks. To increase the friction rate to a standard 0.08&quot;, upgrade to a 4-inch deep pleated media filter (drops 0.08&quot; vs 0.12&quot;) and replace sharp elbows with smooth radius fittings.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
