"use client";

import React, { useState, useMemo } from "react";
import { GlossaryTerm } from "@/lib/data/glossary-terms";

interface GlossaryExplorerProps {
  terms: GlossaryTerm[];
}

export function GlossaryExplorer({ terms }: GlossaryExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("All");

  const categories = ["All", "Airflow", "Refrigeration", "Efficiency", "Building Science"];

  const filteredTerms = useMemo(() => {
    return terms.filter((t) => {
      const matchesCat = selectedCat === "All" || t.category === selectedCat;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.fullTitle.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [terms, search, selectedCat]);

  return (
    <div>
      {/* Controls Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "var(--surface, #111827)",
          border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
          borderRadius: "8px",
        }}
      >
        <div style={{ flex: "1 1 280px" }}>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search engineering terms (e.g. CFM, SEER2, Superheat)..."
            aria-label="Search glossary terms"
            style={{
              width: "100%",
              padding: "0.6rem 1rem",
              borderRadius: "6px",
              border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.2))",
              backgroundColor: "var(--bg-primary, #0a0f1d)",
              color: "var(--ink-primary, #f9fafb)",
              fontSize: "0.9375rem",
              fontFamily: "var(--font-titillium)",
            }}
          />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCat(cat)}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "4px",
                border: selectedCat === cat ? "1px solid var(--accent, #38bdf8)" : "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
                backgroundColor: selectedCat === cat ? "rgba(56, 189, 248, 0.15)" : "transparent",
                color: selectedCat === cat ? "var(--accent, #38bdf8)" : "var(--ink-secondary, #9ca3af)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Term Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {filteredTerms.map((term) => (
          <article
            key={term.slug}
            id={term.slug}
            style={{
              backgroundColor: "var(--surface, #111827)",
              border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
              borderTop: "4px solid var(--accent, #38bdf8)",
              borderRadius: "8px",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--accent, #38bdf8)",
                    fontWeight: 700,
                  }}
                >
                  {term.category}
                </span>
                <h2 style={{ fontSize: "1.25rem", margin: "0.15rem 0", color: "var(--ink-primary, #f9fafb)", fontFamily: "var(--font-titillium)" }}>
                  {term.term}
                </h2>
                <div style={{ fontSize: "0.8125rem", color: "var(--ink-secondary, #9ca3af)", fontStyle: "italic" }}>
                  {term.fullTitle}
                </div>
              </div>
              {term.wikidataUrl && (
                <a
                  href={term.wikidataUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.6875rem",
                    padding: "0.2rem 0.45rem",
                    borderRadius: "4px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
                    color: "var(--ink-secondary, #9ca3af)",
                    textDecoration: "none",
                  }}
                  title="View Wikidata Entity Triple"
                >
                  Wikidata ↗
                </a>
              )}
            </div>

            <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--ink-primary, #e2e8f0)", lineHeight: 1.5 }}>
              {term.definition}
            </p>

            {term.ruleOfThumb && (
              <div
                style={{
                  backgroundColor: "var(--bg-primary, #0a0f1d)",
                  borderLeft: "3px solid var(--accent, #38bdf8)",
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.8125rem",
                  color: "var(--ink-secondary, #9ca3af)",
                  borderRadius: "0 4px 4px 0",
                  lineHeight: 1.4,
                }}
              >
                <strong style={{ color: "var(--ink-primary, #f3f4f6)" }}>Rule of Thumb:</strong> {term.ruleOfThumb}
              </div>
            )}

            {term.formula && (
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.75rem",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  padding: "0.4rem 0.6rem",
                  borderRadius: "4px",
                  color: "var(--accent, #38bdf8)",
                }}
              >
                {term.formula}
              </div>
            )}

            {term.governingStandard && (
              <div style={{ marginTop: "auto", paddingTop: "0.5rem", fontSize: "0.75rem", color: "var(--ink-secondary, #6b7280)", borderTop: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.05))" }}>
                <strong>Standard:</strong> {term.governingStandard}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
