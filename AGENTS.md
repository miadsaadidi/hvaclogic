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
- **Rule 8: Mandatory Research-Driven & Evidence-Driven SEO Production Protocol**:
  Whenever the user asks *"what should we do today"*, *"what is today's plan"*, *"what should we publish"*, *"what is next"*, *"check SEO"*, or *"what should we do this week"*:
  - **The Operating Loop**:
    $$\text{DAY 1: FULL INTELLIGENCE \& OPPORTUNITY MAPPING} \longrightarrow \text{PRIORITIZE} \longrightarrow \text{STOP (APPROVAL)} \longrightarrow \text{DAYS 2–6: CORE + EXISTING EXECUTION} \longrightarrow \text{DAY 7: VALIDATE \& MEASURE} \longrightarrow \text{RE-DIAGNOSE}$$
  - **The North Star Criterion**:
    Every proposed objective, candidate asset, and execution decision must be justified by:
    > *"What evidence shows that this change can improve Google's understanding, coverage, relevance, discoverability, or usefulness of the site's search assets?"*
  - **Core Operating Containers**:
    - **Objective = unit of SEO work**: Sized around a single coherent search outcome (`ONE ACTIVE OBJECTIVE = ONE COHERENT SEO OUTCOME`).
    - **Session/Day = execution container**: Multiple independent, coherent objectives may be executed sequentially in the same session or day. Small code/content fixes execute immediately; large clusters or core publications may span multiple sessions.
    - **Week = planning, execution, validation, and measurement window**: There is no artificial limit of one objective per week, and no requirement to spend a full week passively monitoring before executing another objective. Telemetry measurement and continuous research continue in parallel with execution.
  - **Day 1: Full SEO Intelligence & Opportunity Mapping**:
    Day 1 synthesizes three integrated intelligence streams into a single evidence baseline:
    1. *Owned-Site Evidence*: GSC queries, pages, impressions, clicks, CTR, position, movement, emerging queries, high-imp/low-CTR opportunities, striking-distance rankings (8–40), calculators/tools/guides/research, internal linking, indexation, and technical issues.
    2. *SERP Evidence*: Ranking pages, SERP formats, competing tools/calculators, missing tables/datasets/calculators/references, weak/fragmented search results, search-intent gaps, terminology/query variants.
    3. *External Research / Authority Radar*: Continuous inspection of high-authority technical sources, research institutions, national labs, standards organizations, and open scientific repositories (**ASHRAE, ACCA, DOE, NREL, PNNL, LBNL, ORNL, NIST, EIA, Figshare, Zenodo, Hugging Face**). Goal: discover new search topics, datasets, engineering questions, research gaps, calculation reference opportunities, and tool expansions (NOT to copy external content).
  - **Day 1 Output: The Weekly Opportunity Map**:
    Day 1 produces an evidence-backed Opportunity Map categorized across:
    - *Category A: Existing Asset Optimization* (Pages/calculators with existing search visibility to expand).
    - *Category B: Cluster Upgrade* (Interconnected existing pages addressing the same search problem).
    - *Category C: Technical / Architecture Fixes* (Evidence-backed SEO, schema, canonical, crawl issues).
    - *Category D: Core Publication Candidates* (Datasets, whitepapers, engineering research monographs, technical references, major guides, calculator-backed research).
    - *Category E: Layer 1 Candidates* (Narrower supporting search intents that branch from and strengthen a Core asset).
    - *Category F: External Technical Distribution* (Dev.to / Hashnode technical articles translating HVACLogic engineering methodologies and dataset research for developer/engineering audiences).
    - *Specification*: Every candidate must define: Evidence, Target Search Problem, Asset Type, Relationship to Existing Assets, Expected SEO/Search-Value Hypothesis, and Implementation Scope.
  - **Core Assets as a Primary SEO Production Pillar**:
    Content production is defined as **Persistent Search-Asset Creation & Research Mining** (never generic "blog publishing"). Core assets must be substantial, original, useful, and technically defensible. An operational planning guideline of 3–5 Core opportunities per week may guide scoping, but is **NOT a mandatory production quota**. If evidence justifies 5, produce 5; if 2, produce 2; never manufacture content without evidence.
  - **Core → Layer 1 Search Architecture**:
    $$\mathbf{CORE\ ASSET} \Longrightarrow \mathbf{LAYER\ 1\ SUPPORTING\ ASSETS} \Longrightarrow \mathbf{INTERACTIVE\ CALCULATORS\ \&\ DATASETS} \Longrightarrow \mathbf{INTERNAL\ LINKS}$$
    Layer 1 assets exist strictly because they satisfy distinct, verifiable search intents, never to fulfill an arbitrary volume quota.
  - **Continuous Research Radar (Days 2–7)**:
    Research is continuous throughout the week. While executing existing-page upgrades or Core publications on Days 2–6, the Research Radar monitors fresh GSC queries, SERP gaps, lab datasets, and engineering questions, adding new opportunities to the backlog immediately.
  - **Weekly Execution Rhythm**:
    1. *DAY 1 — SEO Intelligence + Opportunity Mapping* (Full GSC + GA4 + SERP + Technical + Research Radar diagnostic and Opportunity Map synthesis).
    2. *DAY 2 — Core Production + Existing Asset Execution* (Launch highest-priority Core assets; execute quick-wins and existing page improvements immediately where justified).
    3. *DAYS 3–6 — Core + Layer 1 + Cluster + Existing Asset Execution* (Sequential execution of Core publications, Layer 1 supporting assets, calculator enhancements, cluster upgrades, internal link bridging, technical fixes, and external technical distribution).
    4. *DAY 7 — Validation + Measurement + Opportunity Harvesting* (Automated test suites, typechecks, builds, schema/canonical validation, live header checks, baseline logging; harvest new evidence to feed the next Day 1).
  - **6-Tier Priority Framework** (Priority guide, not a mandatory linear sequence; evidence can justify jumping directly to any tier):
    1. Existing page with clear GSC opportunity
    2. Existing cluster with multiple related opportunities
    3. Evidence-backed technical issue
    4. Genuine search/content gap
    5. Core Publication
    6. Layer 1 supporting publication
  - **Existing-Asset-First Content Rule**:
    - If an existing page can satisfy the search intent $\rightarrow$ improve it.
    - If several existing pages share the search problem $\rightarrow$ perform a cluster upgrade.
    - If the existing site cannot satisfy a distinct search intent $\rightarrow$ create a new publication (`CORE` or `LAYER 1 / CLUSTER PUBLICATION`).
  - **Objective Sizing & Single Active Objective Governance**:
    - **Core Rule**: `ONE ACTIVE OBJECTIVE = ONE COHERENT SEO OUTCOME` (not artificially restricted to one URL).
    - It may cover one page, several related pages, a topic cluster, a new core publication, or a systemic technical issue.
    - **6 Objective Classes**: `SINGLE ASSET`, `CLUSTER UPGRADE`, `CORE PUBLICATION`, `CLUSTER PUBLICATION`, `SYSTEMIC TECHNICAL REMEDIATION`, `DIAGNOSTIC / MEASUREMENT`.
    - **5 Sizing Coherence Rules**: Search problem coherence, implementation-pattern coherence, validation coherence, measurement coherence, and execution controllability.
    - **Anti-Distortion Rule**: Never artificially shrink a coherent cluster objective to one URL merely to satisfy the one-objective rule; never combine unrelated tasks to increase scope.
    - **Pre-Execution Fields**: Every objective proposed for execution must specify: Objective Class, Scope/Affected URLs, Search Problem, Evidence, Expected Outcome, Validation Method, and Measurement Method.
  - **Plan Mode vs. Execution Mode Boundary**:
    - **Plan Mode Structure (Concise Navigation Layer)**:
      When asked for daily/weekly plans or next steps, provide a concise navigation layer scannable in under 30 seconds with strictly 4 sections:
      1. `## CURRENT STATE` (3–5 short bullets: completed objective, measurement status, next candidate, key baseline evidence, active objective status).
      2. `## PLAN` (Maximum 5–6 short numbered steps).
      3. `## ACTIVE OBJECTIVE` (One line: `ACTIVE OBJECTIVE: <Objective> — awaiting execution approval.` or `ACTIVE OBJECTIVE: NONE — awaiting approval.`).
      4. `## APPROVAL` (One short line: `Reply "Approved" to execute.` or `NEXT STEP: Await fresh GSC evidence or explicit selection/approval of the next objective.`).
      - **Strict Prohibitions in Plan Mode**: DO NOT generate full code, draft long copy, create/modify files, or start executing until explicit user approval.
    - **Execution Mode (Post-Approval)**:
      - Upon explicit user approval of the plan, switch to **EXECUTION MODE**.
      - Present the actual implementation material in sequential order, never dumping all steps at once unless requested.
  - **The Permanent Understanding Rule**: The user must always understand **WHAT → WHY → WHERE → IN WHAT ORDER → WHAT "DONE" MEANS** before receiving large amounts of implementation material.
  - **Search-Volume & Claim Language Invariants**:
    - Never use "high-volume" without verified third-party volume proof; use *"verified query demand"* or *"observed search queries"*.
    - Classify telemetry and expectations strictly under **VERIFIED / PROBABLE / HYPOTHESIS** without guaranteed ranking or CTR claims.
    - Clearly specify reporting windows for GSC baselines (never merge different snapshot windows into one).
  - **Content Quality & Anti-Spam Governance**:
    - The system produces **valuable, differentiated, technically useful search assets** — never volume-based commodity copy.
    - Strictly prohibit keyword-volume quotas, arbitrary article counts, thin supporting pages, duplicate copy, and content created merely to satisfy a calendar.
  - **Link Status & Telemetry Invariants**:
    - Never predefine external links as dofollow; classify only as `VERIFIED DOFOLLOW`, `NOFOLLOW`, or `UNKNOWN` after live HTML inspection.
    - In measurement, never assume speculative crawl, indexing, or ranking gains; report only observable evidence.
    - Maintain strict 1-to-1 parity between on-site implementation reality and external publication claims.
