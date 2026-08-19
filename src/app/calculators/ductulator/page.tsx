import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { DuctulatorTool } from "@/components/calculator/tools/DuctulatorTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("ductulator")!;

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

export default function DuctulatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="To size an air duct, select the airflow volume (CFM) and target friction rate (typically 0.08 to 0.10 in. wg per 100 ft for residential supply trunks). Use the equal friction equation to calculate equivalent round diameter, or solve Huebscher's formula to find equivalent rectangular dimensions."
      formulaSnippet="D_e = (0.06855 * Q^1.9 / hf)^(1 / 5.02)  |  D_e = 1.30 * (a * b)^0.625 / (a + b)^0.25"
      authorityCitation="ASHRAE Handbook—Fundamentals (Ch. 21) & SMACNA HVAC Duct Design Standard"
      toolComponent={<DuctulatorTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="airflow" />

          <h2>How to Size HVAC Ductwork (Equal Friction Method)</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            The <strong>Equal Friction Method</strong> is the primary engineering standard recommended by ACCA Manual D and ASHRAE for residential and light-commercial duct design. It maintains a constant static pressure drop per unit length across the entire supply and return distribution system.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Determine Design Airflow (CFM)</strong>: Calculate required airflow based on room sensible heat load (CFM = BTU / (1.08 × ΔT)) or standard nominal cooling rules (400 CFM/ton).</li>
            <li><strong>Select Target Friction Rate</strong>: Standard residential supply trunks use 0.08 to 0.10 in. wg per 100 ft. Return trunks use 0.05 to 0.08 in. wg to lower air velocity and reduce sound transmission.</li>
            <li><strong>Calculate Equivalent Round Diameter (De)</strong>: Use the Colebrook-Darcy aerodynamic equation to determine the minimum round diameter.</li>
            <li><strong>Convert to Rectangular Fabrication Dimensions</strong>: Apply Huebscher&apos;s formula to determine rectangular trunk width and height while maintaining an aspect ratio below 4:1 to prevent turbulence and corner friction losses.</li>
          </ol>

          <FormulaCard
            title="Duct Sizing Governing Equations & Physical Derivations"
            formula="Round: D_e = [ (0.06855 * Q^1.9) / hf ]^(1 / 5.02)  |  Rectangular: D_e = 1.30 * (a * b)^0.625 / (a + b)^0.25"
            variables={[
              { symbol: "D_e", label: "Equivalent Round Diameter", description: "Internal circular duct diameter carrying equivalent airflow at equal friction drop", unit: "inches" },
              { symbol: "Q", label: "Airflow Volume", description: "Volumetric airflow rate under standard air density conditions (0.075 lb/ft³)", unit: "CFM" },
              { symbol: "hf", label: "Friction Loss Rate", description: "Static pressure head loss per 100 linear feet of straight duct", unit: "in. wg / 100 ft" },
              { symbol: "a", label: "Rectangular Duct Width", description: "Longer or cross-sectional horizontal width dimension", unit: "inches" },
              { symbol: "b", label: "Rectangular Duct Height", description: "Shorter or vertical height dimension (limited by joist depth)", unit: "inches" },
              { symbol: "V", label: "Air Velocity", description: "Mean air stream velocity: V = Q * 144 / (pi * (D/2)^2)", unit: "FPM" },
            ]}
            notes="Equations assume standard dry air density (rho = 0.075 lb/ft3) at 70°F and 29.921 in. Hg barometric pressure with clean galvanized steel roughness (epsilon = 0.0003 ft)."
            sourceStandard="ASHRAE 2021 Fundamentals Ch. 21 / SMACNA HVAC Duct Construction Standards"
          />
        </>
      }
      comparisonTableSection={
        <>
          <h2>Standard HVAC Duct Sizing Reference Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Standard round and rectangular duct sizes sized at standard residential supply friction (0.08 in. wg per 100 ft):
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Airflow (CFM)</th>
                  <th scope="col">Nominal Tonnage</th>
                  <th scope="col">Round Diameter (in)</th>
                  <th scope="col">Rectangular (8&quot; Height)</th>
                  <th scope="col">Rectangular (10&quot; Height)</th>
                  <th scope="col">Velocity (FPM)</th>
                  <th scope="col">Noise Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>150 CFM</strong></td>
                  <td>Branch Run</td>
                  <td>6.5&quot;</td>
                  <td>6&quot; × 8&quot;</td>
                  <td>—</td>
                  <td>650 FPM</td>
                  <td><span style={{ color: "var(--accent-success)" }}>Quiet</span></td>
                </tr>
                <tr>
                  <td><strong>400 CFM</strong></td>
                  <td>1.0 Ton</td>
                  <td>9.0&quot;</td>
                  <td>10&quot; × 8&quot;</td>
                  <td>8&quot; × 10&quot;</td>
                  <td>905 FPM</td>
                  <td><span style={{ color: "var(--accent-warning)" }}>Moderate</span></td>
                </tr>
                <tr>
                  <td><strong>600 CFM</strong></td>
                  <td>1.5 Tons</td>
                  <td>10.7&quot;</td>
                  <td>14&quot; × 8&quot;</td>
                  <td>11&quot; × 10&quot;</td>
                  <td>960 FPM</td>
                  <td><span style={{ color: "var(--accent-warning)" }}>Moderate</span></td>
                </tr>
                <tr>
                  <td><strong>800 CFM</strong></td>
                  <td>2.0 Tons</td>
                  <td>12.0&quot;</td>
                  <td>18&quot; × 8&quot;</td>
                  <td>13&quot; × 10&quot;</td>
                  <td>1,018 FPM</td>
                  <td><span style={{ color: "var(--accent-warning)" }}>Moderate</span></td>
                </tr>
                <tr>
                  <td><strong>1,000 CFM</strong></td>
                  <td>2.5 Tons</td>
                  <td>13.2&quot;</td>
                  <td>22&quot; × 8&quot;</td>
                  <td>16&quot; × 10&quot;</td>
                  <td>1,050 FPM</td>
                  <td><span style={{ color: "var(--accent-warning)" }}>Moderate</span></td>
                </tr>
                <tr>
                  <td><strong>1,200 CFM</strong></td>
                  <td>3.0 Tons</td>
                  <td>14.2&quot;</td>
                  <td>26&quot; × 8&quot;</td>
                  <td>18&quot; × 10&quot;</td>
                  <td>1,087 FPM</td>
                  <td><span style={{ color: "var(--accent-warning)" }}>Moderate</span></td>
                </tr>
                <tr>
                  <td><strong>1,600 CFM</strong></td>
                  <td>4.0 Tons</td>
                  <td>16.0&quot;</td>
                  <td>34&quot; × 8&quot;</td>
                  <td>24&quot; × 10&quot;</td>
                  <td>1,145 FPM</td>
                  <td><span style={{ color: "var(--accent-danger)" }}>High Velocity</span></td>
                </tr>
                <tr>
                  <td><strong>2,000 CFM</strong></td>
                  <td>5.0 Tons</td>
                  <td>17.5&quot;</td>
                  <td>42&quot; × 8&quot;</td>
                  <td>30&quot; × 10&quot;</td>
                  <td>1,195 FPM</td>
                  <td><span style={{ color: "var(--accent-danger)" }}>High Velocity</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Sizing a 3-Ton Central AC Supply Trunk</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> You are installing a 3.0 Ton central heat pump system in a residential home. The cooling system supplies 1,200 CFM. Space between floor joists restricts the maximum duct height to 10 inches. Design the main supply trunk using standard equal friction (hf = 0.08 in.wg/100ft).
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Calculate Equivalent Round Diameter (De)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              D_e = [ (0.06855 * 1200^1.9) / 0.08 ]^(1 / 5.02) = [ 48,385.7 / 0.08 ]^0.1992 = 14.22 inches
            </p>

            <p><strong>Step 2: Solve Rectangular Equivalence with Locked Height (b = 10&quot;)</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              14.22 = 1.30 * (a * 10)^0.625 / (a + 10)^0.25  ==&gt;  Width &apos;a&apos; = 17.4 inches
            </p>
            <p style={{ color: "var(--ink-secondary)" }}>
              Round up to standard sheet metal fabrication sizing: <strong>18&quot; Width × 10&quot; Height</strong>.
            </p>

            <p style={{ marginTop: "1rem" }}><strong>Step 3: Verify Velocity and Acoustic Rating</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Area = (18 * 10) / 144 = 1.25 sq ft  |  Velocity = 1200 / 1.25 = 960 FPM
            </p>
            <p style={{ color: "var(--ink-secondary)" }}>
              ✓ <strong>Conclusion:</strong> Velocity is 960 FPM, well within SMACNA&apos;s 1,000 FPM residential supply trunk limit.
            </p>
          </div>
        </>
      }
      relatedToolsSection={
        <div style={{ marginBottom: "2rem" }}>
          <h2>Related Airflow & Cooling Calculators</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
            <Link href="/calculators/flex-duct-cfm-chart" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>Flex Duct CFM Chart</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Filterable flexible duct airflow capacities with installation sag derating.</p>
            </Link>
            <Link href="/calculators/cfm-calculator" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>HVAC CFM Sizer</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Calculate required CFM airflow from sensible heat load and temperature rise.</p>
            </Link>
            <Link href="/calculators/btu-calculator" style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", textDecoration: "none" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>BTU Load Master</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--ink-secondary)" }}>Estimate whole-home heating and cooling loads to feed your duct sizing design.</p>
            </Link>
          </div>
        </div>
      }
    />
  );
}
