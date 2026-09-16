# HVACLogic Master SEO Strategy & Operating System

**Domain**: [https://hvaclogic.org/](https://hvaclogic.org/)  
**Document Version**: 2.2.0 (Expanded Multi-Sector Authority Ecosystem)  
**Last Systemic Review**: 2026-09-16  
**Operational Status**: ACTIVE / MANDATORY SOURCE OF TRUTH  

---

## A. Business & SEO Positioning

### 1. Core Principle & Engineering Philosophy
HVACLogic is a deterministic, open-access thermodynamic computing platform, building science repository, and computational laboratory for HVAC/R engineers, mechanical designers, technicians, and educators. 

HVACLogic builds search authority strictly through:
$$\text{Authority} = \text{Deterministic Engineering Calculators} + \text{First-Principles Equations} + \text{Original Empirical Research} + \text{Academic Citations} + \text{Targeted Distribution}$$

We reject synthetic SEO practices, thin affiliate tools, keyword-stuffed copy, and artificial review markup. The platform is designed around 100% client-side computing, zero tracking databases, zero paywalls, and rigorous validation against governing engineering standards (ASHRAE, ACCA, AHRI, SMACNA, EPA, NIST, IEEE).

### 2. Market Positioning
- **Primary Audience**: Mechanical Engineers (PE/EIT), HVAC Contractors/Technicians, Energy Auditors, Building Scientists, Engineering Students, and Commercial Facility Operators.
- **Secondary Audience**: Informed residential property owners executing decarbonization, heat pump conversions, or equipment replacement.
- **Competitive Advantage**: Real-time reactive 2D/3D SVG visualizers, transparent formula derivations, open datasets with live DOIs, reproducible calculation algorithms, and native offline capabilities (PWA).

---

## B. Reconciled Asset Taxonomy & Inventory

Every HVACLogic asset is classified within the operational taxonomy:

| Asset Class | Total Active Count | Operational Role | Primary Schema | Canonical Target |
| :--- | :---: | :--- | :--- | :--- |
| **Category Pillar Hub** | **5** | Flat thematic category organizing clusters | `CollectionPage`, `BreadcrumbList` | `https://hvaclogic.org/<pillar>` |
| **Production Calculator** | **21** | Interactive computational tool with SVG visualizer | `WebApplication`, `SoftwareApplication` | `https://hvaclogic.org/calculators/<slug>` |
| **Canonical Research Paper**| **7** | Peer-reviewed academic technical report | `ScholarlyArticle`, `TechArticle` | `https://hvaclogic.org/research/<slug>` |
| **Educational Lab Manual** | **2** | Laboratory courseware & student curriculum | `ScholarlyArticle`, `Course` | `https://hvaclogic.org/research/<slug>` |
| **Open Benchmark Dataset** | **6** | Published benchmark dataset with minted DOI | `Dataset`, `DataDownload` | Repository / `/research/<slug>` |
| **Interactive OER Lab** | **3** | HTML5 client-side courseware lab unit | `Course`, `LearningResource` | `https://hvaclogic.org/oer-modules/*.html` |
| **Engineering Guide** | **5 Live + 3 Sched** | Technical field manual or standard guide | `TechArticle`, `HowTo` | `https://hvaclogic.org/guides` |
| **Governance & Authority Hub**| **10** | Standards, sources, glossary, developers | `ItemPage`, `AboutPage` | `https://hvaclogic.org/<sources|standards>` |

---

## C. Search Intent Taxonomy

Every query and content asset maps to one of seven deterministic intent classes:

1. **Transactional Engineering**: Professional calculation queries (e.g., *"ductulator"*, *"duct friction loss calculator"*, *"total equivalent length manual d"*).
2. **Field Service / Diagnostic**: Immediate field lookup and troubleshooting (e.g., *"r454b pt chart"*, *"target superheat calculator"*, *"carrier model number decoder"*).
3. **Engineering / Research**: Advanced thermodynamic derivations (e.g., *"ashrae hyland wexler saturation formulas"*, *"a2l temperature glide modeling"*).
4. **Commercial Sizing & Electrification**: Equipment replacement and load calculation (e.g., *"heat pump balance point calculator"*, *"mini split sizing calculator"*, *"furnace btu calculator"*).
5. **Code & Standards Compliance**: Building code requirements (e.g., *"ashrae 62.2 mechanical ventilation rate"*, *"irc m1503.6 kitchen makeup air code"*).
6. **Educational / OER**: Higher education and trade instruction (e.g., *"duct aerodynamics lab"*, *"heat pump cop derating exercise"*).
7. **Informational / Theoretical**: Broad building science overviews (e.g., *"parallel path framing factor"*, *"dew point vs wet bulb"*).

---

## D. Keyword Architecture & Clustering

HVACLogic enforces strict 1:1 mapping between high-intent query clusters and canonical assets to eliminate internal keyword cannibalization.

```
TOPIC CLUSTER (e.g., Airflow & Ducts)
  ├── PILLAR HUB: /airflow-ducts (Head queries: "hvac airflow engineering", "duct design fundamentals")
  │     │
  │     ├── CORE CALCULATOR: /calculators/ductulator (Query: "ductulator", "duct sizing tool")
  │     ├── CORE CALCULATOR: /calculators/flex-duct-cfm-chart (Query: "flex duct cfm chart")
  │     ├── CORE CALCULATOR: /calculators/duct-friction-loss-calculator (Query: "duct friction loss", "tel duct")
  │     ├── CORE CALCULATOR: /calculators/filter-sizing-calculator (Query: "merv filter pressure drop")
  │     │
  │     └── RESEARCH MONOGRAPH: /research/non-linear-duct-friction-loss-fitting-penalties
  │           └── Queries: "darcy weisbach duct friction", "colebrook white duct roughness"
```

*Detailed keyword mappings, search volumes, and difficulty tiers are maintained in [`SEO/KEYWORDS.md`](./KEYWORDS.md).*

---

## E. Topical Architecture & The 5 Engineering Pillars

HVACLogic is organized into 5 core engineering pillars, anchored by flat, clean URL routes:

```
https://hvaclogic.org/
  ├── /airflow-ducts            (Pillar 1: Fluid dynamics, friction rates, TEL, filter drops — 6 Calculators)
  ├── /cooling-loads            (Pillar 2: Manual J cooling, sensible/latent splits, tonnage, mini-splits — 4 Calculators)
  ├── /field-diagnostics        (Pillar 3: Refrigeration cycle, A2L PT charts, superheat/subcooling, psychrometrics — 4 Calculators)
  ├── /heating-systems          (Pillar 4: Heat pumps, balance points, cold-climate COP, AFUE furnaces, hydronics — 5 Calculators)
  └── /building-science         (Pillar 5: Envelope infiltration, R-value assemblies, U-factors — 2 Calculators)
```

---

## F. Calculator SEO Engineering System

Calculators are the operational flagship of HVACLogic. Every calculator must satisfy the **HVACLogic Deep Technical Standard**:
1. Interactive 2D/3D Reactive Visualizer (Canvas / SVG).
2. Precision Input Controls with Engineering Presets & Unit Toggles (IP / SI).
3. Dynamic Result Dashboard with Boundary Warnings & Diagnostic Indicators.
4. Governing Standards Citation (e.g., ASHRAE 2021, ACCA Manual D).
5. Complete Mathematical Derivation with LaTeX Equations.
6. Step-by-Step Worked Engineering Example with Realistic Inputs.
7. Verified Industry FAQs (Structured for Accordion & Voice Search).
8. Contextual Internal Link Bridge (Related Calculators + Research Monograph + Pillar Hub).
9. Validated JSON-LD `WebApplication` Structured Data.

**Formula Integrity Rule**: Mathematical equations and engineering constants are immutable. SEO optimization must never alter calculation logic, safety factors, or physical formulas.

---

## G. Research, Whitepaper & Academic Monograph System

HVACLogic publishes original monographs to establish first-tier academic authority.

### Classification Rules:
- **Canonical Research Whitepaper**: Original peer-reviewed technical monograph establishing thermodynamic derivations or field models (7 active).
- **Educational / Student Lab Manual**: Applied courseware and student laboratory exercise with benchmark problem sets (2 active).
- **Benchmark Dataset**: Open empirical data array deposited in a certified repository with minted DOI (6 active).

Every monograph must provide a Report Number, verified DOI (where issued), downloadable academic PDF asset, LaTeX derivations, formatted BibTeX/APA citation blocks, and direct companion calculator bridges.

---

## H. Internal Linking Architecture

HVACLogic operates on a **Deterministic Radial Graph** internal link architecture:
1. **Pillar $\rightarrow$ Calculator**: Every pillar links to all member calculators.
2. **Calculator $\rightarrow$ Pillar**: Every calculator features a breadcrumb pointing to its parent pillar.
3. **Calculator $\leftrightarrow$ Calculator**: Every calculator links to exactly 2–4 companion tools within logical workflows.
4. **Calculator $\leftrightarrow$ Research**: Every core calculator links to its foundational research monograph, and vice versa.
5. **Research $\rightarrow$ Methodology / Sources**: Every research monograph links to governing standard pages (`/standards`, `/sources`).

*The complete deterministic link graph is codified in [`SEO/INTERNAL_LINK_MAP.md`](./INTERNAL_LINK_MAP.md).*

---

## I. Technical SEO, Rendering & Web Performance

1. **Architecture**: Next.js App Router with React Server Components (RSC) and statically generated pre-rendered routes (`SSG`).
2. **Client Computation**: Zero server-side state. Computation runs 100% in client-side Web Workers and React hooks.
3. **Core Web Vitals Benchmarks**:
   - **LCP (Largest Contentful Paint)**: $< 1.2\text{ s}$
   - **INP (Interaction to Next Paint)**: $< 50\text{ ms}$
   - **CLS (Cumulative Layout Shift)**: $0.000$ (deterministic container sizing)
4. **Crawlability & Indexation**:
   - Clean canonical domain: `https://hvaclogic.org` (strict non-www enforcement).
   - Dynamic sitemap: [`/sitemap.xml`](https://hvaclogic.org/sitemap.xml) generated via [`src/app/sitemap.ts`](file:///d:/HVACLab/src/app/sitemap.ts).
   - Machine readability: AI crawler feeds at `/llms.txt` and `/llms-full.txt`.

---

## J. Schema & Structured Data Governance

Structured data must be strictly truthful and reflect only verifiable on-page elements.

### Approved Schemas:
- `WebApplication`: For all 21 production calculators.
- `ScholarlyArticle` / `TechArticle`: For all 9 research monographs.
- `Dataset`: For published benchmark datasets.
- `BreadcrumbList`: On every sub-route for hierarchical navigation.
- `Organization` / `WebSite`: Root-level branding and identity.

### Strictly Prohibited Schema Violations:
- **NO synthetic AggregateRating / Review stars** (fabricated review counts violate Google Search Essentials).
- **NO fake download stats or pricing markup**.

*Detailed JSON-LD templates and validation rules are specified in [`SEO/SCHEMA_RULES.md`](./SCHEMA_RULES.md).*

---

## K. Multi-Sector External Authority Ecosystem

Authority is built across **six distinct institutional sectors**. A backlink is never treated as a generic link; it is the natural byproduct of an authentic technical, editorial, or academic relationship.

```
                         ┌──────────────────────────────────────────────┐
                         │   HVACLogic 6-Sector Authority Ecosystem     │
                         └──────────────────────┬───────────────────────┘
                                                │
         ┌───────────────────┬──────────────────┼───────────────────┬───────────────────┐
         ▼                   ▼                  ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ 1. Engineering  │ │  2. HVAC/Built  │ │ 3. Academic &  │ │ 4. High-Tier    │ │ 5. Government & │
│    Societies    │ │     Environment │ │    University  │ │    Industry     │ │    Public Labs  │
│ (IEEE, ASME)    │ │(ASHRAE, CIBSE)  │ │(Purdue, UIUC)  │ │ (ACHR, GBA)     │ │ (NREL, LBNL)    │
└─────────────────┘ └─────────────────┘ └────────────────┘ └─────────────────┘ └─────────────────┘
```

### Operational Framework:
$$\text{HVACLogic Asset} \longrightarrow \text{Authority Sector} \longrightarrow \text{Target Institution} \longrightarrow \text{Relationship Type} \longrightarrow \text{Submission/Pitch Path} \longrightarrow \text{Expected Value} \longrightarrow \text{Status}$$

---

### Sector 1: Engineering Societies & Technical Computing
- **IEEE (Institute of Electrical and Electronics Engineers)**:
  - *TechRxiv Preprint Server*: Deposit pre-prints of computational energy monographs (`ashrae-hyland-wexler-moist-air-psychrometrics`). Pathway: Open submission (CC BY 4.0). Relationship: `Preprint / Open Science`.
  - *IEEE Spectrum Magazine*: Pitch feature articles on client-side physics engines and eliminating refrigerant glide heuristics. Relationship: `Editorial / Expert Contribution`.
  - *IEEE Transactions on Smart Grid / Industrial Electronics*: Research papers modeling inverter heat pump grid demand. Relationship: `Research Publication / Citation`.
- **ASME (American Society of Mechanical Engineers)**:
  - *ASME IMECE Conference*: Submit papers on turbulent duct aerodynamics and Colebrook-White friction scaling. Relationship: `Conference / Research Publication`.
- **CIBSE (Chartered Institution of Building Services Engineers)** & **REHVA**:
  - Technical symposium submissions on metric/imperial duct hydraulics and European IAQ dilution standards. Relationship: `Technical Contribution / International Recognition`.
- **IBPSA (International Building Performance Simulation Association)**:
  - Building simulation papers integrating envelope infiltration with dynamic fenestration solar gains. Relationship: `Conference / Academic Citation`.

---

### Sector 2: HVAC & Built-Environment Authorities
- **ASHRAE (American Society of Heating, Refrigerating and Air-Conditioning Engineers)**:
  - *ASHRAE Journal*: Practitioner articles addressing field diagnostics and zeotropic A2L temperature glide. Relationship: `Editorial / Practitioner Article`.
  - *Science and Technology for the Built Environment (STBE)*: Formal archival research submissions on NIST REFPROP phase-equilibrium calibrations. Relationship: `Research Publication`.
  - *ASHRAE Technical Committees (TC 1.1, TC 6.1, TC 9.1)*: Research presentations and public review contributions on web-based standards computation. Relationship: `Standards Review / Expert Contribution`.
- **ACCA, SMACNA, AHRI, AMCA, HVI**:
  - Reference implementation verification for Manual D (duct sizing), Manual J (heat loads), and Manual S (equipment selection). Relationship: `Standards Reference & Industry Alignment`.

---

### Sector 3: Research, University & Open Science Ecosystem
- **Premier University Laboratories**:
  - *Purdue University (Ray W. Herrick Laboratories)*: Share open benchmark heat pump COP derating datasets with compressor and refrigeration research groups. Relationship: `Academic Outreach / Research Citation`.
  - *University of Illinois Urbana-Champaign (UIUC ACRC)*: Correspond on low-GWP refrigerant line-set mass addition and fluid velocity gradients. Relationship: `Research Reference`.
  - *UC Berkeley (Center for the Built Environment - CBE)*: Collaborate on ASHRAE 55 thermal comfort visualizations. Relationship: `Tool Reference / Academic Collaboration`.
  - *Texas A&M University (Energy Systems Laboratory - ESL)*: Share building envelope thermal transmission benchmark matrices for code compliance software validation. Relationship: `Dataset Sharing / Validation`.
  - *MIT Building Technology Program*: Provide interactive HTML5 courseware lab units for undergraduate building physics courses. Relationship: `Curriculum Adoption / Courseware`.
- **Academic Preprint & Data Repositories**:
  - *SSRN (Elsevier)*: Published working paper (`10.2139/ssrn.7430738`). Relationship: `Academic Working Paper / Crossref DOI` (Verified Live).
  - *Figshare*: 5 benchmark datasets with minted DataCite DOIs (`10.6084/m9.figshare.*`). Relationship: `Open Science Dataset` (Verified Live).
  - *Harvard Dataverse*: Replication data for zeotropic phase equilibrium (`10.7910/DVN/SR1NZO`). Relationship: `Open Data Repository`.
  - *Academia.edu*: 8 published technical monographs (DA 93). Relationship: `Academic Preprints` (Verified Live).

---

### Sector 4: High-Authority Industry & Trade Media
- **ACHR News**: Pitch technical articles to Managing Editors on eliminating A2L charging errors and preventing compressor burnout. Relationship: `Editorial / Practitioner Column`.
- **GreenBuildingAdvisor (GBA)**: Deep-dive guest contributions on heat pump thermal balance point dynamics versus nominal tonnage rules. Relationship: `Editorial / Guest Author`.
- **Energy Vanguard Blog (Dr. Allison Bailes)**: Engineering analysis on ACCA Manual D Total Equivalent Length (TEL) and flexible duct friction penalties. Relationship: `Editorial Outreach / Technical Reference`.
- **Contracting Business Magazine**: Practical field guides on zeotropic R-454B superheat and subcooling diagnostic calculations. Relationship: `Editorial / Expert Column`.
- **Engineered Systems Magazine (ES Mag)**: Technical features on implementing pure ASHRAE Hyland-Wexler psychrometric equations in consulting engineering workflows. Relationship: `Editorial / Engineering Feature`.
- **HPAC Engineering & Consulting-Specifying Engineer (CSE)**: Commercial mechanical applications on condensing boiler return-water dew points and commercial VAV duct hydraulics. Relationship: `Editorial / Technical Application`.

---

### Sector 5: Government, National Labs & Public Research
- **National Laboratories (NREL, LBNL, ORNL, PNNL)**:
  - *NREL*: Share open-access heat pump COP derating datasets for building electrification models. Relationship: `Dataset Reference`.
  - *LBNL (Energy Technologies Area)*: Share ASHRAE 62.2 mass-balance ventilation and IAQ models. Relationship: `Research Citation`.
  - *ORNL (Building Technologies Research and Integration Center - BTRIC)*: Correspond on low-ambient heat pump defrost kinetics and auxiliary staging. Relationship: `Research Outreach`.
- **NIST (National Institute of Standards and Technology)**:
  - Engage thermodynamic metrology groups regarding REFPROP 10.0 extended Helmholtz formulations for R-454B and R-32. Relationship: `Metrology / Scientific Reference`.
- **DOE Building Technologies Office (BTO) & EPA (AIM Act / ENERGY STAR)**:
  - Provide open-access simulation workbenches to federal technician transition programs. Relationship: `Public Educational Tool Reference`.

---

### Sector 6: Professional & Engineering Education Organizations
- **ASEE (American Society for Engineering Education)**:
  - Submit curriculum papers to the ASEE Annual Conference (Mechanical Engineering Division) evaluating open-access simulation tools for undergraduate thermodynamics. Relationship: `Educational Paper / Conference`.
- **OER Commons & MERLOT (California State University)**:
  - Permanent open-access courseware lessons (`OER-01` Lesson 147416) and simulation learning objects (`MER-01` ID 824240104, `MER-02` ID 824240154). Relationship: `OER Courseware Adoption` (Verified Live).
- **RESNET, BPI, USGBC**:
  - Technical tool references for home energy raters (HERS), envelope air tightness testing, and LEED thermal comfort compliance. Relationship: `Professional Tool Reference`.

---

## L. Canonical & Syndication Governance

1. **Source of Truth Priority**: The canonical version of every HVACLogic calculation, monograph, and dataset resides permanently on `https://hvaclogic.org/`.
2. **Cross-Domain Canonical Tags**: When syndicating to platforms supporting cross-domain canonicals (DEV.to, Hashnode, Medium), the canonical URL MUST point directly to the corresponding HVACLogic page.
3. **Adapted Content Principle**: For platforms that do not support canonical tags (e.g., Academia.edu, Figshare), content must be formatted as an academic pre-print or technical report explicitly citing HVACLogic as the publisher and repository of origin.

---

## M. Search Console Operating System & Decision Logic

Search Console is an active, evidence-based driver of daily optimization decisions:

| Scenario / Signal | Diagnostic Metric | Trigger Threshold | Autonomous Action |
| :--- | :--- | :--- | :--- |
| **Strike Distance** | Average Position 4.0 – 20.0 | High Impressions (>100/mo) | Expand page copy, add targeted FAQ schema, inject internal contextual links from pillar hubs. |
| **High Impression / Low CTR** | CTR $< 2.5\%$ on Pos $< 8$ | Impressions $> 500$/mo | Rewrite SEO Title and Meta Description to highlight precision, instant calculations, and governing standards. |
| **Declining Asset** | Clicks/Impressions dropping $> 20\%$ MoM | Historical top-10 asset | Conduct technical audit, verify schema validity, refresh formulas/standards citations. |
| **Cannibalization** | 2+ URLs ranking for identical query | Position variance $< 5$ | Consolidate content into primary calculator; redirect or canonicalize duplicate intent. |
| **Emerging Cluster** | New related queries appearing in GSC | Queries with impressions | Add dedicated parameter support, worked examples, or specific FAQ entries to the relevant calculator. |

---

## N. Permanent Evidence-Driven SEO Operating System

### 1. Operating Paradigm: Evidence Over Fixed Schedules
The fixed daily and weekly calendars (`docs/16-master-authority-and-syndication-calendar.md`) are permanently retired as active execution schedules and classified as **LEGACY / BACKLOG / NON-AUTHORITATIVE REFERENCE**. 

The fundamental question of the operating system is:
> **"What does the current evidence say HVACLogic should do next?"**

The permanent operating loop is:
```
DIAGNOSE ➔ PRIORITIZE ➔ PLAN ➔ APPROVAL GATE ➔ EXECUTE ➔ VALIDATE ➔ LOG ➔ MEASURE ➔ REASSESS
```

### 2. Evidence Assessment Hierarchy
1. **Highest Priority**: Verified technical, crawlability, or indexation defects affecting critical routes.
2. **Next Priority**: Measurable search-performance opportunities (queries in strike distance, high-impression low-CTR, emerging clusters).
3. **Next Priority**: Meaningful internal architecture, semantic clarity, or content gaps supported by evidence.
4. **Next Priority**: Verified research, open dataset, or educational distribution opportunities.
5. **Next Priority**: External authority / editorial acquisition when specifically justified by evidence.
6. **Lowest Priority**: Routine or repetitive activity with no evidence of direct value.

### 3. Search Console Data Governance
- When live Search Console API data is unavailable, this limitation must be explicitly stated.
- Search metrics, impressions, rankings, or click-through rates must never be fabricated or guessed.
- Absent Search Console data, prioritization relies strictly on verified codebase state, route testing, and persistent publication records.

### 4. Mandatory Single-Objective Diagnosis & Execution Format
Every autonomous diagnosis session must output strictly ONE highest-value objective in this exact execution-ready structure before stopping at the approval gate:

```markdown
## CURRENT STATE
(Factual summary of internal and external implementation status)

## EVIDENCE
(Verified observations, code/file states, indexation signals, or explicit statement of missing GSC telemetry)

## ONE PRIORITY
(Single objective stated in one sentence)

## EXACT EXECUTION STEPS
### Step 1 — Audit
- File/system:
- Action:
- Evidence:
- Done when:

### Step 2 — Implement
- File/system:
- Action:
- Evidence:
- Done when:

### Step 3 — Validate
- Command/test:
- Expected result:
- Done when:

### Step 4 — Log
- File:
- Update:
- Done when:

## EXPECTED SEO MECHANISM
(Current problem → Action → Search/discovery mechanism → Expected improvement, with zero speculative ranking/traffic guarantees)

## DEPENDENCIES
- Autonomous actions:
- User approval required:
- External accounts / 3rd parties:
- Unavailable data / limitations:

## VALIDATION
(Exact tests, build checks, and verification commands)

## FILES / SYSTEMS AFFECTED
(Exact list of file paths and systems)

## APPROVAL REQUIRED
(Explicit stop condition awaiting user direction)
```

---

## O. Anti-Spam, Quality & Compliance Guardrails

HVACLogic operates under zero-tolerance quality safeguards:
1. **Zero PBNs / Link Schemes**: Absolutely no paid links, link exchanges, or low-tier directory submissions.
2. **Zero Scaled / AI Thin Content**: Every guide and calculator must provide deep, verified engineering utility.
3. **Strict Outreach Signature**: Always sign outreach correspondence as **`Miad S.`** (never full last name).
4. **No AI Watermarks**: Never use em-dashes (`—`) in email pitches or external publishing copy. Use hyphens, commas, or periods.
5. **Verified Live DOIs Only**: Never output or promote unverified DOIs.

---

## P. Definition of Done (DoD)

An SEO initiative on HVACLogic is marked **COMPLETE** only when:
- [ ] Technical implementation is deployed and verified live on production.
- [ ] TypeScript compilation (`npm run typecheck`) and Vitest tests (`npm test`) pass with zero errors.
- [ ] Structured Data (JSON-LD) is validated with zero errors and zero warnings.
- [ ] Canonical URLs and Open Graph tags match production routes exactly.
- [ ] Internal bidirectional links are wired between Hub, Calculator, and Research monograph.
- [ ] Operational logs (`SEO/DAILY_LOG.md`, `SEO/CHANGELOG.md`, `SEO/BACKLINK_LOG.csv`) are updated.
