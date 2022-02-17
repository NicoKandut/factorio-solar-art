import { useMemo, useRef, useState } from "react";
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
import { SE_TILES_PER_PIXEL, TILES_PER_PIXEL } from "../logic/constants";
import { FactorioBlueprint } from "../types/factorio";
import { Config } from "../types/ui";
import "./App.css";

const initialConfig: Config = {
  scale: 6,
  threshold: 0.5,
  transparency: true,
  roboports: true,
  tiles: true,
  walls: true,
  radars: true,
  mods: {
    spaceExploration: false,
  },
};

const initialName = "My Blueprint";

const copyButtonIcons = {
  success: <span className="icon success material-icons">check_circle</span>,
  error: <span className="icon error material-icons">error</span>,
  default: <span className="icon material-icons">content_copy</span>,
};

export const App = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  const [name, setName] = useState(initialName);
  const [config, setConfig] = useState(initialConfig);
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [blueprint, setBlueprint] = useState<FactorioBlueprint | null>(null);

  const namedBlueprint: FactorioBlueprint | null = useMemo(
    () =>
      blueprint
        ? {
            blueprint: { ...blueprint.blueprint, label: name },
          }
        : null,
    [blueprint, name]
  );
  const [importableText, setImportableText] = useState("");
  useImageLoader(imageRef, file, setImageSrc, setSize);
  useBlueprintCalculation(imageRef, size, config, setBlueprint);
  useBlueprintSerializer(namedBlueprint, setImportableText);
  const tilesPerPixel = config.mods.spaceExploration
    ? SE_TILES_PER_PIXEL
    : TILES_PER_PIXEL;

  return (
    <div className="app">
      <Header className="area-header" />
      <Section className="area-settings">
        <span>Settings</span>
        <Settings
          config={config}
          setConfig={setConfig}
          name={name}
          setName={setName}
        />
      </Section>

      <Section className="area-source">
        <span>Source</span>
        {file && (
          <Button
            title="Reset"
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
          <>
            <CopyButton text={importableText} icons={copyButtonIcons} />
            <Button
              title="Recalculate"
              onClick={() => setConfig({ ...config })}
            >
              <span className="material-icons">replay</span>
            </Button>
          </>
        )}

        {file && !blueprint ? (
          <CenteredLoader />
        ) : (
          <Preview
            entities={blueprint?.blueprint?.entities || []}
            tiles={blueprint?.blueprint.tiles || []}
            width={size.width * tilesPerPixel}
            height={size.height * tilesPerPixel}
            useSpaceExploration={config.mods.spaceExploration}
          />
        )}
      </Section>

      <Section className="area-statistics">
        <span>Statistics</span>

        <Statistics
          blueprint={blueprint}
          useSpaceExploration={config.mods.spaceExploration}
        />
      </Section>
    </div>
  );
};
