import { PropsWithChildren } from "react";

interface Props {
  value: number;
  min: number;
  max: number;
  step: number;
  setValue: (value: number) => void;
}

export const Slider = (props: PropsWithChildren<Props>) => {
  const { value, setValue, min, max, step, children } = props;

  return (
    <div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      {children}
    </div>
  );
};
