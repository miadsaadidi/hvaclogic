# 📋 Master HVACLogic Calculator Engineering Checklist

Every new calculator built for **HVACLogic** MUST follow this exhaustive, non-negotiable checklist across all layers: **Competitor Analysis & Spec**, **Math/Types**, **Registry**, **UI/UX**, **Live SVG Visualizer**, **SEO/E-E-A-T**, **Metadata/JSON-LD**, **Workflows**, **Print Spec**, and **Automated Testing**.

---

## 0. 🔍 Competitor Research & Value Spec (MANDATORY PRE-REQUISITE)

> [!IMPORTANT]
> **DO NOT start coding any new calculator until Phase 0 is complete.** Every tool must have a clear value proposition that decisively beats existing tools.

- [ ] **3–5 Top Competitors Analyzed**:
  - Research and document 3–5 top ranking tools/apps in the market for the target keyword.
  - Document features provided, inputs required, calculation models used, and user experience.
- [ ] **User Value & Market Gap Analysis**:
  - Identify where competitors fail (e.g. ad clutter, paywalls, lead-capture gates, crude inaccurate rules of thumb, lack of mobile support, outdated code/refrigerant standards).
- [ ] **Strategic Differentiator Definition**:
  - Define the exact UX, visual diagrams, unit conversions, and physics precision that will make our tool superior without overcomplication.
- [ ] **Specification Document Updated**:
  - Write / update the calculator technical specification covering equations, inputs, outputs, preset scenarios, visualizer design, and downstream handoff links before beginning implementation.

---

## 1. 🧮 Pure Math Engine & Unit Tests Layer

- [ ] **Directory**: `src/lib/math/<module-name>.ts`
- [ ] **Pure Functions**: Zero React dependencies, zero side-effects, 100% deterministic arithmetic.
- [ ] **Type Interfaces**:
  - `export interface <Calculator>Input { ... }`
  - `export interface <Calculator>Output { ... }`
- [ ] **Physical Standards Compliance**:
  - Implement published standard formulas (e.g. ASHRAE Fundamentals, ACCA Manuals J/S/D, SMACNA, EPA Section 608, IECC 2024, NIST REFPROP).
- [ ] **Unit Tests**:
  - Location: `src/lib/math/<module-name>.test.ts`
  - Write Vitest tests asserting edge cases, nominal cases, and verified handbook benchmarks.
  - Verification command: `npm test` (<1s execution).

---

## 2. 🗂️ Calculator Registry Registration

- [ ] **File**: `src/lib/data/calculators-registry.ts`
- [ ] **Entry Schema**:
  ```ts
  {
    id: "<calculator-slug>",
    name: "<Official Tool Name>",
    pillar: "airflow-ducts" | "cooling-loads" | "field-diagnostics" | "heating-systems" | "building-science",
    route: "/calculators/<calculator-slug>",
    status: "production",
    launchPhase: 1,
    riskLevel: "low",
    primaryKeyword: "<target keyword>",
    secondaryKeywords: ["<kw1>", "<kw2>", "<kw3>"],
    primaryIntent: "Transactional / Professional Engineering",
    seoTitle: "<Exact 50-60 char Title> | HVACLogic",
    metaDescription: "<140-155 char compelling description with technical keywords>",
    categoryName: "<Category Display Name>",
    categoryRoute: "/<pillar-route>",
    features: [
      "<Key feature 1>",
      "<Key feature 2>",
      "<Key feature 3>",
      "<Key feature 4>",
      "<Key feature 5>",
    ],
    relatedCalculatorIds: ["<id1>", "<id2>", "<id3>"],
    standards: ["ASHRAE", "ACCA", "IECC"],
    formulaVersion: "1.0.0",
    dataVersion: "1.0.0",
    lastEngineeringReview: "2026-08-19",
    requiresReferenceDataset: false,
    offlineEligible: true,
    testStatus: "validated",
    faqs: [
      { question: "...", answer: "..." },
      { question: "...", answer: "..." },
      { question: "...", answer: "..." }
    ]
  }
  ```

---

## 3. 🎨 Live Reactive SVG Visualizer Component

- [ ] **Directory**: `src/components/calculator/visualizers/<VisualizerName>.tsx`
- [ ] **Requirements**:
  - Live reactive SVG / HTML Canvas rendering that animates and scales with user input updates.
  - Clear, labeled technical anatomy (e.g. duct dimensions, heat flow paths, saturation temperatures, pie/donut slices).
  - High-contrast colors conforming to theme tokens (`var(--accent-cooling)`, `var(--accent-heating)`, `var(--surface)`, `var(--ink)`).
  - Clean responsive bounding box with `viewBox` for crisp rendering across mobile and desktop.

---

## 4. 🎛️ Interactive Calculator Tool Component (UI/UX)

- [ ] **Directory**: `src/components/calculator/tools/<ToolName>.tsx`
- [ ] **Design & Typography**: Universal `Titillium Web` (`var(--font-titillium)`) and PowerLab card styling.
- [ ] **Quick Preset Chips Bar**:
  - Container: `<div className="preset-chips-container" role="group">`
  - Includes a right-aligned `↺ Reset Defaults` button.
  - 3–5 realistic standard engineering presets.
- [ ] **Input Controls**:
  - Dual slider (`type="range"`) + number input (`type="number"`) for continuous physical variables.
  - Linked `id` and `htmlFor` on all form elements.
  - Unit badges showing active units (`CFM`, `L/s`, `in. wg`, `Pa`, `BTU/hr`, `kW`, `sq ft`, `m²`).
- [ ] **Unit Conversion Hook**:
  - Uses `const { isMetric } = useUnitSystem();` to dynamically toggle units between Imperial (IP) and Metric (SI).
