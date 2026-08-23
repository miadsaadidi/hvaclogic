"use client";

import React, { useState } from "react";
import { HOMEPAGE_FAQS } from "@/lib/data/homepage-faqs";

export function HomeFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section style={{ margin: "4rem 0 2.5rem" }} aria-labelledby="faq-heading">
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.25rem" }}>Engineering FAQ</p>
        <h2 id="faq-heading" style={{ fontSize: "1.65rem", fontWeight: 700, margin: "0 0 0.35rem" }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "600px", margin: "0 auto" }}>
          Key technical specifications, engineering methodologies, and standards compliance:
        </p>
      </div>

      <div style={{ maxWidth: "820px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {HOMEPAGE_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.question}
              style={{
                borderRadius: "0.85rem",
                background: "var(--surface)",
                border: `1px solid ${isOpen ? "var(--accent-primary)" : "var(--border-color)"}`,
                overflow: "hidden",
                boxShadow: isOpen ? "0 4px 16px rgba(0, 210, 255, 0.08)" : "var(--shadow-sm)",
                transition: "all 0.18s ease",
              }}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                aria-expanded={isOpen}
                style={{
                  width: "100%",
                  padding: "1.15rem 1.35rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  color: "var(--ink)",
                  fontWeight: 650,
                  fontSize: "0.98rem",
                  cursor: "pointer",
                  gap: "1rem",
                }}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: isOpen ? "rgba(0, 210, 255, 0.15)" : "var(--bg-primary)",
                    border: "1px solid var(--border-color)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "0.85rem",
                    color: "var(--accent-cooling)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease, background-color 0.2s ease",
                  }}
                >
                  ▼
                </span>
              </button>
              {isOpen && (
                <div
                  style={{
                    padding: "0.25rem 1.35rem 1.25rem",
                    color: "var(--ink-secondary)",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    borderTop: "1px solid var(--border-subtle)",
                    paddingTop: "0.95rem",
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

