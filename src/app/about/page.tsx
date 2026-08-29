import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/brand/Logo";
import { CitationExportButton } from "@/components/seo/CitationExportButton";

export const metadata: Metadata = {
  title: "About HVACLogic — Deterministic HVAC & Building Science Suite",
  description: "Learn about HVACLogic: our mission to replace black-box sales estimators with open, peer-reviewed engineering calculators for HVAC engineers, technicians, and contractors.",
  alternates: { canonical: `${siteConfig.canonicalDomain}/about` },
  openGraph: {
    title: "About HVACLogic — Transparent HVAC Engineering System",
    description: "Replacing black-box sales estimators with open, deterministic HVAC calculation tools.",
    url: `${siteConfig.canonicalDomain}/about`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About HVACLogic — Transparent HVAC Engineering System",
    description: "Replacing black-box sales estimators with open, deterministic HVAC calculation tools.",
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
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 1rem" }}>
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

      {/* Academic Research & Preprint Citation */}
      <section style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.2)", borderLeft: "4px solid var(--accent-cooling)", marginBottom: "3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "1.25rem" }}>📚</span>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
            Academic Research &amp; Open Scientific Preprint
          </h2>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
          The computational architecture governing HVACLogic is formally documented and archived in the open-access scientific literature:
        </p>
        <div style={{ background: "var(--surface)", padding: "1rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)", marginBottom: "1rem", fontFamily: "var(--font-mono, monospace)", fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
          <strong>Citation:</strong> HVACLogic Engineering Working Group (2026). <em>Deterministic Building Science and Thermodynamic Modeling Framework for Real-Time Field Diagnostics, Air Distribution, and Decarbonization Sizing</em>. Permanent Open-Access Preprint.
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.85rem" }}>
          <a
            href="/papers/HVACLogic_Deterministic_Building_Science_Whitepaper.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-cooling)", fontWeight: 600, textDecoration: "none" }}
          >
            <span>📄 Download Whitepaper PDF ↗</span>
          </a>
          <a
            href="https://archive.org/details/power-lab-deterministic-clean-energy-modeling-framework-2026_20260826"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-cooling)", fontWeight: 600, textDecoration: "none" }}
          >
            <span>🏛️ View on Internet Archive (DA 96) ↗</span>
          </a>
          <a
            href="https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-cooling)", fontWeight: 600, textDecoration: "none" }}
          >
            <span>🎓 View on Academia.edu (DA 93) ↗</span>
          </a>
          <CitationExportButton />
        </div>
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
