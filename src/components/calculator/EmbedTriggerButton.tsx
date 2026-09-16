"use client";

import React, { useRef, useState } from "react";
import { EmbedModal } from "@/components/calculator/EmbedModal";

interface EmbedTriggerButtonProps {
  toolRoute: string;
  toolName: string;
}

export function EmbedTriggerButton({ toolRoute, toolName }: EmbedTriggerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        className="action-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.8125rem",
          padding: "0.35rem 0.75rem",
          borderRadius: "6px",
          border: "1px solid var(--border-color)",
          background: "var(--surface)",
          color: "var(--accent-cooling, #38bdf8)",
          cursor: "pointer",
          fontWeight: 600,
          transition: "all 0.2s ease",
        }}
        title="Embed this interactive calculator widget on your website"
        aria-label={`Embed ${toolName} widget`}
      >
        <span style={{ fontSize: "0.9rem" }}>&lt;/&gt;</span>
        <span>Embed Tool</span>
      </button>

      <EmbedModal
        toolRoute={toolRoute}
        toolName={toolName}
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  );
}
