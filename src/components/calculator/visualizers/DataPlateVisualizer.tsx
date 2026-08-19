"use client";

import React from "react";
import { DecodedAcModelOutput } from "@/lib/math/ac-model-decoder";

interface DataPlateVisualizerProps {
  decoded: DecodedAcModelOutput;
}

export function DataPlateVisualizer({ decoded }: DataPlateVisualizerProps) {
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
      aria-label="HVAC Rating Plate Visualizer"
    >
      {/* Top Screws Graphic */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem", opacity: 0.6 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#475569", border: "1px solid #64748b" }} />
        <div style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8" }}>
          UNITARY AIR CONDITIONER / HEAT PUMP SPECIFICATION PLATE
        </div>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#475569", border: "1px solid #64748b" }} />
      </div>

      {/* Brand Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "0.5rem", marginBottom: "0.65rem" }}>
        <div>
          <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Manufacturer: </span>
          <strong style={{ fontSize: "0.95rem", color: "var(--accent-cooling)", fontWeight: 700 }}>{decoded.brand}</strong>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
            background: decoded.confidence === "high" ? "rgba(16, 185, 129, 0.15)" : "rgba(234, 179, 8, 0.15)",
            color: decoded.confidence === "high" ? "var(--accent-success)" : "var(--accent-warning)",
            border: `1px solid ${decoded.confidence === "high" ? "rgba(16, 185, 129, 0.3)" : "rgba(234, 179, 8, 0.3)"}`,
          }}
        >
          {decoded.confidence === "high" ? "✓ Verified Nomenclature" : "⚡ Heuristic Match"}
        </span>
      </div>

      {/* Model & Serial Number Display */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", marginBottom: "0.65rem" }}>
        {/* Model Number */}
        <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.5rem 0.65rem", borderRadius: "5px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ fontSize: "0.65rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.15rem" }}>Model No. (M/N):</div>
          <div style={{ fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.02em", color: "#f1f5f9", wordBreak: "break-all", fontVariantNumeric: "tabular-nums" }}>
            {decoded.rawModelNumber || "N/A"}
          </div>
        </div>

        {/* Serial Number */}
        <div style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0.5rem 0.65rem", borderRadius: "5px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ fontSize: "0.65rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.15rem" }}>Serial No. (S/N):</div>
          <div style={{ fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.02em", color: decoded.manufactureYear ? "var(--accent-success)" : "#94a3b8", wordBreak: "break-all", fontVariantNumeric: "tabular-nums" }}>
            {decoded.rawSerialNumber || "Optional"}
          </div>
        </div>
      </div>

      {/* Key Decoded Output Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))", gap: "0.45rem", marginBottom: "0.65rem" }}>
        <div style={{ background: "rgba(0, 210, 255, 0.06)", border: "1px solid rgba(0, 210, 255, 0.2)", padding: "0.45rem", borderRadius: "5px", textAlign: "center" }}>
          <div style={{ fontSize: "0.63rem", color: "#94a3b8", fontWeight: 600 }}>Nominal Tonnage</div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--accent-cooling)", marginTop: "0.1rem", fontVariantNumeric: "tabular-nums" }}>{decoded.nominalTonnage} Tons</div>
        </div>

        <div style={{ background: "rgba(56, 189, 248, 0.06)", border: "1px solid rgba(56, 189, 248, 0.2)", padding: "0.45rem", borderRadius: "5px", textAlign: "center" }}>
          <div style={{ fontSize: "0.63rem", color: "#94a3b8", fontWeight: 600 }}>Cooling Capacity</div>
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#38bdf8", marginTop: "0.1rem", fontVariantNumeric: "tabular-nums" }}>{decoded.nominalBtu.toLocaleString()} BTU</div>
        </div>

        <div style={{ background: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.2)", padding: "0.45rem", borderRadius: "5px", textAlign: "center" }}>
          <div style={{ fontSize: "0.63rem", color: "#94a3b8", fontWeight: 600 }}>Nominal Airflow</div>
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--accent-success)", marginTop: "0.1rem", fontVariantNumeric: "tabular-nums" }}>{decoded.nominalAirflowCfm} CFM</div>
        </div>

        <div style={{ background: "rgba(245, 158, 11, 0.06)", border: "1px solid rgba(245, 158, 11, 0.2)", padding: "0.45rem", borderRadius: "5px", textAlign: "center" }}>
          <div style={{ fontSize: "0.63rem", color: "#94a3b8", fontWeight: 600 }}>Manufacture Date</div>
          <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f59e0b", marginTop: "0.1rem", fontVariantNumeric: "tabular-nums" }}>
            {decoded.manufactureYear ? `${decoded.manufactureYear}` : "Enter S/N"}
          </div>
        </div>
      </div>

      {/* Explanation Box */}
      <div style={{ fontSize: "0.75rem", color: "#cbd5e1", lineHeight: 1.45, background: "rgba(255, 255, 255, 0.03)", padding: "0.5rem 0.65rem", borderRadius: "5px", borderLeft: "3px solid var(--accent-cooling)" }}>
        💡 <strong>Decoded Nomenclature:</strong> {decoded.explanation}
      </div>
    </div>
  );
}
