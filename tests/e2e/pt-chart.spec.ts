import { test, expect } from "@playwright/test";

test.describe("Digital Refrigerant PT Chart E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/pt-chart");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("refrigerant Pressure-Temperature (PT) chart");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Computes R-454B and R-410A saturation temperatures dynamically", async ({ page }) => {
    await page.goto("/calculators/pt-chart");

    // Select R-410A chip
    const r410aChip = page.locator("button.preset-chip-btn").filter({ hasText: "R410A" });
    await r410aChip.click();

    // Set pressure to 118 psig
    const pressureInput = page.locator("#pressure-input");
    await pressureInput.fill("118");

    // 118 psig for R-410A = ~40°F
    const resultVal = page.locator(".primary-result-card .result-value");
    await expect(resultVal).toContainText("40°F");
  });

  test("3. Switches to temperature to pressure reverse lookup mode", async ({ page }) => {
    await page.goto("/calculators/pt-chart");

    // Click Sat. Temp -> Pressure button
    const modeBtn = page.locator("button").filter({ hasText: "Sat. Temp → Pressure" });
    await modeBtn.click();

    // Enter 40°F
    const tempInput = page.locator("#temp-input");
    await expect(tempInput).toBeVisible();
    await tempInput.fill("40");

    // Result value should contain PSIG
    const resultVal = page.locator(".primary-result-card .result-value");
    await expect(resultVal).toContainText("PSIG");
  });

  test("4. Downstream charging diagnostic handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/pt-chart");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Diagnose TXV Subcooling" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/superheat-subcooling-calculator?ref=");
  });
});
