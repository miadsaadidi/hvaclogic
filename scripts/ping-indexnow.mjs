/**
 * Automated IndexNow Submission Script for HVACLogic
 * Pings Bing & Yandex via the IndexNow API protocol
 */

const INDEXNOW_KEY = "c74812a83e024b48bc29737190d7945e";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const HOST = "hvaclogic.org";
const BASE_URL = `https://${HOST}`;

const CANONICAL_ROUTES = [
  "",
  "/airflow-ducts",
  "/cooling-loads",
  "/heating-systems",
  "/field-diagnostics",
  "/building-science",
  "/methodology",
  "/sources",
  "/about",
  "/privacy",
  "/calculators/ductulator",
  "/calculators/flex-duct-cfm-chart",
  "/calculators/cfm-calculator",
  "/calculators/kitchen-hood-cfm",
  "/calculators/duct-friction-loss-calculator",
  "/calculators/filter-sizing-calculator",
  "/calculators/btu-calculator",
  "/calculators/ac-tonnage-calculator",
  "/calculators/ac-model-decoder",
  "/calculators/mini-split-sizing",
  "/calculators/superheat-subcooling-calculator",
  "/calculators/pt-chart",
  "/calculators/psychrometric-calculator",
  "/calculators/refrigerant-charge-calculator",
  "/calculators/heat-pump-size-calculator",
  "/calculators/furnace-size-calculator",
  "/calculators/boiler-size-calculator",
  "/calculators/garage-heater-sizing",
  "/calculators/combustion-air-calculator",
  "/calculators/r-value-calculator",
  "/calculators/heat-loss-calculator",
];

async function pingIndexNow() {
  const urlList = CANONICAL_ROUTES.map((r) => `${BASE_URL}${r}`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  };

  console.log(`[IndexNow] Submitting ${urlList.length} canonical URLs for ${HOST}...`);

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    console.log(`[IndexNow] Response status: ${res.status} (${res.statusText})`);
    if (res.ok || res.status === 200 || res.status === 202) {
      console.log(`[IndexNow] Successfully notified search engines! Key: ${INDEXNOW_KEY}`);
    } else {
      const text = await res.text();
      console.warn(`[IndexNow] Submission returned warning:`, text);
    }
  } catch (err) {
    console.error(`[IndexNow] Error pinging IndexNow:`, err.message);
  }
}

pingIndexNow();
