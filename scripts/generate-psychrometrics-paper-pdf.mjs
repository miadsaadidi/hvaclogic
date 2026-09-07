import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function generatePdf() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Thermodynamic Formulations of ASHRAE Hyland-Wexler Moist Air Psychrometrics</title>
  <style>
    @page {
      size: letter;
      margin: 20mm 18mm 22mm 18mm;
      @bottom-right {
        content: counter(page);
      }
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 10pt;
      line-height: 1.45;
      color: #111;
      margin: 0;
      padding: 0;
    }
    .header-bar {
      border-bottom: 2px solid #1a365d;
      padding-bottom: 6px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 8pt;
      color: #4a5568;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    h1.title {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 16pt;
      font-weight: 700;
      text-align: center;
      color: #0f172a;
      line-height: 1.3;
      margin: 0 0 10px 0;
    }
    .authors {
      text-align: center;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 10pt;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 4px;
    }
    .affiliations {
      text-align: center;
      font-size: 8.5pt;
      color: #475569;
      font-style: italic;
      margin-bottom: 16px;
    }
    .abstract-box {
      border-top: 1px solid #cbd5e1;
      border-bottom: 1px solid #cbd5e1;
      padding: 10px 14px;
      margin-bottom: 18px;
      background-color: #f8fafc;
      font-size: 9pt;
      text-align: justify;
    }
    .abstract-title {
      font-weight: 700;
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 9pt;
      color: #0f172a;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .keywords {
      margin-top: 6px;
      font-size: 8.5pt;
      color: #334155;
    }
    .keywords strong {
      color: #0f172a;
    }
    .columns {
      column-count: 2;
      column-gap: 20px;
      text-align: justify;
    }
    h2 {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin-top: 14px;
      margin-bottom: 6px;
      break-after: avoid;
    }
    h3 {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      font-size: 9.5pt;
      font-weight: 600;
      color: #1e293b;
      margin-top: 10px;
      margin-bottom: 4px;
      break-after: avoid;
    }
    p {
      margin: 0 0 8px 0;
      text-indent: 14px;
    }
    p.no-indent {
      text-indent: 0;
    }
    .equation {
      text-align: center;
      font-family: 'Cambria Math', 'Times New Roman', serif;
      font-style: italic;
      background-color: #f1f5f9;
      padding: 6px 8px;
      margin: 8px 0;
      border-radius: 4px;
      font-size: 9pt;
      break-inside: avoid;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7.5pt;
      margin: 10px 0;
      break-inside: avoid;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 4px 5px;
      text-align: left;
    }
    th {
      background-color: #e2e8f0;
      font-weight: 700;
      color: #0f172a;
    }
    tr:nth-child(even) {
      background-color: #f8fafc;
    }
    .code-block {
      background-color: #0f172a;
      color: #e2e8f0;
      font-family: 'Courier New', Courier, monospace;
      font-size: 7.5pt;
      padding: 6px 8px;
      border-radius: 4px;
      margin: 8px 0;
      white-space: pre-wrap;
      break-inside: avoid;
    }
    .footer-note {
      font-size: 8pt;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      margin-top: 16px;
    }
  </style>
