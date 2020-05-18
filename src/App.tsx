import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import WealthicaOptions from "./components/WealthicaOptions";
import { useEffect } from "react";
import { wealthica, WealthicaAddonOptions } from "./environment/addon";

const App = () => {
  const [options, setOptions] = useState<WealthicaAddonOptions>();

  useEffect(() => {
    if (wealthica.options) {
      setOptions(wealthica.options);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {options && <WealthicaOptions options={options} />}
    </div>
  );
};

export default App;
