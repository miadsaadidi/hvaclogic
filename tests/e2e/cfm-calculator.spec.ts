import { test, expect } from "@playwright/test";

test.describe("HVAC CFM & Airflow Calculator E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/cfm-calculator");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("CFM = Velocity (FPM)");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Computes CFM dynamically on duct diameter changes", async ({ page }) => {
    await page.goto("/calculators/cfm-calculator");

    const diameterInput = page.locator("#diameter-input");
    await diameterInput.fill("12");

    // 12" round duct @ 800 FPM -> Area = pi * (0.5)^2 = 0.7854 sq ft -> ~628 CFM
    const resultVal = page.locator(".primary-result-card .result-value");
    await expect(resultVal).toContainText("628 CFM");
  });

  test("3. Switches between calculation modes (Thermal Load, Room ACH, Tonnage)", async ({ page }) => {
    await page.goto("/calculators/cfm-calculator");

    // Click Tonnage Tab
    const tonnageTab = page.locator("button").filter({ hasText: "AC Tonnage" });
    await tonnageTab.click();

    // Verify tonnage input visible
    await expect(page.locator("#tonnage-input")).toBeVisible();
    await page.locator("#tonnage-input").fill("4");

    // 4 Tons @ 400 CFM/ton = 1,600 CFM
    const resultVal = page.locator(".primary-result-card .result-value");
    await expect(resultVal).toContainText("1,600 CFM");
  });

  test("4. Downstream handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/cfm-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Digital Ductulator" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/ductulator?cfm=");
  });
});
