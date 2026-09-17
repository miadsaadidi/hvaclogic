# HVACLogic External Distribution & Supporting Authority Guide

**Domain**: [https://hvaclogic.org/](https://hvaclogic.org/)  
**Document Version**: 4.0.0 (Supporting Distribution & Verification Model)  
**Last Updated**: 2026-09-17  
**Operational Status**: ACTIVE / MANDATORY DISTRIBUTION GOVERNANCE  

---

## 1. Strategic Purpose of External Distribution

External publishing platforms (Dev.to, Hashnode, Medium, LinkedIn, research repositories, educational catalogs, and trade media) are **supporting distribution channels only**. They are **not** the foundation of SEO success.

### Key Operational Invariants:
1. **Primary Focus**: HVACLogic's own pages and computational tools are the primary SEO assets.
2. **No Quota**: Zero mandatory quotas for external articles, bookmarks, or directory submissions.
3. **No Ranking Guarantees**: Never assume or promise that external publications or backlinks guarantee organic ranking improvements.
4. **Distinct Angles**: External content must offer distinct, independently useful engineering angles rather than duplicating on-site copy solely to multiply URLs.
5. **Legitimate Authority**: Relationships are built on authentic technical substance, reproducible research, and open courseware.

---

## 2. Master Publishing Flow: HVACLogic Core First

Every external distribution follows the immutable core-to-spoke flow:

$$\text{HVACLOGIC CORE ASSET FIRST} \longrightarrow \text{VERIFY} \longrightarrow \text{SELECT BEST-FIT CHANNEL} \longrightarrow \text{ADAPT CONTENT} \longrightarrow \text{PUBLISH} \longrightarrow \text{VERIFY} \longrightarrow \text{LOG} \longrightarrow \text{MEASURE}$$

---

## 3. Asset-Class Distribution Protocols

```
1. RESEARCH / WHITEPAPER
   HVACLogic Research Page (/research/<slug>)
   └── Verify live page, PDF asset, and structured JSON-LD metadata
       └── Select appropriate Preprint / Scientific Repository (e.g., SSRN, IEEE TechRxiv)
           └── Deposit record & mint DOI (where supported)
               └── Verify live landing page & attribution ➔ Log in SEO/BACKLINK_LOG.csv

2. DATASET
   HVACLogic Dataset Landing Page (/datasets/<slug>)
   └── Verify schema.org/Dataset, CSV/JSON downloads, and variable dictionary
       └── Select appropriate Scientific Data Repository (Figshare, Hugging Face, Dataverse)
           └── Deposit benchmark matrix & obtain DataCite DOI
               └── Verify live record & attribution ➔ Log in SEO/BACKLINK_LOG.csv

3. ENGINEERING EDITORIAL ARTICLE
   HVACLogic Calculator / Research / Dataset
   └── Identify a NEW engineering angle / field case study
       └── Draft 100% original, publication-specific article
           └── Pitch / Submit to best-fit HVAC/engineering trade journal (e.g. ACHR News, GBA)
               └── Natural contextual reference to HVACLogic source tool ➔ Log in SEO/BACKLINK_LOG.csv

4. DEVELOPER ARTICLE
   HVACLogic Calculator Engine / Technical Architecture
   └── Identify genuine technical adaptation (TypeScript algorithms, Web Workers, reactive SVG)
       └── Draft for developer platform (DEV.to / Hashnode)
           └── Apply canonical tag ONLY if substantially identical; otherwise use contextual attribution
               └── Verify live URL and HTML head canonical ➔ Log in SEO/BACKLINK_LOG.csv

5. EDUCATIONAL RESOURCE
   HVACLogic Research / Interactive Courseware Lab (/oer-modules/*.html)
   └── Adapt into structured curriculum / student laboratory exercise
       └── Submit to appropriate OER platform (OER Commons, MERLOT, institutional portal)
           └── Embed contextual reference & computational tool link ➔ Log in SEO/BACKLINK_LOG.csv
```

---

## 4. Canonical vs. Contextual Link Governance

1. **Substantially Identical / Syndicated Content**: Use cross-domain canonical tag to the HVACLogic source asset **only** when technically appropriate, supported by the platform, and verified in the rendered HTML head.
2. **Original / Adapted Editorial Content**: Publish as an independent article with a natural, contextual link pointing to the relevant HVACLogic calculator, research paper, or dataset.
3. **No Presumptions**: Never assume a third-party platform honors canonical directives without live verification.

---

## 5. Backlink Governance & Verification Standards

1. **Database Status Pipeline**:
   $$\text{Prospect} \neq \text{Contacted} \neq \text{Published} \neq \text{Verified Backlink}$$
2. **Link Status Classification**:
   - `VERIFIED DOFOLLOW`: Confirmed via live HTML inspection (`rel` attribute checked; no `nofollow`, `ugc`, or `sponsored`).
   - `NOFOLLOW`: Link contains `rel="nofollow"`, `rel="ugc"`, or platform default.
   - `UNKNOWN`: Unverified or pending manual audit.
3. **Dofollow Policy**:
   - Dofollow links are never required; dofollow status is never promised or presumed.
   - External links remain a supporting discovery mechanism.
4. **Anti-Duplication Invariant**:
   - Before drafting any external piece, inspect [`docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md`](../docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md) and [`SEO/BACKLINK_LOG.csv`](./BACKLINK_LOG.csv). Never suggest or draft a topic already published on that platform.
