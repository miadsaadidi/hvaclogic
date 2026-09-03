import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Laboratory Sources & Engineering Standards",
  description: "Official standards powering HVACLogic: ASHRAE Handbook, ACCA Manuals J/S/D, SMACNA, EPA Section 608, AHRI 210/240, and NIST REFPROP.",
  alternates: { canonical: `${siteConfig.canonicalDomain}/sources` },
  openGraph: {
    title: "Laboratory Sources & Standards",
    description: "Scientific and industry references informing HVACLogic deterministic calculation engines.",
    url: `${siteConfig.canonicalDomain}/sources`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVACLogic Laboratory Sources & Standards",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laboratory Sources & Standards — HVACLogic",
    description: "Scientific and industry references informing HVACLogic deterministic calculation engines.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

const REVIEW_DATE = "August 19, 2026";

interface StandardItem {
  code: string;
  organization: string;
  title: string;
  description: string;
  link: string;
}

const STANDARDS_LIST: StandardItem[] = [
  {
    code: "ASHRAE Fundamentals",
    organization: "American Society of Heating, Refrigerating and Air-Conditioning Engineers",
    title: "ASHRAE Handbook — Fundamentals (Chapters 18, 21, 30)",
    description: "Governs outdoor climatic design conditions, duct design fluid mechanics (Darcy-Weisbach / Colebrook equations), and psychrometric state points.",
    link: "https://www.ashrae.org",
  },
  {
    code: "ASHRAE RP-1333",
    organization: "ASHRAE & Energy Systems Laboratory (Texas A&M)",
    title: "Air Duct Friction Losses for Flexible Ductwork (Research Project 1333)",
    description: "Landmark research by Dr. Charles H. Culp, P.E., Ph.D. et al. establishing empirical fluid friction and boundary-layer turbulence penalties across 4% to 30% flexible duct compression and sag.",
    link: "https://technologyportal.ashrae.org/Report/Detail/583",
  },
  {
    code: "ACCA Manual J",
    organization: "Air Conditioning Contractors of America",
    title: "Manual J (8th Edition) — Residential Load Calculation",
    description: "National ANSI standard for sizing residential heating and cooling equipment based on building envelope heat loss and sensible/latent heat gain.",
    link: "https://www.acca.org",
  },
  {
    code: "ACCA Manual S",
    organization: "Air Conditioning Contractors of America",
    title: "Manual S (2nd Edition) — Residential Equipment Selection",
    description: "Standard protocol for matching sensible and latent cooling capacities of OEM equipment to Manual J loads within 90%–115% tolerances.",
    link: "https://www.acca.org",
  },
  {
    code: "ACCA Manual D",
    organization: "Air Conditioning Contractors of America",
    title: "Manual D (3rd Edition) — Residential Duct Systems",
    description: "Comprehensive ductwork sizing methodology utilizing Total Effective Length (TEL), available static pressure, and equal friction rate calculations.",
    link: "https://www.acca.org",
  },
  {
    code: "SMACNA HVAC Standards",
    organization: "Sheet Metal and Air Conditioning Contractors' National Association",
    title: "HVAC Duct Construction Standards — Metal and Flexible (4th Edition)",
    description: "Standardizes duct gauge thicknesses, reinforcement requirements, fitting loss coefficients, and flexible duct sag derating curves.",
    link: "https://www.smacna.org",
  },
  {
    code: "EPA Section 608 & AIM Act",
    organization: "United States Environmental Protection Agency",
    title: "Clean Air Act Section 608 & American Innovation and Manufacturing Act",
    description: "Mandates refrigerant recovery standards, leak rate repair thresholds, and phasedown protocols transitioning from R-410A to A2L alternatives.",
    link: "https://www.epa.gov",
  },
  {
    code: "AHRI Standard 210/240",
    organization: "Air-Conditioning, Heating, and Refrigeration Institute",
    title: "Performance Rating of Unitary Air-Conditioning & Air-Source Heat Pump Equipment",
    description: "Defines the test procedures for SEER2, EER2, and HSPF2 energy efficiency ratings under standard M1 static pressure testing.",
    link: "https://www.ahrinet.org",
  },
  {
    code: "IECC 2021 / 2024",
    organization: "International Code Council",
    title: "International Energy Conservation Code — Residential & Commercial",
    description: "Specifies prescriptive and performance-based building envelope insulation levels (R-values, continuous exterior insulation, and assembly U-factors).",
    link: "https://www.iccsafe.org",
  },
  {
    code: "NIST REFPROP V10",
    organization: "National Institute of Standards and Technology",
    title: "Reference Fluid Thermodynamic and Transport Properties Database",
    description: "Provides high-accuracy pressure-temperature-enthalpy polynomial fits for single-component refrigerants and non-azeotropic zeotropic mixtures.",
    link: "https://www.nist.gov",
  },
];

export default function SourcesPage() {
  return (
    <article className="page site-container" style={{ maxWidth: "1080px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Data Sources &amp; Standards</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.3rem 0.85rem",
            borderRadius: "9999px",
            background: "rgba(0, 210, 255, 0.08)",
            border: "1px solid rgba(0, 210, 255, 0.22)",
            color: "var(--accent-cooling)",
            fontSize: "0.78rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "0.75rem",
          }}
        >
          <span>🏛️</span>
          <span>Verified Citations &amp; Technical Standards</span>
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 1rem" }}>
          Laboratory Sources &amp; Standards
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "800px" }}>
          HVACLogic mathematical equations, physical derating coefficients, and editable presets are maintained against verified peer-reviewed publications, national laboratories, and engineering safety standards.
        </p>
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
          Last Reviewed &amp; Audited: <strong>{REVIEW_DATE}</strong>
        </div>
      </header>

      {/* Standards Grid */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 1.25rem" }}>
          Authoritative Engineering Standards
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {STANDARDS_LIST.map((item) => (
            <div
              key={item.code}
              style={{
                padding: "1.35rem",
                borderRadius: "0.85rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "3px solid var(--accent-cooling)",
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent-cooling)", textTransform: "uppercase" }}>
                  {item.code}
                </span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Verified</span>
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", margin: "0.2rem 0" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--accent-primary)", margin: 0 }}>
                {item.organization}
              </p>
              <p style={{ fontSize: "0.83rem", color: "var(--ink-secondary)", lineHeight: 1.5, flex: 1, margin: "0.35rem 0 0" }}>
                {item.description}
              </p>
              <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent-cooling)", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                >
                  Visit Standard Organization ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supporting Links Footer Section */}
      <section style={{ borderTop: "1px solid var(--border-color)", paddingTop: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
          <Link href="/methodology">View Engineering Methodology →</Link>
          <span aria-hidden="true" style={{ margin: "0 0.75rem", opacity: 0.4 }}>•</span>
          <Link href="/about">About HVACLogic →</Link>
          <span aria-hidden="true" style={{ margin: "0 0.75rem", opacity: 0.4 }}>•</span>
          <Link href="/privacy">Privacy Policy →</Link>
        </p>
      </section>
    </article>
  );
}
