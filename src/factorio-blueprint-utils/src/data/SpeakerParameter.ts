export interface SpeakerParameter {
  /**
   * Types/double. Volume of the speaker.
   */
  playback_volume: number;
  /**
   * Boolean, whether global playback is enabled.
   */
  playback_globally: boolean;
  /**
   * Boolean, whether polyphony is allowed.
   */
  allow_polyphony: boolean;
}
