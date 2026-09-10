import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * Normalizes any relative or absolute path into a fully-qualified,
 * canonical URL using the platform's canonical domain (https://hvaclogic.org).
 *
 * Guarantees:
 * - Always starts with siteConfig.canonicalDomain
 * - Leading slash normalization
 * - Removes unnecessary trailing slashes (unless root)
 * - Strips query parameters or fragments
 */
export function constructCanonicalUrl(path: string = ""): string {
  const domain = siteConfig.canonicalDomain.replace(/\/+$/, "");

  if (!path || path === "/" || path === domain) {
    return domain;
  }

  // If already absolute URL
  if (/^https?:\/\//i.test(path)) {
    try {
      const parsed = new URL(path);
      const cleanPathname = parsed.pathname.replace(/\/+$/, "") || "";
      return `${domain}${cleanPathname}`;
    } catch {
      // fallback if invalid URL string
    }
  }

  // Remove query strings or hashes if present
  const cleaned = path.split("?")[0].split("#")[0].trim();
  const normalizedPath = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  const trimmedPath = normalizedPath.replace(/\/+$/, "");

  return trimmedPath ? `${domain}${trimmedPath}` : domain;
}

export interface PageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: Array<{ name: string; url?: string }>;
  image?: string;
  noIndex?: boolean;
  extra?: Partial<Metadata>;
}

/**
 * Generates a fully-compliant Next.js Metadata object enforcing
 * absolute canonical URLs and standardized OpenGraph/Twitter cards.
 */
export function createPageMetadata(options: PageMetadataOptions): Metadata {
  const canonicalUrl = constructCanonicalUrl(options.path || "");
  const defaultImage = `${siteConfig.canonicalDomain}/opengraph-image`;
  const ogImage = options.image || defaultImage;

  const metadata: Metadata = {
    title: options.title,
    description: options.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: options.type || "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: options.title,
        },
      ],
      ...(options.publishedTime && { publishedTime: options.publishedTime }),
      ...(options.modifiedTime && { modifiedTime: options.modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [ogImage],
    },
    ...(options.keywords && { keywords: options.keywords }),
    ...(options.authors && { authors: options.authors }),
    ...(options.noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    ...options.extra,
  };

  return metadata;
}
