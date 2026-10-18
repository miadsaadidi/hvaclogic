/**
 * Automated IndexNow Submission Script for HVACLogic
 * Pings Bing, Yandex, and IndexNow central API endpoints
 * dynamically pulling canonical URLs from the live sitemap.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = "hvaclogic.org";
const BASE_URL = `https://${HOST}`;
const DEFAULT_KEY = "c74812a83e024b48bc29737190d7945e";

// Verify key file hygiene
const keyFilePath = path.resolve(__dirname, `../public/${DEFAULT_KEY}.txt`);
let key = DEFAULT_KEY;
if (fs.existsSync(keyFilePath)) {
  key = fs.readFileSync(keyFilePath, "utf8").trim();
}

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

async function fetchSitemapUrls() {
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    if (res.ok) {
      const xml = await res.text();
      const urls = [];
      const regex = /<loc>(https:\/\/[^<]+)<\/loc>/g;
      let match;
      while ((match = regex.exec(xml)) !== null) {
        urls.push(match[1]);
      }
      if (urls.length > 0) {
        return urls;
      }
    }
  } catch {
    // Fall back to local fallback if remote fetch is unreachable
  }
  return [];
}

async function pingIndexNow() {
  console.log("=== HVACLogic IndexNow Dynamic Dispatch ===");
  console.log(`[IndexNow] Key: ${key} (${key.length} chars)`);
  console.log(`[IndexNow] Target Host: ${HOST}`);

  let urlList = await fetchSitemapUrls();

  if (urlList.length === 0) {
    console.warn("[IndexNow] Warning: Could not fetch remote sitemap.xml, using fallback canonical list.");
    urlList = [
      `${BASE_URL}`,
      `${BASE_URL}/calculators/expansion-tank-calculator`,
      `${BASE_URL}/research/ashrae-hyland-wexler-moist-air-psychrometrics`,
      `${BASE_URL}/guides/framing-thermal-bridging-effective-r-value`,
    ];
  }

  console.log(`[IndexNow] Loaded ${urlList.length} canonical URLs for submission.`);

  const payload = {
    host: HOST,
    key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList,
  };

  for (const endpoint of ENDPOINTS) {
    const startTime = Date.now();
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "User-Agent": "HVACLogic-IndexNow-Dispatcher/1.0",
        },
        body: JSON.stringify(payload),
      });

      const elapsed = Date.now() - startTime;
      const body = await res.text();

      if (res.ok || res.status === 200 || res.status === 202) {
        console.log(`  ✓ ${endpoint} -> ${res.status} ${res.statusText} (${elapsed}ms)`);
      } else {
        console.warn(`  ⚠ ${endpoint} -> ${res.status} ${res.statusText} (${elapsed}ms) - ${body.slice(0, 120)}`);
      }
    } catch (err) {
      console.error(`  ✗ ${endpoint} -> Error: ${err.message}`);
    }
  }
}

pingIndexNow();

