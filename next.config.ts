import type { NextConfig } from "next";

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
};

export default nextConfig;
