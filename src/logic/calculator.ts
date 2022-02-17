import { FactorioBlueprint } from "../types/factorio";
import { Config } from "../types/ui";
import {
  index,
  mapColor,
  needsRadar,
  needsRoboPort,
  needsSubstation,
} from "./calculationUtils";
import { SE_TILES_PER_PIXEL, TILES_PER_PIXEL } from "./constants";
import { resetIdGenerator } from "./entityIdGenerator";
import { createPixel } from "./pixelFactory";
import {
  createSePixel,
  seNeedsPowerPylon,
  seNeedsRadarPylon,
} from "./sePixelFactory";

/**
 * Creates a blueprint object
 */
export const calculateBlueprint = async (
  data: Uint8ClampedArray,
  size: { width: number; height: number },
  config: Config
) => {
  const then = performance.now();

  resetIdGenerator();

  const blueprint: FactorioBlueprint = {
    blueprint: {
      item: "blueprint", // name overwritten outside of calculation to prevent unnecessary recalculation
      label: "",
      entities: [],
      tiles: [],
      version: 1,
    },
  };

  const tilesPerPixel = config.mods.spaceExploration
    ? SE_TILES_PER_PIXEL
    : TILES_PER_PIXEL;

  const tileWidth = size.width * tilesPerPixel;
  const tileHeight = size.height * tilesPerPixel;
  const tileOffsetX = -Math.floor(tileWidth / 2);
  const tileOffsetY = -Math.floor(tileHeight / 2);

  for (
    let pixelY = 0, tileY = 0;
    pixelY < size.height;
    pixelY++, tileY += tilesPerPixel
  ) {
    for (
      let pixelX = 0, tileX = 0;
      pixelX < size.width;
      pixelX++, tileX += tilesPerPixel
    ) {
      const i = index(pixelX, pixelY, size.width, 4);
      const color = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      const type = mapColor(color, config);

      const pixel = config.mods.spaceExploration
        ? createSePixel(type, tileX, tileY, {
            tiles: config.tiles,
            power: seNeedsPowerPylon(pixelX, pixelY),
            radar: seNeedsRadarPylon(pixelX, pixelY),
            offsetX: tileOffsetX,
            offsetY: tileOffsetY,
          })
        : createPixel(type, tileX, tileY, {
            tiles: config.tiles,
            substation: needsSubstation(pixelX, pixelY),
            roboport: config.roboports && needsRoboPort(pixelX, pixelY),
            radar: config.radars && needsRadar(pixelX, pixelY),
            offsetX: tileOffsetX,
            offsetY: tileOffsetY,
          });

      blueprint.blueprint.entities.push(...pixel.entities);
      blueprint.blueprint.tiles.push(...pixel.tiles);
    }
  }

  const now = performance.now();

  console.log(`Calculating blueprint: ${Math.round(now - then)} ms`);

  return blueprint;
};
