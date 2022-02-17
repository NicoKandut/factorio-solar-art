import { PropsWithChildren } from "react";
import "./Checkbox.css";

interface Props {
  value: boolean;
  setValue: (value: boolean) => void;
  hint: string;
}

export const Checkbox = (props: PropsWithChildren<Props>) => {
  const { value, setValue, children, hint } = props;

  return (
    <label className="checkbox" title={hint}>
      <input
        type="checkbox"
        className="checkbox-input"
        checked={value}
        onChange={() => setValue(!value)}
      />
      {children}
    </label>
  );
};
