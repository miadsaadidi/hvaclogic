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
| **7** | SEO | Submit the sitemap. Inspect and request indexing for the homepage, five pillars, and the eight Tier 1 calculators in a controlled sequence. Record Google's selected canonical where available. | Sitemap accepted; inspection status and request date recorded for every priority URL. |

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

### Week 3 — useful distribution and earned-link outreach

| Day | Owner | Work | Deliverable and acceptance check |
| :---: | :--- | :--- | :--- |
| **15** | SEO + Editorial | Build the outreach kit: one-sentence product description, privacy statement, source policy, screenshots, three worked examples, and direct links to the most relevant calculator—not the homepage by default. | Reusable media/resource folder and outreach tracker ready. |
| **16** | HVAC SME | Participate in two relevant community discussions where a calculation genuinely answers the question. Candidate communities include HVAC-Talk and carefully selected HVAC/HVAC-advice subreddits, subject to each community's rules. | Two useful, non-promotional answers logged; links included only where allowed and genuinely helpful. |
| **17** | Outreach | Contact 8 vocational schools, apprenticeship programs, community-college HVAC labs, or instructor resource pages. Pitch the transparent formulas, worked examples, offline use, and printable job sheets. | Eight personalized contacts sent; page/topic fit recorded. |
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

## 5. Outreach messaging

### Trade-school or instructor resource pitch

```text
Subject: Transparent HVAC calculation tools for [course or resource page]

Hi [Name],

I found your [specific HVAC course/resource page] while reviewing training material for [specific topic].

HVACLogic provides free browser-based calculators that expose their formulas, units, assumptions, worked examples, and source standards. The tools run client-side without accounts or customer-job tracking and can be used offline in the field.

For your material on [topic], this calculator may be useful:
[direct calculator URL]

The relevant method is [one-sentence method], with the source and limitations shown on the page. If it would help your students, you are welcome to link to it or embed it. No placement or followed link is required.

Best,
[Name]
HVACLogic — https://hvaclogic.org
```

### Technical publisher pitch

```text
Subject: Interactive worked example for your [specific article/topic]

Hi [Name],

Your explanation of [specific point] is one of the clearer resources I found on the topic.

We built an interactive HVACLogic calculator for [specific task]. It shows [specific differentiator], including the governing formula, units, and a worked example rather than hiding assumptions behind a result.

Tool: [direct calculator URL]
Method/source page: [relevant methodology or sources URL]

If it improves the article for your readers, feel free to reference or embed it. I can also prepare a worked example using the scenario already discussed in your article.

Best,
[Name]
```

### Community participation rule

Answer the user's technical question in the post itself. State assumptions and safety limits. A calculator link is optional supporting material, never the entire answer. Do not post the same wording across communities, use optimized anchor text, or evade self-promotion rules.

---

## 6. High-Authority Target Site Mix & Daily 2–3 Posts Cadence

To build compounding domain authority without triggering link-spam filters, HVACLogic maintains a disciplined daily rhythm of **2 to 3 targeted value-first posts / outreach pitches per day** (14 to 21 touches per week).

### Target Site Distribution Mix

```
                        [ Daily 2–3 Posts & Outreach Mix ]
                                       │
    ┌──────────────────────────────────┼──────────────────────────────────┐
    ▼                                  ▼                                  ▼
[ Touch 1: Technical Forum / Q&A ] [ Touch 2: .EDU / Trade School ] [ Touch 3: Publisher / Directory ]
 • HVAC-Talk                        • Vocational HVAC Labs             • ACHR News / HVAC School
 • Reddit (r/HVAC, r/MEP)           • Community College Depts          • Engineering Tech Blogs
 • GreenBuildingAdvisor             • Apprentice Training Centers      • AlternativeTo / ProductHunt
```

| Channel Type | Target Authority Sites / Platforms | Target Daily Cadence | Content & Engagement Focus |
| :--- | :--- | :---: | :--- |
| **Field Tech & Pro Forums** | • **HVAC-Talk** (`hvac-talk.com`)<br>• **GreenBuildingAdvisor** | 1 post every 1–2 days | Solve live engineering sizing questions (TEL friction rates, ECM static pressure drops, heat pump balance points). Provide the full mathematical proof inline; attach calculator permalink as optional calculation reference. |
| **Targeted Subreddits** | • **`r/HVAC`** (Field Techs & Installers)<br>• **`r/MEPEngineering`** (Design Engineers)<br>• **`r/hvacadvice`** (Sizing & Quotes)<br>• **`r/refrigeration`** (P-T & Saturation)<br>• **`r/BuildingScience`** (R-Values & Loss) | 1 post/reply per day | Participate in threads discussing complex sizing, AC model number decoding, or A2L refrigerant charging rules. |
| **.EDU & Vocational Labs** | • **Vocational Colleges** (Lincoln Tech, UTI)<br>• **Community College HVAC/R Depts**<br>• **Union Apprentice Training Centers** | 1 pitch per day | Email instructors introducing the 100% free, ungated calculation tools, transparent formulas, and printable PDF submittals for student lab sessions. |
| **Industry Media & Blogs** | • **ACHR News** (*The News*)<br>• **HVAC School** (*Bryan Orr / HVACR School*)<br>• **Contracting Business**<br>• **Mechanical Design & Green Blogs** | 1 tailored pitch every 2 days | Propose interactive calculation widgets or worked examples to enhance existing articles on Manual D, A2L refrigerants, or Manual J heat loss. |
| **Open Web & Software Registries** | • **AlternativeTo** (Alternative to McQuay Ductulator & Wrightsoft)<br>• **Product Hunt / Hacker News Show HN**<br>• **GitHub Engineering Open Registries** | 1 directory listing / showcase every 3–4 days | Establish foundational brand searches and indexation citations for the zero-tracking, open-access engineering suite. |

---

### Weekly 2–3 Posts Daily Execution Schedule

| Day of Week | Touch 1: Community Q&A (Technical Reply) | Touch 2: Academic Outreach (.EDU Pitch) | Touch 3: Publisher & Directory Pitch |
| :--- | :--- | :--- | :--- |
| **Monday** | `r/HVAC` (Field diagnostic / PT chart problem) | Vocational College HVAC Department #1 | AlternativeTo / Software Directory Profile |
| **Tuesday** | `HVAC-Talk` (Airflow / duct sizing / TEL thread) | Community College HVAC Instructor #1 | Technical HVAC Blogger / Substack Pitch #1 |
| **Wednesday** | `r/MEPEngineering` (Manual J vs Manual D sizing) | State Apprenticeship Resource Coordinator #1 | HVAC School (*Bryan Orr*) Topic Suggestion |
| **Thursday** | `r/hvacadvice` (AC model number decoding / tonnage) | Vocational College HVAC Department #2 | Independent Green Building / Envelope Blogger |
| **Friday** | `r/refrigeration` (A2L / R-454B charge calculations) | Community College HVAC Instructor #2 | Trade Newsletter / ACHR News Editorial Desk |
| **Saturday** | `GreenBuildingAdvisor` (Wall R-value / U-factor) | Union Training Center Director #1 | Product Hunt / Show HN Launch Preparation |
| **Sunday** | `r/HVAC` or `HVAC-Talk` (Weekly troubleshooting thread) | Student Lab Resource Page Coordinator #1 | Review weekly replies & update outreach tracker |

---

## 7. KPI tracker

Record baselines rather than filling unknown values with zero.

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
