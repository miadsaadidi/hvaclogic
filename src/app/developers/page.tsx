import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { publishedCalculators } from "@/lib/data/calculators-registry";

export const metadata: Metadata = {
  title: "Developer API & AI Agent Integration | HVACLogic",
  description: "OpenAPI 3.1 specification, deterministic thermodynamic formulas, and tool manifest for AI agents, Custom GPTs, and building engineering software.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/developers`,
  },
  openGraph: {
    title: "Developer API & AI Tool Manifest | HVACLogic",
    description: "Connect AI agents and HVAC calculation tools to HVACLogic's deterministic building science algorithms.",
    url: `${siteConfig.canonicalDomain}/developers`,
    siteName: "HVACLogic",
    locale: "en_US",
    type: "website",
  },
};

export default function DevelopersPage() {
  const published = publishedCalculators();

  return (
    <main className="page site-container" style={{ padding: "2rem 1rem", maxWidth: "1000px", margin: "0 auto" }}>
      <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <Link href="/">Home</Link>
        <span>/</span>
        <span aria-current="page">Developers & AI Agents</span>
      </nav>

      <header style={{ marginBottom: "2.5rem" }}>
        <span className="eyebrow" style={{ color: "var(--accent, #38bdf8)", textTransform: "uppercase", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.05em" }}>
          OPEN ARCHITECTURE & AI INTEGRATION
        </span>
        <h1 style={{ fontSize: "2.25rem", margin: "0.5rem 0", color: "var(--ink-primary, #f9fafb)", fontFamily: "var(--font-titillium)" }}>
          Developer API & AI Agent Tool Manifest
        </h1>
        <p style={{ color: "var(--ink-secondary, #9ca3af)", fontSize: "1.125rem", lineHeight: 1.6 }}>
          HVACLogic is engineered with an open, deterministic mathematical architecture. Connect LLMs, Custom GPT Actions, Python simulation pipelines, or BIM software to our verified ASHRAE and ACCA algorithms.
        </p>
      </header>

      {/* Quick Resource Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
        <div
          style={{
            backgroundColor: "var(--surface, #111827)",
            border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
            borderTop: "4px solid var(--accent, #38bdf8)",
            borderRadius: "8px",
            padding: "1.25rem",
          }}
        >
          <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>⚡ OpenAPI 3.1 Spec</div>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-secondary, #9ca3af)", lineHeight: 1.5, marginBottom: "1rem" }}>
            Complete machine-readable schema for all 21 calculation modules, query parameters, and validation bounds.
          </p>
          <a
            href="/api/openapi.json"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.4rem 0.85rem",
              borderRadius: "4px",
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              color: "var(--accent, #38bdf8)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            View /api/openapi.json ↗
          </a>
        </div>

        <div
          style={{
            backgroundColor: "var(--surface, #111827)",
            border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
            borderTop: "4px solid #10b981",
            borderRadius: "8px",
            padding: "1.25rem",
          }}
        >
          <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>🤖 LLMs.txt Manifest</div>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-secondary, #9ca3af)", lineHeight: 1.5, marginBottom: "1rem" }}>
            Standard markdown manifest designed for LLM agents, web crawlers, and AI search grounding.
          </p>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.4rem 0.85rem",
              borderRadius: "4px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              color: "#10b981",
              fontSize: "0.8125rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            View /llms.txt ↗
          </a>
        </div>

        <div
          style={{
            backgroundColor: "var(--surface, #111827)",
            border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
            borderTop: "4px solid #f59e0b",
            borderRadius: "8px",
            padding: "1.25rem",
          }}
        >
          <div style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>📖 Entity Glossary Graph</div>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-secondary, #9ca3af)", lineHeight: 1.5, marginBottom: "1rem" }}>
            Schema.org DefinedTermSet knowledge triples cross-referenced with Wikidata and ACCA/ASHRAE standards.
          </p>
          <Link
            href="/glossary"
            style={{
              display: "inline-block",
              padding: "0.4rem 0.85rem",
              borderRadius: "4px",
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              color: "#f59e0b",
              fontSize: "0.8125rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Explore /glossary ↗
          </Link>
        </div>
      </div>

      {/* Integration Code Examples */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", color: "var(--ink-primary, #f9fafb)", marginBottom: "1rem" }}>
          AI Agent & Tool Calling Example (LangChain / Custom GPT)
        </h2>
        <p style={{ color: "var(--ink-secondary, #9ca3af)", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1rem" }}>
          Configure your LLM agent to call HVACLogic as an authoritative thermodynamic calculation tool:
        </p>

        <div
          style={{
            backgroundColor: "var(--surface-secondary, #0a0f1d)",
            border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
            borderRadius: "8px",
            padding: "1.25rem",
            fontFamily: "monospace",
            fontSize: "0.8125rem",
            color: "var(--ink-primary, #e2e8f0)",
            overflowX: "auto",
            lineHeight: 1.5,
          }}
        >
          <pre style={{ margin: 0 }}>
{`// Example: Custom GPT Action / LangChain Tool Definition
{
  "name": "calculate_ac_tonnage",
  "description": "Calculate required residential AC cooling tonnage and design CFM airflow based on floor area and ASHRAE climatic zone.",
  "parameters": {
    "type": "object",
    "properties": {
      "area": { "type": "number", "description": "Conditioned floor area in square feet" },
      "climateZone": { "type": "string", "enum": ["mild", "moderate", "hot_humid", "desert"] },
      "ceilingHeight": { "type": "number", "description": "Average ceiling height in feet (default 8)" }
    },
    "required": ["area", "climateZone"]
  }
}`}
          </pre>
        </div>
      </section>

      {/* Published Calculation Algorithms Matrix */}
      <section>
        <h2 style={{ fontSize: "1.5rem", color: "var(--ink-primary, #f9fafb)", marginBottom: "1rem" }}>
          Registered Deterministic Calculation Endpoints ({published.length})
        </h2>
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Module Name</th>
                <th scope="col">Pillar</th>
                <th scope="col">Standards</th>
                <th scope="col">Permalink Route</th>
              </tr>
            </thead>
            <tbody>
              {published.map((calc) => (
                <tr key={calc.id}>
                  <td><strong>{calc.name}</strong></td>
                  <td style={{ textTransform: "capitalize" }}>{calc.pillar.replace(/-/g, " ")}</td>
                  <td>{calc.standards.join(", ")}</td>
                  <td>
                    <Link href={calc.route} style={{ color: "var(--accent, #38bdf8)", textDecoration: "none" }}>
                      {calc.route}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
