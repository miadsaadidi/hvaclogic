# HVACLogic Structured Data & JSON-LD Schema Rules

**Domain**: [https://hvaclogic.org/](https://hvaclogic.org/)  
**Document Version**: 2.0.0  
**Last Updated**: 2026-09-16  
**Operational Status**: ACTIVE / MANDATORY SCHEMA GOVERNANCE  

---

## 1. Primary Principle of Truthful Schema Markup

Structured data on HVACLogic exists exclusively to help search engines accurately parse entity relationships, mathematical tools, research publications, and open datasets. 

**Strict Prohibitions**:
- ❌ **NO Synthetic AggregateRating or Review Stars**: Fabricating star ratings, review counts, or testimonial quotes directly violates Google Search Essentials and risks manual action.
- ❌ **NO Fabricated Download Counts or User Numbers**: Never claim application download counts or software metrics that cannot be verified.
- ❌ **NO Deceptive Price Markup**: All HVACLogic web tools are 100% free and open-access; mark price as `0` and currency as `USD`.

---

## 2. Core Calculator Schema: `WebApplication` / `SoftwareApplication`

Every calculator page under `/calculators/<slug>` must output a valid `WebApplication` JSON-LD block:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": "https://hvaclogic.org/calculators/ductulator#app",
  "name": "Digital Ductulator & Air Duct Sizing Tool",
  "url": "https://hvaclogic.org/calculators/ductulator",
  "description": "Free online digital ductulator for HVAC engineers and technicians. Size round, rectangular, and oval ducts using ACCA Manual D and SMACNA equal friction equations.",
  "applicationCategory": "EngineeringApplication",
  "operatingSystem": "All modern web browsers (Chrome, Firefox, Safari, Edge)",
  "browserRequirements": "Requires JavaScript. Real-time client-side HTML5 Canvas / SVG rendering.",
  "isAccessibleForFree": true,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "HVACLogic",
    "url": "https://hvaclogic.org",
    "logo": {
      "@type": "ImageObject",
      "url": "https://hvaclogic.org/icon.svg"
    }
  },
  "creator": {
    "@type": "Person",
    "name": "Miad S.",
    "jobTitle": "Lead Building Science Engineer"
  },
  "inLanguage": "en-US"
}
```

---

## 3. Academic Research Monograph Schema: `ScholarlyArticle` / `TechArticle`

Every research paper under `/research/<slug>` must output a rich `ScholarlyArticle` JSON-LD block:

```json
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "@id": "https://hvaclogic.org/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b#article",
  "headline": "Thermodynamic Phase-Equilibrium and Non-Linear Temperature Glide Modeling of Next-Generation Zeotropic A2L Refrigerants (R-454B & R-32)",
  "name": "Thermodynamic Phase-Equilibrium and Non-Linear Temperature Glide Modeling of Next-Generation Zeotropic A2L Refrigerants (R-454B & R-32)",
  "description": "An applied thermodynamics study of vapor-liquid phase equilibrium, bubble and dew saturation boundaries, and systemic charging diagnostics under the EPA AIM Act.",
  "datePublished": "2026-09-04",
  "dateModified": "2026-09-04",
  "identifier": "10.7910/DVN/SR1NZO",
  "sameAs": "https://doi.org/10.7910/DVN/SR1NZO",
  "author": [
    {
      "@type": "Organization",
      "name": "HVACLogic Research Group",
      "url": "https://hvaclogic.org"
    },
    {
      "@type": "Person",
      "name": "Miad S.",
      "affiliation": {
        "@type": "Organization",
        "name": "HVACLogic Building Science Research"
      }
    }
  ],
  "publisher": {
    "@type": "Organization",
    "name": "HVACLogic Open-Access Building Science Monograph Series",
    "url": "https://hvaclogic.org"
  },
  "mainEntityOfPage": "https://hvaclogic.org/research/thermodynamic-modeling-a2l-refrigerant-glide-r454b",
  "encoding": {
    "@type": "MediaObject",
    "contentUrl": "https://hvaclogic.org/whitepapers/Thermodynamic_Modeling_A2L_Refrigerant_Glide_R454B.pdf",
    "encodingFormat": "application/pdf"
  },
  "isAccessibleForFree": true,
  "license": "https://creativecommons.org/licenses/by/4.0/"
}
```

---

## 4. Open Benchmark Dataset Schema: `Dataset`

Datasets deposited or hosted on HVACLogic must implement schema.org `Dataset` markup:

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": "https://hvaclogic.org/research/cold-climate-heat-pump-balance-point-lab#dataset",
  "name": "Cold-Climate Heat Pump COP Derating & Heating Load Balance Point Dataset (360 Simulation Points)",
  "description": "Thermodynamic simulation dataset evaluating inverter vapor-compression heat pump COP derating curves across -15°F to 50°F ambient temperatures.",
  "identifier": "10.6084/m9.figshare.33477430",
  "sameAs": "https://doi.org/10.6084/m9.figshare.33477430",
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "creator": {
    "@type": "Organization",
    "name": "HVACLogic Research Group"
  },
  "distribution": [
    {
      "@type": "DataDownload",
      "encodingFormat": "text/csv",
      "contentUrl": "https://figshare.com/articles/dataset/Cold-Climate_Heat_Pump_COP_Derating_Heating_Load_Balance_Point_Dataset/33477430"
    }
  ],
  "variableMeasured": [
    "Ambient Temperature (°F)",
    "Building Design Heat Loss (BTU/hr)",
    "Inverter Heat Pump Capacity (BTU/hr)",
    "Operational COP",
    "Supplemental Electric Resistance kW"
  ]
}
```

---

## 5. Breadcrumb Navigation Schema: `BreadcrumbList`

Every page must render an accurate hierarchical breadcrumb list:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://hvaclogic.org"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Airflow & Ducts",
      "item": "https://hvaclogic.org/airflow-ducts"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Digital Ductulator",
      "item": "https://hvaclogic.org/calculators/ductulator"
    }
  ]
}
```

---

## 6. Verification & Quality Checklist

Before committing any schema update:
1. Validate against **Schema.org Validator** and **Google Rich Results Test**.
2. Verify that all `@id`, `url`, and `mainEntityOfPage` URIs are fully qualified (`https://hvaclogic.org/...`).
3. Ensure no trailing slashes or duplicate schemas exist on the page.
4. Confirm `isAccessibleForFree` is explicitly `true` for all educational and calculation assets.
