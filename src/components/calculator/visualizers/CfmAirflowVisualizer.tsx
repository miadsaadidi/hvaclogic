"use client";

import React from "react";
import { CfmCalculationResult } from "@/lib/math/cfm";

interface CfmAirflowVisualizerProps {
  result: CfmCalculationResult;
}

export function CfmAirflowVisualizer({ result }: CfmAirflowVisualizerProps) {
  const equivalentTons = (result.cfm / 400).toFixed(1);

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #0d1527 50%, #070b14 100%)",
        border: "1px solid var(--border-color)",
        borderTop: "3px solid var(--accent-cooling)",
        borderRadius: "0.75rem",
        padding: "1.15rem",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 24px rgba(0, 0, 0, 0.4)",
        fontFamily: "var(--font-titillium), 'Titillium Web', sans-serif",
        color: "#f8fafc",
        position: "relative",
        overflow: "hidden",
        margin: "0.75rem 0",
      }}
      role="region"
      aria-label="CFM Airflow Circulation Diagram"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>🌀</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Airflow Volume &amp; Space Circulation
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: "rgba(0, 210, 255, 0.12)",
            color: "var(--accent-cooling)",
            border: "1px solid rgba(0, 210, 255, 0.3)",
          }}
        >
          ~{equivalentTons} Tons AC Eqv.
        </span>
      </div>

      {/* SVG Airflow Room Schematic */}
      <div style={{ width: "100%", height: "150px", position: "relative" }}>
        <svg viewBox="0 0 500 150" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Room Air Circulation Vector">
          <defs>
            <linearGradient id="supplyAirGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="returnAirGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Room Boundary */}
          <rect x="20" y="15" width="460" height="120" rx="8" fill="rgba(26, 34, 52, 0.5)" stroke="var(--border-color)" strokeWidth="1.5" />

          {/* Supply Diffuser (Top Left) */}
          <rect x="50" y="15" width="60" height="10" rx="2" fill="var(--accent-cooling)" />
          <text x="80" y="10" fill="var(--accent-cooling)" fontSize="9" fontWeight="600" textAnchor="middle">
            SUPPLY (400–900 FPM)
          </text>

          {/* Supply Air Cone */}
          <path d="M 55 25 L 140 105 L 40 105 Z" fill="url(#supplyAirGradient)" />
          <path d="M 80 25 Q 120 70 180 90" stroke="#00d2ff" strokeWidth="2" strokeDasharray="4 2" fill="none" />
          <polygon points="180,86 188,90 180,94" fill="#00d2ff" />

          {/* Center Space Circulation Metric */}
          <circle cx="250" cy="75" r="32" fill="var(--surface)" stroke="var(--border-color)" strokeWidth="1.5" />
          <text x="250" y="68" fill="var(--ink-secondary)" fontSize="8" fontWeight="600" textAnchor="middle">
            AIRFLOW
          </text>
          <text x="250" y="83" fill="var(--accent-cooling)" fontSize="12" fontWeight="700" textAnchor="middle">
            {result.cfm.toLocaleString()}
          </text>
          <text x="250" y="95" fill="var(--text-muted)" fontSize="7.5" textAnchor="middle">
            CFM
          </text>

          {/* Circulation Flow Arrows */}
          <path d="M 200 60 Q 250 35 300 60" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" fill="none" opacity="0.7" />
          <path d="M 300 90 Q 250 115 200 90" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" fill="none" opacity="0.7" />

          {/* Return Grille (Top Right) */}
          <rect x="390" y="15" width="60" height="10" rx="2" fill="#64748b" />
          <text x="420" y="10" fill="#94a3b8" fontSize="9" fontWeight="600" textAnchor="middle">
            RETURN INTAKE
          </text>

          {/* Return Air Arrow */}
          <path d="M 330 90 Q 380 70 415 30" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" fill="none" />
          <polygon points="412,30 420,25 418,34" fill="#94a3b8" />
        </svg>
      </div>

      {/* Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginTop: "0.5rem" }}>
        <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.5rem 0.65rem", borderRadius: "5px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ fontSize: "0.65rem", color: "#94a3b8", textTransform: "uppercase" }}>Calculated Volume</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent-cooling)", marginTop: "0.1rem" }}>
            {result.cfm.toLocaleString()} CFM
          </div>
        </div>

        {result.airTurnoverMinutes && (
          <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.5rem 0.65rem", borderRadius: "5px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <div style={{ fontSize: "0.65rem", color: "#94a3b8", textTransform: "uppercase" }}>Full Air Turnover</div>
            <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent-success)", marginTop: "0.1rem" }}>
              Every {result.airTurnoverMinutes} min
            </div>
          </div>
        )}

        {result.velocityCategory && (
          <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.5rem 0.65rem", borderRadius: "5px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <div style={{ fontSize: "0.65rem", color: "#94a3b8", textTransform: "uppercase" }}>Acoustic Rating</div>
            <div
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                marginTop: "0.1rem",
                color:
                  result.velocityCategory === "whisper"
                    ? "var(--accent-success)"
                    : result.velocityCategory === "standard"
                    ? "#38bdf8"
                    : result.velocityCategory === "noisy"
                    ? "var(--accent-warning)"
                    : "var(--accent-danger)",
              }}
            >
              {result.velocityCategory === "whisper"
                ? "🟢 Whisper (<600 FPM)"
                : result.velocityCategory === "standard"
                ? "🟡 Standard (600-900)"
                : result.velocityCategory === "noisy"
                ? "🟠 Moderate (900-1200)"
                : "🔴 Excessive (>1200)"}
            </div>
          </div>
        )}
      </div>

      {/* Explanation Tag */}
      <div style={{ fontSize: "0.75rem", color: "#cbd5e1", lineHeight: 1.45, background: "rgba(255, 255, 255, 0.03)", padding: "0.5rem 0.65rem", borderRadius: "5px", borderLeft: "3px solid var(--accent-cooling)", marginTop: "0.65rem" }}>
        💡 <strong>Calculation Breakdown:</strong> {result.explanation}
      </div>
    </div>
  );
}
