import type { NextConfig } from "next";

const isNonProduction =
  process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.hvaclogic.org" }],
        destination: "https://hvaclogic.org/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    const headersList = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
    ];

    if (isNonProduction) {
      headersList.push({
        key: "X-Robots-Tag",
        value: "noindex, nofollow, noarchive",
      });
    }

    return [
      {
        source: "/:path*",
        headers: headersList,
      },
    ];
  },
};

export default nextConfig;
