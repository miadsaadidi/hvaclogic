export type ChargeRefrigerant = "R454B" | "R32" | "R410A";
export type RefrigerantSafetyGroup = "A1" | "A2L";
export type OutdoorUnitPosition = "level" | "outdoor_above" | "outdoor_below";

export interface ChargeProfileSource {
  internalId: "SRC-CHARGE-01" | "SRC-CHARGE-02" | "SRC-CHARGE-03";
  organization: string;
  documentTitle: string;
  revision: string;
  publishedYear: number;
  section: string;
  url: string;
}

export interface ChargeLinePair {
  id: string;
  label: string;
  liquidLineOd: string;
  suctionLineOd: string;
  adderRateOzPerFt: number;
}

export type ChargeCalculationMethod =
  | {
      kind: "inventory_delta";
      factoryLineInventoryOz: number;
    }
  | {
      kind: "excess_length";
      factoryAllowanceFt: number;
    };

export interface ChargeProfile {
  id: string;
  manufacturer: string;
  modelFamily: string;
  refrigerant: ChargeRefrigerant;
  safetyGroup: RefrigerantSafetyGroup;
  calculationMethod: ChargeCalculationMethod;
  factoryAllowanceFt: number;
  linePairs: ChargeLinePair[];
  minimumLinearLengthFt: number;
  maximumLinearLengthFt: number;
  maximumVerticalSeparationFt: Partial<Record<OutdoorUnitPosition, number>>;
  longLineLinearThresholdFt?: number;
  longLineVerticalThresholdFt?: number;
  limitsNote: string;
  finalChargeProcedure: string;
  source: ChargeProfileSource;
}

