/**
 * HVACLogic ANSI/ASHRAE Standard 241-2023 Computational Engine
 * Control of Infectious Aerosols - Equivalent Clean Airflow (ECA) Modeling
 * 
 * Normative references:
 * - ANSI/ASHRAE Standard 241-2023: Control of Infectious Aerosols
 *   - Section 5: Assessment and Planning (Infection Risk Management Mode - IRMM)
 *   - Table 5-1: Minimum Equivalent Clean Airflow per Person (ECA_p) and Floor Area (ECA_a)
 *   - Section 6: Equivalent Clean Airflow Rates and Air Cleaning Systems
 *   - Section 7: Testing, Operation, and Verification
 */

export type Ashrae241SpaceType =
  | "classroom_age_5_8"
  | "classroom_age_9_plus"
  | "office_general"
  | "conference_room"
  | "healthcare_patient_room"
  | "healthcare_exam_room"
  | "retail_general"
  | "restaurant_dining"
  | "fitness_gym"
  | "place_of_worship"
  | "residential_common";

export type Ashrae241MervRating =
  | "merv_8"
  | "merv_11"
  | "merv_13"
  | "merv_14"
  | "merv_15"
  | "merv_16_hepa";

export interface SpaceStandardConfig {
  id: Ashrae241SpaceType;
  label: string;
  category: "Educational" | "Commercial" | "Healthcare" | "Public Assembly" | "Residential";
  ecaP_Lps: number; // L/s per person
  ecaA_Lps_m2: number; // L/s per m²
  ecaP_Cfm: number; // CFM per person
  ecaA_Cfm_sqft: number; // CFM per sq ft
  defaultOccupancyDensityPer1000SqFt: number;
}

// 1 L/s = 2.11888 CFM; 1 L/s/m² = 0.19685 CFM/ft²
export const ASHRAE_241_TABLE_5_1: Record<Ashrae241SpaceType, SpaceStandardConfig> = {
  classroom_age_5_8: {
    id: "classroom_age_5_8",
    label: "Classroom (Ages 5–8)",
    category: "Educational",
    ecaP_Lps: 20,
    ecaA_Lps_m2: 0.6,
    ecaP_Cfm: 42.4,
    ecaA_Cfm_sqft: 0.12,
    defaultOccupancyDensityPer1000SqFt: 25,
  },
  classroom_age_9_plus: {
    id: "classroom_age_9_plus",
    label: "Classroom (Age 9+ & Lecture)",
    category: "Educational",
    ecaP_Lps: 20,
    ecaA_Lps_m2: 0.6,
    ecaP_Cfm: 42.4,
    ecaA_Cfm_sqft: 0.12,
    defaultOccupancyDensityPer1000SqFt: 35,
  },
  office_general: {
    id: "office_general",
    label: "General Office Space",
    category: "Commercial",
    ecaP_Lps: 15,
    ecaA_Lps_m2: 0.6,
    ecaP_Cfm: 31.8,
    ecaA_Cfm_sqft: 0.12,
    defaultOccupancyDensityPer1000SqFt: 5,
  },
  conference_room: {
    id: "conference_room",
    label: "Conference / Meeting Room",
    category: "Commercial",
    ecaP_Lps: 15,
    ecaA_Lps_m2: 0.8,
    ecaP_Cfm: 31.8,
    ecaA_Cfm_sqft: 0.16,
    defaultOccupancyDensityPer1000SqFt: 50,
  },
  healthcare_patient_room: {
    id: "healthcare_patient_room",
    label: "Healthcare Patient Room",
    category: "Healthcare",
    ecaP_Lps: 25,
    ecaA_Lps_m2: 1.0,
    ecaP_Cfm: 53.0,
    ecaA_Cfm_sqft: 0.20,
    defaultOccupancyDensityPer1000SqFt: 4,
  },
  healthcare_exam_room: {
    id: "healthcare_exam_room",
    label: "Outpatient Exam Room",
    category: "Healthcare",
    ecaP_Lps: 25,
    ecaA_Lps_m2: 1.0,
    ecaP_Cfm: 53.0,
    ecaA_Cfm_sqft: 0.20,
    defaultOccupancyDensityPer1000SqFt: 10,
  },
  retail_general: {
    id: "retail_general",
    label: "Retail & Department Store",
    category: "Commercial",
    ecaP_Lps: 15,
    ecaA_Lps_m2: 0.6,
    ecaP_Cfm: 31.8,
    ecaA_Cfm_sqft: 0.12,
    defaultOccupancyDensityPer1000SqFt: 15,
  },
  restaurant_dining: {
    id: "restaurant_dining",
    label: "Restaurant Dining Area",
    category: "Public Assembly",
    ecaP_Lps: 20,
    ecaA_Lps_m2: 0.9,
    ecaP_Cfm: 42.4,
    ecaA_Cfm_sqft: 0.18,
    defaultOccupancyDensityPer1000SqFt: 70,
  },
  fitness_gym: {
    id: "fitness_gym",
    label: "Fitness Center / Aerobics Gym",
    category: "Public Assembly",
    ecaP_Lps: 30,
    ecaA_Lps_m2: 1.5,
    ecaP_Cfm: 63.6,
    ecaA_Cfm_sqft: 0.30,
    defaultOccupancyDensityPer1000SqFt: 40,
  },
  place_of_worship: {
    id: "place_of_worship",
    label: "Place of Worship / Sanctuary",
    category: "Public Assembly",
    ecaP_Lps: 15,
    ecaA_Lps_m2: 0.6,
    ecaP_Cfm: 31.8,
    ecaA_Cfm_sqft: 0.12,
    defaultOccupancyDensityPer1000SqFt: 100,
  },
  residential_common: {
    id: "residential_common",
    label: "Residential Common Areas",
    category: "Residential",
    ecaP_Lps: 10,
    ecaA_Lps_m2: 0.5,
    ecaP_Cfm: 21.2,
    ecaA_Cfm_sqft: 0.10,
    defaultOccupancyDensityPer1000SqFt: 10,
  },
};

