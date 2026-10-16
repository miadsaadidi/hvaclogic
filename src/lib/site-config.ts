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
  name: "HVACLogic",
  tagline: "Engineering-Grade HVAC & Building Science Calculators",
  description: "Engineering calculators for HVAC airflow, duct sizing, cooling loads, heat pumps, and building science. Free open-access tools with transparent math.",
  url: "https://hvaclogic.org",
  canonicalDomain: "https://hvaclogic.org",
} as const;
