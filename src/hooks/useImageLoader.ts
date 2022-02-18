import { RefObject, useEffect } from "react";
import {
  sharedCanvas,
  sharedCanvasContext,
} from "../logic/sharedCanvasContext";
import { Size } from "../types/types";

/**
 * This hook uses an image to render a file blob and calls two callbacks with:
 * 1. a data url of the rendered image
 * 2. the size of the rendered image
 */
export const useImageLoader = (
  imageRef: RefObject<HTMLImageElement>,
  file: File | null | undefined,
  scale: number,
  setSrc: (src: string) => void,
  setSize: (size: Size) => void
) => {
  useEffect(() => {
    const curImage = imageRef.current;

    if (file && curImage) {
      const fileUrl = URL.createObjectURL(file);

      setSrc(fileUrl);

      const listener = (event: Event) => {
        const image = event.target as HTMLImageElement;
        const width = image.naturalWidth * scale;
        const height = image.naturalHeight * scale;

        sharedCanvas.width = width;
        sharedCanvas.height = height;
        sharedCanvasContext.drawImage(image, 0, 0, width, height);

        setSize({ width, height });
      };

      curImage.addEventListener("load", listener);

      return () => curImage.removeEventListener("load", listener);
    } else {
      setSrc("");
      setSize({ width: 0, height: 0 });
    }
  }, [file, imageRef, scale, setSize, setSrc]);
};
