"use client";

import React from "react";
import { BoilerSizingOutput } from "@/lib/math/boiler";

interface HydronicBoilerVisualizerProps {
  output: BoilerSizingOutput;
}

export function HydronicBoilerVisualizer({ output }: HydronicBoilerVisualizerProps) {
  const isCondensing = output.isCondensingEligible;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #151b2e 50%, #080c18 100%)",
        border: "1px solid var(--border-color)",
        borderTop: isCondensing ? "3px solid var(--accent-success)" : "3px solid var(--accent-heating)",
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
      aria-label="Hydronic Loop and Boiler System Schematic"
    >
      {/* Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>🔥 💧</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Hydronic Heating Loop &amp; Boiler Schematic
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: isCondensing ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 107, 0, 0.15)",
            color: isCondensing ? "var(--accent-success)" : "var(--accent-heating)",
            border: "1px solid currentColor",
          }}
        >
          {output.boilerAfuePercent}% AFUE &bull; {output.heatingMedium === "steam" ? "Low-Pressure Steam" : "Hot Water"}
        </span>
      </div>

      {/* SVG Hydronic Circuit Diagram */}
      <div style={{ width: "100%", height: "165px", position: "relative" }}>
        <svg viewBox="0 0 480 165" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Boiler Loop Diagram">
          {/* BOILER UNIT (Left) */}
          <rect x="35" y="30" width="95" height="110" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <rect x="45" y="40" width="75" height="25" rx="3" fill="#0f172a" stroke="#334155" strokeWidth="1" />
          <text x="82" y="56" fill="#38bdf8" fontSize="8.5" fontWeight="700" textAnchor="middle">
            {output.recommendedBoilerInputBtu.toLocaleString()} BTU
          </text>
          <text x="82" y="90" fill="var(--ink)" fontSize="8" fontWeight="600" textAnchor="middle">
            {isCondensing ? "Mod-Con Boiler" : "Hydronic Boiler"}
          </text>

          {/* Burner Flame Inside Boiler */}
          <circle cx="82" cy="118" r="9" fill="rgba(239, 68, 68, 0.3)" />
          <text x="82" y="121" fill="#ff6b00" fontSize="11" textAnchor="middle">🔥</text>

          {/* HOT WATER SUPPLY PIPE (Red, Top) */}
          <path d="M 130 50 L 330 50" fill="none" stroke="#ef4444" strokeWidth="3.5" />
          <polygon points="230,46 240,50 230,54" fill="#ef4444" />
          <text x="230" y="42" fill="#ef4444" fontSize="7.5" fontWeight="700" textAnchor="middle">
            SUPPLY LOOP ({output.connectedEmitterLoadBtu.toLocaleString()} BTU Net)
          </text>

          {/* EXPANSION TANK & AIR SEPARATOR (Top Middle) */}
          <circle cx="210" cy="20" r="10" fill="#334155" stroke="#64748b" strokeWidth="1" />
          <line x1="210" y1="30" x2="210" y2="50" stroke="#64748b" strokeWidth="1.5" />
          <text x="210" y="8" fill="#94a3b8" fontSize="6.5" fontWeight="600" textAnchor="middle">EXP TANK</text>

          {/* HEAT EMITTER: BASEBOARD OR RADIATOR (Right) */}
          <rect x="330" y="35" width="115" height="40" rx="4" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="387" y="52" fill="#38bdf8" fontSize="8" fontWeight="700" textAnchor="middle">
            {output.mode === "baseboard" ? "Fin-Tube Baseboards" : output.mode === "radiator_edr" ? "Cast-Iron Radiators" : "Heating Zones"}
          </text>
          <text x="387" y="66" fill="var(--ink-secondary)" fontSize="7" fontWeight="600" textAnchor="middle">
            Heat Dissipation Emitters
          </text>

          {/* RETURN WATER PIPE (Blue, Bottom) */}
          <path d="M 387 75 L 387 125 L 130 125" fill="none" stroke="#00d2ff" strokeWidth="3.5" />
          <polygon points="260,121 250,125 260,129" fill="#00d2ff" />
          <text x="255" y="140" fill="#00d2ff" fontSize="7.5" fontWeight="700" textAnchor="middle">
            RETURN LOOP
          </text>

          {/* CIRCULATOR PUMP (Bottom Pipe) */}
          <circle cx="180" cy="125" r="10" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
          <text x="180" y="128" fill="#000" fontSize="8" fontWeight="700" textAnchor="middle">P</text>
          <text x="180" y="110" fill="#10b981" fontSize="6.5" fontWeight="700" textAnchor="middle">CIRCULATOR</text>
        </svg>
      </div>

      {/* Summary Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.4rem", fontSize: "0.72rem" }}>
        <span style={{ color: "var(--ink-secondary)" }}>
          DOE Heating Capacity: <strong style={{ color: "var(--ink)" }}>{output.grossDoeCapacityBtu.toLocaleString()} BTU/hr</strong>
        </span>
        <span style={{ color: "var(--ink-secondary)" }}>
          I=B=R Piping &amp; Pickup: <strong style={{ color: "var(--accent-cooling)" }}>{output.pipingAndPickupFactor}x Factor</strong>
        </span>
      </div>
    </div>
  );
}
