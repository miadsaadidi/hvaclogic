import { describe, expect, it } from "vitest";
import React from "react";
import { publishedCalculators } from "@/lib/data/calculators-registry";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";

describe("Schema.org HowTo & Structured Data Validation", () => {
  it("renders valid Schema.org graph with HowTo for all 21 production calculators", () => {
    const published = publishedCalculators();
    expect(published.length).toBe(21);

    published.forEach((calc) => {
      const element = SchemaJsonLd({ calculator: calc });
      const htmlString = element.props.dangerouslySetInnerHTML.__html;
      expect(htmlString).toBeDefined();

      const parsed = JSON.parse(htmlString);
      expect(parsed["@context"]).toBe("https://schema.org");
      expect(Array.isArray(parsed["@graph"])).toBe(true);

      // Check for WebApplication
      const webApp = parsed["@graph"].find((item: { "@type": string }) => item["@type"] === "WebApplication");
      expect(webApp).toBeDefined();
      expect(webApp.name).toBe(calc.name);

      // Check for TechArticle
      const article = parsed["@graph"].find((item: { "@type": string }) => item["@type"] === "TechArticle");
      expect(article).toBeDefined();

      // Check for BreadcrumbList
      const breadcrumbs = parsed["@graph"].find((item: { "@type": string }) => item["@type"] === "BreadcrumbList");
      expect(breadcrumbs).toBeDefined();
      expect(breadcrumbs.itemListElement.length).toBe(3);

      // Check for HowTo schema
      const howTo = parsed["@graph"].find((item: { "@type": string }) => item["@type"] === "HowTo");
      expect(howTo).toBeDefined();
      expect(howTo.name).toContain(calc.name);
      expect(howTo.step.length).toBeGreaterThanOrEqual(3);
      expect(howTo.tool.length).toBeGreaterThan(0);
      expect(howTo.supply.length).toBeGreaterThan(0);
    });
  });
});
