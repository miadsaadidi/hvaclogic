"use client";

import React from "react";
import { KitchenHoodOutput } from "@/lib/math/kitchen-hood";

interface KitchenHoodVisualizerProps {
  output: KitchenHoodOutput;
  cooktopType: "gas" | "electric" | "induction";
  mountingType: "wall" | "island" | "under_cabinet";
}

export function KitchenHoodVisualizer({ output, cooktopType, mountingType }: KitchenHoodVisualizerProps) {
  const isMakeUpRequired = output.isMakeUpAirRequired;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #131b2e 50%, #070c18 100%)",
        border: "1px solid var(--border-color)",
        borderTop: isMakeUpRequired ? "3px solid var(--accent-danger)" : "3px solid var(--accent-cooling)",
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
      aria-label="Kitchen Range Hood Capture & Make-Up Air Diagram"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>🍳</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Thermal Plume Capture &amp; Ventilation Dynamics
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: isMakeUpRequired ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
            color: isMakeUpRequired ? "var(--accent-danger)" : "var(--accent-success)",
            border: "1px solid currentColor",
          }}
        >
          {isMakeUpRequired ? "⚠️ IRC M1503.6 Make-Up Air Required" : "✓ IRC M1503.6 Compliant (≤400 CFM)"}
        </span>
      </div>

      {/* SVG Kitchen Ventilation Schematic */}
      <div style={{ width: "100%", height: "175px", position: "relative" }}>
        <svg viewBox="0 0 500 175" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Range Hood Exhaust and Air Capture Vector Diagram">
          <defs>
            <linearGradient id="hoodSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="plumeGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Back Wall (if Wall mount) */}
          {mountingType !== "island" && (
            <line x1="120" y1="10" x2="120" y2="165" stroke="#334155" strokeWidth="3" strokeDasharray="4 2" />
          )}

          {/* 1. Range Hood Canopy (Top) */}
          <polygon points="140,55 360,55 330,15 170,15" fill="url(#hoodSteel)" stroke="var(--border-color)" strokeWidth="1.5" />
          <rect x="220" y="2" width="60" height="15" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <text x="250" y="12" fill="var(--ink)" fontSize="7" fontWeight="600" textAnchor="middle">
            Ø {output.recommendedDuctDiameterInches}&quot; DUCT
          </text>

          {/* Baffle Filters (Underside of Hood) */}
          <line x1="150" y1="53" x2="350" y2="53" stroke="#94a3b8" strokeWidth="3" />

          {/* Exhaust Discharge Arrow */}
          <line x1="250" y1="10" x2="250" y2="-5" stroke="#00d2ff" strokeWidth="2.5" />
          <polygon points="246,-5 250,-12 254,-5" fill="#00d2ff" />
          <text x="260" y="-3" fill="#00d2ff" fontSize="8" fontWeight="700">
            {output.recommendedCfm} CFM EXHAUST
          </text>

          {/* 2. Rising Thermal Convective Grease Plume */}
          <path
            d="M 180 140 Q 170 95 210 60 L 290 60 Q 330 95 320 140 Z"
            fill="url(#plumeGrad)"
          />

          {/* 3. Cooktop Surface (Bottom) */}
          <rect x="160" y="140" width="180" height="18" rx="2" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="250" y="152" fill="var(--ink)" fontSize="8.5" fontWeight="600" textAnchor="middle">
            {cooktopType === "gas" ? "🔥 GAS BURNER COOKTOP" : "⚡ INDUCTION / ELECTRIC"}
          </text>

          {/* 4. Fresh Make-Up Air Supply Vector (Right Side) */}
          {isMakeUpRequired ? (
            <g transform="translate(390, 40)">
              <rect x="0" y="0" width="90" height="75" rx="6" fill="rgba(239, 68, 68, 0.1)" stroke="var(--accent-danger)" strokeWidth="1.5" />
              <text x="45" y="18" fill="var(--accent-danger)" fontSize="8" fontWeight="700" textAnchor="middle">
                MAKE-UP AIR
              </text>
              <text x="45" y="30" fill="var(--accent-danger)" fontSize="7" fontWeight="600" textAnchor="middle">
                MOTORIZED DAMPER
              </text>
              <line x1="45" y1="40" x2="45" y2="60" stroke="var(--accent-danger)" strokeWidth="2" strokeDasharray="3 2" />
              <polygon points="41,58 45,66 49,58" fill="var(--accent-danger)" />
              <text x="45" y="70" fill="var(--ink-secondary)" fontSize="6.5" textAnchor="middle">
                +{output.makeUpAirCfmRequired} CFM INTAKE
              </text>
            </g>
          ) : (
            <g transform="translate(390, 50)">
              <rect x="0" y="0" width="90" height="55" rx="6" fill="rgba(16, 185, 129, 0.08)" stroke="var(--accent-success)" strokeWidth="1" />
              <text x="45" y="22" fill="var(--accent-success)" fontSize="8" fontWeight="700" textAnchor="middle">
                NATURAL INFILTRATION
              </text>
              <text x="45" y="35" fill="var(--text-muted)" fontSize="7" textAnchor="middle">
                ≤ 400 CFM No Damper
              </text>
              <text x="45" y="46" fill="var(--text-muted)" fontSize="6.5" textAnchor="middle">
                IRC Code Exempt
              </text>
            </g>
          )}

          {/* Hood Width Callout (Left) */}
          <text x="135" y="45" fill="var(--ink)" fontSize="8" fontWeight="600" textAnchor="end">
            {output.recommendedHoodWidthInches}&quot; Canopy
          </text>
        </svg>
      </div>

      {/* Code Notice Callout */}
      <div
        style={{
          fontSize: "0.75rem",
          color: isMakeUpRequired ? "#fca5a5" : "#cbd5e1",
          lineHeight: 1.45,
          background: isMakeUpRequired ? "rgba(239, 68, 68, 0.08)" : "rgba(255, 255, 255, 0.03)",
          padding: "0.55rem 0.75rem",
          borderRadius: "5px",
          borderLeft: isMakeUpRequired ? "3px solid var(--accent-danger)" : "3px solid var(--accent-cooling)",
          marginTop: "0.45rem",
        }}
      >
        {output.codeNotice}
      </div>
    </div>
  );
}
