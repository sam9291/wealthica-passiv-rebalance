import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Position,
  wealthica,
  WealthicaAddonOptions,
  Institution,
  Security,
} from "./environment/wealthica-api";
import {
  fetchPositions,
  fetchTargets,
  fetchRebalanceActions,
  fetchInstitutions,
} from "./fetchers/fetchers";
import {
  PortfolioTargetRepository,
  PortfolioTarget,
  SymbolTarget,
  RebalanceAction,
} from "./environment/passiv-api";

const buttonStyle = { margin: 8 };

const resultStyle: Partial<React.CSSProperties> = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
};

type RowProps = {
  component: SymbolTarget;
  positions: Position[];
  actions: RebalanceAction[];
};

const getSymbol = (security: Security, currency: string) => {
  const suffix = currency === "cad" ? ".TO" : "";

  return `${security.symbol}${suffix}`;
};

const getTotalFromPositions = (
  positions: Position[],
  actions: RebalanceAction[]
) =>
  positions.reduce(
    (total, current) =>
      total +
      current.quantity *
        (actions.find(
          (x) =>
            x.symbol === getSymbol(current.security, current.security.currency)
        )?.price || 0),
    0
  );

const getQuantity = (positions: Position[], component: SymbolTarget) =>
  positions.find(
    (x) => getSymbol(x.security, x.security.currency) === component.symbol
  )?.quantity || 0;

const getCurrentValue = (quantity: number, price: number) =>
  Math.round(quantity * price * 100) / 100;

const calculateDelta = (
  component: SymbolTarget,
  positions: Position[],
  actions: RebalanceAction[]
) => {
  const quantity = getQuantity(positions, component);
  const rebalanceAction = actions.find((x) => x.symbol === component.symbol);
  return (
    Math.round(
      (component.percentOfPortfolio * 100 -
        Math.round(
          (getCurrentValue(quantity, rebalanceAction?.price || 0) /
            getTotalFromPositions(positions, actions)) *
            100 *
            100
        ) /
          100) *
        100
    ) / 100
  );
};