/**
 * Single-pass bioaerosol droplet nuclei (1 to 3 µm) removal efficiency
 * Based on ASHRAE 52.2 particle size efficiency curve and ASHRAE 241 Appendix A.
 */
export const BIOAEROSOL_FILTER_EFFICIENCIES: Record<
  Ashrae241MervRating,
  { label: string; efficiency: number; description: string }
> = {
  merv_8: {
    label: "MERV 8",
    efficiency: 0.20,
    description: "Coarse pre-filter capture; ~20% infectious aerosol removal.",
  },
  merv_11: {
    label: "MERV 11",
    efficiency: 0.50,
    description: "Enhanced media; ~50% infectious bioaerosol droplet nuclei removal.",
  },
  merv_13: {
    label: "MERV 13",
    efficiency: 0.85,
    description: "ASHRAE 241 minimum baseline; ~85% droplet nuclei capture.",
  },
  merv_14: {
    label: "MERV 14",
    efficiency: 0.90,
    description: "High-performance commercial media; ~90% bioaerosol removal.",
  },
  merv_15: {
    label: "MERV 15",
    efficiency: 0.95,
    description: "Hospital-grade secondary filter; ~95% bioaerosol removal.",
  },
  merv_16_hepa: {
    label: "MERV 16 / HEPA",
    efficiency: 0.9997,
    description: "True HEPA filtration; ≥99.97% pathogen removal efficiency.",
  },
};

export interface Ashrae241Input {
  spaceType: Ashrae241SpaceType;
  floorAreaSqFt: number;
  occupants: number;
  ceilingHeightFt?: number;
  outdoorAirCfm: number; // Pathogen-free outdoor ventilation air (V_ot)
  recirculatedAirCfm: number; // Central recirculated air flow (V_recirc)
  centralFilterMerv: Ashrae241MervRating;
  inRoomAirCleanerCadrCfm?: number; // In-room portable air cleaner CADR
  mixingFactor?: number; // Room air distribution mixing effectiveness (0.80 to 1.0)
  uvcEquivalentCfm?: number; // Equivalent clean airflow from upper-room UV-C
}

export interface Ashrae241Output {
  spaceType: Ashrae241SpaceType;
  spaceLabel: string;
  floorAreaSqFt: number;
  occupants: number;
  roomVolumeCuFt: number;
  
  // Required ECA targets per Section 5 & Table 5-1
  requiredPeopleEcaCfm: number;
  requiredAreaEcaCfm: number;
  totalRequiredEcaCfm: number;
  requiredAchEquiv: number;

  // Delivered ECA components per Section 6
  deliveredOutdoorAirCfm: number;
  deliveredCentralFilterCfm: number;
  deliveredInRoomCfm: number;
  deliveredUvcCfm: number;
  totalDeliveredEcaCfm: number;
  deliveredAchEquiv: number;

  // Compliance metrics
  ecaMarginCfm: number; // delivered - required
  complianceRatio: number; // delivered / required
  isCompliant: boolean;
  status: "exceeds" | "compliant" | "marginal_deficit" | "critical_deficit";

  // Component contribution shares (%)
  outdoorAirSharePct: number;
  centralFilterSharePct: number;
  inRoomSharePct: number;
  uvcSharePct: number;

  recommendations: string[];
}

/**
 * Evaluates zone infection risk management compliance per ANSI/ASHRAE Standard 241-2023.
 */
