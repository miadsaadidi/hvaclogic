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
    default: "HVACLogic - Engineering Calculators & Building Science",
    template: "%s | HVACLogic",
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.canonicalDomain,
  },
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
  authors: [{ name: "HVACLogic Engineering Standards Committee" }],
  creator: "HVACLogic",
  publisher: "HVACLogic",
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
    siteName: "HVACLogic",
    title: "HVACLogic — Engineering Calculators & Building Science",
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.canonicalDomain}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "HVACLogic Engineering Calculators & Building Science",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HVACLogic — Engineering Calculators & Building Science",
    description: siteConfig.description,
    images: [`${siteConfig.canonicalDomain}/opengraph-image`],
  },
};

const rootStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.canonicalDomain}/#organization`,
      name: "HVACLogic",
      url: siteConfig.canonicalDomain,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.canonicalDomain}/icon.svg`,
      },
      sameAs: [
        "https://www.academia.edu/172310808",
        "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7430738",
        "https://figshare.com/articles/dataset/ASHRAE_Hyland-Wexler_Moist_Air_Psychrometric_Benchmark_Dataset_420_Thermodynamic_State_Points_Across_Sea-Level_and_Elevated_Altitudes/33456928",
        "https://github.com/miadsaadidi/hvaclogic",
        "https://www.bibsonomy.org/user/miadinside",
      ],
      description: siteConfig.description,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.canonicalDomain}/#website`,
      name: "HVACLogic",
      url: siteConfig.canonicalDomain,
      publisher: {
        "@id": `${siteConfig.canonicalDomain}/#organization`,
      },
      inLanguage: "en-US",
    },
  ],
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
        {/* LLM & AI Crawler Grounding Manifests */}
        <link rel="help" type="text/markdown" href="/llms.txt" title="LLM Grounding Manifest" />
        <link rel="alternate" type="text/markdown" href="/llms-full.txt" title="Full Engineering Mathematical Models" />
        {/* Global Root Entity Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootStructuredData) }}
        />
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
