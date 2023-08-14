import type { SignalID } from "./SignalID";

export interface Icon {
  /**
   * Index of the icon, 1-based.
   */
  index: number;
  /**
   * The icon that is displayed, #SignalID object.
   */
  signal: SignalID;
}