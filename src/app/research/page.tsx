import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { RESEARCH_PAPERS } from "@/lib/data/research-papers";

export const metadata: Metadata = {
  title: "Engineering Research & Technical Whitepapers",
  description:
    "Open-access technical monographs, mathematical modeling frameworks, and building science preprints covering heat pump thermodynamics, air distribution, psychrometrics, and low-GWP refrigerants.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/research`,
  },
  openGraph: {
    title: "Engineering Research & Technical Whitepapers — HVACLogic",
    description:
      "Open-access technical monographs, mathematical modeling frameworks, and building science preprints published by the HVACLogic Research Working Group.",
    url: `${siteConfig.canonicalDomain}/research`,
    siteName: "HVACLogic",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVACLogic Engineering Research & Technical Whitepapers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Research & Technical Whitepapers — HVACLogic",
    description:
      "Open-access technical monographs, mathematical modeling frameworks, and building science preprints published by the HVACLogic Research Working Group.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

// Helpers for compact display
const formatStandard = (std: string) => {
  return std.replace(/\s*\([^)]*\)/g, "").trim();
};

const getRepoShortLabel = (repo: { platform: string; label?: string }) => {
  switch (repo.platform) {
    case "figshare":
      return "Figshare";
    case "ssrn":
      return "SSRN";
    case "academia":
      return "Academia";
    case "huggingface":
      return "Hugging Face";
    case "archive":
      return "Archive";
    case "dataverse":
      return "Dataverse";
    default:
      return repo.label || "Repository";
  }
};

