import * as factorio from "../factorio-blueprint-utils/src";
import { PngWriter } from "../png/PngWriter";
import { PreviewCollector } from "../png/PreviewCollector";
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
  seNeedsSupercharger,
} from "./sePixelFactory";

/**
 * Creates a blueprint object
 */
export const calculateBlueprints = async (
  data: Uint8ClampedArray,
  size: { width: number; height: number },
  config: Config
) => {
  const then = performance.now();

  resetIdGenerator();

  const blueprints: Array<factorio.WrappedBlueprint> = [];

  const blueprintWidth = Math.ceil(size.width / config.blueprintSize);
  const blueprintHeight = Math.ceil(size.height / config.blueprintSize);

  for (let index = 0; index < blueprintWidth * blueprintHeight; ++index) {
    const x = index % blueprintWidth;
    const y = Math.floor(index / blueprintWidth);
    const from = {
      x: x * config.blueprintSize,
      y: y * config.blueprintSize,
    };
    const to = {
      x: from.x + config.blueprintSize,
      y: from.y + config.blueprintSize,
    };

    blueprints.push({
      blueprint: {
        item: "blueprint",
        label: `Blueprint #${index} (${x}, ${y})`,
        description: `Contains the pixels from (${from.x}, ${from.y}) to (${to.x}, ${to.y})`,
        entities: [],
        tiles: [],
        version: 1,
        ...(config.snapping
          ? {
              "snap-to-grid": {
                x: config.snappingSize,
                y: config.snappingSize,
              },
              "absolute-snapping": true,
            }
          : {}),
      },
      index,
    });
  }

  const tilesPerPixel = config.mods.spaceExploration.enabled
    ? SE_TILES_PER_PIXEL
    : TILES_PER_PIXEL;

  const tileWidth = size.width * tilesPerPixel;
  const tileHeight = size.height * tilesPerPixel;
  const tileOffsetX = -Math.floor(tileWidth / 2);
  const tileOffsetY = -Math.floor(tileHeight / 2);

  const collector = new PreviewCollector(tileWidth, tileHeight);

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
      const blueprint = config.book
        ? blueprints[
            index(
              Math.floor(pixelX / config.blueprintSize),
              Math.floor(pixelY / config.blueprintSize),
              blueprintWidth
            )
          ]
        : blueprints[0];

      const i = index(pixelX, pixelY, size.width, 4);
      const color = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      const type = mapColor(color, config);

      const pixel = config.mods.spaceExploration.enabled
        ? createSePixel(type, tileX, tileY, collector, {
            tiles: config.tiles,
            power: seNeedsPowerPylon(pixelX, pixelY),
            radar: seNeedsRadarPylon(pixelX, pixelY),
            charger: seNeedsSupercharger(pixelX, pixelY),
            offsetX: tileOffsetX,
            offsetY: tileOffsetY,
            tiers: {
              accumulator: config.mods.spaceExploration.accumulatorTier,
              panel: config.mods.spaceExploration.panelTier,
            },
          })
        : createPixel(type, tileX, tileY, collector, {
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

  const writer = new PngWriter();
  writer.writeImage(tileWidth, tileHeight, collector.data);
  const previewUrl = writer.getUrl();

  const now = performance.now();

  console.debug("calculation time: %d ms", now - then);

  return [blueprints, previewUrl] as const;
};
