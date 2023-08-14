import * as factorio from "../factorio-blueprint-utils/src";
import { PreviewCollector } from "../png/PreviewCollector";
import type { EntityType, TileType } from "../types/factorio";
import {
  SE_TILE_SIZE_PYLON,
  SE_TILE_SIZE_SOLAR_PANEL,
  SE_TILE_SIZE_SUPERCHARGER,
  TILES_PER_PIXEL,
  TILE_SIZE_ACCUMULATOR,
  TILE_SIZE_RADAR,
  TILE_SIZE_ROBOPORT,
  TILE_SIZE_SOLAR_PANEL,
  TILE_SIZE_SUBSTATION,
  TILE_SIZE_WALL,
} from "./constants";
import { getIdGenerator } from "./entityIdGenerator";

export type PixelType =
  | "accumulator"
  | "solar-panel"
  | "stone-wall"
  | "transparent";

export type Options = {
  substation: boolean;
  roboport: boolean;
  radar: boolean;
  tiles: boolean;
  offsetX: number;
  offsetY: number;
};

type Pixel = {
  entities: factorio.Entity[];
  tiles: factorio.Tile[];
};

const sizes: Record<EntityType, number> = {
  accumulator: TILE_SIZE_ACCUMULATOR,
  "solar-panel": TILE_SIZE_SOLAR_PANEL,
  roboport: TILE_SIZE_ROBOPORT,
  substation: TILE_SIZE_SUBSTATION,
  "stone-wall": TILE_SIZE_WALL,
  radar: TILE_SIZE_RADAR,
  "se-space-solar-panel": SE_TILE_SIZE_SOLAR_PANEL,
  "se-space-solar-panel-2": SE_TILE_SIZE_SOLAR_PANEL,
  "se-space-solar-panel-3": SE_TILE_SIZE_SOLAR_PANEL,
  "se-space-accumulator": TILE_SIZE_ACCUMULATOR,
  "se-space-accumulator-2": TILE_SIZE_ACCUMULATOR,
  "se-pylon-substation": SE_TILE_SIZE_PYLON,
  "se-pylon-construction": SE_TILE_SIZE_PYLON,
  "se-pylon-construction-radar-roboport": SE_TILE_SIZE_PYLON,
  "se-supercharger": SE_TILE_SIZE_SUPERCHARGER,
};

const entityTypeToTile: Record<Exclude<PixelType, "transparent">, TileType> = {
  accumulator: "stone-path",
  "solar-panel": "refined-concrete",
  "stone-wall": "stone-path",
};

const entityOffset: Record<Exclude<PixelType, "transparent">, number> = {
  accumulator: 0,
  "solar-panel": 0,
  "stone-wall": -1,
};

export const createEmptyPixel = (): Pixel => ({
  entities: [],
  tiles: [],
});

export const EMPTY_PIXEL: Pixel = createEmptyPixel();

// static arrays for gaps that occur when inserting necessary infrastructure
const TILES_SUBSTATION_ON_SOLAR = [
  [0, 2],
  [1, 2],
  [2, 2],
  [2, 1],
  [2, 0],
];
const TILES_ROBOPORT_ON_SOLAR = [
  [0, 0],
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 0],
  [1, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [2, 0],
  [2, 1],
  [3, 0],
  [3, 1],
  [4, 0],
  [4, 1],
  [5, 0],
  [5, 1],
];
const TILES_BOTH_ON_SOLAR = [
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 2],
  [1, 3],
  [1, 4],
  [1, 5],
  [2, 0],
  [2, 1],
  [3, 0],
  [3, 1],
  [4, 0],
  [4, 1],
  [5, 0],
  [5, 1],
];
const TILES_RADAR_ON_ACCUMULATOR = [
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 2],
  [2, 3],
  [2, 4],
  [2, 5],
];

export const createPixel = (
  type: PixelType,
  x: number,
  y: number,
  preview: PreviewCollector,
  options: Options
): Pixel => {
  if (type === "transparent") {
    return EMPTY_PIXEL;
  }

  const pixel = createEmptyPixel();
  const idGenerator = getIdGenerator();
  const size = sizes[type];

  if (options.substation) {
    pixel.entities.push({
      entity_number: idGenerator.next().value,
      name: "substation",
      position: {
        x: options.offsetX + x,
        y: options.offsetY + y,
      },
    });
    preview.writeRect("substation", x, y);
  }

  if (options.roboport) {
    pixel.entities.push({
      entity_number: idGenerator.next().value,
      name: "roboport",
      position: {
        x: options.offsetX + x + 3,
        y: options.offsetY + y + 3,
      },
    });
    preview.writeRect("roboport", x + 2, y + 2);
  } else if (options.radar) {
    pixel.entities.push({
      entity_number: idGenerator.next().value,
      name: "radar",
      position: {
        x: options.offsetX + x + 3,
        y: options.offsetY + y + 3,
      },
    });
    preview.writeRect("radar", x + 3, y + 3);
  }

  if (options.tiles) {
    const tiles =
      type === "solar-panel"
        ? options.substation && options.roboport
          ? TILES_BOTH_ON_SOLAR
          : options.substation
          ? TILES_SUBSTATION_ON_SOLAR
          : options.roboport
          ? TILES_ROBOPORT_ON_SOLAR
          : []
        : options.radar
        ? TILES_RADAR_ON_ACCUMULATOR
        : [];
    tiles.forEach(([tileX, tileY]) => {
      const name = entityTypeToTile[type];
      pixel.tiles.push({
        name,
        position: {
          x: options.offsetX + x + tileX - 1,
          y: options.offsetY + y + tileY - 1,
        },
      });
      preview.writePixel(name, x + tileX, y + tileY);
    });
  }

  for (let yi = 0; yi < TILES_PER_PIXEL; yi += size) {
    for (let xi = 0; xi < TILES_PER_PIXEL; xi += size) {
      if (
        (options.substation &&
          xi < TILE_SIZE_SUBSTATION &&
          yi < TILE_SIZE_SUBSTATION) ||
        (options.roboport &&
          xi + size > TILE_SIZE_SUBSTATION &&
          yi + size > TILE_SIZE_SUBSTATION &&
          xi < TILE_SIZE_SUBSTATION + TILE_SIZE_ROBOPORT &&
          yi < TILE_SIZE_SUBSTATION + TILE_SIZE_ROBOPORT) ||
        (options.radar &&
          xi + size > TILE_SIZE_SUBSTATION + 1 &&
          yi + size > TILE_SIZE_SUBSTATION + 1 &&
          xi < TILE_SIZE_SUBSTATION + 1 + TILE_SIZE_RADAR &&
          yi < TILE_SIZE_SUBSTATION + 1 + TILE_SIZE_RADAR)
      ) {
        continue;
      }

      pixel.entities.push({
        entity_number: idGenerator.next().value,
        name: type,
        position: {
          x: options.offsetX + entityOffset[type] + x + xi,
          y: options.offsetY + entityOffset[type] + y + yi,
        },
      });
      preview.writeRect(type, x + xi, y + yi);
    }
  }

  return pixel;
};
