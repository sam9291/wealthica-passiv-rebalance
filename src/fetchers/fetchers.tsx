import {
  Position,
  WealthicaAddonOptions,
  wealthica,
} from "../environment/wealthica-api";

const get = (url: string, params: any, init?: RequestInit | undefined) => {
  const requestUrl = new URL(url);
  requestUrl.search = new URLSearchParams(params).toString();
  return fetch(requestUrl.toString(), init).then((res) => res.json());
};

const fetchPositions = (options: WealthicaAddonOptions): Promise<Position[]> =>
  wealthica.addon.api.getPositions({
    groups: options.groupsFilter,
    institutions: options.institutionsFilter,
    investments: options.investmentsFilter,
  });

export { fetchPositions };
