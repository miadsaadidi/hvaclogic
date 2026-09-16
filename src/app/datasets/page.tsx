import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { BENCHMARK_DATASETS } from "@/lib/data/datasets";

export const metadata: Metadata = {
  title: "Open Benchmark Datasets & Engineering Matrices",
  description: "Open-access tabular datasets, thermodynamic psychrometric matrices, heat pump COP derating benchmarks, and Manual J building science vectors.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/datasets`,
  },
  openGraph: {
    title: "Open Benchmark Datasets & Engineering Matrices | HVACLogic",
    description: "Open-access tabular datasets, thermodynamic psychrometric matrices, heat pump COP derating benchmarks, and Manual J building science vectors.",
    url: `${siteConfig.canonicalDomain}/datasets`,
    siteName: "HVACLogic",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVACLogic Open Benchmark Datasets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Benchmark Datasets & Engineering Matrices | HVACLogic",
    description: "Open-access tabular datasets, thermodynamic psychrometric matrices, heat pump COP derating benchmarks, and Manual J building science vectors.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function DatasetsCatalogPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.canonicalDomain}/datasets#webpage`,
        "url": `${siteConfig.canonicalDomain}/datasets`,
        "name": "Open Benchmark Datasets & Engineering Matrices",
        "description": "Open-access tabular datasets, thermodynamic psychrometric matrices, heat pump COP derating benchmarks, and Manual J building science vectors.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${siteConfig.canonicalDomain}/#website`,
          "name": "HVACLogic",
          "url": siteConfig.canonicalDomain,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.canonicalDomain}/datasets#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.canonicalDomain,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Datasets",
            "item": `${siteConfig.canonicalDomain}/datasets`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.canonicalDomain}/datasets#itemlist`,
        "name": "HVACLogic Scientific Benchmark Datasets",
        "itemListElement": BENCHMARK_DATASETS.map((ds, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": ds.title,
          "url": `${siteConfig.canonicalDomain}/datasets/${ds.slug}`,
        })),
      },
    ],
  };

  return (
    <div className="site-container page" style={{ padding: "2.5rem 1.5rem", maxWidth: "1320px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <li>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          </li>
          <li>/</li>
          <li style={{ color: "var(--ink)", fontWeight: 600 }} aria-current="page">Open Datasets</li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header style={{ marginBottom: "2.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1.75rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.85rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "var(--accent-success, #10b981)",
              fontSize: "0.74rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <span>📊</span>
            <span>Open Science Tabular Benchmarks</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              background: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              color: "var(--accent-cooling, #0284c7)",
              fontSize: "0.74rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <span>🛡️</span>
            <span>CC BY 4.0 Open Access</span>
          </div>
        </div>

        <h1 style={{ fontSize: "2.1rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: "0.5rem", lineHeight: 1.2 }}>
          Open Benchmark Datasets &amp; Engineering Matrices
        </h1>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "920px", lineHeight: 1.55, margin: 0 }}>
          Deterministic tabular benchmark datasets, numerical simulation matrices, and empirical building physics records published by HVACLogic. All datasets are freely downloadable in standard CSV/JSON formats, licensed under Creative Commons CC BY 4.0, and indexed with persistent DataCite DOIs for academic research, university coursework, and CFD/BEM model validation.
        </p>
      </header>

      {/* Dataset Grid */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
          gap: "1.5rem",
          marginBottom: "3.5rem",
        }}
      >
        {BENCHMARK_DATASETS.map((ds) => (
          <article
            key={ds.slug}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderTop: "3px solid #10b981",
              borderRadius: "0.65rem",
              padding: "1.35rem",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.45rem", marginBottom: "0.75rem" }}>
                <span
                  style={{
                    background: "rgba(16, 185, 129, 0.1)",
                    color: "#10b981",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.5rem",
                    borderRadius: "4px",
                  }}
                >
                  {ds.format}
                </span>

                <span
                  style={{
                    background: "var(--bg-secondary)",
                    color: "var(--ink)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    padding: "0.15rem 0.5rem",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color)",
                    fontFamily: "var(--font-mono, monospace)",
                  }}
                >
                  {ds.recordCount} Records
                </span>

                {ds.primaryDoi && (
                  <span
                    style={{
                      background: "rgba(167, 139, 250, 0.1)",
                      color: "#a78bfa",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      marginLeft: "auto",
                      fontFamily: "var(--font-mono, monospace)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "140px",
                    }}
                    title={`DOI: ${ds.primaryDoi}`}
                  >
                    DOI: {ds.primaryDoi}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.35,
                }}
              >
                <Link
                  href={`/datasets/${ds.slug}`}
                  style={{ color: "var(--ink)", textDecoration: "none" }}
                >
                  {ds.title}
                </Link>
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.86rem",
                  color: "var(--ink-secondary)",
                  lineHeight: 1.5,
                  marginBottom: "1rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {ds.description}
              </p>

              {/* Governing Standards */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.25rem" }}>
                {ds.governingStandards.slice(0, 2).map((std) => (
                  <span
                    key={std}
                    style={{
                      fontSize: "0.68rem",
                      padding: "0.15rem 0.45rem",
                      borderRadius: "4px",
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-muted)",
                      whiteSpace: "nowrap",
                    }}
                    title={std}
                  >
                    🏛️ {std.replace(/\s*\([^)]*\)/g, "")}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.5rem",
                paddingTop: "0.85rem",
                borderTop: "1px solid var(--border-color)",
              }}
            >
              <Link
                href={`/datasets/${ds.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  background: "#10b981",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  padding: "0.38rem 0.85rem",
                  borderRadius: "0.375rem",
                  textDecoration: "none",
                  boxShadow: "0 1px 2px rgba(16, 185, 129, 0.25)",
                }}
              >
                Explore Dataset →
              </Link>

              <a
                href={`/datasets/${ds.filename}`}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  background: "transparent",
                  color: "var(--ink)",
                  border: "1px solid var(--border-color)",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  padding: "0.38rem 0.75rem",
                  borderRadius: "0.375rem",
                  textDecoration: "none",
                }}
                title={`Download ${ds.filename}`}
              >
                <span>📥</span>
                <span>CSV</span>
              </a>

              {ds.repositories.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "var(--bg-secondary)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-color)",
                    fontWeight: 600,
                    fontSize: "0.74rem",
                    padding: "0.38rem 0.55rem",
                    borderRadius: "0.375rem",
                    textDecoration: "none",
                  }}
                  title={`View on ${repo.name}`}
                >
                  <span>{repo.platform === "figshare" ? "📊" : "🤗"}</span>
                  <span>{repo.platform === "figshare" ? "Figshare" : "Hugging Face"} ↗</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Curriculum & Academic Use Section */}
      <section
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "0.75rem",
          padding: "2rem",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          🎓 Open Scientific Data &amp; Computational Replication Policy
        </h2>
        <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
          All HVACLogic benchmark matrices are engineered to support reproducible building physics calculations, HVAC equipment sizing audits, and engineering education:
        </p>
        <ul style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.7, paddingLeft: "1.25rem", margin: 0 }}>
          <li><strong>Zero Paywalls or Tracking:</strong> Direct HTTPS download links for all raw CSV/JSON matrices without login gates or analytical tracking.</li>
          <li><strong>Persistent DOIs:</strong> Primary datasets are archived on DataCite repositories (Figshare, Hugging Face) for persistent academic citations in thesis work and research papers.</li>
          <li><strong>Companion Tools:</strong> Every dataset links directly to its interactive client-side calculator and research methodology whitepaper.</li>
        </ul>
      </section>
    </div>
  );
}
