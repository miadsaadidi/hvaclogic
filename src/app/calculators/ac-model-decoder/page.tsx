import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { AcModelDecoderTool } from "@/components/calculator/tools/AcModelDecoderTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

const calculator = getCalculatorById("ac-model-decoder")!;

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

export default function AcModelDecoderPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="To find your air conditioner tonnage from the model number, locate the two-digit capacity number (usually divisible by 6 or 12). Divide that number by 12 to find tonnage: 18 = 1.5 Tons (18,000 BTU), 24 = 2.0 Tons (24,000 BTU), 30 = 2.5 Tons (30,000 BTU), 36 = 3.0 Tons (36,000 BTU), 42 = 3.5 Tons (42,000 BTU), 48 = 4.0 Tons (48,000 BTU), and 60 = 5.0 Tons (60,000 BTU)."
      formulaSnippet="Nominal AC Tonnage = Model Capacity Digits (18, 24, 30, 36, 42, 48, 60) / 12"
      authorityCitation="AHRI Standard 210/240 & Manufacturer Nomenclature Specifications"
      toolComponent={<AcModelDecoderTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="cooling-loads" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="HVAC Model Number Capacity Conversion Equation"
              formula="Tonnage = (Capacity_Digits) / 12  |  Airflow_CFM = Tonnage × 400"
              variables={[
                { symbol: "Capacity_Digits", label: "Model Capacity Code", description: "Two-digit nominal BTU number stamped into the model sequence (e.g., 36 = 36,000 BTU)", unit: "kBTU/hr" },
                { symbol: "12", label: "BTU to Ton Factor", description: "Number of thousands of BTUs per refrigeration ton (12,000 BTU/hr per ton)", unit: "Constant" },
                { symbol: "Tonnage", label: "Nominal Cooling Tons", description: "Rated equipment refrigeration capacity under AHRI 95°F outdoor test conditions", unit: "Tons" },
                { symbol: "Airflow_CFM", label: "Standard Blower Airflow", description: "ACCA standard 400 CFM per nominal cooling ton", unit: "CFM" },
              ]}
              notes="All major North American HVAC manufacturers (Carrier, Trane, Goodman, Lennox, Rheem, York) standardize on 6,000 and 12,000 BTU intervals."
              sourceStandard="AHRI Standard 210/240 & ACCA Manual S Equipment Selection"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              How to Read Serial Numbers for Age &amp; Manufacture Date by Brand
            </h3>
            <p>
              HVAC serial numbers encode the exact <strong>year and calendar week</strong> of factory production. Use the rules below for major brands:
            </p>
            <ul>
              <li><strong>Carrier / Bryant / Payne:</strong> First 2 digits = Week, 3rd &amp; 4th digits = Year (e.g. <code>3218E12345</code> = 32nd week of 2018).</li>
              <li><strong>Goodman / Amana / Daikin:</strong> First 2 digits = Year, 3rd &amp; 4th digits = Month (e.g. <code>1805123456</code> = May 2018; <code>1904...</code> = April 2019).</li>
              <li><strong>ICP / Heil / Tempstar / Comfortmaker:</strong> Plant letter followed by 2 digits year and 2 digits week (e.g. <code>E193512345</code> = 35th week of 2019).</li>
              <li><strong>Trane / American Standard:</strong> First 2 digits = Year, followed by week (e.g. <code>19324M234F</code> = 2019).</li>
              <li><strong>Rheem / Ruud / WeatherKing:</strong> Plant letter followed by 2 digits week and 2 digits year (e.g. <code>W341912345</code> = Week 34 of 2019).</li>
              <li><strong>Lennox / Armstrong:</strong> First 2 digits = Plant code, 3rd &amp; 4th digits = Year (e.g. <code>1919D12345</code> = Year 2019; <code>5818M...</code> = 2018).</li>
              <li><strong>York / Coleman / Luxaire:</strong> 3rd letter or 2nd/3rd characters encode year in Johnson Controls date code tables.</li>
            </ul>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
              Manufacturer Model Prefix &amp; Nomenclature Guide
            </h3>
            <div className="scenario-table" style={{ marginTop: "0.5rem" }}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Brand Family</th>
                    <th scope="col">AC Model Prefix</th>
                    <th scope="col">Heat Pump Prefix</th>
                    <th scope="col">Tonnage Digits Position</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Carrier / Bryant</strong></td>
                    <td><code>24AAA, 24ACC, 24VNA</code></td>
                    <td><code>25HNB, 25VNA</code></td>
                    <td>Digits 6–7 (e.g., 24ACC6<strong>36</strong>)</td>
                  </tr>
                  <tr>
                    <td><strong>Trane / Amer. Std</strong></td>
                    <td><code>4TTR, 4TTX, 4TTV</code></td>
                    <td><code>4TWR, 4TWX, 4TWV</code></td>
                    <td>Digits 5–7 (e.g., 4TTR40<strong>36</strong>)</td>
                  </tr>
                  <tr>
                    <td><strong>Goodman / Daikin</strong></td>
                    <td><code>GSX14, GSX16, DX14SA</code></td>
                    <td><code>GSZ14, GSZ16, DZ16SA</code></td>
                    <td>Digits 6–8 (e.g., GSX140<strong>36</strong>1)</td>
                  </tr>
                  <tr>
                    <td><strong>ICP / Heil / Tempstar</strong></td>
                    <td><code>NXA6, N4A4, H4A4, C4A4</code></td>
                    <td><code>NXH6, N4H4, H4H4</code></td>
                    <td>Digits 4–5 (e.g., NXA6<strong>36</strong>G)</td>
                  </tr>
                  <tr>
                    <td><strong>Lennox</strong></td>
                    <td><code>14ACX, XC14, ML14XC1</code></td>
                    <td><code>14HPX, XP14, XP21</code></td>
                    <td>Hyphenated / 3 digits (e.g., 14ACX-<strong>036</strong>)</td>
                  </tr>
                  <tr>
                    <td><strong>Rheem / Ruud</strong></td>
                    <td><code>RA14, RA16, RA17</code></td>
                    <td><code>RP14, RP15, RP16</code></td>
                    <td>Digits 5–6 (e.g., RA16<strong>36</strong>AJ)</td>
                  </tr>
                  <tr>
                    <td><strong>York / Coleman</strong></td>
                    <td><code>YCG, YCS, TC3, TC7</code></td>
                    <td><code>YZG, YZS, TH4</code></td>
                    <td>Digits 4–5 (e.g., YCG<strong>36</strong>B21)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Model Digits</th>
                <th scope="col">Nominal Tonnage</th>
                <th scope="col">Cooling Capacity (BTU/hr)</th>
                <th scope="col">Recommended Airflow (CFM)</th>
                <th scope="col">Typical Home Size (Sq Ft)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>18 / 018</code></td>
                <td><strong>1.5 Tons</strong></td>
                <td>18,000 BTU/hr</td>
                <td>600 CFM</td>
                <td>600 – 900 sq ft</td>
              </tr>
              <tr>
                <td><code>24 / 024</code></td>
                <td><strong>2.0 Tons</strong></td>
                <td>24,000 BTU/hr</td>
                <td>800 CFM</td>
                <td>900 – 1,300 sq ft</td>
              </tr>
              <tr>
                <td><code>30 / 030</code></td>
                <td><strong>2.5 Tons</strong></td>
                <td>30,000 BTU/hr</td>
                <td>1,000 CFM</td>
                <td>1,300 – 1,650 sq ft</td>
              </tr>
              <tr>
                <td><code>36 / 036</code></td>
                <td><strong>3.0 Tons</strong></td>
                <td>36,000 BTU/hr</td>
                <td>1,200 CFM</td>
                <td>1,650 – 2,100 sq ft</td>
              </tr>
              <tr>
                <td><code>42 / 042</code></td>
                <td><strong>3.5 Tons</strong></td>
                <td>42,000 BTU/hr</td>
                <td>1,400 CFM</td>
                <td>2,100 – 2,500 sq ft</td>
              </tr>
              <tr>
                <td><code>48 / 048</code></td>
                <td><strong>4.0 Tons</strong></td>
                <td>48,000 BTU/hr</td>
                <td>1,600 CFM</td>
                <td>2,500 – 3,000 sq ft</td>
              </tr>
              <tr>
                <td><code>60 / 060</code></td>
                <td><strong>5.0 Tons</strong></td>
                <td>60,000 BTU/hr</td>
                <td>2,000 CFM</td>
                <td>3,000 – 3,800 sq ft</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> A technician inspects a weather-worn outdoor condenser stamped with Model Number <code>GSX140361KB</code> and Serial Number <code>1805123456</code>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem" }}>Step-by-Step Decoding Breakdown:</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li><strong>Brand Identification:</strong> Prefix <code>GSX</code> identifies a Goodman 14-SEER residential split system condenser.</li>
              <li><strong>Tonnage Extraction:</strong> Digits <code>036</code> represent 36,000 BTU/hr (36,000 / 12,000 = <strong>3.0 Tons</strong> nominal cooling capacity).</li>
              <li><strong>Airflow Requirement:</strong> 3.0 Tons × 400 CFM/ton = <strong>1,200 CFM</strong> required duct blower airflow.</li>
              <li><strong>Manufacturing Age:</strong> Serial number <code>1805...</code> indicates manufacture in <strong>May 2018</strong>.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
