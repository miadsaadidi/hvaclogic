"use client";

import React, { useState } from "react";
import { FormulaVariable } from "@/types/calculation";
import { CodeFormulaBlock } from "@/components/seo/CodeFormulaBlock";

interface FormulaCardProps {
  title: string;
  formula: string;
  variables: FormulaVariable[];
  notes?: string;
  sourceStandard: string;
}

export function FormulaCard({
  title,
  formula,
  variables,
  notes,
  sourceStandard,
}: FormulaCardProps) {
  const [showCitation, setShowCitation] = useState(false);
  const [activeTab, setActiveTab] = useState<"latex" | "bibtex" | "apa">("latex");
  const [copied, setCopied] = useState(false);

  // Generate citation formats
  const latexSnippet = `\\begin{equation}\n  ${formula.replace(/\*/g, " \\times ")}\n\\end{equation}\n% Reference: ${sourceStandard}\n% Verified by HVACLogic (https://hvaclogic.org)`;

  const bibtexSnippet = `@misc{hvaclogic_${title.toLowerCase().replace(/[^a-z0-9]/g, "_")},\n  author = {{HVACLogic Engineering Standards Committee}},\n  title = {${title}: Governing Thermodynamic Model},\n  year = {2026},\n  publisher = {HVAC Logic Open-Access Engineering},\n  url = {https://hvaclogic.org},\n  note = {Governed by ${sourceStandard}}\n}`;

  const apaSnippet = `HVACLogic Engineering Standards Committee. (2026). ${title} [Mathematical Model & Physics Specification]. HVACLogic Open-Access Engineering Repository. Governed by ${sourceStandard}. https://hvaclogic.org`;

  const getActiveText = () => {
    if (activeTab === "latex") return latexSnippet;
    if (activeTab === "bibtex") return bibtexSnippet;
    return apaSnippet;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="formula-card" id="formula-math" style={{ marginTop: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.65rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
          {title}
        </h3>

        <button
          type="button"
          onClick={() => setShowCitation(!showCitation)}
          style={{
            background: showCitation ? "var(--surface-raised)" : "transparent",
            border: "1px solid var(--border-color)",
            borderRadius: "0.4rem",
            color: "var(--accent-cooling)",
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: "0.3rem 0.65rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            transition: "all 0.15s ease",
          }}
          title="Export formula for LaTeX documents, submittals, or BibTeX"
        >
          <span>📜</span>
          <span>{showCitation ? "Hide Citation" : "Cite Formula (LaTeX / BibTeX)"}</span>
        </button>
      </div>

      <CodeFormulaBlock
        formula={formula}
        title="governing_physics_model.math"
        badge="ASHRAE / ACCA SPEC"
      />

      {/* Interactive Citation Drawer */}
      {showCitation && (
        <div
          style={{
            marginTop: "0.85rem",
            padding: "0.85rem 1rem",
            borderRadius: "0.55rem",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
            <div style={{ display: "flex", gap: "0.35rem" }}>
              {(["latex", "bibtex", "apa"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "0.25rem 0.55rem",
                    borderRadius: "0.35rem",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    border: "none",
                    background: activeTab === tab ? "var(--accent-cooling)" : "transparent",
                    color: activeTab === tab ? "#000000" : "var(--text-muted)",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              style={{
                background: copied ? "var(--accent-success)" : "var(--surface)",
                border: "1px solid var(--border-color)",
                borderRadius: "0.35rem",
                color: copied ? "#ffffff" : "var(--ink)",
                fontSize: "0.72rem",
                fontWeight: 600,
                padding: "0.25rem 0.6rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <span>{copied ? "✓ Copied!" : "📋 Copy Snippet"}</span>
            </button>
          </div>

          <pre
            style={{
              margin: 0,
              padding: "0.65rem",
              borderRadius: "0.4rem",
              background: "var(--bg-primary)",
              color: "#38bdf8",
              fontSize: "0.76rem",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {getActiveText()}
          </pre>
        </div>
      )}

      <div className="scenario-table" style={{ marginTop: "1rem" }}>
        <table>
          <thead>
            <tr>
              <th scope="col" style={{ width: "15%" }}>Symbol</th>
              <th scope="col" style={{ width: "25%" }}>Variable</th>
              <th scope="col" style={{ width: "40%" }}>Description</th>
              <th scope="col" style={{ width: "20%" }}>Standard Units</th>
            </tr>
          </thead>
          <tbody>
            {variables.map((v) => (
              <tr key={v.symbol}>
                <td>
                  <code style={{ color: "var(--accent-cooling)", fontWeight: 700, fontSize: "0.9rem" }}>{v.symbol}</code>
                </td>
                <td>
                  <strong style={{ color: "var(--ink)" }}>{v.label}</strong>
                </td>
                <td style={{ color: "var(--ink-secondary)" }}>{v.description}</td>
                <td>
                  <code style={{ color: "#a78bfa", background: "rgba(167, 139, 250, 0.1)", padding: "0.15rem 0.4rem", borderRadius: "4px" }}>
                    {v.unit}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {notes && (
        <p className="authority-tag" style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
          💡 <strong>Engineering Note:</strong> {notes}
        </p>
      )}

      <div className="authority-tag" style={{ marginTop: "0.6rem", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
        <span>🏛️</span>
        <span>Engineering Standard Reference: <strong style={{ color: "var(--ink)" }}>{sourceStandard}</strong></span>
      </div>
    </section>
  );
}
