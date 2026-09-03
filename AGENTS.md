# HVACLogic Engineering & Testing Guidelines

## Agent Communication & Execution Rules
- **Direct Answers to Questions (NO UNREQUESTED ACTIONS)**: When the user asks an informational or diagnostic question (e.g., *"did we activate this option?"*, *"do we show X?"*, *"is Y working?"*), provide a direct, concise status report in plain text (e.g., *"Yes, X is enabled, but Y is not configured yet. Next steps would be..."*). **DO NOT** treat questions as implicit authorization to start coding, run scripts, compile code, generate files, or take automated actions. If an action is appropriate, propose it and ask for explicit confirmation first.
- **GitHub PR & Vercel Automated Deployment Lifecycle**:
  - **Scale Thresholds**:
    - **Small Tweaks (No PR required)**: Direct commits to `main` for simple text/copy corrections, minor CSS refinements, or small single-file bug fixes.
    - **Medium / Large Updates (MANDATORY PR)**: Create a dedicated feature branch (`feat/<topic>`, `refactor/<module>`, `docs/<topic>`) and open a GitHub Pull Request for multi-feature additions, new pages/routes, new calculators, major mathematical refactors, or schema architectures.
  - **Step 1: Pre-PR Verification Gate (MANDATORY)**:
    1. `npm test` (Vitest unit tests 100% passing).
    2. `npm run typecheck` (TypeScript zero compilation errors).
    3. E2E specs if creating/refactoring major calculator tools (`npx playwright test tests/e2e/<slug>.spec.ts`).
  - **Step 2: Push & IMMEDIATE Formal PR Creation (MANDATORY)**:
    - Push the branch to `origin`: `git push -u origin feat/<slug>`.
    - **IMMEDIATELY OPEN THE FORMAL GITHUB PR**: Never stop at pushing the raw branch. The agent must immediately create the formal Pull Request on GitHub via API/CLI so that it appears as **Open** in the GitHub Pull Requests tab with structured domain motivation, technical changes, and test verification.
  - **Step 3: PR Open Duration**:
    - Leave PRs open for a realistic review window (**2 to 24 hours**, depending on scale—never instant merge in minutes) to establish an authentic, human-paced research review timeline.
    - Vercel automatically deploys an isolated **Preview Deployment** linked to the PR.
  - **Step 4: Clean Merge & Branch Cleanup**:
    - Merge via GitHub PR merge (or fast-forward with immediate remote branch deletion `git push origin --delete feat/<slug>`).
    - **Outcome**: The PR is marked **Closed / Merged** in GitHub history, the temporary branch is deleted from GitHub and Vercel Active Branches, and Vercel automatically deploys `main` to **Production (`hvaclogic.org`)**.
- **Outreach Email Signature**: ALWAYS sign outreach and follow-up emails simply as **`Miad S.`** (never full last name).
- **No AI Watermarks / Em-Dashes**: NEVER use em-dashes (`—`) in outreach emails, copy, or templates. Use standard hyphens (`-`), commas, or periods.

---

## Mandatory Outreach Email Protocol (4-Pillar Scientific Curiosity Framework)

> [!IMPORTANT]
> **MANDATORY PRE-REQUISITE**: Before drafting ANY outreach or follow-up email, the agent MUST review and strictly enforce the following 4-pillar psychological blueprint. Any email using generic marketing, promotional buzzwords ("free", "best", "revolutionary"), or direct backlink requests is STRICTLY FORBIDDEN.

### The 4 Pillars of High-Response Peer Outreach:
1. **Pillar 1: Cognitive Dissonance / The Empirical Anomaly (The Read/Click Trigger)**:
   - **Never pitch features or promote the platform.**
   - Lead immediately with a stark, calculated numerical anomaly comparing a beloved trade rule-of-thumb against rigorous fundamental physics (e.g., 55% duct friction delta at 1,200 CFM; 2.2°F subcooling error on zeotropic A2L temperature glide; 1.7x pressure penalty under 15% longitudinal flex duct sag).
   - This creates an irresistible scientific *curiosity gap* that compels the researcher, professor, or technical director to investigate.
2. **Pillar 2: In-Group Technical Tribal Signal (Zero Marketing Vocabulary)**:
   - **Strictly Banned Words**: *"free", "revolutionary", "best", "promo", "check out our site", "all-in-one", "solution"*.
   - **Required Engineering Signals**: Use precise, peer-level mechanical terminology: $Re$, $\varepsilon$, Newton-Raphson iterations, Darcy-Weisbach, NIST REFPROP, Hyland-Wexler, Huebscher aspect ratios, AHRI 210/240.
   - Immediately establishes peer credibility in under 3 seconds.
3. **Pillar 3: 1-Click Proof-of-Work Verification (Pre-Hydrated URL as "Exhibit A")**:
   - **Never link to a generic homepage or landing page.**
   - Always link directly to the specific calculator with pre-hydrated URL search parameters reflecting the exact numerical anomaly discussed in the text (e.g. `https://hvaclogic.org/calculators/ductulator?cfm=1200&friction=0.08`).
   - The link functions strictly as undeniable mathematical evidence ("Exhibit A"), not a promotional CTA.
4. **Pillar 4: The Benjamin Franklin Authority Consultation**:
   - **Never ask for backlinks, shares, directory listings, or curriculum additions.**
   - Conclude with a targeted, open-ended question soliciting their specialized expert or pedagogical opinion on the observed anomaly.
   - Validates their professional authority and naturally provokes a substantive reply.

### Technical & Stylistic Constraints for All Emails:
- **Signature**: Always sign strictly as **`Miad S.`**
- **No Em-Dashes**: Never use em-dashes (`—`). Use standard hyphens (`-`), commas, or periods.
- **Length**: Strictly under 120 words (compact, dense peer-to-peer communication).

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
3. **DEV Community (`dev.to` — DA 82 / DR 82)**: For technical architecture, TypeScript mathematical physics engines, 100% client-side zero-database design, and developer syndication with dofollow contextual backlinking.
4. **Internet Archive (`archive.org` — DA 96)**: For permanent open monograph repository & preprint citations.


