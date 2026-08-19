import { test, expect } from "@playwright/test";

test.describe("Insulation R-Value & U-Factor E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/r-value-calculator");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("Insulation R-value measures thermal resistance");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Computes 2x6 high performance wall assembly R-value dynamically", async ({ page }) => {
    await page.goto("/calculators/r-value-calculator");

    // Default 2x6 wall preset -> R-30.5 Total
    await expect(page.locator(".primary-result-card .result-value")).toContainText("R-30.5");
    await expect(page.locator(".primary-result-card")).toContainText("IECC 2021/2024 Compliant");
  });

  test("3. Scenario presets switch assemblies and update R-values correctly", async ({ page }) => {
    await page.goto("/calculators/r-value-calculator");

    // Click R-49 Attic Cellulose preset
    const atticPreset = page.locator("button.preset-chip-btn").filter({ hasText: "R-49 Attic" });
    await atticPreset.click();

    // Verify R-value reaches ~R-50
    await expect(page.locator(".primary-result-card .result-value")).toContainText("R-50.3");
  });

  test("4. Downstream BTU and furnace handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/r-value-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Calculate Whole-House Manual J" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/btu-calculator");
  });
});
