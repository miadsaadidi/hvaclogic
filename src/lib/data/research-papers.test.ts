import { describe, it, expect } from "vitest";
import {
  RESEARCH_PAPERS,
  RESEARCH_DATASETS,
  getResearchPaperBySlug,
  getAllResearchPaperSlugs,
} from "./research-papers";

describe("Research Papers Registry", () => {
  it("should have at least 6 peer-referenced whitepapers", () => {
    expect(RESEARCH_PAPERS.length).toBeGreaterThanOrEqual(6);
  });

  it("should have registered research datasets with valid DOIs", () => {
    expect(RESEARCH_DATASETS.length).toBeGreaterThanOrEqual(3);
    const figshareDs = RESEARCH_DATASETS.find((d) => d.doi === "10.6084/m9.figshare.33456928");
    expect(figshareDs).toBeDefined();
    expect(figshareDs?.downloadUrl).toBe("/datasets/hvaclogic_ashrae_hyland_wexler_psychrometric_benchmark.csv");

    const hpDs = RESEARCH_DATASETS.find((d) => d.doi === "10.6084/m9.figshare.33477430");
    expect(hpDs).toBeDefined();
    expect(hpDs?.downloadUrl).toBe("/datasets/hvaclogic_cold_climate_heat_pump_cop_benchmark.csv");
  });

  it("should return valid paper by slug", () => {
    const slug = "ashrae-hyland-wexler-moist-air-psychrometrics";
    const paper = getResearchPaperBySlug(slug);
    expect(paper).toBeDefined();
    expect(paper?.title).toContain("Thermodynamic Formulations");
    expect(paper?.doi).toBe("10.6084/m9.figshare.33456928");
    expect(paper?.pdfUrl).toBeDefined();
    expect(paper?.formulas.length).toBeGreaterThan(0);
    expect(paper?.governingStandards.length).toBeGreaterThan(0);
  });

  it("should return all unique slugs", () => {
    const slugs = getAllResearchPaperSlugs();
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("should contain complete BibTeX and APA citations for all papers", () => {
    RESEARCH_PAPERS.forEach((paper) => {
      expect(paper.bibtex).toContain("@techreport");
      expect(paper.bibtex).toContain(paper.slug);
      expect(paper.apa).toContain("HVACLogic Research Group");
      expect(paper.apa).toContain(paper.reportNumber);
      expect(paper.keyFindings.length).toBeGreaterThanOrEqual(3);
      expect(paper.companionCalculators.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("should contain verified academic repository links for each paper", () => {
    RESEARCH_PAPERS.forEach((paper) => {
      expect(paper.repositories).toBeDefined();
      expect(paper.repositories!.length).toBeGreaterThanOrEqual(1);
      paper.repositories!.forEach((repo) => {
        expect(repo.url).toMatch(/^https?:\/\//);
        expect(repo.label.length).toBeGreaterThan(0);
      });
    });
  });
});