export function calculateAshrae241Compliance(input: Ashrae241Input): Ashrae241Output {
  const config = ASHRAE_241_TABLE_5_1[input.spaceType];
  const ceilingHeight = input.ceilingHeightFt ?? 9;
  const roomVolumeCuFt = Math.max(1, input.floorAreaSqFt * ceilingHeight);

  // 1. Required ECA calculation (Section 5)
  // ECA_i = P_z * ECA_p + A_z * ECA_a
  const requiredPeopleEcaCfm = Math.round(input.occupants * config.ecaP_Cfm * 10) / 10;
  const requiredAreaEcaCfm = Math.round(input.floorAreaSqFt * config.ecaA_Cfm_sqft * 10) / 10;
  const totalRequiredEcaCfm = Math.round((requiredPeopleEcaCfm + requiredAreaEcaCfm) * 10) / 10;
  const requiredAchEquiv = Math.round(((totalRequiredEcaCfm * 60) / roomVolumeCuFt) * 10) / 10;

  // 2. Delivered ECA calculation (Section 6)
  const filterMeta = BIOAEROSOL_FILTER_EFFICIENCIES[input.centralFilterMerv];
  const deliveredOutdoorAirCfm = Math.max(0, input.outdoorAirCfm);
  const deliveredCentralFilterCfm = Math.round(Math.max(0, input.recirculatedAirCfm) * filterMeta.efficiency * 10) / 10;

  const mixFactor = Math.min(1.0, Math.max(0.5, input.mixingFactor ?? 1.0));
  const deliveredInRoomCfm = Math.round(Math.max(0, input.inRoomAirCleanerCadrCfm ?? 0) * mixFactor * 10) / 10;
  const deliveredUvcCfm = Math.round(Math.max(0, input.uvcEquivalentCfm ?? 0) * 10) / 10;

  const totalDeliveredEcaCfm = Math.round(
    (deliveredOutdoorAirCfm + deliveredCentralFilterCfm + deliveredInRoomCfm + deliveredUvcCfm) * 10
  ) / 10;
  const deliveredAchEquiv = Math.round(((totalDeliveredEcaCfm * 60) / roomVolumeCuFt) * 10) / 10;

  // 3. Margin & Compliance
  const ecaMarginCfm = Math.round((totalDeliveredEcaCfm - totalRequiredEcaCfm) * 10) / 10;
  const complianceRatio = totalRequiredEcaCfm > 0
    ? Math.round((totalDeliveredEcaCfm / totalRequiredEcaCfm) * 1000) / 1000
    : 1;
  const isCompliant = totalDeliveredEcaCfm >= totalRequiredEcaCfm;

  let status: Ashrae241Output["status"];
  if (complianceRatio >= 1.25) {
    status = "exceeds";
  } else if (complianceRatio >= 1.0) {
    status = "compliant";
  } else if (complianceRatio >= 0.75) {
    status = "marginal_deficit";
  } else {
    status = "critical_deficit";
  }

  // 4. Component Shares
  const denom = totalDeliveredEcaCfm > 0 ? totalDeliveredEcaCfm : 1;
  const outdoorAirSharePct = Math.round((deliveredOutdoorAirCfm / denom) * 1000) / 10;
  const centralFilterSharePct = Math.round((deliveredCentralFilterCfm / denom) * 1000) / 10;
  const inRoomSharePct = Math.round((deliveredInRoomCfm / denom) * 1000) / 10;
  const uvcSharePct = Math.round((deliveredUvcCfm / denom) * 1000) / 10;

  // 5. Engineering Recommendations
  const recommendations: string[] = [];
  if (!isCompliant) {
    const deficit = Math.abs(ecaMarginCfm);
    recommendations.push(
      `Deficit of ${deficit} CFM equivalent clean airflow. IRMM mode requirements are unsatisfied.`
    );
    if (input.centralFilterMerv === "merv_8" || input.centralFilterMerv === "merv_11") {
      recommendations.push(
        `Upgrade central AHU filtration from ${filterMeta.label} to MERV 13 (85% bioaerosol capture) to gain up to ${Math.round(input.recirculatedAirCfm * (0.85 - filterMeta.efficiency))} CFM ECA without additional outdoor air conditioning penalties.`
      );
    }
    const neededCadrs = Math.ceil(deficit / (mixFactor * 250));
    recommendations.push(
      `Deploying ${neededCadrs} portable in-room HEPA air cleaner(s) rated at 250 CFM CADR each will supply ${Math.round(neededCadrs * 250 * mixFactor)} CFM ECA to close the infection risk gap.`
    );
  } else {
    recommendations.push(
      `Fully compliant with ANSI/ASHRAE Standard 241-2023 Table 5-1 for ${config.label}. Margin: +${ecaMarginCfm} CFM (${Math.round((complianceRatio - 1) * 100)}% buffer).`
    );
    if (outdoorAirSharePct > 60 && input.centralFilterMerv !== "merv_13") {
      recommendations.push(
        `Outdoor air accounts for ${outdoorAirSharePct}% of total ECA. Upgrading central filtration to MERV 13 can reduce winter heating and summer dehumidification energy while maintaining compliance.`
      );
    }
  }

  return {
    spaceType: input.spaceType,
    spaceLabel: config.label,
    floorAreaSqFt: input.floorAreaSqFt,
    occupants: input.occupants,
    roomVolumeCuFt,
    requiredPeopleEcaCfm,
    requiredAreaEcaCfm,
    totalRequiredEcaCfm,
    requiredAchEquiv,
    deliveredOutdoorAirCfm,
    deliveredCentralFilterCfm,
    deliveredInRoomCfm,
    deliveredUvcCfm,
    totalDeliveredEcaCfm,
    deliveredAchEquiv,
    ecaMarginCfm,
    complianceRatio,
    isCompliant,
    status,
    outdoorAirSharePct,
    centralFilterSharePct,
    inRoomSharePct,
    uvcSharePct,
    recommendations,
  };
}
