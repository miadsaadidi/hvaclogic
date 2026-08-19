"use client";

import React from "react";
import { PtLookupOutput } from "@/lib/math/pt-chart";

interface RefrigerantGaugeVisualizerProps {
  output: PtLookupOutput;
}

export function RefrigerantGaugeVisualizer({ output }: RefrigerantGaugeVisualizerProps) {
  const maxDialPsig = 600;
  const clampedPsig = Math.max(0, Math.min(maxDialPsig, output.pressurePsig));

  // Sweep angle: 240 degrees total (from -120 deg to +120 deg)
  const angleDeg = -120 + (clampedPsig / maxDialPsig) * 240;
  const isHighSide = output.satTempF >= 85;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #0c1626 50%, #070b14 100%)",
        border: "1px solid var(--border-color)",
        borderTop: isHighSide ? "3px solid #ff6b4a" : "3px solid #00d2ff",
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
      aria-label="Refrigerant Manifold Pressure Gauge & Saturation Temperature Visualizer"
    >
      {/* Visualizer Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>📟</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {output.refrigerant.name} Manifold Gauge
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: output.refrigerant.safetyClass === "A2L" ? "rgba(245, 158, 11, 0.15)" : "rgba(16, 185, 129, 0.15)",
            color: output.refrigerant.safetyClass === "A2L" ? "#f59e0b" : "var(--accent-success)",
            border: "1px solid currentColor",
          }}
        >
          ASHRAE Class {output.refrigerant.safetyClass} {output.refrigerant.hasGlide ? `(${output.refrigerant.glideF}°F Glide)` : ""}
        </span>
      </div>

      {/* SVG Manifold Gauge Dial */}
      <div style={{ width: "100%", height: "170px", position: "relative" }}>
        <svg viewBox="0 0 400 170" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Refrigerant Pressure Gauge Dial">
          <defs>
            <linearGradient id="dialRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <radialGradient id="dialFaceGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="85%" stopColor="#090d16" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>

          {/* Outer Gauge Bezel & Face */}
          <circle cx="200" cy="110" r="95" fill="url(#dialRimGrad)" stroke="var(--border-color)" strokeWidth="3" />
          <circle cx="200" cy="110" r="88" fill="url(#dialFaceGrad)" />

          {/* Saturation Temperature Color Arc (Low Blue vs High Red) */}
          <path
            d="M 125 155 A 82 82 0 1 1 275 155"
            fill="none"
            stroke={isHighSide ? "#ff6b4a" : "#00d2ff"}
            strokeWidth="3"
            strokeDasharray="4 2"
            opacity="0.6"
          />

          {/* Tick Labels */}
          <text x="128" y="145" fill="#64748b" fontSize="8" fontWeight="600" textAnchor="middle">0</text>
          <text x="135" y="85" fill="#64748b" fontSize="8" fontWeight="600" textAnchor="middle">100</text>
          <text x="165" y="48" fill="#64748b" fontSize="8" fontWeight="600" textAnchor="middle">200</text>
          <text x="200" y="38" fill="#64748b" fontSize="8" fontWeight="600" textAnchor="middle">300</text>
          <text x="235" y="48" fill="#64748b" fontSize="8" fontWeight="600" textAnchor="middle">400</text>
          <text x="265" y="85" fill="#64748b" fontSize="8" fontWeight="600" textAnchor="middle">500</text>
          <text x="272" y="145" fill="#64748b" fontSize="8" fontWeight="600" textAnchor="middle">600</text>

          {/* Center Digital Saturation Readout */}
          <text x="200" y="85" fill="var(--ink)" fontSize="15" fontWeight="700" textAnchor="middle">
            {output.satTempF}&deg;F
          </text>
          <text x="200" y="98" fill={isHighSide ? "#ff6b4a" : "#00d2ff"} fontSize="8.5" fontWeight="600" textAnchor="middle">
            {output.satTempC}&deg;C SAT
          </text>
          <text x="200" y="132" fill="#94a3b8" fontSize="7.5" fontWeight="600" textAnchor="middle">
            {output.pressurePsig} PSIG ({output.pressureBar} BAR)
          </text>

          {/* Animated Manifold Gauge Needle */}
          <g transform={`rotate(${angleDeg}, 200, 110)`} style={{ transition: "transform 150ms ease-out" }}>
            <line x1="200" y1="110" x2="200" y2="30" stroke={isHighSide ? "#ff6b4a" : "#00d2ff"} strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="197,35 200,26 203,35" fill={isHighSide ? "#ff6b4a" : "#00d2ff"} />
          </g>

          {/* Needle Center Hub */}
          <circle cx="200" cy="110" r="6" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
        </svg>
      </div>

      {/* Operating Phase & Glide Callout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.45rem", marginTop: "0.25rem" }}>
        <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.45rem 0.6rem", borderRadius: "5px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ fontSize: "0.63rem", color: "#94a3b8" }}>Operating Phase</div>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: isHighSide ? "#ff6b4a" : "#00d2ff", marginTop: "0.1rem" }}>
            {output.operatingPhase.split(" (")[0]}
          </div>
        </div>

        <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.45rem 0.6rem", borderRadius: "5px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ fontSize: "0.63rem", color: "#94a3b8" }}>
            {output.refrigerant.hasGlide ? "Bubble vs. Dew Points" : "Atmospheric Boiling"}
          </div>
          <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#f8fafc", marginTop: "0.1rem" }}>
            {output.refrigerant.hasGlide
              ? `Bubble: ${output.bubbleSatTempF}°F | Dew: ${output.dewSatTempF}°F`
              : `GWP: ${output.refrigerant.gwp} (Global Warming Pot.)`}
          </div>
        </div>
      </div>
    </div>
  );
}
