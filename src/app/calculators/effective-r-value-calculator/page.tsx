import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { EffectiveRValueTool } from "@/components/calculator/tools/EffectiveRValueTool";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

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
      directAnswer="Effective R-value measures whole-wall thermal resistance after accounting for thermal bridging through structural framing members (studs, plates, headers). In cold-formed steel construction, thermal bridging reduces effective cavity insulation by up to 64% (e.g., an R-19 batt in a 6-inch steel stud at 16 inches O.C. delivers an effective cavity resistance of only R-7.1 per ASHRAE 90.1). Adding continuous exterior insulation (ci) provides an uninterrupted thermal break that restores whole-wall thermal performance to meet modern energy codes."
      formulaSnippet="Wood: U = (f_framing / R_framing) + (f_cavity / R_cavity) | Steel: U = 1 / (R_continuous + R_eff_cavity) | R_eff = 1 / U"
      authorityCitation="ANSI/ASHRAE/IES Standard 90.1-2022 (Normative Appendix A) & ASHRAE Handbook—Fundamentals 2021"
      toolComponent={<EffectiveRValueTool />}
      methodologySection={
        <>
          <HvacFlowDiagram category="building-science" />

          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title="Building Envelope Thermal Bridging &amp; Assembly U-Factor Equations"
              formula="U_{\text{wood}} = \frac{f_{\text{framing}}}{R_{\text{framing\_path}}} + \frac{f_{\text{cavity}}}{R_{\text{cavity\_path}}} \quad | \quad U_{\text{steel}} = \frac{1}{R_{\text{continuous}} + R_{\text{eff,cavity}}} \quad | \quad R_{\text{effective}} = \frac{1}{U_{\text{assembly}}}"
              variables={[
                { symbol: "U_{\\text{assembly}}", label: "Whole-Wall Assembly U-Factor", description: "Area-weighted overall thermal transmittance of the wall cross-section", unit: "BTU/hr·ft²·°F" },
                { symbol: "R_{\\text{effective}}", label: "Effective Assembly R-Value", description: "True whole-wall thermal resistance including all framing thermal bridges", unit: "hr·ft²·°F/BTU" },
                { symbol: "R_{\\text{eff,cavity}}", label: "Effective Cavity R-Value", description: "Empirical thermal resistance of cavity insulation bridged by cold-formed steel studs (ASHRAE 90.1 Table A9.2-1)", unit: "R-value" },
                { symbol: "R_{\\text{ci}}", label: "Continuous Exterior Insulation", description: "Unbroken insulation layer installed across the exterior face of framing members (thermal break)", unit: "R-value" },
                { symbol: "f_{\\text{framing}}", label: "Framing Area Fraction", description: "Proportion of wall area occupied by framing (25% for 16\" O.C., 22% for 24\" O.C. per ASHRAE 90.1 Table A3.1-1)", unit: "decimal (0.25 / 0.22)" },
              ]}
              notes="Steel framing exhibits thermal conductivity roughly 400 times higher than softwood lumber. Consequently, 1D series addition (summing material R-values) severely overestimates wall performance. ASHRAE Standard 90.1 Normative Appendix A mandates either the empirical effective cavity method (Table A9.2-1) or 2D/3D numerical modeling."
              sourceStandard="ANSI/ASHRAE/IES Standard 90.1-2022 Normative Appendix A & ASHRAE Handbook—Fundamentals 2021 Ch. 25/27"
            />
          </div>

          <div style={{ marginTop: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
              How Framing Thermal Bridging Works: Wood vs. Cold-Formed Steel
            </h3>
            <p>
              When insulation is installed between wall studs, heat follows the path of least thermal resistance. This phenomenon is known as <strong>thermal bridging</strong>:
            </p>
            <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
              <li>
                <strong>Wood Studs (Parallel Path):</strong> Softwood lumber has a thermal resistance of approximately R-1.25 per inch (R-4.38 for a 2x4, R-6.88 for a 2x6). Because wood is moderately insulative, heat transfer follows the parallel-path isothermal planes model. At standard 16-inch on-center spacing (25% framing factor), nominal R-13 cavity insulation yields an effective whole-wall resistance of approximately <strong>R-12.2</strong> (U = 0.082).
              </li>
              <li>
                <strong>Cold-Formed Steel Studs (Severe Bridging):</strong> Steel has a thermal conductivity of approximately 314 BTU·in/hr·ft²·°F. Heat rapidly conducts through the steel flanges and web, short-circuiting the cavity batt. Under ASHRAE Standard 90.1 Table A9.2-1, an R-13 batt in a 3.5-inch steel stud at 16 inches O.C. yields an effective cavity resistance of only <strong>R-6.0</strong> (a 53.8% performance loss). An R-19 batt in a 6-inch steel stud drops to <strong>R-7.1</strong> (a 62.6% loss).
              </li>
              <li>
                <strong>The Continuous Insulation (ci) Solution:</strong> Exterior rigid board insulation (such as XPS, EPS, Polyisocyanurate, or rigid mineral wool) runs continuously over the exterior face of the studs. Because there are no structural framing members penetrating this layer, 100% of its rated thermal resistance serves as an unbroken thermal break, keeping the studs warm and radically lowering whole-wall U-factors to meet IECC and ASHRAE 90.1 code baselines.
              </li>
            </ul>
          </div>
        </>
      }
      comparisonTableSection={
        <>
          <h2>ASHRAE 90.1 Cold-Formed Steel Stud Effective Cavity R-Value Matrix</h2>
          <p style={{ color: "var(--ink-secondary)", marginBottom: "1rem", lineHeight: 1.6 }}>
            Normative deratings for C-shape cold-formed steel studs derived directly from ANSI/ASHRAE/IES Standard 90.1-2022 (Table A9.2-1 &amp; Table A3.3-1). For finite-difference derivation, thermal fin equations, and complete framing factor (F_c) matrices, consult the <Link href="/research/cold-formed-steel-framing-thermal-factors" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Cold-Formed Steel Framing Factors Monograph</Link>.
          </p>

          <div className="scenario-table">
            <table>
              <thead>
                <tr>
                  <th scope="col">Stud Depth</th>
                  <th scope="col">On-Center Spacing</th>
                  <th scope="col">Nominal Cavity R</th>
                  <th scope="col">Effective Cavity R</th>
                  <th scope="col">Thermal Bridging Derate</th>
                  <th scope="col">Governing Standard Table</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-11</td>
                  <td><strong>R-5.5</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-50.0%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-13</td>
                  <td><strong>R-6.0</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-53.8%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-15</td>
                  <td><strong>R-6.4</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-57.3%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-11</td>
                  <td><strong>R-6.6</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-40.0%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-13</td>
                  <td><strong>R-7.2</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-44.6%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>3.5 in (2x4)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-15</td>
                  <td><strong>R-7.8</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-48.0%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>6.0 in (2x6)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-19</td>
                  <td><strong>R-7.1</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-62.6%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>6.0 in (2x6)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-21</td>
                  <td><strong>R-7.4</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-64.8%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>6.0 in (2x6)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-19</td>
                  <td><strong>R-8.6</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-54.7%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>6.0 in (2x6)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-21</td>
                  <td><strong>R-9.0</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-57.1%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>8.0 in (2x8)</strong></td>
                  <td>16 in O.C.</td>
                  <td>R-25</td>
                  <td><strong>R-7.8</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-68.8%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
                <tr>
                  <td><strong>8.0 in (2x8)</strong></td>
                  <td>24 in O.C.</td>
                  <td>R-25</td>
                  <td><strong>R-9.6</strong></td>
                  <td style={{ color: "var(--accent-danger)" }}>-61.6%</td>
                  <td>ASHRAE 90.1 Table A9.2-1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            <strong>Scenario:</strong> An architect is specifying an exterior commercial wall with <strong>6-inch cold-formed steel studs at 16 inches O.C.</strong> filled with <strong>R-19 fiberglass batt</strong> cavity insulation. The baseline assembly has 1/2-inch gypsum drywall inside, 7/16-inch OSB sheathing, vinyl siding, and standard interior/exterior air films (base layers = R-2.52).
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem", marginTop: "1rem" }}>
            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Case A: Cavity Only (Unmitigated Thermal Bridging)</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: "0 0 1rem" }}>
              <li>Look up effective cavity R for 6" steel stud @ 16" O.C. with R-19 batt in ASHRAE 90.1 Table A9.2-1: <strong>R_eff_cavity = R-7.1</strong>.</li>
              <li>Add common continuous layers: R_total = R_base (2.52) + R_eff_cavity (7.1) = <strong>R-9.62</strong>.</li>
              <li>Calculate overall assembly U-factor: U = 1 / 9.62 = <strong>0.104 BTU/hr·ft²·°F</strong>.</li>
              <li><em>Result:</em> Fails IECC/ASHRAE 90.1 maximum U-factor limits for commercial walls in Climate Zones 3–8 (max U = 0.064 to 0.045).</li>
            </ol>

            <h4 style={{ color: "var(--ink)", margin: "0 0 0.5rem", fontWeight: 600 }}>Case B: Cavity + 1.5" Polyiso Continuous Exterior Insulation (R-9 ci)</h4>
            <ol style={{ paddingLeft: "1.2rem", margin: 0 }}>
              <li>Continuous insulation rating: 1.5 inches &times; R-6.0/inch (ASTM C1289) = <strong>R-9.0 ci</strong>.</li>
              <li>Add all series layers: R_total = R_base (2.52) + R_ci (9.0) + R_eff_cavity (7.1) = <strong>R-18.62</strong>.</li>
              <li>Calculate overall assembly U-factor: U = 1 / 18.62 = <strong>0.054 BTU/hr·ft²·°F</strong>.</li>
              <li><em>Result:</em> <strong>Meets IECC 2024 / ASHRAE 90.1</strong> prescriptive assembly U-factor requirements across Climate Zones 1 through 6, cutting conductive wall heat loss by <strong>48%</strong> compared to the cavity-only assembly. For vapor diffusion and Glaser condensation calculations across these assemblies, see our <Link href="/guides/psychrometrics-building-envelope-physics" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>Psychrometrics &amp; Building Envelope Physics Master Guide</Link>.</li>
            </ol>
          </div>
        </div>
      }
    />
  );
}
