import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { FurnaceBtuTool } from "@/components/calculator/tools/FurnaceBtuTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("furnace-size-calculator")!;

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

export default function FurnaceSizeCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="To estimate preliminary furnace sizing, multiply heated living space by your regional climate factor (30 to 60 BTU/hr per sq ft) and adjust for ceiling volume and envelope insulation quality. For an illustrative 2,000 sq ft home in a cold climate with a 100,000 BTU/hr estimated load, candidate nominal furnace inputs typically range from 100,000 to 120,000 BTU/hr depending on AFUE tier and manufacturer-rated steady-state output. Final equipment selection requires a formal room-by-room ACCA Manual J load calculation."
      formulaSnippet="Q_load = Area_sqft * BTU_climate * F_height * F_ins | Q_input_approx = Q_load / (AFUE / 100) | CFM_theoretical = Q_load / (1.08 * Delta_T)"
      authorityCitation="ACCA Manual J (8th Edition Reference Principles), ACCA Manual S (3rd Edition), ANSI/AHRI Standard 260, & DOE 10 CFR Part 430"
      toolComponent={<FurnaceBtuTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="heating" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Preliminary Furnace Heating Load &amp; Airflow Screening Equations"
              formula="Q_{\text{load}} = \text{Area} \cdot \text{BTU}_{\text{climate}} \cdot F_{\text{height}} \cdot F_{\text{ins}} \quad | \quad Q_{\text{input, approx}} = \frac{Q_{\text{load}}}{\text{AFUE} / 100} \quad | \quad \text{CFM}_{\text{theoretical}} = \frac{Q_{\text{load}}}{1.08 \cdot \Delta T}"
              variables={[
                { symbol: "Q_{\\text{load}}", label: "Estimated Space Heating Load", description: "Preliminary screening heat loss of the structure under regional outdoor design conditions", unit: "BTU/hr" },
                { symbol: "Q_{\\text{input, approx}}", label: "Approximate Input Requirement", description: "Illustrative fuel input rate estimated using seasonal AFUE as a benchmark ratio", unit: "BTU/hr" },
                { symbol: "\\text{BTU}_{\\text{climate}}", label: "Regional Climate Screening Factor", description: "Preliminary load factor (30 BTU/sq ft in mild south to 60 in extreme north)", unit: "BTU/sq ft" },
                { symbol: "F_{\\text{height}}", label: "Ceiling Height Volume Modifier", description: "Bounded volume adjustment factor: 1 + 0.04 * (Height - 8)", unit: "Multiplier" },
                { symbol: "F_{\\text{ins}}", label: "Envelope Insulation Modifier", description: "Documented factor: Poor (1.25x), Average (1.00x), Good (0.85x), Spray Foam (0.70x)", unit: "Multiplier" },
                { symbol: "\\text{AFUE}", label: "Annual Fuel Utilization Efficiency", description: "Seasonal efficiency rating under DOE test procedures (not instantaneous steady-state output)", unit: "Percentage (%)" },
                { symbol: "\\text{CFM}_{\\text{theoretical}}", label: "Theoretical Heating Airflow", description: "Theoretical air volume delivery required across the heat exchanger at selected temperature rise", unit: "CFM" },
                { symbol: "\\Delta T", label: "Heat Exchanger Temperature Rise", description: "Temperature differential across supply and return plenums (selectable range: 35°F to 65°F)", unit: "°F" },
              ]}
              notes="This calculator provides a preliminary screening estimate. Furnaces must not be arbitrarily oversized based on square footage rules alone. Oversized furnaces cause short-cycling, high duct static pressures, noticeable duct expansion noises, and premature heat exchanger fatigue. Authoritative equipment sizing requires an ACCA Manual J load calculation and selection via ACCA Manual S using OEM expanded rating data."
              sourceStandard="ACCA Manual J (8th Ed), ACCA Manual S (3rd Ed), ANSI/AHRI Standard 260, and DOE 10 CFR Part 430"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Technical Differences: Standard 80% AFUE vs. Condensing (90%–98% AFUE) Furnaces
            </h3>
            <p>
              When evaluating gas furnace replacement options, the choice between standard efficiency (80% AFUE) and condensing equipment (90%–98% AFUE) involves key mechanical, venting, and economic considerations:
            </p>
            <ul style={{ paddingLeft: "1.25rem", margin: "0.75rem 0" }}>
              <li>
                <strong>80% AFUE (Non-Condensing / Category I):</strong> Operates with a single primary heat exchanger and relies on high flue-gas temperatures (300°F–450°F) to generate natural draft through a metal B-vent chimney. Suitable where masonry chimneys or existing metal flues are in good condition and upgrading to dedicated PVC sidewall venting is structurally constrained.
              </li>
              <li>
                <strong>90%–98% AFUE (Condensing / Category IV):</strong> Employs a secondary stainless steel condensing heat exchanger to extract latent heat of vaporization from combustion water vapor. Flue gases drop below 120°F and are vented through sealed PVC, CPVC, or polypropylene pipe. Required or economically favored in cold climates with high annual heating degree days, subject to proper condensate drainage and electrical freeze protection.
              </li>
            </ul>
            <p>
              Equipment selection must account for local utility rates, existing flue construction, equipment availability, applicable regional energy codes, and manufacturer installation specifications rather than generic geographic rules.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <div>
          <h2>Preliminary Furnace Sizing Reference Table</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Illustrative candidate nominal furnace input ranges based on typical screening load factors. Values represent approximate preliminary screening ranges; final sizing must be verified with an ACCA Manual J load calculation and manufacturer-rated steady-state output capacity.
          </p>
          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Heated Floor Area</th>
                  <th scope="col">Zone 2 (Sunbelt ~35 BTU)</th>
                  <th scope="col">Zone 3 (Central ~40 BTU)</th>
                  <th scope="col">Zone 4 (Midwest ~50 BTU)</th>
                  <th scope="col">Zone 5 (North ~60 BTU)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1,200 sq ft</strong></td>
                  <td>40k to 60k BTU/hr</td>
                  <td>40k to 60k BTU/hr</td>
                  <td>60k to 80k BTU/hr</td>
                  <td>60k to 80k BTU/hr</td>
                </tr>
                <tr>
                  <td><strong>1,600 sq ft</strong></td>
                  <td>40k to 60k BTU/hr</td>
                  <td>60k to 80k BTU/hr</td>
                  <td>80k to 100k BTU/hr</td>
                  <td>80k to 100k BTU/hr</td>
                </tr>
                <tr>
                  <td><strong>2,000 sq ft</strong></td>
                  <td>60k to 80k BTU/hr</td>
                  <td>80k to 100k BTU/hr</td>
                  <td>100k to 120k BTU/hr</td>
                  <td>100k to 120k BTU/hr</td>
                </tr>
                <tr>
                  <td><strong>2,500 sq ft</strong></td>
                  <td>80k to 100k BTU/hr</td>
                  <td>80k to 100k BTU/hr</td>
                  <td>120k to 140k BTU/hr</td>
                  <td>120k to 140k BTU/hr</td>
                </tr>
                <tr>
                  <td><strong>3,000 sq ft</strong></td>
                  <td>80k to 100k BTU/hr</td>
                  <td>100k to 120k BTU/hr</td>
                  <td>120k to 140k BTU/hr</td>
                  <td>Multi-Zone / Dual System</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Preliminary screening estimate for a replacement gas furnace in a 2,000 sq ft single-family home in Chicago, IL (Zone 4, outdoor design temperature 0°F) with standard 8-ft ceilings and average envelope insulation.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Screening Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>
                <strong>Estimated Space Heating Load:</strong> 2,000 sq ft × 50 BTU/hr per sq ft (Zone 4 baseline) × 1.00 (8-ft ceiling) × 1.00 (average insulation) = <strong>100,000 BTU/hr Estimated Heating Load</strong>.
              </li>
              <li>
                <strong>Approximate Fuel Input Requirement:</strong> Using a 96% AFUE condensing furnace benchmark: 100,000 / 0.96 ≈ <strong>104,167 BTU/hr Approximate Input Demand</strong>. (Note: AFUE is a seasonal laboratory rating; actual equipment selection matches manufacturer-rated steady-state heating output to the design load).
              </li>
              <li>
                <strong>Candidate Nominal Equipment Range:</strong> Candidate nominal furnace models typically include <strong>100,000 BTU/hr</strong> (rated output ~96,000 BTU/hr) or <strong>120,000 BTU/hr</strong> (rated output ~115,200 BTU/hr). Final selection is determined by verifying room-by-room loads and manufacturer submittal tables per ACCA Manual S.
              </li>
              <li>
                <strong>Theoretical Airflow CFM Evaluation:</strong> At a representative 45°F design temperature rise (ΔT across the heat exchanger), theoretical airflow is 100,000 / (1.08 × 45) = <strong>2,058 CFM</strong>. Actual delivered airflow depends on ductwork static pressure and blower motor capability (verify with the{" "}
                <Link href="/calculators/cfm-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Airflow CFM Calculator</Link>).
              </li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
