import { describe, expect, it } from "vitest";
import React from "react";
import { publishedCalculators } from "@/lib/data/calculators-registry";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";

describe("Schema.org Structured Data Validation", () => {
  it("renders valid Schema.org graph with WebApplication, TechArticle, BreadcrumbList, and SoftwareSourceCode for all production calculators", () => {
    const published = publishedCalculators();
    expect(published.length).toBe(25);

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

      // Check for SoftwareSourceCode
      const sourceCode = parsed["@graph"].find((item: { "@type": string }) => item["@type"] === "SoftwareSourceCode");
      expect(sourceCode).toBeDefined();
      expect(sourceCode.programmingLanguage).toBe("TypeScript");
    });
  });
});
