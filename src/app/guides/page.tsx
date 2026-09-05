import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ENGINEERING_GUIDES } from "@/lib/data/guides-registry";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "HVAC Engineering Guides & Field Sizing Protocols | HVACLogic",
  description:
    "Comprehensive on-page engineering guides covering ACCA Manual D duct hydraulics, Manual J cooling loads, heat pump cold-climate balance points, A2L refrigerant glide, and building science physics.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/guides`,
  },
  openGraph: {
    title: "HVAC Engineering Guides & Field Sizing Protocols | HVACLogic",
    description:
      "Comprehensive on-page engineering guides covering ACCA Manual D duct hydraulics, Manual J cooling loads, heat pump cold-climate balance points, A2L refrigerant glide, and building science physics.",
    url: `${siteConfig.canonicalDomain}/guides`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVAC Engineering Guides & Sizing Protocols — HVACLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Engineering Guides & Field Sizing Protocols | HVACLogic",
    description:
      "Comprehensive on-page engineering guides covering ACCA Manual D duct hydraulics, Manual J cooling loads, heat pump cold-climate balance points, A2L refrigerant glide, and building science physics.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function GuidesHubPage() {
  const publishedGuides = ENGINEERING_GUIDES.filter((g) => g.status === "published");
  const scheduledGuides = ENGINEERING_GUIDES.filter((g) => g.status === "scheduled");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.canonicalDomain}/guides/#collection`,
        name: "HVAC Engineering Guides & Field Sizing Protocols",
        description:
          "Comprehensive engineering guides covering ACCA Manual D, Manual J, Manual S, heat pump balance points, A2L zeotropic temperature glide, and building science physics.",
        url: `${siteConfig.canonicalDomain}/guides`,
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
            name: "Engineering Guides",
            item: `${siteConfig.canonicalDomain}/guides`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: "HVAC Engineering Master Guides",
        numberOfItems: ENGINEERING_GUIDES.length,
        itemListElement: ENGINEERING_GUIDES.map((guide, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: guide.title,
          url: new URL(guide.targetRoute, siteConfig.canonicalDomain).toString(),
          description: guide.summary,
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
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Engineering Guides</span>
        </nav>

        {/* HERO HEADER */}
        <header className="calculator-header" style={{ marginBottom: "2.5rem" }}>
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
            <span>Master Engineering Protocols</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.85rem, 4vw, 2.75rem)", fontWeight: 800, margin: "0 0 0.75rem" }}>
            HVAC Engineering Guides &amp; Field Protocols
          </h1>
          <p className="intro" style={{ maxWidth: "800px" }}>
            In-depth technical guides connecting fundamental thermodynamic and fluid mechanics equations to real-world residential and commercial HVAC design, diagnostics, and code compliance.
          </p>

          {/* STATUS PILLS SUMMARY */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.65rem",
              marginTop: "1.25rem",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                background: "rgba(16, 185, 129, 0.12)",
                color: "#10b981",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                padding: "0.25rem 0.65rem",
                borderRadius: "6px",
              }}
            >
              ✅ {publishedGuides.length} Live Master Guides
            </span>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                background: "rgba(0, 210, 255, 0.12)",
                color: "var(--accent-cooling)",
                border: "1px solid rgba(0, 210, 255, 0.25)",
                padding: "0.25rem 0.65rem",
                borderRadius: "6px",
              }}
            >
              📅 {scheduledGuides.length} Scheduled Rollout Guides
            </span>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                background: "var(--surface-raised)",
                color: "var(--ink-secondary)",
                border: "1px solid var(--border-subtle)",
                padding: "0.25rem 0.65rem",
                borderRadius: "6px",
              }}
            >
              ⚡ 100% Deterministic &amp; Zero-Database
            </span>
          </div>
        </header>

        {/* SECTION 1: PUBLISHED MASTER GUIDES */}
        <section style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
              Live Engineering Master Guides
            </h2>
            <span style={{ fontSize: "0.8rem", color: "var(--ink-secondary)" }}>
              {publishedGuides.length} Complete References
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {publishedGuides.map((guide) => (
              <article
                key={guide.slug}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.5rem",
                  borderRadius: "0.85rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border-color)",
                  borderTop: `4px solid ${guide.color}`,
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                {/* TOP METADATA ROW */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: guide.color,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <span>{guide.icon}</span>
                    <span>{guide.category}</span>
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.72rem", color: "var(--ink-secondary)", fontWeight: 500 }}>
                      ⏱️ {guide.readingTime}
                    </span>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        background: "rgba(16, 185, 129, 0.1)",
                        color: "#10b981",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "4px",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                      }}
                    >
                      LIVE
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.35 }}>
                  <Link href={guide.targetRoute} style={{ color: "inherit", textDecoration: "none" }}>
                    {guide.title}
                  </Link>
                </h3>

                {/* SUMMARY */}
                <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, flex: 1 }}>
                  {guide.summary}
                </p>

                {/* GOVERNING EQUATIONS PREVIEW */}
                {guide.keyEquations.length > 0 && (
                  <div
                    style={{
                      background: "var(--surface-raised)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "0.5rem",
                      padding: "0.65rem 0.85rem",
                      marginBottom: "1rem",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.75rem",
                      color: "var(--ink)",
                      overflowX: "auto",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: guide.color, marginBottom: "0.2rem", fontSize: "0.7rem", textTransform: "uppercase" }}>
                      Key Equation:
                    </div>
                    <div>{guide.keyEquations[0].formula}</div>
                  </div>
                )}

                {/* STANDARDS PILLS */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
                  {guide.standards.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        background: "rgba(255, 255, 255, 0.04)",
                        color: "var(--ink-secondary)",
                        border: "1px solid var(--border-subtle)",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "4px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* COMPANION CALCULATORS MINI ROW */}
                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--ink-secondary)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    Companion Calculators:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {guide.companionCalculators.map((calc) => (
                      <Link
                        key={calc.route}
                        href={calc.route}
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--accent-cooling)",
                          textDecoration: "none",
                          background: "rgba(0, 210, 255, 0.06)",
                          border: "1px solid rgba(0, 210, 255, 0.15)",
                          padding: "0.15rem 0.45rem",
                          borderRadius: "4px",
                        }}
                      >
                        {calc.name} →
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ACTION CTA */}
                <Link
                  href={guide.targetRoute}
                  className="action-btn"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    background: "var(--surface-raised)",
                    borderColor: "var(--border-color)",
                    color: "var(--ink)",
                    textDecoration: "none",
                  }}
                >
                  Read Master Guide →
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 2: SCHEDULED ROLLOUT GUIDES */}
        <section style={{ marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.25rem", color: "var(--ink)" }}>
                Upcoming &amp; Scheduled Engineering Guides
              </h2>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", margin: 0 }}>
                1 new comprehensive on-page guide scheduled per day (September 5 – September 9, 2026).
              </p>
            </div>
            <span style={{ fontSize: "0.8rem", color: "var(--ink-secondary)" }}>
              {scheduledGuides.length} In Pipeline
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {scheduledGuides.map((guide) => (
              <article
                key={guide.slug}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.5rem",
                  borderRadius: "0.85rem",
                  background: "var(--surface)",
                  border: "1px solid var(--border-color)",
                  borderTop: `4px solid ${guide.color}`,
                  opacity: 0.95,
                }}
              >
                {/* TOP METADATA ROW */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: guide.color,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                  >
                    <span>{guide.icon}</span>
                    <span>{guide.category}</span>
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        background: "rgba(0, 210, 255, 0.1)",
                        color: "var(--accent-cooling)",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "4px",
                        border: "1px solid rgba(0, 210, 255, 0.2)",
                      }}
                    >
                      📅 {guide.scheduledDate}
                    </span>
                  </div>
                </div>

                {/* TITLE */}
                <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.35 }}>
                  {guide.title}
                </h3>

                {/* SUMMARY */}
                <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, flex: 1 }}>
                  {guide.summary}
                </p>

                {/* KEY EQUATIONS PREVIEW */}
                {guide.keyEquations.length > 0 && (
                  <div
                    style={{
                      background: "var(--surface-raised)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "0.5rem",
                      padding: "0.65rem 0.85rem",
                      marginBottom: "1rem",
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "0.75rem",
                      color: "var(--ink)",
                      overflowX: "auto",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: guide.color, marginBottom: "0.2rem", fontSize: "0.7rem", textTransform: "uppercase" }}>
                      Governing Formula:
                    </div>
                    <div>{guide.keyEquations[0].formula}</div>
                  </div>
                )}

                {/* STANDARDS PILLS */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
                  {guide.standards.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        background: "rgba(255, 255, 255, 0.04)",
                        color: "var(--ink-secondary)",
                        border: "1px solid var(--border-subtle)",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "4px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* COMPANION CALCULATORS MINI ROW */}
                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--ink-secondary)", textTransform: "uppercase", marginBottom: "0.4rem" }}>
                    Associated Calculators:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {guide.companionCalculators.map((calc) => (
                      <Link
                        key={calc.route}
                        href={calc.route}
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "var(--accent-cooling)",
                          textDecoration: "none",
                          background: "rgba(0, 210, 255, 0.06)",
                          border: "1px solid rgba(0, 210, 255, 0.15)",
                          padding: "0.15rem 0.45rem",
                          borderRadius: "4px",
                        }}
                      >
                        {calc.name} →
                      </Link>
                    ))}
                  </div>
                </div>

                {/* ACTION CTA */}
                <Link
                  href={guide.targetRoute}
                  className="action-btn"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    background: "var(--surface-raised)",
                    borderColor: "var(--border-color)",
                    color: "var(--ink)",
                    textDecoration: "none",
                  }}
                >
                  Explore Pillar Hub &amp; Calculators →
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* SUPPORTING LINKS FOOTER SECTION */}
        <section style={{ borderTop: "1px solid var(--border-color)", marginTop: "2rem", paddingTop: "2.5rem", paddingBottom: "2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.65rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "0.25rem" }}>
              Explore Other Hubs:
            </span>
            <Link href="/research" className="hero-jump-pill">
              <span>🎓</span> Research &amp; Whitepapers
            </Link>
            <Link href="/standards" className="hero-jump-pill">
              <span>📜</span> Standards Matrix
            </Link>
            <Link href="/methodology" className="hero-jump-pill">
              <span>📐</span> Calculation Methodology
            </Link>
            <Link href="/ashrae-climatic-data" className="hero-jump-pill">
              <span>📍</span> ASHRAE Climatic Data
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
