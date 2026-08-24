# HVACLogic — 30-Day SEO, Authority & Backlink Execution Plan

> **Document Status**: Approved strategy, ready for execution
> **Version**: 1.0.0
> **Created**: 2026-08-20
> **Canonical Production Domain**: `https://hvaclogic.org`
> **Scope**: 21 production calculators, 5 pillar hubs, homepage, and 4 authority/policy pages
> **Related Docs**: [01-keyword-research-master.md](./01-keyword-research-master.md), [02-website-architecture-routing.md](./02-website-architecture-routing.md), [07-master-seo-strategy.md](./07-master-seo-strategy.md), [11-analytics-and-kpi-plan.md](./11-analytics-and-kpi-plan.md)

---

## 1. Purpose and operating principles

This plan adapts PowerLab's useful four-week execution rhythm to HVACLogic's actual product: deterministic, standards-referenced tools used by technicians, contractors, engineers, students, and building-science practitioners.

The month is designed to establish a measurable search baseline, make every eligible route technically coherent, strengthen the best existing calculator pages, and earn relevant discovery through useful participation and editorial outreach. It does not promise rankings, impressions, AI citations, or backlinks that no team can control.

### Non-negotiable rules

1. **One canonical domain from launch**: every indexable URL, sitemap entry, structured-data URL, embed URL, and internal link resolves to `https://hvaclogic.org`.
2. **Calculator-first value**: the working calculator and answer appear before supporting educational content. Content exists to explain assumptions, formulas, safety limits, and worked examples.
3. **No scaled-content expansion in Month 1**: improve the 21 shipped calculators before adding articles, city pages, keyword-variant routes, or new tools.
4. **No manipulated backlinks**: no paid links, automated directory blasts, keyword-rich forum signatures, required followed widget links, or reciprocal-link schemes.
5. **Evidence before optimization**: title and snippet changes after launch require page/query evidence or a clear technical defect.
6. **Standards claims remain precise**: cite the exact source used by the calculation and do not imply endorsement by ASHRAE, ACCA, EPA, NFPA, AHRI, SMACNA, or IECC.
7. **Privacy remains part of the product**: measurement may record anonymous route and interaction events, never customer names, addresses, equipment identifiers, or calculation input values.

### Current Google guidance reflected in this plan

