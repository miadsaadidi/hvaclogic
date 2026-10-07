import React from "react";
import Link from "next/link";

export interface DisclaimerProps {
  /**
   * Visual variant:
   * - "standard": Default technical reference notice for guides, whitepapers, datasets, and hubs.
   * - "calculator": Comprehensive notice for interactive calculation tools.
   * - "compact": Sleek inline notice for reference tables and matrices.
   */
  variant?: "standard" | "calculator" | "compact";
  /**
   * Whether the tool or content covers safety-critical subjects:
   * (e.g. A2L refrigerants, combustion air, boiler pressure relief, high-static ductwork).
   */
  isLifeSafety?: boolean;
  /**
   * Specific safety topic details (optional custom text for life-safety banner).
   */
  safetyTopic?: "a2l" | "combustion" | "boiler" | "general";
  /**
   * Optional custom title override.
   */
  title?: string;
  /**
   * Additional custom styling or className.
   */
  className?: string;
  style?: React.CSSProperties;
}

export function Disclaimer({
  variant = "standard",
  isLifeSafety = false,
  safetyTopic = "general",
  title,
  className = "",
  style = {},
}: DisclaimerProps) {
  const headingText = title || (
    variant === "calculator"
      ? "Engineering Reference & Calculation Notice"
      : "Engineering Reference & Technical Notice"
  );

  return (
    <aside
      className={`hvaclogic-disclaimer ${className}`}
      aria-label="Engineering reference notice and disclaimer"
      style={{
        margin: variant === "compact" ? "1.5rem 0" : "2.5rem 0",
        padding: variant === "compact" ? "1rem 1.25rem" : "1.25rem 1.5rem",
        background: "var(--surface)",
        border: "1px solid var(--border-color)",
        borderRadius: "0.75rem",
        fontSize: "0.8125rem",
        lineHeight: 1.55,
        color: "var(--ink-secondary)",
        boxShadow: "var(--shadow-sm)",
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
          marginBottom: "0.65rem",
        }}
      >
        <h3
          style={{
            fontSize: "0.875rem",
            fontWeight: 700,
            color: "var(--ink)",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            letterSpacing: "-0.01em",
          }}
        >
          <span aria-hidden="true">⚖️</span> {headingText}
        </h3>
        <Link
          href="/disclaimer"
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--accent-cooling)",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          Read Full Technical Disclaimer →
        </Link>
      </div>

      {/* COMPACT VARIANT */}
      {variant === "compact" ? (
        <p style={{ margin: isLifeSafety ? "0 0 0.65rem" : 0 }}>
          <strong>Reference &amp; Compliance Notice:</strong> Calculations and reference data are provided strictly for preliminary educational screening. Numerical outputs do not establish safety, code compliance, equipment approval, or installation suitability. Real-world installations are governed by adopted local building and mechanical codes, applicable consensus standards, certified manufacturer technical documentation, and project-specific professional engineering judgment.
        </p>
      ) : (
        <>
          {/* CORE REFERENCE TEXT */}
          <p style={{ margin: "0 0 0.65rem" }}>
            <strong>Educational &amp; Reference Notice:</strong> Content, computational models, formulas, and reference tables on HVACLogic are provided solely for preliminary engineering screening, parametric evaluation, and educational use. They represent repeatable numerical evaluations of stated physical models and supplied inputs and do not constitute professional engineering advice, certified plan submittals, or code-compliance determinations. Numerical outputs do not establish safety, compliance, approval, or installation suitability.
          </p>

          {/* JURISDICTION & PROFESSIONAL JUDGMENT NOTICE */}
          <p style={{ margin: "0 0 0.65rem" }}>
            <strong>Professional Judgment &amp; Applicable Codes:</strong> Mechanical system sizing, duct design, and equipment selection are governed by adopted building, mechanical, and fire codes (such as IMC, IRC, IECC, UMC) and local AHJ amendments. Voluntary consensus standards (such as ASHRAE and NFPA standards) apply to the extent adopted into law or referenced. Project-specific engineering requirements and licensed professional engineering judgment are required for all real-world mechanical designs.
          </p>

          {/* MANUFACTURER DOCUMENTATION NOTICE */}
          <p style={{ margin: isLifeSafety ? "0 0 0.65rem" : 0 }}>
            <strong>Manufacturer Documentation:</strong> Theoretical models and generic calculations cannot replace equipment-specific manufacturer engineering data, certified AHRI performance ratings, equipment submittals, or published installation manuals, which constitute essential sources that must be verified and followed where applicable.
          </p>
        </>
      )}

      {/* LIFE-SAFETY & HIGH-RISK NOTICE */}
      {isLifeSafety && (
        <div
          role="note"
          aria-label="Safety notice"
          style={{
            margin: "0.75rem 0 0",
            padding: "0.75rem 1rem",
            background: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
            borderLeft: "3.5px solid #ef4444",
            borderRadius: "0.5rem",
            color: "var(--ink)",
            fontSize: "0.8125rem",
            lineHeight: 1.5,
          }}
        >
          <strong style={{ color: "#b91c1c", display: "flex", alignItems: "center", gap: "0.35rem", marginBottom: "0.3rem" }}>
            <span>⚠️</span> Safety-Critical Screening Notice:
          </strong>
          {safetyTopic === "a2l" ? (
            <>
              Mildly flammable A2L refrigerant calculations (e.g. R-454B, R-32 charge limits, room volume thresholds, and ventilation rates) are screening approximations based on ANSI/ASHRAE Standard 15 and UL 60335-2-40. They do not replace manufacturer installation instructions, EPA Section 608 certified technician practices, field leak testing, or AHJ permit approvals.
            </>
          ) : safetyTopic === "combustion" ? (
            <>
              Combustion air calculations provide baseline geometric screening estimates based on NFPA 54 / National Fuel Gas Code and International Fuel Gas Code (IFGC). They do not replace on-site flue draft testing, chimney inspection, mechanical room pressure verification, or gas utility requirements.
            </>
          ) : safetyTopic === "boiler" ? (
            <>
              Hydronic and steam boiler ratings and expansion tank sizing calculations represent theoretical thermal approximations. They do not replace ASME Boiler and Pressure Vessel Code requirements, certified pressure relief valve sizing, or manufacturer equipment selection submittals.
            </>
          ) : (
            <>
              High-risk HVAC applications—including combustion air supply, refrigerant safety classifications, pressure relief devices, and life-safety ventilation—require rigorous field verification. Calculations do not replace certified manufacturer submittals, applicable safety standards, or jurisdictional approvals.
            </>
          )}
        </div>
      )}
    </aside>
  );
}
