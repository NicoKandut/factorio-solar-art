import { Config, Mode } from "../../types/types";
import Checkbox from "../checkbox/Checkbox";
import Select from "../select/Select";
import Slider from "../slider/Slider";
import Textbox from "../textbox/Textbox";

interface Props {
  config: Config;
  setConfig: (config: Config) => void;
}

const modeOptions: Mode[] = ["exact", "sloppy"];

function Settings(props: Props) {
  const { config, setConfig } = props;

  return (
    <>
      <Checkbox
        value={config.transparency}
        setValue={(v) => setConfig({ ...config, transparency: v })}
      >
        <span>Transparency</span>
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
      <Select
        value={config.mode}
        options={modeOptions}
        setValue={(v) => setConfig({ ...config, mode: v as Mode })}
      >
        <span>Calculation scale</span>
      </Select>
      <Textbox
        value={config.name}
        setValue={(v) => setConfig({ ...config, name: v })}
      >
        <span>Name</span>
      </Textbox>
    </>
  );
}

export default Settings;
