import { test, expect } from "@playwright/test";

test.describe("Garage & Workshop Heater Sizing E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/garage-heater-sizing");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("Garage heater sizing calculates");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Solves standard 2-car garage heating demand dynamically", async ({ page }) => {
    await page.goto("/calculators/garage-heater-sizing");

    // Primary result check
    await expect(page.locator(".primary-result-card .result-value")).toContainText("BTU Gas");
    await expect(page.locator(".primary-result-card")).toContainText("Peak Thermal Demand");
  });

  test("3. Scenario presets switch to Pole Barn Shop properly", async ({ page }) => {
    await page.goto("/calculators/garage-heater-sizing");

    // Click Pole Barn Shop preset
    const shopPreset = page.locator("button.preset-chip-btn").filter({ hasText: "1,200 sq ft Shop" });
    await shopPreset.click();

    // Verify radiant recommendation or high output
    await expect(page.locator(".primary-result-card")).toContainText("Radiant Tube Heater");
  });

  test("4. Downstream heat loss and furnace handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/garage-heater-sizing");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Calculate Whole-Home Thermal Heat Loss" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/heat-loss-calculator");
  });
});
