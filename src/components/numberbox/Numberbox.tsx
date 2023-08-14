import "./Numberbox.css";
import NumberInput from "./NumberInput";

interface Props {
  value: number;
  setValue: (value: number) => void;
  hint: string;
  label: string;
  disabled?: boolean
}

export const Numberbox = (props: Props) => {
  const { value, setValue, label, hint, disabled } = props;

  return (
    <label className="textbox" title={hint}>
      {label}
      <NumberInput
        className="numberbox-input"
        value={value}
        setValue={setValue}
        disabled={disabled}
      />
    </label>
  );
};
