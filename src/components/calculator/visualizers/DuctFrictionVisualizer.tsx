"use client";

import React from "react";
import { DuctFrictionLossOutput } from "@/lib/math/duct-friction-loss";

interface DuctFrictionVisualizerProps {
  output: DuctFrictionLossOutput;
}

export function DuctFrictionVisualizer({ output }: DuctFrictionVisualizerProps) {
  const getStatusColor = () => {
    switch (output.frictionRateStatus) {
      case "optimal":
        return "var(--accent-success)";
      case "borderline_low":
        return "#f59e0b";
      case "borderline_high":
        return "#f97316";
      case "critical_undersized":
        return "var(--accent-danger)";
    }
  };

  const statusColor = getStatusColor();

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #0d1a2d 50%, #071f30 100%)",
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
      aria-label="ACCA Manual D Duct Static Pressure Drop Visualizer"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>📐 💨</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Manual D Friction Rate &amp; Pressure Gradient
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
          TEL: {output.totalEquivalentLengthTelFt} ft | ASP: {output.availableStaticPressureAspInWg.toFixed(3)}&quot; w.g.
        </span>
      </div>

      {/* SVG Pressure Gradient & Duct Schematic */}
      <div style={{ width: "100%", height: "165px", position: "relative" }}>
        <svg viewBox="0 0 460 165" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Duct Static Pressure Drop Schematic">
          {/* Pressure Gradient Background Track */}
          <rect x="30" y="15" width="400" height="40" fill="rgba(15, 23, 42, 0.6)" stroke="#334155" strokeWidth="1" rx="4" />
          <text x="40" y="30" fill="#94a3b8" fontSize="7" fontWeight="600">Static Pressure Decay Gradient:</text>

          {/* Blower TESP Starting Point */}
          <circle cx="50" cy="40" r="4" fill="#00d2ff" />
          <text x="50" y="50" fill="#00d2ff" fontSize="6.5" fontWeight="700" textAnchor="middle">
            TESP {output.blowerTespInWg.toFixed(2)}&quot;
          </text>

          {/* Static Drop Gradient Line */}
          <path
            d="M 50 40 L 140 40 L 170 32 L 280 32 L 410 20"
            fill="none"
            stroke={statusColor}
            strokeWidth="2.5"
          />

          {/* End Available Static Point */}
          <circle cx="410" cy="20" r="4" fill={statusColor} />
          <text x="410" y="32" fill={statusColor} fontSize="6.5" fontWeight="700" textAnchor="middle">
            ASP {output.availableStaticPressureAspInWg.toFixed(3)}&quot;
          </text>

          {/* Ductwork Layout Schematic (Bottom) */}
          {/* Return Trunk (Left) */}
          <rect x="40" y="85" width="80" height="35" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" rx="2" />
          <text x="80" y="105" fill="#94a3b8" fontSize="7.5" fontWeight="600" textAnchor="middle">
            Return ({output.totalReturnLengthFt} ft TEL)
          </text>

          {/* Air Handler / Coil (Center) */}
          <rect x="130" y="75" width="70" height="55" fill="#0f172a" stroke="#00d2ff" strokeWidth="2" rx="3" />
          <text x="165" y="98" fill="#00d2ff" fontSize="7.5" fontWeight="800" textAnchor="middle">
            AIR HANDLER
          </text>
          <text x="165" y="110" fill="#cbd5e1" fontSize="6" fontWeight="600" textAnchor="middle">
            Coil + Filter Drop: {output.totalComponentLossInWg.toFixed(2)}&quot;
          </text>

          {/* Supply Trunk & Boots (Right) */}
          <rect x="210" y="85" width="210" height="35" fill="#1e293b" stroke="#ff6b00" strokeWidth="1.5" rx="2" />
          <text x="315" y="105" fill="#ff6b00" fontSize="7.5" fontWeight="600" textAnchor="middle">
            Supply Trunk &amp; Boots ({output.totalSupplyLengthFt} ft TEL)
          </text>

          {/* Airflow Direction Arrows */}
          <path d="M 95 102 L 120 102" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M 230 102 L 260 102" stroke="#ff6b00" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      </div>

      {/* Summary Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.4rem", fontSize: "0.72rem" }}>
        <span style={{ color: "var(--ink-secondary)" }}>
          Design Friction Rate: <strong style={{ color: statusColor }}>{output.designFrictionRateFr.toFixed(3)}&quot; w.g. / 100 ft</strong>
        </span>
        <span style={{ color: "var(--ink-secondary)" }}>
          Status: <strong style={{ color: statusColor, textTransform: "capitalize" }}>{output.frictionRateStatus.replace("_", " ")}</strong>
        </span>
      </div>
    </div>
  );
}
