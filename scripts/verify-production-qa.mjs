import fs from "fs";
import path from "path";

const serverAppDir = path.resolve(".next/server/app");

if (!fs.existsSync(serverAppDir)) {
  console.error("CRITICAL: .next/server/app directory does not exist! Run npm run build first.");
  process.exit(1);
}

// Recursively find all .html files
const allHtmlFiles = [];
function findHtml(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      findHtml(p);
    } else if (p.endsWith(".html")) {
      allHtmlFiles.push(p);
    }
  }
}
findHtml(serverAppDir);

console.log(`Total production HTML files discovered: ${allHtmlFiles.length}`);

let totalLocalhost = 0;
let totalHmr = 0;
let totalTurbopackDev = 0;
let totalWebpackHot = 0;
let totalDevMarkers = 0;
let totalDeterministicEngine = 0;

for (const filePath of allHtmlFiles) {
  const relPath = path.relative(serverAppDir, filePath);
  const content = fs.readFileSync(filePath, "utf-8");

  if (content.includes("localhost")) {
    console.error(`[FAIL] localhost found in ${relPath}`);
    totalLocalhost++;
  }
  if (content.includes("turbopack_browser_dev") || content.includes("__turbopack")) {
    console.error(`[FAIL] Turbopack dev artifact in ${relPath}`);
    totalTurbopackDev++;
  }
  if (content.includes("webpack-hot-middleware") || content.includes("__next_hmr")) {
    console.error(`[FAIL] HMR artifact in ${relPath}`);
    totalHmr++;
  }
  if (content.includes('"b":"development"')) {
    console.error(`[FAIL] Development payload marker in ${relPath}`);
    totalDevMarkers++;
  }
  if (/deterministic\s+engine/i.test(content)) {
    console.error(`[FAIL] 'deterministic engine' found in ${relPath}`);
    totalDeterministicEngine++;
  }
}

console.log("\n--- GLOBAL SCAN RESULTS ---");
console.log(`Production HTML pages inspected: ${allHtmlFiles.length}`);
console.log(`localhost occurrences: ${totalLocalhost}`);
console.log(`Turbopack dev artifacts: ${totalTurbopackDev}`);
console.log(`HMR / hot middleware artifacts: ${totalHmr}`);
console.log(`Development payload markers: ${totalDevMarkers}`);
console.log(`'deterministic engine' occurrences: ${totalDeterministicEngine}`);

// Representative page checks
const representativePages = [
  { name: "PT Chart Calculator", rel: "calculators/pt-chart.html" },
  { name: "A2L Master Guide", rel: "guides/a2l-refrigerant-transition-guide.html" },
  { name: "Vapor Compression Research", rel: "research/vapor-compression-kinetics-heat-pump-derating.html" },
  { name: "ASHRAE Hyland-Wexler Dataset", rel: "datasets/ashrae-hyland-wexler-psychrometric-benchmark.html" },
  { name: "Methodology Reference", rel: "methodology.html" },
  { name: "Disclaimer Governance", rel: "disclaimer.html" },
];

console.log("\n--- REPRESENTATIVE PAGES INSPECTION ---");
let repPassed = true;
for (const rep of representativePages) {
  const fullP = path.join(serverAppDir, rep.rel);
  if (!fs.existsSync(fullP)) {
    console.error(`[FAIL] Representative page missing: ${rep.rel}`);
    repPassed = false;
    continue;
  }
  const content = fs.readFileSync(fullP, "utf-8");

  // Check OG Image
  const ogImageMatch = content.match(/<meta property="og:image" content="([^"]+)"/i);
  const twitterImageMatch = content.match(/<meta name="twitter:image" content="([^"]+)"/i);
  const ogImageUrl = ogImageMatch ? ogImageMatch[1] : "N/A";
  const twitterImageUrl = twitterImageMatch ? twitterImageMatch[1] : "N/A";

  // Check Disclaimer Component presence (or dedicated page content for disclaimer.html)
  const hasDisclaimer = rep.rel === "disclaimer.html" 
    ? content.includes("Engineering Disclaimer &amp; Regulatory Notice") || content.includes("Engineering Disclaimer & Regulatory Notice")
    : content.includes("hvaclogic-disclaimer");

  // Check SoftwareSourceCode name if calculator
  let sourceCodeName = "N/A";
  if (rep.rel.startsWith("calculators/")) {
    const m = content.match(/"@type":"SoftwareSourceCode"[^}]*"name":"([^"]+)"/);
    if (m) sourceCodeName = m[1];
  }

  const isProdOg = ogImageUrl.startsWith("https://hvaclogic.org") || ogImageUrl === "N/A";
  const isProdTwitter = twitterImageUrl.startsWith("https://hvaclogic.org") || twitterImageUrl === "N/A";

  console.log(`[PASS] ${rep.name} (${rep.rel}):`);
  console.log(`       - OG Image: ${ogImageUrl} (prod: ${isProdOg})`);
  console.log(`       - Twitter Image: ${twitterImageUrl} (prod: ${isProdTwitter})`);
  console.log(`       - Disclaimer present: ${hasDisclaimer}`);
  if (sourceCodeName !== "N/A") {
    console.log(`       - SoftwareSourceCode name: "${sourceCodeName}"`);
  }

  if (!isProdOg || !isProdTwitter || !hasDisclaimer) {
    repPassed = false;
  }
}

if (totalLocalhost === 0 && totalHmr === 0 && totalTurbopackDev === 0 && totalDevMarkers === 0 && totalDeterministicEngine === 0 && repPassed) {
  console.log("\nALL VERIFICATIONS PASSED IN PRODUCTION BUILD!");
  process.exit(0);
} else {
  console.error("\nONE OR MORE PRODUCTION VERIFICATIONS FAILED!");
  process.exit(1);
}
