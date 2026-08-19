"use client";

import React, { useState, useEffect } from "react";

type ConverterType = "airflow" | "capacity" | "pressure" | "temp";

export function UnitConverterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<ConverterType>("airflow");

  // Airflow State
  const [cfm, setCfm] = useState<number>(1200);

  // Capacity State
  const [btu, setBtu] = useState<number>(36000);

  // Pressure State
  const [inWg, setInWg] = useState<number>(0.08);

  // Temperature State
  const [tempF, setTempF] = useState<number>(75);

  // Keyboard shortcut listener (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="action-btn"
        style={{
          height: "36px",
          padding: "0 0.65rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.78rem",
          color: "var(--ink)",
          background: "var(--surface)",
          borderColor: "var(--border-color)",
        }}
        title="Open HVAC Unit Conversion Calculator"
        aria-label="Unit Converter"
      >
        <span style={{ fontSize: "0.9rem" }}>🔄</span>
        <span className="unit-converter-btn-text" style={{ display: "none" }}>Converter</span>
      </button>

      <style jsx>{`
        @media (min-width: 768px) {
          .unit-converter-btn-text {
            display: inline !important;
          }
        }
      `}</style>

      {/* Modal Backdrop with Expanded Screen Width */}
      {isOpen && (
        <div
          className="command-palette-backdrop"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="HVAC Unit Converter"
        >
          <div className="unit-converter-card" onClick={(e) => e.stopPropagation()}>
            {/* Header Row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.35rem" }}>🔄</span>
                <div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    HVAC Engineering Unit Converter
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                    Instant bidirectional conversions for airflow, capacity, static pressure, and temperature.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-muted)",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Converter Tabs */}
            <div className="converter-tabs">
              <button
                type="button"
                className={`converter-tab-btn ${tab === "airflow" ? "active" : ""}`}
                onClick={() => setTab("airflow")}
              >
                🌀 Airflow (CFM / L/s / m³h)
              </button>
              <button
                type="button"
                className={`converter-tab-btn ${tab === "capacity" ? "active" : ""}`}
                onClick={() => setTab("capacity")}
              >
                ❄️ Capacity (BTU / Tons / kW)
              </button>
              <button
                type="button"
                className={`converter-tab-btn ${tab === "pressure" ? "active" : ""}`}
                onClick={() => setTab("pressure")}
              >
                📊 Pressure (in.wg / Pa / psig)
              </button>
              <button
                type="button"
                className={`converter-tab-btn ${tab === "temp" ? "active" : ""}`}
                onClick={() => setTab("temp")}
              >
                🌡️ Temperature (°F / °C / K)
              </button>
            </div>

            {/* TAB CONTENT: AIRFLOW */}
            {tab === "airflow" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", alignItems: "start" }}>
                  <div className="form-group">
                    <label htmlFor="conv-cfm-input"><span>Airflow Volume (CFM)</span></label>
                    <input
                      id="conv-cfm-input"
                      type="number"
                      value={cfm}
                      onChange={(e) => setCfm(parseFloat(e.target.value) || 0)}
                      className="input-number"
                      style={{ fontSize: "1.25rem", fontWeight: 700 }}
                    />

                    {/* Quick Presets */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.6rem" }}>
                      {[400, 800, 1200, 1600, 2000, 3000].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setCfm(v)}
                          style={{
                            fontSize: "0.72rem",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            border: "1px solid var(--border-color)",
                            background: cfm === v ? "var(--accent-cooling)" : "var(--surface-raised)",
                            color: cfm === v ? "#ffffff" : "var(--ink-secondary)",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          {v} CFM ({v / 400}T)
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="secondary-results-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                    <div className="secondary-result-item">
                      <div className="item-label">Liters per Second (L/s)</div>
                      <div className="item-value" style={{ color: "var(--accent-cooling)" }}>{(cfm * 0.471947).toFixed(1)} L/s</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Cubic Meters / Hour</div>
                      <div className="item-value">{(cfm * 1.69901).toFixed(1)} m³/h</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Cubic Meters / Second</div>
                      <div className="item-value">{(cfm * 0.000471947).toFixed(4)} m³/s</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Mass Airflow (Dry Air)</div>
                      <div className="item-value">{(cfm * 0.075 * 60).toFixed(1)} lb/hr</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CAPACITY */}
            {tab === "capacity" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", alignItems: "start" }}>
                  <div className="form-group">
                    <label htmlFor="conv-btu-input"><span>Cooling &amp; Heating Power (BTU/hr)</span></label>
                    <input
                      id="conv-btu-input"
                      type="number"
                      step="1000"
                      value={btu}
                      onChange={(e) => setBtu(parseFloat(e.target.value) || 0)}
                      className="input-number"
                      style={{ fontSize: "1.25rem", fontWeight: 700 }}
                    />

                    {/* Quick Presets */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.6rem" }}>
                      {[18000, 24000, 30000, 36000, 48000, 60000].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setBtu(v)}
                          style={{
                            fontSize: "0.72rem",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            border: "1px solid var(--border-color)",
                            background: btu === v ? "var(--accent-cooling)" : "var(--surface-raised)",
                            color: btu === v ? "#ffffff" : "var(--ink-secondary)",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          {(v / 12000).toFixed(1)} Tons ({v.toLocaleString()} BTU)
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="secondary-results-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                    <div className="secondary-result-item">
                      <div className="item-label">Tons of Refrigeration (TR)</div>
                      <div className="item-value" style={{ color: "var(--accent-cooling)" }}>{(btu / 12000).toFixed(2)} Tons</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Kilowatts Thermal (kW)</div>
                      <div className="item-value">{(btu / 3412.142).toFixed(2)} kW</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Total Watts (W)</div>
                      <div className="item-value">{(btu / 3.412142).toLocaleString(undefined, { maximumFractionDigits: 0 })} W</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Boiler Horsepower (BHP)</div>
                      <div className="item-value">{(btu / 33475).toFixed(2)} BHP</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PRESSURE */}
            {tab === "pressure" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", alignItems: "start" }}>
                  <div className="form-group">
                    <label htmlFor="conv-inwg-input"><span>Static Pressure (in. w.g.)</span></label>
                    <input
                      id="conv-inwg-input"
                      type="number"
                      step="0.01"
                      value={inWg}
                      onChange={(e) => setInWg(parseFloat(e.target.value) || 0)}
                      className="input-number"
                      style={{ fontSize: "1.25rem", fontWeight: 700 }}
                    />

                    {/* Quick Presets */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.6rem" }}>
                      {[0.05, 0.08, 0.10, 0.25, 0.50, 1.0].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setInWg(v)}
                          style={{
                            fontSize: "0.72rem",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            border: "1px solid var(--border-color)",
                            background: inWg === v ? "var(--accent-cooling)" : "var(--surface-raised)",
                            color: inWg === v ? "#ffffff" : "var(--ink-secondary)",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          {v} in.wg
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="secondary-results-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                    <div className="secondary-result-item">
                      <div className="item-label">Pascals (Pa)</div>
                      <div className="item-value" style={{ color: "var(--accent-cooling)" }}>{(inWg * 248.84).toFixed(1)} Pa</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Kilopascals (kPa)</div>
                      <div className="item-value">{(inWg * 0.24884).toFixed(3)} kPa</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Pounds / Sq Inch (psig)</div>
                      <div className="item-value">{(inWg * 0.0360912).toFixed(4)} psig</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Millibar (mbar)</div>
                      <div className="item-value">{(inWg * 2.4884).toFixed(2)} mbar</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: TEMPERATURE */}
            {tab === "temp" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", alignItems: "start" }}>
                  <div className="form-group">
                    <label htmlFor="conv-temp-input"><span>Fahrenheit (°F)</span></label>
                    <input
                      id="conv-temp-input"
                      type="number"
                      step="0.5"
                      value={tempF}
                      onChange={(e) => setTempF(parseFloat(e.target.value) || 0)}
                      className="input-number"
                      style={{ fontSize: "1.25rem", fontWeight: 700 }}
                    />

                    {/* Quick Presets */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.6rem" }}>
                      {[32, 40, 70, 75, 95, 120].map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setTempF(v)}
                          style={{
                            fontSize: "0.72rem",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            border: "1px solid var(--border-color)",
                            background: tempF === v ? "var(--accent-cooling)" : "var(--surface-raised)",
                            color: tempF === v ? "#ffffff" : "var(--ink-secondary)",
                            cursor: "pointer",
                            fontWeight: 600,
                          }}
                        >
                          {v}°F
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="secondary-results-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
                    <div className="secondary-result-item">
                      <div className="item-label">Celsius (°C)</div>
                      <div className="item-value" style={{ color: "var(--accent-cooling)" }}>{(((tempF - 32) * 5) / 9).toFixed(1)}°C</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Kelvin (K)</div>
                      <div className="item-value">{(((tempF - 32) * 5) / 9 + 273.15).toFixed(1)} K</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Rankine (°R)</div>
                      <div className="item-value">{(tempF + 459.67).toFixed(1)} °R</div>
                    </div>
                    <div className="secondary-result-item">
                      <div className="item-label">Delta vs Freezing (32°F)</div>
                      <div className="item-value">{tempF >= 32 ? `+${(tempF - 32).toFixed(1)}°F` : `${(tempF - 32).toFixed(1)}°F`}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
