"use client";

import React, { useState } from "react";

interface PrintSubmittalModalProps {
  calculatorName: string;
  categoryName: string;
  governingStandard: string;
  isOpen: boolean;
  onClose: () => void;
  onPrint: (meta: SubmittalMeta) => void;
}

export interface SubmittalMeta {
  projectName: string;
  clientAddress: string;
  technicianName: string;
  companyName: string;
  notes: string;
}

export function PrintSubmittalModal({
  calculatorName,
  isOpen,
  onClose,
  onPrint,
}: PrintSubmittalModalProps) {
  const [meta, setMeta] = useState<SubmittalMeta>({
    projectName: "",
    clientAddress: "",
    technicianName: "",
    companyName: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handlePrintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPrint(meta);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "1rem",
          padding: "1.75rem",
          maxWidth: "540px",
          width: "100%",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem" }}>🖨️</span>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
              Customize Client Job Submittal
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "1.25rem" }}>
          Add project identification details to be printed on the official 1-page engineering submittal for <strong>{calculatorName}</strong> (optional):
        </p>

        <form onSubmit={handlePrintSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="company-name">Contractor / Company</label>
              <input
                id="company-name"
                type="text"
                placeholder="e.g. Apex Mechanical Ltd."
                value={meta.companyName}
                onChange={(e) => setMeta({ ...meta, companyName: e.target.value })}
                className="input-number"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="tech-name">Designer / Technician</label>
              <input
                id="tech-name"
                type="text"
                placeholder="e.g. J. Doe, PE"
                value={meta.technicianName}
                onChange={(e) => setMeta({ ...meta, technicianName: e.target.value })}
                className="input-number"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="project-name">Project / Job #</label>
              <input
                id="project-name"
                type="text"
                placeholder="e.g. Smith Residence #1042"
                value={meta.projectName}
                onChange={(e) => setMeta({ ...meta, projectName: e.target.value })}
                className="input-number"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label htmlFor="site-addr">Jobsite Location / Tag</label>
              <input
                id="site-addr"
                type="text"
                placeholder="e.g. 124 Main St (AHU-1)"
                value={meta.clientAddress}
                onChange={(e) => setMeta({ ...meta, clientAddress: e.target.value })}
                className="input-number"
                style={{ fontSize: "0.85rem" }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="job-notes">Engineering Notes / Code Exceptions</label>
            <input
              id="job-notes"
              type="text"
              placeholder="e.g. Sized for R-454B low-GWP replacement conforming to ACCA Manual D"
              value={meta.notes}
              onChange={(e) => setMeta({ ...meta, notes: e.target.value })}
              className="input-number"
              style={{ fontSize: "0.85rem" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
            <button onClick={onClose} className="action-btn" type="button">
              Cancel
            </button>
            <button
              type="submit"
              className="action-btn"
              style={{
                background: "var(--accent-primary)",
                color: "#ffffff",
                borderColor: "var(--accent-primary)",
                fontWeight: 700,
              }}
            >
              🖨️ Generate &amp; Print PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
