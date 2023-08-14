import type { Color } from "./Color";
import type { Entity } from "./Entity";
import type { Icon } from "./Icon";
import type { Position } from "./Position";
import type { Schedule } from "./Schedule";
import type { Tile } from "./Tile";

export interface WrappedBlueprint {
  blueprint: Blueprint;
  index?: number;
}

export interface IndexedBlueprint extends WrappedBlueprint {
  index?: number;
}

export interface Blueprint {
  /**
   * String, the name of the item that was saved ("blueprint" in vanilla).
   */
  item: string;
  /**
   * String, the name of the blueprint set by the user.
   */
  label: string;

  description?: string;
  /**
   * The color of the label of this blueprint. Optional. #Color object.
   */
  label_color?: Color;
  /**
   * The actual content of the blueprint, array of #Entity objects.
   */
  entities: Array<Entity>;
  /**
   * The tiles included in the blueprint, array of #Tile objects.
   */
  tiles: Array<Tile>;
  /**
   * The icons of the blueprint set by the user, array of #Icon objects.
   */
  icons?: Array<Icon>;
  /**
   * The schedules for trains in this blueprint, array of #Schedule objects.
   */
  schedules?: Array<Schedule>;
  /**
   * The map version of the map the blueprint was created in.
   */
  version: number;

  "snap-to-grid"?: Position;

  "absolute-snapping"?: boolean;
}
