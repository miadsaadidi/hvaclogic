import React from "react";

export type HvacDomainCategory =
  | "airflow"
  | "cooling-loads"
  | "refrigeration"
  | "heating"
  | "building-science";

interface FlowNode {
  icon: string;
  label: string;
  sublabel: string;
  badge?: string;
  color: string;
}

interface FlowConfig {
  title: string;
  description: string;
  nodes: FlowNode[];
  efficiencyNote: string;
}

const FLOW_CONFIGS: Record<HvacDomainCategory, FlowConfig> = {
  airflow: {
    title: "Forced Air Distribution & Dynamic Static Pressure Path",
    description: "Airflow circulation from return intakes through filtration, blower pressurization, trunk ducting, and room supply registers.",
    nodes: [
      { icon: "🚪", label: "Return Air Intake", sublabel: "Room velocity (300–450 FPM)", badge: "Intake", color: "#00d2ff" },
      { icon: "🛡️", label: "MERV Air Filter", sublabel: "Static drop (0.1–0.3 in.wg)", badge: "Filtration", color: "#10b981" },
      { icon: "🌀", label: "Blower Motor", sublabel: "Total Static (0.5 in.wg)", badge: "Pressure Source", color: "#38bdf8" },
      { icon: "📏", label: "Supply Trunk", sublabel: "Friction (0.08–0.1 in/100ft)", badge: "Distribution", color: "#f59e0b" },
      { icon: "🔄", label: "Branch Drops", sublabel: "Round/flex (600–700 FPM)", badge: "Branch", color: "#8b5cf6" },
      { icon: "💨", label: "Supply Registers", sublabel: "NC 25–30 acoustic throw", badge: "Delivery", color: "#00d2ff" },
    ],
    efficiencyNote: "Friction losses compound over equivalent length; maintaining design velocity below 900 FPM in residential trunks eliminates aerodynamic noise.",
  },
  "cooling-loads": {
    title: "ACCA Manual J / Manual S Thermal Load & Sizing Hierarchy",
    description: "Building envelope sensible heat gains, solar radiation, and latent occupant loads mapped to nominal equipment capacity.",
    nodes: [
      { icon: "☀️", label: "Solar & Envelope", sublabel: "Windows + opaque walls", badge: "Gain Source", color: "#f59e0b" },
      { icon: "👥", label: "Internal Sensible/Latent", sublabel: "Occupants + appliances", badge: "Internal", color: "#ec4899" },
      { icon: "📊", label: "Manual J Total BTU", sublabel: "Peak design hour load", badge: "Design Target", color: "#ff6b4a" },
      { icon: "⚙️", label: "Sensible Heat Ratio", sublabel: "Latent dehumidification", badge: "Ratio", color: "#8b5cf6" },
      { icon: "❄️", label: "Manual S Sizing", sublabel: "90%–115% nominal match", badge: "Equipment", color: "#00d2ff" },
    ],
    efficiencyNote: "Oversizing cooling equipment beyond 115% of ACCA Manual J load causes short-cycling and inadequate indoor dehumidification.",
  },
  refrigeration: {
    title: "Vapor-Compression Refrigeration Thermodynamic Cycle",
    description: "Closed-loop thermodynamic phase change between high-side liquid condensation and low-side vapor expansion.",
    nodes: [
      { icon: "⚡", label: "Compressor", sublabel: "Superheated vapor (high P/T)", badge: "Vapor Work", color: "#ff6b4a" },
      { icon: "🔴", label: "Condenser Coil", sublabel: "Subcooling (10°F target)", badge: "High Side", color: "#ef4444" },
      { icon: "💧", label: "Filter Drier", sublabel: "Acid & moisture (<3°F drop)", badge: "Protection", color: "#10b981" },
      { icon: "🎯", label: "TXV / Orifice", sublabel: "Isenthalpic pressure drop", badge: "Expansion", color: "#f59e0b" },
      { icon: "🔵", label: "Evaporator Coil", sublabel: "Sensible & latent boiling", badge: "Low Side", color: "#00d2ff" },
      { icon: "🌡️", label: "Suction Line", sublabel: "Superheat (8°F–14°F)", badge: "Superheat", color: "#38bdf8" },
    ],
    efficiencyNote: "Subcooling verifies a 100% solid liquid column at the TXV inlet; Superheat ensures no damaging liquid refrigerant enters the compressor crankcase.",
  },
  heating: {
    title: "Hydronic & Forced-Air Thermal Generation Flow",
    description: "Fuel combustion and reverse-cycle heat pumping to offset building thermal envelope transmission losses.",
    nodes: [
      { icon: "🔥", label: "Thermal Input", sublabel: "Burner / Heat Pump", badge: "Heat Input", color: "#ff6b4a" },
      { icon: "🛡️", label: "Heat Exchanger", sublabel: "80%–98% AFUE rating", badge: "Transfer", color: "#f59e0b" },
      { icon: "🌀", label: "Blower Delivery", sublabel: "Delta-T rise (35°F–65°F)", badge: "Circulation", color: "#38bdf8" },
      { icon: "🏠", label: "Conditioned Zone", sublabel: "Envelope loss offset", badge: "Comfort", color: "#10b981" },
    ],
    efficiencyNote: "Heat pump Coefficient of Performance (COP) decreases as outdoor ambient temperatures drop; balance point calculations dictate auxiliary strip heat engagement.",
  },
  "building-science": {
    title: "Building Science Thermal Envelope & Assembly U-Factor Flow",
    description: "Series thermal resistance (R-values) through cladding, continuous exterior insulation, framing, and drywall.",
    nodes: [
      { icon: "🧱", label: "Exterior Cladding", sublabel: "Brick / Siding (R-0.6–0.8)", badge: "Weather", color: "#8b5cf6" },
      { icon: "🛡️", label: "Continuous (ci)", sublabel: "Rigid Polyiso (R-5 to R-15)", badge: "Thermal Break", color: "#10b981" },
      { icon: "🪵", label: "Stud Cavity", sublabel: "Batt (R-13 to R-21)", badge: "Cavity", color: "#f59e0b" },
      { icon: "📄", label: "Gypsum Drywall", sublabel: "Air barrier (R-0.45)", badge: "Interior", color: "#38bdf8" },
      { icon: "📐", label: "Assembly U-Factor", sublabel: "U = 1 / R_total", badge: "Total Assembly", color: "#00d2ff" },
    ],
    efficiencyNote: "Continuous exterior insulation eliminates framing thermal bridging, increasing true whole-wall effective R-value by up to 25%.",
  },
};