- **Rule 9: Core-to-Spoke Hub Architecture & External Technical Distribution**:
  `hvaclogic.org` is the immutable core hub. HVACLogic's own pages (calculators, topic hubs, guides, research papers, datasets) are the primary SEO assets. Dev.to, Hashnode, preprints, datasets, and peer technical channels are spokes for technical distribution and research interpretation. The primary SEO objective is increasing HVACLogic's Google rankings and organic search visibility for high-value HVAC engineering search intents. Use cross-domain canonical tags for substantially identical/syndicated content where supported, and natural contextual links for original/adapted editorial content. Never assume a platform honors canonical tags without live HTML inspection. External publishing remains a supporting distribution strategy, not the primary SEO objective.
- **Rule 10: Immediate PR Status Reporting & Zero Presumptive PR Creation**:
  When the user commands an action on a specific PR (e.g. *"merge PR X"*, *"push to PR X"*):
  - Check the PR status first via GitHub CLI.
  - If the PR is already merged or closed, immediately report its status in plain text.
  - Strictly **DO NOT** create new PRs or fallback branches without explicit user confirmation.
- **Rule 11: Direct Answers with Zero Apologies**:
  When receiving corrections or status inquiries, state facts and outcomes directly without conversational apologies, meta-commentary, or excuses.
