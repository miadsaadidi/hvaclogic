"use client";

import React, { useState } from "react";
import { EmbedModal } from "@/components/calculator/EmbedModal";
import { PrintSubmittalModal, SubmittalMeta } from "@/components/calculator/PrintSubmittalModal";

interface ActionButtonBarProps {
  toolRoute: string;
  toolName: string;
  onExportCsv?: () => void;
}

export function ActionButtonBar({ toolRoute, toolName, onExportCsv }: ActionButtonBarProps) {
  const [copied, setCopied] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [printOpen, setPrintOpen] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrintConfirm = (meta: SubmittalMeta) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("hvaclogic:submittal-update", { detail: meta }));
      setPrintOpen(false);
      setTimeout(() => {
        window.print();
      }, 150);
    }
  };

  return (
    <>
      <div className="action-button-bar" role="toolbar" aria-label="Tool actions">
        <button
          onClick={handleShare}
          className="action-btn"
          title="Share calculation link with current values"
          type="button"
        >
          {copied ? "✓ Copied Link!" : "🔗 Share Link"}
        </button>

        <button
          onClick={() => setPrintOpen(true)}
          className="action-btn"
          title="Print official calculation job submittal card"
          type="button"
        >
          🖨️ Print Spec
        </button>

        {onExportCsv && (
          <button
            onClick={onExportCsv}
            className="action-btn"
            title="Export calculation results as CSV spreadsheet"
            type="button"
          >
            📊 Export CSV
          </button>
        )}

        <button
          onClick={() => setEmbedOpen(true)}
          className="action-btn"
          title="Embed this calculator on your website"
          type="button"
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

      <PrintSubmittalModal
        calculatorName={toolName}
        categoryName="HVAC Engineering"
        governingStandard="ASHRAE / ACCA"
        isOpen={printOpen}
        onClose={() => setPrintOpen(false)}
        onPrint={handlePrintConfirm}
      />
    </>
  );
}
