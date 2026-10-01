import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { EquivalentLengthTool } from "@/components/calculator/tools/EquivalentLengthTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("equivalent-length-calculator")!;

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

export default function EquivalentLengthCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Total Effective Length (TEL), based on ACCA Manual D methodology, quantifies the aerodynamic friction of all duct fittings and straight ductwork along the single most restrictive critical circulation path from the furthest return grille to the furthest supply register: TEL = (Straight Supply Length + Sum of Supply Fitting Equivalent Lengths) + (Straight Return Length + Sum of Return Fitting Equivalent Lengths). The resulting TEL is used to calculate the design friction rate: FR = (Available Static Pressure × 100) / TEL. Common residential design reference ranges typically fall between 0.06 and 0.12 in. wg per 100 ft depending on blower static pressure, duct layout geometry, and component pressure losses."
      formulaSnippet="TEL = (L_straight_supply + sum(EL_supply_fittings)) + (L_straight_return + sum(EL_return_fittings)) | ASP = TESP - sum(DeltaP_components) | FR = (ASP * 100) / TEL"
      authorityCitation="Reference Methodology: ACCA Manual D & ASHRAE Fundamentals Chapter 21"
      toolComponent={<EquivalentLengthTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="ACCA Manual D Total Effective Length (TEL) &amp; Friction Rate Reference Equations"
              formula="TEL = TEL_supply + TEL_return = (L_straight_supply + sum(EL_supply_fittings)) + (L_straight_return + sum(EL_return_fittings)) | ASP = TESP - (DeltaP_coil + DeltaP_filter + DeltaP_supply_reg + DeltaP_return_grille + DeltaP_other) | FR = (ASP * 100) / TEL"
              variables={[
                { symbol: "TEL", label: "Total Effective Length", description: "Combined aerodynamic equivalent length of the critical supply and return duct runs", unit: "Equivalent Feet (ft eq)" },
                { symbol: "EL_fitting", label: "Fitting Equivalent Length", description: "Representative aerodynamic resistance of an individual fitting expressed in equivalent feet of straight duct", unit: "Feet (ft)" },
                { symbol: "ASP", label: "Available Static Pressure", description: "Static pressure remaining from the blower to overcome duct friction after component losses at design airflow", unit: "in. wg" },
                { symbol: "TESP", label: "Total External Static Pressure", description: "Blower rated static pressure at design airflow (typically 0.50 to 0.80 in. wg)", unit: "in. wg" },
                { symbol: "CVP", label: "Component Pressure Losses", description: "Total static drop across evaporator coil, air filter, supply registers, and return grilles at design airflow", unit: "in. wg" },
                { symbol: "FR", label: "Design Friction Rate", description: "Calculated design friction rate per 100 ft used to select duct cross-sections", unit: "in. wg / 100 ft" },
              ]}
              notes="Fitting equivalent lengths are representative reference values referencing ACCA Manual D Appendix 3. Actual aerodynamic resistance depends on fitting geometry, throat radius, aspect ratio, and turning vanes."
              sourceStandard="Reference Methodology: ACCA Manual D & ASHRAE Handbook of Fundamentals Chapter 21"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Aerodynamic Principles of Fitting Equivalent Length
            </h3>
            <p>
              In forced-air HVAC design, air flowing through straight ductwork encounters surface friction. However, whenever air reaches an elbow, boot, branch takeoff, or transition, the flow changes direction and cross-section, generating dynamic turbulence and pressure drops.
            </p>
            <p>
              In ACCA Manual D fitting methodologies (historically cataloged in Appendix 3 reference tables), dynamic fitting loss coefficients are converted into <strong>Equivalent Length (EL)</strong> — the linear footage of standard straight ductwork that produces an equivalent static pressure drop at reference design velocity:
            </p>
            <p style={{ background: "var(--surface-raised)", borderLeft: "3px solid var(--accent-cooling)", padding: "0.6rem 0.9rem", margin: "0.75rem 0", borderRadius: "0 4px 4px 0" }}>
              <strong>ACCA Reference Model:</strong> <code>{"EL = (C_o × 100) / (12 × f)"}</code>
            </p>
            <p>
              Because directional changes create dynamic pressure losses, fittings with abrupt geometry (such as an unvaned rectangular mitered elbow with EL ≈ 50 ft) impose substantially higher resistance than smooth radius or vaned fittings (EL ≈ 10–15 ft).
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              The Critical Path Method in Duct Aerodynamics
            </h3>
            <p>
              Under ACCA Manual D methodology, TEL is calculated strictly along the <strong>critical circulation path</strong>: the single run from the air handler discharge to the furthest, most aerodynamically restrictive supply register, plus the single return run from the most restrictive return grille back to the equipment intake.
            </p>
            <p>
              Sizing the duct system based on this highest-resistance circulation path ensures that available blower static pressure is sufficient to deliver design airflow throughout the entire distribution network when branches are properly balanced with volume dampers.
            </p>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Downstream Sizing &amp; Distribution Workflows
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Size Rigid Supply &amp; Return Trunks: <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> — apply your derived design friction rate (FR) to size round and rectangular sheet metal ducts.<br />
              • Evaluate System Static Pressure Losses: <Link href="/calculators/duct-friction-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Duct Friction Loss &amp; TEL Tool</Link> — analyze full system pressure drop gradients and component budgets.<br />
              • Size Branch Flexible Ductwork: <Link href="/calculators/flex-duct-cfm-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Flexible Duct CFM Chart</Link> — select flexible duct diameters accounting for installation compression and sag derating.<br />
              • Calculate Room Airflow Requirements: <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>HVAC CFM Sizer</Link> — calculate sensible thermal airflow before trunk sizing.<br />
              • Hot-Water Hydro-Air Fan Coils: <Link href="/calculators/boiler-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Hydronic Boiler Sizer</Link> — size heating plants and account for water-to-air coil static drop in your ASP budget.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Fitting Geometry Archetype</th>
                <th scope="col">Design Group</th>
                <th scope="col">Representative Equivalent Length Range</th>
                <th scope="col">Aerodynamic Performance &amp; Guidance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Supply Plenum Takeoffs</strong></td>
                <td>Group 1</td>
                <td>10 to 50 Feet</td>
                <td>Conical bellmouth collars (10–15 ft) provide smooth entry; abrupt square collars (35 ft) and bullhead tees (50 ft) introduce higher dynamic loss.</td>
              </tr>
              <tr>
                <td><strong>Main Trunk Direction Changes</strong></td>
                <td>Group 2</td>
                <td>10 to 50 Feet</td>
                <td>Long-radius curved elbows (10–15 ft) and vaned mitered turns (10 ft) maintain streamline flow; unvaned 90° mitered turns (50 ft) create higher resistance.</td>
              </tr>
              <tr>
                <td><strong>Branch Takeoffs &amp; Runout Bends</strong></td>
                <td>Group 3</td>
                <td>12 to 35 Feet</td>
                <td>Conical spin-in takeoffs (15 ft) and smooth stamped elbows (12 ft) provide streamlined airflow; straight taps (35 ft) have higher entry loss.</td>
              </tr>
              <tr>
                <td><strong>Terminal Supply Register Boots</strong></td>
                <td>Group 4</td>
                <td>10 to 35 Feet</td>
                <td>Straight axial transitions (10 ft) offer least resistance; standard 90° register boots (30 ft) add directional turn loss before diffuser.</td>
              </tr>
              <tr>
                <td><strong>Return Air Inlets &amp; Drops</strong></td>
                <td>Group 5</td>
                <td>15 to 50 Feet</td>
                <td>Slanted 45° intake transitions or vaned 90° drops (15 ft) promote smooth blower entry; unvaned 90° return drops (50 ft) create higher resistance.</td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            *Note: Equivalent length ranges are representative values from ACCA Manual D Appendix 3 reference archetypes. Actual values depend on specific dimensions, aspect ratios, and construction.
          </p>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a residential duct system for a single-story home served by a 3-ton heat pump (1,200 CFM). The blower is rated at <strong>0.50&quot; w.g. TESP</strong> at design CFM. Component static deductions at design airflow are: wet cooling coil = <strong>0.20&quot;</strong>, air filter = <strong>0.10&quot;</strong>, supply register = <strong>0.03&quot;</strong>, return grille = <strong>0.03&quot;</strong>, and other accessories = <strong>0.00&quot;</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Step-by-Step Critical Path Equivalent Length Accumulation:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>
                <strong>Calculate Available Static Pressure (ASP):</strong>
                <pre
                  style={{
                    background: "#090d16",
                    border: "1px solid #1e293b",
                    borderLeft: "3px solid #38bdf8",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    margin: "0.5rem 0",
                    color: "#f8fafc",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    overflowX: "auto",
                  }}
                >
                  ASP = TESP - CVP = 0.50&quot; - (0.20&quot; + 0.10&quot; + 0.03&quot; + 0.03&quot;) = 0.50&quot; - 0.360&quot; = <span style={{ color: "#38bdf8", fontWeight: 700 }}>0.140&quot; w.g.</span>
                </pre>
              </li>
              <li>
                <strong>Measure Straight Duct Footage on Critical Path:</strong>
                Straight Supply Run = <strong>60 ft</strong>, Straight Return Run = <strong>40 ft</strong>. Total Straight = <strong>100 ft</strong>.
              </li>
              <li>
                <strong>Accumulate Supply Fitting Equivalent Lengths:</strong>
                <ul style={{ marginTop: "0.25rem" }}>
                  <li>1× Starting collar with 45° entry shoe (Group 1): <strong>15 ft</strong></li>
                  <li>2× 90° rectangular trunk radius elbows (Group 2, R/W=1.5): 2 × 10 ft = <strong>20 ft</strong></li>
                  <li>1× Conical bellmouth branch spin-in takeoff (Group 3): <strong>15 ft</strong></li>
                  <li>1× 90° round smooth rigid branch elbow (Group 3): <strong>12 ft</strong></li>
                  <li>1× 90° angle register boot (Group 4): <strong>30 ft</strong></li>
                  <li>Total Supply Fittings = 15 + 20 + 15 + 12 + 30 = <strong>92 equivalent feet</strong>.</li>
                </ul>
              </li>
              <li>
                <strong>Accumulate Return Fitting Equivalent Lengths:</strong>
                <ul style={{ marginTop: "0.25rem" }}>
                  <li>1× Ceiling return grille collar box (Group 5): <strong>20 ft</strong></li>
                  <li>1× Return air drop 90° elbow with turning vanes into blower (Group 5): <strong>15 ft</strong></li>
                  <li>Total Return Fittings = 20 + 15 = <strong>35 equivalent feet</strong>.</li>
                </ul>
              </li>
              <li>
                <strong>Calculate Supply, Return, and Total Effective Length (TEL):</strong>
                <pre
                  style={{
                    background: "#090d16",
                    border: "1px solid #1e293b",
                    borderLeft: "3px solid #10b981",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    margin: "0.5rem 0",
                    color: "#f8fafc",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    overflowX: "auto",
                  }}
                >
                  Supply TEL = 60 ft straight + 92 ft fittings = 152 ft
                  Return TEL = 40 ft straight + 35 ft fittings = 75 ft
                  TEL = 152 ft + 75 ft = <span style={{ color: "#34d399", fontWeight: 700 }}>227 equivalent feet</span>
                </pre>
                <em>Notice: Fittings contribute 127 ft out of 227 ft (55.9% of all airflow resistance along the critical path).</em>
              </li>
              <li>
                <strong>Calculate Design Friction Rate (FR):</strong>
                <pre
                  style={{
                    background: "#090d16",
                    border: "1px solid #1e293b",
                    borderLeft: "3px solid #f59e0b",
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    margin: "0.5rem 0",
                    color: "#f8fafc",
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    overflowX: "auto",
                  }}
                >
                  FR = (ASP × 100) / TEL = (0.140&quot; × 100) / 227 ft = 0.06167... ≈ <span style={{ color: "#fbbf24", fontWeight: 700 }}>0.062&quot; w.g. / 100 ft</span>
                </pre>
              </li>
              <li>
                <strong>Engineering Verdict:</strong>
                A calculated friction rate of <strong>0.062&quot; w.g./100 ft</strong> is within the common residential reference range of 0.06 to 0.12&quot; w.g./100 ft. This friction rate is used with a duct calculator or sizing chart to size main trunk and branch duct dimensions.
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
