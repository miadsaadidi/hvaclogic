# HVACLogic Internal Link Architecture & Graph Map

**Domain**: [https://hvaclogic.org/](https://hvaclogic.org/)  
**Document Version**: 2.2.0 (Phase 2 Implemented Graph)  
**Last Updated**: 2026-09-16  
**Operational Status**: ACTIVE / AUTHORITATIVE LINK GRAPH  

---

## 1. Architectural Link Graph Structure

HVACLogic's link distribution graph connects 5 Pillar Hubs, 21 production calculators, 9 research monographs (7 canonical + 2 lab manuals), 6 benchmark datasets, and 10 governance hubs into a deterministic radial mesh.

```
                           ┌───────────────────────────┐
                           │    Root (Homepage /)      │
                           └─────────────┬─────────────┘
                                         │
            ┌────────────────────────────┼────────────────────────────┐
            ▼                            ▼                            ▼
 ┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
 │  5 Core Pillar Hubs  │◄───►│ Calculators Directory│◄───►│ Research Papers Hub  │
 │  (/airflow-ducts...) │     │    (/calculators)    │     │     (/research)      │
 └──────────┬───────────┘     └──────────┬───────────┘     └──────────┬───────────┘
            │                            │                            │
            ├────────────────────────────┼────────────────────────────┤
            ▼                            ▼                            ▼
 ┌────────────────────────────────────────────────────────────────────────────────┐
 │                      21 Production Calculator Nodes (Mesh)                     │
 └───────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
 ┌────────────────────────────────────────────────────────────────────────────────┐
 │               9 Research Monographs & 6 Open Benchmark Datasets                │
 └────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Link Implementation Status: High-Value Bridges

| Bridge ID | Target Assets | Functional Utility | Status |
| :--- | :--- | :--- | :--- |
| **BR-01: Climatic Data Integration** | `/ashrae-climatic-data` $\longleftrightarrow$ `btu-calculator`, `heat-loss-calculator`, `heat-pump-size-calculator` | Provides direct bidirectional links between 99% / 0.4% meteorological lookup and downstream load/balance-point calculators. | **Implemented & Validated** |
| **BR-02: Scientific Research Badges** | All supported calculators $\longrightarrow$ `/research/[slug]` | Surfaces genuine backing research monographs with report numbers, verified DOIs, and author attribution. | **Implemented & Validated** |
| **BR-03: Interactive OER Lab Courseware** | `ductulator`, `duct-friction-loss-calculator`, `heat-pump-size-calculator`, `btu-calculator`, `r-value-calculator` $\longrightarrow$ `/oer-modules/*.html` | Links calculation tools to interactive HTML5 simulation labs for engineering education. | **Implemented & Validated** |
| **BR-04: Open Benchmark Datasets & Landing Pages** | `psychrometric-calculator`, `refrigerant-charge-calculator`, `heat-pump-size-calculator`, `btu-calculator`, `combustion-air-calculator`, `kitchen-hood-cfm` $\longleftrightarrow$ `/datasets/[slug]` & `/datasets` | Triangular internal link graph connecting calculators, research papers, and dedicated on-site dataset landing pages with direct CSV/JSON downloads. | **Implemented & Validated (Phase 5)** |
| **BR-05: Standards & Sources Hub Links** | `/sources` & `/standards` $\longleftrightarrow$ 5 Pillar Hubs & `/research` | Direct navigational and contextual links connecting governance hubs to computation engines. | **Implemented & Validated** |
| **BR-06: Unified Related Tools Mesh** | All 21 Calculators | Replaced fragmented hardcoded sections with dynamic `RelatedCalculatorsGrid` reading verified workflow connections. | **Implemented & Validated** |
| **BR-07: Engineering Guide Contextual Bridges** | `/guides` $\longleftrightarrow$ Companion Calculators, Research Monographs & Benchmark Datasets | Contextual, in-prose, and card-level links connecting 5 live engineering master guides and 3 pipeline guides to their governing research papers, benchmark datasets, and calculation engines. | **Implemented & Validated (Final Program)** |

---

## 3. Master Hub-to-Calculator & Peer Mesh Architecture

### 3.1 Pillar Hubs $\longleftrightarrow$ Calculator Nodes (21 Total)
- `/airflow-ducts` $\longleftrightarrow$ `ductulator`, `flex-duct-cfm-chart`, `cfm-calculator`, `kitchen-hood-cfm`, `duct-friction-loss-calculator`, `filter-sizing-calculator`.
- `/cooling-loads` $\longleftrightarrow$ `btu-calculator`, `ac-tonnage-calculator`, `ac-model-decoder`, `mini-split-sizing`.
- `/field-diagnostics` $\longleftrightarrow$ `superheat-subcooling-calculator`, `pt-chart`, `psychrometric-calculator`, `refrigerant-charge-calculator`.
- `/heating-systems` $\longleftrightarrow$ `heat-pump-size-calculator`, `furnace-size-calculator`, `boiler-size-calculator`, `garage-heater-sizing`, `combustion-air-calculator`.
- `/building-science` $\longleftrightarrow$ `heat-loss-calculator`, `r-value-calculator`.

### 3.2 Horizontal Companion Workflow Connections (Calculator-to-Calculator)
- `ductulator` $\longleftrightarrow$ `flex-duct-cfm-chart`, `duct-friction-loss-calculator`, `cfm-calculator`, `filter-sizing-calculator`.
- `cfm-calculator` $\longleftrightarrow$ `ductulator`, `btu-calculator`, `kitchen-hood-cfm`, `filter-sizing-calculator`.
- `duct-friction-loss-calculator` $\longleftrightarrow$ `ductulator`, `filter-sizing-calculator`, `flex-duct-cfm-chart`, `cfm-calculator`.
- `btu-calculator` $\longleftrightarrow$ `heat-loss-calculator`, `ac-tonnage-calculator`, `mini-split-sizing`, `cfm-calculator`.
- `ac-tonnage-calculator` $\longleftrightarrow$ `btu-calculator`, `ac-model-decoder`, `mini-split-sizing`, `heat-pump-size-calculator`.
- `superheat-subcooling-calculator` $\longleftrightarrow$ `pt-chart`, `refrigerant-charge-calculator`, `psychrometric-calculator`.
- `refrigerant-charge-calculator` $\longleftrightarrow$ `superheat-subcooling-calculator`, `pt-chart`, `ac-model-decoder`.
- `heat-pump-size-calculator` $\longleftrightarrow$ `heat-loss-calculator`, `furnace-size-calculator`, `btu-calculator`, `ac-tonnage-calculator`.
- `furnace-size-calculator` $\longleftrightarrow$ `heat-loss-calculator`, `heat-pump-size-calculator`, `combustion-air-calculator`, `boiler-size-calculator`.
- `heat-loss-calculator` $\longleftrightarrow$ `btu-calculator`, `r-value-calculator`, `heat-pump-size-calculator`, `furnace-size-calculator`.
- `r-value-calculator` $\longleftrightarrow$ `heat-loss-calculator`, `btu-calculator`, `garage-heater-sizing`.

### 3.3 Vertical Authority Bridges (Calculators $\longleftrightarrow$ Genuine Research Monographs & Datasets)
- `ductulator` $\longleftrightarrow$ `/research/non-linear-duct-friction-loss-fitting-penalties` + `/oer-modules/duct-aerodynamics-lab.html`.
- `duct-friction-loss-calculator` $\longleftrightarrow$ `/research/non-linear-duct-friction-loss-fitting-penalties` + `/oer-modules/duct-aerodynamics-lab.html`.
- `pt-chart` $\longleftrightarrow$ `/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b`.
- `superheat-subcooling-calculator` $\longleftrightarrow$ `/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b`.
- `psychrometric-calculator` $\longleftrightarrow$ `/research/ashrae-hyland-wexler-moist-air-psychrometrics` + `/datasets/ashrae-hyland-wexler-psychrometric-benchmark`.
- `refrigerant-charge-calculator` $\longleftrightarrow$ `/research/deterministic-vapor-compression-refrigerant-mass-sizing` + `/datasets/refrigerant-mass-charge-low-gwp`.
- `heat-pump-size-calculator` $\longleftrightarrow$ `/research/cold-climate-heat-pump-balance-point-lab` + `/oer-modules/heat-pump-balance-point-lab.html` + `/datasets/cold-climate-heat-pump-cop-derating`.
- `heat-loss-calculator` $\longleftrightarrow$ `/research/thermal-envelope-infiltration-building-heat-loss`.
- `btu-calculator` $\longleftrightarrow$ `/research/student-lab-building-envelope-thermal-transmission` + `/oer-modules/building-envelope-thermal-transmission-lab.html`.
- `r-value-calculator` $\longleftrightarrow$ `/research/student-lab-building-envelope-thermal-transmission` + `/oer-modules/building-envelope-thermal-transmission-lab.html` + `/datasets/building-envelope-thermal-transmission`.
- `cfm-calculator`, `kitchen-hood-cfm`, `combustion-air-calculator` $\longleftrightarrow$ `/research/effective-dilution-iaq-ventilation-mass-balance` + `/datasets/combustion-air-confined-space` + `/datasets/kitchen-hood-exhaust-makeup-air`.
- `furnace-size-calculator` $\longleftrightarrow$ `/research/thermal-envelope-infiltration-building-heat-loss`.

### 3.4 Engineering Guides Triangulation Mesh
- `/guides/air-distribution-duct-hydraulics` $\longleftrightarrow$ `ductulator`, `flex-duct-cfm-chart`, `duct-friction-loss-calculator` + `/research/non-linear-duct-friction-loss-fitting-penalties`.
- `/guides/cooling-load-manual-j-s-sizing` $\longleftrightarrow$ `btu-calculator`, `ac-tonnage-calculator`, `ac-model-decoder` + `/research/thermal-envelope-infiltration-building-heat-loss` + `/datasets/building-envelope-thermal-transmission`.
- `/guides/heating-systems-heat-pumps-electrification` $\longleftrightarrow$ `heat-pump-size-calculator`, `furnace-size-calculator`, `boiler-size-calculator` + `/research/vapor-compression-kinetics-heat-pump-derating` + `/datasets/cold-climate-heat-pump-cop-derating`.
- `/guides/field-diagnostics-a2l-refrigerant-transition` $\longleftrightarrow$ `superheat-subcooling-calculator`, `pt-chart`, `refrigerant-charge-calculator` + `/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b` + `/datasets/refrigerant-mass-charge-low-gwp`.
- `/guides/psychrometrics-building-envelope-physics` $\longleftrightarrow$ `psychrometric-calculator`, `r-value-calculator`, `heat-loss-calculator` + `/research/ashrae-hyland-wexler-moist-air-psychrometrics` + `/datasets/ashrae-hyland-wexler-psychrometric-benchmark`.
- `/guides/ventilation-makeup-air-depressurization` $\longleftrightarrow$ `kitchen-hood-cfm`, `combustion-air-calculator`, `cfm-calculator` + `/research/effective-dilution-iaq-ventilation-mass-balance` + `/datasets/kitchen-hood-exhaust-makeup-air`.
- `/guides/filtration-hydraulics-iaq-static-pressure` $\longleftrightarrow$ `filter-sizing-calculator`, `ductulator`, `cfm-calculator` + `/research/non-linear-duct-friction-loss-fitting-penalties`.
- `/guides/multi-split-vrf-diversity-sizing` $\longleftrightarrow$ `mini-split-sizing`, `heat-pump-size-calculator`, `btu-calculator` + `/research/vapor-compression-kinetics-heat-pump-derating` + `/datasets/cold-climate-heat-pump-cop-derating`.

---

## 4. Embed Widget Distribution & Canonical Governance

### 4.1 Embed Architecture
- **Route Namespace**: `/embed/[slug]` (All 21 production calculation tools).
- **Robots Directive**: `noindex, nofollow` (Disallowed in `robots.ts` and marked with `robots: { index: false, follow: false }` metadata).
- **Canonical Policy**: All embed routes declare explicit canonical tags pointing directly to their parent calculator URL (`https://hvaclogic.org/calculators/[slug]`).
- **Attribution & Peer Sharing**: Standard embed iframe includes contextual attribution linking back to the verified calculation tool, ensuring zero artificial link schemes or duplicate indexation bleed.
- **Privacy & Security**: 100% client-side physics, zero trackers, zero external scripts, and sandboxed iframe capability.


