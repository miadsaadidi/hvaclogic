/**
 * HVAC Lab — AC Model & Serial Number Decoding Engine
 * Standards: AHRI 210/240, Manufacturer Model Nomenclature (Carrier, Trane, Goodman, Lennox, Rheem, York)
 */

export interface DecodedAcModelOutput {
  rawModelNumber: string;
  rawSerialNumber?: string;
  brand: string;
  brandFamily: string;
  equipmentType: "Air Conditioner (Condenser)" | "Heat Pump" | "Air Handler / Coil" | "Gas Furnace" | "Unknown / Universal";
  nominalBtu: number; // e.g. 36000
  nominalTonnage: number; // e.g. 3.0
  tonnageDigits: string; // e.g. "36"
  estimatedSeer?: number; // e.g. 14, 16, 18
  refrigerantType?: "R-410A" | "R-22" | "R-454B" | "R-32" | "Unknown";
  electricalVoltage?: string; // e.g. "208/230V, 1-Phase, 60Hz"
  nominalAirflowCfm: number; // e.g. 1200 CFM (400 CFM/ton)
  manufactureYear?: number;
  manufactureDecade?: string;
  confidence: "high" | "medium" | "low";
  explanation: string;
}

export interface ModelPreset {
  brand: string;
  model: string;
  serial: string;
  label: string;
}

export const POPULAR_MODEL_PRESETS: ModelPreset[] = [
  { brand: "Carrier", model: "24ACC636A003", serial: "3218E12345", label: "Carrier 3.0T (24ACC636)" },
  { brand: "Trane", model: "4TTR4036L1000AA", serial: "19324M234F", label: "Trane 3.0T (4TTR4036)" },
  { brand: "Goodman", model: "GSX140361KB", serial: "1805123456", label: "Goodman 3.0T (GSX14036)" },
  { brand: "Daikin", model: "DX14SA0361AA", serial: "1904123456", label: "Daikin 3.0T (DX14SA036)" },
  { brand: "ICP / Heil", model: "NXA636GKA100", serial: "E193512345", label: "Heil/ICP 3.0T (NXA636)" },
  { brand: "Lennox", model: "14ACX-036-230", serial: "1919D12345", label: "Lennox 3.0T (14ACX-036)" },
  { brand: "Rheem", model: "RA1636AJ1NA", serial: "W341912345", label: "Rheem 3.0T (RA1636)" },
  { brand: "York", model: "YCG36B21S", serial: "W0M9123456", label: "York 3.0T (YCG36B21)" },
];

/**
 * Standard nominal BTU digits to Tonnage mapping
 */
const CAPACITY_DIGITS_MAP: Record<string, { tons: number; btu: number }> = {
  "18": { tons: 1.5, btu: 18000 },
  "018": { tons: 1.5, btu: 18000 },
  "24": { tons: 2.0, btu: 24000 },
  "024": { tons: 2.0, btu: 24000 },
  "30": { tons: 2.5, btu: 30000 },
  "030": { tons: 2.5, btu: 30000 },
  "36": { tons: 3.0, btu: 36000 },
  "036": { tons: 3.0, btu: 36000 },
  "42": { tons: 3.5, btu: 42000 },
  "042": { tons: 3.5, btu: 42000 },
  "48": { tons: 4.0, btu: 48000 },
  "048": { tons: 4.0, btu: 48000 },
  "60": { tons: 5.0, btu: 60000 },
  "060": { tons: 5.0, btu: 60000 },
};

/**
 * Parses Serial Number to extract manufacturing year across major brands
 */
