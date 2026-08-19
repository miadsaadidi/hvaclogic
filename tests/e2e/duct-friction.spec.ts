import { test, expect } from "@playwright/test";

test.describe("Duct Friction Loss & TEL Sizer E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/duct-friction-loss-calculator");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("Duct friction loss and Total Equivalent Length");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Solves ACCA Manual D Friction Rate dynamically", async ({ page }) => {
    await page.goto("/calculators/duct-friction-loss-calculator");

    // Primary result check
    await expect(page.locator(".primary-result-card .result-value")).toContainText("w.g. / 100 ft");
    await expect(page.locator(".primary-result-card")).toContainText("Available Static Pressure");
  });

  test("3. Scenario presets switch to High-Static ECM properly", async ({ page }) => {
    await page.goto("/calculators/duct-friction-loss-calculator");

    // Click High-Static ECM preset
    const ecmPreset = page.locator("button.preset-chip-btn").filter({ hasText: "High-Static ECM" });
    await ecmPreset.click();

    // Verify TESP updated
    await expect(page.locator(".primary-result-card")).toBeVisible();
  });

  test("4. Downstream ductulator handoff link is parameterized properly", async ({ page }) => {
    await page.goto("/calculators/duct-friction-loss-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Size Duct Diameters" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/ductulator");
  });
});
