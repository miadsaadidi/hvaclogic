import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

export const metadata: Metadata = {
  title: "Low-GWP A2L Refrigerant Transition: ASHRAE 15 & UL 60335-2-40 Engineering Guide",
  description:
    "Comprehensive engineering guide to the 2026 EPA AIM Act A2L refrigerant transition, ASHRAE 15 charge limit equations (m1, m2, m3), R-454B temperature glide, and UL 60335-2-40 detection requirements.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/guides/a2l-refrigerant-transition-guide`,
  },
  openGraph: {
    title: "Low-GWP A2L Refrigerant Transition: ASHRAE 15 & UL 60335-2-40 Engineering Guide",
    description:
      "Comprehensive engineering guide to the 2026 EPA AIM Act A2L refrigerant transition, ASHRAE 15 charge limit equations (m1, m2, m3), R-454B temperature glide, and UL 60335-2-40 detection requirements.",
    url: `${siteConfig.canonicalDomain}/guides/a2l-refrigerant-transition-guide`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Low-GWP A2L Refrigerant Transition: ASHRAE 15 & UL 60335-2-40 Guide",
    description:
      "Engineering guide to ASHRAE 15-2024 A2L charge limit formulas, UL 60335-2-40 detection rules, and R-454B zeotropic glide.",
  },
};

