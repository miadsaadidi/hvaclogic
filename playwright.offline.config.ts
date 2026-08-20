import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "offline-pwa.spec.ts",
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    serviceWorkers: "allow",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm start",
    port: 3000,
    reuseExistingServer: false,
    timeout: 120000,
  },
});
