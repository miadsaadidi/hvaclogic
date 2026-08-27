import type { Metadata } from "next";
import Link from "next/link";
import { publishedCalculators } from "@/lib/data/calculators-registry";
import { ConnectedSystemFlow } from "@/components/home/ConnectedSystemFlow";
import { HomeSearchFilter } from "@/components/home/HomeSearchFilter";
import { HomeStatsBar } from "@/components/home/HomeStatsBar";
import { TrustBadges } from "@/components/home/TrustBadges";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { HOMEPAGE_FAQS } from "@/lib/data/homepage-faqs";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "HVAC Logic — Engineering Calculators & Building Science",
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.canonicalDomain,
  },
  openGraph: {
    title: "HVAC Logic — Engineering Calculators & Building Science",
    description: siteConfig.description,
    url: siteConfig.canonicalDomain,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Logic — Engineering Calculators & Building Science",
    description: siteConfig.description,
  },
  other: {
    "article:published_time": "2026-08-15T08:00:00Z",
    "article:modified_time": "2026-08-27T20:00:00Z",
  },
};

export default function HomePage() {
  const calculators = publishedCalculators();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.canonicalDomain}/#website`,
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
        "@type": "WebPage",
        "@id": `${siteConfig.canonicalDomain}/#webpage`,
        url: siteConfig.canonicalDomain,
        name: "HVAC Logic — Engineering Calculators & Building Science",
        description: siteConfig.description,
        datePublished: "2026-08-15T08:00:00+00:00",
        dateModified: "2026-08-27T20:00:00+00:00",
        "inLanguage": "en-US",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${siteConfig.canonicalDomain}/#website`,
        },
      },
      {
        "@type": "ItemList",
        name: "HVAC Logic Engineering Calculators",
        numberOfItems: calculators.length,
        itemListElement: calculators.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: c.name,
          url: new URL(c.route, siteConfig.canonicalDomain).toString(),
          description: c.metaDescription,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: HOMEPAGE_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
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
        <section className="hero-wrapper">
          {/* Ambient Glow Background */}
          <div className="hero-ambient-glow" aria-hidden="true" />

          {/* Eyebrow Status Pill */}
          <div className="hero-eyebrow-badge">
            <span className="pulse-radar-dot" aria-hidden="true" />
            <span>Precision HVAC &amp; Building Science Suite</span>
          </div>

          {/* Main Title (Refined font weight, balanced wrap, gradient accent) */}
          <h1 className="hero-main-heading">
            Deterministic Engineering Calculators{" "}
            <span className="hero-gradient-highlight">for Ductwork, Loads &amp; Diagnostics</span>
          </h1>

          <p className="hero-lead-text">
            Transparent thermodynamic and fluid mechanics formulas built on ASHRAE, ACCA, EPA, and IECC standards. 100% client-side precision.
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
          </div>
        </section>

        {/* HERO STATS RIBBON */}
        <HomeStatsBar />

        {/* CONNECTED ECOSYSTEM FLOW SCHEMATIC */}
        <ConnectedSystemFlow />

        {/* SEARCH & ALL PUBLISHED CALCULATORS */}
        <div style={{ textAlign: "center", marginTop: "3.5rem", marginBottom: "1rem" }}>
          <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>Complete Engineering Suite</p>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0.25rem 0 0.4rem", letterSpacing: "-0.01em" }}>
            All {calculators.length} HVAC Engineering Calculators
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "650px", margin: "0 auto" }}>
            Select a category or search below to launch any calculator with prefilled engineering presets:
          </p>
        </div>

        <HomeSearchFilter calculators={calculators} />

        {/* TRUST & ENGINEERING TRANSPARENCY */}
        <TrustBadges />

        {/* FREQUENTLY ASKED QUESTIONS */}
        <HomeFaqSection />

        {/* SUPPORTING LINKS FOOTER SECTION */}
        <section style={{ borderTop: "1px solid var(--border-color)", marginTop: "2rem", paddingTop: "2.5rem", paddingBottom: "2rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.65rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginRight: "0.25rem" }}>
              Explore Hubs:
            </span>
            <Link href="/airflow-ducts" className="hero-jump-pill">
              <span>🌀</span> Airflow &amp; Ducts
            </Link>
            <Link href="/cooling-loads" className="hero-jump-pill">
              <span>❄️</span> Cooling Loads
            </Link>
            <Link href="/field-diagnostics" className="hero-jump-pill">
              <span>🔧</span> Field Diagnostics
            </Link>
            <Link href="/heating-systems" className="hero-jump-pill">
              <span>🔥</span> Heating Systems
            </Link>
            <Link href="/building-science" className="hero-jump-pill">
              <span>🏢</span> Building Science
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
