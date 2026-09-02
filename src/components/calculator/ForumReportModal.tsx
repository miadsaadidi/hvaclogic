"use client";

import React, { useState, useEffect, useRef } from "react";

export interface ForumReportModalProps {
  toolRoute: string;
  toolName: string;
  isOpen: boolean;
  onClose: () => void;
  diagnosticSummary?: Record<string, string | number>;
  governingStandard?: string;
}

export function ForumReportModal({
  toolRoute,
  toolName,
  isOpen,
  onClose,
  diagnosticSummary,
  governingStandard = "ASHRAE / ACCA Standards",
}: ForumReportModalProps) {
  const [format, setFormat] = useState<"markdown" | "bbcode" | "plaintext">("markdown");
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [currentUrl, setCurrentUrl] = useState(`https://hvaclogic.org${toolRoute}`);
  const [parsedParams, setParsedParams] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      const url = new URL(window.location.href);
      const params: Record<string, string> = {};
      url.searchParams.forEach((val, key) => {
        params[key] = val;
      });
      setParsedParams(params);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      closeBtnRef.current?.focus();
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const dataEntries = diagnosticSummary
    ? Object.entries(diagnosticSummary)
    : Object.entries(parsedParams);

  // Generate Markdown
  const generateMarkdown = () => {
    const rows = dataEntries.length > 0
      ? dataEntries.map(([k, v]) => `| **${k}** | ${v} |`).join("\n")
      : `| Parameter | Current Value |\n| --- | --- |\n| Tool | ${toolName} |`;

    return `### 🛠️ HVAC Calculation Report: ${toolName}
**Governing Standard:** ${governingStandard}
**Calculation Date:** ${new Date().toISOString().split("T")[0]}

| Parameter / Diagnostic Metric | Value |
| :--- | :--- |
${rows}

> 🔗 **Interactive Calculation Permalinks & Formulas:**  
> [View Full Calculation on HVACLogic.org](${currentUrl})

*Generated via HVACLogic Building Science & Thermodynamic Engine (100% Client-Side Free Tool)*`;
  };

  // Generate BBCode (for traditional forums like HVAC-Talk, DIYChatroom, etc.)
  const generateBBCode = () => {
    const rows = dataEntries.length > 0
      ? dataEntries.map(([k, v]) => `[tr][td][b]${k}[/b][/td][td]${v}[/td][/tr]`).join("\n")
      : `[tr][td][b]Tool[/b][/td][td]${toolName}[/td][/tr]`;

    return `[size=4][b]🛠️ HVAC Diagnostic Sizing Report: ${toolName}[/b][/size]
[b]Governing Standard:[/b] ${governingStandard}
[b]Date:[/b] ${new Date().toISOString().split("T")[0]}

[table]
[tr][th]Parameter / Metric[/th][th]Value[/th][/tr]
${rows}
[/table]

[b]Interactive Permalinks & Engineering Math:[/b]
[url=${currentUrl}]Click here to view live calculation on HVACLogic.org[/url]

[i]Deterministic calculation verified against ASHRAE & ACCA standards.[/i]`;
  };

  // Generate Plain Text
  const generatePlainText = () => {
    const rows = dataEntries.length > 0
      ? dataEntries.map(([k, v]) => `• ${k}: ${v}`).join("\n")
      : `• Tool: ${toolName}`;

    return `HVAC SIZING & DIAGNOSTIC REPORT: ${toolName.toUpperCase()}
Standard: ${governingStandard}
Date: ${new Date().toISOString().split("T")[0]}

DIAGNOSTIC SUMMARY:
${rows}

Interactive Link to this exact calculation:
${currentUrl}

(Verified deterministic calculation via HVACLogic.org)`;
  };

  const currentSnippet =
    format === "markdown"
      ? generateMarkdown()
      : format === "bbcode"
      ? generateBBCode()
      : generatePlainText();

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(currentSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="forum-report-title"
      onClick={onClose}
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
    >
      <div
        ref={modalRef}
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--surface-primary, #111827)",
          border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
          borderTop: "4px solid var(--accent, #38bdf8)",
          borderRadius: "8px",
          maxWidth: "680px",
          width: "100%",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          color: "var(--ink-primary, #f3f4f6)",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent, #38bdf8)", fontWeight: 700 }}>
              COMMUNITY & FORUM SHARING
            </div>
            <h2 id="forum-report-title" style={{ margin: "0.25rem 0 0 0", fontSize: "1.25rem", color: "var(--ink-primary, #f9fafb)" }}>
              Share Diagnostic Report
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--ink-secondary, #9ca3af)",
              fontSize: "1.5rem",
              cursor: "pointer",
              lineHeight: 1,
              padding: "0.25rem",
            }}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--ink-secondary, #9ca3af)", lineHeight: 1.5 }}>
          Copy pre-formatted calculation outputs with your live inputs and backlink permalinks for posting on contractor forums, Reddit discussions, or client diagnostic submittals.
        </p>

        {/* Format Switcher Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", borderBottom: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))", paddingBottom: "0.5rem" }}>
          <button
            type="button"
            onClick={() => setFormat("markdown")}
            style={{
              padding: "0.35rem 0.75rem",
              fontSize: "0.8125rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              backgroundColor: format === "markdown" ? "var(--accent, #38bdf8)" : "transparent",
              color: format === "markdown" ? "#0f172a" : "var(--ink-secondary, #9ca3af)",
              fontWeight: 600,
            }}
          >
            Markdown (Reddit / Discord / GitHub)
          </button>
          <button
            type="button"
            onClick={() => setFormat("bbcode")}
            style={{
              padding: "0.35rem 0.75rem",
              fontSize: "0.8125rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              backgroundColor: format === "bbcode" ? "var(--accent, #38bdf8)" : "transparent",
              color: format === "bbcode" ? "#0f172a" : "var(--ink-secondary, #9ca3af)",
              fontWeight: 600,
            }}
          >
            BBCode (HVAC-Talk / DIY Forums)
          </button>
          <button
            type="button"
            onClick={() => setFormat("plaintext")}
            style={{
              padding: "0.35rem 0.75rem",
              fontSize: "0.8125rem",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              backgroundColor: format === "plaintext" ? "var(--accent, #38bdf8)" : "transparent",
              color: format === "plaintext" ? "#0f172a" : "var(--ink-secondary, #9ca3af)",
              fontWeight: 600,
            }}
          >
            Plain Text
          </button>
        </div>

        {/* Snippet Preview Area */}
        <div style={{ position: "relative" }}>
          <textarea
            readOnly
            value={currentSnippet}
            rows={9}
            style={{
              width: "100%",
              fontFamily: "monospace",
              fontSize: "0.8125rem",
              backgroundColor: "var(--surface-secondary, #0a0f1d)",
              color: "var(--ink-primary, #e2e8f0)",
              border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))",
              borderRadius: "6px",
              padding: "0.75rem",
              resize: "none",
              lineHeight: 1.4,
            }}
            onClick={(e) => (e.target as HTMLTextAreaElement).select()}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              borderRadius: "4px",
              border: "1px solid var(--border-subtle, rgba(255, 255, 255, 0.2))",
              backgroundColor: "transparent",
              color: "var(--ink-secondary, #9ca3af)",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleCopy}
            style={{
              padding: "0.5rem 1.25rem",
              fontSize: "0.875rem",
              borderRadius: "4px",
              border: "none",
              backgroundColor: copied ? "var(--success, #10b981)" : "var(--accent, #38bdf8)",
              color: "#0f172a",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
          >
            {copied ? "✓ Copied to Clipboard!" : "📋 Copy Report Snippet"}
          </button>
        </div>
      </div>
    </div>
  );
}
