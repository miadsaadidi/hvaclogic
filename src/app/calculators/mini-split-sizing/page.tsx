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
      directAnswer="To size a multi-zone ductless mini-split system, first calculate each room's cooling load (20 to 30 BTU/sq ft for insulated living spaces; 35 to 45 BTU/sq ft for uninsulated garages or sunrooms) and match it to a standard indoor head (6k, 9k, 12k, 18k, or 24k BTU). Then size the outdoor multi-port inverter condenser to support 100% to 130% total connected indoor capacity to leverage inverter diversity."
      formulaSnippet="Room_BTU = Area * 25 * F_sun * F_ins | Condenser_BTU = ceil(Total_Indoor_BTU / 1.30) to standard size"
      authorityCitation="AHRI Standard 1230 (Multi-Split Air Conditioners) & ACCA Manual J (Residential Load Sizing)"
      toolComponent={<MiniSplitTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="cooling-loads" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Mini-Split Multi-Zone Thermal Load &amp; Diversity Equations"
              formula="Q_room = Area * 25 * F_sun * F_ins * F_ceiling | Q_indoor_total = sum(Q_head_matched) | Diversity_Ratio = (Q_indoor_total / Q_condenser_rated) * 100"
              variables={[
                { symbol: "Q_room", label: "Individual Room Heat Gain", description: "Sensible and latent thermal cooling load for a single isolated zone", unit: "BTU/hr" },
                { symbol: "F_sun", label: "Solar Exposure Multiplier", description: "0.95 for North; 1.00 for Average; 1.10 for South; 1.15 for intense West afternoon sun", unit: "Multiplier" },
                { symbol: "F_ins", label: "Building Envelope Insulation", description: "0.90 for tight double-pane construction; 1.15 to 1.30 for uninsulated garages/sunrooms", unit: "Multiplier" },
                { symbol: "Q_head_matched", label: "Standard Indoor Head Size", description: "Commercial head unit capacity: 6,000; 9,000; 12,000; 18,000; or 24,000 BTU/hr", unit: "BTU/hr" },
                { symbol: "Diversity_Ratio", label: "Inverter Connected Ratio", description: "Total connected indoor capacity divided by outdoor unit capacity (100% to 130% optimal)", unit: "% Ratio" },
              ]}
              notes="Multi-split inverter compressors modulate down to 20% capacity when only one room calls for cooling, eliminating the short-cycling and high energy bills common in single-stage central systems."
              sourceStandard="AHRI Standard 1230 and ACCA Manual S (Equipment Selection)"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Special Sizing Rules for Garages, Workshops &amp; Sunrooms
            </h3>
            <p>
              Garages and workshops exhibit dramatically higher thermal loads than standard bedrooms due to concrete slab thermal mass, uninsulated overhead sectional doors, and roof radiant heat:
            </p>
            <ul>
              <li><strong>1-Car Garage (200–300 sq ft):</strong> Requires <strong>9,000 to 12,000 BTU</strong> (35–45 BTU/sq ft).</li>
              <li><strong>2-Car Garage (400–550 sq ft):</strong> Requires <strong>18,000 to 24,000 BTU</strong> (1.5 to 2.0 Tons).</li>
              <li><strong>3-Car Garage / Workshop (600–900 sq ft):</strong> Requires <strong>24,000 to 36,000 BTU</strong> (2.0 to 3.0 Tons).</li>
            </ul>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
              Understanding Inverter Diversity &amp; Over-Subscription (AHRI 1230)
            </h3>
            <p>
              Unlike traditional single-stage AC systems that require rigid 1:1 capacity matching, multi-zone mini-split inverters allow <strong>100% to 130% connected indoor capacity</strong>:
            </p>
            <ul>
              <li><strong>Peak Load Diversity:</strong> East-facing bedrooms peak in the morning, while west-facing living rooms peak in the late afternoon. Because all zones rarely call for maximum cooling simultaneously, an outdoor condenser can serve more total indoor head capacity.</li>
              <li><strong>Dynamic Electronic Expansion Valves (EEVs):</strong> The outdoor unit continuously modulates individual EEVs for each line set, sending high refrigerant flow to hot rooms and low flow to satisfied rooms.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Room Type &amp; Dimensions</th>
                <th scope="col">Floor Area (Sq Ft)</th>
                <th scope="col">Calculated Heat Load</th>
                <th scope="col">Matched Head Size</th>
                <th scope="col">Recommended Style</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Nursery / Small Bedroom</strong></td>
                <td>100–150 sq ft</td>
                <td>2,500–3,750 BTU</td>
                <td>6,000 BTU (0.5T)</td>
                <td>Wall Mount</td>
              </tr>
              <tr>
                <td><strong>Standard Bedroom / Home Office</strong></td>
                <td>150–250 sq ft</td>
                <td>3,750–6,250 BTU</td>
                <td>9,000 BTU (0.75T)</td>
                <td>Wall Mount</td>
              </tr>
              <tr>
                <td><strong>Master Bedroom / Suite</strong></td>
                <td>250–400 sq ft</td>
                <td>6,250–10,000 BTU</td>
                <td>12,000 BTU (1.0T)</td>
                <td>Wall Mount / Cassette</td>
              </tr>
              <tr>
                <td><strong>Living Room &amp; Open Kitchen</strong></td>
                <td>400–650 sq ft</td>
                <td>10,000–16,250 BTU</td>
                <td>18,000 BTU (1.5T)</td>
                <td>4-Way Ceiling Cassette</td>
              </tr>
              <tr>
                <td><strong>2-Car Garage Workshop</strong></td>
                <td>400–550 sq ft</td>
                <td>16,000–22,000 BTU</td>
                <td>18,000–24,000 BTU (1.5–2T)</td>
                <td>Wall Mount / Console</td>
              </tr>
              <tr>
                <td><strong>Great Room / 3-Car Garage Studio</strong></td>
                <td>650–1,000 sq ft</td>
                <td>20,000–32,000 BTU</td>
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
            <strong>Scenario:</strong> Sizing a 3-zone ductless mini-split system for a single-story ranch home consisting of a 240 sq ft Master Bedroom (South), 160 sq ft Guest Bedroom (North), and 420 sq ft Living Room (West).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Master Bedroom (240 sq ft, South):</strong> 240 × 25 × 1.10 (South) × 0.90 (Good Insul) = <strong>5,940 BTU</strong> $\rightarrow$ Matched with a <strong>6,000 or 9,000 BTU Wall Head</strong>.</li>
              <li><strong>Guest Bedroom (160 sq ft, North):</strong> 160 × 25 × 0.95 (North) = <strong>3,800 BTU</strong> $\rightarrow$ Matched with a <strong>6,000 BTU Wall Head</strong>.</li>
              <li><strong>Living Room (420 sq ft, West):</strong> 420 × 25 × 1.15 (West afternoon sun) = <strong>12,075 BTU</strong> $\rightarrow$ Matched with a <strong>12,000 or 18,000 BTU Ceiling Cassette</strong>.</li>
              <li><strong>Total Connected Indoor Capacity:</strong> 9k + 6k + 12k = <strong>27,000 BTU</strong>.</li>
              <li><strong>Outdoor Condenser Sizing:</strong> Applying 113% diversity (27,000 / 1.30 = 20,769 BTU) $\rightarrow$ Select a <strong>24,000 BTU (2.0 Ton) 3-Port Inverter Condenser</strong> (113% connected ratio — optimal AHRI match).</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
