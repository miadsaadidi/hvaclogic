import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { CodeFormulaBlock } from "@/components/seo/CodeFormulaBlock";
import { CitationExportButton } from "@/components/seo/CitationExportButton";

export const metadata: Metadata = {
  title: "Engineering Calculation Methodology & Physical Models",
  description:
    "Technical documentation of HVACLogic calculation engines: fluid mechanics, ASHRAE/ACCA thermal load models, building science, and thermophysical property baselines.",
  keywords: [
    "HVAC calculation methodology",
    "duct sizing equations",
    "ASHRAE equal friction",
    "Huebscher formula",
    "Manual J load calculation",
    "building heat loss model",
    "refrigerant property calculation",
    "psychrometric formulations",
    "HVAC engineering models",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/methodology`,
  },
  openGraph: {
    title: "Engineering Calculation Methodology & Physical Models",
    description:
      "Technical documentation of HVACLogic calculation engines: fluid mechanics, ASHRAE/ACCA thermal load models, building science, and thermophysical property baselines.",
    url: `${siteConfig.canonicalDomain}/methodology`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVACLogic Engineering Methodology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Calculation Methodology & Physical Models",
    description:
      "Technical documentation of HVACLogic calculation engines: fluid mechanics, ASHRAE/ACCA thermal load models, building science, and thermophysical property baselines.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function MethodologyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${siteConfig.canonicalDomain}/methodology/#techarticle`,
    headline: "HVAC Engineering Calculation Methodology & Physical Models",
    description:
      "Technical documentation of browser-based HVAC calculation engines, equations, standards references, and physical property baselines.",
    url: `${siteConfig.canonicalDomain}/methodology`,
    author: {
      "@type": "Organization",
      name: "HVACLogic Engineering Working Group",
      url: siteConfig.canonicalDomain,
    },
    publisher: {
      "@type": "Organization",
      name: "HVACLogic",
      url: siteConfig.canonicalDomain,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="site-container page" style={{ padding: "2.5rem 1.5rem" }}>
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>/</li>
            <li style={{ color: "var(--ink)" }} aria-current="page">Methodology</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <header style={{ marginBottom: "3rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              background: "rgba(0, 210, 255, 0.12)",
              border: "1px solid rgba(0, 210, 255, 0.3)",
              color: "var(--accent-cooling)",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "0.75rem",
            }}
          >
            <span>📐</span>
            <span>Mathematical &amp; Physical Models</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 1rem" }}>
            Engineering Calculation Methodology
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "800px" }}>
            HVACLogic implements reproducible browser-based calculation engines based on recognized engineering equations, ASHRAE and ACCA technical references, and published thermophysical property data.
          </p>
        </header>

        {/* Core Principles Grid */}
        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 1.25rem" }}>
            Core Engineering Principles
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
            <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #00d2ff" }}>
              <div style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>⚡</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>1. Deterministic &amp; Reproducible</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
                Given identical aerodynamic, thermal, and dimensional parameters, the calculation engines evaluate mathematical formulations deterministically directly in your browser with transparent input-output relationships.
              </p>
            </div>

            <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #38bdf8" }}>
              <div style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>🔬</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>2. Engineering References &amp; Standards</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
                Formulas cite recognized industry references (such as the ASHRAE Handbook of Fundamentals, ACCA technical manuals, and SMACNA guidelines) for specific physical equations and reference tables.
              </p>
            </div>

            <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #10b981" }}>
              <div style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>🛡️</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>3. Documented Assumptions &amp; Limits</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
                Empirical deratings, physical property bases, boundary limits, and screening assumptions (such as flexible duct sag models and zeotropic glide calculations) are explicitly defined.
              </p>
            </div>
          </div>
        </section>

        {/* Domain Methodology Breakdown */}
        <section style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginBottom: "3.5rem" }}>
          {/* Airflow & Duct Sizing */}
          <div style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.35rem" }}>🌀</span>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--accent-cooling)" }}>
                1. Airflow &amp; Duct Sizing Fluid Mechanics
              </h2>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
              The Digital Ductulator implements the standard ASHRAE equal-friction exponential formulation for galvanized sheet metal air ducts (absolute roughness &epsilon; &approx; 0.0003 ft under standard air density &rho; = 0.075 lb/ft&sup3;) and Huebscher&apos;s formula for equivalent rectangular dimensions:
            </p>

            <CodeFormulaBlock
              formula="D = ( (0.06855 * Q^1.9) / hf )^(1 / 5.02) | De = 1.30 * ( (a * b)^0.625 ) / ( (a + b)^0.25 )"
              title="ashrae_equal_friction_model.math"
              badge="ASHRAE FUNDAMENTALS CH. 21 / HUEBSCHER"
            />

            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, marginTop: "1rem", margin: 0 }}>
              Where <em>Q</em> is volumetric airflow (CFM), <em>h<sub>f</sub></em> is design friction loss rate (in. wg per 100 ft), <em>D</em> is equivalent round diameter (inches), and <em>a</em> and <em>b</em> are rectangular duct cross-sectional dimensions (inches). Flexible duct calculations incorporate empirical compression and sag derating factors referenced to{" "}
              <a
                href="https://technologyportal.ashrae.org/Report/Detail/583"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}
              >
                ASHRAE Research Project RP-1333
              </a>{" "}
              laboratory data (Culp et al., Texas A&amp;M ESL) across modeled 0%, 4%, 15%, and 30% compression scenarios.
            </p>
          </div>

          {/* Thermal Loads */}
          <div style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.35rem" }}>🏠</span>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--accent-primary)" }}>
                2. Building Thermal Loads &amp; Equipment Sizing Concepts
              </h2>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Building load screening models steady-state envelope conductive transmission (<em>q = U &times; A &times; &Delta;T</em>), fenestration solar heat gain (SHGC), air infiltration sensible losses, and internal occupant gains (modeled using screening baselines of 230 BTU/hr sensible and 200 BTU/hr latent per person, derived from ASHRAE Fundamentals Chapter 18 moderately active residential seated/standing benchmarks):
            </p>

            <CodeFormulaBlock
              formula="Q_sensible = 1.08 * CFM * (T_in_db - T_supply_db) | Q_latent = 4840 * CFM * (W_in - W_supply)"
              title="thermal_load_heat_transfer.math"
              badge="ASHRAE / ACCA MANUAL J CONCEPTS"
            />

            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, marginTop: "1rem", margin: 0 }}>
              Equipment capacity comparisons reference ACCA Manual S selection principles, illustrating recommended sizing bands (such as 90% to 115% of design total load for standard cooling systems and up to 125%–130% for heat pumps to moderate low-ambient heating deficits) to support adequate humidity control and avoid short-cycling.
            </p>
          </div>

          {/* Refrigerant Diagnostics */}
          <div style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.35rem" }}>🔧</span>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--accent-success)" }}>
                3. Refrigeration Thermodynamics &amp; A2L Temperature Glide
              </h2>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Refrigerant diagnostics reference thermophysical saturation property formulations based on NIST REFPROP models. For zeotropic blends such as <strong>R-454B</strong> (68.9% R-32 / 31.1% R-1234yf by mass) and <strong>R-407C</strong>, discrete bubble-point (liquid) and dew-point (vapor) states are evaluated to account for temperature glide (~1.5&deg;F to 2.7&deg;F):
            </p>

            <CodeFormulaBlock
              formula="Target_SH = (3 * T_in_wb - T_out_db - 80) / 2 | Actual_SC = T_bubble(P_liquid) - T_liquid_pipe"
              title="refrigerant_pt_glide_model.math"
              badge="FIELD DIAGNOSTICS / THERMOPHYSICAL DATA"
            />

            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, marginTop: "1rem", margin: 0 }}>
              In field diagnostic workflows, suction vapor superheat is evaluated against the saturated dew-point temperature at suction pressure, while liquid-line subcooling is evaluated against the saturated bubble-point temperature at liquid pressure. An initial 15-minute operating stabilization window is recommended as an HVACLogic diagnostic procedure to allow evaporator and condenser thermal equilibrium before recording service manifold pressures.
            </p>
          </div>
        </section>

        {/* Model and Standards Traceability Table */}
        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
            📐 Model &amp; Standards Traceability Matrix
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", marginBottom: "1.25rem" }}>
            Summary of mathematical formulations, reference publications, implemented calculation scopes, and baseline engineering assumptions across the HVACLogic suite:
          </p>

          <div className="scenario-table" style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th scope="col" style={{ minWidth: "160px" }}>Model / Domain</th>
                  <th scope="col" style={{ minWidth: "170px" }}>Reference Publication</th>
                  <th scope="col" style={{ minWidth: "140px" }}>Reference Basis</th>
                  <th scope="col" style={{ minWidth: "220px" }}>Implemented Scope</th>
                  <th scope="col" style={{ minWidth: "200px" }}>HVACLogic Assumptions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Duct Sizing (Round &amp; Rectangular)</strong></td>
                  <td>ASHRAE Handbook of Fundamentals</td>
                  <td>Chapter 21 / Huebscher</td>
                  <td>Equal-friction diameter and rectangular aspect-ratio equivalence</td>
                  <td>Standard air (&rho; = 0.075 lb/ft&sup3;), galvanized metal roughness (&epsilon; = 0.0003 ft)</td>
                </tr>
                <tr>
                  <td><strong>Duct Friction &amp; TEL</strong></td>
                  <td>ACCA Manual D</td>
                  <td>Appendix 3 Fitting Tables</td>
                  <td>Fitting equivalent length accumulation &amp; available static pressure (ASP)</td>
                  <td>Representative equivalent lengths for standard fitting archetypes</td>
                </tr>
                <tr>
                  <td><strong>Flexible Duct Derating</strong></td>
                  <td>ASHRAE RP-1333 / SMACNA</td>
                  <td>Texas A&amp;M ESL Lab Data</td>
                  <td>0%, 4%, 15%, and 30% sag and compression multiplier curves</td>
                  <td>Modeled friction multipliers (1.15&times; to 2.20&times;) under constant static pressure</td>
                </tr>
                <tr>
                  <td><strong>Conductive Heat Loss</strong></td>
                  <td>ASHRAE Fundamentals / IECC</td>
                  <td>Chapter 26 &amp; 27 / IECC Tables</td>
                  <td>1-D series thermal resistance (<em>R = &sum;R<sub>layer</sub></em>) &amp; parallel path</td>
                  <td>Standard boundary air film resistances; nominal insulation R-values</td>
                </tr>
                <tr>
                  <td><strong>Thermal Bridging</strong></td>
                  <td>ASHRAE 90.1 Appendix A</td>
                  <td>Table A9.2-1 &amp; A9.2-2</td>
                  <td>Cold-formed steel and wood stud framing effective cavity resistance</td>
                  <td>Prescriptive framing factors (16&quot; and 24&quot; on-center spacing)</td>
                </tr>
                <tr>
                  <td><strong>Residential Load Sizing</strong></td>
                  <td>ACCA Manual J / Manual S</td>
                  <td>8th Edition Principles</td>
                  <td>Screening estimates for sensible/latent cooling and heating loads</td>
                  <td>Regional climate factors; default internal gains (230 sensible / 200 latent BTU/hr/person)</td>
                </tr>
                <tr>
                  <td><strong>Refrigerant Saturation</strong></td>
                  <td>NIST REFPROP / ASHRAE 34</td>
                  <td>Thermophysical Database</td>
                  <td>Pressure-temperature saturation curves, bubble/dew points for zeotropic blends</td>
                  <td>Thermodynamic equilibrium; standard atmospheric pressure (14.696 psia)</td>
                </tr>
                <tr>
                  <td><strong>Superheat &amp; Subcooling</strong></td>
                  <td>Field Diagnostic Protocols</td>
                  <td>Industry Service Practice</td>
                  <td>Target superheat formula (fixed orifice) and TXV target subcooling evaluation</td>
                  <td>15-minute operating stabilization baseline before pressure acquisition</td>
                </tr>
                <tr>
                  <td><strong>Psychrometric Properties</strong></td>
                  <td>ASHRAE Fundamentals</td>
                  <td>Hyland-Wexler Formulations</td>
                  <td>Moist air enthalpy, wet bulb, dew point, humidity ratio, specific volume</td>
                  <td>Standard barometric pressure elevation compensation (-1,000 to 15,000 ft)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Academic Documentation & Open Technical Monograph */}
        <section style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.2)", borderLeft: "4px solid var(--accent-cooling)", marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>📚</span>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
              Technical Documentation &amp; Open Monograph
            </h2>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            The mathematical models and numerical algorithms powering HVACLogic are documented in an open technical preprint and engineering monograph:
          </p>
          <div style={{ background: "var(--surface)", padding: "1rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)", marginBottom: "1rem", fontFamily: "var(--font-mono, monospace)", fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
            <strong>Citation:</strong> HVACLogic Engineering Working Group (2026). <em>Deterministic Building Science and Thermodynamic Modeling Framework for Real-Time Field Diagnostics, Air Distribution, and Decarbonization Sizing</em>. Open Technical Monograph.
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem" }}>
            <a
              href="/papers/HVACLogic_Deterministic_Building_Science_Whitepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-cooling)", fontWeight: 600, textDecoration: "none" }}
            >
              <span>📄 Download Whitepaper PDF ↗</span>
            </a>
            <a
              href="https://archive.org/details/power-lab-deterministic-clean-energy-modeling-framework-2026_20260826"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-cooling)", fontWeight: 600, textDecoration: "none" }}
            >
              <span>🏛️ View on Internet Archive ↗</span>
            </a>
            <a
              href="https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-cooling)", fontWeight: 600, textDecoration: "none" }}
            >
              <span>🎓 View on Academia.edu ↗</span>
            </a>
            <CitationExportButton />
          </div>
        </section>

        {/* Internal Navigation Handoff */}
        <footer style={{ borderTop: "1px solid var(--border-color)", paddingTop: "2rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", fontSize: "0.9rem" }}>
          <Link href="/sources" style={{ fontWeight: 600 }}>View Laboratory Sources &amp; Standards →</Link>
          <Link href="/about" style={{ fontWeight: 600 }}>About HVACLogic →</Link>
          <Link href="/privacy" style={{ fontWeight: 600 }}>Privacy Policy →</Link>
        </footer>
      </div>
    </>
  );
}
