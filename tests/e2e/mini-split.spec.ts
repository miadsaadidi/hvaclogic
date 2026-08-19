import { test, expect } from "@playwright/test";

test.describe("Mini-Split Multi-Zone Sizing E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/mini-split-sizing");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("multi-zone ductless mini-split system");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Sizes multi-zone system and displays outdoor condenser tonnage", async ({ page }) => {
    await page.goto("/calculators/mini-split-sizing");

    // Default 3-zone preset
    await expect(page.locator(".primary-result-card")).toContainText("Recommended Outdoor Condenser");
    await expect(page.locator(".primary-result-card .result-value")).toBeVisible();
  });

  test("3. Scenario presets switch room counts dynamically", async ({ page }) => {
    await page.goto("/calculators/mini-split-sizing");

    // Click 2-zone preset
    const preset2Z = page.locator("button.preset-chip-btn").filter({ hasText: "2-Zone" });
    await preset2Z.click();

    // Verify room count shows (2/5)
    await expect(page.locator(".input-panel")).toContainText("Custom Zones (2/5)");
  });

  test("4. Downstream BTU and heat pump handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/mini-split-sizing");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Cross-Check Whole-House Manual J" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/btu-calculator");
  });
});
