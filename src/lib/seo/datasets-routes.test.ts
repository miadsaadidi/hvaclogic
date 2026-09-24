import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import {
  BENCHMARK_DATASETS,
  getDatasetBySlug,
  getAllDatasetSlugs,
} from "@/lib/data/datasets";
import { publishedCalculators } from "@/lib/data/calculators-registry";
import { RESEARCH_PAPERS } from "@/lib/data/research-papers";

describe("Open Benchmark Datasets Registry & Integrity Tests", () => {
  it("should have exactly 7 canonical benchmark datasets", () => {
    expect(BENCHMARK_DATASETS.length).toBe(7);
    expect(getAllDatasetSlugs().length).toBe(7);
  });

  it("should find each dataset by slug", () => {
    const slugs = getAllDatasetSlugs();
    for (const slug of slugs) {
      const dataset = getDatasetBySlug(slug);
      expect(dataset).toBeDefined();
      expect(dataset?.slug).toBe(slug);
      expect(dataset?.title.length).toBeGreaterThan(10);
      expect(dataset?.seoTitle.length).toBeGreaterThan(10);
      expect(dataset?.seoDescription.length).toBeGreaterThan(20);
      expect(dataset?.description.length).toBeGreaterThan(30);
      expect(dataset?.methodology.length).toBeGreaterThan(30);
      expect(dataset?.license).toContain("creativecommons.org/licenses/by/4.0");
      expect(dataset?.governingStandards.length).toBeGreaterThanOrEqual(1);
      expect(dataset?.variables.length).toBeGreaterThanOrEqual(4);
      expect(dataset?.previewRows.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("should verify that every dataset points to a real physical file in public/datasets/", () => {
    const publicDatasetsDir = path.join(process.cwd(), "public", "datasets");

    for (const dataset of BENCHMARK_DATASETS) {
      const filePath = path.join(publicDatasetsDir, dataset.filename);
      expect(fs.existsSync(filePath), `Physical file ${dataset.filename} missing`).toBe(true);

      const stats = fs.statSync(filePath);
      expect(stats.size).toBeGreaterThan(1000);

      if (dataset.jsonFilename) {
        const jsonPath = path.join(publicDatasetsDir, dataset.jsonFilename);
        expect(fs.existsSync(jsonPath), `JSON file ${dataset.jsonFilename} missing`).toBe(true);
      }
    }
  });

  it("should verify all companion calculator routes exist in the calculator registry", () => {
    const allCalcs = publishedCalculators();
    const validCalcRoutes = new Set(allCalcs.map((c) => c.route));

    for (const dataset of BENCHMARK_DATASETS) {
      for (const companion of dataset.companionCalculators) {
        expect(
          validCalcRoutes.has(companion.url),
          `Companion calculator route ${companion.url} in dataset ${dataset.slug} not found in calculator registry`
        ).toBe(true);
      }
    }
  });

  it("should verify all companion research routes exist in the research registry", () => {
    const validResearchSlugs = new Set(RESEARCH_PAPERS.map((p) => `/research/${p.slug}`));

    for (const dataset of BENCHMARK_DATASETS) {
      for (const companion of dataset.companionResearch) {
        expect(
          validResearchSlugs.has(companion.url),
          `Companion research route ${companion.url} in dataset ${dataset.slug} not found in research papers registry`
        ).toBe(true);
      }
    }
  });

  it("should verify variable types are only valid primitives", () => {
    const validTypes = new Set(["string", "number", "boolean"]);

    for (const dataset of BENCHMARK_DATASETS) {
      for (const v of dataset.variables) {
        expect(validTypes.has(v.type)).toBe(true);
        expect(v.name.length).toBeGreaterThan(0);
        expect(v.description.length).toBeGreaterThan(5);
      }
    }
  });
});
