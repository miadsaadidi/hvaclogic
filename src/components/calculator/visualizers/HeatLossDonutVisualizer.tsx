"use client";

import React from "react";
import { LoadBreakdownItem } from "@/lib/math/load-sizing";

export function HeatLossDonutVisualizer({ breakdown }: { breakdown: LoadBreakdownItem[] }) {
  // Compute SVG arc segments for 100% total
  let cumulativePercentage = 0;

  const segments = breakdown.map((item) => {
    const startAngle = (cumulativePercentage / 100) * 360;
    cumulativePercentage += item.percentage;
    const endAngle = (cumulativePercentage / 100) * 360;

    // SVG coordinates for arc
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const r = 70;
    const cx = 100;
    const cy = 100;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArcFlag = item.percentage > 50 ? 1 : 0;
    const d = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

    return {
      ...item,
      d,
    };
  });

  return (
    <div style={{ background: "var(--bg-primary)", border: "1px solid var(--border-subtle)", borderRadius: "0.75rem", padding: "1.25rem" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
        Heat Gain & Loss Distribution Breakdown
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        {/* SVG DONUT */}
        <div style={{ width: "130px", height: "130px", flexShrink: 0, position: "relative" }}>
          <svg id="heat-loss-donut-svg" aria-label="Heat Load Distribution Donut" viewBox="0 0 200 200" width="100%" height="100%" style={{ transform: "rotate(-0deg)" }}>
            <circle cx="100" cy="100" r="70" fill="none" stroke="var(--surface)" strokeWidth="26" />
            {segments.map((seg) => (
              <path
                key={seg.label}
                d={seg.d}
                fill="none"
                stroke={seg.color}
                strokeWidth="24"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--ink)",
          }}>
            <span>100%</span>
            <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>LOAD</span>
          </div>
        </div>

        {/* LEGEND TABLE */}
        <div style={{ flex: 1, minWidth: "160px", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {breakdown.map((item) => (
            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color }} />
                <span style={{ color: "var(--ink)" }}>{item.label}</span>
              </div>
              <span style={{ fontWeight: 700, color: "var(--ink-secondary)" }}>
                {item.btu.toLocaleString()} BTU ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
