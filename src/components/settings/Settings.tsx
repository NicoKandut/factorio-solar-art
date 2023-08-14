import type { Config } from "../../types/ui";
import { Checkbox } from "../checkbox/Checkbox";
import { Numberbox } from "../numberbox/Numberbox";
import { Slider } from "../slider/Slider";
import { Textbox } from "../textbox/Textbox";
import "./Settings.css";

interface Props {
  config: Config;
  setConfig: (config: Config) => void;
  name: string;
  setName: (name: string) => void;
}

export const Settings = (props: Props) => {
  const { config, setConfig, name, setName } = props;

  return (
    <div className="settings">
      <Textbox
        label="Name"
        value={name}
        setValue={(v) => setName(v)}
        hint="This will be the in-game name of your blueprint."
      />
      <Checkbox
        value={config.transparency}
        setValue={(v) => setConfig({ ...config, transparency: v })}
        title="When enabled, transparent parts of the image will be empty in the blueprint."
      >
        <label>Use Transparency</label>
      </Checkbox>
      <Checkbox
        value={config.tiles}
        setValue={(v) => setConfig({ ...config, tiles: v })}
        title="When enabled, the blueprint will use tiles to fill in the gaps."
      >
        <label>Use Tiles</label>
      </Checkbox>
      <Checkbox
        value={config.walls}
        setValue={(v) => setConfig({ ...config, walls: v })}
        title="When enabled, the blueprint will use walls for white areas."
      >
        <label>Use Walls</label>
      </Checkbox>
      <Checkbox
        value={config.roboports}
        setValue={(v) => setConfig({ ...config, roboports: v })}
        title="When enabled, the blueprint will ensure logistic network coverage across the whole blueprint."
      >
        <label>Use Roboports</label>
      </Checkbox>
      <Checkbox
        value={config.radars}
        setValue={(v) => setConfig({ ...config, radars: v })}
        title="When enabled, the blueprint will ensure radar coverage."
      >
        <label>Use Radars</label>
      </Checkbox>
      <Checkbox
        value={config.book}
        setValue={(v) => setConfig({ ...config, book: v })}
        title="Generate a blueprint book containing multiple blueprints instead of a single blueprint."
      >
        <label>Generate Blueprint Book</label>
      </Checkbox>
      <Numberbox
        label="Split Size"
        value={config.blueprintSize}
        setValue={(v) => setConfig({ ...config, blueprintSize: v })}
        hint="Determine the size of the blueprints in the book."
        disabled={!config.book}
      />
      <Checkbox
        value={config.snapping}
        setValue={(v) => setConfig({ ...config, snapping: v })}
        title="Make the blueprint snap to a grid."
      >
        <label>Snapping</label>
      </Checkbox>
      <Numberbox
        label="Snap Size"
        value={config.snappingSize}
        setValue={(v) => setConfig({ ...config, snappingSize: v })}
        hint="Grid size for snapping."
        disabled={!config.snapping}
      />
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={config.threshold}
        setValue={(v) => setConfig({ ...config, threshold: v })}
        hint="This is the threshold between solar panels and accumulators. Higher values will result in more solar panels."
      >
        <label>Contrast</label>
      </Slider>
      <Numberbox
        label="Scale"
        value={config.scale}
        setValue={(v) => setConfig({ ...config, scale: v })}
        hint="Scale the resulting blueprint."
      ></Numberbox>
      <Checkbox
        value={config.mods.spaceExploration.enabled}
        setValue={(v) =>
          setConfig({
            ...config,
            mods: {
              ...config.mods,
              spaceExploration: {
                ...config.mods.spaceExploration,
                enabled: v,
              },
            },
          })
        }
        title="When enabled, the blueprint will use items from space exploration."
      >
        <label>[MOD] Space Exploration</label>
      </Checkbox>
      {config.mods.spaceExploration.enabled ? (
        <>
          <Checkbox
            value={config.mods.spaceExploration.accumulatorTier === 1}
            setValue={(v) =>
              v &&
              setConfig({
                ...config,
                mods: {
                  ...config.mods,
                  spaceExploration: {
                    ...config.mods.spaceExploration,
                    accumulatorTier: 1,
                  },
                },
              })
            }
            title="Accumulator Tier 1"
          >
            <label>Accumulator Tier 1</label>
          </Checkbox>
          <Checkbox
            value={config.mods.spaceExploration.accumulatorTier === 2}
            setValue={(v) =>
              v &&
              setConfig({
                ...config,
                mods: {
                  ...config.mods,
                  spaceExploration: {
                    ...config.mods.spaceExploration,
                    accumulatorTier: 2,
                  },
                },
              })
            }
            title="Accumulator Tier 2"
          >
            <label>Accumulator Tier 2</label>
          </Checkbox>
          <Checkbox
            value={config.mods.spaceExploration.accumulatorTier === 3}
            setValue={(v) =>
              v &&
              setConfig({
                ...config,
                mods: {
                  ...config.mods,
                  spaceExploration: {
                    ...config.mods.spaceExploration,
                    accumulatorTier: 3,
                  },
                },
              })
            }
            title="Accumulator Tier 3"
          >
            <label>Accumulator Tier 3</label>
          </Checkbox>
          <Checkbox
            value={config.mods.spaceExploration.panelTier === 1}
            setValue={(v) =>
              v &&
              setConfig({
                ...config,
                mods: {
                  ...config.mods,
                  spaceExploration: {
                    ...config.mods.spaceExploration,
                    panelTier: 1,
                  },
                },
              })
            }
            title="Panel Tier 1"
          >
            <label>Panel Tier 1</label>
          </Checkbox>
          <Checkbox
            value={config.mods.spaceExploration.panelTier === 2}
            setValue={(v) =>
              v &&
              setConfig({
                ...config,
                mods: {
                  ...config.mods,
                  spaceExploration: {
                    ...config.mods.spaceExploration,
                    panelTier: 2,
                  },
                },
              })
            }
            title="Panel Tier 2"
          >
            <label>Panel Tier 2</label>
          </Checkbox>
          <Checkbox
            value={config.mods.spaceExploration.panelTier === 3}
            setValue={(v) =>
              v &&
              setConfig({
                ...config,
                mods: {
                  ...config.mods,
                  spaceExploration: {
                    ...config.mods.spaceExploration,
                    panelTier: 3,
                  },
                },
              })
            }
            title="Panel Tier 3"
          >
            <label>Panel Tier 3</label>
          </Checkbox>
        </>
      ) : null}
    </div>
  );
};
