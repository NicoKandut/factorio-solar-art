import { PropsWithChildren } from "react";
import "./Slider.css";

interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  setValue: (value: number) => void;
  hint: string;
}

export const Slider = (props: PropsWithChildren<Props>) => {
  const { value, setValue, min, max, step, children, hint } = props;

  return (
    <div className="slider" title={hint}>
      {children}
      <input
        type="range"
        className="slider-input"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
};
