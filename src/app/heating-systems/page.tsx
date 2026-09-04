import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Heating & Heat Pump Calculators",
  description: "Calculate cold-climate heat pump balance points, furnace sizing, NFPA 54 combustion air, and boiler loads adhering to ACCA Manual J/S and AHRI standards.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/heating-systems`,
  },
  openGraph: {
    title: "Heating & Heat Pump Calculators",
    description: "Calculate cold-climate heat pump balance points, furnace sizing, NFPA 54 combustion air, and boiler loads adhering to ACCA Manual J/S and AHRI standards.",
    url: `${siteConfig.canonicalDomain}/heating-systems`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Heating & Heat Pump Sizing Calculators — HVACLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heating & Heat Pump Calculators",
    description: "Calculate cold-climate heat pump balance points, furnace sizing, NFPA 54 combustion air, and boiler loads adhering to ACCA Manual J/S and AHRI standards.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

const CATEGORY_COLOR = "#ff6b4a";

export default function HeatingSystemsHub() {
  const calculators = calculatorRegistry.filter((c) => c.pillar === "heating-systems");

  return (
    <main className="page site-container">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span aria-current="page">Heating &amp; Heat Pumps</span>
      </nav>

      <header className="calculator-header">
        <span className="eyebrow">Category Hub</span>
        <h1>Heating, Heat Pumps &amp; Electrification Calculators</h1>
        <p className="intro">
          Electrification sizing, cold-climate inverter heat pump balance points, gas combustion air calculations (NFPA 54 / IFGC), AFUE furnace matching, and hydronic boiler radiation (EDR) sizing.
        </p>
      </header>

      {/* CARDS GRID (PowerLab Card Design) */}
      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "2.5rem 0 1rem", color: "var(--ink)" }}>
        Available Heating &amp; Electrification Calculators
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
                Heating &amp; Heat Pumps
              </span>
              <span style={{ fontSize: "1.4rem" }}>🔥</span>
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
                    background: "rgba(255, 107, 74, 0.1)",
                    color: CATEGORY_COLOR,
                    border: "1px solid rgba(255, 107, 74, 0.2)",
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
      <HvacFlowDiagram category="heating" />

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
              background: "rgba(255, 107, 74, 0.08)",
              border: "1px solid rgba(255, 107, 74, 0.22)",
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
            Heating, Heat Pump &amp; Electrification Engineering Master Guide
          </h2>
          <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "850px", margin: 0 }}>
            Modern heating design is undergoing a massive paradigm shift from fossil fuel over-firing to precision heat pump electrification, multi-stage AFUE furnaces, and low-temperature hydronics. Accurate heating design requires calculating peak winter thermal loss at the 99% ASHRAE design temperature, mapping heat pump capacity curves to determine the exact thermal balance point, and sizing auxiliary electric or fossil fuel backup without efficiency or acoustic penalties.
          </p>
        </div>

        {/* 1. Thermodynamic Fundamentals of Building Heat Loss & Heating Dynamics */}
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
            1. Thermodynamic Fundamentals of Building Heat Loss &amp; Heat Pump Mechanics
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            Whole-building winter heat loss is governed by Fourier&apos;s Law of Thermal Conduction across the building envelope and bulk mass air exchange (infiltration). Unlike cooling loads, heating load is entirely sensible heat deficit:
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
            <div><strong>Envelope Conduction:</strong> q_conduction = Σ (U × Area × ΔT_heating)</div>
            <div><strong>Infiltration Sensible Deficit:</strong> q_infiltration = 1.08 × CFM_inf × (T_indoor - T_outdoor)</div>
            <div><strong>Total Building Heat Loss:</strong> q_total_loss = q_conduction + q_infiltration</div>
            <div><strong>Heat Pump Coefficient of Performance:</strong> COP = Heating_Output_Watts / Electrical_Input_Watts</div>
            <div><strong>Carnot Theoretical Maximum:</strong> COP_Carnot = T_condenser_K / (T_condenser_K - T_evaporator_K)</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(255, 107, 74, 0.04)", border: "1px solid rgba(255, 107, 74, 0.15)" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase" }}>Conduction &amp; Thermal Bridging</div>
              <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Envelope Assembly U-Factors</div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                Steady-state transmission through stud cavities, exterior continuous insulation, attics, uninsulated basements, and concrete slabs. Parallel-path thermal framing factors (typically 23%–25% wood fraction) must be accounted for.
              </div>
            </div>
            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.15)" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#00d2ff", textTransform: "uppercase" }}>Infiltration &amp; Stack Effect</div>
              <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Cold Air Displacement</div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                Buoyancy-driven pressure differentials draw sub-freezing air through envelope punctures, rim joists, and recessed fixtures. Modeled via blower door depressurization testing (ACH50) converted through climate N-factors.
              </div>
            </div>
          </div>
        </div>

        {/* 2. ACCA Manual S Heating Equipment Selection & Electrification Sequence */}
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
            2. ACCA Manual S Heating Equipment Selection &amp; Electrification 5-Step Sequence
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
            A rigorous engineering sequence ensures zero cold-weather comfort failures while maximizing seasonal COP and preventing oversized blower motor static issues:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(255, 107, 74, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                1
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  99% Winter Design Temperature &amp; Climatic Audit
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Select the local 99% ASHRAE winter design dry-bulb temperature (the temperature exceeded for 99% of all winter hours). For example, Chicago sits at -1°F, Minneapolis at -9°F, and Atlanta at 22°F. Design indoor comfort baseline is standardized at 70°F dry-bulb.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(255, 107, 74, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                2
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  Envelope Heat Deficit &amp; Peak Heating Loss Calculation
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Calculate room-by-room and whole-building conductive and infiltration heat loss at the design temperature differential (ΔT = T_indoor - T_outdoor). Model your building envelope in our <Link href="/calculators/heat-loss-calculator" style={{ color: CATEGORY_COLOR, fontWeight: 600 }}>Heat Loss Calculator</Link>.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(255, 107, 74, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                3
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  Heat Pump Capacity Mapping &amp; Thermal Balance Point (T_bal)
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Plot the heat pump manufacturer&apos;s expanded low-ambient heating capacity curve against the building heat loss line. The intersection is the <strong>Thermal Balance Point</strong> (typically 15°F to 30°F). Above this temperature, the heat pump delivers 100% of heating without supplemental resistance strips.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(255, 107, 74, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                4
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  Supplemental &amp; Emergency Heat Strip Sizing (kW_aux)
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  Size electric resistance heat strips (or dual-fuel gas furnace staging) to cover the thermal deficit below the balance point down to the 99% design temperature: <code>kW_aux = (q_total_loss - q_hp_design) / 3,412.14</code>. Staging prevents severe voltage dips and high demand charges.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(255, 107, 74, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                5
              </div>
              <div>
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                  Combustion Air &amp; Safety Audit (NFPA 54 / IFGC)
                </h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                  For gas furnaces and hydronic boilers, verify whether the mechanical space is unconfined (≥50 cu ft per 1,000 BTU/hr total input). If confined, size mandatory high/low combustion air openings conforming to NFPA 54 in our <Link href="/calculators/combustion-air-calculator" style={{ color: CATEGORY_COLOR, fontWeight: 600 }}>Combustion Air Calculator</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. The Pitfalls of Heating Sizing by "Rule of Thumb" */}
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
            3. Common Heating Sizing Pitfalls &amp; Mechanical Failure Modes
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            Crude contractor heuristics—such as sizing furnaces at 40 to 60 BTU/sq ft or sizing heat pumps strictly for summer cooling—result in catastrophic operational issues:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ef4444" }}>Furnace Short-Cycling &amp; Stress</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                <strong>Heat Exchanger Cracking:</strong> An oversized 100,000 BTU furnace installed on a 45,000 BTU load overheats supply air, trips high-limit safety switches, and subjects heat exchangers to repeated rapid thermal expansion fatigue.
              </div>
            </div>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f59e0b" }}>Premature Electric Strip Engagement</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                <strong>Bill Shock:</strong> Sizing a heat pump strictly for summer cooling (e.g. 2.5 Tons) in a northern climate pushes the balance point up to 40°F, forcing expensive 10 kW auxiliary resistance strips (COP = 1.0) to run during mild autumn days.
              </div>
            </div>
            <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#00d2ff" }}>Boiler Flue Gas Condensation</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                <strong>Acid Corrosion:</strong> Sizing a cast-iron boiler to previous boiler nameplate rather than actual radiation EDR creates massive thermal mass mismatch, keeping return water below 130°F and condensing corrosive acidic flue gas in non-condensing chimneys.
              </div>
            </div>
          </div>
        </div>

        {/* 4. Comprehensive Heating Sizing Reference Matrix */}
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
            4. Whole-Home Heating &amp; Heat Pump Sizing Reference Matrix (2,000 sq ft Baseline)
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
            The following engineering matrix illustrates how building envelope quality and climate zone dictate heat loss and equipment sizing on a standard 2,000 sq ft home at 0°F winter design conditions:
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
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Envelope Construction Era</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Heat Loss Factor</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>2,000 sq ft Design Load</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Inverter Heat Pump Sizing</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Thermal Balance Point</th>
                  <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>96% AFUE Gas Furnace Input</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Pre-1980 Uninsulated (ACH50 &gt; 10)</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>45–55 BTU/sq ft</td>
                  <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 700 }}>90,000–110,000 BTU/hr</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Dual-Fuel / 5.0 Ton + 15 kW</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>32°F–36°F</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>100,000–120,000 BTU/hr</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>1980–2000 Standard (ACH50 ~ 6.0)</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>30–40 BTU/sq ft</td>
                  <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 700 }}>60,000–80,000 BTU/hr</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>4.0 Ton Inverter + 10 kW</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>22°F–26°F</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>70,000–80,000 BTU/hr</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>2000–2020 Modern (ACH50 ~ 3.5)</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>20–28 BTU/sq ft</td>
                  <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 700 }}>40,000–56,000 BTU/hr</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>3.0–3.5 Ton Cold-Climate</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>12°F–18°F</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>45,000–60,000 BTU/hr</td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>IECC 2021+ / High-Performance (ACH50 ≤ 1.5)</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>12–18 BTU/sq ft</td>
                  <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 700 }}>24,000–36,000 BTU/hr</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>2.0–2.5 Ton Inverter (100% CCHP)</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>-5°F (Zero Strip Down to 0°F)</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>40,000 BTU/hr (Low Stage)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Step-by-Step Worked Engineering Calculation Example */}
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
            5. Step-by-Step Worked Engineering Calculation Example
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
            <strong>Engineering Scenario:</strong> A 2,200 sq ft single-story home located in Minneapolis, MN (99% Winter Design Temperature: -5°F, Indoor Design Temperature: 70°F, Design Temperature Differential ΔT = 75°F).
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: "0.95rem", marginBottom: "0.35rem" }}>
                Step A: Envelope Conduction Loss Calculation
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, fontFamily: "var(--font-mono, monospace)" }}>
                • Gross Above-Grade Walls (1,800 sq ft minus 350 sq ft glass = 1,450 sq ft net) @ U = 0.065 (R-15.4 eff): 1,450 × 0.065 × 75 = 7,069 BTU/hr<br />
                • Fenestration / Windows (350 sq ft) @ U = 0.30 (Double Low-E Argon): 350 × 0.30 × 75 = 7,875 BTU/hr<br />
                • Attic Ceiling (2,200 sq ft) @ U = 0.020 (R-50 Blown Cellulose): 2,200 × 0.020 × 75 = 3,300 BTU/hr<br />
                • Uninsulated Basement Slab &amp; Foundation Walls: 14,800 BTU/hr<br />
                <strong>Total Conduction Loss (q_conduction) = 33,044 BTU/hr</strong>
              </div>
            </div>

            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: "0.95rem", marginBottom: "0.35rem" }}>
                Step B: Infiltration Sensible Deficit Calculation
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, fontFamily: "var(--font-mono, monospace)" }}>
                • Conditioned Volume = 2,200 sq ft × 9 ft ceiling = 19,800 cu ft<br />
                • Blower Door Leakage = 3.5 ACH50 → Natural Infiltration = 0.20 ACH_nat = 66 CFM_inf<br />
                • Infiltration Heat Deficit = 1.08 × 66 CFM × 75°F ΔT = 5,346 BTU/hr<br />
                • Continuous Mechanical Fresh Air Ventilation (ASHRAE 62.2) = 60 CFM @ 75% HRV = 1,215 BTU/hr<br />
                <strong>Total Infiltration &amp; Ventilation Deficit (q_inf) = 6,561 BTU/hr</strong>
              </div>
            </div>

            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(255, 107, 74, 0.06)", border: "1px solid rgba(255, 107, 74, 0.2)" }}>
              <div style={{ fontWeight: 700, color: CATEGORY_COLOR, fontSize: "0.95rem", marginBottom: "0.35rem" }}>
                Step C: Total Building Heat Loss &amp; Equipment Selection
              </div>
              <div style={{ fontSize: "0.85rem", color: "var(--ink)", lineHeight: 1.6 }}>
                • <strong>Total Design Heating Loss:</strong> 33,044 + 6,561 = <strong>39,605 BTU/hr</strong> (approx. 3.3 Tons)<br />
                • <strong>Cold-Climate Inverter Heat Pump:</strong> Select a 3.5-Ton (42,000 BTU) nominal Cold-Climate Inverter Heat Pump delivering 26,500 BTU/hr at -5°F (COP = 1.85).<br />
                • <strong>Thermal Balance Point:</strong> 18°F. (100% heat pump heating down to 18°F without electric heat strips).<br />
                • <strong>Auxiliary Heat Strip Sizing:</strong> Deficit at -5°F = 39,605 - 26,500 = 13,105 BTU/hr. Required electric strip capacity = 13,105 / 3,412.14 = 3.84 kW → Install a staged 5.0 kW auxiliary electric heater pack.<br />
                • <strong>Gas Furnace Alternative:</strong> 39,605 / 0.96 AFUE = 41,255 BTU/hr required input → Select a 45,000 to 60,000 BTU/hr 2-stage 96% AFUE gas furnace.
              </div>
            </div>
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
            6. Choosing the Right Heating &amp; Electrification Calculator
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
            Select the specialized engineering tool for your specific equipment and thermodynamic calculation:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            <Link
              href="/calculators/heat-pump-size-calculator"
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
                ⚡ Heat Pump Sizing &amp; Balance Point →
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                Calculate thermal balance points, low-ambient COP derating curves, and auxiliary electric heat strip kW.
              </div>
            </Link>

            <Link
              href="/calculators/furnace-size-calculator"
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
                🔥 Gas Furnace Sizing Calculator →
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                Size 80% to 98% AFUE furnaces with supply airflow CFM, allowable temperature rise (ΔT), and gas therm calculations.
              </div>
            </Link>

            <Link
              href="/calculators/combustion-air-calculator"
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
                💨 Combustion Air Sizer (NFPA 54) →
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                Evaluate confined space cubic volumes and size outdoor vertical/horizontal combustion air openings and motorized dampers.
              </div>
            </Link>

            <Link
              href="/calculators/boiler-size-calculator"
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
                💧 Hydronic Boiler Radiation Sizer →
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                Match boiler gross input to copper fin-tube baseboard footage and cast-iron radiator Equivalent Direct Radiation (EDR).
              </div>
            </Link>

            <Link
              href="/calculators/garage-heater-sizing"
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
                🚗 Garage Heater Sizing Calculator →
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                Calculate heat loss across uninsulated concrete slabs and overhead garage doors for unit heaters and radiant tubes.
              </div>
            </Link>
          </div>
        </div>

        {/* 7. Authoritative Reference Citations & Regulatory Standards */}
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
            7. Authoritative Standards &amp; Regulatory Citations
          </h3>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            All calculations and formulas across the HVACLogic heating suite adhere strictly to North American consensus standards:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            <div style={{ padding: "0.85rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--ink)" }}>ACCA Manual J &amp; Manual S</div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                Residential Load Calculation (8th Edition) and Residential Equipment Selection Protocol.
              </div>
            </div>
            <div style={{ padding: "0.85rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--ink)" }}>AHRI Standard 210/240</div>
              <div style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                Performance Rating of Unitary Air-Conditioning &amp; Air-Source Heat Pump Equipment (HSPF2 / COP).
              </div>
            </div>
            <div style={{ padding: "0.85rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--ink)" }}>NFPA 54 / ANSI Z223.1 &amp; IFGC</div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                National Fuel Gas Code &amp; International Fuel Gas Code for combustion air and Category I/IV appliance venting.
              </div>
            </div>
            <div style={{ padding: "0.85rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
              <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--ink)" }}>Hydronics Institute (I=B=R)</div>
              <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                Testing and Rating Standard for Cast Iron and Steel Heating Boilers and Baseboard Radiation.
              </div>
            </div>
          </div>
        </div>

        {/* 8. Authoritative Engineering FAQs */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.85rem",
            padding: "1.75rem",
          }}
        >
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 1.25rem", color: CATEGORY_COLOR }}>
            Frequently Asked Questions: Heating &amp; Heat Pump Engineering
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                What is the thermal balance point of a heat pump and how is it determined?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                The <strong>Thermal Balance Point (T_bal)</strong> is the exact outdoor ambient temperature where building heat loss equals the maximum heating output of the heat pump. Above T_bal, the heat pump provides 100% of heating demand. Below T_bal, heating loss exceeds compressor output, requiring supplemental electric resistance heat strips or a dual-fuel gas furnace to make up the deficit.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                How do cold-climate inverter heat pumps operate down to -15°F?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                Cold-climate heat pumps employ variable-speed inverter scroll or rotary compressors equipped with <strong>Enhanced Vapor Injection (EVI)</strong> or flash-injection subcooling circuits. By injecting intermediate-pressure vapor into the compression chambers, they maintain high refrigerant mass flow and prevent high discharge temperatures, allowing 75% to 100% rated capacity retention at -5°F and operating down to -15°F or -22°F.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                Why should a replacement gas furnace never be sized from the old furnace nameplate?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                Older furnaces (installed prior to modern building codes) were routinely oversized by 100% to 200% (e.g. 120,000 BTU units in homes needing only 45,000 BTU). Furthermore, subsequent home improvements (window upgrades, attic insulation, air sealing) reduce heating loads by 30% to 50%. Matching old nameplates results in severe short-cycling, noisy high-velocity airflow, and cracked heat exchangers.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                What is the NFPA 54 rule for confined combustion spaces?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                Under NFPA 54 and IFGC Section 304, any enclosed mechanical room with less than <strong>50 cubic feet per 1,000 BTU/hr</strong> of total gas appliance input is legally defined as a confined space. It requires permanent combustion air openings communicating with the outdoors: 1 sq in. per 4,000 BTU/hr for vertical ducts or 1 sq in. per 2,000 BTU/hr for horizontal ducts.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                How is hydronic radiation EDR calculated for boiler sizing?
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                Equivalent Direct Radiation (EDR) represents the heat-emitting capacity of connected radiators. For steam systems, 1 sq ft EDR emits 240 BTU/hr at 215°F. For forced hot water systems at 180°F average water temperature, 1 sq ft EDR emits 150 BTU/hr (or ~580 BTU/hr per linear foot of standard 3/4&quot; copper fin-tube baseboard). Boilers must be sized to match connected emitter EDR rather than theoretical heat loss to prevent boiler short-cycling.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
