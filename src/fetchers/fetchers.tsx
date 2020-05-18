import {
  Position,
  WealthicaAddonOptions,
  wealthica,
} from "../environment/wealthica-api";
import { PortfolioTargetRepository } from "../environment/passiv-api";

const fetchPositions = (options: WealthicaAddonOptions): Promise<Position[]> =>
  wealthica.addon.api.getPositions({
    groups: options.groupsFilter,
    institutions: options.institutionsFilter,
    investments: options.investmentsFilter,
  });

const fetchTargets = (): Promise<PortfolioTargetRepository> =>
  wealthica.addon
    .request({
      method: "GET",
      endpoint: "preferences/addons/passiv/passiv-lite",
    })
    .then((res) => {
      console.log(res);
      return res;
    });

export { fetchPositions, fetchTargets };
