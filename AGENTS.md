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
  - **Day 1: Multi-Engine Intelligence & Search-Gap System**:
    Day 1 operates as a **Multi-Engine Intelligence System** comprising four complementary discovery engines:
    1. *Engine A — Owned-Site Search Gap*:
       - *Core Question*: What does HVACLogic's existing search data show that its current assets do not satisfy completely?
       - *Evidence*: GSC queries, pages, impressions, clicks, CTR, average position, striking-distance rankings (positions 4–40), emerging query clusters, declining assets, pages ranking for unintended queries, and incomplete intent coverage.
       - *Output*: Owned-Site Search Gaps (directed to Category A Existing Asset Optimization or Category B Cluster Upgrades).
    2. *Engine B — SERP Search-Intent Gap*:
       - *Core Question*: What are users searching for that the current competitive SERP does not fully solve?
       - *10 SERP Gap Classifications*: Uncovered Intent, Partially Covered Intent, Fragmented Intent, Tool Gap, Data Gap, Technical-Depth Gap, Freshness Gap, Evidence Gap, Workflow Gap, Implementation Gap.
       - *Analysis Dimensions*: Search Intent, Existing SERP Coverage, Missing Component, Coverage Level (Fully / Mostly / Partially / Poorly / Uncovered), HVACLogic Opportunity, Best Asset Type.
       - *Output*: SERP Search-Intent Gaps.
    3. *Engine C — Research / Engineering Gap*:
       - *Core Question*: What important technical problems could HVACLogic solve that are not currently represented well in search?
       - *Evidence*: Continuous intelligence mining across national laboratories, standards organizations, and open scientific repositories (**ASHRAE, ACCA, AHRI, SMACNA, DOE, NREL, PNNL, LBNL, ORNL, NIST, EIA, EPA, Figshare, Zenodo, Hugging Face**).
       - *Output*: Research / Engineering Gaps (independent of pre-existing GSC impressions).
    4. *Engine D — Site Architecture / Product Gap*:
       - *Core Question*: Where does the current HVACLogic product/content architecture fail to complete a user's task?
       - *Evidence*: Internal routing graph, calculator registry (`src/lib/data/calculators-registry.ts`), guides registry (`src/lib/data/guides-registry.ts`), internal link graph, disconnected assets, missing workflow handoffs, missing calculations, and missing features.
       - *Output*: Architecture / Product Gaps.
  - **Strict 4-Gap Taxonomy & Evidence Separation**:
    - *Owned-Site Gap*: Users telling us through GSC what HVACLogic does not satisfy well.
    - *SERP Search Gap*: Users searching for an intent that competing results do not satisfy completely.
    - *Research / Engineering Gap*: Scientific/engineering sources reveal an important problem that search results do not yet solve well.
    - *Architecture / Product Gap*: HVACLogic's existing assets do not form the best workflow for solving an identified task.
    - *Strict Evidence Separation*: Every candidate must explicitly label its evidence type: `GSC Evidence`, `GA4 Evidence`, `SERP Evidence`, `Research / Authority Evidence`, `External Search-Volume Evidence`, `Site Architecture Evidence`, or `Engineering Inference / Hypothesis`. Never conflate impressions with searches or competitor weakness with high volume. Clearly label inference.
  - **Opportunity → Minimum Effective Objective Conversion**:
    Translate every discovered gap into its minimum effective SEO objective:
    - *Query Gap* $\rightarrow$ Existing Asset Optimization
    - *Search Intent Gap* $\rightarrow$ Core / Layer 1 / Guide / Calculator (matching the missing component)
    - *Tool Gap* $\rightarrow$ New Calculator
    - *Workflow Gap* $\rightarrow$ Cluster Upgrade
    - *Feature Gap* $\rightarrow$ New Feature / Calculator upgrade
    - *Data Gap* $\rightarrow$ Dataset / Core Research
    - *Research Gap* $\rightarrow$ Core Publication / Calculator / Dataset
    - *Technical Gap* $\rightarrow$ Systemic Technical Remediation
  - **Anti-Content Bias**:
    A search gap does NOT automatically mean "write an article". Prefer the most useful asset: `calculator > feature > dataset > research > guide > generic article` (only when fitting the user's task).
  - **Additive Opportunity Rule**:
    **Newly discovered search gaps add opportunities to the backlog; they do NOT replace, delete, or reorder the existing weekly production plan.**
    - The existing weekly production schedule remains the authoritative baseline execution roadmap.
    - Newly discovered search gaps enter the **Additive Search-Gap Backlog** (`SEO/WEEKLY_PLAN.md`) with statuses: `DISCOVERED`, `RESEARCH NEEDED`, `PROPOSED`, `PROVENANCE GATE`, `BACKLOG`, `READY FOR APPROVAL`, `MEASUREMENT MODE`, `COMPLETED`.
    - The operating loop remains strictly: $\text{Discover} \longrightarrow \text{Classify} \longrightarrow \text{Prioritize} \longrightarrow \text{User Approval} \longrightarrow \text{Execute} \longrightarrow \text{Validate} \longrightarrow \text{Measure}$. Discovery does not equal execution authorization.
  - **Anti-Loop Governance**:
    Maintain a bounded intelligence process: $\text{Query selection} \longrightarrow \text{SERP inspection} \longrightarrow \text{Intent analysis} \longrightarrow \text{Gap classification} \longrightarrow \text{Opportunity mapping} \longrightarrow \text{STOP}$. Do not repeatedly inspect the same SERP or seek "perfect certainty."
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
- **Rule 15: Standardized Protocol for X (Twitter) Layer 1 Syndication Posts**:
  Whenever drafting X (Twitter) posts to accelerate indexation and distribution for Layer 1 publications (Academia.edu, Figshare, SSRN, Hugging Face, DEV.to, Hashnode, OER Commons, MERLOT):
  - **Pacing**: Output **STRICTLY 1 POST AT A TIME** per turn.
  - **Strict 280-Character Ceiling**: The entire text in the single post block (Title + Description + Link + Tags) MUST NOT exceed 280 characters (accounting for X's 23-character URL shortening).
  - **Format & Delivery Zones**: Deliver strictly in this exact structure:
    1. `#### IMAGE LOCATION`: Clickable folder link ([`public/images/social/`](./public/images/social/)) and direct file link to the persisted image asset.
    2. `#### POST (1 ZONE — <Count> / 280 CHARACTERS)`: Exactly **ONE** single copyable code block containing:
       - Title
       - Small Description
       - Verified Link (Strictly 1 single URL/DOI from `VERIFIED_PUBLICATIONS_REGISTRY.md`)
       - Exactly 5 to 6 technical hashtags (`#Tag1 #Tag2 #Tag3 #Tag4 #Tag5`)
    3. `#### IMAGE PREVIEW`: Embedded markdown preview of the rendered image (`![Alt Text](file:///...)`).
    4. `#### ALT`: A standalone copyable code block containing the clean accessibility and SEO description.
  - **Strict Prohibitions**:
    - **NEVER** provide a text "Image Prompt" code block in lieu of the actual image asset. Always generate and save the graphic to `public/images/social/`.
    - **NEVER** exceed 280 characters in the Post code block.
    - **NEVER** use em-dashes (`—`). Use standard hyphens (`-`), commas, or periods.
- **Rule 16: Standardized Protocol for DEV.to & Technical Distribution Articles**:
  Whenever drafting, preparing, or presenting DEV.to (or Hashnode) technical distribution articles per [`docs/DEV-TO-EDITORIAL-GUIDELINES.md`](./docs/DEV-TO-EDITORIAL-GUIDELINES.md):
  - **Strict 6-Step Sequential Presentation**: Deliver the publication package strictly in this exact 6-step sequential order with dedicated headers:
    1. `#### 1. Title`: Standalone copyable code block containing the descriptive technical title.
    2. `#### 2. Tags`: Standalone copyable code block containing up to 4 lowercase tags.
    3. `#### 3. Image Prompt`: Standalone copyable code block detailing the technical graphic generation prompt (16:9 dark-mode engineering diagram).
    4. `#### 4. Image Alt`: Standalone copyable code block containing concise accessibility description.
    5. `#### 5. Body`: MUST be wrapped in exactly **ONE single 4-backtick code block** (````markdown ... ````) containing:
       - YAML frontmatter with `title`, `published: true`, `description`, `tags`, `canonical_url`, and `cover_image`.
       - Developer-first technical article with typed pure TypeScript engines and Vitest invariant tests.
       - Natural contextual inline links pointing to target HVACLogic calculators/guides.
    6. `#### 6. Canonical`: Standalone copyable code block containing the explicit canonical URL.
  - **Strict Invariants**:
    - **Single-Zone Body**: NEVER fragment the article body across multiple blocks. ALWAYS use four backticks (` ````markdown `) so inner 3-backtick code blocks do not prematurely close the container.
    - **Native Unicode Only (NO RAW LATEX)**: DEV.to does not render MathJax/KaTeX. NEVER output `$$...$$`, `$..$`, `\frac`, `\Delta`, `\text{}`, or `\cdot`. Format formulas using clean native Unicode (`Δ`, `×`, `÷`, `≈`, `≤`, `≥`, `·`, `²`, `³`, `°F`, `W/(m·K)`, `BTU/hr`) or monospaced text blocks.
    - **Zero Em-Dashes**: NEVER use em-dashes (`—`). Use standard hyphens (`-`), commas, or periods.
- **Rule 17: Strict Standards Jurisdiction Separation (ASHRAE Sizing vs. ASME Construction)**:
  - **Thermodynamic Sizing & Physics**: Sizing equations, thermal volumetric expansion ($(\nu_2/\nu_1 - 1) - 3\alpha\Delta T$), acceptance volume ($V_{acc}$), and acceptance ratios ($A_r = 1 - P_1/P_2$) in closed hydronic systems are strictly governed by **ASHRAE** (*ASHRAE Handbook — HVAC Systems and Equipment*, Chapter 15: Sizing Expansion Tanks, Eq. 13 & 14).
  - **Structural Pressure Vessel Code**: **ASME BPVC Section VIII Division 1** strictly governs mechanical pressure vessel construction, minimum design metal temperatures, shell wall thickness, code stamping, and safety relief valve coordination where commercial code vessels are required.
  - **Strict Prohibition**: Never attribute hydronic expansion sizing formulas or thermal physics directly to ASME, and never present non-code residential tanks as ASME-stamped unless explicitly specified.
- **Rule 18: Standards Citation & Empirical Claim Qualification (ACCA / ASHRAE / SMACNA)**:
  - **Edition-Specific Qualification**: Never cite specific standard sections or appendices (e.g., "Appendix 3" of ACCA Manual D) as the current authoritative location without explicitly qualifying it as edition-specific or historical.
  - **Zero Absolute Universal Claims**: Empirical guidelines or field rules of thumb (e.g., fitting resistance percentages) must never be stated as universal or absolute laws. Always qualify by geometry, fitting aerodynamic quality, and layout topology.
  - **Copyright Scoping**: Strictly avoid reproducing proprietary, copyrighted fitting tables or coefficient matrices beyond permitted fair-use representative archetypes and derived engineering values.
- **Rule 19: Calculator Input Layout & Readability Invariants**:
  - Whenever generating or refactoring calculator tool inputs, strictly use the site's standardized class hierarchy: `.calculator-grid`, `.input-panel`, `.output-panel`, `.form-group`, `<label><span>...</span><span className="unit-label">...</span></label>`, `.input-number`, and `.input-help`.
  - **Strict Contrast & Legibility**: Ensure high contrast in both dark and light modes. Form labels and help text must use theme variables (`var(--ink)`, `var(--ink-secondary)`, `var(--surface)`) rather than low-contrast hardcoded grays. Never generate raw unstyled form elements or uncoordinated card wrappers.

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
- **Mandatory Daily Distribution Inclusion (BibSonomy & MERLOT)**: Whatever the daily SEO plan is, ALWAYS add extra educational material / bookmarks in **BibSonomy** and/or **MERLOT** (strictly verifying anti-duplication against [`docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md`](./docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md) and [`SEO/BACKLINK_LOG.csv`](./SEO/BACKLINK_LOG.csv)), formatted with dedicated 1-click copyable metadata blocks.
- **Asset-Fit External Publishing**:
  Publishing and outreach occur strictly through the 5 asset-class flows (Research $\rightarrow$ Preprint/DOI, Dataset $\rightarrow$ Data Repository/DOI, Engineering Editorial $\rightarrow$ Trade Media, Developer Article $\rightarrow$ Tech Platform, Educational Resource $\rightarrow$ OER Platform). Aside from the mandatory BibSonomy & MERLOT material inclusion, publishing is asset-fit driven rather than fixed platform sequences.

---

## Testing & Quality Rules

- **Unit & Type Verification**: Always run `npm test` (Vitest) and `npm run typecheck` (`tsc --noEmit`) before PRs or after code edits.
- **Scoped E2E Tests**: Only run `npx playwright test tests/e2e/<spec-name>.spec.ts` when creating new calculator modules or major core math refactors.
- **Design System**: Use `Titillium Web` typography, PowerLab card aesthetics with 4px colored accent top borders, live reactive SVG visualizers, and 100% client-side computation with zero database tracking.
- **New Calculator Checklist**: Follow [`docs/NEW-CALCULATOR-CHECKLIST.md`](./docs/NEW-CALCULATOR-CHECKLIST.md).
