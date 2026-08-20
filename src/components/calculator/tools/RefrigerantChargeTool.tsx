"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ChargeRefrigerant,
  getChargeProfile,
  OutdoorUnitPosition,
  REFRIGERANT_CHARGE_PROFILES,
} from "@/lib/data/refrigerant-charge-profiles";
import {
  calculateRefrigerantCharge,
  RefrigerantChargeInput,
} from "@/lib/math/refrigerant-charge";
import { useHydrateParams } from "@/lib/hooks/useHydrateParams";
import { useUnitSystem } from "@/lib/hooks/useUnitSystem";
import { ActionButtonBar } from "@/components/calculator/ActionButtonBar";
import { MobileResultBar } from "@/components/calculator/MobileResultBar";
import { RefrigerantChargeVisualizer } from "@/components/calculator/visualizers/RefrigerantChargeVisualizer";

type ChargeMode = RefrigerantChargeInput["mode"];

const FT_TO_M = 0.3048;
const OZ_TO_G = 28.349523125;
const OZ_PER_FT_TO_G_PER_M = OZ_TO_G / FT_TO_M;

const PRESETS = [
  {
    label: "R-454B · 45 ft · 5/16 liquid",
    profileId: "icp-r5a5s-r454b",
    linePairId: "r454b-liquid-5-16",
    actualLengthFt: 45,
    factoryBaseChargeOz: 100,
  },
  {
    label: "R-32 · 65 ft · 7/8 suction",
    profileId: "daikin-residential-r32-ag-tp-110",
    linePairId: "r32-3-8x7-8",
    actualLengthFt: 65,
    factoryBaseChargeOz: 80,
  },
  {
    label: "R-410A · 40 ft · 3/4 suction",
    profileId: "daikin-goodman-residential-r410a",
    linePairId: "r410a-3-8x3-4",
    actualLengthFt: 40,
    factoryBaseChargeOz: 96,
  },
] as const;

interface LinkedNumberInputProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  help?: string;
  onChange: (value: number) => void;
}

function LinkedNumberInput({ id, label, value, min, max, step, unit, help, onChange }: LinkedNumberInputProps) {
  const helpId = `${id}-help`;
  return (
    <div className="form-group">
      <label htmlFor={id}>
        <span>{label}</span>
        <span className="unit-badge">{unit}</span>
      </label>
      <div className="range-input-row">
        <input
          aria-label={`${label} slider`}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-describedby={help ? helpId : undefined}
          onChange={(event) => onChange(Number(event.target.value))}
          className="input-number"
        />
      </div>
      {help && <p id={helpId} className="input-help">{help}</p>}
    </div>
  );
}

