"use client";

import React, { useState } from "react";

interface ResearchDataExportModalProps {
  toolName: string;
  isOpen: boolean;
  onClose: () => void;
  governingStandard?: string;
  inputs?: Record<string, string | number>;
  outputs?: Record<string, string | number>;
}

export function ResearchDataExportModal({
  toolName,
  isOpen,
  onClose,
  governingStandard = "ASHRAE / ACCA",
  inputs = {},
  outputs = {},
}: ResearchDataExportModalProps) {
  const [activeTab, setActiveTab] = useState<"csv" | "json">("csv");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const timestamp = new Date().toISOString();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://hvaclogic.com";

  // Build CSV payload
  const csvHeaders = ["Parameter_Type", "Variable_Name", "Value", "Standard_Reference", "Timestamp"];
  const csvRows: string[][] = [
    ...Object.entries(inputs).map(([k, v]) => ["INPUT", k, String(v), governingStandard, timestamp]),
    ...Object.entries(outputs).map(([k, v]) => ["OUTPUT", k, String(v), governingStandard, timestamp]),
  ];
  const csvContent = [
    `# HVACLogic Research Data Export - ${toolName}`,
    `# Canonical URL: ${currentUrl}`,
    `# Governing Standard: ${governingStandard}`,
    `# License: Creative Commons Attribution 4.0 International (CC BY 4.0)`,
    csvHeaders.join(","),
    ...csvRows.map((r) => r.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")),
  ].join("\n");

  // Build JSON Dataset payload
  const jsonDataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${toolName} Deterministic Calculation Dataset`,
    description: `Deterministic thermodynamic and building science calculation run for ${toolName} under ${governingStandard}.`,
    url: currentUrl,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: {
      "@type": "Organization",
      name: "HVACLogic Open-Access Building Science Research Group",
      url: "https://hvaclogic.com",
    },
    datePublished: timestamp,
    governingStandard,
    variableMeasured: [
      ...Object.keys(inputs).map((k) => `Input: ${k}`),
      ...Object.keys(outputs).map((k) => `Output: ${k}`),
    ],
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: currentUrl,
      },
    ],
    parameters: {
      inputs,
      outputs,
    },
  };
  const jsonContent = JSON.stringify(jsonDataset, null, 2);

  const activeContent = activeTab === "csv" ? csvContent : jsonContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${toolName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-dataset.${activeTab}`;
    const mimeType = activeTab === "csv" ? "text/csv;charset=utf-8;" : "application/json;charset=utf-8;";
    const blob = new Blob([activeContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(4px)",
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
          borderRadius: "0.75rem",
          maxWidth: "680px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "var(--shadow-lg)",
          padding: "1.75rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div>
            <h3 id="export-modal-title" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
              📊 Export Research Data (.CSV / .JSON)
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.25rem 0 0 0" }}>
              Standardized format with provenance metadata for Google Dataset Search &amp; academic analysis.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.35rem",
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Tab Selection */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <button
            type="button"
            onClick={() => setActiveTab("csv")}
            style={{
              padding: "0.4rem 0.85rem",
              borderRadius: "0.4rem",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              background: activeTab === "csv" ? "var(--accent-cooling)" : "var(--bg-secondary)",
              color: activeTab === "csv" ? "#000000" : "var(--ink)",
            }}
          >
            Spreadsheet CSV (.csv)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("json")}
            style={{
              padding: "0.4rem 0.85rem",
              borderRadius: "0.4rem",
              fontSize: "0.82rem",
              fontWeight: 700,
              cursor: "pointer",
              border: "none",
              background: activeTab === "json" ? "var(--accent-cooling)" : "var(--bg-secondary)",
              color: activeTab === "json" ? "#000000" : "var(--ink)",
            }}
          >
            Schema.org JSON Dataset (.json)
          </button>
        </div>

        {/* Code Preview */}
        <pre
          style={{
            margin: "0 0 1.25rem 0",
            padding: "1rem",
            borderRadius: "0.5rem",
            background: "var(--bg-primary)",
            color: activeTab === "csv" ? "#38bdf8" : "#a78bfa",
            fontSize: "0.78rem",
            fontFamily: "var(--font-mono, monospace)",
            maxHeight: "280px",
            overflow: "auto",
            border: "1px solid var(--border-color)",
            whiteSpace: "pre-wrap",
          }}
        >
          {activeContent}
        </pre>

        {/* Modal Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={handleCopy}
            style={{
              background: copied ? "var(--accent-success)" : "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              borderRadius: "0.4rem",
              color: copied ? "#ffffff" : "var(--ink)",
              fontSize: "0.85rem",
              fontWeight: 600,
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            {copied ? "✓ Copied!" : "📋 Copy to Clipboard"}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            style={{
              background: "var(--accent-cooling)",
              border: "none",
              borderRadius: "0.4rem",
              color: "#000000",
              fontSize: "0.85rem",
              fontWeight: 700,
              padding: "0.5rem 1.15rem",
              cursor: "pointer",
            }}
          >
            📥 Download {activeTab.toUpperCase()} File
          </button>
        </div>
      </div>
    </div>
  );
}
