"use client";

import React from "react";
import { HeatStripOutput } from "@/lib/math/heat-strip";

interface HeatStripVisualizerProps {
  output: HeatStripOutput;
}

export function HeatStripVisualizer({ output }: HeatStripVisualizerProps) {
  const {
    designHeatLossBtu,
    heatPumpCapacityAtDesignBtu,
    netHeatingDeficitBtu,
    theoreticalRequiredKw,
    selectedStandardKw,
    totalDeliveredBtu,
    excessCapacityKw,
    totalFlaAmps,
    totalMcaAmps,
    suggestedMopdBreakerAmps,
    isMultiCircuitRequired,
    circuitBranches,
    airflowScreeningStatus,
    estimatedTempRiseF,
    recommendedStages,
    stageBreakdownKw,
    voltage,
  } = output;

  // Visualizer proportions & bar dimensions
  const maxCapacity = Math.max(designHeatLossBtu * 1.15, (heatPumpCapacityAtDesignBtu + totalDeliveredBtu) * 1.05, 50000);
  const hpWidthPercent = Math.min(100, Math.round((heatPumpCapacityAtDesignBtu / maxCapacity) * 100));
  const stripWidthPercent = Math.min(100 - hpWidthPercent, Math.round((totalDeliveredBtu / maxCapacity) * 100));
  const totalLossPercent = Math.min(100, Math.round((designHeatLossBtu / maxCapacity) * 100));

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #090e1a 0%, #14172a 50%, #080a14 100%)",
        border: "1px solid var(--border-color)",
        borderTop: "3px solid #f59e0b",
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
      aria-label="Heat Pump Auxiliary Electric Strip Staging & Electrical Visualizer"
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.2rem" }}>⚡</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Auxiliary Resistance Deficit &amp; Staging Model
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <span
            style={{
              fontSize: "0.75rem",
              padding: "0.2rem 0.6rem",
              borderRadius: "0.35rem",
              background: airflowScreeningStatus === "Adequate Airflow" ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.2)",
              color: airflowScreeningStatus === "Adequate Airflow" ? "#34d399" : "#f87171",
              border: `1px solid ${airflowScreeningStatus === "Adequate Airflow" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.4)"}`,
              fontWeight: 600,
            }}
          >
            Airflow Screening: {airflowScreeningStatus} ({estimatedTempRiseF}°F Rise)
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              padding: "0.2rem 0.6rem",
              borderRadius: "0.35rem",
              background: "rgba(56, 189, 248, 0.15)",
              color: "#38bdf8",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              fontWeight: 600,
            }}
          >
            {recommendedStages}-Stage ({stageBreakdownKw.join(" + ")} kW)
          </span>
        </div>
      </div>

      {/* SVG Thermodynamic Heating Balance Diagram */}
      <div style={{ marginBottom: "1.25rem", background: "rgba(15, 23, 42, 0.6)", borderRadius: "0.5rem", padding: "0.85rem", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
        <div style={{ fontSize: "0.75rem", color: "var(--ink-secondary)", marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
          <span>Heating Load Distribution at Design Condition</span>
          <span>Target Heat Loss: {designHeatLossBtu.toLocaleString()} BTU/hr</span>
        </div>

        {/* Stacked Capacity Bar */}
        <div style={{ height: "28px", width: "100%", background: "#1e293b", borderRadius: "0.35rem", position: "relative", overflow: "hidden", display: "flex" }}>
          {/* Heat Pump Compressor Contribution */}
          {hpWidthPercent > 0 && (
            <div
              style={{
                width: `${hpWidthPercent}%`,
                background: "linear-gradient(90deg, #0284c7 0%, #38bdf8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0c4a6e",
                fontWeight: 700,
                fontSize: "0.7rem",
                overflow: "hidden",
                whiteSpace: "nowrap",
                borderRight: "2px solid #0f172a",
                transition: "width 0.3s ease",
              }}
              title={`Heat Pump Delivered: ${heatPumpCapacityAtDesignBtu.toLocaleString()} BTU/hr`}
            >
              HP: {heatPumpCapacityAtDesignBtu.toLocaleString()} BTU
            </div>
          )}

          {/* Electric Resistance Strip Contribution */}
          <div
            style={{
              width: `${stripWidthPercent}%`,
              background: "linear-gradient(90deg, #d97706 0%, #fbbf24 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#451a03",
              fontWeight: 700,
              fontSize: "0.7rem",
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition: "width 0.3s ease",
            }}
            title={`Electric Heat Strip: ${selectedStandardKw} kW (${totalDeliveredBtu.toLocaleString()} BTU/hr)`}
          >
            Strip: {selectedStandardKw} kW (+{totalDeliveredBtu.toLocaleString()} BTU)
          </div>

          {/* Target Design Heat Loss Indicator Needle */}
          <div
            style={{
              position: "absolute",
              left: `${totalLossPercent}%`,
              top: 0,
              bottom: 0,
              width: "3px",
              background: "#ef4444",
              boxShadow: "0 0 8px #ef4444",
              zIndex: 2,
            }}
            title={`Design Heat Loss: ${designHeatLossBtu.toLocaleString()} BTU/hr`}
          />
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "1.25rem", marginTop: "0.6rem", fontSize: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#38bdf8" }} />
            <span style={{ color: "#94a3b8" }}>Heat Pump Delivered ({heatPumpCapacityAtDesignBtu.toLocaleString()} BTU/hr)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#fbbf24" }} />
            <span style={{ color: "#94a3b8" }}>Selected Strip ({selectedStandardKw} kW / {totalDeliveredBtu.toLocaleString()} BTU/hr)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <span style={{ width: "10px", height: "3px", background: "#ef4444" }} />
            <span style={{ color: "#94a3b8" }}>Design Loss Target ({designHeatLossBtu.toLocaleString()} BTU/hr)</span>
          </div>
        </div>
      </div>

      {/* Electrical Specifications Panel */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem", marginBottom: "1rem" }}>
        <div style={{ background: "rgba(15, 23, 42, 0.7)", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--ink-secondary)", textTransform: "uppercase" }}>Calculated Load Current (FLA)</div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f8fafc", marginTop: "0.2rem" }}>
            {totalFlaAmps} A <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "#94a3b8" }}>@ {voltage}V</span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "0.15rem" }}>
            Theoretical required: {theoreticalRequiredKw} kW
          </div>
        </div>

        <div style={{ background: "rgba(15, 23, 42, 0.7)", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--ink-secondary)", textTransform: "uppercase" }}>Calculated MCA (125% Factor)</div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#38bdf8", marginTop: "0.2rem" }}>
            {totalMcaAmps} A <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "#94a3b8" }}>(Continuous Load)</span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "0.15rem" }}>
            Excess margin: +{excessCapacityKw} kW
          </div>
        </div>

        <div style={{ background: "rgba(15, 23, 42, 0.7)", padding: "0.75rem", borderRadius: "0.5rem", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
          <div style={{ fontSize: "0.7rem", color: "var(--ink-secondary)", textTransform: "uppercase" }}>Circuit Partitioning Reference</div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: isMultiCircuitRequired ? "#f59e0b" : "#34d399", marginTop: "0.2rem" }}>
            {isMultiCircuitRequired ? "Multi-Circuit (Load > 48A)" : "Single Branch Circuit"}
          </div>
          <div style={{ fontSize: "0.7rem", color: "#64748b", marginTop: "0.15rem" }}>
            Verify with equipment nameplate
          </div>
        </div>
      </div>

      {/* Branch Circuit Breakdown Table */}
      <div style={{ background: "rgba(15, 23, 42, 0.8)", borderRadius: "0.5rem", padding: "0.75rem", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#cbd5e1", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.03em" }}>
          Illustrative Circuit &amp; Conductor Reference
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", fontSize: "0.75rem", textAlign: "left", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #334155", color: "#94a3b8" }}>
                <th style={{ padding: "0.35rem" }}>Circuit</th>
                <th style={{ padding: "0.35rem" }}>Nominal kW</th>
                <th style={{ padding: "0.35rem" }}>Calculated FLA</th>
                <th style={{ padding: "0.35rem" }}>Calculated MCA</th>
                <th style={{ padding: "0.35rem" }}>Reference Breaker</th>
                <th style={{ padding: "0.35rem" }}>Reference Conductor (75°C)</th>
              </tr>
            </thead>
            <tbody>
              {circuitBranches.map((b) => (
                <tr key={b.circuitNumber} style={{ borderBottom: "1px solid rgba(51, 65, 85, 0.5)", color: "#f8fafc" }}>
                  <td style={{ padding: "0.4rem 0.35rem", fontWeight: 600, color: "#38bdf8" }}>Circuit {b.circuitNumber}</td>
                  <td style={{ padding: "0.4rem 0.35rem" }}>{b.assignedKw} kW</td>
                  <td style={{ padding: "0.4rem 0.35rem" }}>{b.flaAmps} A</td>
                  <td style={{ padding: "0.4rem 0.35rem" }}>{b.mcaAmps} A</td>
                  <td style={{ padding: "0.4rem 0.35rem", fontWeight: 700, color: "#f59e0b" }}>{b.suggestedBreakerAmps} A 2-Pole</td>
                  <td style={{ padding: "0.4rem 0.35rem", color: "#34d399", fontWeight: 600 }}>{b.suggestedWireGaugeAwg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
