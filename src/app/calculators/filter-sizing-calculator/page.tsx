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
      directAnswer="Air filter sizing determines face velocity (Face Velocity = Airflow CFM / Total Filter Face Area) and airflow resistance across MERV 4 to MERV 16 media. While ASHRAE Standard 52.2 defines laboratory test methods for particulate efficiency and airflow resistance, practical duct design per ACCA Manual D treats filter pressure drop as an allocated component loss. For 1-inch residential pleated filters, keeping face velocity near 300 FPM is a common design guideline to moderate static pressure drop, whereas deeper 4-inch to 5-inch media provides greater effective surface area and typically lowers resistance at equivalent airflow based on manufacturer data."
      formulaSnippet="Face Area = (W * H * Qty) / 144 sq ft | Face Velocity (FPM) = CFM / Face Area | DeltaP_clean = k_merv * (FPM / 300)^1.35 * DepthFactor (HVACLogic Model)"
      authorityCitation="ANSI/ASHRAE Standard 52.2 & ACCA Manual D"
      toolComponent={<FilterSizingTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Filter Face Velocity &amp; Pressure-Drop Methodology"
              formula="Area_face = (W_in * H_in * Qty) / 144 | V_fpm = CFM / Area_face | DeltaP_clean = k_merv * (V_fpm / 300)^1.35 * Depth_Factor"
              variables={[
                { symbol: "Area_face", label: "Total Filter Face Area", description: "Nominal frontal cross-sectional surface area across all parallel filter openings (assumes balanced distribution)", unit: "sq ft" },
                { symbol: "V_fpm", label: "Face Velocity", description: "Calculated average approach velocity of air entering the filter face", unit: "FPM" },
                { symbol: "DeltaP_clean", label: "Estimated Clean Pressure Drop", description: "HVACLogic empirical reference estimation of initial clean filter airflow resistance", unit: "in. wg" },
                { symbol: "k_merv", label: "MERV Model Factor", description: "HVACLogic model reference coefficient: 0.05 (MERV 4), 0.12 (MERV 8), 0.18 (MERV 11), 0.25 (MERV 13), 0.38 (MERV 16)", unit: "Dimensionless" },
                { symbol: "Depth_Factor", label: "Media Depth Factor", description: "HVACLogic model factor: 1.00 (1\"), 0.65 (2\"), 0.38 (4\"), 0.30 (5\")", unit: "Dimensionless" },
              ]}
              notes="Face area and face velocity are fundamental geometric relationships. Filter static pressure drops vary by manufacturer media construction and pleat design; values calculated here are HVACLogic empirical reference estimates and should be verified against manufacturer submittal data."
              sourceStandard="Technical References: ANSI/ASHRAE Standard 52.2 & ACCA Manual D"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Filter Media Selection, Face Velocity, and System Static Pressure
            </h3>
            <p>
              Air filtration in forced-air HVAC systems balances indoor air quality objectives with blower static pressure capability. Under <strong>ANSI/ASHRAE Standard 52.2</strong>, air filters are evaluated in a standard test duct to establish Minimum Efficiency Reporting Values (MERV) across three particle size ranges ($E_1$: 0.3–1.0 µm, $E_2$: 1.0–3.0 µm, and $E_3$: 3.0–10.0 µm) along with initial airflow resistance across prescribed test velocities.
            </p>
            <p>
              In system design per <strong>ACCA Manual D</strong>, filter static pressure loss is a component deduction from Total External Static Pressure (TESP) to determine Available Static Pressure (ASP) for ductwork sizing:
            </p>
            <p style={{ fontFamily: "monospace", background: "rgba(0,0,0,0.25)", padding: "0.5rem 0.75rem", borderRadius: "4px", color: "var(--accent-cooling)" }}>
              ASP = TESP - (DeltaP_coil + DeltaP_filter + DeltaP_grilles + DeltaP_accessories)
            </p>
            <p>
              Standard 1-inch pleated filters have limited media surface area. When high-MERV 1-inch filters operate at high face velocities (&gt;350–400 FPM), their airflow resistance can consume a substantial portion of the available static pressure budget. Upgrading to a 4-inch or 5-inch deep pleated media cabinet expands the actual media surface area folded inside the frame, which generally reduces the through-media velocity and yields lower pressure drop for the same airflow rating based on manufacturer performance data.
            </p>
          </div>

          <div style={{ marginTop: "1.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>
              Ventilation Standards &amp; Clean Air Delivery Context
            </h4>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
              ASHRAE Standard 241 establishes requirements for control of infectious aerosols and defines equivalent clean airflow delivery rates. While higher MERV filters (such as MERV 13 and above) improve fractional particle capture of fine aerosols, satisfying total clean airflow requirements depends on overall system ventilation rates, filtration efficiency, and run-time schedules rather than filter selection alone.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.85rem" }}>
              <Link href="/research/ashrae-241-equivalent-clean-airflow" style={{ color: "var(--accent-cooling)", textDecoration: "underline", fontWeight: 600 }}>
                &rarr; Read Clean Airflow Research Analysis
              </Link>
              <Link href="/datasets/ashrae-241-clean-airflow-benchmarks" style={{ color: "var(--accent-cooling)", textDecoration: "underline", fontWeight: 600 }}>
                &rarr; Explore Clean Airflow Benchmark Data
              </Link>
            </div>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">MERV Rating</th>
                <th scope="col">ASHRAE 52.2 Target Efficiency</th>
                <th scope="col">1&quot; Media Reference Drop (~300 FPM)</th>
                <th scope="col">4&quot; Media Reference Drop (~300 FPM)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>MERV 4 (Fiberglass Mesh)</strong></td>
                <td>Equipment protection (E3: &lt;20%)</td>
                <td>~0.05&quot; w.g.</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td><strong>MERV 8 (Standard Pleated)</strong></td>
                <td>Dust &amp; pollen capture (E3: &ge;70%)</td>
                <td>~0.12&quot; w.g.</td>
                <td>~0.05&quot; w.g.</td>
              </tr>
              <tr>
                <td><strong>MERV 11 (Enhanced Pleated)</strong></td>
                <td>Allergens &amp; pet dander (E2: &ge;65%, E3: &ge;85%)</td>
                <td>~0.18&quot; w.g.</td>
                <td>~0.07&quot; w.g.</td>
              </tr>
              <tr>
                <td><strong>MERV 13 (Fine Particulate)</strong></td>
                <td>Fine dust, smoke &amp; droplet nuclei (E1: &ge;50%, E2: &ge;85%, E3: &ge;90%)</td>
                <td>~0.25&quot; w.g.</td>
                <td>~0.10&quot; w.g.</td>
              </tr>
              <tr>
                <td><strong>MERV 16 (High Efficiency)</strong></td>
                <td>Submicron particulate &amp; smoke (E1, E2, E3: &ge;95%)</td>
                <td>~0.38&quot; w.g.</td>
                <td>~0.14&quot; w.g.</td>
              </tr>
            </tbody>
          </table>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem", fontStyle: "italic" }}>
            * Note: Values shown are representative HVACLogic reference model estimates for clean filters at nominal 300 FPM face velocity. Actual pressure drop varies significantly by manufacturer media formulation, pleat count, and assembly design.
          </div>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Evaluating return filter options for a 3.5-ton system delivering <strong>1,400 CFM</strong>. We compare a standard <strong>1-inch 20&quot;&times;25&quot; MERV 13 filter</strong> versus a <strong>4-inch 20&quot;&times;25&quot; MERV 13 media filter</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Calculation Steps:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Calculate Total Filter Face Area:</strong> (20&quot; &times; 25&quot;) / 144 = <strong>3.47 sq ft</strong>.</li>
              <li><strong>Calculate Face Velocity:</strong> V = 1,400 CFM / 3.47 sq ft = <strong>403 FPM</strong>.</li>
              <li><strong>Estimate 1-Inch MERV 13 Clean Pressure Drop (HVACLogic Model):</strong>
                <pre style={{ background: "rgba(0,0,0,0.3)", padding: "0.5rem", borderRadius: "4px", margin: "0.5rem 0", color: "#f97316" }}>
                  DeltaP_1inch = 0.25 * (403 / 300)^1.35 * 1.00 = 0.372&quot; w.g. (Elevated Component Drop)
                </pre>
              </li>
              <li><strong>Estimate 4-Inch Deep MERV 13 Clean Pressure Drop (HVACLogic Model, Depth Factor 0.38):</strong>
                <pre style={{ background: "rgba(0,0,0,0.3)", padding: "0.5rem", borderRadius: "4px", margin: "0.5rem 0", color: "#00d2ff" }}>
                  DeltaP_4inch = 0.25 * (403 / 300)^1.35 * 0.38 = 0.141&quot; w.g. (Moderate Drop)
                </pre>
              </li>
              <li><strong>Engineering Conclusion:</strong> At 403 FPM, the estimated clean pressure drop for the 1-inch MERV 13 filter model is ~0.372&quot; w.g., which would consume over 70% of a typical 0.50&quot; w.g. blower static pressure budget before accounting for cooling coils or duct distribution. Using a 4-inch deep media cabinet or adding a second parallel return grille reduces estimated filter resistance to ~0.141&quot; w.g., reserving necessary static pressure for the distribution ductwork. Final selections should always be verified against specific manufacturer submittal curves.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
