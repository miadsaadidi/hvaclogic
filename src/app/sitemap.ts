import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { calculatorRegistry } from "@/lib/data/calculators-registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.canonicalDomain;
  const lastModified = new Date();

  // Root Homepage
  const rootEntry: MetadataRoute.Sitemap[0] = {
    url: baseUrl,
    lastModified,
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
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // All 17 Calculators
  const calculatorEntries: MetadataRoute.Sitemap = calculatorRegistry.map((calc) => ({
    url: `${baseUrl}${calc.route}`,
    lastModified: calc.lastEngineeringReview ? new Date(calc.lastEngineeringReview) : lastModified,
    changeFrequency: "weekly",
    priority: calc.status === "production" ? 0.85 : 0.6,
  }));

  // Authority & Policy Pages
  const authorityRoutes = ["/methodology", "/sources", "/about", "/privacy"];
  const authorityEntries: MetadataRoute.Sitemap = authorityRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [rootEntry, ...pillarEntries, ...calculatorEntries, ...authorityEntries];
}
