# HVACLogic Engineering & Testing Guidelines

## Testing Protocol & Velocity Rules

### 1. Small Updates & UI Refinements
- **DO NOT** trigger full Playwright E2E suites for small updates, content edits, styling adjustments, or minor bug fixes.
- **DO RUN**:
  - `npm test` — Fast Vitest unit tests (<1s execution time).
  - `npm run typecheck` — TypeScript compiler verification (`tsc --noEmit`).

### 2. Heavy E2E Testing with Playwright
- **WHEN TO RUN**: Only run `npx playwright test` when:
  1. Creating a brand new calculator tool module.
  2. Performing a major structural refactor of core calculation math or URL parameter state synchronization.
- **HOW TO RUN**:
  - Run specific spec files during active development: `npx playwright test tests/e2e/<spec-name>.spec.ts`.
  - Avoid unnecessary timeouts by scoping assertions to single unique locators.

---

## Design System & Architecture

- **Typography**: Universal `Titillium Web` (`var(--font-titillium)`) across body, headings, inputs, and buttons.
- **Card Aesthetics**: PowerLab card style with 4px colored accent top border, uppercase domain badge, metric pill badge, and bottom action button.
- **Visual Schemas**: Every calculator tool output panel features a live reactive SVG visualizer (e.g. `DuctCanvasVisualizer`, `HeatLossDonutVisualizer`, `RefrigerantCircuitVisualizer`, `AcTonnageVisualizer`).
- **Privacy Guarantee**: 100% client-side computation with zero database tracking.

---

## Master Checklist for New Calculator Development

When creating ANY new calculator module, follow the complete checklist defined in:
👉 [`docs/NEW-CALCULATOR-CHECKLIST.md`](file:///d:/HVAC%20Lab/docs/NEW-CALCULATOR-CHECKLIST.md)

### Key Layers Checklist Summary:
0. **Competitor & Value Spec (MANDATORY PRE-REQUISITE)**: Analyze 3–5 competitors, extract features & user value, identify market pain points/gaps, and write/update the technical spec BEFORE coding.
1. **Math Layer**: `src/lib/math/<slug>.ts` (pure functions) + `src/lib/math/<slug>.test.ts` (Vitest unit tests).
2. **Registry**: `src/lib/data/calculators-registry.ts` (complete metadata, FAQs, keywords, features, standards).
3. **Reactive Visualizer**: `src/components/calculator/visualizers/<Name>.tsx` (live animated SVG/Canvas diagram).
4. **Tool UI Component**: `src/components/calculator/tools/<ToolName>.tsx` (Presets with Reset Defaults, dual range+number inputs, UnitSystem toggle, URL hydration, ActionButtonBar, and Downstream Handoff Card).
5. **Page Layout**: `src/app/calculators/<slug>/page.tsx` (7-section SEO architecture using `CalculatorContainer`, metadata + canonical + openGraph, `FormulaCard`, `HvacFlowDiagram`, HTML matrix table, and worked numerical example).
6. **E2E Test Spec**: `tests/e2e/<slug>.spec.ts` (Playwright suite covering layout, live calculations, presets, URL params, and downstream links).
