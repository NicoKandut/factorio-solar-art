import { PropsWithChildren } from "react";
import "./Textbox.css";

interface Props {
  value: string;
  setValue: (value: string) => void;
  hint: string;
}

export const Textbox = (props: PropsWithChildren<Props>) => {
  const { value, setValue, children, hint } = props;

  return (
    <div className="textbox" title={hint}>
      {children}
      <input
        type="text"
        className="textbox-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
