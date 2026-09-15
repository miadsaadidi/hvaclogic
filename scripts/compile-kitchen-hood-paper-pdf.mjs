import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

async function generatePdf() {
  const markdownPath = path.resolve('papers/Kitchen_Exhaust_Aerodynamics_Make_Up_Air_Dynamics.md');
  const pdfOutputPath1 = path.resolve('papers/Kitchen_Exhaust_Aerodynamics_Make_Up_Air_Dynamics.pdf');
  const pdfOutputPath2 = path.resolve('public/whitepapers/hvaclogic_kitchen_hood_exhaust_paper.pdf');
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');

  let htmlBody = markdownContent
    .replace(/^# (.*$)/gim, '<h1 class="paper-title">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="section-title">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="subsection-title">$1</h3>')
    .replace(/^\*\*Author\*\*: (.*$)/gim, '<div class="author-block"><strong>Author:</strong> $1</div>')
    .replace(/^\*\*Affiliation\*\*: (.*$)/gim, '<div class="affil-block"><strong>Affiliation:</strong> $1</div>')
    .replace(/^\*\*Permanent Academic Repository\*\*: (.*$)/gim, '<div class="meta-block"><strong>Academic Repository:</strong> <a href="$1">$1</a></div>')
    .replace(/^\*\*Interactive Reference Solver\*\*: (.*$)/gim, '<div class="meta-block"><strong>Reference Solver:</strong> <a href="$1">$1</a></div>')
    .replace(/^\*\*Methodology Documentation\*\*: (.*$)/gim, '<div class="meta-block"><strong>Methodology Documentation:</strong> <a href="$1">$1</a></div>')
    .replace(/^\*\*Publication Date\*\*: (.*$)/gim, '<div class="meta-block"><strong>Publication Date:</strong> $1</div>')
    .replace(/^\*\*Classification\*\*: (.*$)/gim, '<div class="meta-block"><strong>Classification:</strong> $1</div>')
    .replace(/```typescript([\s\S]*?)```/gim, '<pre class="code-block"><code>$1</code></pre>')
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
  <title>Kitchen Exhaust Aerodynamics & Make-Up Air Dynamics</title>
  <style>
    @page {
      size: letter;
      margin: 20mm 20mm 25mm 20mm;
      @bottom-right {
        content: counter(page);
      }
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      line-height: 1.5;
      color: #111;
      max-width: 800px;
      margin: 0 auto;
      padding: 0;
    }
    .paper-title {
      font-family: 'Arial', sans-serif;
      font-size: 16pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 12pt;
      line-height: 1.25;
      color: #0b1e36;
    }
    .author-block, .affil-block {
      text-align: center;
      font-size: 10.5pt;
      margin-bottom: 4pt;
    }
    .meta-block {
      font-size: 9.5pt;
      color: #333;
      margin-bottom: 3pt;
    }
    .section-title {
      font-family: 'Arial', sans-serif;
      font-size: 12pt;
      font-weight: bold;
      color: #0b1e36;
      border-bottom: 1px solid #ccc;
      padding-bottom: 3pt;
      margin-top: 14pt;
      margin-bottom: 6pt;
    }
    .subsection-title {
      font-family: 'Arial', sans-serif;
      font-size: 11pt;
      font-weight: bold;
      color: #222;
      margin-top: 10pt;
      margin-bottom: 4pt;
    }
    .code-block, .diagram-block {
      background-color: #f6f8fa;
      border: 1px solid #d0d7de;
      border-radius: 4px;
      padding: 8pt;
      font-family: 'Courier New', Courier, monospace;
      font-size: 9pt;
      line-height: 1.35;
      overflow-x: auto;
      margin: 8pt 0;
    }
    a {
      color: #0056b3;
      text-decoration: none;
    }
    hr {
      border: 0;
      border-top: 1px solid #ddd;
      margin: 12pt 0;
    }
    p {
      margin-bottom: 6pt;
      text-align: justify;
    }
  </style>
</head>
<body>
  <div class="content">
    <p>${htmlBody}</p>
  </div>
</body>
</html>`;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'load' });
  await page.pdf({
    path: pdfOutputPath1,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '20mm',
      bottom: '25mm',
      left: '20mm',
      right: '20mm',
    },
  });
  await page.pdf({
    path: pdfOutputPath2,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '20mm',
      bottom: '25mm',
      left: '20mm',
      right: '20mm',
    },
  });
  await browser.close();
  console.log(`✓ Successfully compiled PDFs to:\n  1. ${pdfOutputPath1}\n  2. ${pdfOutputPath2}`);
}

generatePdf().catch(console.error);
