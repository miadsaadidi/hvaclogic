import React from "react";
import { CalculatorMeta } from "@/types/calculation";

interface EngineeringReviewCardProps {
  calculator: CalculatorMeta;
}

export function EngineeringReviewCard({ calculator }: EngineeringReviewCardProps) {
  return (
    <div
      className="engineering-review-card"
      style={{
        margin: "2.5rem 0",
        padding: "1.25rem 1.5rem",
        background: "var(--surface)",
        border: "1px solid var(--border-color)",
        borderLeft: "4px solid var(--accent-cooling)",
        borderRadius: "0.75rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        {/* Reviewer Details */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(0, 210, 255, 0.1)",
              border: "1px solid rgba(0, 210, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.3rem",
              flexShrink: 0,
            }}
          >
            🛡️
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--ink)" }}>
                Engineering Verification &amp; E-E-A-T Quality Standards
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  background: "rgba(16, 185, 129, 0.12)",
                  color: "var(--accent-success)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  padding: "1px 6px",
                  borderRadius: "9999px",
                }}
              >
                Peer-Reviewed
              </span>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--ink-secondary)", margin: "0.2rem 0 0", lineHeight: 1.45 }}>
              Calculations reviewed by licensed Mechanical Engineers (PE) adhering to ASHRAE Fundamentals, ACCA Manuals, and NIST thermodynamics.
            </p>
          </div>
        </div>

        {/* Audit Metadata Badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
          <div
            style={{
              fontSize: "0.72rem",
              padding: "0.25rem 0.55rem",
              background: "var(--surface-raised)",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              color: "var(--ink-secondary)",
            }}
          >
            Formula: <strong>v{calculator.formulaVersion}</strong>
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              padding: "0.25rem 0.55rem",
              background: "var(--surface-raised)",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              color: "var(--ink-secondary)",
            }}
          >
            Reviewed: <strong>{calculator.lastEngineeringReview}</strong>
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              padding: "0.25rem 0.55rem",
              background: "var(--surface-raised)",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              color: "var(--accent-cooling)",
            }}
          >
            Status: <strong>Deterministic (Zero Heuristics)</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
