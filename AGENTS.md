# HVACLogic Engineering & Operations Guidelines

## Universal Interaction Protocol (Mandatory across ALL Conversations & Domains)
- **Rule 1: Always Present Options First, Never Jump to Execution**:
  Whenever the user brings up a topic, asks a question, requests daily tasks, or provides an open-ended prompt (e.g., *"what should we do today"*, *"next guides"*, *"refactor calculator X"*, *"SEO status"*, *"fix performance"*):
  - **Action**: Provide a concise, numbered breakdown of proposed actions or options (1 to N) with brief context.
  - **Stop Condition**: Ask for explicit user direction (e.g., *"Which of these would you like to tackle: all, specific numbers (e.g., 1 & 3), or a different direction?"*).
  - **Strict Prohibition**: **DO NOT** generate full code, draft long copy, create/modify files, or start executing until the user reviews and confirms.
- **Rule 2: Execution Only on Explicit Command or Confirmation**:
  Drafting code, writing full articles/emails, refactoring files, or running implementation tasks is **strictly locked** until the user explicitly replies with confirmation (e.g., *"Do 1 and 3"*, *"Approved"*, *"Proceed"*, *"Write the code"*).
- **Rule 3: Direct Answers to Questions (NO UNREQUESTED ACTIONS)**:
  When the user asks an informational or status/diagnostic question (e.g., *"did we activate this option?"*, *"do we show X?"*, *"is Y working?"*), provide a direct, concise status report in plain text. **DO NOT** treat questions as implicit authorization to start coding, run scripts, compile code, generate files, or take automated actions. If an action is appropriate, propose it and ask for explicit confirmation first.
- **Rule 4: Zero Presumptive Over-Generation**:
  Never assume a broad prompt or topic keyword is a command to generate all possible outputs immediately. Always treat the first turn as a triage, discovery, and alignment step.
- **Rule 5: Strict 1-Email-At-A-Time & Ordered Presentation**:
  Whenever drafting or presenting outreach or follow-up emails, output **STRICTLY ONE EMAIL AT ONCE PER TURN** in this exact order: 1) Recipient Email, 2) Subject, 3) Body, with each in its own dedicated copyable code block. Follow [`docs/OUTREACH-PROTOCOL.md`](./docs/OUTREACH-PROTOCOL.md).
- **Rule 6: Outreach & Distribution Email Context**:
  In outreach discussions, "distribution" refers to peer outreach emails to new institutions/targets, not third-party web submissions or directories unless explicitly specified.
- **Rule 7: Mandatory Trigger for 'Dofollow links'**:
  Whenever the user asks *"Dofollow links"* or requests the high-authority dofollow checklist, immediately inspect and present the master action list from [`docs/HIGH-AUTHORITY-DOFOLLOW-CHECKLIST.md`](./docs/HIGH-AUTHORITY-DOFOLLOW-CHECKLIST.md) directly and concisely.
- **Rule 8: Mandatory Evidence-Driven Daily Decision Protocol (Plan Mode vs. Execution Mode)**:
  Whenever the user asks *"what should we do today"*, *"what is today's plan"*, *"what should we publish"*, *"what is next"*, *"check SEO"*, or *"what should we do this week"*:
  - **Prohibition in Plan Mode**: DO NOT immediately generate full article bodies, dataset contents, CSV files, metadata packages, outreach emails, publication copy, repository manifests, or large technical drafts.
  - **Plan Mode Structure (Concise Navigation Layer)**:
    When asked *"what should we do today"*, *"what is today's plan"*, *"what should we publish"*, *"what is next"*, *"check SEO"*, *"SEO plan this week"*, or *"SEO plan today"*:
    - The response must be a **concise navigation layer** scannable in under 30 seconds.
    - **Strict Prohibitions in Plan Mode**: No long explanations, no repeated strategy background, no detailed action-by-action mini-flows unless explicitly requested, no large tables, no implementation code, no external assets, and no automatic execution.
    - Output strictly 4 concise sections:
      1. `## CURRENT STATE` (3–5 short bullets: completed objective, measurement status, next candidate, key baseline evidence, active objective status).
      2. `## PLAN` (Maximum 5–6 short numbered steps).
      3. `## ACTIVE OBJECTIVE` (One line: `ACTIVE OBJECTIVE: <Objective> — awaiting execution approval.` or `ACTIVE OBJECTIVE: NONE — awaiting approval.`).
      4. `## APPROVAL` (One short line: `Reply "Approved" to execute.`).
    - **STOP** for explicit user approval before executing any code, copy, or files.
  - **Execution Mode (Post-Approval)**:
    - Upon explicit user approval of the plan, switch to **EXECUTION MODE**.
    - Present the actual implementation material in sequential order (Step 1 first, then Step 2, etc.), never dumping all steps at once unless requested.
  - **Search-Volume & Claim Language Invariants**:
    - Never use "high-volume" without verified third-party volume proof; use *"verified query demand"* or *"observed search queries"*.
    - Classify telemetry and expectations strictly under **VERIFIED / PROBABLE / HYPOTHESIS** without guaranteed ranking or CTR claims.
    - Clearly specify reporting windows for GSC baselines (never merge different snapshot windows into one).
  - **The Permanent Understanding Rule**: The user must always understand **WHAT → WHY → WHERE → IN WHAT ORDER → WHAT "DONE" MEANS** before receiving large amounts of implementation material.
  - **Link Status & Telemetry Invariants**:
    - Never predefine external links as dofollow; classify only as `VERIFIED DOFOLLOW`, `NOFOLLOW`, or `UNKNOWN` after live HTML inspection.
    - In measurement, never assume speculative crawl, indexing, or ranking gains; report only observable evidence.
    - Maintain strict 1-to-1 parity between on-site implementation reality and external publication claims.
