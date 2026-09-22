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
      directAnswer="ACCA Manual D Total Effective Length (TEL) quantifies the aerodynamic friction of all duct fittings and straight ductwork along the single most restrictive critical path from the return grille to the furthest supply register: TEL = (Straight Supply Length + Sum of Supply Fitting Equivalent Lengths) + (Straight Return Length + Sum of Return Fitting Equivalent Lengths). The resulting TEL dictates the system design friction rate: FR = (Available Static Pressure × 100) / TEL. Standard residential systems typically range from 150 to 400 equivalent feet of Total Effective Length, with fitting aerodynamic turbulence often contributing a substantial fraction of total circuit friction depending on layout geometry."
      formulaSnippet="TEL = (L_straight_supply + sum(EL_supply_fittings)) + (L_straight_return + sum(EL_return_fittings)) | ASP = TESP - CVP | FR = (ASP * 100) / TEL"
      authorityCitation="ANSI/ACCA Manual D (Fitting Equivalent Length Methodologies) & ASHRAE Fundamentals Chapter 21"
      toolComponent={<EquivalentLengthTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="ACCA Manual D Total Effective Length (TEL) & Friction Rate Equations"
              formula="TEL = TEL_supply + TEL_return = (L_straight_supply + sum(EL_supply_fittings)) + (L_straight_return + sum(EL_return_fittings)) | ASP = TESP - (DeltaP_coil + DeltaP_filter + DeltaP_supply_reg + DeltaP_return_grille + DeltaP_other) | FR = (ASP * 100) / TEL"
              variables={[
                { symbol: "TEL", label: "Total Effective Length", description: "Combined aerodynamic equivalent length of the critical supply and return duct runs", unit: "Equivalent Feet (ft eq)" },
                { symbol: "EL_fitting", label: "Fitting Equivalent Length", description: "Aerodynamic resistance of an individual fitting expressed in equivalent feet of straight duct", unit: "Feet (ft)" },
                { symbol: "ASP", label: "Available Static Pressure", description: "Static pressure remaining from the blower to overcome duct friction after component losses", unit: "in. wg" },
                { symbol: "TESP", label: "Total External Static Pressure", description: "Blower rated static pressure at design airflow (typically 0.50 to 0.80 in. wg)", unit: "in. wg" },
                { symbol: "CVP", label: "Component Pressure Losses", description: "Total static drop across evaporator coil, air filter, supply registers, and return grilles", unit: "in. wg" },
                { symbol: "FR", label: "Design Friction Rate", description: "Friction rate setting used on ductulator wheels and sizing charts", unit: "in. wg / 100 ft" },
              ]}
              notes="Dynamic shock loss at duct direction changes causes flow separation, turbulence vortices, and rapid static pressure decay. An unvaned 90° mitered elbow introduces approximately 50 equivalent feet of resistance, whereas adding aerodynamic turning vanes drops this resistance to approximately 10 equivalent feet."
              sourceStandard="ANSI/ACCA 1 Manual D (Fitting Equivalent Lengths) & ASHRAE Handbook of Fundamentals Chapter 21"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Aerodynamic Physics of Fitting Equivalent Length in ACCA Manual D
            </h3>
            <p>
              In forced-air HVAC design, air flowing through straight galvanized sheet metal encounters purely viscous surface friction governed by the Darcy-Weisbach equation and Colebrook-White friction factor. However, whenever air reaches an elbow, boot, branch takeoff, or transition, the flow direction changes abruptly. Centrifugal forces shove high-velocity air toward the outer throat, while boundary layer separation at the inner heel generates a vena contracta and severe recirculating eddy zones.
            </p>
            <p>
              This dynamic turbulence consumes air velocity pressure (P_v = (V / 4005)²) and converts it into irreversible heat dissipation. In ACCA Manual D fitting methodologies (historically cataloged under Appendix 3 in foundational editions), these complex fluid dynamic loss coefficients (C_o) are converted into <strong>Equivalent Length (EL)</strong> — the linear footage of standard straight ductwork that produces the identical static pressure drop at design velocity:
            </p>
            <p style={{ background: "var(--surface-raised)", borderLeft: "3px solid var(--accent-cooling)", padding: "0.6rem 0.9rem", margin: "0.75rem 0", borderRadius: "0 4px 4px 0" }}>
              <strong>ACCA Conversion:</strong> <code>{"EL = (C_o × 100) / (12 × f) ≈ C_o × D_h / (4 × f)"}</code>
            </p>
            <p>
              Because duct velocity in residential systems typically ranges between 700 and 1,000 FPM, a fitting with a high loss coefficient (such as a square mitered elbow with C_o ≈ 1.2) imposes an enormous <strong>50 equivalent feet</strong> of resistance. Just two unvaned elbows and a bullhead tee add <strong>150 equivalent feet</strong> — often exceeding the total physical length of the entire home!
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              The Critical Path Method in Duct Aerodynamics
            </h3>
            <p>
              A common misconception among field installers is summing all fittings in the entire house. Under ACCA Manual D rules, TEL is calculated strictly along the <strong>critical path</strong>: the single run from the blower discharge to the furthest, most aerodynamically restrictive supply boot, plus the single return run from the most restrictive return grille back to the air handler inlet.
            </p>
            <p>
              Sizing the duct system to deliver design airflow across this highest-resistance path guarantees that all shorter, less restrictive branch runs will receive adequate airflow when properly balanced with volume dampers.
            </p>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Downstream Sizing &amp; Distribution Workflows
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • ACCA Manual D Fitting Accumulator: <Link href="/calculators/equivalent-length-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Equivalent Length Calculator</Link> — itemize individual elbows, branch takeoffs, and register boots per ACCA Manual D fitting groups to calculate critical run TEL.<br />
              • Size Rigid Supply &amp; Return Trunks: <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> — apply your derived design friction rate (FR) to size round and rectangular sheet metal ducts.<br />
              • Evaluate System Static Pressure Losses: <Link href="/calculators/duct-friction-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Duct Friction Loss &amp; TEL Tool</Link> — analyze full system pressure drop gradients and component budgets.<br />
              • Size Branch Flexible Ductwork: <Link href="/calculators/flex-duct-cfm-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Flexible Duct CFM Chart</Link> — select flexible duct diameters accounting for installation compression and sag derating.<br />
              • Calculate Room Airflow Requirements: <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>HVAC CFM Sizer</Link> — calculate sensible thermal airflow (Q = 1.08 × CFM × ΔT) before trunk sizing.<br />
              • Hot-Water Hydro-Air Fan Coils: <Link href="/calculators/boiler-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Hydronic Boiler Sizer</Link> — size heating plants and account for water-to-air coil static drop (0.15–0.25 in. wg) in your ASP budget.
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
                <td>Conical bellmouth collars (10–15 ft) minimize entrance shock; abrupt square collars (35 ft) and bullhead tees (50 ft) severely increase entrance loss.</td>
              </tr>
              <tr>
                <td><strong>Main Trunk Direction Changes</strong></td>
                <td>Group 2</td>
                <td>10 to 50 Feet</td>
                <td>Long-radius curved elbows (10–15 ft) and vaned mitered turns (10 ft) maintain streamline flow; unvaned 90° mitered turns (50 ft) create extreme heel separation.</td>
              </tr>
              <tr>
                <td><strong>Branch Takeoffs &amp; Runout Bends</strong></td>
                <td>Group 3</td>
                <td>12 to 35 Feet</td>
                <td>Conical spin-in takeoffs (15 ft) and smooth stamped elbows (12 ft) provide superior airflow; straight taps (35 ft) generate high vena contracta detachment.</td>
              </tr>
              <tr>
                <td><strong>Terminal Supply Register Boots</strong></td>
                <td>Group 4</td>
                <td>10 to 35 Feet</td>
                <td>Straight axial transitions (10 ft) offer least resistance; standard 90° register boots (30 ft) add moderate directional turn loss before diffuser.</td>
              </tr>
              <tr>
                <td><strong>Return Air Inlets &amp; Drops</strong></td>
                <td>Group 5</td>
                <td>15 to 50 Feet</td>
                <td>Slanted 45° intake transitions or vaned 90° drops (15 ft) promote smooth blower entry; unvaned 90° return drops (50 ft) create high suction choke.</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a residential duct system for a 2,200 sq ft single-story home served by a 3.5-ton heat pump (1,400 CFM). The blower is rated at <strong>0.50&quot; w.g. TESP</strong> at design CFM. Component static deductions are: wet cooling coil = <strong>0.20&quot;</strong>, 1-inch MERV 11 filter = <strong>0.12&quot;</strong>, supply register = <strong>0.03&quot;</strong>, and return grille = <strong>0.03&quot;</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Step-by-Step Manual D Critical Run Accumulation:</h4>
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
                  ASP = TESP - CVP = 0.50&quot; - (0.20&quot; + 0.12&quot; + 0.03&quot; + 0.03&quot;) = 0.50&quot; - 0.38&quot; = <span style={{ color: "#38bdf8", fontWeight: 700 }}>0.120&quot; w.g.</span>
                </pre>
              </li>
              <li>
                <strong>Measure Straight Duct Footage on Critical Path:</strong>
                Straight Supply Run = <strong>65 ft</strong>, Straight Return Run = <strong>45 ft</strong>. Total Straight = <strong>110 ft</strong>.
              </li>
              <li>
                <strong>Accumulate Supply Fitting Equivalent Lengths:</strong>
                <ul style={{ marginTop: "0.25rem" }}>
                  <li>1× Starting collar with 45° entry shoe (Group 1): <strong>15 ft</strong></li>
                  <li>2× 90° rectangular trunk radius elbows (Group 2, R/W=1.5): 2 × 10 ft = <strong>20 ft</strong></li>
                  <li>1× Conical bellmouth branch spin-in takeoff (Group 3): <strong>15 ft</strong></li>
                  <li>1× 90° 4-piece adjustable round branch elbow (Group 3): <strong>20 ft</strong></li>
                  <li>1× 90° register boot to master bedroom floor register (Group 4): <strong>30 ft</strong></li>
                  <li>Total Supply Fittings = 15 + 20 + 15 + 20 + 30 = <strong>100 equivalent feet</strong>.</li>
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
                <strong>Calculate Total Effective Length (TEL):</strong>
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
                  TEL = (65 + 100) supply + (45 + 35) return = 165 ft + 80 ft = <span style={{ color: "#34d399", fontWeight: 700 }}>245 equivalent feet</span>
                </pre>
                <em>Notice: Fittings contribute 135 ft out of 245 ft (55.1% of all airflow resistance!).</em>
              </li>
              <li>
                <strong>Solve ACCA Manual D Design Friction Rate (FR):</strong>
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
                  FR = (ASP × 100) / TEL = (0.120&quot; × 100) / 245 ft = 0.0489 ≈ <span style={{ color: "#fbbf24", fontWeight: 700 }}>0.049&quot; w.g. / 100 ft</span>
                </pre>
              </li>
              <li>
                <strong>Engineering Optimization Verdict:</strong>
                At <strong>0.049&quot; w.g./100 ft</strong>, the friction rate is on the borderline low threshold, requiring slightly larger trunk dimensions. If the return drop had used an unvaned elbow (50 ft instead of 15 ft) and flush collars (35 ft instead of 15 ft), TEL would jump to <strong>300 ft</strong>, collapsing the friction rate to <strong>0.040&quot;</strong> and forcing massive duct oversizing.
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
