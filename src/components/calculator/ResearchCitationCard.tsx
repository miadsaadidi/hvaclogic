import React from "react";
import Link from "next/link";
import { CalculatorMeta } from "@/types/calculation";
import { getResearchPaperBySlug } from "@/lib/data/research-papers";

interface ResearchCitationCardProps {
  calculator: CalculatorMeta;
}

export function ResearchCitationCard({ calculator }: ResearchCitationCardProps) {
  const paper = calculator.researchSlug ? getResearchPaperBySlug(calculator.researchSlug) : undefined;
  const hasResearch = Boolean(paper);
  const hasOer = Boolean(calculator.oerModuleUrl);
  const hasDataset = Boolean(calculator.datasetUrl);

  if (!hasResearch && !hasOer && !hasDataset) {
    return null;
  }

  return (
    <div
      className="research-citation-card"
      style={{
        margin: "2rem 0",
        padding: "1.25rem 1.5rem",
        background: "var(--surface)",
        border: "1px solid var(--border-color)",
        borderLeft: "4px solid #a78bfa",
        borderRadius: "0.75rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.6rem" }}>
        <span style={{ fontSize: "1.1rem" }}>📚</span>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#a78bfa",
          }}
        >
          Scientific Methodology &amp; Academic Courseware
        </span>
      </div>

      {paper && (
        <div style={{ marginBottom: (hasOer || hasDataset) ? "0.85rem" : 0 }}>
          <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.3rem", lineHeight: 1.4 }}>
            Governing Research Monograph:{" "}
            <Link
              href={`/research/${paper.slug}`}
              style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}
            >
              {paper.title}
            </Link>
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--ink-secondary)", margin: 0, lineHeight: 1.5 }}>
            Report: <strong style={{ color: "var(--ink)" }}>{paper.reportNumber}</strong>
            {paper.doi && (
              <>
                {" "}• DOI:{" "}
                <a
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--accent-cooling)", fontFamily: "var(--font-mono, monospace)" }}
                >
                  {paper.doi}
                </a>
              </>
            )}
            {" "}• Authors: <span>{paper.authors.join(", ")}</span>
          </p>
        </div>
      )}

      {(hasOer || hasDataset) && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: paper ? "0.75rem" : 0, paddingTop: paper ? "0.75rem" : 0, borderTop: paper ? "1px solid var(--border-subtle)" : "none" }}>
          {hasOer && calculator.oerModuleUrl && (
            <a
              href={calculator.oerModuleUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                background: "rgba(167, 139, 250, 0.12)",
                border: "1px solid rgba(167, 139, 250, 0.3)",
                color: "#c4b5fd",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span>🧪</span>
              <span>Open Interactive Lab Module (HTML5) ↗</span>
            </a>
          )}

          {hasDataset && calculator.datasetSlug && (
            <Link
              href={`/datasets/${calculator.datasetSlug}`}
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                background: "rgba(16, 185, 129, 0.12)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                color: "var(--accent-success, #10b981)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span>📊</span>
              <span>Open Benchmark Dataset &amp; Matrix →</span>
            </Link>
          )}

          {hasDataset && calculator.datasetUrl && (
            <a
              href={calculator.datasetUrl}
              download
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                color: "var(--ink-secondary)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span>📥</span>
              <span>Download CSV ↓</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
