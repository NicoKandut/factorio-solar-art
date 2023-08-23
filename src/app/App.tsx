import * as factorio from "../factorio-blueprint-utils/src";
import { useMemo, useRef, useState } from "react";
import { Button } from "../components/button/Button";
import { CopyButton } from "../components/copybutton/CopyButton";
import Header from "../components/header/Header";
import { CenteredLoader } from "../components/loader/Loader";
import { Section } from "../components/section/Section";
import { Settings } from "../components/settings/Settings";
import { Statistics } from "../components/statistics/Statistics";
import { UploadArea } from "../components/uploadarea/UploadArea";
import { useBlueprintCalculation } from "../hooks/useBlueprintCalculation";
import { useImageLoader } from "../hooks/useImageLoader";
import { SE_TILES_PER_PIXEL, TILES_PER_PIXEL } from "../logic/constants";
import { encode } from "../logic/serialization";
import { Config } from "../types/ui";
import "./App.css";

const initialConfig: Config = {
  scale: 1,
  threshold: 0.5,
  transparency: true,
  roboports: true,
  tiles: true,
  walls: true,
  radars: true,
  book: false,
  blueprintSize: 50,
  snapping: true,
  snappingSize: TILES_PER_PIXEL,
  mods: {
    spaceExploration: {
      enabled: false,
      accumulatorTier: 1,
      panelTier: 1,
    },
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

  const [label, setLabel] = useState(initialName);
  const [config, setConfig] = useState(initialConfig);
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [previewSrc, setPreviewSrc] = useState("");
  const [blueprints, setBlueprints] = useState<
    Array<factorio.WrappedBlueprint>
  >([]);
  const hasBlueprint = blueprints.length > 0;

  const namedSerializable: factorio.Serializable | null = useMemo(() => {
    if (hasBlueprint) {
      if (config.book) {
        return {
          blueprint_book: {
            blueprints,
            label,
            item: "blueprint-book",
            description: "This is description",
            active_index: 0,
            version: 1,
          },
        } as factorio.WrappedBlueprintBook;
      }

      return {
        blueprint: {
          name: label,
          ...blueprints[0].blueprint,
        },
      } as factorio.WrappedBlueprint;
    }

    return null;
  }, [blueprints, label, config.book, hasBlueprint]);

  useImageLoader(imageRef, file, config.scale, setImageSrc, setSize);
  useBlueprintCalculation(imageRef, size, config, setBlueprints, setPreviewSrc);
  const tilesPerPixel = config.mods.spaceExploration.enabled
    ? SE_TILES_PER_PIXEL
    : TILES_PER_PIXEL;

  return (
    <div className="app">
      <Header className="area-header" />
      <Section title="Settings" className="area-settings">
        <Settings
          config={config}
          setConfig={setConfig}
          name={label}
          setName={setLabel}
        />
      </Section>

      <Section title="Source" className="area-source">
        {file && (
          <>
            <small>
              {size.width} x {size.height} px
            </small>
            {size.width > 800 || size.height > 800 ? (
              <span
                className="material-icons size-warning"
                title="Large sizes will lead to long loading times or crashes."
              >
                warning
              </span>
            ) : null}
            <Button
              title="Reset"
              onClick={() => {
                setFile(null);
                setImageSrc("");
                setSize({ width: 0, height: 0 });
                setBlueprints([]);
                setPreviewSrc("");
              }}
            >
              <span className="material-icons">clear</span>
            </Button>
          </>
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

      <Section title="Preview" className="area-preview">
        {file && (
          <>
            <small>
              {size.width * tilesPerPixel} x {size.height * tilesPerPixel} tiles
            </small>
            <CopyButton blueprint={namedSerializable} icons={copyButtonIcons} />
            {"showSaveFilePicker" in window ? (
              <Button
                title="Download Blueprint to file"
                onClick={async () => {
                  if (!namedSerializable) return;

                  // @ts-expect-error
                  const fileHandle = (await window.showSaveFilePicker({
                    types: [
                      {
                        description: "Text Files",
                        accept: {
                          "text/plain": [".txt"],
                        },
                      },
                    ],
                    suggestedName: label,
                  })) as any; /* FileSystemFileHandle */

                  const writableStream =
                    (await fileHandle.createWritable()) as any; /* FileSystemWritableFileStream */
                  await writableStream.write(encode(namedSerializable));
                  await writableStream.close();
                }}
              >
                <span className="material-icons">download</span>
              </Button>
            ) : null}
          </>
        )}

        {file && !hasBlueprint ? (
          <CenteredLoader />
        ) : previewSrc ? (
          <img src={previewSrc} alt="preview" className="preview-image" />
        ) : null}
      </Section>

      <Section title="Statistics" className="area-statistics">
        <Statistics
          blueprints={blueprints}
          useSpaceExploration={config.mods.spaceExploration.enabled}
          panel={config.mods.spaceExploration.panelTier}
          accumulator={config.mods.spaceExploration.accumulatorTier}
        />
      </Section>
    </div>
  );
};
