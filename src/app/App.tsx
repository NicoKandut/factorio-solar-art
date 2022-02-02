import { useRef, useState } from "react";
import { Button } from "../components/button/Button";
import { CopyButton } from "../components/copybutton/CopyButton";
import Header from "../components/header/Header";
import { CenteredLoader } from "../components/loader/Loader";
import { Preview } from "../components/preview/Preview";
import { Section } from "../components/section/Section";
import { Settings } from "../components/settings/Settings";
import { Statistics } from "../components/statistics/Statistics";
import { UploadArea } from "../components/uploadarea/UploadArea";
import { useBlueprintCalculation } from "../hooks/useBlueprintCalculation";
import { useBlueprintSerializer } from "../hooks/useBlueprintSerializer";
import { useImageLoader } from "../hooks/useImageLoader";
import { combine } from "../logic/classnames";
import { FactorioBlueprint } from "../types/factorio";
import { Config, Theme } from "../types/ui";
import "./App.css";

const initialConfig: Config = {
  scale: 6,
  threshold: 0.5,
  transparency: true,
  roboports: true,
  tiles: true,
  walls: true,
  name: "My Blueprint",
};

const copyButtonIcons = {
  success: <span className="icon success material-icons">check_circle</span>,
  error: <span className="icon error material-icons">error</span>,
  default: <span className="icon material-icons">content_copy</span>,
};

export const App = () => {
  const imageRef = useRef<HTMLImageElement>(null);

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
    <div className="app">
      <Header className="area-header" />
      <Section className="area-settings">
        <span>Settings</span>
        <Settings config={config} setConfig={setConfig} />
      </Section>

      <Section className="area-source">
        <span>Source</span>
        {file && (
          <Button
            className="clear-button"
            onClick={() => {
              setFile(null);
              setImageSrc("");
              setSize({ width: 0, height: 0 });
              setBlueprint(null);
              setImportableText("");
            }}
          >
            <span className="material-icons">clear</span>
          </Button>
        )}
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
        <span>Preview</span>
        {file && (
          <Button onClick={() => setConfig({ ...config })}>
            <span className="material-icons">replay</span>
          </Button>
        )}

        {file && !blueprint ? (
          <CenteredLoader />
        ) : (
          <Preview
            entities={blueprint?.blueprint?.entities || []}
            tiles={blueprint?.blueprint.tiles || []}
            width={size.width * config.scale}
            height={size.height * config.scale}
          />
        )}
      </Section>

      <Section className="area-statistics">
        <span>Statistics</span>

        <Statistics blueprint={blueprint} />
      </Section>

      <Section className="area-code">
        <span>Code</span>
        <CopyButton text={importableText} icons={copyButtonIcons} />
        {file && !importableText ? (
          <CenteredLoader />
        ) : (
          <textarea className="code-area" value={importableText} readOnly />
        )}
      </Section>
    </div>
  );
};
