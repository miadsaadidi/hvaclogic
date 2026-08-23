"use client";

import React from "react";

export function HomeStatsBar() {
  const stats = [
    {
      label: "Engineering Calculators",
      value: "21",
      icon: "🧮",
      detail: "Deterministic & Pure Math",
      color: "#00d2ff",
    },
    {
      label: "Core HVAC Pillars",
      value: "5",
      icon: "🏛️",
      detail: "Airflow to Building Science",
      color: "#38bdf8",
    },
    {
      label: "Client-Side Privacy",
      value: "100%",
      icon: "⚡",
      detail: "Zero Database Tracking",
      color: "#10b981",
    },
    {
      label: "Engineering Standards",
      value: "ASHRAE",
      icon: "📐",
      detail: "ACCA • EPA • NIST • IECC",
      color: "#8b5cf6",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: "1rem",
        width: "100%",
        maxWidth: "1080px",
        margin: "1.25rem auto 2.25rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="stat-card-interactive"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "1.1rem 1.25rem",
            borderRadius: "0.85rem",
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderTop: `3.5px solid ${s.color}`,
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)",
            position: "relative",
            overflow: "hidden",
            transition: "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s ease, border-color 0.18s ease",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.35rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
            <span
              style={{
                fontSize: "1.375rem",
                fontWeight: 550,
                color: s.color,
                letterSpacing: "-0.01em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {s.value}
            </span>
          </div>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 500,
              color: "var(--ink)",
              marginBottom: "0.15rem",
              letterSpacing: "-0.005em",
            }}
          >
            {s.label}
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            {s.detail}
          </div>
        </div>
      ))}
    </div>
  );
}


