import React from "react";

interface MobileResultBarProps {
  label: string;
  value: string | number;
  unit: string;
}

export function MobileResultBar({ label, value, unit }: MobileResultBarProps) {
  return (
    <aside className="mobile-result-bar" aria-label="Live mobile calculation result">
      <div>
        <div className="mobile-label">{label}</div>
        <div className="mobile-value">
          {value} <span style={{ fontSize: "0.8125rem", color: "var(--ink-secondary)" }}>{unit}</span>
        </div>
      </div>
      <a
        href="#calculator-tool"
        className="action-btn"
        style={{
          height: "34px",
          padding: "0 0.65rem",
          fontSize: "0.75rem",
          background: "var(--accent-primary)",
          color: "#ffffff",
          borderColor: "transparent",
        }}
      >
        Edit Inputs ↑
      </a>
    </aside>
  );
}
