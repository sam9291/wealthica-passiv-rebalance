export type WealthicaAPI = {
  addon: WealthicaAddon;
  options?: WealthicaAddonOptions | undefined;
};
export type WealthicaAddon = {
  on: (
    event: string,
    options: (options: WealthicaAddonOptions) => void
  ) => void;
};
export type WealthicaAddonOptions = {
  assetsEnabled: boolean;
  assetsFilter: boolean;
  currency: string; //"cad"
  dateRangeFilter: string[];
  deletedFilter: boolean;
  fromDate: string;
  groupsFilter: string;
  institutionsFilter: null;
  investmentsFilter: null;
  language: string; //"en"
  liabilitiesEnabled: boolean;
  liabilitiesFilter: boolean;
  privateMode: boolean;
  readonly: boolean;
  toDate: string;
  token: string;
};

const Addon = (window as any).Addon;

export const wealthica: WealthicaAPI = {
  addon: new Addon(),
};
