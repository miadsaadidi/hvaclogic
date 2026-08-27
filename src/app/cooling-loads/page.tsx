import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cooling & Heat Load Calculators — ACCA Manual J/S Sizing Tools | HVACLogic",
  description: "Calculate whole-home heating & cooling BTU requirements, central AC tonnage, and mini-split room loads using ACCA Manual J and Manual S standards.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/cooling-loads`,
  },
  openGraph: {
    title: "Cooling & Heat Load Calculators — ACCA Manual J/S Sizing Tools | HVACLogic",
    description: "Calculate whole-home heating & cooling BTU requirements, central AC tonnage, and mini-split room loads using ACCA Manual J and Manual S standards.",
    url: `${siteConfig.canonicalDomain}/cooling-loads`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cooling & Heat Load Calculators — ACCA Manual J/S Sizing Tools | HVACLogic",
    description: "Calculate whole-home heating & cooling BTU requirements, central AC tonnage, and mini-split room loads using ACCA Manual J and Manual S standards.",
  },
};

const CATEGORY_COLOR = "#38bdf8";

export default function CoolingLoadsHub() {
  const calculators = calculatorRegistry.filter((c) => c.pillar === "cooling-loads");

  return (
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
          Size residential air conditioning equipment, heat pumps, and ductless mini-splits adhering strictly to ACCA Manual J (8th Edition) and Manual S equipment selection protocols.
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
            <span>Comprehensive Engineering Guide</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 0.75rem", color: "var(--ink)" }}>
            ACCA Manual J &amp; Manual S: Cooling Load Sizing &amp; Equipment Selection Master Guide
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "850px", margin: 0 }}>
            Accurate cooling load calculation is the single most critical step in residential and light-commercial HVAC design. Oversized air conditioners short-cycle, leave indoor air humid and clammy, and fail prematurely. Undersized units fail during peak summer heatwaves. This engineering guide details the thermodynamics of building heat gain, ACCA Manual J (8th Edition) calculations, and ACCA Manual S equipment selection protocols.
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
            1. Thermodynamic Fundamentals of Building Heat Gain (ACCA Manual J)
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            Total residential cooling load (q_total) consists of two fundamentally distinct thermodynamic phenomena: <strong>Sensible Heat Gain</strong> (which increases indoor dry-bulb temperature) and <strong>Latent Heat Gain</strong> (which adds airborne moisture that must be condensed out):
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(56, 189, 248, 0.04)", border: "1px solid rgba(56, 189, 248, 0.15)" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase" }}>Sensible Heat Load (Dry-Bulb)</div>
              <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Direct Temperature Elevation</div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                Conduction through walls, roof, ceilings, and slabs + radiant solar gain through windows + internal sensible heat from appliances, lighting, and human occupants (typically 230 BTU/hr per person).
              </div>
            </div>
            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.15)" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#00d2ff", textTransform: "uppercase" }}>Latent Heat Load (Moisture Grains)</div>
              <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Airborne Water Vapor Removal</div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                Moisture introduced by outdoor air infiltration, human perspiration/respiration (200 BTU/hr latent per person), cooking, and shower steam. Requires evaporator coil temperatures below air dew-point to condense.
              </div>
            </div>
          </div>
        </div>

        {/* 2. ACCA Manual J & S 5-Step Sizing Sequence */}
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
            2. ACCA Manual J &amp; Manual S 5-Step Sizing Sequence
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
            Professional mechanical engineering eliminates guesswork by executing a rigorous 5-step sequence adhering to ACCA Manual J (8th Edition) and Manual S equipment selection standards:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                1
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  Architectural Envelope &amp; Solar Orientation Audit
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Measure gross exterior wall, roof, ceiling, and slab/floor surfaces. Subtract fenestration areas. Account for cardinal orientation (North, East, South, West), overhang depths, and Window Solar Heat Gain Coefficients (SHGC) to accurately model peak afternoon solar gains.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                2
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  Infiltration Modeling &amp; Fresh Air Ventilation
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Convert whole-house blower door leakage test data (ACH50) into natural CFM infiltration using the Sherman-Grimsrud LBL correlation and local shielding factors. Add mandatory continuous ASHRAE 62.2 mechanical fresh air ventilation loads.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                3
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  Climatic Design Condition Selection (ASHRAE 1% Peak)
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Select the 1% summer cooling design dry-bulb and coincident wet-bulb temperature from ACCA Manual J Table 1A / ASHRAE Fundamentals (e.g. 95°F DB / 78°F coincident WB). Standard residential indoor design baseline is fixed at 75°F dry-bulb and 50% relative humidity.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                4
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  Room-by-Room Sensible Sizing &amp; CFM Allocation
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Calculate individual room sensible BTU/hr to establish specific room airflow requirements: <code>CFM = Sensible_BTU / (1.08 × 20°F ΔT)</code>. This room-by-room CFM distribution serves as the direct mathematical input for ACCA Manual D duct branch sizing in our <Link href="/calculators/ductulator" style={{ color: CATEGORY_COLOR, fontWeight: 600 }}>Digital Ductulator</Link>.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(56, 189, 248, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                5
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  ACCA Manual S Equipment Capacity Verification
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Verify that the selected equipment's expanded performance ratings at actual local summer design conditions (not standard AHRI test conditions of 95°F ambient / 80°F indoor DB / 67°F WB) satisfy the calculated sensible and total loads within strict Manual S oversizing limits.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. The Danger of Oversizing & The "Rule-of-Thumb" Fallacy */}
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
            3. The Danger of Oversizing &amp; The "500 Sq Ft Per Ton" Fallacy
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            For decades, contractors relied on crude rules-of-thumb such as "1 ton per 500 sq ft". In modern construction—featuring double-pane Low-E argon windows, continuous R-20+ wall insulation, and tight air barriers (ACH50 ≤ 3.0)—heat loss and gain have plummeted by up to 60%. Sizing a modern home at 500 sq ft/ton results in equipment oversized by 1.5× to 2.5×, causing severe operational degradation:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ef4444" }}>Inadequate Dehumidification</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                <strong>Cold, Clammy Air:</strong> An oversized AC satisfies the thermostat in 8 minutes and shuts down. The evaporator coil never maintains steady-state condensed water drainage, leaving relative humidity above 60% and triggering mold and dust mites.
              </div>
            </div>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f59e0b" }}>Chronic Short-Cycling</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                <strong>Premature Compressor Burnout:</strong> Repeated starts draw locked-rotor inrush amperage (LRA) 4 to 6 times per hour, overheating compressor motor windings, pitting contactor points, and inflating electric bills.
              </div>
            </div>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#00d2ff" }}>Static Pressure Choking</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                <strong>Whistling Vents &amp; Fan Burnout:</strong> Installing a 4-ton AC (1,600 CFM) on existing ductwork designed for 2.5 tons (1,000 CFM) spikes static pressure above 0.9 in. wg, causing loud register whistling and ECM blower module failure.
              </div>
            </div>
          </div>
        </div>

        {/* 4. ACCA Manual S Equipment Sizing Tolerances Matrix */}
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
            4. ACCA Manual S Equipment Sizing Tolerances Matrix
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
            ACCA Manual S enforces strict mathematical boundaries between calculated Manual J building loads and selected equipment capacity to safeguard efficiency and moisture control:
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
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Sensible Capacity Limit</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Total Cooling Limit</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Heating Capacity Limit</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Single-Speed Air Conditioner</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>100% to 115% of Sensible Load</td>
                  <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 600 }}>Max 115% of Total Load</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>N/A (Cooling Only)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Single-Speed Heat Pump</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>100% to 115% of Sensible Load</td>
                  <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 600 }}>Max 115% of Total Load</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Max 125% of Heating Load</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Two-Stage Cooling / Heat Pump</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>100% to 120% of Sensible Load</td>
                  <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 600 }}>Max 120% of Total Load</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Max 130% of Heating Load</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Variable-Capacity Inverter Heat Pump</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>100% to 130% of Sensible Load</td>
                  <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 600 }}>Max 130% of Total Load</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Up to 140% (Cold-Climate Priority)</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Multi-Zone Ductless Mini-Split</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Sum of Indoor Heads ≥ Zone Loads</td>
                  <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 600 }}>100%–130% Diversity Ratio</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Sized for Low-Ambient Balance Point</td>
                </tr>
              </tbody>
            </table>
          </div>
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
            5. Inverter Modulation &amp; Multi-Zone Diversity Ratios
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            Modern variable-speed inverter compressors modulate output continuously (typically between 20% and 120% of rated nominal capacity) by varying brushless DC motor frequency via pulse-width modulation (PWM). In multi-zone ductless mini-split applications, this enables <strong>connected capacity diversity</strong>:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>Diversity Factor (100%–130%)</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                East-facing bedrooms peak at 9:00 AM, while West-facing living rooms peak at 5:00 PM. An inverter outdoor unit dynamically shifts liquid refrigerant via individual Electronic Expansion Valves (EEVs), allowing 36,000 BTU of connected indoor heads on a 30,000 BTU outdoor unit without compressor overload.
              </div>
            </div>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>Continuous Dehumidification</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                During partial-load conditions (e.g. 82°F cloudy summer day), the inverter throttles compressor speed to 30%, keeping the coil cold and running non-stop. This extracts up to 2.5× more latent moisture than single-stage cycling.
              </div>
            </div>
          </div>
          <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--ink-secondary)" }}>
            👉 Model your multi-room indoor heads and outdoor compressor sizing using our <Link href="/calculators/mini-split-sizing" style={{ color: CATEGORY_COLOR, fontWeight: 600 }}>Mini-Split Multi-Zone Sizing Calculator</Link>.
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
            6. Choosing the Right Cooling &amp; Load Sizing Calculator
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
            Select the appropriate tool for your specific engineering or diagnostic task:
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
                Whole-home and room-by-room heating &amp; cooling load screening based on square footage, climate zone, and insulation.
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
                Determine nominal AC tonnage (1.5 to 5.0 Tons), required airflow CFM (400 CFM/ton), and SEER2 electrical operating costs.
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
                Decode nameplate serial strings on Carrier, Trane, Lennox, Goodman, Rheem, and York units to find nominal cooling tonnage.
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
                Size multi-zone ductless heat pumps with up to 6 custom rooms, indoor head BTU matching, and outdoor compressor diversity gauge.
              </div>
            </Link>
          </div>
        </div>

        {/* 7. Authoritative Engineering FAQs */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.85rem",
            padding: "1.75rem",
          }}
        >
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 1.25rem", color: CATEGORY_COLOR }}>
            Frequently Asked Questions: ACCA Manual J &amp; Manual S Sizing
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                What is the difference between ACCA Manual J and ACCA Manual S?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                <strong>ACCA Manual J</strong> calculates the physical heating and cooling load of the structure (how many BTUs the building gains or loses under 1% design conditions). <strong>ACCA Manual S</strong> governs equipment selection—ensuring the HVAC equipment's sensible and total capacities match the Manual J building load within strict oversizing tolerances (typically max 115% for single-speed AC).
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                Why is the rule-of-thumb "500 sq ft per ton" obsolete and dangerous?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                The "500 sq ft per ton" heuristic originated in the 1970s for uninsulated homes with single-pane leaky windows. Modern energy code construction (IECC/ASHRAE 90.2) requires Low-E double glazing, airtight building envelopes (ACH50 ≤ 3.0), and R-20 to R-60 insulation, reducing thermal loads to 800–1,200 sq ft per ton. Using 500 sq ft/ton results in massive oversizing, short-cycling, high indoor humidity, and mold growth.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                What is Sensible Heat Ratio (SHR) and why is it critical in humid climates?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                The Sensible Heat Ratio (<code>SHR = Sensible Load / Total Load</code>) defines the proportion of cooling dedicated to lowering air temperature vs extracting moisture. In humid climates (e.g. Florida, Gulf Coast), building SHR can drop to 0.70 (30% latent moisture load). Selecting an AC unit whose equipment SHR is 0.85 will satisfy the thermostat before sufficient humidity is removed, creating a cold, clammy 72°F space at 68% relative humidity.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                How do variable-speed inverter heat pumps prevent short-cycling?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                Variable-speed inverter heat pumps use brushless DC motors that modulate compressor speed across a wide frequency range (20% to 120% nominal capacity). On mild afternoons when only 30% cooling capacity is required, the inverter slows down to match the exact load in real-time, maintaining continuous airflow, whisper-quiet acoustic operation, and optimal latent moisture dehumidification without cycling off.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                Can total indoor head capacity exceed the outdoor unit's capacity on mini-splits?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                Yes, multi-zone mini-split systems allow an "over-subscription" or diversity ratio of 100% to 130%. Because individual bedrooms, living rooms, and home offices peak at different times of day (morning solar vs afternoon solar vs night occupancy), the intelligent inverter dynamically directs refrigerant flow to active zones without requiring the outdoor compressor to match the sum of all indoor peaks simultaneously.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
