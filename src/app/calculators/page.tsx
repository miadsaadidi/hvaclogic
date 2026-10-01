import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { publishedCalculators } from "@/lib/data/calculators-registry";
import { HomeSearchFilter } from "@/components/home/HomeSearchFilter";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "HVAC Engineering Calculators Directory — 25 Interactive Tools",
  description:
    "Directory of 25 browser-based HVAC calculation tools for duct hydraulics, cooling loads, heating systems, psychrometrics, and field diagnostics.",
  keywords: [
    "HVAC calculators",
    "HVAC engineering calculators",
    "duct sizing calculator",
    "HVAC load calculator",
    "airflow calculator",
    "heat pump calculator",
    "furnace sizing calculator",
    "boiler calculator",
    "refrigerant calculator",
    "psychrometric calculator",
    "HVAC diagnostic tools",
    "building science calculator",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/calculators`,
  },
  openGraph: {
    title: "HVAC Engineering Calculators: All 25 Calculation Tools",
    description:
      "Directory of 25 browser-based HVAC calculation tools for duct hydraulics, cooling loads, heating systems, psychrometrics, and field diagnostics.",
    url: `${siteConfig.canonicalDomain}/calculators`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVAC Engineering Calculators Directory - HVACLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Engineering Calculators: All 25 Calculation Tools",
    description:
      "Directory of 25 browser-based HVAC calculation tools for duct hydraulics, cooling loads, heating systems, psychrometrics, and field diagnostics.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function CalculatorsDirectoryPage() {
  const calculators = publishedCalculators();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.canonicalDomain}/calculators/#collection`,
        name: "HVAC Engineering Calculators Directory — All 25 Calculation Tools",
        description:
          "Comprehensive directory of 25 browser-based HVAC calculation tools for duct hydraulics, cooling loads, heating systems, combustion air, psychrometrics, and refrigerant diagnostics.",
        url: `${siteConfig.canonicalDomain}/calculators`,
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
            name: "Calculators",
            item: `${siteConfig.canonicalDomain}/calculators`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "HVAC Logic Engineering Calculators",
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
        {/* BREADCRUMB */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            marginBottom: "1.5rem",
          }}
        >
          <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Calculators</span>
        </nav>

        {/* HERO SECTION */}
        <section className="hero-wrapper" style={{ marginBottom: "2.5rem" }}>
          <div className="hero-ambient-glow" aria-hidden="true" />

          <div className="hero-eyebrow-badge">
            <span className="pulse-radar-dot" aria-hidden="true" />
            <span>Master Engineering Directory • {calculators.length} Calculators</span>
          </div>

          <h1 className="hero-main-heading">
            HVAC Engineering Calculators{" "}
            <span className="hero-gradient-highlight">Directory</span>
          </h1>

          <p className="hero-lead-text">
            Browser-based HVAC calculation tools for airflow, cooling loads, heating systems,
            building science, psychrometrics, and field diagnostics. Client-side computation with local in-browser processing.
          </p>

          {/* QUICK CATEGORY JUMP PILLS */}
          <div className="hero-jump-pills-row">
            <Link href="/airflow-ducts" className="hero-jump-pill">
              <span>🌀</span>
              <span>Airflow &amp; Ducts</span>
            </Link>
            <Link href="/cooling-loads" className="hero-jump-pill">
              <span>❄️</span>
              <span>Cooling &amp; Loads</span>
            </Link>
            <Link href="/field-diagnostics" className="hero-jump-pill">
              <span>🔧</span>
              <span>Field Diagnostics &amp; PT</span>
            </Link>
            <Link href="/heating-systems" className="hero-jump-pill">
              <span>🔥</span>
              <span>Heating &amp; Heat Pumps</span>
            </Link>
            <Link href="/building-science" className="hero-jump-pill">
              <span>🏢</span>
              <span>Building Science</span>
            </Link>
            <Link
              href="/guides"
              className="hero-jump-pill"
              style={{
                borderColor: "rgba(0, 210, 255, 0.35)",
                background: "rgba(0, 210, 255, 0.08)",
                color: "var(--accent-cooling)",
              }}
            >
              <span>📚</span>
              <span>Master Guides Hub</span>
            </Link>
          </div>
        </section>

        {/* SEARCH & INTERACTIVE CALCULATOR GRID */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              margin: "0 0 0.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            All {calculators.length} Engineering Tools
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Filter by domain or search for specific parameters (CFM, BTU, sensible heat, static pressure, A2L glide):
          </p>
        </div>

        <HomeSearchFilter calculators={calculators} />

        {/* ENGINEERING METHODOLOGY & PILLARS SECTION */}
        <section
          style={{
            borderTop: "1px solid var(--border-color)",
            marginTop: "4rem",
            paddingTop: "3rem",
            paddingBottom: "2rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>
              Engineering References &amp; Physics
            </p>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0.25rem 0" }}>
              Built on First Principles &amp; Engineering References
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "600px", margin: "0.5rem auto 0" }}>
              Calculators in this directory reference recognized engineering methodologies and fluid mechanics principles:
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <div
              style={{
                background: "var(--surface-color, #111827)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "1.5rem",
                borderTop: "4px solid #00d2ff",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#00d2ff" }}>
                Airflow &amp; Hydraulics
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 1rem" }}>
                Calculates duct sizing and friction losses referencing Colebrook-White equations, Darcy-Weisbach relations, SMACNA guidelines, and Manual D design concepts.
              </p>
              <Link
                href="/airflow-ducts"
                style={{ fontSize: "0.85rem", color: "#00d2ff", fontWeight: 600, textDecoration: "none" }}
              >
                Read Airflow Pillar Guide &rarr;
              </Link>
            </div>

            <div
              style={{
                background: "var(--surface-color, #111827)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "1.5rem",
                borderTop: "4px solid #38bdf8",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#38bdf8" }}>
                Cooling &amp; Thermal Loads
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 1rem" }}>
                Provides cooling load estimates and equipment sizing comparisons referencing ACCA Manual J/S principles and published AHRI performance data.
              </p>
              <Link
                href="/cooling-loads"
                style={{ fontSize: "0.85rem", color: "#38bdf8", fontWeight: 600, textDecoration: "none" }}
              >
                Read Cooling Pillar Guide &rarr;
              </Link>
            </div>

            <div
              style={{
                background: "var(--surface-color, #111827)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "1.5rem",
                borderTop: "4px solid #ff6b4a",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#ff6b4a" }}>
                Heating &amp; Electrification
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 1rem" }}>
                Models heat pump balance points, temperature-dependent capacity curves, combustion air sizing references (NFPA 54/IFGC), and hydronic heating estimates.
              </p>
              <Link
                href="/heating-systems"
                style={{ fontSize: "0.85rem", color: "#ff6b4a", fontWeight: 600, textDecoration: "none" }}
              >
                Read Heating Pillar Guide &rarr;
              </Link>
            </div>

            <div
              style={{
                background: "var(--surface-color, #111827)",
                border: "1px solid var(--border-color)",
                borderRadius: "8px",
                padding: "1.5rem",
                borderTop: "4px solid #10b981",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.5rem", color: "#10b981" }}>
                Diagnostics &amp; Refrigerants
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 1rem" }}>
                References thermophysical property data (including NIST REFPROP models), zeotropic A2L temperature glide concepts, and field superheat/subcooling measurement conventions.
              </p>
              <Link
                href="/field-diagnostics"
                style={{ fontSize: "0.85rem", color: "#10b981", fontWeight: 600, textDecoration: "none" }}
              >
                Read Diagnostics Pillar Guide &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ARCHITECTURAL GUARANTEE CARD */}
        <section
          style={{
            background: "rgba(0, 210, 255, 0.04)",
            border: "1px solid rgba(0, 210, 255, 0.2)",
            borderRadius: "12px",
            padding: "2rem",
            margin: "3rem 0",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "2rem", display: "inline-block", marginBottom: "0.5rem" }}>🔒</span>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
            Client-Side Calculation Architecture
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-muted)",
              maxWidth: "700px",
              margin: "0 auto 1.25rem",
              lineHeight: 1.6,
            }}
          >
            Unlike cloud-hosted calculation platforms, all 25 HVACLogic calculators evaluate formulas directly in your
            browser. Inputs and project figures remain on your local device without being stored in an external database.
            Standard anonymous site analytics are collected for performance and traffic measurement.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/methodology"
              style={{
                fontSize: "0.85rem",
                color: "var(--accent-primary)",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Review Calculation Engine Methodology &rarr;
            </Link>
            <Link
              href="/privacy"
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                textDecoration: "underline",
              }}
            >
              Read Privacy Architecture &rarr;
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
