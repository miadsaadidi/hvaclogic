import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "Miad S. — Technical Author & Calculation Architect",
  description:
    "Author profile for Miad S., creator of HVACLogic's HVAC calculation engines, psychrometric models, and technical reference tools.",
  alternates: { canonical: `${siteConfig.canonicalDomain}/authors/miad-s` },
  openGraph: {
    title: "Miad S. — Technical Author & Calculation Architect | HVACLogic",
    description:
      "Author profile for Miad S., creator of HVACLogic's HVAC calculation engines, psychrometric models, and technical reference tools.",
    url: `${siteConfig.canonicalDomain}/authors/miad-s`,
    siteName: siteConfig.name,
    type: "profile",
  },
};

export default function AuthorProfilePage() {
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.canonicalDomain}/authors/miad-s/#profile`,
    url: `${siteConfig.canonicalDomain}/authors/miad-s`,
    name: "Miad S. Author Profile",
    mainEntity: {
      "@type": "Person",
      "@id": `${siteConfig.canonicalDomain}/authors/miad-s/#person`,
      name: "Miad S.",
      jobTitle: "Technical Author & Calculation Architect",
      worksFor: {
        "@type": "Organization",
        name: "HVACLogic",
        url: siteConfig.canonicalDomain,
      },
      description:
        "Primary author and software architect responsible for the mathematical formulations, psychrometric algorithms, duct aerodynamic models, and client-side computational engines on HVACLogic.org.",
      knowsAbout: [
        "Heating, Ventilation, and Air Conditioning (HVAC)",
        "Thermodynamics",
        "Psychrometrics",
        "Fluid Mechanics & Duct Sizing",
        "Applied Building Physics Modeling",
        "Building Energy Standards",
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      <article className="page site-container" style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
        {/* Breadcrumbs */}
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/about">About</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Miad S.</span>
        </nav>

        {/* Author Header Card */}
        <header
          style={{
            padding: "2rem",
            borderRadius: "1rem",
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderLeft: "4px solid var(--accent-cooling)",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(0, 210, 255, 0.1)",
                border: "2px solid var(--accent-cooling)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              👨‍💻
            </div>
            <div>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: "0 0 0.25rem", color: "var(--ink)" }}>
                Miad S.
              </h1>
              <p style={{ fontSize: "0.95rem", color: "var(--accent-cooling)", fontWeight: 600, margin: 0 }}>
                Technical Author &amp; Calculation Architect
              </p>
            </div>
          </div>

          <p style={{ fontSize: "1rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: "0 0 1.25rem" }}>
            Miad S. is the primary author and software architect of HVACLogic.org. He designs, implements, and maintains
            the site&apos;s open-access thermodynamic calculation engines, airflow aerodynamics models, and technical reference
            frameworks.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                background: "var(--surface-raised)",
                border: "1px solid var(--border-color)",
                padding: "0.3rem 0.65rem",
                borderRadius: "0.35rem",
                color: "var(--ink-secondary)",
              }}
            >
              Thermodynamics &amp; Psychrometrics
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                background: "var(--surface-raised)",
                border: "1px solid var(--border-color)",
                padding: "0.3rem 0.65rem",
                borderRadius: "0.35rem",
                color: "var(--ink-secondary)",
              }}
            >
              Fluid Dynamics &amp; Air Distribution
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                background: "var(--surface-raised)",
                border: "1px solid var(--border-color)",
                padding: "0.3rem 0.65rem",
                borderRadius: "0.35rem",
                color: "var(--ink-secondary)",
              }}
            >
              Client-Side Physics Engines
            </span>
          </div>
        </header>

        {/* Editorial Role & Attribution Charter */}
        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 1rem" }}>
            Role &amp; Editorial Responsibility
          </h2>
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "0.75rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
              fontSize: "0.9rem",
              lineHeight: 1.65,
              color: "var(--ink-secondary)",
            }}
          >
            <p style={{ margin: "0 0 1rem" }}>
              <strong>Calculation Architecture:</strong> Formulates mathematical calculation models derived from
              public consensus standards (including ASHRAE Handbooks, ACCA Manuals, SMACNA Duct Construction Standards,
              and NIST thermophysical equations of state).
            </p>
            <p style={{ margin: "0 0 1rem" }}>
              <strong>Software Validation &amp; Quality Control:</strong> Authors automated Vitest regression suites to
              verify numerical outputs against documented reference cases and empirical datasets.
            </p>
            <p style={{ margin: 0 }}>
              <strong>Regulatory Integrity:</strong> Implements layered engineering disclaimers, domain boundary limits,
              and standards metadata tracking to ensure tools serve responsibly as preliminary design aids and educational references.
            </p>
          </div>
        </section>

        {/* Governance Transparency Notice */}
        <section
          style={{
            padding: "1.25rem 1.5rem",
            borderRadius: "0.75rem",
            background: "rgba(0, 210, 255, 0.04)",
            border: "1px solid rgba(0, 210, 255, 0.2)",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color: "var(--ink-secondary)",
            marginBottom: "3rem",
          }}
        >
          <strong style={{ color: "var(--ink)", display: "block", marginBottom: "0.25rem" }}>
            ⚖️ Professional Practice &amp; Attribution Notice
          </strong>
          Miad S. authors technical calculations as generalized computational models. HVACLogic does not provide licensed
          Professional Engineering (PE) services, site-specific mechanical designs, or stamped permit calculations. Where local
          regulations require stamped engineering submittals, users must engage a locally licensed Professional Engineer.
        </section>

        {/* Navigation Footer */}
        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", textAlign: "center" }}>
          <Link href="/calculators" style={{ color: "var(--accent-cooling)", fontWeight: 600, fontSize: "0.9rem" }}>
            ← Explore All HVAC Engineering Calculators
          </Link>
        </div>
      </article>
    </>
  );
}
