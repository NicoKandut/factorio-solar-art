import { FactorioBlueprint } from "../types/factorio";
import { Config } from "../types/ui";
import {
  index,
  mapColor,
  needsRadar,
  needsRoboPort,
  needsSubstation,
} from "./calculationUtils";
import { TILES_PER_PIXEL } from "./constants";
import { resetIdGenerator } from "./entityIdGenerator";
import { createPixel, Options } from "./pixelFactory";

/**
 * 2d to 1d index maping
 */

/**
 * maps a color to a type
 */

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
  const tileWidth = size.width * TILES_PER_PIXEL;
  const tileHeight = size.height * TILES_PER_PIXEL;
  const halfWidth = Math.floor(tileWidth / 2);
  const halfHeight = Math.floor(tileHeight / 2);

  for (
    let pixelY = 0, tileY = 0;
    pixelY < size.height;
    pixelY++, tileY += TILES_PER_PIXEL
  ) {
    for (
      let pixelX = 0, tileX = 0;
      pixelX < size.width;
      pixelX++, tileX += TILES_PER_PIXEL
    ) {
      const i = index(pixelX, pixelY, size.width, 4);
      const color = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      const type = mapColor(color, config);
      const options: Options = {
        tiles: config.tiles,
        substation: needsSubstation(pixelX, pixelY),
        roboport: config.roboports && needsRoboPort(pixelX, pixelY),
        radar: config.radars && needsRadar(pixelX, pixelY),
        offsetX: -halfWidth,
        offsetY: -halfHeight,
      };
      const pixel = createPixel(type, tileX, tileY, options);

      if (options.roboport && options.radar) {
        console.warn("Cannot put roboport and radar on same pixel.");
      }
      blueprint.blueprint.entities.push(...pixel.entities);
      blueprint.blueprint.tiles.push(...pixel.tiles);
    }
  }

  const now = performance.now();

  console.log(`Calculating blueprint: ${Math.round(now - then)} ms`);

  return blueprint;
};
