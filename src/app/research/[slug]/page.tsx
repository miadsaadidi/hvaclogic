import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getResearchPaperBySlug, getAllResearchPaperSlugs } from "@/lib/data/research-papers";
import { CodeFormulaBlock } from "@/components/seo/CodeFormulaBlock";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllResearchPaperSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = getResearchPaperBySlug(slug);

  if (!paper) {
    return { title: "Paper Not Found | HVACLogic" };
  }

  const canonicalUrl = `${siteConfig.canonicalDomain}/research/${paper.slug}`;
  const pdfFullUrl = `${siteConfig.canonicalDomain}${paper.pdfUrl}`;

  const metaTitle = paper.seoTitle || paper.title;
  const metaDescription = paper.seoDescription || paper.abstract;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      siteName: "HVACLogic",
      type: "article",
      publishedTime: paper.publicationDate,
      authors: paper.authors,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
    },
    // Highwire Press metadata for Google Scholar and Semantic Scholar indexing
    other: {
      citation_title: paper.title,
      citation_author: paper.authors.join("; "),
      citation_publication_date: paper.publicationDate.replace(/-/g, "/"),
      citation_pdf_url: pdfFullUrl,
      citation_doi: paper.doi,
      citation_technical_report_number: paper.reportNumber,
      citation_publisher: "HVACLogic Open-Access Building Science Monograph Series",
    },
  };
}

export default async function ResearchPaperPage({ params }: PageProps) {
  const { slug } = await params;
  const paper = getResearchPaperBySlug(slug);

  if (!paper) {
    notFound();
  }

  return (
    <div className="site-container page" style={{ padding: "2.5rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <li>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/research" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Research</Link>
          </li>
          <li>/</li>
          <li style={{ color: "var(--ink)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "350px" }} aria-current="page">
            {paper.reportNumber}
          </li>
        </ol>
      </nav>

      {/* Paper Header */}
      <header style={{ marginBottom: "2.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "2rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <span
            style={{
              background: "var(--bg-secondary)",
              color: "var(--accent-cooling)",
              fontSize: "0.78rem",
              fontWeight: 700,
              padding: "0.25rem 0.65rem",
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
              fontSize: "0.78rem",
              fontWeight: 600,
              padding: "0.25rem 0.65rem",
              borderRadius: "4px",
            }}
          >
            DOI: {paper.doi}
          </span>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Published: {paper.publicationDate}
          </span>
        </div>

        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: "0.85rem", lineHeight: 1.25 }}>
          {paper.title}
        </h1>

        <p style={{ fontSize: "1.05rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          {paper.subtitle}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
            By <strong style={{ color: "var(--ink)" }}>{paper.authors.join(" • ")}</strong>
          </div>

          <a
            href={paper.pdfUrl}
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              background: "#0284c7",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.88rem",
              padding: "0.6rem 1.25rem",
              borderRadius: "0.45rem",
              textDecoration: "none",
              boxShadow: "0 2px 4px rgba(2, 132, 199, 0.3)",
            }}
          >
            <span>📄</span>
            <span>Download Official PDF Whitepaper</span>
          </a>
        </div>
      </header>

      {/* Abstract Section */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Abstract
        </h2>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.65rem",
            padding: "1.5rem",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            color: "var(--ink-secondary)",
          }}
        >
          {paper.abstract}
        </div>
      </section>

      {/* Key Findings Section */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Key Technical Findings &amp; Code Impacts
        </h2>
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.65rem",
            padding: "1.5rem",
          }}
        >
          <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.93rem", lineHeight: 1.65, color: "var(--ink)" }}>
            {paper.keyFindings.map((finding, idx) => (
              <li key={idx}>
                {finding}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Governing Standards Section */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Governing Industry Standards &amp; Codes
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.75rem" }}>
          {paper.governingStandards.map((std) => (
            <div
              key={std}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderRadius: "0.5rem",
                padding: "0.85rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "var(--ink)",
              }}
            >
              <span>🏛️</span>
              <span>{std}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Mathematical Formulations Section */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          Mathematical Formulations &amp; Governing Equations
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {paper.formulas.map((f, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderRadius: "0.65rem",
                padding: "1.5rem",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.6rem" }}>
                {f.title}
              </h3>
              <CodeFormulaBlock
                formula={f.latex}
                title={`governing_model_eq_${idx + 1}.math`}
                badge="PEER-REFERENCED"
              />
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "0.75rem", marginBottom: 0, lineHeight: 1.5 }}>
                💡 {f.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Companion Calculation Engines */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>
          Companion Calculation Engines &amp; Simulation Models
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {paper.companionCalculators.map((c) => (
            <div
              key={c.route}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "3px solid var(--accent-cooling)",
                borderRadius: "0.65rem",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.4rem" }}>
                  {c.name}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {c.description}
                </p>
              </div>
              <Link
                href={c.route}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: "var(--accent-cooling)",
                  textDecoration: "none",
                }}
              >
                Launch Live Simulator →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Citations Section */}
      <section
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "0.75rem",
          padding: "1.75rem",
        }}
      >
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Academic Citations &amp; BibTeX
        </h2>
        <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
          To cite this technical report in university coursework, dissertations, or engineering research:
        </p>

        <div style={{ marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
            APA Format:
          </h3>
          <pre
            style={{
              margin: 0,
              padding: "0.85rem 1rem",
              borderRadius: "0.45rem",
              background: "var(--bg-primary)",
              color: "var(--ink)",
              fontSize: "0.82rem",
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
              border: "1px solid var(--border-color)",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            {paper.apa}
          </pre>
        </div>

        <div>
          <h3 style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
            BibTeX Entry:
          </h3>
          <pre
            style={{
              margin: 0,
              padding: "0.85rem 1rem",
              borderRadius: "0.45rem",
              background: "var(--bg-primary)",
              color: "#38bdf8",
              fontSize: "0.82rem",
              lineHeight: 1.5,
              whiteSpace: "pre-wrap",
              border: "1px solid var(--border-color)",
              fontFamily: "var(--font-mono, monospace)",
              overflowX: "auto",
            }}
          >
            {paper.bibtex}
          </pre>
        </div>
      </section>
    </div>
  );
}
