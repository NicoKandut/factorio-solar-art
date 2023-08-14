import type { ScheduleRecord } from "./ScheduleRecord";

export interface Schedule {
  /**
   * Array of #Schedule Record objects.
   */
  schedule: Array<ScheduleRecord>;
  /**
   * Array of entity numbers of locomotives using this schedule.
   */
  locomotives: Array<number>;
}
