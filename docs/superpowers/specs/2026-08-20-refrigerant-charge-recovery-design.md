# Refrigerant Charge Calculator Recovery and Platform Hardening Design

**Date:** 2026-08-20  
**Status:** Approved direction; implementation pending  
**Scope:** Recover the interrupted refrigerant charge calculator, harden the shared embed/PWA/print features, and reconcile suite documentation.

## 1. Context

HVACLogic currently has 20 complete calculator modules. Three recently added modules—Duct Friction Loss/TEL, Combustion Air, and MERV Filter Sizing—have complete math, UI, visualizer, page, metadata, unit-test, and E2E layers.

The proposed 21st module, `refrigerant-charge-calculator`, was interrupted after adding:

- a partial competitor note;
- a production registry entry;
- a pure math module and three unit tests; and
- a reactive visualizer.

It has no interactive tool, dedicated page, OpenGraph image, or E2E test. Its visualizer also references properties missing from the math output, so the current working tree fails TypeScript verification. The registry nevertheless labels the calculator `production` and `validated`, causing the generic route to expose a specification placeholder as if it were a finished calculator.

The partial math uses universal charge-adder rates indexed only by refrigerant and liquid-line diameter. That model is not sufficiently defensible. Manufacturer instructions show that charge adjustments can vary by equipment combination, factory allowance, liquid line, suction line, and installation constraints. AHRI 540 governs compressor performance ratings and is not the authority for universal line-set charge adders.

## 2. Goals

1. Restore a clean, truthful repository state before feature completion.
2. Build a field-safe initial refrigerant weigh-in estimator driven by documented OEM profiles or an explicitly entered OEM rate.
3. Complete every layer required by `docs/NEW-CALCULATOR-CHECKLIST.md`.
4. Preserve the existing 20 working calculators and their behavior.
5. Make embed, offline, and print/submittal behavior match their public promises.
6. Reconcile all calculator counts, engineering documentation, sources, and validation records after launch.

## 3. Non-Goals

- The calculator will not diagnose final system charge from pressures or temperatures; that remains the responsibility of the Superheat & Subcooling tool.
- It will not claim that one rate applies universally to every system using the same refrigerant.
- It will not prescribe refrigerant or oil adjustments beyond selected OEM instructions.
- It will not replace manufacturer installation manuals, long-line guides, charge-limit calculations, or licensed field procedures.
- It will not introduce a server, database, account, or telemetry dependency. Computation remains client-side.
- It will not introduce a PDF-generation dependency. The submittal workflow will use browser Print / Save as PDF.

## 4. Recovery State and Release Gate

The first implementation change will make the registry truthful:

- `status: "development"`
- `testStatus: "partial"`

The calculator must remain excluded from published calculator lists, homepage cards, production sitemap entries, service-worker precache, and related-tool recommendations until all release gates pass.

The entry returns to `production` and `validated` only after:

- required source profiles are documented;
- math and boundary tests pass;
- the dedicated UI and seven-section page are complete;
- desktop and mobile E2E tests pass;
- TypeScript and production build pass; and
- documentation and published counts are reconciled.

## 5. Engineering Source and Data Model

### 5.1 Source policy

Phase 0 must document three to five current, primary manufacturer installation or long-line guides. Each supported profile records:

- manufacturer and equipment family;
- document title, revision, publication date, and official URL;
- refrigerant;
- permitted liquid and suction line combinations;
- factory-charged linear length;
- additional charge rule and units;
- minimum and maximum line length;
- vertical separation limits;
- any long-line accessories or oil-management instructions; and
- final charging procedure required by the manufacturer.

Secondary competitor pages can inform UX analysis but cannot supply numeric engineering rates.

### 5.2 Profile-driven calculation

The engine will use a discriminated calculation mode:

1. `oem_profile`: selects a verified, versioned manufacturer profile.
2. `custom_oem_rate`: lets a technician enter a rate taken from the equipment manual and identify the source/manual reference.

The calculation input will include:

- calculation mode;
- selected profile ID when applicable;
- refrigerant;
- liquid and suction line sizes required by the profile;
- actual linear line length;
- factory-charged length;
- nameplate factory charge;
- vertical separation; and
- custom rate/manual reference when using custom mode.

The calculation output will include:

- validated excess linear length;
- selected or entered adder rate;
- initial additional charge in raw ounces and formatted lb/oz;
- nameplate base charge in raw ounces and formatted lb/oz;
- initial target total charge;
- profile/source identity;
- limit warnings;
- final-charge verification instruction; and
- safety notices.

Intermediate values remain unrounded. Rounding occurs only at the display/export boundary.

### 5.3 Boundary behavior

- Invalid, non-finite, and negative inputs return structured validation errors; they are not silently coerced.
- A line shorter than the factory allowance does not automatically produce a refrigerant-removal instruction. The output says to follow the selected equipment manual.
- Inputs beyond an OEM profile's length, lift, or line-size limits produce a blocking out-of-profile result rather than extrapolation.
- Custom mode requires a positive rate and a non-empty manual reference.
- Long-line accessories and oil-management messages quote only the selected OEM profile's requirements. Otherwise, the tool instructs the user to consult the manufacturer.
- A2L outputs display handling and charge-limit cautions without pretending to perform an occupied-space charge-limit calculation.

