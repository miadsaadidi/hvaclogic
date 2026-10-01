import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

export const metadata: Metadata = {
  title: "A2L Refrigerant Transition & Charge Limit Principles: Engineering Guide",
  description:
    "Technical guide to lower-GWP A2L refrigerants (R-454B, R-32), safety classifications, charge-limit concepts under ASHRAE and UL standards, temperature glide, and field service principles.",
  keywords: [
    "A2L refrigerants",
    "R-454B",
    "R-32",
    "A2L refrigerant charge limits",
    "ASHRAE 15",
    "ASHRAE 34",
    "UL 60335-2-40",
    "refrigerant detection",
    "refrigerant temperature glide",
    "dew point bubble point",
    "A2L safety",
    "EPA AIM Act",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/guides/a2l-refrigerant-transition-guide`,
  },
  openGraph: {
    title: "A2L Refrigerant Transition & Charge Limit Principles: Engineering Guide",
    description:
      "Technical guide to lower-GWP A2L refrigerants (R-454B, R-32), safety classifications, charge-limit concepts under ASHRAE and UL standards, temperature glide, and field service principles.",
    url: `${siteConfig.canonicalDomain}/guides/a2l-refrigerant-transition-guide`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "A2L Refrigerant Transition & Charge Limit Guide",
    description:
      "Technical guide to A2L refrigerant properties, charge limit concepts, UL 60335-2-40 detection, and zeotropic temperature glide.",
  },
};

export default function A2LRefrigerantTransitionGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "A2L Refrigerant Transition & Charge Limit Principles: Engineering Guide",
    description:
      "Technical reference detailing lower-GWP A2L refrigerants (R-454B, R-32), safety classifications, charge limit concepts under ASHRAE 15/15.2 and UL 60335-2-40, and zeotropic temperature glide charging protocols.",
    url: `${siteConfig.canonicalDomain}/guides/a2l-refrigerant-transition-guide`,
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
    datePublished: "2026-09-24T00:00:00.000Z",
    dateModified: "2026-09-24T00:00:00.000Z",
    about: [
      { "@type": "Thing", name: "ANSI/ASHRAE Standard 15" },
      { "@type": "Thing", name: "ANSI/ASHRAE Standard 15.2" },
      { "@type": "Thing", name: "ANSI/ASHRAE Standard 34-2022" },
      { "@type": "Thing", name: "UL/CSA 60335-2-40" },
      { "@type": "Thing", name: "EPA AIM Act 40 CFR Part 84" },
      { "@type": "Thing", name: "R-454B Refrigerant" },
      { "@type": "Thing", name: "R-32 Refrigerant" },
    ],
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
        <span style={{ color: "var(--ink)" }}>A2L Refrigerant Transition &amp; Charge Limits</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
            Refrigerant Thermodynamics
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
            ASHRAE 15 / 15.2 Concepts
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
            UL/CSA 60335-2-40
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa" }}>
            EPA AIM Act Provisions
          </span>
        </div>
        <h1 style={{ fontSize: "2.1rem", fontWeight: 800, lineHeight: 1.25, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Low-GWP A2L Refrigerant Transition &amp; Charge Limit Principles
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
          A technical reference guide detailing lower-GWP A2L refrigerants (such as R-454B and R-32), safety classifications, charge-limit concepts under safety and product standards, and zeotropic temperature glide considerations.
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
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Interactive Sizing Tools &amp; Benchmark Data</div>
          <div style={{ fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
            Explore digital PT charts, superheat/subcooling calculations, and open research benchmark data.
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <Link
            href="/calculators/pt-chart"
            style={{
              padding: "0.45rem 0.85rem",
              fontSize: "0.82rem",
              fontWeight: 700,
              background: "var(--accent-primary)",
              color: "#ffffff",
              borderRadius: "0.375rem",
              textDecoration: "none",
            }}
          >
            Digital PT Chart →
          </Link>
          <Link
            href="/datasets/a2l-refrigerant-flammability-glide-benchmark"
            style={{
              padding: "0.45rem 0.85rem",
              fontSize: "0.82rem",
              fontWeight: 700,
              background: "rgba(255, 255, 255, 0.08)",
              color: "var(--ink)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.375rem",
              textDecoration: "none",
            }}
          >
            A2L Benchmark Dataset →
          </Link>
        </div>
      </div>

      <HvacFlowDiagram category="refrigeration" />

      {/* SECTION 1: THE REGULATORY LANDSCAPE & AIM ACT */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          1. The Regulatory Context: EPA AIM Act Technology Transitions
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          Under the American Innovation and Manufacturing (AIM) Act of 2020 and EPA regulations codified in 40 CFR Part 84 (Technology Transitions Rule), the United States Environmental Protection Agency has established phasedown schedules and sector-specific GWP limits for HFC refrigerants.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          For residential and light-commercial stationary air conditioning and heat pump equipment, the rule establishes a 700 GWP limit for newly manufactured or imported equipment according to sector-specific compliance dates. Transition provisions allow defined periods for installing existing inventory. Because legacy baseline refrigerant R-410A carries a 100-year GWP of 2,088 (IPCC AR4) / 1,924 (IPCC AR5), manufacturers are transitioning new equipment lines to lower-GWP alternatives.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          Across various equipment categories, major lower-GWP A2L refrigerants include:
        </p>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: 1.8, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          <li>
            <strong>R-454B:</strong> 100-year GWP of 466 (AR4). A zeotropic blend of 68.9% R-32 and 31.1% R-1234yf, adopted across many residential ducted split systems and packaged units.
          </li>
          <li>
            <strong>R-32:</strong> 100-year GWP of 675 (AR4). A single-component HFC, adopted widely in ductless mini-splits, multi-splits, and VRF equipment categories.
          </li>
        </ul>
      </section>

      {/* SECTION 2: ASHRAE 34 SAFETY CLASSIFICATION */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          2. ASHRAE Standard 34 Safety Classification &amp; Flammability Metrics
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          ANSI/ASHRAE Standard 34 establishes alphanumeric safety classifications for refrigerants based on toxicity (Class A or B) and flammability (Class 1, 2L, 2, or 3):
        </p>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: 1.8, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          <li><strong>Toxicity Class A (Lower Toxicity):</strong> Occupational Exposure Limit (OEL) &ge; 400 ppm (volume).</li>
          <li><strong>Flammability Class 1 (No Flame Propagation):</strong> No flame propagation under standard test conditions per ASTM E681 at 60°C and 101.3 kPa (e.g., R-410A, R-134a, R-22).</li>
          <li><strong>Flammability Class 2L (Lower Flammability):</strong> Exhibits flame propagation with a maximum laminar burning velocity ($S_u$) &le; 10 cm/s and heat of combustion ($HOC$) &lt; 19 MJ/kg.</li>
          <li><strong>Flammability Class 3 (Higher Flammability):</strong> Flammable hydrocarbons (e.g., R-290 propane) with lower LFL and higher burning velocity.</li>
        </ul>

        {/* COMPARISON TABLE */}
        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--border-color)" }}>
                <th style={{ padding: "0.75rem 0.5rem" }}>Refrigerant Designation</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>ASHRAE 34 Safety Group</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Composition (mass %)</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>100-Yr GWP (AR4 / AR5)</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>LFL (lb/ft³ reference)</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Burning Velocity ($S_u$)</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Approx. Glide (°F)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700, color: "var(--accent-primary)" }}>R-454B</td>
                <td style={{ padding: "0.65rem 0.5rem" }}><span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700 }}>A2L</span></td>
                <td style={{ padding: "0.65rem 0.5rem" }}>68.9% R-32 / 31.1% R-1234yf</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>466 / 531</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>~0.0189</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>~5.2 cm/s</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>~1.5°F–2.7°F</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700, color: "var(--accent-primary)" }}>R-32</td>
                <td style={{ padding: "0.65rem 0.5rem" }}><span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700 }}>A2L</span></td>
                <td style={{ padding: "0.65rem 0.5rem" }}>100% R-32 (Pure fluid)</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>675 / 677</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>~0.0192</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>~6.7 cm/s</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0.0°F</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700 }}>R-454A</td>
                <td style={{ padding: "0.65rem 0.5rem" }}><span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700 }}>A2L</span></td>
                <td style={{ padding: "0.65rem 0.5rem" }}>35% R-32 / 65% R-1234yf</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>239 / 238</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>~0.0174</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>~1.6 cm/s</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>~9.0°F</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700 }}>R-1234yf</td>
                <td style={{ padding: "0.65rem 0.5rem" }}><span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700 }}>A2L</span></td>
                <td style={{ padding: "0.65rem 0.5rem" }}>100% HFO-1234yf</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>&lt; 1</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>~0.0180</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>~1.5 cm/s</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0.0°F</td>
              </tr>
              <tr>
                <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700, color: "var(--ink-secondary)" }}>R-410A (Baseline)</td>
                <td style={{ padding: "0.65rem 0.5rem" }}><span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(100,116,139,0.15)", color: "#94a3b8", fontWeight: 700 }}>A1</span></td>
                <td style={{ padding: "0.65rem 0.5rem" }}>50% R-32 / 50% R-125</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>2,088 / 1,924</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>None</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0 cm/s</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>&lt; 0.3°F</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
          <em>Data Sources:</em> Safety classifications per ANSI/ASHRAE Standard 34. Thermophysical and glide data referenced from NIST REFPROP database models.
        </p>
      </section>

      {/* SECTION 3: CHARGE LIMITS & MITIGATION CONCEPTS */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          3. Charge Limits &amp; Mitigation Concepts (ASHRAE 15 / 15.2 &amp; UL 60335-2-40)
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1.5rem" }}>
          Because A2L refrigerants exhibit lower flammability, installation safety is governed by safety standards (such as ANSI/ASHRAE Standard 15 for commercial/general systems and ANSI/ASHRAE Standard 15.2 for residential systems) in conjunction with product safety listing standards (such as UL/CSA 60335-2-40) and applicable mechanical codes.
        </p>

        <FormulaCard
          title="Illustrative Unmitigated Charge Limit Concept"
          formula="m_{\text{unmitigated}} \approx \text{Safety Factor} \times \text{LFL} \times V_{\text{dispersal}}"
          variables={[
            { symbol: "m_{\\text{unmitigated}}", label: "Allowable Unmitigated Charge", description: "Charge limit below which passive dilution is considered sufficient without active mitigation under the specific standard", unit: "lb (or kg)" },
            { symbol: "\\text{LFL}", label: "Lower Flammability Limit", description: "Reference flammability limit per ASHRAE Standard 34", unit: "lb/ft³ (or kg/m³)" },
            { symbol: "V_{\\text{dispersal}}", label: "Effective Dispersal Volume", description: "Calculated volume based on room geometry, duct connections, and applicable standard provisions", unit: "cu ft (or m³)" },
          ]}
          notes="Illustrative conceptual formula. Actual charge limit calculations, safety factors, and room volume methodologies depend on the applicable standard (ASHRAE 15, ASHRAE 15.2, or UL/CSA 60335-2-40), system configuration, and equipment listing."
          sourceStandard="ASHRAE 15 / ASHRAE 15.2 & UL/CSA 60335-2-40 Principles"
        />

        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginTop: "2rem", marginBottom: "0.75rem" }}>
          Safety Standards &amp; Mitigation Architectures
        </h3>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          Depending on equipment listing, total system charge, and connected space volume, standards define different mitigation strategies:
        </p>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: 1.8, color: "var(--ink-secondary)" }}>
          <li>
            <strong>Passive Installation:</strong> Where the system charge is below the applicable unmitigated charge threshold for the space volume, natural room air dispersion is evaluated.
          </li>
          <li>
            <strong>Circulation Airflow Mitigation:</strong> For intermediate charge thresholds, standards and equipment listings may require continuous or leak-triggered air circulation to disperse potential refrigerant leaks. Airflow requirements and control sequences are specified by equipment listing and applicable standards.
          </li>
          <li>
            <strong>Refrigerant Detection Systems (RDS):</strong> When charges exceed higher thresholds, factory-integrated or listed field detection systems (commonly sensing at a threshold such as 25% LFL) may be required to initiate mitigation responses, such as shutting down compressor operation, isolating refrigerant circuits, or activating mechanical ventilation per the manufacturer&apos;s listing instructions.
          </li>
        </ul>
      </section>

      {/* SECTION 4: ZEOTROPIC GLIDE & CHARGING */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          4. Zeotropic Temperature Glide &amp; Service Protocols
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1.5rem" }}>
          Refrigerants are categorized as pure single-component fluids, near-azeotropic blends (with minimal glide), or zeotropic blends.
        </p>

        <FormulaCard
          title="Zeotropic Temperature Glide Relation"
          formula="\Delta T_{\text{glide}} = T_{\text{dew}}(P) - T_{\text{bubble}}(P)"
          variables={[
            { symbol: "\\Delta T_{\\text{glide}}", label: "Temperature Glide", description: "Temperature differential between saturated dew point and bubble point at a specified pressure P", unit: "°F" },
            { symbol: "T_{\\text{dew}}(P)", label: "Dew Point Temperature", description: "Temperature at which saturated vapor begins condensing at pressure P", unit: "°F" },
            { symbol: "T_{\\text{bubble}}(P)", label: "Bubble Point Temperature", description: "Temperature at which saturated liquid begins boiling at pressure P", unit: "°F" },
          ]}
          notes="Evaluated at a specified pressure using thermophysical property models (such as NIST REFPROP). Single-component fluids (R-32) exhibit 0.0°F glide; blends like R-454B exhibit approximately 1.5°F to 2.7°F glide depending on operating pressure."
          sourceStandard="NIST REFPROP Property Database Reference"
        />

        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginTop: "2rem", marginBottom: "0.75rem" }}>
          Liquid-Phase Charging Considerations &amp; Fractionation
        </h3>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          In zeotropic blends, components have different vapor-liquid equilibrium characteristics. Withdrawing vapor from a storage cylinder containing a zeotropic blend can alter the composition of the remaining liquid (fractionation). For this reason, manufacturers generally specify that zeotropic blends (such as R-454B) be charged in the <strong>liquid phase</strong>, throttling liquid through manifold gauges or charging adaptors according to manufacturer service instructions.
        </p>

        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Superheat and Subcooling Reference Conventions
        </h3>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          When evaluating operating conditions for zeotropic blends:
        </p>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: 1.8, color: "var(--ink-secondary)" }}>
          <li>
            <strong>Suction-Side Superheat:</strong> Evaluated using the saturated <strong>DEW POINT</strong> at the suction pressure:
            <div style={{ fontFamily: "monospace", padding: "0.4rem 0.6rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "4px", margin: "0.5rem 0", display: "inline-block" }}>
              Superheat = T_suction_pipe - T_dew(P_suction)
            </div>
          </li>
          <li>
            <strong>Liquid-Side Subcooling:</strong> Evaluated using the saturated <strong>BUBBLE POINT</strong> at the liquid pressure:
            <div style={{ fontFamily: "monospace", padding: "0.4rem 0.6rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "4px", margin: "0.5rem 0", display: "inline-block" }}>
              Subcooling = T_bubble(P_liquid) - T_liquid_pipe
            </div>
          </li>
        </ul>
      </section>

      {/* SECTION 5: FIELD SERVICE TOOLING & SAFETY GUIDANCE */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          5. Field Service Tooling &amp; Installation Safety Guidelines
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          Servicing A2L systems requires verifying that field service equipment is rated for use with mildly flammable refrigerants and that proper safety procedures are followed:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>🔧 Cylinder Fitting Compatibility</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
              A2L refrigerant cylinders in the North American market often utilize left-hand (LH) valve threads (such as CGA 164) to distinguish them from non-flammable cylinders. Verify fitting compatibility and utilize rated adapters where required.
            </p>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>⚡ Rated Recovery &amp; Vacuum Tools</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
              Recovery units, vacuum pumps, and electronic leak detectors must be rated by their manufacturers for use with A2L refrigerants to prevent potential electrical ignition sources.
            </p>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>🔥 Brazing &amp; Hot-Work Safety</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
              Before applying heat or unbrazing joints, recover refrigerant completely, purge the circuit with dry nitrogen, and verify that the work area is well-ventilated and free of combustible concentrations.
            </p>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>🛢️ Dedicated Recovery Cylinders</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
              Use DOT-rated recovery cylinders designated for A2L service with appropriate working pressure ratings and cylinder markings in accordance with applicable transportation and safety standards.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: OPEN DATASET CITATION */}
      <section style={{ margin: "2.5rem 0", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Reference Benchmark Dataset: 200 State Vectors
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem", fontSize: "0.95rem" }}>
          HVACLogic provides an open reference research dataset containing 200 benchmark calculation vectors across R-454B, R-32, R-454A, R-1234yf, and R-410A based on documented thermodynamic property models and reference calculation assumptions.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link
            href="/datasets/a2l-refrigerant-flammability-glide-benchmark"
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
            Explore Benchmark Dataset (200 Vectors) →
          </Link>
          <a
            href="/datasets/a2l_refrigerant_flammability_glide_benchmark_2026.csv"
            download
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.85rem",
              fontWeight: 700,
              background: "rgba(255, 255, 255, 0.08)",
              color: "var(--ink)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.375rem",
              textDecoration: "none",
            }}
          >
            Download CSV (44 KB)
          </a>
        </div>
      </section>

      {/* COMPANION CALCULATORS */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          Companion Engineering Tools
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          <Link
            href="/calculators/pt-chart"
            style={{
              display: "block",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.5rem",
              padding: "1.25rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
              Digital PT Chart Calculator →
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
              Pressure-temperature lookups with discrete bubble and dew point outputs for R-454B, R-32, and legacy refrigerants.
            </p>
          </Link>

          <Link
            href="/calculators/superheat-subcooling-calculator"
            style={{
              display: "block",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.5rem",
              padding: "1.25rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
              Superheat &amp; Subcooling Sizer →
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
              Diagnostic tool incorporating saturated bubble and dew points for refrigerant circuit evaluation.
            </p>
          </Link>

          <Link
            href="/research/r454b-r32-field-handling-protocols"
            style={{
              display: "block",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.5rem",
              padding: "1.25rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div style={{ fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
              Field Handling Monograph (Report HL-TR-2026-A2L02) →
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
              Technical analysis of cylinder recovery fill limits, tooling specifications, and evacuation diagnostics.
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}
