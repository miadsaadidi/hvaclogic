"use client";

import React, { useRef, useState } from "react";
import { EmbedModal } from "@/components/calculator/EmbedModal";
import { PrintSubmittalModal, SubmittalMeta } from "@/components/calculator/PrintSubmittalModal";
import { ForumReportModal } from "@/components/calculator/ForumReportModal";

interface ActionButtonBarProps {
  toolRoute: string;
  toolName: string;
  onExportCsv?: () => void;
  diagnosticSummary?: Record<string, string | number>;
  governingStandard?: string;
}

export function ActionButtonBar({
  toolRoute,
  toolName,
  onExportCsv,
  diagnosticSummary,
  governingStandard,
}: ActionButtonBarProps) {
  const [copied, setCopied] = useState(false);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [printOpen, setPrintOpen] = useState(false);
  const [forumOpen, setForumOpen] = useState(false);

  const embedTriggerRef = useRef<HTMLButtonElement>(null);
  const printTriggerRef = useRef<HTMLButtonElement>(null);
  const forumTriggerRef = useRef<HTMLButtonElement>(null);

  const closeEmbed = () => {
    setEmbedOpen(false);
    requestAnimationFrame(() => embedTriggerRef.current?.focus());
  };

  const closePrint = () => {
    setPrintOpen(false);
    requestAnimationFrame(() => printTriggerRef.current?.focus());
  };

  const closeForum = () => {
    setForumOpen(false);
    requestAnimationFrame(() => forumTriggerRef.current?.focus());
  };

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
        printTriggerRef.current?.focus();
      }, 150);
    }
  };

  return (
    <>
      <div className="action-button-bar" role="toolbar" aria-label="Tool actions">
        <button
          onClick={handleShare}
          className="action-btn"
          title="Share direct calculation permalink with current input parameters"
          type="button"
        >
          {copied ? "✓ Copied Link!" : "🔗 Share Link"}
        </button>

        <button
          ref={forumTriggerRef}
          onClick={() => setForumOpen(true)}
          className="action-btn"
          title="Generate formatted diagnostic calculation snippet for forums (Markdown, BBCode, Text)"
          type="button"
        >
          📋 Forum Report
        </button>

        <button
          ref={printTriggerRef}
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
          ref={embedTriggerRef}
          onClick={() => setEmbedOpen(true)}
          className="action-btn"
          title="Embed this calculator on your website"
          type="button"
        >
          &lt;/&gt; Embed Tool
        </button>
      </div>

      <ForumReportModal
        toolRoute={toolRoute}
        toolName={toolName}
        isOpen={forumOpen}
        onClose={closeForum}
        diagnosticSummary={diagnosticSummary}
        governingStandard={governingStandard}
      />

      <EmbedModal
        toolRoute={toolRoute}
        toolName={toolName}
        isOpen={embedOpen}
        onClose={closeEmbed}
      />

      <PrintSubmittalModal
        calculatorName={toolName}
        categoryName="HVAC Engineering"
        governingStandard="ASHRAE / ACCA"
        isOpen={printOpen}
        onClose={closePrint}
        onPrint={handlePrintConfirm}
      />
    </>
  );
}

