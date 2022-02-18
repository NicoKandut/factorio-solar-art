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

export type ExtendedEntityType =
  | EntityType
  | TileType
  | "transparent"
  | "ground";

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

export const entityColors: Record<ExtendedEntityType, string> = {
  accumulator: "#787A78",
  "solar-panel": "#182020",
  substation: "rgb(0, 93, 148)",
  roboport: "rgb(214, 206, 132)",
  "stone-path": "#52514A",
  "refined-concrete": "rgb(49, 50, 42)",
  ground: "rgb(140, 105, 58)",
  transparent: "transparent",
  "stone-wall": "rgb(217, 216, 207)",
  radar: "#006090",
  "se-space-solar-panel-3": "#182020",
  "se-space-accumulator-2": "#787A78",
  "se-pylon-substation": "rgb(0, 93, 148)",
  "se-pylon-construction": "rgb(214, 206, 132)",
  "se-pylon-construction-radar-roboport": "rgb(214, 206, 132)",
  "se-supercharger": "rgb(214, 206, 132)",
};
