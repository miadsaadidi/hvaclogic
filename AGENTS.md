# HVACLogic Engineering & Testing Guidelines

## Universal Interaction Protocol (Mandatory across ALL Conversations & Domains)
- **Rule 1: Always Present Options First, Never Jump to Execution**:
  Whenever the user brings up a topic, asks a question, requests daily tasks, or provides an open-ended prompt (e.g., *"what should we do today"*, *"next guides"*, *"refactor calculator X"*, *"SEO status"*, *"fix performance"*):
  - **Action**: Provide a concise, numbered breakdown of proposed actions or options (1 to N) with brief context.
  - **Stop Condition**: Ask for explicit user direction (e.g., *"Which of these would you like to tackle: all, specific numbers (e.g., 1 & 3), or a different direction?"*).
  - **Strict Prohibition**: **DO NOT** generate full code, draft long copy, create/modify files, or start executing until the user reviews and confirms.
- **Rule 2: Execution Only on Explicit Command or Confirmation**:
  Drafting code, writing full articles/emails, refactoring files, or running implementation tasks is **strictly locked** until the user explicitly replies with confirmation (e.g., *"Do 1 and 3"*, *"Approved"*, *"Proceed"*, *"Write the code"*).
- **Rule 3: Direct Answers to Questions (NO UNREQUESTED ACTIONS)**:
  When the user asks an informational or status/diagnostic question (e.g., *"did we activate this option?"*, *"do we show X?"*, *"is Y working?"*), provide a direct, concise status report in plain text (e.g., *"Yes, X is enabled, but Y is not configured yet. Next steps would be..."*). **DO NOT** treat questions as implicit authorization to start coding, run scripts, compile code, generate files, or take automated actions. If an action is appropriate, propose it and ask for explicit confirmation first.
- **Rule 4: Zero Presumptive Over-Generation**:
  Never assume a broad prompt or topic keyword is a command to generate all possible outputs immediately. Always treat the first turn as a triage, discovery, and alignment step.
- **Rule 5: Strict 1-Email-At-A-Time & Ordered Presentation (NEVER BUNDLE EMAILS)**:
  Whenever drafting or presenting outreach or follow-up emails:
  - Output **STRICTLY ONE EMAIL AT ONCE PER TURN**. Never output multiple emails together.
  - **MANDATORY PRESENTATION ORDER**: Always output the fields in this exact order:
    1. **Recipient Email** (in its own copyable code block)
    2. **Subject** (in its own copyable code block)
    3. **Body** (in its own copyable code block)
  - **Stop Condition**: Present exactly 1 email following this sequence, then STOP and wait for user review/approval before proceeding to the next email.
- **Rule 6: Outreach & Distribution Email Context**:
  In outreach discussions, "distribution" refers to peer outreach emails to new institutions/targets, not third-party web submissions or directories unless explicitly specified.
- **Rule 7: Mandatory Trigger for 'Dofollow links'**:
  Whenever the user asks *"Dofollow links"* or requests the high-authority dofollow checklist, immediately inspect and present the master action list from [`docs/HIGH-AUTHORITY-DOFOLLOW-CHECKLIST.md`](./docs/HIGH-AUTHORITY-DOFOLLOW-CHECKLIST.md) directly and concisely.

## Engineering, Publishing & Operations Rules
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
  - **Step 4: Clean Online Merge, Vercel Webhook & Preview Cleanup**:
    - **Merge Online via GitHub API / Web (MANDATORY)**: NEVER merge feature branches locally and force-push. Always trigger the merge directly on GitHub (`PUT /repos/.../pulls/{number}/merge` or the GitHub PR web interface) so that GitHub dispatches the formal `pull_request.closed` and production `push` webhooks directly to Vercel.
    - **Verify Vercel Webhook & Production Build**: Immediately verify via Vercel API that Vercel registered the production deployment for `main` and monitors it until reaching `READY` on `hvaclogic.org`.
    - **Purge Stale Preview Deployments via Vercel API**: Immediately query Vercel deployments for `feat/<slug>` and delete all associated preview deployments via `DELETE /v13/deployments/{id}` so that stale branch cards never remain pinned on the Vercel project dashboard.
    - **Local Sync & Branch Deletion**: Switch local checkout back to `main`, run `git pull origin main`, delete the local feature branch (`git branch -d feat/<slug>`), and confirm remote deletion (`git push origin --delete feat/<slug>` if not already deleted by GitHub).
