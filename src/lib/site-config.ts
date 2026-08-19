type SiteUrlOptions = {
  configuredUrl?: string;
  projectProductionUrl?: string;
  deploymentUrl?: string;
};

const withProtocol = (value: string) =>
  value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;

export function resolveSiteUrl({ configuredUrl, projectProductionUrl, deploymentUrl }: SiteUrlOptions = {}) {
  return new URL(
    withProtocol(configuredUrl ?? projectProductionUrl ?? deploymentUrl ?? "https://hvaclogic.org")
  ).toString();
}

export const siteConfig = {
  name: "HVAC Logic",
  tagline: "Engineering-Grade HVAC & Building Science Calculators",
  description: "Transparent, accurate engineering calculators for airflow, duct sizing, cooling loads, heat pumps, and field diagnostics.",
  url: "https://hvaclogic.org",
  canonicalDomain: "https://hvaclogic.org",
} as const;
