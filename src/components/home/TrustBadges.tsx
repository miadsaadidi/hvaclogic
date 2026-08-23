import React from "react";

export function TrustBadges() {
  const badges = [
    {
      icon: "📐",
      title: "ASHRAE & ACCA Validated",
      description: "Colebrook equal friction duct equations and ACCA Manual J/S/D sizing compliance with zero ad-hoc heuristics.",
      accent: "#00d2ff",
    },
    {
      icon: "🔬",
      title: "NIST REFPROP Thermodynamics",
      description: "Precision saturation tables for next-gen A2L refrigerants (R-454B, R-32) with discrete bubble and dew temperature glide modeling.",
      accent: "#38bdf8",
    },
    {
      icon: "⚡",
      title: "Zero Paywalls & No Lead-Gen",
      description: "100% free, client-side engineering tools with instant permalink sharing, iframe embeds, and printable calculation submittals.",
      accent: "#10b981",
    },
    {
      icon: "🏢",
      title: "IECC Energy Code Compliance",
      description: "Continuous exterior insulation and thermal bridging calculations conforming to 2021/2024 International Energy Conservation Codes.",
      accent: "#8b5cf6",
    },
  ];

  return (
    <section style={{ margin: "3.5rem 0 2.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>Engineering Transparency</p>
        <h2 style={{ fontSize: "1.55rem", fontWeight: 700, margin: "0 0 0.35rem" }}>
          Built on Open Engineering Standards
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "620px", margin: "0 auto" }}>
          Deterministic thermodynamic and fluid mechanics formulas with transparent physical assumptions:
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.15rem",
        }}
      >
        {badges.map((b) => (
          <div
            key={b.title}
            className="trust-badge-card"
            style={{
              padding: "1.35rem 1.25rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
              transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: `${b.accent}15`,
                border: `1px solid ${b.accent}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                marginBottom: "0.85rem",
              }}
            >
              {b.icon}
            </div>
            <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "var(--ink)", margin: "0 0 0.4rem" }}>
              {b.title}
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              {b.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}


