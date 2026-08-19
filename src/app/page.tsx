import React from "react";
import Link from "next/link";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { ConnectedSystemFlow } from "@/components/home/ConnectedSystemFlow";
import { HomeSearchFilter } from "@/components/home/HomeSearchFilter";
import { TrustBadges } from "@/components/home/TrustBadges";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.canonicalDomain,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.canonicalDomain}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ItemList",
        name: "HVAC Logic Engineering Calculators",
        numberOfItems: calculatorRegistry.length,
        itemListElement: calculatorRegistry.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: c.name,
          url: new URL(c.route, siteConfig.canonicalDomain).toString(),
          description: c.metaDescription,
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
        {/* HERO SECTION */}
        <section
          className="hero"
          style={{
            textAlign: "center",
            padding: "2.5rem 1rem 1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
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
              margin: "0 auto 0.75rem",
            }}
          >
            <span>⚡</span>
            <span>Precision HVAC &amp; Building Science Suite</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.1rem, 5vw, 3.4rem)",
              lineHeight: 1.15,
              fontWeight: 800,
              margin: "0.4rem auto 0.75rem",
              textAlign: "center",
              maxWidth: "960px",
              width: "100%",
            }}
          >
            Deterministic Engineering Calculators for Ductwork, Loads &amp; Diagnostics
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--text-muted)",
              maxWidth: "640px",
              margin: "0 auto 1.5rem",
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            Transparent engineering formulas built on ASHRAE, ACCA, EPA, and IECC standards.
          </p>

          {/* QUICK CATEGORY JUMP PILLS */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
            <Link href="/airflow-ducts" className="jump-pill">
              <span>🌀</span>
              <span>Airflow &amp; Ducts</span>
            </Link>
            <Link href="/cooling-loads" className="jump-pill">
              <span>❄️</span>
              <span>Cooling &amp; Loads</span>
            </Link>
            <Link href="/field-diagnostics" className="jump-pill">
              <span>🔧</span>
              <span>Field Diagnostics &amp; PT</span>
            </Link>
            <Link href="/heating-systems" className="jump-pill">
              <span>🔥</span>
              <span>Heating &amp; Heat Pumps</span>
            </Link>
            <Link href="/building-science" className="jump-pill">
              <span>🏢</span>
              <span>Building Science</span>
            </Link>
          </div>
        </section>

        {/* CONNECTED ECOSYSTEM FLOW SCHEMATIC */}
        <ConnectedSystemFlow />

        {/* SEARCH & ALL 17 CALCULATORS */}
        <div style={{ textAlign: "center", marginTop: "3rem", marginBottom: "1rem" }}>
          <p className="eyebrow">Complete Engineering Suite</p>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0" }}>
            All 17 HVAC Engineering Calculators
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Select a category or search below to launch any calculator with prefilled engineering presets:
          </p>
        </div>

        <HomeSearchFilter calculators={calculatorRegistry} />

        {/* TRUST & ENGINEERING TRANSPARENCY */}
        <TrustBadges />

        {/* SUPPORTING LINKS FOOTER SECTION */}
        <section style={{ borderTop: "1px solid var(--border-color)", paddingTop: "2rem", paddingBottom: "2rem" }}>
          <p style={{ textAlign: "center", fontSize: "0.875rem", color: "var(--ink-secondary)" }}>
            <Link href="/airflow-ducts" style={{ color: "inherit", textDecoration: "none" }}>Airflow &amp; Ducts</Link>
            <span aria-hidden="true" style={{ margin: "0 0.5rem", opacity: 0.5 }}>•</span>
            <Link href="/cooling-loads" style={{ color: "inherit", textDecoration: "none" }}>Cooling Loads</Link>
            <span aria-hidden="true" style={{ margin: "0 0.5rem", opacity: 0.5 }}>•</span>
            <Link href="/field-diagnostics" style={{ color: "inherit", textDecoration: "none" }}>Field Diagnostics</Link>
            <span aria-hidden="true" style={{ margin: "0 0.5rem", opacity: 0.5 }}>•</span>
            <Link href="/heating-systems" style={{ color: "inherit", textDecoration: "none" }}>Heating Systems</Link>
            <span aria-hidden="true" style={{ margin: "0 0.5rem", opacity: 0.5 }}>•</span>
            <Link href="/building-science" style={{ color: "inherit", textDecoration: "none" }}>Building Science</Link>
          </p>
        </section>
      </main>
    </>
  );
}
