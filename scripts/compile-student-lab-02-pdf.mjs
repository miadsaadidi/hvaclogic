import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

async function generatePdf() {
  const markdownPath = path.resolve('papers/Student_Lab_02_Building_Envelope_Thermal_Transmission.md');
  const pdfOutputPath = path.resolve('papers/Student_Lab_02_Building_Envelope_Thermal_Transmission.pdf');
  const publicOutputPath = path.resolve('public/whitepapers/Student_Lab_02_Building_Envelope_Thermal_Transmission.pdf');
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');

  // Simple Markdown parsing for academic presentation
  let htmlBody = markdownContent
    .replace(/^# (.*$)/gim, '<h1 class="paper-title">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="section-title">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="subsection-title">$1</h3>')
    .replace(/^\*\*Author\*\*: (.*$)/gim, '<div class="meta-item"><strong>Author:</strong> $1</div>')
    .replace(/^\*\*Affiliation\*\*: (.*$)/gim, '<div class="meta-item"><strong>Affiliation:</strong> $1</div>')
    .replace(/^\*\*Canonical Laboratory Engine\*\*: (.*$)/gim, '<div class="meta-item"><strong>Canonical Engine:</strong> $1</div>')
    .replace(/^\*\*Companion Architecture\*\*: (.*$)/gim, '<div class="meta-item"><strong>Companion Hub:</strong> $1</div>')
    .replace(/^\*\*Companion Assembly Tool\*\*: (.*$)/gim, '<div class="meta-item"><strong>Companion Assembly Tool:</strong> $1</div>')
    .replace(/^\*\*Target Level\*\*: (.*$)/gim, '<div class="meta-item"><strong>Target Level:</strong> $1</div>')
    .replace(/```text([\s\S]*?)```/gim, '<pre class="diagram-block"><code>$1</code></pre>')
    .replace(/```([\s\S]*?)```/gim, '<pre class="code-block"><code>$1</code></pre>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    .replace(/\n\n/gim, '</p><p>');

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Student Lab 02 - Building Envelope Thermal Transmission & Manual J</title>
  <style>
    @page {
      size: letter;
      margin: 20mm 18mm 20mm 18mm;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #1a1a1a;
      max-width: 820px;
      margin: 0 auto;
    }
    .paper-title {
      font-family: 'Arial', sans-serif;
      font-size: 15pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 12pt;
      color: #0b1e36;
      line-height: 1.25;
    }
    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      padding: 10px 14px;
      margin-bottom: 16pt;
      font-size: 9.5pt;
    }
    .meta-item {
      margin-bottom: 3px;
    }
    .section-title {
      font-family: 'Arial', sans-serif;
      font-size: 12pt;
      font-weight: bold;
      color: #0b1e36;
      border-bottom: 1.5px solid #cbd5e1;
      padding-bottom: 3pt;
      margin-top: 14pt;
      margin-bottom: 6pt;
    }
    .subsection-title {
      font-family: 'Arial', sans-serif;
      font-size: 11pt;
      font-weight: bold;
      color: #1e293b;
      margin-top: 10pt;
      margin-bottom: 4pt;
    }
    .diagram-block, .code-block {
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #0284c7;
      padding: 8px 12px;
      font-family: 'Courier New', monospace;
      font-size: 9pt;
      overflow-x: auto;
      margin: 8pt 0;
      border-radius: 3px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10pt 0;
      font-size: 9pt;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 6px 8px;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      font-weight: bold;
      color: #0f172a;
    }
    .footer-note {
      margin-top: 24pt;
      padding-top: 8pt;
      border-top: 1px solid #e2e8f0;
      font-size: 8pt;
      color: #64748b;
      text-align: center;
    }
    a {
      color: #0284c7;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="meta-box">
    ${htmlBody}
  </div>
  <div class="footer-note">
    HVACLogic Open-Access Building Science Monograph Series &bull; Document ID: HL-LAB-2026-ENV02 &bull; https://hvaclogic.org
  </div>
</body>
</html>`;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle' });

  await page.pdf({
    path: pdfOutputPath,
    format: 'Letter',
    margin: {
      top: '18mm',
      bottom: '18mm',
      left: '16mm',
      right: '16mm'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="font-size: 8pt; font-family: Arial; width: 100%; text-align: center; color: #94a3b8;">HVACLogic Laboratory Series &bull; Student Lab 02 &bull; Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
  });

  fs.copyFileSync(pdfOutputPath, publicOutputPath);
  await browser.close();
  console.log(`Successfully generated Student Lab 02 PDF at ${pdfOutputPath}`);
}

generatePdf().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
