# Offline PWA Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make a fresh production PWA installation capable of opening every published calculator offline with a meaningful navigation fallback.

**Architecture:** A small build-time generator reads production/beta routes from the registry and writes a versioned service worker asset. Navigation requests use network-first with cached-page/offline fallback; immutable same-origin assets use stale-while-revalidate.

**Tech Stack:** Node.js build script, Next.js, Service Worker API, Playwright.

**Spec:** `docs/superpowers/specs/2026-08-20-refrigerant-charge-recovery-design.md`

## Global Constraints

- Development calculators must never be precached.
- Do not return the homepage for missing scripts, images, or JSON.
- Service worker registration remains production-only.
- No Workbox or new dependency.

---

### Task 1: Generated Precache Manifest

**Files:**
- Create: `scripts/generate-service-worker.mjs`
- Modify: `package.json`
- Rewrite generated asset: `public/sw.js`
- Create: `public/offline.html`
- Test: `scripts/generate-service-worker.test.ts`

**Interfaces:**
- Produces: deterministic `public/sw.js` with published routes and cache version derived from route content.

- [ ] Write a failing Vitest test that runs the generator and asserts production routes exist while `refrigerant-charge-calculator` is excluded during development.
- [ ] Implement a dependency-free parser/generator that extracts registry entries and includes only `production`/`beta` routes plus hubs, manifest, icon, and offline page.
- [ ] Add `prebuild` and `predev` scripts invoking the generator.
- [ ] Implement network-first navigation handling, cache fallback, and offline page; implement stale-while-revalidate for same-origin assets.
- [ ] Run the focused generator test, `npm test`, and `npm run typecheck`; commit source and generated output.

### Task 2: Cold-Offline Verification

**Files:**
- Create: `tests/e2e/offline-pwa.spec.ts`
- Modify: `playwright.config.ts` only if a production-server project is required.

**Interfaces:**
- Verifies: fresh install precache, offline calculator navigation, offline fallback, and no development route precache.

- [ ] Write a production-only browser test that loads `/`, waits for service-worker activation, disables network, and opens representative published calculator routes that were not previously visited.
- [ ] Assert an unknown navigation renders `offline.html` and missing assets do not render the homepage.
- [ ] Run `npm run build`, serve the production build, and run only `tests/e2e/offline-pwa.spec.ts`.
- [ ] Commit after the fresh-install offline test passes.

