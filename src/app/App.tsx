import { useRef, useState } from "react";
import { Preview } from "../components/preview/Preview";
import { Section } from "../components/section/Section";
import { Settings } from "../components/settings/Settings";
import { Statistics } from "../components/statistics/Statistics";
import { UploadArea } from "../components/uploadarea/UploadArea";
import { useBlueprintCalculation } from "../hooks/useBlueprintCalculation";
import { useBlueprintSerializer } from "../hooks/useBlueprintSerializer";
import { useImageLoader } from "../hooks/useImageLoader";
import { combine } from "../logic/classnames";
import { Config, FactorioBlueprint } from "../types/types";
import "./App.css";

type Theme = "dark" | "light";

const initialConfig: Config = {
  scale: 6,
  threshold: 0.5,
  transparency: true,
  roboports: true,
  tiles: true,
  walls: true,
  name: "My Solar Pixel Art",
};

export const App = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, setTheme] = useState<Theme>("dark");
  const [config, setConfig] = useState(initialConfig);

  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [blueprint, setBlueprint] = useState<FactorioBlueprint | null>(null);
  const [importableText, setImportableText] = useState("");

  useImageLoader(imageRef, file, setImageSrc, setSize);
  useBlueprintCalculation(imageRef, size, config, setBlueprint);
  useBlueprintSerializer(blueprint, setImportableText);

  return (
    <div className={combine("app", theme)}>
      <header className="app-header">
        <span className="material-icons">light_mode</span>
        <h1>Factorio Solar Art Generator</h1>
      </header>
      <div className="app-content">
        <Section className="area-settings">
          <>
            <span className="material-icons">settings</span>
            <span>Settings</span>
          </>
          <Settings config={config} setConfig={setConfig} />
        </Section>

        <Section className="area-source">
          <>
            <span className="material-icons">create</span>
            <span>Source</span>
          </>
          {file ? (
            <img
              ref={imageRef}
              src={imageSrc}
              alt="source"
              className="source-image"
            />
          ) : (
            <UploadArea setFile={setFile} />
          )}
        </Section>

        <Section className="area-preview">
          <>
            <span className="material-icons">auto_fix_high</span>
            <span>Preview</span>
          </>
          <Preview
            entities={blueprint?.blueprint?.entities || []}
            tiles={blueprint?.blueprint.tiles || []}
            width={size.width * config.scale}
            height={size.height * config.scale}
          />
        </Section>

        <Section className="area-statistics">
          <>
            <span className="material-icons">bar_chart</span>
            <span>Statistics</span>
          </>
          <Statistics blueprint={blueprint} />
        </Section>

        <Section className="area-code">
          <>
            <span className="material-icons">code</span>
            <span>Code</span>
          </>
          <textarea className="code-area" value={importableText} readOnly />
        </Section>
      </div>
    </div>
  );
};