- **Rule 12: Strict PR Creation Stop Boundary (Zero Automatic Merging)**:
  When instructed to commit to a PR or open a PR:
  - Branch, commit, push, run tests, and open the GitHub PR.
  - **STOP IMMEDIATELY** after providing the PR URL and summary.
  - **Strict Prohibition**: NEVER automatically merge the PR, delete branches, or trigger production cleanup in the same turn. Merging requires explicit, separate user command (e.g., *"merge PR X"* or *"approved to merge"*).
- **Rule 13: One Objective → One Validation Pass Protocol**:
  To prevent execution paralysis and redundant evidence loops:
  $$\text{ONE OBJECTIVE} \longrightarrow \text{ONE BOUNDED VALIDATION PASS} \longrightarrow \text{EXECUTE} \longrightarrow \text{VALIDATE} \longrightarrow \text{MOVE ON}$$
  - Perform strictly **one bounded validation pass** before execution.
  - **Do NOT** restart or loop on the research/evidence phase over minor version, wording, or table numbering nuances.
  - **Stop condition**: Only pause or halt execution if a **material blocker** is discovered (e.g., mathematically invalid equation, unsupported regulatory claim, broken calculation domain, or impossible engineering source value).
- **Rule 14: Strict Calculation Domain Separation & Cluster Scope Invariant**:
  - **Domain Separation**: Never conflate distinct engineering and physical domains (e.g., refrigerant phase-equilibrium thermodynamics vs. moist-air psychrometrics). Never construct synthetic "state-point handoffs" between separate tools unless explicitly designed and implemented in source code.
  - **Existing-Asset Cluster Gate**: In any `CLUSTER UPGRADE` objective, verify route existence in the production codebase first. **Strict Prohibition**: Never create new routes or tools inside a `CLUSTER UPGRADE`. Creating new routes requires an explicit, separate `CORE PUBLICATION` or `CLUSTER PUBLICATION` objective.

---

## Operations & Deployment Rules

- **Strict Git Commit & Push Boundary**:
  - Never execute `git commit` or `git push` presumptively during documentation updates, plan reviews, or code staging.
  - Commits require explicit user instruction or explicit confirmation (e.g., *"commit"*, *"push"*, *"open PR"*).
- **GitHub PR & Vercel Automated Deployment Lifecycle**:
  - **Small Tweaks**: Direct commits to `main` for simple text corrections, minor CSS refinements, or small single-file bug fixes.
  - **Medium / Large Updates (MANDATORY PR)**: Create a feature branch (`feat/<slug>`, `refactor/<slug>`), run pre-PR checks (`npm test` & `npm run typecheck`), push, and **immediately open a formal GitHub PR**.
  - **Online Merge & Cleanup (Strictly upon explicit command)**:
    1. Merge online via GitHub CLI/Web: `gh pr merge <PR> --squash --delete-branch`.
    2. Verify Vercel production reaches `READY` on `hvaclogic.org`.
    3. Purge stale preview deployments: `npx vercel rm <preview-url> --yes` and old superseded deployment IDs `npx vercel rm <dpl_id> --yes --safe`.
    4. Purge stale Git branch aliases: `npx vercel alias rm <branch-alias> --yes` to clear Vercel Active Branches.
    5. Pull `main` locally (`git checkout main && git pull origin main`) and prune remote tracking (`git remote prune origin && git fetch --prune`).
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
