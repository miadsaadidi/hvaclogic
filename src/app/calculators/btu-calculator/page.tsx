import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { BtuCalculatorTool } from "@/components/calculator/tools/BtuCalculatorTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("btu-calculator")!;

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

export default function BtuCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="For preliminary HVAC load screening, heating and cooling estimates can be approximated by multiplying conditioned floor area by regional climate benchmarks (typically 14 to 20 BTU/hr per sq ft for cooling, 20 to 50 BTU/hr per sq ft for heating in standard residential construction) and adjusting for ceiling height, envelope insulation quality, window performance, and occupant internal gains. Formal equipment sizing and municipal permit submittals require a comprehensive ACCA Manual J room-by-room load calculation using verified building assemblies and location-specific design temperatures."
      formulaSnippet="Screening Cooling BTU/hr = (Area * Cooling Factor * Height Mult * Insul Mult * Win Mult * 0.85 + Internal Gains) * Duct Factor"
      authorityCitation="ACCA Manual J (Residential Load Calculation) & ASHRAE Handbook of Fundamentals Ch. 18"
      toolComponent={<BtuCalculatorTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="cooling-loads" />

          <h2>Whole-Home BTU Load Screening &amp; Fundamental Heat Transfer Principles</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Accurate HVAC equipment sizing balances peak heating and cooling comfort against equipment runtime efficiency. In formal engineering design per <strong>ACCA Manual J</strong>, envelope heat transmission is computed component-by-component across all building assemblies using fundamental heat transfer physics:
          </p>
          <p style={{ fontFamily: "monospace", background: "rgba(0,0,0,0.25)", padding: "0.5rem 0.75rem", borderRadius: "4px", color: "var(--accent-cooling)" }}>
            Q_transmission = \sum (U_i * A_i * \Delta T)
          </p>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            This calculator provides an <strong>HVACLogic preliminary load screening model</strong> based on conditioned floor area, regional climate zone factors, ceiling height volume adjustments, and envelope quality proxies. While useful for budgeting and initial capacity checks, a complete code-compliant Manual J calculation requires detailed inputs that are omitted in simplified screening tools:
          </p>

          <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Detailed Envelope Surfaces</strong>: Net exterior wall areas, partition walls, ceiling/roof framing U-factors, and foundation slab/basement heat loss coefficients.</li>
            <li><strong>Fenestration Orientation &amp; Solar Properties</strong>: Individual window compass orientations (North, South, East, West), Solar Heat Gain Coefficients (SHGC), and exterior overhang shading.</li>
            <li><strong>Infiltration &amp; Mechanical Ventilation</strong>: Measured air leakage rates (blower door ACH50/CFM50) and continuous outdoor ventilation air per ASHRAE 62.2.</li>
            <li><strong>Ductwork Heat Gain &amp; Leakage</strong>: Supply and return duct surface areas, insulation R-values, and location (conditioned space vs. unconditioned vented attic).</li>
            <li><strong>Specific Location Climatic Design Conditions</strong>: ASHRAE 99% winter heating and 1% / 0.4% summer cooling outdoor design wet-bulb and dry-bulb temperatures.</li>
          </ul>

          <FormulaCard
            title="HVACLogic Preliminary Load Screening Model &amp; Heat Transfer Physics"
            formula="Q_cooling = (Area * q_cool * (H / 8) * F_insul * F_win * 0.85 + Q_internal) * F_duct  |  Q_heating = Area * q_heat * (H / 8) * F_insul * F_win * F_duct"
            variables={[
              { symbol: "Q_cooling", label: "Total Estimated Cooling Load", description: "Combined sensible and latent peak cooling load estimate", unit: "BTU/hr" },
              { symbol: "Q_heating", label: "Total Estimated Heating Load", description: "Peak design heat loss estimate", unit: "BTU/hr" },
              { symbol: "Area", label: "Conditioned Floor Area", description: "Gross conditioned living area", unit: "sq ft" },
              { symbol: "q_cool", label: "Climate Zone Cooling Factor", description: "Screening cooling benchmark (10.0 to 18.5 BTU/hr·sq ft)", unit: "BTU/hr·sq ft" },
              { symbol: "q_heat", label: "Climate Zone Heating Factor", description: "Screening heating benchmark (14.0 to 50.0 BTU/hr·sq ft)", unit: "BTU/hr·sq ft" },
              { symbol: "H", label: "Ceiling Height", description: "Average room ceiling height (H / 8 volume adjustment factor)", unit: "ft" },
              { symbol: "F_insul", label: "Insulation Quality Factor", description: "Screening envelope factor: 1.35 (Poor), 1.00 (Avg), 0.85 (Good), 0.70 (Superior)", unit: "Dimensionless" },
              { symbol: "F_win", label: "Fenestration Factor", description: "Window performance proxy: 1.25 (Single), 1.05 (Double), 0.95 (Low-E), 0.80 (Triple)", unit: "Dimensionless" },
              { symbol: "Q_internal", label: "Internal Heat Gains", description: "Occupant (230 sensible + 200 latent BTU/hr/person) + 1,200 BTU/hr appliance baseline", unit: "BTU/hr" },
              { symbol: "F_duct", label: "Duct Allowance Factor", description: "Screening factor for duct heat transfer (1.05 conditioned, 1.15 unconditioned attic)", unit: "Dimensionless" },
            ]}
            notes="The fundamental physical relationship governing envelope heat transfer is Q = U * A * DeltaT. This screening calculator applies an empirical floor-area factor model for preliminary estimation; final equipment selection and permitting require a certified room-by-room ACCA Manual J calculation and ACCA Manual S equipment selection."
            sourceStandard="Technical References: ACCA Manual J (8th Edition) & ASHRAE Handbook of Fundamentals"
          />
        </>
      }
      comparisonTableSection={
        <>
          <h2>Preliminary Screening Benchmarks (IECC Climate Zones)</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Representative cooling and heating capacity benchmarks for standard residential construction:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Climate Zone</th>
                  <th scope="col">Representative Cities</th>
                  <th scope="col">Cooling Benchmark</th>
                  <th scope="col">Heating Benchmark</th>
                  <th scope="col">Typical 2,000 sq ft Sizing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Zone 1 (Very Hot)</strong></td>
                  <td>Miami, Honolulu</td>
                  <td>25–30 BTU/sq ft</td>
                  <td>10–15 BTU/sq ft</td>
                  <td>4.0 to 5.0 Tons AC</td>
                </tr>
                <tr>
                  <td><strong>Zone 2 (Hot-Humid)</strong></td>
                  <td>Houston, Phoenix, Tampa</td>
                  <td>22–26 BTU/sq ft</td>
                  <td>15–20 BTU/sq ft</td>
                  <td>3.5 to 4.5 Tons AC</td>
                </tr>
                <tr>
                  <td><strong>Zone 3 (Warm)</strong></td>
                  <td>Atlanta, Dallas, Las Vegas</td>
                  <td>20–24 BTU/sq ft</td>
                  <td>20–30 BTU/sq ft</td>
                  <td>3.0 to 4.0 Tons AC</td>
                </tr>
                <tr>
                  <td><strong>Zone 4 (Mixed-Humid)</strong></td>
                  <td>St. Louis, DC, Seattle</td>
                  <td>18–22 BTU/sq ft</td>
                  <td>25–35 BTU/sq ft</td>
                  <td>3.0 to 3.5 Tons AC</td>
                </tr>
                <tr>
                  <td><strong>Zone 5 (Cold)</strong></td>
                  <td>Chicago, Boston, Denver</td>
                  <td>16–20 BTU/sq ft</td>
                  <td>35–45 BTU/sq ft</td>
                  <td>2.5 to 3.0 Tons AC / 70–90k Furnace</td>
                </tr>
                <tr>
                  <td><strong>Zone 6 (Very Cold)</strong></td>
                  <td>Minneapolis, Burlington</td>
                  <td>14–18 BTU/sq ft</td>
                  <td>45–55 BTU/sq ft</td>
                  <td>2.0 to 3.0 Tons AC / 90–110k Furnace</td>
                </tr>
                <tr>
                  <td><strong>Zone 7 (Subarctic)</strong></td>
                  <td>Duluth, Fairbanks</td>
                  <td>12–16 BTU/sq ft</td>
                  <td>55–65 BTU/sq ft</td>
                  <td>2.0 to 2.5 Tons AC / 110–130k Furnace</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Preliminary Load Screening for a 2,000 sq ft Home</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Estimate heating and cooling requirements for a 2-story, 2,000 sq ft single-family home in Climate Zone 4 (St. Louis). The home has 9 ft ceilings, average R-13 wall / R-30 attic insulation, double Low-E windows, 4 occupants, and ductwork located in an unconditioned attic.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Calculate Base Envelope Loads</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Base Cooling = 2000 * 14.25 * (9 / 8) * 1.0 (insul) * 0.95 (windows) = 30,459 BTU/hr<br />
              Base Heating = 2000 * 24.00 * (9 / 8) * 1.0 (insul) * 0.95 (windows) = 51,300 BTU/hr
            </p>

            <p><strong>Step 2: Add Occupant &amp; Baseline Internal Heat Gains</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Sensible Internal = (4 * 230) + 1200 = 2,120 BTU/hr  |  Latent Internal = 4 * 200 = 800 BTU/hr
            </p>

            <p><strong>Step 3: Calculate Sensible, Latent, and Total Cooling Loads (Duct Factor 1.15)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Sensible Cooling = (30,459 * 0.85 + 2120) * 1.15 = 32,212 BTU/hr<br />
              Latent Cooling   = (30,459 * 0.15 + 800) * 1.15  = 6,174 BTU/hr<br />
              Total Cooling    = 32,212 + 6,174 = 38,386 BTU/hr ==&gt; 3.20 Tons
            </p>

            <p><strong>Step 4: Calculate Total Heating Load &amp; Design Airflow</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Total Heating = 51,300 * 1.15 = 58,995 BTU/hr<br />
              Design Airflow = 32,212 / (1.08 * 20°F DeltaT) = 1,490 CFM
            </p>

            <p style={{ color: "var(--ink-secondary)", marginTop: "1rem" }}>
              ✓ <strong>Equipment Selection Guidance:</strong> Preliminary cooling indicates a nominal 3.0 to 3.5 Ton system. For heating, an 80,000 BTU/hr input 96% AFUE gas furnace provides approximately 76,800 BTU/hr output capacity, adequately covering the 58,995 BTU/hr estimated design heat loss. Final equipment selection should always follow ACCA Manual S using manufacturer expanded performance tables at local design temperatures.
            </p>
          </div>
        </>
      }
    />
  );
}
