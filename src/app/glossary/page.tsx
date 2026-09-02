import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { GLOSSARY_TERMS } from "@/lib/data/glossary-terms";
import { GlossaryExplorer } from "./GlossaryExplorer";

export const metadata: Metadata = {
  title: "HVAC & Building Science Engineering Glossary | HVACLogic",
  description: "Comprehensive engineering glossary of thermodynamic, airflow, refrigeration, and building science terminology defined by ASHRAE, ACCA, and AHRI standards.",
  alternates: {
    canonical: `${siteConfig.canonicalDomain}/glossary`,
  },
  openGraph: {
    title: "HVAC & Building Science Engineering Glossary | HVACLogic",
    description: "Definitive technical glossary for HVAC engineers, technicians, and building scientists covering CFM, SEER2, Superheat, Enthalpy, and A2L refrigerants.",
    url: `${siteConfig.canonicalDomain}/glossary`,
    siteName: "HVACLogic",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC & Building Science Engineering Glossary | HVACLogic",
    description: "Standardized thermodynamic and airflow terminology definitions.",
  },
};

export default function GlossaryPage() {
  const canonicalUrl = `${siteConfig.canonicalDomain}/glossary`;

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        "@id": `${canonicalUrl}#terms`,
        name: "HVACLogic Thermodynamics & Building Science Engineering Terminology",
        description: "Standard engineering glossary of thermodynamic, airflow, heat transfer, and refrigeration concepts cross-referenced to ASHRAE, ACCA, and AHRI standards.",
        url: canonicalUrl,
        publisher: {
          "@type": "Organization",
          name: "HVACLogic",
          url: siteConfig.canonicalDomain,
        },
        hasDefinedTerm: GLOSSARY_TERMS.map((term) => ({
          "@type": "DefinedTerm",
          "@id": `${canonicalUrl}#${term.slug}`,
          name: `${term.term} (${term.fullTitle})`,
          description: term.definition,
          inDefinedTermSet: `${canonicalUrl}#terms`,
          ...(term.wikidataUrl ? { sameAs: term.wikidataUrl } : {}),
        })),
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
            name: "Engineering Glossary",
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      <main className="page site-container" style={{ padding: "2rem 1rem", maxWidth: "1100px", margin: "0 auto" }}>
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Engineering Glossary</span>
        </nav>

        <header style={{ marginBottom: "2.5rem" }}>
          <span className="eyebrow" style={{ color: "var(--accent, #38bdf8)", textTransform: "uppercase", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "0.05em" }}>
            ENGINEERING REFERENCE & ENTITY KNOWLEDGE GRAPH
          </span>
          <h1 style={{ fontSize: "2.25rem", margin: "0.5rem 0", color: "var(--ink-primary, #f9fafb)", fontFamily: "var(--font-titillium)" }}>
            HVAC & Building Science Engineering Glossary
          </h1>
          <p style={{ color: "var(--ink-secondary, #9ca3af)", fontSize: "1.125rem", lineHeight: 1.6, maxWidth: "800px" }}>
            Deterministic definitions, thermodynamic formulas, field rules-of-thumb, and governing standard citations for air distribution, refrigeration, and energy efficiency.
          </p>
        </header>

        <GlossaryExplorer terms={GLOSSARY_TERMS} />
      </main>
    </>
  );
}
