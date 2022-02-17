import { useState } from "react";
import "./Textbox.css";

interface Props {
  value: string;
  setValue: (value: string) => void;
  hint: string;
  label: string;
}

export const Textbox = (props: Props) => {
  const { value, setValue, label, hint } = props;

  const [internalValue, setInternalValue] = useState(value);

  return (
    <label className="textbox" title={hint}>
      {label}
      <input
        type="text"
        className="textbox-input"
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
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
