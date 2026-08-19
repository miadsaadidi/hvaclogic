"use client";

import React from "react";
import { AssemblyOutput, MaterialLayer } from "@/lib/math/r-value";

interface RValueAssemblyVisualizerProps {
  output: AssemblyOutput;
  layers: MaterialLayer[];
}

const LAYER_COLORS: Record<string, string> = {
  drywall_half_inch: "#cbd5e1",
  fiberglass_batt: "#f472b6",
  rockwool_mineral_wool: "#78716c",
  cellulose_loose_fill: "#a8a29e",
  closed_cell_foam: "#facc15",
  open_cell_foam: "#fde047",
  polyiso_continuous: "#38bdf8",
  xps_rigid_foam: "#ec4899",
  eps_rigid_foam: "#e2e8f0",
  osb_sheathing: "#d97706",
  wood_siding: "#b45309",
  vinyl_siding: "#60a5fa",
  brick_veneer: "#dc2626",
  interior_air_film: "rgba(255, 255, 255, 0.05)",
  exterior_air_film: "rgba(255, 255, 255, 0.05)",
};

export function RValueAssemblyVisualizer({ output, layers }: RValueAssemblyVisualizerProps) {
  const totalLayers = layers.length;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #151b2e 50%, #080c18 100%)",
        border: "1px solid var(--border-color)",
        borderTop: output.isIeccCompliant ? "3px solid var(--accent-success)" : "3px solid var(--accent-danger)",
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
      aria-label="Insulation Assembly Thermal Cross-Section Diagram"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>🧱</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Assembly Thermal Cross-Section &amp; Gradient
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: output.isIeccCompliant ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
            color: output.isIeccCompliant ? "var(--accent-success)" : "var(--accent-danger)",
            border: "1px solid currentColor",
          }}
        >
          {output.complianceStatusBadge}
        </span>
      </div>

      {/* SVG Multi-Layer Cross Section */}
      <div style={{ width: "100%", height: "165px", position: "relative" }}>
        <svg viewBox="0 0 480 165" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Wall Assembly Layers and Thermal Gradient">
          {/* Indoor / Outdoor Ambience Background Labels */}
          <text x="25" y="15" fill="#ef4444" fontSize="7.5" fontWeight="700">INDOOR (70&deg;F)</text>
          <text x="455" y="15" fill="#00d2ff" fontSize="7.5" fontWeight="700" textAnchor="end">OUTDOOR (0&deg;F)</text>

          {/* Staged Assembly Layers (Stacked Horizontally) */}
          {layers.map((layer, idx) => {
            const startX = 35 + (idx / Math.max(1, totalLayers)) * 410;
            const width = 410 / Math.max(1, totalLayers);
            const color = LAYER_COLORS[layer.materialKey] || "#94a3b8";

            return (
              <g key={layer.id}>
                {/* Layer Box */}
                <rect
                  x={startX}
                  y="25"
                  width={Math.max(4, width - 2)}
                  height="105"
                  rx="3"
                  fill={color}
                  opacity="0.85"
                  stroke="#1e293b"
                  strokeWidth="1"
                />

                {/* Layer R-Value Pill */}
                <text
                  x={startX + width / 2}
                  y="80"
                  fill="#000"
                  fontSize="7.5"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  R-{layer.calculatedRValue}
                </text>

                {/* Layer Name Below */}
                <text
                  x={startX + width / 2}
                  y="142"
                  fill="var(--ink)"
                  fontSize="6.5"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {layer.name.length > 11 ? layer.name.substring(0, 10) + "…" : layer.name}
                </text>
              </g>
            );
          })}

          {/* Superimposed Thermal Temperature Gradient Decay Line */}
          <polyline
            points="35,35 150,55 300,95 445,125"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          <circle cx="35" cy="35" r="3.5" fill="#ef4444" />
          <circle cx="445" cy="125" r="3.5" fill="#00d2ff" />
        </svg>
      </div>

      {/* Summary Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.4rem", fontSize: "0.72rem" }}>
        <span style={{ color: "var(--ink-secondary)" }}>
          IECC Zone {output.climateZone} Requirement: <strong style={{ color: "var(--ink)" }}>R-{output.ieccRequiredRValue} (U-{output.ieccMaxUFactor})</strong>
        </span>
        <span style={{ color: "var(--ink-secondary)" }}>
          Annual Heat Loss: <strong style={{ color: output.isIeccCompliant ? "var(--accent-success)" : "#f59e0b" }}>{output.annualHeatLossBtuPerSqFt.toLocaleString()} BTU/sq ft·yr</strong>
        </span>
      </div>
    </div>
  );
}
