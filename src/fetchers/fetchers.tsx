import {
  Position,
  WealthicaAddonOptions,
  wealthica,
} from "../environment/wealthica-api";
import { PortfolioTargetRepository } from "../environment/passiv-api";

const get = (url: string, params: any, init?: RequestInit | undefined) => {
  const requestUrl = new URL(url);
  requestUrl.search = new URLSearchParams(params).toString();
  return fetch(requestUrl.toString(), init).then((res) => res.json());
};

const secureGet = (url: string, token: string, params?: any) =>
  get(url, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

const fetchPositions = (options: WealthicaAddonOptions): Promise<Position[]> =>
  wealthica.addon.api.getPositions({
    groups: options.groupsFilter,
    institutions: options.institutionsFilter,
    investments: options.investmentsFilter,
  });

const fetchTargets = (
  options: WealthicaAddonOptions
): Promise<PortfolioTargetRepository> =>
  secureGet(
    "https://app.wealthica.com/api/preferences/addons/passiv/passiv-lite",
    options.token
  );

export { fetchPositions, fetchTargets };
