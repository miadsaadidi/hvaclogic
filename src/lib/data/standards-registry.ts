/**
 * HVACLogic.org Centralized Standards & Regulatory Registry
 * Version 3.0 — Master Governance Architecture
 * Author: Miad S.
 */

export interface StandardRegistryEntry {
  id: string;
  name: string;
  editionYear: number;
  publisher: "ASHRAE" | "ACCA" | "AHRI" | "SMACNA" | "ICC" | "NFPA" | "EPA" | "DOE" | "NIST";
  subject: string;
  legalStatus: "Federal Regulation" | "Adopted Code Baseline" | "Model Code" | "Consensus Standard" | "Industry Methodology" | "Scientific Benchmark";
  applicableCalculators: string[];
  officialSourceUrl: string;
  effectiveDate: string;
  supersededBy?: string;
  jurisdictionScope: "Federal (US)" | "Model (State Adopted)" | "International" | "Scientific";
  regulatoryIncorporationStatus: string;
  responsibleAuthor: "Miad S.";
  technicalReviewer?: string;
  lastVerifiedDate: string;
  nextReviewDate: string;
  changeNotes?: string;
}

export const standardsRegistry: StandardRegistryEntry[] = [
  {
    id: "doe-10cfr430-m1",
    name: "DOE 10 CFR Part 430 Subpart B Appendix M1",
    editionYear: 2023,
    publisher: "DOE",
    subject: "Uniform Test Method for Central Air Conditioners and Heat Pumps (SEER2, EER2, HSPF2)",
    legalStatus: "Federal Regulation",
    applicableCalculators: ["heat-pump-size-calculator", "ac-tonnage-calculator", "heat-pump-balance-point"],
    officialSourceUrl: "https://www.ecfr.gov/current/title-10/chapter-II/subchapter-D/part-430/subpart-B/appendix-Appendix-M1-to-Subpart-B-of-Part-430",
    effectiveDate: "2023-01-01",
    jurisdictionScope: "Federal (US)",
    regulatoryIncorporationStatus: "Directly enforceable federal regulation across all 50 states",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19",
    changeNotes: "Mandates 0.50 in. wg external static pressure test baseline for SEER2/HSPF2."
  },
  {
    id: "epa-aim-act-2024",
    name: "EPA AIM Act 40 CFR Part 84 Technology Transitions",
    editionYear: 2024,
    publisher: "EPA",
    subject: "HFC Phasedown & GWP Limits (<700 GWP) for Stationary Residential/Light Commercial AC",
    legalStatus: "Federal Regulation",
    applicableCalculators: ["refrigerant-charge-calculator"],
    officialSourceUrl: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-84/subpart-B",
    effectiveDate: "2025-01-01",
    jurisdictionScope: "Federal (US)",
    regulatoryIncorporationStatus: "Directly enforceable federal environmental regulation",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19",
    changeNotes: "Manufacture/import ban Jan 1, 2025; installation sell-through to Jan 1, 2026 for residential AC."
  },
  {
    id: "epa-caa-sec608",
    name: "EPA Clean Air Act Section 608 (40 CFR Part 82 Subpart F)",
    editionYear: 2024,
    publisher: "EPA",
    subject: "National Refrigerant Recycling, Leak Rate Thresholds, and Recovery Rules",
    legalStatus: "Federal Regulation",
    applicableCalculators: ["refrigerant-charge-calculator"],
    officialSourceUrl: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-C/part-82/subpart-F",
    effectiveDate: "1992-07-01",
    jurisdictionScope: "Federal (US)",
    regulatoryIncorporationStatus: "Directly enforceable federal regulation",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "ashrae-fund-2021",
    name: "ASHRAE Handbook — Fundamentals",
    editionYear: 2021,
    publisher: "ASHRAE",
    subject: "Psychrometrics, Duct Aerodynamics, Building Heat Transmission",
    legalStatus: "Consensus Standard",
    applicableCalculators: ["ductulator", "cfm-calculator", "heat-loss-calculator", "r-value-calculator"],
    officialSourceUrl: "https://www.ashrae.org/technical-resources/ashrae-handbook",
    effectiveDate: "2021-06-01",
    jurisdictionScope: "International",
    regulatoryIncorporationStatus: "Baseline engineering reference cited in model codes and state mechanical regulations",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "ashrae-std-15-2022",
    name: "ANSI/ASHRAE Standard 15-2022",
    editionYear: 2022,
    publisher: "ASHRAE",
    subject: "Safety Standard for Refrigeration Systems (A2L Refrigerant Charge Boundaries)",
    legalStatus: "Consensus Standard",
    applicableCalculators: ["refrigerant-charge-calculator"],
    officialSourceUrl: "https://www.ashrae.org/technical-resources/standards-and-guidelines",
    effectiveDate: "2022-12-01",
    jurisdictionScope: "Model (State Adopted)",
    regulatoryIncorporationStatus: "Enforceable when referenced by adopted mechanical codes (IMC Chapter 11)",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "ashrae-std-34-2022",
    name: "ANSI/ASHRAE Standard 34-2022",
    editionYear: 2022,
    publisher: "ASHRAE",
    subject: "Designation and Safety Classification of Refrigerants (Toxicity & Flammability)",
    legalStatus: "Consensus Standard",
    applicableCalculators: ["refrigerant-charge-calculator"],
    officialSourceUrl: "https://www.ashrae.org/technical-resources/standards-and-guidelines",
    effectiveDate: "2022-12-01",
    jurisdictionScope: "International",
    regulatoryIncorporationStatus: "Referenced by EPA AIM Act regulations and IMC model codes",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "ashrae-std-62-1-2022",
    name: "ANSI/ASHRAE Standard 62.1-2022",
    editionYear: 2022,
    publisher: "ASHRAE",
    subject: "Ventilation for Acceptable Indoor Air Quality (Commercial & Institutional)",
    legalStatus: "Consensus Standard",
    applicableCalculators: ["cfm-calculator", "kitchen-hood-cfm"],
    officialSourceUrl: "https://www.ashrae.org/technical-resources/standards-and-guidelines",
    effectiveDate: "2022-12-01",
    jurisdictionScope: "Model (State Adopted)",
    regulatoryIncorporationStatus: "Enforceable via IMC Section 403 where adopted by local jurisdiction",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "ashrae-std-62-2-2022",
    name: "ANSI/ASHRAE Standard 62.2-2022",
    editionYear: 2022,
    publisher: "ASHRAE",
    subject: "Ventilation and Acceptable Indoor Air Quality in Residential Buildings",
    legalStatus: "Consensus Standard",
    applicableCalculators: ["cfm-calculator", "kitchen-hood-cfm"],
    officialSourceUrl: "https://www.ashrae.org/technical-resources/standards-and-guidelines",
    effectiveDate: "2022-12-01",
    jurisdictionScope: "Model (State Adopted)",
    regulatoryIncorporationStatus: "Referenced by IRC and state residential energy/ventilation codes",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "acca-manual-j-8th",
    name: "ANSI/ACCA 2 Manual J (8th Edition, v2.50)",
    editionYear: 2016,
    publisher: "ACCA",
    subject: "Residential Load Calculation (Room-by-room sensible and latent heat loads)",
    legalStatus: "Industry Methodology",
    applicableCalculators: ["heat-loss-calculator", "furnace-size-calculator", "ac-tonnage-calculator"],
    officialSourceUrl: "https://www.acca.org/standards/technical-manuals/manual-j",
    effectiveDate: "2016-01-01",
    jurisdictionScope: "Model (State Adopted)",
    regulatoryIncorporationStatus: "Mandated in IRC Section M1401.3 and IECC R403.7 in adopting jurisdictions",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "acca-manual-d-3rd",
    name: "ANSI/ACCA 1 Manual D (3rd Edition, v1.00)",
    editionYear: 2014,
    publisher: "ACCA",
    subject: "Residential Duct Systems (Available Static Pressure, Equivalent Length, Friction Rate)",
    legalStatus: "Industry Methodology",
    applicableCalculators: ["ductulator", "flex-duct-cfm-chart", "duct-friction-loss-calculator"],
    officialSourceUrl: "https://www.acca.org/standards/technical-manuals/manual-d",
    effectiveDate: "2014-01-01",
    jurisdictionScope: "Model (State Adopted)",
    regulatoryIncorporationStatus: "Mandated in IRC Section M1601.1 where adopted",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "acca-manual-s-2nd",
    name: "ANSI/ACCA 3 Manual S (2nd Edition)",
    editionYear: 2014,
    publisher: "ACCA",
    subject: "Residential Equipment Selection & Sizing Limits",
    legalStatus: "Industry Methodology",
    applicableCalculators: ["ac-tonnage-calculator", "heat-pump-size-calculator", "furnace-size-calculator"],
    officialSourceUrl: "https://www.acca.org/standards/technical-manuals/manual-s",
    effectiveDate: "2014-01-01",
    jurisdictionScope: "Model (State Adopted)",
    regulatoryIncorporationStatus: "Mandated in IRC Section M1401.3 where adopted",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "ahri-210-240-2023",
    name: "ANSI/AHRI Standard 210/240-2023",
    editionYear: 2023,
    publisher: "AHRI",
    subject: "Performance Rating of Unitary Air-Conditioning & Air-Source Heat Pump Equipment",
    legalStatus: "Industry Methodology",
    applicableCalculators: ["heat-pump-size-calculator", "ac-tonnage-calculator"],
    officialSourceUrl: "https://www.ahrinet.org/standards/search-standards",
    effectiveDate: "2023-01-01",
    jurisdictionScope: "Scientific",
    regulatoryIncorporationStatus: "Referenced by DOE Appendix M1 test procedures",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "smacna-duct-2020",
    name: "SMACNA HVAC Duct Construction Standards (4th Edition)",
    editionYear: 2020,
    publisher: "SMACNA",
    subject: "Sheet Metal & Flexible Duct Construction, Pressure Classes, Sheet Gauges",
    legalStatus: "Industry Methodology",
    applicableCalculators: ["ductulator", "duct-friction-loss-calculator"],
    officialSourceUrl: "https://www.smacna.org",
    effectiveDate: "2020-01-01",
    jurisdictionScope: "Model (State Adopted)",
    regulatoryIncorporationStatus: "Referenced in IMC Section 603 in adopting jurisdictions",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "nfpa-54-2024",
    name: "NFPA 54 / ANSI Z223.1 National Fuel Gas Code",
    editionYear: 2024,
    publisher: "NFPA",
    subject: "Gas Piping Sizing, Appliance Venting, and Combustion Air Openings",
    legalStatus: "Model Code",
    applicableCalculators: ["combustion-air-calculator", "furnace-size-calculator", "boiler-size-calculator"],
    officialSourceUrl: "https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=54",
    effectiveDate: "2024-01-01",
    jurisdictionScope: "Model (State Adopted)",
    regulatoryIncorporationStatus: "Adopted as mechanical/fuel gas code in numerous US states and municipalities",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  },
  {
    id: "nist-refprop-v10",
    name: "NIST Standard Reference Database 23 (REFPROP v10.0)",
    editionYear: 2018,
    publisher: "NIST",
    subject: "Thermodynamic and Transport Properties of Refrigerants and Fluid Mixtures",
    legalStatus: "Scientific Benchmark",
    applicableCalculators: ["refrigerant-charge-calculator"],
    officialSourceUrl: "https://www.nist.gov/srd/refprop",
    effectiveDate: "2018-05-01",
    jurisdictionScope: "Scientific",
    regulatoryIncorporationStatus: "Peer-reviewed international standard for thermodynamic state property calculations",
    responsibleAuthor: "Miad S.",
    lastVerifiedDate: "2026-08-19",
    nextReviewDate: "2026-11-19"
  }
];
