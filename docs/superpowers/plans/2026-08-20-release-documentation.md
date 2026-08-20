# Release and Documentation Reconciliation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconcile the 21-calculator suite, release the charge calculator truthfully, and complete all scoped verification gates.

**Architecture:** Documentation and public counts derive from the completed registry state. Release metadata changes only after math, page, shared actions, offline behavior, and focused E2E checks are green.

**Tech Stack:** Markdown, Next.js registry/pages, Vitest, TypeScript, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-20-refrigerant-charge-recovery-design.md`

## Global Constraints

- Do not claim 21 production calculators until every prior plan passes.
- Update facts and source references, not historical evidence unrelated to this calculator.
- Run scoped E2E tests; do not run the full Playwright suite.

---

### Task 1: Canonical Documentation

**Files:**
- Modify: `README.md`
- Modify: `docs/README.md`
- Modify: `docs/03-calculators-and-features-list.md`
- Modify: `docs/04-engineering-formulas-and-algorithms.md`
- Modify: `docs/08-engineering-source-register.md`
- Modify: `docs/09-validation-and-test-matrix.md`
- Modify: `docs/10-implementation-roadmap.md`
- Modify: `src/app/page.tsx`
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Produces: consistent 21-calculator public/documentation state.

- [ ] Add the 22-field charge-calculator contract, formula modes, source IDs, golden references, E2E matrix, and release record.
- [ ] Replace stale `17 calculators` totals with 21 only where the statement describes the current suite; preserve historical phase descriptions where applicable.
- [ ] Update homepage heading/stats and stale sitemap comments.
- [ ] Run `rg -n "All 17|17 calculators|all 17" README.md docs src` and resolve current-suite drift.
- [ ] Run `git diff --check`; commit documentation reconciliation.

### Task 2: Production Release Gate

**Files:**
- Modify: `src/lib/data/calculators-registry.ts`
- Regenerate: `public/sw.js`

**Interfaces:**
- Produces: charge calculator `production`/`validated`, included in public lists, sitemap, and PWA precache.

- [ ] Confirm all earlier focused commands are green before editing status.
- [ ] Change the registry entry to `status: "production"` and `testStatus: "validated"`; regenerate the service worker.
- [ ] Run fresh verification:

```text
npm test
npm run typecheck
npm run build
npx playwright test tests/e2e/refrigerant-charge.spec.ts tests/e2e/shared-actions.spec.ts
git diff --check
```

- [ ] Inspect complete output and counts; do not infer success from exit status alone.
- [ ] Confirm `git status --short` contains only intended implementation files.
- [ ] Commit the release state; do not push unless explicitly requested.
