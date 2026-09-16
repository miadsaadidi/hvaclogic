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

          <h2>How to Decode HVAC Model &amp; Serial Numbers</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Air conditioner and heat pump data plates contain critical engineering specifications encoded directly into alphanumeric strings. Decoding these identifiers reveals the unit&apos;s nominal cooling capacity, SEER rating, electrical requirements, and exact manufacture date.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li><strong>Locate the Outdoor Data Plate</strong>: Find the metal rating plate riveted to the outdoor condenser cabinet (or indoor air handler access door) marked <em>&quot;M/N&quot;</em> or <em>&quot;Model No.&quot;</em>.</li>
            <li><strong>Identify the 2-Digit Capacity Code</strong>: Look for a two-digit number in the middle of the string divisible by 6 or 12 (e.g. <code>18</code>, <code>24</code>, <code>30</code>, <code>36</code>, <code>42</code>, <code>48</code>, <code>60</code>). Divide by 12 to find nominal tons of cooling (e.g., <code>36 / 12 = 3.0 Tons</code>).</li>
            <li><strong>Cross-Check with Required Airflow</strong>: Multiply nominal tons by 400 CFM/ton (e.g., 3.0 Tons = 1,200 CFM). Connect to the <Link href="/calculators/ac-tonnage-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>AC Tonnage Sizer</Link> to verify room square footage matching.</li>
            <li><strong>Decode Serial Number for Manufacture Age</strong>: Most major brands (Carrier, Goodman, Rheem, Trane, Lennox) encode the four-digit year and week/month into the beginning of the serial number.</li>
          </ol>

          <FormulaCard
            title="HVAC Model Number Capacity Conversion Equation"
            formula="\text{Tonnage} = \frac{\text{Capacity Digits}}{12} \quad | \quad \text{Airflow}_{\text{CFM}} = \text{Tonnage} \times 400"
            variables={[
              { symbol: "\\text{Capacity Digits}", label: "Model Capacity Code", description: "Two-digit nominal BTU number stamped into the model sequence (e.g., 36 = 36,000 BTU)", unit: "kBTU/hr" },
              { symbol: "12", label: "BTU to Ton Factor", description: "Number of thousands of BTUs per refrigeration ton (12,000 BTU/hr per ton)", unit: "Constant" },
              { symbol: "\\text{Tonnage}", label: "Nominal Cooling Tons", description: "Rated equipment refrigeration capacity under AHRI 95°F outdoor test conditions", unit: "Tons" },
              { symbol: "\\text{Airflow}_{\\text{CFM}}", label: "Standard Blower Airflow", description: "ACCA standard 400 CFM per nominal cooling ton", unit: "CFM" },
            ]}
            notes="All major North American HVAC manufacturers (Carrier, Trane, Goodman, Lennox, Rheem, York) standardize on 6,000 and 12,000 BTU nominal step intervals."
            sourceStandard="AHRI Standard 210/240 & ACCA Manual S Equipment Selection"
          />

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              How to Read Serial Numbers for Equipment Age by Manufacturer Brand
            </h3>
            <p>
              HVAC serial numbers encode the exact <strong>year and calendar week</strong> of factory assembly:
            </p>
            <ul>
              <li><strong>Carrier / Bryant / Payne:</strong> First 2 digits = Week, 3rd &amp; 4th digits = Year (e.g. <code>3218E12345</code> = 32nd week of 2018).</li>
              <li><strong>Goodman / Amana / Daikin:</strong> First 2 digits = Year, 3rd &amp; 4th digits = Month (e.g. <code>1805123456</code> = May 2018).</li>
              <li><strong>ICP / Heil / Tempstar / Comfortmaker:</strong> Plant letter followed by 2 digits year and 2 digits week (e.g. <code>E193512345</code> = 35th week of 2019).</li>
              <li><strong>Trane / American Standard:</strong> First 2 digits = Year, followed by week (e.g. <code>19324M234F</code> = 2019).</li>
              <li><strong>Rheem / Ruud / WeatherKing:</strong> Plant letter followed by 2 digits week and 2 digits year (e.g. <code>W341912345</code> = Week 34 of 2019).</li>
              <li><strong>Lennox / Armstrong:</strong> First 2 digits = Plant code, 3rd &amp; 4th digits = Year (e.g. <code>1919D12345</code> = 2019).</li>
              <li><strong>York / Coleman / Luxaire:</strong> 3rd letter or 2nd/3rd characters encode year in Johnson Controls date code tables.</li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <>
          <h2>Residential AC Model Number Tonnage Sizing Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem" }}>
            Model number capacity codes, equivalent cooling BTU/hr, required blower airflow, and typical home square footage:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Model Digits</th>
                  <th scope="col">Nominal Tonnage</th>
                  <th scope="col">Cooling Capacity (BTU/hr)</th>
                  <th scope="col">Design Blower Airflow (CFM)</th>
                  <th scope="col">Typical Conditioned Floor Area</th>
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
        </>
      }
      workedExampleSection={
        <>
          <h2>Worked Example: Decoding a 3-Ton Goodman Split Condenser</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> A technician inspects a weather-worn outdoor condenser stamped with Model Number <code>GSX140361KB</code> and Serial Number <code>1805123456</code>.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Brand &amp; Product Series Identification</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Prefix &apos;GSX&apos; = Goodman 14-SEER residential split-system air conditioning condenser
            </p>

            <p><strong>Step 2: Nominal Tonnage Extraction</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Capacity Digits &apos;036&apos; = 36,000 BTU/hr ==&gt; 36,000 / 12,000 = 3.0 Tons nominal cooling
            </p>

            <p><strong>Step 3: Design Airflow &amp; Factory Manufacture Date</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Blower Airflow = 3.0 Tons * 400 CFM/ton = 1,200 CFM | Serial &apos;1805...&apos; = May 2018 manufacture
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Conclusion:</strong> 3.0 Ton condenser requiring 1,200 CFM blower airflow. Connect to the <Link href="/calculators/refrigerant-charge-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Refrigerant Weigh-In Calculator</Link> for factory line-set charge verification.
            </p>
          </div>
        </>
      }
    />
  );
}
