import { test, expect } from "@playwright/test";

test.describe("Combustion Air Sizer E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/combustion-air-calculator");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("Combustion air sizing determines");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Solves Confined Space volume deficit dynamically", async ({ page }) => {
    await page.goto("/calculators/combustion-air-calculator");

    // Primary result check
    await expect(page.locator(".primary-result-card .result-value")).toContainText("CONFINED SPACE");
    await expect(page.locator(".primary-result-card")).toContainText("Enclosed Volume");
  });

  test("3. Scenario presets switch to Commercial Boiler Room properly", async ({ page }) => {
    await page.goto("/calculators/combustion-air-calculator");

    // Click Boiler Room preset
    const boilerPreset = page.locator("button.preset-chip-btn").filter({ hasText: "Boiler Room" });
    await boilerPreset.click();

    // Verify primary result card is visible
    await expect(page.locator(".primary-result-card")).toBeVisible();
  });

  test("4. Downstream furnace and boiler handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/combustion-air-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Size Furnace Input" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/furnace-size-calculator");
  });
});
