import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import { siteConfig } from "@/lib/site-config";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = {
  title: "Airflow & Duct Sizing Calculators",
  description: "Free online ductulators, CFM airflow calculators, and flexible duct sizing charts built for HVAC technicians and mechanical design engineers.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/airflow-ducts`,
  },
  openGraph: {
    title: "Airflow & Duct Sizing Calculators",
    description: "Free online ductulators, CFM airflow calculators, and flexible duct sizing charts built for HVAC technicians and mechanical design engineers.",
    url: `${siteConfig.canonicalDomain}/airflow-ducts`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Airflow & Duct Sizing Calculators — HVACLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Airflow & Duct Sizing Calculators",
    description: "Free online ductulators, CFM airflow calculators, and flexible duct sizing charts built for HVAC technicians and mechanical design engineers.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

const CATEGORY_COLOR = "#00d2ff";

export default function AirflowDuctsHub() {
  const calculators = calculatorRegistry.filter((c) => c.pillar === "airflow-ducts");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.canonicalDomain}/airflow-ducts#collection`,
        name: "Airflow & Duct Sizing Calculators",
        description: "Free online ductulators, CFM airflow calculators, and flexible duct sizing charts built for HVAC technicians and mechanical design engineers.",
        url: `${siteConfig.canonicalDomain}/airflow-ducts`,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.canonicalDomain}/#website`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.canonicalDomain}/airflow-ducts#breadcrumbs`,
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
            name: "Airflow & Ducts",
            item: `${siteConfig.canonicalDomain}/airflow-ducts`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Airflow & Duct Sizing Calculators",
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
          <span aria-current="page">Airflow &amp; Ducts</span>
        </nav>

        <header className="calculator-header">
          <span className="eyebrow">Category Hub</span>
          <h1>Airflow &amp; Duct Sizing Calculators</h1>
          <p className="intro">
            Design, balance, and size residential and commercial HVAC air distribution systems using fluid mechanics principles, ACCA Manual D methodology, and ASHRAE/SMACNA technical guidance.
          </p>
        </header>

        {/* CARDS GRID */}
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "2.5rem 0 1rem", color: "var(--ink)" }}>
          Available Airflow &amp; Duct Calculators
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
                  Airflow &amp; Ducts
                </span>
                <span style={{ fontSize: "1.4rem" }}>🌀</span>
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
                      background: "rgba(0, 210, 255, 0.1)",
                      color: CATEGORY_COLOR,
                      border: "1px solid rgba(0, 210, 255, 0.2)",
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
        <HvacFlowDiagram category="airflow" />

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
                background: "rgba(0, 210, 255, 0.08)",
                border: "1px solid rgba(0, 210, 255, 0.22)",
                color: "var(--accent-cooling)",
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
              Air Distribution &amp; Duct Hydraulics: Technical Guide
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "850px", margin: 0 }}>
              Proper HVAC duct design ensures target volumetric airflow (CFM) reaches every conditioned space within the fan&apos;s available static pressure envelope, balanced acoustic criteria, and practical installation constraints.
            </p>
          </div>

          {/* 1. Governing Fluid Mechanics */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: "var(--accent-cooling)" }}>
              1. Governing Fluid Mechanics of Duct Hydraulics
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Air movement through enclosed conduits is modeled using the <strong>Darcy-Weisbach equation</strong> combined with the <strong>Colebrook-White formulation</strong> to evaluate turbulent friction factors across varying duct wall surface roughness values:
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
              <div><strong>Friction Loss Equation:</strong> Δpf = 100 × f × (12 / Dh) × (ρ × v² / (2 × gc))</div>
              <div><strong>Colebrook-White Formulation:</strong> 1 / √f = -2 log₁₀( (ε / (3.7 × Dh)) + (2.51 / (Re × √f)) )</div>
              <div><strong>Huebscher Equivalent Diameter:</strong> De = 1.30 × ( (a × b)^0.625 ) / ( (a + b)^0.25 )</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.15)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-cooling)", textTransform: "uppercase" }}>Galvanized Sheet Metal</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Absolute Roughness ε ≈ 0.0003 ft</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem" }}>Smooth inner boundary layer minimizes turbulent shear resistance.</div>
              </div>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(56, 189, 248, 0.04)", border: "1px solid rgba(56, 189, 248, 0.15)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase" }}>Wire-Helix Flexible Duct</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Absolute Roughness ε ≈ 0.0030 ft (Taut)</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem" }}>Internal wire corrugations introduce boundary-layer turbulence compared to smooth metal.</div>
              </div>
            </div>
          </div>

          {/* 2. Simplified Duct Sizing Workflow */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: "var(--accent-cooling)" }}>
              2. Simplified Duct Sizing Workflow (ACCA Manual D Principles)
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Rather than selecting arbitrary friction rates, proper HVAC duct sizing derives the required design friction rate directly from available fan static pressure and critical-path equivalent length:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(0, 210, 255, 0.15)", color: "var(--accent-cooling)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  1
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Determine Room Airflow (CFM)
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Calculate room supply airflow using sensible load requirements: <code>CFM = Q_sensible / (1.08 × ΔT)</code>, where ΔT represents the design supply-to-room temperature difference (typically 18°F–22°F in cooling).
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(0, 210, 255, 0.15)", color: "var(--accent-cooling)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  2
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Calculate Available Static Pressure (ASP)
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Subtract all internal and external component pressure drops (coil, filter, grilles, dampers) from the blower&apos;s rated External Static Pressure (ESP): <code>ASP = ESP - ΔP_components</code>.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(0, 210, 255, 0.15)", color: "var(--accent-cooling)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  3
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Sum Total Effective Length (TEL)
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Measure straight duct physical length along the most restrictive (critical) supply and return path, then add the equivalent length values for all fittings, elbows, boots, and transitions.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(0, 210, 255, 0.15)", color: "var(--accent-cooling)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  4
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Derive Design Friction Rate (FR)
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Calculate system design friction rate per 100 feet of equivalent duct: <code>FR = (ASP × 100) / TEL</code>. Use this calculated FR in our <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", fontWeight: 600 }}>Digital Ductulator</Link> to size supply and return runs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Typical Design Velocity & Acoustic Ranges */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: "var(--accent-cooling)" }}>
              3. Typical Design Velocity &amp; Acoustic Ranges
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Air velocity directly impacts noise generation, duct breakout sound, and friction loss. The table below provides representative design velocity ranges commonly referenced in residential and light-commercial duct design:
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
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Duct Section</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Typical Residential (FPM)</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Typical Commercial (FPM)</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Acoustic Target (NC Range)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Main Supply Trunk</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>700 – 900 FPM</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>1,000 – 1,300 FPM</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--accent-cooling)", fontWeight: 600 }}>NC 25 – 30</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Supply Branch Runouts</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>500 – 600 FPM</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>700 – 900 FPM</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--accent-cooling)", fontWeight: 600 }}>NC 25 – 30</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Main Return Trunk</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>600 – 700 FPM</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>800 – 1,000 FPM</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--accent-cooling)", fontWeight: 600 }}>NC 25 – 30</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Supply Diffuser Neck</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>400 – 500 FPM</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>500 – 700 FPM</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--accent-cooling)", fontWeight: 600 }}>NC 20 – 25</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Return Filter Grille Face</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>300 – 400 FPM</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>400 – 500 FPM</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--accent-cooling)", fontWeight: 600 }}>NC 20 – 25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. Flexible Duct Installation Variables & Compression Derating */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: "var(--accent-cooling)" }}>
              4. Flexible Duct Installation Variables &amp; Compression Derating
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Laboratory and field research (including Texas A&amp;M and ASHRAE testing) demonstrates that flexible duct friction increases significantly when ducts are installed with longitudinal compression, excessive slack, or unmitigated sag between support hangers:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10b981" }}>4% Compression (Taut)</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem" }}>
                  <strong>~1.2× Friction Factor:</strong> Representative of carefully pulled runs installed with support straps spaced ≤4 ft apart.
                </div>
              </div>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f59e0b" }}>15% Compression (Moderate)</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem" }}>
                  <strong>~1.6× Friction Factor:</strong> Representative of moderate field slack or bunched inner cores, materially increasing pressure loss.
                </div>
              </div>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ef4444" }}>30% Compression (Sagging)</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem" }}>
                  <strong>~2.2× Friction Factor:</strong> Representative of bunched runs, sharp kinks, and unsupported sag, substantially elevating system static pressure.
                </div>
              </div>
            </div>
            <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
              👉 Simulate friction loss and airflow capacity under varying installation conditions using our <Link href="/calculators/flex-duct-cfm-chart" style={{ color: "var(--accent-cooling)", fontWeight: 600 }}>Flexible Duct CFM &amp; Friction Drop Chart</Link>.
            </div>
          </div>

          {/* 5. Tool Selection Decision Matrix */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 0.75rem", color: "var(--accent-cooling)" }}>
              5. Choosing the Right Airflow &amp; Duct Calculator
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Select the dedicated calculator matching your specific design or sizing task:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <Link
                href="/calculators/ductulator"
                style={{
                  padding: "1.1rem",
                  borderRadius: "0.6rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontWeight: 700, color: "var(--accent-cooling)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                  🌀 Digital Ductulator →
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                  Size round, rectangular, and flat oval ducts using equal friction equations with live 2D cross-section rendering.
                </div>
              </Link>

              <Link
                href="/calculators/flex-duct-cfm-chart"
                style={{
                  padding: "1.1rem",
                  borderRadius: "0.6rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontWeight: 700, color: "var(--accent-cooling)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                  📋 Flex Duct CFM Chart →
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                  Lookup table and printable charts for flexible duct branch runs (4&quot; through 20&quot;) across varied friction rates.
                </div>
              </Link>

              <Link
                href="/calculators/cfm-calculator"
                style={{
                  padding: "1.1rem",
                  borderRadius: "0.6rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontWeight: 700, color: "var(--accent-cooling)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                  💨 CFM &amp; Airflow Sizer →
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                  Convert air velocity (FPM) to volumetric flow (CFM) across custom duct cross-sections and evaluate ventilation requirements.
                </div>
              </Link>

              <Link
                href="/calculators/duct-friction-loss-calculator"
                style={{
                  padding: "1.1rem",
                  borderRadius: "0.6rem",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontWeight: 700, color: "var(--accent-cooling)", fontSize: "0.95rem", marginBottom: "0.25rem" }}>
                  📏 Duct Friction Loss &amp; TEL →
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                  Calculate available static pressure (ASP), fitting equivalent lengths (TEL), and system design friction rate.
                </div>
              </Link>
            </div>
          </div>

          {/* 6. Technical Engineering FAQs */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 1.25rem", color: "var(--accent-cooling)" }}>
              Frequently Asked Questions: Air Distribution &amp; Duct Sizing
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  How is the design friction rate determined for residential ductwork?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Under ACCA Manual D methodology, design friction rate is not a universal fixed constant; it is derived from system Available Static Pressure (ASP) and Total Effective Length (TEL): <code>FR = (ASP × 100) / TEL</code>. While typical residential supply systems often fall around 0.08 to 0.10 in. wg/100 ft, systems with restrictive fittings, long runs, or high-pressure-drop filters may require lower design friction rates (e.g., 0.05 to 0.06 in. wg/100 ft) to prevent exceeding blower static limits.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  How do you convert round duct size to equivalent rectangular dimensions?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Round duct diameter converts to equivalent rectangular dimensions using Huebscher&apos;s formula: <code>De = 1.30 × ( (a × b)^0.625 ) / ( (a + b)^0.25 )</code>. This equation equates hydraulic friction loss per unit length at matching airflow, not geometric physical area. Practical design guidelines typically recommend maintaining aspect ratios (width to height) below 4:1 to facilitate fabrication and balance boundary shear effects.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  How is flexible duct airflow capacity evaluated?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Flexible duct capacity depends on internal diameter, run length, allowable pressure loss, and installation tension. Under typical taut baseline conditions (~0.08 to 0.10 in. wg/100 ft friction rate), a 6-inch flex duct delivers approximately 75–85 CFM, an 8-inch delivers 150–160 CFM, a 10-inch delivers 260–280 CFM, and a 12-inch delivers 420–460 CFM. Longitudinal compression or unsupported sag introduces additional turbulence, increasing resistance and reducing delivered airflow.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  Why is return ductwork typically sized with lower design velocities?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Return air ductwork is commonly designed at lower target velocities (typically 500–700 FPM vs. 700–900 FPM for supply trunks) to minimize noise at intake grilles, manage filter face velocity, and avoid unnecessary negative pressure drops upstream of the blower.
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
