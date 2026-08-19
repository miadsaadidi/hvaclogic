"use client";

import React, { useState } from "react";

export const HOMEPAGE_FAQS = [
  {
    question: "How do HVACLogic calculators compare to traditional rule-of-thumb charts?",
    answer: "Traditional thumb rules (e.g. 500 sq ft per ton or 0.10 in.wg friction flat rates) often result in oversized equipment, poor dehumidification, noisy air ducts, and high utility bills. HVACLogic uses deterministic thermodynamic and fluid mechanics formulas directly derived from ASHRAE Fundamentals, ACCA Manual J/S/D, SMACNA, and NIST REFPROP datasets.",
  },
  {
    question: "Are these engineering calculators 100% free and private to use?",
    answer: "Yes. All computations execute 100% client-side inside your browser engine. We do not maintain any user database, require no logins or account creation, and store zero project calculation data on remote servers.",
  },
  {
    question: "Which refrigerants are supported in the field diagnostics suite?",
    answer: "Our pressure-temperature and superheat/subcooling charging engines support legacy and next-generation refrigerants—including R-454B (Opteon XL41 A2L), R-32, R-410A, R-22, R-134a, R-404A, and R-407C—with exact bubble and dew temperature glide modeling.",
  },
  {
    question: "Can I export, print, or share calculation results with clients?",
    answer: "Every calculator tool features an ActionButtonBar with 1-click CSV data export, a clean print-ready engineering submittal layout, and shareable permalinks that hydrate the exact calculation state via URL query parameters.",
  },
  {
    question: "How does HVACLogic support building electrification and heat pumps?",
    answer: "Our heating suite provides cold-climate heat pump balance point solvers, low-ambient capacity derate modeling down to -5°F, auxiliary electric backup heat strip sizing (kW), and hydronic baseboard / radiator EDR boiler sizing.",
  },
];

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section style={{ margin: "3.5rem 0 2rem" }} aria-labelledby="faq-heading">
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>Engineering FAQ</p>
        <h2 id="faq-heading" style={{ fontSize: "1.65rem", fontWeight: 700, margin: "0 0 0.35rem" }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "600px", margin: "0 auto" }}>
          Key technical specifications, engineering methodologies, and standards compliance:
        </p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {HOMEPAGE_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              style={{
                borderRadius: "0.75rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                overflow: "hidden",
                transition: "border-color 0.15s ease",
              }}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  padding: "1.1rem 1.25rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  color: "var(--ink)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                }}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    fontSize: "1.2rem",
                    color: "var(--accent-cooling)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    marginLeft: "0.75rem",
                  }}
                >
                  ▾
                </span>
              </button>
              {isOpen && (
                <div
                  style={{
                    padding: "0 1.25rem 1.15rem",
                    color: "var(--ink-secondary)",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    borderTop: "1px solid var(--border-subtle)",
                    paddingTop: "0.85rem",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
