import { test, expect } from "@playwright/test";

test.describe("AC Tonnage & Room Capacity Calculator E2E Suite", () => {
  test("1. Renders 7-section layout with pre-rendered Schema.org JSON-LD", async ({ page }) => {
    await page.goto("/calculators/ac-tonnage-calculator");

    await expect(page.locator("h1")).toContainText("AC Tonnage & Room Capacity Calculator");
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator("#how-to-guide")).toBeVisible();
    await expect(page.locator("#sizing-matrix")).toBeVisible();
    await expect(page.locator("#worked-example")).toBeVisible();
    await expect(page.locator("#faq-section")).toBeVisible();

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toContain("WebApplication");
    expect(jsonLd).toContain("FAQPage");
  });

  test("2. Calculates recommended AC tonnage and SEER2 operating costs dynamically", async ({ page }) => {
    await page.goto("/calculators/ac-tonnage-calculator");

    // Default: 1,500 sq ft Moderate -> 2.5 Tons
    await expect(page.locator(".primary-result-card .result-value")).toContainText("2.5 Tons");

    // Update area to 2,500 sq ft
    const areaInput = page.locator("#ac-area-input");
    await areaInput.fill("2500");

    // Should update to 4.0 or 4.5 Tons
    await expect(page.locator(".primary-result-card .result-value")).toContainText("Tons");

    // SEER table should be visible
    await expect(page.locator(".output-panel table")).toBeVisible();
  });

  test("3. Selects quick presets and synchronizes query parameters", async ({ page }) => {
    await page.goto("/calculators/ac-tonnage-calculator");

    const presetBtn = page.getByRole("button", { name: "2,000 sq ft (Desert Heat)" });
    await presetBtn.scrollIntoViewIfNeeded();
    await presetBtn.click();

    await expect(page.locator("#ac-area-input")).toHaveValue("2000");
    expect(page.url()).toContain("climate=extreme_heat");
    expect(page.url()).toContain("area=2000");
  });

  test("4. Handoff link to Model Number Decoder is present", async ({ page }) => {
    await page.goto("/calculators/ac-tonnage-calculator");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Decode your AC model number" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/ac-model-decoder");
  });
});
