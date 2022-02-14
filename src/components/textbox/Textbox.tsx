import { PropsWithChildren, useState } from "react";
import "./Textbox.css";

interface Props {
  value: string;
  setValue: (value: string) => void;
  hint: string;
}

export const Textbox = (props: PropsWithChildren<Props>) => {
  const { value, setValue, children, hint } = props;

  const [internalValue, setInternalValue] = useState(value);

  return (
    <div className="textbox" title={hint}>
      {children}
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
    </div>
  );
};
