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
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5 Canvas/SVG.",
        isAccessibleForFree: true,
        softwareVersion: calculator.formulaVersion,
        dateModified: calculator.lastEngineeringReview || "2026-08-19",
        author: {
          "@type": "Organization",
          name: "HVACLogic Engineering Standards Committee",
          url: siteConfig.canonicalDomain,
          sameAs: [
            "https://www.trustpilot.com/review/hvaclogic.org",
            "https://archive.org/details/power-lab-deterministic-clean-energy-modeling-framework-2026_20260826",
          ],
        },
        reviewedBy: {
          "@type": "Person",
          name: "Senior Mechanical Engineer (PE)",
          jobTitle: "Licensed Professional Engineer (HVAC / Thermal Fluids)",
          worksFor: {
            "@type": "Organization",
            name: "HVACLogic Peer Review Board",
            url: siteConfig.canonicalDomain,
            sameAs: [
              "https://www.trustpilot.com/review/hvaclogic.org",
            ],
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
