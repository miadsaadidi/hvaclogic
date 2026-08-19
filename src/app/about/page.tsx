import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "About HVACLogic — Deterministic HVAC & Building Science Suite",
  description: "Learn about HVACLogic: our mission to replace black-box sales estimators with open, peer-reviewed engineering calculators for HVAC engineers, technicians, and contractors.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About HVACLogic — Transparent HVAC Engineering System",
    description: "Replacing black-box sales estimators with open, deterministic HVAC calculation tools.",
    url: `${siteConfig.canonicalDomain}/about`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <article className="page site-container" style={{ maxWidth: "1080px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">About HVACLogic</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <Logo size="md" showTagline={false} />
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 1rem" }}>
          About HVACLogic
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "800px" }}>
          HVACLogic was created to replace black-box marketing lead-gen calculators with <strong>transparent, deterministic engineering tools</strong>. We believe HVAC design engineers, mechanical contractors, and building scientists deserve accurate math with visible physical losses.
        </p>
      </header>

      {/* Core Mission & Values Grid */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 1.25rem" }}>
          Our Engineering Charter
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #00d2ff" }}>
            <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>⚡</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>No Lead-Gen Gates</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Zero forced email captures, zero phone number solicitations, and zero gated results. Every calculation output, chart, and exportable report is 100% accessible immediately.
            </p>
          </div>

          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #38bdf8" }}>
            <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>📐</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>First-Principles Physics</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              Calculations are derived directly from published thermodynamics, fluid mechanics, and national code standards (ASHRAE, ACCA, SMACNA, EPA, and IECC).
            </p>
          </div>

          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #10b981" }}>
            <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>🛡️</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>Zero-Database Privacy</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              All equations execute client-side directly inside your browser. No project floor plans, load data, or customer parameters are stored on external tracking servers.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial & Peer-Review Policy */}
      <section style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", marginBottom: "3.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
          Peer-Review &amp; Editorial Verification Process
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
          Every formula implemented in HVACLogic undergoes a multi-stage validation pipeline before deployment:
        </p>
        <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", fontSize: "0.875rem", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <li><strong>Code-Standard Reference Mapping</strong>: The governing mathematical model is cross-referenced against active ASHRAE/ACCA editions.</li>
          <li><strong>Unit Benchmark Validation</strong>: Automated Vitest test suites assert numerical accuracy against published ACCA Manual J/D tables and NIST REFPROP data points.</li>
          <li><strong>Real-World Derating Verification</strong>: Loss penalties (such as flexible duct sag or refrigerant temperature glide) are benchmarked to prevent under-sizing in field installations.</li>
          <li><strong>Regular Code Updates</strong>: Formulas are audited annually to maintain full compliance with updated International Energy Conservation Codes (IECC) and EPA AIM Act phase-down rules.</li>
        </ol>
      </section>

      {/* Supporting Links Footer Section */}
      <section style={{ borderTop: "1px solid var(--border-color)", paddingTop: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
          <Link href="/methodology">View Engineering Methodology →</Link>
          <span aria-hidden="true" style={{ margin: "0 0.75rem", opacity: 0.4 }}>•</span>
          <Link href="/sources">Laboratory Sources &amp; Standards →</Link>
          <span aria-hidden="true" style={{ margin: "0 0.75rem", opacity: 0.4 }}>•</span>
          <Link href="/privacy">Privacy Policy →</Link>
        </p>
      </section>
    </article>
  );
}
