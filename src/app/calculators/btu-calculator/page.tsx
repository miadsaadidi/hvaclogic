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
      directAnswer="To calculate heating and cooling BTU requirements, multiply conditioned square footage by your regional climate factor (typically 20 to 30 BTU/sq ft for cooling, 30 to 50 BTU/sq ft for heating). Adjust for ceiling height, wall insulation R-values, window solar exposure, and occupant internal heat gains."
      formulaSnippet="Total Cooling BTU/hr = Area * Cooling Factor * Height Mult * Insulation Mult + Internal Gains"
      authorityCitation="ACCA Manual J 8th Edition & ASHRAE Standard 90.1 Envelope Guidelines"
      toolComponent={<BtuCalculatorTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="cooling-loads" />

          <h2>How to Calculate Whole-Home BTU Heating & Cooling Loads</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Accurate HVAC equipment sizing prevents both undersizing (failure to maintain comfort during peak outdoor design temperatures) and oversizing (short-cycling, high indoor humidity, and premature equipment failure).
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Calculate Conditioned Volume</strong>: Determine floor square footage and ceiling height. Cathedral or vaulted ceilings increase air volume requiring higher heating and cooling capacity.</li>
            <li><strong>Determine Design Temperature Differences (ΔT)</strong>: Cross-reference your local IECC Climate Zone to establish summer cooling design temperatures (typically 90°F to 105°F) and winter heating design temperatures (0°F to 30°F).</li>
            <li><strong>Calculate Sensible Envelope Heat Gain (Q = U × A × ΔT)</strong>: Sum transmission losses through exterior walls, attic ceilings, window glass, and slab foundations.</li>
            <li><strong>Add Internal Heat Gains & Latent Dehumidification</strong>: Account for human metabolism (approx. 230 BTU sensible + 200 BTU latent per occupant) plus cooking appliances and lighting.</li>
          </ol>

          <FormulaCard
            title="Manual J Heat Load Mathematical Formulation"
            formula="Q_total = Q_sensible + Q_latent  |  Q_sensible = \sum (U_i * A_i * \Delta T) + Q_solar + Q_internal + Q_duct"
            variables={[
              { symbol: "Q_total", label: "Total Cooling Load", description: "Combined sensible temperature drop and latent dehumidification load", unit: "BTU/hr" },
              { symbol: "U_i", label: "Overall U-Factor", description: "Thermal transmittance coefficient of the building assembly (U = 1 / R)", unit: "BTU/hr·ft²·°F" },
              { symbol: "A_i", label: "Surface Area", description: "Net exposed surface area of walls, windows, doors, or ceiling", unit: "sq ft" },
              { symbol: "\\Delta T", label: "Design Temperature Difference", description: "Difference between indoor comfort setpoint (75°F summer) and outdoor design temp", unit: "°F" },
              { symbol: "Tonnage", label: "Nominal AC Tonnage", description: "Refrigeration capacity: 1 Ton = 12,000 BTU/hr", unit: "Tons" },
            ]}
            notes="Calculations are designed for preliminary load screening and sizing estimates. Permitted municipal HVAC installations require a certified block/room-by-room ACCA Manual J load calculation."
            sourceStandard="ACCA Manual J (8th Edition) / ASHRAE 90.1"
          />
        </>
      }
      comparisonTableSection={
        <>
          <h2>IECC Climate Zone Sizing Benchmarks</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Typical cooling and heating capacity benchmarks for standard residential construction:
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
                  <td>3.5 to 4.0 Tons AC</td>
                </tr>
                <tr>
                  <td><strong>Zone 3 (Warm)</strong></td>
                  <td>Atlanta, Dallas, Las Vegas</td>
                  <td>20–24 BTU/sq ft</td>
                  <td>20–30 BTU/sq ft</td>
                  <td>3.0 to 3.5 Tons AC</td>
                </tr>
                <tr>
                  <td><strong>Zone 4 (Mixed-Humid)</strong></td>
                  <td>St. Louis, DC, Seattle</td>
                  <td>18–22 BTU/sq ft</td>
                  <td>25–35 BTU/sq ft</td>
                  <td>2.5 to 3.0 Tons AC</td>
                </tr>
                <tr>
                  <td><strong>Zone 5 (Cold)</strong></td>
                  <td>Chicago, Boston, Denver</td>
                  <td>16–20 BTU/sq ft</td>
                  <td>35–45 BTU/sq ft</td>
                  <td>2.5 Tons AC / 80k Furnace</td>
                </tr>
                <tr>
                  <td><strong>Zone 6 (Very Cold)</strong></td>
                  <td>Minneapolis, Burlington</td>
                  <td>14–18 BTU/sq ft</td>
                  <td>45–55 BTU/sq ft</td>
                  <td>2.0 Tons AC / 100k Furnace</td>
                </tr>
                <tr>
                  <td><strong>Zone 7 (Subarctic)</strong></td>
                  <td>Duluth, Fairbanks</td>
                  <td>12–16 BTU/sq ft</td>
                  <td>55–65 BTU/sq ft</td>
                  <td>2.0 Tons AC / 120k Furnace</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Whole-Home Load Calculation for a 2,000 sq ft Home</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> Calculate the cooling and heating requirements for a 2-story, 2,000 sq ft single-family home located in Climate Zone 4 (St. Louis). The home has standard 9 ft ceilings, average R-13 wall insulation, R-30 attic insulation, double Low-E windows, and 4 occupants.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Calculate Base Envelope Cooling Load</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Base Cooling = 2000 sq ft * 14.25 BTU/sqft * (9 / 8) * 1.0 (insul) * 0.95 (windows) = 30,459 BTU/hr
            </p>

            <p><strong>Step 2: Add Occupant & Appliance Internal Gains</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Sensible Internal = (4 * 230) + 1200 = 2,120 BTU/hr  |  Latent Internal = 4 * 200 = 800 BTU/hr
            </p>

            <p><strong>Step 3: Total Load & Nominal Equipment Selection</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Total Cooling = (30,459 * 0.85 + 2120 + 800) * 1.15 = 34,200 BTU/hr ==&gt; 2.85 Tons (Select 3.0 Ton System)
            </p>
            <p style={{ color: "var(--ink-secondary)" }}>
              ✓ <strong>Heating Load:</strong> Total heating demand calculates to 48,000 BTU/hr, perfectly matching a standard 60,000 BTU input 96% AFUE gas furnace or a 3.0 Ton cold-climate heat pump with auxiliary heat strips.
            </p>
          </div>
        </>
      }
      relatedToolsSection={
        <div style={{ marginBottom: "2rem" }}>
          <h2>Related Sizing Calculators</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <Link href="/calculators/ac-tonnage-calculator" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>AC Tonnage Calculator</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Compare SEER2 efficiency ratings and calculate annual electricity operating costs.</p>
            </Link>
            <Link href="/calculators/cfm-calculator" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>HVAC CFM Sizer</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Determine the exact supply airflow CFM required to satisfy your calculated BTU load.</p>
            </Link>
            <Link href="/calculators/ductulator" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>Digital Ductulator</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Size the ductwork required to deliver your system&apos;s design airflow volume.</p>
            </Link>
          </div>
        </div>
      }
    />
  );
}
