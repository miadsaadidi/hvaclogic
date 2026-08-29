"use client";

import React from "react";
import Link from "next/link";

interface StandardsBadgeProps {
  standards: string[];
  className?: string;
  label?: string;
}

export function StandardsBadge({
  standards,
  className = "",
  label = "Verified Engineering Standards:",
}: StandardsBadgeProps) {
  if (!standards || standards.length === 0) {
    return null;
  }

  return (
    <div
      className={`standards-compliance-container ${className}`.trim()}
      role="region"
      aria-label="Governing HVAC Engineering Standards"
      style={{
        marginTop: "0.65rem",
        marginBottom: "0.4rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          fontSize: "0.68rem",
          fontWeight: 700,
          color: "var(--text-muted, #94a3b8)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "0.75rem" }}>🛡️</span>
        <span>{label}</span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        {standards.map((standard) => (
          <Link
            key={standard}
            href="/sources"
            title={`View official engineering documentation for ${standard} on HVACLogic`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              padding: "0.18rem 0.55rem",
              borderRadius: "4px",
              fontSize: "0.68rem",
              fontWeight: 600,
              background: "rgba(0, 210, 255, 0.08)",
              border: "1px solid rgba(0, 210, 255, 0.25)",
              color: "var(--accent-cooling, #00d2ff)",
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "background 0.15s ease, border-color 0.15s ease",
            }}
          >
            <span style={{ fontSize: "0.65rem" }}>✓</span>
            <span>{standard}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
