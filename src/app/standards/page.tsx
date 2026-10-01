import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ENGINEERING_STANDARDS } from "@/lib/data/standards-matrix";
import { CodeFormulaBlock } from "@/components/seo/CodeFormulaBlock";

export const metadata: Metadata = {
  title: "HVAC Engineering Standards Cross-Reference",
  description: "Technical cross-reference connecting ASHRAE standards, ACCA manuals, SMACNA guidelines, AHRI test ratings, and EPA regulations to HVACLogic calculation engines.",
  keywords: [
    "HVAC standards cross-reference",
    "ASHRAE standards",
    "ACCA manuals",
    "SMACNA duct construction",
    "AHRI 210 240",
    "EPA Section 608",
    "HVAC calculation methods",
    "building science standards",
  ],
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/standards`,
  },
  openGraph: {
    title: "HVAC Engineering Standards Cross-Reference",
    description: "Technical cross-reference connecting ASHRAE standards, ACCA manuals, SMACNA guidelines, AHRI test ratings, and EPA regulations to HVACLogic calculation engines.",
    url: `${siteConfig.canonicalDomain}/standards`,
    siteName: "HVACLogic",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVAC Engineering Standards Cross-Reference",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Engineering Standards Cross-Reference",
    description: "Technical cross-reference connecting ASHRAE standards, ACCA manuals, SMACNA guidelines, AHRI test ratings, and EPA regulations to HVACLogic calculation engines.",
  },
};

export default function StandardsMatrixPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemPage",
        "@id": `${siteConfig.canonicalDomain}/standards#page`,
        name: "HVAC Engineering Standards Cross-Reference",
        description: "Technical cross-reference connecting ASHRAE standards, ACCA manuals, SMACNA guidelines, AHRI test ratings, and EPA regulations to HVACLogic calculation engines.",
        url: `${siteConfig.canonicalDomain}/standards`,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.canonicalDomain}/#website`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.canonicalDomain}/standards#breadcrumbs`,
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
            name: "Standards & References",
            item: `${siteConfig.canonicalDomain}/standards`,
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
      <div className="site-container page" style={{ padding: "2.5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <li>
              <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            </li>
            <li>/</li>
            <li style={{ color: "var(--ink)", fontWeight: 600 }} aria-current="page">Standards &amp; References</li>
          </ol>
        </nav>

        {/* Hero Header */}
        <header style={{ marginBottom: "2.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              background: "rgba(167, 139, 250, 0.1)",
              border: "1px solid rgba(167, 139, 250, 0.25)",
              color: "#a78bfa",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "1rem",
            }}
          >
            <span>📜</span>
            <span>Standards &amp; Reference Methods Cross-Reference</span>
          </div>
          <h1 style={{ fontSize: "2.35rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: "0.75rem", lineHeight: 1.2 }}>
            HVAC Engineering Standards Cross-Reference
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", maxWidth: "880px", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Cross-reference connecting relevant HVAC standards, manuals, code provisions, and reference methods to the calculation methods implemented by HVACLogic.
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
              <strong style={{ color: "var(--ink)" }}>Technical Scope Note:</strong> The references on this page identify standards, manuals, regulations, and calculation methods relevant to HVACLogic tools. A reference to a standard does not by itself indicate complete implementation, certification, endorsement, or legal compliance. Applicability and code requirements depend on the adopted edition and jurisdiction.
            </p>
          </div>
        </header>

        {/* Standards List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginBottom: "4rem" }}>
          {ENGINEERING_STANDARDS.map((std) => (
            <section
              key={std.code}
              id={std.code.toLowerCase().replace(/[^a-z0-9]/g, "-")}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "4px solid var(--accent-cooling)",
                borderRadius: "0.75rem",
                padding: "1.75rem 2rem",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Standard Header */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--accent-cooling)",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      padding: "0.25rem 0.65rem",
                      borderRadius: "4px",
                      border: "1px solid var(--border-color)",
                      fontFamily: "var(--font-mono, monospace)",
                    }}
                  >
                    {std.code}
                  </span>
                  <span
                    style={{
                      background: "rgba(56, 189, 248, 0.1)",
                      color: "var(--accent-cooling)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.55rem",
                      borderRadius: "4px",
                    }}
                  >
                    {std.organization}
                  </span>
                </div>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  {std.edition}
                </span>
              </div>

              <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                {std.title}
              </h2>

              <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                <strong>Scope:</strong> {std.scope}
              </p>

              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                💡 <strong>Standards / Regulatory Context:</strong> {std.importance}
              </p>

              {/* Clauses Breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", margin: 0, paddingBottom: "0.4rem", borderBottom: "1px solid var(--border-color)" }}>
                  Referenced Clauses &amp; Calculation Methods
                </h3>

                {std.clauses.map((clause) => (
                  <div
                    key={clause.clauseNumber}
                    style={{
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "0.55rem",
                      padding: "1.25rem",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-cooling)", fontFamily: "var(--font-mono, monospace)" }}>
                        [{clause.clauseNumber}]
                      </span>
                      <strong style={{ fontSize: "0.95rem", color: "var(--ink)" }}>{clause.title}</strong>
                    </div>

                    <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: clause.governingEquation ? "0.75rem" : "1rem" }}>
                      {clause.summary}
                    </p>

                    {clause.governingEquation && (
                      <div style={{ marginBottom: "1rem" }}>
                        <CodeFormulaBlock
                          formula={clause.governingEquation}
                          title={`clause_${clause.clauseNumber.toLowerCase().replace(/[^a-z0-9]/g, "_")}.math`}
                          badge={std.code}
                        />
                      </div>
                    )}

                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-muted)" }}>
                        Related HVACLogic Calculators:
                      </span>
                      {clause.applicableCalculators.map((calc) => (
                        <Link
                          key={calc.route}
                          href={calc.route}
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            padding: "0.25rem 0.6rem",
                            borderRadius: "4px",
                            background: "var(--surface)",
                            border: "1px solid var(--border-color)",
                            color: "var(--accent-cooling)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <span>⚡</span>
                          <span>{calc.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
