import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";
import { siteConfig } from "@/lib/site-config";
import { Disclaimer } from "@/components/shared/Disclaimer";

export const metadata: Metadata = {
  title: "Field Diagnostics & Refrigerant Calculators — HVACLogic",
  description:
    "Technical references and screening calculators for superheat, subcooling, saturation temperature calculation, A2L refrigerant properties, and field diagnostics.",
  keywords: [
    "refrigerant diagnostics",
    "superheat calculator",
    "subcooling calculator",
    "R-454B",
    "R-410A",
    "R-32",
    "A2L refrigerant",
    "bubble point",
    "dew point",
    "refrigerant charging",
    "HVAC troubleshooting",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/field-diagnostics`,
  },
  openGraph: {
    title: "Field Diagnostics & Refrigerant Calculators — HVACLogic",
    description:
      "Technical references and screening calculators for superheat, subcooling, saturation temperature calculation, A2L refrigerant properties, and field diagnostics.",
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
    title: "Field Diagnostics & Refrigerant Calculators — HVACLogic",
    description:
      "Technical references and screening calculators for superheat, subcooling, saturation temperature calculation, A2L refrigerant properties, and field diagnostics.",
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
        "@type": "CollectionPage",
        "@id": `${siteConfig.canonicalDomain}/field-diagnostics/#collection`,
        url: `${siteConfig.canonicalDomain}/field-diagnostics`,
        name: "Field Diagnostics & Refrigerant Calculators",
        description:
          "Screening calculators and technical reference guides for superheat, subcooling, saturation temperature calculation, and A2L refrigerant field diagnostics.",
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
          url: `${siteConfig.canonicalDomain}${c.route}`,
          description: c.metaDescription,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Why are subcooling and superheat referenced to bubble and dew points on zeotropic refrigerants?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Zeotropic refrigerant blends (such as R-454B) exhibit temperature glide where boiling and condensation occur over a temperature range at constant pressure. By engineering convention, bubble point represents saturated liquid for liquid-line subcooling calculations, while dew point represents saturated vapor for suction-line superheat calculations.",
            },
          },
          {
            "@type": "Question",
            name: "How does line set length affect system refrigerant charge?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Many residential split systems include factory pre-charge for an OEM-specified reference line-set length (often 15 feet in standard documentation). When installed line-set length exceeds this baseline, additional trim charge should be calculated and weighed in using the equipment manufacturer's specific charge-per-foot specifications.",
            },
          },
          {
            "@type": "Question",
            name: "What may cause low suction pressure accompanied by high superheat and high subcooling?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "This combination often indicates a liquid line restriction (such as a restricted filter-drier or kinked tubing) or a restricted metering device. Liquid refrigerant can accumulate in the condenser (raising subcooling) while the evaporator is starved (lowering suction pressure and raising superheat).",
            },
          },
          {
            "@type": "Question",
            name: "What is target superheat and when is it used?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Target superheat is a screening calculation used for fixed-orifice (piston or capillary tube) systems based on indoor wet-bulb and outdoor dry-bulb conditions. Because fixed orifices do not modulate flow, superheat varies with thermal load. Systems with TXVs or EEVs are primarily evaluated using manufacturer-specified subcooling procedures.",
            },
          },
          {
            "@type": "Question",
            name: "How do A2L refrigerants like R-454B compare in operating pressures to R-410A?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Operating pressure relationships vary with saturation temperature and operating conditions. Across typical residential operating ranges, R-454B generally operates at slightly lower saturation pressures than R-410A, while pure R-32 operates at slightly higher pressures. Technicians should always reference exact refrigerant-specific pressure-temperature data at the measured operating point.",
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
            Screening tools and technical reference guides for vapor-compression diagnostics, saturation temperature modeling, zeotropic temperature glide calculations, and A2L refrigerant considerations.
          </p>
        </header>

        {/* CARDS GRID */}
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "2.5rem 0 1rem", color: "var(--ink)" }}>
          Available Diagnostic &amp; Refrigeration Calculators
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
          <div style={{ marginBottom: "2rem" }}>
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
              <span>Engineering &amp; Field Reference Guide</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 0.75rem", color: "var(--ink)" }}>
              Field Diagnostics &amp; A2L Refrigerant Reference Guide
            </h2>
            <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "850px", margin: "0 0 1.5rem" }}>
              Accurate thermodynamic diagnostics support proper system operation, efficiency, and reliability. This guide provides technical reference information relevant to lower-GWP A2L refrigerants (such as R-454B and R-32), outlining vapor-compression saturation principles, zeotropic temperature glide calculations, TXV vs. fixed-orifice charging procedures, and diagnostic interpretation methods.
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
                <strong style={{ color: "var(--ink)" }}>Technical Scope &amp; Safety Note:</strong> Values shown on this page serve as educational and reference benchmarks unless explicitly identified as OEM-specific. Equipment manufacturer installation, charging, and service documentation always take precedence. Refrigerant handling, recovery, and evacuation must comply with applicable regulations (such as EPA Section 608 and AIM Act rules) and safety standards. Observed pressure and temperature measurements provide diagnostic screening indicators, not singular proof of a specific root cause.
              </p>
            </div>
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
              1. Thermodynamic Principles of Vapor-Compression Circuits
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              In a vapor-compression refrigeration loop, heat absorption and rejection occur through phase changes in the evaporator and condenser. Operating pressures determine corresponding saturation temperatures:
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
              <div><strong>Evaporator Air Split:</strong> ΔT_air = T_return_drybulb - T_supply_drybulb (Typical illustrative range: ~16°F–22°F depending on airflow and conditions)</div>
            </div>

            <p style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 1rem" }}>
              <em>Note on Air Split:</em> The actual indoor air temperature differential across the evaporator coil varies with total airflow (CFM), return air dry-bulb and wet-bulb temperatures, sensible heat ratio, and refrigerant circuit operating conditions.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(16, 185, 129, 0.04)", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase" }}>Superheat Diagnostic Function</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Evaporator Vapor Assessment</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                  Superheat indicates vapor temperature above the applicable saturation temperature at the measurement point. It helps assess whether refrigerant is completely vaporized before entering the compressor, reducing the risk of liquid floodback, while elevated superheat may indicate reduced evaporator feeding.
                </div>
              </div>
              <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.15)" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#00d2ff", textTransform: "uppercase" }}>Subcooling Diagnostic Function</div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink)", marginTop: "0.25rem" }}>Liquid Line State Assessment</div>
                <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                  Subcooling indicates that liquid is below its saturation temperature at the measurement point. It is commonly used as part of charging and liquid-line diagnostics to help maintain a solid column of liquid ahead of the expansion device under operating conditions.
                </div>
              </div>
            </div>
          </div>

          {/* 2. Refrigerant Transitions & Saturation Boundaries */}
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
              2. Refrigerant Transitions, Temperature Glide &amp; Bubble/Dew Point Method
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Under the federal American Innovation and Manufacturing (AIM) Act framework and international climate agreements, the HVAC industry is transitioning from higher-GWP refrigerants (such as R-410A) to lower-GWP alternatives. Technician certification and refrigerant handling/recovery continue to be governed under EPA Clean Air Act Section 608 regulations.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              While R-410A is a near-azeotropic blend with minimal temperature glide (&lt;0.3°F), zeotropic blends such as <strong>R-454B (68.9% R-32 / 31.1% R-1234yf)</strong> exhibit a temperature glide (typically around 1.5°F to 2.5°F across common residential operating ranges). Pure single-component fluids like <strong>R-32</strong> have zero temperature glide:
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
                Zeotropic Temperature Glide and Bubble/Dew Point Method
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                In zeotropic blends, components boil and condense across a temperature range at constant pressure. Saturation calculations apply the appropriate reference state derived from thermophysical property models (such as the NIST REFPROP database):
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                <div style={{ padding: "0.85rem", background: "rgba(16, 185, 129, 0.06)", borderRadius: "0.4rem", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                  <div style={{ fontWeight: 700, color: CATEGORY_COLOR, fontSize: "0.8rem", textTransform: "uppercase" }}>Bubble Point Saturation (Liquid Line)</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--ink)", marginTop: "0.25rem" }}><strong>Used for Subcooling Calculations</strong></div>
                  <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                    The temperature at which saturated liquid begins boiling: <code>Subcooling = T_bubble(P_liquid) - T_liquid_line</code>.
                  </div>
                </div>
                <div style={{ padding: "0.85rem", background: "rgba(0, 210, 255, 0.06)", borderRadius: "0.4rem", border: "1px solid rgba(0, 210, 255, 0.2)" }}>
                  <div style={{ fontWeight: 700, color: "#00d2ff", fontSize: "0.8rem", textTransform: "uppercase" }}>Dew Point Saturation (Suction Line)</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--ink)", marginTop: "0.25rem" }}><strong>Used for Superheat Calculations</strong></div>
                  <div style={{ fontSize: "0.78rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                    The temperature at which saturated vapor completes condensation: <code>Superheat = T_suction_line - T_dew(P_suction)</code>.
                  </div>
                </div>
              </div>
            </div>

            {/* A2L Characteristics Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-color)", background: "var(--surface-raised)" }}>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>Refrigerant Designation</th>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>ASHRAE 34 Safety Group</th>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>100-Yr GWP (AR4 / AR5)</th>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>Approx. Temp Glide</th>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>Operating Pressure Comparison</th>
                    <th style={{ padding: "0.75rem", color: "var(--ink)" }}>Charging Reference</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--ink)" }}>R-410A (Near-Azeotropic Blend)</td>
                    <td style={{ padding: "0.75rem" }}>A1 (Lower Toxicity, No Flame Propagation)</td>
                    <td style={{ padding: "0.75rem" }}>2,088</td>
                    <td style={{ padding: "0.75rem" }}>&lt;0.3°F (Minimal)</td>
                    <td style={{ padding: "0.75rem" }}>Baseline reference</td>
                    <td style={{ padding: "0.75rem" }}>Standard P-T data</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(16, 185, 129, 0.03)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: CATEGORY_COLOR }}>R-454B (Zeotropic Blend)</td>
                    <td style={{ padding: "0.75rem", color: CATEGORY_COLOR, fontWeight: 600 }}>A2L (Lower Flammability)</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700 }}>466</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700 }}>~1.5°F–2.5°F (condition-dependent)</td>
                    <td style={{ padding: "0.75rem" }}>Compare P-T data at operating point</td>
                    <td style={{ padding: "0.75rem" }}>Liquid charging; Bubble/Dew separation</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "var(--ink)" }}>R-32 (Pure Fluid)</td>
                    <td style={{ padding: "0.75rem", color: "#f97316", fontWeight: 600 }}>A2L (Lower Flammability)</td>
                    <td style={{ padding: "0.75rem" }}>675</td>
                    <td style={{ padding: "0.75rem" }}>0.0°F (Single component)</td>
                    <td style={{ padding: "0.75rem" }}>Compare P-T data at operating point</td>
                    <td style={{ padding: "0.75rem" }}>Standard single-component P-T data</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", marginTop: "0.75rem", lineHeight: 1.5 }}>
              <em>Note:</em> Pressure relationships vary with saturation temperature and operating conditions. Technicians should consult refrigerant-specific P-T property models (such as NIST REFPROP or manufacturer charts) at the measured operating conditions.
            </p>
          </div>

          {/* 3. Metering Device Diagnostics */}
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
              3. Metering Device Diagnostics: TXV / EEV vs. Fixed Orifice
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              The expansion device design determines expected system behavior during charging and diagnostic evaluation:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem", marginBottom: "1.5rem" }}>
              {/* TXV Method */}
              <div style={{ padding: "1.25rem", background: "var(--surface-raised)", borderRadius: "0.6rem", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: CATEGORY_COLOR, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Thermal Expansion Valve (TXV / EEV)
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
                  Common Charging Diagnostic: Subcooling Procedure
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                  TXVs and electronic expansion valves modulate refrigerant flow to regulate superheat within their operating envelope. In normal operation, charge adjustments reflect primarily as changes in condenser subcooling, though measured superheat may still vary under load shifts or valve faults.
                </p>
                <div style={{ fontSize: "0.78rem", background: "var(--surface)", padding: "0.5rem 0.75rem", borderRadius: "4px", border: "1px solid var(--border-subtle)", color: "var(--ink)" }}>
                  <strong>Target Subcooling:</strong> Verify the exact target subcooling and charging procedure specified in the equipment manufacturer documentation. Typical illustrative reference ranges often span ~10°F to 12°F depending on design.
                </div>
              </div>

              {/* Fixed Orifice Method */}
              <div style={{ padding: "1.25rem", background: "var(--surface-raised)", borderRadius: "0.6rem", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#00d2ff", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Fixed Orifice (Piston / Capillary Tube)
                </div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
                  Common Charging Diagnostic: Target Superheat Procedure
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 0.75rem" }}>
                  A fixed metering device has a fixed restriction size. Mass flow varies directly with pressure differential and entering conditions. Target superheat is commonly screened using indoor return wet-bulb and outdoor ambient dry-bulb:
                </p>
                <div style={{ fontSize: "0.78rem", background: "var(--surface)", padding: "0.5rem 0.75rem", borderRadius: "4px", border: "1px solid var(--border-subtle)", color: "var(--ink)", fontFamily: "var(--font-mono, monospace)" }}>
                  Target SH ≈ [ (3 × T_return_wb) - T_outdoor_db - 80 ] / 2
                </div>
                <div style={{ fontSize: "0.74rem", color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
                  <em>Note:</em> This formula represents a common target-superheat screening relationship for applicable fixed-orifice systems; equipment-specific manufacturer charging charts always take precedence.
                </div>
              </div>
            </div>
          </div>

          {/* 4. Line Set Charge & Piping Considerations */}
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
              4. Extended Line Set Trim Calculations &amp; Piping Guidelines
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              Many residential split systems include factory pre-charge for a manufacturer-specified baseline line-set length (often 15 ft in typical reference manuals). When installed copper length exceeds this reference, additional trim charge must be weighed in:
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
              <div><strong>Added Trim Charge:</strong> m_add = (L_actual - L_factory_ref) × Rate_per_foot</div>
              <div><em>Important:</em> Additional trim rates and maximum allowable line lengths are equipment- and model-specific. Always verify the manufacturer&apos;s specified charge-per-foot table for the exact line diameters and unit combination.</div>
            </div>

            <p style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: "0 0 1rem" }}>
              Representative illustrative reference rates (e.g., ~0.60 oz/ft for standard 3/8&quot; liquid lines or ~0.20–0.40 oz/ft for smaller mini-split lines) serve as general examples. Always verify exact values against equipment documentation.
            </p>

            <div style={{ padding: "1rem", borderRadius: "0.5rem", background: "rgba(234, 179, 8, 0.05)", border: "1px solid rgba(234, 179, 8, 0.25)" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#eab308", textTransform: "uppercase" }}>⚠️ Oil Return &amp; Elevation Considerations</div>
              <div style={{ fontSize: "0.82rem", color: "var(--ink)", marginTop: "0.25rem", lineHeight: 1.5 }}>
                Vertical suction risers, trap requirements, maximum elevation differences, and line sizing depend on equipment design, refrigerant mass velocity, and manufacturer installation guidelines. Follow the equipment manufacturer&apos;s piping guide to maintain adequate oil return without creating excessive pressure drop.
              </div>
            </div>
          </div>

          {/* 5. Field Diagnostic Screening Matrix */}
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
              5. Field Diagnostic Screening Matrix: Suction, Head, Superheat &amp; Subcooling
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
              Operating pressure, superheat, and subcooling patterns provide screening clues to differentiate airflow issues, charge discrepancies, and mechanical restrictions. Values shown are illustrative diagnostic reference ranges; actual acceptable values depend on equipment design, refrigerant, metering device, operating conditions, and manufacturer specifications:
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-color)", background: "var(--surface-raised)" }}>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Observed Diagnostic Pattern</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Suction Pressure</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Head Pressure</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Superheat (SH)</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Subcooling (SC)</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Compressor Amps</th>
                    <th style={{ padding: "0.65rem", color: "var(--ink)" }}>Possible Cause / Recommended Checks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#ef4444" }}>Pattern A: Low Charge / Starvation</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 600 }}>Low ⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 600 }}>Low ⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 700 }}>High ⬆️ (e.g. &gt;20°F)</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 700 }}>Low ⬇️ (e.g. &lt;5°F)</td>
                    <td style={{ padding: "0.65rem" }}>Low ⬇️</td>
                    <td style={{ padding: "0.65rem" }}>May indicate undercharge or leak. Verify airflow, inspect for leaks, check trim charge calculations, and follow OEM charging instructions.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#ef4444" }}>Pattern B: Excess Refrigerant</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 600 }}>High ⬆️</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 700 }}>Elevated ⬆️</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 600 }}>Low ⬇️ (e.g. &lt;5°F)</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 700 }}>High ⬆️ (e.g. &gt;16°F)</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 600 }}>High ⬆️</td>
                    <td style={{ padding: "0.65rem" }}>May indicate overcharge. Confirm airflow and condenser cleanliness before recovering refrigerant into a certified recovery cylinder per EPA guidelines.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#f97316" }}>Pattern C: Low Indoor Airflow</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 700 }}>Low ⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 600 }}>Low / Normal</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 700 }}>Low ⬇️ (e.g. &lt;6°F)</td>
                    <td style={{ padding: "0.65rem" }}>Normal / Low</td>
                    <td style={{ padding: "0.65rem" }}>Low ⬇️</td>
                    <td style={{ padding: "0.65rem" }}>May indicate reduced indoor airflow. Check filter, duct static pressure, blower speed tap, and evaporator cleanliness before adjusting charge.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#f97316" }}>Pattern D: Low Outdoor Airflow</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 600 }}>High ⬆️</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 700 }}>Elevated ⬆️</td>
                    <td style={{ padding: "0.65rem" }}>Normal</td>
                    <td style={{ padding: "0.65rem", color: "#f97316", fontWeight: 700 }}>Low / Normal</td>
                    <td style={{ padding: "0.65rem", color: "#ef4444", fontWeight: 700 }}>High ⬆️</td>
                    <td style={{ padding: "0.65rem" }}>May indicate dirty outdoor coil, fan motor issues, or recirculation. Inspect and clean condenser coil and verify fan operation.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#eab308" }}>Pattern E: Liquid Line Restriction</td>
                    <td style={{ padding: "0.65rem", color: "#eab308", fontWeight: 700 }}>Low ⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#eab308", fontWeight: 600 }}>Low / Normal</td>
                    <td style={{ padding: "0.65rem", color: "#eab308", fontWeight: 700 }}>High ⬆️</td>
                    <td style={{ padding: "0.65rem", color: "#eab308", fontWeight: 700 }}>High ⬆️</td>
                    <td style={{ padding: "0.65rem" }}>Low ⬇️</td>
                    <td style={{ padding: "0.65rem" }}>May indicate restriction in liquid line or filter-drier. An abnormal temperature or pressure drop across the filter-drier can indicate a restriction.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-subtle)", background: "rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#38bdf8" }}>Pattern F: Metering Device Restriction</td>
                    <td style={{ padding: "0.65rem", color: "#38bdf8", fontWeight: 700 }}>Low ⬇️</td>
                    <td style={{ padding: "0.65rem", color: "#38bdf8", fontWeight: 600 }}>Low / Normal</td>
                    <td style={{ padding: "0.65rem", color: "#38bdf8", fontWeight: 700 }}>High ⬆️</td>
                    <td style={{ padding: "0.65rem", color: "#38bdf8", fontWeight: 700 }}>High ⬆️</td>
                    <td style={{ padding: "0.65rem" }}>Low ⬇️</td>
                    <td style={{ padding: "0.65rem" }}>May indicate TXV failed closed or clogged orifice. Check sensing bulb contact, insulation, and valve operation per OEM guidelines.</td>
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
              6. Worked Field Calculation Example: Hypothetical R-454B Diagnostic Scenario
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
              <strong>Hypothetical Example Scenario:</strong> A technician connects digital manifold gauges to a 3-ton split system operating on <strong>R-454B</strong> equipped with an indoor TXV and a 45-foot 3/8&quot; liquid line set on a 90°F ambient day:
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
              <div style={{ fontWeight: 700, color: CATEGORY_COLOR, marginBottom: "0.5rem" }}>Step 1: Recorded Field Data &amp; Reference Baseline (Hypothetical)</div>
              <ul style={{ margin: "0 0 1rem", paddingLeft: "1.25rem", color: "var(--ink-secondary)" }}>
                <li>Suction Pressure: <strong>112.5 psig</strong> | Suction Line Temp: <strong>62.0°F</strong></li>
                <li>Liquid Line Pressure: <strong>325.0 psig</strong> | Liquid Line Temp: <strong>96.5°F</strong></li>
                <li>Manufacturer Documentation Baseline: Target subcooling is 10.0°F (reference pre-charge baseline: 15 ft; manufacturer trim rate for this model: 0.60 oz/ft)</li>
              </ul>

              <div style={{ fontWeight: 700, color: CATEGORY_COLOR, marginBottom: "0.5rem" }}>Step 2: Property Saturation References (NIST REFPROP Property Model)</div>
              <ul style={{ margin: "0 0 1rem", paddingLeft: "1.25rem", color: "var(--ink-secondary)" }}>
                <li>At 112.5 psig: R-454B <strong>Dew Point Saturation</strong> ≈ <strong>37.2°F</strong></li>
                <li>At 325.0 psig: R-454B <strong>Bubble Point Saturation</strong> ≈ <strong>101.4°F</strong> (Dew point at 325 psig is ~103.6°F)</li>
              </ul>

              <div style={{ fontWeight: 700, color: CATEGORY_COLOR, marginBottom: "0.5rem" }}>Step 3: Superheat &amp; Subcooling Calculations</div>
              <div style={{ background: "var(--surface)", padding: "0.75rem", borderRadius: "4px", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono, monospace)", marginBottom: "1rem" }}>
                <div>Superheat = 62.0°F - 37.2°F = <strong>24.8°F</strong> (Elevated relative to typical operating ranges)</div>
                <div>Subcooling = 101.4°F - 96.5°F = <strong>4.9°F</strong> (Below 10.0°F target)</div>
              </div>

              <div style={{ fontWeight: 700, color: CATEGORY_COLOR, marginBottom: "0.5rem" }}>Step 4: Extended Line Set Trim Calculation</div>
              <div style={{ background: "var(--surface)", padding: "0.75rem", borderRadius: "4px", border: "1px solid var(--border-subtle)", fontFamily: "var(--font-mono, monospace)", marginBottom: "1rem" }}>
                <div>Trim Charge = (45 ft - 15 ft) × 0.60 oz/ft = <strong>18.0 oz (1.125 lbs)</strong></div>
              </div>

              <div style={{ fontWeight: 700, color: "#10b981", marginBottom: "0.25rem" }}>Diagnostic Interpretation:</div>
              <p style={{ margin: 0, color: "var(--ink-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                The measurements are consistent with an undercharge or another refrigerant-side restriction/flow problem. Verify airflow, operating conditions, metering-device behavior, line-set configuration, and the manufacturer&apos;s charging procedure before adding refrigerant. If an OEM charge-per-length value applies, calculate the required trim charge from that documentation and weigh it in according to the manufacturer&apos;s procedure.
              </p>
            </div>
          </div>
        </section>

        {/* REGULATORY & ENGINEERING DISCLAIMER */}
        <Disclaimer isLifeSafety={true} safetyTopic="a2l" />
      </main>
    </>
  );
}
