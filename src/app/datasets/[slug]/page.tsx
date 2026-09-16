import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import {
  BENCHMARK_DATASETS,
  getDatasetBySlug,
  getAllDatasetSlugs,
} from "@/lib/data/datasets";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllDatasetSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dataset = getDatasetBySlug(slug);

  if (!dataset) {
    return {
      title: "Dataset Not Found",
    };
  }

  const canonicalUrl = `${siteConfig.canonicalDomain}/datasets/${dataset.slug}`;

  return {
    title: `${dataset.seoTitle} | HVACLogic Open Data`,
    description: dataset.seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${dataset.title} | HVACLogic`,
      description: dataset.description,
      url: canonicalUrl,
      siteName: "HVACLogic",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: `${siteConfig.canonicalDomain}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: dataset.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dataset.title} | HVACLogic`,
      description: dataset.description,
      images: [`${siteConfig.canonicalDomain}/opengraph-image`],
    },
  };
}

export default async function DatasetDetailPage({ params }: Props) {
  const { slug } = await params;
  const dataset = getDatasetBySlug(slug);

  if (!dataset) {
    notFound();
  }

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "@id": `${siteConfig.canonicalDomain}/datasets/${dataset.slug}#dataset`,
    "name": dataset.title,
    "alternateName": dataset.subtitle,
    "description": dataset.description,
    "url": `${siteConfig.canonicalDomain}/datasets/${dataset.slug}`,
    ...(dataset.primaryDoi
      ? {
          "identifier": [
            `https://doi.org/${dataset.primaryDoi}`,
            dataset.primaryDoi,
          ],
          "sameAs": `https://doi.org/${dataset.primaryDoi}`,
        }
      : {
          "identifier": `${siteConfig.canonicalDomain}/datasets/${dataset.slug}`,
        }),
    "license": dataset.license,
    "datePublished": dataset.publicationDate,
    "dateModified": dataset.lastUpdated,
    "creator": {
      "@type": "Organization",
      "@id": `${siteConfig.canonicalDomain}/#organization`,
      "name": "HVACLogic Open Engineering Research Group",
      "url": siteConfig.canonicalDomain,
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${siteConfig.canonicalDomain}/#organization`,
      "name": "HVACLogic",
      "url": siteConfig.canonicalDomain,
    },
    "distribution": [
      {
        "@type": "DataDownload",
        "name": `${dataset.title} (CSV)`,
        "encodingFormat": "text/csv",
        "contentUrl": `${siteConfig.canonicalDomain}/datasets/${dataset.filename}`,
      },
      ...(dataset.jsonFilename
        ? [
            {
              "@type": "DataDownload",
              "name": `${dataset.title} (JSON)`,
              "encodingFormat": "application/json",
              "contentUrl": `${siteConfig.canonicalDomain}/datasets/${dataset.jsonFilename}`,
            },
          ]
        : []),
    ],
    "variableMeasured": dataset.variables.map((v) => ({
      "@type": "PropertyValue",
      "name": v.name,
      "description": v.description,
      ...(v.unit ? { "unitText": v.unit } : {}),
    })),
    "keywords": [
      "HVAC",
      "Building Science",
      "Engineering Benchmark Dataset",
      "Thermodynamics",
      dataset.title,
    ],
    ...(dataset.primaryDoi
      ? { "citation": `https://doi.org/${dataset.primaryDoi}` }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.canonicalDomain}/datasets/${dataset.slug}#breadcrumb`,
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
      {
        "@type": "ListItem",
        "position": 3,
        "name": dataset.title,
        "item": `${siteConfig.canonicalDomain}/datasets/${dataset.slug}`,
      },
    ],
  };

  const bibtexCitation = `@dataset{hvaclogic_${dataset.slug.replace(/-/g, "_")},
  author = {{HVACLogic Open Engineering Research Group}},
  title = {${dataset.title}},
  year = {${dataset.publicationDate.split("-")[0]}},
  publisher = {HVACLogic Open Science},
  url = {${siteConfig.canonicalDomain}/datasets/${dataset.slug}}${dataset.primaryDoi ? `,\n  doi = {${dataset.primaryDoi}}` : ""}
}`;

  return (
    <div className="site-container page" style={{ padding: "2.5rem 1.5rem", maxWidth: "1120px", margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, fontSize: "0.85rem", color: "var(--text-muted)", flexWrap: "wrap" }}>
          <li>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/datasets" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Datasets</Link>
          </li>
          <li>/</li>
          <li style={{ color: "var(--ink)", fontWeight: 600 }} aria-current="page">
            {dataset.title}
          </li>
        </ol>
      </nav>

      {/* Hero Header */}
      <header
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderTop: "4px solid #10b981",
          borderRadius: "0.75rem",
          padding: "2rem",
          marginBottom: "2.5rem",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <span
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              color: "#10b981",
              fontSize: "0.74rem",
              fontWeight: 700,
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            📊 {dataset.format} Benchmark Dataset
          </span>

          <span
            style={{
              background: "var(--bg-secondary)",
              color: "var(--ink)",
              fontSize: "0.74rem",
              fontWeight: 600,
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              border: "1px solid var(--border-color)",
              fontFamily: "var(--font-mono, monospace)",
            }}
          >
            {dataset.recordCount} Verified Records
          </span>

          <span
            style={{
              background: "rgba(56, 189, 248, 0.1)",
              color: "var(--accent-cooling, #0284c7)",
              fontSize: "0.74rem",
              fontWeight: 600,
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              border: "1px solid rgba(56, 189, 248, 0.25)",
            }}
          >
            🛡️ {dataset.licenseName}
          </span>

          {dataset.primaryDoi && (
            <a
              href={`https://doi.org/${dataset.primaryDoi}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(167, 139, 250, 0.1)",
                color: "#a78bfa",
                fontSize: "0.74rem",
                fontWeight: 600,
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
                border: "1px solid rgba(167, 139, 250, 0.25)",
                textDecoration: "none",
                marginLeft: "auto",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              DOI: {dataset.primaryDoi} ↗
            </a>
          )}
        </div>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: "0.6rem", lineHeight: 1.25 }}>
          {dataset.title}
        </h1>

        <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          {dataset.description}
        </p>

        {/* Download & External Repository Actions */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
          <a
            href={`/datasets/${dataset.filename}`}
            download
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#10b981",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "0.88rem",
              padding: "0.55rem 1.2rem",
              borderRadius: "0.45rem",
              textDecoration: "none",
              boxShadow: "0 2px 4px rgba(16, 185, 129, 0.25)",
            }}
          >
            <span>📥</span>
            <span>Download CSV ({(dataset.fileSizeBytes / 1024).toFixed(1)} KB)</span>
          </a>

          {dataset.jsonFilename && (
            <a
              href={`/datasets/${dataset.jsonFilename}`}
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--border-color)",
                fontWeight: 600,
                fontSize: "0.88rem",
                padding: "0.55rem 1.1rem",
                borderRadius: "0.45rem",
                textDecoration: "none",
              }}
            >
              <span>📥</span>
              <span>Download JSON ({(dataset.jsonFileSizeBytes! / 1024).toFixed(1)} KB)</span>
            </a>
          )}

          {dataset.repositories.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                background: "var(--bg-secondary)",
                color: "var(--text-muted)",
                border: "1px solid var(--border-color)",
                fontWeight: 600,
                fontSize: "0.85rem",
                padding: "0.55rem 0.9rem",
                borderRadius: "0.45rem",
                textDecoration: "none",
              }}
            >
              <span>{repo.platform === "figshare" ? "📊" : "🤗"}</span>
              <span>View on {repo.name} ↗</span>
            </a>
          ))}
        </div>
      </header>

      {/* Main Content Sections */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}>
        
        {/* Section 1: Methodology & Calculation Basis */}
        <section
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.75rem",
            padding: "1.75rem",
          }}
        >
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
            🔬 Dataset Methodology &amp; Engineering Basis
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
            {dataset.methodology}
          </p>

          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
            Governing Engineering Standards &amp; Codes:
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {dataset.governingStandards.map((std) => (
              <span
                key={std}
                style={{
                  fontSize: "0.75rem",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "4px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-muted)",
                }}
              >
                🏛️ {std}
              </span>
            ))}
          </div>
        </section>

        {/* Section 2: Data Preview Table */}
        <section
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.75rem",
            padding: "1.75rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              📋 Tabular Data Preview (First 5 Rows)
            </h2>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}>
              Displaying 5 of {dataset.recordCount} rows
            </span>
          </div>

          <div style={{ overflowX: "auto", border: "1px solid var(--border-color)", borderRadius: "0.5rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                  {Object.keys(dataset.previewRows[0] || {}).map((col) => (
                    <th key={col} style={{ padding: "0.6rem 0.75rem", color: "var(--ink)", fontWeight: 700, whiteSpace: "nowrap" }}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.previewRows.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--border-color)", background: idx % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)" }}>
                    {Object.values(row).map((val, cidx) => (
                      <td key={cidx} style={{ padding: "0.55rem 0.75rem", color: "var(--ink-secondary)", whiteSpace: "nowrap", fontFamily: "var(--font-mono, monospace)" }}>
                        {typeof val === "boolean" ? (val ? "TRUE" : "FALSE") : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Data Dictionary / Variable Definitions */}
        <section
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.75rem",
            padding: "1.75rem",
          }}
        >
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
            📖 Data Dictionary &amp; Variable Definitions
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1.25rem" }}>
            Complete schema definition describing each column, engineering unit of measure, data type, and thermodynamic description:
          </p>

          <div style={{ overflowX: "auto", border: "1px solid var(--border-color)", borderRadius: "0.5rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.84rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-color)" }}>
                  <th style={{ padding: "0.65rem 0.85rem", color: "var(--ink)", fontWeight: 700 }}>Variable Name</th>
                  <th style={{ padding: "0.65rem 0.85rem", color: "var(--ink)", fontWeight: 700 }}>Data Type</th>
                  <th style={{ padding: "0.65rem 0.85rem", color: "var(--ink)", fontWeight: 700 }}>Unit</th>
                  <th style={{ padding: "0.65rem 0.85rem", color: "var(--ink)", fontWeight: 700 }}>Engineering Description</th>
                </tr>
              </thead>
              <tbody>
                {dataset.variables.map((v, idx) => (
                  <tr key={v.name} style={{ borderBottom: "1px solid var(--border-color)", background: idx % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)" }}>
                    <td style={{ padding: "0.6rem 0.85rem", color: "var(--ink)", fontWeight: 700, fontFamily: "var(--font-mono, monospace)" }}>
                      {v.name}
                    </td>
                    <td style={{ padding: "0.6rem 0.85rem", color: "var(--accent-cooling, #0284c7)", fontFamily: "var(--font-mono, monospace)" }}>
                      {v.type}
                    </td>
                    <td style={{ padding: "0.6rem 0.85rem", color: "var(--text-muted)", fontFamily: "var(--font-mono, monospace)" }}>
                      {v.unit || "—"}
                    </td>
                    <td style={{ padding: "0.6rem 0.85rem", color: "var(--ink-secondary)", lineHeight: 1.45 }}>
                      {v.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Companion Calculators & Research Links */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.25rem" }}>
          
          {/* Companion Calculators */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderTop: "3px solid var(--accent-cooling, #0284c7)",
              borderRadius: "0.75rem",
              padding: "1.5rem",
            }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              🧮 Interactive Companion Calculators
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.5 }}>
              Test and explore these mathematical models dynamically in our client-side calculators:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {dataset.companionCalculators.map((calc) => (
                <div key={calc.url} style={{ padding: "0.75rem", background: "var(--bg-secondary)", borderRadius: "0.5rem", border: "1px solid var(--border-color)" }}>
                  <Link href={calc.url} style={{ color: "var(--accent-cooling, #0284c7)", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                    {calc.name} →
                  </Link>
                  {calc.description && (
                    <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", margin: "0.3rem 0 0 0", lineHeight: 1.4 }}>
                      {calc.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Companion Research Papers */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderTop: "3px solid #a78bfa",
              borderRadius: "0.75rem",
              padding: "1.5rem",
            }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              🎓 Companion Research Whitepapers
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.5 }}>
              Read the full mathematical derivations and thermodynamic proofs:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {dataset.companionResearch.map((paper) => (
                <div key={paper.url} style={{ padding: "0.75rem", background: "var(--bg-secondary)", borderRadius: "0.5rem", border: "1px solid var(--border-color)" }}>
                  <Link href={paper.url} style={{ color: "#a78bfa", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
                    {paper.name} →
                  </Link>
                  {paper.description && (
                    <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", margin: "0.3rem 0 0 0", lineHeight: 1.4 }}>
                      {paper.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Academic Citation & BibTeX */}
        <section
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.75rem",
            padding: "1.75rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
            📚 Academic Citation &amp; Replication
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: "1rem" }}>
            When referencing this benchmark dataset in academic publications, university course syllabi, or engineering technical reports, please cite as follows:
          </p>

          <div
            style={{
              padding: "1rem",
              background: "var(--bg-secondary)",
              borderRadius: "0.5rem",
              border: "1px solid var(--border-color)",
              marginBottom: "1rem",
              fontSize: "0.85rem",
              color: "var(--ink)",
              lineHeight: 1.55,
            }}
          >
            HVACLogic Open Engineering Research Group. ({dataset.publicationDate.split("-")[0]}). <em>{dataset.title}</em> [Data set]. HVACLogic Open Science. {dataset.primaryDoi ? `https://doi.org/${dataset.primaryDoi}` : `${siteConfig.canonicalDomain}/datasets/${dataset.slug}`}
          </div>

          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.4rem" }}>
            BibTeX Entry:
          </h3>
          <pre
            style={{
              padding: "0.85rem 1rem",
              background: "var(--bg-primary)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.45rem",
              fontSize: "0.78rem",
              fontFamily: "var(--font-mono, monospace)",
              overflowX: "auto",
              color: "var(--ink-secondary)",
              margin: 0,
            }}
          >
            {bibtexCitation}
          </pre>
        </section>

      </div>
    </div>
  );
}
