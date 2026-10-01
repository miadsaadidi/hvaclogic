import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ashraeClimaticDataset } from "@/lib/data/ashrae-climatic-data";
import { ClimaticDataTable } from "./ClimaticDataTable";

export const metadata: Metadata = {
  title: "ASHRAE-Based Climatic Design Conditions: 50 US States & Canada",
  description:
    "Reference database of ASHRAE-based 99% winter heating and 0.4% summer cooling design dry-bulb temperatures, coincident wet-bulb, and IECC climate zones.",
  keywords: [
    "ASHRAE climatic design conditions",
    "HVAC design temperatures",
    "heating design temperature",
    "cooling design temperature",
    "99% heating design temperature",
    "99.6% heating design temperature",
    "0.4% cooling design temperature",
    "coincident wet bulb",
    "IECC climate zone",
    "HVAC weather data",
    "HVAC design conditions",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/ashrae-climatic-data`,
  },
  openGraph: {
    title: "ASHRAE-Based Climatic Design Conditions Reference Database",
    description:
      "Searchable weather design conditions for 50 US states and Canadian metros: 99% Winter DB, 0.4% Summer DB, Coincident WB, and IECC Climate Zones for HVAC load sizing.",
    url: `${siteConfig.canonicalDomain}/ashrae-climatic-data`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "ASHRAE-Based Climatic Design Conditions — HVACLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASHRAE-Based Climatic Design Conditions Reference Database",
    description: "Searchable meteorological design conditions for 50 US states and Canadian metros.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function AshraeClimaticDataPage() {
  const canonicalUrl = `${siteConfig.canonicalDomain}/ashrae-climatic-data`;

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${canonicalUrl}#dataset`,
    name: "ASHRAE-Based Climatic Design Conditions Reference Dataset (50 US States + Canada)",
    description:
      "Reference meteorological design conditions (99% winter dry bulb, 0.4% summer dry bulb, coincident wet bulb) for HVAC load calculations based on published ASHRAE and ACCA meteorological data.",
    url: canonicalUrl,
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    version: "2026.1",
    creator: {
      "@type": "Organization",
      name: "HVACLogic",
      url: siteConfig.canonicalDomain,
    },
    citation: [
      "https://www.ashrae.org/technical-resources/standards-and-guidelines",
      "https://www.acca.org/standards/technical-manuals",
    ],
    variableMeasured: [
      "Winter 99.0% Heating Design Dry-Bulb Temperature",
      "Winter 99.6% Heating Design Dry-Bulb Temperature",
      "Summer 0.4% Cooling Design Dry-Bulb Temperature",
      "Summer 1.0% Cooling Design Dry-Bulb Temperature",
      "Summer 0.4% Mean Coincident Wet-Bulb Temperature",
      "IECC Building Climate Zone",
      "Station Elevation",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <div className="page site-container" style={{ padding: "2rem 0 4rem" }}>
        {/* Breadcrumb Navigation */}
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.25rem" }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">ASHRAE-Based Climatic Design Conditions</span>
        </nav>

        {/* Page Header */}
        <header style={{ marginBottom: "2rem" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              background: "rgba(0, 210, 255, 0.12)",
              color: "var(--accent-cooling)",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.6rem",
            }}
          >
            Regional Weather Reference Database
          </span>
          <h1 style={{ fontSize: "2.1rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.25, marginBottom: "0.75rem" }}>
            ASHRAE-Based Climatic Design Conditions (50 US States &amp; Canada)
          </h1>
          <p
            className="speakable-definition"
            style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", maxWidth: "860px", lineHeight: 1.6 }}
          >
            Reference climatic design conditions (99% and 99.6% winter heating dry-bulb, 0.4% and 1.0% summer cooling dry-bulb, and coincident wet-bulb temperatures) across all 50 US states, the District of Columbia, and Canadian metropolitan weather stations. Based on published meteorological design information from the <strong>ASHRAE Handbook of Fundamentals (Climatic Design Information)</strong> and <strong>ACCA Manual J (8th Edition)</strong> reference tables.
          </p>
        </header>

        {/* Dataset Provenance & Scope Card */}
        <section
          style={{
            marginBottom: "2rem",
            padding: "1.25rem 1.5rem",
            borderRadius: "0.65rem",
            background: "rgba(0, 210, 255, 0.04)",
            border: "1px solid rgba(0, 210, 255, 0.2)",
            fontSize: "0.85rem",
            color: "var(--ink-secondary)",
            lineHeight: 1.55,
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "space-between" }}>
            <div>
              <strong style={{ color: "var(--ink)", display: "block", marginBottom: "0.25rem" }}>
                📋 Dataset Provenance &amp; Coverage
              </strong>
              <span>
                <strong>Coverage:</strong> 87 representative stations (50 U.S. states, District of Columbia, and 4 major Canadian metropolitan airports).
              </span>
              <br />
              <span>
                <strong>U.S. Stations:</strong> Referenced from published ASHRAE Handbook of Fundamentals station data and ACCA Manual J (8th Ed) Table 1A.
              </span>
              <br />
              <span>
                <strong>Canadian Stations:</strong> Referenced from Environment Canada and ASHRAE international climatic design summaries.
              </span>
            </div>
            <div>
              <strong style={{ color: "var(--ink)", display: "block", marginBottom: "0.25rem" }}>
                ⚙️ Methodology &amp; Version
              </strong>
              <span>
                <strong>Processing:</strong> Nominal design dry-bulb and wet-bulb temperatures rounded to integer °F as published in reference tables.
              </span>
              <br />
              <span>
                <strong>Dataset Version:</strong> 2026.1 • <strong>Last Updated:</strong> 2026-10-01
              </span>
            </div>
          </div>
        </section>

        {/* Interactive Client Search Table Component */}
        <ClimaticDataTable locations={ashraeClimaticDataset} />

        {/* Engineering Methodology Context Section */}
        <section
          style={{
            marginTop: "3.5rem",
            padding: "2rem",
            borderRadius: "0.75rem",
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
          }}
        >
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
            📐 Design-Condition Percentiles &amp; HVAC Sizing Context
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent-heating)", marginBottom: "0.4rem" }}>
                Winter 99% vs 99.6% Design Dry Bulb
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                The 99.0% heating design dry-bulb temperature represents a statistical threshold: on average over a multi-year period of record, outdoor temperatures fall at or below this value during approximately 1% of the hours in a standard meteorological year (approx. 88 hours). Selection between 99.0% and 99.6% design conditions depends on the applicable design methodology, building occupancy, critical infrastructure criteria, local building code requirements, and owner/engineer design preferences.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent-cooling)", marginBottom: "0.4rem" }}>
                Summer 0.4% vs 1.0% Design Dry Bulb &amp; Coincident WB
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                The 0.4% summer cooling design dry-bulb represents the warm-season temperature exceeded on average during approximately 0.4% of annual hours (approx. 35 hours per year). Outdoor design dry-bulb and coincident wet-bulb temperatures provide essential boundary inputs for cooling-load calculations. Final equipment capacity and moisture removal performance depend on the complete sensible and latent load evaluation, equipment part-load curves, and selection methodologies (such as ACCA Manual S).
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.4rem" }}>
                IECC Climate Zones (1A to 8)
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                The International Energy Conservation Code (IECC) and ANSI/ASHRAE/IES Standard 90.1 categorize regional climates into thermal zones (1 through 8) and moisture regimes: A (Moist/Humid), B (Dry/Arid), and C (Marine). IECC climate zones are used by applicable energy-code provisions to determine climate-dependent requirements (such as minimum building envelope insulation and equipment efficiency criteria) subject to adopted local code editions and amendments.
              </p>
            </div>
          </div>
        </section>

        {/* Connected Calculation Workflows Section */}
        <section style={{ marginTop: "3rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <p className="eyebrow" style={{ marginBottom: "0.2rem" }}>Use Design Conditions as Sizing Inputs</p>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
              Apply Climatic Design Conditions to Engineering Calculation Models
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <Link
              href="/calculators/btu-calculator"
              className="powerlab-card-link"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.25rem",
                borderRadius: "0.75rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "3px solid #38bdf8",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "#38bdf8" }}>
                  Cooling &amp; Loads
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Cooling &amp; Heating Load Estimate</span>
              </div>
              <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>
                BTU Heating &amp; Cooling Load Calculator
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.45, margin: "0 0 0.85rem", flex: 1 }}>
                Apply local 0.4% summer cooling DB and 99% winter heating DB as design inputs for whole-house sensible and latent heat load screening models.
              </p>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#38bdf8", paddingTop: "0.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
                <span>Launch Load Calculator</span>
                <span>→</span>
              </div>
            </Link>

            <Link
              href="/calculators/heat-loss-calculator"
              className="powerlab-card-link"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.25rem",
                borderRadius: "0.75rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "3px solid #8b5cf6",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "#8b5cf6" }}>
                  Building Science
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Design Conditions • Envelope Heat Loss</span>
              </div>
              <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>
                Building Heat Loss &amp; Infiltration Sizer
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.45, margin: "0 0 0.85rem", flex: 1 }}>
                Input 99% winter design dry-bulb temperatures as design conditions to estimate conductive envelope transmission (U · A · ΔT) and air infiltration losses.
              </p>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#8b5cf6", paddingTop: "0.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
                <span>Launch Heat Loss Sizer</span>
                <span>→</span>
              </div>
            </Link>

            <Link
              href="/calculators/heat-pump-size-calculator"
              className="powerlab-card-link"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.25rem",
                borderRadius: "0.75rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "3px solid #ff6b4a",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "#ff6b4a" }}>
                  Heating Systems
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Heating Systems • Balance Point</span>
              </div>
              <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>
                Heat Pump Sizing &amp; Balance Point Tool
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", lineHeight: 1.45, margin: "0 0 0.85rem", flex: 1 }}>
                Evaluate heat pump capacity curves down to 99% winter design temperatures to estimate thermal balance points and auxiliary electric heat strip requirements.
              </p>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#ff6b4a", paddingTop: "0.5rem", borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between" }}>
                <span>Launch Balance Point Tool</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
