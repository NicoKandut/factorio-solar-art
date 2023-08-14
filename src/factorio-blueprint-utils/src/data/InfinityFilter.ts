export interface InfinityFilter {
  /**
   * Name of the item prototype the filter is set to, string.
   */
  name: string;
  /**
   * Number the filter is set to, Types/ItemCountType.
   */
  count: number;
  /**
   * Mode of the filter. Either "at-least", "at-most", or "exactly".
   */
  mode: "at-least" | "at-most" | "exactly";
  /**
   * Index of the filter, 1-based.
   */
  index: number;
}
