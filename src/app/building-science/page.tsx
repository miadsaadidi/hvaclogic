import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Building Science & Insulation Calculators — HVACLogic",
  description:
    "Technical references and calculation models for moist air psychrometrics, parallel-path assembly U-factors, thermal bridging derating, and infiltration modeling.",
  keywords: [
    "building science",
    "psychrometrics",
    "insulation R-value",
    "U-factor",
    "thermal bridging",
    "framing factor",
    "continuous insulation",
    "blower door",
    "natural infiltration",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/building-science`,
  },
  openGraph: {
    title: "Building Science & Insulation Calculators — HVACLogic",
    description:
      "Technical references and calculation models for moist air psychrometrics, parallel-path assembly U-factors, thermal bridging derating, and infiltration modeling.",
    url: `${siteConfig.canonicalDomain}/building-science`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Building Science & Insulation Calculators — HVACLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Science & Insulation Calculators — HVACLogic",
    description:
      "Technical references and calculation models for moist air psychrometrics, parallel-path assembly U-factors, thermal bridging derating, and infiltration modeling.",
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
    answer: "R-value measures thermal resistance in hr·ft²·°F/BTU (higher resists heat flow better), while U-factor measures thermal transmittance in BTU/(hr·ft²·°F), where U = 1 / R_effective. Building standards and codes evaluate overall assemblies using area-weighted parallel-path U-factors to properly account for framing thermal bridges.",
  },
  {
    question: "How do you convert ACH50 from a blower door test into continuous natural infiltration CFM?",
    answer: "Natural infiltration is commonly estimated using the LBNL Sherman-Grimsrud conversion: CFM_natural = (ACH50 × Volume_conditioned) / (60 × N), where N is an empirical climate, building height, and shielding factor (illustrative reference values often range between 14 and 22). This CFM_natural is then multiplied by 1.08 × ΔT to estimate sensible infiltration heating load.",
  },
  {
    question: "Why does lowering the thermostat setpoint to 68°F make indoor air feel humid or clammy?",
    answer: "Lowering dry-bulb temperature without removing moisture moves indoor air closer to its dew point. According to psychrometric formulations, cooling 75°F air at 55% RH down to 68°F without moisture removal raises relative humidity to near 70%, which can cause thermal discomfort and increase moisture-related building concerns.",
  },
  {
    question: "How much does wall stud framing reduce the effective R-value of cavity batt insulation?",
    answer: "In typical light wood framing, studs, plates, and headers create thermal bridges. In an illustrative 2x6 wall with 23% framing factor, a nominal R-20 cavity batt assembly derates to an effective assembly R-17.0 (U-0.0587). Adding continuous exterior insulation helps break the framing bridge.",
  },
  {
    question: "What are grains of moisture per pound of dry air and how are they calculated?",
    answer: "Grains of moisture (gr/lb) measures absolute humidity ratio W scaled by 7,000 grains per pound of water (gr/lb = 7,000 × W). Humidity ratio W is determined from water vapor partial pressure p_w and atmospheric pressure p_atm via W = 0.62198 × [p_w / (p_atm - p_w)].",
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
        name: "Psychrometrics & Building Envelope Physics Reference Guide",
        description:
          "Engineering reference guide to moist air psychrometrics, ASHRAE Hyland-Wexler vapor saturation, parallel-path assembly U-factor calculations, and infiltration modeling.",
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
          url: `${siteConfig.canonicalDomain}${c.route}`,
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
            Engineering calculation engines covering moist air psychrometrics, parallel-path assembly U-factor thermal bridging, and infiltration modeling.
          </p>
        </header>

        {/* CARDS GRID */}
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
          <div style={{ marginBottom: "2rem" }}>
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
              <span>Engineering Reference Guide</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 0.75rem", color: "var(--ink)" }}>
              Psychrometrics &amp; Building Envelope Physics Reference Guide
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "850px", margin: "0 0 1.5rem" }}>
              Building science bridges thermodynamics and structural architecture. This technical guide outlines moist air psychrometric properties using ASHRAE Hyland-Wexler formulations, parallel-path thermal bridging deratings, R-value to U-factor assembly mathematics, and natural infiltration conversion methods.
            </p>

            {/* Page-level Scope Disclaimer */}
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderLeft: "4px solid var(--accent-cooling)",
                borderRadius: "0.5rem",
                padding: "1rem 1.25rem",
                maxWidth: "880px",
              }}
            >
              <p style={{ margin: 0, fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.55 }}>
                <strong style={{ color: "var(--ink)" }}>Technical Scope Note:</strong> Calculations, framing factors, and assembly values shown on this page represent engineering reference models and illustrative examples. Official building code compliance, prescriptive envelope requirements, and mechanical ventilation specifications depend on adopted local energy codes, climate zones, building geometry, and specific installation details.
              </p>
            </div>
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
              Atmospheric air is modeled as a binary mixture of dry air and water vapor. Standard building science calculations reference the <strong>ASHRAE Hyland-Wexler formulations</strong> to determine saturation vapor pressure (p_ws) over liquid water across temperatures from 32°F to 392°F (0°C to 200°C):
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
              <strong>Hyland-Wexler Saturation Vapor Pressure Formulation (Liquid Water: 32°F to 392°F):</strong>
              <br />
              ln(p_ws) = C₁/T + C₂ + C₃·T + C₄·T² + C₅·T³ + C₆·ln(T)
              <br />
              <span style={{ fontSize: "0.8rem", color: "var(--ink-secondary)" }}>
                where T is absolute temperature in Kelvin (K = °R / 1.8), and C₁–C₆ are the published ASHRAE formulation coefficients.
              </span>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              From saturation pressure (p_ws) and partial vapor pressure (p_w = φ · p_ws, where φ is relative humidity), the <strong>humidity ratio (W)</strong> and <strong>grains of moisture per pound of dry air</strong> are solved:
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
              The <strong>Sensible Heat Ratio (SHR)</strong> characterizes space load requirements: SHR = Q_sensible / Q_total. In tight, well-insulated building envelopes where sensible loads are reduced, cooling equipment that is improperly sized or short-cycles may fail to achieve adequate dehumidification, leaving indoor relative humidity elevated (often above 60%) and increasing moisture-management and comfort concerns.
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
              2. Envelope Thermal Bridging &amp; Parallel-Path Assembly Calculations
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              A common source of error in residential load calculations is assuming cavity insulation alone represents the overall assembly thermal resistance. Wood framing studs (commonly assumed at R ≈ 1.25 per inch for dimension lumber, varying with species and moisture) and steel framing create thermal bridges. In light wood construction, studs, plates, headers, and corner framing typically occupy an illustrative range of <strong>22% to 25% of gross wall area</strong> (the <em>Framing Factor, FF</em>), depending on stud spacing, wall height, and structural design.
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
              <strong>Parallel-Path Assembly U-Factor Calculation:</strong>
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
              <strong>R-Value to U-Factor Assembly Comparison:</strong> The table below illustrates parallel-path calculations using typical layer assumptions (interior air film R-0.68, 1/2&quot; drywall R-0.45, 7/16&quot; OSB R-0.62, vinyl siding R-0.60, exterior air film R-0.17; base continuous R = 2.52):
            </p>

            <div style={{ overflowX: "auto", marginBottom: "1.25rem" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "var(--surface-raised)", borderBottom: "2px solid var(--border-color)" }}>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Nominal Cavity R-Value</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Wall Construction</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Assumed Framing Factor</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Effective Assembly R-Value</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Assembly U-Factor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.6rem 0.75rem" }}>R-13 Batt</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>2x4 @ 16&quot; O.C. (R-4.38 wood)</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>25%</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 700, color: "#f59e0b" }}>R-11.8</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontFamily: "monospace" }}>U-0.085</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.6rem 0.75rem" }}>R-15 High-Density Batt</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>2x4 @ 16&quot; O.C. (R-4.38 wood)</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>25%</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 700, color: "#f59e0b" }}>R-12.6</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontFamily: "monospace" }}>U-0.079</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.6rem 0.75rem" }}>R-20 Batt</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>2x6 @ 16&quot; O.C. (R-6.88 wood)</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>23%</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 700, color: "#f59e0b" }}>R-17.0</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontFamily: "monospace" }}>U-0.0587</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.6rem 0.75rem" }}>R-20 Batt + R-5 Continuous</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>2x6 @ 16&quot; O.C. + Exterior Foam</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>23%</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 700, color: "#10b981" }}>R-22.8</td>
                    <td style={{ padding: "0.6rem 0.75rem", fontFamily: "monospace" }}>U-0.044</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              Notice that adding continuous exterior insulation (R-5 ci) covers the framing thermal bridge across all studs, increasing the effective assembly R-value from R-17.0 to R-22.8 (a ~33% improvement in overall thermal resistance in this example) and helping assemblies satisfy prescriptive energy code criteria.
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
              3. Infiltration Dynamics &amp; LBNL Sherman-Grimsrud Infiltration Modeling
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Air leakage through envelope gaps, plumbing penetrations, and structural joints drives sensible and latent loads. Standard diagnostic fan pressurization tests (such as ASTM E779 or RESNET Standard 380 protocols) measure envelope air leakage at an induced 50 Pascal differential (ACH50). Converting test data to estimated continuous natural infiltration CFM under ambient pressure differentials relies on empirical conversion methods, such as the <strong>LBNL Sherman-Grimsrud N-factor model</strong>:
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
                where N_factor is an empirical factor (illustrative reference values typically range from 14 to 22 depending on climate zone, local wind shielding, and building height).
              </span>
            </div>

            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              Under modern residential model energy codes (such as IECC envelope tightness targets of ≤ 3.0 ACH50 where adopted), tighter construction significantly reduces uncontrolled air exchange. This increases the importance of intentional mechanical ventilation designed in accordance with applicable standards such as <strong>ASHRAE Standard 62.2</strong>.
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
                Worked Example 1: Psychrometric Impact of Setpoint Reduction
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                <strong>Scenario:</strong> A home is at 75°F dry-bulb / 55% relative humidity. The thermostat setpoint is lowered to 68°F. If the cooling equipment lowers the dry-bulb temperature from 75°F to 68°F with minimal moisture removal (humidity ratio W ≈ 0.0103 lb_w / lb_da = 72.1 gr/lb remains constant):
              </p>
              <div style={{ background: "var(--surface-raised)", padding: "1rem", borderRadius: "0.5rem", fontSize: "0.85rem", fontFamily: "monospace" }}>
                Step 1: Calculate saturation vapor pressure at 75°F: p_ws(75°F) ≈ 0.4300 psia.
                <br />
                Step 2: Calculate actual partial vapor pressure: p_w = 0.55 × 0.4300 ≈ 0.2365 psia.
                <br />
                Step 3: Calculate saturation vapor pressure at new 68°F dry bulb: p_ws(68°F) ≈ 0.3391 psia.
                <br />
                Step 4: Solve resulting relative humidity at 68°F: RH = p_w / p_ws(68°F) = 0.2365 / 0.3391 ≈ <strong>69.7% RH</strong>.
                <br />
                <strong>Engineering Note:</strong> Lowering the dry-bulb temperature without moisture extraction increases relative humidity, which can increase moisture-related comfort concerns, dust mite activity, and potential condensation risks.
              </div>
            </div>

            {/* Example 2 */}
            <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border-color)" }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: CATEGORY_COLOR, margin: "0 0 0.5rem" }}>
                Worked Example 2: 2x6 Cavity Wall Thermal Bridging Derating
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                <strong>Scenario (Hypothetical assumptions):</strong> Calculate transmission heat loss through 2,000 sq ft of above-grade 2x6 wall framed at 16&quot; O.C. with nominal R-20 fiberglass batts vs. wood stud framing (assumed FF = 0.23, R_wood = 6.88), gypsum drywall (R-0.45), OSB sheathing (R-0.62), vinyl siding (R-0.60), and air films (R_in = 0.68, R_out = 0.17). Assumed design ΔT = 50°F:
              </p>
              <div style={{ background: "var(--surface-raised)", padding: "1rem", borderRadius: "0.5rem", fontSize: "0.85rem", fontFamily: "monospace" }}>
                Cavity Path R-value: R_cavity = 0.68 + 0.45 + 20.0 + 0.62 + 0.60 + 0.17 = R-22.52 → U_cavity = 1 / 22.52 ≈ 0.0444.
                <br />
                Framing Path R-value: R_framing = 0.68 + 0.45 + 6.88 + 0.62 + 0.60 + 0.17 = R-9.40 → U_framing = 1 / 9.40 ≈ 0.1064.
                <br />
                Parallel-Path U-overall: U = (0.23 × 0.1064) + (0.77 × 0.0444) = 0.0245 + 0.0342 = <strong>0.0587 BTU/(hr·ft²·°F)</strong>.
                <br />
                Effective Assembly R-Value: R_effective = 1 / 0.0587 = <strong>R-17.0</strong> (a 24.5% reduction from nominal R-22.5 cavity path).
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
                <strong>Scenario (Hypothetical assumptions):</strong> A 2,400 sq ft, two-story home with 9 ft ceilings has an interior volume of 21,600 ft³. A blower door test yields 4.5 ACH50. Using an assumed LBNL N-factor of 16.5 and outdoor winter design temperature of 15°F (indoor 70°F, ΔT = 55°F):
              </p>
              <div style={{ background: "var(--surface-raised)", padding: "1rem", borderRadius: "0.5rem", fontSize: "0.85rem", fontFamily: "monospace" }}>
                Step 1: Compute CFM at 50 Pa: CFM₅₀ = (4.5 × 21,600) / 60 = 1,620 CFM₅₀.
                <br />
                Step 2: Estimate continuous natural infiltration rate: CFM_natural = 1,620 / 16.5 ≈ <strong>98.2 CFM_natural</strong>.
                <br />
                Step 3: Estimate peak winter sensible infiltration load:
                <br />
                Q_inf = 1.08 × CFM_natural × ΔT = 1.08 × 98.2 × 55 ≈ <strong>5,833 BTU/hr</strong>.
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
              Explore the calculation engines that implement these building science formulations:
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
                  Solve dry bulb, wet bulb, dew point, relative humidity, enthalpy, and grains of moisture with altitude barometric adjustments.
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
                  Multi-layer wall assembly builder with parallel-path framing factor deratings and prescriptive reference checks.
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
                  Combines conductive transmission (U·A·ΔT) and blower door air leakage estimates into peak heating load estimates.
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

          {/* 7. Reference Standards & Technical Sources */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.75rem",
              padding: "1.75rem",
            }}
          >
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 1rem", color: "var(--ink)" }}>
              7. Technical Standards &amp; Reference Sources
            </h3>
            <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              The following standards, handbooks, and technical references inform the models and calculations presented on this page:
            </p>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.7 }}>
              <li><strong>ASHRAE Handbook of Fundamentals (Chapter 1)</strong>: Psychrometric thermodynamic formulation of moist air, Hyland-Wexler saturation vapor pressures, and moist air enthalpy.</li>
              <li><strong>ASHRAE Standard 90.1 / IECC</strong>: Energy Standard for Buildings Except Low-Rise Residential / International Energy Conservation Code envelope prescriptive U-factor tables and continuous insulation methods.</li>
              <li><strong>ASTM E779 / RESNET Standard 380</strong>: Standard Test Method for Determining Air Leakage Rate by Fan Pressurization (Blower door testing protocols).</li>
              <li><strong>LBNL-44911 (Sherman &amp; Grimsrud)</strong>: Infiltration-pressurization correlation for calculating natural building air leakage from fan pressurization test data.</li>
              <li><strong>ASHRAE Standard 62.2</strong>: Ventilation and Acceptable Indoor Air Quality in Residential Buildings.</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
