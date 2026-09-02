# HVACLogic Engineering & Testing Guidelines

## Agent Communication & Execution Rules
- **Direct Answers to Questions (NO UNREQUESTED ACTIONS)**: When the user asks an informational or diagnostic question (e.g., *"did we activate this option?"*, *"do we show X?"*, *"is Y working?"*), provide a direct, concise status report in plain text (e.g., *"Yes, X is enabled, but Y is not configured yet. Next steps would be..."*). **DO NOT** treat questions as implicit authorization to start coding, run scripts, compile code, generate files, or take automated actions. If an action is appropriate, propose it and ask for explicit confirmation first.
- **"Push to Vercel" Directive**: When the user instructs *"push to vercel"*, it strictly means running the direct Vercel CLI production deployment (`npx vercel --prod --token $env:VERCEL_TOKEN --yes`), **NOT** pushing commits to Git/GitHub. Git pushes are only performed when explicitly told *"push to git"* or *"push to github"*.
- **Outreach Email Signature**: ALWAYS sign outreach and follow-up emails simply as **`Miad S.`** (never full last name).
- **No AI Watermarks / Em-Dashes**: NEVER use em-dashes (`—`) in outreach emails, copy, or templates. Use standard hyphens (`-`), commas, or periods.

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

---

## Medium Technical Publishing & Authority Guidelines

When authoring or updating technical editorial content for syndication on Medium (`medium.com` — DA 96), follow the rules codified in:
👉 [`docs/MEDIUM-EDITORIAL-GUIDELINES.md`](file:///d:/HVACLab/docs/MEDIUM-EDITORIAL-GUIDELINES.md)
👉 Operations Ledger: [`docs/15-medium-publishing-and-interlinking-tracker.md`](file:///d:/HVACLab/docs/15-medium-publishing-and-interlinking-tracker.md)

---

## Excluded Channels & Strict Platform Policies

### 🚫 STRICTLY BANNED PLATFORMS (NEVER SUGGEST OR USE):
1. **Reddit (`reddit.com` / `r/...`)**: Strictly banned. Never propose Reddit posts, community comments, or threads.
2. **Zenodo (`zenodo.org`)**: Strictly banned due to irrecoverable network 403 blocks.
3. **ResearchGate (`researchgate.net`)**: Strictly banned due to mandatory predefined institutional email barriers.
4. **Figshare (`figshare.com`)**: Strictly banned due to account/platform publishing errors.
5. **wikiHow (`wikihow.com`)**: Strictly banned due to consumer DIY mismatch and nofollow policy.

### ✅ APPROVED DISTRIBUTION & ACADEMIC REPOSITORIES ONLY:
1. **Medium (`medium.com` — DA 96)**: For all 15 technical engineering teardown articles.
2. **Academia.edu (`academia.edu` — DA 93)**: For verified academic whitepaper publication & profile backlink ([Paper #172310808](https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing)).
3. **Internet Archive (`archive.org` — DA 96)**: For permanent open monograph repository & preprint citations.


