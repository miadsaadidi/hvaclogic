import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { FilterSizingTool } from "@/components/calculator/tools/FilterSizingTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("filter-sizing-calculator")!;

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

export default function FilterSizingPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Air filter sizing and static pressure drop calculations determine filter face velocity (FPM = CFM / Area) and pressure resistance across MERV 8 to MERV 16 media conforming to ASHRAE 52.2. Standard 1-inch residential filters must maintain face velocity under 300 FPM to prevent excessive static pressure drop (>0.18 in. wg) and blower motor damage. Upgrading from 1-inch to 4-inch deep pleated media reduces static pressure drop by up to 62%."
      formulaSnippet="Area = (W * H * Qty) / 144 sq ft | FPM = CFM / Area | DeltaP = k_merv * (FPM / 300)^1.35 * DepthFactor"
      authorityCitation="ASHRAE 52.2 (Air-Cleaning Devices Test Procedure) & ACCA Manual D Appendix 3"
      toolComponent={<FilterSizingTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="ASHRAE 52.2 / ACCA Manual D Filter Sizing &amp; Pressure Drop Equations"
              formula="Area_face = (W_in * H_in * Qty) / 144 | V_fpm = CFM / Area_face | DeltaP_clean = k_merv * (V_fpm / 300)^1.35 * Depth_Factor | DeltaP_loaded approx 1.9 * DeltaP_clean"
              variables={[
                { symbol: "Area_face", label: "Total Filter Face Area", description: "Gross frontal cross-sectional surface area of all active filter grilles", unit: "sq ft" },
                { symbol: "V_fpm", label: "Face Velocity", description: "Average speed of air approaching the filter face (Max 300 FPM for 1\" media)", unit: "FPM" },
                { symbol: "DeltaP_clean", label: "Initial Static Pressure Drop", description: "Static pressure resistance across a brand new clean filter", unit: "in. wg" },
                { symbol: "k_merv", label: "MERV Base Resistance Factor", description: "0.12 for MERV 8, 0.18 for MERV 11, 0.25 for MERV 13, 0.38 for MERV 16", unit: "in. wg" },
                { symbol: "Depth_Factor", label: "Media Depth Derating", description: "1.00 for 1\" pleat, 0.65 for 2\" pleat, 0.38 for 4\" pleat, 0.30 for 5\" pleat", unit: "Dimensionless" },
              ]}
              notes="Installing high-efficiency 1-inch MERV 13 filters in undersized filter grilles creates severe static pressure drops exceeding 0.30 in. wg, causing blower motor failure and coil freezing."
              sourceStandard="ASHRAE Standard 52.2 & ACCA Manual D (Residential Duct Systems)"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              The 1-Inch MERV 13 Dilemma: High Filtration vs Blower Failure
            </h3>
            <p>
              Following wildfire smoke events and pandemic indoor air quality awareness (ASHRAE Standard 241), many homeowners install 1-inch MERV 13 filters into existing 1-inch furnace slots.
            </p>
            <p>
              However, tight MERV 13 fiberglass weaves create massive air resistance. In a 3-ton system (1,200 CFM) with a single 16&quot;&times;20&quot; return grille, face velocity spikes to <strong>540 FPM</strong>, generating a clean pressure drop of <strong>0.32&quot; w.g.</strong> on a blower rated for only 0.50&quot; total external static pressure!
            </p>
            <p>
              The proven engineering solution is upgrading to a <strong>4-inch or 5-inch deep pleated media cabinet</strong> (such as Honeywell or AprilAire). A 4-inch filter contains up to 4&times; more total fabric surface area, lowering pressure drop back down to an optimal <strong>0.11&quot; w.g.</strong> while capturing 90%+ of airborne contaminants.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">MERV Rating</th>
                <th scope="col">Filtration Efficiency Target</th>
                <th scope="col">1&quot; Media Drop (at 300 FPM)</th>
                <th scope="col">4&quot; Media Drop (at 300 FPM)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>MERV 4 (Fiberglass Mesh)</strong></td>
                <td>Equipment protection only (&lt;20% dust)</td>
                <td>0.05&quot; w.g.</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td><strong>MERV 8 (Standard Pleated)</strong></td>
                <td>Dust, pollen, dust mites (70–85%)</td>
                <td>0.12&quot; w.g.</td>
                <td>0.05&quot; w.g.</td>
              </tr>
              <tr>
                <td><strong>MERV 11 (High Allergy)</strong></td>
                <td>Pet dander, mold spores, smoke (85%+)</td>
                <td>0.18&quot; w.g.</td>
                <td>0.07&quot; w.g.</td>
              </tr>
              <tr>
                <td><strong>MERV 13 (ASHRAE 241 / Wildfire)</strong></td>
                <td>Bacteria, droplet nuclei, smoke (90%+)</td>
                <td>0.25&quot; w.g.</td>
                <td>0.10&quot; w.g.</td>
              </tr>
              <tr>
                <td><strong>MERV 16 (Hospital / HEPA Tier)</strong></td>
                <td>Virus carriers, combustion smoke (95%+)</td>
                <td>0.38&quot; w.g.</td>
                <td>0.14&quot; w.g.</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing air filtration for a 3.5-ton heat pump system delivering <strong>1,400 CFM</strong>. We will compare a standard <strong>1-inch 20&quot;&times;25&quot; MERV 13 filter</strong> versus a <strong>4-inch 20&quot;&times;25&quot; MERV 13 media filter</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Calculate Total Filter Face Area:</strong> (20&quot; &times; 25&quot;) / 144 = <strong>3.47 sq ft</strong>.</li>
              <li><strong>Calculate Face Velocity:</strong> V = 1,400 CFM / 3.47 sq ft = <strong>403 FPM</strong> (Exceeds 300 FPM guideline for 1&quot; filters, but well within 450 FPM for 4&quot; filters).</li>
              <li><strong>Calculate 1-Inch MERV 13 Clean Pressure Drop:</strong>
                <pre style={{ background: "rgba(0,0,0,0.3)", padding: "0.5rem", borderRadius: "4px", margin: "0.5rem 0", color: "#ff6b4a" }}>
                  DeltaP_1inch = 0.25 * (403 / 300)^1.35 * 1.00 = 0.372&quot; w.g. (HIGH RISK CHOKE)
                </pre>
              </li>
              <li><strong>Calculate 4-Inch Deep MERV 13 Clean Pressure Drop (Depth Factor 0.38):</strong>
                <pre style={{ background: "rgba(0,0,0,0.3)", padding: "0.5rem", borderRadius: "4px", margin: "0.5rem 0", color: "#00d2ff" }}>
                  DeltaP_4inch = 0.25 * (403 / 300)^1.35 * 0.38 = 0.141&quot; w.g. (OPTIMAL LOW RESISTANCE)
                </pre>
              </li>
              <li><strong>Engineering Verdict:</strong> Upgrading to a 4-inch deep media filter reduces static pressure resistance by <strong>62% (0.141&quot; vs 0.372&quot;)</strong>, safeguarding the ECM blower motor while delivering maximum ASHRAE 241 hospital-grade air purification.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
