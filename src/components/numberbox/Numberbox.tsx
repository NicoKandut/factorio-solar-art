import "./Numberbox.css";
import NumberInput from "./NumberInput";

interface Props {
  value: number;
  setValue: (value: number) => void;
  hint: string;
  label: string;
}

export const Numberbox = (props: Props) => {
  const { value, setValue, label, hint } = props;

  return (
    <label className="textbox" title={hint}>
      {label}
      <NumberInput
        className="textbox-input"
        value={value}
        setValue={setValue}
      />
    </label>
  );
};
