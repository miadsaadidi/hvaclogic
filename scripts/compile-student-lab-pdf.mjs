import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

async function generatePdf() {
  const markdownPath = path.resolve('papers/Student_Lab_01_Heat_Pump_Balance_Point_Thermodynamics.md');
  const pdfOutputPath = path.resolve('papers/Student_Lab_01_Heat_Pump_Balance_Point_Thermodynamics.pdf');
  const publicOutputPath = path.resolve('public/whitepapers/Student_Lab_01_Heat_Pump_Balance_Point_Thermodynamics.pdf');
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
    .replace(/^\*\*Open Benchmark Dataset\*\*: (.*$)/gim, '<div class="meta-item"><strong>Open Dataset:</strong> $1</div>')
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
  <title>Student Lab 01 - Heat Pump Balance Point Thermodynamics</title>
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
      font-size: 16pt;
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
      padding: 5px 7px;
      text-align: left;
    }
    th {
      background: #f1f5f9;
      font-weight: bold;
    }
    a {
      color: #0284c7;
      text-decoration: underline;
    }
    p {
      margin: 5pt 0;
      text-align: justify;
    }
    ul, ol {
      margin: 4pt 0 6pt 20pt;
      padding: 0;
    }
    li {
      margin-bottom: 3pt;
    }
  </style>
</head>
<body>
  <div class="meta-box">
    ${htmlBody}
  </div>
</body>
</html>`;

  console.log('Rendering Student Lab PDF...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'load' });
  
  await page.pdf({
    path: pdfOutputPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '15mm', bottom: '15mm', left: '15mm', right: '15mm' }
  });

  await browser.close();

  // Also copy to public/whitepapers if directory exists
  if (!fs.existsSync(path.dirname(publicOutputPath))) {
    fs.mkdirSync(path.dirname(publicOutputPath), { recursive: true });
  }
  fs.copyFileSync(pdfOutputPath, publicOutputPath);

  console.log(`Successfully compiled Student Lab PDF: ${pdfOutputPath}`);
}

generatePdf().catch(err => {
  console.error('PDF Generation failed:', err);
  process.exit(1);
});
