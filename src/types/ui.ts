export type PanelTier = 1 | 2 | 3;
export type AccumulatorTier = 1 | 2 | 3;

export interface Config {
  scale: number;
  threshold: number;
  transparency: boolean;
  roboports: boolean;
  tiles: boolean;
  walls: boolean;
  radars: boolean;
  book: boolean;
  blueprintSize: number;
  snapping: boolean;
  snappingSize: number;
  mods: {
    spaceExploration: {
      enabled: boolean;
      panelTier: PanelTier;
      accumulatorTier: AccumulatorTier;
    };
  };
}
