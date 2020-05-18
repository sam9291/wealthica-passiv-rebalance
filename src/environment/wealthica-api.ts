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
    getInstitution: (query: {
      groups?: string;
      institutions?: string;
      investments?: string;
    }) => Promise<Institution[]>;
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

export type Institution = {
  _id: string;
  user: string;
  name: string;
  type: string;
  sync_status: string;
  __v: number;
  sync_date: string;
  sync_transactions: boolean;
  sync_documents: boolean;
  investments: [
    {
      name: string;
      _id: string;
      currency_value: number;
      groups: string[];
      ignored: false;
      inactive: false;
      cash: number;
      group: string;
      id: string;
      type: string;
      currency: string;
      registered: boolean;
      book_value: null;
      market_value: null;
      value: number;
      overall_roi: null;
      gain_percent: null;
      overall_currency_gain: null;
      gain_amount: null;
      gain_currency_amount: null;
      overall_gain: null;
      positions: [
        {
          category: string;
          class: string;
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
          gain_amount: number;
          gain_currency_amount: number;
          gain_percent: number;
          value: number;
          currency: string;
          market_value: number;
          book_value: number;
          quantity: number;
          investment: number;
          institution: number;
        }
      ];
    }
  ];
  book_value: number | null;
  market_value: number | null;
  value: number;
  cash: number;
  creation_date: string;
  accounts: string[];
  overall_roi: string | null;
  gain_percent: string | null;
  overall_gain: string | null;
  gain_amount: string | null;
  id: string;
};

const Addon = (window as any).Addon;

export const wealthica: WealthicaAPI = {
  addon: new Addon(),
};