## 6. Calculator Architecture

### 6.1 Math and tests

Refactor `src/lib/math/refrigerant-charge.ts` into a pure deterministic engine with exported input, output, profile, warning, and validation types. Store verified profiles in a focused data module if their size would obscure the calculation logic.

Unit tests will cover:

- one golden reference per supported OEM profile;
- custom-rate calculations;
- lb/oz formatting boundaries;
- exact factory-length behavior;
- shorter-than-factory behavior;
- unsupported line combinations;
- excessive length/lift;
- negative and non-finite inputs; and
- A2L warning propagation.

### 6.2 Interactive tool

Create `RefrigerantChargeTool.tsx` using existing calculator conventions:

- OEM Profile and Custom OEM Rate modes;
- realistic presets with Reset Defaults;
- dual range and number inputs for continuous variables;
- accessible labels, descriptions, status text, and 44px controls;
- imperial/metric display conversion without changing canonical internal units;
- URL hydration and synchronization;
- primary additional-charge result and secondary total/nameplate metrics;
- updated refrigerant line-set visualizer;
- CSV export with raw and formatted values plus source identity;
- `ActionButtonBar` for share, print, export, and embed;
- mobile sticky result bar; and
- downstream links to PT Chart and Superheat & Subcooling with safe prefilled context.

The primary callout will say "Initial weigh-in estimate" and the final instruction will require the selected manufacturer's final charging method.

### 6.3 Dedicated SEO page

Create the dedicated route and OpenGraph image. The page will use `CalculatorContainer` and include:

1. Direct answer and formula summary.
2. Interactive calculator.
3. Methodology explaining factory allowance, linear versus equivalent length, and final charge verification.
4. An OEM-profile reference matrix with document revisions.
5. A fully sourced worked example.
6. FAQ and A2L safety content.
7. Related diagnostic tools and engineering review metadata.

The page must avoid claiming that HVACLogic's profile overrides the equipment installation manual.

## 7. Shared Feature Hardening

### 7.1 Embed widget

The existing shared action bar already exposes the embed generator across all 20 functional tools. Completion work will:

- include the new calculator automatically;
- add `role="dialog"`, `aria-modal`, initial focus, Escape-to-close, and focus restoration;
- ensure the preview uses `?embed=true`;
- retain the responsive iframe and branded source backlink; and
- add focused component/browser coverage for generated URL, code copying, and embed-mode chrome removal.

### 7.2 Offline PWA

The current install cache contains the homepage and five hubs but not calculator routes. The hardened service worker will:

- precache every published calculator route and required application-shell assets;
- exclude development calculators;
- use explicit cache versioning and old-cache cleanup;
- distinguish navigation fallbacks from asset failures;
- provide a meaningful offline page rather than returning the homepage for every failed GET; and
- retain runtime stale-while-revalidate caching for eligible same-origin resources.

Acceptance requires a production build served locally, a fresh service-worker install, network disablement, and successful cold navigation to each published calculator without first opening those calculator routes online.

### 7.3 Contractor submittal

The existing modal captures company, technician, project/job, location, and notes. Completion work will:

- rename the action to "Print / Save as PDF";
- add accessible dialog keyboard behavior;
- print project metadata, calculator identity, governing standards, core calculation inputs/results, source/profile identity, and safety notes;
- hide site navigation, editable inputs, SEO sections, actions, and unrelated content;
- expand the result panel to the printable width;
- add `@page` size and margins; and
- describe the result as a compact print-ready submittal rather than guaranteeing one page for every browser/calculator combination.

## 8. Documentation Reconciliation

After the calculator passes its release gate, update:

- root `README.md` and `docs/README.md`;
- master calculator specifications;
- engineering formulas and numeric policy references;
- competitor analysis;
- engineering source register;
- validation and golden-reference matrix;
- roadmap and calculator totals;
- homepage calculator count and copy; and
- stale sitemap comments.

The published suite total becomes 21 only when the new calculator is genuinely production-ready. Until then, public counts remain 20.

## 9. Verification Strategy

Work will follow test-driven development for calculation and behavior changes.

Fast checks after each bounded slice:

```text
npm test
npm run typecheck
```

New-calculator browser verification:

```text
npx playwright test tests/e2e/refrigerant-charge.spec.ts
```

Focused tests will cover desktop and configured mobile projects. Shared embed, offline, and print behavior will receive targeted tests rather than triggering the full Playwright suite. Final release verification also runs:

```text
npm run build
git diff --check
```

No completion claim will be made unless the fresh command outputs are read and all required gates pass.

## 10. Implementation Sequence

1. Make registry state truthful and restore TypeScript correctness.
2. Complete primary-source research and update the technical specification/source register.
3. Replace the universal-rate engine with the versioned OEM/custom-rate model using TDD.
4. Complete the tool and visualizer.
5. Complete the dedicated page, metadata, structured content, and E2E spec.
6. Harden embed behavior.
7. Harden print/submittal behavior.
8. Harden offline precaching and fallback behavior.
9. Reconcile documentation and counts.
10. Run all scoped release gates and only then mark the calculator production/validated.

Each step should leave the repository in a truthful and independently verifiable state.
