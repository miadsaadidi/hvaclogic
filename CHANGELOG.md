# Changelog

All notable changes to the `HVACLogic` framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-08-31

### Added
- **Core Mathematical Engine (`src/lib/math/`)**:
  - `ductulator.ts`: Colebrook-White friction factor via Newton-Raphson iteration, Huebscher equivalent rectangular diameters, and RP-1333 flexible duct sag/compression derating.
  - `refrigerants.ts`: Dual-curve zeotropic A2L saturation polynomials for R-454B, R-32, R-410A bubble/dew points cross-validated with NIST REFPROP 10.
  - `cooling-load.ts`: ACCA Manual J/S residential cooling & heating load models and envelope heat transfer.
  - `psychrometrics.ts`: Hyland-Wexler water vapor saturation and moist air property formulations.
- **21 Production Interactive Calculators**:
  - Airflow & Ducts: `ductulator`, `cfm-calculator`, `flex-duct-cfm-chart`, `duct-friction-loss-calculator`, `filter-sizing-calculator`, `kitchen-hood-cfm`.
  - Cooling Loads: `ac-tonnage-calculator`, `btu-calculator`, `mini-split-sizing`, `ac-model-decoder`.
  - Field Diagnostics: `superheat-subcooling-calculator`, `pt-chart`, `refrigerant-charge-calculator`.
  - Heating Systems: `heat-pump-size-calculator`, `furnace-size-calculator`, `boiler-size-calculator`, `garage-heater-sizing`, `combustion-air-calculator`.
  - Building Science: `heat-loss-calculator`, `psychrometric-calculator`, `r-value-calculator`.
- **5 Comprehensive Pillar Architecture Guides**:
  - `/airflow-ducts`, `/cooling-loads`, `/field-diagnostics`, `/heating-systems`, `/building-science`.
- **Reactive UI & Visualization**:
  - Real-time animated vector/canvas visualizers for duct sections, refrigerant saturation curves, and psychrometric envelopes.
  - Bidirectional URL parameter state hydration (`?cfm=...&friction=...`).
  - Printable submittal job cards (`PrintJobSubmittal`) for engineering field documentation.
- **PWA & Offline Reliability**:
  - Service worker caching for 100% offline field execution.
- **Academic & Publication Assets**:
  - Peer-review article draft (`paper/paper.md`) conforming to JOSS, SoftwareX, and open-access standards.
  - Open science whitepaper (`papers/HVACLogic_Deterministic_Building_Science_Framework_2026.md`).
