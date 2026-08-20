# Refrigerant Charge Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the interrupted universal-rate prototype with a sourced OEM/custom-rate refrigerant weigh-in calculator and complete its full production module stack.

**Architecture:** A pure engine consumes versioned OEM profiles from a focused data module or a technician-entered custom rate. A client tool renders the existing calculator interaction conventions, while a dedicated static page provides methodology, sources, safety language, metadata, and schema content.

**Tech Stack:** Next.js 15, React 19, TypeScript 5.7, Vitest 3, Playwright 1.50, Vanilla CSS.

**Spec:** `docs/superpowers/specs/2026-08-20-refrigerant-charge-recovery-design.md`

## Global Constraints

- Preserve all existing user changes and the 20 working calculator modules.
- Keep computation deterministic and client-side with no new dependencies.
- Treat outputs as initial weigh-in estimates; require OEM final charging verification.
- Do not use AHRI 540 as a line-set charging authority.
- Never extrapolate beyond a selected OEM profile.
- Keep the registry entry non-production until every release gate passes.
- Run only the new calculator's Playwright spec, not the full suite.

---

### Task 1: Truthful Recovery State

**Files:**
- Modify: `src/lib/data/calculators-registry.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/field-diagnostics/page.tsx`
- Test: `src/lib/data/calculators-registry.test.ts`

**Interfaces:**
- Consumes: `CalculatorMeta.status`, `publishedCalculators()`.
- Produces: public surfaces driven by `publishedCalculators()`; development entries remain addressable only through direct development work.

- [ ] Add a registry test asserting `publishedCalculators()` excludes `development` entries.
- [ ] Run `npx vitest run src/lib/data/calculators-registry.test.ts` and confirm the public-surface expectation fails where hard-coded registry consumption remains.
- [ ] Change the charge entry to `status: "development"` and `testStatus: "partial"`; use `publishedCalculators()` for homepage, sitemap, and pillar listings.
- [ ] Run `npm test` and `npm run typecheck`; TypeScript may still fail only on the known visualizer contract until Task 3.
- [ ] Commit only the registry/public-surface recovery files.

### Task 2: Versioned OEM Profile Data

**Files:**
- Create: `src/lib/data/refrigerant-charge-profiles.ts`
- Modify: `docs/05-competitive-analysis-and-calculator-specs.md`
- Modify: `docs/08-engineering-source-register.md`

**Interfaces:**
- Produces: `ChargeProfile`, `ChargeRateOption`, `REFRIGERANT_CHARGE_PROFILES`, `getChargeProfile(id)`.

- [ ] Define `ChargeProfile` with `id`, manufacturer, model family, refrigerant, source metadata, calculation method, factory allowance/inventory, supported line pairs, limits, long-line threshold, and final verification text.
- [ ] Add verified profiles for: ICP/Carrier-family R5A5S R-454B product data; Daikin residential R-32 long-line guide AG-TP-110; Daikin/Goodman residential R-410A condensing-unit guide.
- [ ] Encode the R-454B inventory-delta method separately from excess-length methods:

```ts
type ChargeCalculationMethod =
  | { kind: "inventory_delta"; factoryLineInventoryOz: number }
  | { kind: "excess_length"; factoryAllowanceFt: number };
```

- [ ] Record exact official URLs, revision dates, model scope, and formula limitations in the source register.
- [ ] Expand competitor research to three to five tools/guides without sourcing numeric rates from secondary pages.
- [ ] Run `npm run typecheck` and commit the profile/source slice.

### Task 3: Pure Calculation Engine Using TDD

**Files:**
- Rewrite: `src/lib/math/refrigerant-charge.ts`
- Rewrite: `src/lib/math/refrigerant-charge.test.ts`

**Interfaces:**
- Produces: `calculateRefrigerantCharge(input): RefrigerantChargeResult`, `formatChargeWeight(totalOz)`.

- [ ] Write failing golden tests for the three OEM sources, including R5A5S 45 ft with 5/16 line: `45 * 0.40 - 9 = 9 oz`.
- [ ] Write failing tests for custom rate, exact allowance, OEM-authorized negative adjustment, unsupported line pairs, out-of-profile length/lift, non-finite inputs, and formatting rollover.
- [ ] Run `npx vitest run src/lib/math/refrigerant-charge.test.ts` and confirm failures reflect the missing new contract.
- [ ] Implement discriminated inputs:

```ts
type RefrigerantChargeInput =
  | { mode: "oem_profile"; profileId: string; linePairId: string; actualLengthFt: number; verticalLiftFt: number; factoryBaseChargeOz: number }
  | { mode: "custom_oem_rate"; refrigerant: RefrigerantType; liquidLineOd: string; suctionLineOd: string; actualLengthFt: number; factoryAllowanceFt: number; adderRateOzPerFt: number; factoryBaseChargeOz: number; manualReference: string };
```

- [ ] Return `{ ok: false, errors }` for invalid/out-of-profile states and `{ ok: true, output }` for valid states; preserve unrounded raw values and provide formatted strings separately.
- [ ] Run the focused test, then `npm test` and `npm run typecheck`; confirm zero failures.
- [ ] Commit the engine and tests.

### Task 4: Interactive Tool and Visualizer

**Files:**
- Create: `src/components/calculator/tools/RefrigerantChargeTool.tsx`
- Rewrite: `src/components/calculator/visualizers/RefrigerantChargeVisualizer.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: profile data and `calculateRefrigerantCharge`.
- Produces: accessible calculator UI with share/print/export/embed actions and mobile result bar.

- [ ] Write a focused component/browser assertion in the future E2E file for initial result, mode switching, and validation; confirm it fails because the route/tool does not exist.
- [ ] Implement profile/custom mode selection, profile-aware line pairs and limits, presets, Reset Defaults, range+number inputs, URL hydration, and imperial/metric presentation.
- [ ] Render `Initial weigh-in estimate` as the primary result, raw/source/limit information as secondary results, and a blocking error panel for invalid profiles.
- [ ] Rework the SVG to consume only the new output contract and provide a complete dynamic `aria-label`.
- [ ] Add CSV export, `ActionButtonBar`, PT/Superheat handoffs, and `MobileResultBar`.
- [ ] Run `npm test` and `npm run typecheck`; commit the tool slice.

### Task 5: Dedicated Page, Metadata, and E2E

**Files:**
- Create: `src/app/calculators/refrigerant-charge-calculator/page.tsx`
- Create: `src/app/calculators/refrigerant-charge-calculator/opengraph-image.tsx`
- Create: `tests/e2e/refrigerant-charge.spec.ts`

**Interfaces:**
- Consumes: registry entry and `RefrigerantChargeTool`.
- Produces: complete seven-section static calculator page.

- [ ] Write E2E tests for layout/schema, R-454B inventory adjustment, R-32 line-pair rate change, custom mode validation, URL hydration, A2L warning, actions, and mobile result.
- [ ] Run the focused spec and confirm it fails on the missing route.
- [ ] Implement metadata, canonical/OpenGraph fields, direct answer, tool, sourced methodology, profile matrix, worked example, FAQ, safety language, and related tools using `CalculatorContainer`.
- [ ] Implement the standard 1200x630 OpenGraph image.
- [ ] Run `npx playwright test tests/e2e/refrigerant-charge.spec.ts`, `npm test`, `npm run typecheck`, and `npm run build`.
- [ ] Commit the page/module stack while leaving the registry status in development for the final release task.

