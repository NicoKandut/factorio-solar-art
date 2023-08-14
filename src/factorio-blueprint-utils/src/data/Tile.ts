import type { Position } from "./Position";

export interface Tile {
  /**
   * Prototype name of the tile (e.g. "concrete")
   */
  name: string;
  /**
   * #Position object, position of the entity within the blueprint.
   */
  position: Position;
}
