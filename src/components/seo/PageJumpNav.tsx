import React from "react";

interface JumpSection {
  id: string;
  label: string;
  icon?: string;
}

const DEFAULT_SECTIONS: JumpSection[] = [
  { id: "calculator-tool", label: "Interactive Tool", icon: "⚡" },
  { id: "sizing-matrix", label: "Sizing Matrix", icon: "📋" },
  { id: "how-to-guide", label: "How-To Guide", icon: "📐" },
  { id: "formula-math", label: "Formulas & Physics", icon: "🔬" },
  { id: "worked-example", label: "Worked Example", icon: "🧮" },
  { id: "faq-section", label: "FAQ", icon: "❓" },
  { id: "related-tools", label: "Related Diagnostics", icon: "🔗" },
];

export function PageJumpNav({ sections = DEFAULT_SECTIONS }: { sections?: JumpSection[] }) {
  return (
    <nav className="page-jump-nav" aria-label="Quick jump to page section">
      <span className="page-jump-nav-label">Jump to:</span>
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`} className="jump-pill">
          {section.icon && <span>{section.icon}</span>}
          <span>{section.label}</span>
        </a>
      ))}
    </nav>
  );
}