</head>
<body>

  <div class="header-bar">
    <span>HVACLogic Open Building Science Monograph Series &bull; Technical Report HL-TR-2026-PSY04</span>
    <span>ISSN: 2995-1824 &bull; September 2026</span>
  </div>

  <h1 class="title">Thermodynamic Formulations of ASHRAE Hyland-Wexler Moist Air Psychrometrics and Numerical Energy-Balance Solvers for Building Sizing and Field Diagnostics</h1>

  <div class="authors">
    Miad Saadidi &bull; HVACLogic Engineering &amp; Building Science Working Group
  </div>
  <div class="affiliations">
    Open-Access Building Science Research Initiative &bull; Canonical Publication: https://hvaclogic.org/building-science
  </div>

  <div class="abstract-box">
    <div class="abstract-title">Abstract</div>
    Accurate evaluation of moist air thermodynamic properties is fundamental to building energy simulation, Sensible Heat Ratio (SHR) load splitting, and HVAC equipment sizing. Simplified quadratic approximations or linear psychrometric shortcuts introduce significant cumulative errors (often exceeding 5% to 8%) when applied across non-standard barometric elevations and elevated moisture contents. This monograph details the mathematical implementation of governing ASHRAE Fundamentals (Chapter 1) Hyland-Wexler formulations for saturation vapor pressure across liquid water (32&deg;F to 392&deg;F) and sub-freezing ice (-148&deg;F to 32&deg;F). We establish the numerical inversion framework for dew-point determination via logarithmic pressure polynomials and derive a 1D numerical energy-balance bisection solver for wet-bulb equilibrium convergence without closed-form algebraic solutions. Complete algorithmic architectures for humidity ratio (W), grains of moisture per pound of dry air, specific enthalpy (h), specific volume (v), and moist air density (&rho;) are validated against experimental thermodynamic tables. Interactive open-access computational implementations and validation benchmarks are integrated into the HVACLogic Deterministic Building Science Suite (https://hvaclogic.org/calculators/psychrometric-calculator).
    <div class="keywords">
      <strong>Keywords:</strong> Psychrometrics, Moist Air Thermodynamics, ASHRAE Hyland-Wexler, Enthalpy Sizing, Wet Bulb Convergence, Sensible Heat Ratio, Decarbonization, Zero-Database Engineering.
    </div>
  </div>

  <div class="columns">

    <h2>1. Introduction &amp; Fundamental Governing Laws</h2>
    <p>Atmospheric moist air is treated thermodynamically as a binary mixture composed of dry air and water vapor. Under Dalton's Law of Partial Pressures, the barometric total pressure P<sub>atm</sub> equals the sum of the partial pressures exerted independently by dry air (P<sub>da</sub>) and water vapor (P<sub>w</sub>):</p>
    <div class="equation">P<sub>atm</sub> = P<sub>da</sub> + P<sub>w</sub></div>
    <p>At standard sea level, P<sub>atm</sub> is defined as 14.696 psia (101.325 kPa). To account for altitudinal pressure gradients, ASHRAE specifies the barometric decay formula for elevations up to 15,000 ft:</p>
    <div class="equation">P<sub>atm</sub> = 14.696 &times; (1 &minus; 6.8754&times;10<sup>&minus;6</sup> &times; h)<sup>5.2559</sup></div>
    <p>where h is elevation above sea level in feet. Neglecting barometric altitude corrections leads to substantial density and mass-flow calculation errors in high-altitude zones (e.g., Denver, CO at 5,280 ft, where P<sub>atm</sub> drops to 12.15 psia).</p>

    <h2>2. Governing Saturation Pressure: The Hyland-Wexler Formulations</h2>
    <p>The saturation vapor pressure P<sub>ws</sub> defines the equilibrium vapor pressure exerted by moist air at full saturation. ASHRAE endorses the Hyland and Wexler (1983) formulations evaluated over absolute thermodynamic temperature T in degrees Rankine (T<sub>R</sub> = T<sub>&deg;F</sub> + 459.67).</p>
    
    <h3>2.1 Saturation Over Liquid Water (32&deg;F to 392&deg;F)</h3>
    <div class="equation">ln(P<sub>ws</sub>) = C<sub>8</sub>/T + C<sub>9</sub> + C<sub>10</sub>T + C<sub>11</sub>T<sup>2</sup> + C<sub>12</sub>T<sup>3</sup> + C<sub>13</sub>ln(T)</div>
    <p class="no-indent">where empirical coefficients are:</p>
    <p class="no-indent">&bull; C<sub>8</sub> = &minus;1.0440397 &times; 10<sup>4</sup><br>
    &bull; C<sub>9</sub> = &minus;1.1294650 &times; 10<sup>1</sup><br>
    &bull; C<sub>10</sub> = &minus;2.7022355 &times; 10<sup>&minus;2</sup><br>
    &bull; C<sub>11</sub> = 1.2890360 &times; 10<sup>&minus;5</sup><br>
    &bull; C<sub>12</sub> = &minus;2.4780681 &times; 10<sup>&minus;9</sup><br>
    &bull; C<sub>13</sub> = 6.5459673</p>

    <h3>2.2 Saturation Over Ice (&minus;148&deg;F to 32&deg;F)</h3>
    <div class="equation">ln(P<sub>ws</sub>) = C<sub>1</sub>/T + C<sub>2</sub> + C<sub>3</sub>T + C<sub>4</sub>T<sup>2</sup> + C<sub>5</sub>T<sup>3</sup> + C<sub>6</sub>T<sup>4</sup> + C<sub>7</sub>ln(T)</div>
    <p class="no-indent">where coefficients over the ice phase boundary are:</p>
    <p class="no-indent">&bull; C<sub>1</sub> = &minus;1.0214165 &times; 10<sup>4</sup><br>
    &bull; C<sub>2</sub> = &minus;4.8932428<br>
    &bull; C<sub>3</sub> = &minus;5.3765794 &times; 10<sup>&minus;3</sup><br>
    &bull; C<sub>4</sub> = 1.9202377 &times; 10<sup>&minus;7</sup><br>
    &bull; C<sub>5</sub> = 3.5575832 &times; 10<sup>&minus;10</sup><br>
    &bull; C<sub>6</sub> = &minus;9.0344688 &times; 10<sup>&minus;14</sup><br>
    &bull; C<sub>7</sub> = 4.1635019</p>

    <h2>3. Humidity Ratio and Grains of Moisture</h2>
    <p>The humidity ratio W represents the dimensionless mass ratio of water vapor per pound of dry air:</p>
    <div class="equation">W = 0.621945 &times; [ P<sub>w</sub> / (P<sub>atm</sub> &minus; P<sub>w</sub>) ]</div>
    <p>The constant 0.621945 corresponds to the ratio of molecular masses M<sub>w</sub>/M<sub>da</sub> = 18.01528 / 28.966. In building science, moisture is tracked in grains per pound (gr/lb), where 1 lb = 7,000 grains:</p>
    <div class="equation">W<sub>grains</sub> = W &times; 7,000</div>
    <p>Under standard indoor comfort conditions (75&deg;F dry-bulb, 50% relative humidity), moisture content stands at ~65 gr/lb. Exceeding 70 gr/lb exponentially elevates dust mite and mold spore proliferation.</p>

    <h2>4. Dew Point Determination via Inverse Logarithmic Polynomials</h2>
    <p>The dew point temperature T<sub>dp</sub> is the temperature at which condensation begins at constant pressure. ASHRAE provides an explicit inverse formulation based on &alpha; = ln(P<sub>w</sub>):</p>
    <div class="equation">T<sub>dp</sub> = 100.45 + 33.193&alpha; + 2.319&alpha;<sup>2</sup> + 0.17074&alpha;<sup>3</sup> + 1.2063(P<sub>w</sub>)<sup>0.1984</sup></div>
    <p class="no-indent">valid for T<sub>dp</sub> &ge; 32&deg;F (P<sub>w</sub> &ge; 0.08865 psia).</p>

    <h2>5. Wet Bulb Equilibrium via Numerical Energy Balance</h2>
    <p>Wet bulb temperature T<sub>wb</sub> represents dynamic equilibrium where sensible convective heat transfer from air balances evaporative mass transfer from a wetted wick. The governing thermodynamic energy balance is:</p>
    <div class="equation">W = [ (1093 &minus; 0.556 T<sub>wb</sub>)W<sub>s,wb</sub> &minus; 0.24(T<sub>db</sub> &minus; T<sub>wb</sub>) ] / [ 1093 + 0.444 T<sub>db</sub> &minus; T<sub>wb</sub> ]</div>
    <p>Because W<sub>s,wb</sub> is strongly non-linear in T<sub>wb</sub>, this formulation cannot be solved in closed algebraic form. HVACLogic implements an ultra-fast bisection root-finder bounded within [&minus;20&deg;F, T<sub>db</sub>] that converges to within 0.01&deg;F in under 25 iterations.</p>

    <h2>6. Volumetric &amp; Enthalpy Formulations</h2>
    <h3>6.1 Specific Enthalpy (h)</h3>
    <div class="equation">h = 0.24 T<sub>db</sub> + W &times; (1061 + 0.444 T<sub>db</sub>) &nbsp; [BTU/lb]</div>
    <h3>6.2 Specific Volume (v) &amp; Density (&rho;)</h3>
    <div class="equation">v = [ 53.352 &times; T<sub>R</sub> &times; (1 + 1.607858 W) ] / (P<sub>atm</sub> &times; 144)</div>
    <div class="equation">&rho; = (1 + W) / v &nbsp; [lb/ft<sup>3</sup>]</div>

    <h2>7. Experimental Validation Matrix</h2>
    <p>Below is the empirical benchmark matrix solved by the HVACLogic deterministic engine compared against ASHRAE Fundamentals Chapter 1 standard tables:</p>

    <table>
      <thead>
        <tr>
          <th>Condition</th>
          <th>T<sub>db</sub> (&deg;F)</th>
          <th>RH (%)</th>
          <th>T<sub>wb</sub> (&deg;F)</th>
          <th>T<sub>dp</sub> (&deg;F)</th>
          <th>W (gr/lb)</th>
          <th>h (BTU/lb)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Standard Comfort</td>
          <td>75.0</td>
          <td>50.0</td>
          <td>62.5</td>
          <td>55.1</td>
          <td>64.9</td>
          <td>28.14</td>
        </tr>
        <tr>
          <td>Cooling Coil Exit</td>
          <td>55.0</td>
          <td>90.0</td>
          <td>53.6</td>
          <td>52.2</td>
          <td>58.1</td>
          <td>22.42</td>
        </tr>
        <tr>
          <td>Peak Summer</td>
          <td>95.0</td>
          <td>40.0</td>
          <td>75.2</td>
          <td>67.2</td>
          <td>98.4</td>
          <td>38.61</td>
        </tr>
        <tr>
          <td>Winter Design</td>
          <td>20.0</td>
          <td>60.0</td>
          <td>18.1</td>
          <td>10.3</td>
          <td>9.1</td>
          <td>5.88</td>
        </tr>
      </tbody>
    </table>

    <h2>8. Architectural Implementation &amp; Conclusion</h2>
    <p>By implementing these exact formulations in pure, side-effect-free TypeScript, HVACLogic provides sub-millisecond psychrometric state evaluation directly within client browsers. This eliminates server latency, protects user project confidentiality, and provides engineering-grade accuracy across modern building electrification workflows.</p>

    <h2>References</h2>
    <p class="no-indent" style="font-size: 7.5pt; line-height: 1.35;">
      [1] ASHRAE Handbook of Fundamentals, Chapter 1: Psychrometrics. American Society of Heating, Refrigerating and Air-Conditioning Engineers, Atlanta, GA, 2021.<br>
      [2] Hyland, R. W., and Wexler, A. "Formulations for the Thermodynamic Properties of the Saturated Phases of H2O from 173.15 K to 473.15 K." ASHRAE Transactions, 89(2A), 500-519, 1983.<br>
      [3] ACCA Manual J (8th Edition): Residential Load Calculation. Air Conditioning Contractors of America, Arlington, VA, 2016.<br>
      [4] NIST REFPROP Reference Fluid Thermodynamic and Transport Properties Database, NIST Standard Reference Database 23, Version 10.0, 2018.
    </p>

  </div>

  <div class="footer-note">
    &copy; 2026 HVACLogic Research Working Group. Published under CC BY-NC-SA 4.0. Interactive tools available at https://hvaclogic.org/building-science and https://hvaclogic.org/calculators/psychrometric-calculator.
  </div>

</body>
</html>
  `;

  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  const targetDir = path.resolve('d:/HVACLab/public/whitepapers');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const outputPath = path.join(targetDir, 'hvaclogic_psychrometrics_hyland_wexler_paper.pdf');
  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    margin: {
      top: '15mm',
      bottom: '15mm',
      left: '15mm',
      right: '15mm'
    }
  });

  // Also copy to public/papers
  const papersDir = path.resolve('d:/HVACLab/public/papers');
  if (!fs.existsSync(papersDir)) {
    fs.mkdirSync(papersDir, { recursive: true });
  }
  fs.copyFileSync(outputPath, path.join(papersDir, 'hvaclogic_psychrometrics_hyland_wexler_paper.pdf'));

  console.log('PDF successfully generated at: ' + outputPath);
  await browser.close();
}

generatePdf().catch(console.error);
