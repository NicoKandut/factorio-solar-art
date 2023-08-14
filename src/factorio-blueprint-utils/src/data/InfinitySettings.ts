import type { InfinityFilter } from "./InfinityFilter";

export interface InfinitySettings {
  /**
   * Boolean. Whether the "remove unfiltered items" checkbox is checked.
   */
  remove_unfiltered_items: boolean;
  /**
   * Filters of the infinity container, optional. Array of #Infinity filter objects.
   */
  filters: Array<InfinityFilter>;
}
