import type { RefObject } from "react";
import "./HiddenFileInput.css";

interface Props {
  inputRef: RefObject<HTMLInputElement>;
  onChange: (file: File | null) => void;
  accept: string;
}

export const HiddenFileInput = (props: Props) => {
  const { accept, inputRef, onChange } = props;

  return (
    <input
      ref={inputRef}
      className="hidden-file-input"
      type="file"
      accept={accept}
      onChange={(e) => onChange(e.target.files?.[0] || null)}
    />
  );
};
