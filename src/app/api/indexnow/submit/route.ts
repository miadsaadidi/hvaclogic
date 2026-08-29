import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { calculatorRegistry } from "@/lib/data/calculators-registry";

const INDEXNOW_KEY = "c74812a83e024b48bc29737190d7945e";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export async function POST(request: Request) {
  try {
    let bodyUrls: string[] = [];
    try {
      const body = await request.json();
      if (Array.isArray(body?.urls)) {
        bodyUrls = body.urls;
      }
    } catch {
      // If no JSON body, we will submit all canonical URLs by default
    }

    const host = new URL(siteConfig.canonicalDomain).hostname.replace(/^www\./, "");

    // If no specific URLs provided, compile the entire canonical URL list
    const urlsToSubmit =
      bodyUrls.length > 0
        ? bodyUrls
        : [
            siteConfig.canonicalDomain,
            `${siteConfig.canonicalDomain}/airflow-ducts`,
            `${siteConfig.canonicalDomain}/cooling-loads`,
            `${siteConfig.canonicalDomain}/heating-systems`,
            `${siteConfig.canonicalDomain}/field-diagnostics`,
            `${siteConfig.canonicalDomain}/building-science`,
            `${siteConfig.canonicalDomain}/methodology`,
            `${siteConfig.canonicalDomain}/sources`,
            `${siteConfig.canonicalDomain}/about`,
            `${siteConfig.canonicalDomain}/privacy`,
            ...calculatorRegistry.map((c) => `${siteConfig.canonicalDomain}${c.route}`),
          ];

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteConfig.canonicalDomain}/${INDEXNOW_KEY}.txt`,
      urlList: urlsToSubmit,
    };

    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: response.ok || response.status === 200 || response.status === 202,
      status: response.status,
      submittedCount: urlsToSubmit.length,
      host,
      keyLocation: payload.keyLocation,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to submit URLs to IndexNow",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "IndexNow submission endpoint for HVACLogic. Send a POST request to submit URLs.",
    host: "hvaclogic.org",
    keyLocation: `https://hvaclogic.org/${INDEXNOW_KEY}.txt`,
  });
}
