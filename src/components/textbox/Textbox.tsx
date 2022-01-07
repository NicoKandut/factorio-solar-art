import React, { PropsWithChildren } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
}

function Textbox(props: PropsWithChildren<Props>) {
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
}

export default Textbox;
