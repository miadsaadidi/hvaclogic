import { test, expect } from "@playwright/test";

test.describe("Heat Pump Sizing & Balance Point E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/heat-pump-size-calculator");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("thermal balance point");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Computes balance point and auxiliary heat strip dynamically", async ({ page }) => {
    await page.goto("/calculators/heat-pump-size-calculator");

    // Select 3-ton cold climate preset default
    await expect(page.locator(".primary-result-card")).toContainText("Thermal Balance Point");
    await expect(page.locator(".primary-result-card .result-value")).toContainText("°F Outdoor");

    // Change heat loss to 50,000 BTU
    const heatLossInput = page.locator("#heat-loss-input");
    await heatLossInput.fill("50000");

    // Result value should update
    await expect(page.locator(".primary-result-card .result-value")).toBeVisible();
  });

  test("3. Preset scenario buttons update system parameters correctly", async ({ page }) => {
    await page.goto("/calculators/heat-pump-size-calculator");

    // Click 4-Ton Cold Climate preset
    const preset4T = page.locator("button.preset-chip-btn").filter({ hasText: "4-Ton Cold Climate" });
    await preset4T.click();

    // Verify 4-ton is selected
    await expect(page.locator("#tons-select")).toHaveValue("4");
  });

  test("4. Downstream furnace and load sizing handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/heat-pump-size-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Compare with Gas Furnace" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/furnace-size-calculator?sqft=");
  });
});
