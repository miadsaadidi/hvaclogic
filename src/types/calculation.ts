export type UnitSystem = "imperial" | "metric";

export type PillarId =
  | "airflow-ducts"
  | "cooling-loads"
  | "field-diagnostics"
  | "heating-systems"
  | "building-science";

export type CalculatorStatus =
  | "planned"
  | "engineering-review"
  | "development"
  | "validation"
  | "beta"
  | "production";

export type StandardId =
  | "ASHRAE"
  | "ACCA"
  | "SMACNA"
  | "EPA"
  | "AHRI"
  | "IRC"
  | "IECC"
  | "DOE"
  | "NIST"
  | "HVI"
  | "NFPA"
  | "IFGC";

export interface SchemaFAQ {
  question: string;
  answer: string;
}

export interface HowToStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip?: string;
}

export interface FormulaVariable {
  symbol: string;
  label: string;
  description: string;
  unit: string;
}

export interface CalculatorMeta {
  id: string;
  name: string;
  pillar: PillarId;
  route: string;
  status: CalculatorStatus;
  launchPhase: 1 | 2 | 3;
  riskLevel: "low" | "medium" | "high";

  primaryKeyword: string;
  secondaryKeywords: string[];
  primaryIntent: string;

  seoTitle: string;
  metaDescription: string;

  categoryName: string;
  categoryRoute: string;

  features: string[];
  relatedCalculatorIds: string[];
  standards: StandardId[];

  formulaVersion: string;
  dataVersion: string;
  lastEngineeringReview: string;

  requiresReferenceDataset: boolean;
  offlineEligible: boolean;
  testStatus: "not-started" | "partial" | "validated";

  faqs: SchemaFAQ[];
  howToSteps?: HowToStep[];
  analyticsEvents: string[];
}

