import { EntityType } from "../types/types";

interface Params {
  needsPowerpole: boolean;
  needsRoboport: boolean;
  idGenerator: Generator<number>;
  pixelIndex: { x: number; y: number };
}

const sizes: Record<EntityType, number> = {
  accumulator: 2,
  "solar-panel": 3,
  roboport: 4,
  substation: 2,
  "stone-wall": 1,
};

export const solar = (params: Params) => {};
