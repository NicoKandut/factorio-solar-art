export interface Config {
  readonly scale: number;

  threshold: number;
  transparency: boolean;
  roboports: boolean;
  tiles: boolean;
  walls: boolean;

  name: string;
}

export type Size = { width: number; height: number };

export type Mode = "exact" | "sloppy";

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
}

export interface FactorioTile {
  name: string;
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
    label_color: FactorioColor;
    entities: FactorioEntity[];
    tiles: FactorioTile[];
    icons: FactorioIcon[];
    schedules: any;
    version: number;
  };
}

export type EntityType =
  | "substation"
  | "roboport"
  | "solar-panel"
  | "accumulator"
  | "stone-wall";

export type TileType = "stone-path" | "concrete" | "concrete-reinforced";

export type ExtendedEntityType =
  | EntityType
  | TileType
  | "transparent"
  | "ground";

export const entityColors: Record<ExtendedEntityType, string> = {
  accumulator: "rgb(107, 105, 107)",
  "solar-panel": "rgb(24, 32, 33)",
  substation: "rgb(0, 93, 148)",
  roboport: "rgb(214, 206, 132)",
  "stone-path": "rgb(0, 0, 0)",
  concrete: "rgb(59, 61, 58)",
  "concrete-reinforced": "rgb(49, 50, 42)",
  ground: "rgb(140, 105, 58)",
  transparent: "transparent",
  "stone-wall": "rgb(217, 216, 207)",
};
