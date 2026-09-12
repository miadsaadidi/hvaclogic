import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { publishedCalculators } from "@/lib/data/calculators-registry";
import { RESEARCH_PAPERS } from "@/lib/data/research-papers";

// Deterministic content release & revision milestones (prevents volatile daily jitter while signaling crawl priority)
const RELEASE_MILESTONES = {
  HOMEPAGE: new Date("2026-08-28T00:00:00.000Z"),
  CALCULATORS_HUB: new Date("2026-08-28T00:00:00.000Z"),
  PILLAR_HUBS: new Date("2026-08-26T00:00:00.000Z"),
  GUIDES_HUB: new Date("2026-08-26T00:00:00.000Z"),
  RESEARCH_HUB: new Date("2026-08-26T00:00:00.000Z"),
  STANDARDS_COMPLIANCE: new Date("2026-08-25T00:00:00.000Z"),
  AUTHORITY_PAGES: new Date("2026-08-24T00:00:00.000Z"),
  CALCULATOR_BASELINE: new Date("2026-08-20T00:00:00.000Z"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.canonicalDomain;

  // Root Homepage
  const rootEntry: MetadataRoute.Sitemap[0] = {
    url: baseUrl,
    lastModified: RELEASE_MILESTONES.HOMEPAGE,
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
    lastModified: RELEASE_MILESTONES.PILLAR_HUBS,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // All published calculators
  const calculatorEntries: MetadataRoute.Sitemap = publishedCalculators().map((calc) => ({
    url: `${baseUrl}${calc.route}`,
    lastModified: calc.lastEngineeringReview
      ? new Date(`${calc.lastEngineeringReview}T00:00:00.000Z`)
      : RELEASE_MILESTONES.CALCULATOR_BASELINE,
    changeFrequency: "weekly",
    priority: calc.status === "production" ? 0.85 : 0.6,
  }));

  // Guides Hub
  const guidesHubEntry: MetadataRoute.Sitemap[0] = {
    url: `${baseUrl}/guides`,
    lastModified: RELEASE_MILESTONES.GUIDES_HUB,
    changeFrequency: "weekly",
    priority: 0.9,
  };

  // Calculators Directory Hub
  const calculatorsHubEntry: MetadataRoute.Sitemap[0] = {
    url: `${baseUrl}/calculators`,
    lastModified: RELEASE_MILESTONES.CALCULATORS_HUB,
    changeFrequency: "weekly",
    priority: 0.95,
  };

  // Research Hub & Whitepapers
  const researchHubEntry: MetadataRoute.Sitemap[0] = {
    url: `${baseUrl}/research`,
    lastModified: RELEASE_MILESTONES.RESEARCH_HUB,
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
    lastModified: RELEASE_MILESTONES.STANDARDS_COMPLIANCE,
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
    lastModified:
      route === "/methodology" || route === "/sources"
        ? RELEASE_MILESTONES.STANDARDS_COMPLIANCE
        : RELEASE_MILESTONES.AUTHORITY_PAGES,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Academic PDF Whitepapers & Monographs
  const paperPdfEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/papers/HVACLogic_Deterministic_Building_Science_Whitepaper.pdf`,
      lastModified: new Date("2026-08-25T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/papers/hvaclogic_psychrometrics_hyland_wexler_paper.pdf`,
      lastModified: new Date("2026-09-07T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/papers/Thermodynamic_Modeling_A2L_Refrigerant_Glide_R454B_publication.pdf`,
      lastModified: new Date("2026-09-05T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/papers/Vapor_Compression_Refrigerant_Mass_Sizing.pdf`,
      lastModified: new Date("2026-09-11T00:00:00.000Z"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  return [
    rootEntry,
    ...pillarEntries,
    calculatorsHubEntry,
    ...calculatorEntries,
    guidesHubEntry,
    researchHubEntry,
    ...researchPaperEntries,
    ...paperPdfEntries,
    standardsEntry,
    ...authorityEntries,
  ];
}
