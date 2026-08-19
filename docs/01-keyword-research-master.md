# HVAC Lab — Master Keyword Research & Market Evidence

> **Document Status**: Approved  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [02-website-architecture-routing.md](./02-website-architecture-routing.md), [05-competitive-analysis-and-calculator-specs.md](./05-competitive-analysis-and-calculator-specs.md), [07-master-seo-strategy.md](./07-master-seo-strategy.md)

---

## 1. Dataset Provenance & Methodology

### Dataset Metadata
* **Source**: Google Keyword Planner Export (CSV datasets).
* **Dataset Size**: 2,712 unique deduplicated search terms.
* **Target Geographic Region**: United States & Global English-speaking markets.
* **Currency**: Moroccan Dirham (MAD) as exported from local Google Ads account; converted to approximate USD benchmark ($1.00\text{ USD} \approx 10.0\text{ MAD}$) for commercial evaluation.
* **Search Network**: Google and Search Partners.
* **Extraction Date**: August 2026.

### Critical Methodology Notice
> **IMPORTANT SEO DISTINCTION**:  
> **Google Ads Advertiser Competition (0–100 index)** reflects paid advertiser bid density and commercial auction competition in Google Ads. **It is NOT equivalent to organic SEO ranking difficulty**.  
> A competition score of `0.0` or `Low` indicates that few advertisers are bidding on paid Google Ads for that term, but organic search results may still feature high-authority domains (e.g. Trane, Carrier, EngineeringToolBox). Organic difficulty must be independently evaluated through SERP domain authority, content depth, and backlink profile analysis.

---

## 2. Executive Summary & Category Performance

Across 2,712 unique search terms in the HVAC and building science ecosystem, the search landscape divides into five major strategic clusters:

```
                                    [ 2,712 Total Keywords ]
                                                │
   ┌────────────────────┬───────────────────────┼───────────────────────┬────────────────────┐
   ▼                    ▼                       ▼                       ▼                    ▼
[ Sizing & Loads ]  [ Airflow & Ducts ]    [ Field Diagnostics ]   [ Hydronics & Plant ]  [ Insulation & Loss ]
 • 506,500 vol/mo    • 233,350 vol/mo        • 51,600 vol/mo         • 16,150 vol/mo        • 89,200 vol/mo
 • 33.8 Avg Comp     • 11.5 Avg Comp (Low!)  • 3.4 Avg Comp (Near 0!)• 43.1 Avg Comp        • 17.8 Avg Comp
 • Top Bid: 121 MAD  • Top Bid: 195 MAD      • Top Bid: 62 MAD       • Top Bid: 88 MAD      • Top Bid: 101 MAD
```

### Strategic Cluster Analysis
1. **Airflow & Ducts Cluster (Primary Authority Driver)**: High search volume queries (`ductulator`, `duct sizing chart`, `flex duct cfm chart`) total **233,350+ monthly searches** with low advertiser competition (11.5/100 average). This cluster offers a prime opportunity to build high-utility engineering tools that attract trade citations, community bookmarks, and organic backlinks.
2. **AC Tonnage & Cooling Cluster (High Commercial Replacement Intent)**: Queries like `how to find ac tonnage` command top-of-page bids up to **97.41 MAD**. Users searching these queries are actively inspecting existing equipment nameplates, making this audience ideal for replacement sizing and local contractor quote funnels.
3. **Refrigeration & Diagnostics Cluster (Technician Daily Habit)**: Terms like `superheat calculator`, `subcooling calculator`, and `pt chart` carry near-zero advertiser competition (1.0 to 3.5/100). Field technicians use these tools on mobile devices on jobsites, driving high repeat engagement and PWA home-screen installations.

---

## 3. Master Keyword Target Database

