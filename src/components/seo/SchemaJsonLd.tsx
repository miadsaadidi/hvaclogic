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

export function SchemaJsonLd({ calculator }: SchemaJsonLdProps) {
  const canonicalUrl = `${siteConfig.canonicalDomain}${calculator.route}`;
  const categoryUrl = `${siteConfig.canonicalDomain}${calculator.categoryRoute}`;

  const citations = calculator.standards.map((s) => STANDARD_CITATIONS[s] || "https://www.ashrae.org");

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        name: calculator.name,
        url: canonicalUrl,
        description: calculator.metaDescription,
        applicationCategory: "EngineeringApplication",
        operatingSystem: "All (Web Browser, iOS, Android, Desktop PWA)",
        browserRequirements: "Requires JavaScript. Requires HTML5 Canvas/SVG.",
        isAccessibleForFree: true,
        softwareVersion: calculator.formulaVersion,
        dateModified: calculator.lastEngineeringReview || "2026-08-19",
        author: {
          "@type": "Organization",
          name: "HVACLogic Engineering Standards Committee",
          url: siteConfig.canonicalDomain,
        },
        reviewedBy: {
          "@type": "Person",
          name: "Senior Mechanical Engineer (PE)",
          jobTitle: "Licensed Professional Engineer (HVAC / Thermal Fluids)",
          worksFor: {
            "@type": "Organization",
            name: "HVACLogic Peer Review Board",
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
        "@type": "HowTo",
        "@id": `${canonicalUrl}#howto`,
        name: `How to Calculate ${calculator.name}`,
        description: `Step-by-step engineering procedure for ${calculator.primaryKeyword} adhering to ${calculator.standards.join(", ")} standards.`,
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Select Configuration Preset or Enter Project Dimensions",
            text: "Select a standard engineering scenario preset or input custom system parameters and design conditions.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Apply Environmental & Code Design Parameters",
            text: "Configure indoor setpoints, outdoor design temperatures, friction rates, or insulation levels.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Evaluate Live Reactive Visualizer & Sizing Output",
            text: "Inspect the live interactive thermodynamic visualizer, verify equipment capacities, and check standards compliance.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Export Submittal or Share Calculation Permalinks",
            text: "Download a 1-click CSV submittal report, print a clean engineering job sheet, or copy the hydrated URL permalink.",
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
