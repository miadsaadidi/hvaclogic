"use client";

import React from "react";
import { FilterSizingOutput } from "@/lib/math/filter-sizing";

interface FilterSizingVisualizerProps {
  output: FilterSizingOutput;
}

export function FilterSizingVisualizer({ output }: FilterSizingVisualizerProps) {
  const getVelocityColor = () => {
    switch (output.velocityStatus) {
      case "optimal":
        return "var(--accent-success)";
      case "acceptable_deep_only":
        return "#f59e0b";
      case "excessive":
        return "var(--accent-danger)";
    }
  };

  const getPressureColor = () => {
    switch (output.pressureDropStatus) {
      case "low_resistance":
        return "var(--accent-success)";
      case "moderate":
        return "#00d2ff";
      case "high_risk":
        return "#f97316";
      case "severe_choke":
        return "var(--accent-danger)";
    }
  };

  const velColor = getVelocityColor();
  const presColor = getPressureColor();

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #0c1a2e 50%, #061c28 100%)",
        border: "1px solid var(--border-color)",
        borderTop: `3px solid ${presColor}`,
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
      aria-label="ASHRAE 52.2 Filter Velocity & Static Pressure Visualizer"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>🌪️ 🛡️</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Filter Face Velocity &amp; Static Drop
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
          {output.totalFaceAreaSqFt} sq ft Face Area | Max: {output.recommendedMaxCfm} CFM
        </span>
      </div>

      {/* SVG Diagram */}
      <div style={{ width: "100%", height: "165px", position: "relative" }}>
        <svg viewBox="0 0 460 165" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Filter Media and Airflow Streamlines">
          {/* Intake Return Duct / Filter Housing */}
          <rect x="30" y="25" width="400" height="115" fill="rgba(15, 23, 42, 0.6)" stroke="#334155" strokeWidth="1.5" rx="3" />
          <text x="45" y="40" fill="#94a3b8" fontSize="7.5" fontWeight="600">
            Return Air Intake Duct ({output.airflowCfm.toLocaleString()} CFM)
          </text>

          {/* Incoming Airflow Streams */}
          <path d="M 45 65 L 145 65" stroke="#00d2ff" strokeWidth="2" strokeDasharray="4 3" />
          <path d="M 45 85 L 145 85" stroke="#00d2ff" strokeWidth="2" strokeDasharray="4 3" />
          <path d="M 45 105 L 145 105" stroke="#00d2ff" strokeWidth="2" strokeDasharray="4 3" />
          <text x="80" y="58" fill="#00d2ff" fontSize="6.5" fontWeight="700">
            Airflow →
          </text>

          {/* Pleated Filter Media (Center) */}
          <rect x="155" y="40" width="60" height="85" fill="#1e293b" stroke={presColor} strokeWidth="2" rx="2" />
          {/* Pleat accordion pattern */}
          <path
            d="M 165 45 L 180 55 L 165 65 L 180 75 L 165 85 L 180 95 L 165 105 L 180 115"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          <path
            d="M 185 45 L 200 55 L 185 65 L 200 75 L 185 85 L 200 95 L 185 105 L 200 115"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
          />
          <text x="185" y="133" fill="#cbd5e1" fontSize="6.5" fontWeight="700" textAnchor="middle">
            {output.filterDimensionsStr}
          </text>

          {/* Filter Face Velocity Indicator (Right Box) */}
          <rect x="240" y="40" width="85" height="85" fill="#0f172a" stroke={velColor} strokeWidth="1.5" rx="3" />
          <text x="282" y="55" fill="#94a3b8" fontSize="6.5" fontWeight="600" textAnchor="middle">
            FACE VELOCITY
          </text>
          <text x="282" y="80" fill={velColor} fontSize="14" fontWeight="700" textAnchor="middle">
            {output.faceVelocityFpm}
          </text>
          <text x="282" y="92" fill={velColor} fontSize="7" fontWeight="600" textAnchor="middle">
            FPM
          </text>
          <text x="282" y="112" fill="#cbd5e1" fontSize="6" textAnchor="middle">
            Target: &le; 300 FPM
          </text>

          {/* Static Pressure Drop Indicator (Far Right Box) */}
          <rect x="335" y="40" width="85" height="85" fill="#0f172a" stroke={presColor} strokeWidth="1.5" rx="3" />
          <text x="377" y="55" fill="#94a3b8" fontSize="6.5" fontWeight="600" textAnchor="middle">
            STATIC DROP
          </text>
          <text x="377" y="80" fill={presColor} fontSize="14" fontWeight="700" textAnchor="middle">
            {output.initialCleanPressureDropInWg.toFixed(3)}&quot;
          </text>
          <text x="377" y="92" fill={presColor} fontSize="7" fontWeight="600" textAnchor="middle">
            w.g. (Clean)
          </text>
          <text x="377" y="112" fill="#94a3b8" fontSize="6" textAnchor="middle">
            Loaded: ~{output.estimatedLoadedPressureDropInWg.toFixed(2)}&quot;
          </text>
        </svg>
      </div>

      {/* Summary Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.4rem", fontSize: "0.72rem" }}>
        <span style={{ color: "var(--ink-secondary)" }}>
          Face Velocity: <strong style={{ color: velColor }}>{output.faceVelocityFpm} FPM</strong>
        </span>
        <span style={{ color: "var(--ink-secondary)" }}>
          Resistance: <strong style={{ color: presColor, textTransform: "capitalize" }}>{output.pressureDropStatus.replace("_", " ")}</strong>
        </span>
      </div>
    </div>
  );
}
