import { describe, expect, it } from "vitest";
import {
  ENGINEERING_GUIDES,
  getAllGuides,
  getPublishedGuides,
  getScheduledGuides,
  getGuideBySlug,
  getGuidesByPillar,
} from "./guides-registry";

describe("Engineering Guides Registry", () => {
  it("registers exactly 8 comprehensive engineering guides", () => {
    const guides = getAllGuides();
    expect(guides.length).toBe(8);
  });

  it("has 3 published guides and 5 scheduled guides in the roadmap", () => {
    const published = getPublishedGuides();
    const scheduled = getScheduledGuides();
    expect(published.length).toBe(3);
    expect(scheduled.length).toBe(5);
  });

  it("verifies every guide contains valid titles, routes, standards, and companion calculators", () => {
    ENGINEERING_GUIDES.forEach((guide) => {
      expect(guide.slug.length).toBeGreaterThan(5);
      expect(guide.title.length).toBeGreaterThan(10);
      expect(guide.shortTitle.length).toBeGreaterThan(5);
      expect(guide.summary.length).toBeGreaterThan(30);
      expect(guide.targetRoute.startsWith("/")).toBe(true);
      expect(guide.standards.length).toBeGreaterThanOrEqual(2);
      expect(guide.keyEquations.length).toBeGreaterThanOrEqual(1);
      expect(guide.keyTakeaways.length).toBeGreaterThanOrEqual(2);
      expect(guide.companionCalculators.length).toBeGreaterThanOrEqual(2);
      expect(guide.readingTime).toMatch(/min read/);
      expect(guide.scheduledDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  it("correctly retrieves a guide by slug", () => {
    const ductGuide = getGuideBySlug("air-distribution-duct-hydraulics");
    expect(ductGuide).toBeDefined();
    expect(ductGuide?.category).toBe("Airflow & Ducts");
    expect(ductGuide?.status).toBe("published");
  });

  it("correctly retrieves guides by pillar category", () => {
    const airflowGuides = getGuidesByPillar("airflow-ducts");
    expect(airflowGuides.length).toBeGreaterThanOrEqual(1);
    expect(airflowGuides.some((g) => g.slug === "air-distribution-duct-hydraulics")).toBe(true);
  });
});
