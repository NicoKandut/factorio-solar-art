import { Config } from "../types/ui";
import {
  PIXEL_RADIUS_RADAR,
  PIXEL_RADIUS_ROBOPORT,
  PIXEL_RADIUS_SUBSTATION,
  PIXEL_RANGE_RADAR,
  PIXEL_RANGE_ROBOPORT,
  PIXEL_RANGE_SUBSTATION,
} from "./constants";
import { PixelType } from "./pixelFactory";

export const needsSubstation = (x: number, y: number) =>
  (x + PIXEL_RADIUS_SUBSTATION) % PIXEL_RANGE_SUBSTATION === 0 &&
  (y + PIXEL_RADIUS_SUBSTATION) % PIXEL_RANGE_SUBSTATION === 0;
export const needsRoboPort = (x: number, y: number) =>
  (x + PIXEL_RADIUS_ROBOPORT) % PIXEL_RANGE_ROBOPORT === 0 &&
  (y + PIXEL_RADIUS_ROBOPORT) % PIXEL_RANGE_ROBOPORT === 0;
export const needsRadar = (x: number, y: number) =>
  (x + PIXEL_RADIUS_RADAR) % PIXEL_RANGE_RADAR === 0 &&
  (y + PIXEL_RADIUS_RADAR) % PIXEL_RANGE_RADAR === 0;

export const index = (x: number, y: number, width: number, size: number) =>
  (y * width + x) * size;

export const mapColor = (color: number[], config: Config): PixelType => {
  const isTransparent = config.transparency && color[3] === 0;
  const red = color[0];
  const green = color[1];
  const blue = color[2];
  const brightness = (0.2126 * red + 0.7152 * green + 0.0772 * blue) / 255;

  return isTransparent
    ? "transparent"
    : config.walls && brightness > 0.9
    ? "stone-wall"
    : brightness > config.threshold
    ? "accumulator"
    : "solar-panel";
};
