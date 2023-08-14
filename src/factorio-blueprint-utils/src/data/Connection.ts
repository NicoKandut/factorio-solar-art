import type { ConnectionPoint } from "./ConnectionPoint";

export interface Connection {
  /**
   * First connection point. The default for everything that doesn't have multiple connection points.#Connection point object
   */
  1: ConnectionPoint;
  /**
   * Second connection point. For example, the "output" part of an arithmetic combinator.#Connection point object
   */
  2: ConnectionPoint;
}
