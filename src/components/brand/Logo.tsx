import React from "react";

interface LogoProps {
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ showTagline = true, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: { box: 28, radius: 7, font: "1.125rem", subFont: "0.55rem" },
    md: { box: 36, radius: 9, font: "1.375rem", subFont: "0.625rem" },
    lg: { box: 48, radius: 12, font: "1.75rem", subFont: "0.75rem" },
  };

  const current = iconSizes[size];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", textDecoration: "none" }}>
      {/* SVG ICON BADGE */}
      <svg
        viewBox="0 0 64 64"
        width={current.box}
        height={current.box}
        fill="none"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="reactBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#070a12" />
          </linearGradient>
          <linearGradient id="reactCoolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#00d2ff" />
          </linearGradient>
          <linearGradient id="reactHeatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8c42" />
            <stop offset="100%" stopColor="#ff4500" />
          </linearGradient>
        </defs>

        <rect width="64" height="64" rx={current.radius * 1.5} fill="url(#reactBgGrad)" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="23" stroke="#334155" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />

        <path
          d="M 21 16 C 28 14 38 18 42 25 C 38 23 32 23 27 27 C 23 30 20 36 21 42 C 17 37 16 28 21 16 Z"
          fill="url(#reactCoolGrad)"
        />

        <path
          d="M 43 48 C 36 50 26 46 22 39 C 26 41 32 41 37 37 C 41 34 44 28 43 22 C 47 27 48 36 43 48 Z"
          fill="url(#reactHeatGrad)"
        />

        <circle cx="32" cy="32" r="4.5" fill="#ffffff" />
        <circle cx="32" cy="32" r="2.5" fill="#00d2ff" />
      </svg>

      {/* TEXT WORDMARK */}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <div style={{ fontSize: current.font, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.03em" }}>
          HVAC<span style={{ color: "var(--accent-cooling)" }}>Logic</span>
        </div>
        {showTagline && (
          <span style={{
            fontSize: current.subFont,
            fontWeight: 700,
            color: "var(--text-muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginTop: "1px",
          }}>
            Engineering Sizing Suite
          </span>
        )}
      </div>
    </div>
  );
}
