import { useEffect, useRef, useState } from "react";
import { calculateBlueprint } from "../../logic/calculator";
import { Config } from "../../types/ui";
import { Preview } from "../preview/Preview";
import { encode } from "../../logic/serialization";
import "./Display.css";
import { CopyButton } from "../copybutton/CopyButton";
import { Button } from "../button/Button";
import { FactorioBlueprint } from "../../types/factorio";

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  config: Config;
}

const copyButtonIcons = {
  success: <span className="icon success material-icons">check_circle</span>,
  error: <span className="icon error material-icons">error</span>,
  default: <span className="icon material-icons">content_copy</span>,
};

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

if (!context) {
  throw new Error("Failed to create canvas context");
}

export const Display = (props: Props) => {
  const { file, setFile, config } = props;

  const imageRef = useRef<HTMLImageElement>(null);

  const [imageSrc, setImageSrc] = useState("");
  const [blueprint, setBlueprint] = useState<FactorioBlueprint | null>(null);
  const [json, setJson] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);

      setImageSrc(fileUrl);

      const listener = (event: Event) => {
        const image = event.target as HTMLImageElement;
        const size = { width: image.naturalWidth, height: image.naturalHeight };
        canvas.width = size.width;
        canvas.height = size.height;
        context!.drawImage(image, 0, 0);
        setSize(size);
      };

      const curImage = imageRef.current;
      curImage?.addEventListener("load", listener);

      return () => {
        curImage?.removeEventListener("load", listener);
      };
    }
  }, [config, file]);

  useEffect(() => {
    const curImage = imageRef.current;

    if (curImage && file && size.height && size.width) {
      const data = context!.getImageData(0, 0, size.width, size.height).data;
      calculateBlueprint(data, size, config).then((b) => {
        setBlueprint(b);
      });
    }
  }, [config, file, size]);

  useEffect(() => {
    if (blueprint) {
      new Promise<string>((resolve) => {
        resolve(encode(blueprint));
      }).then(setJson);
    }
  }, [blueprint]);

  return (
    <div className="working-area">
      <span className="area-title">
        <span className="material-icons">create</span> Edit
      </span>
      <span className="area-title">
        <span className="material-icons">auto_fix_high</span> Preview
      </span>

      <div className="source">
        {file ? (
          <img
            ref={imageRef}
            src={imageSrc}
            alt="source"
            className="source-image"
          />
        ) : (
          <div
            className="drop-area"
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
                onClick={() => document.getElementById("file-input")?.click()}
              >
                Upload a picture
              </Button>{" "}
              or drag and drop a picture here
            </span>
          </div>
        )}
      </div>
      <div className="preview">
        <Preview
          entities={blueprint?.blueprint?.entities || []}
          tiles={blueprint?.blueprint.tiles || []}
          width={size.width * 6}
          height={size.height * 6}
        />
      </div>

      <div className="area-title code-title">
        <span className="inline-flex">
          <span className="material-icons">code</span>
          <span>Code</span>
        </span>
        <CopyButton text={json} icons={copyButtonIcons}>
          <span>Copy blueprint</span>
        </CopyButton>
      </div>
      <div className="code">
        <textarea className="code-area" value={json} readOnly />
      </div>
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
    </div>
  );
};