export const REFRIGERANT_CHARGE_PROFILES: readonly ChargeProfile[] = [
  {
    id: "icp-r5a5s-r454b",
    manufacturer: "ICP / Carrier family",
    modelFamily: "R5A5S 18–60 single-stage air conditioners",
    refrigerant: "R454B",
    safetyGroup: "A2L",
    calculationMethod: {
      kind: "inventory_delta",
      factoryLineInventoryOz: 9,
    },
    factoryAllowanceFt: 15,
    linePairs: [
      {
        id: "r454b-liquid-1-4",
        label: '1/4" liquid — vapor line per model table',
        liquidLineOd: '1/4"',
        suctionLineOd: "Per R5A5S Table 4",
        adderRateOzPerFt: 0.27,
      },
      {
        id: "r454b-liquid-5-16",
        label: '5/16" liquid — vapor line per model table',
        liquidLineOd: '5/16"',
        suctionLineOd: "Per R5A5S Table 4",
        adderRateOzPerFt: 0.4,
      },
      {
        id: "r454b-liquid-3-8",
        label: '3/8" liquid — vapor line per model table',
        liquidLineOd: '3/8"',
        suctionLineOd: "Per R5A5S Table 4",
        adderRateOzPerFt: 0.6,
      },
    ],
    minimumLinearLengthFt: 15,
    maximumLinearLengthFt: 250,
    maximumVerticalSeparationFt: {
      outdoor_above: 200,
      outdoor_below: 80,
    },
    longLineLinearThresholdFt: 80,
    longLineVerticalThresholdFt: 35,
    limitsNote: "Maximum equivalent length also depends on capacity, liquid diameter, vertical direction, and accessories in R5A5S Tables 1–4.",
    finalChargeProcedure: "Complete the R5A5S installation-instruction final charge procedure. Use subcooling only within the manufacturer's stated indoor and outdoor temperature window.",
    source: {
      internalId: "SRC-CHARGE-01",
      organization: "International Comfort Products / Carrier",
      documentTitle: "R5A5S Product Specifications",
      revision: "R5A5S-01PD",
      publishedYear: 2024,
      section: "Tables 1–4, Refrigerant Charge Adjustments",
      url: "https://www.shareddocs.com/hvac/docs/1009/Public/00/R5A5S-01PD.pdf",
    },
  },
  {
    id: "daikin-residential-r32-ag-tp-110",
    manufacturer: "Daikin / Goodman / Amana",
    modelFamily: "Residential R-32 outdoor units covered by AG-TP-110",
    refrigerant: "R32",
    safetyGroup: "A2L",
    calculationMethod: {
      kind: "excess_length",
      factoryAllowanceFt: 15,
    },
    factoryAllowanceFt: 15,
    linePairs: [
      { id: "r32-3-8x5-8", label: '3/8" liquid + 5/8" suction', liquidLineOd: '3/8"', suctionLineOd: '5/8"', adderRateOzPerFt: 0.53 },
      { id: "r32-3-8x3-4", label: '3/8" liquid + 3/4" suction', liquidLineOd: '3/8"', suctionLineOd: '3/4"', adderRateOzPerFt: 0.55 },
      { id: "r32-3-8x7-8", label: '3/8" liquid + 7/8" suction', liquidLineOd: '3/8"', suctionLineOd: '7/8"', adderRateOzPerFt: 0.58 },
      { id: "r32-3-8x1-1-8", label: '3/8" liquid + 1-1/8" suction', liquidLineOd: '3/8"', suctionLineOd: '1-1/8"', adderRateOzPerFt: 0.64 },
    ],
    minimumLinearLengthFt: 15,
    maximumLinearLengthFt: 190,
    maximumVerticalSeparationFt: {},
    limitsNote: "The charge table is validated through 175 ft of additional line above the 15 ft factory allowance. Capacity-specific piping and lift limits remain controlling.",
    finalChargeProcedure: "Use the selected unit's Section 1 final charge adjustment after the initial R-32 weigh-in.",
    source: {
      internalId: "SRC-CHARGE-02",
      organization: "Daikin Comfort Technologies",
      documentTitle: "Residential R-32 Long Line Set Applications",
      revision: "AG-TP-110",
      publishedYear: 2024,
      section: "Section 4 and Tables 5-4 through 5-6",
      url: "https://daikincomfort.com/docs/default-source/dx5se/ag-tp-110.pdf",
    },
  },
  {
    id: "daikin-goodman-residential-r410a",
    manufacturer: "Daikin / Goodman / Amana",
    modelFamily: "Residential R-410A condensing units in the cited long-line guide",
    refrigerant: "R410A",
    safetyGroup: "A1",
    calculationMethod: {
      kind: "excess_length",
      factoryAllowanceFt: 15,
    },
    factoryAllowanceFt: 15,
    linePairs: [
      { id: "r410a-3-8x5-8", label: '3/8" liquid + 5/8" suction', liquidLineOd: '3/8"', suctionLineOd: '5/8"', adderRateOzPerFt: 0.63 },
      { id: "r410a-3-8x3-4", label: '3/8" liquid + 3/4" suction', liquidLineOd: '3/8"', suctionLineOd: '3/4"', adderRateOzPerFt: 0.67 },
      { id: "r410a-3-8x7-8", label: '3/8" liquid + 7/8" suction', liquidLineOd: '3/8"', suctionLineOd: '7/8"', adderRateOzPerFt: 0.74 },
      { id: "r410a-3-8x1-1-8", label: '3/8" liquid + 1-1/8" suction', liquidLineOd: '3/8"', suctionLineOd: '1-1/8"', adderRateOzPerFt: 0.78 },
    ],
    minimumLinearLengthFt: 15,
    maximumLinearLengthFt: 190,
    maximumVerticalSeparationFt: {},
    limitsNote: "The precise table is validated through 175 ft of additional line above the 15 ft factory allowance. Model-specific piping limits remain controlling.",
    finalChargeProcedure: "Perform the applicable equipment final charge adjustment after the initial R-410A weigh-in.",
    source: {
      internalId: "SRC-CHARGE-03",
      organization: "Daikin Comfort Technologies",
      documentTitle: "Residential R-410A Long Line Set Application Guide",
      revision: "Manufacturer long-line guide, Tables 3-3 and 3-4",
      publishedYear: 2021,
      section: "Refrigerant Quantity Adjustment, Tables 3-3 and 3-4",
      url: "https://otmm.daikincomfort.com/adaptivemedia/rendition?id=207e0c2174af09bfc0523f9342c0ec1637aa4dbd",
    },
  },
] as const;

export function getChargeProfile(profileId: string): ChargeProfile | undefined {
  return REFRIGERANT_CHARGE_PROFILES.find((profile) => profile.id === profileId);
}
