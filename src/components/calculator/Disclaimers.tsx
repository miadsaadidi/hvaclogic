import React from "react";
import { CalculatorMeta } from "@/types/calculation";

interface DisclaimersProps {
  calculator: CalculatorMeta;
}

export function Disclaimers({ calculator }: DisclaimersProps) {
  const isLifeSafety =
    calculator.riskLevel === "high" ||
    calculator.id.includes("combustion") ||
    calculator.id.includes("refrigerant") ||
    calculator.id.includes("boiler") ||
    calculator.id.includes("hood");

  return (
    <div
      className="calculator-disclaimers"
      style={{
        margin: "2.5rem 0",
        padding: "1.25rem 1.5rem",
        background: "var(--surface)",
        border: "1px solid var(--border-color)",
        borderRadius: "0.75rem",
        fontSize: "0.8125rem",
        lineHeight: 1.55,
        color: "var(--ink-secondary)",
      }}
    >
      <h3
        style={{
          fontSize: "0.9375rem",
          fontWeight: 700,
          color: "var(--ink)",
          margin: "0 0 0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span>⚖️</span> Engineering Reference &amp; Regulatory Disclaimers
      </h3>

      {/* 1. Global Engineering Reference Notice */}
      <p style={{ margin: "0 0 0.75rem" }}>
        <strong>Engineering Reference Notice:</strong> HVACLogic.org is an independent computational reference and
        engineering design aid authored by Miad S. Calculations are based on consensus engineering formulations
        (including ASHRAE, ACCA, and SMACNA publications) and are intended solely for preliminary estimation,
        parametric analysis, and educational use. HVACLogic does not provide licensed professional engineering
        services, structural evaluations, or legally binding code determinations.
      </p>

      {/* 2. Licensed Professional Review & Permitting Notice */}
      <p style={{ margin: "0 0 0.75rem" }}>
        <strong>Professional Review &amp; Permitting Notice:</strong> Where the applicable jurisdiction, project type,
        occupancy classification, permit process, or professional-practice law requires licensed professional review,
        certification, or a sealed/stamped calculation, the user must obtain that review from an appropriately licensed
        Professional Engineer (PE) or qualified mechanical contractor. Where a jurisdiction or Authority Having
        Jurisdiction (AHJ) requires specific calculation software, documentation, or permit submittal forms, users must
        follow the applicable local requirements.
      </p>

      {/* 3. Life-Safety & Safety-Critical Notice (Rendered conditionally for high risk tools) */}
      {isLifeSafety && (
        <div
          style={{
            margin: "0.75rem 0",
            padding: "0.75rem 1rem",
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
            borderLeft: "3px solid #ef4444",
            borderRadius: "0.5rem",
            color: "var(--ink)",
          }}
        >
          <strong style={{ color: "#b91c1c", display: "block", marginBottom: "0.25rem" }}>
            ⚠️ Safety-Critical Engineering &amp; Screening Notice:
          </strong>
          Calculations involving combustion air supply or mildly flammable/flammable refrigerants (such as A2L refrigerants R-454B and R-32, or A3 hydrocarbons) provide preliminary screening estimates only. These calculation outputs do NOT replace:
          <ul style={{ margin: "0.4rem 0 0.4rem 1.25rem", padding: 0 }}>
            <li>Manufacturer installation, operation, and service instructions;</li>
            <li>Applicable refrigerant safety standards (ANSI/ASHRAE 15, ASHRAE 34, and UL 60335-2-40);</li>
            <li>Required technician EPA Section 608 certifications and trade qualifications;</li>
            <li>Applicable mechanical code, fuel gas code (NFPA 54/IFGC), and local Authority Having Jurisdiction (AHJ) requirements; or</li>
            <li>Equipment-specific charging, pressure testing, evacuation, and ventilation procedures.</li>
          </ul>
          A2L charge limit and room volume calculations do not constitute an installation approval or safety guarantee.
        </div>
      )}

      {/* 4. Manufacturer Technical Data Notice */}
      <p style={{ margin: "0" }}>
        <strong>Manufacturer Data Notice:</strong> Generic engineering formulas provide baseline theoretical
        approximations. Actual equipment performance, expanded cooling/heating capacities at specific outdoor
        temperatures, sensible-to-total heat ratios, fan airflow curves, and electrical characteristics (MCA/MOP) must
        be verified against manufacturer technical product data specifications.
      </p>
    </div>
  );
}
