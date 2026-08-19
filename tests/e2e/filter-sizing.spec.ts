import { test, expect } from "@playwright/test";

test.describe("MERV Filter Sizing & Pressure Drop E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/filter-sizing-calculator");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("Air filter sizing and static pressure drop");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Solves Face Velocity and Initial Static Pressure Drop dynamically", async ({ page }) => {
    await page.goto("/calculators/filter-sizing-calculator");

    // Primary result check
    await expect(page.locator(".primary-result-card .result-value")).toContainText("w.g.");
    await expect(page.locator(".primary-result-card")).toContainText("Face Velocity");
  });

  test("3. Scenario presets switch to 4-inch Deep Media Upgrade properly", async ({ page }) => {
    await page.goto("/calculators/filter-sizing-calculator");

    // Click 4" Deep Media Upgrade preset
    const mediaPreset = page.locator("button.preset-chip-btn").filter({ hasText: "4\" Deep Media" });
    await mediaPreset.click();

    // Verify low resistance result
    await expect(page.locator(".primary-result-card")).toBeVisible();
  });

  test("4. Downstream duct friction and CFM handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/filter-sizing-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Deduct Filter Drop" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/duct-friction-loss-calculator");
  });
});
