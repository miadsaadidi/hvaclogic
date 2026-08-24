"use client";

import React from "react";

interface AcTonnageVisualizerProps {
  tonnage: number;
  btuPerHour: number;
  seerRating: number;
  annualOperatingCost: number;
  floorAreaSqFt: number;
  climateZone: string;
}

export function AcTonnageVisualizer({
  tonnage,
  btuPerHour,
  seerRating,
  annualOperatingCost,
  floorAreaSqFt,
  climateZone,
}: AcTonnageVisualizerProps) {
  // Estimated electrical watts at standard rating point
  const electricalWatts = Math.round(btuPerHour / seerRating);
  const totalHeatRejectionBtu = Math.round(btuPerHour + electricalWatts * 3.412);

  return (
    <div
      className="visual-schema-card"
      style={{
        background: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        marginTop: "1.25rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.1rem" }}>❄️</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Heat Flow &amp; SEER2 Energy Schematic
          </span>
        </div>
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: "rgba(0, 210, 255, 0.12)",
            color: "var(--accent-cooling)",
            border: "1px solid rgba(0, 210, 255, 0.3)",
          }}
        >
          {tonnage} TONS ({seerRating} SEER2)
        </span>
      </div>

      {/* SVG Energy Balance Diagram */}
      <div style={{ width: "100%", height: "160px" }}>
        <svg viewBox="0 0 500 160" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="HVAC Heat Extraction Diagram">
          {/* 1. Indoor Envelope (Left) */}
          <rect x="20" y="25" width="130" height="100" rx="8" fill="var(--surface)" stroke="#00d2ff" strokeWidth="2" />
          <text x="85" y="48" fill="var(--ink)" fontSize="11" fontWeight="700" textAnchor="middle">INDOOR SPACE</text>
          <text x="85" y="66" fill="var(--accent-cooling)" fontSize="10" fontWeight="700" textAnchor="middle">
            {btuPerHour.toLocaleString()} BTU/hr
          </text>
          <text x="85" y="82" fill="var(--text-muted)" fontSize="8.5" textAnchor="middle">
            Heat Absorbed
          </text>
          <text x="85" y="105" fill="var(--ink-secondary)" fontSize="8.5" fontWeight="600" textAnchor="middle">
            {floorAreaSqFt.toLocaleString()} sq ft
          </text>

          {/* Flow Arrow: Indoor to Compressor */}
          <path d="M 150 75 L 210 75" stroke="#00d2ff" strokeWidth="3" strokeDasharray="4 2" />
          <polygon points="210,71 218,75 210,79" fill="#00d2ff" />

          {/* 2. Compressor & Electrical Work (Center) */}
          <circle cx="250" cy="75" r="38" fill="var(--surface)" stroke="#eab308" strokeWidth="2" />
          <text x="250" y="68" fill="var(--ink)" fontSize="10" fontWeight="700" textAnchor="middle">COMPRESSOR</text>
          <text x="250" y="82" fill="#eab308" fontSize="10" fontWeight="700" textAnchor="middle">
            {electricalWatts.toLocaleString()} W
          </text>
          <text x="250" y="96" fill="var(--text-muted)" fontSize="8" textAnchor="middle">
            Work Input
          </text>

          {/* Flow Arrow: Compressor to Outdoor */}
          <path d="M 288 75 L 348 75" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 2" />
          <polygon points="348,71 356,75 348,79" fill="#ef4444" />

          {/* 3. Outdoor Condenser (Right) */}
          <rect x="350" y="25" width="130" height="100" rx="8" fill="var(--surface)" stroke="#ef4444" strokeWidth="2" />
          <text x="415" y="48" fill="var(--ink)" fontSize="11" fontWeight="700" textAnchor="middle">OUTDOOR AIR</text>
          <text x="415" y="66" fill="#ef4444" fontSize="10" fontWeight="700" textAnchor="middle">
            {totalHeatRejectionBtu.toLocaleString()} BTU/hr
          </text>
          <text x="415" y="82" fill="var(--text-muted)" fontSize="8.5" textAnchor="middle">
            Total Heat Rejected
          </text>
          <text x="415" y="105" fill="var(--ink-secondary)" fontSize="8.5" fontWeight="600" textAnchor="middle">
            ${annualOperatingCost}/yr Est.
          </text>
        </svg>
      </div>

      {/* Energy Efficiency Gauge */}
      <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "0.35rem" }}>
          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Efficiency Performance Rating:</span>
          <span style={{ color: "var(--accent-cooling)", fontWeight: 700 }}>
            {seerRating >= 18 ? "🌟 High Efficiency Inverter" : seerRating >= 15.2 ? "✅ Energy Star Standard" : "⚡ Code Minimum (13.4-14.3 SEER2)"}
          </span>
        </div>
        <div style={{ width: "100%", height: "8px", background: "var(--surface)", borderRadius: "9999px", overflow: "hidden", border: "1px solid var(--border-color)" }}>
          <div
            style={{
              width: `${Math.min(100, Math.max(10, ((seerRating - 13) / (24 - 13)) * 100))}%`,
              height: "100%",
              background: "linear-gradient(90deg, #38bdf8, #10b981)",
              borderRadius: "9999px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}
