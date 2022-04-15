import { PreviewCollector } from "../png/PreviewCollector";
import {
  SE_PIXEL_RADIUS_POWER_PYLON,
  SE_PIXEL_RADIUS_SUPERCHARGER,
  SE_PIXEL_RANGE_POWER_PYLON,
  SE_PIXEL_RANGE_RADAR_PYLON,
  SE_PIXEL_RANGE_SUPERCHARGER,
  SE_TILES_PER_PIXEL,
} from "./constants";
import { getIdGenerator } from "./entityIdGenerator";
import { createEmptyPixel, EMPTY_PIXEL, PixelType } from "./pixelFactory";

type Options = {
  tiles: boolean;
  power: boolean;
  radar: boolean;
  charger: boolean;
  offsetX: number;
  offsetY: number;
};

const accumulatorIndices = [
  [0, 0],
  [0, 2],
  [2, 0],
  [2, 2],
];

const tileIndices = [
  [2, 0],
  [2, 1],
  [3, 0],
  [3, 1],
  [0, 2],
  [1, 2],
  [0, 3],
  [1, 3],
];

export const seNeedsPowerPylon = (x: number, y: number) =>
  (x + SE_PIXEL_RADIUS_POWER_PYLON) % SE_PIXEL_RANGE_POWER_PYLON === 0 &&
  (y + SE_PIXEL_RADIUS_POWER_PYLON) % SE_PIXEL_RANGE_POWER_PYLON === 0;

// uses SE_PIXEL_RADIUS_POWER_PYLON for alignment
export const seNeedsRadarPylon = (x: number, y: number) =>
  (x + SE_PIXEL_RANGE_RADAR_PYLON - SE_PIXEL_RADIUS_POWER_PYLON) %
    SE_PIXEL_RANGE_RADAR_PYLON ===
    0 &&
  (y + SE_PIXEL_RANGE_RADAR_PYLON - SE_PIXEL_RADIUS_POWER_PYLON) %
    SE_PIXEL_RANGE_RADAR_PYLON ===
    0;

export const seNeedsSupercharger = (x: number, y: number) =>
  (x + SE_PIXEL_RADIUS_SUPERCHARGER) % SE_PIXEL_RANGE_SUPERCHARGER === 0 &&
  (y + SE_PIXEL_RADIUS_SUPERCHARGER) % SE_PIXEL_RANGE_SUPERCHARGER === 0;

export const createSePixel = (
  type: PixelType,
  x: number,
  y: number,
  preview: PreviewCollector,
  options: Options
) => {
  if (type === "transparent") {
    return EMPTY_PIXEL;
  }

  const pixel = createEmptyPixel();
  const idGenerator = getIdGenerator();

  if (options.charger) {
    pixel.entities.push({
      entity_number: idGenerator.next().value,
      name: "se-supercharger",
      position: {
        x: options.offsetX + x + 1,
        y: options.offsetY + y + 1,
      },
    });
    preview.writeRect("se-supercharger", x, y);
    return pixel;
  }

  if (options.power) {
    pixel.entities.push({
      entity_number: idGenerator.next().value,
      name: "se-pylon-substation",
      position: {
        x: options.offsetX + x,
        y: options.offsetY + y,
      },
    });
    preview.writeRect("se-pylon-substation", x, y);

    if (options.tiles) {
      const tileType =
        type === "solar-panel" ? "refined-concrete" : "stone-path";

      tileIndices.forEach(([xi, yi]) => {
        pixel.tiles.push({
          name: tileType,
          position: {
            x: options.offsetX + x + xi - 1,
            y: options.offsetY + y + yi - 1,
          },
        });
        preview.writePixel(tileType, x + xi, y + yi);
      });
    } else {
      pixel.entities.push({
        entity_number: idGenerator.next().value,
        name: "se-space-accumulator-2",
        position: {
          x: options.offsetX + x + 2,
          y: options.offsetY + y,
        },
      });
      pixel.entities.push({
        entity_number: idGenerator.next().value,
        name: "se-space-accumulator-2",
        position: {
          x: options.offsetX + x,
          y: options.offsetY + y + 2,
        },
      });
      preview.writeRect("se-space-accumulator-2", x + 2, y);
      preview.writeRect("se-space-accumulator-2", x, y + 2);
    }

    if (options.radar) {
      pixel.entities.push({
        entity_number: idGenerator.next().value,
        name: "se-pylon-construction-radar-roboport",
        position: {
          x: options.offsetX + x + 2,
          y: options.offsetY + y + 2,
        },
      });
      preview.writeRect("se-pylon-construction-radar-roboport", x + 2, y + 2);
    } else {
      pixel.entities.push({
        entity_number: idGenerator.next().value,
        name: "se-pylon-construction",
        position: {
          x: options.offsetX + x + 2,
          y: options.offsetY + y + 2,
        },
      });
      preview.writeRect("se-pylon-construction", x + 2, y + 2);
    }

    return pixel;
  }

  switch (type) {
    case "accumulator":
      accumulatorIndices.forEach(([xi, yi]) => {
        pixel.entities.push({
          entity_number: idGenerator.next().value,
          name: "se-space-accumulator-2",
          position: {
            x: options.offsetX + x + xi,
            y: options.offsetY + y + yi,
          },
        });
        preview.writeRect("se-space-accumulator-2", x + xi, y + yi);
      });
      break;
    case "solar-panel":
      pixel.entities.push({
        entity_number: idGenerator.next().value,
        name: "se-space-solar-panel-3",
        position: {
          x: options.offsetX + x + 1,
          y: options.offsetY + y + 1,
        },
      });
      preview.writeRect("se-space-solar-panel-3", x, y);
      break;
    case "stone-wall":
      for (let iy = 0; iy < SE_TILES_PER_PIXEL; iy++) {
        for (let ix = 0; ix < SE_TILES_PER_PIXEL; ix++) {
          pixel.entities.push({
            entity_number: idGenerator.next().value,
            name: type,
            position: {
              x: options.offsetX + x + ix - 1,
              y: options.offsetY + y + iy - 1,
            },
          });
          preview.writePixel(type, x + ix, y + iy);
        }
      }
      break;
    default:
    // never happens
  }

  return pixel;
};
