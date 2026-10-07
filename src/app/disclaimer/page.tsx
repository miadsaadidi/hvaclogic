import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Engineering Disclaimer & Regulatory Notice",
  description:
    "Engineering disclaimer, regulatory notice, and computational model boundaries for HVACLogic calculators, technical guides, datasets, and design references.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/disclaimer`,
  },
  openGraph: {
    title: "Engineering Disclaimer & Regulatory Notice — HVACLogic",
    description:
      "Engineering disclaimer, regulatory notice, and computational model boundaries for HVACLogic calculators, technical guides, datasets, and design references.",
    url: `${siteConfig.canonicalDomain}/disclaimer`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVACLogic Engineering Disclaimer & Regulatory Notice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Disclaimer & Regulatory Notice — HVACLogic",
    description:
      "Engineering disclaimer, regulatory notice, and computational model boundaries for HVACLogic calculators, technical guides, datasets, and design references.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function DisclaimerPage() {
  const canonicalUrl = `${siteConfig.canonicalDomain}/disclaimer`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        name: "Engineering Disclaimer & Regulatory Notice",
        description:
          "Comprehensive engineering disclaimer and computational boundaries for HVACLogic open-access tools, technical guides, and datasets.",
        url: canonicalUrl,
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.canonicalDomain}/#website`,
          name: "HVACLogic",
          url: siteConfig.canonicalDomain,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.canonicalDomain,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Disclaimer",
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  const sections = [
    {
      id: "educational-reference-purpose",
      num: "1",
      title: "Educational & Engineering Reference Purpose",
      content: (
        <>
          <p>
            HVACLogic is an open-access engineering and educational publication authored by Miad S. and independent engineering contributors. All computational tools, sizing calculators, flow visualizers, technical guides, research monographs, benchmark datasets, and reference tables provided across the platform are created strictly for preliminary screening, parametric evaluation, conceptual exploration, and professional educational reference.
          </p>
          <p>
            HVACLogic does not provide licensed professional mechanical engineering services, architectural services, commissioning consulting, or formal plan-check submittals. The materials published on this platform do not establish an engineer-client, contractor-client, or fiduciary relationship of any kind.
          </p>
        </>
      ),
    },
    {
      id: "no-replacement-for-codes",
      num: "2",
      title: "No Replacement for Applicable Codes, Standards & Regulations",
      content: (
        <>
          <p>
            Building construction, heating, ventilation, air conditioning, refrigeration, fuel gas piping, and electrical installations are governed by a distinct hierarchy of regulatory and technical authorities.
          </p>
          <p>
            Users must distinguish among these regulatory tiers:
          </p>
          <ul>
            <li>
              <strong>Adopted Model Codes &amp; Jurisdictional Amendments:</strong> Legally binding statutes enacted by state, provincial, or municipal governments (such as the International Mechanical Code [IMC], International Residential Code [IRC], International Energy Conservation Code [IECC], Uniform Mechanical Code [UMC], and local Authority Having Jurisdiction [AHJ] amendments). These adopted codes carry statutory force of law.
            </li>
            <li>
              <strong>Consensus Standards:</strong> Technically rigorous consensus publications developed by accredited standards-setting bodies (such as ANSI/ASHRAE Standard 15, ANSI/ASHRAE Standard 34, ASHRAE 90.1, NFPA 54, NFPA 70 / NEC, and UL/CSA 60335-2-40). Consensus standards establish engineering best practices and become legally binding only when expressly incorporated by reference into an adopted model code or local statute. Referencing a standard on HVACLogic does not imply that the standard is legally governing in a given jurisdiction absent formal statutory adoption.
            </li>
            <li>
              <strong>Federal &amp; Statutory Regulations:</strong> Mandatory administrative rules enacted by regulatory agencies (such as EPA regulations under the AIM Act and Clean Air Act Section 608, OSHA safety mandates, and DOE energy conservation standards).
            </li>
            <li>
              <strong>Manufacturer Requirements:</strong> Equipment-specific instructions, manuals, listing limitations, and certified ratings that must be observed for safe operation, warranty validity, and listing compliance.
            </li>
            <li>
              <strong>Industry Guidance &amp; Design Manuals:</strong> Recommended engineering workflows and calculation methodologies (such as ACCA Manuals J, S, D and SMACNA guidelines) providing standardized reference procedures.
            </li>
            <li>
              <strong>Project-Specific Engineering Requirements:</strong> Contract documents, architectural plans, structural boundaries, and stamped mechanical specifications prepared by the engineer of record.
            </li>
          </ul>
          <p>
            HVACLogic outputs, guidance, and tables never supersede, amend, or grant variance from any adopted law, statutory regulation, code, or AHJ directive.
          </p>
        </>
      ),
    },
    {
      id: "manufacturer-documentation",
      num: "3",
      title: "Manufacturer Documentation & Project-Specific Requirements",
      content: (
        <>
          <p>
            Generic engineering formulations and thermodynamic approximations provide standardized baseline models. However, equipment selection, field installation, and safe operation require rigorous adherence to equipment-specific manufacturer documentation and project-specific engineering requirements.
          </p>
          <p>
            Manufacturer documentation, approved and certified performance ratings where applicable (such as AHRI Directory listings), equipment technical manuals, submittal schedules, and installation instructions constitute essential equipment-specific sources that must be verified and followed where applicable. They provide actual capacities, electrical ratings, clearance envelopes, and control sequences that generic tools cannot replicate.
          </p>
          <p>
            Users must verify all equipment selections against:
          </p>
          <ul>
            <li>Manufacturer engineering product data catalogs, certified submittal drawings, and equipment schedules</li>
            <li>Expanded heating and cooling performance rating tables at specific indoor dry-bulb/wet-bulb and outdoor ambient temperatures</li>
            <li>Certified AHRI Directory performance ratings (e.g., AHRI 210/240, 340/360, 1230) and third-party safety listings (e.g., UL, CSA, ETL)</li>
            <li>Manufacturer technical specifications for Minimum Circuit Ampacity (MCA), Maximum Overcurrent Protection (MOP), and branch circuit requirements</li>
            <li>Certified blower performance data, manufacturer fan curves, and external static pressure tables</li>
            <li>Equipment-specific installation, operation, and maintenance manuals (IOMs)</li>
          </ul>
          <p>
            Generic equations, default coil factors, or rule-of-thumb ratios published on HVACLogic cannot replace manufacturer selection software or project submittals. At the same time, manufacturer documentation must be integrated within the governing framework of adopted local building and mechanical codes and licensed professional engineering design.
          </p>
        </>
      ),
    },
    {
      id: "professional-engineering-judgment",
      num: "4",
      title: "Professional Engineering Judgment & Jurisdictional Neutrality",
      content: (
        <>
          <p>
            HVAC system design requires comprehensive engineering judgment, building enclosure analysis, field inspection, and compliance with statutory professional-practice laws.
          </p>
          <p>
            Where professional mechanical design, review, approval, permitting, plan sealing, or certification is required by law, contract, or regulatory authority, users must obtain those services from appropriately licensed Professional Engineers (PE), registered architects, certified commissioning authorities, or qualified mechanical contractors licensed in the applicable jurisdiction.
          </p>
          <p>
            HVACLogic does not endorse, represent, or warrant that its calculations will satisfy the specific permit application requirements, plan-check criteria, or design compliance forms of any individual municipal jurisdiction or AHJ without independent professional verification and stamping by a qualified professional.
          </p>
        </>
      ),
    },
    {
      id: "standards-references-taxonomy",
      num: "5",
      title: "Standards, Codes & Regulatory References",
      content: (
        <>
          <p>
            HVACLogic frequently references engineering standards, guidelines, test procedures, and design manuals published by esteemed standards-development organizations, including ASHRAE, ACCA, SMACNA, AHRI, AMCA, NFPA, ASTM, ASME, and UL.
          </p>
          <p>
            Users must carefully distinguish between:
          </p>
          <ul>
            <li><strong>Adopted Building &amp; Mechanical Codes:</strong> Legally binding statutes enacted by state or local governments (e.g. 2024 IMC, 2024 IRC, state energy codes).</li>
            <li><strong>Consensus Standards:</strong> Technically rigorous consensus publications (e.g. ASHRAE 62.1, ASHRAE 90.1, ASHRAE 15) that become legally binding only when expressly incorporated by reference into an adopted code or specification.</li>
            <li><strong>Industry Design Manuals &amp; Guidelines:</strong> Recommended professional practices (e.g. ACCA Manual J, Manual D, Manual S, SMACNA HVAC Duct Construction Standards) providing calculation workflows.</li>
            <li><strong>Academic Literature &amp; Open Datasets:</strong> Peer-reviewed research, lab experiments, and parametric studies offering empirical insights.</li>
          </ul>
          <p>
            Reference to an organization, standard, or manual on HVACLogic indicates solely that an algorithm or discussion draws upon formulas or data published in that literature. It does not imply that the publishing organization has reviewed, approved, certified, or endorsed HVACLogic or its computational implementations.
          </p>
        </>
      ),
    },
    {
      id: "source-currency-versioning",
      num: "6",
      title: "Source Currency & Versioning",
      content: (
        <>
          <p>
            Engineering standards, building codes, environmental regulations, and manufacturer specifications undergo continuous revision through triennial code cycles, periodic addenda, errata, and regulatory amendments.
          </p>
          <p>
            While HVACLogic strives to maintain up-to-date mathematical formulations and standards citations (such as ASHRAE 15-2024, ASHRAE 34-2022, UL 60335-2-40 4th Edition, and ACCA Manual J 8th Edition), users are solely responsible for verifying the specific edition, addenda, and local amendments in force in the project&apos;s governing jurisdiction.
          </p>
        </>
      ),
    },
    {
      id: "limitations-mathematical-models",
      num: "7",
      title: "Limitations of Mathematical Models",
      content: (
        <>
          <p>
            All engineering calculations executed on HVACLogic rely upon mathematical models, governing differential equations, empirical correlations, and idealized boundary conditions.
          </p>
          <p>
            Common modeling idealizations include:
          </p>
          <ul>
            <li><strong>Steady-State Assumptions:</strong> Many thermal loss, heat gain, and heat transfer algorithms evaluate quasi-steady-state peak conditions, neglecting dynamic thermal mass capacitance, diurnal phase lag, or complex transient solar gains.</li>
            <li><strong>Fluid Mechanics Idealizations:</strong> Duct friction algorithms evaluate Darcy-Weisbach or Colebrook-White formulations assuming fully developed, steady, incompressible flow with uniform roughness, which may deviate from turbulent conditions near irregular fittings or unstraightened runs.</li>
            <li><strong>Psychrometric Formulations:</strong> Moist air state points calculated via ASHRAE Hyland-Wexler formulations assume ideal gas behavior for moist air mixtures under standard atmospheric pressures unless barometric pressure corrections are explicitly applied.</li>
          </ul>
        </>
      ),
    },
    {
      id: "calculators-interactive-tools",
      num: "8",
      title: "Calculators & Interactive Tools",
      content: (
        <>
          <p>
            HVACLogic calculators execute client-side in the user&apos;s web browser. Numerical outputs represent repeatable numerical evaluations of the stated mathematical models and user-supplied input values.
          </p>
          <p>
            Numerical outputs must <strong>NOT</strong> be interpreted as:
          </p>
          <ul>
            <li>Certification that an equipment capacity or duct layout is safe or sufficient</li>
            <li>Guarantee that an HVAC system will maintain target space temperature or humidity</li>
            <li>An approved permit submittal or official code compliance report</li>
            <li>Verification that an installation will pass municipal inspection or commissioning tests</li>
          </ul>
          <p>
            Small differences in input parameters—such as duct roughness factors, equivalent length fitting selections, outdoor design temperatures, infiltration rates, or internal load schedules—can yield substantial variations in calculated outputs.
          </p>
        </>
      ),
    },
    {
      id: "hvac-design-performance-limitations",
      num: "9",
      title: "HVAC Design & Real-World Building Performance",
      content: (
        <>
          <p>
            Real-world heating and cooling performance in buildings is determined by complex, interacting physical systems that cannot be fully captured in simplified web-based calculation aids.
          </p>
          <p>
            These real-world factors include:
          </p>
          <ul>
            <li>Building envelope construction quality, air sealing integrity (ACH50/CFM50), and thermal bridging across structural members</li>
            <li>Fenestration orientation, shading from adjacent structures or trees, and solar heat gain dynamics</li>
            <li>Occupancy density variations, equipment operational schedules, and internal lighting loads</li>
            <li>Sensible Heat Ratio (SHR) balancing and latent dehumidification requirements in humid climate zones</li>
            <li>Zoning diversity, duct thermal losses in unconditioned attics or crawlspaces, and room-to-room pressure balancing</li>
            <li>Thermostat placement, control staging, setback recovery dynamics, and variable-speed inverter modulation algorithms</li>
          </ul>
        </>
      ),
    },
    {
      id: "equipment-specifications-data",
      num: "10",
      title: "Equipment Data & Manufacturer Specifications",
      content: (
        <>
          <p>
            Equipment data, nominal tonnage ratings, SEER2/EER2/HSPF2/COP values, compressor displacement metrics, and model-decoder patterns published on HVACLogic serve solely as representative technical references.
          </p>
          <p>
            Manufacturers modify equipment dimensions, electrical characteristics, sound ratings, coil configurations, and refrigerant charges without notice. Designers and technicians must confirm exact specifications directly on the equipment nameplate and manufacturer engineering submittals before rough-in, electrical disconnect sizing, or equipment procurement.
          </p>
        </>
      ),
    },
    {
      id: "installation-commissioning-field",
      num: "11",
      title: "Installation, Commissioning & Field Conditions",
      content: (
        <>
          <p>
            Theoretical calculations assume ideal installation in accordance with industry best practices and manufacturer guidelines. Actual field performance depends heavily on physical craftsmanship and proper commissioning.
          </p>
          <p>
            Crucial field variables that influence system delivery include:
          </p>
          <ul>
            <li><strong>Flexible Duct Installation:</strong> Longitudinal compression, sag, sharp bends, and improper strapping dramatically increase friction loss and reduce airflow compared to idealized straight runs.</li>
            <li><strong>Duct Air Leakage:</strong> Unsealed joints and seams degrade delivered thermal capacity and disrupt room pressure balance.</li>
            <li><strong>Refrigerant Charge &amp; Airflow:</strong> Incorrect subcooling/superheat charging, improper line-set elevation traps, or restricted evaporator airflow compromise compressor reliability and capacity.</li>
            <li><strong>Air Balancing:</strong> Proper balancing dampers and calibrated flow hood measurements (TAB) are necessary to verify room-by-room CFM distribution.</li>
          </ul>
        </>
      ),
    },
    {
      id: "safety-critical-high-risk",
      num: "12",
      title: "Safety-Critical & High-Risk Applications",
      content: (
        <>
          <p>
            Certain HVAC and building mechanical applications involve direct life-safety, fire protection, toxic gas, combustion, or structural risk. These applications require heightened diligence, specialized trade licensing, and rigorous field testing.
          </p>
          <div
            style={{
              padding: "1rem 1.25rem",
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              borderLeft: "4px solid #ef4444",
              borderRadius: "0.5rem",
              margin: "1rem 0",
              color: "var(--ink)",
            }}
          >
            <strong style={{ color: "#b91c1c", display: "block", marginBottom: "0.4rem" }}>
              ⚠️ High-Risk Domain Notice:
            </strong>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.6 }}>
              <li>
                <strong>Combustion Air &amp; Venting:</strong> Inadequate combustion air or compromised flue venting can result in incomplete combustion, hazardous carbon monoxide (CO) generation, flame rollout, and lethal poisonings. Always conduct combustion analysis and draft verification in accordance with NFPA 54 / IFGC and appliance manufacturer instructions.
              </li>
              <li>
                <strong>Flammable &amp; Lower-Flammability Refrigerants (A2L, A2, A3):</strong> Transitioning to lower-GWP refrigerants (such as R-454B, R-32, and R-290) requires strict adherence to charge limits ($m_1, m_2, m_3$), room volume constraints, non-incendive tooling (UL 121201), refrigerant detection systems (RDS), and mechanical ventilation interlocks under ASHRAE 15 and UL 60335-2-40.
              </li>
              <li>
                <strong>Boilers &amp; Hydronic Pressure Vessels:</strong> Hydronic heating equipment operates under hydrostatic pressure and thermal expansion. Safety relief valves must be certified per ASME Section IV and piped to an approved disposal location.
              </li>
              <li>
                <strong>Kitchen Commercial Exhaust &amp; Make-Up Air:</strong> Grease duct construction, clearance to combustibles, and make-up air interlocks are governed by NFPA 96 and IMC Chapter 5 to prevent fire hazards.
              </li>
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "third-party-data-external-sources",
      num: "13",
      title: "Third-Party Data & External Sources",
      content: (
        <>
          <p>
            HVACLogic aggregates meteorological datasets, climatic design temperatures, physical constants, refrigerant thermodynamic tables, and standards citations from respected external scientific sources, such as:
          </p>
          <ul>
            <li>ASHRAE climatic data summaries (Handbook of Fundamentals)</li>
            <li>National Oceanic and Atmospheric Administration (NOAA) weather stations</li>
            <li>National Institute of Standards and Technology (NIST) REFPROP thermodynamic database</li>
            <li>Department of Energy (DOE) and National Renewable Energy Laboratory (NREL) open publications</li>
          </ul>
          <p>
            While sourced with care, external data is subject to observation inaccuracies, station relocations, microclimate variations, and source revisions. HVACLogic does not guarantee the perpetual accuracy or completeness of third-party data.
          </p>
        </>
      ),
    },
    {
      id: "accuracy-completeness-boundaries",
      num: "14",
      title: "Accuracy & Completeness Boundaries",
      content: (
        <>
          <p>
            The software, calculators, equations, and copy on HVACLogic are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis, without warranty of any kind, express or implied.
          </p>
          <p>
            To the fullest extent permitted by applicable law, HVACLogic disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, and accuracy of calculation results. HVACLogic does not warrant that calculations will be error-free, uninterrupted, or suitable for any specific construction, renovation, or mechanical project.
          </p>
        </>
      ),
    },
    {
      id: "user-responsibility-verification",
      num: "15",
      title: "User Responsibility for Independent Verification",
      content: (
        <>
          <p>
            Users of HVACLogic—including engineers, contractors, architects, energy modelers, facility managers, students, and homeowners—assume full responsibility for:
          </p>
          <ul>
            <li>Independently checking all mathematical formulas, units, and input values before relying on results</li>
            <li>Verifying that sizing and design selections comply with the adopted codes and regulations of the project&apos;s specific jurisdiction</li>
            <li>Reviewing all final equipment selections against certified manufacturer performance tables and submittals</li>
            <li>Engaging licensed design professionals and certified contractors where required by law, permitting authority, or project complexity</li>
          </ul>
          <p>
            In no event shall HVACLogic, its authors, maintainers, or contributors be liable for any direct, indirect, incidental, consequential, special, exemplary, or punitive damages arising out of the use, interpretation, or inability to use the tools, calculators, datasets, or guidance provided on this website.
          </p>
        </>
      ),
    },
    {
      id: "governing-law-severability",
      num: "16",
      title: "Governing Law & Severability",
      content: (
        <>
          <p>
            If any provision of this Engineering Disclaimer is determined by a court of competent jurisdiction to be unlawful, void, or unenforceable, that provision shall be deemed severable from the remaining provisions and shall not affect the validity and enforceability of any remaining terms.
          </p>
        </>
      ),
    },
    {
      id: "relationship-terms-privacy",
      num: "17",
      title: "Relationship to Privacy Policy & Terms of Service",
      content: (
        <>
          <p>
            This Engineering Disclaimer operates in conjunction with HVACLogic&apos;s{" "}
            <Link href="/privacy" style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}>
              Privacy Policy
            </Link>{" "}
            and general site usage terms. By accessing, browsing, calculating with, or citing content from HVACLogic, you acknowledge and agree to all terms, notices, and boundaries set forth in this document.
          </p>
          <p>
            If you identify a calculation discrepancy, potential equation error, or standards citation update, please report it directly through our open-source tracking repository on{" "}
            <a
              href="https://github.com/miadsaadidi/hvaclogic/issues"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}
            >
              GitHub Issues ↗
            </a>
            .
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article
        className="site-container"
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          padding: "3rem 1.5rem 5rem",
        }}
      >
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumbs" style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <li>
              <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--ink)", fontWeight: 600 }}>Disclaimer</li>
          </ol>
        </nav>

        {/* HEADER */}
        <header style={{ marginBottom: "2.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--accent-cooling)",
                background: "rgba(0, 210, 255, 0.1)",
                padding: "0.25rem 0.65rem",
                borderRadius: "4px",
              }}
            >
              Legal &amp; Engineering Governance
            </span>
            <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
              Effective: October 2026
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(1.85rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              margin: "0 0 1rem",
            }}
          >
            Engineering Disclaimer &amp; Regulatory Notice
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "var(--ink-secondary)",
              margin: 0,
            }}
          >
            Clear principles governing computational algorithms, thermodynamic models, engineering references, and regulatory compliance boundaries across HVACLogic.
          </p>
        </header>

        {/* SUMMARY CALLOUT */}
        <div
          style={{
            padding: "1.5rem",
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.75rem",
            marginBottom: "3rem",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 0.75rem", color: "var(--ink)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>📌</span> Summary of Key Principles
          </h2>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "var(--ink-secondary)", lineHeight: 1.7, fontSize: "0.9rem" }}>
            <li><strong>Preliminary Reference Only:</strong> HVACLogic provides educational, research, and preliminary screening tools—not licensed engineering design, code compliance certifications, or sealed permit submittals.</li>
            <li><strong>Codes &amp; Standards Hierarchy:</strong> Adopted building, mechanical, and fire codes (such as IMC, IRC, IECC, UMC) and local jurisdictional amendments legally govern installations. Voluntary consensus standards (such as ASHRAE 15, ASHRAE 90.1, NFPA 54) become legally enforceable only to the extent formally adopted into law or incorporated by reference by the governing jurisdiction.</li>
            <li><strong>Equipment-Specific Requirements:</strong> Manufacturer documentation, approved and certified ratings (such as AHRI listings), equipment technical manuals, submittals, and installation instructions are essential equipment-specific sources that must be followed where applicable, without implying they universally supersede applicable codes or sound engineering design.</li>
            <li><strong>Professional Verification Required:</strong> System design must be guided by project-specific engineering requirements, field conditions, and professional judgment. Where stamped calculations, permits, or formal approvals are required, engage licensed Professional Engineers in the relevant jurisdiction.</li>
          </ul>
        </div>

        {/* TABLE OF CONTENTS */}
        <nav
          aria-label="Table of Contents"
          style={{
            padding: "1.25rem 1.5rem",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.75rem",
            marginBottom: "3.5rem",
          }}
        >
          <h2 style={{ fontSize: "0.95rem", fontWeight: 700, margin: "0 0 0.85rem", color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Table of Contents
          </h2>
          <ol style={{ margin: 0, paddingLeft: "1.25rem", columnCount: 2, columnGap: "2rem", fontSize: "0.85rem", lineHeight: 1.8 }}>
            {sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  style={{
                    color: "var(--accent-cooling)",
                    textDecoration: "none",
                  }}
                >
                  {sec.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* DETAILED SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.75rem" }}>
          {sections.map((sec) => (
            <section
              key={sec.id}
              id={sec.id}
              style={{
                scrollMarginTop: "2rem",
                borderBottom: "1px solid var(--border-subtle)",
                paddingBottom: "2.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "var(--ink)",
                  margin: "0 0 1.25rem",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.6rem",
                }}
              >
                <span style={{ color: "var(--accent-cooling)", fontSize: "1.1rem", fontFamily: "monospace" }}>
                  {sec.num}.
                </span>
                {sec.title}
              </h2>
              <div
                style={{
                  color: "var(--ink-secondary)",
                  lineHeight: 1.7,
                  fontSize: "0.925rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {sec.content}
              </div>
            </section>
          ))}
        </div>

        {/* FOOTER ACTIONS */}
        <div
          style={{
            marginTop: "4rem",
            padding: "2rem",
            background: "var(--surface)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.75rem",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 0.5rem", color: "var(--ink)" }}>
            Questions or Technical Feedback?
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "560px", margin: "0 auto 1.5rem", lineHeight: 1.6 }}>
            HVACLogic welcomes peer review and technical corrections from practicing mechanical engineers, HVAC contractors, building scientists, and code officials.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://github.com/miadsaadidi/hvaclogic/issues"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.25rem",
                background: "var(--accent-cooling)",
                color: "#000",
                fontWeight: 700,
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              Submit GitHub Feedback ↗
            </a>
            <Link
              href="/methodology"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.25rem",
                background: "var(--bg-secondary)",
                color: "var(--ink)",
                border: "1px solid var(--border-color)",
                fontWeight: 600,
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              Review Calculation Methodology →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
