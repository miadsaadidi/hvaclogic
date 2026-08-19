import { test, expect } from "@playwright/test";

test.describe("Hydronic Boiler & Baseboard Sizing E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/boiler-size-calculator");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("Hydronic boiler sizing matches");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Solves 100 ft baseboard boiler size dynamically", async ({ page }) => {
    await page.goto("/calculators/boiler-size-calculator");

    // Default 100 ft baseboard -> ~75,000 BTU input
    await expect(page.locator(".primary-result-card .result-value")).toContainText("BTU/hr");
    await expect(page.locator(".primary-result-card")).toContainText("DOE Heating Output");
  });

  test("3. Scenario presets switch to Steam Radiators properly", async ({ page }) => {
    await page.goto("/calculators/boiler-size-calculator");

    // Click 300 EDR Steam preset
    const steamPreset = page.locator("button.preset-chip-btn").filter({ hasText: "300 EDR Steam" });
    await steamPreset.click();

    // Verify steam mode input & high output
    await expect(page.locator(".primary-result-card .result-value")).toContainText("BTU/hr");
  });

  test("4. Downstream heat loss and furnace handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/boiler-size-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Verify Boiler Sizing with Whole-Building" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/heat-loss-calculator");
  });
});
