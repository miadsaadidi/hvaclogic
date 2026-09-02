import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ashraeClimaticDataset } from "@/lib/data/ashrae-climatic-data";
import { ClimaticDataTable } from "./ClimaticDataTable";

export const metadata: Metadata = {
  title: "ASHRAE Climatic Design Conditions (50 US States & Canada) | HVACLogic",
  description:
    "Comprehensive ASHRAE 99% winter heating and 0.4% summer cooling design temperatures for all 50 US states and Canadian metros. ACCA Manual J & ASHRAE 90.1 weather data.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/ashrae-climatic-data`,
  },
  openGraph: {
    title: "ASHRAE Climatic Design Conditions Database | HVACLogic",
    description:
      "Searchable weather data for 50 US states: 99% Winter DB, 0.4% Summer DB, Coincident WB, and IECC Climate Zones for HVAC load sizing.",
    url: `${siteConfig.canonicalDomain}/ashrae-climatic-data`,
    type: "website",
  },
};

export default function AshraeClimaticDataPage() {
  const canonicalUrl = `${siteConfig.canonicalDomain}/ashrae-climatic-data`;

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${canonicalUrl}#dataset`,
    name: "ASHRAE Climatic Design Conditions & Meteorological Design Dataset (50 US States + Canada)",
    description:
      "Standard meteorological design conditions for HVAC load calculations derived from ASHRAE Handbook of Fundamentals and ACCA Manual J Table 1A.",
    url: canonicalUrl,
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    creator: {
      "@type": "Organization",
      name: "HVACLogic Engineering Standards Committee",
      url: siteConfig.canonicalDomain,
      sameAs: [
        "https://archive.org/details/power-lab-deterministic-clean-energy-modeling-framework-2026_20260826",
        "https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing",
        "https://www.google.com/preferences/source?q=hvaclogic.org",
      ],
    },
    citation: [
      "https://www.ashrae.org/technical-resources/standards-and-guidelines",
      "https://www.acca.org/standards/technical-manuals",
    ],
    variableMeasured: [
      "Winter 99.0% Heating Design Dry-Bulb Temperature",
      "Winter 99.6% Extreme Heating Design Dry-Bulb Temperature",
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
          <span aria-current="page">ASHRAE Climatic Design Conditions</span>
        </nav>

        {/* Page Header */}
        <header style={{ marginBottom: "2.5rem" }}>
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
            Regional Weather Engineering Database
          </span>
          <h1 style={{ fontSize: "2.1rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.25, marginBottom: "0.75rem" }}>
            ASHRAE Climatic Design Conditions (50 US States &amp; Canada)
          </h1>
          <p
            className="speakable-definition"
            style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", maxWidth: "860px", lineHeight: 1.6 }}
          >
            Official ASHRAE 99% / 99.6% winter heating dry-bulb and 0.4% / 1.0% summer cooling design conditions across all 50 US states, the District of Columbia, and Canadian metropolitan weather stations. Governed by <strong>ASHRAE Handbook of Fundamentals (Chapter 14)</strong> and <strong>ACCA Manual J (8th Ed)</strong>.
          </p>
        </header>

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
            📐 Engineering Percentile Standards &amp; Sizing Rules
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent-heating)", marginBottom: "0.4rem" }}>
                Winter 99% vs 99.6% Design Dry Bulb
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                The 99.0% value represents the outdoor temperature exceeded 99.0% of the hours in a standard year (only 88 hours per year are colder). Standard residential Manual J heating designs use the 99% column, whereas hospitals, laboratories, and critical infrastructure use the 99.6% column.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent-cooling)", marginBottom: "0.4rem" }}>
                Summer 0.4% vs 1.0% Design Dry Bulb &amp; Coincident WB
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                The 0.4% design dry-bulb represents peak summer conditions exceeded only 35 hours per year. Sizing AC tonnage to the 0.4% condition ensures adequate peak capacity while avoiding excessive oversizing that impairs indoor humidity dehumidification.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.4rem" }}>
                IECC Climate Zones (1A to 8)
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                The International Energy Conservation Code (IECC) categorizes climate into moisture regimes: A (Moist/Humid), B (Dry/Arid), and C (Marine). Building envelope insulation (R-values) and HVAC efficiency tiers are mandated directly by these zones.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
