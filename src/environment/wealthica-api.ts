export type WealthicaAPI = {
  addon: WealthicaAddon;
};
export type WealthicaAddon = {
  on: (
    event: string,
    options: (options: WealthicaAddonOptions) => void
  ) => void;
  request: (query: {
    method: string;
    endpoint: string;
    query?: any;
  }) => Promise<any>;
  api: {
    getPositions: (query: {
      groups?: string;
      institutions?: string;
      investments?: string;
    }) => Promise<Position[]>;
  };
};
export type WealthicaAddonOptions = {
  assetsEnabled: boolean;
  assetsFilter: boolean;
  currency: string; //"cad"
  dateRangeFilter: string[];
  deletedFilter: boolean;
  fromDate: string;
  groupsFilter: string;
  institutionsFilter: string | undefined;
  investmentsFilter: string | undefined;
  language: string; //"en"
  liabilitiesEnabled: boolean;
  liabilitiesFilter: boolean;
  privateMode: boolean;
  readonly: boolean;
  toDate: string;
  token: string;
};

export type Investment = {
  institution: string;
  investment: string;
  quantity: number;
  book_value: number;
  market_value: number;
  currency: string;
  value: number;
  gain_percent: number;
  gain_currency_amount: number;
  gain_amount: number;
};

export type Position = {
  category: string;
  class: string;
  _id: string;
  security: {
    _id: string;
    currency: string;
    symbol: string;
    type: string;
    name: string;
    last_price: number;
    high_date: string;
    high_price: number;
    low_date: string;
    low_price: number;
    last_date: string;
    aliases: string[];
    id: string;
  };
  investments: Investment[];
  value: number;
  book_value: number;
  market_value: number;
  quantity: number;
  gain_percent: number;
  gain_currency_amount: number;
  currency: string;
  gain_amount: number;
  id: string;
};

const Addon = (window as any).Addon;

export const wealthica: WealthicaAPI = {
  addon: new Addon(),
};
