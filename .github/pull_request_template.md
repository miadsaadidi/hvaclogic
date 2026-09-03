## 📌 Summary & Scientific Context
<!-- Provide a concise description of the engineering/scientific motivation and changes. -->

### Relevant Engineering Standards
- [ ] ASHRAE Standard 90.1 / Handbook of Fundamentals
- [ ] ACCA Manual D / Manual J / Manual S
- [ ] SMACNA HVAC Duct Construction Standards
- [ ] AHRI Standard 210/240 / 340/360
- [ ] Other: 

---

## 🛠️ Architectural & Technical Changes
- **Math Layer**: `src/lib/math/<slug>.ts` (Deterministic pure functions)
- **Visualizer Engine**: `src/components/calculator/visualizers/<Name>.tsx` (Reactive SVG/Canvas)
- **UI Tool**: `src/components/calculator/tools/<ToolName>.tsx` (Dual-range controls, preset matrix, URL hydration)
- **SEO & Layout**: `src/app/calculators/<slug>/page.tsx` (7-section layout, schema, matrix tables)

---

## 🧪 Verification & Test Suite Results
<!-- All verification gates must pass prior to merge approval. -->

- [ ] **Vitest Unit Tests**: `npm test` passed with zero errors (`src/lib/math/*.test.ts`)
- [ ] **TypeScript Typecheck**: `npm run typecheck` (`tsc --noEmit`) clean 0 diagnostics
- [ ] **Playwright E2E Suite**: `npx playwright test tests/e2e/<slug>.spec.ts` passed
- [ ] **Unit Conversion & Range Invariants**: Metric & Imperial verified across boundary presets

---

## 📸 Visualizer & UI Output Verification
<!-- Include diagram captures or visualizer reactive state screenshots if applicable. -->

---

## 📚 Academic & Monograph Citations
<!-- Reference relevant whitepaper sections or academic papers if applicable. -->
