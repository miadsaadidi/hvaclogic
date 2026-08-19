"use client";

import React, { useState } from "react";

interface CodeFormulaBlockProps {
  formula: string;
  title?: string;
  badge?: string;
}

export function CodeFormulaBlock({ formula, title = "physics_equation.math", badge = "DETERMINISTIC" }: CodeFormulaBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Syntax highlight formula text into tokens
  const formatFormulaTokens = (text: string) => {
    // Split on pipes for dual formulas if present
    const lines = text.split(" | ");

    return lines.map((line, lineIdx) => {
      const parts = line.split(/(\s*=\s*|\s*\+\s*|\s*-\s*|\s*\*\s*|\s*\/\s*|\s*\^\s*|\(|\)|\|)/g);

      return (
        <div key={lineIdx} className="code-line" style={{ display: "flex", alignItems: "baseline", gap: "0.2rem", flexWrap: "wrap" }}>
          <span className="code-line-num" style={{ userSelect: "none", opacity: 0.35, fontSize: "0.68rem", marginRight: "0.5rem", fontFamily: "ui-monospace, monospace" }}>
            0{lineIdx + 1}
          </span>
          <span style={{ display: "inline-flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.2rem" }}>
            {parts.map((part, pIdx) => {
              if (!part) return null;
              const trimmed = part.trim();

              // Math Operators
              if (["=", "+", "-", "*", "/", "^", "|"].includes(trimmed)) {
                return (
                  <span key={pIdx} style={{ color: "#f59e0b", fontWeight: 600, margin: "0 0.15rem" }}>
                    {part}
                  </span>
                );
              }

              // Parentheses
              if (["(", ")"].includes(trimmed)) {
                return (
                  <span key={pIdx} style={{ color: "#38bdf8", fontWeight: 500 }}>
                    {part}
                  </span>
                );
              }

              // Numbers & constants
              if (/^[0-9]+(\.[0-9]+)?$/.test(trimmed)) {
                return (
                  <span key={pIdx} style={{ color: "#a78bfa", fontWeight: 600 }}>
                    {part}
                  </span>
                );
              }

              // Variables / Formula terms
              return (
                <span key={pIdx} style={{ color: pIdx === 0 ? "#00d2ff" : "#e2e8f0", fontWeight: pIdx === 0 ? 700 : 500 }}>
                  {part}
                </span>
              );
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <div
      className="code-formula-block"
      style={{
        background: "linear-gradient(145deg, #090d16 0%, #0d1527 60%, #070d18 100%)",
        border: "1px solid #1e293b",
        borderTop: "3px solid var(--accent-cooling)",
        borderRadius: "0.65rem",
        overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        margin: "0.6rem 0",
      }}
      role="region"
      aria-label="Mathematical formula code representation"
    >
      {/* IDE TERMINAL TOP BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.35rem 0.75rem",
          background: "rgba(0, 0, 0, 0.45)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          {/* Mac / Terminal Dots */}
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
          </div>
          <span style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.03em", marginLeft: "0.25rem" }}>
            {title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              color: "var(--accent-cooling)",
              background: "rgba(0, 210, 255, 0.1)",
              padding: "0.12rem 0.4rem",
              borderRadius: "3px",
              border: "1px solid rgba(0, 210, 255, 0.25)",
              letterSpacing: "0.04em",
            }}
          >
            {badge}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            style={{
              background: copied ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${copied ? "var(--accent-success)" : "rgba(255, 255, 255, 0.12)"}`,
              borderRadius: "4px",
              padding: "0.15rem 0.45rem",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: copied ? "var(--accent-success)" : "#cbd5e1",
              cursor: "pointer",
              transition: "all 120ms ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
            title="Copy formula text"
          >
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>
        </div>
      </div>

      {/* CODE BODY */}
      <div
        style={{
          padding: "0.65rem 0.85rem",
          fontSize: "0.78rem",
          lineHeight: 1.5,
          color: "#f8fafc",
          overflowX: "auto",
        }}
      >
        {formatFormulaTokens(formula)}
      </div>
    </div>
  );
}
