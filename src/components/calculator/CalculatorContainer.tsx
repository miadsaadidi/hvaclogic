import React from "react";
import Link from "next/link";
import { CalculatorMeta } from "@/types/calculation";
import { SchemaJsonLd } from "@/components/seo/SchemaJsonLd";
import { DirectAnswerCard } from "@/components/seo/DirectAnswerCard";
import { PageJumpNav } from "@/components/seo/PageJumpNav";
import { StandardsBadge } from "@/components/seo/StandardsBadge";
import { EngineeringReviewCard } from "@/components/seo/EngineeringReviewCard";
import { RelatedCalculatorsGrid } from "@/components/seo/RelatedCalculatorsGrid";
import { PrintJobSubmittal } from "@/components/calculator/PrintJobSubmittal";
import { EmbedDetector } from "@/components/calculator/EmbedDetector";

interface CalculatorContainerProps {
  calculator: CalculatorMeta;
  directAnswer: string;
  formulaSnippet?: string;
  authorityCitation: string;
  toolComponent: React.ReactNode;
  methodologySection: React.ReactNode;
  comparisonTableSection: React.ReactNode;
  workedExampleSection: React.ReactNode;
  relatedToolsSection?: React.ReactNode;
}

export function CalculatorContainer({
  calculator,
  directAnswer,
  formulaSnippet,
  authorityCitation,
  toolComponent,
  methodologySection,
  comparisonTableSection,
  workedExampleSection,
  relatedToolsSection,
}: CalculatorContainerProps) {
  return (
    <>
      <SchemaJsonLd calculator={calculator} />
      <EmbedDetector />

      <main className="page calculator-page site-container">
        {/* PRINT JOB SUBMITTAL HEADER */}
        <PrintJobSubmittal
          calculatorName={calculator.name}
          categoryName={calculator.categoryName}
          governingStandard={authorityCitation}
        />

        {/* SECTION 1: SEMANTIC HEADER & BREADCRUMBS */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={calculator.categoryRoute}>{calculator.categoryName}</Link>
          <span>/</span>
          <span aria-current="page">{calculator.name}</span>
        </nav>

        <header className="calculator-header">
          <span className="eyebrow">{calculator.categoryName}</span>
          <h1>{calculator.name}</h1>
          <p className="intro">{calculator.metaDescription}</p>
        </header>

        {/* DIRECT ANSWER CARD FOR FEATURED SNIPPETS */}
        <DirectAnswerCard
          targetKeyword={calculator.primaryKeyword}
          directAnswer={directAnswer}
          formulaSnippet={formulaSnippet}
          authorityCitation={authorityCitation}
        />

        {/* STICKY PAGE JUMP NAV */}
        <PageJumpNav />

        {/* SECTION 2: INTERACTIVE TOOL UI */}
        <section id="calculator-tool" aria-label="Interactive Calculator Tool">
          {toolComponent}
        </section>

        {/* SECTION 3: ENGINEERING METHODOLOGY & DERIVATIONS */}
        <section id="how-to-guide" aria-label="Engineering Methodology and Calculations" style={{ margin: "3rem 0" }}>
          {methodologySection}
        </section>

        {/* SECTION 4: STATIC HTML REFERENCE COMPARISON TABLE */}
        <section id="sizing-matrix" aria-label="Standard Engineering Reference Table" style={{ margin: "3rem 0" }}>
          {comparisonTableSection}
        </section>

        {/* SECTION 5: WORKED NUMERICAL SIZING EXAMPLE */}
        <section id="worked-example" aria-label="Worked Engineering Sizing Example" style={{ margin: "3rem 0" }}>
          {workedExampleSection}
        </section>

        {/* SECTION 6: SCHEMA-BACKED FAQ ACCORDION */}
        {calculator.faqs && calculator.faqs.length > 0 && (
          <section id="faq-section" className="faq-section" aria-label="Frequently Asked Questions">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              {calculator.faqs.map((faq, index) => (
                <details key={index} className="faq-item">
                  <summary>{faq.question}</summary>
                  <div className="faq-answer">{faq.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ENGINEERING E-E-A-T AUDIT CARD */}
        <EngineeringReviewCard calculator={calculator} />

        {/* SECTION 7: CONTEXTUAL TOPIC SILO FOOTER & STANDARDS */}
        <section id="related-tools" aria-label="Related Engineering Calculators" style={{ margin: "2rem 0" }}>
          {relatedToolsSection || (
            <RelatedCalculatorsGrid
              relatedIds={calculator.relatedCalculatorIds}
              currentPillar={calculator.pillar}
            />
          )}
          <StandardsBadge standards={calculator.standards} />
        </section>
      </main>
    </>
  );
}
