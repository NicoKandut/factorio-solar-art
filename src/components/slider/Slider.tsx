import { PropsWithChildren, useEffect, useState } from "react";
import NumberInput from "../numberbox/NumberInput";
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
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    if (value !== internalValue) setInternalValue(value);
    // this is intentional
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <label className="slider" title={hint}>
      {children}
      <input
        type="range"
        className="slider-input"
        value={internalValue}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setInternalValue(Number(e.target.value))}
        onMouseUp={() => setValue(internalValue)}
        onBlur={() => setValue(internalValue)}
      />
      <NumberInput
        className="slider-exact-input"
        value={internalValue}
        setValue={setValue}
      />
    </label>
  );
};
