import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const width = 1280;
const height = 640;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070b14" />
      <stop offset="50%" stop-color="#0b1120" />
      <stop offset="100%" stop-color="#0a0f1d" />
    </linearGradient>

    <radialGradient id="cyanGlow" cx="15%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#00d2ff" stop-opacity="0.18" />
      <stop offset="50%" stop-color="#0284c7" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#070b14" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="heatGlow" cx="85%" cy="70%" r="50%">
      <stop offset="0%" stop-color="#ff6b4a" stop-opacity="0.14" />
      <stop offset="50%" stop-color="#ea580c" stop-opacity="0.04" />
      <stop offset="100%" stop-color="#070b14" stop-opacity="0" />
    </radialGradient>

    <!-- Brand Gradients -->
    <linearGradient id="logoCoolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#00d2ff" />
    </linearGradient>

    <linearGradient id="logoHeatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff8c42" />
      <stop offset="100%" stop-color="#ff4500" />
    </linearGradient>

    <!-- Glass Cards & Borders -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.4" />
      <stop offset="50%" stop-color="#334155" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#ff8c42" stop-opacity="0.3" />
    </linearGradient>

    <linearGradient id="badgeBorder" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00d2ff" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.1" />
    </linearGradient>

    <linearGradient id="orangeBadgeBorder" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff8c42" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#ff6b4a" stop-opacity="0.1" />
    </linearGradient>

    <!-- Pattern Grid -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.75" stroke-opacity="0.4" />
      <circle cx="40" cy="0" r="1" fill="#334155" fill-opacity="0.6" />
    </pattern>

    <!-- Filter for Glows -->
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- Base Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

  <!-- Ambient Light Orbs -->
  <rect width="${width}" height="${height}" fill="url(#cyanGlow)" />
  <rect width="${width}" height="${height}" fill="url(#heatGlow)" />

  <!-- Technical Grid Overlay -->
  <rect width="${width}" height="${height}" fill="url(#grid)" />

  <!-- Subtle Blueprint Schematic Lines (Right Side) -->
  <g opacity="0.22" transform="translate(760, 60)">
    <!-- Psychrometric / Thermodynamic Curve Wireframe -->
    <path d="M 20 480 Q 120 460 220 380 T 360 200 T 440 40" fill="none" stroke="#00d2ff" stroke-width="1.8" stroke-dasharray="4 4" />
    <path d="M 60 480 Q 160 440 260 340 T 400 140 T 470 20" fill="none" stroke="#38bdf8" stroke-width="1.4" />
    <path d="M 100 480 Q 200 420 300 300 T 440 80" fill="none" stroke="#64748b" stroke-width="1" />
    
    <!-- Schematic Duct Cross-Section -->
    <rect x="180" y="100" width="220" height="130" rx="10" fill="none" stroke="#ff8c42" stroke-width="1.5" stroke-dasharray="6 4" />
    <circle cx="290" cy="165" r="45" fill="none" stroke="#00d2ff" stroke-width="1.2" />
    <line x1="180" y1="100" x2="290" y2="165" stroke="#334155" stroke-width="1" stroke-dasharray="2 3" />
    <line x1="400" y1="230" x2="290" y2="165" stroke="#334155" stroke-width="1" stroke-dasharray="2 3" />

    <!-- Engineering Watermarks -->
    <text x="290" y="90" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="11" fill="#38bdf8" text-anchor="middle" letter-spacing="1">HUEBSCHER EQUIVALENT DIAMETER</text>
    <text x="340" y="255" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="10" fill="#94a3b8" letter-spacing="0.5">Re &gt; 4,000 • TURBULENT DARCY FLOW</text>
    <text x="220" y="470" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="10" fill="#64748b" letter-spacing="0.8">NIST REFPROP / HYLAND-WEXLER</text>
  </g>

  <!-- Outer Glass Boundary Card -->
  <rect x="36" y="36" width="1208" height="568" rx="20" fill="none" stroke="url(#borderGrad)" stroke-width="1.2" opacity="0.75" />

  <!-- ================= MASTER HEADER / BRANDING ================= -->
  <g transform="translate(80, 80)">
    <!-- Logo Badge Icon (68x68) -->
    <g transform="translate(0, 0)">
      <rect width="68" height="68" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="1.6" filter="url(#badgeShadow)" />
      <circle cx="34" cy="34" r="24" stroke="#334155" stroke-width="1" stroke-dasharray="2 3" opacity="0.6" />
      
      <!-- Cooling Blade -->
      <path d="M 22 17 C 30 15 40 19 45 27 C 40 25 34 25 29 29 C 25 32 21 38 22 45 C 18 40 17 30 22 17 Z" fill="url(#logoCoolGrad)" filter="url(#softGlow)" />
      <!-- Heating Blade -->
      <path d="M 46 51 C 38 53 28 49 23 41 C 28 43 34 43 39 39 C 43 36 47 30 46 23 C 50 28 51 38 46 51 Z" fill="url(#logoHeatGrad)" filter="url(#softGlow)" />
      
      <!-- Core -->
      <circle cx="34" cy="34" r="4.5" fill="#ffffff" />
      <circle cx="34" cy="34" r="2.5" fill="#00d2ff" />
    </g>

    <!-- Brand Typography -->
    <g transform="translate(88, 8)">
      <text x="0" y="34" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="38" font-weight="800" fill="#ffffff" letter-spacing="-0.5">HVAC<tspan fill="url(#logoCoolGrad)">Logic</tspan></text>
      <text x="210" y="24" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="12" font-weight="700" fill="#38bdf8" letter-spacing="2">.ORG</text>
      
      <text x="2" y="52" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="12" font-weight="700" fill="#64748b" letter-spacing="2.2">DETERMINISTIC BUILDING SCIENCE</text>
    </g>

    <!-- Top-Right Category Pill -->
    <g transform="translate(810, 8)">
      <rect x="0" y="0" width="230" height="34" rx="8" fill="#1e293b" fill-opacity="0.6" stroke="url(#badgeBorder)" stroke-width="1" />
      <circle cx="16" cy="17" r="4" fill="#00d2ff" />
      <text x="30" y="22" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="12" font-weight="700" fill="#94a3b8" letter-spacing="1.2">OPEN-SOURCE THERMODYNAMICS</text>
    </g>
  </g>

  <!-- ================= HERO HEADLINE & VALUE PROP ================= -->
  <g transform="translate(80, 200)">
    <!-- Main Headline -->
    <text x="0" y="44" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
      Deterministic Building Science &amp;
    </text>
    <text x="0" y="98" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="44" font-weight="800" fill="url(#logoCoolGrad)" letter-spacing="-0.5">
      Thermodynamic Modeling Suite
    </text>

    <!-- Subtitle Description -->
    <text x="0" y="148" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="18" font-weight="400" fill="#94a3b8" letter-spacing="0.2">
      High-precision HVAC engineering solvers built with pure TypeScript physics engines.
    </text>
    <text x="0" y="174" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="18" font-weight="400" fill="#94a3b8" letter-spacing="0.2">
      Zero database tracking, 100% client-side deterministic computation, and verified academic monographs.
    </text>
  </g>

  <!-- ================= PILLAR FEATURE BADGES ================= -->
  <g transform="translate(80, 440)">
    <!-- Badge 1: Darcy-Weisbach -->
    <g transform="translate(0, 0)">
      <rect width="250" height="42" rx="8" fill="#111827" stroke="#1e293b" stroke-width="1.2" filter="url(#badgeShadow)" />
      <rect x="0" y="0" width="4" height="42" rx="2" fill="#00d2ff" />
      <text x="16" y="26" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" letter-spacing="0.4">Darcy-Weisbach &amp; Colebrook</text>
    </g>

    <!-- Badge 2: Zeotropic A2L -->
    <g transform="translate(266, 0)">
      <rect width="250" height="42" rx="8" fill="#111827" stroke="#1e293b" stroke-width="1.2" filter="url(#badgeShadow)" />
      <rect x="0" y="0" width="4" height="42" rx="2" fill="#ff6b4a" />
      <text x="16" y="26" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" letter-spacing="0.4">Zeotropic A2L Refrigerant Glide</text>
    </g>

    <!-- Badge 3: Psychrometrics -->
    <g transform="translate(532, 0)">
      <rect width="250" height="42" rx="8" fill="#111827" stroke="#1e293b" stroke-width="1.2" filter="url(#badgeShadow)" />
      <rect x="0" y="0" width="4" height="42" rx="2" fill="#38bdf8" />
      <text x="16" y="26" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" letter-spacing="0.4">Hyland-Wexler Psychrometrics</text>
    </g>

    <!-- Badge 4: ASHRAE & ACCA -->
    <g transform="translate(798, 0)">
      <rect width="250" height="42" rx="8" fill="#111827" stroke="#1e293b" stroke-width="1.2" filter="url(#badgeShadow)" />
      <rect x="0" y="0" width="4" height="42" rx="2" fill="#10b981" />
      <text x="16" y="26" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="13" font-weight="700" fill="#f8fafc" letter-spacing="0.4">ASHRAE 210/240 &amp; Manual J/D/S</text>
    </g>

    <!-- Row 2 Metrics -->
    <!-- Metric 1 -->
    <g transform="translate(0, 60)">
      <rect width="250" height="52" rx="10" fill="#0f172a" stroke="url(#badgeBorder)" stroke-width="1" />
      <text x="20" y="32" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="20" font-weight="800" fill="#00d2ff">15+ Solvers</text>
      <text x="135" y="32" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="11" font-weight="600" fill="#64748b" letter-spacing="0.5">PRACTICE SUITE</text>
    </g>

    <!-- Metric 2 -->
    <g transform="translate(266, 60)">
      <rect width="250" height="52" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1" />
      <text x="20" y="32" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="20" font-weight="800" fill="#38bdf8">100% Client</text>
      <text x="145" y="32" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="11" font-weight="600" fill="#64748b" letter-spacing="0.5">ZERO DATABASE</text>
    </g>

    <!-- Metric 3 -->
    <g transform="translate(532, 60)">
      <rect width="250" height="52" rx="10" fill="#0f172a" stroke="#1e293b" stroke-width="1" />
      <text x="20" y="32" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="20" font-weight="800" fill="#ff8c42">0 ms</text>
      <text x="80" y="32" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="11" font-weight="600" fill="#64748b" letter-spacing="0.5">INSTANT EVALUATION</text>
    </g>

    <!-- Metric 4 -->
    <g transform="translate(798, 60)">
      <rect width="250" height="52" rx="10" fill="#0f172a" stroke="url(#orangeBadgeBorder)" stroke-width="1" />
      <text x="20" y="32" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="16" font-weight="700" fill="#f8fafc">OER Commons</text>
      <text x="145" y="32" font-family="'Titillium Web', 'Segoe UI', Arial, sans-serif" font-size="11" font-weight="600" fill="#10b981" letter-spacing="0.5">INDEXED COURSE</text>
    </g>
  </g>
</svg>
`;

async function run() {
  const outPath = path.resolve('public/images/github-social-preview.png');
  await sharp(Buffer.from(svg))
    .resize(width, height)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outPath);

  const stats = fs.statSync(outPath);
  console.log(`Generated ${outPath} (${stats.size} bytes, ${width}x${height}px)`);
}

run().catch(err => {
  console.error('Error generating image:', err);
  process.exit(1);
});
