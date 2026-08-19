import React from "react";
import { StandardId } from "@/types/calculation";

const STANDARD_DESCRIPTIONS: Record<StandardId, string> = {
  ASHRAE: "ASHRAE Standard — Fundamentals & Equipment",
  ACCA: "ACCA Manual D / Manual J Compliant",
  SMACNA: "SMACNA HVAC Duct Construction Standards",
  EPA: "EPA Section 608 Clean Air Act Guidelines",
  AHRI: "AHRI Certified Performance Ratings",
  IRC: "International Residential Code (IRC) Compliance",
  IECC: "International Energy Conservation Code (IECC)",
  DOE: "U.S. Department of Energy (DOE) Test Procedure",
  NIST: "NIST REFPROP Thermodynamic Database",
  HVI: "Home Ventilating Institute (HVI) 916 Standard",
};

export function StandardsBadge({ standards }: { standards: StandardId[] }) {
  if (!standards || standards.length === 0) return null;

  return (
    <aside className="standards-container" aria-label="Governing engineering standards">
      <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", width: "100%" }}>
        Governing Standards & Technical References:
      </span>
      {standards.map((std) => (
        <span key={std} className="standard-badge" title={STANDARD_DESCRIPTIONS[std] || std}>
          ✓ {std}
        </span>
      ))}
    </aside>
  );
}
