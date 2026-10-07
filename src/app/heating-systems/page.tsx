import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import { siteConfig } from "@/lib/site-config";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = {
  title: "Heating Load & Heat Pump Sizing Calculators — HVACLogic",
  description:
    "Technical references and screening calculators for residential heating load calculation, heat pump balance point estimation, furnace sizing, and hydronic heating.",
  keywords: [
    "heating load calculator",
    "heat pump sizing",
    "furnace sizing",
    "boiler sizing",
    "heat pump balance point",
    "combustion air calculator",
    "auxiliary heat sizing",
    "heating calculations",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/heating-systems`,
  },
  openGraph: {
    title: "Heating Load & Heat Pump Sizing Calculators — HVACLogic",
    description:
      "Technical references and screening calculators for residential heating load calculation, heat pump balance point estimation, furnace sizing, and hydronic heating.",
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
    title: "Heating Load & Heat Pump Sizing Calculators — HVACLogic",
    description:
      "Technical references and screening calculators for residential heating load calculation, heat pump balance point estimation, furnace sizing, and hydronic heating.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

const CATEGORY_COLOR = "#ff6b4a";

export default function HeatingSystemsHub() {
  const calculators = calculatorRegistry.filter((c) => c.pillar === "heating-systems");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.canonicalDomain}/heating-systems#collection`,
        name: "Heating & Heat Pump Calculators",
        description:
          "Screening tools and technical reference guides for residential heating load calculation, heat pump balance point estimation, furnace sizing, and hydronic heating.",
        url: `${siteConfig.canonicalDomain}/heating-systems`,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.canonicalDomain}/#website`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.canonicalDomain}/heating-systems#breadcrumbs`,
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
            name: "Heating Systems",
            item: `${siteConfig.canonicalDomain}/heating-systems`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "Heating & Heat Pump Calculators",
        numberOfItems: calculators.length,
        itemListElement: calculators.map((calc, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: calc.name,
          url: `${siteConfig.canonicalDomain}${calc.route}`,
          description: calc.metaDescription,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the thermal balance point of a heat pump and how is it determined?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The thermal balance point is the outdoor temperature at which the calculated building heat-loss requirement intersects the selected heat pump's available heating capacity under specified operating conditions. Above this temperature, the heat pump can satisfy the building load without supplemental heat. Below this temperature, supplemental heat (such as electric resistance elements or an auxiliary furnace) is needed to satisfy the total load.",
            },
          },
          {
            "@type": "Question",
            name: "How do cold-climate heat pumps maintain capacity in sub-freezing temperatures?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cold-climate heat pumps are designed for low-ambient performance using variable-speed inverter compressors, enhanced vapor injection, or advanced refrigerant controls. However, capacity, COP, minimum operating temperature, and defrost behavior vary by model and operating conditions, and must be verified against certified manufacturer performance data.",
            },
          },
          {
            "@type": "Question",
            name: "Why should replacement heating equipment not be sized solely from the old equipment nameplate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Existing heating equipment may have been oversized during initial installation, or subsequent building envelope improvements (such as new windows, insulation additions, and air sealing) may have significantly reduced the building's heating demand. Sizing should be based on an updated calculation of current building heat loss rather than relying on legacy equipment nameplates.",
            },
          },
          {
            "@type": "Question",
            name: "What are standard combustion air requirements for indoor gas appliances?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Under standard indoor air provisions of codes such as NFPA 54 and IFGC, enclosed mechanical spaces with less than 50 cubic feet per 1,000 BTU/hr of total appliance input may be classified as confined spaces, requiring dedicated outdoor combustion air openings or engineered mechanical air supplies depending on the code edition and method used.",
            },
          },
          {
            "@type": "Question",
            name: "How is hydronic radiation EDR calculated for boiler sizing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Equivalent Direct Radiation (EDR) represents the heat-emitting capacity of connected radiators or baseboard emitters under reference operating temperatures (traditionally 240 BTU/hr per sq ft EDR for steam at 215°F, and 150 BTU/hr per sq ft EDR for hot water at 180°F, with copper fin-tube typically rated around 580 BTU/hr per linear foot at 180°F average water temperature). In existing installations, boiler selection must account for both calculated building heat loss and connected emitter capacity.",
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
          <span aria-current="page">Heating &amp; Heat Pumps</span>
        </nav>

        <header className="calculator-header">
          <span className="eyebrow">Category Hub</span>
          <h1>Heating, Heat Pumps &amp; Electrification Calculators</h1>
          <p className="intro">
            Screening calculators and technical references for heating load estimation, heat pump balance point estimation, combustion air volume calculations, AFUE furnace sizing, and hydronic heating.
          </p>
        </header>

        {/* CARDS GRID */}
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "2.5rem 0 1rem", color: "var(--ink)" }}>
          Available Heating &amp; Electrification Calculators
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
          <div style={{ marginBottom: "2rem" }}>
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
              <span>Engineering &amp; Sizing Reference Guide</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 0.75rem", color: "var(--ink)" }}>
              Heating Sizing, Heat Pump Electrification &amp; Balance Point Principles
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "850px", margin: "0 0 1.5rem" }}>
              Heating system design requires evaluating winter thermal losses, equipment performance curves across low ambient temperatures, and backup heating requirements. This technical guide outlines the core thermodynamic principles of building heat loss, heat pump capacity mapping, balance point estimation, and equipment selection considerations.
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
                <strong style={{ color: "var(--ink)" }}>Technical Scope Note:</strong> Calculations, sizing matrices, and balance-point estimations shown on this page serve as educational screening models and illustrative examples. Equipment selection, heat pump low-ambient performance, and combustion air requirements depend on building-specific load calculations, manufacturer certified expanded performance data, and local building code adoptions.
              </p>
            </div>
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
              1. Thermodynamic Fundamentals of Building Heat Loss &amp; Heat Pump Principles
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Building heating load represents the sensible heat transfer required to maintain indoor setpoints against envelope thermal conduction and air infiltration:
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
              <div><strong>Simplified Total Heat Loss:</strong> q_total_loss = q_conduction + q_infiltration</div>
              <div><strong>Heat Pump Operating COP:</strong> COP_operating = Heating_Output_Watts / Electrical_Input_Watts</div>
              <div><strong>Theoretical Carnot Maximum:</strong> COP_Carnot = T_condenser_K / (T_condenser_K - T_evaporator_K)</div>
            </div>

            <p style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 1rem" }}>
              <em>Scope Note:</em> These equations represent a 1-D heat transfer and infiltration reference model. Complete ACCA Manual J heating load calculations incorporate ground-coupled foundation heat loss, duct distribution losses, and localized infiltration modeling. Carnot COP represents an idealized thermodynamic ceiling, whereas actual operating and rated COP values are lower due to mechanical, motor, and heat exchanger irreversibilities.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(255, 107, 74, 0.04)", border: "1px solid rgba(255, 107, 74, 0.15)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase" }}>Conduction &amp; Thermal Bridging</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Envelope Assembly U-Factors</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                  Transmission through opaque walls, ceilings, windows, and foundations. Parallel-path thermal framing factors (such as illustrative wood framing assumptions around 20%–25% depending on assembly construction) reduce clear-wall R-values.
                </div>
              </div>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.15)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#00d2ff", textTransform: "uppercase" }}>Infiltration &amp; Air Exchange</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Cold Air Displacement</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                  Pressure-driven airflow through envelope openings, rim joists, and penetrations. Natural infiltration rates depend on building geometry, weather exposure, and leakage distribution estimated from blower door test metrics.
                </div>
              </div>
            </div>
          </div>

          {/* 2. Equipment Selection & Electrification 5-Step Workflow */}
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
              2. Heating Equipment Selection &amp; Electrification 5-Step Screening Workflow
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              A structured engineering sequence helps evaluate winter design load, equipment capacity, balance point, and supplemental heat requirements:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(255, 107, 74, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  1
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Climatic Design Temperature Selection
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Identify the local 99% winter design dry-bulb temperature from the applicable climatic dataset (such as ASHRAE Fundamentals or local building code tables). Representative reference indoor design temperatures commonly assume approximately 70°F dry-bulb as a standard baseline.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(255, 107, 74, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  2
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Building Heat Loss Estimation
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Calculate conductive and air-exchange losses across the envelope at the design temperature differential (ΔT = T_indoor - T_outdoor). Explore preliminary building parameters using our <Link href="/calculators/heat-loss-calculator" style={{ color: CATEGORY_COLOR, fontWeight: 600 }}>Heat Loss Calculator</Link>.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(255, 107, 74, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  3
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Heat Pump Capacity Mapping &amp; Thermal Balance Point Estimation
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Compare the selected heat pump&apos;s expanded low-ambient capacity curve against the building heat loss curve. The intersection represents the <strong>Thermal Balance Point</strong>. Above this temperature, the heat pump meets the heating demand without supplemental heating.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(255, 107, 74, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  4
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Supplemental &amp; Backup Heat Sizing Considerations
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    Estimate the thermal capacity deficit below the balance point: <code>Deficit_kW = (q_total_loss - q_hp_design) / 3,412.14</code>. Final equipment selection must consider available standard heater element sizes, manufacturer compatibility, electrical service capacity (MCA/MOCP), staging controls, and airflow requirements.
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "rgba(255, 107, 74, 0.15)", color: CATEGORY_COLOR, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "0.9rem" }}>
                  5
                </div>
                <div>
                  <h4 style={{ margin: "0 0 0.25rem", fontSize: "1rem", fontWeight: 700, color: "var(--ink)" }}>
                    Combustion Air &amp; Mechanical Room Verification
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    For gas furnaces and fossil-fuel boilers, verify combustion air availability per applicable fuel gas codes (such as NFPA 54 / IFGC) based on room volume and appliance draft requirements in our <Link href="/calculators/combustion-air-calculator" style={{ color: CATEGORY_COLOR, fontWeight: 600 }}>Combustion Air Calculator</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Sizing Considerations & Operating Impacts */}
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
              3. Heating Sizing Considerations &amp; Operating Impacts
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Relying on generic rules of thumb or sizing replacement equipment solely from old nameplate ratings can contribute to operational and comfort problems:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ef4444" }}>Furnace Oversizing &amp; Cycling</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                  Excessive furnace capacity relative to building load can increase cycling and may create undesirable airflow, temperature-rise, and operating conditions if the equipment cannot operate within its specified design range.
                </div>
              </div>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f59e0b" }}>Balance Point &amp; Backup Run Hours</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                  Selecting a heat pump based solely on summer cooling requirements in heating-dominated climates may result in a higher thermal balance point, increasing runtime hours on supplemental electric resistance or auxiliary backup heat.
                </div>
              </div>
              <div style={{ padding: "1.1rem", borderRadius: "0.6rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#00d2ff" }}>Hydronic Return Water &amp; Venting</div>
                <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.35rem", lineHeight: 1.5 }}>
                  Operating non-condensing boilers with return water temperatures that allow flue-gas moisture condensation can create corrosive conditions in category I chimneys. Condensation risk depends on appliance design, fuel type, water temperatures, and venting configurations.
                </div>
              </div>
            </div>
          </div>

          {/* 4. Heating Sizing Screening Reference Matrix */}
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
              4. Illustrative Heating Load Screening Matrix (2,000 sq ft Reference Baseline)
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              These ranges are illustrative examples, not equipment-sizing rules. Actual heating load and equipment selection require building-specific envelope, infiltration, ventilation, design-weather, and equipment-performance inputs:
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
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Envelope Construction Category</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Illustrative Heat Loss Factor</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>2,000 sq ft Illustrative Load</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Illustrative Heat Pump Capacity Range</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Illustrative Balance Point Range</th>
                    <th style={{ padding: "0.75rem 1rem", color: "var(--ink)", fontWeight: 700 }}>Illustrative Furnace Input Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Older / Minimally Insulated</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>45–55 BTU/sq ft</td>
                    <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 700 }}>90,000–110,000 BTU/hr</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Dual-Fuel or High-Capacity System</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>~30°F–36°F</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>100,000–120,000 BTU/hr</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Standard Construction Era</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>30–40 BTU/sq ft</td>
                    <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 700 }}>60,000–80,000 BTU/hr</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Moderate to High Capacity Inverter</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>~20°F–26°F</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>70,000–80,000 BTU/hr</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>Modern Code Envelope</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>20–28 BTU/sq ft</td>
                    <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 700 }}>40,000–56,000 BTU/hr</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Cold-Climate Inverter Heat Pump</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>~12°F–18°F</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>45,000–60,000 BTU/hr</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--ink)" }}>High-Performance / Tight Envelope</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>12–18 BTU/sq ft</td>
                    <td style={{ padding: "0.75rem 1rem", color: CATEGORY_COLOR, fontWeight: 700 }}>24,000–36,000 BTU/hr</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Low-Ambient Inverter Heat Pump</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Capacity verified from certified OEM data</td>
                    <td style={{ padding: "0.75rem 1rem", color: "var(--ink-secondary)" }}>Modulating / Low-Stage Gas Options</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "1rem", lineHeight: 1.5 }}>
              <em>Limitation Note:</em> These values are illustrative screening assumptions, not project-specific Manual J loads or equipment selections. Actual sizing requires detailed calculation of building envelope U-factors, infiltration, site orientation, local weather data, and manufacturer certified performance data.
            </p>
          </div>

          {/* 5. Worked Calculation Example */}
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
              5. Step-by-Step Worked Calculation Example (Hypothetical Scenario)
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              <strong>Hypothetical Scenario:</strong> A 2,200 sq ft single-story home with an assumed winter design temperature of -5°F and indoor setpoint of 70°F (Design Temperature Differential ΔT = 75°F):
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: "0.95rem", marginBottom: "0.35rem" }}>
                  Step A: Envelope Conduction Loss Calculation (Illustrative)
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, fontFamily: "var(--font-mono, monospace)" }}>
                  • Gross Above-Grade Walls (1,800 sq ft gross minus 350 sq ft glass = 1,450 sq ft net) @ U = 0.065: 1,450 × 0.065 × 75 = 7,069 BTU/hr<br />
                  • Fenestration / Windows (350 sq ft) @ U = 0.30: 350 × 0.30 × 75 = 7,875 BTU/hr<br />
                  • Attic Ceiling (2,200 sq ft) @ U = 0.020: 2,200 × 0.020 × 75 = 3,300 BTU/hr<br />
                  • Basement Slab &amp; Foundation Walls: 14,800 BTU/hr<br />
                  <strong>Total Conduction Loss (q_conduction) = 33,044 BTU/hr</strong>
                </div>
              </div>

              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: "0.95rem", marginBottom: "0.35rem" }}>
                  Step B: Air Infiltration &amp; Ventilation Deficit Calculation (Illustrative Assumptions)
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, fontFamily: "var(--font-mono, monospace)" }}>
                  • Conditioned Volume = 2,200 sq ft × 9 ft ceiling = 19,800 cu ft<br />
                  • Infiltration Assumption: Using the selected infiltration model and example N-factor assumptions, 3.5 ACH50 is converted to an illustrative natural infiltration estimate of 0.20 ACHnat (66 CFM)<br />
                  • Infiltration Sensible Deficit = 1.08 × 66 CFM × 75°F ΔT = 5,346 BTU/hr<br />
                  • Ventilation Heating Load: 60 CFM mechanical ventilation with 75% sensible recovery (HRV): q_vent = 1.08 × 60 CFM × 75°F ΔT × (1 - 0.75) = 1,215 BTU/hr<br />
                  <strong>Total Infiltration &amp; Ventilation Deficit (q_inf) = 6,561 BTU/hr</strong>
                </div>
              </div>

              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(255, 107, 74, 0.06)", border: "1px solid rgba(255, 107, 74, 0.2)" }}>
                <div style={{ fontWeight: 700, color: CATEGORY_COLOR, fontSize: "0.95rem", marginBottom: "0.35rem" }}>
                  Step C: Total Estimated Heat Loss &amp; Equipment Sizing Considerations
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", lineHeight: 1.6 }}>
                  • <strong>Total Design Heating Loss:</strong> 33,044 + 6,561 = <strong>39,605 BTU/hr</strong> (approx. 3.3 tons nominal cooling capacity equivalent)<br />
                  • <strong>Heat Pump Low-Ambient Evaluation:</strong> Suppose an illustrative 3.5-ton nominal cold-climate heat pump provides an assumed expanded performance rating of 26,500 BTU/hr at -5°F (COP ~1.85) under manufacturer test data. Actual capacity and COP must be verified from certified manufacturer expanded data.<br />
                  • <strong>Thermal Balance Point:</strong> In this hypothetical load-versus-capacity curve intersection, the estimated thermal balance point occurs around 18°F.<br />
                  • <strong>Estimated Auxiliary Heating Deficit:</strong> At the design temperature of -5°F, the deficit is 39,605 - 26,500 = 13,105 BTU/hr (~3.84 kW thermal deficit). A 5.0 kW staged auxiliary heater is an example selection; final equipment selection must consider manufacturer limits, staging controls, electrical service capacity, and airflow.<br />
                  • <strong>Furnace Sizing Comparison:</strong> For a 96% AFUE gas furnace option, 39,605 / 0.96 ≈ 41,255 BTU/hr required input, leading to equipment selection within standard manufacturer furnace input sizes.
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
              Select the appropriate tool for your preliminary heating screening or diagnostic task:
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
                  Estimate thermal balance points, low-ambient capacity curves, and auxiliary electric heating requirements.
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
                  Estimate furnace input requirements based on AFUE ratings, airflow CFM, and temperature rise considerations.
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
                  💨 Combustion Air Sizer →
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                  Evaluate mechanical room volumes and calculate combustion air opening areas per standard fuel gas code provisions.
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
                  Match boiler output to copper fin-tube baseboard length and cast-iron radiator Equivalent Direct Radiation (EDR).
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
                  Estimate heat loss across uninsulated concrete slabs and overhead garage doors for unit heaters and radiant tubes.
                </div>
              </Link>
            </div>
          </div>

          {/* 7. Standards & Technical References */}
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
              7. Technical References &amp; Consensus Standards
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Relevant standards and technical references are identified for each tool. Screening calculators provide preliminary estimates and should not be treated as a substitute for a comprehensive engineering design:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "0.85rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--ink)" }}>ACCA Manual J &amp; Manual S</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                  Residential Load Calculation (8th Edition) and Residential Equipment Selection Reference Protocols.
                </div>
              </div>
              <div style={{ padding: "0.85rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--ink)" }}>AHRI Standard 210/240</div>
                <div style={{ fontWeight: 600, fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                  Unitary Air-Conditioner and Air-Source Heat Pump Performance Rating Standards (HSPF2 / COP).
                </div>
              </div>
              <div style={{ padding: "0.85rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--ink)" }}>NFPA 54 / ANSI Z223.1 &amp; IFGC</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                  National Fuel Gas Code &amp; International Fuel Gas Code for combustion air and appliance venting.
                </div>
              </div>
              <div style={{ padding: "0.85rem", borderRadius: "0.5rem", background: "var(--surface-raised)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--ink)" }}>Hydronics Institute (I=B=R)</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                  Testing and Rating Guidance for Cast Iron and Steel Heating Boilers and Baseboard Radiation.
                </div>
              </div>
            </div>
          </div>

          {/* 8. FAQs */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.85rem",
              padding: "1.75rem",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, margin: "0 0 1.25rem", color: CATEGORY_COLOR }}>
              Frequently Asked Questions: Heating &amp; Heat Pump Principles
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  What is the thermal balance point of a heat pump and how is it determined?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  The thermal balance point is the outdoor temperature at which the calculated building heat-loss requirement intersects the selected heat pump&apos;s available heating capacity under specified operating conditions. Above this temperature, the heat pump can satisfy the building load without supplemental heat. Below this temperature, supplemental heat (such as electric resistance elements or an auxiliary furnace) is needed to satisfy the total load.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  How do cold-climate heat pumps maintain capacity in sub-freezing temperatures?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Cold-climate heat pumps are designed for low-ambient performance using variable-speed inverter compressors, enhanced vapor injection, or advanced refrigerant controls. However, capacity, COP, minimum operating temperature, and defrost behavior vary by model and operating conditions, and must be verified against certified manufacturer performance data.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  Why should replacement heating equipment not be sized solely from the old equipment nameplate?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Existing heating equipment may have been oversized during initial installation, or subsequent building envelope improvements (such as new windows, insulation additions, and air sealing) may have significantly reduced the building&apos;s heating demand. Sizing should be based on an updated calculation of current building heat loss rather than relying on legacy equipment nameplates.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  What are standard combustion air requirements for indoor gas appliances?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Under standard indoor air provisions of codes such as NFPA 54 and IFGC, enclosed mechanical spaces with less than 50 cubic feet per 1,000 BTU/hr of total appliance input may be classified as confined spaces, requiring dedicated outdoor combustion air openings or engineered mechanical air supplies depending on the code edition and method used.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
                  How is hydronic radiation EDR calculated for boiler sizing?
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                  Equivalent Direct Radiation (EDR) represents the heat-emitting capacity of connected radiators or baseboard emitters under reference operating temperatures (traditionally 240 BTU/hr per sq ft EDR for steam at 215°F, and 150 BTU/hr per sq ft EDR for hot water at 180°F, with copper fin-tube typically rated around 580 BTU/hr per linear foot at 180°F average water temperature). In existing installations, boiler selection must account for both calculated building heat loss and connected emitter capacity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REGULATORY & ENGINEERING DISCLAIMER */}
        <Disclaimer isLifeSafety={true} safetyTopic="combustion" />
      </main>
    </>
  );
}
