import { PropsWithChildren } from "react";
import "./Checkbox.css";

interface Props {
  value: boolean;
  setValue: (value: boolean) => void;
  title: string;
}

export const Checkbox = (props: PropsWithChildren<Props>) => {
  const { value, setValue, children, title } = props;

  return (
    <label className="checkbox" title={title}>
      <input
        type="checkbox"
        className="checkbox-input"
        checked={value}
        onClick={() => setValue(!value)}
        readOnly
      />
      {children}
    </label>
  );
};
