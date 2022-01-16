import { PropsWithChildren } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

export const Textbox = (props: PropsWithChildren<Props>) => {
  const { value, setValue, children } = props;

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {children}
    </div>
  );
};
