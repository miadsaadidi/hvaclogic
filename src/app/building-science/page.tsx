import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Building Science & Insulation Calculators",
  description:
    "Psychrometric moist air thermodynamics, ASHRAE Hyland-Wexler equations, parallel-path wall R-value bridging, and Sherman-Grimsrud infiltration.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/building-science`,
  },
  openGraph: {
    title: "Building Science & Insulation Calculators",
    description:
      "Psychrometric moist air thermodynamics, ASHRAE Hyland-Wexler equations, parallel-path wall R-value bridging, and Sherman-Grimsrud infiltration.",
    url: `${siteConfig.canonicalDomain}/building-science`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Building Science & Insulation Calculators - HVACLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Science & Insulation Calculators",
    description:
      "Psychrometric moist air thermodynamics, ASHRAE Hyland-Wexler equations, parallel-path wall R-value bridging, and Sherman-Grimsrud infiltration.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

const CATEGORY_COLOR = "#8b5cf6";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "What is the difference between R-value and U-factor in building envelope assemblies?",
    answer: "R-value measures thermal resistance in hr·ft²·°F/BTU (higher resists heat flow better), while U-factor measures thermal transmittance in BTU/(hr·ft²·°F), where U = 1 / R_effective. Building codes (IECC, ASHRAE 90.1) evaluate overall assemblies using area-weighted parallel-path U-factors to properly derate for wood and steel stud framing thermal bridges.",
  },
  {
    question: "How do you convert ACH50 from a blower door test into continuous natural infiltration CFM?",
    answer: "Natural infiltration is calculated using the LBNL Sherman-Grimsrud conversion: CFM_natural = (ACH50 × Volume_conditioned) / (60 × N), where N is the climate and building height shielding factor (typically 14 to 22 depending on climate zone and exposure). This CFM_natural is then multiplied by 1.08 × ΔT to determine peak design infiltration heat loss.",
  },
  {
    question: "Why does lowering the thermostat setpoint to 68°F make indoor air feel humid or clammy?",
    answer: "Lowering dry-bulb temperature without extending compressor run-time moves indoor air closer to its dew point. According to ASHRAE Hyland-Wexler psychrometric formulations, cooling 75°F air at 50% RH down to 68°F without moisture removal spikes relative humidity above 64%, creating thermal discomfort and elevating risk of biological growth.",
  },
  {
    question: "How much does wall stud framing reduce the effective R-value of cavity batt insulation?",
    answer: "Standard 2x4 and 2x6 wood-framed walls have framing factors between 22% and 25% due to studs, plates, headers, and corner framing. A nominal R-20 fiberglass batt cavity is derated by parallel-path wood framing (R ~1.25/inch) to an effective assembly R-15.6, representing a ~22% thermal bridge penalty that requires continuous exterior insulation to resolve.",
  },
  {
    question: "What are grains of moisture per pound of dry air and how are they calculated?",
    answer: "Grains of moisture (gr/lb) measures absolute humidity ratio W scaled by 7,000 grains per pound of water (gr/lb = 7000 × W). Humidity ratio W is determined from water vapor partial pressure p_w and atmospheric pressure p_atm via W = 0.62198 × [p_w / (p_atm - p_w)].",
  },
];