- **Rule 9: Core-to-Spoke Hub Architecture & Google-Ranking-First Principle**:
  `hvaclogic.org` is the immutable core hub. HVACLogic's own pages (calculators, topic hubs, guides, research papers, datasets) are the primary SEO assets. All external distributions (articles, preprints, datasets, directory profiles, and outreach) are spokes that support the core site. The primary SEO objective is increasing HVACLogic's Google rankings and organic search visibility for high-value HVAC engineering search intents. Use cross-domain canonical tags for substantially identical/syndicated content where supported, and natural contextual links for original/adapted editorial content. Never assume a platform honors canonical tags without live HTML inspection. External publishing remains a supporting distribution strategy, not the primary SEO objective.

---

## Operations & Deployment Rules

- **GitHub PR & Vercel Automated Deployment Lifecycle**:
  - **Small Tweaks**: Direct commits to `main` for simple text corrections, minor CSS refinements, or small single-file bug fixes.
  - **Medium / Large Updates (MANDATORY PR)**: Create a feature branch (`feat/<slug>`, `refactor/<slug>`), run pre-PR checks (`npm test` & `npm run typecheck`), push, and **immediately open a formal GitHub PR**.
  - **Online Merge & Cleanup**: Merge online via GitHub API / Web (never force-push local merges). Verify Vercel production deployment reaches `READY` on `hvaclogic.org`, purge stale preview deployments via Vercel API, and pull `main` locally.
- **Outreach Email Signature**: ALWAYS sign outreach and follow-up emails simply as **`Miad S.`** (never full last name).
- **No AI Watermarks / Em-Dashes**: NEVER use em-dashes (`—`) in outreach emails, copy, or templates. Use standard hyphens (`-`), commas, or periods.
- **Separate Copyable Blocks for Metadata**: Whenever providing metadata, tags, titles, descriptions, or form fields for publishing (e.g. Medium, Dev.to, Academia.edu, ORCID, BibSonomy), ALWAYS output **each individual field in its own separate, dedicated code block** for instant 1-click copying.
- **Verified Live DOI Gating for Academic Profiles (ORCID / CV / Scholar)**:
  Output **STRICTLY VERIFIED LIVE, RESOLVABLE DOIs** from [`docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md`](./docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md). Never output pending or unverified DOIs.
- **Mandatory Master Inventory & Backlog Inspection**: When asked for SEO status or next action, inspect `SEO/WEEKLY_PLAN.md`, `SEO/MASTER_STRATEGY.md`, `SEO/EXTERNAL_DISTRIBUTION.md`, and `SEO/BACKLINK_LOG.csv`.
- **Strict Anti-Duplication Pre-Check Protocol (MANDATORY)**:
  Before proposing, drafting, or generating ANY publication, article, lab module, dataset, or post for ANY platform (Medium, DEV.to, Hashnode, Academia.edu, Figshare, Hugging Face, OER Commons, MERLOT, SSRN, BibSonomy, X, etc.), you MUST inspect [`docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md`](./docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md) and [`SEO/BACKLINK_LOG.csv`](./SEO/BACKLINK_LOG.csv). **NEVER suggest or draft a publication topic/asset that is already published on that platform.**
- **Asset-Fit External Publishing (No Fixed Quotas or Rigid Sequences)**:
  Publishing and outreach occur strictly through the 5 asset-class flows (Research $\rightarrow$ Preprint/DOI, Dataset $\rightarrow$ Data Repository/DOI, Engineering Editorial $\rightarrow$ Trade Media, Developer Article $\rightarrow$ Tech Platform, Educational Resource $\rightarrow$ OER Platform). All fixed daily quotas, bookmarks, and rigid platform sequences are retired.

---

## Testing & Quality Rules

- **Unit & Type Verification**: Always run `npm test` (Vitest) and `npm run typecheck` (`tsc --noEmit`) before PRs or after code edits.
- **Scoped E2E Tests**: Only run `npx playwright test tests/e2e/<spec-name>.spec.ts` when creating new calculator modules or major core math refactors.
- **Design System**: Use `Titillium Web` typography, PowerLab card aesthetics with 4px colored accent top borders, live reactive SVG visualizers, and 100% client-side computation with zero database tracking.
- **New Calculator Checklist**: Follow [`docs/NEW-CALCULATOR-CHECKLIST.md`](./docs/NEW-CALCULATOR-CHECKLIST.md).
