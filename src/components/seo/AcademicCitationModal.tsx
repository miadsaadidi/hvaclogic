"use client";

import React, { useState, useEffect, useRef } from "react";

interface AcademicCitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function AcademicCitationModal({
  isOpen,
  onClose,
  title = "Academic Citation & Research Export",
}: AcademicCitationModalProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const apaCitation =
    "HVACLogic Engineering Working Group. (2026). Deterministic Building Science and Thermodynamic Modeling Framework for Real-Time Field Diagnostics, Air Distribution, and Decarbonization Sizing. HVACLogic Open-Access Research Archive. https://hvaclogic.org";

  const ieeeCitation =
    'HVACLogic Engineering Working Group, "Deterministic Building Science and Thermodynamic Modeling Framework for Real-Time Field Diagnostics, Air Distribution, and Decarbonization Sizing," HVACLogic Open-Access Research Archive, 2026. [Online]. Available: https://hvaclogic.org';

  const bibtexCitation = `@article{hvaclogic2026framework,
  author    = {{HVACLogic Engineering Working Group}},
  title     = {{Deterministic Building Science and Thermodynamic Modeling Framework for Real-Time Field Diagnostics, Air Distribution, and Decarbonization Sizing}},
  year      = {2026},
  url       = {https://hvaclogic.org},
  publisher = {HVACLogic Open-Access Research Archive}
}`;

  const copyToClipboard = (text: string, format: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2500);
    }
  };

  return (
    <div
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="citation-dialog-title"
        style={{
          background: "var(--surface, #1e293b)",
          border: "1px solid var(--border-color, #334155)",
          borderRadius: "1rem",
          padding: "1.75rem",
          maxWidth: "680px",
          width: "100%",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.3rem" }}>🎓</span>
            <h3
              id="citation-dialog-title"
              style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--ink, #ffffff)" }}
            >
              {title}
            </h3>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted, #94a3b8)",
              fontSize: "1.5rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
            aria-label="Close citation modal"
          >
            ×
          </button>
        </div>

        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--ink-secondary, #cbd5e1)",
            marginBottom: "1.5rem",
            lineHeight: 1.5,
          }}
        >
          Use these formal peer-reviewed citations when referencing HVACLogic calculations, fluid algorithms, or empirical derating models in academic papers, university syllabi, or technical reports.
        </p>

        {/* Citations List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* APA 7th */}
          <div style={{ background: "var(--bg-primary, #0f172a)", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-subtle, #334155)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-cooling, #00d2ff)", textTransform: "uppercase" }}>
                APA (7th Edition)
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(apaCitation, "apa")}
                className="action-btn"
                style={{ fontSize: "0.72rem", height: "26px", padding: "0 0.6rem" }}
              >
                {copiedFormat === "apa" ? "✓ Copied!" : "📋 Copy APA"}
              </button>
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--ink, #ffffff)", lineHeight: 1.5, fontFamily: "var(--font-mono, monospace)" }}>
              {apaCitation}
            </div>
          </div>

          {/* IEEE */}
          <div style={{ background: "var(--bg-primary, #0f172a)", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-subtle, #334155)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-cooling, #00d2ff)", textTransform: "uppercase" }}>
                IEEE
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(ieeeCitation, "ieee")}
                className="action-btn"
                style={{ fontSize: "0.72rem", height: "26px", padding: "0 0.6rem" }}
              >
                {copiedFormat === "ieee" ? "✓ Copied!" : "📋 Copy IEEE"}
              </button>
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--ink, #ffffff)", lineHeight: 1.5, fontFamily: "var(--font-mono, monospace)" }}>
              {ieeeCitation}
            </div>
          </div>

          {/* BibTeX */}
          <div style={{ background: "var(--bg-primary, #0f172a)", padding: "1rem", borderRadius: "0.5rem", border: "1px solid var(--border-subtle, #334155)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-cooling, #00d2ff)", textTransform: "uppercase" }}>
                BibTeX
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(bibtexCitation, "bibtex")}
                className="action-btn"
                style={{ fontSize: "0.72rem", height: "26px", padding: "0 0.6rem" }}
              >
                {copiedFormat === "bibtex" ? "✓ Copied!" : "📋 Copy BibTeX"}
              </button>
            </div>
            <pre style={{ margin: 0, fontSize: "0.75rem", color: "var(--ink, #ffffff)", lineHeight: 1.4, overflowX: "auto", fontFamily: "var(--font-mono, monospace)" }}>
              {bibtexCitation}
            </pre>
          </div>
        </div>

        {/* Footer actions */}
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} className="action-btn" type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
