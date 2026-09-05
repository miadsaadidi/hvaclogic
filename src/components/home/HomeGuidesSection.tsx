import React from "react";
import Link from "next/link";
import { ENGINEERING_GUIDES } from "@/lib/data/guides-registry";

export function HomeGuidesSection() {
  const featuredGuides = ENGINEERING_GUIDES.slice(0, 3);

  return (
    <section
      className="home-guides-section"
      style={{
        marginTop: "4rem",
        marginBottom: "3rem",
        padding: "2.5rem 1.75rem",
        borderRadius: "1rem",
        background: "var(--surface)",
        border: "1px solid var(--border-color)",
      }}
    >
      {/* SECTION HEADER */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.25rem 0.65rem",
              borderRadius: "9999px",
              background: "rgba(0, 210, 255, 0.08)",
              border: "1px solid rgba(0, 210, 255, 0.2)",
              color: "var(--accent-cooling)",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.5rem",
            }}
          >
            <span>📚</span>
            <span>Master Engineering Protocols</span>
          </div>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.85rem)",
              fontWeight: 800,
              margin: "0 0 0.4rem",
              color: "var(--ink)",
              letterSpacing: "-0.01em",
            }}
          >
            Featured HVAC Engineering Guides
          </h2>
          <p
            style={{
              fontSize: "0.92rem",
              color: "var(--ink-secondary)",
              maxWidth: "680px",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Deep-dive technical breakdowns connecting governing equations (Darcy-Weisbach, Manual J/S, Hyland-Wexler) to practical field sizing and diagnostics.
          </p>
        </div>

        <Link
          href="/guides"
          className="action-btn"
          style={{
            fontWeight: 700,
            fontSize: "0.85rem",
            background: "rgba(0, 210, 255, 0.12)",
            color: "var(--accent-cooling)",
            borderColor: "rgba(0, 210, 255, 0.3)",
            textDecoration: "none",
            padding: "0.5rem 1rem",
          }}
        >
          View All 8 Guides →
        </Link>
      </div>

      {/* GUIDES GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(285px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {featuredGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={guide.targetRoute}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1.35rem",
              borderRadius: "0.75rem",
              background: "var(--surface-raised)",
              border: "1px solid var(--border-subtle)",
              borderTop: `4px solid ${guide.color}`,
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.65rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: guide.color,
                }}
              >
                {guide.icon} {guide.category}
              </span>
              <span style={{ fontSize: "0.72rem", color: "var(--ink-secondary)", fontWeight: 500 }}>
                ⏱️ {guide.readingTime}
              </span>
            </div>

            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--ink)",
                margin: "0 0 0.5rem",
                lineHeight: 1.35,
              }}
            >
              {guide.shortTitle}
            </h3>

            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.45,
                margin: "0 0 1rem",
                flex: 1,
              }}
            >
              {guide.summary}
            </p>

            <div
              style={{
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--accent-cooling)",
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <span>Explore Master Guide</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
