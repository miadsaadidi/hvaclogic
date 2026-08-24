import React from "react";
import Link from "next/link";
import { calculatorRegistry } from "@/lib/data/calculators-registry";

export default function NotFound() {
  const productionCalculators = calculatorRegistry.filter((c) => c.status === "production");

  return (
    <div className="layout-container" style={{ padding: "4rem 1.5rem", textAlign: "center", minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.3rem 0.85rem",
          borderRadius: "9999px",
          background: "rgba(239, 68, 68, 0.12)",
          color: "var(--accent-danger)",
          fontSize: "0.8rem",
          fontWeight: 700,
          marginBottom: "1.25rem",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        }}
      >
        <span>⚠️</span>
        <span>404 — Engineering Tool Not Found</span>
      </div>

      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
        Page or Calculation Module Missing
      </h1>

      <p style={{ maxWidth: "580px", color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2.5rem" }}>
        The calculation route you requested could not be located. It may have moved or is undergoing engineering verification. Explore our verified production sizing tools below.
      </p>

      {/* VERIFIED PRODUCTION TOOLS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
          width: "100%",
          maxWidth: "900px",
          marginBottom: "2.5rem",
          textAlign: "left",
        }}
      >
        {[
          {
            title: "Digital Ductulator",
            route: "/calculators/ductulator",
            icon: "🌀",
            desc: "Equal friction sizing, rectangular duct equivalence, and flex sag derates.",
            color: "var(--accent-cooling)",
          },
          {
            title: "BTU Load Master",
            route: "/calculators/btu-calculator",
            icon: "🏠",
            desc: "Manual J residential heating and cooling load calculation.",
            color: "#38bdf8",
          },
          {
            title: "AC Tonnage Sizer",
            route: "/calculators/ac-tonnage-calculator",
            icon: "❄️",
            desc: "Cooling capacity, Manual S sizing limits, and SEER2 operating costs.",
            color: "#00d2ff",
          },
          {
            title: "Superheat & Subcooling",
            route: "/calculators/superheat-subcooling-calculator",
            icon: "🔧",
            desc: "Refrigerant charging diagnostic engine with 2025+ A2L glide support.",
            color: "#10b981",
          },
        ].map((tool) => (
          <Link
            key={tool.route}
            href={tool.route}
            style={{
              padding: "1.25rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderTop: `4px solid ${tool.color}`,
              borderRadius: "0.75rem",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "1.3rem" }}>{tool.icon}</span>
              <strong style={{ fontSize: "1rem", color: "var(--ink)" }}>{tool.title}</strong>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="action-btn"
        style={{
          padding: "0.75rem 1.75rem",
          fontSize: "0.95rem",
          fontWeight: 700,
          background: "var(--surface-raised)",
          color: "var(--ink)",
          borderColor: "var(--border-color)",
          textDecoration: "none",
        }}
      >
        ← Return to HVACLogic Home
      </Link>
    </div>
  );
}
