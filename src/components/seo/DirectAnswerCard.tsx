"use client";

import React from "react";
import { CodeFormulaBlock } from "@/components/seo/CodeFormulaBlock";

interface DirectAnswerCardProps {
  targetKeyword: string;
  directAnswer: string;
  formulaSnippet?: string;
  authorityCitation: string;
}

export function DirectAnswerCard({
  targetKeyword,
  directAnswer,
  formulaSnippet,
  authorityCitation,
}: DirectAnswerCardProps) {
  return (
    <aside className="direct-answer-card" aria-label={`Direct answer summary for ${targetKeyword}`}>
      <div className="target-keyword" style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
        <span>🎯</span>
        <span>Target Sizing Definition • {targetKeyword}</span>
      </div>

      <p className="answer-text speakable-summary" style={{ fontSize: "0.85rem", lineHeight: 1.55, color: "var(--ink-secondary)" }}>
        {directAnswer}
      </p>

      {formulaSnippet && (
        <div style={{ marginTop: "0.85rem", marginBottom: "0.85rem" }}>
          <CodeFormulaBlock
            formula={formulaSnippet}
            title={`${targetKeyword.toLowerCase().replace(/[^a-z0-9]/g, "_")}_equation.math`}
            badge="GOVERNING EQUATION"
          />
        </div>
      )}

      <div className="authority-tag" style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.6rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
        <span>🏛️</span>
        <span>Governing Standard: <strong style={{ color: "var(--ink)" }}>{authorityCitation}</strong></span>
      </div>
    </aside>
  );
}
