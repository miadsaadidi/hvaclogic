import { expect, test } from "@playwright/test";

test.describe("Shared calculator actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.print = () => undefined;
    });
    await page.goto("/calculators/refrigerant-charge-calculator");
  });

  test("embed dialog is labeled, previews embed mode, closes with Escape, and restores focus", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /Embed Tool/ });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: /Embed/ });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog.getByRole("button", { name: "Close embed dialog" })).toBeFocused();
    await dialog.getByRole("button", { name: "Show Live Preview" }).click();
    await expect(dialog.locator("iframe")).toHaveAttribute("src", /\?embed=true$/);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("print dialog captures contractor metadata and print media keeps results", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /Print Spec/ });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: /Customize Client Job Submittal/ });
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog.getByRole("button", { name: "Close print dialog" })).toBeFocused();
    await dialog.getByLabel("Contractor / Company").fill("North Star Mechanical");
    await dialog.getByLabel("Project / Job #").fill("JOB-204");
    await dialog.getByRole("button", { name: "Print / Save as PDF" }).click();

    await page.emulateMedia({ media: "print" });
    await expect(page.locator(".print-submittal-header")).toBeVisible();
    await expect(page.locator(".print-submittal-header")).toContainText("North Star Mechanical");
    await expect(page.locator(".print-submittal-header")).toContainText("JOB-204");
    await expect(page.locator(".input-panel")).toBeHidden();
    await expect(page.locator(".primary-result-card")).toBeVisible();
    await expect(page.locator("#how-to-guide")).toBeHidden();
  });

  test("print dialog closes with Escape and restores trigger focus", async ({ page }) => {
    const trigger = page.getByRole("button", { name: /Print Spec/ });
    await trigger.click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: /Customize Client Job Submittal/ })).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});
