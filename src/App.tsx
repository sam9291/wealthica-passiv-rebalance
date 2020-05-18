import React from "react";
import logo from "./logo.svg";
import "./App.css";
import WealthicaOptions from "./components/WealthicaOptions";
import { wealthica } from "./environment/addon";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      {wealthica.options && <WealthicaOptions options={wealthica.options} />}
    </div>
  );
}

export default App;
