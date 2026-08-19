"use client";

import React from "react";
import { FormulaVariable } from "@/types/calculation";
import { CodeFormulaBlock } from "@/components/seo/CodeFormulaBlock";

interface FormulaCardProps {
  title: string;
  formula: string;
  variables: FormulaVariable[];
  notes?: string;
  sourceStandard: string;
}

export function FormulaCard({
  title,
  formula,
  variables,
  notes,
  sourceStandard,
}: FormulaCardProps) {
  return (
    <section className="formula-card" id="formula-math" style={{ marginTop: "1.5rem" }}>
      <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.65rem" }}>
        {title}
      </h3>

      <CodeFormulaBlock
        formula={formula}
        title="governing_physics_model.math"
        badge="ASHRAE / ACCA SPEC"
      />

      <div className="scenario-table" style={{ marginTop: "1rem" }}>
        <table>
          <thead>
            <tr>
              <th scope="col" style={{ width: "15%" }}>Symbol</th>
              <th scope="col" style={{ width: "25%" }}>Variable</th>
              <th scope="col" style={{ width: "40%" }}>Description</th>
              <th scope="col" style={{ width: "20%" }}>Standard Units</th>
            </tr>
          </thead>
          <tbody>
            {variables.map((v) => (
              <tr key={v.symbol}>
                <td>
                  <code style={{ color: "var(--accent-cooling)", fontWeight: 700, fontSize: "0.9rem" }}>{v.symbol}</code>
                </td>
                <td>
                  <strong style={{ color: "var(--ink)" }}>{v.label}</strong>
                </td>
                <td style={{ color: "var(--ink-secondary)" }}>{v.description}</td>
                <td>
                  <code style={{ color: "#a78bfa", background: "rgba(167, 139, 250, 0.1)", padding: "0.15rem 0.4rem", borderRadius: "4px" }}>
                    {v.unit}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {notes && (
        <p className="authority-tag" style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
          💡 <strong>Engineering Note:</strong> {notes}
        </p>
      )}

      <div className="authority-tag" style={{ marginTop: "0.6rem", display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
        <span>🏛️</span>
        <span>Engineering Standard Reference: <strong style={{ color: "var(--ink)" }}>{sourceStandard}</strong></span>
      </div>
    </section>
  );
}
