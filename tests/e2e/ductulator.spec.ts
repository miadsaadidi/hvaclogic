import { test, expect } from "@playwright/test";

test.describe("Ductulator Calculator E2E Suite", () => {
  test("1. Renders complete 7-section layout with pre-rendered Schema.org JSON-LD", async ({ page }) => {
    await page.goto("/calculators/ductulator");

    // Semantic Header
    await expect(page.locator("h1")).toContainText("Digital Ductulator & Air Duct Sizing Tool");
    await expect(page.locator(".breadcrumb")).toBeVisible();

    // DirectAnswerCard
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("Target Sizing Definition");

    // Pre-rendered Schema JSON-LD
    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toContain("WebApplication");
    expect(jsonLd).toContain("FAQPage");
    expect(jsonLd).toContain("BreadcrumbList");

    // Static Sections
    await expect(page.locator("#how-to-guide")).toBeVisible();
    await expect(page.locator("#sizing-matrix")).toBeVisible();
    await expect(page.locator("#worked-example")).toBeVisible();
    await expect(page.locator("#faq-section")).toBeVisible();
    await expect(page.locator(".standards-container")).toBeVisible();
  });

  test("2. Performs live reactive recalculations upon input updates", async ({ page }) => {
    await page.goto("/calculators/ductulator");

    // Default 1,200 CFM -> 14.2" round diameter
    await expect(page.locator(".primary-result-card .result-value")).toContainText('14.2"');

    // Update CFM input to 1,600
    const cfmInput = page.locator("#cfm-input");
    await cfmInput.fill("1600");

    // Result should reactively update to ~15.8"
    await expect(page.locator(".primary-result-card .result-value")).toContainText('15.8"');
  });

  test("3. Selects preset chips and updates calculation state", async ({ page }) => {
    await page.goto("/calculators/ductulator");

    // Click 1.5 Ton preset (600 CFM)
    const presetBtn = page.getByRole("button", { name: "1.5 Ton Trunk (600 CFM)" });
    await presetBtn.scrollIntoViewIfNeeded();
    await presetBtn.click();

    await expect(page.locator("#cfm-input")).toHaveValue("600");
    await expect(page.locator(".primary-result-card .result-value")).toContainText('10.9"');
  });

  test("4. Toggles Unit System between Imperial and Metric", async ({ page }) => {
    await page.goto("/calculators/ductulator");

    // Initial Imperial (inches)
    await expect(page.locator(".primary-result-card .result-value")).toContainText('"');

    // Click unit toggle in header
    const unitToggle = page.getByRole("button", { name: /Imperial|Metric/ });
    await unitToggle.click();

    // Now Metric (mm)
    await expect(page.locator(".primary-result-card .result-value")).toContainText("mm");
  });

  test("5. Synchronizes calculation state to URL search parameters", async ({ page }) => {
    await page.goto("/calculators/ductulator");

    // Change CFM
    const cfmInput = page.locator("#cfm-input");
    await cfmInput.fill("2000");

    // Check that URL query string updated without reload
    await expect(page).toHaveURL(/cfm=2000/);

    // Navigate directly to parameterized URL
    await page.goto("/calculators/ductulator?cfm=800&friction=0.10");
    await expect(page.locator("#cfm-input")).toHaveValue("800");
    await expect(page.locator("#friction-input")).toHaveValue("0.1");
  });

  test("6. Action bar opens Embed modal", async ({ page }) => {
    await page.goto("/calculators/ductulator");

    const embedBtn = page.getByRole("button", { name: "Embed Tool" });
    await embedBtn.scrollIntoViewIfNeeded();
    await embedBtn.click();

    await expect(page.getByText("Embed Digital Ductulator")).toBeVisible();
    await expect(page.locator("textarea")).toContainText("<iframe");
  });
});
