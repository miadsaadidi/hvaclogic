"use client";

import React from "react";
import { SagCompressionLevel, SAG_COMPRESSION_FACTORS } from "@/lib/math/flex-duct";

interface FlexDuctSagVisualizerProps {
  sagPercent: SagCompressionLevel;
  activeDiameter: number;
}

export function FlexDuctSagVisualizer({ sagPercent, activeDiameter }: FlexDuctSagVisualizerProps) {
  const config = SAG_COMPRESSION_FACTORS[sagPercent] || SAG_COMPRESSION_FACTORS[4];
  const lossPercent = Math.round((1 - config.capacityFactor) * 100);

  // SVG Catenary droop coordinates based on sagPercent
  const droopY = sagPercent === 0 ? 0 : sagPercent === 4 ? 8 : sagPercent === 15 ? 24 : 45;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #0d1527 50%, #070b14 100%)",
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
      aria-label="Flexible Duct Installation Sag & Compression Visualizer"
    >
      {/* Visualizer Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>〰️</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Catenary Sag &amp; Internal Compression Physics
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: lossPercent === 0 ? "rgba(16, 185, 129, 0.15)" : lossPercent <= 10 ? "rgba(56, 189, 248, 0.15)" : "rgba(239, 68, 68, 0.15)",
            color: lossPercent === 0 ? "var(--accent-success)" : lossPercent <= 10 ? "#38bdf8" : "var(--accent-danger)",
            border: "1px solid currentColor",
          }}
        >
          {lossPercent === 0 ? "✓ 100% Lab Baseline" : `⚠️ -${lossPercent}% CFM Capacity`}
        </span>
      </div>

      {/* SVG Flex Duct Sag Vector */}
      <div style={{ width: "100%", height: "160px", position: "relative" }}>
        <svg viewBox="0 0 500 160" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Flexible Duct Sag Deflection Curve">
          <defs>
            <linearGradient id="flexAirflowGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.8" />
            </linearGradient>
            <pattern id="wireHelix" width="20" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 0 Q 10 20 20 0" fill="none" stroke="#64748b" strokeWidth="1.5" opacity="0.6" />
            </pattern>
          </defs>

          {/* Ceiling Framing Joist Bar (Top) */}
          <line x1="30" y1="20" x2="470" y2="20" stroke="#334155" strokeWidth="4" strokeDasharray="6 4" />
          <text x="250" y="14" fill="#64748b" fontSize="8" fontWeight="600" textAnchor="middle">
            CEILING JOISTS / ROOF TRUSS (4-FT HANGER SPACING)
          </text>

          {/* Hanger Support Straps */}
          <line x1="100" y1="20" x2="100" y2="55" stroke="#94a3b8" strokeWidth="2.5" />
          <line x1="400" y1="20" x2="400" y2="55" stroke="#94a3b8" strokeWidth="2.5" />

          {/* Flexible Duct Outer Catenary Path */}
          {/* Top Wall */}
          <path
            d={`M 40 55 Q 250 ${55 + droopY} 460 55`}
            fill="none"
            stroke="var(--accent-cooling)"
            strokeWidth="3"
          />
          {/* Bottom Wall */}
          <path
            d={`M 40 95 Q 250 ${95 + droopY} 460 95`}
            fill="none"
            stroke="var(--accent-cooling)"
            strokeWidth="3"
          />

          {/* Shaded Internal Air Core */}
          <path
            d={`M 40 55 Q 250 ${55 + droopY} 460 55 L 460 95 Q 250 ${95 + droopY} 40 95 Z`}
            fill="url(#flexAirflowGlow)"
            opacity="0.25"
          />

          {/* Airflow Velocity Center Arrow */}
          <path
            d={`M 70 75 Q 250 ${75 + droopY} 430 75`}
            fill="none"
            stroke="#00d2ff"
            strokeWidth="2.5"
            strokeDasharray="5 3"
          />
          <polygon points={`430,${71 + droopY * 0.1} 440,${75 + droopY * 0.1} 430,${79 + droopY * 0.1}`} fill="#00d2ff" />

          {/* Center Sag Annotation */}
          {droopY > 0 && (
            <>
              <line x1="250" y1="75" x2="250" y2={75 + droopY} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
              <text x="258" y={75 + droopY / 2 + 3} fill="#ef4444" fontSize="8.5" fontWeight="700">
                {sagPercent}% Sag
              </text>
            </>
          )}

          {/* Duct Diameter Callout (Left) */}
          <text x="35" y="78" fill="var(--ink)" fontSize="10" fontWeight="700" textAnchor="end">
            Ø {activeDiameter}&quot;
          </text>
        </svg>
      </div>

      {/* Sag Factor Quick Pills */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))", gap: "0.45rem", marginTop: "0.5rem" }}>
        <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.45rem 0.6rem", borderRadius: "5px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ fontSize: "0.63rem", color: "#94a3b8" }}>Friction Multiplier</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent-cooling)", marginTop: "0.1rem" }}>
            {config.frictionMultiplier.toFixed(2)}&times;
          </div>
        </div>

        <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.45rem 0.6rem", borderRadius: "5px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ fontSize: "0.63rem", color: "#94a3b8" }}>Delivered Airflow</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent-success)", marginTop: "0.1rem" }}>
            {Math.round(config.capacityFactor * 100)}% Capacity
          </div>
        </div>

        <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.45rem 0.6rem", borderRadius: "5px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ fontSize: "0.63rem", color: "#94a3b8" }}>Hanger Rule</div>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f59e0b", marginTop: "0.15rem" }}>
            Max 4-Ft Spacing
          </div>
        </div>
      </div>

      {/* Description Callout */}
      <div style={{ fontSize: "0.75rem", color: "#cbd5e1", lineHeight: 1.45, background: "rgba(255, 255, 255, 0.03)", padding: "0.5rem 0.65rem", borderRadius: "5px", borderLeft: "3px solid var(--accent-cooling)", marginTop: "0.65rem" }}>
        💡 <strong>Field Physics:</strong> {config.description}
      </div>
    </div>
  );
}
