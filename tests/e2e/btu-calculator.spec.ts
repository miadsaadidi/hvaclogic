import { test, expect } from "@playwright/test";

test.describe("BTU Load Master Calculator E2E Suite", () => {
  test("1. Renders 7-section layout with pre-rendered Schema.org JSON-LD", async ({ page }) => {
    await page.goto("/calculators/btu-calculator");

    await expect(page.locator("h1")).toContainText("BTU Heating & Cooling Load Calculator");
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator("#how-to-guide")).toBeVisible();
    await expect(page.locator("#sizing-matrix")).toBeVisible();
    await expect(page.locator("#worked-example")).toBeVisible();
    await expect(page.locator("#faq-section")).toBeVisible();

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toContain("WebApplication");
    expect(jsonLd).toContain("FAQPage");
  });

  test("2. Dynamically recalculates tonnage and updates SVG donut breakdown", async ({ page }) => {
    await page.goto("/calculators/btu-calculator");

    // Default 2,000 sq ft -> ~2.8 to 3.0 Tons
    await expect(page.locator(".primary-result-card .result-value")).toContainText("Tons");

    // Update area to 3,000 sq ft
    const areaInput = page.locator("#area-input");
    await areaInput.fill("3000");

    // Tonnage should increase
    const resultText = await page.locator(".primary-result-card .result-value").textContent();
    const tonnage = parseFloat(resultText || "0");
    expect(tonnage).toBeGreaterThanOrEqual(4.0);

    // SVG Donut should be visible
    await expect(page.locator("#heat-loss-donut-svg")).toBeVisible();
  });

  test("3. Selects preset chips and synchronizes URL params", async ({ page }) => {
    await page.goto("/calculators/btu-calculator");

    const presetBtn = page.getByRole("button", { name: "1,500 sq ft Home (Zone 4)" });
    await presetBtn.scrollIntoViewIfNeeded();
    await presetBtn.click();

    await expect(page.locator("#area-input")).toHaveValue("1500");
    expect(page.url()).toContain("area=1500");
  });

  test("4. Links cleanly to downstream CFM calculator workflow", async ({ page }) => {
    await page.goto("/calculators/btu-calculator");

    const handoffLink = page.locator('.handoff-card a').filter({ hasText: "Size Airflow for" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/cfm-calculator?btu=");
  });
});
