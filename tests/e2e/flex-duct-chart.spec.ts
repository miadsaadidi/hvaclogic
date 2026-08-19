import { test, expect } from "@playwright/test";

test.describe("Flexible Duct CFM & Friction Chart E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/flex-duct-cfm-chart");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("standard 6-inch flexible duct");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Adjusts sag compression slider and derates matrix values", async ({ page }) => {
    await page.goto("/calculators/flex-duct-cfm-chart");

    // Initial 8" at 4% sag -> 177 CFM
    await expect(page.locator(".primary-result-card .result-value")).toContainText("177 CFM");

    // Click 15% Attic Sag Chip
    const sag15Btn = page.locator("button.preset-chip-btn").filter({ hasText: "15% Compression" });
    await sag15Btn.click();

    // 8" at 15% sag should derate to 148 CFM
    await expect(page.locator(".primary-result-card .result-value")).toContainText("148 CFM");
  });

  test("3. Quick Sizing Finder suggests correct diameter for target CFM", async ({ page }) => {
    await page.goto("/calculators/flex-duct-cfm-chart");

    const cfmInput = page.locator("#target-cfm-input");
    await cfmInput.fill("300");

    // Sizing finder recommendation should be 10" flex duct
    await expect(page.locator(".input-panel")).toContainText("10\" Flexible Duct");
  });

  test("4. Downstream handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/flex-duct-cfm-chart");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Sheet Metal Ductulator" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/ductulator?cfm=");
  });
});
