import { useEffect, useState } from "react";

interface Props {
  value: number;
  min?: number;
  max?: number;
  setValue: (v: number) => void;
  className?: string;
}

/**
 * Simple wrapper around the html input element that emulates a number input using a text input.
 * The reason I do this is to offer more intuitive typing on desktop.
 */
export default function NumberInput(props: Props) {
  const { value, setValue, min = 0, max = Infinity, className } = props;
  const [internalValue, setInternalValue] = useState(value.toString());

  useEffect(() => {
    const newValue = value.toString();
    if (newValue !== internalValue) setInternalValue(value.toString());
    // this is intentional
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      type="text"
      className={className}
      value={internalValue}
      onChange={(e) => setInternalValue(e.target.value)}
      onBlur={() => {
        const parsedValue = Number(internalValue);
        if (isNaN(parsedValue) || parsedValue > max || parsedValue < min) {
          setInternalValue(value.toString());
        } else {
          setValue(parsedValue);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          (e.target as HTMLInputElement).blur();
        }
      }}
    />
  );
}
