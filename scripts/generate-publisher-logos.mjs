import sharp from "sharp";
import fs from "node:fs";

const fullBleedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0f1d" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <linearGradient id="coolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#00d2ff" />
    </linearGradient>
    <linearGradient id="heatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff8c42" />
      <stop offset="100%" stop-color="#ff4500" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="64" height="64" fill="url(#bgGrad)" />
  <circle cx="32" cy="32" r="23" stroke="#1e293b" stroke-width="1" stroke-dasharray="2 3" opacity="0.9" />
  <path
    d="M 21 16 C 28 14 38 18 42 25 C 38 23 32 23 27 27 C 23 30 20 36 21 42 C 17 37 16 28 21 16 Z"
    fill="url(#coolGrad)"
    filter="url(#glow)"
  />
  <path
    d="M 43 48 C 36 50 26 46 22 39 C 26 41 32 41 37 37 C 41 34 44 28 43 22 C 47 27 48 36 43 48 Z"
    fill="url(#heatGrad)"
    filter="url(#glow)"
  />
  <circle cx="32" cy="32" r="4.5" fill="#ffffff" />
  <circle cx="32" cy="32" r="2.5" fill="#00d2ff" />
</svg>`;

const roundedSvg = fs.readFileSync("public/logo-icon.svg");

async function generate() {
  // 1. Full-bleed square 1000x1000 (Recommended for Google Publisher Center)
  await sharp(Buffer.from(fullBleedSvg), { density: 1500 })
    .resize(1000, 1000)
    .png({ quality: 100 })
    .toFile("public/google-publisher-logo-1000x1000.png");

  // 2. Full-bleed square 512x512
  await sharp(Buffer.from(fullBleedSvg), { density: 750 })
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile("public/google-publisher-logo-512x512.png");

  // 3. Rounded card square 1000x1000
  await sharp(roundedSvg, { density: 1500 })
    .resize(1000, 1000)
    .png({ quality: 100 })
    .toFile("public/google-publisher-logo-rounded-1000x1000.png");

  // 4. Rounded card square 512x512
  await sharp(roundedSvg, { density: 750 })
    .resize(512, 512)
    .png({ quality: 100 })
    .toFile("public/google-publisher-logo-rounded-512x512.png");

  console.log("All Google Publisher Center logos generated successfully!");
}

generate().catch(console.error);
