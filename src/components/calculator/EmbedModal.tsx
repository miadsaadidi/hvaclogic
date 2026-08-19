"use client";

import React, { useState } from "react";

interface EmbedModalProps {
  toolRoute: string;
  toolName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EmbedModal({ toolRoute, toolName, isOpen, onClose }: EmbedModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const embedUrl = `https://hvaclogic.org${toolRoute}?embed=true`;
  const iframeCode = `<iframe src="${embedUrl}" width="100%" height="700" style="border:1px solid #2e3b52;border-radius:12px;max-width:960px;" title="${toolName} by HVAC Logic" loading="lazy"></iframe><p style="font-size:12px;color:#64748b;margin-top:4px;">Calculations by <a href="https://hvaclogic.org${toolRoute}" target="_blank" rel="noopener">HVAC Logic</a></p>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
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
          borderRadius: "1rem",
          padding: "1.75rem",
          maxWidth: "580px",
          width: "100%",
          boxShadow: "var(--shadow-lg)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Embed {toolName}</h3>
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

        <p style={{ fontSize: "0.875rem", color: "var(--ink-secondary)", marginBottom: "1rem" }}>
          Embed this interactive calculator on your trade website, educational blog, or manufacturer portal:
        </p>

        <textarea
          readOnly
          value={iframeCode}
          rows={5}
          style={{
            width: "100%",
            background: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            color: "var(--accent-cooling)",
            fontFamily: "monospace",
            fontSize: "0.75rem",
            marginBottom: "1.25rem",
            resize: "none",
          }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button onClick={onClose} className="action-btn">
            Cancel
          </button>
          <button
            onClick={handleCopy}
            className="action-btn"
            style={{
              background: copied ? "var(--accent-success)" : "var(--accent-primary)",
              color: "#ffffff",
              borderColor: "transparent",
            }}
          >
            {copied ? "✓ Copied to Clipboard!" : "Copy Embed Code"}
          </button>
        </div>
      </div>
    </div>
  );
}
