"use client";

import React from "react";
import { EquivalentLengthOutput } from "@/lib/math/equivalent-length";

interface EquivalentLengthVisualizerProps {
  output: EquivalentLengthOutput;
}

export function EquivalentLengthVisualizer({ output }: EquivalentLengthVisualizerProps) {
  const getStatusColor = () => {
    switch (output.statusBadgeColor) {
      case "emerald":
        return "#10b981";
      case "amber":
        return "#f59e0b";
      case "rose":
        return "#ef4444";
      case "blue":
        return "#3b82f6";
      default:
        return "#10b981";
    }
  };

  const statusColor = getStatusColor();
  const straightPct = Math.max(5, 100 - output.fittingRatioPercent);
  const fittingPct = Math.min(95, output.fittingRatioPercent);

  // Calculate position on 0.00 to 0.20 scale for the gauge needle
  const gaugePercent = Math.min(100, Math.max(0, (output.designFrictionRateFr / 0.20) * 100));

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #0d1a2d 50%, #071f30 100%)",
        border: "1px solid var(--border-color)",
        borderTop: `3px solid ${statusColor}`,
        borderRadius: "0.75rem",
        padding: "1.25rem",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 24px rgba(0, 0, 0, 0.4)",
        fontFamily: "var(--font-titillium), 'Titillium Web', sans-serif",
        color: "#f8fafc",
        position: "relative",
        overflow: "hidden",
        margin: "0.75rem 0",
      }}
      role="region"
      aria-label="ACCA Manual D Equivalent Length and TEL Visualizer"
    >
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.2rem" }}>📐 🌀</span>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f8fafc", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              ACCA Manual D Aerodynamic Friction Profile
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--ink-secondary)" }}>
              Critical Path: {output.straightLengthTotalFt} ft Straight Duct + {output.fittingLengthTotalFt} ft Fitting Drag
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              background: "rgba(59, 130, 246, 0.15)",
              color: "#60a5fa",
              border: "1px solid rgba(59, 130, 246, 0.3)",
            }}
          >
            TEL: {output.cumulativeTelFt} ft
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "0.2rem 0.6rem",
              borderRadius: "4px",
              background: `${statusColor}22`,
              color: statusColor,
              border: `1px solid ${statusColor}55`,
            }}
          >
            FR: {output.designFrictionRateFr.toFixed(3)}&quot; / 100&apos;
          </span>
        </div>
      </div>

      {/* Resistance Decomposition Bar */}
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "0.3rem", color: "var(--ink-secondary)" }}>
          <span>
            Straight Duct Friction: <strong style={{ color: "#93c5fd" }}>{output.straightLengthTotalFt} ft ({straightPct}%)</strong>
          </span>
          <span>
            Fitting Dynamic Turbulence: <strong style={{ color: "#fca5a5" }}>{output.fittingLengthTotalFt} ft ({fittingPct}%)</strong>
          </span>
        </div>
        <div
          style={{
            height: "14px",
            width: "100%",
            borderRadius: "7px",
            overflow: "hidden",
            display: "flex",
            background: "rgba(15, 23, 42, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              width: `${straightPct}%`,
              background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
              transition: "width 0.3s ease",
            }}
            title={`Straight duct: ${output.straightLengthTotalFt} ft`}
          />
          <div
            style={{
              width: `${fittingPct}%`,
              background: "linear-gradient(90deg, #f87171 0%, #ef4444 100%)",
              transition: "width 0.3s ease",
            }}
            title={`Fitting equivalent length: ${output.fittingLengthTotalFt} ft`}
          />
        </div>
      </div>

      {/* SVG System Schematic & Critical Path Diagram */}
      <div style={{ width: "100%", height: "140px", position: "relative" }}>
        <svg viewBox="0 0 500 140" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="ACCA Manual D Duct Run Schematic">
          <defs>
            <linearGradient id="supplyDuctGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="returnDuctGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
            <filter id="glowG" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#38bdf8" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Return Air Run Path (Left) */}
          <path
            d="M 40 40 L 140 40 L 140 90 L 200 90"
            fill="none"
            stroke="url(#returnDuctGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Return Grille */}
          <rect x="25" y="30" width="16" height="20" rx="3" fill="#14b8a6" stroke="#0f766e" strokeWidth="1.5" />
          <text x="33" y="24" fill="#5eead4" fontSize="9" fontWeight="600" textAnchor="middle">Return Grille</text>
          <text x="33" y="62" fill="#99f6e4" fontSize="8" textAnchor="middle">Grille Loss</text>

          {/* Return Drop Elbow */}
          <circle cx="140" cy="40" r="7" fill="#0d9488" stroke="#ffffff" strokeWidth="1.5" />
          <text x="140" y="24" fill="#99f6e4" fontSize="8" textAnchor="middle">Return Drop</text>

          {/* Central Equipment (Furnace / Air Handler / Blower) */}
          <rect x="200" y="65" width="80" height="55" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <text x="240" y="85" fill="#f8fafc" fontSize="10" fontWeight="700" textAnchor="middle">AIR HANDLER</text>
          <text x="240" y="98" fill="#94a3b8" fontSize="8" textAnchor="middle">ESP: {output.blowerTespInWg.toFixed(2)}&quot; w.g.</text>
          <text x="240" y="110" fill="#38bdf8" fontSize="8" fontWeight="600" textAnchor="middle">ASP: {output.availableStaticPressureAspInWg.toFixed(3)}&quot;</text>

          {/* Supply Air Run Path (Right) */}
          <path
            d="M 280 90 L 340 90 L 340 40 L 450 40"
            fill="none"
            stroke="url(#supplyDuctGrad)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Supply Starting Collar */}
          <circle cx="280" cy="90" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
          <text x="280" y="128" fill="#7dd3fc" fontSize="8" textAnchor="middle">Plenum Collar</text>

          {/* Supply Trunk Elbow / Transition */}
          <circle cx="340" cy="90" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="340" cy="40" r="7" fill="#0369a1" stroke="#ffffff" strokeWidth="1.5" />
          <text x="340" y="24" fill="#7dd3fc" fontSize="8" textAnchor="middle">Trunk Elbow</text>

          {/* Supply Register Boot (End) */}
          <rect x="450" y="30" width="18" height="20" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          <text x="459" y="24" fill="#bae6fd" fontSize="9" fontWeight="600" textAnchor="middle">Register</text>
          <text x="459" y="62" fill="#7dd3fc" fontSize="8" textAnchor="middle">Boot Loss</text>

          {/* Aerodynamic Flow Indicators */}
          <text x="90" y="34" fill="#14b8a6" fontSize="10">➔ ➔</text>
          <text x="395" y="34" fill="#38bdf8" fontSize="10">➔ ➔</text>

          {/* Supply & Return Subtotals */}
          <rect x="60" y="98" width="105" height="22" rx="4" fill="rgba(13, 148, 136, 0.2)" stroke="rgba(20, 184, 166, 0.4)" />
          <text x="112" y="113" fill="#5eead4" fontSize="9" fontWeight="600" textAnchor="middle">
            Return TEL: {output.totalReturnTelFt} ft
          </text>

          <rect x="340" y="98" width="105" height="22" rx="4" fill="rgba(2, 132, 199, 0.2)" stroke="rgba(56, 189, 248, 0.4)" />
          <text x="392" y="113" fill="#7dd3fc" fontSize="9" fontWeight="600" textAnchor="middle">
            Supply TEL: {output.totalSupplyTelFt} ft
          </text>
        </svg>
      </div>

      {/* Target Friction Rate Dial / Range Visualizer */}
      <div
        style={{
          marginTop: "0.75rem",
          background: "rgba(15, 23, 42, 0.6)",
          borderRadius: "0.5rem",
          padding: "0.6rem 0.8rem",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--ink-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            ACCA Manual D Friction Rate Target Scale (0.00 to 0.20 in. wg / 100 ft)
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: statusColor }}>
            {output.designFrictionRateFr.toFixed(3)}&quot; w.g. / 100&apos;
          </span>
        </div>

        {/* Multi-Zone Color Track */}
        <div style={{ position: "relative", height: "10px", borderRadius: "5px", overflow: "hidden", background: "#334155", display: "flex" }}>
          <div style={{ width: "25%", background: "#f59e0b" }} title="Low (<0.05)" />
          <div style={{ width: "35%", background: "#10b981" }} title="Optimal Target Range (0.06 - 0.12)" />
          <div style={{ width: "30%", background: "#f97316" }} title="Borderline High (0.12 - 0.18)" />
          <div style={{ width: "10%", background: "#ef4444" }} title="Critical High (>0.18)" />
        </div>

        {/* Needle Marker */}
        <div style={{ position: "relative", height: "12px", marginTop: "2px" }}>
          <div
            style={{
              position: "absolute",
              left: `${gaugePercent}%`,
              transform: "translateX(-50%)",
              width: "0",
              height: "0",
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderBottom: `6px solid ${statusColor}`,
              transition: "left 0.3s ease",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "var(--ink-secondary)", marginTop: "0.15rem" }}>
          <span>0.00 (Oversized)</span>
          <span style={{ color: "#34d399", fontWeight: 600 }}>0.06 - 0.12 (Optimal Target)</span>
          <span>0.15</span>
          <span>0.20+ (Choked / Noisy)</span>
        </div>
      </div>
    </div>
  );
}