- **Outreach Email Signature**: ALWAYS sign outreach and follow-up emails simply as **`Miad S.`** (never full last name).
- **No AI Watermarks / Em-Dashes**: NEVER use em-dashes (`—`) in outreach emails, copy, or templates. Use standard hyphens (`-`), commas, or periods.
- **Separate Copyable Blocks for Metadata**: Whenever providing metadata, tags, titles, descriptions, or form fields for publishing (e.g. Medium, Dev.to, Academia.edu), ALWAYS output **each individual field in its own separate, dedicated code block** for instant 1-click copying. NEVER group multiple fields into a single shared block.
- **Strategic Discussion & Brainstorming First (NO PREMATURE METADATA DUMPS)**: When the user brings up a new platform, idea, or distribution channel, ALWAYS start by exploring and analyzing the platform, discussing strategic angles, and brainstorming options together. NEVER jump directly to generating final publishing metadata blocks or copyable forms until the user explicitly agrees on the strategy and requests publishing details.
- **Mandatory Master Calendar & Multi-File Inspection for Daily SEO Operations**: When asked "what do we have in SEO plan today?", "what is today's SEO plan?", "what's next in SEO?", or for any operational schedule/status:
  - **NEVER** answer from memory or provide an unverified/partial list.
  - **MANDATORY CALENDAR & FILE INSPECTION**: The agent MUST explicitly inspect the master calendar and tracker files:
    1. [`docs/16-master-authority-and-syndication-calendar.md`](./docs/16-master-authority-and-syndication-calendar.md) (Master synchronized 2-day & weekly schedule, Sept 7 to Oct 1)
    2. [`docs/14-seo-progress-tracker.md`](./docs/14-seo-progress-tracker.md) (Daily on-page checklist, outreach CRM, GSC scorecard)
    3. [`docs/15-medium-publishing-and-interlinking-tracker.md`](./docs/15-medium-publishing-and-interlinking-tracker.md) & [`docs/MEDIUM-EDITORIAL-GUIDELINES.md`](./docs/MEDIUM-EDITORIAL-GUIDELINES.md) (Medium 15-article calendar & 9-step publishing flow)
    4. [`docs/DEV-TO-EDITORIAL-GUIDELINES.md`](./docs/DEV-TO-EDITORIAL-GUIDELINES.md) & [`docs/HASHNODE-EDITORIAL-GUIDELINES.md`](./docs/HASHNODE-EDITORIAL-GUIDELINES.md) (DEV.to 5-zone delivery & Hashnode 10-step sequence)
    5. [`docs/ACADEMIA-EDU-PUBLISHING-TEMPLATE.md`](./docs/ACADEMIA-EDU-PUBLISHING-TEMPLATE.md) (Academia.edu alternating whitepaper/courseware schedule & 10-step flow)
    6. [`docs/FIGSHARE-PUBLISHING-GUIDELINES.md`](./docs/FIGSHARE-PUBLISHING-GUIDELINES.md) (Figshare 9-step benchmark dataset protocol)
    7. [`docs/INTERNET-ARCHIVE-PUBLISHING-GUIDELINES.md`](./docs/INTERNET-ARCHIVE-PUBLISHING-GUIDELINES.md) (Archive.org 3-section monograph upload flow)
    8. [`docs/13-30-day-seo-authority-plan.md`](./docs/13-30-day-seo-authority-plan.md) (30-day SEO authority blueprint)
    9. [`docs/OER-COMMONS-EDITORIAL-GUIDELINES.md`](./docs/OER-COMMONS-EDITORIAL-GUIDELINES.md) (OER Commons Open Author 5-zone delivery & WYSIWYG HTML helper protocol)
  - **Operational Rule for "What do we have in SEO plan today?"**: Immediately check the current local date against `docs/16-master-authority-and-syndication-calendar.md` and cross-reference `docs/14-seo-progress-tracker.md`. Return a concise, direct bulleted list reporting:
    - **Active publication slots for today**: Medium (DA 96), Dev.to (DA 91) & Hashnode (DA 84), Academia.edu (DA 93) & Figshare (DA 91), Internet Archive (DA 99), OER Commons/Educational Hubs (DA 76+), and Harvard Dataverse (DA 93) & SSRN (DA 92) on Thursdays.
    - **Due outreach follow-ups for today**: Check Sent Dates in the Outreach CRM table and list all contacts due for their 7-day follow-up (`Sent Date + 7 Days`).
  - **Strict 7-Day Outreach Follow-Up Protocol**: Direct email outreach batches operate under a strict 7-day follow-up rule: send exactly 1 polite, value-added follow-up 7 days after the initial email (`Sent Date + 7 Days`), then stop permanently. Zero secondary follow-ups. If no reply, close ticket.
  - **Dynamic Topics & Titles**: Exact publication titles, subjects, and datasets are decided on the day of publication according to active technical priorities (never hardcode fixed content prematurely).

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
- **Delivery Cadence**: Strictly ONE email at a time per turn. Never bundle multiple emails together.
- **Mandatory Field Sequence**: Always present each email in this exact order: 1) Recipient Email, 2) Subject, 3) Body, with each in its own dedicated copyable code block.

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
4. **wikiHow (`wikihow.com`)**: Strictly banned due to consumer DIY mismatch and nofollow policy.
5. **SkillsCommons (`skillscommons.org`)**: Strictly banned due to locked contributor onboarding forms and closed direct submission intake.
6. **Authorea (`authorea.com`)**: Direct standalone submissions are temporarily disabled by Wiley (accessible only via participating Wiley journal submissions opting in to "Under Review").

