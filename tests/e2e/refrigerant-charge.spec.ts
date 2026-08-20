import { expect, test } from "@playwright/test";

test.describe("Refrigerant Line Set Charge Calculator", () => {
  test("renders the complete calculator page and sourced default profile", async ({ page }) => {
    await page.goto("/calculators/refrigerant-charge-calculator");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Refrigerant Line Set Charge");
    await expect(page.locator("#profile-select")).toHaveValue("icp-r5a5s-r454b");
    await expect(page.locator(".primary-result-card")).toContainText("Initial weigh-in estimate");
    await expect(page.locator(".primary-result-card")).toContainText("9 oz");
    await expect(page.locator("#how-to-guide")).toContainText("linear length");
    const schema = await page.locator('script[type="application/ld+json"]').textContent();
    expect(schema).toContain("WebApplication");
  });

  test("changes the R-32 rate with the selected suction line", async ({ page }) => {
    await page.goto("/calculators/refrigerant-charge-calculator");

    await page.locator("#profile-select").selectOption("daikin-residential-r32-ag-tp-110");
    await page.locator("#line-pair-select").selectOption("r32-3-8x7-8");
    await page.locator("#actual-length-input").fill("65");

    await expect(page.locator(".primary-result-card")).toContainText("1 lb 13 oz");
    await expect(page.locator("#a2l-charge-warning")).toBeVisible();
  });

  test("validates custom mode and then calculates a cited OEM rate", async ({ page }) => {
    await page.goto("/calculators/refrigerant-charge-calculator");

    await page.getByRole("button", { name: "Custom OEM rate" }).click();
    await page.locator("#manual-reference-input").fill("");
    await expect(page.locator(".charge-validation-card")).toContainText("Identify the equipment manual");

    await page.locator("#manual-reference-input").fill("OEM manual Table 7");
    await page.locator("#actual-length-input").fill("45");
    await page.locator("#custom-rate-input").fill("0.6");
    await expect(page.locator(".primary-result-card")).toContainText("1 lb 2 oz");
  });

  test("hydrates shared inputs from the URL and exposes shared actions", async ({ page }) => {
    await page.goto("/calculators/refrigerant-charge-calculator?profile=daikin-goodman-residential-r410a&pair=r410a-3-8x3-4&length=40&base_oz=96");

    await expect(page.locator("#profile-select")).toHaveValue("daikin-goodman-residential-r410a");
    await expect(page.locator("#line-pair-select")).toHaveValue("r410a-3-8x3-4");
    await expect(page.locator("#actual-length-input")).toHaveValue("40");
    await expect(page.getByRole("button", { name: /Share Link/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Embed Tool/ })).toBeVisible();
  });
});
