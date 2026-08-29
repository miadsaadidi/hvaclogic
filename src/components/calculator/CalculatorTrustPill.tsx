"use client";

import React from "react";

interface CalculatorTrustPillProps {
  className?: string;
  customText?: string;
}

export function CalculatorTrustPill({
  className = "",
  customText,
}: CalculatorTrustPillProps) {
  return (
    <div
      className={`calculator-trust-pill ${className}`.trim()}
      role="note"
      aria-label="Privacy guarantee: 100% client-side calculation with zero data tracking"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        padding: "0.3rem 0.75rem",
        borderRadius: "9999px",
        background: "rgba(16, 185, 129, 0.08)",
        border: "1px solid rgba(16, 185, 129, 0.28)",
        color: "var(--accent-success, #10b981)",
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.01em",
        marginBottom: "0.75rem",
        width: "fit-content",
        maxWidth: "100%",
        lineHeight: 1.4,
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "0.82rem" }}>🔒</span>
      <span>
        {customText || "100% Private & Ad-Free • No Sign-Up or Phone Required • Instant Local Math"}
      </span>
    </div>
  );
}
