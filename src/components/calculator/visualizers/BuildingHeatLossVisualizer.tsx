"use client";

import React from "react";
import { BuildingHeatLossOutput } from "@/lib/math/heat-loss";

interface BuildingHeatLossVisualizerProps {
  output: BuildingHeatLossOutput;
}

export function BuildingHeatLossVisualizer({ output }: BuildingHeatLossVisualizerProps) {
  const { breakdownPercentages } = output;

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
      aria-label="Building Heat Loss Envelope & Infiltration Visualizer"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>🏠 🔥</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Envelope &amp; Infiltration Heat Flux
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
          {output.heatLossPerSqFtBtu} BTU/ft² Intensity
        </span>
      </div>

      {/* SVG House Envelope Heat Loss Diagram */}
      <div style={{ width: "100%", height: "160px", position: "relative" }}>
        <svg viewBox="0 0 460 160" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Building Envelope Heat Loss Paths">
          {/* Ground Slab Foundation */}
          <rect x="70" y="130" width="320" height="15" fill="#334155" rx="2" />
          <text x="230" y="141" fill="#94a3b8" fontSize="7.5" fontWeight="600" textAnchor="middle">
            Slab Foundation ({breakdownPercentages.foundationPercent}%) &bull; {output.breakdown.foundationBtu.toLocaleString()} BTU/hr
          </text>

          {/* House Structure Outline */}
          <rect x="90" y="60" width="280" height="70" fill="rgba(30, 41, 59, 0.7)" stroke="#64748b" strokeWidth="1.5" rx="3" />

          {/* Roof Triangle */}
          <polygon points="230,15 80,60 380,60" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1.5" />
          <text x="230" y="45" fill="#f59e0b" fontSize="7.5" fontWeight="700" textAnchor="middle">
            Ceiling / Attic ({breakdownPercentages.ceilingPercent}%) &bull; {output.breakdown.ceilingBtu.toLocaleString()} BTU/hr
          </text>
          {/* Ceiling Escape Arrow */}
          <path d="M 230 35 L 230 18" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" markerEnd="url(#heat-arrow)" />

          {/* Windows Left & Right */}
          <rect x="110" y="75" width="40" height="35" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="1.2" rx="2" />
          <text x="130" y="96" fill="#38bdf8" fontSize="7" fontWeight="700" textAnchor="middle">
            {breakdownPercentages.windowsPercent}%
          </text>

          <rect x="310" y="75" width="40" height="35" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="1.2" rx="2" />
          <text x="330" y="96" fill="#38bdf8" fontSize="7" fontWeight="700" textAnchor="middle">
            {breakdownPercentages.windowsPercent}%
          </text>

          {/* Door Center */}
          <rect x="215" y="80" width="30" height="50" fill="#475569" stroke="#94a3b8" strokeWidth="1" rx="1" />

          {/* Infiltration Air Gaps & Flow Vectors */}
          <path d="M 50 100 Q 80 95 105 105" fill="none" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="45" y="95" fill="#00d2ff" fontSize="7" fontWeight="700">
            Cold Drafts ({output.infiltrationCfm} CFM)
          </text>
          <text x="230" y="108" fill="#f43f5e" fontSize="7.5" fontWeight="700" textAnchor="middle">
            Infiltration: {breakdownPercentages.infiltrationPercent}% ({output.breakdown.infiltrationBtu.toLocaleString()} BTU)
          </text>

          {/* Wall Escape Arrows */}
          <path d="M 90 95 L 70 95" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 2" />
          <path d="M 370 95 L 390 95" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 2" />
          <text x="400" y="98" fill="#ef4444" fontSize="7" fontWeight="700">
            Walls ({breakdownPercentages.wallsPercent}%)
          </text>
        </svg>
      </div>

      {/* Progress Breakdown Bars */}
      <div style={{ display: "flex", width: "100%", height: "8px", borderRadius: "4px", overflow: "hidden", marginTop: "0.5rem" }}>
        <div style={{ width: `${breakdownPercentages.wallsPercent}%`, background: "#ef4444" }} title="Walls" />
        <div style={{ width: `${breakdownPercentages.ceilingPercent}%`, background: "#f59e0b" }} title="Ceiling" />
        <div style={{ width: `${breakdownPercentages.windowsPercent}%`, background: "#38bdf8" }} title="Windows" />
        <div style={{ width: `${breakdownPercentages.infiltrationPercent}%`, background: "#f43f5e" }} title="Infiltration" />
        <div style={{ width: `${breakdownPercentages.foundationPercent + breakdownPercentages.doorsPercent}%`, background: "#64748b" }} title="Foundation/Doors" />
      </div>

      {/* Summary Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.4rem", fontSize: "0.72rem" }}>
        <span style={{ color: "var(--ink-secondary)" }}>
          Recommended Furnace: <strong style={{ color: "var(--accent-heating)" }}>{output.recommendedFurnaceBtu.toLocaleString()} BTU/hr</strong>
        </span>
        <span style={{ color: "var(--ink-secondary)" }}>
          Recommended Heat Pump: <strong style={{ color: "var(--accent-cooling)" }}>{output.recommendedHeatPumpTons} Tons</strong>
        </span>
      </div>
    </div>
  );
}
