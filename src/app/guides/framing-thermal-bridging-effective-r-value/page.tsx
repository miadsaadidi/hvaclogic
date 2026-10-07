import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = {
  title: "Framing Thermal Bridging & Effective R-Value: Engineering Reference Guide",
  description:
    "Technical guide to building envelope thermal bridging, parallel-path heat transfer, cold-formed steel effective cavity values, and assembly U-factor calculations.",
  keywords: [
    "thermal bridging",
    "effective R-value",
    "whole-wall R-value",
    "assembly U-factor",
    "framing factor",
    "cold-formed steel framing",
    "wood framing",
    "parallel-path method",
    "continuous insulation",
    "thermal bridge",
    "building envelope",
    "ASHRAE 90.1 Appendix A",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/guides/framing-thermal-bridging-effective-r-value`,
  },
  openGraph: {
    title: "Framing Thermal Bridging & Effective R-Value: Engineering Reference Guide",
    description:
      "Technical guide to building envelope thermal bridging, parallel-path heat transfer, cold-formed steel effective cavity values, and assembly U-factor calculations.",
    url: `${siteConfig.canonicalDomain}/guides/framing-thermal-bridging-effective-r-value`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Framing Thermal Bridging & Effective R-Value Guide",
    description:
      "Technical guide to building envelope thermal bridging, parallel-path heat transfer, and assembly U-factor calculations.",
  },
};

export default function FramingThermalBridgingGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Building Envelope Thermal Bridging & Effective Assembly U-Factor Guide",
    description:
      "Technical guide to parallel-path heat transfer, cold-formed steel effective cavity values, continuous exterior insulation, and assembly U-factor calculations referencing ASHRAE 90.1 Appendix A methods.",
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
            ASHRAE 90.1 Appendix A Methods
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
            Assembly U-Factor Modeling
          </span>
        </div>
        <h1 style={{ fontSize: "2.1rem", fontWeight: 800, lineHeight: 1.25, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Building Envelope Thermal Bridging &amp; Effective Assembly U-Factor
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
          How repetitive structural framing penetrates cavity insulation layers, reduces clear-wall thermal resistance by up to ~69% in cold-formed steel, and how to calculate whole-wall assembly U-factors using simplified parallel-path and ASHRAE-referenced methods.
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
          In architectural specifications, building envelopes are frequently described by their <em>nominal</em> insulation ratings—such as &quot;R-13 cavity batt&quot; or &quot;R-19 fiberglass.&quot; However, nominal insulation values represent the thermal resistance of the uncompressed insulation material itself under standardized product rating conditions.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          In a physical building wall, the insulation layer is repeatedly interrupted by structural members: vertical studs, bottom sill plates, top double plates, structural headers over window openings, and corner framing clusters. Because heat follows the path of least thermal resistance, structural framing acts as a thermal conduit—a <strong>thermal bridge</strong>—conducting heat around the adjacent cavity insulation.
        </p>
      </section>

      {/* SECTION 2: CALCULATION MODELS */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          2. Calculation Models: Wood vs. Cold-Formed Steel Framing
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1.5rem" }}>
          Because wood and steel have substantially different thermal conductivities, calculation methods differ. Wood framing is commonly approximated using a simplified parallel-path (isothermal planes) model, while cold-formed steel (CFS) assemblies require source-specific effective cavity values (such as ASHRAE 90.1 Table A9.2-1) or detailed 2D/3D modeling due to steel&apos;s high thermal conductivity:
        </p>

        <FormulaCard
          title="Parallel-Path Isothermal Planes Method (Wood Framing)"
          formula="U_{\text{wood}} = \frac{f_{\text{framing}}}{R_{\text{framing\_path}}} + \frac{f_{\text{cavity}}}{R_{\text{cavity\_path}}} \quad | \quad R_{\text{effective}} = \frac{1}{U_{\text{wood}}}"
          variables={[
            { symbol: "f_{\\text{framing}}", label: "Framing Area Fraction", description: "Illustrative reference assumptions: ~0.25 (25%) for 16\" O.C.; ~0.22 (22%) for 24\" O.C. (varies with framing layout)", unit: "decimal" },
            { symbol: "f_{\\text{cavity}}", label: "Cavity Area Fraction", description: "Illustrative reference assumptions: ~0.75 (75%) for 16\" O.C.; ~0.78 (78%) for 24\" O.C.", unit: "decimal" },
            { symbol: "R_{\\text{framing\_path}}", label: "Framing Path Resistance", description: "R_continuous_layers + (Depth_inches × R_per_inch_wood, e.g. ~1.25 reference value for softwood)", unit: "hr·ft²·°F/Btu" },
            { symbol: "R_{\\text{cavity\_path}}", label: "Cavity Path Resistance", description: "R_continuous_layers + R_cavity_insulation_nominal", unit: "hr·ft²·°F/Btu" },
          ]}
          notes="Simplified parallel-path model for dimensional lumber framing. Actual framing fraction varies with stud spacing, stud dimensions, plates, corners, headers, openings, intersections, and advanced framing details."
          sourceStandard="ASHRAE Handbook of Fundamentals & ASHRAE 90.1 Section A3.1"
        />

        <div style={{ marginTop: "1.5rem" }}>
          <FormulaCard
            title="ASHRAE 90.1 Effective Cavity Method (Cold-Formed Steel Framing)"
            formula="U_{\text{steel}} = \frac{1}{R_{\text{continuous}} + R_{\text{eff,cavity}}} \quad | \quad R_{\text{effective}} = R_{\text{continuous}} + R_{\text{eff,cavity}}"
            variables={[
              { symbol: "R_{\\text{eff,cavity}}", label: "Effective Cavity R-Value", description: "Empirically calibrated effective thermal resistance of steel stud + cavity insulation (e.g. ASHRAE 90.1 Table A9.2-1)", unit: "hr·ft²·°F/Btu" },
              { symbol: "R_{\\text{continuous}}", label: "Continuous Layers Resistance", description: "Series sum of unbridged continuous layers: air films, gypsum, continuous insulation (ci), sheathing, and claddings", unit: "hr·ft²·°F/Btu" },
              { symbol: "U_{\\text{steel}}", label: "Overall Steel Wall U-Factor", description: "Calculated overall thermal transmittance of cold-formed steel assembly", unit: "BTU/hr·ft²·°F" },
            ]}
            notes="Because cold-formed steel has high thermal conductivity, simple 1D parallel path does not capture 2D flange-to-web thermal bridging. Sourced to ANSI/ASHRAE/IES Standard 90.1-2022 Table A9.2-1."
            sourceStandard="ANSI/ASHRAE/IES Standard 90.1-2022 Table A9.2-1 & Section A3.3"
          />
        </div>
      </section>

      {/* SECTION 3: ASHRAE TABLE A9.2-1 MATRIX */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          3. Cold-Formed Steel Effective Cavity Derating Matrix (ASHRAE 90.1 Reference)
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          The table below illustrates the effective cavity thermal resistance values published in <strong>ANSI/ASHRAE/IES Standard 90.1-2022 Normative Appendix A (Table A9.2-1)</strong> for cold-formed steel stud walls:
        </p>

        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Nominal Stud Depth</th>
                <th scope="col">Stud Spacing</th>
                <th scope="col">Nominal Cavity R</th>
                <th scope="col">Effective Cavity R (Table A9.2-1)</th>
                <th scope="col">Thermal Bridging Reduction (%)</th>
                <th scope="col">Effective Retention (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>3.5 in. depth</strong></td>
                <td>16 in. O.C.</td>
                <td>R-11</td>
                <td><strong>R-5.5</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-50.0%</td>
                <td>50.0%</td>
              </tr>
              <tr>
                <td><strong>3.5 in. depth</strong></td>
                <td>16 in. O.C.</td>
                <td>R-13</td>
                <td><strong>R-6.0</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-53.8%</td>
                <td>46.2%</td>
              </tr>
              <tr>
                <td><strong>3.5 in. depth</strong></td>
                <td>16 in. O.C.</td>
                <td>R-15</td>
                <td><strong>R-6.4</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-57.3%</td>
                <td>42.7%</td>
              </tr>
              <tr>
                <td><strong>3.5 in. depth</strong></td>
                <td>24 in. O.C.</td>
                <td>R-13</td>
                <td><strong>R-7.2</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-44.6%</td>
                <td>55.4%</td>
              </tr>
              <tr>
                <td><strong>6.0 in. depth</strong></td>
                <td>16 in. O.C.</td>
                <td>R-19</td>
                <td><strong>R-7.1</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-62.6%</td>
                <td>37.4%</td>
              </tr>
              <tr>
                <td><strong>6.0 in. depth</strong></td>
                <td>16 in. O.C.</td>
                <td>R-21</td>
                <td><strong>R-7.4</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-64.8%</td>
                <td>35.2%</td>
              </tr>
              <tr>
                <td><strong>6.0 in. depth</strong></td>
                <td>24 in. O.C.</td>
                <td>R-19</td>
                <td><strong>R-8.6</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-54.7%</td>
                <td>45.3%</td>
              </tr>
              <tr>
                <td><strong>8.0 in. depth</strong></td>
                <td>16 in. O.C.</td>
                <td>R-25</td>
                <td><strong>R-7.8</strong></td>
                <td style={{ color: "var(--accent-danger)" }}>-68.8%</td>
                <td>31.2%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginTop: "0.75rem", fontStyle: "italic" }}>
          Analytical note: In steel stud walls without continuous exterior insulation, increasing cavity insulation depth yields diminishing thermal returns because the conductive steel studs bypass a large fraction of the heat flow.
        </p>
      </section>

      {/* SECTION 4: THE CONTINUOUS INSULATION STRATEGY */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          4. Continuous Exterior Insulation (ci) Strategies
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          A common and effective strategy to mitigate framing thermal bridging in steel and wood framing is <strong>Continuous Exterior Insulation (ci)</strong>. ASHRAE 90.1 defines continuous insulation as <em>&quot;insulation that is continuous across all structural members without thermal bridges other than fasteners and service openings.&quot;</em>
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          Continuous exterior insulation substantially reduces the thermal-bridging effect of framing by providing an unbroken thermal barrier across stud edges. In addition to reducing conductive heat loss, continuous insulation elevates the temperature of cavity framing and sheathing during cold weather, potentially reducing interstitial condensation risk under appropriate hygrothermal conditions. Minor thermal bridges can still occur at fasteners, clips, shelf angles, and window returns.
        </p>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.25rem", marginTop: "1.5rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Common Continuous Insulation Material Classes
          </h3>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, margin: 0 }}>
            <li>
              <strong>Extruded Polystyrene (XPS):</strong> Typical nominal R-5.0 per inch (varies by product and temperature). High compressive strength and moisture resistance.
            </li>
            <li>
              <strong>Polyisocyanurate (Polyiso):</strong> Typical nominal R-6.0 to R-6.5 per inch at standard mean test temperatures. Commonly used with foil or coated glass facers.
            </li>
            <li>
              <strong>Expanded Polystyrene (EPS):</strong> Typical nominal R-3.85 to R-4.2 per inch depending on density. Vapor-permeable rigid board.
            </li>
            <li>
              <strong>Rigid Mineral Wool Board:</strong> Typical nominal R-4.0 to R-4.2 per inch. Non-combustible, vapor-permeable exterior continuous insulation.
            </li>
          </ul>
          <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "0.75rem", marginBottom: 0 }}>
            <em>Note:</em> Actual thermal resistance per inch varies by manufacturer, product density, thickness, temperature, facer type, and testing/rating standard.
          </p>
        </div>
      </section>

      {/* SECTION 5: WORKED CALCULATION SCENARIO */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          5. Worked Calculation Example (Hypothetical Scenario)
        </h2>
        <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.5rem" }}>
          <p style={{ fontWeight: 600, color: "var(--ink)", marginBottom: "0.75rem" }}>
            Scenario: Calculate the whole-wall assembly U-factor for an exterior wall assembly and compare it with an illustrative target criterion of U &le; 0.064 BTU/hr·ft²·°F using the following assumed layer properties:
          </p>
          <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
            <li>6.0 in. cold-formed steel studs at 16 in. O.C.</li>
            <li>R-19 cavity batt (effective cavity resistance R_eff,cavity = R-7.1 per ASHRAE 90.1 Table A9.2-1)</li>
            <li>1.5 in. continuous exterior polyiso sheathing (assumed R-9.0 ci)</li>
            <li>1/2 in. interior gypsum board (assumed R-0.45)</li>
            <li>7/16 in. OSB sheathing (assumed R-0.62)</li>
            <li>Exterior vinyl siding (assumed R-0.60)</li>
            <li>Surface air films: Indoor air film (assumed R-0.68) + Outdoor air film (assumed R-0.17) = Combined R-0.85</li>
          </ul>

          <h4 style={{ color: "var(--accent-primary)", margin: "1rem 0 0.5rem", fontWeight: 700 }}>Step-by-Step Calculation:</h4>
          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, margin: 0 }}>
            <li><strong>Derive Base Continuous Resistance:</strong> R_base = 0.85 (air films) + 0.45 (gypsum) + 0.62 (OSB) + 0.60 (siding) = <strong>R-2.52 hr·ft²·°F/BTU</strong>.</li>
            <li><strong>Add Continuous Exterior Insulation:</strong> R_ci = <strong>R-9.0 hr·ft²·°F/BTU</strong>.</li>
            <li><strong>Incorporate Bridged Cavity Resistance:</strong> Per ASHRAE 90.1 Table A9.2-1, 6.0 in. steel @ 16 in. O.C. with nominal R-19 yields: <strong>R_eff,cavity = R-7.1 hr·ft²·°F/BTU</strong>.</li>
            <li><strong>Calculate Whole-Assembly Effective R-Value:</strong> R_total = 2.52 + 9.0 + 7.1 = <strong>R-18.62 hr·ft²·°F/BTU</strong>.</li>
            <li><strong>Calculate Assembly U-Factor:</strong> U_assembly = 1 / 18.62 = <strong>0.0537 &approx; 0.054 BTU/hr·ft²·°F</strong>.</li>
            <li><strong>Comparison Note:</strong> The calculated assembly U-factor is approximately 0.054 BTU/hr·ft²·°F, which is below the stated comparison value of 0.064 under the assumptions used in this example. Actual code compliance depends on the applicable code edition, building occupancy/use, climate zone, assembly category, exceptions, and permitted compliance paths.</li>
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

      {/* REGULATORY & ENGINEERING DISCLAIMER */}
      <Disclaimer />
    </article>
  );
}
