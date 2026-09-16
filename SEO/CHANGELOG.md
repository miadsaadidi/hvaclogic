# HVACLogic SEO System Changelog

**Domain**: [https://hvaclogic.org/](https://hvaclogic.org/)  
**Document Version**: 2.2.0  
**Operational Status**: ACTIVE / HISTORICAL AUDIT TRAIL  

---

## Change Log Standard Format

For every systemic SEO modification, record:

```markdown
### [YYYY-MM-DD] — Change Summary Title
- **Type**: [Architecture / Keyword / Schema / Link Graph / Distribution / Technical]
- **Reason**: [Why this change was enacted]
- **URLs / Files Affected**: [`...`]
- **Expected Outcome**: [Quantifiable or architectural objective]
- **Actual Outcome / Validation**: [Observed result or test validation]
- **Follow-Up Date**: [YYYY-MM-DD]
```

---

## Historical Changelog Entries

### [2026-09-16] — Final HVACLogic SEO Gap-Closure Program & OS Transition (v3.0.0)
- **Type**: Full System Verification, Architectural Mesh Hardening, Guide Contextual Linking & Governance Finalization.
- **Reason**: Achieve verified Definition of Done across the entire HVACLogic SEO Operating System without creating arbitrary subsequent numbered phases. Reconcile all 11 persistent files in `/SEO/`, verify all 13 Tier 2 calculators, enrich all published and scheduled engineering guides with direct companion research monograph and benchmark dataset bridges, and transition the system into permanent evidence-driven operating mode.
- **URLs / Files Affected**:
  - `src/lib/data/guides-registry.ts` (Enriched all 5 published and 3 scheduled guides with `companionResearch` and `companionDatasets`)
  - `src/app/guides/page.tsx` (Rendered companion research and dataset badge links on guide cards)
  - `SEO/INTERNAL_LINK_MAP.md` (Documented BR-07 Guide Contextual Linking Bridge and 3.4 triangulation mesh)
  - `SEO/IMPLEMENTATION_ROADMAP.md` (Recorded verified completion of all phases and codified permanent evidence loop)
  - `SEO/DAILY_LOG.md` (Recorded final program completion)
  - `SEO/CHANGELOG.md` (Updated to v3.0.0)
- **Expected Outcome**: Deliver a fully verified, self-sustaining SEO operating system where every internal asset is interconnected and every external dependency is documented with strict truthfulness.
- **Actual Outcome / Validation**: 100% build pass across all 86 static routes (`next build`), 0 TypeScript errors (`tsc --noEmit`), and 100% Vitest unit tests pass (134 tests across 33 files).
- **Follow-Up Date**: Ongoing (Autonomous Evidence-Driven Operation).

---

### [2026-09-16] — Native Open Dataset Hub, Landing Pages & Structured Schema Integration (v2.7.0)
- **Type**: Information Architecture, Structured Data (Schema.org) & Open Science Infrastructure.
- **Reason**: Implement on-site HTML catalog hub (`/datasets`) and 6 dedicated dataset landing pages (`/datasets/[slug]`) rendering valid `schema.org/Dataset` JSON-LD, tabular preview matrices, variable dictionaries, DataCite DOIs, direct download paths (CSV/JSON), and bidirectional links connecting calculators, research papers, and datasets.
- **URLs / Files Affected**:
  - `src/lib/data/datasets.ts` (Created master registry for 6 canonical benchmark datasets)
  - `src/app/datasets/page.tsx` (Created `/datasets` catalog hub with `CollectionPage` & `ItemList` schema)
  - `src/app/datasets/[slug]/page.tsx` (Created dynamic `/datasets/[slug]` detail page with `schema.org/Dataset` JSON-LD)
  - `src/app/sitemap.ts` (Added `/datasets` and all 6 `/datasets/[slug]` routes to sitemap)
  - `src/app/research/page.tsx` (Linked dataset cards to on-site `/datasets/[slug]` routes)
  - `src/components/calculator/ResearchCitationCard.tsx` (Added on-site dataset link to companion calculator cards)
  - `src/lib/data/calculators-registry.ts` (Mapped `datasetSlug` and `datasetUrl` across all companion tools)
  - `src/types/calculation.ts` (Extended `CalculatorMeta` interface with `datasetSlug`)
  - `src/lib/seo/datasets-routes.test.ts` (Created test suite for dataset registry and physical file integrity)
  - `src/lib/seo/canonical-routes.test.ts` (Updated canonical sitemap test to assert 58 unique URLs)
  - `SEO/CONTENT_MAP.md` (Updated Section 5 Open Benchmark Datasets)
  - `SEO/INTERNAL_LINK_MAP.md` (Documented BR-04 Triangular Link Graph)
  - `SEO/DAILY_LOG.md` (Recorded Phase 5 execution)
  - `SEO/CHANGELOG.md` (Updated to v2.7.0)
- **Expected Outcome**: Allow search engines and academic crawlers to index HVACLogic's benchmark datasets directly on `hvaclogic.org` with rich `Dataset` structured data, while establishing a closed triangular internal link graph (`Calculator ↔ Research Paper ↔ Dataset Landing Page`).
- **Actual Outcome / Validation**: 100% build pass across all 86 static routes (`next build`), 0 TypeScript errors (`tsc --noEmit`), and 100% Vitest unit tests pass (134 tests across 33 files).
- **Follow-Up Date**: 2026-09-17 (Phase 6 Tier 2 Calculator Semantic & Worked Example Hardening Sprint).

---

### [2026-09-16] — Phase 4: Tier 1 Calculator SERP Extraction & Mathematical Benchmark Hardening (v2.6.0)
- **Reason**: Standardize semantic `<h2>` section headings, enrich mathematical formula derivations in `FormulaCard` components, construct realistic step-by-step worked numerical examples, and embed engineering reference matrices across the 8 highest-traffic Tier 1 calculators.
- **URLs / Files Affected**:
  - `src/app/calculators/pt-chart/page.tsx` (Added semantic h2 headings, dew/bubble point methodology, NIST formula annotations, and A2L worked example)
  - `src/app/calculators/heat-pump-size-calculator/page.tsx` (Standardized balance point equations, cold-climate derate table, and Chicago Zone 5 worked example)
  - `src/app/calculators/flex-duct-cfm-chart/page.tsx` (Enriched ASHRAE RP-1333 sag equations, CFM capacity matrix, and 8-inch bedroom worked example)
  - `src/app/calculators/cfm-calculator/page.tsx` (Standardized sensible heat / velocity formulas, tonnage matrix, and heat pump worked example)
  - `src/app/calculators/ac-model-decoder/page.tsx` (Standardized serial number decoding methodology, model matrix, and Goodman worked example)
  - `src/app/calculators/ductulator/page.tsx` (Reinforced contextual workflow links to CFM sizer, friction loss calculator, and flex duct chart)
  - `SEO/DAILY_LOG.md` (Recorded Phase 4 execution)
  - `SEO/CHANGELOG.md` (Updated to v2.6.0)
- **Expected Outcome**: Improve technical completeness, on-page utility, and clarity for practicing HVAC technicians, engineers, and educators across core calculation hubs.
- **Actual Outcome / Validation**: 100% build pass across all 79 static routes (`next build`), 0 TypeScript errors (`tsc --noEmit`), and 100% Vitest unit tests pass (128 tests across 32 files).
- **Follow-Up Date**: 2026-09-17 (Phase 5 Layer 1 & 2 Multi-Sector Authority & Distribution Cadence).

---

### [2026-09-16] — Embed System Hardening & Calculator Header Integration Sprint (v2.5.0)
- **Type**: Distribution Architecture & User Experience.
- **Reason**: Fix switch routing mismatches in `/embed/[slug]` for 5 calculators, connect missing `BtuCalculatorTool`, integrate an intuitive `EmbedTriggerButton` into the `CalculatorContainer` header for instant 1-click modal access, and document responsive widget embedding for developers, LMS portals, and technical publishers.
- **URLs / Files Affected**:
  - `src/app/embed/[slug]/page.tsx` (Aligned switch routing with all 21 canonical IDs in `calculatorRegistry` and legacy aliases)
  - `src/components/calculator/EmbedModal.tsx` (Corrected preview iframe source to canonical `embedUrl`)
  - `src/components/calculator/EmbedTriggerButton.tsx` (Created new client component for header modal triggering)
  - `src/components/calculator/CalculatorContainer.tsx` (Integrated `EmbedTriggerButton` into responsive header layout)
  - `src/app/developers/page.tsx` (Added Embeddable Widgets card and comprehensive documentation section)
  - `src/lib/seo/embed-routes.test.ts` (Created dedicated test suite verifying all 21 embed static params, noindex directives, and canonical URLs)
  - `SEO/INTERNAL_LINK_MAP.md` (Documented Section 4 Embed Widget Distribution & Governance)
  - `SEO/DAILY_LOG.md` (Recorded Phase 3 execution)
  - `SEO/CHANGELOG.md` (Updated to v2.5.0)
- **Expected Outcome**: Deliver 100% functional, responsive embed widgets across all 21 calculators with strict `noindex, nofollow` protection, canonical references to parent tools, transparent attribution, and zero artificial link schemes.
- **Actual Outcome / Validation**: 100% build pass across all 79 static routes (`next build`), 0 TypeScript errors (`tsc --noEmit`), and 100% Vitest unit tests pass (128 tests across 32 files).
- **Follow-Up Date**: 2026-09-17 (Phase 4 Content & Methodology Deepening Sprint).

---

### [2026-09-16] — Internal Link Graph & Engineering Workflow Bridges Sprint (v2.4.0)
- **Type**: Link Graph & User Experience Architecture.
- **Reason**: Bridge fragmented navigation between isolated climatic design databases, calculation engines, and backing research monographs/datasets, establishing genuine, verified engineering workflows across all 21 production calculators.
- **URLs / Files Affected**:
  - `src/types/calculation.ts` (Extended `CalculatorMeta` with `researchSlug`, `oerModuleUrl`, `datasetUrl`)
  - `src/lib/data/calculators-registry.ts` (Mapped genuine research monographs, OER simulation labs, and benchmark datasets across all 21 calculators)
  - `src/components/calculator/ResearchCitationCard.tsx` (New component rendering verified academic citations, live DOIs, and dataset download triggers)
  - `src/components/calculator/CalculatorContainer.tsx` (Integrated `ResearchCitationCard` into default layout)
  - `src/app/ashrae-climatic-data/page.tsx` (Added direct links to BTU, Heat Loss, and Heat Pump calculators)
  - `src/app/calculators/btu-calculator/page.tsx` (Linked to `/ashrae-climatic-data` and normalized related tools grid)
  - `src/app/calculators/superheat-subcooling-calculator/page.tsx` (Normalized related tools grid)
  - `src/app/calculators/ductulator/page.tsx` (Normalized related tools grid)
  - `src/app/calculators/ac-tonnage-calculator/page.tsx` (Normalized related tools grid)
  - `src/app/calculators/heat-loss-calculator/page.tsx` (Linked to `/ashrae-climatic-data`)
  - `src/app/calculators/heat-pump-size-calculator/page.tsx` (Linked to `/ashrae-climatic-data`)
  - `src/app/sources/page.tsx` (Added category pillar cards and `/research` links)
  - `SEO/INTERNAL_LINK_MAP.md` (Updated link matrix to v2.2.0 and tempered speculative language)
- **Expected Outcome**: Improve navigational clarity and discovery of scientific research monographs, open benchmark datasets, and interactive OER lab modules for practicing HVAC engineers, technicians, and students.
- **Actual Outcome / Validation**: 100% build pass across all 79 static routes (`next build`), 0 TypeScript errors (`tsc --noEmit`), and 100% Vitest unit tests pass (125 tests across 31 files).
- **Follow-Up Date**: 2026-09-17 (Phase 3 Content Enhancement Sprint).

---

### [2026-09-16] — Technical & Schema Governance Hardening Sprint (v2.3.0)
- **Type**: Schema & Technical SEO.
- **Reason**: Fix critical schema validation defects identified during the forensic audit, remove misleading phantom dataset schemas, inject site-wide Organization/WebSite schema, enrich research papers with live DOIs and media encoding metadata, and equip all 5 pillar category hubs with rich collection graph schemas.
- **URLs / Files Affected**:
  - `src/app/layout.tsx` (Injected Organization & WebSite JSON-LD, normalized branding)
  - `src/components/seo/SchemaJsonLd.tsx` (Fixed publisher name to HVACLogic, purged fake CSV Dataset node)
  - `src/app/research/[slug]/page.tsx` (Injected verified DOI identifier/sameAs and MediaObject encoding)
  - `src/app/cooling-loads/page.tsx` (Injected CollectionPage + Breadcrumbs + ItemList graph)
  - `src/app/airflow-ducts/page.tsx` (Injected CollectionPage + Breadcrumbs + ItemList graph)
  - `src/app/heating-systems/page.tsx` (Injected CollectionPage + Breadcrumbs + ItemList graph)
  - `src/app/standards/page.tsx` (Injected CollectionPage + Breadcrumbs + ItemList graph)
  - `src/app/sources/page.tsx` (Injected CollectionPage + Breadcrumbs + ItemList graph)
- **Expected Outcome**: Achieve 100% compliant Schema.org JSON-LD across the entire route tree, eliminate rich result warnings/errors, and accurately establish HVACLogic's entity identity in Google Search.
- **Actual Outcome / Validation**: Successfully compiled with zero TypeScript errors (`tsc --noEmit`) and passed all 125 Vitest unit tests.
- **Follow-Up Date**: 2026-09-17 (Phase 2 Internal Link Mesh Sprint).

---

### [2026-09-16] — Expansion of Multi-Sector External Authority Ecosystem (v2.2.0)
- **Type**: Authority & Outreach Governance.
- **Reason**: Rigorously research and qualify high-tier institutional pathways across 6 major sectors (Engineering Societies like IEEE/ASME, HVAC Authorities like ASHRAE/CIBSE, University Laboratories like Purdue/UIUC/MIT, High-Tier Industry Media like ACHR News/GBA, National Laboratories like NREL/LBNL/ORNL/NIST, and Education Organizations like ASEE/OER Commons).
- **URLs / Files Affected**:
  - `SEO/AUTHORITY_TARGETS.csv` (Expanded with 39 verified targets across A+, A, and B tiers with explicit relationship classifications)
  - `SEO/MASTER_STRATEGY.md` (Updated Section K with multi-sector architecture and workflow mapping)
  - `SEO/EXTERNAL_DISTRIBUTION.md` (Hardened 8-step asset-fit protocol)
- **Expected Outcome**: Transform generic backlink outreach into legitimate research publications, pre-prints, conference submissions, dataset references, and editorial guest articles.
- **Actual Outcome / Validation**: All targets verified with exact domains, submission pathways, relationship types, and specific HVACLogic companion assets.
- **Follow-Up Date**: 2026-09-17 (Phase 1 Technical & Schema Sprint).

---

### [2026-09-16] — Initialization of Canonical `/SEO/` Operating System (v2.0.0)
- **Type**: Architecture & System Governance.
- **Reason**: Consolidate fragmented legacy documentation (`docs/01-...` through `docs/16-...`, `docs/outreach/`) into a unified, evidence-based SEO Operating System rooted in the live Next.js App Router architecture.
- **URLs / Files Affected**:
  - `SEO/MASTER_STRATEGY.md` (New)
  - `SEO/CONTENT_MAP.md` (New)
  - `SEO/KEYWORDS.md` (New)
  - `SEO/INTERNAL_LINK_MAP.md` (New)
  - `SEO/SCHEMA_RULES.md` (New)
  - `SEO/EXTERNAL_DISTRIBUTION.md` (New)
  - `SEO/AUTHORITY_TARGETS.csv` (New)
  - `SEO/BACKLINK_LOG.csv` (New)
  - `SEO/IMPLEMENTATION_ROADMAP.md` (New)
  - `SEO/DAILY_LOG.md` (New)
  - `SEO/CHANGELOG.md` (New)
- **Expected Outcome**: Create a self-sustaining autonomous SEO decision engine with persistent memory, strict cannibalization safeguards, truthful JSON-LD schema governance, and clear 3-layer distribution protocols.
- **Actual Outcome / Validation**: All operating files created, internally synchronized against live routes, verified against the actual Next.js codebase, and validated with zero code alterations.
- **Follow-Up Date**: 2026-09-17.
