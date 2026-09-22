import { describe, expect, it } from "vitest";
import { calculatorRegistry } from "@/lib/data/calculators-registry";
import { siteConfig } from "@/lib/site-config";
import { generateMetadata, generateStaticParams } from "@/app/embed/[slug]/page";

describe("Phase 3 Embed System Verification", () => {
  it("generates static params for all 24 registered calculators", async () => {
    const params = await generateStaticParams();
    expect(params.length).toBe(24);
    const slugs = params.map((p) => p.slug);
    
    calculatorRegistry.forEach((calc) => {
      expect(slugs).toContain(calc.id);
    });
  });

  it("verifies metadata for each embed route enforces noindex and canonical reference to main tool", async () => {
    for (const calc of calculatorRegistry) {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: calc.id }) });
      
      expect(metadata.title).toBe(`${calc.name} (Embed Widget) | HVACLogic`);
      expect(metadata.robots).toEqual({
        index: false,
        follow: false,
      });
      expect(metadata.alternates?.canonical).toBe(`${siteConfig.canonicalDomain}${calc.route}`);
    }
  });

  it("handles unknown slugs safely in generateMetadata", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "non-existent-tool" }) });
    expect(metadata.title).toBe("Embed Tool Not Found | HVACLogic");
  });
});
