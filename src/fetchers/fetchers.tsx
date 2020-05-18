import {
  Position,
  WealthicaAddonOptions,
  wealthica,
  Institution,
} from "../environment/wealthica-api";
import {
  PortfolioTargetRepository,
  FetchRebalanceActionsQuery,
  RebalanceAction,
} from "../environment/passiv-api";

const parsePayload = (token: string) => JSON.parse(atob(token));

const request = (url: string, params?: any, init?: RequestInit | undefined) => {
  const requestUrl = new URL(url);
  if (params) {
    requestUrl.search = new URLSearchParams(params).toString();
  }
  return fetch(requestUrl.toString(), init).then((res) => res.json());
};

const fetchPositions = (options: WealthicaAddonOptions): Promise<Position[]> =>
  wealthica.addon.api.getPositions({
    groups: options.groupsFilter,
    institutions: options.institutionsFilter,
    investments: options.investmentsFilter,
  });

const fetchInstitutions = (): Promise<Institution[]> =>
  wealthica.addon.api.getInstitution();

const fetchTargets = (): Promise<PortfolioTargetRepository> =>
  wealthica.addon
    .request({
      method: "GET",
      endpoint: "preferences/addons/passiv/passiv-lite",
    })
    .then((res) => parsePayload(res.data));

const fetchRebalanceActions = (
  requestQuery: FetchRebalanceActionsQuery
): Promise<RebalanceAction[]> =>
  request("https://getpassiv.com/api/v1/embeddedTrades", undefined, {
    method: "POST",
    body: JSON.stringify(requestQuery),
  });

export {
  fetchPositions,
  fetchTargets,
  fetchRebalanceActions,
  fetchInstitutions,
};
