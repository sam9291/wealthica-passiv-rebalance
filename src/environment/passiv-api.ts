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

export type FetchRebalanceActionsQuery = {
  positions: PositionQuery[];
  balances: Balance[];
  targets: TargetQuery[];
  buy_only: boolean;
};

export type Balance = { currency: string; amount: number };
export type PositionQuery = { symbol: string; units: number };
export type TargetQuery = {
  symbol: string;
  percent: number;
};

export type RebalanceAction = {
  symbol: string;
  action: string | null;
  price: number;
  units: number;
};
