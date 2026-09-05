import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Field Diagnostics & A2L Refrigerant Sizing | HVACLogic",
  description:
    "Diagnostic superheat and subcooling formulas, EPA 608 A2L temperature glide compensation, and NIST REFPROP saturation curves for R-410A and R-454B.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/field-diagnostics`,
  },
  openGraph: {
    title: "Field Diagnostics & A2L Refrigerant Sizing | HVACLogic",
    description:
      "Diagnostic superheat and subcooling formulas, EPA 608 A2L temperature glide compensation, and NIST REFPROP saturation curves for R-410A and R-454B.",
    url: `${siteConfig.canonicalDomain}/field-diagnostics`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Field Diagnostics & Refrigerant Calculators — HVACLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Diagnostics & A2L Refrigerant Sizing | HVACLogic",
    description:
      "Diagnostic superheat and subcooling formulas, EPA 608 A2L temperature glide compensation, and NIST REFPROP saturation curves for R-410A and R-454B.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

const CATEGORY_COLOR = "#10b981";

export default function FieldDiagnosticsHub() {
  const calculators = calculatorRegistry.filter((c) => c.pillar === "field-diagnostics");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteConfig.canonicalDomain}/field-diagnostics/#webpage`,
        url: `${siteConfig.canonicalDomain}/field-diagnostics`,
        name: "Field Diagnostics & A2L Refrigerant Sizing Master Guide",
        description:
          "High-precision thermodynamic charging diagnostics, temperature glide compensation, and NIST REFPROP saturation curves for legacy and next-generation A2L refrigerants.",
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
            name: "Field Diagnostics & PT",
            item: `${siteConfig.canonicalDomain}/field-diagnostics`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Refrigerant & Diagnostic Calculators",
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
        mainEntity: [
          {
            "@type": "Question",
            name: "Why must subcooling be measured from the bubble point and superheat from the dew point on zeotropic refrigerants?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Zeotropic refrigerant blends (such as R-454B and R-407C) have temperature glide where the constituent chemicals boil and condense at different temperatures under constant pressure. The bubble point represents 100% saturated liquid (where subcooling begins), while the dew point represents 100% saturated vapor (where superheat begins). Measuring subcooling from dew point creates a 2.2°F error that leads to improper system charging.",
            },
          },
          {
            "@type": "Question",
            name: "How does line set length affect total system refrigerant charge?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most residential split-system condensers come factory pre-charged for a 15-foot line set. For runs longer than 15 feet, additional liquid refrigerant must be weighed in at the manufacturer-specified rate (typically 0.6 oz per linear foot for standard 3/8-inch OD liquid lines). Failing to add trim charge results in vapor starvation at the metering device and elevated compressor discharge temperatures.",
            },
          },
          {
            "@type": "Question",
            name: "What causes low suction pressure with high superheat and high subcooling?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This specific combination indicates a liquid line restriction (such as a clogged filter-drier or a kinked liquid line). Liquid backs up into the condenser coil (increasing subcooling), while the evaporator is starved of refrigerant (dropping suction pressure and driving superheat up).",
            },
          },
          {
            "@type": "Question",
            name: "What is target superheat and when is it used instead of subcooling?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Target superheat is calculated for fixed-orifice (piston or capillary tube) systems using indoor wet-bulb temperature and outdoor dry-bulb temperature. Because fixed metering devices cannot modulate, superheat varies with thermal load. Subcooling is used for systems equipped with Thermal Expansion Valves (TXVs) or Electronic Expansion Valves (EEVs).",
            },
          },
          {
            "@type": "Question",
            name: "How do A2L refrigerants like R-454B compare in operating pressures to R-410A?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "R-454B operates at approximately 5% to 8% lower operating pressures than R-410A across both low and high sides, while delivering comparable volumetric cooling capacity and requiring a ~5% smaller total system charge weight. Pure R-32 operates at roughly 1% to 3% higher pressure than R-410A with zero temperature glide.",
            },
          },
        ],
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
          <span aria-current="page">Field Diagnostics &amp; PT</span>
        </nav>

        <header className="calculator-header">
          <span className="eyebrow">Category Hub</span>
          <h1>Field Diagnostics &amp; Refrigerant Calculators</h1>
          <p className="intro">
            High-precision thermodynamic charging diagnostics, temperature glide compensation, and NIST REFPROP saturation curves for legacy and next-generation A2L refrigerants.
          </p>
        </header>

        {/* CARDS GRID (PowerLab Card Design) */}
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "2.5rem 0 1rem", color: "var(--ink)" }}>
          Available Diagnostic &amp; Refrigeration Calculators
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(285px, 1fr))",
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
                  Diagnostics &amp; PT
                </span>
                <span style={{ fontSize: "1.4rem" }}>🔧</span>
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
                      background: "rgba(16, 185, 129, 0.1)",
                      color: CATEGORY_COLOR,
                      border: "1px solid rgba(16, 185, 129, 0.2)",
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
        <HvacFlowDiagram category="refrigeration" />

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
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.22)",
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
              Field Diagnostics &amp; A2L Refrigerant Transition Master Guide
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "850px", margin: 0 }}>
              Accurate thermodynamic diagnostics prevent premature compressor burnout, maximize system seasonal efficiency (SEER2/HSPF2), and ensure compliance with the EPA AIM Act transition to low-GWP A2L refrigerants (R-454B and R-32). This master guide details vapor-compression saturation physics, zeotropic temperature glide calculations, TXV vs. fixed-orifice charging, and line-set trim equations.
            </p>
          </div>

          {/* 1. Vapor-Compression Saturation Physics */}
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
              1. Governing Thermodynamic Principles of Vapor-Compression Circuits
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              In a closed vapor-compression refrigeration loop, heat transfer occurs primarily through the <strong>latent heat of phase change</strong> rather than sensible temperature rise. Operating pressures directly determine the saturation temperatures at which the refrigerant boils in the evaporator and condenses in the condenser:
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
              <div><strong>Evaporator Superheat:</strong> Superheat = T_suction_line - T_saturation(P_suction)</div>
              <div><strong>Condenser Subcooling:</strong> Subcooling = T_saturation(P_liquid) - T_liquid_line</div>
              <div><strong>Compression Ratio:</strong> R_c = (P_discharge_psig + 14.696) / (P_suction_psig + 14.696)</div>
              <div><strong>Evaporator Temperature Split:</strong> ΔT_air = T_return_drybulb - T_supply_drybulb (Nominal: 16°F–22°F)</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(16, 185, 129, 0.04)", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase" }}>Superheat Diagnostic Function</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Compressor Liquid Floodback Shield</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                  Guarantees that 100% of liquid refrigerant has boiled into vapor before entering the compressor scroll/reciprocating cavity. Superheat &lt; 5°F risks damaging liquid slugging and oil dilution.
                </div>
              </div>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.15)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#00d2ff", textTransform: "uppercase" }}>Subcooling Diagnostic Function</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Solid Liquid Column at Metering Device</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                  Guarantees that liquid leaving the condenser has rejected sensible heat below condensing saturation, preventing premature vapor flash gas in the liquid line ahead of the TXV/piston orifice.
                </div>
              </div>
            </div>
          </div>

          {/* 2. EPA 608 A2L Transition & Non-Linear Glide */}
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
              2. EPA 608 A2L Transition: Zeotropic Temperature Glide &amp; Saturation Boundaries
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Under the EPA AIM Act mandate, high-GWP refrigerants (such as R-410A, GWP 2088) are phased down in favor of low-GWP A2L alternatives including <strong>R-454B (Opteon XL41 / Puron Advance — GWP 466)</strong> and <strong>R-32 (GWP 675)</strong>. While R-410A is a near-azeotropic blend with negligible glide (&lt;0.3°F), R-454B is a zeotropic blend (68.9% R-32 / 31.1% R-1234yf) that exhibits a measurable <strong>temperature glide of 1.5°F to 2.5°F</strong> during phase changes:
            </p>

            {/* Bubble vs Dew Point Comparison Card */}
            <div
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "0.6rem",
                padding: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)" }}>
                The 2.2°F Zeotropic Calculation Rule (NIST REFPROP Standards)
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                Because the lighter molecule (R-32) boils and condenses at a lower temperature than the heavier HFO component (R-1234yf), saturation temperature changes continuously throughout the heat exchanger:
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                <div style={{ padding: "0.85rem", background: "rgba(16, 185, 129, 0.06)", borderRadius: "0.4rem", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                  <div style={{ fontWeight: 700, color: CATEGORY_COLOR, fontSize: "0.8rem", textTransform: "uppercase" }}>Bubble Point Saturation (Liquid Line)</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--ink)", marginTop: "0.25rem" }}><strong>ALWAYS USE FOR SUBCOOLING</strong></div>
                  <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                    The exact temperature where 100% saturated liquid begins to boil into vapor. Subcooling = T_bubble(P_liquid) - T_liquid_line.
                  </div>
                </div>
                <div style={{ padding: "0.85rem", background: "rgba(0, 210, 255, 0.06)", borderRadius: "0.4rem", border: "1px solid rgba(0, 210, 255, 0.2)" }}>
                  <div style={{ fontWeight: 700, color: "#00d2ff", fontSize: "0.8rem", textTransform: "uppercase" }}>Dew Point Saturation (Suction Line)</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--ink)", marginTop: "0.25rem" }}><strong>ALWAYS USE FOR SUPERHEAT</strong></div>
                  <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                    The exact temperature where the last drop of liquid evaporates into 100% saturated vapor. Superheat = T_suction_line - T_dew(P_suction).
                  </div>
                </div>
              </div>
            </div>

            {/* A2L Characteristics Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-color)", background: "var(--surface-raised)" }}>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>Refrigerant</th>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>ASHRAE Safety Class</th>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>100-Yr GWP</th>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>Temp Glide (°F)</th>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>Operating Pressure vs R-410A</th>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>Charging Protocol</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--ink)" }}>R-410A (Legacy)</td>
                    <td style={{ padding: "0.75rem" }}>A1 (Non-Flammable)</td>
                    <td style={{ padding: "0.75rem" }}>2,088</td>
                    <td style={{ padding: "0.75rem" }}>&lt;0.3°F (Near-Azeotrope)</td>
                    <td style={{ padding: "0.75rem" }}>Baseline (100%)</td>
                    <td style={{ padding: "0.75rem" }}>Standard PT Chart</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(16, 185, 129, 0.03)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: CATEGORY_COLOR }}>R-454B (Opteon XL41)</td>
                    <td style={{ padding: "0.75rem", color: CATEGORY_COLOR, fontWeight: 600 }}>A2L (Mildly Flammable)</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700 }}>466 (-78%)</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700 }}>1.5°F – 2.5°F</td>
                    <td style={{ padding: "0.75rem" }}>5%–8% Lower Head Pressure</td>
                    <td style={{ padding: "0.75rem" }}>Liquid Charging; Bubble/Dew Separation</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--ink)" }}>R-32 (Pure HFC)</td>
                    <td style={{ padding: "0.75rem", color: "#f97316", fontWeight: 600 }}>A2L (Mildly Flammable)</td>
                    <td style={{ padding: "0.75rem" }}>675 (-68%)</td>
                    <td style={{ padding: "0.75rem" }}>0.0°F (Single Component)</td>
                    <td style={{ padding: "0.75rem" }}>1%–3% Higher Head Pressure</td>
                    <td style={{ padding: "0.75rem" }}>Standard Liquid or Vapor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. TXV vs. Fixed Orifice (Piston) Charging Protocols */}
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
              3. Metering Device Diagnostics: TXV (Subcooling) vs. Fixed Orifice (Superheat)
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              The type of expansion device installed determines whether the technician charges by <strong>Subcooling (TXV/EEV)</strong> or <strong>Target Superheat (Piston/Cap Tube)</strong>:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
              {/* TXV Method */}
              <div style={{ padding: "1.25rem", background: "var(--surface-raised)", borderRadius: "0.6rem", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Thermal Expansion Valve (TXV / EEV)
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
                  Primary Charging Standard: Subcooling Method
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                  A TXV actively modulates refrigerant flow to maintain a constant evaporator superheat (typically 8°F–12°F). Therefore, adding or removing refrigerant does not change superheat; it alters the liquid seal in the condenser coil (Subcooling).
                </p>
                <div style={{ fontSize: "0.78rem", background: "var(--surface)", padding: "0.5rem 0.75rem", borderRadius: "4px", border: "1px solid var(--border-subtle)", color: "var(--ink)" }}>
                  <strong>Target Subcooling:</strong> Read OEM nameplate (typically 10°F ± 2°F or 12°F ± 2°F for high-SEER2 microchannel systems).
                </div>
              </div>

              {/* Fixed Orifice Method */}
              <div style={{ padding: "1.25rem", background: "var(--surface-raised)", borderRadius: "0.6rem", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#00d2ff", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Fixed Orifice (Piston / Capillary Tube)
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
                  Primary Charging Standard: Target Superheat Method
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                  A fixed piston orifice has a constant opening area. The amount of refrigerant flowing through it is purely a function of pressure differential and thermal load. Target superheat must be calculated from indoor return wet-bulb and outdoor ambient dry-bulb:
                </p>
                <div style={{ fontSize: "0.78rem", background: "var(--surface)", padding: "0.5rem 0.75rem", borderRadius: "4px", border: "1px solid var(--border-subtle)", color: "var(--ink)", fontFamily: "var(--font-mono, monospace)" }}>
                  Target SH = [ (3 × T_return_wb) - T_outdoor_db - 80 ] / 2
                </div>
              </div>
            </div>
          </div>

          {/* 4. Extended Line Set Trim Calculations */}
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
              4. Extended Line Set Trim Equations &amp; POE Oil Return Hydraulics
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Most residential split-system condensing units come factory pre-charged for <strong>15 feet (4.57 meters)</strong> of interconnecting copper line set. When job site copper routing exceeds 15 feet, additional liquid refrigerant must be weighed in using a calibrated digital scale before system start-up:
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
              <div><strong>Added Charge (oz):</strong> m_add = (L_actual_feet - 15) × Oz_per_foot</div>
              <div><strong>Standard 3/8" OD Liquid Line:</strong> 0.60 oz per linear foot (R-410A / R-454B)</div>
              <div><strong>5/16" OD Mini-Split Liquid Line:</strong> 0.40 oz per linear foot</div>
              <div><strong>1/4" OD Mini-Split Liquid Line:</strong> 0.20 oz per linear foot</div>
              <div><strong>Minimum Suction Gas Velocity:</strong> v_suction ≥ 1,000 FPM (Horizontal), ≥ 1,500 FPM (Vertical Risers)</div>
            </div>

            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(234, 179, 8, 0.05)", border: "1px solid rgba(234, 179, 8, 0.25)" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#eab308", textTransform: "uppercase" }}>⚠️ Oil Return &amp; Vertical Lift Limits</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                When the indoor evaporator is located below the outdoor condenser with vertical elevation rise exceeding 20 feet (6 meters), oil traps (inverted P-traps) must be installed at the base of the suction line riser and every 20 vertical feet thereafter to ensure polyolester (POE) oil travels back to the compressor crankcase.
              </div>
            </div>
          </div>

          {/* 5. 6-Scenario Field Diagnostic Matrix Table */}
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
              5. 6-Scenario Field Diagnostic Matrix: Suction, Head, Superheat &amp; Subcooling
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Technicians frequently misdiagnose restricted airflow as low refrigerant charge because both conditions lower suction pressure. The key differentiator is <strong>Superheat</strong> and <strong>Subcooling</strong>:
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-color)", background: "var(--surface-raised)" }}>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Field Fault Condition</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Suction Pressure</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Head Pressure</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Superheat (SH)</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Subcooling (SC)</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Compressor Amps</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Root Cause / Corrective Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#ef4444" }}>Undercharged (Low Refrigerant)</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 600 }}>LOW ⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 600 }}>LOW ⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 700 }}>HIGH ⬆️ (&gt;20°F)</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 700 }}>LOW ⬇️ (&lt;5°F)</td>
                    <td style={{ padding: "0.65rem" }}>LOW ⬇️</td>
                    <td style={{ padding: "0.65rem" }}>Refrigerant leak. Locate leak with electronic sniffer, repair, evacuate to &lt;500 microns, weigh in nameplate charge.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#ef4444" }}>Overcharged (Excess Refrigerant)</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 600 }}>HIGH ⬆️</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 700 }}>VERY HIGH ⬆️⬆️</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 600 }}>LOW ⬇️ (&lt;5°F)</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 700 }}>HIGH ⬆️ (&gt;16°F)</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 600 }}>HIGH ⬆️</td>
                    <td style={{ padding: "0.65rem" }}>Excess liquid backs up in condenser, reducing effective coil area. Recover refrigerant into dedicated cylinder.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#f97316" }}>Low Indoor Airflow (Dirty Filter/Blower)</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 700 }}>LOW ⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 600 }}>LOW/NORMAL ⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 700 }}>LOW ⬇️ (&lt;6°F)</td>
                    <td style={{ padding: "0.65rem" }}>NORMAL/LOW</td>
                    <td style={{ padding: "0.65rem" }}>LOW ⬇️</td>
                    <td style={{ padding: "0.65rem" }}>Starved heat exchange at evaporator. Check for 1" MERV 13 restriction, dirty coil fins, or low blower CFM.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#f97316" }}>Dirty Condenser Coil (Outdoor Airflow)</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 600 }}>HIGH ⬆️</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 700 }}>VERY HIGH ⬆️⬆️</td>
                    <td style={{ padding: "0.65rem" }}>NORMAL</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 700 }}>LOW ⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 700 }}>HIGH ⬆️</td>
                    <td style={{ padding: "0.65rem" }}>Outdoor fan unable to reject heat. Clean condenser fins with non-acid coil cleaner and wash inside-out.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#eab308" }}>Liquid Line Restriction (Clogged Drier)</td>
                    <td style={{ padding: "0.65rem", color: "#eab308", fontWeight: 700 }}>VERY LOW ⬇️⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#eab308", fontWeight: 600 }}>LOW/NORMAL</td>
                    <td style={{ padding: "0.65rem", color: "#eab308", fontWeight: 700 }}>HIGH ⬆️ (&gt;25°F)</td>
                    <td style={{ padding: "0.65rem", color: "#eab308", fontWeight: 700 }}>HIGH ⬆️ (&gt;15°F)</td>
                    <td style={{ padding: "0.65rem" }}>LOW ⬇️</td>
                    <td style={{ padding: "0.65rem" }}>Liquid trapped ahead of drier. Measure ΔT across filter-drier (&gt;3°F drop indicates restriction). Replace drier.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#38bdf8" }}>TXV Failed Closed (Starved Evaporator)</td>
                    <td style={{ padding: "0.65rem", color: "#38bdf8", fontWeight: 700 }}>VERY LOW ⬇️⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#38bdf8", fontWeight: 600 }}>LOW/NORMAL</td>
                    <td style={{ padding: "0.65rem", color: "#38bdf8", fontWeight: 700 }}>HIGH ⬆️ (&gt;30°F)</td>
                    <td style={{ padding: "0.65rem", color: "#38bdf8", fontWeight: 700 }}>HIGH ⬆️ (&gt;14°F)</td>
                    <td style={{ padding: "0.65rem" }}>LOW ⬇️</td>
                    <td style={{ padding: "0.65rem" }}>Loss of sensing bulb power charge. Inspect bulb mounting (insulated at 10 or 2 o'clock on suction line) or replace TXV.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 6. Worked Field Diagnostic Calculation Example */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2.5rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: CATEGORY_COLOR }}>
              6. Worked Numerical Field Example: R-454B System Diagnostic Analysis
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              A technician connects digital manifolds to a 3-Ton residential heat pump running on <strong>R-454B</strong> with an indoor TXV and a 45-foot 3/8" liquid line. The system exhibits poor cooling on a 90°F outdoor ambient day:
            </p>

            <div
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "0.6rem",
                padding: "1.25rem",
                fontSize: "0.85rem",
                lineHeight: 1.7,
                color: "var(--ink)",
              }}
            >
              <div style={{ fontWeight: 700, color: CATEGORY_COLOR, marginBottom: "0.5rem" }}>Step 1: Record Gauge Pressures &amp; Pipe Temperatures</div>
              <ul style={{ margin: "0 0 1rem", paddingLeft: "1.25rem", color: "var(--ink-secondary)" }}>
                <li>Suction Vapor Pressure: <strong>112.5 psig</strong> | Suction Line Temp: <strong>62.0°F</strong></li>
                <li>Liquid Line Pressure: <strong>325.0 psig</strong> | Liquid Line Temp: <strong>96.5°F</strong></li>
                <li>OEM Factory Subcooling Target: <strong>10.0°F ± 2°F</strong> (Pre-charged for 15 ft)</li>
              </ul>

              <div style={{ fontWeight: 700, color: CATEGORY_COLOR, marginBottom: "0.5rem" }}>Step 2: Reference NIST REFPROP Saturation Boundaries</div>
              <ul style={{ margin: "0 0 1rem", paddingLeft: "1.25rem", color: "var(--ink-secondary)" }}>
                <li>At 112.5 psig, R-454B <strong>Dew Point Saturation</strong> = <strong>37.2°F</strong></li>
                <li>At 325.0 psig, R-454B <strong>Bubble Point Saturation</strong> = <strong>101.4°F</strong> (Dew Point is 103.6°F)</li>
              </ul>

              <div style={{ fontWeight: 700, color: CATEGORY_COLOR, marginBottom: "0.5rem" }}>Step 3: Calculate Superheat &amp; Subcooling</div>
              <div style={{ background: "var(--surface)", padding: "0.75rem", borderRadius: "4px", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono, monospace)", marginBottom: "1rem" }}>
                <div>Superheat = 62.0°F - 37.2°F = <strong>24.8°F (HIGH — Expected 8°F–12°F)</strong></div>
                <div>Subcooling = 101.4°F - 96.5°F = <strong>4.9°F (LOW — Target is 10.0°F)</strong></div>
              </div>

              <div style={{ fontWeight: 700, color: CATEGORY_COLOR, marginBottom: "0.5rem" }}>Step 4: Calculate Extended Line Set Trim Deficit</div>
              <div style={{ background: "var(--surface)", padding: "0.75rem", borderRadius: "4px", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono, monospace)", marginBottom: "1rem" }}>
                <div>Trim Charge = (45 ft - 15 ft) × 0.60 oz/ft = <strong>18.0 oz (1.125 lbs)</strong></div>
              </div>

              <div style={{ fontWeight: 700, color: "#10b981", marginBottom: "0.25rem" }}>Diagnostic Conclusion &amp; Resolution:</div>
              <p style={{ margin: 0, color: "var(--ink-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                High superheat (24.8°F) paired with low subcooling (4.9°F) and low suction pressure confirms a classic <strong>undercharged condition</strong> caused by the installer failing to weigh in the 18 oz trim charge for the 45 ft line set. Adding 18 oz of liquid R-454B elevates subcooling to 10.2°F, stabilizes suction pressure to 128 psig (44°F coil), and drops superheat to 10.5°F.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
