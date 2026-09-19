"use client";

import React from "react";
import { AssemblyThermalOutput } from "@/lib/math/effective-r-value";

interface EffectiveRValueVisualizerProps {
  output: AssemblyThermalOutput;
}

export function EffectiveRValueVisualizer({ output }: EffectiveRValueVisualizerProps) {
  const isSteel = output.framingMaterial === "steel";
  const hasCi = output.continuousInsulationR > 0;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #151b2e 50%, #080c18 100%)",
        border: "1px solid var(--border-color)",
        borderTop: isSteel ? "4px solid #ef4444" : "4px solid #3b82f6",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 24px rgba(0, 0, 0, 0.4)",
        fontFamily: "var(--font-titillium), 'Titillium Web', sans-serif",
        color: "#f8fafc",
        margin: "1rem 0",
      }}
      role="region"
      aria-label="Wall Assembly Thermal Bridging Cross-Section"
    >
      {/* Visualizer Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.2rem" }}>📐</span>
          <div>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#93c5fd" }}>
              Assembly Thermal Heat Flux &amp; Framing Bridge Model
            </span>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
              {output.studDescription} • {output.calculationMethod}
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "0.25rem 0.65rem",
            borderRadius: "9999px",
            background: output.cavityDeratePercent > 40 ? "rgba(239, 68, 68, 0.2)" : "rgba(59, 130, 246, 0.2)",
            color: output.cavityDeratePercent > 40 ? "#fca5a5" : "#93c5fd",
            border: `1px solid ${output.cavityDeratePercent > 40 ? "rgba(239, 68, 68, 0.4)" : "rgba(59, 130, 246, 0.4)"}`,
          }}
        >
          {output.cavityDeratePercent > 0 ? `-${output.cavityDeratePercent}% Cavity Derating` : "100% Unbridged"}
        </span>
      </div>

      {/* Reactive SVG Wall Cross Section */}
      <div style={{ width: "100%", overflowX: "auto", margin: "0.5rem 0" }}>
        <svg
          viewBox="0 0 600 200"
          style={{ width: "100%", height: "auto", minWidth: "480px", borderRadius: "0.5rem", background: "#0b1329" }}
        >
          {/* Definitions */}
          <defs>
            <linearGradient id="heatFlowBridge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="heatFlowCavity" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
            <pattern id="insulationPattern" width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M0 6 Q3 0 6 6 T12 6" fill="none" stroke="#f472b6" strokeWidth="1.2" opacity="0.6" />
            </pattern>
          </defs>

          {/* Wall Layer Bands (Horizontal Cross-Section Plan View) */}
          {/* 1. Interior Drywall (top band) */}
          <rect x="20" y="20" width="560" height="14" fill="#cbd5e1" opacity="0.85" rx="2" />
          <text x="30" y="31" fill="#0f172a" fontSize="9" fontWeight="bold">1/2" Gypsum Board (Interior)</text>

          {/* 2. Stud & Cavity Matrix (middle band, y: 34 to 124) */}
          {/* Cavity Insulation Background */}
          <rect x="20" y="34" width="560" height="90" fill="#2d1b36" rx="2" />
          <rect x="20" y="34" width="560" height="90" fill="url(#insulationPattern)" rx="2" />

          {/* Stud 1 (Left Framing Member) */}
          <rect
            x="70"
            y="34"
            width={isSteel ? "16" : "28"}
            height="90"
            fill={isSteel ? "#94a3b8" : "#b45309"}
            stroke={isSteel ? "#cbd5e1" : "#78350f"}
            strokeWidth="1.5"
            rx="1"
          />
          {/* Stud 2 (Right Framing Member - spacing representation) */}
          <rect
            x={output.studSpacing === 16 ? "270" : "370"}
            y="34"
            width={isSteel ? "16" : "28"}
            height="90"
            fill={isSteel ? "#94a3b8" : "#b45309"}
            stroke={isSteel ? "#cbd5e1" : "#78350f"}
            strokeWidth="1.5"
            rx="1"
          />

          {/* Cavity Insulation Callout */}
          <text x="140" y="80" fill="#f472b6" fontSize="11" fontWeight="bold">
            Nominal R-{output.nominalCavityR} Cavity
          </text>
          <text x="140" y="95" fill="#e2e8f0" fontSize="10">
            Effective: R-{output.effectiveCavityR.toFixed(1)} ({isSteel ? "ASHRAE 90.1" : "Parallel-Path"})
          </text>

          {/* Thermal Bridge Arrows through Stud 1 */}
          <line x1="78" y1="36" x2="78" y2="122" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="3,3" />
          <polygon points="78,124 74,116 82,116" fill="#ef4444" />
          <text x="25" y="80" fill="#ef4444" fontSize="9" fontWeight="bold">
            {isSteel ? "THERMAL BRIDGE" : "WOOD STUD"}
          </text>

          {/* 3. Sheathing Layer (y: 124 to 134) */}
          <rect x="20" y="124" width="560" height="12" fill="#d97706" opacity="0.85" rx="1" />
          <text x="30" y="133" fill="#ffffff" fontSize="8" fontWeight="bold">7/16" OSB Sheathing</text>

          {/* 4. Continuous Exterior Insulation Layer (y: 136 to 160) */}
          {hasCi ? (
            <>
              <rect x="20" y="136" width="560" height="24" fill="#0284c7" opacity="0.75" rx="2" />
              <text x="30" y="152" fill="#ffffff" fontSize="10" fontWeight="bold">
                ✓ Continuous Exterior Insulation: R-{output.continuousInsulationR.toFixed(1)} ci (Thermal Break)
              </text>
            </>
          ) : (
            <>
              <rect x="20" y="136" width="560" height="12" fill="#334155" stroke="#ef4444" strokeDasharray="2,2" rx="1" />
              <text x="30" y="145" fill="#fca5a5" fontSize="8">
                ⚠️ No Continuous Insulation (Unmitigated Stud Flange Thermal Bridging)
              </text>
            </>
          )}

          {/* 5. Exterior Cladding (bottom band) */}
          <rect x="20" y={hasCi ? 162 : 150} width="560" height="14" fill="#475569" rx="1" />
          <text x="30" y={hasCi ? 172 : 160} fill="#f1f5f9" fontSize="8" fontWeight="bold">
            Exterior Cladding &amp; Air Film (Outdoor)
          </text>
        </svg>
      </div>

      {/* Numerical Performance Breakdown Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "0.75rem",
          marginTop: "0.75rem",
        }}
      >
        <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "0.6rem 0.8rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase" }}>Nominal Cavity</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc" }}>R-{output.nominalCavityR}</div>
          <div style={{ fontSize: "0.68rem", color: "#64748b" }}>Rated batt thickness</div>
        </div>

        <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "0.6rem 0.8rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase" }}>Effective Cavity</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: isSteel ? "#ef4444" : "#38bdf8" }}>
            R-{output.effectiveCavityR.toFixed(1)}
          </div>
          <div style={{ fontSize: "0.68rem", color: "#64748b" }}>Bridged thermal resistance</div>
        </div>

        <div style={{ background: "rgba(255, 255, 255, 0.04)", padding: "0.6rem 0.8rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase" }}>Continuous (ci)</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#34d399" }}>
            {output.continuousInsulationR > 0 ? `R-${output.continuousInsulationR.toFixed(1)}` : "R-0"}
          </div>
          <div style={{ fontSize: "0.68rem", color: "#64748b" }}>Exterior thermal break</div>
        </div>

        <div style={{ background: "rgba(59, 130, 246, 0.12)", padding: "0.6rem 0.8rem", borderRadius: "0.5rem", border: "1px solid rgba(59, 130, 246, 0.3)" }}>
          <div style={{ fontSize: "0.7rem", color: "#93c5fd", textTransform: "uppercase" }}>Total Assembly R</div>
          <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#60a5fa" }}>
            R-{output.totalAssemblyEffectiveR.toFixed(2)}
          </div>
          <div style={{ fontSize: "0.68rem", color: "#bfdbfe" }}>U = {output.totalAssemblyUFactor.toFixed(3)}</div>
        </div>
      </div>
    </div>
  );
}
