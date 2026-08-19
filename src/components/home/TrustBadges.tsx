import React from "react";

export function TrustBadges() {
  return (
    <section style={{ margin: "3rem 0 2rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>Engineering Transparency</p>
        <h2 style={{ fontSize: "1.45rem", fontWeight: 700, margin: "0 0 0.35rem" }}>
          Built on Open Engineering Standards
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          Deterministic thermodynamic and fluid mechanics formulas with transparent physical assumptions:
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem",
        }}
      >
        <div
          style={{
            padding: "1.2rem",
            borderRadius: "0.75rem",
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
          }}
        >
          <div style={{ fontSize: "1.35rem", marginBottom: "0.35rem" }}>📐</div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
            ASHRAE & ACCA Validated
          </h3>
          <p style={{ fontSize: "0.8125rem", color: "var(--ink-secondary)", lineHeight: 1.45, margin: 0 }}>
            Colebrook equal friction duct equations and ACCA Manual J/S/D sizing compliance with zero ad-hoc heuristics.
          </p>
        </div>

        <div
          style={{
            padding: "1.2rem",
            borderRadius: "0.75rem",
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
          }}
        >
          <div style={{ fontSize: "1.35rem", marginBottom: "0.35rem" }}>🔬</div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
            NIST REFPROP Thermodynamics
          </h3>
          <p style={{ fontSize: "0.8125rem", color: "var(--ink-secondary)", lineHeight: 1.45, margin: 0 }}>
            Precision saturation tables for next-gen A2L refrigerants (R-454B, R-32) with discrete bubble and dew temperature glide modeling.
          </p>
        </div>

        <div
          style={{
            padding: "1.2rem",
            borderRadius: "0.75rem",
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
          }}
        >
          <div style={{ fontSize: "1.35rem", marginBottom: "0.35rem" }}>⚡</div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
            Zero Paywalls & No Lead-Gen
          </h3>
          <p style={{ fontSize: "0.8125rem", color: "var(--ink-secondary)", lineHeight: 1.45, margin: 0 }}>
            100% free, client-side engineering tools with instant permalink sharing, iframe embeds, and printable calculation submittals.
          </p>
        </div>

        <div
          style={{
            padding: "1.2rem",
            borderRadius: "0.75rem",
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
          }}
        >
          <div style={{ fontSize: "1.35rem", marginBottom: "0.35rem" }}>🏢</div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.35rem" }}>
            IECC Energy Code Compliance
          </h3>
          <p style={{ fontSize: "0.8125rem", color: "var(--ink-secondary)", lineHeight: 1.45, margin: 0 }}>
            Continuous exterior insulation and thermal bridging calculations conforming to 2021/2024 International Energy Conservation Codes.
          </p>
        </div>
      </div>
    </section>
  );
}
