import { expect, test } from "@playwright/test";

test("a fresh production install opens published calculators and a fallback offline", async ({ page, context }) => {
  await page.goto("/");
  await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    if (!registration.active) throw new Error("Service worker did not activate");
  });
  if (!(await page.evaluate(() => Boolean(navigator.serviceWorker.controller)))) {
    await page.reload();
  }
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));

  await context.setOffline(true);

  await page.goto("/calculators/ductulator");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ductulator");
  await expect(page.locator("#calculator-tool")).toBeVisible();

  await page.goto("/calculators/filter-sizing-calculator");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Filter");

  await page.goto("/offline-route-that-was-never-cached");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page is not cached yet");

  const missingAsset = await page.evaluate(async () => {
    try {
      const response = await fetch("/missing-offline-script.js");
      return { rejected: false, status: response.status, body: await response.text() };
    } catch {
      return { rejected: true, status: 0, body: "" };
    }
  });
  expect(missingAsset.rejected || missingAsset.status !== 200).toBe(true);
  expect(missingAsset.body).not.toContain("Deterministic Engineering Calculators");
});
