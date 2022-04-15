export type EntityType =
  | "substation"
  | "roboport"
  | "solar-panel"
  | "accumulator"
  | "stone-wall"
  | "radar"
  | "se-space-solar-panel-3"
  | "se-space-accumulator-2"
  | "se-pylon-substation"
  | "se-pylon-construction"
  | "se-pylon-construction-radar-roboport"
  | "se-supercharger";

export type TileType = "stone-path" | "refined-concrete";

export interface FactorioColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface FactorioPosition {
  x: number;
  y: number;
}

export interface FactorioEntity {
  entity_number: number;
  name: EntityType;
  position: FactorioPosition;
  control_behavior?: any;
}

export interface FactorioTile {
  name: TileType;
  position: FactorioPosition;
}

export interface FactorioSignal {
  name: string;
  type: "item" | "fluid" | "virtual";
}

export interface FactorioIcon {
  index: number;
  signal: FactorioSignal;
}

export interface FactorioBlueprint {
  blueprint: {
    item: "blueprint";
    label: string;
    label_color?: FactorioColor;
    entities: FactorioEntity[];
    tiles: FactorioTile[];
    icons?: FactorioIcon[];
    schedules?: any;
    version: number;
  };
}

export const sizes: Record<EntityType | TileType, number> = {
  accumulator: 2,
  "solar-panel": 3,
  roboport: 4,
  substation: 2,
  "stone-wall": 1,
  "stone-path": 1,
  "refined-concrete": 1,
  radar: 3,
  "se-space-solar-panel-3": 4,
  "se-space-accumulator-2": 2,
  "se-pylon-substation": 2,
  "se-pylon-construction": 2,
  "se-pylon-construction-radar-roboport": 2,
  "se-supercharger": 4,
};

/**
 * Maps an factorio item to a palette color index
 */
export const paletteIndexOf: Record<EntityType | TileType, number> = {
  "stone-wall": 1,
  accumulator: 2,
  "se-space-accumulator-2": 2,
  "stone-path": 3,
  "refined-concrete": 4,
  roboport: 5,
  "se-pylon-construction": 5,
  "se-pylon-construction-radar-roboport": 5,
  "se-supercharger": 5,
  substation: 6,
  "se-pylon-substation": 6,
  radar: 7,
  "solar-panel": 8,
  "se-space-solar-panel-3": 8,
};

/**
 * Sets the colors associated with each palette index
 * @see paletteIndexOf how to get those indices
 */
export const palette: number[][] = [
  [0, 0, 0, 0],
  [217, 216, 207, 255],
  [120, 122, 120, 255],
  [82, 81, 74, 255],
  [49, 50, 42, 255],
  [214, 206, 132, 255],
  [0, 93, 148, 255],
  [0, 96, 144, 255],
  [24, 32, 32, 255],
];
