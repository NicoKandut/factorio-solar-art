import type { ItemFilter } from "./ItemFilter";

export interface Inventory {
  /**
   * Array of #Item filter objects.
   */
  filters: Array<ItemFilter>;
  /**
   * The index of the first inaccessible item slot due to limiting with the red "bar". 0-based, optional. Types/ItemStackIndex.
   */
  bar: number;
}