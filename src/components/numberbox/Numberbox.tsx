import { useState } from "react";
import "./Numberbox.css";

interface Props {
  value: number;
  setValue: (value: number) => void;
  hint: string;
  label: string;
}

export const Numberbox = (props: Props) => {
  const { value, setValue, label, hint } = props;

  const [internalValue, setInternalValue] = useState(value);

  return (
    <label className="textbox" title={hint}>
      {label}
      <input
        type="number"
        className="textbox-input"
        step="0.1"
        value={internalValue}
        onChange={(e) => setInternalValue(Number(e.target.value))}
        onBlur={() => setValue(internalValue)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
    </label>
  );
};
