"use client";

import React from "react";

interface RefrigerantCircuitVisualizerProps {
  refrigerant: string;
  meteringDevice: string;
  suctionPressure: number;
  suctionTemp: number;
  suctionSatTemp: number;
  superheat: number;
  liquidPressure: number;
  liquidTemp: number;
  liquidSatTemp: number;
  subcooling: number;
  statusBadgeColor?: "success" | "warning" | "danger" | "info";
  diagnosticSummary?: string;
}

export function RefrigerantCircuitVisualizer({
  refrigerant,
  meteringDevice,
  suctionPressure,
  suctionTemp,
  suctionSatTemp,
  superheat,
  liquidPressure,
  liquidTemp,
  liquidSatTemp,
  subcooling,
  statusBadgeColor = "info",
  diagnosticSummary,
}: RefrigerantCircuitVisualizerProps) {
  const isA2L = refrigerant === "r454b" || refrigerant === "r32";
  const accentColor =
    statusBadgeColor === "success"
      ? "#10b981"
      : statusBadgeColor === "warning"
      ? "#f59e0b"
      : statusBadgeColor === "danger"
      ? "#ef4444"
      : "#00d2ff";

  return (
    <div
      className="visual-schema-card"
      style={{
        background: "var(--bg-primary)",
        border: "1px solid var(--border-color)",
        borderRadius: "0.75rem",
        padding: "1.25rem",
        marginTop: "1.25rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.1rem" }}>🔄</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Refrigeration Circuit Schematic
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "0.15rem 0.5rem",
              borderRadius: "4px",
              background: isA2L ? "rgba(245, 158, 11, 0.15)" : "rgba(0, 210, 255, 0.12)",
              color: isA2L ? "#f59e0b" : "var(--accent-cooling)",
              border: `1px solid ${isA2L ? "#f59e0b" : "rgba(0, 210, 255, 0.3)"}`,
              textTransform: "uppercase",
            }}
          >
            {refrigerant.toUpperCase()}
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "0.15rem 0.5rem",
              borderRadius: "4px",
              background: "var(--surface)",
              color: "var(--ink-secondary)",
              border: "1px solid var(--border-subtle)",
              textTransform: "uppercase",
            }}
          >
            {meteringDevice === "txv" ? "TXV / EEV" : "Fixed Piston"}
          </span>
        </div>
      </div>

      {/* SVG Interactive Circuit Layout */}
      <div style={{ position: "relative", width: "100%", height: "220px" }}>
        <svg
          viewBox="0 0 500 220"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
          aria-label="Vapor Compression Refrigeration Cycle Diagram"
        >
          <defs>
            <linearGradient id="highPressureVapor" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="highPressureLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="lowPressureMix" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="lowPressureVapor" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#00d2ff" />
            </linearGradient>
          </defs>

          {/* Circuit Pipe Lines */}
          {/* Top Line: Compressor to Condenser (Hot Gas Discharge) */}
          <line x1="120" y1="50" x2="380" y2="50" stroke="url(#highPressureVapor)" strokeWidth="4" strokeDasharray="6 3" />
          {/* Right Line: Condenser to Metering Device (Liquid Line) */}
          <line x1="380" y1="50" x2="380" y2="170" stroke="url(#highPressureLiquid)" strokeWidth="4" />
          {/* Bottom Line: Metering Device to Evaporator (Expansion) */}
          <line x1="380" y1="170" x2="120" y2="170" stroke="url(#lowPressureMix)" strokeWidth="4" strokeDasharray="6 3" />
          {/* Left Line: Evaporator to Compressor (Suction Line) */}
          <line x1="120" y1="170" x2="120" y2="50" stroke="url(#lowPressureVapor)" strokeWidth="4" />

          {/* 1. COMPRESSOR (Top Left) */}
          <rect x="70" y="25" width="80" height="50" rx="8" fill="var(--surface)" stroke="#ef4444" strokeWidth="2" />
          <text x="110" y="47" fill="var(--ink)" fontSize="11" fontWeight="700" textAnchor="middle">COMPRESSOR</text>
          <text x="110" y="62" fill="#ef4444" fontSize="9" fontWeight="600" textAnchor="middle">Vapor Pump</text>

          {/* 2. CONDENSER COIL (Top Right) */}
          <rect x="340" y="25" width="90" height="50" rx="8" fill="var(--surface)" stroke="#f97316" strokeWidth="2" />
          <text x="385" y="47" fill="var(--ink)" fontSize="11" fontWeight="700" textAnchor="middle">CONDENSER</text>
          <text x="385" y="62" fill="#f97316" fontSize="9" fontWeight="600" textAnchor="middle">Heat Rejection</text>

          {/* 3. METERING DEVICE (Bottom Right) */}
          <rect x="340" y="145" width="90" height="50" rx="8" fill="var(--surface)" stroke="#eab308" strokeWidth="2" />
          <text x="385" y="167" fill="var(--ink)" fontSize="11" fontWeight="700" textAnchor="middle">
            {meteringDevice === "txv" ? "TXV VALVE" : "ORIFICE"}
          </text>
          <text x="385" y="182" fill="#eab308" fontSize="9" fontWeight="600" textAnchor="middle">Pressure Drop</text>

          {/* 4. EVAPORATOR COIL (Bottom Left) */}
          <rect x="70" y="145" width="90" height="50" rx="8" fill="var(--surface)" stroke="#00d2ff" strokeWidth="2" />
          <text x="115" y="167" fill="var(--ink)" fontSize="11" fontWeight="700" textAnchor="middle">EVAPORATOR</text>
          <text x="115" y="182" fill="#00d2ff" fontSize="9" fontWeight="600" textAnchor="middle">Heat Absorption</text>

          {/* SENSOR ANNOTATION: SUCTION LINE (Left side) */}
          <circle cx="120" cy="110" r="5" fill="#00d2ff" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="10" y="96" width="95" height="28" rx="4" fill="rgba(0, 210, 255, 0.1)" stroke="#00d2ff" strokeWidth="1" />
          <text x="57" y="108" fill="var(--ink)" fontSize="9" fontWeight="700" textAnchor="middle">
            SH: {superheat.toFixed(1)}°F
          </text>
          <text x="57" y="119" fill="var(--text-muted)" fontSize="8" textAnchor="middle">
            {suctionPressure} psig ({suctionSatTemp.toFixed(1)}°F)
          </text>

          {/* SENSOR ANNOTATION: LIQUID LINE (Right side) */}
          <circle cx="380" cy="110" r="5" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
          <rect x="395" y="96" width="95" height="28" rx="4" fill="rgba(249, 115, 22, 0.1)" stroke="#f97316" strokeWidth="1" />
          <text x="442" y="108" fill="var(--ink)" fontSize="9" fontWeight="700" textAnchor="middle">
            SC: {subcooling.toFixed(1)}°F
          </text>
          <text x="442" y="119" fill="var(--text-muted)" fontSize="8" textAnchor="middle">
            {liquidPressure} psig ({liquidSatTemp.toFixed(1)}°F)
          </text>
        </svg>
      </div>

      {/* Live Thermodynamic State Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.75rem",
          marginTop: "0.75rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--border-subtle)",
          fontSize: "0.78rem",
        }}
      >
        <div style={{ background: "var(--surface)", padding: "0.65rem", borderRadius: "0.45rem", borderLeft: "3px solid #00d2ff" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" }}>Low-Side (Suction)</div>
          <div style={{ color: "var(--ink)", fontWeight: 600 }}>Pipe: {suctionTemp}°F | Sat: {suctionSatTemp.toFixed(1)}°F</div>
          <div style={{ color: "var(--accent-cooling)", fontWeight: 700 }}>Superheat: {superheat.toFixed(1)}°F</div>
        </div>

        <div style={{ background: "var(--surface)", padding: "0.65rem", borderRadius: "0.45rem", borderLeft: "3px solid #f97316" }}>
          <div style={{ color: "var(--text-muted)", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" }}>High-Side (Liquid)</div>
          <div style={{ color: "var(--ink)", fontWeight: 600 }}>Pipe: {liquidTemp}°F | Sat: {liquidSatTemp.toFixed(1)}°F</div>
          <div style={{ color: "#f97316", fontWeight: 700 }}>Subcooling: {subcooling.toFixed(1)}°F</div>
        </div>
      </div>
    </div>
  );
}
