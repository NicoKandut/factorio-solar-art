import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./index.css";
import { onUpdate } from "./logic/update-state";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

Sentry.init({
  dsn: "https://a6f44d458daf4987900f5bb9b04222fc@o1142273.ingest.sentry.io/6201203",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register({ onUpdate });
reportWebVitals();
