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
      directAnswer="Hydronic boiler sizing matches boiler capacity to connected radiation emitters (copper fin-tube baseboard or cast-iron radiators) or whole-building heat loss. Required DOE Heating Capacity is calculated by applying the standard I=B=R piping and pick-up allowance to the net radiation load: Required DOE Capacity = Net Load × 1.15 (hot water) or Net Load × 1.33 (steam). Standard copper fin-tube baseboard delivers approximately 580 BTU/hr per linear foot at 180°F AWT, while cast-iron radiators yield 150 BTU/hr per sq ft EDR for hot water and 240 BTU/hr per sq ft EDR for 1 psig steam."
      formulaSnippet="Q_emitter = Length * Rating(WaterTemp) | Q_net = Q_emitter + Q_DHW | Q_DOE_required = Q_net * 1.15 (Water) or 1.33 (Steam)"
      authorityCitation="I=B=R Hydronics Institute Testing & Rating Standards, AHRI Directory of Certified Product Performance, ASME Section IV, & ACCA Manual S (Informational)"
      toolComponent={<BoilerSizeTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Hydronic Boiler Sizing &amp; Emitter Rating Equations"
              formula="Q_{\text{emitter}} = \text{Length} \cdot q_{\text{baseboard}}(T_{\text{water}}) \quad | \quad Q_{\text{net}} = Q_{\text{emitter}} + Q_{\text{DHW}} \quad | \quad Q_{\text{DOE, req}} = Q_{\text{net}} \cdot F_{\text{pickup}}"
              variables={[
                { symbol: "Q_{\\text{emitter}}", label: "Connected Emitter Load", description: "Combined heat emission capacity of all active fin-tube baseboards or cast-iron radiators", unit: "BTU/hr" },
                { symbol: "Q_{\\text{net}}", label: "Net Radiation / AHRI Demand", description: "Total space heating emitter demand plus any unmanaged domestic hot water allowance", unit: "BTU/hr" },
                { symbol: "F_{\\text{pickup}}", label: "I=B=R Piping & Pick-Up Factor", description: "Standard allowance: 1.15 for residential hot water systems, 1.33 for residential steam systems", unit: "Multiplier" },
                { symbol: "Q_{\\text{DOE, req}}", label: "Required DOE Heating Capacity", description: "Minimum rated equipment heating capacity required from boiler submittal ratings", unit: "BTU/hr" },
                { symbol: "\\text{EDR}", label: "Equivalent Direct Radiation", description: "Standard measure of cast-iron radiator surface area (1 sq ft EDR = 150 BTU/hr water, 240 steam)", unit: "sq ft EDR" },
                { symbol: "\\text{AFUE}", label: "Annual Fuel Utilization Efficiency", description: "Seasonal laboratory rating (not an instantaneous steady-state conversion multiplier)", unit: "%" },
              ]}
              notes="The I=B=R piping and pick-up allowance (1.15 for water, 1.33 for steam) represents distribution piping heat dissipation and initial warm-up from a cold system start, not combustion flue loss. AFUE is a seasonal laboratory rating; equipment selection must match required DOE Heating Capacity directly to manufacturer submittal ratings."
              sourceStandard="I=B=R Hydronics Institute Standards, AHRI Directory of Certified Product Performance, and ASME Section IV"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              The 3 Methods of Hydronic Boiler Sizing
            </h3>
            <p>
              Hydronic heating professionals evaluate replacement boiler sizing using three distinct methods:
            </p>
            <ul style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
              <li>
                <strong>Fin-Tube Baseboard Measurement:</strong> Measuring the active finned element length (excluding empty sheet metal covers). Standard 3/4&quot; residential copper fin-tube yields ~580 BTU/hr per foot at 180&deg;F average water temperature (AWT), ~450 BTU/hr at 160&deg;F, ~330 BTU/hr at 140&deg;F, and ~210 BTU/hr at 120&deg;F.
              </li>
              <li>
                <strong>Cast-Iron Radiator EDR Survey:</strong> Counting the sections, tubes/columns, and height of vintage cast-iron radiators to calculate total Equivalent Direct Radiation (150 BTU/hr-sqft for hot water at 180&deg;F AWT; 240 BTU/hr-sqft for low-pressure steam at 215&deg;F).
              </li>
              <li>
                <strong>ACCA Manual J Building Heat Loss:</strong> Calculating room-by-room envelope heat losses. In vintage homes that have added modern insulation, air sealing, and high-performance windows, whole-building design heat loss is often significantly lower than the installed vintage radiator capacity. Sizing by heat loss prevents oversized equipment and excessive short-cycling.
              </li>
            </ul>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
              Hydronic Heating vs. Ducted Hydro-Air Distribution
            </h3>
            <p>
              When a central hydronic boiler supplies a forced-air fan coil (hydro-air heating) or when evaluating conversions between baseboards and ducted central heat pumps, system performance spans both water-side and air-side thermal dynamics. A hot water coil installed in a central duct trunk delivers heating capacity matching the hydronic loop:
            </p>
            <p style={{ background: "var(--surface-raised)", borderLeft: "3px solid var(--accent-heating)", padding: "0.6rem 0.9rem", margin: "0.75rem 0", borderRadius: "0 4px 4px 0" }}>
              <strong>Coupled Thermal Balance:</strong> <code>Q = 500 × GPM × ΔT_water = 1.08 × CFM × ΔT_air</code>
            </p>
            <p>
              The hydro-air heating coil introduces an internal static pressure resistance (typically 0.15 to 0.25 in. wg) to the air handler blower budget. Sizing the supply and return duct trunks with the proper friction rate is critical to prevent restricted airflow and excessive discharge air temperatures.
            </p>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Hydronic &amp; Air Distribution Engineering Workflows
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Size Hydro-Air Duct Trunks: <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Digital Ductulator</Link> — calculate equal-friction round and rectangular duct sizes for ducted hydro-air fan coil systems.<br />
              • Account for Coil Static Pressure Drops: <Link href="/calculators/duct-friction-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Duct Friction Loss &amp; TEL Sizer</Link> — deduct water coil static resistance from blower Available Static Pressure (ASP).<br />
              • Size Flexible Duct Branch Runouts: <Link href="/calculators/flex-duct-cfm-chart" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Flexible Duct CFM Chart</Link> — verify branch air delivery with ASHRAE RP-1333 sag deratings.<br />
              • Whole-Building Thermal Envelope Load: <Link href="/calculators/heat-loss-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Building Heat Loss Calculator</Link> — calculate peak building transmission and infiltration load per ACCA Manual J.<br />
              • Boiler Room Combustion Air Sizing: <Link href="/calculators/combustion-air-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Combustion Air Sizer</Link> — ensure NFPA 54 / IFGC compliance for non-direct-vent boiler installations.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <div>
          <h2>Illustrative Emitter Capacity &amp; Radiation Examples</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Representative heating capacity calculations across common hydronic emitter configurations. Sizing shows connected load, net radiation requirement, required DOE Heating Capacity, and candidate nominal boiler input ranges.
          </p>
          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Heating System Scenario</th>
                  <th scope="col">Emitter Rating Basis</th>
                  <th scope="col">Operating Temperature / Condition</th>
                  <th scope="col">I=B=R Factor</th>
                  <th scope="col">Required DOE Capacity</th>
                  <th scope="col">Candidate Boiler Input Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Standard Fin-Tube Baseboard (100 ft)</strong></td>
                  <td>580 BTU/linear ft</td>
                  <td>180&deg;F AWT</td>
                  <td>1.15&times;</td>
                  <td>66,700 BTU/hr</td>
                  <td>70k to 75k BTU/hr Input (95% AFUE)</td>
                </tr>
                <tr>
                  <td><strong>Low-Temp Condensing Baseboard (150 ft)</strong></td>
                  <td>330 BTU/linear ft</td>
                  <td>140&deg;F AWT</td>
                  <td>1.15&times;</td>
                  <td>56,925 BTU/hr</td>
                  <td>60k to 70k BTU/hr Input (96% AFUE)</td>
                </tr>
                <tr>
                  <td><strong>Vintage Hot Water Radiators (400 EDR)</strong></td>
                  <td>150 BTU/sq ft EDR</td>
                  <td>170&deg;F–180&deg;F AWT</td>
                  <td>1.15&times;</td>
                  <td>69,000 BTU/hr</td>
                  <td>80k to 90k BTU/hr Input (84% Cast-Iron)</td>
                </tr>
                <tr>
                  <td><strong>Low-Pressure Steam Radiators (300 EDR)</strong></td>
                  <td>240 BTU/sq ft EDR</td>
                  <td>215&deg;F Steam (1 psig)</td>
                  <td>1.33&times;</td>
                  <td>95,760 BTU/hr</td>
                  <td>110k to 120k BTU/hr Input (82% Steam)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing a replacement condensing modulating boiler for a home with <strong>100 linear feet</strong> of standard 3/4&quot; copper fin-tube baseboard and an indirect domestic water heater with a DHW Priority Zone Controller.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Hydronic Rating &amp; Sizing Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>
                <strong>Calculate Connected Baseboard Load:</strong> 100 linear ft &times; 580 BTU/hr-ft (standard 3/4&quot; fin-tube @ 180&deg;F AWT) = <strong>58,000 BTU/hr Connected Emitter Output</strong>.
              </li>
              <li>
                <strong>Evaluate DHW Priority Relay:</strong> With a priority zone controller active, space-heating circulators are temporarily suspended during domestic water heating calls, yielding a space-heating pickup adder of <strong>0 BTU/hr</strong> (Net AHRI Demand Q_net = <strong>58,000 BTU/hr</strong>).
              </li>
              <li>
                <strong>Apply I=B=R Hot Water Piping &amp; Pick-Up Allowance:</strong> 58,000 BTU/hr &times; 1.15 = <strong>66,700 BTU/hr Required DOE Heating Capacity</strong>.
              </li>
              <li>
                <strong>Equipment Selection from Manufacturer Submittal Data:</strong> Select a candidate modulating-condensing boiler with rated DOE Heating Capacity &ge; 66,700 BTU/hr (typically corresponding to an illustrative <strong>75,000 to 80,000 BTU/hr nominal input</strong> gas-fired mod-con boiler rated at ~71,000 to 76,000 BTU/hr DOE output).
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
