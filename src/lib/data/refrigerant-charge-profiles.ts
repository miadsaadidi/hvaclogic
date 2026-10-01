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
  capacityRange: string;
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
    manufacturer: "International Comfort Products (ICP) / Carrier",
    modelFamily: "R5A5S 18–60 Single-Stage Air Conditioners",
    capacityRange: "1.5 to 5.0 Tons (18,000–60,000 BTU/h)",
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
        label: '1/4" liquid line (vapor line per R5A5S Table 4)',
        liquidLineOd: '1/4"',
        suctionLineOd: 'Per R5A5S Table 4 (3/4" - 7/8")',
        adderRateOzPerFt: 0.27,
      },
      {
        id: "r454b-liquid-5-16",
        label: '5/16" liquid line (vapor line per R5A5S Table 4)',
        liquidLineOd: '5/16"',
        suctionLineOd: 'Per R5A5S Table 4 (3/4" - 7/8")',
        adderRateOzPerFt: 0.4,
      },
      {
        id: "r454b-liquid-3-8",
        label: '3/8" liquid line (vapor line per R5A5S Table 4)',
        liquidLineOd: '3/8"',
        suctionLineOd: 'Per R5A5S Table 4 (3/4" - 1-1/8")',
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
    limitsNote: "Published linear range is 15–250 ft. Maximum equivalent length, capacity-specific liquid line sizing, vertical lift limits, and accessories are governed by R5A5S Tables 1–4.",
    finalChargeProcedure: "Complete the R5A5S installation manual final subcooling verification procedure under stabilized operating conditions within the OEM outdoor temperature window.",
    source: {
      internalId: "SRC-CHARGE-01",
      organization: "International Comfort Products / Carrier",
      documentTitle: "R5A5S Product Specifications & Long Line Set Guidelines",
      revision: "R5A5S-01PD",
      publishedYear: 2024,
      section: "Tables 1–4: Refrigerant Line Sizing and Charge Adjustments",
      url: "https://www.shareddocs.com/hvac/docs/1009/Public/00/R5A5S-01PD.pdf",
    },
  },
  {
    id: "daikin-residential-r32-ag-tp-110",
    manufacturer: "Daikin Comfort Technologies (Goodman / Amana)",
    modelFamily: "Residential R-32 Split Systems (AG-TP-110 Scope)",
    capacityRange: "1.5 to 5.0 Tons (18,000–60,000 BTU/h)",
    refrigerant: "R32",
    safetyGroup: "A2L",
    calculationMethod: {
      kind: "excess_length",
      factoryAllowanceFt: 15,
    },
    factoryAllowanceFt: 15,
    linePairs: [
      { id: "r32-3-8x5-8", label: '3/8" liquid + 5/8" suction line', liquidLineOd: '3/8"', suctionLineOd: '5/8"', adderRateOzPerFt: 0.53 },
      { id: "r32-3-8x3-4", label: '3/8" liquid + 3/4" suction line', liquidLineOd: '3/8"', suctionLineOd: '3/4"', adderRateOzPerFt: 0.55 },
      { id: "r32-3-8x7-8", label: '3/8" liquid + 7/8" suction line', liquidLineOd: '3/8"', suctionLineOd: '7/8"', adderRateOzPerFt: 0.58 },
      { id: "r32-3-8x1-1-8", label: '3/8" liquid + 1-1/8" suction line', liquidLineOd: '3/8"', suctionLineOd: '1-1/8"', adderRateOzPerFt: 0.64 },
    ],
    minimumLinearLengthFt: 15,
    maximumLinearLengthFt: 190,
    maximumVerticalSeparationFt: {},
    limitsNote: "Published table covers up to 175 ft of additional line beyond the 15 ft factory allowance (190 ft total linear length). Capacity-specific line sizing and lift limits remain controlling per AG-TP-110.",
    finalChargeProcedure: "Complete the Section 1 final subcooling/superheat adjustment per the specific outdoor-unit installation manual after initial weigh-in.",
    source: {
      internalId: "SRC-CHARGE-02",
      organization: "Daikin Comfort Technologies",
      documentTitle: "Residential R-32 Long Line Set Applications Engineering Manual",
      revision: "AG-TP-110",
      publishedYear: 2024,
      section: "Section 4 and Tables 5-4 through 5-6: Additional Refrigerant Charge",
      url: "https://daikincomfort.com/docs/default-source/dx5se/ag-tp-110.pdf",
    },
  },
  {
    id: "daikin-goodman-residential-r410a",
    manufacturer: "Daikin Comfort Technologies (Goodman / Amana)",
    modelFamily: "Residential R-410A Split Condensing Units & Heat Pumps",
    capacityRange: "1.5 to 5.0 Tons (18,000–60,000 BTU/h)",
    refrigerant: "R410A",
    safetyGroup: "A1",
    calculationMethod: {
      kind: "excess_length",
      factoryAllowanceFt: 15,
    },
    factoryAllowanceFt: 15,
    linePairs: [
      { id: "r410a-3-8x5-8", label: '3/8" liquid + 5/8" suction line', liquidLineOd: '3/8"', suctionLineOd: '5/8"', adderRateOzPerFt: 0.63 },
      { id: "r410a-3-8x3-4", label: '3/8" liquid + 3/4" suction line', liquidLineOd: '3/8"', suctionLineOd: '3/4"', adderRateOzPerFt: 0.67 },
      { id: "r410a-3-8x7-8", label: '3/8" liquid + 7/8" suction line', liquidLineOd: '3/8"', suctionLineOd: '7/8"', adderRateOzPerFt: 0.74 },
      { id: "r410a-3-8x1-1-8", label: '3/8" liquid + 1-1/8" suction line', liquidLineOd: '3/8"', suctionLineOd: '1-1/8"', adderRateOzPerFt: 0.78 },
    ],
    minimumLinearLengthFt: 15,
    maximumLinearLengthFt: 190,
    maximumVerticalSeparationFt: {},
    limitsNote: "Published table covers up to 175 ft of additional line beyond the 15 ft factory allowance (190 ft total linear length). Model-specific piping limits and traps remain controlling.",
    finalChargeProcedure: "Complete the manufacturer's subcooling charging chart procedure after initial weigh-in.",
    source: {
      internalId: "SRC-CHARGE-03",
      organization: "Daikin Comfort Technologies",
      documentTitle: "Residential R-410A Long Line Set Application Guide",
      revision: "TP-107D / Long-Line Application Data",
      publishedYear: 2021,
      section: "Tables 3-3 and 3-4: Refrigerant Quantity Adjustment",
      url: "https://otmm.daikincomfort.com/adaptivemedia/rendition?id=207e0c2174af09bfc0523f9342c0ec1637aa4dbd",
    },
  },
] as const;

export function getChargeProfile(profileId: string): ChargeProfile | undefined {
  return REFRIGERANT_CHARGE_PROFILES.find((profile) => profile.id === profileId);
}