export default function BuildingScienceHub() {
  const calculators = calculatorRegistry.filter((c) => c.pillar === "building-science");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.canonicalDomain}/building-science/#webpage`,
        url: `${siteConfig.canonicalDomain}/building-science`,
        name: "Psychrometrics & Building Envelope Physics Master Guide",
        description:
          "High-precision engineering guide to moist air psychrometrics, ASHRAE Hyland-Wexler vapor saturation, parallel-path assembly U-factor thermal bridging, and blower door natural infiltration modeling.",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.canonicalDomain}/#website`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.canonicalDomain,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Building Science",
            item: `${siteConfig.canonicalDomain}/building-science`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Building Science & Insulation Calculators",
        numberOfItems: calculators.length,
        itemListElement: calculators.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: c.name,
          url: new URL(c.route, siteConfig.canonicalDomain).toString(),
          description: c.metaDescription,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="page site-container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Building Science</span>
        </nav>

        <header className="calculator-header">
          <span className="eyebrow">Category Hub</span>
          <h1>Building Science &amp; Insulation Calculators</h1>
          <p className="intro">
            Deterministic building physics engines covering moist air psychrometrics, parallel-path assembly U-factor thermal bridging, and LBNL Sherman-Grimsrud infiltration modeling.
          </p>
        </header>

        {/* CARDS GRID (PowerLab Card Design) */}
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "2.5rem 0 1rem", color: "var(--ink)" }}>
          Available Building Science &amp; Envelope Calculators
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 285px), 1fr))",
            gap: "1.25rem",
            marginBottom: "3rem",
          }}
        >
          {calculators.map((c) => (
            <Link
              key={c.id}
              href={c.route}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.35rem",
                borderRadius: "0.85rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: `4px solid ${CATEGORY_COLOR}`,
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
            >
              {/* Top Row: Category Label + Icon */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: CATEGORY_COLOR,
                  }}
                >
                  Building Science
                </span>
                <span style={{ fontSize: "1.4rem" }}>🏢</span>
              </div>

              {/* Title */}
              <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>
                {c.name}
              </h3>

              {/* Standards Badge */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.65rem" }}>
                {c.standards.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      background: "rgba(139, 92, 246, 0.1)",
                      color: CATEGORY_COLOR,
                      border: "1px solid rgba(139, 92, 246, 0.2)",
                      padding: "0.15rem 0.45rem",
                      borderRadius: "4px",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.45, flex: 1 }}>
                {c.metaDescription}
              </p>

              {/* Action Button */}
              <div
                className="action-btn"
                style={{
                  marginTop: "1.25rem",
                  width: "100%",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  background: "var(--surface-raised)",
                  borderColor: "var(--border-color)",
                  color: "var(--ink)",
                }}
              >
                Open Calculator →
              </div>
            </Link>
          ))}
        </div>

        {/* SYSTEM FLOW DIAGRAM */}
        <HvacFlowDiagram category="building-science" />

        {/* COMPREHENSIVE PILLAR ENGINEERING GUIDE */}
        <section
          className="pillar-engineering-guide"
          style={{
            marginTop: "4rem",
            paddingTop: "3rem",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          {/* Guide Eyebrow & Title */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.3rem 0.85rem",
                borderRadius: "9999px",
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.22)",
                color: CATEGORY_COLOR,
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.75rem",
              }}
            >
              <span>📚</span>
              <span>Comprehensive Engineering Guide</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 0.75rem", color: "var(--ink)" }}>
              Psychrometrics &amp; Building Envelope Physics Master Guide
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "850px", margin: 0 }}>
              Building science bridges thermodynamics and structural architecture. This master engineering guide details moist air psychrometric properties using ASHRAE Hyland-Wexler formulations, 2D parallel-path thermal bridging deratings, R-value to U-factor assembly mathematics, and LBNL Sherman-Grimsrud blower door infiltration modeling.
            </p>
          </div>

          {/* 1. Psychrometric Moist Air Fundamentals */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.75rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--ink)" }}>
              1. Moist Air Psychrometrics &amp; Hyland-Wexler Formulations
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Atmospheric air is a binary mixture of dry air and superheated water vapor. Unlike simplified empirical approximations that degrade near saturation boundaries, rigorous building science relies on the <strong>ASHRAE Hyland-Wexler formulations</strong> to calculate saturation vapor pressure (p_ws) across temperatures from -148°F to 392°F (-100°C to 200°C).
            </p>

            <div
              style={{
                background: "var(--surface-raised)",
                padding: "1.25rem",
                borderRadius: "0.5rem",
                borderLeft: `4px solid ${CATEGORY_COLOR}`,
                marginBottom: "1.25rem",
                fontFamily: "monospace",
                fontSize: "0.9rem",
              }}
            >
              <strong>Hyland-Wexler Water Vapor Saturation Pressure (Liquid Water: 32°F to 392°F):</strong>
              <br />
              ln(p_ws) = C₁/T + C₂ + C₃·T + C₄·T² + C₅·T³ + C₆·ln(T)
              <br />
              <span style={{ fontSize: "0.8rem", color: "var(--ink-secondary)" }}>
                where T is absolute temperature in Kelvin (K = °R / 1.8), and C₁–C₆ are NIST/ASHRAE virial coefficients.
              </span>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              From saturation pressure (p_ws) and partial vapor pressure (p_w = φ · p_ws, where φ is relative humidity), the <strong>humidity ratio (W)</strong> and <strong>grains of moisture per pound of dry air</strong> are directly solved:
            </p>

            <div
              style={{
                background: "var(--surface-raised)",
                padding: "1.25rem",
                borderRadius: "0.5rem",
                borderLeft: `4px solid ${CATEGORY_COLOR}`,
                marginBottom: "1.25rem",
                fontFamily: "monospace",
                fontSize: "0.9rem",
              }}
            >
              <strong>Humidity Ratio &amp; Grains of Moisture Formulation:</strong>
              <br />
              W = 0.62198 × [ p_w / (p_atm - p_w) ]  (lb_water / lb_dry_air)
              <br />
              Grains of Moisture (gr/lb) = 7,000 × W
              <br />
              Enthalpy: h = 0.240 × T_db + W × (1061 + 0.444 × T_db)  (BTU/lb_da)
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              The <strong>Sensible Heat Ratio (SHR)</strong> governs equipment latent moisture removal: SHR = Q_sensible / Q_total. When sensible load drops faster than latent load (e.g. well-insulated tight envelopes), standard HVAC equipment short-cycles, failing to reach coil dew point and leaving indoor relative humidity elevated above the 60% ASHRAE Standard 55 mold threshold.
            </p>
          </div>

          {/* 2. Parallel-Path Thermal Bridging & Framing Factors */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.75rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--ink)" }}>
              2. Envelope Thermal Bridging &amp; Parallel-Path Assembly Mathematics
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              A fatal mistake in residential load calculation is assuming cavity insulation represents the true assembly thermal resistance. Wood framing studs (R ≈ 1.25 per inch) and steel framing create continuous heat bridges. In wood construction, studs, top/bottom plates, window headers, and corner jacks occupy <strong>22% to 25% of gross wall area</strong> (the <em>Framing Factor, FF</em>).
            </p>

            <div
              style={{
                background: "var(--surface-raised)",
                padding: "1.25rem",
                borderRadius: "0.5rem",
                borderLeft: `4px solid ${CATEGORY_COLOR}`,
                marginBottom: "1.25rem",
                fontFamily: "monospace",
                fontSize: "0.9rem",
              }}
            >
              <strong>Parallel-Path Assembly U-Factor Formulation (ASHRAE Standard 90.1 / IECC):</strong>
              <br />
              U_overall = (FF × U_framing) + ((1 - FF) × U_cavity)
              <br />
              R_effective = 1 / U_overall
              <br />
              <span style={{ fontSize: "0.8rem", color: "var(--ink-secondary)" }}>
                where U_framing = 1 / R_framing_path and U_cavity = 1 / R_cavity_path.
              </span>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              <strong>R-Value to U-Factor Conversion Matrix:</strong> Because heat transfer is inversely proportional to thermal resistance (Q = U · A · ΔT), adding insulation yields diminishing thermodynamic returns:
            </p>

            <div style={{ overflowX: "auto", marginBottom: "1.25rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "var(--surface-raised)", borderBottom: "2px solid var(--border-color)" }}>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Nominal Cavity R-Value</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Wall Construction</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Framing Factor (FF)</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Effective Assembly R-Value</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Assembly U-Factor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.6rem 0.75rem" }}>R-13 Batt</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>2x4 @ 16&quot; O.C.</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>25%</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 700, color: "#f59e0b" }}>R-10.1</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontFamily: "monospace" }}>U-0.099</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.6rem 0.75rem" }}>R-15 High-Density Batt</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>2x4 @ 16&quot; O.C.</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>25%</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 700, color: "#f59e0b" }}>R-11.2</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontFamily: "monospace" }}>U-0.089</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.6rem 0.75rem" }}>R-20 Batt</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>2x6 @ 16&quot; O.C.</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>23%</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 700, color: "#f59e0b" }}>R-15.6</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontFamily: "monospace" }}>U-0.064</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.6rem 0.75rem" }}>R-20 Batt + R-5 Continuous</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>2x6 @ 16&quot; O.C. + Exterior Foam</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>23%</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 700, color: "#10b981" }}>R-20.6</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontFamily: "monospace" }}>U-0.048</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              Notice that adding continuous exterior insulation (R-5 ci) breaks the framing thermal bridge across all studs, increasing the effective R-value by <strong>+32%</strong> and ensuring compliance with IECC 2021/2024 Climate Zones 4 through 8.
            </p>
          </div>

          {/* 3. Infiltration Dynamics & Sherman-Grimsrud Modeling */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.75rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--ink)" }}>
              3. Infiltration Dynamics &amp; LBNL Sherman-Grimsrud Blower Door Modeling
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Air leakage through envelope gaps, plumbing penetrations, and ceiling bypasses drives both sensible and latent heating/cooling loads. Diagnostic blower door fan pressurization measures envelope tightness at 50 Pascals (ACH50). However, buildings experience natural pressure differentials of only 1 to 4 Pascals. Converting test data to continuous natural infiltration CFM requires the <strong>LBNL Sherman-Grimsrud N-factor model</strong> (RESNET Standard 380 / ASTM E779):
            </p>

            <div
              style={{
                background: "var(--surface-raised)",
                padding: "1.25rem",
                borderRadius: "0.5rem",
                borderLeft: `4px solid ${CATEGORY_COLOR}`,
                marginBottom: "1.25rem",
                fontFamily: "monospace",
                fontSize: "0.9rem",
              }}
            >
              <strong>LBNL Sherman-Grimsrud Natural Infiltration Formulation:</strong>
              <br />
              CFM₅₀ = (ACH50 × Volume_conditioned) / 60
              <br />
              CFM_natural = CFM₅₀ / N_factor = (ACH50 × Volume_conditioned) / (60 × N_factor)
              <br />
              Sensible Infiltration Heat Loss: Q_inf_s = 1.08 × CFM_natural × ΔT
              <br />
              Latent Infiltration Heat Load: Q_inf_l = 4840 × CFM_natural × ΔW
              <br />
              <span style={{ fontSize: "0.8rem", color: "var(--ink-secondary)" }}>
                where N_factor ranges from 14 (exposed, cold zone 6/7) to 22 (well-shielded single-story, mild climate).
              </span>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              Under the 2021/2024 International Energy Conservation Code (IECC), new residential construction mandates envelope tightness ≤ 3.0 ACH50. At this tightness level, uncontrolled infiltration is cut by over 60%, mandating continuous balanced mechanical ventilation (HRV/ERV) under <strong>ASHRAE Standard 62.2</strong>.
            </p>
          </div>

          {/* 4. Three Worked Numerical Field Examples */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.75rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--ink)" }}>
              4. Worked Field Engineering Calculations
            </h3>

            {/* Example 1 */}
            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border-color)" }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: CATEGORY_COLOR, margin: "0 0 0.5rem" }}>
                Worked Example 1: The Sensible vs. Latent Thermostat Deception
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                <strong>Scenario:</strong> A homeowner in Atlanta, GA finds their home clammy at 75°F / 55% RH and drops the thermostat setpoint to 68°F. The oversized AC unit short-cycles for 8 minutes, lowering dry-bulb temperature from 75°F to 68°F without removing moisture (humidity ratio W = 0.0103 lb_w / lb_da = 72.1 gr/lb constant).
              </p>
              <div style={{ background: "var(--surface-raised)", padding: "1rem", borderRadius: "0.5rem", fontSize: "0.85rem", fontFamily: "monospace" }}>
                Step 1: Calculate saturation vapor pressure at 75°F: p_ws(75°F) = 0.4300 psia.
                <br />
                Step 2: Calculate actual partial vapor pressure: p_w = 0.55 × 0.4300 = 0.2365 psia.
                <br />
                Step 3: Calculate saturation vapor pressure at new 68°F dry bulb: p_ws(68°F) = 0.3391 psia.
                <br />
                Step 4: Solve resulting relative humidity at 68°F: RH = p_w / p_ws(68°F) = 0.2365 / 0.3391 = <strong>69.7% RH</strong>!
                <br />
                <strong>Engineering Diagnosis:</strong> Lowering the temperature increased indoor relative humidity from 55% to near 70%, creating optimal conditions for dust mites and mold while making the occupant feel colder and stickier.
              </div>
            </div>

            {/* Example 2 */}
            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border-color)" }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: CATEGORY_COLOR, margin: "0 0 0.5rem" }}>
                Worked Example 2: 2x6 Cavity Wall Thermal Bridging Derating
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                <strong>Scenario:</strong> Calculate the true heat loss through 2,000 sq ft of above-grade 2x6 wall area framed at 16&quot; O.C. with nominal R-20 fiberglass batts vs. wood stud framing (FF = 0.23, R_wood = 6.88), gypsum drywall (R-0.45), OSB sheathing (R-0.62), vinyl siding (R-0.60), and standard air films (R_in = 0.68, R_out = 0.17). Design temperature difference: ΔT = 50°F.
              </p>
              <div style={{ background: "var(--surface-raised)", padding: "1rem", borderRadius: "0.5rem", fontSize: "0.85rem", fontFamily: "monospace" }}>
                Cavity Path R-value: R_cavity = 0.68 + 0.45 + 20.0 + 0.62 + 0.60 + 0.17 = R-22.52 → U_cavity = 1 / 22.52 = 0.0444.
                <br />
                Framing Path R-value: R_framing = 0.68 + 0.45 + 6.88 + 0.62 + 0.60 + 0.17 = R-9.40 → U_framing = 1 / 9.40 = 0.1064.
                <br />
                Parallel-Path U-overall: U = (0.23 × 0.1064) + (0.77 × 0.0444) = 0.0245 + 0.0342 = <strong>0.0587 BTU/(hr·ft²·°F)</strong>.
                <br />
                Effective Assembly R-Value: R_effective = 1 / 0.0587 = <strong>R-17.0</strong> (a 24.5% loss vs. nominal R-22.5).
                <br />
                Design Transmission Heat Loss: Q = U × A × ΔT = 0.0587 × 2,000 × 50 = <strong>5,870 BTU/hr</strong>.
              </div>
            </div>

            {/* Example 3 */}
            <div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: CATEGORY_COLOR, margin: "0 0 0.5rem" }}>
                Worked Example 3: Converting Blower Door ACH50 to Natural Infiltration CFM
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                <strong>Scenario:</strong> A 2,400 sq ft, two-story home with 9 ft ceilings has a conditioned volume of 21,600 ft³. A pre-retrofit blower door test yields 4.5 ACH50. The house is located in Climate Zone 4 with an LBNL N-factor of 16.5. Outdoor winter design temperature is 15°F (indoor 70°F, ΔT = 55°F).
              </p>
              <div style={{ background: "var(--surface-raised)", padding: "1rem", borderRadius: "0.5rem", fontSize: "0.85rem", fontFamily: "monospace" }}>
                Step 1: Compute CFM at 50 Pa: CFM₅₀ = (4.5 × 21,600) / 60 = 1,620 CFM₅₀.
                <br />
                Step 2: Solve continuous natural infiltration rate: CFM_natural = 1,620 / 16.5 = <strong>98.2 CFM_natural</strong>.
                <br />
                Step 3: Calculate peak winter sensible infiltration load:
                <br />
                Q_inf = 1.08 × CFM_natural × ΔT = 1.08 × 98.2 × 55 = <strong>5,833 BTU/hr</strong> (approx. 0.5 tons of heating capacity!).
              </div>
            </div>
          </div>

          {/* 5. Companion Engineering Calculators */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.75rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--ink)" }}>
              5. Interactive Companion Calculation Modules
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Explore the deterministic solvers that power these building science equations:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <Link
                href="/calculators/psychrometric-calculator"
                style={{
                  display: "block",
                  padding: "1.25rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "0.65rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase" }}>Moist Air State Solver</span>
                <h4 style={{ margin: "0.35rem 0", fontSize: "1rem", color: "var(--ink)" }}>Psychrometric Chart Calculator →</h4>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--ink-secondary)" }}>
                  Solve dry bulb, wet bulb, dew point, relative humidity, enthalpy, and grains of moisture with altitude barometrics.
                </p>
              </Link>

              <Link
                href="/calculators/r-value-calculator"
                style={{
                  display: "block",
                  padding: "1.25rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "0.65rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase" }}>Envelope Assemblies</span>
                <h4 style={{ margin: "0.35rem 0", fontSize: "1rem", color: "var(--ink)" }}>Insulation R-Value &amp; U-Factor Sizer →</h4>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--ink-secondary)" }}>
                  Multi-layer wall assembly builder with automatic 2D wood/steel framing factor deratings and IECC code checks.
                </p>
              </Link>

              <Link
                href="/calculators/heat-loss-calculator"
                style={{
                  display: "block",
                  padding: "1.25rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "0.65rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase" }}>Whole-Building Loads</span>
                <h4 style={{ margin: "0.35rem 0", fontSize: "1rem", color: "var(--ink)" }}>Building Heat Loss &amp; Infiltration Sizer →</h4>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--ink-secondary)" }}>
                  Combines conductive transmission (U·A·ΔT) and blower door air leakage into total peak heating BTU/hr.
                </p>
              </Link>
            </div>
          </div>

          {/* 6. Direct Answer FAQ Engine */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.75rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1.25rem", color: "var(--ink)" }}>
              6. Building Science &amp; Psychrometrics FAQ Engine
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  style={{
                    background: "var(--surface-raised)",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--border-color)",
                    padding: "1rem",
                  }}
                >
                  <summary style={{ fontWeight: 700, color: "var(--ink)", cursor: "pointer", fontSize: "0.95rem" }}>
                    {faq.question}
                  </summary>
                  <p style={{ margin: "0.75rem 0 0", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* 7. Institutional Engineering Standards Matrix */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.75rem",
              padding: "1.75rem",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--ink)" }}>
              7. Institutional Standards &amp; Physical Benchmark References
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              All building science and psychrometric formulations on HVACLogic are verified against peer-reviewed institutional engineering bodies:
            </p>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.7 }}>
              <li><strong>ASHRAE Handbook of Fundamentals (Chapter 1)</strong>: Psychrometric thermodynamic formulation of moist air, Hyland-Wexler saturation vapor pressures, and moist air enthalpy.</li>
              <li><strong>ASHRAE Standard 90.1 / IECC 2021 &amp; 2024</strong>: Energy Standard for Buildings Except Low-Rise Residential / International Energy Conservation Code envelope prescriptive U-factor tables and continuous insulation requirements.</li>
              <li><strong>ASTM E779 / RESNET Standard 380</strong>: Standard Test Method for Determining Air Leakage Rate by Fan Pressurization (Blower Door testing protocols).</li>
              <li><strong>LBNL-44911 (Sherman &amp; Grimsrud)</strong>: Infiltration-pressurization correlation for calculating natural building air leakage from fan pressurization test data.</li>
              <li><strong>ASHRAE Standard 62.2-2022</strong>: Ventilation and Acceptable Indoor Air Quality in Residential Buildings.</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