| Keyword | Monthly Volume | Advertiser Competition | Comp Index (0–100) | Top-of-Page Bid (Low) | Top-of-Page Bid (High) | User Search Intent | Target Calculator & URL | Launch Phase |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| `ductulator` | 50,000 | Low | 16.0 | 7.14 MAD | 43.77 MAD | Transactional / Professional Tool | `/calculators/ductulator` | 1 |
| `btu calculator` | 50,000 | Low | 21.0 | 1.62 MAD | 21.82 MAD | Commercial / Heat Load Sizing | `/calculators/btu-calculator` | 2 |
| `btu estimator` | 50,000 | Low | 21.0 | 1.62 MAD | 21.82 MAD | Commercial / Pre-Purchase | `/calculators/btu-calculator` | 2 |
| `british thermal unit calculator` | 50,000 | Low | 21.0 | 1.62 MAD | 21.82 MAD | Informational / Thermal Conversion | `/calculators/btu-calculator` | 2 |
| `r value for insulation` | 50,000 | Low | 31.0 | 0.29 MAD | 17.33 MAD | Informational / Energy Code | `/calculators/r-value-calculator` | 3 |
| `btus ac` | 50,000 | High | 100.0 | 1.03 MAD | 11.16 MAD | Commercial / AC Sizing | `/calculators/ac-tonnage-calculator` | 2 |
| `how to find ac tonnage` | 5,000 | Low | 0.0 | 7.81 MAD | 97.41 MAD | High Commercial / Nameplate Decoder | `/calculators/ac-model-decoder` | 1 |
| `how to find tonnage of ac unit` | 5,000 | Low | 0.0 | 7.81 MAD | 97.41 MAD | High Commercial / Replacement Quotes | `/calculators/ac-model-decoder` | 1 |
| `aircon capacity` | 5,000 | Low | 17.0 | 1.41 MAD | 90.75 MAD | Commercial / International Sizing | `/calculators/ac-tonnage-calculator` | 2 |
| `hvac ductwork sizing chart` | 5,000 | Low | 3.0 | 17.40 MAD | 76.87 MAD | Navigational / Sizing Reference | `/calculators/flex-duct-cfm-chart` | 1 |
| `duct sizing chart` | 5,000 | Low | 3.0 | 12.88 MAD | 64.37 MAD | Navigational / Sizing Reference | `/calculators/ductulator` | 1 |
| `flex duct cfm chart` | 5,000 | Low | 2.0 | 13.13 MAD | 61.73 MAD | Navigational / Flex Friction Lookup | `/calculators/flex-duct-cfm-chart` | 1 |
| `cfm chart for duct` | 5,000 | Low | 2.0 | 19.38 MAD | 60.74 MAD | Navigational / Airflow Lookup | `/calculators/cfm-calculator` | 1 |
| `hvac load calculator` | 5,000 | Low | 21.0 | 9.95 MAD | 52.59 MAD | Investigative / Manual J Screening | `/calculators/btu-calculator` | 2 |
| `mcquay duct sizer` | 5,000 | Low | 3.0 | 10.04 MAD | 50.88 MAD | Brand Alternative / Legacy Software | `/calculators/ductulator` | 1 |
| `duct sizing chart cfm` | 5,000 | Low | 5.0 | 14.23 MAD | 50.52 MAD | Navigational / Duct Cross-Section | `/calculators/ductulator` | 1 |
| `subcooling calculator` | 5,000 | Low | 1.0 | 14.88 MAD | 49.31 MAD | Field Diagnostic / TXV Service | `/calculators/superheat-subcooling-calculator` | 1 |
| `air duct cfm calculator` | 5,000 | Low | 4.0 | 12.64 MAD | 47.17 MAD | Technical / Velocity & Area | `/calculators/cfm-calculator` | 1 |
| `duct sizer` | 5,000 | Low | 5.0 | 10.31 MAD | 45.82 MAD | Transactional / Online Utility | `/calculators/ductulator` | 1 |
| `air duct design calculator` | 5,000 | Low | 4.0 | 9.82 MAD | 43.76 MAD | Engineering / Supply Trunk Sizing | `/calculators/ductulator` | 1 |
| `cfm calculator hvac` | 5,000 | Low | 1.0 | 11.91 MAD | 43.38 MAD | Technical / Sensible Heat Formula | `/calculators/cfm-calculator` | 1 |
| `furnace size calculator` | 5,000 | Low | 11.0 | 8.81 MAD | 42.30 MAD | Commercial / Heating Replacement | `/calculators/furnace-size-calculator` | 2 |
| `mini split sizing calculator` | 5,000 | Low | 31.0 | 4.28 MAD | 42.30 MAD | Commercial / Multi-Zone Sizing | `/calculators/mini-split-sizing` | 2 |
| `heat pump size calculator` | 5,000 | Medium | 45.0 | 7.14 MAD | 42.30 MAD | Commercial / Electrification Sizing | `/calculators/heat-pump-size-calculator` | 2 |
| `aircon cooling capacity` | 5,000 | Low | 23.0 | 0.91 MAD | 41.79 MAD | Commercial / Cooling Load | `/calculators/ac-tonnage-calculator` | 2 |
| `duct sizing calculator` | 5,000 | Low | 2.0 | 6.79 MAD | 40.82 MAD | Transactional / Equal Friction | `/calculators/ductulator` | 1 |
| `heat pump sizing` | 5,000 | High | 90.0 | 8.51 MAD | 39.57 MAD | Commercial / Upgrade Planning | `/calculators/heat-pump-size-calculator` | 2 |
| `heat loss calculator` | 5,000 | Low | 27.0 | 2.85 MAD | 39.11 MAD | Technical / Envelope & Infiltration | `/calculators/heat-loss-calculator` | 3 |
| `superheat calculator` | 5,000 | Low | 1.0 | 11.73 MAD | 32.89 MAD | Field Diagnostic / Fixed Orifice | `/calculators/superheat-subcooling-calculator` | 1 |
| `psychrometric calculator` | 5,000 | Low | 2.0 | 5.77 MAD | 21.48 MAD | Engineering / Psychrometrics | `/calculators/psychrometric-calculator` | 3 |
| `garage heater sizing calculator` | 5,000 | Low | 2.0 | — | 22.70 MAD | Commercial / Shop Heating | `/calculators/garage-heater-sizing` | 3 |
| `kitchen hood cfm calculator` | 5,000 | Medium | 57.0 | — | 27.20 MAD | Commercial / Code Compliance | `/calculators/kitchen-hood-cfm` | 3 |
| `boiler size calculator` | 5,000 | Low | 33.5 | — | 88.14 MAD | High Commercial / Hydronics | `/calculators/boiler-size-calculator` | 3 |