export default function A2LRefrigerantTransitionGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Low-GWP A2L Refrigerant Transition & Charge Limit Sizing: Master Engineering Guide",
    description:
      "Engineering reference detailing the 2026 EPA AIM Act transition to A2L refrigerants (R-454B, R-32), ANSI/ASHRAE Standard 15-2024 charge limit equations, UL 60335-2-40 mitigation tiers, and zeotropic temperature glide charging protocols.",
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
      { "@type": "Thing", name: "ANSI/ASHRAE Standard 15-2024" },
      { "@type": "Thing", name: "ANSI/ASHRAE Standard 34-2022" },
      { "@type": "Thing", name: "UL 60335-2-40 (4th Edition)" },
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
            Field Diagnostics &amp; Thermodynamics
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
            ANSI/ASHRAE 15-2024
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
            UL 60335-2-40 (4th Ed)
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "9999px", background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa" }}>
            EPA AIM Act 40 CFR 84
          </span>
        </div>
        <h1 style={{ fontSize: "2.1rem", fontWeight: 800, lineHeight: 1.25, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Low-GWP A2L Refrigerant Transition &amp; Charge Limit Sizing
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
          A master engineering reference for transitioning to next-generation A2L refrigerants (R-454B and R-32). Details ASHRAE 15-2024 charge limit derivations ($m_1, m_2, m_3$), UL 60335-2-40 safety interlocks, and zeotropic temperature glide service physics.
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
            Access live PT charts, superheat/subcooling calculators, and 200 open benchmark calculation vectors.
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
          1. The Regulatory Landscape: EPA AIM Act &amp; 700 GWP Limit
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          Under the American Innovation and Manufacturing (AIM) Act of 2020 and EPA regulations codified in 40 CFR Part 84, the United States Environmental Protection Agency has mandated a phasedown of hydrofluorocarbons (HFCs) by 85% over a 15-year period.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          For residential and light commercial stationary comfort cooling systems (central air conditioners and heat pumps), the EPA has established a hard <strong>Global Warming Potential (GWP) ceiling of 700</strong> for newly manufactured equipment. Legacy baseline refrigerant R-410A carries a 100-year GWP of 2,088 (IPCC AR4) / 1,924 (IPCC AR5), rendering it non-compliant for new unitary equipment production.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          To satisfy the sub-700 GWP requirement while maintaining operating pressures and thermodynamic efficiencies close to R-410A, the HVAC industry has converged on two primary mildly flammable (ASHRAE Class A2L) fluids:
        </p>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: 1.8, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          <li>
            <strong>R-454B (Opteon XL41 / Puron Advance / Solstice 454B):</strong> GWP 466 (78% lower than R-410A). Adopted by major manufacturers (Carrier, Johnson Controls, Trane, Lennox, Rheem) as the primary replacement for residential ducted split systems and packaged rooftop units.
          </li>
          <li>
            <strong>R-32 (Difluoromethane):</strong> GWP 675 (67% lower than R-410A). Adopted extensively by Daikin, Goodman, and Amana, particularly in ductless mini-splits, multi-splits, and VRF systems.
          </li>
        </ul>
      </section>

      {/* SECTION 2: ASHRAE 34 SAFETY CLASSIFICATION */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          2. ASHRAE Standard 34 Classification: Toxicity &amp; Flammability Physics
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          ANSI/ASHRAE Standard 34 assigns an alphanumeric safety classification to all refrigerants based on two distinct physical criteria: toxicity (capital letter A or B) and flammability (number 1, 2L, 2, or 3).
        </p>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: 1.8, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          <li><strong>Toxicity Class A (Lower Toxicity):</strong> Occupational Exposure Limit (OEL) &ge; 400 ppm volume threshold.</li>
          <li><strong>Flammability Class 1 (No Flame Propagation):</strong> No flame propagation when tested at 60°C (140°F) and 101.3 kPa per ASTM E681 (e.g., R-410A, R-134a, R-22).</li>
          <li><strong>Flammability Class 2L (Lower Flammability):</strong> Exhibits flame propagation but has a maximum laminar burning velocity S<sub>u</sub> &le; 10 cm/s (0.33 ft/s) and a heat of combustion HOC &lt; 19 MJ/kg (8,170 BTU/lb).</li>
          <li><strong>Flammability Class 3 (Higher Flammability):</strong> Highly flammable hydrocarbons (e.g., R-290 Propane, R-600a Isobutane) with low LFL and burning velocity &gt; 10 cm/s.</li>
        </ul>

        {/* COMPARISON TABLE */}
        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "var(--surface)", borderBottom: "2px solid var(--border-color)" }}>
                <th style={{ padding: "0.75rem 0.5rem" }}>Refrigerant</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Safety Class</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Composition</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>GWP (AR5)</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>LFL (lb/ft³)</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Burning Velocity</th>
                <th style={{ padding: "0.75rem 0.5rem" }}>Glide (°F)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700, color: "var(--accent-primary)" }}>R-454B</td>
                <td style={{ padding: "0.65rem 0.5rem" }}><span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700 }}>A2L</span></td>
                <td style={{ padding: "0.65rem 0.5rem" }}>68.9% R-32 / 31.1% R-1234yf</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>466</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0.0189</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>5.2 cm/s</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>2.7°F</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700, color: "var(--accent-primary)" }}>R-32</td>
                <td style={{ padding: "0.65rem 0.5rem" }}><span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700 }}>A2L</span></td>
                <td style={{ padding: "0.65rem 0.5rem" }}>100% R-32 (Pure)</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>675</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0.0192</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>6.7 cm/s</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0.0°F</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700 }}>R-454A</td>
                <td style={{ padding: "0.65rem 0.5rem" }}><span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700 }}>A2L</span></td>
                <td style={{ padding: "0.65rem 0.5rem" }}>35% R-32 / 65% R-1234yf</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>239</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0.0174</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>1.6 cm/s</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>9.0°F</td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700 }}>R-1234yf</td>
                <td style={{ padding: "0.65rem 0.5rem" }}><span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(16,185,129,0.15)", color: "#34d399", fontWeight: 700 }}>A2L</span></td>
                <td style={{ padding: "0.65rem 0.5rem" }}>100% HFO-1234yf</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>&lt; 1</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0.0180</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>1.5 cm/s</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0.0°F</td>
              </tr>
              <tr>
                <td style={{ padding: "0.65rem 0.5rem", fontWeight: 700, color: "var(--ink-secondary)" }}>R-410A (Baseline)</td>
                <td style={{ padding: "0.65rem 0.5rem" }}><span style={{ padding: "0.15rem 0.4rem", borderRadius: "4px", background: "rgba(100,116,139,0.15)", color: "#94a3b8", fontWeight: 700 }}>A1</span></td>
                <td style={{ padding: "0.65rem 0.5rem" }}>50% R-32 / 50% R-125</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>1,924</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>None (Non-flam)</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0 cm/s</td>
                <td style={{ padding: "0.65rem 0.5rem" }}>0.2°F</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: ASHRAE 15 CHARGE LIMITS & SIZING EQUATIONS */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          3. ASHRAE Standard 15-2024 &amp; UL 60335-2-40 Charge Limits
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1.5rem" }}>
          Because A2L refrigerants possess mild flammability, equipment standards (UL 60335-2-40 4th Edition) and mechanical codes (ASHRAE Standard 15-2024 Section 7) govern the maximum refrigerant charge allowed in an occupied space without active safety mitigation.
        </p>

        <FormulaCard
          title="ASHRAE 15 Passive Unmitigated Charge Limit (m1)"
          formula="m_1 = 0.20 \times \text{LFL} \times V_{\text{eff}}"
          variables={[
            { symbol: "m_1", label: "Maximum Unmitigated Charge", description: "Allowable system holding charge (factory + lineset) without requiring active mitigation", unit: "lb (or kg)" },
            { symbol: "\\text{LFL}", label: "Lower Flammability Limit", description: "Standard ASHRAE 34 flammability threshold (0.018915 lb/ft³ for R-454B; 0.019165 lb/ft³ for R-32)", unit: "lb/ft³ (or kg/m³)" },
            { symbol: "V_{\\text{eff}}", label: "Effective Connected Space Volume", description: "Net interior volume of the smallest occupied space connected to the duct distribution system", unit: "cu ft (or m³)" },
          ]}
          notes="Derived from the 20% safety factor applied to the Lower Flammability Limit. If a complete catastrophic charge release occurs, the resulting refrigerant concentration remains strictly below 20% of the LFL."
          sourceStandard="ANSI/ASHRAE Standard 15-2024 Section 7.2 & UL 60335-2-40 Annex GG"
        />

        <div style={{ marginTop: "1.5rem" }}>
          <FormulaCard
            title="Minimum Unmitigated Connected Room Volume & Floor Area"
            formula="V_{\text{min}} = \frac{M_{\text{charge}}}{0.20 \times \text{LFL}} \quad | \quad A_{\text{min}} = \frac{V_{\text{min}}}{H_{\text{ceiling}}}"
            variables={[
              { symbol: "M_{\\text{charge}}", label: "Total System Holding Charge", description: "Combined outdoor factory pre-charge plus field line-set addition", unit: "lb" },
              { symbol: "V_{\\text{min}}", label: "Minimum Required Space Volume", description: "Smallest room volume required to install equipment without active leak mitigation", unit: "cu ft" },
              { symbol: "A_{\\text{min}}", label: "Minimum Usable Floor Area", description: "Minimum room square footage assuming clear floor-to-ceiling architectural height H", unit: "sq ft" },
              { symbol: "H_{\\text{ceiling}}", label: "Ceiling Height", description: "Interior clear height from finished floor to finished ceiling (standard 8 ft default)", unit: "ft" },
            ]}
            notes="For ducted systems, V_eff can represent the aggregate volume of all supply-connected spaces provided there are no manual dampers capable of isolating individual rooms."
            sourceStandard="ANSI/ASHRAE Standard 15-2024 Section 7.3"
          />
        </div>

        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginTop: "2rem", marginBottom: "0.75rem" }}>
          The Three Mitigation Tiers
        </h3>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          When the total system charge exceeds the passive limit $m_1$, UL 60335-2-40 establishes deterministic mitigation tiers to prevent flammable pocket formation:
        </p>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: 1.8, color: "var(--ink-secondary)" }}>
          <li>
            <strong>Tier 0 (System Charge &le; m₁):</strong> Zero mitigation required. Natural air leakage and room dilution keep concentration safely below 20% LFL.
          </li>
          <li>
            <strong>Tier 1 (m₁ &lt; System Charge &le; m₂):</strong> Continuous circulation airflow. The indoor blower motor is interlocked to maintain minimum circulation velocity (typically 200–400 CFM) across ductwork to disperse any stratified refrigerant vapor.
          </li>
          <li>
            <strong>Tier 2 (m₂ &lt; System Charge &le; m₃):</strong> Active Refrigerant Detection System (RDS). Factory-calibrated leak detection sensors in the evaporator drain pan or air handler cabinet trigger within 15 seconds of detecting approximately 25% of LFL, automatically de-energizing the compressor, closing motorized refrigerant shutoff valves, and activating high-speed emergency exhaust ventilation.
          </li>
        </ul>
      </section>

      {/* SECTION 4: ZEOTROPIC GLIDE & FIELD CHARGING */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          4. Zeotropic Temperature Glide &amp; Thermodynamic Service Protocols
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1.5rem" }}>
          Refrigerants are divided into pure fluids (single chemical compound), azeotropic blends (behave as a single fluid with zero boiling shift), and zeotropic blends (mixtures of fluids with different boiling points).
        </p>

        <FormulaCard
          title="Zeotropic Temperature Glide Equation"
          formula="\Delta T_{\text{glide}} = T_{\text{dew}}(P) - T_{\text{bubble}}(P)"
          variables={[
            { symbol: "\\Delta T_{\\text{glide}}", label: "Temperature Glide", description: "Temperature span between initial boiling and final evaporation at constant pressure", unit: "°F (or K)" },
            { symbol: "T_{\\text{dew}}(P)", label: "Saturated Dew Point", description: "Temperature at which 100% saturated vapor begins condensing into liquid at pressure P", unit: "°F" },
            { symbol: "T_{\\text{bubble}}(P)", label: "Saturated Bubble Point", description: "Temperature at which 100% saturated liquid begins boiling into vapor at pressure P", unit: "°F" },
          ]}
          notes="Pure fluids (R-32) and near-azeotropic mixtures (R-410A) exhibit glide < 0.3°F. R-454B exhibits ~2.7°F glide, while commercial medium-temp blends (R-454A) exhibit up to 9.0°F glide."
          sourceStandard="NIST REFPROP 10.0 Thermodynamic Reference Database"
        />

        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginTop: "2rem", marginBottom: "0.75rem" }}>
          The Liquid-Charging Mandate &amp; Fractionation
        </h3>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          In zeotropic blends, the lower-boiling component (R-32 in R-454B) evaporates preferentially into the vapor headspace of a charging cylinder. If a technician attempts to charge an A2L blend as a <em>vapor</em>, the cylinder experiences <strong>fractionation</strong>, altering the chemical ratio and leaving behind an off-ratio blend that compromises heat pump efficiency and pressure characteristics.
        </p>
        <div style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1.5rem" }}>
          <strong style={{ color: "#ef4444" }}>CRITICAL FIELD PROTOCOL:</strong> Always charge zeotropic A2L blends (R-454B, R-454A) strictly in the <strong>LIQUID PHASE</strong> from the cylinder. Invert cylinders without dip tubes or utilize liquid ports on dip-tube cylinders, metering liquid through a charging manifold into the low side with a throttle restriction.
        </div>

        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Superheat vs. Subcooling Calculation Rules
        </h3>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          Because saturated pressure correlates to two different temperatures in a gliding refrigerant, technicians must apply the correct reference point:
        </p>
        <ul style={{ paddingLeft: "1.5rem", lineHeight: 1.8, color: "var(--ink-secondary)" }}>
          <li>
            <strong>Superheat (Evaporator Outlet):</strong> Must be calculated from the <strong>DEW POINT</strong>. Measuring suction pressure and reading the bubble point will produce an artificially high superheat calculation, causing severe over-charging.
            <div style={{ fontFamily: "monospace", padding: "0.4rem 0.6rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "4px", margin: "0.5rem 0", display: "inline-block" }}>
              Superheat = T_suction_pipe - T_dew(P_suction)
            </div>
          </li>
          <li>
            <strong>Subcooling (Condenser Outlet):</strong> Must be calculated from the <strong>BUBBLE POINT</strong>. Measuring liquid pressure and reading the dew point will produce an artificially high subcooling calculation, causing severe under-charging.
            <div style={{ fontFamily: "monospace", padding: "0.4rem 0.6rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "4px", margin: "0.5rem 0", display: "inline-block" }}>
              Subcooling = T_bubble(P_liquid) - T_liquid_pipe
            </div>
          </li>
        </ul>
      </section>

      {/* SECTION 5: FIELD SERVICE, TOOLING, & SAFETY */}
      <section style={{ margin: "2.5rem 0" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          5. Field Service Tooling &amp; Installation Safety Checklist
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          Servicing A2L systems requires dedicated tooling rated for mildly flammable environments to eliminate electrical arc ignition sources:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>🔧 Reverse Left-Hand Threads</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
              A2L cylinders feature CGA 164 left-hand (LH) reverse threads. Requires dedicated LH hose fittings or brass reverse-thread adaptors to prevent accidental connection to non-flammable manifold sets.
            </p>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>⚡ Spark-Proof Recovery Units</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
              Recovery machines and vacuum pumps must feature sealed, brushless DC motors or intrinsically safe solid-state relays meeting UL 121201 / CSA C22.2 ignition-proof standards.
            </p>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>🔥 Brazing Nitrogen Purge</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
              Prior to unbrazing or torch work, systems must be recovered to 0 psig, purged with dry nitrogen, and confirmed clear using a calibrated A2L combustible gas leak detector.
            </p>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>🛢️ Red Shoulder Recovery Tanks</div>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
              DOT-approved recovery cylinders for A2L fluids must feature a distinct red shoulder ring band, pressure relief valves rated to 400+ psig, and left-hand valve ports.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: OPEN DATASET CITATION */}
      <section style={{ margin: "2.5rem 0", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "0.75rem", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Open Benchmark Dataset: 200 State Vectors
        </h2>
        <p style={{ lineHeight: 1.7, color: "var(--ink-secondary)", marginBottom: "1rem", fontSize: "0.95rem" }}>
          To support mechanical consulting engineers, code compliance inspectors, and academic researchers, HVACLogic has released an open tabular research dataset evaluating 200 deterministic calculation vectors across R-454B, R-32, R-454A, R-1234yf, and R-410A under ASHRAE 15-2024 and UL 60335-2-40.
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
              Interactive pressure slider from 0 to 650 psig with discrete bubble and dew point outputs for R-454B and R-32.
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
              Field charging diagnostic engine isolating saturated bubble and dew points for accurate TXV and fixed orifice tuning.
            </p>
          </Link>
        </div>
      </section>
    </article>
  );
}
