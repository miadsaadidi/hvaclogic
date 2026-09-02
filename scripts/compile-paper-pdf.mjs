import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

async function generatePdf() {
  const markdownPath = path.resolve('papers/The_Physics_of_Un_Tensioned_Airflow.md');
  const pdfOutputPath = path.resolve('papers/The_Physics_of_Un_Tensioned_Airflow.pdf');
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');

  // Basic markdown to clean HTML parser for paper formatting
  let htmlBody = markdownContent
    .replace(/^# (.*$)/gim, '<h1 class="paper-title">$1</h1>')
    .replace(/^## (.*$)/gim, '<h2 class="section-title">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="subsection-title">$1</h3>')
    .replace(/^\*\*Author\*\*: (.*$)/gim, '<div class="author-block"><strong>Author:</strong> $1</div>')
    .replace(/^\*\*Affiliation\*\*: (.*$)/gim, '<div class="affil-block"><strong>Affiliation:</strong> $1</div>')
    .replace(/^\*\*ORCID\*\*: (.*$)/gim, '<div class="meta-block"><strong>ORCID:</strong> $1</div>')
    .replace(/^\*\*Permanent Repository\*\*: (.*$)/gim, '<div class="meta-block"><strong>Repository:</strong> $1</div>')
    .replace(/^\*\*Interactive Reference Solver\*\*: (.*$)/gim, '<div class="meta-block"><strong>Reference Solver:</strong> $1</div>')
    .replace(/^\*\*Academic Registry\*\*: (.*$)/gim, '<div class="meta-block"><strong>Academic Registry:</strong> $1</div>')
    .replace(/^\*\*Classification\*\*: (.*$)/gim, '<div class="meta-block"><strong>Classification:</strong> $1</div>')
    .replace(/```typescript([\s\S]*?)```/gim, '<pre class="code-block"><code>$1</code></pre>')
    .replace(/```text([\s\S]*?)```/gim, '<pre class="diagram-block"><code>$1</code></pre>')
    .replace(/```([\s\S]*?)```/gim, '<pre class="code-block"><code>$1</code></pre>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    .replace(/\n\n/gim, '</p><p>');

  // Wrap tables cleanly
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Physics of Un-Tensioned Airflow</title>
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
      font-size: 18pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 12pt;
      line-height: 1.25;
      color: #0b1e36;
    }
    .author-block, .affil-block, .meta-block {
      font-family: 'Arial', sans-serif;
      font-size: 9.5pt;
      text-align: center;
      color: #333;
      margin-bottom: 2pt;
    }
    .section-title {
      font-family: 'Arial', sans-serif;
      font-size: 13pt;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      padding-bottom: 4pt;
      margin-top: 18pt;
      margin-bottom: 8pt;
      color: #0b1e36;
    }
    .subsection-title {
      font-family: 'Arial', sans-serif;
      font-size: 11pt;
      font-weight: bold;
      margin-top: 12pt;
      margin-bottom: 6pt;
      color: #1a365d;
    }
    p {
      margin-top: 0;
      margin-bottom: 8pt;
      text-align: justify;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12pt 0;
      font-size: 9.5pt;
      font-family: 'Arial', sans-serif;
    }
    th, td {
      border: 1px solid #bbb;
      padding: 6pt 8pt;
      text-align: left;
    }
    th {
      background-color: #f0f4f8;
      font-weight: bold;
      color: #0b1e36;
    }
    pre.code-block, pre.diagram-block {
      background-color: #f7f9fb;
      border: 1px solid #d9e2ec;
      border-radius: 4px;
      padding: 10pt;
      font-family: 'Courier New', Courier, monospace;
      font-size: 8.5pt;
      line-height: 1.35;
      overflow-x: auto;
      margin: 10pt 0;
    }
    a {
      color: #0056b3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    hr {
      border: 0;
      border-top: 1px solid #ddd;
      margin: 14pt 0;
    }
  </style>
</head>
<body>
  ${htmlBody}
</body>
</html>`;

  const tempHtmlPath = path.resolve('papers/temp_paper_render.html');
  fs.writeFileSync(tempHtmlPath, fullHtml, 'utf8');

  console.log('Launching browser to render PDF...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle' });
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
  fs.unlinkSync(tempHtmlPath);
  console.log(`Successfully compiled PDF to: ${pdfOutputPath}`);
}

generatePdf().catch(err => {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
});
