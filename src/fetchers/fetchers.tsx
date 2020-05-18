import { Position, WealthicaAddonOptions } from "../environment/wealthica-api";

const get = (url: string, params: any, init?: RequestInit | undefined) => {
  const requestUrl = new URL(url);
  requestUrl.search = new URLSearchParams(params).toString();
  return fetch(requestUrl.toString(), init).then((res) => res.json());
};

const secureGet = (url: string, token: string, params: any) =>
  get(url, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

const fetchPositions = (options: WealthicaAddonOptions): Promise<Position[]> =>
  secureGet("https://app.wealthica.com/api/positions", options.token, {
    groups: options.groupsFilter,
    institutions: options.institutionsFilter,
    investments: options.investmentsFilter,
  });

export { fetchPositions };
