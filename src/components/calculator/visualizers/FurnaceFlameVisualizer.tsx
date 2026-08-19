"use client";

import React from "react";
import { FurnaceBtuOutput } from "@/lib/math/furnace-btu";

interface FurnaceFlameVisualizerProps {
  output: FurnaceBtuOutput;
}

export function FurnaceFlameVisualizer({ output }: FurnaceFlameVisualizerProps) {
  const isCondensing = output.afueRatingPercent >= 90;
  const flueLossPercent = 100 - output.afueRatingPercent;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #15101f 50%, #0c0814 100%)",
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
      aria-label="Gas Furnace Combustion & Heat Exchanger Diagram"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>🔥</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Combustion &amp; Heat Exchanger Thermodynamics
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: isCondensing ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
            color: isCondensing ? "var(--accent-success)" : "#f59e0b",
            border: "1px solid currentColor",
          }}
        >
          {output.afueRatingPercent}% AFUE ({isCondensing ? "Condensing High Efficiency" : "Standard Efficiency"})
        </span>
      </div>

      {/* SVG Furnace Cross-Section */}
      <div style={{ width: "100%", height: "165px", position: "relative" }}>
        <svg viewBox="0 0 500 165" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Gas Furnace Thermal Flow Schematic">
          <defs>
            <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="70%" stopColor="#ff6b4a" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="warmAirGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ff6b4a" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Furnace Outer Cabinet Chassis */}
          <rect x="30" y="10" width="440" height="145" rx="8" fill="rgba(26, 34, 52, 0.6)" stroke="var(--border-color)" strokeWidth="1.5" />

          {/* Airflow Flow Through Cabinet (Bottom to Top) */}
          <path d="M 40 145 L 40 10 L 460 10 L 460 145 Z" fill="url(#warmAirGrad)" />

          {/* 1. Blower Compartment (Left) */}
          <circle cx="80" cy="85" r="28" fill="var(--surface)" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 68 85 L 92 85 M 80 73 L 80 97" stroke="#38bdf8" strokeWidth="2" />
          <text x="80" y="125" fill="#38bdf8" fontSize="8.5" fontWeight="600" textAnchor="middle">
            BLOWER FAN
          </text>
          <text x="80" y="136" fill="var(--text-muted)" fontSize="7.5" textAnchor="middle">
            {output.requiredHeatingCfm} CFM
          </text>

          {/* 2. Gas Burner Manifold & Inshot Burners */}
          <rect x="150" y="65" width="20" height="40" rx="3" fill="#475569" />
          {/* Flame Cones */}
          <polygon points="170,75 195,70 170,85" fill="url(#flameGrad)" />
          <polygon points="170,85 200,85 170,95" fill="url(#flameGrad)" />
          <text x="160" y="125" fill="var(--accent-heating)" fontSize="8.5" fontWeight="600" textAnchor="middle">
            BURNERS
          </text>
          <text x="160" y="136" fill="var(--text-muted)" fontSize="7.5" textAnchor="middle">
            {output.requiredInputBtu.toLocaleString()} Input
          </text>

          {/* 3. Primary Heat Exchanger S-Curves */}
          <path
            d="M 200 75 Q 240 50 280 75 T 360 75"
            fill="none"
            stroke="#ff6b4a"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 200 90 Q 240 115 280 90 T 360 90"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <text x="280" y="45" fill="var(--ink)" fontSize="9" fontWeight="700" textAnchor="middle">
            PRIMARY HEAT EXCHANGER
          </text>
          <text x="280" y="118" fill="var(--accent-heating)" fontSize="10" fontWeight="700" textAnchor="middle">
            {output.requiredOutputBtu.toLocaleString()} Output BTU
          </text>

          {/* 4. Flue Vent Pipe (Right) */}
          <rect x="390" y="25" width="45" height="70" rx="4" fill={isCondensing ? "#f8fafc" : "#64748b"} stroke="var(--border-color)" strokeWidth="1" />
          <text x="412" y="55" fill={isCondensing ? "#000" : "#fff"} fontSize="8" fontWeight="700" textAnchor="middle">
            {isCondensing ? "PVC" : "B-VENT"}
          </text>
          <text x="412" y="68" fill={isCondensing ? "#0284c7" : "#cbd5e1"} fontSize="7" fontWeight="600" textAnchor="middle">
            EXHAUST
          </text>
          <text x="412" y="125" fill="#94a3b8" fontSize="8.5" fontWeight="600" textAnchor="middle">
            FLUE LOSS
          </text>
          <text x="412" y="136" fill="var(--text-muted)" fontSize="7.5" textAnchor="middle">
            {flueLossPercent}% Loss
          </text>
        </svg>
      </div>

      {/* Energy Efficiency Balance Bar */}
      <div style={{ marginTop: "0.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", marginBottom: "0.25rem" }}>
          <span style={{ color: "var(--accent-heating)", fontWeight: 600 }}>
            Delivered Heat: {output.afueRatingPercent}% ({output.requiredOutputBtu.toLocaleString()} BTU/hr)
          </span>
          <span style={{ color: "#94a3b8", fontWeight: 600 }}>
            Flue Exhaust Loss: {flueLossPercent}% ({Math.round(output.requiredInputBtu * (flueLossPercent / 100)).toLocaleString()} BTU)
          </span>
        </div>

        <div style={{ width: "100%", height: "8px", background: "rgba(0,0,0,0.4)", borderRadius: "9999px", overflow: "hidden", display: "flex", border: "1px solid var(--border-color)" }}>
          <div style={{ width: `${output.afueRatingPercent}%`, background: "linear-gradient(90deg, #ff6b4a, #f59e0b)", borderRadius: "9999px 0 0 9999px" }} />
          <div style={{ width: `${flueLossPercent}%`, background: "#475569" }} />
        </div>
      </div>
    </div>
  );
}
