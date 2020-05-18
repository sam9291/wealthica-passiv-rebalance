import { Position, WealthicaAddonOptions } from "../environment/wealthica-api";

const get = (url: string, params: any) => {
  const requestUrl = new URL(url);
  requestUrl.search = new URLSearchParams(params).toString();
  return fetch(url).then((res) => res.json());
};

const fetchPositions = (options: WealthicaAddonOptions): Promise<Position[]> =>
  get("https://app.wealthica.com/api/positions", {
    groups: options.groupsFilter,
    institutions: options.institutionsFilter,
    investments: options.investmentsFilter,
  });

export { fetchPositions };
