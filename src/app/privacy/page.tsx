import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy & Zero-Database Architecture — HVACLogic",
  description: "Learn how HVACLogic protects your privacy with 100% client-side computation, zero user-account databases, and browser-local state isolation.",
  alternates: { canonical: `${siteConfig.canonicalDomain}/privacy` },
  openGraph: {
    title: "Privacy Policy — HVACLogic",
    description: "Learn how HVACLogic protects your privacy with 100% client-side computation and zero database tracking.",
    url: `${siteConfig.canonicalDomain}/privacy`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — HVACLogic",
    description: "Learn how HVACLogic protects your privacy with 100% client-side computation and zero database tracking.",
  },
};

export default function PrivacyPage() {
  return (
    <article className="page site-container" style={{ maxWidth: "1080px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
      {/* Breadcrumbs */}
      <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Privacy Policy</span>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.3rem 0.85rem",
            borderRadius: "9999px",
            background: "rgba(0, 210, 255, 0.08)",
            border: "1px solid rgba(0, 210, 255, 0.22)",
            color: "var(--accent-cooling)",
            fontSize: "0.78rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "0.75rem",
          }}
        >
          <span>🔒</span>
          <span>Zero-Database Architecture</span>
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2, margin: "0 0 1rem" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--ink-secondary)", lineHeight: 1.6, maxWidth: "800px" }}>
          HVACLogic was engineered from day one with a strict <strong>zero-database, privacy-by-design architecture</strong>. We do not require accounts, we do not store your building project data on our servers, and all calculations execute directly in your web browser.
        </p>
      </header>

      {/* Privacy Highlights Grid */}
      <section style={{ marginBottom: "3.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 1.25rem" }}>
          Privacy Architecture Highlights
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #10b981" }}>
            <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>💻</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>100% Client-Side Computation</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              All mathematical calculations, psychrometric conversions, and friction loss models execute entirely inside your device browser using JavaScript/WebAssembly.
            </p>
          </div>

          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #38bdf8" }}>
            <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>🚫</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>Zero Account Databases</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              We maintain no user profile databases, no customer relationship management (CRM) tracking, and no password repositories.
            </p>
          </div>

          <div style={{ padding: "1.35rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", borderTop: "4px solid #00d2ff" }}>
            <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>🛡️</div>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>No Lead Generation / Resale</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
              We do not sell contractor leads or homeowner project inquiries to equipment manufacturers, sales brokers, or telemarketing agencies.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Policy Text */}
      <section style={{ padding: "1.75rem", borderRadius: "0.85rem", background: "var(--surface)", border: "1px solid var(--border-color)", marginBottom: "3.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
          Browser Storage &amp; URL Permalinks
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
          To provide seamless usability across engineering sessions, HVACLogic uses standard browser mechanisms:
        </p>
        <ul style={{ paddingLeft: "1.25rem", color: "var(--ink-secondary)", fontSize: "0.875rem", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <li><strong>Local Preferences (LocalStorage)</strong>: Unit system preferences (Imperial vs. Metric) and visual theme settings (Dark vs. Light mode) are saved locally on your device only.</li>
          <li><strong>Shareable Permalinks (URL Hash &amp; Query Params)</strong>: When you generate a shareable calculation link or bookmark a calculation, parameters are encoded directly in the URL string (e.g. <code>?cfm=1200&amp;friction=0.08</code>). This enables direct sharing without transmitting private project records to our servers.</li>
          <li><strong>Analytics</strong>: We use privacy-respecting, anonymized aggregate pageview analytics with zero cross-site advertising tracking cookies.</li>
        </ul>
      </section>

      {/* Supporting Links Footer Section */}
      <section style={{ borderTop: "1px solid var(--border-color)", paddingTop: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)" }}>
          <Link href="/methodology">View Engineering Methodology →</Link>
          <span aria-hidden="true" style={{ margin: "0 0.75rem", opacity: 0.4 }}>•</span>
          <Link href="/sources">Laboratory Sources &amp; Standards →</Link>
          <span aria-hidden="true" style={{ margin: "0 0.75rem", opacity: 0.4 }}>•</span>
          <Link href="/about">About HVACLogic →</Link>
        </p>
      </section>
    </article>
  );
}
