/**
 * Automated Multi-Engine IndexNow Batch Submission Script
 *
 * Reads canonical URLs directly from the dynamic Next.js sitemap,
 * verifies key file hygiene in public/, and dispatches simultaneous
 * batch notifications to IndexNow, Bing, and Yandex endpoints.
 */

import fs from "fs";
import path from "path";
import sitemap from "../src/app/sitemap";
import { siteConfig } from "../src/lib/site-config";

const EXPECTED_KEY = "c74812a83e024b48bc29737190d7945e";
const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

async function main() {
  console.log("=== HVACLogic IndexNow Batch Dispatch ===");

  // 1. Validate Verification Key File Hygiene
  const keyFilePath = path.resolve(__dirname, `../public/${EXPECTED_KEY}.txt`);
  if (!fs.existsSync(keyFilePath)) {
    throw new Error(`[IndexNow] Key file not found at: ${keyFilePath}`);
  }

  const rawKey = fs.readFileSync(keyFilePath, "utf8");
  const trimmedKey = rawKey.trim();

  if (trimmedKey !== EXPECTED_KEY) {
    throw new Error(
      `[IndexNow] Key content mismatch. Expected '${EXPECTED_KEY}', got '${trimmedKey}'`
    );
  }

  if (rawKey.length !== 32) {
    console.warn(
      `[IndexNow] Warning: Raw key file contains trailing whitespace/newlines (${rawKey.length} bytes). Sanitizing...`
    );
    fs.writeFileSync(keyFilePath, trimmedKey, { encoding: "utf8" });
  }

  console.log(`[IndexNow] Key hygiene verified: ${trimmedKey} (32 characters)`);

  // 2. Extract Canonical URL List from Sitemap
  const sitemapEntries = sitemap();
  const urlList = sitemapEntries.map((entry) => entry.url);
  const host = new URL(siteConfig.canonicalDomain).hostname;

  console.log(`[IndexNow] Target Host: ${host}`);
  console.log(`[IndexNow] Loaded ${urlList.length} canonical URLs from sitemap.`);

  const payload = {
    host,
    key: trimmedKey,
    keyLocation: `${siteConfig.canonicalDomain}/${trimmedKey}.txt`,
    urlList,
  };

  // 3. Batch Push to Search Engine Endpoints
  console.log(`[IndexNow] Dispatching payloads to ${ENDPOINTS.length} search engine endpoints...`);

  const results = await Promise.allSettled(
    ENDPOINTS.map(async (endpoint) => {
      const startTime = Date.now();
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "HVACLogic-IndexNow-Dispatcher/1.0",
          },
          body: JSON.stringify(payload),
        });

        const elapsed = Date.now() - startTime;
        const responseBody = await response.text();

        return {
          endpoint,
          status: response.status,
          statusText: response.statusText,
          elapsed,
          ok: response.ok || response.status === 200 || response.status === 202,
          body: responseBody ? responseBody.slice(0, 150) : "",
        };
      } catch (err: any) {
        return {
          endpoint,
          status: 0,
          statusText: err?.message || "Network Error",
          elapsed: Date.now() - startTime,
          ok: false,
          body: "",
        };
      }
    })
  );

  let successCount = 0;
  for (const result of results) {
    if (result.status === "fulfilled") {
      const res = result.value;
      if (res.ok) {
        successCount++;
        console.log(`  ✓ ${res.endpoint} -> ${res.status} ${res.statusText} (${res.elapsed}ms)`);
      } else {
        console.warn(
          `  ⚠ ${res.endpoint} -> ${res.status} ${res.statusText} (${res.elapsed}ms) - ${res.body}`
        );
      }
    } else {
      console.error(`  ✗ Endpoint failed:`, result.reason);
    }
  }

  console.log(`[IndexNow] Completed: ${successCount}/${ENDPOINTS.length} endpoints accepted payload.`);
}

main().catch((err) => {
  console.error("[IndexNow] Fatal Error:", err);
  process.exit(1);
});