interface HvacFlowDiagramProps {
  category: HvacDomainCategory;
  title?: string;
}

export function HvacFlowDiagram({ category, title }: HvacFlowDiagramProps) {
  const config = FLOW_CONFIGS[category] || FLOW_CONFIGS.airflow;
  const displayTitle = title || config.title;

  return (
    <div
      className="system-flow-card"
      style={{
        margin: "2rem 0",
        padding: "1.25rem 1.5rem",
        background: "var(--surface)",
        border: "1px solid var(--border-color)",
        borderRadius: "0.85rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
        <span style={{ fontSize: "1.25rem" }}>⚙️</span>
        <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)" }}>
          {displayTitle}
        </h3>
      </div>
      <p style={{ margin: "0 0 1.25rem", fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.45 }}>
        {config.description}
      </p>

      {/* Horizontal Flow Container with Arrows */}
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.5rem",
        }}
      >
        {config.nodes.map((node, index) => (
          <React.Fragment key={node.label}>
            {/* Node Box */}
            <div
              style={{
                flex: "1 1 0",
                minWidth: "135px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "0.85rem 0.65rem",
                background: "var(--surface-raised)",
                border: "1px solid var(--border-color)",
                borderTop: `3px solid ${node.color}`,
                borderRadius: "0.55rem",
                transition: "transform 140ms ease, box-shadow 140ms ease",
              }}
            >
              <span style={{ fontSize: "1.4rem", marginBottom: "0.35rem" }}>{node.icon}</span>
              {node.badge && (
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: node.color,
                    background: `${node.color}15`,
                    border: `1px solid ${node.color}30`,
                    padding: "1px 6px",
                    borderRadius: "9999px",
                    marginBottom: "0.3rem",
                  }}
                >
                  {node.badge}
                </span>
              )}
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.25, marginBottom: "0.2rem" }}>
                {node.label}
              </span>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", lineHeight: 1.25 }}>
                {node.sublabel}
              </span>
            </div>

            {/* Connecting Arrow */}
            {index < config.nodes.length - 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  flexShrink: 0,
                  padding: "0 0.15rem",
                  opacity: 0.6,
                }}
                aria-hidden="true"
              >
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Engineering Efficiency Footnote */}
      <div
        style={{
          marginTop: "1rem",
          padding: "0.65rem 0.85rem",
          background: "rgba(0, 210, 255, 0.06)",
          borderLeft: "3px solid var(--accent-cooling)",
          borderRadius: "0.35rem",
          fontSize: "0.78rem",
          color: "var(--ink-secondary)",
          lineHeight: 1.4,
        }}
      >
        💡 <strong>Engineering Note:</strong> {config.efficiencyNote}
      </div>
    </div>
  );
}
