import type { NextConfig } from "next";

const isNonProduction =
  process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
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

    const pdfCanonicalMappings = [
      {
        source: "/whitepapers/Thermodynamic_Modeling_A2L_Refrigerant_Glide_R454B.pdf",
        canonical: "https://hvaclogic.org/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b",
      },
      {
        source: "/whitepapers/HVACLogic_A2L_Refrigerant_Field_Service_Protocols.pdf",
        canonical: "https://hvaclogic.org/research/r454b-r32-field-handling-protocols",
      },
      {
        source: "/whitepapers/HVACLogic_Deterministic_Building_Science_Whitepaper.pdf",
        canonical: "https://hvaclogic.org/research/thermal-envelope-infiltration-building-heat-loss",
      },
      {
        source: "/whitepapers/Student_Lab_01_Heat_Pump_Balance_Point_Thermodynamics.pdf",
        canonical: "https://hvaclogic.org/research/cold-climate-heat-pump-balance-point-lab",
      },
      {
        source: "/whitepapers/Student_Lab_02_Building_Envelope_Thermal_Transmission.pdf",
        canonical: "https://hvaclogic.org/research/student-lab-building-envelope-thermal-transmission",
      },
      {
        source: "/whitepapers/Vapor_Compression_Refrigerant_Mass_Sizing.pdf",
        canonical: "https://hvaclogic.org/research/deterministic-vapor-compression-refrigerant-mass-sizing",
      },
      {
        source: "/whitepapers/hvaclogic_psychrometrics_hyland_wexler_paper.pdf",
        canonical: "https://hvaclogic.org/research/ashrae-hyland-wexler-moist-air-psychrometrics",
      },
      {
        source: "/whitepapers/hvaclogic_un_tensioned_airflow_paper.pdf",
        canonical: "https://hvaclogic.org/research/non-linear-duct-friction-loss-fitting-penalties",
      },
    ];

    const pdfHeaders = pdfCanonicalMappings.map(({ source, canonical }) => ({
      source,
      headers: [
        ...headersList,
        {
          key: "Link",
          value: `<${canonical}>; rel="canonical"`,
        },
      ],
    }));

    return [
      ...pdfHeaders,
      {
        source: "/:path*",
        headers: headersList,
      },
    ];
  },
};

export default nextConfig;
