import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

export const metadata: Metadata = {
  title: "Framing Thermal Bridging & Effective R-Value: ASHRAE 90.1 Engineering Guide",
  description:
    "Engineering guide to building envelope thermal bridging, parallel-path heat transfer, and ASHRAE 90.1 Appendix A effective cavity deratings for wood and steel stud walls.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/guides/framing-thermal-bridging-effective-r-value`,
  },
  openGraph: {
    title: "Framing Thermal Bridging & Effective R-Value: ASHRAE 90.1 Engineering Guide",
    description:
      "Engineering guide to building envelope thermal bridging, parallel-path heat transfer, and ASHRAE 90.1 Appendix A effective cavity deratings for wood and steel stud walls.",
    url: `${siteConfig.canonicalDomain}/guides/framing-thermal-bridging-effective-r-value`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Framing Thermal Bridging & Effective R-Value: ASHRAE 90.1 Engineering Guide",
    description:
      "Engineering guide to building envelope thermal bridging, parallel-path heat transfer, and ASHRAE 90.1 Appendix A effective cavity deratings for wood and steel stud walls.",
  },
};

export default function FramingThermalBridgingGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Building Envelope Thermal Bridging & Effective Assembly U-Factor Engineering Guide",
    description:
      "Comprehensive engineering guide to parallel-path heat transfer, cold-formed steel framing deratings, and continuous exterior insulation (ci) per ASHRAE 90.1 Normative Appendix A and IECC.",
    url: `${siteConfig.canonicalDomain}/guides/framing-thermal-bridging-effective-r-value`,
    author: {
      "@type": "Organization",
      name: "HVACLogic Engineering Group",
      url: siteConfig.canonicalDomain,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.canonicalDomain,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.canonicalDomain}/icon.svg`,
      },
    },
    datePublished: "2026-09-18T00:00:00.000Z",
    dateModified: "2026-09-18T00:00:00.000Z",
  };

  return (
    <article style={{ maxWidth: "860px", margin: "0 auto", padding: "2rem 1rem", color: "var(--ink)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "1.5rem" }}>
        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
        <span style={{ margin: "0 0.5rem" }}>/</span>
        <Link href="/guides" style={{ color: "inherit", textDecoration: "none" }}>Guides</Link>
        <span style={{ margin: "0 0.5rem" }}>/</span>
        <span style={{ color: "var(--ink)" }}>Thermal Bridging &amp; Effective R-Value</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
            Building Science
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
            ASHRAE 90.1 Normative Appendix A
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
            IECC 2024 / 2021
          </span>
        </div>
        <h1 style={{ fontSize: "2.1rem", fontWeight: 800, lineHeight: 1.25, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Building Envelope Thermal Bridging &amp; Effective Assembly U-Factor
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
          How repetitive structural framing penetrates insulation layers, degrades nominal R-values by up to 64%, and how to calculate code-compliant whole-wall assembly U-factors using ASHRAE 90.1 Normative Appendix A.
        </p>
      </header>

      {/* Quick Navigation Callout */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderLeft: "4px solid var(--accent-primary)",
          borderRadius: "0.5rem",
          padding: "1rem 1.25rem",
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Interactive Calculation Tool Available</div>
          <div style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
            Model custom wood and steel stud assemblies with continuous exterior insulation.
          </div>
        </div>
        <Link
          href="/calculators/effective-r-value-calculator"
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.85rem",
            fontWeight: 700,
            background: "var(--accent-primary)",
            color: "#ffffff",
            borderRadius: "0.375rem",
            textDecoration: "none",
          }}
        >
          Open Effective R-Value Calculator →
        </Link>
      </div>

      <HvacFlowDiagram category="building-science" />

      {/* SECTION 1: THE THERMAL BRIDGING PROBLEM */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          1. The Physics of Framing Thermal Bridging
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          In architectural specifications, building envelopes are frequently described by their <em>nominal</em> insulation ratings—such as "R-13 cavity batt" or "R-19 fiberglass." However, nominal insulation values only represent the thermal resistance of the insulation material itself measured under uniform 1D laboratory conditions (ASTM C518).
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          In a physical building wall, the insulation layer is repeatedly interrupted by structural members: vertical studs, bottom sill plates, top double plates, structural headers over window openings, and corner framing clusters. Because heat follows the path of least thermal resistance (maximum thermal conductivity), structural framing acts as a thermal conduit—a <strong>thermal bridge</strong>—short-circuiting the adjacent insulation.
        </p>
      </section>

      {/* SECTION 2: GOVERNING EQUATIONS */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          2. Governing Mathematical Models: Wood vs. Cold-Formed Steel
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1.5rem" }}>
          Because wood and steel possess fundamentally different thermal conductivity coefficients, building codes and ASHRAE standards mandate distinct mathematical methods for each material:
        </p>

        <FormulaCard
          title="Parallel-Path Isothermal Planes Method (Wood Framing)"
          formula="U_{\text{wood}} = \frac{f_{\text{framing}}}{R_{\text{framing\_path}}} + \frac{f_{\text{cavity}}}{R_{\text{cavity\_path}}} \quad | \quad R_{\text{effective}} = \frac{1}{U_{\text{wood}}}"
          variables={[
            { symbol: "f_{\\text{framing}}", label: "Framing Area Fraction", description: "Standard default: 0.25 (25%) for 16\" O.C.; 0.22 (22%) for 24\" O.C. advanced framing", unit: "decimal" },
            { symbol: "f_{\\text{cavity}}", label: "Cavity Area Fraction", description: "Standard default: 0.75 (75%) for 16\" O.C.; 0.78 (78%) for 24\" O.C.", unit: "decimal" },
            { symbol: "R_{\\text{framing\_path}}", label: "Framing Path Resistance", description: "R_continuous_layers + Depth_inches × 1.25 hr·ft²·°F/BTU (Softwood lumber)", unit: "R-value" },
            { symbol: "R_{\\text{cavity\_path}}", label: "Cavity Path Resistance", description: "R_continuous_layers + R_cavity_insulation_nominal", unit: "R-value" },
          ]}
          notes="Applicable to dimensional lumber framing where lateral heat flow through the wood member is moderate. Sourced to ASHRAE Handbook—Fundamentals 2021 Chapter 25 and ASHRAE 90.1 Section A3.1."
          sourceStandard="ANSI/ASHRAE/IES Standard 90.1-2022 Section A3.1"
        />

        <div style={{ marginTop: "1.5rem" }}>
          <FormulaCard
            title="ASHRAE 90.1 Normative Effective Cavity Method (Steel Framing)"
            formula="U_{\text{steel}} = \frac{1}{R_{\text{continuous}} + R_{\text{eff,cavity}}} \quad | \quad R_{\text{effective}} = R_{\text{continuous}} + R_{\text{eff,cavity}}"
            variables={[
              { symbol: "R_{\\text{eff,cavity}}", label: "Effective Cavity R-Value", description: "Empirically calibrated thermal resistance of steel stud + cavity insulation (Table A9.2-1)", unit: "R-value" },
              { symbol: "R_{\\text{continuous}}", label: "Continuous Unbridged Layers", description: "Series sum of interior air film, gypsum, continuous insulation (ci), sheathing, siding, and exterior air film", unit: "R-value" },
              { symbol: "U_{\\text{steel}}", label: "Overall Steel Wall U-Factor", description: "Overall thermal transmittance of cold-formed steel assembly", unit: "BTU/hr·ft²·°F" },
            ]}
            notes="Because steel thermal conductivity is approximately 314 BTU·in/hr·ft²·°F (~400× wood), simple 1D parallel path fails to capture 2D flange-to-web thermal bridging. ASHRAE 90.1 Appendix A mandates Table A9.2-1 lookup values."
            sourceStandard="ANSI/ASHRAE/IES Standard 90.1-2022 Table A9.2-1 & Section A3.3"
          />
        </div>
      </section>

      {/* SECTION 3: ASHRAE TABLE A9.2-1 MATRIX */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          3. Cold-Formed Steel Effective Cavity Derating Matrix
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          The table below demonstrates the severe thermal bridging penalties published in <strong>ANSI/ASHRAE/IES Standard 90.1-2022 Normative Appendix A (Table A9.2-1)</strong>:
        </p>

        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Stud Depth</th>
                <th scope="col">Stud Spacing</th>
                <th scope="col">Nominal Cavity R</th>
                <th scope="col">Effective Cavity R</th>
                <th scope="col">Thermal Bridging Loss (%)</th>
                <th scope="col">Effective Retention (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>3.5" (2x4)</strong></td>
                <td>16" O.C.</td>
                <td>R-11</td>
                <td><strong>R-5.5</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-50.0%</td>
                <td>50.0%</td>
              </tr>
              <tr>
                <td><strong>3.5" (2x4)</strong></td>
                <td>16" O.C.</td>
                <td>R-13</td>
                <td><strong>R-6.0</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-53.8%</td>
                <td>46.2%</td>
              </tr>
              <tr>
                <td><strong>3.5" (2x4)</strong></td>
                <td>16" O.C.</td>
                <td>R-15</td>
                <td><strong>R-6.4</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-57.3%</td>
                <td>42.7%</td>
              </tr>
              <tr>
                <td><strong>3.5" (2x4)</strong></td>
                <td>24" O.C.</td>
                <td>R-13</td>
                <td><strong>R-7.2</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-44.6%</td>
                <td>55.4%</td>
              </tr>
              <tr>
                <td><strong>6.0" (2x6)</strong></td>
                <td>16" O.C.</td>
                <td>R-19</td>
                <td><strong>R-7.1</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-62.6%</td>
                <td>37.4%</td>
              </tr>
              <tr>
                <td><strong>6.0" (2x6)</strong></td>
                <td>16" O.C.</td>
                <td>R-21</td>
                <td><strong>R-7.4</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-64.8%</td>
                <td>35.2%</td>
              </tr>
              <tr>
                <td><strong>6.0" (2x6)</strong></td>
                <td>24" O.C.</td>
                <td>R-19</td>
                <td><strong>R-8.6</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-54.7%</td>
                <td>45.3%</td>
              </tr>
              <tr>
                <td><strong>8.0" (2x8)</strong></td>
                <td>16" O.C.</td>
                <td>R-25</td>
                <td><strong>R-7.8</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-68.8%</td>
                <td>31.2%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginTop: "0.75rem", fontStyle: "italic" }}>
          Key takeaway: Adding thicker cavity insulation into a steel stud wall produces rapidly diminishing returns. Increasing cavity batt thickness from R-11 to R-15 in a 3.5" steel stud at 16" O.C. increases effective cavity performance by only 0.9 R-value (from R-5.5 to R-6.4).
        </p>
      </section>

      {/* SECTION 4: THE CONTINUOUS INSULATION SOLUTION */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          4. The Engineering Solution: Continuous Exterior Insulation (ci)
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          The only cost-effective engineering mechanism to mitigate framing thermal bridging in steel (and high-performance wood) construction is <strong>Continuous Exterior Insulation (ci)</strong>. Defined by ASHRAE 90.1 as <em>"insulation that is continuous across all structural members without thermal bridges other than fasteners and service openings,"</em> continuous insulation is placed on the exterior face of the framing.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          Because the continuous layer is not penetrated by stud webs or flanges, 100% of its rated thermal resistance is added directly to the assembly. In addition to reducing conductive heat loss, continuous insulation keeps the structural cavity warm during winter, raising interior stud flange temperatures and preventing moisture condensation inside the wall cavity.
        </p>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", marginTop: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Common Continuous Insulation Material Classes (ASTM Specifications)
          </h3>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, margin: 0 }}>
            <li>
              <strong>Extruded Polystyrene (XPS - ASTM C578):</strong> R-5.0 per inch. High compressive strength and moisture resistance, commonly used behind claddings and below-grade.
            </li>
            <li>
              <strong>Polyisocyanurate (Polyiso - ASTM C1289):</strong> R-6.0 to R-6.5 per inch. Highest nominal R-value per inch of rigid foam, typically manufactured with reflective foil or glass facers.
            </li>
            <li>
              <strong>Expanded Polystyrene (EPS - ASTM C578):</strong> R-3.85 to R-4.2 per inch. Vapor-permeable and cost-effective rigid board.
            </li>
            <li>
              <strong>Rigid Mineral Wool Board (ASTM C612):</strong> R-4.0 to R-4.2 per inch. Non-combustible, vapor-permeable, and fire-rated exterior continuous thermal break.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 5: WORKED SIZING SCENARIO */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          5. Worked Engineering Sizing Scenario
        </h2>
        <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.5rem" }}>
          <p style={{ fontWeight: 600, color: "var(--ink)", marginBottom: "0.75rem" }}>
            Problem: Verify whether a commercial building in Climate Zone 5 (Chicago, IL) meets the IECC 2024 / ASHRAE 90.1 maximum assembly U-factor of U &le; 0.064 BTU/hr·ft²·°F using:
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
            <li>6-inch cold-formed steel studs at 16 inches O.C.</li>
            <li>R-19 fiberglass batt in cavity</li>
            <li>1.5 inches of continuous exterior polyiso (ci) sheathing (R-9.0 ci)</li>
            <li>1/2" interior drywall (R-0.45) + 7/16" OSB (R-0.62) + vinyl siding (R-0.60) + interior/exterior air films (R-0.85)</li>
          </ul>

          <h4 style={{ color: "var(--accent-primary)", margin: "1rem 0 0.5rem", fontWeight: 700 }}>Step-by-Step Derivation:</h4>
          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, margin: 0 }}>
            <li><strong>Derive Base Continuous Resistance:</strong> R_base = 0.85 (air films) + 0.45 (gypsum) + 0.62 (OSB) + 0.60 (siding) = <strong>R-2.52</strong>.</li>
            <li><strong>Derive Continuous Exterior Insulation:</strong> 1.5 in &times; 6.0 R/in = <strong>R-9.0 ci</strong>.</li>
            <li><strong>Look up Bridged Cavity Resistance:</strong> Per ASHRAE 90.1 Table A9.2-1, 6" steel @ 16" O.C. with nominal R-19 yields: <strong>R_eff_cavity = R-7.1</strong>.</li>
            <li><strong>Calculate Whole-Wall Effective R-Value:</strong> R_total = 2.52 + 9.0 + 7.1 = <strong>R-18.62 hr·ft²·°F/BTU</strong>.</li>
            <li><strong>Calculate Whole-Wall U-Factor:</strong> U_assembly = 1 / 18.62 = <strong>0.0537 &approx; 0.054 BTU/hr·ft²·°F</strong>.</li>
            <li><strong>Compliance Assessment:</strong> Because 0.054 &le; 0.064, the wall assembly <strong>comfortably complies</strong> with IECC 2024 Table C402.1.4 and ASHRAE 90.1-2022.</li>
          </ol>
        </div>
      </section>

      {/* SECTION 6: COMPANION TOOLS & REFERENCES */}
      <footer style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-color)" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Related Calculation Engines &amp; Engineering Research
        </h3>
        <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7 }}>
          <li>
            Calculate custom wall assemblies: <Link href="/calculators/effective-r-value-calculator" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Effective R-Value &amp; Thermal Bridging Calculator</Link>
          </li>
          <li>
            Research monograph &amp; framing factor matrix: <Link href="/research/cold-formed-steel-framing-thermal-factors" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>ASHRAE 90.1 Cold-Formed Steel Framing Factors &amp; Cavity Deratings Monograph</Link>
          </li>
          <li>
            Build 1D homogeneous layer stacks: <Link href="/calculators/r-value-calculator" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Insulation R-Value &amp; U-Factor Calculator</Link>
          </li>
          <li>
            Calculate envelope transmission loads: <Link href="/calculators/heat-loss-calculator" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>Building Heat Loss &amp; Infiltration Sizer</Link>
          </li>
          <li>
            Climatic design conditions: <Link href="/ashrae-climatic-data" style={{ color: "var(--accent-primary)", textDecoration: "underline" }}>ASHRAE Climatic Design Weather Database</Link>
          </li>
        </ul>
      </footer>
    </article>
  );
}
