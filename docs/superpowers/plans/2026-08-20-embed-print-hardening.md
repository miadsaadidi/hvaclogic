# Embed and Print Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make shared embed and contractor submittal workflows accessible, accurately labeled, and testable across all production calculators.

**Architecture:** Shared modal behavior is implemented once in `EmbedModal` and `PrintSubmittalModal`; `ActionButtonBar` preserves trigger focus and dispatches submittal metadata. Print CSS reduces the existing calculator DOM to a compact metadata-and-results document.

**Tech Stack:** React 19, TypeScript, Next.js, CSS, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-20-refrigerant-charge-recovery-design.md`

## Global Constraints

- No new dialog or PDF dependency.
- Browser Print / Save as PDF is the supported export path.
- Preserve the branded iframe backlink and `?embed=true` behavior.
- Add targeted E2E coverage only.

---

### Task 1: Accessible Shared Modals

**Files:**
- Modify: `src/components/calculator/EmbedModal.tsx`
- Modify: `src/components/calculator/PrintSubmittalModal.tsx`
- Modify: `src/components/calculator/ActionButtonBar.tsx`
- Test: `tests/e2e/shared-actions.spec.ts`

**Interfaces:**
- Produces: Escape-close, initial focus, focus restoration, `role="dialog"`, `aria-modal="true"`, labeled descriptions.

- [ ] Write failing E2E assertions that open each modal, verify dialog semantics, close with Escape, and restore focus to the trigger.
- [ ] Run `npx playwright test tests/e2e/shared-actions.spec.ts` and confirm failure.
- [ ] Add refs/effects for initial focus, Escape handling, and trigger focus restoration without introducing a dependency.
- [ ] Change embed preview URL to `${toolRoute}?embed=true` and ensure generated code retains the canonical branded backlink.
- [ ] Rename the print submit action to `Print / Save as PDF`.
- [ ] Run the focused E2E, `npm test`, and `npm run typecheck`; commit.

### Task 2: Compact Printable Submittal

**Files:**
- Modify: `src/components/calculator/PrintJobSubmittal.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/e2e/shared-actions.spec.ts`

**Interfaces:**
- Consumes: `hvaclogic:submittal-update` metadata event.
- Produces: print-only metadata header plus calculator results.

- [ ] Add failing print-media assertions for hidden navigation/input controls and visible metadata/result content.
- [ ] Add `@page { size: letter portrait; margin: 0.4in; }`, hide SEO/non-result sections and `.input-panel`, expand `.output-panel`, and preserve safety/result content.
- [ ] Ensure company, technician, project/job, location, notes, calculator name, and governing standard render in the print header.
- [ ] Run the focused E2E, `npm test`, `npm run typecheck`, and `git diff --check`; commit.