export function decodeSerialNumber(serial: string, brandHint?: string): { year?: number; decade?: string; week?: number } {
  if (!serial || serial.trim().length < 4) return {};
  const s = serial.trim().toUpperCase();

  // Pattern 1: Carrier / Bryant / Payne (WeekWeekYearLetter, e.g. 3218E12345 -> Week 32, Year 2018)
  const carrierMatch = s.match(/^(\d{2})(\d{2})[A-Z]/);
  if (carrierMatch) {
    const week = parseInt(carrierMatch[1], 10);
    const yr = parseInt(carrierMatch[2], 10);
    if (week >= 1 && week <= 53) {
      const fullYear = yr >= 70 ? 1900 + yr : 2000 + yr;
      return { year: fullYear, week, decade: `${Math.floor(fullYear / 10) * 10}s` };
    }
  }

  // Pattern 2: Goodman / Amana / Daikin (YearYearMonthMonth..., e.g. 1805123456 -> May 2018)
  const goodmanMatch = s.match(/^(\d{2})(\d{2})\d{4,}/);
  if (goodmanMatch) {
    const yr = parseInt(goodmanMatch[1], 10);
    const month = parseInt(goodmanMatch[2], 10);
    if (month >= 1 && month <= 12) {
      const fullYear = yr >= 70 ? 1900 + yr : 2000 + yr;
      return { year: fullYear, decade: `${Math.floor(fullYear / 10) * 10}s` };
    }
  }

  // Pattern 3: Letter + 4 digits (ICP/Heil vs Rheem/Ruud)
  const letterPrefixedMatch = s.match(/^[A-Z](\d{2})(\d{2})\d{3,}/);
  if (letterPrefixedMatch) {
    const d1 = parseInt(letterPrefixedMatch[1], 10);
    const d2 = parseInt(letterPrefixedMatch[2], 10);
    const maxTwoDigitYear = (new Date().getFullYear() % 100) + 1; // e.g. 27

    // Case A: ICP/Heil (Year first, then Week, e.g. E1935... -> Year 19, Week 35)
    // If d1 is a valid year (<= maxTwoDigitYear or >= 70) and d2 is a valid week (1-53) and d1 != d2
    if ((d1 <= maxTwoDigitYear || d1 >= 70) && d2 >= 1 && d2 <= 53 && d1 <= 30) {
      const fullYear = d1 >= 70 ? 1900 + d1 : 2000 + d1;
      return { year: fullYear, week: d2, decade: `${Math.floor(fullYear / 10) * 10}s` };
    }

    // Case B: Rheem/Ruud (Week first, then Year, e.g. W3419... -> Week 34, Year 19)
    if (d1 >= 1 && d1 <= 53 && (d2 <= maxTwoDigitYear || d2 >= 70)) {
      const fullYear = d2 >= 70 ? 1900 + d2 : 2000 + d2;
      return { year: fullYear, week: d1, decade: `${Math.floor(fullYear / 10) * 10}s` };
    }
  }

  // Pattern 4: Trane / American Standard (YearWeekYear..., e.g. 19324M234F -> Year 2019, Week 32)
  const traneMatch = s.match(/^(\d{2})(\d{2})[A-Z0-9]/);
  if (traneMatch) {
    const yr = parseInt(traneMatch[1], 10);
    const fullYear = yr >= 70 ? 1900 + yr : 2000 + yr;
    return { year: fullYear, decade: `${Math.floor(fullYear / 10) * 10}s` };
  }

  // Pattern 5: Lennox (PlantPlant + YearYear + Letter, e.g. 1919D12345 -> Year 2019 or 5818M12345 -> Year 2018)
  const lennoxMatch = s.match(/^(\d{2})(\d{2})[A-Z]/);
  if (lennoxMatch) {
    const yr = parseInt(lennoxMatch[2], 10);
    const fullYear = yr >= 70 ? 1900 + yr : 2000 + yr;
    return { year: fullYear, decade: `${Math.floor(fullYear / 10) * 10}s` };
  }

  return {};
}

/**
 * Master AC Model Number Parser Engine
 */