export default function ResearchHubPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.canonicalDomain}/research#collection`,
        name: "Engineering Research & Technical Whitepapers",
        description:
          "Open-access technical monographs, mathematical modeling frameworks, and building science preprints covering heat pump thermodynamics, air distribution, psychrometrics, and low-GWP refrigerants.",
        url: `${siteConfig.canonicalDomain}/research`,
        publisher: {
          "@type": "Organization",
          name: "HVACLogic",
          url: siteConfig.canonicalDomain,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.canonicalDomain}/research#itemlist`,
        name: "HVACLogic Research Publications",
        numberOfItems: RESEARCH_PAPERS.length,
        itemListElement: RESEARCH_PAPERS.map((paper, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "ScholarlyArticle",
            name: paper.title,
            headline: paper.title,
            description: paper.abstract,
            url: `${siteConfig.canonicalDomain}/research/${paper.slug}`,
            datePublished: paper.publicationDate,
            ...(paper.doi ? { identifier: paper.doi, sameAs: `https://doi.org/${paper.doi}` } : {}),
            author: paper.authors.map((author) => ({
              "@type": "Person",
              name: author,
            })),
            publisher: {
              "@type": "Organization",
              name: "HVACLogic Open-Access Building Science Monograph Series",
              url: siteConfig.canonicalDomain,
            },
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteConfig.canonicalDomain}/research#breadcrumbs`,
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
            name: "Research & Whitepapers",
            item: `${siteConfig.canonicalDomain}/research`,
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

      <div className="site-container page" style={{ padding: "2.5rem 1.5rem", maxWidth: "1320px", margin: "0 auto" }}>
        {/* Breadcrumb Header */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <li>
              <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
            </li>
            <li>/</li>
            <li style={{ color: "var(--ink)", fontWeight: 600 }} aria-current="page">Research &amp; Whitepapers</li>
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
                background: "rgba(56, 189, 248, 0.1)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                color: "var(--accent-cooling)",
                fontSize: "0.74rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <span>🎓</span>
              <span>Technical Monographs &amp; Preprints</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid rgba(16, 185, 129, 0.25)",
                color: "var(--accent-success)",
                fontSize: "0.74rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <span>🛡️</span>
              <span>Open-Access Research</span>
            </div>
          </div>
          <h1 style={{ fontSize: "2.1rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: "0.5rem", lineHeight: 1.2 }}>
            Engineering Research &amp; Technical Whitepapers
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: "900px", lineHeight: 1.55, margin: 0 }}>
            Technical reports, mathematical modeling frameworks, and building science preprints published by the HVACLogic Research Working Group. Selected publications and datasets are available through persistent DOI records, academic repositories, and open benchmarks for academic reference, technical education, and engineering study.
          </p>
        </header>

        {/* Whitepapers List - 3-Column Responsive Grid */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 350px), 1fr))",
            gap: "1.25rem",
            marginBottom: "3.5rem",
          }}
        >
          {RESEARCH_PAPERS.map((paper) => (
            <article
              key={paper.slug}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "3px solid var(--accent-cooling)",
                borderRadius: "0.65rem",
                padding: "1.25rem 1.25rem",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div>
                {/* Metadata Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.4rem", marginBottom: "0.65rem" }}>
                  <span
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--accent-cooling)",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.45rem",
                      borderRadius: "4px",
                      border: "1px solid var(--border-color)",
                      fontFamily: "var(--font-mono, monospace)",
                    }}
                  >
                    {paper.reportNumber}
                  </span>
                  {paper.doi && (
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "rgba(167, 139, 250, 0.1)",
                        color: "#a78bfa",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "0.15rem 0.45rem",
                        borderRadius: "4px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "160px",
                        textDecoration: "none",
                      }}
                      title={`Open Persistent DOI: https://doi.org/${paper.doi}`}
                    >
                      DOI: {paper.doi} ↗
                    </a>
                  )}
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginLeft: "auto" }}>
                    {paper.publicationDate}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontSize: "1.08rem",
                    fontWeight: 700,
                    color: "var(--ink)",
                    marginBottom: "0.45rem",
                    lineHeight: 1.35,
                    minHeight: "2.7rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  <Link
                    href={`/research/${paper.slug}`}
                    style={{ color: "var(--ink)", textDecoration: "none", transition: "color 0.15s ease" }}
                    title={paper.title}
                  >
                    {paper.title}
                  </Link>
                </h2>

                {/* Abstract - Clamped to 3 lines */}
                <p
                  style={{
                    fontSize: "0.84rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.45,
                    marginBottom: "0.85rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.65rem",
                  }}
                >
                  {paper.abstract}
                </p>

                {/* Referenced Standards - Compact Badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "1rem" }}>
                  {paper.governingStandards.map((std) => (
                    <span
                      key={std}
                      style={{
                        fontSize: "0.67rem",
                        padding: "0.15rem 0.4rem",
                        borderRadius: "4px",
                        background: "var(--bg-primary)",
                        border: "1px solid var(--border-color)",
                        color: "var(--text-muted)",
                        whiteSpace: "nowrap",
                      }}
                      title={`Referenced standard/source: ${std}`}
                    >
                      🏛️ {formatStandard(std)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links - Micro Buttons */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "0.4rem",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid var(--border-color)",
                }}
              >
                <Link
                  href={`/research/${paper.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    background: "#0284c7",
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.76rem",
                    padding: "0.32rem 0.75rem",
                    borderRadius: "0.375rem",
                    textDecoration: "none",
                    boxShadow: "0 1px 2px rgba(2, 132, 199, 0.25)",
                  }}
                >
                  Read →
                </Link>

                {paper.pdfUrl && (
                  <a
                    href={paper.pdfUrl}
                    download
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background: "rgba(239, 68, 68, 0.08)",
                      color: "#ef4444",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      fontWeight: 700,
                      fontSize: "0.76rem",
                      padding: "0.32rem 0.65rem",
                      borderRadius: "0.375rem",
                      textDecoration: "none",
                    }}
                    title="Download PDF"
                  >
                    <span>📥</span>
                    <span>PDF</span>
                  </a>
                )}

                {paper.repositories?.map((repo) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      background:
                        repo.platform === "academia"
                          ? "rgba(185, 28, 28, 0.08)"
                          : repo.platform === "figshare"
                          ? "rgba(14, 165, 233, 0.08)"
                          : repo.platform === "huggingface"
                          ? "rgba(234, 179, 8, 0.1)"
                          : repo.platform === "archive"
                          ? "rgba(100, 116, 139, 0.1)"
                          : repo.platform === "ssrn"
                          ? "rgba(234, 88, 12, 0.08)"
                          : "rgba(168, 85, 247, 0.08)",
                      color:
                        repo.platform === "academia"
                          ? "var(--accent-danger, #ef4444)"
                          : repo.platform === "figshare"
                          ? "var(--accent-cooling, #00d2ff)"
                          : repo.platform === "huggingface"
                          ? "#f59e0b"
                          : repo.platform === "archive"
                          ? "#94a3b8"
                          : repo.platform === "ssrn"
                          ? "#ea580c"
                          : "#a78bfa",
                      border: `1px solid ${
                        repo.platform === "academia"
                          ? "rgba(239, 68, 68, 0.25)"
                          : repo.platform === "figshare"
                          ? "rgba(0, 210, 255, 0.25)"
                          : repo.platform === "huggingface"
                          ? "rgba(245, 158, 11, 0.3)"
                          : repo.platform === "archive"
                          ? "rgba(148, 163, 184, 0.3)"
                          : repo.platform === "ssrn"
                          ? "rgba(234, 88, 12, 0.3)"
                          : "rgba(167, 139, 250, 0.25)"
                      }`,
                      fontWeight: 600,
                      fontSize: "0.74rem",
                      padding: "0.32rem 0.55rem",
                      borderRadius: "0.375rem",
                      textDecoration: "none",
                    }}
                  >
                    <span>{repo.platform === "academia" ? "🎓" : repo.platform === "figshare" ? "📊" : repo.platform === "huggingface" ? "🤗" : repo.platform === "archive" ? "🏛️" : repo.platform === "ssrn" ? "📑" : "🌐"}</span>
                    <span>{getRepoShortLabel(repo)}</span>
                    <span style={{ fontSize: "0.68rem", opacity: 0.8 }}>↗</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>

        {/* Open Benchmark Datasets Directory Cross-Link Banner */}
        <section
          style={{
            marginBottom: "3rem",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(56, 189, 248, 0.08) 100%)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "0.85rem",
            padding: "1.75rem 2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          <div style={{ maxWidth: "750px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.3rem" }}>📊</span>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--ink)", margin: 0 }}>
                Open Benchmark Datasets &amp; Replication Repositories
              </h2>
            </div>
            <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
              Looking for empirical tabular matrices, building science simulation points, and persistent DataCite DOIs across Figshare and Harvard Dataverse? Access our dedicated Open Datasets catalog.
            </p>
          </div>
          <div>
            <Link
              href="/datasets"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#10b981",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                padding: "0.65rem 1.25rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.25)",
              }}
            >
              <span>Browse All Datasets →</span>
            </Link>
          </div>
        </section>

        {/* Curriculum & Academic Integration */}
        <section
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.75rem",
            padding: "2rem",
            marginTop: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
            🎓 Open Educational Resources (OER) &amp; Academic References
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
            HVACLogic research preprints, technical monographs, and computational models are available as open resources for engineering students, educators, apprenticeship programs, and industry researchers:
          </p>
          <ul style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.7, paddingLeft: "1.25rem", margin: 0 }}>
            <li><strong>Open Access Modeling:</strong> Mathematical equations, source algorithms, and benchmark datasets are accessible without registration barriers.</li>
            <li><strong>Persistent Identifiers &amp; Archiving:</strong> Technical reports and datasets with assigned DOIs are registered across persistent repositories.</li>
            <li><strong>Interactive Companion Calculators:</strong> Technical monographs link to live calculation tools for equation exploration and laboratory analysis.</li>
          </ul>
        </section>
      </div>
    </>
  );
}
