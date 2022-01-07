import React, { PropsWithChildren } from "react";

interface Props {
  value: string;
  options: string[];
  setValue: (value: string) => void;
}

function Select(props: PropsWithChildren<Props>) {
  const { options, value, setValue, children } = props;

  return (
    <div>
      <select value={value} onChange={(e) => setValue(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {children}
    </div>
  );
}

export default Select;
