import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { wealthica } from "./environment/addon";

wealthica.addon.on("init", (options) => {
  wealthica.options = options;
  console.log("init", wealthica.options);
});

wealthica.addon.on("update", (options) => {
  // Filters have been updated and Dashboard is passing in updated options
  wealthica.options = {
    ...wealthica.options,
    ...options,
  };
  console.log("update", wealthica.options);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
