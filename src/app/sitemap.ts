import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { publishedCalculators } from "@/lib/data/calculators-registry";
import { RESEARCH_PAPERS } from "@/lib/data/research-papers";

// Fixed release baseline date to ensure defensible, non-volatile sitemap lastmod timestamps
const SITE_RELEASE_DATE = new Date("2026-08-20T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.canonicalDomain;

  // Root Homepage
  const rootEntry: MetadataRoute.Sitemap[0] = {
    url: baseUrl,
    lastModified: SITE_RELEASE_DATE,
    changeFrequency: "weekly",
    priority: 1.0,
  };

  // 5 Flat Pillar Hubs
  const pillarRoutes = [
    "/airflow-ducts",
    "/cooling-loads",
    "/field-diagnostics",
    "/heating-systems",
    "/building-science",
  ];

  const pillarEntries: MetadataRoute.Sitemap = pillarRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: SITE_RELEASE_DATE,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // All published calculators
  const calculatorEntries: MetadataRoute.Sitemap = publishedCalculators().map((calc) => ({
    url: `${baseUrl}${calc.route}`,
    lastModified: calc.lastEngineeringReview
      ? new Date(`${calc.lastEngineeringReview}T00:00:00.000Z`)
      : SITE_RELEASE_DATE,
    changeFrequency: "weekly",
    priority: calc.status === "production" ? 0.85 : 0.6,
  }));

  // Guides Hub
  const guidesHubEntry: MetadataRoute.Sitemap[0] = {
    url: `${baseUrl}/guides`,
    lastModified: SITE_RELEASE_DATE,
    changeFrequency: "weekly",
    priority: 0.9,
  };

  // Research Hub & Whitepapers
  const researchHubEntry: MetadataRoute.Sitemap[0] = {
    url: `${baseUrl}/research`,
    lastModified: SITE_RELEASE_DATE,
    changeFrequency: "weekly",
    priority: 0.9,
  };

  const researchPaperEntries: MetadataRoute.Sitemap = RESEARCH_PAPERS.map((paper) => ({
    url: `${baseUrl}/research/${paper.slug}`,
    lastModified: new Date(`${paper.publicationDate}T00:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  // Standards Matrix
  const standardsEntry: MetadataRoute.Sitemap[0] = {
    url: `${baseUrl}/standards`,
    lastModified: SITE_RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.8,
  };

  // Authority & Policy Pages
  const authorityRoutes = [
    "/methodology",
    "/sources",
    "/about",
    "/privacy",
    "/glossary",
    "/developers",
    "/ashrae-climatic-data",
  ];
  const authorityEntries: MetadataRoute.Sitemap = authorityRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: SITE_RELEASE_DATE,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    rootEntry,
    ...pillarEntries,
    ...calculatorEntries,
    guidesHubEntry,
    researchHubEntry,
    ...researchPaperEntries,
    standardsEntry,
    ...authorityEntries,
  ];
}
