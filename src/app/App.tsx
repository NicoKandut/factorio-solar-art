import { useState } from "react";
import Canvas from "../components/canvas/Canvas";
import Settings from "../components/settings/Settings";
import { Config } from "../types/types";
import "./App.css";

type Theme = "dark" | "light";

function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [file, setFile] = useState<File | null>(null);
  const [config, setConfig] = useState<Config>({
    threshold: 0.5,
    transparency: false,
    roboports: true,
    mode: "exact",
    name: "My Solar Artwork",
  });

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <span className="material-icons">light_mode</span>
        <h1>Factorio Solar Art Generator</h1>
      </header>

      <section className="app-settings">
        <Settings config={config} setConfig={setConfig} />
      </section>
      <section className="app-canvas">
        <Canvas file={file} setFile={setFile} config={config} />
      </section>
    </div>
  );
}

export default App;
