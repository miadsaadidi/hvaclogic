import React from "react";
import Link from "next/link";

interface SystemNode {
  id: string;
  step: string;
  category: string;
  title: string;
  metric: string;
  description: string;
  icon: string;
  href: string;
  color: string;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: "cooling-loads",
    step: "01",
    category: "Cooling & Loads",
    title: "Whole-Home Heat Load",
    metric: "BTU/hr • Sizing Tons",
    description: "Calculate sensible heat gains, solar transmission, and ACCA Manual J/S cooling equipment capacity.",
    icon: "🏠",
    href: "/cooling-loads",
    color: "#38bdf8",
  },
  {
    id: "airflow-ducts",
    step: "02",
    category: "Airflow & Ducts",
    title: "Ductwork & Airflow",
    metric: "CFM • Friction • FPM",
    description: "Size round and rectangular trunks, compute static friction loss, and derate flexible duct sag.",
    icon: "🌀",
    href: "/airflow-ducts",
    color: "#00d2ff",
  },
  {
    id: "field-diagnostics",
    step: "03",
    category: "Field Diagnostics",
    title: "Refrigeration PT",
    metric: "Target SH • Actual SC",
    description: "Verify subcooling and target superheat against NIST REFPROP PT saturation curves for R-410A & R-454B.",
    icon: "🔧",
    href: "/field-diagnostics",
    color: "#10b981",
  },
  {
    id: "heating-systems",
    step: "04",
    category: "Heating Systems",
    title: "Heat Pump Electrification",
    metric: "Balance Point • COP",
    description: "Size heat pumps, calculate heating balance points, and optimize winter supplemental heating.",
    icon: "🔥",
    href: "/heating-systems",
    color: "#ff6b4a",
  },
  {
    id: "building-science",
    step: "05",
    category: "Building Science",
    title: "Thermal Envelope",
    metric: "R-Value • U-Factor",
    description: "Calculate series and parallel wall assembly R-values complying with IECC climate zone energy codes.",
    icon: "🏢",
    href: "/building-science",
    color: "#8b5cf6",
  },
];

export function ConnectedSystemFlow() {
  return (
    <section style={{ marginTop: "2.5rem", marginBottom: "3.5rem" }}>
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>The Connected HVAC Ecosystem</p>
        <h2 style={{ fontSize: "1.65rem", fontWeight: 700, margin: "0 0 0.4rem", letterSpacing: "-0.01em" }}>
          One Unified Building Science Architecture
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: "680px", margin: "0 auto", lineHeight: 1.5 }}>
          Thermal load calculations, airflow distribution, refrigeration diagnostics, and envelope physics work in one continuous engineering workflow:
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.15rem",
        }}
      >
        {SYSTEM_NODES.map((node) => (
          <Link
            key={node.id}
            href={node.href}
            className="system-flow-card"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1.35rem 1.25rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderTop: `3.5px solid ${node.color}`,
              textDecoration: "none",
              color: "inherit",
              position: "relative",
            }}
          >
            {/* Top Row: Step Tag + Icon */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    padding: "0.1rem 0.35rem",
                    borderRadius: "4px",
                    background: `${node.color}20`,
                    color: node.color,
                    border: `1px solid ${node.color}40`,
                  }}
                >
                  {node.step}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: node.color,
                  }}
                >
                  {node.category}
                </span>
              </div>
              <span style={{ fontSize: "1.35rem" }}>{node.icon}</span>
            </div>

            {/* Title */}
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>
              {node.title}
            </h3>

            {/* Metric Pill Badge */}
            <div
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontSize: "0.72rem",
                fontWeight: 600,
                background: `${node.color}12`,
                color: node.color,
                border: `1px solid ${node.color}28`,
                padding: "0.15rem 0.5rem",
                borderRadius: "4px",
                marginBottom: "0.65rem",
              }}
            >
              {node.metric}
            </div>

            {/* Description */}
            <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.45, flex: 1 }}>
              {node.description}
            </p>

            {/* Action Link Button with animated arrow */}
            <div
              style={{
                marginTop: "1.1rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: node.color,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <span>Explore Category</span>
              <span className="flow-arrow">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

