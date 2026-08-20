"use client";

import React from "react";

export function HomeStatsBar() {
  const stats = [
    { label: "Engineering Calculators", value: "21", icon: "🧮", detail: "Deterministic & Pure Math" },
    { label: "Core HVAC Pillars", value: "5", icon: "🏛️", detail: "Airflow to Building Science" },
    { label: "Client-Side Privacy", value: "100%", icon: "⚡", detail: "Zero Database Tracking" },
    { label: "Engineering Standards", value: "ASHRAE", icon: "📐", detail: "ACCA • EPA • NIST • IECC" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        width: "100%",
        maxWidth: "1050px",
        margin: "1.75rem auto 2.5rem",
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "1rem 1.25rem",
            borderRadius: "0.75rem",
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              marginBottom: "0.25rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
            <span
              style={{
                fontSize: "1.45rem",
                fontWeight: 800,
                color: "var(--accent-cooling)",
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-titillium), monospace",
              }}
            >
              {s.value}
            </span>
          </div>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.15rem" }}>
            {s.label}
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>
            {s.detail}
          </div>
        </div>
      ))}
    </div>
  );
}
