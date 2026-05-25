export const PORTFOLIO_SECTION_IDS = [
  "hero",
  "intro",
  "experience",
  "works",
  "contact",
] as const;

export type PortfolioSectionId = (typeof PORTFOLIO_SECTION_IDS)[number];
