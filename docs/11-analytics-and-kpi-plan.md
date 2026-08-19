# HVAC Lab — Analytics, Privacy-Preserving Event Tracking & KPI Plan

> **Document Status**: Approved  
> **Version**: 1.0.0  
> **Last Updated**: 2026-08-19  
> **Related Docs**: [07-master-seo-strategy.md](./07-master-seo-strategy.md), [10-implementation-roadmap.md](./10-implementation-roadmap.md), [12-quality-safety-accessibility.md](./12-quality-safety-accessibility.md)

---

## 1. Privacy-First Analytics Architecture

HVAC Lab implements a **privacy-preserving telemetry framework** designed to measure user engagement, calculation success, and workflow conversion without collecting personally identifiable information (PII) or sending private customer project dimensions/loads to external servers.

### Core Data Privacy Principles:
1. **Zero PII**: No names, emails, IP addresses, or exact street addresses are tracked in telemetry payloads.
2. **Aggregated Engineering Context**: Events track behavioral actions (e.g. `unit_changed` to `metric`, `preset_selected` = `gas_furnace`) rather than exact proprietary calculations.
3. **GDPR / CCPA Compliant**: Lightweight, cookie-free client-side event dispatching.

---

## 2. Master Telemetry Event Dictionary

| Event Name | Trigger Condition | Event Parameters | Privacy Guardrail |
| :--- | :--- | :--- | :--- |
| `calculator_viewed` | Page view of any calculator route. | `calculator_id`, `pillar`, `referrer` | No query strings containing project data. |
| `calculator_started` | User interacts with first input slider or field. | `calculator_id`, `input_mode` | Tracks initial engagement; no numeric values. |
| `result_generated` | First valid calculation output rendered. | `calculator_id`, `unit_system` (`ip` \| `si`), `time_to_first_result_ms` | Value bucketed into general tier (e.g. `<2T`, `2-4T`, `>4T`). |
| `result_changed` | User adjusts input producing new calculated output. | `calculator_id`, `interaction_type` (`slider` \| `stepper` \| `preset`) | Debounced to max 1 event per 5 seconds. |
| `unit_changed` | User toggles Imperial $\leftrightarrow$ Metric. | `from_unit`, `to_unit`, `calculator_id` | Tracks unit preference adoption. |
| `preset_selected` | User clicks a 1-click scenario chip. | `calculator_id`, `preset_id` (e.g. `3_ton_residential`) | Predefined enum only. |
| `validation_error` | User enters out-of-bounds or impossible input. | `calculator_id`, `error_code` (e.g. `wet_bulb_exceeds_dry_bulb`) | Categorical error code only. |
| `handoff_clicked` | User clicks cross-calculator workflow button. | `source_calculator`, `destination_calculator`, `handoff_type` | Tracks pipeline continuity (`BTU` $\to$ `CFM`). |
| `share_clicked` | User clicks "Share Calculation Link". | `calculator_id`, `share_method` (`clipboard` \| `native`) | No private payload data sent to server. |
| `print_exported` | User clicks "Print Job Submittal Sheet". | `calculator_id`, `unit_system` | Indicates high-intent field submittal. |
| `csv_exported` | User downloads CSV calculation dataset. | `calculator_id`, `export_format` (`csv` \| `json`) | Tracks engineering data export intent. |
| `embed_opened` | User opens the "Embed on Your Website" modal. | `calculator_id` | Tracks viral backlink interest. |
| `embed_copied` | User copies iframe embed code snippet. | `calculator_id`, `embed_type` (`responsive` \| `fixed`) | Direct leading indicator for organic backlinks. |
| `pwa_install_prompted` | Browser triggers PWA install prompt. | `platform` (`ios` \| `android` \| `desktop`) | Tracks PWA adoption funnel. |
| `pwa_installed` | User successfully installs HVAC Lab to home screen. | `platform` | Key retention milestone for field technicians. |
| `offline_session` | Calculator runs while device has no network connection. | `calculator_id`, `session_duration_s` | Logged locally and flushed upon reconnection. |
| `reference_opened` | User navigates to formula card or standard reference. | `reference_id` (e.g. `ashrae_fundamentals_ch1`) | Tracks educational & authority content usage. |

---

## 3. Four-Tier Key Performance Indicator (KPI) Framework

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. ORGANIC SEARCH & DISCOVERABILITY KPIS (Google Search Console / Analytics)           │
│ • Monthly Organic Impressions (Target: >500,000 within 6 months)                        │
│ • Monthly Organic Clicks & Sessions (Target: >50,000 monthly active users)             │
│ • Top-3 Keyword Rankings in Airflow & Diagnostic clusters (Target: 15+ keywords)       │
│ • Top-10 Keyword Rankings across all 33 core terms (Target: 25+ keywords)              │
│ • Validated Indexed Calculator URLs (Target: 100% of 17 tools indexed without errors)  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. PRODUCT ENGAGEMENT & FIELD UTILITY KPIS                                            │
│ • Calculation Completion Rate: >= 85% of users who adjust an input view a valid output.│
│ • 30-Day Repeat Technician Retention Rate: >= 25% (measuring bookmark & PWA habit).    │
│ • Cross-Calculator Handoff Rate: >= 12% (BTU -> CFM -> Ductulator workflow usage).     │
│ • PWA Home Screen Installations: >= 1,000 field technician installs.                  │
│ • Offline Usage Sessions: Active offline calculations in mechanical rooms/basements.   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. VIRAL AUTHORITY & BACKLINK KPIS                                                     │
│ • Total Referring Domains linking to hvaclab.org (Target: >100 trade/education domains)│
│ • Active Iframe Embeds on external trade school & contractor websites (Target: >50)    │
│ • Organic citations on engineering forums (HVAC-Talk, Reddit r/HVAC, Reddit r/HVACadvice│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. COMMERCIAL & LEAD CONVERSION KPIS (Future Phase)                                    │
│ • Model Decoder Replacement Click-Through Rate: >= 4.5% on high-ticket condenser decodes│
│ • Equipment Sizing Partner Quote Request Rate: >= 2.0% on furnace / heat pump tools.   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```
