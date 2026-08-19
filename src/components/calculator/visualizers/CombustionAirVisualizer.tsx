"use client";

import React from "react";
import { CombustionAirOutput } from "@/lib/math/combustion-air";

interface CombustionAirVisualizerProps {
  output: CombustionAirOutput;
}

export function CombustionAirVisualizer({ output }: CombustionAirVisualizerProps) {
  const statusColor = output.isConfinedSpace ? "var(--accent-danger)" : "var(--accent-success)";

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #1e1308 50%, #080c18 100%)",
        border: "1px solid var(--border-color)",
        borderTop: `3px solid ${statusColor}`,
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
      aria-label="NFPA 54 Mechanical Room Combustion Air Visualizer"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>🔥 🌬️</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            NFPA 54 Mechanical Room Volume &amp; Air Openings
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: output.isConfinedSpace ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
            color: statusColor,
            border: `1px solid ${statusColor}40`,
          }}
        >
          {output.isConfinedSpace ? "CONFINED SPACE" : "UNCONFINED SPACE"} ({output.volumePercentageOfRequired}% Req)
        </span>
      </div>

      {/* SVG Diagram */}
      <div style={{ width: "100%", height: "165px", position: "relative" }}>
        <svg viewBox="0 0 460 165" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Mechanical Room Combustion Air Openings">
          {/* Mechanical Room Enclosure */}
          <rect x="40" y="20" width="380" height="125" fill="rgba(15, 23, 42, 0.7)" stroke="#475569" strokeWidth="1.5" rx="3" />
          <text x="230" y="34" fill="#94a3b8" fontSize="7.5" fontWeight="600" textAnchor="middle">
            Mechanical Room ({output.roomVolumeCuFt.toLocaleString()} cu ft / {output.requiredUnconfinedVolumeCuFt.toLocaleString()} cu ft required)
          </text>

          {/* Upper Combustion Air Opening (Left Wall, Top 12") */}
          <rect x="30" y="38" width="20" height="18" fill="#1e293b" stroke="#00d2ff" strokeWidth="1.5" />
          <path d="M 15 47 L 45 47" stroke="#00d2ff" strokeWidth="2" strokeDasharray="3 2" />
          <text x="75" y="49" fill="#00d2ff" fontSize="6.5" fontWeight="700">
            Upper Air Intake (Top 12&quot;)
          </text>

          {/* Lower Combustion Air Opening (Left Wall, Bottom 12") */}
          <rect x="30" y="115" width="20" height="18" fill="#1e293b" stroke="#00d2ff" strokeWidth="1.5" />
          <path d="M 15 124 L 45 124" stroke="#00d2ff" strokeWidth="2" strokeDasharray="3 2" />
          <text x="75" y="126" fill="#00d2ff" fontSize="6.5" fontWeight="700">
            Lower Air Intake (Bottom 12&quot;)
          </text>

          {/* Gas Furnace (Right) */}
          <rect x="230" y="55" width="65" height="85" fill="#1e293b" stroke="#ff6b4a" strokeWidth="1.5" rx="2" />
          <text x="262" y="78" fill="#ff6b4a" fontSize="7.5" fontWeight="800" textAnchor="middle">
            GAS FURNACE
          </text>
          <text x="262" y="90" fill="#fff" fontSize="6.5" fontWeight="600" textAnchor="middle">
            Burner Intake
          </text>
          {/* Flame icon */}
          <text x="262" y="125" fontSize="12" textAnchor="middle">🔥</text>

          {/* Gas Water Heater (Far Right) */}
          <rect x="320" y="65" width="55" height="75" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" rx="2" />
          <text x="347" y="85" fill="#38bdf8" fontSize="7" fontWeight="800" textAnchor="middle">
            WATER HEATER
          </text>
          <text x="347" y="125" fontSize="10" textAnchor="middle">💧</text>

          {/* Exhaust Chimney Flue */}
          <path d="M 262 55 L 262 10" stroke="#94a3b8" strokeWidth="4" />
          <path d="M 347 65 L 347 10" stroke="#94a3b8" strokeWidth="3" />
          <text x="305" y="10" fill="#cbd5e1" fontSize="6.5" fontWeight="600" textAnchor="middle">
            Exhaust Flue
          </text>
        </svg>
      </div>

      {/* Summary Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.4rem", fontSize: "0.72rem" }}>
        <span style={{ color: "var(--ink-secondary)" }}>
          Total Gas Load: <strong style={{ color: "var(--accent-heating)" }}>{output.totalInputBtuHr.toLocaleString()} BTU/hr</strong>
        </span>
        <span style={{ color: "var(--ink-secondary)" }}>
          Method 2 (Outdoor Vertical): <strong style={{ color: "var(--accent-cooling)" }}>{output.methods[1]?.netFreeAreaSqIn} sq in. Net Each</strong>
        </span>
      </div>
    </div>
  );
}
