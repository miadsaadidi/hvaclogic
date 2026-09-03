import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { HvacFlowDiagram } from "@/components/diagrams/HvacFlowDiagram";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Building Science & Insulation Calculators",
  description: "Calculate wall assembly R-values, continuous insulation U-factors, and envelope heat loss complying with IECC and ASHRAE Standard 90.1.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/building-science`,
  },
  openGraph: {
    title: "Building Science & Insulation Calculators",
    description: "Calculate wall assembly R-values, continuous insulation U-factors, and envelope heat loss complying with IECC and ASHRAE Standard 90.1.",
    url: `${siteConfig.canonicalDomain}/building-science`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Building Science & Insulation Calculators — HVACLogic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Science & Insulation Calculators | HVACLogic",
    description: "Calculate wall assembly R-values, continuous insulation U-factors, and envelope heat loss complying with IECC and ASHRAE Standard 90.1.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

const CATEGORY_COLOR = "#8b5cf6";

export default function BuildingScienceHub() {
  const calculators = calculatorRegistry.filter((c) => c.pillar === "building-science");

  return (
    <main className="page site-container">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <span aria-current="page">Building Science</span>
      </nav>

      <header className="calculator-header">
        <span className="eyebrow">Category Hub</span>
        <h1>Building Science &amp; Insulation Calculators</h1>
        <p className="intro">
          Thermal resistance modeling, series and parallel path framing calculations, and continuous exterior insulation compliance for IECC climate zones.
        </p>
      </header>

      {/* CARDS GRID (PowerLab Card Design) */}
      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, margin: "2.5rem 0 1rem", color: "var(--ink)" }}>
        Available Building Science Calculators
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(285px, 1fr))",
          gap: "1.25rem",
          marginBottom: "3rem",
        }}
      >
        {calculators.map((c) => (
          <Link
            key={c.id}
            href={c.route}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "1.35rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              borderTop: `4px solid ${CATEGORY_COLOR}`,
              textDecoration: "none",
              color: "inherit",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
          >
            {/* Top Row: Category Label + Icon */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: CATEGORY_COLOR,
                }}
              >
                Building Science
              </span>
              <span style={{ fontSize: "1.4rem" }}>🏢</span>
            </div>

            {/* Title */}
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>
              {c.name}
            </h3>

            {/* Standards Badge */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.65rem" }}>
              {c.standards.map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    background: "rgba(139, 92, 246, 0.1)",
                    color: CATEGORY_COLOR,
                    border: "1px solid rgba(139, 92, 246, 0.2)",
                    padding: "0.15rem 0.45rem",
                    borderRadius: "4px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Description */}
            <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.45, flex: 1 }}>
              {c.metaDescription}
            </p>

            {/* Action Button */}
            <div
              className="action-btn"
              style={{
                marginTop: "1.25rem",
                width: "100%",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: "0.8rem",
                background: "var(--surface-raised)",
                borderColor: "var(--border-color)",
                color: "var(--ink)",
              }}
            >
              Open Calculator →
            </div>
          </Link>
        ))}
      </div>

      {/* SYSTEM FLOW DIAGRAM */}
      <HvacFlowDiagram category="building-science" />
    </main>
  );
}
