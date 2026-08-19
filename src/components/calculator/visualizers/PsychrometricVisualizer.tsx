"use client";

import React from "react";
import { PsychrometricOutput } from "@/lib/math/psychrometric";

interface PsychrometricVisualizerProps {
  output: PsychrometricOutput;
}

export function PsychrometricVisualizer({ output }: PsychrometricVisualizerProps) {
  // Chart domain mapping
  // X: Dry Bulb 30°F to 110°F -> SVG x: 45 to 455
  // Y: Humidity Ratio 0 to 180 grains/lb -> SVG y: 145 to 20
  const minDb = 30;
  const maxDb = 110;
  const maxW = 180; // grains/lb

  const getX = (db: number) => 45 + ((Math.max(minDb, Math.min(maxDb, db)) - minDb) / (maxDb - minDb)) * 410;
  const getY = (w: number) => 145 - (Math.max(0, Math.min(maxW, w)) / maxW) * 125;

  const currentX = getX(output.dryBulbF);
  const currentY = getY(output.humidityRatioGrainsPerLb);

  // Pre-calculated saturation curve points (100% RH) from 30°F to 110°F
  // 30°F: 24 grains, 50°F: 53 grains, 70°F: 110 grains, 90°F: 217 grains
  const sat100Path = "M 45 128 Q 150 115, 250 85 T 455 10";
  const sat50Path = "M 45 136 Q 150 128, 250 110 T 455 60";
  const sat20Path = "M 45 142 Q 150 138, 250 130 T 455 110";

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
      aria-label="Psychrometric State Point Chart"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>💧</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Psychrometric State Point &amp; Saturation Boundary
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: output.comfortZoneStatus.includes("Ideal") ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
            color: output.comfortZoneStatus.includes("Ideal") ? "var(--accent-success)" : "#f59e0b",
            border: "1px solid currentColor",
          }}
        >
          {output.comfortZoneStatus}
        </span>
      </div>

      {/* SVG Psychrometric Chart */}
      <div style={{ width: "100%", height: "175px", position: "relative" }}>
        <svg viewBox="0 0 480 175" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Psychrometric State Diagram">
          <defs>
            <linearGradient id="comfortZone" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="45" y1="45" x2="455" y2="45" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="45" y1="95" x2="455" y2="95" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="45" y1="145" x2="455" y2="145" stroke="#334155" strokeWidth="1.5" />
          <line x1="45" y1="20" x2="45" y2="145" stroke="#334155" strokeWidth="1.5" />

          {/* ASHRAE 55 Comfort Envelope Box (68°F to 78°F, approx 35 to 80 grains) */}
          <rect
            x={getX(68)}
            y={getY(80)}
            width={getX(78) - getX(68)}
            height={getY(35) - getY(80)}
            rx="4"
            fill="url(#comfortZone)"
            stroke="var(--accent-success)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <text x={(getX(68) + getX(78)) / 2} y={(getY(80) + getY(35)) / 2 + 3} fill="var(--accent-success)" fontSize="6.5" fontWeight="600" textAnchor="middle">
            ASHRAE 55 COMFORT
          </text>

          {/* Curved Relative Humidity Lines */}
          <path d={sat100Path} fill="none" stroke="#00d2ff" strokeWidth="2" />
          <text x="320" y="48" fill="#00d2ff" fontSize="7" fontWeight="600">100% RH (Saturation)</text>

          <path d={sat50Path} fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 2" />
          <text x="360" y="90" fill="#38bdf8" fontSize="6.5">50% RH</text>

          <path d={sat20Path} fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
          <text x="400" y="125" fill="#64748b" fontSize="6.5">20% RH</text>

          {/* X-Axis Labels (Dry Bulb °F) */}
          {[30, 50, 70, 90, 110].map((t) => (
            <text key={t} x={getX(t)} y="157" fill="#64748b" fontSize="7.5" textAnchor="middle">
              {t}&deg;F DB
            </text>
          ))}

          {/* Y-Axis Labels (Humidity Ratio grains/lb) */}
          <text x="40" y="48" fill="#64748b" fontSize="7" textAnchor="end">140 gr</text>
          <text x="40" y="98" fill="#64748b" fontSize="7" textAnchor="end">70 gr</text>
          <text x="40" y="148" fill="#64748b" fontSize="7" textAnchor="end">0 gr</text>

          {/* Active State Point Crosshair */}
          <line x1={currentX} y1="20" x2={currentX} y2="145" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <line x1="45" y1={currentY} x2="455" y2={currentY} stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

          {/* Glowing State Point Marker */}
          <circle cx={currentX} cy={currentY} r="5" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />
          <circle cx={currentX} cy={currentY} r="9" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.4" />

          {/* State Point Callout Label */}
          <text x={Math.min(380, Math.max(100, currentX + 10))} y={Math.max(30, currentY - 6)} fill="#f59e0b" fontSize="8" fontWeight="700">
            {output.dryBulbF}&deg;F / {output.relativeHumidityPercent}% RH (h={output.specificEnthalpyBtuPerLb})
          </text>
        </svg>
      </div>

      {/* Summary Matrix Strip */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem", flexWrap: "wrap", gap: "0.4rem", fontSize: "0.72rem" }}>
        <span style={{ color: "var(--ink-secondary)" }}>
          Wet Bulb: <strong style={{ color: "var(--accent-cooling)" }}>{output.wetBulbF}&deg;F</strong>
        </span>
        <span style={{ color: "var(--ink-secondary)" }}>
          Dew Point: <strong style={{ color: "#38bdf8" }}>{output.dewPointF}&deg;F</strong>
        </span>
        <span style={{ color: "var(--ink-secondary)" }}>
          Humidity Ratio: <strong style={{ color: "var(--ink)" }}>{output.humidityRatioGrainsPerLb} gr/lb</strong>
        </span>
        <span style={{ color: "var(--ink-secondary)" }}>
          Enthalpy: <strong style={{ color: "#f59e0b" }}>{output.specificEnthalpyBtuPerLb} BTU/lb</strong>
        </span>
      </div>
    </div>
  );
}
