import { chromium } from '@playwright/test';
import path from 'path';

async function generateStatement() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      line-height: 1.6;
      color: #333;
    }
    h2 {
      color: #0f172a;
      border-bottom: 2px solid #0284c7;
      padding-bottom: 8px;
    }
    .meta {
      margin-bottom: 30px;
      font-size: 14px;
      color: #555;
    }
    .statement-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 20px;
      border-radius: 6px;
      font-size: 15px;
    }
    .sig {
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <h2>Declaration of Competing Interest</h2>
  
  <div class="meta">
    <p><strong>Manuscript Title:</strong> Thermodynamic Phase-Equilibrium and Non-Linear Temperature Glide Modeling of Next-Generation Zeotropic A2L Refrigerants (R-454B &amp; R-32)</p>
    <p><strong>Journal:</strong> International Journal of Refrigeration (Elsevier)</p>
    <p><strong>Author:</strong> Miad Saadidi</p>
    <p><strong>Affiliation:</strong> HVACLogic Engineering &amp; Building Science Working Group</p>
    <p><strong>Date:</strong> September 7, 2026</p>
  </div>

  <div class="statement-box">
    <p><strong>Declaration:</strong></p>
    <p>The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper.</p>
    <p>This research received no specific grant from funding agencies in the public, commercial, or not-for-profit sectors. The research was independently developed as an open-access building science engineering initiative.</p>
  </div>

  <div class="sig">
    <p>Sincerely,</p>
    <p><strong>Miad Saadidi</strong><br>
    Lead Research Engineer<br>
    HVACLogic Engineering &amp; Building Science Working Group<br>
    https://hvaclogic.org</p>
  </div>
</body>
</html>
  `;

  await page.setContent(html);
  const outPath = path.resolve('d:/HVACLab/public/whitepapers/Declaration_of_Interest_Statement.pdf');
  await page.pdf({
    path: outPath,
    format: 'Letter',
    margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' }
  });

  console.log('Created: ' + outPath);
  await browser.close();
}

generateStatement().catch(console.error);
