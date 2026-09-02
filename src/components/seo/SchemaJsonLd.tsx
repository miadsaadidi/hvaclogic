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
    "https://www.google.com/preferences/source?q=hvaclogic.org",
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
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All (Modern Web Browsers, iOS, Android, macOS, Windows)",
        browserRequirements: "Requires JavaScript. Requires HTML5 Canvas/SVG.",
        isAccessibleForFree: true,
        softwareVersion: calculator.formulaVersion,
        dateModified: calculator.lastEngineeringReview || "2026-08-19",
        author: {
          "@type": "Organization",
          name: "HVACLogic Engineering Standards Committee",
          url: siteConfig.canonicalDomain,
          sameAs: sameAsAuthority,
        },
        reviewedBy: {
          "@type": "Person",
          name: "Senior Mechanical Engineer (PE)",
          jobTitle: "Licensed Professional Engineer (HVAC / Thermal Fluids)",
          worksFor: {
            "@type": "Organization",
            name: "HVACLogic Peer Review Board",
            url: siteConfig.canonicalDomain,
            sameAs: sameAsAuthority,
          },
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
        headline: calculator.seoTitle,
        description: calculator.metaDescription,
        url: canonicalUrl,
        datePublished: "2026-01-15",
        dateModified: calculator.lastEngineeringReview || "2026-08-19",
        inLanguage: "en-US",
        about: aboutEntities.map((ent) => ({
          "@type": "Thing",
          name: ent.name,
          sameAs: ent.sameAs,
        })),
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: [".speakable-definition", ".speakable-summary", "h1"],
        },
        author: {
          "@type": "Organization",
          name: "HVACLogic Engineering Standards Committee",
          url: siteConfig.canonicalDomain,
          sameAs: sameAsAuthority,
        },
        publisher: {
          "@type": "Organization",
          name: "HVAC Logic",
          url: siteConfig.canonicalDomain,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.canonicalDomain}/icon.svg`,
          },
          sameAs: sameAsAuthority,
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
      ...(calculator.faqs && calculator.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${canonicalUrl}#faq`,
              mainEntity: calculator.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
      {
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: `How to Calculate ${calculator.name}`,
        description: `Step-by-step calculation and engineering sizing procedure for ${calculator.name} in accordance with ${calculator.standards.join(" / ")} standards.`,
        totalTime: "PT2M",
        estimatedCost: {
          "@type": "MonetaryAmount",
          currency: "USD",
          value: "0",
        },
        supply: [
          {
            "@type": "HowToSupply",
            name: "Building Architectural & Mechanical Design Data",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: `HVACLogic ${calculator.name} Interactive Engine`,
          },
        ],
        step: (
          calculator.howToSteps && calculator.howToSteps.length > 0
            ? calculator.howToSteps
            : [
                {
                  stepNumber: 1,
                  title: "Gather Building & Operating Parameters",
                  instruction: `Input baseline physical and climatic measurements into the ${calculator.name} interface.`,
                },
                {
                  stepNumber: 2,
                  title: `Apply Governing ${calculator.standards[0] || "ASHRAE"} Formulations`,
                  instruction: `Execute deterministic thermodynamic modeling according to governing ${calculator.standards.join(" & ")} engineering standards.`,
                },
                {
                  stepNumber: 3,
                  title: "Verify Equipment Sizing & Operating Margins",
                  instruction: "Review sizing benchmarks, visualizer diagrams, and export official job submittals.",
                },
              ]
        ).map((s, idx) => ({
          "@type": "HowToStep",
          position: s.stepNumber || idx + 1,
          name: s.title,
          text: s.instruction,
          url: `${canonicalUrl}#step-${s.stepNumber || idx + 1}`,
        })),
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

