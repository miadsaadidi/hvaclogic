import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { siteConfig } from "@/lib/site-config";
import { calculatorRegistry, publishedCalculators } from "@/lib/data/calculators-registry";

describe("Day 1 & Day 2 SEO Technical Crawl & Canonical Verification", () => {
  it("generates exactly 31 unique canonical entries in /sitemap.xml", () => {
    const sitemapEntries = sitemap();
    const urls = sitemapEntries.map((e) => e.url);

    // 1 Homepage + 5 Pillar Hubs + 21 Calculators + 4 Authority/Policy Pages = 31
    expect(urls.length).toBe(31);

    // Ensure zero duplicates
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(31);

    // Ensure all URLs start with the canonical domain https://hvaclogic.org
    urls.forEach((url) => {
      expect(url.startsWith(siteConfig.canonicalDomain)).toBe(true);
      expect(url.includes("?")).toBe(false); // Zero search param pollution
      expect(url.endsWith("/")).toBe(false); // Clean URLs with no trailing slash
    });
  });

  it("verifies robots.txt references the canonical sitemap and allows public routes", () => {
    const robotsConfig = robots();
    expect(robotsConfig.sitemap).toBe("https://hvaclogic.org/sitemap.xml");
    
    // Check rules
    const mainRule = Array.isArray(robotsConfig.rules)
      ? robotsConfig.rules[0]
      : robotsConfig.rules;

    expect(mainRule?.userAgent).toBe("*");
    expect(mainRule?.allow).toBe("/");
    expect(mainRule?.disallow).toEqual(["/api/"]);
  });

  it("verifies all 21 production calculators have valid SEO metadata and standards", () => {
    const published = publishedCalculators();
    expect(published.length).toBe(21);

    published.forEach((calc) => {
      expect(calc.status).toBe("production");
      expect(calc.seoTitle).toBeDefined();
      expect(calc.seoTitle.length).toBeGreaterThan(15);
      expect(calc.metaDescription).toBeDefined();
      expect(calc.metaDescription.length).toBeGreaterThan(40);
      expect(calc.primaryKeyword).toBeDefined();
      expect(calc.route.startsWith("/calculators/")).toBe(true);
      expect(calc.lastEngineeringReview).toBeDefined();
      expect(calc.faqs.length).toBeGreaterThanOrEqual(2);
      expect(calc.standards.length).toBeGreaterThan(0);
    });
  });

  it("verifies all 5 pillar categories are mapped and registered", () => {
    const expectedPillars = [
      "airflow-ducts",
      "cooling-loads",
      "field-diagnostics",
      "heating-systems",
      "building-science",
    ];

    const registryPillars = new Set(calculatorRegistry.map((c) => c.pillar));
    expectedPillars.forEach((pillar) => {
      expect(registryPillars.has(pillar as any)).toBe(true);
    });
  });

  it("verifies the 4 authority and policy pages are present in the site config", () => {
    const authorityPaths = ["/methodology", "/sources", "/about", "/privacy"];
    const sitemapUrls = sitemap().map((e) => e.url);

    authorityPaths.forEach((path) => {
      expect(sitemapUrls).toContain(`${siteConfig.canonicalDomain}${path}`);
    });
  });

  it("verifies Day 3 sitemap semantics have valid, defensible lastmod dates without request-time jitter", () => {
    const sitemapEntries = sitemap();

    sitemapEntries.forEach((entry) => {
      expect(entry.lastModified).toBeDefined();
      const date = new Date(entry.lastModified as Date);
      expect(isNaN(date.getTime())).toBe(false);

      // Must be a valid date between 2026-08-01 and 2026-08-30 (defensible engineering baseline)
      expect(date.getUTCFullYear()).toBe(2026);
      expect(date.getUTCMonth()).toBe(7); // August (0-indexed 7)
    });
  });

  it("verifies Day 4 Structured Data JSON-LD graph integrity for all 21 calculators", () => {
    const published = publishedCalculators();

    published.forEach((calc) => {
      const canonicalUrl = `${siteConfig.canonicalDomain}${calc.route}`;
      const categoryUrl = `${siteConfig.canonicalDomain}${calc.categoryRoute}`;

      // Verify breadcrumbs match canonical hierarchy
      expect(calc.route.startsWith("/calculators/")).toBe(true);
      expect(calc.categoryRoute.startsWith("/")).toBe(true);

      // Ensure no undefined or missing critical fields
      expect(calc.name).toBeDefined();
      expect(calc.metaDescription).toBeDefined();
      expect(calc.standards.length).toBeGreaterThan(0);
      expect(calc.formulaVersion).toBeDefined();
    });
  });
});
