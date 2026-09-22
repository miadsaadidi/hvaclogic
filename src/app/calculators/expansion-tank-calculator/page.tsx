import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { ExpansionTankTool } from "@/components/calculator/tools/ExpansionTankTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("expansion-tank-calculator")!;

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

export default function ExpansionTankCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="An ASME Section VIII closed-loop diaphragm expansion tank sizes based on the net thermal expansion of the system fluid volume (Vs) between initial cold fill temperature (T1) and maximum operating temperature (T2), divided by the acceptance ratio (Ar = 1 - P1/P2): Vt = [Vs × ((v2/v1 - 1) - 3·α·ΔT)] / [1 - (P1_abs / P2_abs)]. For pure water heating loops from 60°F to 180°F with a 12 psig fill and 30 psig boiler relief valve, water expands by ~3.0%, yielding an acceptance ratio of ~0.36 and requiring a total tank volume of approximately 8.5% to 11% of total system fluid volume. Glycol solutions require 25% to 75% larger tank capacities due to elevated thermal volumetric expansion coefficients."
      formulaSnippet="Vt = Vacc / [1 - (P1 / P2)] | Vacc = Vs * [(v2/v1 - 1) - 3*alpha*DeltaT] | Ar = 1 - (P1 / P2)"
      authorityCitation="ASME Boiler and Pressure Vessel Code (BPVC) Section VIII Division 1 & ASHRAE Handbook - HVAC Systems and Equipment Chapter 15"
      toolComponent={<ExpansionTankTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="ASME Section VIII Closed-Loop Expansion Tank Sizing Equations"
              formula="V_t = \frac{V_{acc}}{1 - \left(\frac{P_1}{P_2}\right)} \quad\Bigg|\quad V_{acc} = V_s \cdot \left[\left(\frac{\nu_2}{\nu_1} - 1\right) - 3\,\alpha\,\Delta T\right] \quad\Bigg|\quad A_r = 1 - \frac{P_1}{P_2}"
              variables={[
                { symbol: "V_t", label: "Total Tank Volume", description: "Minimum gross internal volume of the expansion tank shell", unit: "Gallons (gal)" },
                { symbol: "V_acc", label: "Acceptance Volume", description: "Net expanded fluid volume accommodated by the diaphragm or bladder", unit: "Gallons (gal)" },
                { symbol: "V_s", label: "System Fluid Volume", description: "Total liquid volume in boiler, piping mains, and heat emitters", unit: "Gallons (gal)" },
                { symbol: "nu_1", label: "Initial Specific Volume", description: "Fluid specific volume (1/density) at initial cold fill temperature T1", unit: "ft³/lb" },
                { symbol: "nu_2", label: "Maximum Specific Volume", description: "Fluid specific volume (1/density) at peak operating temperature T2", unit: "ft³/lb" },
                { symbol: "P_1", label: "Initial Absolute Pressure", description: "Cold fill precharge pressure in absolute units: P1 = P1_psig + Patm", unit: "psia" },
                { symbol: "P_2", label: "Maximum Operating Pressure", description: "Safety relief valve setpoint minus design safety buffer: P2 = (Prelief - Buffer) + Patm", unit: "psia" },
                { symbol: "A_r", label: "Acceptance Ratio", description: "Fraction of gross tank volume available to store liquid before hitting P2", unit: "Dimensionless" },
                { symbol: "alpha", label: "Thermal Expansion of Pipe", description: "Linear expansion coefficient (6.5×10⁻⁶ for steel, 9.5×10⁻⁶ for copper, 8.5×10⁻⁵ for PEX)", unit: "in/in/°F" },
              ]}
              notes="Absolute pressure (psia = psig + 14.7 psi) must strictly be used in Boyle's Law acceptance ratio calculations. Using gauge pressure causes catastrophic undersizing by 30% to 50%, forcing boiler relief valves to weep during peak firing."
              sourceStandard="ASME BPVC Section VIII Division 1 & ASHRAE Handbook - HVAC Systems and Equipment Chapter 15"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Thermodynamic Physics of Closed-Loop Hydronic Expansion
            </h3>
            <p>
              Water and industrial heat transfer fluids are virtually incompressible liquids. When heated inside a closed hydronic loop from cold fill conditions (typically 50°F to 60°F) to design operating temperature (180°F to 200°F for heating or 140°F for condensing loops), the fluid expands significantly. Because the piping and boiler vessels cannot stretch sufficiently to accommodate this volume surge, the trapped fluid pressure would instantly skyrocket beyond the burst threshold of boiler heat exchangers, valves, and piping joints without an expansion tank.
            </p>
            <p>
              In modern HVAC engineering, <strong>ASME Section VIII diaphragm and bladder tanks</strong> permanently separate the system water from a precharged nitrogen or atmospheric air cushion via a flexible synthetic elastomer membrane (butyl or EPDM). As water heats and expands into the acceptance chamber, it compresses the gas cushion according to Boyle&apos;s Ideal Gas Law (<code>P₁·V₁ = P₂·V₂</code>), safely absorbing the volume increase while strictly bounding system pressure between cold fill pressure (P₁) and maximum permissible operating pressure (P₂).
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              The Critical Role of Acceptance Ratio (Ar) &amp; Pressure Schedule
            </h3>
            <p>
              The size of an expansion tank is inversely proportional to its <strong>Acceptance Ratio (Ar)</strong>:
            </p>
            <p style={{ background: "var(--surface-raised)", borderLeft: "3px solid var(--accent)", padding: "0.6rem 0.9rem", margin: "0.75rem 0", borderRadius: "0 4px 4px 0" }}>
              <code>{"Ar = 1 - (P₁ / P₂) = 1 - (P₁_gauge + 14.7) / (P₂_gauge + 14.7)"}</code>
            </p>
            <p>
              A common field failure occurs when engineers design with a narrow pressure differential (e.g. 15 psig fill with a 30 psig relief valve and a 5 psi buffer, yielding P₂ = 25 psig). In absolute terms:
              <br />
              <code>{"P₁ = 15 + 14.7 = 29.7 psia | P₂ = 25 + 14.7 = 39.7 psia ➔ Ar = 1 - (29.7 / 39.7) = 0.252"}</code>
              <br />
              This means only 25.2% of the physical tank shell is usable for water expansion, requiring a tank <strong>four times larger</strong> than the net expanded water volume. Widening the delta (e.g. raising the boiler relief valve to 50 psig on commercial boilers) increases Ar to 0.50+, halving the physical tank footprint.
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              Glycol Derating: Why Anti-Freeze Systems Require Larger Expansion Tanks
            </h3>
            <p>
              Propylene and ethylene glycol solutions have substantially higher volumetric thermal expansion coefficients and lower specific gravities than pure water across HVAC operating ranges. For instance:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginTop: "0.4rem" }}>
              <li><strong>Pure Water (60°F to 180°F):</strong> Volumetric expansion is ~3.02%.</li>
              <li><strong>30% Propylene Glycol (60°F to 180°F):</strong> Volumetric expansion increases to ~4.07% (+35% expansion penalty).</li>
              <li><strong>50% Propylene Glycol (60°F to 180°F):</strong> Volumetric expansion reaches ~4.98% (+65% expansion penalty).</li>
            </ul>
            <p>
              Retrofitting a snow-melt system, outdoor heat pump hydronic circuit, or chilled-water loop with glycol without upgrading the expansion tank invariably results in chronic relief valve weeping, fluid discharge, loss of corrosion inhibitors, and repeated low-pressure lockouts.
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              Point of No Pressure Change (PONPC) &amp; Circulator Placement
            </h3>
            <p>
              Pioneered by hydronics legend Gil Carlson (Bell &amp; Gossett), the connection point of the expansion tank to the hydronic loop represents the <strong>Point of No Pressure Change (PONPC)</strong>. The circulator pump cannot create or destroy pressure at this physical tee connection. Therefore, <strong>always install the circulator pump pumping AWAY from the expansion tank</strong>. Pumping away adds circulator pump head to the system static pressure, elevating loop pressure, preventing dissolved air from degassing, and eliminating cavitation in upper-floor radiators and air vents.
            </p>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Related Hydronic &amp; Heating Engineering Workflows
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Size Heating Boilers &amp; Emitters: <Link href="/calculators/boiler-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Hydronic Boiler &amp; Baseboard Sizer</Link> — calculate total heating plant BTU requirements, emitter footage, and system water volume.<br />
              • Piping Friction &amp; Hydraulic Head: <Link href="/calculators/equivalent-length-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>ACCA Manual D &amp; Fitting Equivalent Length</Link> — evaluate aerodynamic and hydraulic resistance in loop piping and transitions.<br />
              • Whole-Building Thermal Demand: <Link href="/calculators/heat-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Building Heat Loss Calculator</Link> — calculate envelope transmission and infiltration loads per ACCA Manual J.<br />
              • Air-to-Water Heat Pump Sizing: <Link href="/calculators/heat-pump-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Heat Pump Sizing Calculator</Link> — evaluate low-temperature hydronic water supply capacity and auxiliary balance points.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Hydronic Loop Application</th>
                <th scope="col">Fluid Type</th>
                <th scope="col">Operating Range</th>
                <th scope="col">Fill / Relief</th>
                <th scope="col">Acceptance Ratio (Ar)</th>
                <th scope="col">Tank Sizing Rule of Thumb</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Residential Baseboard Heating</strong></td>
                <td>Pure Water</td>
                <td>60°F ➔ 180°F</td>
                <td>12 / 30 psig</td>
                <td>0.358</td>
                <td>~8% to 10% of total system volume</td>
              </tr>
              <tr>
                <td><strong>Condensing Low-Temp Radiant Floor</strong></td>
                <td>Pure Water</td>
                <td>60°F ➔ 130°F</td>
                <td>12 / 30 psig</td>
                <td>0.358</td>
                <td>~4% to 6% of total system volume</td>
              </tr>
              <tr>
                <td><strong>Commercial Hydronic Boiler Plant</strong></td>
                <td>Pure Water</td>
                <td>60°F ➔ 200°F</td>
                <td>18 / 50 psig</td>
                <td>0.452</td>
                <td>~7% to 9% of total system volume</td>
              </tr>
              <tr>
                <td><strong>Snow Melt / Outdoor Hydronic Loop</strong></td>
                <td>50% Propylene Glycol</td>
                <td>40°F ➔ 140°F</td>
                <td>15 / 30 psig</td>
                <td>0.297</td>
                <td>~14% to 18% of total system volume</td>
              </tr>
              <tr>
                <td><strong>High-Rise District Hydronic Loop</strong></td>
                <td>30% Ethylene Glycol</td>
                <td>60°F ➔ 180°F</td>
                <td>35 / 75 psig</td>
                <td>0.435</td>
                <td>~10% to 12% of total system volume</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing an ASME Section VIII closed-loop diaphragm expansion tank for a 2,400 sq ft home with a 100,000 BTU/hr hydronic boiler and fin-tube copper baseboards. Total estimated fluid volume (Vs) is <strong>80 gallons</strong>. Cold fill temperature (T1) is <strong>60°F</strong> and high limit aquastat setpoint (T2) is <strong>180°F</strong>. Initial fill pressure (P1) is <strong>12 psig</strong> (26.7 psia), and the boiler is fitted with a standard <strong>30 psig</strong> ASME safety relief valve. A 3 psi safety buffer is specified (P2 = 27 psig = 41.7 psia).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Step-by-Step ASME Section VIII Calculation:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>
                <strong>Determine Fluid Specific Volumes &amp; Net Fluid Expansion:</strong>
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
                  ν₁ (water at 60°F) = 0.016035 ft³/lb | ν₂ (water at 180°F) = 0.016508 ft³/lb{"\n"}
                  Fluid Expansion Ratio = (ν₂ / ν₁) - 1 = (0.016508 / 0.016035) - 1 = <span style={{ color: "#38bdf8", fontWeight: 700 }}>0.0295 (2.95%)</span>
                </pre>
              </li>
              <li>
                <strong>Calculate Acceptance Volume (Vacc) with Piping Expansion:</strong>
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
                  Piping Expansion (steel) = 3 × 6.5×10⁻⁶ × (180 - 60) = 0.00234{"\n"}
                  Net Expansion Ratio = 0.0295 - 0.00234 = 0.02716{"\n"}
                  Vacc = Vs × 0.02716 = 80 × 0.02716 = <span style={{ color: "#38bdf8", fontWeight: 700 }}>2.17 Gallons</span>
                </pre>
              </li>
              <li>
                <strong>Calculate Boyle&apos;s Law Acceptance Ratio (Ar):</strong>
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
                  P₁ = 12 + 14.7 = 26.7 psia | P₂ = 27 + 14.7 = 41.7 psia{"\n"}
                  Ar = 1 - (P₁ / P₂) = 1 - (26.7 / 41.7) = 1 - 0.6403 = <span style={{ color: "#fbbf24", fontWeight: 700 }}>0.3597 (~36.0% usable)</span>
                </pre>
              </li>
              <li>
                <strong>Calculate Minimum Tank Volume (Vt) &amp; Select Standard Commercial ASME Size:</strong>
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
                  Vt = Vacc / Ar = 2.17 gal / 0.3597 = <span style={{ color: "#34d399", fontWeight: 700 }}>6.03 Gallons</span>{"\n"}
                  Selected Standard ASME Commercial Tank: <span style={{ color: "#34d399", fontWeight: 700 }}>7.6 Gallons (Amtrol AX-15 / Taco CA-15)</span>
                </pre>
              </li>
            </ol>
          </div>
          <p style={{ marginTop: "0.75rem", fontSize: "0.85rem" }}>
            <em>Glycol Derate Note:</em> If this exact system were charged with a 50% propylene glycol snow melt mixture, the fluid thermal expansion surge increases to ~4.98%, requiring an acceptance volume of 3.80 gallons and a minimum total tank volume of 10.6 gallons — necessitating an upgrade to an <strong>11.0 or 14.0 Gallon</strong> commercial tank (+75% size increase).
          </p>
        </div>
      }
    />
  );
}
