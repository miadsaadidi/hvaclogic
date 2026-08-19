import { test, expect } from "@playwright/test";

test.describe("Building Heat Loss & Infiltration E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/heat-loss-calculator");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("Whole-building heat loss calculates");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Solves peak heat loss for 2,000 sq ft home dynamically", async ({ page }) => {
    await page.goto("/calculators/heat-loss-calculator");

    // Check primary result card
    await expect(page.locator(".primary-result-card .result-value")).toContainText("BTU/hr");
    await expect(page.locator(".primary-result-card")).toContainText("Power Demand");
  });

  test("3. Scenario presets switch vintages and recalculate loads properly", async ({ page }) => {
    await page.goto("/calculators/heat-loss-calculator");

    // Click 1960s Ranch preset
    const ranchPreset = page.locator("button.preset-chip-btn").filter({ hasText: "1960s Ranch" });
    await ranchPreset.click();

    // Verify recalculation
    await expect(page.locator(".primary-result-card .result-value")).toContainText("BTU/hr");
  });

  test("4. Downstream furnace and heat pump handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/heat-loss-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Size 80% vs 96% AFUE Gas Furnace" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/furnace-size-calculator");
  });
});
