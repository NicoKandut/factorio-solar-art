import { RefObject, useEffect } from "react";
import { calculateBlueprint } from "../logic/calculator";
import { sharedCanvasContext } from "../logic/sharedCanvasContext";
import { FactorioBlueprint } from "../types/factorio";
import { Size } from "../types/types";
import { Config } from "../types/ui";

export const useBlueprintCalculation = (
  imageRef: RefObject<HTMLImageElement>,
  size: Size,
  config: Config,
  setBlueprint: (blueprint: FactorioBlueprint) => void,
  setPreviewSrc: (url: string) => void
) => {
  useEffect(() => {
    const curImage = imageRef.current;

    if (curImage && size.height > 0 && size.width > 0) {
      const data = sharedCanvasContext.getImageData(
        0,
        0,
        size.width,
        size.height
      ).data;

      calculateBlueprint(data, size, config).then(([b, preview]) => {
        setBlueprint(b);
        setPreviewSrc(preview);
      });
    }
  }, [config, imageRef, setBlueprint, setPreviewSrc, size]);
};
