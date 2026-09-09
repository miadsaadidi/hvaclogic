import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { RESEARCH_PAPERS, RESEARCH_DATASETS } from "@/lib/data/research-papers";

export const metadata: Metadata = {
  title: "Research & Technical Whitepapers",
  description: "Open-access technical whitepapers and mathematical frameworks for building science, heat pump thermodynamics, duct aerodynamics, and ventilation mass balance.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/research`,
  },
  openGraph: {
    title: "Research & Technical Whitepapers",
    description: "Open-access technical whitepapers and mathematical frameworks for building science, heat pump thermodynamics, duct aerodynamics, and ventilation mass balance.",
    url: `${siteConfig.canonicalDomain}/research`,
    siteName: "HVACLogic",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVACLogic Research & Technical Whitepapers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research & Technical Whitepapers",
    description: "Open-access technical whitepapers and mathematical frameworks for building science, heat pump thermodynamics, duct aerodynamics, and ventilation mass balance.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function ResearchHubPage() {
  return (
    <div className="site-container page" style={{ padding: "2.5rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
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
      <header style={{ marginBottom: "3rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              background: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              color: "var(--accent-cooling)",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <span>🎓</span>
            <span>Academic Preprints &amp; Open Educational Resources (OER)</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              color: "var(--accent-success)",
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <span>🛡️</span>
            <span>CC BY 4.0 Open Access</span>
          </div>
        </div>
        <h1 style={{ fontSize: "2.35rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: "0.75rem", lineHeight: 1.2 }}>
          Engineering Research &amp; Technical Whitepapers
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "850px", lineHeight: 1.6, margin: 0 }}>
          Peer-referenced technical reports, mathematical modeling frameworks, and building science preprints published by the HVACLogic Open Engineering Research Group. All papers are open-access under Creative Commons CC BY 4.0 and indexed with citable DOIs for academic courseware, engineering syllabus adoption, and vocational training.
        </p>
      </header>

      {/* Whitepapers List - 2 Column Grid */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: "1.75rem", marginBottom: "4rem" }}>
        {RESEARCH_PAPERS.map((paper) => (
          <article
            key={paper.slug}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderTop: "4px solid var(--accent-cooling)",
              borderRadius: "0.75rem",
              padding: "1.75rem 2rem",
              boxShadow: "var(--shadow-sm)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div>
              {/* Metadata Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem" }}>
                <span
                  style={{
                    background: "var(--bg-secondary)",
                    color: "var(--accent-cooling)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.55rem",
                    borderRadius: "4px",
                    border: "1px solid var(--border-color)",
                    fontFamily: "var(--font-mono, monospace)",
                  }}
                >
                  {paper.reportNumber}
                </span>
                {paper.doi && (
                  <span
                    style={{
                      background: "rgba(167, 139, 250, 0.1)",
                      color: "#a78bfa",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "0.2rem 0.55rem",
                      borderRadius: "4px",
                    }}
                  >
                    DOI: {paper.doi}
                  </span>
                )}
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginLeft: "auto" }}>
                  {paper.publicationDate}
                </span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.65rem", lineHeight: 1.35 }}>
                <Link
                  href={`/research/${paper.slug}`}
                  style={{ color: "var(--ink)", textDecoration: "none", transition: "color 0.15s ease" }}
                >
                  {paper.title}
                </Link>
              </h2>

              {/* Abstract */}
              <p style={{ fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                {paper.abstract}
              </p>

              {/* Standards Enforced */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                {paper.governingStandards.map((std) => (
                  <span
                    key={std}
                    style={{
                      fontSize: "0.72rem",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      background: "var(--bg-primary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-muted)",
                    }}
                  >
                    🏛️ {std}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
              <Link
                href={`/research/${paper.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "#0284c7",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  padding: "0.55rem 1.15rem",
                  borderRadius: "0.45rem",
                  textDecoration: "none",
                  boxShadow: "0 2px 4px rgba(2, 132, 199, 0.3)",
                }}
              >
                Read Paper Online →
              </Link>

              <a
                href={paper.pdfUrl}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "transparent",
                  color: "var(--ink)",
                  border: "1px solid var(--border-color)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  padding: "0.55rem 1.15rem",
                  borderRadius: "0.45rem",
                  textDecoration: "none",
                }}
              >
                <span>📄</span>
                <span>Download PDF</span>
              </a>

              {paper.repositories?.map((repo) => (
                <a
                  key={repo.url}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    background:
                      repo.platform === "academia"
                        ? "rgba(185, 28, 28, 0.08)"
                        : repo.platform === "figshare"
                        ? "rgba(14, 165, 233, 0.08)"
                        : "rgba(168, 85, 247, 0.08)",
                    color:
                      repo.platform === "academia"
                        ? "var(--accent-danger, #ef4444)"
                        : repo.platform === "figshare"
                        ? "var(--accent-cooling, #00d2ff)"
                        : "#a78bfa",
                    border: `1px solid ${
                      repo.platform === "academia"
                        ? "rgba(239, 68, 68, 0.25)"
                        : repo.platform === "figshare"
                        ? "rgba(0, 210, 255, 0.25)"
                        : "rgba(167, 139, 250, 0.25)"
                    }`,
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    padding: "0.55rem 0.95rem",
                    borderRadius: "0.45rem",
                    textDecoration: "none",
                  }}
                >
                  <span>{repo.platform === "academia" ? "🎓" : repo.platform === "figshare" ? "📊" : "🌐"}</span>
                  <span>{repo.label || (repo.platform === "academia" ? "Academia.edu" : repo.platform === "figshare" ? "View Dataset" : "Harvard Dataverse")}</span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>↗</span>
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* Open Benchmark Datasets & Replication Repositories */}
      <section style={{ marginBottom: "3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
          <span style={{ fontSize: "1.25rem" }}>📊</span>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.01em", margin: 0 }}>
            Open Benchmark Datasets &amp; Replication Repositories
          </h2>
        </div>
        <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: "800px", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          Verified empirical tabular datasets and replication packages registered with persistent DataCite DOIs across Harvard Dataverse and Figshare. Freely accessible for university courseware, computational fluid dynamics (CFD) benchmarking, and building energy modeling.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "1.5rem" }}>
          {RESEARCH_DATASETS.map((ds) => (
            <div
              key={ds.slug}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "4px solid #10b981",
                borderRadius: "0.75rem",
                padding: "1.5rem 1.75rem",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      background: "rgba(16, 185, 129, 0.1)",
                      color: "#10b981",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    {ds.repository}
                  </span>
                  <span
                    style={{
                      background: "var(--bg-secondary)",
                      color: "var(--ink-secondary)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      border: "1px solid var(--border-color)",
                      fontFamily: "var(--font-mono, monospace)",
                    }}
                  >
                    DOI: {ds.doi}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "auto" }}>
                    {ds.recordCount} Records &bull; {ds.format}
                  </span>
                </div>

                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.45rem", lineHeight: 1.35 }}>
                  {ds.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "0.85rem" }}>
                  {ds.subtitle}
                </p>
                <p style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.55, marginBottom: "1.25rem" }}>
                  {ds.description}
                </p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", paddingTop: "0.85rem", borderTop: "1px solid var(--border-color)" }}>
                {ds.repositoryUrl && (
                  <a
                    href={ds.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      background: "#10b981",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                      padding: "0.45rem 1rem",
                      borderRadius: "0.4rem",
                      textDecoration: "none",
                    }}
                  >
                    <span>View Repository on {ds.repository} →</span>
                  </a>
                )}
                {ds.downloadUrl ? (
                  <a
                    href={ds.downloadUrl}
                    download
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      background: "transparent",
                      color: "var(--ink)",
                      border: "1px solid var(--border-color)",
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      padding: "0.45rem 1rem",
                      borderRadius: "0.4rem",
                      textDecoration: "none",
                    }}
                  >
                    <span>📥 Download {ds.format}</span>
                  </a>
                ) : !ds.repositoryUrl && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      color: "var(--text-muted)",
                      fontSize: "0.8rem",
                      fontStyle: "italic",
                    }}
                  >
                    🏛️ Accession deposit registered • Public accession pending on {ds.repository}
                  </span>
                )}
              </div>
            </div>
          ))}
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
          🎓 Academic &amp; Vocational Curriculum Integration (OER)
        </h2>
        <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1rem" }}>
          HVACLogic research preprints and deterministic computational engines are engineered for direct adoption into university mechanical engineering syllabi (ABET accredited), trade school apprenticeship programs (UA, RSES, NATE, HVAC Excellence), and peer research:
        </p>
        <ul style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.7, paddingLeft: "1.25rem", margin: 0 }}>
          <li><strong>Zero Student Logins or Paywalls:</strong> All mathematical models, source algorithms, and research datasets are 100% client-side with zero student registration gates.</li>
          <li><strong>Permanent DOI &amp; Preprint Archiving:</strong> Technical reports are mirrored across institutional repositories with citable Digital Object Identifiers.</li>
          <li><strong>Interactive Syllabus Companion:</strong> Every technical report links directly to its live companion calculation engine for homework validation and laboratory simulations.</li>
        </ul>
      </section>
    </div>
  );
}
