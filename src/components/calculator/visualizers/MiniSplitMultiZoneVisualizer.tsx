"use client";

import React from "react";
import { MiniSplitSystemOutput } from "@/lib/math/mini-split";

interface MiniSplitMultiZoneVisualizerProps {
  output: MiniSplitSystemOutput;
}

export function MiniSplitMultiZoneVisualizer({ output }: MiniSplitMultiZoneVisualizerProps) {
  const rooms = output.rooms;
  const ratio = output.connectedCapacityRatioPercent;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #0d1e33 50%, #08111e 100%)",
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
      aria-label="Mini-Split Multi-Zone System Schematic Diagram"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>❄️</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Multi-Port Inverter Distribution &amp; Diversity
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: ratio > 130 ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
            color: ratio > 130 ? "var(--accent-danger)" : "var(--accent-success)",
            border: "1px solid currentColor",
          }}
        >
          {ratio}% Connected Capacity ({output.overSubscriptionStatus.split(" ")[0]})
        </span>
      </div>

      {/* SVG Multi-Zone Layout Schematic */}
      <div style={{ width: "100%", height: "175px", position: "relative" }}>
        <svg viewBox="0 0 500 175" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Mini-Split Lineset Schematic Diagram">
          <defs>
            <linearGradient id="condenserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>

          {/* Outdoor Condenser Unit (Left) */}
          <g transform="translate(20, 45)">
            <rect x="0" y="0" width="85" height="90" rx="6" fill="url(#condenserGrad)" stroke="var(--accent-cooling)" strokeWidth="1.5" />
            {/* Fan Grille */}
            <circle cx="42" cy="45" r="28" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="42" cy="45" r="10" fill="#334155" />
            {/* Fan Blades */}
            <line x1="42" y1="20" x2="42" y2="70" stroke="#00d2ff" strokeWidth="2" />
            <line x1="17" y1="45" x2="67" y2="45" stroke="#00d2ff" strokeWidth="2" />

            <text x="42" y="-6" fill="var(--ink)" fontSize="8" fontWeight="700" textAnchor="middle">
              OUTDOOR UNIT
            </text>
            <text x="42" y="100" fill="var(--accent-cooling)" fontSize="8" fontWeight="700" textAnchor="middle">
              {output.recommendedOutdoorTonnage}T ({output.recommendedOutdoorCondenserBtu / 1000}k BTU)
            </text>
          </g>

          {/* Linesets to Indoor Heads (Right) */}
          {rooms.map((room, idx) => {
            const total = rooms.length;
            const targetY = total === 1 ? 90 : 25 + (idx / Math.max(1, total - 1)) * 125;
            const headX = 360;

            return (
              <g key={room.id}>
                {/* Copper Lineset Path */}
                <path
                  d={`M 105 90 C 180 90, 240 ${targetY}, ${headX} ${targetY}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Indoor Head Unit Card */}
                <g transform={`translate(${headX}, ${targetY - 14})`}>
                  <rect
                    x="0"
                    y="0"
                    width="125"
                    height="28"
                    rx="4"
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  {/* Louver discharge */}
                  <rect x="5" y="22" width="115" height="3" rx="1" fill="#00d2ff" opacity="0.8" />

                  {/* Room Name & Head BTU */}
                  <text x="8" y="12" fill="var(--ink)" fontSize="7.5" fontWeight="600">
                    {room.name.length > 14 ? room.name.substring(0, 14) + "…" : room.name}
                  </text>
                  <text x="118" y="12" fill="#38bdf8" fontSize="7.5" fontWeight="700" textAnchor="end">
                    {room.matchedIndoorHeadBtu / 1000}k BTU
                  </text>
                  <text x="8" y="20" fill="var(--ink-secondary)" fontSize="6.5">
                    {room.sqft} sq ft &bull; {room.calculatedLoadBtu.toLocaleString()} BTU load
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Connected Ratio Progress Bar */}
      <div style={{ marginTop: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "0.25rem" }}>
          <span style={{ color: "var(--ink-secondary)" }}>
            Total Connected Indoor: <strong style={{ color: "var(--ink)" }}>{output.totalIndoorConnectedBtu.toLocaleString()} BTU</strong>
          </span>
          <span style={{ color: "var(--ink-secondary)" }}>
            Outdoor Condenser: <strong style={{ color: "var(--accent-cooling)" }}>{output.recommendedOutdoorCondenserBtu.toLocaleString()} BTU</strong>
          </span>
        </div>
        <div style={{ width: "100%", height: "6px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "3px", overflow: "hidden" }}>
          <div
            style={{
              width: `${Math.min(100, (ratio / 130) * 100)}%`,
              height: "100%",
              background: ratio > 130 ? "var(--accent-danger)" : ratio >= 100 ? "var(--accent-cooling)" : "#38bdf8",
              borderRadius: "3px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
