import { useRef } from "react";
import { Button } from "../button/Button";
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
      <span>
        <Button
          className="upload-button"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload a picture
        </Button>{" "}
        or drag and drop a picture here
      </span>
      <HiddenFileInput
        inputRef={fileInputRef}
        accept="image/*"
        onChange={setFile}
      />
    </div>
  );
};
