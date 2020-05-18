import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import WealthicaOptions from "./components/WealthicaOptions";
import {
  Position,
  wealthica,
  WealthicaAddonOptions,
} from "./environment/wealthica-api";
import { fetchPositions } from "./fetchers/fetchers";

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [options, setOptions] = useState<WealthicaAddonOptions>();
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
      }
    };

    refreshPositions();
  }, [options]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {options && <WealthicaOptions options={options} />}

      <h1>Positions:</h1>
      <ul>
        {positions.map((position) => (
          <li>{`${position.security.symbol}: ${position.quantity}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
