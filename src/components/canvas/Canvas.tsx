import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { calculateEntities } from "../../logic/calculator";
import { Config, FactorioBlueprint } from "../../types/types";
import "./Canvas.css";

type Mode = "edit" | "preview";

const _canvas = document.createElement("canvas");
const _context = _canvas.getContext("2d", { alpha: false });
const _image = new Image();

const workspace = {
  canvas: _canvas,
  context: _context,
  image: _image,
};

if (!workspace.context) {
  throw new Error("Canvas context is not supported");
}

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  config: Config;
}

function Canvas(props: Props) {
  const { file, setFile, config } = props;

  const previewRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<Mode>("edit");

  const [sourceImageSrc, setSourceImageSrc] = useState("");
  const [blueprint, setBlueprint] = useState<FactorioBlueprint | null>(null);

  useLayoutEffect(() => {
    console.log("Hook triggered.");
    const then = performance.now();
    const currentPreview = previewRef.current;
    if (currentPreview && file && workspace.context) {
      // original image
      const fileUrl = URL.createObjectURL(file);
      setSourceImageSrc(fileUrl);

      workspace.image.src = fileUrl;
      workspace.image.onload = () => {
        workspace.canvas.width = workspace.image.width;
        workspace.canvas.height = workspace.image.height;
        workspace.context?.drawImage(workspace.image, 0, 0);
        const imageData = workspace.context?.getImageData(
          0,
          0,
          workspace.image.width,
          workspace.image.height
        );
        if (imageData) {
          requestAnimationFrame(() => {
            const _blueprint = calculateEntities(
              imageData,
              config,
              currentPreview
            );
            setBlueprint(_blueprint);
          });
        }

        const now = performance.now();
        console.log("  - took", now - then, "ms");
      };
    }
  }, [config, file]);

  if (!file) {
    return (
      <div className="canvas-placeholder">
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={() => document.getElementById("file-input")?.click()}>
          Open a file
        </button>
      </div>
    );
  }

  return (
    <div className="canvas">
      <div className="canvas-header">
        <button
          className={`canvas-tab ${mode === "edit" ? "active" : ""}`}
          onClick={() => setMode("edit")}
        >
          <span className="material-icons">create</span> Edit
        </button>
        <button
          className={`canvas-tab ${mode === "preview" ? "active" : ""}`}
          onClick={() => setMode("preview")}
        >
          <span className="material-icons">auto_fix_high</span> Preview
        </button>
      </div>
      <div className="canvas-content">
        <img className="canvas-image" src={sourceImageSrc} alt="Source" />

        <div ref={previewRef} className="canvas-image"></div>
      </div>
      <textarea value={JSON.stringify(blueprint)} readOnly></textarea>
    </div>
  );
}

export default Canvas;