export function RefrigerantChargeTool() {
  const { isMetric } = useUnitSystem();
  const { params, getNumberParam, getParam, updateParam } = useHydrateParams();
  const hydrated = useRef(false);

  const [mode, setMode] = useState<ChargeMode>("oem_profile");
  const [profileId, setProfileId] = useState("icp-r5a5s-r454b");
  const [linePairId, setLinePairId] = useState("r454b-liquid-5-16");
  const [actualLengthFt, setActualLengthFt] = useState(45);
  const [verticalSeparationFt, setVerticalSeparationFt] = useState(0);
  const [outdoorUnitPosition, setOutdoorUnitPosition] = useState<OutdoorUnitPosition>("level");
  const [factoryBaseChargeOz, setFactoryBaseChargeOz] = useState(100);

  const [customRefrigerant, setCustomRefrigerant] = useState<ChargeRefrigerant>("R454B");
  const [customLiquidLine, setCustomLiquidLine] = useState('3/8"');
  const [customSuctionLine, setCustomSuctionLine] = useState('7/8"');
  const [customFactoryAllowanceFt, setCustomFactoryAllowanceFt] = useState(15);
  const [customRateOzPerFt, setCustomRateOzPerFt] = useState(0.6);
  const [manualReference, setManualReference] = useState("");

  const profile = getChargeProfile(profileId) || REFRIGERANT_CHARGE_PROFILES[0];

  useEffect(() => {
    if (!params || hydrated.current) return;
    hydrated.current = true;
    const nextMode = getParam("mode", "oem_profile") === "custom_oem_rate" ? "custom_oem_rate" : "oem_profile";
    const nextProfileId = getParam("profile", "icp-r5a5s-r454b") || "icp-r5a5s-r454b";
    const nextProfile = getChargeProfile(nextProfileId) || REFRIGERANT_CHARGE_PROFILES[0];
    const requestedPair = getParam("pair", nextProfile.linePairs[0].id) || nextProfile.linePairs[0].id;

    setMode(nextMode);
    setProfileId(nextProfile.id);
    setLinePairId(nextProfile.linePairs.some((item) => item.id === requestedPair) ? requestedPair : nextProfile.linePairs[0].id);
    setActualLengthFt(getNumberParam("length", 45));
    setVerticalSeparationFt(getNumberParam("lift", 0));
    setFactoryBaseChargeOz(getNumberParam("base_oz", 100));
    setOutdoorUnitPosition((getParam("position", "level") as OutdoorUnitPosition) || "level");
  }, [params, getNumberParam, getParam]);

  const setLengthFromDisplay = (value: number, setter: (next: number) => void, paramKey: string) => {
    const feet = isMetric ? value / FT_TO_M : value;
    setter(feet);
    updateParam(paramKey, Number(feet.toFixed(4)));
  };

  const setChargeFromDisplay = (value: number) => {
    const ounces = isMetric ? value / OZ_TO_G : value;
    setFactoryBaseChargeOz(ounces);
    updateParam("base_oz", Number(ounces.toFixed(4)));
  };

  const setRateFromDisplay = (value: number) => {
    const rate = isMetric ? value / OZ_PER_FT_TO_G_PER_M : value;
    setCustomRateOzPerFt(rate);
    updateParam("rate", Number(rate.toFixed(5)));
  };

  const handleProfileChange = (nextProfileId: string) => {
    const nextProfile = getChargeProfile(nextProfileId) || REFRIGERANT_CHARGE_PROFILES[0];
    setProfileId(nextProfile.id);
    setLinePairId(nextProfile.linePairs[0].id);
    updateParam("profile", nextProfile.id);
    updateParam("pair", nextProfile.linePairs[0].id);
  };

  const handlePreset = (preset: typeof PRESETS[number]) => {
    setMode("oem_profile");
    setProfileId(preset.profileId);
    setLinePairId(preset.linePairId);
    setActualLengthFt(preset.actualLengthFt);
    setFactoryBaseChargeOz(preset.factoryBaseChargeOz);
    setVerticalSeparationFt(0);
    setOutdoorUnitPosition("level");
    updateParam("mode", "oem_profile");
    updateParam("profile", preset.profileId);
    updateParam("pair", preset.linePairId);
    updateParam("length", preset.actualLengthFt);
    updateParam("base_oz", preset.factoryBaseChargeOz);
    updateParam("lift", 0);
    updateParam("position", "level");
  };

  const input = useMemo<RefrigerantChargeInput>(() => mode === "oem_profile"
    ? {
        mode,
        profileId,
        linePairId,
        actualLengthFt,
        verticalSeparationFt,
        outdoorUnitPosition,
        factoryBaseChargeOz,
      }
    : {
        mode,
        refrigerant: customRefrigerant,
        liquidLineOd: customLiquidLine,
        suctionLineOd: customSuctionLine,
        actualLengthFt,
        factoryAllowanceFt: customFactoryAllowanceFt,
        adderRateOzPerFt: customRateOzPerFt,
        factoryBaseChargeOz,
        verticalSeparationFt,
        outdoorUnitPosition,
        manualReference,
      }, [
        mode, profileId, linePairId, actualLengthFt, verticalSeparationFt,
        outdoorUnitPosition, factoryBaseChargeOz, customRefrigerant,
        customLiquidLine, customSuctionLine, customFactoryAllowanceFt,
        customRateOzPerFt, manualReference,
      ]);
  const result = useMemo(() => calculateRefrigerantCharge(input), [input]);

  const lengthUnit = isMetric ? "m" : "ft";
  const displayLength = (feet: number) => Number((isMetric ? feet * FT_TO_M : feet).toFixed(isMetric ? 2 : 1));
  const displayCharge = (ounces: number) => Number((isMetric ? ounces * OZ_TO_G : ounces).toFixed(isMetric ? 0 : 1));
  const displayRate = Number((isMetric ? customRateOzPerFt * OZ_PER_FT_TO_G_PER_M : customRateOzPerFt).toFixed(isMetric ? 1 : 3));
  const lengthMax = mode === "oem_profile" ? profile.maximumLinearLengthFt : 500;
  const primaryValue = result.ok
    ? isMetric
      ? `${Math.abs(result.output.chargeAdjustmentOz * OZ_TO_G).toFixed(0)} g`
      : result.output.chargeAdjustmentFormatted.replace("-", "")
    : "Check inputs";
  const primaryAction = result.ok
    ? result.output.adjustmentAction === "remove"
      ? "Recover"
      : result.output.adjustmentAction === "none"
        ? "No adjustment"
        : "Add"
    : "Unable to calculate";

  const exportCsv = () => {
    if (!result.ok) return;
    const output = result.output;
    const rows = [
      ["Calculation", "Refrigerant line-set initial weigh-in"],
      ["Profile", output.profileLabel],
      ["Source", output.sourceLabel],
      ["Refrigerant", output.refrigerant],
      ["Liquid line", output.liquidLineOd],
      ["Suction line", output.suctionLineOd],
      ["Actual linear length (ft)", output.actualLengthFt],
      ["Factory allowance (ft)", output.factoryAllowanceFt],
      ["Adder rate (oz/ft)", output.adderRateOzPerFt],
      ["Raw adjustment (oz)", output.chargeAdjustmentOz],
      ["Formatted adjustment", output.chargeAdjustmentFormatted],
      ["Raw initial target (oz)", output.initialTargetChargeOz],
      ["Formatted initial target", output.initialTargetChargeFormatted],
      ["Final verification", output.finalChargeProcedure],
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    anchor.download = `refrigerant-charge-${output.refrigerant.toLowerCase()}.csv`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };

  return (
    <div className="calculator-card refrigerant-charge-tool">
      <div className="preset-chips-container" role="group" aria-label="Refrigerant charge presets">
        <div className="preset-chips-heading">
          <span className="preset-chips-label">Verified OEM examples</span>
          <button type="button" className="reset-defaults-btn" onClick={() => handlePreset(PRESETS[0])}>Reset Defaults</button>
        </div>
        {PRESETS.map((preset) => (
          <button key={preset.label} type="button" className={`preset-chip-btn ${profileId === preset.profileId && linePairId === preset.linePairId && actualLengthFt === preset.actualLengthFt ? "active" : ""}`} onClick={() => handlePreset(preset)}>
            {preset.label}
          </button>
        ))}
      </div>

      <div className="charge-mode-switch" role="group" aria-label="Charging data source">
        <button type="button" aria-pressed={mode === "oem_profile"} className={`preset-chip-btn ${mode === "oem_profile" ? "active" : ""}`} onClick={() => { setMode("oem_profile"); updateParam("mode", "oem_profile"); }}>
          Verified OEM profile
        </button>
        <button type="button" aria-pressed={mode === "custom_oem_rate"} className={`preset-chip-btn ${mode === "custom_oem_rate" ? "active" : ""}`} onClick={() => { setMode("custom_oem_rate"); updateParam("mode", "custom_oem_rate"); }}>
          Custom OEM rate
        </button>
      </div>

      <div className="calculator-grid">
        <div className="input-panel">
          {mode === "oem_profile" ? (
            <>
              <div className="form-group">
                <label htmlFor="profile-select"><span>Verified equipment profile</span></label>
                <select id="profile-select" className="input-number" value={profileId} disabled={!params} onChange={(event) => handleProfileChange(event.target.value)}>
                  {REFRIGERANT_CHARGE_PROFILES.map((item) => <option key={item.id} value={item.id}>{item.manufacturer} — {item.refrigerant}</option>)}
                </select>
                <p className="input-help">{profile.modelFamily}</p>
              </div>
              <div className="form-group">
                <label htmlFor="line-pair-select"><span>Line-size combination</span></label>
                <select id="line-pair-select" className="input-number" value={linePairId} disabled={!params} onChange={(event) => { setLinePairId(event.target.value); updateParam("pair", event.target.value); }}>
                  {profile.linePairs.map((pair) => <option key={pair.id} value={pair.id}>{pair.label} · {pair.adderRateOzPerFt} oz/ft</option>)}
                </select>
              </div>
            </>
          ) : (
            <fieldset className="custom-rate-fields">
              <legend>Values copied from the applicable equipment manual</legend>
              <div className="form-group">
                <label htmlFor="custom-refrigerant-select"><span>Refrigerant</span></label>
                <select id="custom-refrigerant-select" className="input-number" value={customRefrigerant} onChange={(event) => setCustomRefrigerant(event.target.value as ChargeRefrigerant)}>
                  <option value="R454B">R-454B (A2L)</option>
                  <option value="R32">R-32 (A2L)</option>
                  <option value="R410A">R-410A (A1)</option>
                </select>
              </div>
              <div className="charge-inline-fields">
                <div className="form-group">
                  <label htmlFor="custom-liquid-input"><span>Liquid line OD</span></label>
                  <input id="custom-liquid-input" className="input-number" value={customLiquidLine} onChange={(event) => setCustomLiquidLine(event.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="custom-suction-input"><span>Suction line OD</span></label>
                  <input id="custom-suction-input" className="input-number" value={customSuctionLine} onChange={(event) => setCustomSuctionLine(event.target.value)} />
                </div>
              </div>
              <LinkedNumberInput id="custom-allowance-input" label="Factory line allowance" value={displayLength(customFactoryAllowanceFt)} min={0} max={displayLength(100)} step={isMetric ? 0.1 : 1} unit={lengthUnit} onChange={(value) => setLengthFromDisplay(value, setCustomFactoryAllowanceFt, "allowance")} />
              <LinkedNumberInput id="custom-rate-input" label="OEM adder rate" value={displayRate} min={isMetric ? 0.1 : 0.001} max={isMetric ? 200 : 2} step={isMetric ? 0.1 : 0.001} unit={isMetric ? "g/m" : "oz/ft"} onChange={setRateFromDisplay} />
              <div className="form-group">
                <label htmlFor="manual-reference-input"><span>Manual reference</span></label>
                <input id="manual-reference-input" className="input-number" value={manualReference} placeholder="Manufacturer, document, revision, table" onChange={(event) => { setManualReference(event.target.value); updateParam("manual", event.target.value); }} />
                <p className="input-help">Required. Custom mode cannot validate model-specific limits.</p>
              </div>
            </fieldset>
          )}

          <LinkedNumberInput id="actual-length-input" label="Actual linear line-set length" value={displayLength(actualLengthFt)} min={displayLength(mode === "oem_profile" ? profile.minimumLinearLengthFt : 0)} max={displayLength(lengthMax)} step={isMetric ? 0.1 : 1} unit={lengthUnit} help="Use linear tubing length for charge. Equivalent length is used separately for piping limits." onChange={(value) => setLengthFromDisplay(value, setActualLengthFt, "length")} />
          <LinkedNumberInput id="factory-charge-input" label="Factory nameplate charge" value={displayCharge(factoryBaseChargeOz)} min={0} max={isMetric ? 15000 : 500} step={isMetric ? 1 : 0.1} unit={isMetric ? "g" : "oz"} onChange={setChargeFromDisplay} />

          <div className="charge-inline-fields">
            <div className="form-group">
              <label htmlFor="unit-position-select"><span>Outdoor unit position</span></label>
              <select id="unit-position-select" className="input-number" value={outdoorUnitPosition} onChange={(event) => { const value = event.target.value as OutdoorUnitPosition; setOutdoorUnitPosition(value); if (value === "level") setVerticalSeparationFt(0); updateParam("position", value); }}>
                <option value="level">Level with indoor unit</option>
                <option value="outdoor_above">Above indoor unit</option>
                <option value="outdoor_below">Below indoor unit</option>
              </select>
            </div>
            {outdoorUnitPosition !== "level" && (
              <LinkedNumberInput id="vertical-lift-input" label="Vertical separation" value={displayLength(verticalSeparationFt)} min={0} max={displayLength(200)} step={isMetric ? 0.1 : 1} unit={lengthUnit} onChange={(value) => setLengthFromDisplay(value, setVerticalSeparationFt, "lift")} />
            )}
          </div>
        </div>

        <div className="output-panel">
          {!result.ok ? (
            <div className="charge-validation-card" role="alert" aria-live="polite">
              <span className="eyebrow">Input check required</span>
              <h3>Complete the OEM charging inputs</h3>
              <ul>{result.errors.map((error) => <li key={error.code}>{error.message}</li>)}</ul>
            </div>
          ) : (
            <>
              {result.output.safetyGroup === "A2L" && (
                <div id="a2l-charge-warning" className="charge-safety-callout">
                  <strong>A2L handling notice</strong>
                  <span>Use listed A2L recovery, evacuation, leak-detection, and ventilation procedures. Verify the occupied-space charge limit separately.</span>
                </div>
              )}
              <div className={`primary-result-card charge-result--${result.output.adjustmentAction}`} aria-live="polite" aria-atomic="true">
                <span className="result-label">Initial weigh-in estimate</span>
                <div className="result-value">{primaryAction === "No adjustment" ? primaryAction : `${primaryAction} ${primaryValue}`}</div>
                <p>{result.output.liquidLineOd} liquid · {result.output.suctionLineOd} suction · {result.output.adderRateOzPerFt} oz/ft</p>
              </div>

              <div className="secondary-results-grid">
                <div className="secondary-result-item"><span>Factory allowance</span><strong>{displayLength(result.output.factoryAllowanceFt)} {lengthUnit}</strong></div>
                <div className="secondary-result-item"><span>Excess linear length</span><strong>{displayLength(result.output.excessLengthFt)} {lengthUnit}</strong></div>
                <div className="secondary-result-item"><span>Nameplate base</span><strong>{isMetric ? `${(result.output.factoryBaseChargeOz * OZ_TO_G / 1000).toFixed(2)} kg` : result.output.factoryBaseChargeFormatted}</strong></div>
                <div className="secondary-result-item"><span>Initial target total</span><strong>{isMetric ? `${(result.output.initialTargetChargeOz * OZ_TO_G / 1000).toFixed(2)} kg` : result.output.initialTargetChargeFormatted}</strong></div>
              </div>

              <RefrigerantChargeVisualizer output={result.output} />

              <div className="charge-source-card">
                <span className="eyebrow">Calculation authority</span>
                <strong>{result.output.sourceLabel}</strong>
                {result.output.sourceUrl && <a href={result.output.sourceUrl} target="_blank" rel="noreferrer">Open manufacturer source</a>}
                <p>{result.output.limitsNote}</p>
              </div>

              {result.output.warnings.length > 0 && (
                <div className="charge-warning-list" aria-label="Installation warnings">
                  {result.output.warnings.map((warning) => <p key={warning}><strong>Check:</strong> {warning}</p>)}
                </div>
              )}

              <div className="charge-final-step">
                <strong>Required final step</strong>
                <p>{result.output.finalChargeProcedure}</p>
                <div className="handoff-card">
                  <Link href={`/calculators/superheat-subcooling-calculator?refrig=${result.output.refrigerant.toLowerCase()}`}>Verify final superheat / subcooling</Link>
                  <Link href={`/calculators/pt-chart?refrig=${result.output.refrigerant.toLowerCase()}`}>Open refrigerant PT chart</Link>
                </div>
              </div>
            </>
          )}

          <ActionButtonBar toolRoute="/calculators/refrigerant-charge-calculator" toolName="Refrigerant Line Set Charge & Weigh-In Calculator" onExportCsv={result.ok ? exportCsv : undefined} />
        </div>
      </div>

      {result.ok && <MobileResultBar label="Initial weigh-in" value={`${primaryAction} ${primaryValue}`} unit={result.output.refrigerant} />}
    </div>
  );
}
