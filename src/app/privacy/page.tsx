import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "HVACLogic Privacy Policy: Learn how calculation tools execute in your browser, how local preferences and shareable URLs work, and our analytics disclosure.",
  alternates: { canonical: `${siteConfig.canonicalDomain}/privacy` },
  openGraph: {
    title: "Privacy Policy — HVACLogic",
    description:
      "HVACLogic Privacy Policy: Transparent disclosure of client-side calculation execution, local storage preferences, shareable URLs, and Google Analytics usage.",
    url: `${siteConfig.canonicalDomain}/privacy`,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVACLogic Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — HVACLogic",
    description:
      "HVACLogic Privacy Policy: Transparent disclosure of client-side calculation execution, local storage preferences, shareable URLs, and Google Analytics usage.",
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function PrivacyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description:
      "Privacy policy for HVACLogic describing client-side calculation execution, browser storage, shareable URLs, analytics, and third-party services.",
    url: `${siteConfig.canonicalDomain}/privacy`,
    datePublished: "2026-10-01",
    dateModified: "2026-10-01",
    publisher: {
      "@type": "Organization",
      name: "HVACLogic",
      url: siteConfig.canonicalDomain,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article
        className="page site-container"
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "2rem 1.5rem 5rem",
        }}
      >
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
            <span>Policy Transparency</span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              margin: "0 0 1rem",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--ink-secondary)",
              lineHeight: 1.6,
              maxWidth: "840px",
            }}
          >
            This Privacy Policy explains how HVACLogic (&quot;we&quot;, &quot;us&quot;, or &quot;the website&quot;) handles information when you use our web-based HVAC engineering calculators, reference guides, and technical tools. We believe in engineering transparency and provide clear, technically grounded disclosures regarding how data is processed on your device, what information is stored locally, how shareable calculation links work, and how website analytics are utilized.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginTop: "1.25rem",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            <span><strong>Effective Date:</strong> October 1, 2026</span>
            <span><strong>Last Updated:</strong> October 1, 2026</span>
          </div>
        </header>

        {/* Architecture Summary Grid */}
        <section style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 1.25rem" }}>
            Technical Architecture Summary
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            <div
              style={{
                padding: "1.35rem",
                borderRadius: "0.85rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "4px solid #10b981",
              }}
            >
              <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>💻</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>
                In-Browser Calculation Execution
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
                Interactive engineering calculations (airflow, psychrometrics, duct sizing, cooling loads, equipment selection) execute directly in your web browser via client-side JavaScript. Calculation inputs are not submitted to an HVACLogic calculation backend.
              </p>
            </div>

            <div
              style={{
                padding: "1.35rem",
                borderRadius: "0.85rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "4px solid #38bdf8",
              }}
            >
              <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>🚫</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>
                No User Accounts Required
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
                HVACLogic does not require user registration, passwords, login credentials, or personal user profiles to access any calculator, dataset, or engineering reference.
              </p>
            </div>

            <div
              style={{
                padding: "1.35rem",
                borderRadius: "0.85rem",
                background: "var(--surface)",
                border: "1px solid var(--border-color)",
                borderTop: "4px solid #00d2ff",
              }}
            >
              <div style={{ fontSize: "1.3rem", marginBottom: "0.35rem" }}>📊</div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 0.35rem" }}>
                Usage Analytics Disclosure
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.5, margin: 0 }}>
                The website utilizes Google Analytics to measure aggregate visitor trends, tool popularity, and technical performance to help us prioritize engineering updates and content improvements.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "3.5rem" }}>
          {/* Section 1: Information We Collect */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              1. Information We Collect
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Depending on how you interact with HVACLogic, different categories of information are processed:
            </p>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--ink-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                margin: 0,
              }}
            >
              <li>
                <strong>Calculation and Project Inputs:</strong> Values you enter into interactive calculators (e.g., airflow CFM, duct dimensions, dry-bulb temperatures, relative humidity, pipe lengths, equipment capacities). These inputs are processed locally in your browser memory and are not sent to or stored in an HVACLogic project database.
              </li>
              <li>
                <strong>Browser-Local Preferences:</strong> User interface preferences that you explicitly select, specifically your choice of measurement unit system (Imperial vs. Metric) and visual display theme (Dark vs. Light mode).
              </li>
              <li>
                <strong>Shareable URL Parameters:</strong> Calculation variables encoded in URL query strings or hash fragments (e.g., <code>?cfm=800&amp;friction=0.08</code>) when you generate a permalink or copy a calculation URL.
              </li>
              <li>
                <strong>Website Analytics Information:</strong> Pseudonymous interaction and usage data collected through Google Analytics, including pages visited, referral sources, general geographic region (derived from IP address), browser type, operating system, screen resolution, and time spent on specific tools.
              </li>
              <li>
                <strong>Technical and Infrastructure Data:</strong> Standard network transmission metadata generated when your browser requests web assets, such as your IP address, HTTP request headers, user-agent string, and timestamps, which may be processed by hosting, content delivery networks (CDNs), and security layers for request routing and DDoS protection.
              </li>
            </ul>
          </section>

          {/* Section 2: How We Use Information */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              2. How We Use Information
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
              We use the categories of information described above strictly for the following operational and engineering purposes:
            </p>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--ink-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                margin: 0,
              }}
            >
              <li><strong>Executing Calculations:</strong> Evaluating engineering equations, thermodynamic properties, and sizing models immediately on your device in response to your interactive inputs.</li>
              <li><strong>Preserving Local Preferences:</strong> Maintaining your selected unit system (Imperial/Metric) and display theme (Dark/Light) across page navigations without requiring an account.</li>
              <li><strong>Enabling Shareable URLs:</strong> Reconstructing calculation states when a user opens a bookmarked or shared calculation link.</li>
              <li><strong>Measuring Site Performance and Usage:</strong> Analyzing aggregate traffic patterns, identifying which calculators and guides are most frequently used, and diagnosing performance bottlenecks.</li>
              <li><strong>Maintaining Security and Availability:</strong> Protecting web infrastructure against malicious traffic, abuse, and service disruptions.</li>
            </ul>
          </section>

          {/* Section 3: Client-Side Calculations */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              3. Client-Side Calculations
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              HVACLogic&apos;s interactive tools—such as the Digital Ductulator, BTU Load Master, Psychrometric Calculator, Superheat/Subcooling Diagnostic, and Heat Pump Sizer—are engineered to execute their mathematical models locally within your web browser using client-side JavaScript.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              When you adjust a slider, enter a numerical dimension, or select a refrigerant, the calculation is evaluated on your device. We do not transmit these working project inputs to an HVACLogic calculation server, nor do we build customer project profiles from your calculations.
            </p>
          </section>

          {/* Section 4: Browser Storage and Local Preferences */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              4. Browser Storage and Local Preferences
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              HVACLogic utilizes standard browser <code>localStorage</code> to store specific user interface preferences directly on your device. Currently, the stored keys are limited to:
            </p>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--ink-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
                marginBottom: "0.75rem",
              }}
            >
              <li><code>unit_system</code> or <code>units</code>: Records your preferred measurement units (Imperial vs. Metric).</li>
              <li><code>theme</code>: Records your preferred visual display mode (Dark vs. Light).</li>
            </ul>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              LocalStorage data remains on your local browser until you clear your browser cache/storage or reset preferences. It is not transmitted to our servers during ordinary page navigation.
            </p>
          </section>

          {/* Section 5: Shareable Calculation URLs */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              5. Shareable Calculation URLs
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              Certain calculators allow you to generate shareable links or bookmark calculations by serializing your inputs into URL query parameters or hash fragments (for example, <code>/calculators/ductulator?cfm=1200&amp;friction=0.08</code>).
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              HVACLogic does not store these URL parameters in a server-side project database. However, please note the following technical characteristics of URL-based sharing:
            </p>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--ink-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
                marginBottom: "0.75rem",
              }}
            >
              <li>URL query strings are visible in the browser address bar and will be stored in your browser history.</li>
              <li>Query parameters may be transmitted to hosting servers in standard HTTP request lines and recorded in standard web server/CDN access logs.</li>
              <li>Anyone with whom you share the URL can view all parameter values encoded in that link.</li>
            </ul>
            <div
              style={{
                padding: "0.85rem 1rem",
                borderRadius: "0.5rem",
                background: "rgba(234, 179, 8, 0.08)",
                border: "1px solid rgba(234, 179, 8, 0.25)",
                fontSize: "0.85rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.5,
              }}
            >
              <strong>Recommendation:</strong> Do not encode confidential building identifiers, sensitive project details, or personally identifiable information into shareable calculation URLs.
            </div>
          </section>

          {/* Section 6: Analytics and Google Analytics */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              6. Analytics and Google Analytics
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              HVACLogic uses <strong>Google Analytics</strong> (Measurement ID: <code>G-DXFDL7GDB2</code>), a web analytics service provided by Google LLC (&quot;Google&quot;), to understand how visitors interact with the website and to help us improve our engineering content and tools.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              <strong>Information Processed by Google Analytics:</strong> Google Analytics collects information sent by your browser as part of a web page request, including:
            </p>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--ink-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
                marginBottom: "0.75rem",
              }}
            >
              <li>Pseudonymous client identifiers stored in cookies to distinguish unique browsers across sessions.</li>
              <li>Pages viewed, time spent on pages, and navigation pathways through the site.</li>
              <li>Device and software characteristics (operating system, browser type and version, language, screen resolution).</li>
              <li>Approximate geographic location (country, region, and city derived from truncated/masked IP addresses).</li>
              <li>Referring URLs (the website or search query that directed you to HVACLogic).</li>
            </ul>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              <strong>Data Retention &amp; Transmission:</strong> Google Analytics data is transmitted to and stored by Google on servers that may be located in the United States and globally. Event data is retained according to Google Analytics standard retention policies (typically 2 to 14 months).
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              <strong>How to Opt Out:</strong> You can prevent Google Analytics from recognizing you on return visits by disabling cookies in your browser, using ad-blocking or privacy extensions, or by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent-cooling)", textDecoration: "underline" }}
              >
                Google Analytics Opt-out Browser Add-on ↗
              </a>.
            </p>
          </section>

          {/* Section 7: Cookies and Similar Technologies */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              7. Cookies and Similar Technologies
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Cookies are small text files placed on your device by web pages you visit. The technologies used on HVACLogic include:
            </p>
            <div style={{ overflowX: "auto", marginBottom: "1rem" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.85rem",
                  color: "var(--ink-secondary)",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-color)", textAlign: "left" }}>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Technology</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Provider</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Purpose</th>
                    <th style={{ padding: "0.6rem 0.75rem", color: "var(--ink)" }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 600 }}><code>localStorage</code></td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>HVACLogic (First-party)</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>Stores unit preferences (Imperial/Metric) and theme mode (Dark/Light).</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>Persistent until cleared by user</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                    <td style={{ padding: "0.6rem 0.75rem", fontWeight: 600 }}><code>_ga</code>, <code>_ga_*</code></td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>Google Analytics (Third-party)</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>Distinguishes unique users and manages session measurement.</td>
                    <td style={{ padding: "0.6rem 0.75rem" }}>Up to 2 years / 14 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              You can control or delete cookies through your web browser settings. Disabling cookies will not prevent you from using HVACLogic calculators or accessing engineering guides.
            </p>
          </section>

          {/* Section 8: Third-Party Services */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              8. Third-Party Services
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              HVACLogic engages third-party infrastructure and service providers to operate and maintain the website:
            </p>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--ink-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
                margin: 0,
              }}
            >
              <li>
                <strong>Google Analytics (Google LLC):</strong> Provides aggregated website usage analytics and performance telemetry as described in Section 6.
              </li>
              <li>
                <strong>Web Hosting &amp; CDN Infrastructure:</strong> The website is hosted on modern cloud infrastructure utilizing Content Delivery Networks (CDNs) to securely distribute static web assets, provide SSL/TLS encryption, and mitigate denial-of-service threats.
              </li>
            </ul>
          </section>

          {/* Section 9: Data Retention */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              9. Data Retention
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              We retain information only as long as necessary for the specific purposes outlined in this policy:
            </p>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--ink-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
                margin: 0,
              }}
            >
              <li><strong>Calculation Inputs:</strong> Transiently held in browser memory during your active session; not retained on HVACLogic servers.</li>
              <li><strong>LocalStorage Preferences:</strong> Retained locally on your device until manually deleted or cleared via browser settings.</li>
              <li><strong>Analytics Data:</strong> Retained in Google Analytics according to Google&apos;s standard data retention settings (typically 2 to 14 months).</li>
              <li><strong>Server &amp; CDN Logs:</strong> Operational and security logs generated by infrastructure providers are typically maintained on a rolling basis for diagnostic and threat prevention purposes.</li>
            </ul>
          </section>

          {/* Section 10: Security */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              10. Security
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              We implement reasonable technical and organizational safeguards designed to protect the integrity of the website and user communications:
            </p>
            <ul
              style={{
                paddingLeft: "1.25rem",
                color: "var(--ink-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                display: "flex",
                flexDirection: "column",
                gap: "0.45rem",
                marginBottom: "0.75rem",
              }}
            >
              <li>All web traffic between your browser and HVACLogic is encrypted in transit using Transport Layer Security (HTTPS/TLS).</li>
              <li>Interactive calculations run client-side, avoiding the transmission of unencrypted engineering inputs across external networks.</li>
              <li>The website avoids collecting sensitive personal data, payment information, or account passwords.</li>
            </ul>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              However, no internet transmission or electronic storage method is ever completely secure. While we strive to protect website operations, we cannot guarantee absolute security against all unforeseen threats.
            </p>
          </section>

          {/* Section 11: Your Privacy Rights */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              11. Your Privacy Rights
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
              Depending on your jurisdiction (such as the European Economic Area under GDPR, the United Kingdom, or California under CCPA/CPRA), you may have specific statutory rights regarding your personal information, including rights to access, delete, or restrict the processing of your personal data.
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              Because HVACLogic does not require accounts and does not maintain user profile databases, we do not have direct means to link anonymous site telemetry to specific identifiable individuals. You can exercise self-service control at any time by clearing your browser cookies and <code>localStorage</code>, or by utilizing the Google Analytics opt-out mechanisms described above.
            </p>
          </section>

          {/* Section 12: International Processing */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              12. International Processing
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              HVACLogic and its third-party service providers (including Google LLC and hosting/CDN networks) may process and store server requests, telemetry, and analytics data on servers located in the United States and other countries where data protection laws may differ from those in your home jurisdiction.
            </p>
          </section>

          {/* Section 13: Changes to This Policy */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              13. Changes to This Policy
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              We may update this Privacy Policy periodically to reflect changes in our engineering tools, technical architecture, third-party services, or applicable regulatory requirements. Any modifications will be posted on this page with an updated &quot;Last Updated&quot; date at the top of the policy.
            </p>
          </section>

          {/* Section 14: Contact */}
          <section
            style={{
              padding: "1.75rem",
              borderRadius: "0.85rem",
              background: "var(--surface)",
              border: "1px solid var(--border-color)",
            }}
          >
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "0 0 0.75rem" }}>
              14. Contact
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
              If you have questions, feedback, or concerns regarding this Privacy Policy or our technical data practices, you can reach the maintainers and engineering working group through the official open-source project repository on GitHub:{" "}
              <a
                href="https://github.com/miadsaadidi/hvaclogic"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--accent-cooling)", fontWeight: 600, textDecoration: "none" }}
              >
                github.com/miadsaadidi/hvaclogic ↗
              </a>
            </p>
          </section>
        </div>

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
    </>
  );
}
