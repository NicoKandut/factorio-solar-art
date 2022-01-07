import {
  Config,
  EntityType,
  FactorioBlueprint,
  FactorioEntity,
} from "../types/types";

const accumulatorColor = "rgb(107, 105, 107)";
const solarColor = "rgb(24, 32, 33)";
const powerPoleColor = "rgb(0, 93, 148)";
const roboPortColor = "rgb(214, 206, 132)";
const groundColor = "rgb(66, 57, 8)";

const index = (x: number, y: number, width: number, size: number) =>
  (y * width + x) * size;

const mapColor = (
  color: Uint8ClampedArray,
  config: Config
): EntityType | "transparent" =>
  config.transparency && color[3] === 0
    ? "transparent"
    : ((color[0] + color[1] + color[2]) * color[3]) / 255 / 3 / 255 >
      config.threshold
    ? "accumulator"
    : "solar-panel";

const scale = 6;

export function calculateEntities(
  image: ImageData,
  config: Config,
  div: HTMLDivElement
): FactorioBlueprint {
  const then = performance.now();
  let entity_number = 1;
  const result: FactorioBlueprint = {
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

  const scaledWidth = image.width * scale;
  const scaledHeight = image.height * scale;

  const canvas = document.createElement("canvas");

  canvas.width = scaledWidth;
  canvas.height = scaledHeight;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  ctx.fillStyle = groundColor;
  ctx.fillRect(0, 0, scaledWidth, scaledHeight);

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const i = index(x, y, image.width, 4);
      const color = image.data.slice(i, i + 4);
      const type = mapColor(color, config);

      if (type === "transparent") {
        continue;
      }

      const needsPowerPole = (x + 1) % 3 === 0 && (y + 1) % 3 === 0;
      const needsRoboPort = (x + 1) % 9 === 0 && (y + 1) % 9 === 0;

      const bx = (x - image.width / 2) * scale;
      const by = (y - image.height / 2) * scale;
      const sx = x * scale;
      const sy = y * scale;

      if (type === "accumulator") {
        ctx.fillStyle = accumulatorColor;
        ctx.fillRect(sx, sy, 6, 6);

        for (let yi = 0; yi < 3; yi++) {
          for (let xi = 0; xi < 3; xi++) {
            if (needsPowerPole && yi === 0 && xi === 0) {
              continue;
            }

            if (needsRoboPort && yi > 0 && xi > 0) {
              continue;
            }

            result.blueprint.entities.push({
              entity_number: entity_number++,
              name: "accumulator",
              position: { x: bx + xi * 2, y: by + yi * 2 },
            } as FactorioEntity);
          }
        }
      }

      // cant place any solar panels on the robo port pixels
      if (type === "solar-panel" && !needsRoboPort) {
        ctx.fillStyle = solarColor;
        ctx.fillRect(sx, sy, 6, 6);
        for (let yi = 0; yi < 2; yi++) {
          for (let xi = 0; xi < 2; xi++) {
            if (yi === 0 && xi === 0 && needsPowerPole) {
              // dont place a solar panel in the first spot
              ctx.fillStyle = groundColor;
              ctx.fillRect(sx, sy, 3, 3);
              continue;
            }

            result.blueprint.entities.push({
              entity_number: entity_number++,
              name: "solar-panel",
              position: { x: bx + xi * 3, y: by + yi * 3 },
            } as FactorioEntity);
          }
        }
      }

      if (needsPowerPole) {
        result.blueprint.entities.push({
          entity_number: entity_number++,
          name: "substation",
          position: { x: bx, y: by },
        } as FactorioEntity);
        ctx.fillStyle = powerPoleColor;
        ctx.fillRect(sx, sy, 2, 2);
      }

      if (needsRoboPort) {
        result.blueprint.entities.push({
          entity_number: entity_number++,
          name: "roboport",
          position: { x: bx + 2, y: by + 2 },
        } as FactorioEntity);
        ctx.fillStyle = roboPortColor;
        ctx.fillRect(sx, sy, 4, 4);
      }
    }
  }

  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  div.appendChild(canvas);

  const now = performance.now();

  console.log("Elapsed:", now - then + "ms");

  return result;
}
