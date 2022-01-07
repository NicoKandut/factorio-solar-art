export interface Config {
  threshold: number;
  transparency: boolean;
  roboports: boolean;
  mode: Mode;
  name: string;
}

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

  control_behavior: any;
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
  | "accumulator";
