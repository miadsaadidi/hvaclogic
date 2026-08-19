import { test, expect } from "@playwright/test";

test.describe("AC Model & Serial Number Decoder E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/ac-model-decoder");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("air conditioner tonnage from the model number");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Performs live decoding on model input changes", async ({ page }) => {
    await page.goto("/calculators/ac-model-decoder");

    const modelInput = page.locator("#model-input");
    await modelInput.fill("4TTR4048L1000AA");

    // Result should update to 4.0 Tons (48,000 BTU)
    const resultVal = page.locator(".primary-result-card .result-value");
    await expect(resultVal).toContainText("4 Tons");

    // Rating plate visualizer
    await expect(page.locator(".primary-result-card")).toContainText("48,000 BTU/hr");
    await expect(page.locator(".secondary-results-grid")).toContainText("1600 CFM");
  });

  test("3. Selects preset chips and synchronizes URL parameters", async ({ page }) => {
    await page.goto("/calculators/ac-model-decoder");

    // Click Goodman 3.0 Ton preset
    const goodmanChip = page.locator(".preset-chip-btn").filter({ hasText: "Goodman 3.0 Ton" });
    await goodmanChip.click();

    await expect(page.locator("#model-input")).toHaveValue("GSX140361KB");
    await expect(page.locator(".primary-result-card .result-value")).toContainText("3 Tons");
    await expect(page).toHaveURL(/model=GSX140361KB/);
  });

  test("4. Downstream handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/ac-model-decoder");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Size Ductwork" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/ductulator?cfm=");
  });
});
