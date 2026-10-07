import React from "react";
import { CalculatorMeta } from "@/types/calculation";
import { siteConfig } from "@/lib/site-config";

interface SchemaJsonLdProps {
  calculator: CalculatorMeta;
}

const STANDARD_CITATIONS: Record<string, string> = {
  ASHRAE: "https://www.ashrae.org/technical-resources/standards-and-guidelines",
  ACCA: "https://www.acca.org/standards/technical-manuals",
  EPA: "https://www.epa.gov/section608",
  NIST: "https://www.nist.gov/srd/refprop",
  SMACNA: "https://www.smacna.org/resources/technical-standards",
  IECC: "https://www.energycodes.gov",
  AHRI: "https://www.ahrinet.org",
  HVI: "https://www.hvi.org",
  NFPA: "https://www.nfpa.org/codes-and-standards/nfpa-54-standard-development/54",
  IFGC: "https://codes.iccsafe.org/content/IFGC2024P1",
  DOE: "https://www.energy.gov/eere/buildings/building-technologies-office",
};

const WIKIDATA_ENTITIES: Record<string, { name: string; sameAs: string }> = {
  ASHRAE: { name: "ASHRAE", sameAs: "https://www.wikidata.org/wiki/Q300649" },
  ACCA: { name: "Air Conditioning Contractors of America", sameAs: "https://www.wikidata.org/wiki/Q4684944" },
  SMACNA: { name: "SMACNA", sameAs: "https://www.wikidata.org/wiki/Q7393433" },
  EPA: { name: "United States Environmental Protection Agency", sameAs: "https://www.wikidata.org/wiki/Q186434" },
  Thermodynamics: { name: "Thermodynamics", sameAs: "https://www.wikidata.org/wiki/Q134147" },
  Psychrometrics: { name: "Psychrometrics", sameAs: "https://www.wikidata.org/wiki/Q1417535" },
  HVAC: { name: "Heating, ventilation, and air conditioning", sameAs: "https://www.wikidata.org/wiki/Q796605" },
};

export function SchemaJsonLd({ calculator }: SchemaJsonLdProps) {
  const canonicalUrl = `${siteConfig.canonicalDomain}${calculator.route}`;
  const categoryUrl = `${siteConfig.canonicalDomain}${calculator.categoryRoute}`;

  const citations = calculator.standards.map((s) => STANDARD_CITATIONS[s] || "https://www.ashrae.org");
  const aboutEntities = [
    WIKIDATA_ENTITIES.HVAC,
    WIKIDATA_ENTITIES.Thermodynamics,
    ...calculator.standards.map((s) => WIKIDATA_ENTITIES[s]).filter(Boolean),
  ];

  const sameAsAuthority = [
    "https://archive.org/details/power-lab-deterministic-clean-energy-modeling-framework-2026_20260826",
    "https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing",
  ];

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: calculator.name,
        url: canonicalUrl,
        description: calculator.metaDescription,
        image: `${siteConfig.canonicalDomain}/opengraph-image`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All (Modern Web Browsers, iOS, Android, macOS, Windows)",
        browserRequirements: "Requires JavaScript. Requires HTML5 Canvas/SVG.",
        isAccessibleForFree: true,
        softwareVersion: calculator.formulaVersion,
        dateModified: calculator.lastEngineeringReview || "2026-08-19",
        author: {
          "@type": "Person",
          name: calculator.author || "Miad S.",
          jobTitle: "Technical Author & Calculation Architect",
          url: `${siteConfig.canonicalDomain}/authors/miad-s`,
        },
        citation: citations,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "TechArticle",
        "@id": `${canonicalUrl}#article`,
        headline: calculator.name,
        description: calculator.metaDescription,
        url: canonicalUrl,
        image: [`${siteConfig.canonicalDomain}/opengraph-image`],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        datePublished: "2026-01-15",
        dateModified: calculator.lastEngineeringReview || "2026-08-19",
        inLanguage: "en-US",
        author: {
          "@type": "Person",
          name: calculator.author || "Miad S.",
          jobTitle: "Technical Author & Calculation Architect",
          url: `${siteConfig.canonicalDomain}/authors/miad-s`,
        },
        publisher: {
          "@type": "Organization",
          name: "HVACLogic",
          url: siteConfig.canonicalDomain,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.canonicalDomain}/icon.svg`,
          },
          sameAs: sameAsAuthority,
        },
        about: aboutEntities.map((ent) => ({
          "@type": "Thing",
          name: ent.name,
          sameAs: ent.sameAs,
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
            name: calculator.categoryName,
            item: categoryUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: calculator.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${canonicalUrl}#sourcecode`,
        name: `${calculator.name} Calculation Engine`,
        programmingLanguage: "TypeScript",
        runtimePlatform: "Modern Web Browsers (ECMAScript 2022+)",
        codeRepository: "https://github.com/miadsaadidi/hvaclogic",
        license: "https://opensource.org/licenses/MIT",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}

