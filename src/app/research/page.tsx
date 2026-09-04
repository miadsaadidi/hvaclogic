import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { RESEARCH_PAPERS } from "@/lib/data/research-papers";

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
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: "1.75rem", marginBottom: "4rem" }}>
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
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
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
            </div>
          </article>
        ))}
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
