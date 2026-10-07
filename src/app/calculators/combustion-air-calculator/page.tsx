import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { CombustionAirTool } from "@/components/calculator/tools/CombustionAirTool";
import { FormulaCard } from "@/components/seo/FormulaCard";

const calculator = getCalculatorById("combustion-air-calculator")!;

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

export default function CombustionAirPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Combustion air sizing determines whether a mechanical closet is a confined space and calculates the required net free area for fresh air openings per NFPA 54 / ANSI Z223.1 and IFGC Section 304. Under the Standard Method, an unconfined space requires at least 50 cubic feet per 1,000 BTU/hr of combined gas appliance input. If the space is confined, permanent openings must supply required net free area based on the selected method: 1 sq in. per 1,000 BTU/hr for indoor communicating spaces (min 100 sq in. each), 1 sq in. per 4,000 BTU/hr for outdoor vertical ducts, 1 sq in. per 2,000 BTU/hr for outdoor horizontal ducts, or 1 sq in. per 3,000 BTU/hr for a direct outdoor single opening. Gross louver dimensions are calculated by dividing required net free area by the manufacturer's verified free-area percentage (typically 75% for metal or 25% for wood)."
      formulaSnippet="V_req = (Total_BTU / 1000) * 50 cu ft | Area_vert = Total_BTU / 4000 sq in | Area_horiz = Total_BTU / 2000 sq in | Area_single = Total_BTU / 3000 sq in | Gross = Net / Free_Area_Fraction"
      authorityCitation="National Fuel Gas Code (NFPA 54 / ANSI Z223.1 Section 9.3) & International Fuel Gas Code (IFGC Section 304)"
      toolComponent={<CombustionAirTool />}
      methodologySection={
        <>
          <div style={{ marginTop: "0.5rem" }}>
            <FormulaCard
              title="NFPA 54 / IFGC Combustion Air &amp; Confined Space Governing Formulations"
              formula="V_{unconfined} = \frac{Q_{total}}{1000} \cdot 50 \text{ ft}^3 \quad | \quad A_{gross} = \frac{A_{net}}{\text{FreeArea}_{\%}/100} \quad | \quad D_{round} = \sqrt{\frac{4 \cdot A_{gross}}{\pi}}"
              variables={[
                { symbol: "V_{unconfined}", label: "Required Unconfined Volume", description: "Minimum room volume required to avoid dedicated permanent combustion air openings (50 cu ft / 1,000 BTU/hr per NFPA 54 §9.3.2.1)", unit: "cu ft" },
                { symbol: "Q_{total}", label: "Total Combined Gas Input", description: "Sum of nameplate input BTU/hr ratings for all fuel-burning appliances in the space", unit: "BTU/hr" },
                { symbol: "A_{indoor}", label: "Indoor Air Net Free Area", description: "1 sq in. per 1,000 BTU/hr total input (minimum 100 sq in. net per opening)", unit: "sq in." },
                { symbol: "A_{vert}", label: "Outdoor Vertical Duct Net Free Area", description: "1 sq in. per 4,000 BTU/hr total input for each of two vertical ducts", unit: "sq in." },
                { symbol: "A_{horiz}", label: "Outdoor Horizontal Duct Net Free Area", description: "1 sq in. per 2,000 BTU/hr total input for each of two horizontal ducts", unit: "sq in." },
                { symbol: "A_{single}", label: "Outdoor Single Opening Net Free Area", description: "1 sq in. per 3,000 BTU/hr total input for a single direct outdoor opening", unit: "sq in." },
                { symbol: "A_{gross}", label: "Gross Louver / Grille Area", description: "Total physical opening dimension required based on louver free-area fraction", unit: "sq in." },
                { symbol: "D_{round}", label: "Equivalent Circular Duct Diameter", description: "Equivalent geometric round duct diameter derived from gross opening area", unit: "Inches" },
              ]}
              notes="NFPA 54 specifies that when two openings are utilized, the upper opening must commence within 12 inches of the top of the enclosure and the lower opening within 12 inches of the floor. Local jurisdictions (AHJ) and appliance manufacturer installation instructions govern final field compliance."
              sourceStandard="National Fuel Gas Code (NFPA 54 / ANSI Z223.1 Section 9.3) & IFGC Section 304"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              The 7-Step Combustion Air &amp; Mechanical Room Sizing Workflow
            </h3>
            <ol style={{ paddingLeft: "1.2rem", margin: "0.5rem 0 1rem" }}>
              <li style={{ marginBottom: "0.35rem" }}>
                <strong>Total Combined Appliance Input:</strong> Sum the maximum nameplate fuel input (BTU/hr) of all atmospheric and draft-hood appliances located within the enclosure (e.g., gas furnace + water heater + boiler).
              </li>
              <li style={{ marginBottom: "0.35rem" }}>
                <strong>Calculate Mechanical Room Volume:</strong> Multiply clear room dimensions: Volume = Length &times; Width &times; Ceiling Height (cu ft).
              </li>
              <li style={{ marginBottom: "0.35rem" }}>
                <strong>Confined vs. Unconfined Space Determination:</strong> Apply the Standard Method threshold: 50 cu ft per 1,000 BTU/hr total input. If room volume is less than this threshold, the space is classified as <em>Confined</em>.
              </li>
              <li style={{ marginBottom: "0.35rem" }}>
                <strong>Select Standard Combustion Air Method (NFPA 54 / IFGC):</strong> Choose among Indoor Air (2 openings to communicating spaces), Outdoor Air Vertical Ducts (2 openings), Outdoor Air Horizontal Ducts (2 openings), or Outdoor Air Single Opening.
              </li>
              <li style={{ marginBottom: "0.35rem" }}>
                <strong>Compute Required Net Free Area:</strong> Calculate the minimum net free unobstructed area (sq in.) for each opening per the code ratio.
              </li>
              <li style={{ marginBottom: "0.35rem" }}>
                <strong>Adjust for Louver &amp; Grille Free Area:</strong> Convert net free area to gross physical opening area using the manufacturer&apos;s published free-area rating or reference defaults (75% for metal louvers, 25% for wood louvers).
              </li>
              <li>
                <strong>Determine Equivalent Duct &amp; Louver Dimensions:</strong> Calculate the equivalent circular duct diameter or select rectangular louver dimensions meeting the required gross area.
              </li>
            </ol>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <div style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "0.75rem" }}>
            <strong>NFPA 54 / IFGC Sizing Reference Matrix:</strong> Comparison of code methods, opening rules, and louver adjustments.
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col">NFPA 54 / IFGC Method</th>
                <th scope="col">Code Rule &amp; Opening Count</th>
                <th scope="col">Opening Vertical Location</th>
                <th scope="col">Assumed Metal Louver (75%)</th>
                <th scope="col">Application Notes &amp; Clearances</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Indoor Air (Communicating Spaces)</strong></td>
                <td>1 sq in. per 1,000 BTU/hr (Min 100 sq in. each, 2 openings)</td>
                <td>Top 12&quot; &amp; Bottom 12&quot; of enclosure</td>
                <td>1.33 &times; Net Free Area</td>
                <td>Communicating space must provide required unconfined volume without tight air sealing.</td>
              </tr>
              <tr>
                <td><strong>Outdoor Air — Vertical Ducts</strong></td>
                <td>1 sq in. per 4,000 BTU/hr each (2 openings)</td>
                <td>Top 12&quot; &amp; Bottom 12&quot; of enclosure</td>
                <td>1.33 &times; Net Free Area</td>
                <td>Vertical ducts direct to outdoors or ventilated attic/crawl spaces. Slope &le; 45&deg;.</td>
              </tr>
              <tr>
                <td><strong>Outdoor Air — Horizontal Ducts</strong></td>
                <td>1 sq in. per 2,000 BTU/hr each (2 openings)</td>
                <td>Top 12&quot; &amp; Bottom 12&quot; of enclosure</td>
                <td>1.33 &times; Net Free Area</td>
                <td>Horizontal ducts penetrating exterior sidewalls directly to outdoor air.</td>
              </tr>
              <tr>
                <td><strong>Outdoor Air — Single Opening</strong></td>
                <td>1 sq in. per 3,000 BTU/hr (1 opening)</td>
                <td>Commencing within top 12&quot; of enclosure</td>
                <td>1.33 &times; Net Free Area</td>
                <td>Direct to outdoors; requires 1&quot; side/back and 6&quot; front clearance around equipment.</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing combustion air for a residential mechanical closet (8&apos; &times; 8&apos; &times; 8&apos; = 512 cu ft) housing an <strong>80,000 BTU/hr gas furnace</strong> and a <strong>40,000 BTU/hr gas water heater</strong> (total combined input: <strong>120,000 BTU/hr</strong>). Outdoor combustion air will be supplied through <strong>vertical ducts with stamped metal louvers (assumed 75% free area)</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Step-by-Step Mathematical Derivation:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Total Combined Gas Load:</strong> Q_total = 80,000 + 40,000 = <strong>120,000 BTU/hr</strong>.</li>
              <li><strong>Confined Space Threshold:</strong> V_unconfined = (120,000 / 1000) &times; 50 = <strong>6,000 cu ft</strong> (NFPA 54 Section 9.3.2.1).</li>
              <li><strong>Room Volume Classification:</strong> Closet volume is 512 cu ft &lt; 6,000 cu ft &rarr; <strong>CONFINED SPACE (Deficit of 5,488 cu ft)</strong>. Dedicated combustion air openings sized per code are required.</li>
              <li><strong>Required Net Free Area (Vertical Ducts):</strong> Net Free Area = 120,000 / 4,000 = <strong>30 sq in. Net Free Area per opening</strong> (one upper opening within 12&quot; of ceiling, one lower opening within 12&quot; of floor per NFPA 54 §9.3.3.1).</li>
              <li><strong>Adjust for Louver Free Area (75% Reference Metal):</strong> Gross Opening = 30 / 0.75 = <strong>40 sq in. Gross Louver Area per opening</strong>.</li>
              <li><strong>Equivalent Geometric Round Duct Diameter:</strong> D = &radic;(4 &times; 40 / &pi;) = &radic;50.93 = <strong>7.14&quot; (7.1&quot;) &rarr; Standard Trade Ø 8-inch Round Duct</strong> for both upper and lower intakes.</li>
              <li><strong>Comparison with Alternative Methods:</strong>
                <ul style={{ marginTop: "0.25rem", paddingLeft: "1.2rem" }}>
                  <li><strong>Method 1 (Indoor Air):</strong> 120,000 / 1,000 = <strong>120 sq in. Net</strong> &rarr; <strong>160 sq in. Gross</strong> per opening (Ø 14.3&quot; equiv / Ø 16&quot; trade).</li>
                  <li><strong>Method 3 (Horizontal Ducts):</strong> 120,000 / 2,000 = <strong>60 sq in. Net</strong> &rarr; <strong>80 sq in. Gross</strong> per opening (Ø 10.1&quot; equiv / Ø 12&quot; trade).</li>
                  <li><strong>Method 4 (Single Outdoor Opening):</strong> 120,000 / 3,000 = <strong>40 sq in. Net</strong> &rarr; <strong>53 sq in. Gross</strong> (Ø 8.2&quot; equiv / Ø 9&quot; trade).</li>
                </ul>
              </li>
            </ol>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderTop: "4px solid var(--accent-cooling)", borderRadius: "0.5rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Related Heating &amp; Ventilation Workflows</h4>
            <p style={{ fontSize: "0.875rem", marginBottom: "0.75rem" }}>
              Connect combustion air sizing with primary heating load and ventilation tools:
            </p>
            <ul style={{ paddingLeft: "1.2rem", margin: 0, fontSize: "0.875rem" }}>
              <li>
                <Link href="/calculators/furnace-size-calculator" style={{ color: "var(--accent-cooling)", fontWeight: 600 }}>
                  Furnace Sizing &amp; AFUE Efficiency Calculator
                </Link> — Determine input vs. output BTU capacity and verify heating airflow.
              </li>
              <li>
                <Link href="/calculators/boiler-size-calculator" style={{ color: "var(--accent-cooling)", fontWeight: 600 }}>
                  Hydronic Boiler &amp; Baseboard Sizing Calculator
                </Link> — Size residential hydronic boilers and DHW priority loads.
              </li>
              <li>
                <Link href="/calculators/kitchen-hood-cfm" style={{ color: "var(--accent-cooling)", fontWeight: 600 }}>
                  Kitchen Range Hood CFM &amp; Make-Up Air Sizer
                </Link> — Check mandatory IRC M1503.6 make-up air code requirements (&gt;400 CFM).
              </li>
              <li>
                <Link href="/calculators/garage-heater-sizing" style={{ color: "var(--accent-cooling)", fontWeight: 600 }}>
                  Garage &amp; Workshop Heater Sizing Tool
                </Link> — Size unit heaters with slab conduction and freeze-protection modes.
              </li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
