"use client";

import React from "react";
import { ExpansionTankOutput } from "@/lib/math/expansion-tank";

interface ExpansionTankVisualizerProps {
  output: ExpansionTankOutput;
}

export function ExpansionTankVisualizer({ output }: ExpansionTankVisualizerProps) {
  // Acceptance ratio determines how much of the tank shell is filled with expanded liquid at peak temp
  // Clamp between 10% and 85% for realistic diagram rendering
  const fillPercentage = Math.min(85, Math.max(12, output.acceptanceRatio * 100));
  const airCushionPercentage = 100 - fillPercentage;

  // Pressure gauge percentage: P1 and P2 mapped to 0 -> Prelief scale
  const p1GaugePct = Math.min(100, Math.max(0, (output.initialPressurePsig / output.reliefValvePressurePsig) * 100));
  const p2GaugePct = Math.min(100, Math.max(0, (output.maxOperatingPressurePsig / output.reliefValvePressurePsig) * 100));

  // Determine status color based on acceptance ratio and warnings
  const isOptimal = output.acceptanceRatio >= 0.30 && output.acceptanceRatio <= 0.60;
  const isNarrow = output.acceptanceRatio < 0.25;
  const statusColor = isNarrow ? "#f59e0b" : isOptimal ? "#10b981" : "#38bdf8";

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
      aria-label="ASME Section VIII Expansion Tank Visualizer"
    >
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.85rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.2rem" }}>🛢️ ⚡</span>
          <div>
            <div
              style={{
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#f8fafc",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              ASME BPVC Section VIII Tank Profile
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--ink-secondary)" }}>
              Minimum Volume: {output.totalTankVolumeGallons} Gal | Commercial: {output.recommendedCommercialTankSizeGallons} Gal
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
              background: "rgba(56, 189, 248, 0.15)",
              color: "#38bdf8",
              border: "1px solid rgba(56, 189, 248, 0.3)",
            }}
          >
            Acceptance: {output.acceptanceVolumeGallons} Gal ({Math.round(output.acceptanceRatio * 100)}%)
          </span>
          {output.glycolSizingPenaltyPercent > 0 && (
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
                background: "rgba(245, 158, 11, 0.15)",
                color: "#fbbf24",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              Glycol Derate: +{output.glycolSizingPenaltyPercent}%
            </span>
          )}
        </div>
      </div>

      {/* Main SVG Schematic */}
      <div style={{ width: "100%", height: "170px", position: "relative" }}>
        <svg
          viewBox="0 0 520 170"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
          aria-label="Diaphragm Expansion Tank Cross-Section and Pressure Schedule"
        >
          <defs>
            <linearGradient id="tankShellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="fluidExpansionGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            <linearGradient id="airCushionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* Hydronic Return Pipe to Tank Connection */}
          <rect x="25" y="80" width="60" height="12" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
          <text x="55" y="72" fill="#93c5fd" fontSize="8" fontWeight="600" textAnchor="middle">
            From Hydronic Loop
          </text>
          <text x="55" y="105" fill="#64748b" fontSize="7.5" textAnchor="middle">
            P1 = {output.initialPressurePsig} psig
          </text>

          {/* ASME Tank Vessel Shell (Cylindrical with domed heads) */}
          {/* Outer Shell */}
          <rect
            x="85"
            y="20"
            width="140"
            height="130"
            rx="25"
            fill="url(#tankShellGrad)"
            stroke="#64748b"
            strokeWidth="2.5"
          />

          {/* Compressed Air/Nitrogen Cushion Zone (Top) */}
          <rect
            x="90"
            y="25"
            width="130"
            height={Math.max(20, 120 * (airCushionPercentage / 100))}
            rx="20"
            fill="url(#airCushionGrad)"
            opacity="0.85"
          />
          <text
            x="155"
            y={Math.max(45, 35 + (120 * (airCushionPercentage / 100)) / 2)}
            fill="#e2e8f0"
            fontSize="8.5"
            fontWeight="700"
            textAnchor="middle"
          >
            N2 / Air Cushion
          </text>
          <text
            x="155"
            y={Math.max(58, 48 + (120 * (airCushionPercentage / 100)) / 2)}
            fill="#94a3b8"
            fontSize="7.5"
            textAnchor="middle"
          >
            Precharge: {output.initialPressurePsig} psig
          </text>

          {/* Diaphragm Flexible Membrane Divider Line */}
          <path
            d={`M 90 ${25 + 120 * (airCushionPercentage / 100)} Q 155 ${25 + 120 * (airCushionPercentage / 100) + 12} 220 ${25 + 120 * (airCushionPercentage / 100)}`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeDasharray="4 2"
          />

          {/* Expanded Fluid Acceptance Zone (Bottom) */}
          <rect
            x="90"
            y={25 + 120 * (airCushionPercentage / 100)}
            width="130"
            height={Math.max(15, 120 * (fillPercentage / 100))}
            rx="18"
            fill="url(#fluidExpansionGrad)"
            opacity="0.9"
          />
          <text
            x="155"
            y={Math.min(145, 25 + 120 * (airCushionPercentage / 100) + (120 * (fillPercentage / 100)) / 2 + 3)}
            fill="#ffffff"
            fontSize="9"
            fontWeight="700"
            textAnchor="middle"
          >
            Vacc: {output.acceptanceVolumeGallons} Gal
          </text>

          {/* ASME Stamp Badge on Tank Shell */}
          <circle cx="102" cy="38" r="8" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1" />
          <text x="102" y="41" fill="#f8fafc" fontSize="7" fontWeight="700" textAnchor="middle">
            ASME
          </text>

          {/* System Thermodynamics & Pressure Schedule Cards (Right Side) */}
          {/* Card 1: Pressure Relationship */}
          <rect
            x="245"
            y="20"
            width="265"
            height="55"
            rx="6"
            fill="rgba(15, 23, 42, 0.75)"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <text x="255" y="36" fill="#94a3b8" fontSize="8" fontWeight="700" style={{ textTransform: "uppercase" }}>
            ASME Pressure Limits (P1 ➔ P2 ➔ Relief)
          </text>
          <text x="255" y="52" fill="#f8fafc" fontSize="9.5" fontWeight="600">
            P1: <tspan fill="#38bdf8">{output.initialPressurePsig} psig</tspan> | P2:{" "}
            <tspan fill="#34d399">{output.maxOperatingPressurePsig} psig</tspan> | Relief:{" "}
            <tspan fill="#f87171">{output.reliefValvePressurePsig} psig</tspan>
          </text>
          <text x="255" y="66" fill="#64748b" fontSize="8">
            Safety Margin: {output.safetyMarginPsi} psi below relief valve setpoint
          </text>

          {/* Card 2: Fluid Expansion Physics */}
          <rect
            x="245"
            y="85"
            width="265"
            height="65"
            rx="6"
            fill="rgba(15, 23, 42, 0.75)"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <text x="255" y="101" fill="#94a3b8" fontSize="8" fontWeight="700" style={{ textTransform: "uppercase" }}>
            Specific Volume & Thermal Expansion (ASHRAE Ch. 15)
          </text>
          <text x="255" y="117" fill="#f8fafc" fontSize="9.5" fontWeight="600">
            ΔV Fluid: <tspan fill="#38bdf8">+{output.netFluidVolumetricExpansionPercent}%</tspan> | Pipe Expansion:{" "}
            <tspan fill="#cbd5e1">{output.pipingVolumetricExpansionGallons} gal</tspan>
          </text>
          <text x="255" y="131" fill="#94a3b8" fontSize="8">
            v1 ({output.initialFillTempF}°F): {output.initialSpecificVolumeCuFtPerLb.toFixed(5)} ➔ v2 ({output.maxOperatingTempF}°F):{" "}
            {output.maxSpecificVolumeCuFtPerLb.toFixed(5)} ft³/lb
          </text>
          <text x="255" y="143" fill="#64748b" fontSize="7.5">
            Fluid: {output.fluidType.replace(/_/g, " ").toUpperCase()}
          </text>
        </svg>
      </div>

      {/* Pressure Schedule Scale Track */}
      <div
        style={{
          marginTop: "0.5rem",
          background: "rgba(15, 23, 42, 0.6)",
          borderRadius: "0.5rem",
          padding: "0.6rem 0.8rem",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
          <span style={{ fontSize: "0.72rem", color: "var(--ink-secondary)", textTransform: "uppercase", letterSpacing: "0.03em" }}>
            Operating Pressure Spectrum (0 to {output.reliefValvePressurePsig} psig Relief Setpoint)
          </span>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: statusColor }}>
            Acceptance Ratio Ar = {output.acceptanceRatio.toFixed(3)}
          </span>
        </div>

        {/* Multi-Zone Pressure Gauge */}
        <div style={{ position: "relative", height: "10px", borderRadius: "5px", overflow: "hidden", background: "#334155", display: "flex" }}>
          <div style={{ width: `${p1GaugePct}%`, background: "#38bdf8" }} title="Fill Precharge (P1)" />
          <div style={{ width: `${p2GaugePct - p1GaugePct}%`, background: "#10b981" }} title="Operating Range (P1 to P2)" />
          <div style={{ width: `${100 - p2GaugePct}%`, background: "#ef4444" }} title="Safety Relief Zone" />
        </div>

        {/* Legend */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
          <span>0 psig</span>
          <span style={{ color: "#38bdf8", fontWeight: 600 }}>P1: {output.initialPressurePsig} psig (Fill)</span>
          <span style={{ color: "#34d399", fontWeight: 600 }}>P2: {output.maxOperatingPressurePsig} psig (Peak)</span>
          <span style={{ color: "#f87171", fontWeight: 600 }}>Relief: {output.reliefValvePressurePsig} psig</span>
        </div>
      </div>
    </div>
  );
}
