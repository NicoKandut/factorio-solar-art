import type { ConnectionData } from "./ConnectionData";

export interface ConnectionPoint {
  /**
   * An array of #Connection data object containing all the connections from this point created by red wire.
   */
  red: Array<ConnectionData>;
  /**
   * An array of #Connection data object containing all the connections from this point created by green wire.
   */
  green: Array<ConnectionData>;
}