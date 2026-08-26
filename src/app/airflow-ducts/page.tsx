import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Airflow & Duct Sizing Calculators — HVAC Ductulators & CFM Tools | HVACLogic",
  description: "Free online ductulators, CFM airflow calculators, and flexible duct sizing charts built for HVAC technicians and mechanical design engineers.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/airflow-ducts`,
  },
  openGraph: {
    title: "Airflow & Duct Sizing Calculators — HVAC Ductulators & CFM Tools | HVACLogic",
    description: "Free online ductulators, CFM airflow calculators, and flexible duct sizing charts built for HVAC technicians and mechanical design engineers.",
    url: `${siteConfig.canonicalDomain}/airflow-ducts`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airflow & Duct Sizing Calculators — HVAC Ductulators & CFM Tools | HVACLogic",
    description: "Free online ductulators, CFM airflow calculators, and flexible duct sizing charts built for HVAC technicians and mechanical design engineers.",
  },
};

const CATEGORY_COLOR = "#00d2ff";

export default function AirflowDuctsHub() {
  const calculators = calculatorRegistry.filter((c) => c.pillar === "airflow-ducts");

  return (
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
          Design, balance, and size residential and commercial HVAC air distribution systems using standard equal friction equations (ASHRAE/SMACNA/ACCA).
        </p>
      </header>

      {/* CARDS GRID (PowerLab Card Design) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(285px, 1fr))",
          gap: "1.25rem",
          marginTop: "2rem",
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
            <span>Comprehensive Engineering Guide</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 0.75rem", color: "var(--ink)" }}>
            Air Distribution &amp; Duct Hydraulics: Master Design Guide
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "850px", margin: 0 }}>
            Proper HVAC duct design ensures target volumetric airflow (CFM) reaches every conditioned space with minimum fan power, balanced static pressure, and quiet acoustic performance. This guide covers governing fluid mechanics, ACCA Manual D sizing protocols, and real-world installation derating factors.
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
            Air movement through enclosed conduits is governed by the <strong>Darcy-Weisbach equation</strong> combined with the <strong>Colebrook-White relationship</strong> to evaluate turbulent friction factors across varying duct surface roughness:
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
              <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Absolute Roughness ε = 0.0003 ft</div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem" }}>Smooth inner boundary layer minimizes turbulent shear loss.</div>
            </div>
            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(56, 189, 248, 0.04)", border: "1px solid rgba(56, 189, 248, 0.15)" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase" }}>Wire-Helix Flexible Duct</div>
              <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Absolute Roughness ε = 0.0030 ft</div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem" }}>Internal corrugations increase base friction loss by ~10× compared to smooth metal.</div>
            </div>
          </div>
        </div>

        {/* 2. ACCA Manual D Step-by-Step Workflow */}
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
            2. ACCA Manual D 4-Step Duct Sizing Workflow
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
            Rather than picking arbitrary friction rates (e.g. 0.10 in. wg/100 ft), professional HVAC design follows a deterministic 4-step sizing sequence:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(0, 210, 255, 0.15)", color: "var(--accent-cooling)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                1
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  Determine Room CFM from Sensible Heat Load
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Calculate room volumetric airflow using the sensible heat formula: <code>CFM = Q_sensible / (1.08 × ΔT)</code>, where ΔT is the design temperature difference (typically 18°F–22°F in cooling).
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
                  Subtract all component pressure drops from manufacturer blower external static pressure (ESP): <code>ASP = ESP - ΔP_coil - ΔP_filter - ΔP_registers - ΔP_dampers</code>.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(0, 210, 255, 0.15)", color: "var(--accent-cooling)", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                3
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  Sum Total Effective Length (TEL) for Critical Path
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Measure physical straight duct length from blower to the most hydraulically distant register, then add the equivalent straight-duct length of every elbow, tee, transition, damper, and boot fitting.
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
                  Calculate system friction rate per 100 feet of duct: <code>FR = (ASP × 100) / TEL</code>. Use this exact FR value in our <Link href="/calculators/ductulator" style={{ color: "var(--accent-cooling)", fontWeight: 600 }}>Digital Ductulator</Link> to size all supply and return trunks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Recommended Air Velocity Limits Matrix Table */}
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
            3. Recommended Velocity &amp; Acoustic Limits (ASHRAE / SMACNA)
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
            Excessive air velocity generates turbulent noise, register whistling, and vibration. The table below outlines maximum recommended air velocities across residential and commercial applications:
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
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Residential Max (FPM)</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Commercial Max (FPM)</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Acoustic Target (NC)</th>
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

        {/* 4. Flexible Duct Installation Sag & Compression Derating */}
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
            4. Flexible Duct Compression &amp; Installation Sag Derating
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            Field research by Texas A&amp;M and SMACNA demonstrates that flexible ducts rarely achieve laboratory airflow when installed in unconditioned attics and crawlspaces due to longitudinal compression and sag between support straps:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10b981" }}>4% Compression (Taut)</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem" }}>
                <strong>1.2× Friction Factor:</strong> Maximum allowable installation slack under SMACNA standards with straps spaced ≤4 ft apart.
              </div>
            </div>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f59e0b" }}>15% Compression (Moderate)</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem" }}>
                <strong>1.6× Friction Factor:</strong> Typical careless residential installation; drops an 8" flex duct from 160 CFM to ~115 CFM.
              </div>
            </div>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ef4444" }}>30% Compression (Sagging)</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem" }}>
                <strong>2.2× Friction Factor:</strong> Severe bunched runs and pinched bends; chokes airflow and causes blower motor overheating.
              </div>
            </div>
          </div>
          <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
            👉 Use our interactive <Link href="/calculators/flex-duct-cfm-chart" style={{ color: "var(--accent-cooling)", fontWeight: 600 }}>Flexible Duct CFM &amp; Friction Drop Chart</Link> to dynamically simulate airflow capacity under 0% to 30% compression.
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
            Select the appropriate tool for your specific engineering task:
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
                Quick reference lookup table for flexible branch runs (4" through 20") with one-click printable submittal card.
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
                Convert air velocity (FPM) to volumetric CFM across any duct cross-section and compute required room ventilation.
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
                Calculate available static pressure (ASP), fitting equivalent lengths, and system design friction rate.
              </div>
            </Link>
          </div>
        </div>

        {/* 6. Authoritative Engineering FAQs */}
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
                What is the standard design friction rate for residential HVAC ductwork?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                Under ACCA Manual D guidelines, residential supply ductwork is commonly designed at a friction rate between 0.08 and 0.10 in. wg per 100 ft of equivalent length. However, when total effective length (TEL) exceeds 300 ft or when high-efficiency MERV 13+ filters are installed, the actual design friction rate must often be reduced to 0.05 or 0.06 in. wg to prevent blower static choking.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                How do you convert round duct size to rectangular duct dimensions?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                Round duct diameter converts to equivalent rectangular dimensions using Huebscher's formula: <code>De = 1.30 × ( (a × b)^0.625 ) / ( (a + b)^0.25 )</code>. Note that equivalent rectangular dimensions will always have a larger physical cross-sectional area than the round duct to compensate for boundary-layer friction along the duct corners. Keep aspect ratios (width to height) below 4:1 to avoid severe acoustic turbulence.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                How many CFM can standard flexible duct sizes carry?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                At a standard 0.08 to 0.10 in. wg friction rate with proper 4% installation tension: a 6-inch flex duct delivers 75–85 CFM; an 8-inch flex delivers 150–160 CFM; a 10-inch flex delivers 260–280 CFM; and a 12-inch flex delivers 420–460 CFM. If the flex duct is compressed by 15% or sags between joists, capacity drops by 20% to 35%.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                Why is return ductwork typically sized larger than supply ductwork?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                Return air ductwork is sized at lower design velocities (typically 500–700 FPM vs 700–900 FPM for supply) to minimize acoustic noise at return grilles, reduce filter face velocity, and prevent negative pressure starvation at the furnace/air handler blower intake.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

