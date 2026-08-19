import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HVAC Logic — Engineering Calculators",
    short_name: "HVAC Logic",
    description: "Engineering-grade HVAC and building science calculators for airflow, duct sizing, load sizing, and field diagnostics.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f19",
    theme_color: "#00d2ff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