- [ ] **URL Search Parameter State Sync**:
  - Uses `useHydrateParams()` to read initial parameters on load and synchronize state changes to URL query strings without page reloads.
- [ ] **Primary & Secondary Result Cards**:
  - Primary result card with big bold metric (`.primary-result-card .result-value`), hover elevation, and soft cyan glow.
  - Secondary metrics grid (`.secondary-results-grid`) with `.secondary-result-item`.
- [ ] **Tool Actions Bar**:
  - Includes `<ActionButtonBar toolRoute="/calculators/<slug>" toolName="<Name>" onExportCsv={handleExport} />`.
  - Provides:
    - 🔗 **Share Link** (copies URL with current state + instant toast)
    - 🖨️ **Print Spec** (triggers print stylesheet with Job Submittal Block)
    - 📊 **Export CSV** (downloads calculation data file)
    - `</>` **Embed Tool** (opens responsive iframe embed modal)
- [ ] **Downstream Cross-Calculator Handoff Card**:
  - Container: `<div className="handoff-card">`
  - Links to the next logical tool in the engineering sizing sequence, pre-filling parameters (e.g. passing `?cfm=1200`).
- [ ] **Mobile Sticky Floating Result Bar**:
  - `<MobileResultBar label="..." value="..." unit="..." />` for persistent metrics on mobile viewports.

---

## 5. 📄 7-Section Semantic SEO Page Architecture

- [ ] **Directory**: `src/app/calculators/<calculator-slug>/page.tsx`
- [ ] **Dynamic OpenGraph Social Share Card**:
  - File: `src/app/calculators/<calculator-slug>/opengraph-image.tsx`
  - Dimensions: `1200x630` PNG via `next/og` `ImageResponse`.
  - Content: Glowing category eyebrow, 56px bold calculator title, meta description, and 3 standard verification badges.
- [ ] **Metadata & OpenGraph**:
  ```ts
  export const metadata: Metadata = {
    title: calculator.seoTitle,
    description: calculator.metaDescription,
    alternates: { canonical: `https://hvaclogic.org/calculators/${calculator.id}` },
    openGraph: {
      title: calculator.seoTitle,
      description: calculator.metaDescription,
      url: `https://hvaclogic.org/calculators/${calculator.id}`,
      siteName: "HVACLogic",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: calculator.seoTitle,
      description: calculator.metaDescription,
    },
  };
  ```
- [ ] **Single H1 Rule**: Only ONE `<h1>` per page (the calculator title inside `CalculatorContainer`).
- [ ] **7 Canonical Semantic Sections**:
  1. **Breadcrumbs & Semantic Header**: Handled automatically by `CalculatorContainer`.
  2. **Direct Answer Card**:
     - Snippet text answering target keyword intent in 40–50 words.
     - `formulaSnippet`: Exact text formula with 1-click copy toast button.
     - `authorityCitation`: Standard engineering reference (e.g. ACCA Manual J / ASHRAE 90.1).
  3. **Sticky Page Jump Navigation**:
     - `PageJumpNav` jumps to `#calculator-tool`, `#how-to-guide`, `#sizing-matrix`, `#worked-example`, `#faq-section`.
  4. **Interactive Tool UI**: `<toolComponent>` embedded in `#calculator-tool`.
  5. **Engineering Methodology & Derivations (`#how-to-guide`)**:
     - Category connected flow diagram (`<HvacFlowDiagram category="..." />`).
     - Step-by-step engineering calculation process (`<ol>`).
     - `<FormulaCard title="..." formula="..." variables={...} />`.
  6. **Reference Matrix Table (`#sizing-matrix`)**:
     - Clean, static HTML `<table>` benchmark grid with `<th scope="col">`.
  7. **Worked Numerical Example (`#worked-example`)**:
     - Real-world numerical engineering walkthrough with Step 1, Step 2, Step 3, and equipment selection.
  8. **Schema-Backed FAQ Accordion (`#faq-section`)**:
     - Native `<details><summary>` HTML5 accordion with rich answers.
  9. **E-E-A-T Engineering Review Card**:
     - Automatically included by `CalculatorContainer` (PE review byline, formula version, verification audit date).
  10. **Print Job Submittal Block**:
      - Automatically rendered at top on `@media print` with Project Name, Location, Technician, and Code references.

---

## 6. 🌐 Structured Data & JSON-LD Validation

- [ ] **JSON-LD Component**: Included automatically via `<SchemaJsonLd calculator={calculator} />`.
- [ ] **Schemas Emitted**:
  - `@type: "WebApplication"` (Application category, operatingSystem, browserRequirements).
  - `@type: "BreadcrumbList"` (Hierarchy navigation).
  - `@type: "FAQPage"` (Schema.org compliant Q&A pairs for Google rich snippet display).

---

## 7. 🧪 Testing & Verification Protocol

- [ ] **Fast Verification (Small Updates & Math)**:
  - `npm test` — Ensure all Vitest tests pass 100%.
  - `npm run typecheck` — Ensure 0 TypeScript errors (`tsc --noEmit`).
- [ ] **Full E2E Spec (New Calculator Launch)**:
  - Create `tests/e2e/<calculator-slug>.spec.ts`.
  - Assertions to cover:
    1. 7-section layout renders + JSON-LD contains `WebApplication` and `FAQPage`.
    2. Interactive inputs update results and reactive visualizer dynamically.
    3. Quick presets select properly and synchronize URL query params.
    4. Unit toggle (Imperial $\leftrightarrow$ Metric) updates units.
    5. Action bar / embed modal triggers.
    6. Downstream handoff link is present and correctly parameterized.
  - Run specific spec: `npx playwright test tests/e2e/<calculator-slug>.spec.ts`.
