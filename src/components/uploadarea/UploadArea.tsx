import { useRef } from "react";
import { HiddenFileInput } from "../hiddenfileinput/HiddenFileInput";
import "./UploadArea.css";

interface Props {
  setFile: (file: File | null) => void;
}

export const UploadArea = (props: Props) => {
  const { setFile } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="upload-area"
      onClick={() => fileInputRef.current?.click()}
      onDrop={(event) => {
        event.preventDefault();
        if (event.dataTransfer.files[0]) {
          setFile(event.dataTransfer.files[0]);
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
    >
      <span className="material-icons upload-icon">upload</span>
      <span className="upload-hint">
        Click here to upload a picture or drag and drop a picture here
      </span>
      <HiddenFileInput
        inputRef={fileInputRef}
        accept="image/*"
        onChange={setFile}
      />
    </div>
  );
};
