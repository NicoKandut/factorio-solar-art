import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { onUpdate } from "./logic/update-state";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register({ onUpdate });
reportWebVitals();
