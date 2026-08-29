"use client";

import React, { useState } from "react";
import { AcademicCitationModal } from "@/components/seo/AcademicCitationModal";

interface CitationExportButtonProps {
  label?: string;
  className?: string;
}

export function CitationExportButton({
  label = "📋 Export Formal Citation (APA / IEEE / BibTeX)",
  className = "",
}: CitationExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`action-btn ${className}`.trim()}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.45rem",
          fontWeight: 600,
          fontSize: "0.82rem",
          cursor: "pointer",
          padding: "0.45rem 0.9rem",
          background: "rgba(0, 210, 255, 0.1)",
          border: "1px solid rgba(0, 210, 255, 0.3)",
          color: "var(--accent-cooling)",
          borderRadius: "0.5rem",
        }}
      >
        <span>🎓</span>
        <span>{label}</span>
      </button>

      <AcademicCitationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="HVACLogic Engineering Framework Citation"
      />
    </>
  );
}
