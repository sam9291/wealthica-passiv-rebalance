import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Position,
  wealthica,
  WealthicaAddonOptions,
} from "./environment/wealthica-api";
import { fetchPositions, fetchTargets } from "./fetchers/fetchers";
import {
  PortfolioTargetRepository,
  PortfolioTarget,
  SymbolTarget,
} from "./environment/passiv-api";

type RowProps = {
  component: SymbolTarget;
  positions: Position[];
};

const Row: React.FC<RowProps> = (props) => {
  const quantity =
    props.positions.find((x) => x.security.symbol === props.component.symbol)
      ?.quantity || 0;
  return (
    <tr>
      <td>{props.component.symbol}</td>
      <td>{props.component.priceUpToDate}</td>
      <td>{props.component.percentOfPortfolio}</td>
      <td>{quantity}</td>
      <td>-</td>
      <td>{quantity + 0}</td>
    </tr>
  );
};

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [options, setOptions] = useState<WealthicaAddonOptions>();
  const [targetRepository, setTargetRepository] = useState<
    PortfolioTargetRepository
  >();
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioTarget>();
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);

      wealthica.addon.on("init", (options) => {
        setOptions(options);
        console.log("init", options);
      });

      wealthica.addon.on("update", (options) => {
        // Filters have been updated and Dashboard is passing in updated options
        setOptions((prev) => ({
          ...prev,
          ...options,
        }));
        console.log("update", options);
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
      }
    };

    refreshPositions();
  }, [options]);

  return (
    <div className="App">
      <h1>Positions:</h1>
      <ul>
        {positions.map((position) => (
          <li>{`${position.security.symbol}: ${position.quantity}`}</li>
        ))}
      </ul>
      <h1>Targets:</h1>
      <div>
        {targetRepository &&
          targetRepository.portfolios.map((p) => (
            <button onClick={() => setSelectedPortfolio(p)}>
              {p.portfolioName}
            </button>
          ))}
      </div>

      {selectedPortfolio && positions && (
        <>
          <h1>{selectedPortfolio.portfolioName}</h1>
          <table>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Target</th>
              <th>Current Quantity</th>
              <th>Buy/Sell</th>
              <th>Result</th>
            </tr>
            {selectedPortfolio.components.map((c) => (
              <Row component={c} positions={positions} />
            ))}
          </table>
        </>
      )}
    </div>
  );
};

export default App;
