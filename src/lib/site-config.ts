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
  description: "Transparent engineering calculators for HVAC airflow, duct sizing, cooling loads, heat pumps, building science & field diagnostics. Free open-access tools with client-side calculations.",
  url: "https://hvaclogic.org",
  canonicalDomain: "https://hvaclogic.org",
} as const;
