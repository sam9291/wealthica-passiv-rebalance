export type SymbolTarget = {
  priceUpToDate: boolean;
  suggestedSymbols: string[];
  symbol: string;
  percentOfPortfolio: number;
  displayPercent: number;
  isCanadianTicker: boolean;
  sharesOwned: number;
};
export type PortfolioTarget = {
  components: SymbolTarget[];
  id: string;
  portfolioName: string;
};
export type PortfolioTargetRepository = {
  portfolios: PortfolioTarget[];
};
