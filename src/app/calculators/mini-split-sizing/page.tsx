import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { MiniSplitTool } from "@/components/calculator/tools/MiniSplitTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("mini-split-sizing")!;

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

export default function MiniSplitSizingPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="To estimate multi-zone ductless mini-split sizing, first calculate each room's preliminary cooling-load screening estimate (typically 20 to 30 BTU/sq ft for standard living spaces; 35 to 45 BTU/sq ft for rough garage/sunroom screening) and match each zone to a candidate nominal indoor head (6k, 9k, 12k, 18k, or 24k BTU). Then evaluate an illustrative outdoor multi-port condenser sized to accommodate candidate connected indoor capacity, verifying final equipment selection against manufacturer-approved combination tables."
      formulaSnippet="Q_room = Area * 25 * F_sun * F_ins * F_ceiling | Q_indoor_total = sum(Q_head_candidate) | Connected_Ratio = (Q_indoor_total / Q_condenser_rated) * 100"
      authorityCitation="Technical References: ANSI/AHRI Standard 1230 & ACCA Manual S (Equipment Selection References)"
      toolComponent={<MiniSplitTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="cooling-loads" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Mini-Split Multi-Zone Screening Load &amp; Connected Ratio Formulation"
              formula="Q_{\text{room}} = \text{Area} \times 25 \times F_{\text{sun}} \times F_{\text{ins}} \times F_{\text{ceiling}} \quad | \quad Q_{\text{indoor,total}} = \sum Q_{\text{head,candidate}} \quad | \quad \text{Connected Ratio} = \left(\frac{Q_{\text{indoor,total}}}{Q_{\text{condenser,rated}}}\right) \times 100"
              variables={[
                { symbol: "Q_{\\text{room}}", label: "Preliminary Room Screening Load", description: "Estimated cooling load screening value for an individual zone", unit: "BTU/hr" },
                { symbol: "25", label: "Baseline Cooling Heuristic", description: "HVACLogic preliminary screening benchmark for typical residential construction", unit: "BTU/(hr·sq ft)" },
                { symbol: "F_{\\text{sun}}", label: "Solar Exposure Multiplier", description: "0.95 for North; 1.00 for Average; 1.10 for South; 1.15 for West afternoon exposure", unit: "Multiplier" },
                { symbol: "F_{\\text{ins}}", label: "Envelope Insulation Multiplier", description: "0.90 for tight/well-insulated; 1.00 for standard/average; 1.15 for poorly insulated", unit: "Multiplier" },
                { symbol: "F_{\\text{ceiling}}", label: "Ceiling Height Multiplier", description: "1.00 for standard 8 ft; 1.10 for 9–10 ft; 1.20 for vaulted/volume spaces (>10 ft)", unit: "Multiplier" },
                { symbol: "Q_{\\text{head,candidate}}", label: "Candidate Indoor Head Capacity", description: "Nominal candidate head unit size (e.g., 6,000, 9,000, 12,000, 18,000, or 24,000 BTU/hr)", unit: "BTU/hr" },
                { symbol: "\\text{Connected Ratio}", label: "Connected Capacity Ratio", description: "Total connected indoor capacity divided by outdoor rated capacity (typically 100%–130% constraint range)", unit: "% Ratio" },
              ]}
              notes="Inverter multi-split systems allow modulated refrigerant delivery across active indoor heads. Turndown depth, part-load dehumidification characteristics, and electronic expansion valve (EEV) controls vary by manufacturer and equipment series."
              sourceStandard="ANSI/AHRI Standard 1230 & ACCA Manual S Equipment Sizing References"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Preliminary Screening Guidelines for Garages, Workshops &amp; High-Gain Zones
            </h3>
            <p>
              Garages and workshops often exhibit substantially higher thermal loads than interior bedrooms due to slab thermal mass, uninsulated overhead doors, air infiltration, and solar radiation on roof/wall assemblies. The following values are preliminary screening benchmarks:
            </p>
            <ul>
              <li><strong>1-Car Garage (200–300 sq ft):</strong> Preliminary screening range of <strong>9,000 to 12,000 BTU/hr</strong> (approx. 35–45 BTU/sq ft heuristic benchmark).</li>
              <li><strong>2-Car Garage (400–550 sq ft):</strong> Preliminary screening range of <strong>18,000 to 24,000 BTU/hr</strong> (1.5 to 2.0 Tons nominal capacity).</li>
              <li><strong>3-Car Garage / Workshop (600–900 sq ft):</strong> Preliminary screening range of <strong>24,000 to 36,000 BTU/hr</strong> (2.0 to 3.0 Tons nominal capacity).</li>
            </ul>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
              <em>Note: Actual garage and workshop cooling requirements vary substantially with envelope insulation, door construction, ceiling height, internal tool/equipment gains, and regional design conditions. A formal ACCA Manual J calculation is recommended for conditioned workspace conversions.</em>
            </p>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
              Understanding Inverter Connected Capacity &amp; System Compatibility
            </h3>
            <p>
              In multi-zone ductless systems, multi-port inverter condensers frequently support connected indoor head capacities that exceed nominal outdoor capacity (commonly 100% to 130% connected capacity ratio):
            </p>
            <ul>
              <li><strong>Zonal Peak Diversity:</strong> Bedrooms and living spaces rarely peak at the exact same hour of the day. Solar orientation and diurnal occupancy create diverse cooling demand profiles across zones.</li>
              <li><strong>Manufacturer Combination Tables:</strong> While connected ratios of 100%–130% serve as a preliminary design guideline, actual outdoor-unit selection requires verifying the specific combination against the manufacturer&apos;s published submittal combination chart. Total connected capacity, maximum line length, and minimum simultaneous capacity must comply with OEM engineering specifications.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <div style={{ marginBottom: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.35rem" }}>
              Multi-Zone Room Preliminary Screening &amp; Candidate Head Reference Matrix
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", margin: 0 }}>
              Illustrative screening ranges for standard residential spaces. Actual cooling loads depend on local outdoor design temperatures, building envelope construction, window solar heat gain coefficients (SHGC), infiltration rates, and internal loads.
            </p>
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col">Room Type &amp; Example Space</th>
                <th scope="col">Floor Area (Sq Ft)</th>
                <th scope="col">Screening Load Estimate</th>
                <th scope="col">Candidate Head Size</th>
                <th scope="col">Common Unit Style</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Nursery / Small Office</strong></td>
                <td>100–150 sq ft</td>
                <td>2,500–3,750 BTU/hr</td>
                <td>6,000 BTU (0.5T)</td>
                <td>Wall Mount</td>
              </tr>
              <tr>
                <td><strong>Standard Bedroom / Office</strong></td>
                <td>150–250 sq ft</td>
                <td>3,750–6,250 BTU/hr</td>
                <td>9,000 BTU (0.75T)</td>
                <td>Wall Mount</td>
              </tr>
              <tr>
                <td><strong>Primary Bedroom / Suite</strong></td>
                <td>250–400 sq ft</td>
                <td>6,250–10,000 BTU/hr</td>
                <td>12,000 BTU (1.0T)</td>
                <td>Wall Mount / Cassette</td>
              </tr>
              <tr>
                <td><strong>Living Room &amp; Open Area</strong></td>
                <td>400–650 sq ft</td>
                <td>10,000–16,250 BTU/hr</td>
                <td>18,000 BTU (1.5T)</td>
                <td>4-Way Ceiling Cassette</td>
              </tr>
              <tr>
                <td><strong>2-Car Garage Workshop (Screening)</strong></td>
                <td>400–550 sq ft</td>
                <td>16,000–22,000 BTU/hr</td>
                <td>18,000–24,000 BTU (1.5–2T)</td>
                <td>Wall Mount / Floor Console</td>
              </tr>
              <tr>
                <td><strong>Great Room / Studio (Screening)</strong></td>
                <td>650–1,000 sq ft</td>
                <td>20,000–32,000 BTU/hr</td>
                <td>24,000–36,000 BTU (2.0–3T)</td>
                <td>Ceiling Cassette / Multi-Head</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Preliminary sizing for a 3-zone ductless mini-split system in a single-story home consisting of a 250 sq ft Master Suite (South), a 180 sq ft Guest Bedroom (North), and a 400 sq ft Living Room (West).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Step-by-Step Screening Calculation:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>
                <strong>Master Suite (250 sq ft, South, Good Insulation, 8 ft Ceiling):</strong><br />
                <code>250 × 25 × 1.10 × 0.90 × 1.00 = 6,188 BTU/hr</code> &rarr; Candidate Head: <strong>9,000 BTU/hr (0.75 Ton)</strong>
              </li>
              <li style={{ marginTop: "0.5rem" }}>
                <strong>Guest Bedroom (180 sq ft, North, Average Insulation, 8 ft Ceiling):</strong><br />
                <code>180 × 25 × 0.95 × 1.00 × 1.00 = 4,275 BTU/hr</code> &rarr; Candidate Head: <strong>6,000 BTU/hr (0.50 Ton)</strong>
              </li>
              <li style={{ marginTop: "0.5rem" }}>
                <strong>Living Room (400 sq ft, West, Average Insulation, 8 ft Ceiling):</strong><br />
                <code>400 × 25 × 1.15 × 1.00 × 1.00 = 11,500 BTU/hr</code> &rarr; Candidate Head: <strong>12,000 BTU/hr (1.00 Ton)</strong>
              </li>
              <li style={{ marginTop: "0.5rem" }}>
                <strong>Total Candidate Connected Indoor Capacity:</strong><br />
                <code>9,000 + 6,000 + 12,000 = 27,000 BTU/hr</code>
              </li>
              <li style={{ marginTop: "0.5rem" }}>
                <strong>Illustrative Outdoor Condenser Sizing:</strong><br />
                Evaluating standard multi-port inverter condensers (18k, 24k, 30k, 36k BTU): a <strong>24,000 BTU/hr (2.0 Ton) 3-Port Inverter Condenser</strong> yields:<br />
                <code>Connected Ratio = (27,000 BTU/hr ÷ 24,000 BTU/hr) × 100 = 112.5% &approx; 113%</code><br />
                This falls within typical preliminary multi-port compatibility ranges (100%–130%). Final equipment selection must be verified against manufacturer combination matrices.
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
