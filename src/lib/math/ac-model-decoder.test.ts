import { describe, it, expect } from "vitest";
import { decodeAcModel, decodeSerialNumber } from "./ac-model-decoder";

describe("AC Model & Serial Number Decoder Engine", () => {
  it("decodes Carrier model and serial numbers accurately", () => {
    const res = decodeAcModel("24ACC636A003", "3218E12345");
    expect(res.nominalTonnage).toBe(3.0);
    expect(res.nominalBtu).toBe(36000);
    expect(res.nominalAirflowCfm).toBe(1200);
    expect(res.brand).toContain("Carrier");
    expect(res.manufactureYear).toBe(2018);
  });

  it("decodes Trane 4TTR4036 model correctly", () => {
    const res = decodeAcModel("4TTR4036L1000AA", "19324M234F");
    expect(res.nominalTonnage).toBe(3.0);
    expect(res.nominalBtu).toBe(36000);
    expect(res.nominalAirflowCfm).toBe(1200);
    expect(res.brand).toContain("Trane");
    expect(res.refrigerantType).toBe("R-410A");
  });

  it("decodes Goodman GSX14036 model correctly", () => {
    const res = decodeAcModel("GSX140361KB", "1805123456");
    expect(res.nominalTonnage).toBe(3.0);
    expect(res.nominalBtu).toBe(36000);
    expect(res.nominalAirflowCfm).toBe(1200);
    expect(res.brand).toBe("Goodman");
    expect(res.manufactureYear).toBe(2018);
  });

  it("decodes Lennox 14ACX-036 model correctly", () => {
    const res = decodeAcModel("14ACX-036-230");
    expect(res.nominalTonnage).toBe(3.0);
    expect(res.nominalBtu).toBe(36000);
    expect(res.brand).toBe("Lennox");
  });

  it("decodes Rheem RA1636 model correctly", () => {
    const res = decodeAcModel("RA1636AJ1NA", "W341912345");
    expect(res.nominalTonnage).toBe(3.0);
    expect(res.nominalBtu).toBe(36000);
    expect(res.brand).toContain("Rheem");
    expect(res.manufactureYear).toBe(2019);
  });

  it("decodes York YCG36B21S model correctly", () => {
    const res = decodeAcModel("YCG36B21S");
    expect(res.nominalTonnage).toBe(3.0);
    expect(res.nominalBtu).toBe(36000);
    expect(res.brand).toContain("York");
  });

  it("decodes Daikin DX14SA036 model correctly", () => {
    const res = decodeAcModel("DX14SA0361AA", "1904123456");
    expect(res.nominalTonnage).toBe(3.0);
    expect(res.nominalBtu).toBe(36000);
    expect(res.brand).toBe("Daikin");
    expect(res.manufactureYear).toBe(2019);
  });

  it("decodes ICP Heil NXA636 model and serial correctly", () => {
    const res = decodeAcModel("NXA636GKA100", "E193512345");
    expect(res.nominalTonnage).toBe(3.0);
    expect(res.nominalBtu).toBe(36000);
    expect(res.brand).toContain("ICP");
    expect(res.manufactureYear).toBe(2019);
  });

  it("correctly identifies non-standard universal models via heuristic fallback", () => {
    const res = decodeAcModel("CUSTOM-048-XYZ");
    expect(res.nominalTonnage).toBe(4.0);
    expect(res.nominalBtu).toBe(48000);
    expect(res.nominalAirflowCfm).toBe(1600);
  });
});
