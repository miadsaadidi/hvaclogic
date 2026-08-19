import { test, expect } from "@playwright/test";

test.describe("Furnace Sizing & AFUE BTU Calculator E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/furnace-size-calculator");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("multiply the square footage by your regional heating climate factor");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Computes furnace sizing dynamically on square footage and AFUE changes", async ({ page }) => {
    await page.goto("/calculators/furnace-size-calculator");

    // Change square footage to 2500
    const sqftInput = page.locator("#sqft-input");
    await sqftInput.fill("2500");

    // In Zone 4 (50 BTU/sqft), 2500 sq ft = 125,000 BTU net heat loss
    // At 96% AFUE -> Nominal model rating 140,000 BTU/hr
    const resultVal = page.locator(".primary-result-card .result-value");
    await expect(resultVal).toContainText("140,000 BTU/hr");
  });

  test("3. Preset scenario buttons update home parameters correctly", async ({ page }) => {
    await page.goto("/calculators/furnace-size-calculator");

    // Click Sub-Zero Zone 5 preset
    const subZeroPreset = page.locator("button.preset-chip-btn").filter({ hasText: "Sub-Zero Zone 5" });
    await subZeroPreset.click();

    // Verify Zone 5 is selected in dropdown
    await expect(page.locator("#zone-select")).toHaveValue("5");
    // Verify result card updates
    await expect(page.locator(".primary-result-card .result-value")).toBeVisible();
  });

  test("4. Downstream ductulator and cooling load links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/furnace-size-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Size Furnace Supply Plenum" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/ductulator?cfm=");
  });
});
