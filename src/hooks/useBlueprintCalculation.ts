import { RefObject, useEffect } from "react";
import { calculateBlueprint } from "../logic/calculator";
import { sharedCanvasContext } from "../logic/sharedCanvasContext";
import { Config, FactorioBlueprint, Size } from "../types/types";

export const useBlueprintCalculation = (
  imageRef: RefObject<HTMLImageElement>,
  size: Size,
  config: Config,
  setBlueprint: (blueprint: FactorioBlueprint) => void
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

      calculateBlueprint(data, size, config).then((b) => {
        setBlueprint(b);
      });
    }
  }, [config, imageRef, setBlueprint, size]);
};
