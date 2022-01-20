import type { Config } from "../../types/ui";
import { Checkbox } from "../checkbox/Checkbox";
import { Slider } from "../slider/Slider";
import { Textbox } from "../textbox/Textbox";

interface Props {
  config: Config;
  setConfig: (config: Config) => void;
}

export const Settings = (props: Props) => {
  const { config, setConfig } = props;

  return (
    <>
      <Textbox
        value={config.name}
        setValue={(v) => setConfig({ ...config, name: v })}
      >
        <span>Name</span>
      </Textbox>
      <Checkbox
        value={config.transparency}
        setValue={(v) => setConfig({ ...config, transparency: v })}
      >
        <span>Transparency</span>
      </Checkbox>
      <Checkbox
        value={config.tiles}
        setValue={(v) => setConfig({ ...config, tiles: v })}
      >
        <span>Use tiles</span>
      </Checkbox>
      <Checkbox
        value={config.walls}
        setValue={(v) => setConfig({ ...config, walls: v })}
      >
        <span>Use walls</span>
      </Checkbox>
      <Slider
        min={0}
        max={1}
        step={0.01}
        value={config.threshold}
        setValue={(v) => setConfig({ ...config, threshold: v })}
      >
        <span>Black/White threshold</span>
      </Slider>
      <Checkbox
        value={config.roboports}
        setValue={(v) => setConfig({ ...config, roboports: v })}
      >
        <span>Use roboports</span>
      </Checkbox>

      <button onClick={() => setConfig({ ...config })}>Recalculate</button>
    </>
  );
};
