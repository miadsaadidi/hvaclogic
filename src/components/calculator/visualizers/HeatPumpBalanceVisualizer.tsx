"use client";

import React from "react";
import { HeatPumpOutput } from "@/lib/math/heat-pump";

interface HeatPumpBalanceVisualizerProps {
  output: HeatPumpOutput;
}

export function HeatPumpBalanceVisualizer({ output }: HeatPumpBalanceVisualizerProps) {
  // Chart dimensions & scaling
  const minTemp = -10;
  const maxTemp = 60;
  const maxBtu = Math.max(50000, Math.ceil(output.buildingHeatLossAtDesignBtu * 1.25 / 10000) * 10000);

  const getX = (t: number) => 45 + ((t - minTemp) / (maxTemp - minTemp)) * 410;
  const getY = (btu: number) => 140 - (Math.min(maxBtu, Math.max(0, btu)) / maxBtu) * 110;

  // Build SVG Path strings for Building Heat Loss and Heat Pump Capacity
  const heatLossPath = output.curvePoints
    .map((p, idx) => `${idx === 0 ? "M" : "L"} ${getX(p.outdoorTempF)} ${getY(p.buildingHeatLossBtu)}`)
    .join(" ");

  const heatPumpPath = output.curvePoints
    .map((p, idx) => `${idx === 0 ? "M" : "L"} ${getX(p.outdoorTempF)} ${getY(p.heatPumpCapacityBtu)}`)
    .join(" ");

  const balanceX = getX(output.thermalBalancePointF);
  const balanceLossY = getY(output.curvePoints.find((p) => Math.abs(p.outdoorTempF - output.thermalBalancePointF) <= 5)?.buildingHeatLossBtu || 25000);

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #14172a 50%, #080a14 100%)",
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
      aria-label="Heat Pump Thermal Balance Point Graph"
    >
      {/* Visualizer Top Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
          <span style={{ fontSize: "1.1rem" }}>📈</span>
          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Thermal Balance Point &amp; Inverter Derate Curves
          </span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: "rgba(245, 158, 11, 0.15)",
            color: "#f59e0b",
            border: "1px solid currentColor",
          }}
        >
          📍 {output.thermalBalancePointF}&deg;F Balance Point
        </span>
      </div>

      {/* SVG Performance Intersection Chart */}
      <div style={{ width: "100%", height: "175px", position: "relative" }}>
        <svg viewBox="0 0 480 175" style={{ width: "100%", height: "100%", overflow: "visible" }} aria-label="Thermal Balance Point Curve Plot">
          {/* Grid lines */}
          <line x1="45" y1="30" x2="455" y2="30" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="45" y1="85" x2="455" y2="85" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="45" y1="140" x2="455" y2="140" stroke="#334155" strokeWidth="1.5" />

          {/* Axes */}
          <line x1="45" y1="20" x2="45" y2="140" stroke="#334155" strokeWidth="1.5" />

          {/* Y-Axis Labels (BTU/hr) */}
          <text x="40" y="33" fill="#64748b" fontSize="7.5" textAnchor="end">{maxBtu / 1000}k</text>
          <text x="40" y="88" fill="#64748b" fontSize="7.5" textAnchor="end">{(maxBtu / 2) / 1000}k</text>
          <text x="40" y="143" fill="#64748b" fontSize="7.5" textAnchor="end">0</text>

          {/* X-Axis Temperature Labels */}
          {[-10, 0, 10, 20, 30, 40, 50, 60].map((t) => (
            <text key={t} x={getX(t)} y="153" fill="#64748b" fontSize="7.5" textAnchor="middle">
              {t}&deg;F
            </text>
          ))}

          {/* 1. Red Line: Building Heat Loss Slope */}
          <path d={heatLossPath} fill="none" stroke="#ef4444" strokeWidth="2.5" />

          {/* 2. Cyan Line: Heat Pump Heating Output */}
          <path d={heatPumpPath} fill="none" stroke="#00d2ff" strokeWidth="2.5" />

          {/* Thermal Balance Point Intersection Marker */}
          <circle cx={balanceX} cy={balanceLossY} r="5" fill="#f59e0b" stroke="#000" strokeWidth="1.5" />
          <line x1={balanceX} y1={balanceLossY} x2={balanceX} y2="140" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />

          {/* Annotation Label */}
          <text x={Math.min(400, balanceX + 8)} y={Math.max(35, balanceLossY - 5)} fill="#f59e0b" fontSize="8.5" fontWeight="700">
            {output.thermalBalancePointF}&deg;F Balance
          </text>
        </svg>
      </div>

      {/* Chart Legend & Summary */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem", flexWrap: "wrap", gap: "0.4rem" }}>
        <div style={{ display: "flex", gap: "0.85rem", fontSize: "0.72rem" }}>
          <span style={{ color: "#ef4444", fontWeight: 600 }}>━ Building Heat Loss</span>
          <span style={{ color: "#00d2ff", fontWeight: 600 }}>━ Heat Pump Output</span>
          <span style={{ color: "#f59e0b", fontWeight: 600 }}>● Balance Point</span>
        </div>
        <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
          Auxiliary Heat Deficit: <strong style={{ color: output.auxiliaryHeatDeficitBtu > 0 ? "#ef4444" : "var(--accent-success)" }}>{output.auxiliaryHeatDeficitBtu.toLocaleString()} BTU</strong>
        </div>
      </div>
    </div>
  );
}
