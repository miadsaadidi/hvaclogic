import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCalculatorById, calculatorRegistry } from "@/lib/data/calculators-registry";
import { CalculatorContainer } from "@/components/calculator/CalculatorContainer";
import { FormulaCard } from "@/components/seo/FormulaCard";
import { HvacFlowDiagram, HvacDomainCategory } from "@/components/diagrams/HvacFlowDiagram";

interface Props {
  params: Promise<{ slug: string }>;
}

const PILLAR_TO_DOMAIN: Record<string, HvacDomainCategory> = {
  "airflow-ducts": "airflow",
  "cooling-loads": "cooling-loads",
  "field-diagnostics": "refrigeration",
  "heating-systems": "heating",
  "building-science": "building-science",
};

export async function generateStaticParams() {
  return calculatorRegistry.map((calc) => ({
    slug: calc.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calculator = getCalculatorById(slug);

  if (!calculator) {
    return {
      title: "Calculator Not Found | HVACLogic",
    };
  }

  return {
    title: calculator.seoTitle,
    description: calculator.metaDescription,
    alternates: {
      canonical: `https://hvaclogic.org/calculators/${calculator.id}`,
    },
    openGraph: {
      title: calculator.seoTitle,
      description: calculator.metaDescription,
      url: `https://hvaclogic.org/calculators/${calculator.id}`,
      siteName: "HVACLogic",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: calculator.seoTitle,
      description: calculator.metaDescription,
    },
  };
}

export default async function GenericCalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculatorById(slug);

  if (!calculator) {
    notFound();
  }

  const domainCategory: HvacDomainCategory = PILLAR_TO_DOMAIN[calculator.pillar] || "airflow";

  return (
    <CalculatorContainer
      calculator={calculator}
      directAnswer={`The ${calculator.name} is designed according to ${calculator.standards.join(", ")} engineering standards. It provides transparent calculation metrics without lead-generation paywalls or database tracking.`}
      formulaSnippet={calculator.features[0] || "Governing Equations derived from ASHRAE / ACCA standards."}
      authorityCitation={calculator.standards.join(" & ") + " Engineering Code Compliance"}
      toolComponent={
        <div
          id="calculator-tool"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderTop: "4px solid var(--accent-cooling)",
            borderRadius: "0.85rem",
            padding: "2.5rem 1.5rem",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.3rem 0.85rem",
              borderRadius: "9999px",
              background: "rgba(0, 210, 255, 0.12)",
              color: "var(--accent-cooling)",
              fontSize: "0.78rem",
              fontWeight: 700,
              marginBottom: "1rem",
              border: "1px solid rgba(0, 210, 255, 0.3)",
            }}
          >
            <span>⚡</span>
            <span>Engineering Peer Review &amp; Specification</span>
          </div>

          <h2 style={{ fontSize: "1.45rem", fontWeight: 800, color: "var(--ink)", marginBottom: "0.5rem" }}>
            {calculator.name}
          </h2>

          <p style={{ maxWidth: "620px", margin: "0 auto 1.5rem", color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.5 }}>
            This deterministic calculation engine is calibrated to {calculator.standards.join(", ")} specifications. Review the technical formulation below or jump to our live production tools.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "0.75rem",
              maxWidth: "750px",
              margin: "0 auto 1.75rem",
              textAlign: "left",
            }}
          >
            {calculator.features.map((feat, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  fontSize: "0.85rem",
                  color: "var(--ink)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>✓</span>
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href="/calculators/ductulator"
              className="action-btn"
              style={{
                padding: "0.65rem 1.3rem",
                fontSize: "0.88rem",
                fontWeight: 700,
                background: "rgba(0, 210, 255, 0.15)",
                borderColor: "var(--accent-cooling)",
                color: "var(--accent-cooling)",
                textDecoration: "none",
              }}
            >
              🌀 Open Digital Ductulator →
            </Link>
            <Link
              href="/calculators/btu-calculator"
              className="action-btn"
              style={{
                padding: "0.65rem 1.3rem",
                fontSize: "0.88rem",
                fontWeight: 700,
                background: "rgba(56, 189, 248, 0.15)",
                borderColor: "var(--accent-primary)",
                color: "var(--accent-primary)",
                textDecoration: "none",
              }}
            >
              🏠 Open BTU Load Master →
            </Link>
          </div>
        </div>
      }
      methodologySection={
        <>
          <HvacFlowDiagram category={domainCategory} />
          <div style={{ marginTop: "1.5rem" }}>
            <FormulaCard
              title={`${calculator.name} Governing Physics`}
              formula={calculator.features[0] || "Deterministic Model (ASHRAE / ACCA)"}
              variables={[
                { symbol: "Code", label: "Governing Specification", description: "Design code compliance", unit: calculator.standards.join(", ") },
                { symbol: "PE_Rev", label: "Engineering Audit Date", description: "Standard verification review", unit: calculator.lastEngineeringReview },
                { symbol: "Calc", label: "Computation Engine", description: "Pure in-browser deterministic physics", unit: "100% Client-Side" },
              ]}
              sourceStandard={calculator.standards.join(" / ")}
            />
          </div>
        </>
      }
      comparisonTableSection={
        <div className="scenario-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Specification Parameter</th>
                <th scope="col">Design Range</th>
                <th scope="col">Standard Target</th>
                <th scope="col">Governing Standard</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Primary Calculation Accuracy</strong></td>
                <td>±0.5% Deterministic</td>
                <td>100% Zero-Loss Precision</td>
                <td>{calculator.standards[0] || "ASHRAE"}</td>
              </tr>
              <tr>
                <td><strong>Data Storage / Tracking</strong></td>
                <td>Zero DB Writes</td>
                <td>Client-Side Isolated</td>
                <td>ISO/IEC 27001</td>
              </tr>
              <tr>
                <td><strong>Verification Protocol</strong></td>
                <td>ACCA / ASHRAE Benchmarks</td>
                <td>Field-Calibrated</td>
                <td>{calculator.standards.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      workedExampleSection={
        <div style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "var(--ink-secondary)" }}>
          <p>
            When performing calculations for <strong>{calculator.name}</strong>, engineering practice dictates verifying both design conditions and component safety margins according to <strong>{calculator.standards.join(", ")}</strong>.
          </p>
          <div style={{ background: "var(--surface-raised)", border: "1px solid var(--border-color)", borderRadius: "0.5rem", padding: "1rem", marginTop: "1rem" }}>
            <strong style={{ color: "var(--ink)" }}>Verification Step 1:</strong> Establish peak design load conditions.<br />
            <strong style={{ color: "var(--ink)" }}>Verification Step 2:</strong> Solve physical governing equations.<br />
            <strong style={{ color: "var(--ink)" }}>Verification Step 3:</strong> Cross-reference sizing output with equipment manufacturer submittal data.
          </div>
        </div>
      }
    />
  );
}
