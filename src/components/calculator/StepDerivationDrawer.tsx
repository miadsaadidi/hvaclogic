"use client";

import React, { useState } from "react";
import { CodeFormulaBlock } from "@/components/seo/CodeFormulaBlock";

export interface DerivationStep {
  stepNumber: number;
  title: string;
  formulaLatex: string;
  substitutionLatex: string;
  resultText: string;
  governingStandard?: string;
}

interface StepDerivationDrawerProps {
  toolName: string;
  steps: DerivationStep[];
  governingStandard?: string;
}

export function StepDerivationDrawer({
  toolName,
  steps,
  governingStandard = "ASHRAE / ACCA",
}: StepDerivationDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLatexProof = () => {
    const fullProof = `\\subsection*{Mathematical Derivation: ${toolName}}\n` +
      `\\noindent \\textbf{Governing Standard:} ${governingStandard} \\\\\n\n` +
      steps
        .map(
          (s) =>
            `\\subsubsection*{Step ${s.stepNumber}: ${s.title}}\n` +
            `\\begin{equation}\n  ${s.formulaLatex}\n\\end{equation}\n` +
            `\\noindent \\textbf{Substituted Inputs:} \\\\\n` +
            `\\begin{equation}\n  ${s.substitutionLatex} = ${s.resultText}\n\\end{equation}\n`
        )
        .join("\n") +
      `\n% Grounded & Verified via HVACLogic (https://hvaclogic.com)`;

    navigator.clipboard.writeText(fullProof);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        marginTop: "1.25rem",
        borderRadius: "0.65rem",
        border: "1px solid var(--border-color)",
        background: "var(--surface)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "0.85rem 1.15rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isOpen ? "var(--bg-secondary)" : "transparent",
          border: "none",
          borderBottom: isOpen ? "1px solid var(--border-color)" : "none",
          color: "var(--ink)",
          fontWeight: 600,
          fontSize: "0.88rem",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.15s ease",
        }}
        aria-expanded={isOpen}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <span>🔬</span>
          <span>
            {isOpen ? "Hide Mathematical Proof" : "View Step-by-Step Mathematical Derivation"}
          </span>
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--accent-cooling)",
            fontWeight: 700,
            textTransform: "uppercase",
            background: "rgba(56, 189, 248, 0.1)",
            padding: "0.2rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          {isOpen ? "▲ Collapse" : "▼ Expand Proof"}
        </span>
      </button>

      {/* Expandable Body */}
      {isOpen && (
        <div style={{ padding: "1.25rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "1rem",
              paddingBottom: "0.6rem",
              borderBottom: "1px solid var(--border-color)",
            }}
          >
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              🏛️ Verified Standard: <strong style={{ color: "var(--ink)" }}>{governingStandard}</strong>
            </div>

            <button
              type="button"
              onClick={handleCopyLatexProof}
              style={{
                background: copied ? "var(--accent-success)" : "var(--surface-raised)",
                border: "1px solid var(--border-color)",
                borderRadius: "0.35rem",
                color: copied ? "#ffffff" : "var(--ink)",
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "0.3rem 0.65rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <span>{copied ? "✓ Copied LaTeX Proof!" : "📋 Copy Full LaTeX Proof"}</span>
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {steps.map((step) => (
              <div
                key={step.stepNumber}
                style={{
                  background: "var(--bg-primary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      background: "var(--accent-cooling)",
                      color: "#000000",
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      padding: "0.15rem 0.45rem",
                      borderRadius: "9999px",
                    }}
                  >
                    {step.stepNumber}
                  </span>
                  <strong style={{ fontSize: "0.88rem", color: "var(--ink)" }}>{step.title}</strong>
                </div>

                <div style={{ marginBottom: "0.6rem" }}>
                  <CodeFormulaBlock
                    formula={step.formulaLatex}
                    title={`step_${step.stepNumber}_governing_equation.math`}
                    badge="GOVERNING SPEC"
                  />
                </div>

                <div style={{ marginTop: "0.6rem" }}>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>
                    Substituted Inputs &amp; Intermediate Evaluation:
                  </div>
                  <pre
                    style={{
                      margin: 0,
                      padding: "0.6rem 0.75rem",
                      borderRadius: "0.35rem",
                      background: "var(--surface)",
                      border: "1px solid var(--border-color)",
                      color: "var(--accent-cooling)",
                      fontSize: "0.8rem",
                      fontFamily: "var(--font-mono, monospace)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {step.substitutionLatex} = {step.resultText}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
