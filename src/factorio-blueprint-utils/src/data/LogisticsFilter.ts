export interface LogisticsFilter {
  /**
   * Name of the item prototype this filter is set to.
   */
  name: string;
  /**
   * Index of the filter, 1-based.
   */
  index: number;
  /**
   * Number the filter is set to, Types/ItemCountType. Is 0 for storage chests.
   */
  count: number;
}
