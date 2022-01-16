import {
  Config,
  EntityType,
  FactorioBlueprint,
  FactorioEntity,
} from "../types/types";

const scale = 6;

/**
 * 2d to 1d index maping
 */
const index = (x: number, y: number, width: number, size: number) =>
  (y * width + x) * size;

/**
 * maps a color to a type
 */
const mapColor = (
  color: number[],
  config: Config
): EntityType | "transparent" => {
  const isTransparent = config.transparency && color[3] === 0;
  const brightness =
    ((color[0] + color[1] + color[2]) * color[3]) / 255 / 255 / 3;

  return isTransparent
    ? "transparent"
    : brightness > config.threshold
    ? "accumulator"
    : "solar-panel";
};

/**
 * Creates a blueprint object
 */
export const calculateBlueprint = async (
  data: Uint8ClampedArray,
  size: { width: number; height: number },
  config: Config
) => {
  const then = performance.now();

  let entity_number = 1;

  const blueprint: FactorioBlueprint = {
    blueprint: {
      item: "blueprint",
      label: config.name,
      entities: [],
      tiles: [],
      label_color: { r: 0, g: 0, b: 0, a: 0 },
      icons: [],
      schedules: [],
      version: 1,
    },
  };

  const scaledWidth = size.width * scale;
  const scaledHeight = size.height * scale;
  const halfWidth = Math.floor(scaledWidth / 2);
  const halfHeight = Math.floor(scaledHeight / 2);

  for (
    let fileY = 0, scaledY = 0;
    fileY < size.height;
    fileY++, scaledY += scale
  ) {
    for (
      let fileX = 0, scaledX = 0;
      fileX < size.width;
      fileX++, scaledX += scale
    ) {
      const i = index(fileX, fileY, size.width, 4);
      const color = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      const type = mapColor(color, config);

      if (type === "transparent") {
        continue;
      }

      const needsPowerPole = (fileX + 2) % 3 === 0 && (fileY + 2) % 3 === 0;
      const needsRoboPort = (fileX + 1) % 9 === 0 && (fileY + 1) % 9 === 0;

      const entityX = scaledX - halfWidth;
      const entityY = scaledY - halfHeight;

      if (type === "accumulator") {
        for (let yi = 0; yi < 3; yi++) {
          for (let xi = 0; xi < 3; xi++) {
            if (needsPowerPole && yi === 0 && xi === 0) {
              continue;
            }

            if (needsRoboPort && yi > 0 && xi > 0) {
              continue;
            }

            blueprint.blueprint.entities.push({
              entity_number: entity_number++,
              name: "accumulator",
              position: { x: entityX + xi * 2, y: entityY + yi * 2 },
            } as FactorioEntity);
          }
        }
      }

      // cant place any solar panels on the robo port pixels
      if (type === "solar-panel" && !needsRoboPort) {
        for (let yi = 0; yi < 2; yi++) {
          for (let xi = 0; xi < 2; xi++) {
            if (yi === 0 && xi === 0 && needsPowerPole) {
              continue;
            }

            blueprint.blueprint.entities.push({
              entity_number: entity_number++,
              name: "solar-panel",
              position: { x: entityX + xi * 3, y: entityY + yi * 3 },
            } as FactorioEntity);
          }
        }
      }

      if (needsPowerPole) {
        blueprint.blueprint.entities.push({
          entity_number: entity_number++,
          name: "substation",
          position: { x: entityX, y: entityY },
        } as FactorioEntity);
      }

      if (needsRoboPort) {
        blueprint.blueprint.entities.push({
          entity_number: entity_number++,
          name: "roboport",
          position: { x: entityX + 2, y: entityY + 2 },
        } as FactorioEntity);
      }
    }
  }

  const now = performance.now();

  console.log("Calculating blueprint:", now - then + "ms");

  return blueprint;
};
