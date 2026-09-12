import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

async function generatePdf() {
  const markdownPath = path.resolve('papers/Vapor_Compression_Refrigerant_Mass_Sizing.md');
  const pdfOutputPath = path.resolve('papers/Vapor_Compression_Refrigerant_Mass_Sizing.pdf');
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
  <title>Deterministic Vapor-Compression Refrigerant Mass Sizing</title>
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
      font-size: 17pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 12pt;
      line-height: 1.25;
      color: #0b1e36;
    }
    .author-block, .affil-block {
      text-align: center;
      font-size: 11pt;
      margin-bottom: 3pt;
    }
    .meta-block {
      text-align: center;
      font-size: 9pt;
      color: #444;
      margin-bottom: 2pt;
    }
    .section-title {
      font-family: 'Arial', sans-serif;
      font-size: 13pt;
      font-weight: bold;
      margin-top: 18pt;
      margin-bottom: 6pt;
      border-bottom: 1px solid #ccc;
      padding-bottom: 2pt;
      color: #0b1e36;
    }
    .subsection-title {
      font-family: 'Arial', sans-serif;
      font-size: 11pt;
      font-weight: bold;
      margin-top: 12pt;
      margin-bottom: 4pt;
      color: #1a365d;
    }
    p {
      margin-bottom: 8pt;
      text-align: justify;
      text-justify: inter-word;
    }
    .code-block, .diagram-block {
      background: #f4f6f9;
      border: 1px solid #d1d9e6;
      border-radius: 4px;
      padding: 8pt;
      font-family: 'Courier New', monospace;
      font-size: 9pt;
      line-height: 1.35;
      overflow-x: auto;
      margin: 8pt 0;
      white-space: pre-wrap;
    }
    a {
      color: #0056b3;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div><p>${htmlBody}</p></div>
</body>
</html>`;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'load' });
  await page.pdf({
    path: pdfOutputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '20mm',
      bottom: '25mm',
      left: '20mm',
      right: '20mm'
    }
  });

  await browser.close();
  console.log(`PDF successfully generated at: ${pdfOutputPath}`);
}

generatePdf().catch(console.error);
