import React from "react";
import Link from "next/link";
import { getCalculatorById } from "@/lib/data/calculators-registry";

interface RelatedCalculatorsGridProps {
  relatedIds: string[];
  currentPillar: string;
}

const PILLAR_COLORS: Record<string, string> = {
  "airflow-ducts": "#00d2ff",
  "cooling-loads": "#38bdf8",
  "field-diagnostics": "#10b981",
  "heating-systems": "#ff6b4a",
  "building-science": "#8b5cf6",
};

export function RelatedCalculatorsGrid({ relatedIds, currentPillar }: RelatedCalculatorsGridProps) {
  const calculators = relatedIds
    .map((id) => getCalculatorById(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  if (calculators.length === 0) return null;

  return (
    <div style={{ margin: "2rem 0 1.5rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.2rem" }}>Connected Engineering Workflow</p>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
          Related Engineering Calculators
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "1rem",
        }}
      >
        {calculators.map((c) => {
          const color = PILLAR_COLORS[c.pillar] || "var(--accent-primary)";
          return (
            <Link
              key={c.id}
              href={c.route}
              className="powerlab-card-link"
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.15rem",
                borderRadius: "0.75rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: `3px solid ${color}`,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: color,
                  }}
                >
                  {c.categoryName}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>
                  {c.standards.join(" • ")}
                </span>
              </div>

              <h3 style={{ margin: "0 0 0.35rem", fontSize: "0.98rem", fontWeight: 700, color: "var(--ink)" }}>
                {c.name}
              </h3>

              <p
                style={{
                  fontSize: "0.78rem",
                  color: "var(--ink-secondary)",
                  lineHeight: 1.4,
                  margin: "0 0 0.85rem",
                  flex: 1,
                }}
              >
                {c.metaDescription}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: color,
                  paddingTop: "0.5rem",
                  borderTop: "1px solid var(--border-subtle)",
                }}
              >
                <span>Launch Calculation Tool</span>
                <span>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