### ✅ APPROVED DISTRIBUTION & ACADEMIC REPOSITORIES ONLY:
1. **DEV Community (`dev.to` — DA 82 / DR 82)**: Deliver in strict 5 Single-Zone delivery format (Title, max 4 Tags, 1-sentence Description, 16:9 Image Prompt in `public/images/`, and Full Body in single 4-backtick ````markdown block with YAML frontmatter containing explicit `canonical_url`). **CRITICAL MATH RULE**: NO raw LaTeX (`$$...$$` or `\text{}`); use native Unicode (`Δ`, `±`, `×`, `°C`, `²`) or monospaced blocks. Focus on typed TypeScript calculation engines and Vitest unit tests. Contextual inline links only. Follow [`docs/DEV-TO-EDITORIAL-GUIDELINES.md`](./docs/DEV-TO-EDITORIAL-GUIDELINES.md).
2. **Hashnode (`hashnode.dev` — DA 84 / DR 84)**: Deliver strictly in the 10-step Hashnode UI sequence (Attribution & Series, Title, Subtitle, Cover Image in `public/images/`, Body in single 4-backtick block with KaTeX math and 2–3 contextual backlinks, Topics/Tags each in its OWN standalone copyable code block, Slug, Canonical URL, SEO Title ≤ 60 chars / Desc ≤ 150 chars, and Bot Review Appeal Snippet). Zero marketing clichés, NO em dashes (`—`). Follow [`docs/HASHNODE-EDITORIAL-GUIDELINES.md`](./docs/HASHNODE-EDITORIAL-GUIDELINES.md).
3. **Medium (`medium.com` — DA 96)**: Deliver strictly in the 9-step Medium publishing flow (Title, Subtitle, Cover Image in `public/images/`, Alt Text, Full Body in single 4-backtick block with clean Unicode math, 5 comma-separated Tags, SEO Title ≤ 60 chars / Desc 140–155 chars, Custom Story Link slug, and Canonical URL). **Mandatory 3-Tier Link Budget**: Tier 1 (1–2 internal calculator/guide links), Tier 2 (1–3 authoritative external standards: ASHRAE, DOE, AHRI, IEEE, NEMA, NEC, NREL), Tier 3 (0–1 sister Medium article link). Zero marketing clichés, NO em dashes (`—`). Follow [`docs/MEDIUM-EDITORIAL-GUIDELINES.md`](./docs/MEDIUM-EDITORIAL-GUIDELINES.md).
4. **Academia.edu (`academia.edu` — DA 93)**: Alternate every 2 days between Technical Whitepapers (`Preprint / Working Paper`) and Student Lab Manuals / Problem Sets (`Teaching Documents / Course Material`). Final sentence of every abstract MUST contain the permanent canonical tool URL. Deliver strictly in 10-step upload sequence (Files, Title, Abstract, Publication, Year 2026, DOI, Authors, Tags, Section, and Post-Upload "Text to Post" Modal announcement block without em dashes). Follow [`docs/ACADEMIA-EDU-PUBLISHING-TEMPLATE.md`](./docs/ACADEMIA-EDU-PUBLISHING-TEMPLATE.md).
5. **Figshare (`figshare.com` — DA 91)**: **STRICT NON-NEGOTIABLE RULE: BENCHMARK DATASETS ONLY** (`.csv`, `.tsv`, `.json` to mint DataCite DOIs). Never upload papers or PDFs to Figshare. Deliver in 9-step upload sequence (Files, Title `Benchmark Matrix: ...`, Authors, Categories, Item Type strictly `Dataset`, Keywords, Description with field-by-field schema dictionary, Structured References with ID/URL, Title, Type: URL, and CC BY 4.0 License). Follow [`docs/FIGSHARE-PUBLISHING-GUIDELINES.md`](./docs/FIGSHARE-PUBLISHING-GUIDELINES.md).
6. **Internet Archive (`archive.org` — DA 96)**: Permanent open monograph repository & benchmark archive sets. Structure upload packages matching the 3 Archive.org UI sections: Section 1 Required (Title `[Report ID] - [Title]`, custom URL slug `hvaclogic-[slug]`, plain text Description with bare URLs and NO raw HTML `<p>`/`<a>`, Subject Tags, Collection `Community texts`), Section 2 Recommended (Creator, Date, English, CC BY 4.0), and Section 3 Additional Metadata key-value table (`url`, `identifier-access`, `relation`, `source`, `publisher`, `sponsor`, `series`, `volume`). Follow [`docs/INTERNET-ARCHIVE-PUBLISHING-GUIDELINES.md`](./docs/INTERNET-ARCHIVE-PUBLISHING-GUIDELINES.md).
7. **OER Commons (`oercommons.org` — DA 84 / DR 84)**: Strictly author modules natively via **Open Author** (`oercommons.org/authoring`) as **"Activity/Lab"** & **"Simulation"** under *College / Upper Division* and *Career / Technical Education (CTE)* (CC BY-NC-SA 4.0). Never submit via raw external link (`/courses/add`). Mandatory 6-section pedagogical structure, Section 1 Dual-Attachment architecture (Resource 1: Pre-hydrated Simulation Workbench URL; Resource 2: Printable Lab Manual PDF), local styled HTML helper file (`public/oer-modules/<slug>.html`) for 100% WYSIWYG rich-text paste fidelity, and strict 5-zone delivery format. Follow [`docs/OER-COMMONS-EDITORIAL-GUIDELINES.md`](./docs/OER-COMMONS-EDITORIAL-GUIDELINES.md).
8. **Harvard Dataverse (`dataverse.harvard.edu` — DA 93)**: For weekly open benchmark dataset deposits minting permanent DataCite DOIs ([Dataverse DOI 10.7910/DVN/SR1NZO](https://doi.org/10.7910/DVN/SR1NZO)).
9. **SSRN (`ssrn.com` / Elsevier)**: For empirical observational studies only (Note: SSRN editorial guidelines explicitly exclude software frameworks and computational models). Follow [`docs/SSRN-PUBLISHING-GUIDELINES.md`](./docs/SSRN-PUBLISHING-GUIDELINES.md).
10. **engrXiv (`engrxiv.org` — DA 91 / DR 89)**: Open Engineering Archive for mechanical engineering, thermodynamics, and building science preprints minting permanent Crossref DOIs (`10.31224/...`). Currently in Production ([Submission #8215](https://engrxiv.org/preprint/view/8215)). Follow [`docs/ENGRXIV-PUBLISHING-GUIDELINES.md`](./docs/ENGRXIV-PUBLISHING-GUIDELINES.md).



