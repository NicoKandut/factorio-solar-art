import { RefObject, useEffect } from "react";
import { calculateBlueprints } from "../logic/calculator";
import { sharedCanvasContext } from "../logic/sharedCanvasContext";
import * as factorio from "../factorio-blueprint-utils/src";
import { Size } from "../types/types";
import { Config } from "../types/ui";

export const useBlueprintCalculation = (
  imageRef: RefObject<HTMLImageElement>,
  size: Size,
  config: Config,
  setBlueprints: (blueprints: Array<factorio.WrappedBlueprint>) => void,
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

      if(config.book) {
        
      }

      calculateBlueprints(data, size, config).then(([b, preview]) => {
        setBlueprints(b);
        setPreviewSrc(preview);
      });
    }
  }, [config, imageRef, setBlueprints, setPreviewSrc, size]);
};
