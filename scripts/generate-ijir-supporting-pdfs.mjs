import { chromium } from '@playwright/test';
import path from 'path';

async function generateSupporting() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Cover Letter
  const coverHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; font-size: 14px; }
    h2 { color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 8px; }
    .sig { margin-top: 35px; }
  </style>
</head>
<body>
  <h2>Cover Letter to the Editor-in-Chief</h2>
  <p><strong>Journal:</strong> International Journal of Refrigeration (Elsevier)</p>
  <p><strong>Date:</strong> September 7, 2026</p>
  <p>Dear Editor-in-Chief,</p>
  <p>Please find enclosed our original research manuscript titled <strong>"Thermodynamic Phase-Equilibrium and Non-Linear Temperature Glide Modeling of Next-Generation Zeotropic A2L Refrigerants (R-454B &amp; R-32)"</strong> for consideration as a Research Article in the <em>International Journal of Refrigeration</em>.</p>
  <p>With the global transition away from high-GWP HFCs (R-410A) mandated by the Kigali Amendment and EPA regulations, mildly flammable A2L refrigerants like R-454B (Opteon XL41) and R-32 represent the primary replacements across vapor-compression heating and cooling equipment. However, zeotropic blends like R-454B exhibit significant non-linear temperature glide during phase change. Traditional diagnostic practices using mid-point saturation approximations introduce systematic diagnostic errors (up to 2.2&deg;F / 1.2&deg;C) in subcooling and superheat evaluation.</p>
  <p>In this paper, we formulate deterministic mathematical equations modeling liquid bubble and vapor dew curves directly from NIST REFPROP saturation boundaries, benchmarked against experimental field data. Furthermore, we evaluate the computational performance of running these formulations in client-side engineering software without external database dependencies.</p>
  <p>We confirm that this work is original, has not been published previously, and is not currently under review elsewhere.</p>
  <div class="sig">
    <p>Sincerely,</p>
    <p><strong>Miad Saadidi</strong><br>
    Lead Research Engineer<br>
    HVACLogic Engineering &amp; Building Science Working Group<br>
    miadinside@gmail.com &bull; https://hvaclogic.org</p>
  </div>
</body>
</html>
  `;
  await page.setContent(coverHtml);
  await page.pdf({
    path: path.resolve('d:/HVACLab/public/whitepapers/Cover_Letter_IJIR.pdf'),
    format: 'Letter',
    margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' }
  });

  // Highlights
  const highlightsHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.8; color: #333; font-size: 15px; }
    h2 { color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 8px; }
    ul { margin-top: 20px; }
    li { margin-bottom: 12px; }
  </style>
</head>
<body>
  <h2>Research Highlights</h2>
  <p><strong>Manuscript:</strong> Thermodynamic Phase-Equilibrium and Non-Linear Temperature Glide Modeling of Next-Generation Zeotropic A2L Refrigerants (R-454B &amp; R-32)</p>
  <p><strong>Journal:</strong> International Journal of Refrigeration</p>
  <ul>
    <li>Formulated deterministic phase-equilibrium models for R-454B and R-32.</li>
    <li>Quantified 2.2&deg;F subcooling diagnostic error caused by zeotropic glide.</li>
    <li>Benchmark validation against NIST REFPROP thermodynamic saturation curves.</li>
    <li>Developed client-side computational algorithms for field diagnostics.</li>
  </ul>
</body>
</html>
  `;
  await page.setContent(highlightsHtml);
  await page.pdf({
    path: path.resolve('d:/HVACLab/public/whitepapers/Highlights_IJIR.pdf'),
    format: 'Letter',
    margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' }
  });

  console.log('Supporting PDFs generated.');
  await browser.close();
}

generateSupporting().catch(console.error);
