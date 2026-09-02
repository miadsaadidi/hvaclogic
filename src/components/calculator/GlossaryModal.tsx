"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { GLOSSARY_TERMS, GlossaryTerm } from "@/lib/data/glossary-terms";

export function GlossaryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("All");


  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((t) => {
      const matchesCat = selectedCat === "All" || t.category === selectedCat;
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.term.toLowerCase().includes(q) ||
        t.fullTitle.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, selectedCat]);

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="action-btn"
        style={{
          height: "36px",
          padding: "0 0.65rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.78rem",
          color: "var(--ink)",
          background: "var(--surface)",
          borderColor: "var(--border-color)",
        }}
        title="Open HVAC Engineering Field Glossary"
        aria-label="HVAC Glossary"
      >
        <span style={{ fontSize: "0.9rem" }}>📖</span>
        <span className="glossary-btn-text" style={{ display: "none" }}>Glossary</span>
      </button>

      <style jsx>{`
        @media (min-width: 900px) {
          .glossary-btn-text {
            display: inline !important;
          }
        }
      `}</style>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          className="command-palette-backdrop"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="HVAC Field Glossary"
        >
          <div
            style={{
              width: "100%",
              maxWidth: "920px",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderRadius: "1rem",
              padding: "1.75rem 2rem",
              boxShadow: "var(--shadow-lg), 0 0 50px rgba(0, 210, 255, 0.12)",
              animation: "fadeIn 0.15s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.4rem" }}>📖</span>
                <div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    HVAC Engineering Field Glossary
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                    Official technical definitions, formulas, and rules of thumb (ASHRAE, ACCA, EPA, AHRI).
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Search Input & Category Filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem", alignItems: "center" }}>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search term or acronym (e.g. CFM, SEER2, Superheat, A2L)..."
                style={{
                  flex: "1 1 240px",
                  padding: "0.65rem 0.85rem",
                  borderRadius: "0.5rem",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-primary)",
                  color: "var(--ink)",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {["All", "Airflow", "Refrigeration", "Efficiency", "Building Science"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCat(cat)}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: "1px solid",
                      borderColor: selectedCat === cat ? "var(--accent-cooling)" : "var(--border-color)",
                      background: selectedCat === cat ? "var(--accent-cooling)" : "var(--surface-raised)",
                      color: selectedCat === cat ? "#ffffff" : "var(--ink-secondary)",
                      transition: "all 120ms ease",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Terms List */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
                gap: "1rem",
                paddingRight: "0.25rem",
              }}
            >
              {filteredTerms.length === 0 ? (
                <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
                  No terms found matching &ldquo;{search}&rdquo;.
                </div>
              ) : (
                filteredTerms.map((item) => (
                  <div
                    key={item.term}
                    style={{
                      padding: "1rem 1.15rem",
                      borderRadius: "0.65rem",
                      background: "var(--surface-raised)",
                      border: "1px solid var(--border-color)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                        <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent-cooling)" }}>
                          {item.term}
                        </span>
                        <span style={{ fontSize: "0.8rem", color: "var(--ink)", fontWeight: 600 }}>
                          • {item.fullTitle}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          padding: "1px 6px",
                          borderRadius: "4px",
                          background: "rgba(0, 210, 255, 0.1)",
                          color: "var(--accent-cooling)",
                          border: "1px solid rgba(0, 210, 255, 0.2)",
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--ink-secondary)", lineHeight: 1.45 }}>
                      {item.definition}
                    </p>

                    {item.ruleOfThumb && (
                      <div
                        style={{
                          marginTop: "0.35rem",
                          padding: "0.4rem 0.6rem",
                          background: "var(--bg-primary)",
                          borderLeft: "2px solid var(--accent-primary)",
                          borderRadius: "3px",
                          fontSize: "0.75rem",
                          color: "var(--ink)",
                          lineHeight: 1.4,
                        }}
                      >
                        💡 <strong>Rule of Thumb:</strong> {item.ruleOfThumb}
                      </div>
                    )}

                    {item.formula && (
                      <div
                        style={{
                          marginTop: "0.2rem",
                          padding: "0.35rem 0.55rem",
                          background: "var(--bg-primary)",
                          borderRadius: "3px",
                          fontFamily: "ui-monospace, monospace",
                          fontSize: "0.73rem",
                          color: "var(--accent-cooling)",
                        }}
                      >
                        {item.formula}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div
              style={{
                marginTop: "0.75rem",
                paddingTop: "0.75rem",
                borderTop: "1px solid var(--border-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.75rem",
                color: "var(--ink-secondary)",
              }}
            >
              <span>ASHRAE / ACCA Deterministic Standards</span>
              <Link
                href="/glossary"
                onClick={() => setIsOpen(false)}
                style={{
                  color: "var(--accent-cooling)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Full Engineering Glossary Page ↗
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

