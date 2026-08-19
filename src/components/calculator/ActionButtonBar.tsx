"use client";

import React, { useState } from "react";
import { EmbedModal } from "@/components/calculator/EmbedModal";

interface ActionButtonBarProps {
  toolRoute: string;
  toolName: string;
  onExportCsv?: () => void;
}

export function ActionButtonBar({ toolRoute, toolName, onExportCsv }: ActionButtonBarProps) {
  const [copied, setCopied] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <>
      <div className="action-button-bar" role="toolbar" aria-label="Tool actions">
        <button
          onClick={handleShare}
          className="action-btn"
          title="Share calculation link with current values"
        >
          {copied ? "✓ Copied Link!" : "🔗 Share Link"}
        </button>

        <button
          onClick={handlePrint}
          className="action-btn"
          title="Print official calculation job submittal card"
        >
          🖨️ Print Spec
        </button>

        {onExportCsv && (
          <button
            onClick={onExportCsv}
            className="action-btn"
            title="Export calculation results as CSV spreadsheet"
          >
            📊 Export CSV
          </button>
        )}

        <button
          onClick={() => setEmbedOpen(true)}
          className="action-btn"
          title="Embed this calculator on your website"
        >
          &lt;/&gt; Embed Tool
        </button>
      </div>

      <EmbedModal
        toolRoute={toolRoute}
        toolName={toolName}
        isOpen={embedOpen}
        onClose={() => setEmbedOpen(false)}
      />
    </>
  );
}
