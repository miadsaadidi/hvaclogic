"use client";

import React, { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { SubmittalMeta } from "@/components/calculator/PrintSubmittalModal";

interface PrintJobSubmittalProps {
  calculatorName: string;
  categoryName: string;
  governingStandard: string;
}

export function PrintJobSubmittal({
  calculatorName,
  categoryName,
  governingStandard,
}: PrintJobSubmittalProps) {
  const [meta, setMeta] = useState<SubmittalMeta | null>(null);

  useEffect(() => {
    const handleSubmittalUpdate = (e: CustomEvent<SubmittalMeta>) => {
      setMeta(e.detail);
    };
    window.addEventListener("hvaclogic:submittal-update" as any, handleSubmittalUpdate);
    return () => window.removeEventListener("hvaclogic:submittal-update" as any, handleSubmittalUpdate);
  }, []);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="print-submittal-header" style={{ display: "none" }}>
      <div
        style={{
          borderBottom: "2px solid #000000",
          paddingBottom: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, textTransform: "uppercase", letterSpacing: "0.04em", color: "#000000" }}>
              HVAC Mechanical Calculation Submittal
            </div>
            <p style={{ fontSize: "0.85rem", margin: "0.25rem 0 0", color: "#333333" }}>
              {meta?.companyName ? `${meta.companyName} • Generated via ` : ""}{siteConfig.name} ({siteConfig.canonicalDomain})
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700 }}>DATE: {currentDate}</div>
            <div style={{ fontSize: "0.75rem", color: "#555555" }}>CODE COMPLIANCE RECORD</div>
          </div>
        </div>

        {/* Project Metadata Fillable Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
            marginTop: "1rem",
            background: "#f9f9f9",
            padding: "0.75rem",
            border: "1px solid #dddddd",
            borderRadius: "4px",
            fontSize: "0.8rem",
          }}
        >
          <div>
            <strong>PROJECT / JOB:</strong>
            <div style={{ fontWeight: 600, color: "#000" }}>{meta?.projectName || "_________________________"}</div>
          </div>
          <div>
            <strong>JOB LOCATION / SITE:</strong>
            <div style={{ fontWeight: 600, color: "#000" }}>{meta?.clientAddress || "_________________________"}</div>
          </div>
          <div>
            <strong>DESIGNER / TECHNICIAN:</strong>
            <div style={{ fontWeight: 600, color: "#000" }}>{meta?.technicianName || "_________________________"}</div>
          </div>
          <div>
            <strong>SYSTEM DISCIPLINE:</strong>
            <div>{categoryName}</div>
          </div>
          <div>
            <strong>CALCULATOR MODULE:</strong>
            <div>{calculatorName}</div>
          </div>
          <div>
            <strong>GOVERNING STANDARD:</strong>
            <div>{governingStandard}</div>
          </div>
        </div>

        {meta?.notes && (
          <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", background: "#f0f4f8", padding: "0.5rem 0.75rem", borderLeft: "3px solid #000" }}>
            <strong>ENGINEERING NOTES:</strong> {meta.notes}
          </div>
        )}
      </div>
    </div>
  );
}
