"use client";

import React, { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

interface EmbedModalProps {
  toolRoute: string;
  toolName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EmbedModal({ toolRoute, toolName, isOpen, onClose }: EmbedModalProps) {
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState("720");
  const [showPreview, setShowPreview] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slug = toolRoute.replace(/^\/calculators\//, "");
  const embedUrl = `${siteConfig.canonicalDomain}/embed/${slug}`;
  const canonicalToolUrl = `${siteConfig.canonicalDomain}${toolRoute}`;
  const iframeCode = `<iframe src="${embedUrl}" width="100%" height="${height}" style="border:1px solid #2e3b52;border-radius:12px;max-width:960px;width:100%;" title="${toolName} — HVACLogic" loading="lazy" allow="clipboard-write"></iframe>\n<p style="font-size:12px;color:#64748b;margin-top:6px;font-family:sans-serif;">Free HVAC calculations verified against ASHRAE &amp; ACCA standards by <a href="${canonicalToolUrl}" target="_blank" rel="noopener" style="color:#00d2ff;text-decoration:underline;font-weight:600;">HVACLogic Engineering Suite</a></p>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(iframeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="presentation"
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
        role="dialog"
        aria-modal="true"
        aria-labelledby="embed-dialog-title"
        aria-describedby="embed-dialog-description"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-color)",
          borderRadius: "1rem",
          padding: "1.75rem",
          maxWidth: "640px",
          width: "100%",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem" }}>&lt;/&gt;</span>
            <h3 id="embed-dialog-title" style={{ fontSize: "1.2rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>
              Embed {toolName}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "1.5rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
            aria-label="Close embed dialog"
          >
            ×
          </button>
        </div>

        <p id="embed-dialog-description" style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", marginBottom: "1.25rem", lineHeight: 1.5 }}>
          Paste this responsive widget snippet into your website, contractor blog, LMS portal, or distributor intranet. 100% free with no API keys or database tracking required.
        </p>

        {/* Height Selector & Preview Toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", fontSize: "0.8125rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label htmlFor="height-select" style={{ fontWeight: 600, color: "var(--ink)" }}>Widget Height:</label>
            <select
              id="height-select"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input-number"
              style={{ height: "32px", width: "100px", padding: "0 0.5rem", fontSize: "0.8125rem" }}
            >
              <option value="600">600 px</option>
              <option value="720">720 px</option>
              <option value="850">850 px</option>
              <option value="1000">1000 px</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            style={{
              background: "none",
              border: "none",
              color: "var(--accent-cooling)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {showPreview ? "Hide Preview" : "Show Live Preview"}
          </button>
        </div>

        {/* Snippet Code Box */}
        <textarea
          readOnly
          value={iframeCode}
          rows={5}
          style={{
            width: "100%",
            background: "var(--bg-primary)",
            border: "1px solid var(--border-color)",
            borderRadius: "0.5rem",
            padding: "0.85rem",
            color: "var(--accent-cooling)",
            fontFamily: "monospace",
            fontSize: "0.75rem",
            marginBottom: "1.25rem",
            resize: "none",
            lineHeight: 1.4,
          }}
        />

        {/* Live Preview Box */}
        {showPreview && (
          <div style={{ marginBottom: "1.25rem", border: "1px solid var(--border-color)", borderRadius: "0.5rem", overflow: "hidden" }}>
            <div style={{ background: "var(--bg-secondary)", padding: "0.4rem 0.75rem", fontSize: "0.72rem", color: "var(--text-muted)" }}>
              Live Widget Preview:
            </div>
            <iframe
              src={`${toolRoute}?embed=true`}
              width="100%"
              height="380"
              style={{ border: "none", width: "100%" }}
              title={`Preview of ${toolName}`}
            />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button onClick={onClose} className="action-btn" type="button">
            Close
          </button>
          <button
            onClick={handleCopy}
            className="action-btn"
            type="button"
            style={{
              background: copied ? "var(--accent-success)" : "var(--accent-primary)",
              color: "#ffffff",
              borderColor: copied ? "var(--accent-success)" : "var(--accent-primary)",
            }}
          >
            {copied ? "✓ Copied Embed Code!" : "📋 Copy HTML Code"}
          </button>
        </div>
      </div>
    </div>
  );
}
