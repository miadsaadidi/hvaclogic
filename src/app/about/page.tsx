import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/brand/Logo";
import { CitationExportButton } from "@/components/seo/CitationExportButton";

export const metadata: Metadata = {
  title: "About Us & Engineering Mission",
  description:
    "About HVACLogic: transparent engineering calculators and technical references for HVAC engineers, technicians, contractors, and building scientists.",
  keywords: [
    "HVACLogic",
    "HVAC engineering calculators",
    "HVAC calculation methodology",
    "HVAC engineering tools",
    "HVAC technical references",
  ],
  alternates: { canonical: `${siteConfig.canonicalDomain}/about` },
  openGraph: {
    title: "About Us & Engineering Mission — HVACLogic",
    description:
      "About HVACLogic: transparent engineering calculators and technical references for HVAC engineers, technicians, contractors, and building scientists.",
    url: `${siteConfig.canonicalDomain}/about`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "About HVACLogic — Transparent HVAC Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us & Engineering Mission — HVACLogic",
    description:
      "About HVACLogic: transparent engineering calculators and technical references for HVAC engineers, technicians, contractors, and building scientists.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteConfig.canonicalDomain}/about/#about`,
    name: "About HVACLogic",
    description:
      "About HVACLogic: transparent engineering calculators and technical references for HVAC engineers, technicians, contractors, and building scientists.",
    url: `${siteConfig.canonicalDomain}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "HVACLogic",
      url: siteConfig.canonicalDomain,
      description:
        "Open-access HVAC engineering calculators and technical references built with client-side computation.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
            HVACLogic was created to provide transparent, reproducible calculation tools and technical references as an alternative to opaque or lead-generation-focused calculators. We believe HVAC design engineers, mechanical contractors, and building scientists deserve <strong>transparent, reproducible calculations with visible physical assumptions and losses</strong>.
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
                Zero forced email captures, zero phone number solicitations, and zero gated results. Every calculation output, chart, and exportable report is accessible immediately.
              </p>
            </div>

            <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #38bdf8" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>📐</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>Physics-Based Engineering Models</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
                Calculations are derived from physical principles and published engineering methods, industry standards (ASHRAE, ACCA, SMACNA), energy codes (IECC), and thermophysical property reference data.
              </p>
            </div>

            <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #10b981" }}>
              <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>🛡️</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>Client-Side Calculations</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
                All calculation models execute client-side directly inside your browser. No project floor plans, load figures, or customer dimensions are stored in an external database. Standard anonymous web analytics are collected for performance measurement.
              </p>
            </div>
          </div>
        </section>

        {/* Validation & Engineering Review Process */}
        <section style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
            Validation &amp; Engineering Review Process
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
            Every formula implemented in HVACLogic undergoes a multi-stage review and testing process before deployment:
          </p>
          <ol style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", fontSize: "0.875rem", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <li><strong>Engineering Reference Mapping</strong>: Mathematical equations and reference tables are cross-referenced against active ASHRAE, ACCA, and industry technical publications.</li>
            <li><strong>Automated Regression &amp; Unit Testing</strong>: Automated Vitest test suites verify calculations against documented reference cases and thermophysical property data points.</li>
            <li><strong>Documented Empirical Deratings</strong>: Selected empirical correction factors (such as flexible duct sag models and zeotropic refrigerant temperature glide) are incorporated using documented engineering references and stated assumptions.</li>
            <li><strong>Ongoing Standards &amp; Code Review</strong>: We review relevant standards, codes, and regulatory changes and update applicable calculation methods when appropriate.</li>
          </ol>
        </section>

        {/* Academic Documentation & Open Technical Monograph */}
        <section style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "rgba(0, 210, 255, 0.04)", border: "1px solid rgba(0, 210, 255, 0.2)", borderLeft: "4px solid var(--accent-cooling)", marginBottom: "3.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.25rem" }}>📚</span>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
              Technical Documentation &amp; Open Monograph
            </h2>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1rem" }}>
            The mathematical models and computational methods powering HVACLogic are documented in an open technical preprint and engineering monograph:
          </p>
          <div style={{ background: "var(--surface)", padding: "1rem 1.25rem", borderRadius: "0.5rem", border: "1px solid var(--border-color)", marginBottom: "1rem", fontFamily: "var(--font-mono, monospace)", fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
            <strong>Citation:</strong> HVACLogic Engineering Working Group (2026). <em>Deterministic Building Science and Thermodynamic Modeling Framework for Real-Time Field Diagnostics, Air Distribution, and Decarbonization Sizing</em>. Open Technical Monograph.
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
              <span>🏛️ View on Internet Archive ↗</span>
            </a>
            <a
              href="https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", color: "var(--accent-cooling)", fontWeight: 600, textDecoration: "none" }}
            >
              <span>🎓 View on Academia.edu ↗</span>
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
    </>
  );
}
