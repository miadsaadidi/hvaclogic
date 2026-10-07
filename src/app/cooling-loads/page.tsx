import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import { siteConfig } from "@/lib/site-config";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = {
  title: "Cooling Load & AC Tonnage Calculators — HVACLogic",
  description: "Educational screening tools and engineering guides for residential cooling loads, AC tonnage estimation, and mini-split sizing based on ACCA Manual J and Manual S concepts.",
  keywords: [
    "cooling load calculator",
    "HVAC cooling load",
    "AC load calculator",
    "HVAC load sizing",
    "cooling load sizing",
    "Manual J calculator",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/cooling-loads`,
  },
  openGraph: {
    title: "Cooling Load & AC Tonnage Calculators — HVACLogic",
    description: "Educational screening tools and engineering guides for residential cooling loads, AC tonnage estimation, and mini-split sizing based on ACCA Manual J and Manual S concepts.",
    url: `${siteConfig.canonicalDomain}/cooling-loads`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Cooling Load & AC Sizing Calculators — HVACLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cooling Load & AC Tonnage Calculators — HVACLogic",
    description: "Educational screening tools and engineering guides for residential cooling loads, AC tonnage estimation, and mini-split sizing based on ACCA Manual J and Manual S concepts.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

const CATEGORY_COLOR = "#38bdf8";

export default function CoolingLoadsHub() {
  const calculators = calculatorRegistry.filter((c) => c.pillar === "cooling-loads");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.canonicalDomain}/cooling-loads#collection`,
        name: "Cooling Load & AC Sizing Calculators",
        description: "Educational screening tools and engineering guides for residential cooling loads, AC tonnage estimation, and mini-split sizing based on ACCA Manual J and Manual S concepts.",
        url: `${siteConfig.canonicalDomain}/cooling-loads`,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.canonicalDomain}/#website`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.canonicalDomain}/cooling-loads#breadcrumbs`,
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
            name: "Cooling & Loads",
            item: `${siteConfig.canonicalDomain}/cooling-loads`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Cooling & Load Sizing Calculators",
        numberOfItems: calculators.length,
        itemListElement: calculators.map((calc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: calc.name,
          url: `${siteConfig.canonicalDomain}${calc.route}`,
          description: calc.metaDescription,
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
          <span aria-current="page">Cooling &amp; Loads</span>
        </nav>

        <header className="calculator-header">
          <span className="eyebrow">Category Hub</span>
          <h1>Cooling &amp; Load Sizing Calculators</h1>
          <p className="intro">
            Explore screening calculators and technical guides for residential air conditioning, heat pump cooling capacity, and ductless mini-split sizing based on ACCA Manual J and Manual S load-calculation concepts.
          </p>
        </header>

        {/* CARDS GRID */}
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "2.5rem 0 1rem", color: "var(--ink)" }}>
          Available Cooling &amp; Load Calculators
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
                  Cooling &amp; Loads
                </span>
                <span style={{ fontSize: "1.4rem" }}>❄️</span>
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
                      background: "rgba(56, 189, 248, 0.1)",
                      color: CATEGORY_COLOR,
                      border: "1px solid rgba(56, 189, 248, 0.2)",
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
        <HvacFlowDiagram category="cooling-loads" />

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
                background: "rgba(56, 189, 248, 0.08)",
                border: "1px solid rgba(56, 189, 248, 0.22)",
                color: CATEGORY_COLOR,
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.75rem",
              }}
            >
              <span>📚</span>
              <span>Engineering &amp; Sizing Reference Guide</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 0.75rem", color: "var(--ink)" }}>
              Cooling Load Sizing &amp; Equipment Selection Principles
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "850px", margin: 0 }}>
              Understanding cooling load fundamentals is essential in residential and light-commercial HVAC design. Equipment sizing involves evaluating sensible and latent heat gains, envelope thermal boundaries, and operating performance curves. This guide explains the core thermodynamic concepts of building heat gain, foundational ACCA Manual J principles, and illustrative ACCA Manual S equipment selection considerations.
            </p>
          </div>

          {/* 1. Thermodynamic Fundamentals of Building Heat Gain */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: CATEGORY_COLOR }}>
              1. Thermodynamic Fundamentals of Building Heat Gain
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Total building cooling load consists of two distinct thermodynamic components: <strong>Sensible Heat Gain</strong> (which raises indoor dry-bulb temperature) and <strong>Latent Heat Gain</strong> (which adds moisture that must be removed by condensation):
            </p>

            <div
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "0.6rem",
                padding: "1rem 1.25rem",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.85rem",
                color: "var(--ink)",
                lineHeight: 1.7,
                marginBottom: "1.25rem",
                overflowX: "auto",
              }}
            >
              <div><strong>Envelope Conduction:</strong> q_conduction = Σ (U × Area × ΔT_design)</div>
              <div><strong>Fenestration Solar Gain:</strong> q_solar = Σ (Area_glass × SHGC × IAC × E_t)</div>
              <div><strong>Infiltration Sensible Load:</strong> q_inf_sensible = 1.08 × CFM_inf × (T_outdoor - T_indoor)</div>
              <div><strong>Infiltration Latent Load:</strong> q_inf_latent = 4,840 × CFM_inf × (W_outdoor - W_indoor)</div>
              <div><strong>Sensible Heat Ratio:</strong> SHR = q_sensible_total / (q_sensible_total + q_latent_total)</div>
            </div>

            <p style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 1rem" }}>
              <em>Note:</em> The equations above represent simplified physical heat transfer relations. Complete ACCA Manual J implementations evaluate assembly-specific cooling load temperature differences (CLTD), radiant time series (RTS) coefficients, glass internal attenuation factors (IAC), and hourly solar paths across all exposures.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(56, 189, 248, 0.04)", border: "1px solid rgba(56, 189, 248, 0.15)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase" }}>Sensible Heat Load (Dry-Bulb)</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Temperature Elevation</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                  Conduction through opaque building surfaces (walls, roofs, slabs) + radiant solar heat through fenestration + sensible gains from lighting, appliances, and occupants (e.g., representative reference values such as ~230 BTU/hr sensible per person depending on activity).
                </div>
              </div>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.15)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#00d2ff", textTransform: "uppercase" }}>Latent Heat Load (Moisture Grains)</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Moisture Removal Load</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                  Water vapor introduced through outdoor air infiltration, mechanical ventilation, showers, cooking, and occupant respiration/perspiration (e.g., representative reference values such as ~200 BTU/hr latent per person depending on activity). Moisture condensation requires coil temperatures below the air dew point.
                </div>
              </div>
            </div>
          </div>

          {/* 2. Structured 5-Step Sizing Sequence */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: CATEGORY_COLOR }}>
              2. Structured 5-Step Load-Sizing &amp; Selection Workflow
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Standard residential HVAC design workflows generally follow a sequential 5-step evaluation process referencing ACCA Manual J and Manual S principles:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  1
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Architectural Envelope &amp; Solar Exposure Analysis
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Quantify gross exterior wall, roof, ceiling, and floor areas. Subtract window and door openings. Account for compass orientation (North, East, South, West), shading overhangs, and window Solar Heat Gain Coefficients (SHGC) to evaluate peak directional solar gains.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  2
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Infiltration Modeling &amp; Mechanical Ventilation
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Estimate natural air infiltration using envelope tightness metrics (such as blower door ACH50 data) and site shielding factors. Add continuous mechanical ventilation loads according to applicable building codes and ventilation standards (e.g., ASHRAE 62.2).
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  3
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Design Condition Selection
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Select outdoor 1% summer cooling design dry-bulb and coincident wet-bulb temperatures from relevant climatic data tables (such as ASHRAE Fundamentals or ACCA Manual J Table 1A). Indoor design criteria commonly use reference targets such as 75°F dry-bulb and ~50% relative humidity, adjusted for specific project requirements.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  4
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Room-by-Room Sensible Sizing &amp; Airflow Estimation
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Estimate room sensible heat gains to calculate preliminary supply airflow using simplified sensible heat relationships: <code>CFM ≈ Sensible_BTU / (1.08 × ΔT_assumed)</code> (e.g., assuming an illustrative 20°F supply-to-return temperature differential). Detailed room distribution and duct friction rates require complete Manual D duct design calculations.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  5
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Equipment Selection &amp; Expanded Performance Verification
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Verify that the selected equipment delivers adequate sensible and total cooling capacity under actual local outdoor and indoor design conditions using manufacturer expanded performance data, rather than relying solely on nominal AHRI rated capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Sizing Considerations & The "500 Sq Ft Per Ton" Heuristic */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: CATEGORY_COLOR }}>
              3. Sizing Considerations &amp; The Limits of "Square-Foot-Per-Ton" Heuristics
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Simplified area-based heuristics (such as 500 or 800 sq ft per ton) are rough screening benchmarks and do not substitute for a project-specific load calculation. Actual cooling loads depend heavily on local climate, envelope insulation, airtightness, fenestration orientation, internal heat gains, and ventilation rates. Selecting equipment with significant excess capacity relative to the building load can lead to operating challenges:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ef4444" }}>Part-Load Moisture Control</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                  Excessive cooling capacity relative to the building load can contribute to short runtimes during moderate weather. If the cooling cycle ends before the coil reaches steady-state condensation, relative humidity may remain higher than desired.
                </div>
              </div>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f59e0b" }}>Frequent Cycling</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                  Excess capacity can increase start-stop cycling frequency on single-stage systems, potentially increasing electrical inrush cycles and component cycling wear over time.
                </div>
              </div>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#00d2ff" }}>Duct System Matching</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                  Attempting to deliver higher airflow (e.g., 1,600 CFM) through ductwork designed for significantly lower volume can increase system static pressure, duct velocity, and register noise unless ductwork is evaluated and modified.
                </div>
              </div>
            </div>
          </div>

          {/* 4. Illustrative Equipment Sizing Considerations */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: CATEGORY_COLOR }}>
              4. Illustrative Equipment Selection Sizing Ranges (Reference Overview)
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              ACCA Manual S provides formal procedures for matching equipment capacity with calculated Manual J loads. The table below illustrates representative sizing ranges often referenced in equipment selection guidance:
            </p>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.85rem",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-color)", background: "var(--surface-raised)" }}>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Equipment Compressor Type</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Sensible Capacity Consideration</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Total Cooling Selection Margin</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Heating Selection Context</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Single-Stage Air Conditioner</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Sized to satisfy calculated sensible load</td>
                    <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 600 }}>Representative range ~100% to 115% of total load</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>N/A (Cooling Only)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Single-Stage Heat Pump</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Sized to satisfy calculated sensible load</td>
                    <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 600 }}>Representative range ~100% to 115% of total load</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Evaluated against design heating load &amp; balance point</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Two-Stage Cooling / Heat Pump</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Part-load stage handles lower sensible demand</td>
                    <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 600 }}>Representative range ~100% to 120% of total load</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Stage 2 supports higher heating capacity</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Variable-Capacity Inverter Heat Pump</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Modulates speed to follow sensible load curve</td>
                    <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 600 }}>Representative range ~100% to 130% of total load</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>May be selected based on cold-climate heating priority</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Multi-Zone Ductless Mini-Split</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Sum of indoor unit capacities sized to room loads</td>
                    <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 600 }}>Evaluated via manufacturer combination data</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Evaluated across low-ambient heating capacities</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "1rem", lineHeight: 1.5 }}>
              <em>Limitation Note:</em> These values serve as illustrative reference concepts. Actual equipment sizing margins and compliance limits must be determined using applicable ACCA Manual S selection procedures, equipment type, climate zone, manufacturer expanded performance data, and project design constraints.
            </p>
          </div>

          {/* 5. Inverter Modulation & Multi-Zone Diversity */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: CATEGORY_COLOR }}>
              5. Inverter Modulation &amp; Multi-Zone Diversity Considerations
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Variable-capacity equipment can modulate over a manufacturer-specific operating range. In multi-zone ductless systems, variable refrigerant flow and zoning allow flexible capacity matching:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>Multi-Zone Connected Capacity</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                  Because different rooms (such as east-facing morning zones vs. west-facing afternoon zones) experience peak heat gains at different times of day, manufacturers may permit connected indoor unit capacity to exceed nominal outdoor capacity. The allowable combination ratio and delivered capacity must be verified against manufacturer performance tables.
                </div>
              </div>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>Part-Load Operation</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                  Variable-capacity operation can improve part-load matching and may support longer runtimes under appropriate operating conditions, helping maintain more consistent room temperatures and steady coil conditions.
                </div>
              </div>
            </div>
            <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
              👉 Explore multi-room head combinations and compressor matching using our <Link href="/calculators/mini-split-sizing" style={{ color: CATEGORY_COLOR, fontWeight: 600 }}>Mini-Split Multi-Zone Sizing Calculator</Link>.
            </div>
          </div>

          {/* 6. Tool Selection Decision Matrix */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: CATEGORY_COLOR }}>
              6. Choosing the Right Cooling &amp; Load Screening Tool
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Select the appropriate tool for your preliminary screening or diagnostic task:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <Link
                href="/calculators/btu-calculator"
                style={{
                  padding: "1.1rem",
                  borderRadius: "0.6rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontWeight: 700, color: CATEGORY_COLOR, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                  🔥 BTU Load Calculator →
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                  Whole-home and room-by-room heating &amp; cooling load screening based on floor area, climate zone, and insulation levels.
                </div>
              </Link>

              <Link
                href="/calculators/ac-tonnage-calculator"
                style={{
                  padding: "1.1rem",
                  borderRadius: "0.6rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontWeight: 700, color: CATEGORY_COLOR, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                  ❄️ AC Tonnage &amp; Capacity Sizer →
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                  Estimate nominal AC tonnage, nominal airflow guidance, and SEER2 electrical operating cost estimates.
                </div>
              </Link>

              <Link
                href="/calculators/ac-model-decoder"
                style={{
                  padding: "1.1rem",
                  borderRadius: "0.6rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontWeight: 700, color: CATEGORY_COLOR, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                  🏷️ AC Model Number Decoder →
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                  Decode nameplate model strings across major manufacturers to identify nominal cooling tonnage and electrical specifications.
                </div>
              </Link>

              <Link
                href="/calculators/mini-split-sizing"
                style={{
                  padding: "1.1rem",
                  borderRadius: "0.6rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontWeight: 700, color: CATEGORY_COLOR, fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                  🏠 Mini-Split Multi-Zone Sizer →
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                  Model multi-zone ductless heat pump head matching and outdoor compressor capacity comparisons.
                </div>
              </Link>
            </div>
          </div>

          {/* 7. Engineering FAQs */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 1.25rem", color: CATEGORY_COLOR }}>
              Frequently Asked Questions: Cooling Load Concepts &amp; Equipment Selection
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  What is the difference between ACCA Manual J and ACCA Manual S?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  <strong>ACCA Manual J</strong> provides the methodology for calculating building heating and cooling loads based on envelope thermal characteristics, solar gains, infiltration, and internal loads. <strong>ACCA Manual S</strong> provides the methodology for selecting equipment to match those calculated loads using manufacturer expanded performance data.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  Why are square-footage heuristics (such as 500 sq ft/ton) insufficient for final equipment sizing?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Square-footage rules do not account for critical project-specific variables such as window orientation, glazing U-factor and SHGC, insulation levels, air infiltration rates, internal heat gains, and local climatic design temperatures. Homes with identical floor area can have significantly different cooling loads depending on construction quality and climate.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  What is Sensible Heat Ratio (SHR) and why is it important in humid climates?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  The Sensible Heat Ratio (<code>SHR = Sensible Load / Total Load</code>) defines the proportion of total cooling required to lower dry-bulb temperature compared to latent moisture removal. In humid climates, the latent load proportion is higher. Equipment selection must ensure the equipment sensible and latent capacities correspond to the building load profile to maintain comfort and humidity control.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  How do variable-capacity inverter heat pumps operate during partial-load conditions?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Variable-capacity inverter systems modulate compressor speed to track real-time cooling demands. During milder conditions, modulating to lower output can extend runtimes and support steady coil temperatures, helping reduce temperature fluctuations and frequent cycling.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  Can connected indoor unit capacity exceed outdoor unit capacity on multi-zone mini-splits?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  In multi-zone systems, manufacturers often allow total connected indoor head capacity to exceed nominal outdoor capacity due to load diversity across zones that peak at different times. However, allowable combination ratios and actual delivered capacities must always be verified using the manufacturer's published combination and performance tables.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REGULATORY & ENGINEERING DISCLAIMER */}
        <Disclaimer />
      </main>
    </>
  );
}
