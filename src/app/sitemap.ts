import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { publishedCalculators } from "@/lib/data/calculators-registry";
import { RESEARCH_PAPERS } from "@/lib/data/research-papers";
import { BENCHMARK_DATASETS } from "@/lib/data/datasets";

// Deterministic content release & revision milestones (prevents volatile daily jitter while signaling crawl priority)
const RELEASE_MILESTONES = {
  HOMEPAGE: new Date("2026-08-28T00:00:00.000Z"),
  CALCULATORS_HUB: new Date("2026-08-28T00:00:00.000Z"),
  PILLAR_HUBS: new Date("2026-08-26T00:00:00.000Z"),
  GUIDES_HUB: new Date("2026-08-26T00:00:00.000Z"),
  RESEARCH_HUB: new Date("2026-08-26T00:00:00.000Z"),
  DATASETS_HUB: new Date("2026-09-15T00:00:00.000Z"),
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

  // Datasets Hub & Detail Pages
  const datasetsHubEntry: MetadataRoute.Sitemap[0] = {
    url: `${baseUrl}/datasets`,
    lastModified: RELEASE_MILESTONES.DATASETS_HUB,
    changeFrequency: "weekly",
    priority: 0.9,
  };

  const datasetEntries: MetadataRoute.Sitemap = BENCHMARK_DATASETS.map((ds) => ({
    url: `${baseUrl}/datasets/${ds.slug}`,
    lastModified: new Date(`${ds.lastUpdated}T00:00:00.000Z`),
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

  // Academic PDF Whitepapers & Monographs (Dynamically derived from unique research paper pdfUrls)
  const uniquePdfs = new Map<string, Date>();
  RESEARCH_PAPERS.forEach((paper) => {
    if (paper.pdfUrl) {
      const existingDate = uniquePdfs.get(paper.pdfUrl);
      const paperDate = new Date(`${paper.publicationDate}T00:00:00.000Z`);
      if (!existingDate || paperDate > existingDate) {
        uniquePdfs.set(paper.pdfUrl, paperDate);
      }
    }
  });

  const paperPdfEntries: MetadataRoute.Sitemap = Array.from(uniquePdfs.entries()).map(
    ([pdfUrl, lastMod]) => ({
      url: `${baseUrl}${pdfUrl}`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // Open Educational Resource (OER) Lab Modules
  const oerRoutes = [
    "/oer-modules/duct-aerodynamics-lab.html",
    "/oer-modules/building-envelope-thermal-transmission-lab.html",
    "/oer-modules/heat-pump-balance-point-lab.html",
  ];

  const oerEntries: MetadataRoute.Sitemap = oerRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: RELEASE_MILESTONES.RESEARCH_HUB,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    rootEntry,
    ...pillarEntries,
    calculatorsHubEntry,
    ...calculatorEntries,
    guidesHubEntry,
    researchHubEntry,
    ...researchPaperEntries,
    datasetsHubEntry,
    ...datasetEntries,
    ...paperPdfEntries,
    ...oerEntries,
    standardsEntry,
    ...authorityEntries,
  ];
}
