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
      directAnswer="A closed-loop hydronic expansion tank is sized using ASHRAE Systems & Equipment Chapter 15 methodology based on the net thermal expansion volume of the system fluid (Vacc) divided by the pressure acceptance ratio (Ar): Vt = Vacc / [1 - (P1_abs / P2_abs)]. For a standard 60-gallon residential heating loop operating from 60°F to 180°F with a 12 psig precharge and 30 psig boiler relief valve (3 psi buffer, P2 = 27 psig), water expands by ~2.94%, resulting in a net acceptance volume of 1.63 gallons, an acceptance ratio of 0.360, and a calculated minimum gross tank volume of 4.53 gallons (matched to a candidate 7.6 gallon commercial ASME diaphragm tank). Glycol solutions require substantially larger tanks due to elevated thermal expansion coefficients."
      formulaSnippet="Vt = Vacc / [1 - (P1 / P2)] | Vacc = Vs * [(v2/v1 - 1) - 3*alpha*DeltaT] | Ar = 1 - (P1 / P2)"
      authorityCitation="ASHRAE Handbook — HVAC Systems and Equipment (Chapter 15, Sizing Expansion Tanks) & ASME BPVC Section VIII Division 1 (Vessel Construction)"
      toolComponent={<ExpansionTankTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="ASHRAE Hydronic Expansion Tank Sizing &amp; ASME Pressure Schedule Equations"
              formula="V_t = \frac{V_{acc}}{1 - \left(\frac{P_1}{P_2}\right)} \quad\Bigg|\quad V_{acc} = V_s \cdot \left[\left(\frac{\nu_2}{\nu_1} - 1\right) - 3\,\alpha\,\Delta T\right] \quad\Bigg|\quad A_r = 1 - \frac{P_1}{P_2}"
              variables={[
                { symbol: "V_t", label: "Minimum Total Tank Volume", description: "Calculated minimum gross internal volume of the expansion tank shell", unit: "Gallons (gal)" },
                { symbol: "V_acc", label: "Acceptance Volume", description: "Net expanded fluid volume accommodated by the diaphragm or bladder chamber", unit: "Gallons (gal)" },
                { symbol: "V_s", label: "System Fluid Volume", description: "Total liquid volume in boiler, piping mains, and heat emitters", unit: "Gallons (gal)" },
                { symbol: "nu_1", label: "Initial Specific Volume", description: "Fluid specific volume (1/density) at initial cold fill temperature T1", unit: "ft³/lb" },
                { symbol: "nu_2", label: "Maximum Specific Volume", description: "Fluid specific volume (1/density) at peak operating temperature T2", unit: "ft³/lb" },
                { symbol: "P_1", label: "Initial Absolute Pressure", description: "Cold fill precharge pressure in absolute units: P1 = P1_psig + 14.7", unit: "psia" },
                { symbol: "P_2", label: "Maximum Operating Pressure", description: "Safety relief valve setpoint minus design safety buffer: P2 = (Prelief - Buffer) + 14.7", unit: "psia" },
                { symbol: "A_r", label: "Acceptance Ratio", description: "Fraction of gross tank volume available to store liquid before reaching P2", unit: "Dimensionless" },
                { symbol: "alpha", label: "Thermal Expansion of Pipe", description: "Linear expansion coefficient (6.5×10⁻⁶ for steel, 9.5×10⁻⁶ for copper, 8.5×10⁻⁵ for PEX)", unit: "in/in/°F" },
              ]}
              notes="Sizing methodology strictly follows ASHRAE Handbook — HVAC Systems and Equipment (Chapter 15, Sizing Expansion Tanks, Eq. 13 & 14). Absolute pressure (psia = psig + 14.7) must strictly be used in Boyle's Law acceptance ratio calculations. Pressure vessel structural design, wall thickness, and relief valve coordination adhere to ASME Section VIII Division 1 where code-rated vessels are specified."
              sourceStandard="ASHRAE Handbook — HVAC Systems and Equipment (Chapter 15, Eq. 13 & 14) & ASME BPVC Section VIII Div. 1"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Thermodynamic Physics of Closed-Loop Hydronic Expansion
            </h3>
            <p>
              Water and industrial heat transfer fluids are virtually incompressible liquids. When heated inside a closed hydronic loop from cold fill conditions (typically 50°F to 60°F) to design operating temperature (180°F to 200°F for heating or 140°F for condensing loops), the fluid expands significantly. Because the piping and boiler vessels cannot stretch sufficiently to accommodate this volume surge, trapped fluid pressure would rapidly exceed the pressure rating of boiler heat exchangers, valves, and piping joints without an expansion tank.
            </p>
            <p>
              In modern HVAC engineering, <strong>diaphragm and bladder expansion tanks</strong> (fabricated to ASME BPVC Section VIII Division 1 construction standards for commercial installations) permanently separate system water from a precharged nitrogen or atmospheric air cushion via a flexible synthetic elastomer membrane (butyl or EPDM). As water heats and expands into the acceptance chamber, it compresses the gas cushion according to Boyle&apos;s Ideal Gas Law (<code>P₁·V₁ = P₂·V₂</code>), safely absorbing the volume increase while strictly bounding system pressure between cold fill pressure (P₁) and maximum permissible operating pressure (P₂).
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              The Critical Role of Acceptance Ratio (Ar) &amp; Pressure Schedule
            </h3>
            <p>
              The size of an expansion tank is inversely proportional to its <strong>Acceptance Ratio (Ar)</strong>:
            </p>
            <div
              style={{
                background: "#090d16",
                border: "1px solid #1e293b",
                borderLeft: "3px solid #38bdf8",
                padding: "0.75rem 1rem",
                margin: "0.75rem 0",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "0.9rem",
              }}
            >
              Ar = 1 - (P₁ / P₂) = 1 - (P₁_gauge + 14.7) / (P₂_gauge + 14.7)
            </div>
            <p>
              A common field issue occurs when systems operate with a narrow pressure differential (e.g. 15 psig fill with a 30 psig relief valve and a 5 psi buffer, yielding P₂ = 25 psig). In absolute terms:
            </p>
            <div
              style={{
                background: "#090d16",
                border: "1px solid #1e293b",
                borderLeft: "3px solid #f59e0b",
                padding: "0.75rem 1rem",
                margin: "0.75rem 0",
                borderRadius: "0.5rem",
                color: "#f8fafc",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "0.9rem",
              }}
            >
              P₁ = 15 + 14.7 = 29.7 psia | P₂ = 25 + 14.7 = 39.7 psia ➔ Ar = 1 - (29.7 / 39.7) = <span style={{ color: "#fbbf24", fontWeight: 700 }}>0.252 (25.2% usable)</span>
            </div>
            <p>
              This means only 25.2% of the physical tank shell is usable for water expansion, requiring a tank <strong>four times larger</strong> than the net expanded water volume. Widening the delta (e.g. raising the boiler relief valve to 50 psig on commercial boilers) increases Ar to 0.45+, significantly reducing the required physical tank footprint.
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              Glycol Thermal Expansion Sizing Considerations
            </h3>
            <p>
              Propylene and ethylene glycol solutions exhibit higher volumetric thermal expansion coefficients than pure water across HVAC operating ranges. When designing systems with glycol mixtures:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginTop: "0.4rem" }}>
              <li><strong>Pure Water (60°F to 180°F):</strong> Fluid thermal expansion is ~2.94%.</li>
              <li><strong>30% Propylene Glycol (60°F to 180°F):</strong> Fluid thermal expansion increases to ~3.88% (requiring a ~35% to 45% larger tank).</li>
              <li><strong>50% Propylene Glycol (40°F to 140°F / Snow Melt):</strong> Fluid thermal expansion reaches ~4.5% to 5.0%, significantly increasing required acceptance volume.</li>
            </ul>
            <p>
              Adding glycol to an existing hydronic system without resizing the expansion tank frequently results in relief valve weeping, loss of fluid, and system low-pressure lockouts.
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              Point of No Pressure Change (PONPC) &amp; Circulator Placement
            </h3>
            <p>
              The connection point of the expansion tank to the hydronic loop represents the <strong>Point of No Pressure Change (PONPC)</strong>. A circulator pump cannot create or destroy static pressure at its expansion tank connection. Locating the circulator pump pumping <em>away</em> from the expansion tank adds pump head to system static pressure, elevating loop pressure, preventing dissolved gases from coming out of solution, and eliminating cavitation in upper-floor radiators and air vents.
            </p>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Related Hydronic &amp; Heating Engineering Workflows
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Size Heating Boilers &amp; Emitters: <Link href="/calculators/boiler-size-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Hydronic Boiler &amp; Baseboard Sizer</Link> — calculate total heating plant BTU requirements, emitter footage, and system water volume.<br />
              • Piping Friction &amp; Hydraulic Head: <Link href="/calculators/equivalent-length-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Fitting Equivalent Length Calculator</Link> — evaluate hydraulic resistance in loop piping and transitions.<br />
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
                <th scope="col">Typical Tank Sizing Ratio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Residential Baseboard Heating (60 gal)</strong></td>
                <td>Pure Water</td>
                <td>60°F ➔ 180°F</td>
                <td>12 / 30 psig</td>
                <td>0.360</td>
                <td>~7% to 9% of total system volume</td>
              </tr>
              <tr>
                <td><strong>Low-Temp Radiant Floor (100 gal)</strong></td>
                <td>Pure Water</td>
                <td>60°F ➔ 130°F</td>
                <td>12 / 30 psig</td>
                <td>0.360</td>
                <td>~4% to 6% of total system volume</td>
              </tr>
              <tr>
                <td><strong>Commercial Boiler Plant (400 gal)</strong></td>
                <td>Pure Water</td>
                <td>60°F ➔ 200°F</td>
                <td>18 / 50 psig</td>
                <td>0.452</td>
                <td>~7% to 9% of total system volume</td>
              </tr>
              <tr>
                <td><strong>Snow Melt Loop (150 gal)</strong></td>
                <td>50% Propylene Glycol</td>
                <td>40°F ➔ 140°F</td>
                <td>15 / 30 psig</td>
                <td>0.298</td>
                <td>~12% to 16% of total system volume</td>
              </tr>
              <tr>
                <td><strong>High-Rise Hydronic Loop (250 gal)</strong></td>
                <td>30% Propylene Glycol</td>
                <td>55°F ➔ 180°F</td>
                <td>25 / 60 psig</td>
                <td>0.468</td>
                <td>~9% to 11% of total system volume</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a closed-loop diaphragm expansion tank per ASHRAE Chapter 15 for a residential hydronic heating system with copper fin-tube baseboards. Total system fluid volume (Vs) is <strong>60 gallons</strong> of pure water. Cold fill temperature (T1) is <strong>60°F</strong> and high limit operating temperature (T2) is <strong>180°F</strong>. Initial fill/precharge pressure (P1) is <strong>12 psig</strong> (26.7 psia), and the boiler is fitted with a standard <strong>30 psig</strong> safety relief valve with a 3 psi design safety buffer (P2 = 27 psig = 41.7 psia).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Step-by-Step ASHRAE Sizing &amp; Pressure Schedule Calculations:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>
                <strong>Determine Fluid Specific Volumes &amp; Net Expansion:</strong>
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
                  ν₁ (water at 60°F) = 0.016038 ft³/lb | ν₂ (water at 180°F) = 0.016510 ft³/lb{"\n"}
                  Fluid Expansion Ratio = (ν₂ / ν₁) - 1 = (0.016510 / 0.016038) - 1 = <span style={{ color: "#38bdf8", fontWeight: 700 }}>0.0294 (2.94%)</span>
                </pre>
              </li>
              <li>
                <strong>Calculate Acceptance Volume (Vacc) per ASHRAE Ch. 15:</strong>
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
                  Net Expansion Ratio = 0.0294 - 0.00234 = 0.0271{"\n"}
                  Vacc = Vs × [(ν₂/ν₁ - 1) - 3·α·ΔT] = 60 × 0.0271 = <span style={{ color: "#38bdf8", fontWeight: 700 }}>1.63 Gallons</span>
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
                <strong>Calculate Minimum Tank Volume (Vt) &amp; Candidate Commercial Size Tier:</strong>
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
                  Vt = Vacc / Ar = 1.63 gal / 0.3597 = <span style={{ color: "#34d399", fontWeight: 700 }}>4.53 Gallons</span>{"\n"}
                  Candidate Standard Commercial ASME Tank Size Tier: <span style={{ color: "#34d399", fontWeight: 700 }}>7.6 Gallons</span>
                </pre>
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
