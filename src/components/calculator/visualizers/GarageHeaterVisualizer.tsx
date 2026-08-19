"use client";

import React from "react";
import { GarageHeaterOutput } from "@/lib/math/garage-heater";

interface GarageHeaterVisualizerProps {
  output: GarageHeaterOutput;
}

export function GarageHeaterVisualizer({ output }: GarageHeaterVisualizerProps) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #151b2e 50%, #080c18 100%)",
        border: "1px solid var(--border-color)",
        borderTop: "3px solid var(--accent-heating)",
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
      aria-label="Garage Heating Throw and Thermal Loss Visualizer"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>🚗 ♨️</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Garage Heater Throw &amp; Slab Heat Sink
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: "rgba(255, 107, 0, 0.15)",
            color: "var(--accent-heating)",
            border: "1px solid rgba(255, 107, 0, 0.3)",
          }}
        >
          {output.recommendedGasHeaterBtu.toLocaleString()} BTU Gas / {output.recommendedElectricHeaterKw} kW Electric
        </span>
      </div>

      {/* SVG Garage Cross Section Diagram */}
      <div style={{ width: "100%", height: "165px", position: "relative" }}>
        <svg viewBox="0 0 460 165" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Garage Cross Section and Heating Throw">
          {/* Concrete Slab Floor */}
          <rect x="40" y="130" width="380" height="15" fill="#334155" rx="2" />
          <text x="230" y="141" fill="#94a3b8" fontSize="7.5" fontWeight="600" textAnchor="middle">
            Concrete Slab Floor ({output.slabEdgeLossBtu.toLocaleString()} BTU Perimeter Sink)
          </text>

          {/* Garage Wall Frame */}
          <rect x="50" y="45" width="360" height="85" fill="rgba(15, 23, 42, 0.6)" stroke="#475569" strokeWidth="1.5" rx="2" />

          {/* Roof Rafters / Ceiling */}
          <polygon points="230,10 40,45 420,45" fill="rgba(30, 41, 59, 0.8)" stroke="#64748b" strokeWidth="1.5" />
          <text x="230" y="35" fill="#f59e0b" fontSize="7.5" fontWeight="700" textAnchor="middle">
            Ceiling Heat Loss: {output.conductiveLossBtu.toLocaleString()} BTU
          </text>

          {/* Overhead Garage Door (Left) */}
          <rect x="60" y="55" width="20" height="75" fill="#475569" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
          <text x="70" y="95" fill="#00d2ff" fontSize="6.5" fontWeight="700" transform="rotate(-90 70 95)" textAnchor="middle">
            OVERHEAD DOOR ({output.overheadDoorLossBtu.toLocaleString()} BTU)
          </text>

          {/* SUSPENDED UNIT HEATER (Upper Right Ceiling Corner) */}
          <rect x="340" y="52" width="50" height="30" rx="3" fill="#1e293b" stroke="#ff6b00" strokeWidth="1.5" />
          <text x="365" y="68" fill="#ff6b00" fontSize="7" fontWeight="800" textAnchor="middle">
            UNIT HEATER
          </text>
          <text x="365" y="77" fill="#fff" fontSize="6" fontWeight="600" textAnchor="middle">
            {output.recommendedElectricHeaterKw} kW / Gas
          </text>

          {/* WARM AIR FORCED THROW CONE (Orange gradient downward trajectory) */}
          <polygon points="340,65 140,128 320,128" fill="rgba(255, 107, 0, 0.18)" stroke="rgba(255, 107, 0, 0.4)" strokeWidth="1" />
          <path d="M 335 70 Q 240 100 160 125" fill="none" stroke="#ff6b00" strokeWidth="2" strokeDasharray="4 2" />
          <polygon points="150,123 160,128 153,133" fill="#ff6b00" />
          <text x="260" y="105" fill="#ff6b00" fontSize="7" fontWeight="700">
            Forced Air Throw Stream
          </text>

          {/* Cold Infiltration Air Drafts */}
          <path d="M 40 120 L 70 120" stroke="#00d2ff" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="85" y="123" fill="#00d2ff" fontSize="6.5" fontWeight="700">
            Drafts ({output.infiltrationLossBtu.toLocaleString()} BTU)
          </text>
        </svg>
      </div>

      {/* Summary Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.4rem", fontSize: "0.72rem" }}>
        <span style={{ color: "var(--ink-secondary)" }}>
          Total Peak Loss: <strong style={{ color: "var(--accent-heating)" }}>{output.totalPeakHeatLossBtu.toLocaleString()} BTU/hr</strong>
        </span>
        <span style={{ color: "var(--ink-secondary)" }}>
          Electric 240V Circuit: <strong style={{ color: "var(--accent-cooling)" }}>{output.recommendedCircuitBreakerAmps}A Breaker ({output.recommendedElectricAmps240V}A)</strong>
        </span>
      </div>
    </div>
  );
}
