import React from "react";

interface PageJumpNavProps {
  hasTool?: boolean;
  hasMatrix?: boolean;
  hasHowTo?: boolean;
  hasFormula?: boolean;
  hasExample?: boolean;
  hasFaqs?: boolean;
  hasRelated?: boolean;
}

export function PageJumpNav({
  hasTool = true,
  hasMatrix = true,
  hasHowTo = true,
  hasFormula = true,
  hasExample = true,
  hasFaqs = true,
  hasRelated = true,
}: PageJumpNavProps) {
  return (
    <nav className="page-jump-nav" aria-label="Quick jump to page section">
      <span className="page-jump-nav-label">Jump to:</span>

      {hasTool && (
        <a href="#calculator-tool" className="jump-pill">
          <span>⚡</span>
          <span>Interactive Tool</span>
        </a>
      )}

      {hasMatrix && (
        <a href="#sizing-matrix" className="jump-pill">
          <span>📋</span>
          <span>Sizing Matrix</span>
        </a>
      )}

      {hasHowTo && (
        <a href="#how-to-guide" className="jump-pill">
          <span>📐</span>
          <span>How-To Guide</span>
        </a>
      )}

      {hasFormula && (
        <a href="#formula-math" className="jump-pill">
          <span>🔬</span>
          <span>Formulas & Derivation</span>
        </a>
      )}

      {hasExample && (
        <a href="#worked-example" className="jump-pill">
          <span>🧮</span>
          <span>Worked Example</span>
        </a>
      )}

      {hasFaqs && (
        <a href="#faq-section" className="jump-pill">
          <span>❓</span>
          <span>FAQ</span>
        </a>
      )}

      {hasRelated && (
        <a href="#related-tools" className="jump-pill">
          <span>🔗</span>
          <span>Related Diagnostics</span>
        </a>
      )}
    </nav>
  );
}
