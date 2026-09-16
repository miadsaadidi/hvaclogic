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
- **Mandatory Master Calendar Inspection**: When asked "what's in SEO plan today?" or for status, inspect [`docs/16-master-authority-and-syndication-calendar.md`](./docs/16-master-authority-and-syndication-calendar.md) and [`docs/14-seo-progress-tracker.md`](./docs/14-seo-progress-tracker.md).
- **Strict Anti-Duplication Pre-Check Protocol (MANDATORY)**:
  Before proposing, drafting, or generating ANY publication, article, lab module, dataset, or post for ANY platform (Medium, DEV.to, Hashnode, Academia.edu, Figshare, Hugging Face, OER Commons, MERLOT, SSRN, BibSonomy, X, etc.), you MUST inspect [`docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md`](./docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md). **NEVER suggest or draft a publication topic/asset that is already published on that platform.** Every single platform submission must be verified for uniqueness against the registry prior to presentation.
- **Mandatory Daily Syndication Sequence (STRICT ORDER)**:
  `1. DEV.to` -> `2. Hashnode` -> `3. Medium` -> `4. Academia.edu` -> `5. Figshare` -> `6. Hugging Face / Datasets` -> `7. OER Commons (Open Author Lab Unit - every 2 days)` -> `8. Internet Archive` -> `9. BibSonomy (Daily Bookmark)` -> `10. X (Twitter)`.

---

## Testing & Quality Rules

- **Unit & Type Verification**: Always run `npm test` (Vitest) and `npm run typecheck` (`tsc --noEmit`) before PRs or after code edits.
- **Scoped E2E Tests**: Only run `npx playwright test tests/e2e/<spec-name>.spec.ts` when creating new calculator modules or major core math refactors.
- **Design System**: Use `Titillium Web` typography, PowerLab card aesthetics with 4px colored accent top borders, live reactive SVG visualizers, and 100% client-side computation with zero database tracking.
- **New Calculator Checklist**: Follow [`docs/NEW-CALCULATOR-CHECKLIST.md`](./docs/NEW-CALCULATOR-CHECKLIST.md).
