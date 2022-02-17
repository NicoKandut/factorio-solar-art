import type { Config } from "../../types/ui";
import { Checkbox } from "../checkbox/Checkbox";
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
        hint="When enabled, transparent parts of the image will be empty in the blueprint."
      >
        <label>Use Transparency</label>
      </Checkbox>
      <Checkbox
        value={config.tiles}
        setValue={(v) => setConfig({ ...config, tiles: v })}
        hint="When enabled, the blueprint will use tiles to fill in the gaps."
      >
        <label>Use Tiles</label>
      </Checkbox>
      <Checkbox
        value={config.walls}
        setValue={(v) => setConfig({ ...config, walls: v })}
        hint="When enabled, the blueprint will use walls for white areas."
      >
        <label>Use Walls</label>
      </Checkbox>
      <Checkbox
        value={config.roboports}
        setValue={(v) => setConfig({ ...config, roboports: v })}
        hint="When enabled, the blueprint will ensure logistic network coverage across the whole blueprint."
      >
        <label>Use Roboports</label>
      </Checkbox>
      <Checkbox
        value={config.radars}
        setValue={(v) => setConfig({ ...config, radars: v })}
        hint="When enabled, the blueprint will ensure radar coverage."
      >
        <label>Use Radars</label>
      </Checkbox>
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
    </div>
  );
};