- A sitemap is a discovery hint, not an indexing guarantee. It should contain absolute canonical URLs. Google ignores sitemap `priority` and `changefreq`, and uses `lastmod` only when it is consistently accurate: [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- FAQ rich results were removed from Google Search in May 2026. Useful visible FAQs may remain, but `FAQPage` is not a Month 1 rich-result objective: [Google Search documentation updates](https://developers.google.com/search/updates#removing-faq-rich-result).
- Search and AI visibility use the same foundation: crawlable pages, useful original content, internal links, good page experience, and accessible text. No special AI file or markup is required: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features).
- Distributed keyword-rich or low-quality widget links can qualify as link spam. HVACLogic embeds are a utility and referral channel; editorial citations must remain voluntary: [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies#link-spam).
- Core Web Vitals use the recognized good thresholds at the 75th percentile: LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1: [Web Vitals](https://web.dev/articles/vitals).

---

## 2. Month 1 outcomes

| Outcome | Day 15 checkpoint | Day 30 target | Evidence |
| :--- | :--- | :--- | :--- |
| Canonical crawl health | All planned routes return `200`, declare the correct canonical, and appear once in the sitemap | No unresolved canonical, redirect, robots, or duplicate-route defects | Crawl export, raw HTML checks, GSC Page Indexing |
| Eligible-page discovery | Sitemap accepted and priority routes inspected | 90–100% of the 31 planned canonical routes discovered; index coverage recorded without claiming guaranteed inclusion | GSC Sitemaps and Page Indexing |
| Search baseline | First query/page/export snapshot saved | Positive trend recorded where data exists; otherwise a clean baseline and Month 2 comparison date | GSC Performance export |
| Priority-page quality | Tier 1 pages pass content, source, metadata, and internal-link review | All Tier 1 and Tier 2 pages pass; remaining pages triaged | Page audit worksheet |
| Relevant earned authority | Outreach list and assets complete; first 15 personalized contacts sent | 40 qualified contacts, 8+ replies, and 3–8 relevant editorial mentions or resource links | Outreach tracker and backlink review |
| Embed/referral adoption | Safe embed pitch and demo verified | 2–5 legitimate installations or active trials; attribution links are not required to pass ranking credit | `embed_copied`, referral traffic, manual verification |
| Performance | Lab baseline for homepage, one pillar, and four calculator archetypes | No critical mobile regression; field CWV monitored when enough data exists | PageSpeed Insights, Search Console CWV |

Absolute traffic and ranking numbers are deliberately excluded from the first-month success gate. A new domain may not collect enough reliable query data in 30 days, and submission does not guarantee indexing.

---

## 3. Priority calculator groups

### Tier 1 — authority acquisition and repeat field use

These pages receive indexing requests, full on-page review, outreach examples, and internal-link strengthening first.

| Calculator | Primary role | Best distribution audience |
| :--- | :--- | :--- |
| `/calculators/ductulator` | Air-distribution authority anchor | HVAC design forums, contractors, trade schools |
| `/calculators/flex-duct-cfm-chart` | High-utility reference/chart intent | Installers, DIY/HVAC advice communities, educators |
| `/calculators/cfm-calculator` | Workflow bridge from load to duct size | Designers, commissioning technicians, students |
| `/calculators/duct-friction-loss-calculator` | Manual D/TEL field workflow | ACCA-oriented training resources and design blogs |
| `/calculators/ac-model-decoder` | High-intent equipment identification | Home-service publishers and replacement guides |
| `/calculators/superheat-subcooling-calculator` | Repeat diagnostic habit | Service technicians and refrigeration communities |
| `/calculators/pt-chart` | Mobile field reference | HVAC/R technicians and training labs |
| `/calculators/refrigerant-charge-calculator` | R-454B/R-410A field workflow | A2L training, manufacturer-adjacent education, technicians |

### Tier 2 — sizing and commercial-intent support

`btu-calculator`, `ac-tonnage-calculator`, `mini-split-sizing`, `heat-pump-size-calculator`, `furnace-size-calculator`, `filter-sizing-calculator`, and `heat-loss-calculator`.

### Tier 3 — topical completeness

`kitchen-hood-cfm`, `psychrometric-calculator`, `boiler-size-calculator`, `garage-heater-sizing`, `combustion-air-calculator`, and `r-value-calculator`.

Tiering controls execution order only. All 21 production calculators remain indexable and must meet safety and correctness standards.

---

## 4. Thirty-day execution calendar

### Week 1 — canonical launch, crawlability, measurement, and indexation

| Day | Owner | Work | Deliverable and acceptance check |
| :---: | :--- | :--- | :--- |
| **1** | Site owner + SEO | Verify `hvaclogic.org` and `www` behavior, HTTPS, Vercel production alias, and one preferred host. Create/verify Google Search Console Domain property and Bing Webmaster Tools property. | Preferred host returns `200`; all other public hosts permanently redirect to it; ownership recorded. |
| **2** | Engineering | Crawl the 31 planned canonical routes: homepage, 5 pillars, 21 calculators, and 4 authority/policy pages. Check status, canonical, title, H1, robots directive, and raw-HTML content. | Crawl sheet contains one row per route; zero accidental `noindex`, redirect chains, duplicate canonicals, or missing H1s. |
| **3** | Engineering | Correct sitemap semantics. Include only canonical `200` pages; make `lastmod` reflect real significant changes rather than request time; do not use `priority` or `changefreq` as ranking levers. Verify `robots.txt` references the canonical sitemap. | `/sitemap.xml` contains exactly the intended canonical set with defensible dates; `/robots.txt` is valid. |
| **4** | Engineering + SEO | Audit structured data in rendered HTML. Keep accurate `WebSite`, `WebApplication`/`SoftwareApplication`, and `BreadcrumbList` entities. Keep visible FAQs for users, but remove FAQ rich-result expectations from tests and strategy. | Schema validator has no syntax errors or mismatches with visible content; breadcrumbs match canonical routes. |
| **5** | Engineering | Run mobile and desktop PageSpeed Insights on homepage, one pillar, and four archetypes: lightweight calculator, chart-heavy calculator, diagnostic calculator, and long-form calculator. Review font loading, visualizer dimensions, main-thread work, and layout shifts. | Baseline sheet saved; critical regressions have owners; targets use LCP ≤2.5s, INP ≤200ms, CLS ≤0.1. |
| **6** | Site owner + Engineering | Establish privacy-safe measurement. Record GSC/Bing baselines and verify any analytics events do not include query parameters or numeric calculation inputs. | Day 1 export folder and KPI sheet created; no PII or job data appears in telemetry. |
| **7** | SEO + SME | Publish the HVACLogic Academic Whitepaper to **Internet Archive (`archive.org` — DA 96)**, **Academia.edu (DA 93)**, and **ResearchGate**. Submit the canonical sitemap. Inspect and request indexing for the homepage, five pillars, and the eight Tier 1 calculators. Record Google's selected canonical where available. | Academic pre-print published on Archive.org & Academia.edu; sitemap accepted; inspection status and request date recorded for every priority URL. |

### Week 2 — page quality, intent alignment, and internal authority flow

| Day | Owner | Work | Deliverable and acceptance check |
| :---: | :--- | :--- | :--- |
| **8** | SEO | Reconcile the keyword master with the live 21-page inventory. Assign one primary intent per calculator and merge synonymous terms into the same page. Identify cannibalization between duct, CFM, load, and tonnage pages. | One keyword-to-canonical map; no same-intent duplicate route proposal. |
| **9** | SEO + Editorial | Review Tier 1 titles, H1s, descriptions, and opening paragraphs. Titles describe the tool plainly; descriptions state the differentiating method or output without unsupported superlatives. | Tier 1 snippet sheet with current text, proposed text, rationale, and character count. |
| **10** | Engineering SME + Editorial | Strengthen Tier 1 direct answers and worked examples. Each page states what it calculates, required inputs, units, governing equation, and decision boundary before long supporting content. | Eight pages pass calculator-first and extractable-answer review. |
| **11** | Engineering SME | Verify source precision and safety language. Link to primary standards or authoritative public references where legally available; distinguish code requirements from screening estimates. | Every Tier 1 standards claim maps to the source register; no endorsement language or unsafe diagnostic certainty. |
| **12** | Engineering + SEO | Audit contextual links and parameter handoffs. Strengthen real workflows such as `BTU → CFM → Ductulator`, `PT Chart → Superheat/Subcooling → Refrigerant Charge`, and `Heat Loss → Furnace/Heat Pump/Boiler`. | Tier 1 pages have a parent-pillar link and 2–4 useful next-step links; no generic link blocks added solely for SEO. |
| **13** | Design + SEO | Verify unique Open Graph images for homepage, pillars, and priority calculators. Check titles are legible at social-card size and image URLs use the canonical host. | Social preview checklist passes for the 14 priority URLs. |
| **14** | QA | Re-crawl changed pages; compare raw HTML, metadata, schema, canonicals, and internal links. Run unit tests, typecheck, and targeted SEO assertions. | Week 2 release gate passes; changes deployed together and logged. |

### Week 3 — useful distribution, academic outreach, and earned-link outreach

| Day | Owner | Work | Deliverable and acceptance check |
| :---: | :--- | :--- | :--- |
| **15** | SEO + Editorial | Build the outreach kit: one-sentence product description, privacy statement, source policy, screenshots, academic paper DOI link, printable job sheets, and direct calculator URLs. | Reusable media/resource folder and outreach tracker ready in [14-seo-progress-tracker.md](./14-seo-progress-tracker.md). |
| **16** | HVAC SME | Participate in two relevant community discussions (HVAC-Talk / Reddit). Provide the full mathematical proof inline; attach calculator permalink as optional reference. | Two useful, non-promotional answers logged; links included only where allowed and genuinely helpful. |
| **17** | Outreach | Contact 8 vocational schools, apprenticeship programs, community-college HVAC labs, or instructor resource pages. Pitch the transparent formulas, worked examples, offline use, and academic whitepaper. | Eight personalized contacts sent; page/topic fit recorded. |
| **18** | Outreach | Contact 7 contractor training centers, commissioning organizations, building-science educators, or regional trade associations. Offer a reviewed resource suggestion, not a reciprocal-link exchange. | Seven personalized contacts sent; no bulk template blast. |
| **19** | Outreach | Contact 5 engineering/HVAC publishers, newsletters, podcasts, or technical bloggers with one calculator-specific story: TEL/ASP, A2L line-set charging, ECM filter pressure, or combustion-air sizing. | Five tailored pitches sent with a concrete example and source notes. |
| **20** | Engineering + Outreach | Review embed behavior. Position embeds as reader utility and referral distribution. The generated attribution must be visible, branded, and safely qualified; never require followed ranking credit. Ask publishers separately for an editorial resource citation only when deserved. | Embed demo works responsively; attribution policy passes spam review; five qualified embed prospects contacted. |
| **21** | SEO | Review responses, answer technical questions, correct any misunderstood claim, and publish a public sources/methodology link in every outreach follow-up. | Week 3 tracker shows 25 initial contacts, replies, follow-up dates, and outcomes. |

### Week 4 — evidence-led iteration and authority follow-through

| Day | Owner | Work | Deliverable and acceptance check |
| :---: | :--- | :--- | :--- |
| **22** | SEO | Export GSC Page Indexing, Sitemaps, and Performance reports. Compare discovered, crawled, indexed, duplicate, and excluded states. If query volume is still sparse, prioritize crawl defects rather than premature copy changes. | Day 22 snapshot and issue list ranked by impact and confidence. |
| **23** | SEO + Editorial | Identify pages with enough impressions to support a CTR decision. Review queries and average position together; change titles only for clear intent mismatch or weak differentiation. | Evidence-backed title test queue; no sitewide rewrite based on tiny samples. |
| **24** | Editorial + SME | Use actual queries and support questions to add missing definitions, unit conversions, boundary explanations, or examples to existing pages. Do not create new routes for minor variants. | Up to four high-confidence content improvements with query evidence. |
| **25** | SEO | Run a manual search/AI visibility audit for eight Tier 1 problem statements. Record whether HVACLogic is surfaced, which sources are cited, and what unique evidence competitors provide. Do not automate Google queries. | Repeatable audit sheet with date, locale, query, result, and gap—not a guaranteed citation target. |
| **26** | Engineering SME + Editorial | Complete Tier 2 metadata, source, direct-answer, and internal-link review using Week 2's template. | Seven Tier 2 pages pass the quality checklist. |
| **27** | Outreach | Send one useful follow-up to non-responders from Days 17–20, adding a relevant worked example, instructor note, or embed demo. Add 15 new highly qualified prospects if capacity allows. | 40 total qualified contacts; no prospect receives more than one follow-up this month. |
| **28** | SEO | Audit new mentions and links for relevance, destination, anchor language, and referral traffic. Disavowal is not routine; simply document low-quality unsolicited links unless a real manual-action risk exists. | Earned-authority register updated; suspicious tactics rejected. |
| **29** | Engineering | Repeat the Week 1 performance sample and crawl. Confirm no content, embed, analytics, or schema work caused mobile regressions. | Before/after report; zero unresolved critical crawl or performance regression. |
| **30** | Site owner + SEO + Engineering | Hold the Month 1 review. Compare Day 1, Day 15, and Day 30; document what moved, what lacked data, outreach conversion, and the next highest-confidence opportunities. | Month 1 report and prioritized Month 2 backlog approved. |

---

## 5. Ready-to-Use Outreach & Discussion Copy Templates

### A. Academic & Vocational Lab Instructor Pitch (.EDU Outreach)

```text
Subject: Open-access calculation tools & student lab sheets for [Course Name / Department]

Hi Professor/Instructor [Last Name],

I came across your HVAC/R training materials for [Course Name, e.g., Air Distribution & Psychrometrics] at [Institution Name].

We recently published an open-access engineering framework: "HVACLogic: A Deterministic Building Science and Thermodynamic Modeling Framework" (Archived on Internet Archive & Academia.edu), alongside a companion suite of 21 free, browser-based calculators:
https://hvaclogic.org

Key features designed specifically for student lab sessions:
1. 100% Client-Side & Private: Zero user accounts, zero data harvesting, and no customer-job tracking.
2. Transparent Equations: Every calculation displays the exact governing formulas (Colebrook-White, Darcy-Weisbach, ASHRAE psychrometrics, EPA bubble/dew glide) and step-by-step worked solutions.
3. Offline & Printable: Operates fully offline in campus basements/labs and exports clean, printable PDF job cards for lab grading.

For your upcoming module on [topic], this direct utility may be helpful for your students:
[Direct Tool URL, e.g., https://hvaclogic.org/calculators/ductulator]

You are welcome to reference the tool or the open methodology paper in your course syllabus or lab handouts. No link or attribution is formally required.

Best regards,

[Your Name]
HVACLogic Engineering Working Group
https://hvaclogic.org
```

### B. Pro Forum Technical Response (HVAC-Talk / Reddit `r/HVAC` & `r/MEPEngineering`)

```text
Regarding the friction loss on your [e.g. 10-inch round branch line at 350 CFM]:

Using the Colebrook-White friction model for standard galvanized sheet metal (roughness e = 0.0003 ft) at standard air density (0.075 lb/cu ft):
- Air Velocity: V = Q / A = 350 / (pi * (5/12)^2) = 642 FPM
- Velocity Pressure: Pv = (642 / 4005)^2 = 0.0257 in. wg
- Reynolds Number: Re approx. 54,000 (fully turbulent)
- Darcy Friction Factor: f = 0.0212
- Friction Rate: FR = 0.062 in. wg per 100 ft

This is well within the standard ACCA Manual D residential supply threshold (0.08 in. wg/100 ft) and SMACNA acoustic limits for residential branch ducts (<700 FPM).

If you want to test different aspect ratios or equivalent rectangular sizes (e.g. 10x8 or 12x6), here is an interactive calculator that exposes the exact Colebrook and Huebscher formulas with live canvas cross-sections:
https://hvaclogic.org/calculators/ductulator?cfm=350&friction=0.062
```

### C. Industry Media & Podcast Pitch (ACHR News / HVAC School / Bryan Orr)

```text
Subject: Interactive A2L refrigerant glide & line-set calculation resource for your readers

Hi [Editor/Host Name],

Your recent coverage on [Article Title / A2L refrigerant transition rules] was exceptionally clear and helpful for technicians in the field.

As contractors navigate the transition from R-410A to R-454B and R-32, the primary jobsite hurdle has been calculating temperature glide across bubble and dew points, plus OEM line-set add-on charge rates beyond 15 ft.

We built a free, zero-ad interactive diagnostic calculator that models saturation curves and weigh-in requirements:
- Tool: https://hvaclogic.org/calculators/refrigerant-charge-calculator
- Sourced Data Register: https://hvaclogic.org/methodology

If helpful for your readers, you are welcome to embed the calculation widget or reference the worked scenario in future technical guides.

Best regards,

[Your Name]
HVACLogic — https://hvaclogic.org
```

### D. Software Directory Profile (AlternativeTo / Open Registries)

```text
Title: HVACLogic
Tagline: Open-source, deterministic HVAC & building science engineering calculation suite.
Description: 
HVACLogic is a modern, fast, and privacy-preserving alternative to legacy software like McQuay Ductulator and Wrightsoft. It provides 21 client-side engineering tools covering air duct sizing (Colebrook-White & Huebscher), ACCA Manual J heating/cooling loads, SEER2 AC tonnage, A2L refrigerant charging, and ASHRAE psychrometrics.
Key Features:
- 100% Client-Side & Zero Tracking: Runs completely in your browser without transmitting project dimensions or customer data.
- Full Offline PWA Support: Works reliably in mechanical rooms and basements without internet connectivity.
- Transparent Engineering: Displays governing physics equations, LaTeX derivations, and worked examples for every calculation.
- Printable PDF Submittals: Generate clean job submittal sheets and CSV datasets with one click.
Website: https://hvaclogic.org
```

---

## 6. High-Authority Target Site Mix & Daily 5 Pro-Curiosity Emails Cadence

To build compounding domain authority without triggering spam filters, HVACLogic maintains a disciplined daily rhythm of **5 targeted, peer-to-peer pro-curiosity emails per day** (35 high-impact touches per week) alongside open scientific preprint distribution.

### The Pro-Curiosity Psychological Framework & Copywriting Protocol:

1. **Strict Exclusion of Promotional & Spam Markers (Anti-Spam Filter)**:
   * **Banned Words**: `"free"`, `"suite"`, `"all-in-one"`, `"revolutionary"`, `"best"`, `"check out"`, `"game-changer"`, `"partner with us"`, `"guest post"`, `"link exchange"`.
   * **Banned Patterns**: No generic compliments, no corporate intros, no email tracking pixels, and no vague pitches.

2. **Core Psychological Triggers & Cognitive Hooks**:
   * **Cognitive Dissonance / Heuristic Contrast**: Challenges an entrenched field shortcut with physical reality (e.g., standard ductulators ignoring flexible duct wire-helix compression; midpoint PT charts failing on A2L temperature glide).
   * **Peer-to-Peer Engineering Dialect**: Speaks as a practicing thermodynamics/fluid-mechanics peer (referencing Reynolds numbers, Darcy roughness $\varepsilon = 0.0003\text{ ft}$, Huebscher circular equivalency limits, sensible heat ratios).
   * **Curiosity Gap via Specific Scenario**: Quotes an exact calculation scenario with real numbers rather than talking abstractly about features.
   * **Frictionless Pre-Populated URL**: Embeds a single parameterized permalink that loads the exact numerical scenario discussed into the tool instantly.
   * **Zero-Obligation / Disarming Close**: Explicitly frees the recipient from any duty to reply or link back, which counter-intuitively raises response rates by eliminating sales resistance.

```
                              [ Daily 5 Pro-Curiosity Outreach Mix ]
                                                │
         ┌────────────────────────┬─────────────┴────────────┬────────────────────────┐
         ▼                        ▼                          ▼                        ▼
  [ Touch 1: Trade Leader ] [ Touch 2: .EDU Dept ]    [ Touch 3: Trade Editor ] [ Touches 4-5: SME / Tech ]
   • Bryan Orr (HVAC School) • Ferris State Univ       • ACHR News (Kyle G.)     • Gary McCreadie (HVAC Know It All)
   • Allison Bailes (Energy) • Northern Virginia CC    • Contracting Business    • Bill Spohn (TruTech Tools)
```

---

### Daily 5 Emails Execution Distribution & Psychological Angles

| Touch # | Target Category | Psychological Trigger & Technical Angle | Example Target |
| :---: | :--- | :--- | :--- |
| **Touch 1** | **Industry Thought Leader / Author** | **Heuristic Dissonance**: Challenge flexible duct compression derating vs rigid slide-rule assumptions. | Dr. Allison Bailes (*Energy Vanguard*) / Bryan Orr |
| **Touch 2** | **.EDU / Vocational Faculty** | **Pedagogical Integrity**: Provide transparent Colebrook-White step-by-step derivations for student lab assignments with zero ad tracking. | Doug Zentz (*Ferris State*) / Lincoln Tech / UTI |
| **Touch 3** | **Trade Press Editorial Desk** | **Industry Transition Friction**: Explain the dew-point vs bubble-point subcooling error trap on A2L R-454B systems. | Kyle Gargaro (*ACHR News*) / Terry McIver (*Contracting Business*) |
| **Touch 4** | **Instrumentation SME / Podcast** | **Physical vs Theoretical Edge Cases**: Contrast aspect ratio limits (>4:1) with measured static pressure drop. | Bill Spohn (*TruTech Tools*) / Gary McCreadie |
| **Touch 5** | **Building Science & Hydronics** | **First-Principles Modeling**: Challenge simplified CFM-per-sqft heuristics using multi-layer envelope $ACH_{50}$ infiltration physics. | Dan Foley / GreenBuildingAdvisor Contributors |

---

## 7. KPI tracker & Operational Integration

Track daily execution metrics directly in **[`docs/14-seo-progress-tracker.md`](./14-seo-progress-tracker.md)**.

| Metric | Day 1 baseline | Day 15 | Day 30 | Decision rule |
| :--- | :---: | :---: | :---: | :--- |
| Planned canonical routes returning `200` | Measure | Measure | 31/31 | Engineering defect if lower |
| Sitemap URLs accepted/discovered | Measure | Measure | 31 discovered | Investigate mismatched hosts or exclusions |
| Indexed canonical routes | Measure | Measure | Trend toward 90–100%; not guaranteed | Inspect exclusions individually |
| Organic impressions | Measure | Measure | Report change, no invented target | Segment by page and query |
| Organic clicks and CTR | Measure | Measure | Report only with sample size | Optimize intent before wording |
| Queries in positions 4–20 | Measure | Measure | Build Month 2 opportunity list | Improve pages with real impressions |
| Relevant referring domains | Measure | Measure | +3 to +8 | Count editorially relevant domains only |
| Qualified outreach contacts | 0 | 15+ | 40 | Personalization and topic fit required |
| Outreach replies | 0 | Measure | 8+ | Improve pitch if reply rate is below 15% |
| Editorial mentions/resource links | 0 | Measure | 3–8 | Never purchase or require ranking credit |
| Embed copies/installations | Measure | Measure | 2–5 verified | Treat as utility/referral adoption |
| Tier 1 pages passing quality audit | Measure | 8/8 | 8/8 | Block outreach for a failing page |
| Tier 2 pages passing quality audit | Measure | Measure | 7/7 | Carry documented gaps into Month 2 |
| Mobile CWV sample | Measure | Compare | No critical regression | Use field data when available |

---

## 8. Execution artifacts

Store monthly evidence under a dated, non-secret workspace outside public site content or in an approved analytics system:

```text
seo/month-01/
├── crawl-baseline.csv
├── canonical-route-inventory.csv
├── gsc-day-01/
├── gsc-day-15/
├── gsc-day-30/
├── page-quality-audit.csv
├── performance-baseline.md
├── outreach-tracker.csv
├── earned-authority-register.csv
└── month-01-review.md
```

Do not commit Search Console exports containing account identifiers or private outreach contact data to the public repository.

### Required tracker columns

- **Page audit**: route, pillar, tier, primary intent, title, H1, canonical, index status, direct answer, source status, worked example, internal links, schema result, mobile result, owner, next action.
- **Outreach**: organization, page/topic, contact source, relevant calculator, personalization note, date sent, response, follow-up date, outcome, resulting URL.
- **Monthly review**: metric, baseline, Day 15, Day 30, interpretation, confidence, decision, owner.

---

## 9. Month 2 admission rules

Month 2 may add new supporting content or calculator work only when Month 1 evidence supports it.

Admit an opportunity when at least one condition is true:

1. GSC shows a recurring query family that the current canonical page cannot satisfy cleanly.
2. Multiple technicians, instructors, or publishers request the same missing reference or workflow.
3. A calculator has reliable impressions in positions 4–20 and a specific, correctable content gap.
4. An earned-link prospect requires a genuinely useful asset such as a printable chart, lab worksheet, or worked example.

Do not admit work solely because a keyword tool reports volume, a competitor has a page, or an AI system suggests mass-producing related articles.

---

## 10. Definition of Month 1 completion

The plan is complete when:

- the canonical route inventory has no unresolved critical defect;
- Search Console and Bing receive the canonical sitemap;
- Tier 1 and Tier 2 quality audits are complete;
- the Day 1, Day 15, and Day 30 evidence snapshots exist;
- 40 qualified outreach contacts and their outcomes are documented;
- any embed promotion follows the voluntary-link policy;
- the Month 1 review distinguishes verified results, weak signals, and unknowns;
- Month 2 work is prioritized from evidence rather than speculative traffic promises.
