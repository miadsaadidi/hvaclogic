import { test, expect } from "@playwright/test";

test.describe("Target Superheat & Subcooling Calculator E2E Suite", () => {
  test("1. Renders 7-section layout with pre-rendered Schema.org JSON-LD", async ({ page }) => {
    await page.goto("/calculators/superheat-subcooling-calculator");

    await expect(page.locator("h1")).toContainText("Superheat & Subcooling");
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator("#how-to-guide")).toBeVisible();
    await expect(page.locator("#sizing-matrix")).toBeVisible();
    await expect(page.locator("#worked-example")).toBeVisible();
    await expect(page.locator("#faq-section")).toBeVisible();

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toContain("WebApplication");
    expect(jsonLd).toContain("FAQPage");
  });

  test("2. Toggles between TXV (Subcooling) and Fixed Orifice (Target Superheat)", async ({ page }) => {
    await page.goto("/calculators/superheat-subcooling-calculator");

    // Click Fixed Orifice toggle button
    const pistonBtn = page.getByRole("button", { name: "Fixed Orifice / Piston (Superheat)" });
    await pistonBtn.click();

    // Environmental inputs should appear
    await expect(page.locator("#wb-in-input")).toBeVisible();
    await expect(page.locator("#db-out-input")).toBeVisible();

    // Result should show Target Superheat
    await expect(page.locator(".secondary-results-grid")).toContainText("Target Superheat");
  });

  test("3. Selects preset diagnostics and renders action checklist", async ({ page }) => {
    await page.goto("/calculators/superheat-subcooling-calculator");

    // Click "Fault: Active Undercharge / Leak" preset
    const underchargePreset = page.getByRole("button", { name: "Fault: Active Undercharge / Leak" });
    await underchargePreset.click();

    // Primary result should show undercharged status
    await expect(page.locator(".primary-result-card")).toContainText("Undercharged");

    // Field checklist should show leak checks
    await expect(page.locator(".output-panel")).toContainText("electronic leak detection");
  });

  test("4. Selects R-454B A2L refrigerant and displays flammability badge", async ({ page }) => {
    await page.goto("/calculators/superheat-subcooling-calculator?refrig=r454b");
    await expect(page.locator("#a2l-badge")).toBeVisible();
  });
});
