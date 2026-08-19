import React from "react";
import { CalculatorMeta } from "@/types/calculation";
import { siteConfig } from "@/lib/site-config";

interface SchemaJsonLdProps {
  calculator: CalculatorMeta;
}

export function SchemaJsonLd({ calculator }: SchemaJsonLdProps) {
  const canonicalUrl = `${siteConfig.canonicalDomain}${calculator.route}`;
  const categoryUrl = `${siteConfig.canonicalDomain}${calculator.categoryRoute}`;

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${canonicalUrl}#software`,
        "name": calculator.name,
        "url": canonicalUrl,
        "description": calculator.metaDescription,
        "applicationCategory": "EngineeringApplication",
        "operatingSystem": "All (Web Browser, PWA)",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteConfig.canonicalDomain,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": calculator.categoryName,
            "item": categoryUrl,
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": calculator.name,
            "item": canonicalUrl,
          },
        ],
      },
      ...(calculator.faqs && calculator.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${canonicalUrl}#faq`,
              "mainEntity": calculator.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer,
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
