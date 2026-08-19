import { test, expect } from "@playwright/test";

test.describe("Kitchen Range Hood CFM & Make-Up Air E2E Suite", () => {
  test("1. Renders 7-section layout with metadata and JSON-LD", async ({ page }) => {
    await page.goto("/calculators/kitchen-hood-cfm");

    // Single H1 validation
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Direct Answer card
    await expect(page.locator(".direct-answer-card")).toBeVisible();
    await expect(page.locator(".direct-answer-card")).toContainText("For gas cooktops, calculate range hood CFM");

    // Schema JSON-LD
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toBeAttached();
  });

  test("2. Computes gas range hood CFM dynamically and triggers IRC make-up air alert", async ({ page }) => {
    await page.goto("/calculators/kitchen-hood-cfm");

    // Default 30" gas @ 45,000 BTU -> ~500 CFM (>400 CFM triggers make-up air)
    await expect(page.locator(".primary-result-card .result-value")).toContainText("500 CFM");
    await expect(page.locator(".primary-result-card")).toContainText("IRC M1503.6 Make-Up Air Damper Required");
  });

  test("3. Switches to induction electric cooktop and displays code exemption", async ({ page }) => {
    await page.goto("/calculators/kitchen-hood-cfm");

    // Click induction preset
    const inductionPreset = page.locator("button.preset-chip-btn").filter({ hasText: "Induction" });
    await inductionPreset.click();

    // 30" induction = 300 CFM (<=400 CFM exempt)
    const resultVal = page.locator(".primary-result-card .result-value");
    await expect(resultVal).toContainText("300 CFM");
    await expect(page.locator(".primary-result-card")).toContainText("IRC Code Compliant (≤400 CFM)");
  });

  test("4. Downstream ductulator and CFM handoff links are parameterized properly", async ({ page }) => {
    await page.goto("/calculators/kitchen-hood-cfm");

    const handoffLink = page.locator(".handoff-card a").filter({ hasText: "Verify Range Hood Duct Friction" });
    await expect(handoffLink).toBeVisible();
    const href = await handoffLink.getAttribute("href");
    expect(href).toContain("/calculators/ductulator?cfm=");
  });
});