const Row: React.FC<RowProps> = (props) => {
  const quantity = getQuantity(props.positions, props.component);
  const rebalanceAction = props.actions.find(
    (x) => x.symbol === props.component.symbol
  );

  let actionQuantity = 0;
  let targetValue = 0;
  let currentValue = 0;
  let totalValue = 0;

  if (rebalanceAction) {
    actionQuantity = rebalanceAction.units;
    if (rebalanceAction.action === "SELL") {
      actionQuantity = actionQuantity * -1;
    }

    currentValue = Math.round(quantity * rebalanceAction.price * 100) / 100;

    targetValue =
      Math.round((quantity + actionQuantity) * rebalanceAction.price * 100) /
      100;

    totalValue = getTotalFromPositions(props.positions, props.actions);
  }

  return (
    <tr>
      <td>{props.component.symbol}</td>
      <td>{rebalanceAction?.price || "-"}</td>
      <td>{`${Math.round((currentValue / totalValue) * 100 * 100) / 100}%`}</td>
      <td>{`${props.component.percentOfPortfolio * 100}%`}</td>
      <td>{quantity}</td>
      <td>{currentValue}</td>
      <td>{rebalanceAction?.action || ""}</td>
      <td>{actionQuantity || ""}</td>
      <td>{quantity + actionQuantity}</td>
      <td>{!rebalanceAction ? "-" : targetValue}</td>
      <td>{`${calculateDelta(
        props.component,
        props.positions,
        props.actions
      )}%`}</td>
    </tr>
  );
};

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [generateBuyOnly, setGenerateBuyOnly] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [options, setOptions] = useState<WealthicaAddonOptions>();
  const [targetRepository, setTargetRepository] = useState<
    PortfolioTargetRepository
  >();
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioTarget>();
  const [positions, setPositions] = useState<Position[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [rebalanceActions, setRebalanceActions] = useState<RebalanceAction[]>(
    []
  );
  const distinctCurrencies = Object.keys(
    institutions
      .flatMap((x) => x.investments)
      .map((x) => x.currency)
      .reduce(
        (map, currency) => ({
          ...map,
          [currency]: 1,
        }),
        {}
      )
  );

  const getBalancePerCurrency = (
    currency: string,
    options: WealthicaAddonOptions
  ) => ({
    currency: currency,
    amount: institutions
      .flatMap((x) => x.investments.filter((i) => i.currency === currency))
      .filter(
        (x) =>
          !options.groupsFilter ||
          options.groupsFilter
            .split(",")
            .some((group) => x.groups.includes(group))
      )
      .reduce((total, investment) => total + investment.cash, 0),
  });

  const cashBalances = !options
    ? []
    : distinctCurrencies.map((currency) =>
        getBalancePerCurrency(currency, options)
      );

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);

      wealthica.addon.on("init", (options) => {
        setOptions(options);
      });

      wealthica.addon.on("update", (options) => {
        setOptions((prev) => ({
          ...prev,
          ...options,
        }));
      });
    }
  }, [isInitialized]);

  useEffect(() => {
    const refreshPositions = async () => {
      if (options) {
        const result = await fetchPositions(options);
        setPositions(result);

        const targetResults = await fetchTargets();
        setTargetRepository(targetResults);

        const institutionsResults = await fetchInstitutions(options);
        setInstitutions(institutionsResults);
      }
    };

    refreshPositions();
  }, [options]);

  const select = async (portfolio: PortfolioTarget) => {
    setIsFetchingData(true);
    const result = await fetchRebalanceActions({
      buy_only: generateBuyOnly,
      positions: positions.map((x) => ({
        symbol: getSymbol(x.security, x.security.currency),
        units: x.quantity,
      })),
      targets: portfolio.components.map((x) => ({
        symbol: x.symbol,
        percent: x.percentOfPortfolio * 100,
      })),
      balances: cashBalances,
    });
    setRebalanceActions(result);
    setSelectedPortfolio(portfolio);
    setIsFetchingData(false);
  };

  return (
    <div className="App">
      <h1>Cash Balance</h1>
      <table>
        <tr>
          <th>Currency</th>
          <th>Balance</th>
        </tr>
        {cashBalances.map((x) => (
          <tr>
            <td>{x.currency}</td>
            <td>{x.amount}</td>
          </tr>
        ))}
      </table>
      <div style={resultStyle}>
        <div>
          <h1>Positions:</h1>
          <table>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
            </tr>
            {positions.map((position) => (
              <tr>
                <td>
                  {getSymbol(position.security, position.security.currency)}
                </td>
                <td>{position.quantity}</td>
              </tr>
            ))}
          </table>
        </div>

        <div>
          <h1>Select a Passiv portfolio configuration to calculate:</h1>
          <div>
            {targetRepository && (
              <>
                <span>Buy only</span>
                <input
                  type="checkbox"
                  checked={generateBuyOnly}
                  onClick={() => setGenerateBuyOnly(!generateBuyOnly)}
                />
                {targetRepository.portfolios.map((p) => (
                  <button
                    disabled={isFetchingData}
                    onClick={() => select(p)}
                    style={buttonStyle}
                  >
                    {p.portfolioName}
                  </button>
                ))}
              </>
            )}
          </div>

          {isFetchingData && <h2>Loading...</h2>}

          {selectedPortfolio && positions && (
            <>
              <h1>{selectedPortfolio.portfolioName}</h1>
              <table>
                <tr>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>Actual</th>
                  <th>Target</th>
                  <th>Current Quantity</th>
                  <th>Current Value</th>
                  <th>Action</th>
                  <th>Buy/Sell</th>
                  <th>Final Quantity</th>
                  <th>Final Value</th>
                  <th>Delta</th>
                </tr>
                {selectedPortfolio.components
                  .sort(
                    (a, b) =>
                      calculateDelta(a, positions, rebalanceActions) -
                      calculateDelta(b, positions, rebalanceActions)
                  )
                  .map((c) => (
                    <Row
                      component={c}
                      positions={positions}
                      actions={rebalanceActions}
                    />
                  ))}
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
