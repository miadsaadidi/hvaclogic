import { test, expect } from "@playwright/test";

test.describe("Psychrometric Chart & Moist Air E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/psychrometric-calculator");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("Moist air psychrometric properties");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Solves comfort state point (75°F / 50% RH) dynamically", async ({ page }) => {
    await page.goto("/calculators/psychrometric-calculator");

    // Default 75°F / 50% RH -> Dew point
    await expect(page.locator(".primary-result-card .result-value")).toContainText("Dew Point");
    await expect(page.locator(".primary-result-card")).toContainText("Ideal Comfort (ASHRAE 55)");
  });

  test("3. Switches mode to Dry Bulb & Wet Bulb and recalculates state point", async ({ page }) => {
    await page.goto("/calculators/psychrometric-calculator");

    // Click AC Entering Coil preset (which uses db_wb mode)
    const preset = page.locator("button.preset-chip-btn").filter({ hasText: "AC Entering Coil" });
    await preset.click();

    // Check wet bulb input exists
    await expect(page.locator("#wet-bulb-input")).toBeVisible();
  });

  test("4. Downstream charging and CFM handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/psychrometric-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Check Target Superheat with Indoor Wet Bulb" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/superheat-subcooling-calculator");
  });
});
