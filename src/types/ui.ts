export interface Config {
  readonly scale: number;

  threshold: number;
  transparency: boolean;
  roboports: boolean;
  tiles: boolean;
  walls: boolean;

  name: string;
}

export type Theme = "dark" | "light";
