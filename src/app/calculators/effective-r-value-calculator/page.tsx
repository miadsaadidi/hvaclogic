import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { EffectiveRValueTool } from "@/components/calculator/tools/EffectiveRValueTool";
import { FormulaCard } from "@/components/seo/FormulaCard";

const calculator = getCalculatorById("effective-r-value-calculator")!;

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

export default function EffectiveRValueCalculatorPage() {
  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer="Effective R-value measures whole-wall thermal resistance after accounting for thermal bridging through structural framing members (studs, plates, headers, and sills). In cold-formed steel construction, high metal thermal conductivity reduces effective cavity insulation by 50% to over 68% (e.g., nominal R-19 in a 6-inch steel stud at 16 inches O.C. delivers an effective cavity resistance of only R-7.1 per ASHRAE 90.1 Appendix A Table A9.2-2). Adding exterior continuous insulation (ci) provides an uninterrupted thermal break across the stud plane that substantially lowers whole-wall assembly U-factors to satisfy prescriptive energy code standards."
      formulaSnippet="Wood: U = (f_framing / R_framing) + (f_cavity / R_cavity) | Steel: U = 1 / (R_base + R_ci + R_eff_cavity) | R_eff = 1 / U"
      authorityCitation="ANSI/ASHRAE/IES Standard 90.1-2022 (Normative Appendix A Table A9.2-2) & ASHRAE Handbook of Fundamentals (Chapters 25 & 27)"
      toolComponent={<EffectiveRValueTool />}
      methodologySection={
        <>
          <div style={{ marginTop: "0.5rem" }}>
            <FormulaCard
              title="Building Envelope Thermal Bridging &amp; Assembly U-Factor Formulations"
              formula="U_{\text{wood}} = \frac{f_{\text{framing}}}{R_{\text{framing\_path}}} + \frac{f_{\text{cavity}}}{R_{\text{cavity\_path}}} \quad | \quad U_{\text{steel}} = \frac{1}{R_{\text{base}} + R_{\text{ci}} + R_{\text{eff,cavity}}} \quad | \quad R_{\text{effective}} = \frac{1}{U_{\text{assembly}}}"
              variables={[
                { symbol: "U_{\\text{assembly}}", label: "Whole-Wall Assembly U-Factor", description: "Overall area-weighted thermal transmittance of the wall cross-section", unit: "BTU/hr·ft²·°F" },
                { symbol: "R_{\\text{effective}}", label: "Effective Assembly R-Value", description: "True whole-wall thermal resistance including all framing thermal bridges", unit: "hr·ft²·°F/BTU" },
                { symbol: "R_{\\text{eff,cavity}}", label: "Effective Cavity R-Value", description: "Direct empirical thermal resistance of cavity insulation bridged by cold-formed steel studs (ASHRAE 90.1 Table A9.2-2)", unit: "R-value" },
                { symbol: "R_{\\text{ci}}", label: "Continuous Exterior Insulation (ci)", description: "Unbroken insulation layer installed across the exterior face of framing members", unit: "R-value" },
                { symbol: "R_{\\text{base}}", label: "Common Base Series Layers", description: "Sum of interior air film (0.68), 1/2\" gypsum (0.45), 7/16\" OSB (0.62), siding (0.60), and exterior air film (0.17)", unit: "2.52 hr·ft²·°F/BTU" },
                { symbol: "f_{\\text{framing}}", label: "Framing Area Fraction", description: "Proportion of wall area occupied by framing (standard baseline: 25% for 16\" O.C., 22% for 24\" O.C. per ASHRAE 90.1)", unit: "decimal (0.25 / 0.22)" },
              ]}
              notes="ASHRAE Standard 90.1 Normative Appendix A permits determining assembly U-factors using the tabulated effective cavity method (Table A9.2-2 for steel framing, Section A3.1 for wood) or validated two-dimensional/three-dimensional numerical thermal modeling per Section A9.4."
              sourceStandard="ANSI/ASHRAE/IES Standard 90.1-2022 Normative Appendix A & ASHRAE Handbook of Fundamentals"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Framing Thermal Bridging Physics: Wood vs. Cold-Formed Steel
            </h3>
            <p>
              When insulation is placed between structural studs, heat conducts preferentially through the path of lowest thermal resistance:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Wood Stud Framing (Parallel Path Model):</strong> Softwood lumber provides moderate thermal resistance (approximately R-1.25 per inch; R-4.38 for a 2x4, R-6.88 for a 2x6). Heat flow is modeled by area-weighting the framing path and cavity path. At standard 16-inch on-center spacing (25% framing factor), nominal R-13 cavity insulation combined with base layers (R-2.52) produces an effective whole-wall resistance of <strong>R-11.83</strong> (U = 0.085 BTU/hr·ft²·°F).
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <strong>Cold-Formed Steel Framing (Severe Thermal Bridging):</strong> Steel has a thermal conductivity over 300 times higher than wood (~314 BTU·in/hr·ft²·°F). Heat rapidly short-circuits the cavity batt through the highly conductive flanges and web. Under ASHRAE Standard 90.1 Table A9.2-2, an R-13 batt in a 3.5-inch steel stud at 16 inches O.C. drops to an effective cavity resistance of only <strong>R-6.0</strong> (a 53.8% loss). An R-19 batt in a 6-inch steel stud drops to <strong>R-7.1</strong> (a 62.6% loss).
              </li>
              <li>
                <strong>The Continuous Exterior Insulation (ci) Solution:</strong> Continuous insulation (such as Polyisocyanurate, XPS, EPS, or rigid mineral wool) runs across the exterior face of the framing. Because it is uninterrupted by structural studs, it provides a full-plane thermal break that substantially reduces direct framing heat loss, enabling steel and wood assemblies to satisfy prescriptive building energy codes (IECC &amp; ASHRAE 90.1).
              </li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <>
          <h2>ASHRAE 90.1 Appendix A Table A9.2-2 Cold-Formed Steel Effective Cavity Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Normative effective cavity R-values for standard C-shape cold-formed steel studs derived directly from ANSI/ASHRAE/IES Standard 90.1-2022 (Appendix A Table A9.2-2). For background research and 2D finite-difference derivation, see our <Link href="/research/cold-formed-steel-framing-thermal-factors" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Cold-Formed Steel Framing Factors Technical Monograph</Link>.
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Stud Depth &amp; Size</th>
                  <th scope="col">On-Center Spacing</th>
                  <th scope="col">Nominal Cavity R</th>
                  <th scope="col">Effective Cavity R</th>
                  <th scope="col">Thermal Bridging Derate</th>
                  <th scope="col">Normative Source Standard</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-11</td>
                  <td><strong>R-5.5</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-50.0%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-13</td>
                  <td><strong>R-6.0</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-53.8%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-15</td>
                  <td><strong>R-6.4</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-57.3%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-11</td>
                  <td><strong>R-6.6</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-40.0%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-13</td>
                  <td><strong>R-7.2</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-44.6%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-15</td>
                  <td><strong>R-7.8</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-48.0%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>6.0 in (2x6)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-19</td>
                  <td><strong>R-7.1</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-62.6%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>6.0 in (2x6)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-21</td>
                  <td><strong>R-7.4</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-64.8%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>6.0 in (2x6)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-19</td>
                  <td><strong>R-8.6</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-54.7%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>6.0 in (2x6)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-21</td>
                  <td><strong>R-9.0</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-57.1%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>8.0 in (2x8)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-25</td>
                  <td><strong>R-7.8</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-68.8%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
                <tr>
                  <td><strong>8.0 in (2x8)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-25</td>
                  <td><strong>R-9.6</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-61.6%</td>
                  <td>ASHRAE 90.1 Table A9.2-2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> Sizing the thermal performance of an exterior commercial wall specified with <strong>6-inch cold-formed steel studs at 16 inches O.C.</strong> filled with <strong>R-19 fiberglass batt</strong> cavity insulation. Base unbridged continuous layers include 1/2-inch gypsum drywall (R-0.45), 7/16-inch OSB sheathing (R-0.62), vinyl siding (R-0.60), and interior/exterior air films (R-0.85), totaling <strong>R-2.52</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Case A: Cavity Only (No Continuous Insulation)</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: "0 0 1rem" }}>
              <li>Look up effective cavity R for 6&quot; steel stud @ 16&quot; O.C. with R-19 batt in ASHRAE 90.1 Table A9.2-2: <strong>R_eff_cavity = R-7.1</strong> (62.6% derating due to steel thermal bridging).</li>
              <li>Sum all series layers: R_assembly = R_base (2.52) + R_eff_cavity (7.1) = <strong>R-9.62 hr·ft²·°F/BTU</strong>.</li>
              <li>Calculate overall assembly U-factor: U = 1 / 9.62 = <strong>0.104 BTU/hr·ft²·°F</strong>.</li>
              <li><em>Code Context:</em> This exceeds typical prescriptive commercial steel-framed wall maximum U-factor benchmarks (e.g. ASHRAE 90.1 max U = 0.064 for Climate Zone 4 or U = 0.045 for Climate Zone 6).</li>
            </ol>

            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Case B: Cavity + 1.5&quot; Polyiso Continuous Exterior Insulation (R-9 ci)</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: "0 0 1rem" }}>
              <li>Continuous insulation rating: 1.5 inches &times; R-6.0/inch nominal (ASTM C1289) = <strong>R-9.0 ci</strong>.</li>
              <li>Sum all series layers: R_assembly = R_base (2.52) + R_ci (9.0) + R_eff_cavity (7.1) = <strong>R-18.62 hr·ft²·°F/BTU</strong>.</li>
              <li>Calculate overall assembly U-factor: U = 1 / 18.62 = <strong>0.054 BTU/hr·ft²·°F</strong>.</li>
              <li><em>Result:</em> Adding 1.5&quot; continuous Polyiso lowers whole-wall conductive heat transmission by <strong>48%</strong>, bringing the assembly into alignment with typical commercial prescriptive U-factor requirements.</li>
            </ol>

            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Case C: Residential Wood 2x4 @ 16&quot; O.C. with R-13 Cavity (Parallel-Path)</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>Framing path: R_base (2.52) + Wood Stud (3.5&quot; &times; 1.25 = 4.38) = <strong>R-6.90</strong> &rarr; U_framing = 1 / 6.90 = <strong>0.1449</strong>.</li>
              <li>Cavity path: R_base (2.52) + R-13 Batt = <strong>R-15.52</strong> &rarr; U_cavity = 1 / 15.52 = <strong>0.0644</strong>.</li>
              <li>Area-weight by 25% framing / 75% cavity: U_assembly = 0.25(0.1449) + 0.75(0.0644) = <strong>0.085 BTU/hr·ft²·°F</strong>.</li>
              <li>Whole-wall effective resistance: R_effective = 1 / 0.08456 = <strong>R-11.83 hr·ft²·°F/BTU</strong> (effective cavity resistance: R-9.3).</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
