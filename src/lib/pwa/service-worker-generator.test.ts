import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { extractOfflineRoutes, renderServiceWorker } from "../../../scripts/generate-service-worker.mjs";

describe("service worker generator", () => {
  it("precaches published offline calculators and excludes development entries", async () => {
    const registry = await readFile(path.resolve("src/lib/data/calculators-registry.ts"), "utf8");
    const routes = extractOfflineRoutes(registry);

    expect(routes).toContain("/calculators/ductulator");
    expect(routes).toContain("/calculators/filter-sizing-calculator");
    expect(routes).toContain("/calculators/refrigerant-charge-calculator");
    const developmentFixture = `  {\n    id: "future-tool",\n    route: "/calculators/future-tool",\n    status: "development",\n    offlineEligible: true,\n  },`;
    expect(extractOfflineRoutes(developmentFixture)).not.toContain("/calculators/future-tool");

    const serviceWorker = renderServiceWorker(routes);
    expect(serviceWorker).toContain('"/offline.html"');
    expect(serviceWorker).toContain('event.request.mode === "navigate"');
    expect(serviceWorker).not.toContain('caches.match("/")');
  });
});