export function decodeAcModel(rawModel: string, rawSerial?: string, selectedBrand?: string): DecodedAcModelOutput {
  const cleanModel = (rawModel || "").trim().toUpperCase();
  const cleanSerial = (rawSerial || "").trim().toUpperCase();
  const serialMeta = decodeSerialNumber(cleanSerial);

  // Default Fallback
  let detectedBrand = selectedBrand && selectedBrand !== "auto" ? selectedBrand : "Universal / Unknown";
  let brandFamily = detectedBrand;
  let equipmentType: DecodedAcModelOutput["equipmentType"] = "Air Conditioner (Condenser)";
  let tonnage = 3.0;
  let btu = 36000;
  let tonnageDigits = "36";
  let estimatedSeer: number | undefined = undefined;
  let refrigerant: DecodedAcModelOutput["refrigerantType"] = "R-410A";
  let confidence: DecodedAcModelOutput["confidence"] = "medium";
  let explanation = "";

  if (!cleanModel) {
    return {
      rawModelNumber: "",
      rawSerialNumber: cleanSerial,
      brand: "Unknown",
      brandFamily: "Unknown",
      equipmentType: "Air Conditioner (Condenser)",
      nominalBtu: 36000,
      nominalTonnage: 3.0,
      tonnageDigits: "36",
      nominalAirflowCfm: 1200,
      confidence: "low",
      explanation: "Please enter an HVAC condenser or air handler model number to decode.",
    };
  }

  // 1. CARRIER / BRYANT / PAYNE
  // Pattern: 24ACC636A003 or 24AAA536A003 or 25HNB636 (Heat pump)
  if (cleanModel.startsWith("24") || cleanModel.startsWith("25") || cleanModel.startsWith("38") || selectedBrand === "Carrier" || selectedBrand === "Bryant") {
    detectedBrand = cleanModel.startsWith("25") || cleanModel.startsWith("24") ? "Carrier / Bryant" : "Carrier";
    brandFamily = "Carrier Corporation (UTC)";
    equipmentType = cleanModel.startsWith("25") ? "Heat Pump" : "Air Conditioner (Condenser)";

    // SEER is often digit 5 (e.g. 24ACC636 -> '6' = 16 SEER, 24AAA536 -> '5' = 15 SEER, 24ABC6 -> 16 SEER)
    const seerMatch = cleanModel.match(/^[0-9]{2}[A-Z]{2,3}(\d)/);
    if (seerMatch) {
      const seerDigit = parseInt(seerMatch[1], 10);
      if (seerDigit === 3) estimatedSeer = 13;
      else if (seerDigit === 4) estimatedSeer = 14;
      else if (seerDigit === 5) estimatedSeer = 15;
      else if (seerDigit === 6) estimatedSeer = 16;
      else if (seerDigit === 7) estimatedSeer = 17;
    }

    // Capacity is 2 digits following the alpha series code (e.g. 24ACC636 -> ACC6(36), 24AAA536 -> AAA5(36))
    const capMatch = cleanModel.match(/[A-Z]{2,4}\d?(\d{2})/);
    if (capMatch && CAPACITY_DIGITS_MAP[capMatch[1]]) {
      tonnageDigits = capMatch[1];
      tonnage = CAPACITY_DIGITS_MAP[tonnageDigits].tons;
      btu = CAPACITY_DIGITS_MAP[tonnageDigits].btu;
      confidence = "high";
      explanation = `Carrier/Bryant standard nomenclature: Prefix '${cleanModel.slice(0, 2)}' indicates ${equipmentType}. Digits '${tonnageDigits}' represent ${btu.toLocaleString()} BTU (${tonnage} Ton nominal capacity).`;
    }
  }

  // 2. TRANE / AMERICAN STANDARD
  // Pattern: 4TTR4036L1000AA or 4TTX6036 or 4TWX4036 (Heat pump)
  else if (cleanModel.startsWith("4TT") || cleanModel.startsWith("4TW") || cleanModel.startsWith("2TT") || selectedBrand === "Trane" || selectedBrand === "American Standard") {
    detectedBrand = "Trane / American Standard";
    brandFamily = "Trane Technologies";
    equipmentType = cleanModel.startsWith("4TW") ? "Heat Pump" : "Air Conditioner (Condenser)";
    refrigerant = cleanModel.startsWith("4") ? "R-410A" : "R-22";

    // SEER tier is often digit 5 (e.g. 4TTR4 -> 14 SEER, 4TTX6 -> 16 SEER)
    const traneSeerMatch = cleanModel.match(/^4T[T|W][A-Z](\d)/);
    if (traneSeerMatch) {
      estimatedSeer = parseInt(traneSeerMatch[1], 10) + 10;
    }

    // Capacity is digits 6-7 or 6-8 (e.g. 4TTR4036 -> 036 or 36)
    const capMatch = cleanModel.match(/(?:4T[T|W][A-Z]\d)(\d{2,3})/);
    if (capMatch) {
      const rawCap = capMatch[1].replace(/^0+/, "");
      if (CAPACITY_DIGITS_MAP[rawCap]) {
        tonnageDigits = rawCap;
        tonnage = CAPACITY_DIGITS_MAP[tonnageDigits].tons;
        btu = CAPACITY_DIGITS_MAP[tonnageDigits].btu;
        confidence = "high";
        explanation = `Trane nomenclature: Prefix '${cleanModel.slice(0, 4)}' (${refrigerant}). Digits '${capMatch[1]}' denote ${btu.toLocaleString()} BTU (${tonnage} Tons).`;
      }
    }
  }

  // 3. GOODMAN / AMANA / DAIKIN
  // Pattern: GSX140361KB or GSZ140361 or ASX160361 or DX14SA036
  else if (cleanModel.startsWith("GS") || cleanModel.startsWith("AS") || cleanModel.startsWith("DX") || cleanModel.startsWith("SS") || selectedBrand === "Goodman" || selectedBrand === "Amana") {
    detectedBrand = cleanModel.startsWith("AS") ? "Amana" : cleanModel.startsWith("DX") ? "Daikin" : "Goodman";
    brandFamily = "Daikin Comfort Technologies";
    equipmentType = cleanModel.includes("Z") || cleanModel.includes("H") ? "Heat Pump" : "Air Conditioner (Condenser)";

    // SEER is digits 3-4 (e.g. GSX14 -> 14 SEER, GSX16 -> 16 SEER)
    const seerMatch = cleanModel.match(/^[A-Z]{2,3}(\d{2})/);
    if (seerMatch) {
      estimatedSeer = parseInt(seerMatch[1], 10);
    }

    // Capacity is next 3 digits (e.g. 036 -> 36)
    const capMatch = cleanModel.match(/^[A-Z]{2,3}\d{2}(\d{3})/);
    if (capMatch) {
      const capKey = capMatch[1].replace(/^0+/, "");
      if (CAPACITY_DIGITS_MAP[capKey]) {
        tonnageDigits = capKey;
        tonnage = CAPACITY_DIGITS_MAP[capKey].tons;
        btu = CAPACITY_DIGITS_MAP[capKey].btu;
        confidence = "high";
        explanation = `Goodman/Amana nomenclature: Series '${cleanModel.slice(0, 5)}' (${estimatedSeer || 14} SEER). Capacity digits '${capMatch[1]}' decode to ${btu.toLocaleString()} BTU (${tonnage} Ton nominal).`;
      }
    }
  }

  // 4. LENNOX
  // Pattern: 14ACX-036-230 or XC14-036 or ML14XC1-036 or XP14 (Heat pump)
  else if (cleanModel.includes("ACX") || cleanModel.startsWith("XC") || cleanModel.startsWith("XP") || cleanModel.startsWith("ML") || cleanModel.startsWith("EL") || selectedBrand === "Lennox") {
    detectedBrand = "Lennox";
    brandFamily = "Lennox International";
    equipmentType = cleanModel.startsWith("XP") || cleanModel.includes("HP") ? "Heat Pump" : "Air Conditioner (Condenser)";

    const capMatch = cleanModel.match(/[-_]?(\d{3})[-_]?/);
    if (capMatch) {
      const capKey = capMatch[1].replace(/^0+/, "");
      if (CAPACITY_DIGITS_MAP[capKey]) {
        tonnageDigits = capKey;
        tonnage = CAPACITY_DIGITS_MAP[capKey].tons;
        btu = CAPACITY_DIGITS_MAP[capKey].btu;
        confidence = "high";
        explanation = `Lennox model scheme: Digits '${capMatch[1]}' denote ${btu.toLocaleString()} BTU/hr (${tonnage} Tons nominal cooling capacity).`;
      }
    }
  }

  // 5. RHEEM / RUUD
  // Pattern: RA1636AJ1NA or RP1436 or RA1436
  else if (cleanModel.startsWith("RA") || cleanModel.startsWith("RP") || cleanModel.startsWith("WA") || selectedBrand === "Rheem" || selectedBrand === "Ruud") {
    detectedBrand = "Rheem / Ruud";
    brandFamily = "Rheem Manufacturing Company";
    equipmentType = cleanModel.startsWith("RP") ? "Heat Pump" : "Air Conditioner (Condenser)";

    // SEER is digits 3-4 (e.g. RA16 -> 16 SEER)
    const seerMatch = cleanModel.match(/^R[A|P](\d{2})/);
    if (seerMatch) {
      estimatedSeer = parseInt(seerMatch[1], 10);
    }

    // Capacity is digits 5-6 (e.g. RA1636 -> 36)
    const capMatch = cleanModel.match(/^R[A|P]\d{2}(\d{2})/);
    if (capMatch && CAPACITY_DIGITS_MAP[capMatch[1]]) {
      tonnageDigits = capMatch[1];
      tonnage = CAPACITY_DIGITS_MAP[tonnageDigits].tons;
      btu = CAPACITY_DIGITS_MAP[tonnageDigits].btu;
      confidence = "high";
      explanation = `Rheem/Ruud nomenclature: '${cleanModel.slice(0, 4)}' (${estimatedSeer} SEER). Digits '${tonnageDigits}' indicate ${btu.toLocaleString()} BTU (${tonnage} Ton nominal).`;
    }
  }

  // 6. ICP / HEIL / TEMPSTAR / COMFORTMAKER / ARCOAIRE
  else if (
    cleanModel.startsWith("NXA") ||
    cleanModel.startsWith("N4A") ||
    cleanModel.startsWith("H4A") ||
    cleanModel.startsWith("T4A") ||
    cleanModel.startsWith("C4A") ||
    cleanModel.startsWith("N4H") ||
    cleanModel.startsWith("H4H") ||
    selectedBrand === "ICP" ||
    selectedBrand === "Heil" ||
    selectedBrand === "Tempstar"
  ) {
    detectedBrand = "ICP / Heil / Tempstar";
    brandFamily = "International Comfort Products (Carrier Corp)";
    equipmentType = cleanModel.includes("H") ? "Heat Pump" : "Air Conditioner (Condenser)";

    const capMatch = cleanModel.match(/^[A-Z0-9]{3,4}(\d{2})/);
    if (capMatch && CAPACITY_DIGITS_MAP[capMatch[1]]) {
      tonnageDigits = capMatch[1];
      tonnage = CAPACITY_DIGITS_MAP[tonnageDigits].tons;
      btu = CAPACITY_DIGITS_MAP[tonnageDigits].btu;
      confidence = "high";
      explanation = `ICP/Heil/Tempstar nomenclature: Digits '${tonnageDigits}' indicate ${btu.toLocaleString()} BTU (${tonnage} Ton nominal).`;
    }
  }

  // 7. YORK / COLEMAN / LUXAIRE
  // Pattern: YCG36B21S or YCS36 or TC3B36
  else if (cleanModel.startsWith("YC") || cleanModel.startsWith("TC") || cleanModel.startsWith("CC") || cleanModel.startsWith("AC") || selectedBrand === "York") {
    detectedBrand = "York / Coleman / Luxaire";
    brandFamily = "Johnson Controls";
    equipmentType = cleanModel.includes("H") ? "Heat Pump" : "Air Conditioner (Condenser)";

    const capMatch = cleanModel.match(/^[A-Z]{2,3}(\d{2})/);
    if (capMatch && CAPACITY_DIGITS_MAP[capMatch[1]]) {
      tonnageDigits = capMatch[1];
      tonnage = CAPACITY_DIGITS_MAP[tonnageDigits].tons;
      btu = CAPACITY_DIGITS_MAP[tonnageDigits].btu;
      confidence = "high";
      explanation = `York/Johnson Controls scheme: Digits '${tonnageDigits}' decode to ${btu.toLocaleString()} BTU (${tonnage} Tons nominal).`;
    }
  }

  // 8. GENERIC UNIVERSAL REGEX HEURISTIC
  // Look for any 018, 024, 030, 036, 042, 048, 060 or 18, 24, 30, 36, 42, 48, 60 inside model
  if (confidence !== "high") {
    const genericMatch = cleanModel.match(/(?:0?(18|24|30|36|42|48|60))/);
    if (genericMatch && CAPACITY_DIGITS_MAP[genericMatch[1]]) {
      tonnageDigits = genericMatch[1];
      tonnage = CAPACITY_DIGITS_MAP[tonnageDigits].tons;
      btu = CAPACITY_DIGITS_MAP[tonnageDigits].btu;
      confidence = "medium";
      explanation = `Universal Capacity Match: Embedded digits '${genericMatch[0]}' correspond to standard AHRI nominal rating of ${btu.toLocaleString()} BTU/hr (${tonnage} Tons).`;
    } else {
      explanation = `Model '${cleanModel}' contains non-standard capacity digits. Defaulting to standard residential 3.0 Ton baseline. Verify rating plate submittal.`;
    }
  }

  // Standard 400 CFM per ton airflow calculation (ASHRAE Fundamentals)
  const nominalAirflowCfm = Math.round(tonnage * 400);

  return {
    rawModelNumber: cleanModel,
    rawSerialNumber: cleanSerial,
    brand: detectedBrand,
    brandFamily,
    equipmentType,
    nominalBtu: btu,
    nominalTonnage: tonnage,
    tonnageDigits,
    estimatedSeer,
    refrigerantType: refrigerant,
    electricalVoltage: "208/230V, 1-Phase, 60Hz",
    nominalAirflowCfm,
    manufactureYear: serialMeta.year,
    manufactureDecade: serialMeta.decade,
    confidence,
    explanation,
  };
}
