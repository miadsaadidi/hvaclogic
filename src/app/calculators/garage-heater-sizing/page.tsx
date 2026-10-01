import React from "react";
import type { Metadata } from "next";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { GarageHeaterTool } from "@/components/calculator/tools/GarageHeaterTool";
import { FormulaCard } from "@/components/seo/FormulaCard";

const calculator = getCalculatorById("garage-heater-sizing")!;

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

export default function GarageHeaterSizingPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Garage heater sizing calculates the preliminary steady-state heat loss through the building envelope (walls, ceiling, and sectional overhead doors), uninsulated concrete slab perimeter edges, and air infiltration drafts, plus an optional warm-up recovery margin. For a standard 2-car attached garage (528 sq ft, 9 ft ceiling, 10°F outdoor design temp, average insulation), the calculated design heat loss is 9,111 BTU/hr (2.67 kW). Because commercial heating equipment is manufactured in discrete capacity steps, this demand is typically served by a standard 30,000 BTU/hr gas unit heater (delivering ~24,600 BTU/hr at 82% efficiency) or a 3.0 kW to 5.0 kW electric unit heater on a dedicated 240V 20A–30A 2-pole circuit."
      formulaSnippet="Q_base = sum(U*A)*Delta_T + F_slab*P*Delta_T + 1.08*CFM_inf*Delta_T | Q_design = Q_base * (1 + Margin) | kW = Q_design / 3412.14 | MCA = (Watts / 240V) * 1.25"
      authorityCitation="ASHRAE Handbook of Fundamentals (Ch. 18 Heating Load Calculations), NEC Article 424 (Fixed Electric Space Heating), & NFPA 54 / ANSI Z223.1"
      toolComponent={<GarageHeaterTool />}
      methodologySection={
        <>
          <div style={{ marginTop: "0.5rem" }}>
            <FormulaCard
              title="Preliminary Garage Heat Loss &amp; Equipment Sizing Governing Equations"
              formula="Q_base = [(U_w \cdot A_{net\_w} + U_c \cdot A_c + U_d \cdot A_d) + F_{slab} \cdot P_{total} + 1.08 \cdot CFM_{inf}] \cdot (T_{in} - T_{out}) \quad | \quad Q_{design} = Q_{base} \cdot (1 + \frac{\%Margin}{100})"
              variables={[
                { symbol: "Q_{base}", label: "Base Steady-State Heat Loss", description: "Unmultiplied heat loss through envelope assemblies, slab perimeter, and air leakage", unit: "BTU/hr" },
                { symbol: "Q_{design}", label: "Total Design Heating Demand", description: "Design load including optional intermittent warm-up and door-opening recovery allowance", unit: "BTU/hr" },
                { symbol: "F_{slab}", label: "Slab Edge F-Factor", description: "Perimeter heat loss coefficient for on-grade concrete slabs (0.45 to 0.60 per ASHRAE Fundamentals)", unit: "BTU/hr·ft·°F" },
                { symbol: "U_d", label: "Overhead Door U-Factor", description: "Thermal transmittance of sectional roll-up door (0.10 insulated polyurethane core to 1.15 single-skin steel)", unit: "BTU/hr·ft²·°F" },
                { symbol: "CFM_{inf}", label: "Infiltration Air Flow", description: "Air leakage volume flow rate derived from room volume and air changes per hour: (V × ACH) / 60", unit: "CFM" },
                { symbol: "kW", label: "Calculated Electric Heating Power", description: "Net electrical power equivalent: Q_design / 3412.14", unit: "kW" },
                { symbol: "MCA", label: "Minimum Circuit Ampacity (NEC 424)", description: "125% continuous duty circuit sizing: (Watts / 240V) × 1.25", unit: "Amps" },
                { symbol: "Q_{gas\_input}", label: "Required Gas Heater Input Rating", description: "Fuel input rating accounting for unit heater thermal efficiency: Q_design / 0.82", unit: "BTU/hr" },
              ]}
              notes="This model provides a preliminary screening load calculation. Concrete slab thermal mass introduces substantial transient thermal lag during warm-up from cold setbacks, which is addressed via the optional 10%–20% recovery margin or nominal equipment step selection."
              sourceStandard="ASHRAE Handbook of Fundamentals & National Electrical Code (NEC Article 424)"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Equipment Sizing: Calculated Load vs. Commercial Equipment Selection
            </h3>
            <p>
              In garage and workshop heating, calculated thermal load must be distinguished from final equipment nameplate rating:
            </p>
            <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0 1rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Forced-Air Gas Unit Heaters (e.g. Modine Hot Dawg, Mr. Heater Big Maxx, Sterling):</strong> Fuel with Natural Gas or LP Propane. Standard power-vent unit heaters operate at approximately 82% thermal efficiency. Because standard residential units start at nominal 30,000 BTU/hr input (delivering ~24,600 BTU/hr), a garage with a 9,000–15,000 BTU/hr design load is typically paired with a 30k or 45k BTU unit. This surplus capacity enables fast recovery when overhead doors are opened during winter. Venting must comply with manufacturer instructions (Category I vertical B-vent or Category III/IV horizontal power exhaust per NFPA 54).
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Electric Forced-Air Unit Heaters (e.g. King, Fahrenheat, Dimplex, QMark):</strong> 100% efficient at point of use. Units are produced in standardized increments: 3.0 kW (10,236 BTU/hr), 4.0 kW (13,648 BTU/hr), 5.0 kW (17,060 BTU/hr), 7.5 kW (25,591 BTU/hr), and 10.0 kW (34,121 BTU/hr). Per NEC Article 424, fixed electric space heaters are continuous loads operating &ge; 3 hours, requiring conductors and overcurrent protection sized to at least 125% of operating current (I = Watts / 240V).
              </li>
              <li>
                <strong>Radiant Tube Infrared Heaters:</strong> Highly effective for high-ceiling shops (&ge; 12 ft) because radiant energy warms concrete slabs, machinery, and occupants directly rather than creating deep thermal air stratification near the ceiling. Proper clearance to combustibles (typically 24&quot;–48&quot; below reflectors) must be verified.
              </li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <div style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "0.75rem" }}>
            <strong>Reference Baseline Conditions:</strong> Outdoor Design Temp 10&deg;F, Target Setpoint 60&deg;F (&Delta;T = 50&deg;F), Concrete Slab Edge (F = 0.50), 10% Recovery Margin.
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col">Garage Layout / Geometry</th>
                <th scope="col">Floor Area &amp; Clear Height</th>
                <th scope="col">Insulation &amp; Infiltration Baseline</th>
                <th scope="col">Calculated Design Heat Loss</th>
                <th scope="col">Nominal Gas Unit Heater</th>
                <th scope="col">Electric Heater &amp; 240V Circuit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1-Car Attached</strong> (12&apos; &times; 22&apos;)</td>
                <td>264 sq ft (9&apos; ceiling)</td>
                <td>Poor (R-7 wall, uninsulated door, 0.85 ACH)</td>
                <td><strong>6,950 BTU/hr</strong> (2.04 kW)</td>
                <td>30,000 BTU/hr (delivers 24.6k)</td>
                <td>3.0 kW (12.5A, 20A breaker)</td>
              </tr>
              <tr>
                <td><strong>2-Car Attached</strong> (22&apos; &times; 24&apos;)</td>
                <td>528 sq ft (9&apos; ceiling)</td>
                <td>Average (R-13 wall, R-6 door, 0.45 ACH)</td>
                <td><strong>9,111 BTU/hr</strong> (2.67 kW)</td>
                <td>30,000 BTU/hr (delivers 24.6k)</td>
                <td>3.0 kW to 5.0 kW (20A–30A breaker)</td>
              </tr>
              <tr>
                <td><strong>2.5-Car Detached</strong> (24&apos; &times; 26&apos;)</td>
                <td>624 sq ft (10&apos; ceiling)</td>
                <td>Average (R-13 wall, R-6 door, 0.45 ACH)</td>
                <td><strong>13,420 BTU/hr</strong> (3.93 kW)</td>
                <td>45,000 BTU/hr (delivers 36.9k)</td>
                <td>4.0 kW to 5.0 kW (25A–30A breaker)</td>
              </tr>
              <tr>
                <td><strong>3-Car Detached</strong> (24&apos; &times; 32&apos;)</td>
                <td>768 sq ft (10&apos; ceiling)</td>
                <td>Good (R-19 wall, R-12 door, 0.25 ACH)</td>
                <td><strong>11,880 BTU/hr</strong> (3.48 kW)</td>
                <td>30,000 to 45,000 BTU/hr</td>
                <td>4.0 kW to 5.0 kW (25A–30A breaker)</td>
              </tr>
              <tr>
                <td><strong>Pole Barn Shop</strong> (30&apos; &times; 40&apos;)</td>
                <td>1,200 sq ft (14&apos; ceiling)</td>
                <td>Uninsulated (R-2 wall, metal door, 1.25 ACH)</td>
                <td><strong>84,940 BTU/hr</strong> (24.89 kW)</td>
                <td>100,000 to 125,000 BTU/hr (or Radiant)</td>
                <td>25.0 kW to 30.0 kW (125A+ service)</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Preliminary heating load calculation and equipment selection for a <strong>2-car attached garage (22&apos; &times; 24&apos; = 528 sq ft)</strong> with a 9-foot clear ceiling height in Columbus, OH (ASHRAE Winter 99% outdoor design temperature: <strong>10.0&deg;F</strong>). The garage has drywall with R-13 fiberglass cavity insulation (U = 0.07), an R-19 ceiling assembly (U = 0.045), an R-6 double overhead sectional door (112 sq ft, U = 0.20), an uninsulated on-grade concrete slab (F = 0.50 BTU/hr·ft·°F), and standard weatherstripping (0.45 ACH). Target thermostat setpoint is <strong>60.0&deg;F</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Step-by-Step Mathematical Derivation:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Design Temperature Differential:</strong> &Delta;T = 60.0&deg;F - 10.0&deg;F = <strong>50.0&deg;F</strong>.</li>
              <li><strong>Overhead Garage Door Conduction:</strong> 112 sq ft @ U-0.20 &times; 50.0&deg;F = <strong>1,120 BTU/hr</strong>.</li>
              <li><strong>Exposed Above-Grade Wall Conduction:</strong> Total perimeter = 2 &times; (22 + 24) = 92 ft. Exposed attached perimeter = 92 - 24 = 68 ft. Gross wall area = 68 &times; 9 = 612 sq ft. Net wall area = 612 - 112 = 500 sq ft. Net wall loss = 500 sq ft @ U-0.07 &times; 50.0&deg;F = <strong>1,750 BTU/hr</strong>.</li>
              <li><strong>Ceiling Conduction:</strong> 528 sq ft @ U-0.045 &times; 50.0&deg;F = <strong>1,188 BTU/hr</strong>.</li>
              <li><strong>Concrete Slab Edge Perimeter Conduction:</strong> Total perimeter = 92 ft @ F-0.50 &times; 50.0&deg;F = <strong>2,300 BTU/hr</strong>.</li>
              <li><strong>Air Infiltration Drafts:</strong> Room volume = 528 &times; 9 = 4,752 cu ft. At 0.45 ACH, airflow = (4,752 &times; 0.45) / 60 = 35.64 CFM. Infiltration loss = 1.08 &times; 35.64 CFM &times; 50.0&deg;F = <strong>1,925 BTU/hr</strong>.</li>
              <li><strong>Base Steady-State Heat Loss:</strong> Q_base = 1,120 + 1,750 + 1,188 + 2,300 + 1,925 = <strong>8,283 BTU/hr</strong>.</li>
              <li><strong>Intermittent Warm-up Recovery Margin (10%):</strong> Q_margin = 8,283 &times; 0.10 = <strong>828 BTU/hr</strong>.</li>
              <li><strong>Total Calculated Design Heat Loss:</strong> Q_design = 8,283 + 828 = <strong>9,111 BTU/hr</strong> (2.67 kW).</li>
              <li><strong>Equipment Sizing &amp; Electrical Circuit Selection:</strong>
                <ul style={{ marginTop: "0.35rem", paddingLeft: "1.2rem" }}>
                  <li><strong>Electric Unit Heater:</strong> The calculated 2.67 kW requirement is satisfied by a standard <strong>3.0 kW electric unit heater</strong> (delivering 10,236 BTU/hr). Operating current is 3,000W / 240V = 12.5A. Per NEC Article 424 (125% continuous duty), Minimum Circuit Ampacity (MCA) = 12.5A &times; 1.25 = 15.6A, requiring a <strong>20A 2-pole breaker</strong> and 12 AWG copper wire. If faster warm-up from unheated setbacks is preferred, a <strong>5.0 kW heater</strong> (20.8A load, MCA 26.0A, <strong>30A 2-pole breaker</strong> with 10 AWG wire) may be selected.</li>
                  <li><strong>Gas Unit Heater:</strong> Calculated design load is 9,111 BTU/hr. At 82% thermal efficiency, required fuel input is 9,111 / 0.82 = 11,111 BTU/hr. The smallest standard commercial residential gas unit heater manufactured is <strong>30,000 BTU/hr input</strong> (delivering ~24,600 BTU/hr output), providing ample recovery capability.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
