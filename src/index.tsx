import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app/App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { onUpdate } from "./logic/update-state";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://a6f44d458daf4987900f5bb9b04222fc@o1142273.ingest.sentry.io/6201203",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register({ onUpdate });
reportWebVitals();
