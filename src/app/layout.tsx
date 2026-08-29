import type { Metadata, Viewport } from "next";
import { Titillium_Web, Lora, Inter } from "next/font/google";
import { UnitProvider } from "@/lib/providers/UnitContext";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-titillium",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#00d2ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalDomain),
  title: {
    default: "HVAC Logic — Engineering Calculators & Building Science",
    template: "%s | HVAC Logic",
  },
  description: siteConfig.description,
  keywords: [
    "ductulator",
    "btu calculator",
    "ac tonnage calculator",
    "superheat calculator",
    "subcooling calculator",
    "pt chart",
    "cfm calculator",
    "heat pump size calculator",
    "r value calculator",
    "hvac load calculator",
  ],
  authors: [{ name: "HVAC Logic Engineering Team" }],
  creator: "HVAC Logic",
  publisher: "HVAC Logic",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.canonicalDomain,
    siteName: siteConfig.name,
    title: "HVAC Logic — Engineering Calculators & Building Science",
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVAC Logic — Engineering Calculators & Building Science",
    description: siteConfig.description,
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-DXFDL7GDB2";

  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${titillium.variable} ${lora.variable} ${inter.variable}`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `,
          }}
        />
        {/* Schema.org Organization & WebSite entity graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteConfig.canonicalDomain}/#organization`,
                  name: siteConfig.name,
                  url: siteConfig.canonicalDomain,
                  logo: `${siteConfig.canonicalDomain}/icon.svg`,
                  description: "Deterministic HVAC engineering calculation suite and building science platform.",
                  sameAs: [
                    "https://www.trustpilot.com/review/hvaclogic.org",
                    "https://archive.org/details/power-lab-deterministic-clean-energy-modeling-framework-2026_20260826",
                    "https://www.academia.edu/172310808/Deterministic_Building_Science_and_Thermodynamic_Modeling_Framework_for_Real_Time_Field_Diagnostics_Air_Distribution_and_Decarbonization_Sizing",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteConfig.canonicalDomain}/#website`,
                  url: siteConfig.canonicalDomain,
                  name: siteConfig.name,
                  publisher: {
                    "@id": `${siteConfig.canonicalDomain}/#organization`,
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <UnitProvider>
          <ServiceWorkerRegister />
          <SiteHeader />
          <main id="main-content" style={{ minHeight: "calc(100vh - 160px)" }}>
            {children}
          </main>
          <SiteFooter />
        </UnitProvider>
      </body>
    </html>
  );
}
