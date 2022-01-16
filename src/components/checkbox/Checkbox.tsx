import { PropsWithChildren } from "react";
import "./Checkbox.css";

interface Props {
  value: boolean;
  setValue: (value: boolean) => void;
}

export const Checkbox = (props: PropsWithChildren<Props>) => {
  const { value, setValue } = props;

  return (
    <div>
      <input
        type="checkbox"
        checked={value}
        onChange={() => setValue(!value)}
      />
      {props.children}
    </div>
  );
};
