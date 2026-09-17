# HVACLogic Evidence-Driven Weekly Tactical Backlog

**Domain**: [https://hvaclogic.org/](https://hvaclogic.org/)  
**Document Version**: 4.0.0 (Google Ranking & Search-Intent Operating Backlog)  
**Last Updated**: 2026-09-17  
**Operational Status**: ACTIVE / SSOT TACTICAL CANDIDATE BACKLOG  
**Legacy Calendar Status**: RETIRED / NON-AUTHORITATIVE (Candidate Backlog Only)  

---

## 1. Operating Paradigm: Google Search Visibility & On-Site Assets First

All weekly and daily SEO planning is anchored in one primary objective:
> **Increase HVACLogic's visibility and rankings in Google Search for high-value HVAC engineering, building-science, thermodynamics, heat-pump, cooling/heating-load, psychrometric, energy-efficiency, and engineering-calculation search intents.**

### Core Operating Rules:
1. **Primary Focus on Core Assets**: HVACLogic's own pages (calculators, topic hubs, guides, research papers, datasets) are the primary SEO assets.
2. **Exactly ONE Active Objective**: At any time, exactly one single objective is active. The candidate backlog is a prioritized queue, not an automated execution list.
3. **No Quotas**: There are zero mandatory weekly publication quotas, bookmark targets, or outreach numbers.
4. **Existing-Asset-First**: Always evaluate whether an existing HVACLogic page can be improved to satisfy the search intent before creating new URLs.
5. **No Speculative SEO Claims**: Never promise or assume guaranteed rankings, indexing, or followed backlinks.
6. **Strict Verification**: External link status is strictly recorded as `VERIFIED DOFOLLOW`, `NOFOLLOW`, or `UNKNOWN` based on live HTML inspection.

---

## 2. Current Program & Diagnostic State

```text
ACTIVE OBJECTIVE: FLEX DUCT CFM OPTIMIZATION COMPLETE — awaiting measurement and re-diagnosis.
```

### Current Observed Evidence Baseline:

| Signal Layer | Current Observed State | Evidence & Telemetry Source | Actionable Need |
| :--- | :--- | :--- | :--- |
| **Search Console Telemetry** | Unconnected / API telemetry offline | System environment check | Awaiting GSC data export or API connection before triggering performance-based optimizations. |
| **Crawl & Indexation** | Clean canonical routes; 86 static pages prerendered | `src/app/sitemap.ts`, `canonical-routes.test.ts` | Maintain 100% route integrity; zero crawl errors. |
| **On-Site Core Assets** | 21 Calculators, 7 Research Papers, 6 Datasets, 5 Guides live | Codebase inventory | Core foundation is complete, verified, and ready for search-intent optimization. |
| **Structured Data** | 100% compliant JSON-LD (`WebApplication`, `ScholarlyArticle`, `Dataset`) | Route tests & schema validators | Validated; zero synthetic review markup. |
| **External Backlink Ledger** | 32 verified live entries across Academia.edu, Figshare, SSRN, HF, MERLOT, OER Commons, DEV.to, Hashnode, BibSonomy | `SEO/BACKLINK_LOG.csv` | Active baseline established; strictly avoid re-depositing duplicate assets. |
| **Authority Pipeline** | 39 institutional targets cataloged across 6 sectors | `SEO/AUTHORITY_TARGETS.csv` | Candidates prioritized by relevance and contribution policy; no blanket outreach. |

---

## 3. Autonomous Decision & Planning Protocol (Plan Mode vs. Execution Mode)

Whenever asked:
- *"What should we do today?"*
- *"What is today's plan?"*
- *"What should we publish?"*
- *"What is next?"*
- *"Check SEO."*
- *"What should we do this week?"*

### Operating Invariants:
1. **Plan Mode Before Execution Mode**: The user must always understand **WHAT → WHY → WHERE → IN WHAT ORDER → WHAT "DONE" MEANS** before receiving large amounts of implementation material.
2. **Prohibition in Plan Mode**: **DO NOT** generate full code, draft long copy, create CSV datasets, write outreach emails, or modify files until the plan is approved.
3. **Execution Chain**: Focus on **ONE** strategic objective broken into sequential execution steps.

### Standard Plan Mode Output Schema:
```markdown
## CURRENT STATE
(Factual diagnostic summary of technical, on-site, and search visibility state)

## TODAY'S PLAN TABLE
| # | Action | Asset | Channel/System | Purpose | Status |
| - | ------ | ----- | -------------- | ------- | ------ |
| 1 | ...    | ...   | ...            | ...     | Proposed |
| 2 | ...    | ...   | ...            | ...     | Proposed |
| 3 | ...    | ...   | ...            | ...     | Proposed |

## EXECUTION FLOW
```text
Step 1 → Step 2 → Step 3 → Step 4 → Step 5
```

## ACTION-BY-ACTION FLOWS
### ACTION 1 — [Title]
**Goal:** [Objective of this action]
**Flow:**
1. [Substep 1]
2. [Substep 2]
3. [Substep 3]
**Evidence:** [Supporting codebase or indexation status]
**Done when:** [Clear completion criteria]
**Validation:** [How this step is verified]

## EXPECTED SEO MECHANISM
(Current situation → action → discovery/authority mechanism → expected benefit; zero speculative guarantees)

## DEPENDENCIES
- Autonomous actions:
- User approval required:
- External accounts:
- Third-party approval:
- Unavailable data:

## APPROVAL REQUIRED
(Explicit STOP condition awaiting user direction)
```

---

## 4. Prioritized Candidate Backlog (Search Intent & On-Site Asset Focus)

*The following items are prioritized candidate opportunities. Each item must be independently diagnosed and approved prior to execution.*

### A. Primary On-Site Search Asset Candidates (P1/P2 Optimization)
- **Candidate ON-01**: *High-Impression Search Asset Audit & Strike Distance Diagnostic*
  - Asset Scope: All 21 production calculators & 5 pillar hubs.
  - Objective: Identify which existing HVACLogic pages already have Google impressions/clicks and are closest to page-1 ranking improvements.
  - Priority: P1
  - Status: `[RECOMMENDED NEXT DIAGNOSTIC]`

- **Candidate ON-02**: *Heat Pump Balance Point & Sizing On-Page Enhancement*
  - Asset: [`/calculators/heat-pump-size-calculator`](https://hvaclogic.org/calculators/heat-pump-size-calculator)
  - Objective: Expand worked engineering examples and ACCA Manual S selection criteria to capture high-volume commercial sizing queries.
  - Priority: P1
  - Status: `[BACKLOG / CANDIDATE]`

- **Candidate ON-03**: *Duct Friction Loss & TEL Calculation Landing Page Hardening*
  - Asset: [`/calculators/duct-friction-loss-calculator`](https://hvaclogic.org/calculators/duct-friction-loss-calculator)
  - Objective: Add equivalent length fitting lookup tables and dynamic pressure drop visualizer to target ACCA Manual D search intent.
  - Priority: P1
  - Status: `[BACKLOG / CANDIDATE]`

### B. Supporting Technical Guides & Topic Cluster Candidates (P2)
- **Candidate GUI-01**: *Psychrometrics & Building Envelope Physics Master Guide Rollout*
  - Asset: [`/guides/psychrometrics-building-envelope-physics`](https://hvaclogic.org/guides)
  - Objective: Connect psychrometric calculator, R-value converter, and ASHRAE Hyland-Wexler research monograph into a tight topic cluster.
  - Priority: P2
  - Status: `[BACKLOG / CANDIDATE]`

### C. Supporting External Distribution Candidates (P3/P4 - Supporting Only)
- **Candidate EXT-01**: *Combustion Air Infiltration & Confined Space Sizing per NFPA 54*
  - Core Asset: [`/calculators/combustion-air-calculator`](https://hvaclogic.org/calculators/combustion-air-calculator)
  - Channel: DEV.to / Hashnode (Developer / Technical audience)
  - Purpose: Supporting distribution with contextual attribution.
  - Status: `[BACKLOG / CANDIDATE]`

- **Candidate EXT-02**: *A2L Refrigerant Transition & Zeotropic Temperature Glide*
  - Core Asset: [`/calculators/pt-chart`](https://hvaclogic.org/calculators/pt-chart) & [`/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b`](https://hvaclogic.org/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b)
  - Channel: HVAC Trade Media (ACHR News / Contracting Business)
  - Purpose: Practitioner outreach and technical reference.
  - Status: `[BACKLOG / CANDIDATE]`
