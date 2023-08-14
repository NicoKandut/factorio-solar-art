import type { WaitCondition } from "./WaitCondition";

export interface ScheduleRecord {
  /**
   * The name of the stop for this schedule record.
   */
  station: string;
  /**
   * Array of #Wait Condition objects.
   */
  wait_conditions: Array<WaitCondition>;
}
