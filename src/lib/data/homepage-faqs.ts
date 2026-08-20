export const HOMEPAGE_FAQS = [
  {
    question: "How do HVACLogic calculators compare to traditional rule-of-thumb charts?",
    answer: "Traditional thumb rules often result in oversized equipment, poor dehumidification, noisy air ducts, and high utility bills. HVACLogic uses deterministic formulas derived from cited engineering standards and manufacturer data.",
  },
  {
    question: "Are these engineering calculators 100% free and private to use?",
    answer: "Yes. All computations execute client-side in your browser. HVACLogic requires no login and does not send project calculation inputs to a database.",
  },
  {
    question: "Which refrigerants are supported in the field diagnostics suite?",
    answer: "The pressure-temperature and superheat/subcooling tools cover common legacy and A2L refrigerants. The line-set charge tool provides sourced initial weigh-in profiles for R-454B, R-32, and R-410A equipment families.",
  },
  {
    question: "Can I export, print, or share calculation results with clients?",
    answer: "Calculator action bars provide shareable hydrated links, branded iframe embeds, CSV export where applicable, and a contractor submittal designed for browser Print or Save as PDF.",
  },
  {
    question: "How does HVACLogic support building electrification and heat pumps?",
    answer: "The heating suite provides cold-climate heat-pump balance points, low-ambient capacity derating, auxiliary heat sizing, hydronic EDR calculations, and envelope heat-loss workflows.",
  },
] as const;
