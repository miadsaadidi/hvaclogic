"use client";

import React from "react";
import { siteConfig } from "@/lib/site-config";

interface GooglePreferredBannerProps {
  className?: string;
  domain?: string;
  hidden?: boolean;
}

/**
 * Master release flag for Google Preferred Source banner.
 * Keep as `false` while pending in Google Publisher Center / Preferred Sources directory.
 * Flipping this to `true` activates the banner across ALL calculators site-wide simultaneously!
 */
export const GOOGLE_PREFERRED_ACTIVE = true;

export function GooglePreferredBanner({
  className = "",
  domain,
  hidden,
}: GooglePreferredBannerProps) {
  const isHidden = hidden !== undefined ? hidden : !GOOGLE_PREFERRED_ACTIVE;

  if (isHidden) {
    return null; // Renders 0 DOM elements while pending
  }

  const targetDomain =
    domain ||
    (() => {
      try {
        return new URL(siteConfig.canonicalDomain).hostname.replace(/^www\./, "");
      } catch {
        return "hvaclogic.org";
      }
    })();

  const targetUrl = `https://www.google.com/preferences/source?q=${encodeURIComponent(targetDomain)}`;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`google-preferred-banner ${className}`.trim()}
      title="Pin HVACLogic to your Google preferences to see our calculators first in search and AI Overviews"
      aria-label="Found this helpful? Keep HVACLogic first on Google — in 1 click, pin HVACLogic to your Google preferences (opens in a new tab)"
      style={{
        width: "100%",
        marginTop: "1.1rem",
        padding: "0.85rem 1rem",
        borderRadius: "0.75rem",
        border: "1px solid var(--border-color, #cbd5e1)",
        background: "linear-gradient(135deg, var(--surface, #ffffff) 0%, rgba(2, 132, 199, 0.08) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0.75rem",
        textDecoration: "none",
        color: "inherit",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        transition: "transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
        {/* Authentic Google 4-Color Icon */}
        <div
          style={{
            flexShrink: 0,
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </div>

        {/* Value Proposition Copy */}
        <div style={{ minWidth: 0, textAlign: "left" }}>
          <div
            style={{
              fontSize: "0.88rem",
              fontWeight: 700,
              color: "var(--ink, #0f172a)",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              lineHeight: 1.25,
            }}
          >
            <span>Keep HVACLogic First on Google</span>
            <span
              style={{
                display: "inline-block",
                padding: "0.1rem 0.4rem",
                borderRadius: "999px",
                fontSize: "0.68rem",
                fontWeight: 700,
                background: "rgba(2, 132, 199, 0.1)",
                color: "#0284c7",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              1-Click
            </span>
          </div>
          <p
            style={{
              margin: "0.2rem 0 0",
              fontSize: "0.76rem",
              color: "var(--ink-secondary, #64748b)",
              lineHeight: 1.35,
            }}
          >
            Pin our calculators to your Google preferences to see accurate HVAC math first in search &amp; AI Overviews.
          </p>
        </div>
      </div>

      {/* Pill Button Action */}
      <div
        style={{
          flexShrink: 0,
          background: "#0284c7",
          color: "#ffffff",
          fontSize: "0.78rem",
          fontWeight: 600,
          padding: "0.45rem 0.85rem",
          borderRadius: "0.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          whiteSpace: "nowrap",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        <span>Pin</span>
        <span aria-hidden="true" style={{ fontSize: "0.85rem" }}>📌</span>
      </div>
    </a>
  );
}
