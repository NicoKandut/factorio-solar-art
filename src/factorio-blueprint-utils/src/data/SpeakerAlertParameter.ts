import type { SignalID } from "./SignalID";

export interface SpeakerAlertParameter {
  /**
   * Boolean, whether an alert is shown.
   */
  show_alert: boolean;

  /**
   * Boolean, whether an alert icon is shown on the map.
   */
  show_on_map: boolean;

  /**
   * The icon that is displayed with the alert, #SignalID object.
   */
  icon_signal_id: SignalID;
  /**
   * String, message of the alert.
   */
  alert_message: string;
}
