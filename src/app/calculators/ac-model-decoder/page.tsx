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
      directAnswer="To find your air conditioner tonnage from the model number (including heat pumps), locate the two-digit nominal capacity code (typically 18, 24, 30, 36, 42, 48, or 60). Divide that number by 12 to determine nominal tons of cooling: 18 = 1.5 Tons (18,000 BTU/hr), 24 = 2.0 Tons (24,000 BTU/hr), 30 = 2.5 Tons (30,000 BTU/hr), 36 = 3.0 Tons (36,000 BTU/hr), 42 = 3.5 Tons (42,000 BTU/hr), 48 = 4.0 Tons (48,000 BTU/hr), and 60 = 5.0 Tons (60,000 BTU/hr)."
      formulaSnippet="Nominal AC Tonnage = Model Capacity Digits (18, 24, 30, 36, 42, 48, 60) / 12"
      authorityCitation="AHRI Standard 210/240 & ACCA Manual S Equipment Sizing Standards"
      toolComponent={<AcModelDecoderTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="cooling-loads" />

          <h2>How to Find AC Tonnage by Model Number</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Air conditioner and heat pump data plates contain encoded engineering specifications. The model number indicates the equipment design series, nominal refrigeration capacity, and SEER efficiency tier. The serial number identifies the specific manufacturing date and production plant.
          </p>

          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            <li>
              <strong>Locate the Equipment Rating Plate</strong>: Find the metal data plate attached to the outdoor condenser cabinet or the indoor air handler/furnace access panel labeled <em>&quot;Model No.&quot;</em>, <em>&quot;M/N&quot;</em>, or <em>&quot;Product No.&quot;</em>.
            </li>
            <li>
              <strong>Distinguish Model Number vs. Serial Number</strong>:
              <ul>
                <li><strong>Model Number (M/N)</strong>: Identifies the unit type and capacity rating (e.g., <code>24ACC636A003</code>, <code>4TTR4036L1000AA</code>, <code>GSX140361KB</code>).</li>
                <li><strong>Serial Number (S/N)</strong>: Identifies the date and plant of assembly (e.g., <code>3218E12345</code> = Week 32, 2018).</li>
              </ul>
            </li>
            <li>
              <strong>Identify the Embedded Capacity Digits</strong>: Scan the middle portion of the model number for a two- or three-digit number representing nominal thousands of BTU/hr (e.g., <code>024</code>, <code>036</code>, <code>048</code>).
            </li>
            <li>
              <strong>Divide Capacity Digits by 12</strong>: Because 1 ton of refrigeration equals 12,000 BTU/hr, dividing the capacity number by 12 yields nominal cooling tonnage (e.g., <code>36 / 12 = 3.0 Tons</code>).
            </li>
            <li>
              <strong>Evaluate Standard Design Airflow</strong>: Standard residential air conditioning operates at 400 CFM per nominal ton under ACCA and ASHRAE design standards (e.g., 3.0 Tons = 1,200 CFM).
            </li>
          </ol>

          <FormulaCard
            title="HVAC Model Number Capacity Conversion Equations"
            formula="\text{Nominal Tonnage} = \frac{\text{Capacity Digits}}{12} \quad | \quad \text{Design Airflow}_{\text{CFM}} = \text{Nominal Tonnage} \times 400"
            variables={[
              { symbol: "\\text{Capacity Digits}", label: "Model Capacity Code", description: "Nominal BTU digits embedded in the model sequence (e.g., 36 = 36,000 BTU/hr)", unit: "kBTU/hr" },
              { symbol: "12", label: "BTU to Ton Constant", description: "Standard refrigeration conversion constant (12,000 BTU/hr per cooling ton)", unit: "Constant" },
              { symbol: "\\text{Nominal Tonnage}", label: "Rated Cooling Capacity", description: "Equipment nominal capacity under standard AHRI 210/240 rating conditions", unit: "Tons" },
              { symbol: "\\text{Design Airflow}_{\\text{CFM}}", label: "Standard Blower Airflow", description: "Standard evaporator airflow volume across cooling coil (400 CFM/ton)", unit: "CFM" },
            ]}
            notes="Major North American HVAC manufacturers (Carrier, Bryant, Trane, American Standard, Goodman, Amana, Daikin, Lennox, Rheem, Ruud, ICP, and York) use standardized nominal step intervals of 6,000 and 12,000 BTU/hr."
            sourceStandard="AHRI Standard 210/240 & ACCA Manual S Equipment Sizing"
          />

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
              Manufacturer Model Number Nomenclature Reference
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              How leading HVAC manufacturers encode nominal cooling capacity into residential model numbers:
            </p>
            <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
              <li><strong>Carrier / Bryant / Payne:</strong> Digits following the alpha series code represent nominal BTU (e.g., <code>24ACC636...</code> $\rightarrow$ <code>36</code> = 3.0 Tons / 36,000 BTU/hr).</li>
              <li><strong>Trane / American Standard:</strong> Digits 6–8 contain the capacity code (e.g., <code>4TTR4036...</code> $\rightarrow$ <code>036</code> = 3.0 Tons / 36,000 BTU/hr). Prefix <code>4TT</code> indicates R-410A cooling; <code>4TW</code> indicates R-410A heat pump.</li>
              <li><strong>Goodman / Amana / Daikin:</strong> Digits 5–7 following the SEER tier indicate capacity (e.g., <code>GSX14036...</code> $\rightarrow$ <code>036</code> = 3.0 Tons / 36,000 BTU/hr; <code>14</code> = 14 SEER).</li>
              <li><strong>Lennox:</strong> 3-digit capacity code typically separated by dashes (e.g., <code>14ACX-036-230</code> $\rightarrow$ <code>036</code> = 3.0 Tons / 36,000 BTU/hr).</li>
              <li><strong>Rheem / Ruud:</strong> Digits 5–6 contain capacity (e.g., <code>RA1636...</code> $\rightarrow$ <code>36</code> = 3.0 Tons / 36,000 BTU/hr; <code>16</code> = 16 SEER).</li>
              <li><strong>ICP / Heil / Tempstar:</strong> Digits following model prefix (e.g., <code>NXA636...</code> $\rightarrow$ <code>36</code> = 3.0 Tons / 36,000 BTU/hr).</li>
              <li><strong>York / Coleman / Luxaire:</strong> Digits following series code (e.g., <code>YCG36...</code> $\rightarrow$ <code>36</code> = 3.0 Tons / 36,000 BTU/hr).</li>
            </ul>
          </div>

          <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Next Steps: Sizing &amp; Load Verification Workflows
            </h3>
            <p style={{ color: "var(--ink-secondary)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
              • Verify Existing Equipment Sizing: <Link href="/calculators/ac-tonnage-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>AC Tonnage &amp; Room Sizer</Link> — check whether your decoded tonnage matches conditioned home square footage and regional climate demands.<br />
              • Calculate Heat Gain Loads: <Link href="/calculators/btu-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>BTU Heating &amp; Cooling Load Calculator</Link> — perform whole-home Manual J load estimations for replacement equipment sizing.<br />
              • Explore Cooling Pillar: <Link href="/cooling-loads" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Cooling Loads, AC Tonnage &amp; Sizing Hub</Link> — access the full suite of cooling calculation tools.
            </p>
          </div>
        </>
      }
      comparisonTableSection={
        <>
          <h2>AC Model Number Capacity &amp; Tonnage Reference Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Standard nominal model capacity codes, equivalent cooling BTU/hr, recommended design blower airflow, and typical residential square footage coverage:
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Model Capacity Code</th>
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
          <h2>Worked Example 1: Decoding a Carrier 3-Ton Split AC Condenser</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> A technician inspects a Carrier data plate stamped with Model Number <code>24ACC636A003</code> and Serial Number <code>3218E12345</code>.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)", marginBottom: "1.5rem" }}>
            <p><strong>Step 1: Identify Brand Prefix &amp; Equipment Type</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Prefix &apos;24&apos; = Carrier air conditioning condenser | Digit &apos;6&apos; in 24ACC6 = 16 SEER nominal efficiency tier
            </p>

            <p><strong>Step 2: Extract Nominal Capacity Digits</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Capacity Digits &apos;36&apos; = 36,000 BTU/hr ==&gt; 36,000 / 12,000 = 3.0 Tons nominal cooling
            </p>

            <p><strong>Step 3: Decode Manufacture Date from Serial Number</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Serial &apos;3218...&apos; = Week 32 of 2018 | Design Blower Airflow = 3.0 Tons * 400 CFM/ton = 1,200 CFM
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Result:</strong> 3.0 Ton (36,000 BTU/hr) 16-SEER condenser manufactured in August 2018. Connect to the <Link href="/calculators/ac-tonnage-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>AC Tonnage Sizer</Link> to check home square footage coverage.
            </p>
          </div>

          <h2>Worked Example 2: Decoding a Trane 3-Ton Heat Pump Condenser</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            <strong>Scenario:</strong> A data tag on an outdoor Trane unit reads Model Number <code>4TTR4036L1000AA</code> and Serial Number <code>19324M234F</code>.
          </p>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", color: "var(--ink)" }}>
            <p><strong>Step 1: Identify Refrigerant &amp; Series</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Prefix &apos;4TT&apos; = Trane R-410A air conditioner | Digit &apos;4&apos; = 14 SEER series
            </p>

            <p><strong>Step 2: Extract Capacity Digits</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0 1rem" }}>
              Digits &apos;036&apos; = 36,000 BTU/hr ==&gt; 36,000 / 12,000 = 3.0 Tons nominal capacity
            </p>

            <p><strong>Step 3: Decode Manufacture Year</strong></p>
            <p style={{ fontFamily: "monospace", color: "var(--accent-cooling)", margin: "0.5rem 0" }}>
              Serial &apos;1932...&apos; = Manufactured in 2019 (Week 32) | Required Airflow = 1,200 CFM
            </p>
            <p style={{ color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
              ✓ <strong>Result:</strong> 3.0 Ton Trane R-410A condenser manufactured in 2019. Cross-check cooling load requirements using the <Link href="/calculators/btu-calculator" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>BTU Load Calculator</Link>.
            </p>
          </div>
        </>
      }
    />
  );
}
