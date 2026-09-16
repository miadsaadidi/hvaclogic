# HVACLogic External Distribution & Syndication Operating Guide (Layer 1)

**Domain**: [https://hvaclogic.org/](https://hvaclogic.org/)  
**Document Version**: 2.1.0 (Asset-Fit Driven Distribution)  
**Last Updated**: 2026-09-16  
**Operational Status**: ACTIVE / MANDATORY DISTRIBUTION GOVERNANCE  

---

## 1. Primary Distribution Protocol: Asset-Fit First

External distribution is **NOT** a rigid, automatic publishing sequence where every asset is broadcast to every platform. Syndicating content merely to generate links creates noise and devalues authority.

All Layer 1 distribution must execute through the deterministic 8-step decision gate:

$$\text{Evaluate Asset} \longrightarrow \text{Determine Purpose} \longrightarrow \text{Evaluate Platform Fit} \longrightarrow \text{Select Appropriate Platform(s)} \longrightarrow \text{Adapt Content} \longrightarrow \text{Publish} \longrightarrow \text{Validate} \longrightarrow \text{Record}$$

### The Distribution Decision Gate:
1. **Evaluate Asset**: Is the asset a code architecture, mathematical derivation, benchmark dataset, academic pre-print, or student lab module?
2. **Determine Purpose**: Is the goal developer adoption, academic citation, educational curriculum adoption, or long-term archiving?
3. **Evaluate Platform Fit**: Does the target platform’s audience genuinely benefit from this asset?
4. **Select Appropriate Platform(s)**: Choose **only** the platforms that match the asset type (e.g., Code $\rightarrow$ DEV.to/Hashnode; Datasets $\rightarrow$ Figshare/Hugging Face; Courseware $\rightarrow$ OER Commons/MERLOT; Monograph PDFs $\rightarrow$ Academia.edu/Archive.org).
5. **Adapt Content**: Completely reformat copy to match the platform's native editorial standard. Never duplicate identical copy.
6. **Publish**: Deploy with strict canonical URL tags to `https://hvaclogic.org/<canonical-route>`.
7. **Validate**: Verify rendered live URL, canonical header tag, and link formatting.
8. **Record**: Log the live asset in `SEO/BACKLINK_LOG.csv` and `docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md`.

---

## 2. Platform Suitability & Mapping Matrix

| Platform | Asset Class Fit | Audience | Canonical Handling | Verification Requirement |
| :--- | :--- | :--- | :--- | :--- |
| **DEV.to** | Client-side algorithms, TypeScript math engines, SVG rendering code | Software engineers & web developers | Native `canonical_url` pointing to source calculator/monograph | Verified live canonical in HTML head |
| **Hashnode** | Deep-dive technical architectural monographs, zero-DB physics engines | Web engineers & technical architects | Native `canonical_url` pointing to source calculator/monograph | Verified live canonical in HTML head |
| **Medium** | Industry overview, building decarbonization, contractor guides | Building science & HVAC professionals | Native Medium cross-domain canonical setting | Verified live canonical in HTML head |
| **Academia.edu** | Peer-reviewed technical monographs & formal engineering papers | Academic researchers & mechanical engineers | Technical report pre-print PDF with cited HVACLogic URL | Verified profile & paper upload link |
| **Figshare** | Open tabular benchmark datasets (CSV, JSON, benchmark arrays) | Data scientists & academic researchers | Minted DataCite DOI with direct citation of HVACLogic URL | Verified resolvable DataCite DOI |
| **Hugging Face** | AI/ML engineering datasets & structured property matrices | Data scientists & ML practitioners | Dataset repository card with source attribution & DOI | Verified live dataset card |
| **OER Commons** | Interactive HTML5 courseware & student lab units | Higher education & vocational HVAC instructors | Open Author lesson module referencing HVACLogic tool | Verified public lesson URL |
| **MERLOT** | STEM educational simulations & interactive learning objects | University mechanical engineering faculty | Peer-reviewed learning material catalog entry | Verified catalog ID & listing URL |
| **Internet Archive** | Permanent academic PDF whitepapers & monograph archives | Public web archival & long-term digital preservation | Permanent PDF item upload with source attribution | Verified archive.org detail URL |
| **BibSonomy** | Academic social bookmarks & structured BibTeX citations | Scholarly researchers & academic libraries | Direct BibTeX entry with verified DOI & HVACLogic URL | Verified public library bookmark |

---

## 3. Strict Layer Separation

| Authority Layer | Definition & Scope | Primary Platforms / Targets | Link Nature |
| :--- | :--- | :--- | :--- |
| **Layer 1: Open Distribution** | Self-published technical syndication, pre-prints, and open data deposits. | DEV.to, Hashnode, Medium, Figshare, Hugging Face, Archive.org | Canonical / Sourced Attribution |
| **Layer 2: Editorial Authority** | Independent, third-party trade journalism and editorial building science media. | ACHR News, GreenBuildingAdvisor, Energy Vanguard, Contracting Business | Editorial Contextual Dofollow |
| **Layer 3: Research & Citations** | Academic journal citations, university engineering syllabi, and official OER course adoption. | University faculty, SSRN, OER Commons, MERLOT, ASHRAE | Academic Citation & Educational .edu |

---

## 4. Strict Anti-Duplication Pre-Check Protocol

Before drafting or syndicating ANY article, dataset, or lab module:
1. **Registry Inspection**: Inspect [`docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md`](file:///d:/HVACLab/docs/outreach/VERIFIED_PUBLICATIONS_REGISTRY.md) and [`SEO/BACKLINK_LOG.csv`](file:///d:/HVACLab/SEO/BACKLINK_LOG.csv).
2. **Topic Uniqueness**: Verify that the asset has NOT already been deposited on the selected platform.
3. **Dedicated Copy Formatting**: Output all metadata (Title, Subtitle, Tags, Canonical URL) in separate dedicated code blocks.
4. **Signature & Style**: Always sign as **`Miad S.`**; strictly prohibit em-dashes (`—`).
