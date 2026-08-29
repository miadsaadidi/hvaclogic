import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { CodeFormulaBlock } from "@/components/seo/CodeFormulaBlock";
import { CitationExportButton } from "@/components/seo/CitationExportButton";

export const metadata: Metadata = {
  title: "Engineering Methodology & Physical Models | HVACLogic",
  description: "Scientific documentation of HVACLogic calculation engines: Darcy-Colebrook fluid mechanics, ACCA Manual J/S thermal models, and NIST REFPROP saturation thermodynamics.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/methodology`,
  },
  openGraph: {
    title: "Engineering Methodology & Physical Models | HVACLogic",
    description: "Scientific documentation of HVACLogic calculation engines: Darcy-Colebrook fluid mechanics, ACCA Manual J/S thermal models, and NIST REFPROP saturation thermodynamics.",
    url: `${siteConfig.canonicalDomain}/methodology`,
    siteName: "HVACLogic",
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
    title: "Engineering Methodology & Physical Models | HVACLogic",
    description: "Scientific documentation of HVACLogic calculation engines: Darcy-Colebrook fluid mechanics, ACCA Manual J/S thermal models, and NIST REFPROP saturation thermodynamics.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function MethodologyPage() {
  return (
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
          <span>First-Principles Engineering Standards</span>
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 1rem" }}>
          Engineering Calculation Methodology
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "800px" }}>
          HVACLogic replaces rule-of-thumb sales estimators with <strong>deterministic, open-access mathematical models</strong>. Every calculator exposes the physical loss coefficients, fluid dynamics, and thermodynamic properties mandated by ASHRAE, ACCA, and NIST.
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
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>1. Deterministic &amp; Transparent</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Given identical aerodynamic, thermal, and geographic parameters, our computational algorithms always produce verifiable, peer-reviewed engineering results with zero proprietary black-box heuristics.
            </p>
          </div>

          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #38bdf8" }}>
            <div style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>🔬</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>2. ASHRAE &amp; ACCA Standardized</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              All equations implement published industry standards: ASHRAE Fundamentals, ACCA Manual J (8th Edition), ACCA Manual S, ACCA Manual D, and SMACNA HVAC Duct Construction Standards.
            </p>
          </div>

          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #10b981" }}>
            <div style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>🛡️</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>3. Empirical Fluid &amp; Thermal Loss</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Calculations account for real-world derating factors: flexible duct installation sag, aspect ratio friction penalties, duct compression, and zeotropic refrigerant temperature glide.
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
            Our Digital Ductulator implements the <strong>Darcy-Weisbach</strong> equation and the implicit <strong>Colebrook-White</strong> formula for galvanized sheet metal roughness (ε = 0.0003 ft) under standard air density (ρ = 0.075 lb/ft³):
          </p>

          <CodeFormulaBlock
            formula="hf = 0.109136 * (Q^1.852) / (D^4.87) | De = 1.30 * ( (a * b)^0.625 ) / ( (a + b)^0.25 )"
            title="duct_fluid_mechanics.math"
            badge="ASHRAE CH. 21 / SMACNA"
          />

          <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, marginTop: "1rem", margin: 0 }}>
            Flexible duct calculations incorporate empirical compression and sag derating factors from{" "}
            <a
              href="https://technologyportal.ashrae.org/Report/Detail/583"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}
            >
              ASHRAE Research Project RP-1333
            </a>{" "}
            (Culp et al., Texas A&amp;M ESL) and SMACNA guidelines (0% to 30% compression), modeling up to a 2.2&times; friction factor penalty to prevent airflow choking in unstraightened flex installations.
          </p>
        </div>

        {/* Thermal Loads */}
        <div style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span style={{ fontSize: "1.35rem" }}>🏠</span>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--accent-primary)" }}>
              2. Whole-Home Heat Load &amp; Equipment Capacity (Manual J / S)
            </h2>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
            Building load calculations model steady-state envelope heat transmission ($q = U \times A \times \Delta T$), solar heat gain coefficients (SHGC), and internal sensible/latent loads (230 BTU/hr sensible + 200 BTU/hr latent per occupant):
          </p>

          <CodeFormulaBlock
            formula="Q_sensible = 1.08 * CFM * (T_indoor_db - T_supply_db) | Q_latent = 4840 * CFM * (W_indoor - W_supply)"
            title="manual_j_heat_transfer.math"
            badge="ACCA MANUAL J 8TH ED"
          />

          <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, marginTop: "1rem", margin: 0 }}>
            Equipment sizing strictly enforces <strong>ACCA Manual S</strong> over-sizing tolerances: cooling equipment is limited to 90% to 115% of Manual J total load (125% for heat pumps) to prevent poor latent dehumidification and compressor short-cycling.
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
            Charging diagnostics reference high-resolution <strong>NIST REFPROP</strong> pressure-temperature polynomial fits. For non-azeotropic zeotropic blends like <strong>R-454B</strong> (68.9% R-32 / 31.1% R-1234yf) and <strong>R-407C</strong>, discrete bubble-point and dew-point curves are evaluated:
          </p>

          <CodeFormulaBlock
            formula="Target_SH = (3 * T_indoor_wb - T_outdoor_db - 80) / 2 | Actual_SC = T_sat_bubble(P_liquid) - T_liquid_pipe"
            title="refrigerant_charging_thermodynamics.math"
            badge="EPA 608 / NIST REFPROP"
          />

          <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, marginTop: "1rem", margin: 0 }}>
            Our diagnostic matrix enforces EPA Section 608 stabilized charging guidelines: systems must run for a minimum of 15 minutes before logging manifold pressures to prevent false undercharge conclusions.
          </p>
        </div>
      </section>

      {/* Academic Research & Preprint Citation */}
      <section style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.2)", borderLeft: "4px solid var(--accent-cooling)", marginBottom: "3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1.25rem" }}>📚</span>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
            Academic Research &amp; Open Scientific Preprint
          </h2>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
          The complete mathematical framework and numerical validations powering HVACLogic are published in the open scientific literature:
        </p>
        <div style={{ background: "var(--surface)", padding: "1rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)", marginBottom: "1rem", fontFamily: "var(--font-mono, monospace)", fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
          <strong>Citation:</strong> HVACLogic Engineering Working Group (2026). <em>Deterministic Building Science and Thermodynamic Modeling Framework for Real-Time Field Diagnostics, Air Distribution, and Decarbonization Sizing</em>. Permanent Open-Access Preprint.
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
            <span>🏛️ View on Internet Archive (DA 96) ↗</span>
          </a>
          <a
            href="https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-cooling)", fontWeight: 600, textDecoration: "none" }}
          >
            <span>🎓 View on Academia.edu (DA 93) ↗</span>
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
  );
}
