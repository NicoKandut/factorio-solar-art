import type { Color } from "./Color";
import type { Connection } from "./Connection";
import type { InfinitySettings } from "./InfinitySettings";
import type { Inventory } from "./Inventory";
import type { ItemFilter } from "./ItemFilter";
import type { ItemRequest } from "./ItemRequest";
import type { LogisticsFilter } from "./LogisticsFilter";
import type { Position } from "./Position";
import type { SpeakerAlertParameter } from "./SpeakerAlertParameter";
import type { SpeakerParameter } from "./SpeakerParameter";

export interface Entity {
  /**
   * Index of the entity, 1-based.
   */
  entity_number: number;
  /**
   * Prototype name of the entity (e.g. "offshore-pump").
   */
  name: string;
  /**
   * #Position object, position of the entity within the blueprint.
   */
  position: Position;
  /**
   * Direction of the entity, uint (optional).
   */
  direction?: number;
  /**
   * Orientation of cargo wagon or locomotive, value 0 to 1 (optional).
   */
  orientation?: number;
  /**
   * Circuit connection, object with keys starting from 1, values are #Connection objects (optional).
   */
  connections?: Connection;
  /**
   * Copper wire connections, array of entity_numbers (optional).
   */
  neighbours?: Array<number>;
  /**
   * undocumented :(
   */
  control_behavior?: any;
  /**
   * Item requests by this entity, this is what defines the item-request-proxy when the blueprint is placed, optional. #Item request object
   */
  items?: ItemRequest;

  /**
   * 	Name of the recipe prototype this assembling machine is set to, optional, string.
   */
  recipe?: string;
  /**
   * 	Used by Prototype/Container, optional. The index of the first inaccessible item slot due to limiting with the red "bar". 0-based Types/ItemStackIndex.
   */
  bar?: number;
  /**
   * 	Cargo wagon inventory configuration, optional. #Inventory object
   */
  inventory?: Inventory;
  /**
   * 	Used by Prototype/InfinityContainer, optional. #Infinity settings object
   */
  infinity_settings?: InfinitySettings;
  /**
   * 	Type of the underground belt or loader, optional. Either "input" or "output".
   */
  type?: string;
  /**
   * 	Input priority of the splitter, optional. Either "right" or "left", "none" is omitted.
   */
  input_priority?: string;
  /**
   * 	Output priority of the splitter, optional. Either "right" or "left", "none" is omitted.
   */
  output_priority?: string;
  /**
   * 	Filter of the splitter, optional. Name of the item prototype the filter is set to, string.
   */
  filter?: string;
  /**
   * 	Filters of the filter inserter or loader, optional. Array of #Item filter objects.
   */
  filters?: Array<ItemFilter>;
  /**
   * 	Filter mode of the filter inserter, optional. Either "whitelist" or "blacklist".
   */
  filter_mode?: string;
  /**
   * 	The stack size the inserter is set to, optional. Types/uint8.
   */
  override_stack_size?: number;
  /**
   * 	The drop position the inserter is set to, optional. #Position object.
   */
  drop_position?: Position;
  /**
   * 	The pickup position the inserter is set to, optional. #Position object.
   */
  pickup_position?: Position;
  /**
   * 	Used by Prototype/LogisticContainer, optional. #Logistic filter object.
   */
  request_filters?: LogisticsFilter;
  /**
   * 	Boolean. Whether this requester chest can request from buffer chests.
   */
  request_from_buffers?: boolean;
  /**
   * 	Used by Programmable speaker, optional. #Speaker parameter object.
   */
  parameters?: SpeakerParameter;
  /**
   * 	Used by Programmable speaker, optional. #Speaker alert parameter object
   */
  alert_parameters?: SpeakerAlertParameter;
  /**
   * 	Used by the rocket silo, optional. Boolean, whether auto launch is enabled.
   */
  auto_launch?: boolean;
  /**
   * 	Used by Prototype/SimpleEntityWithForce or Prototype/SimpleEntityWithOwner, optional. Types/GraphicsVariation
   */
  variation?: any;
  /**
   * 	Color of the Prototype/SimpleEntityWithForce, Prototype/SimpleEntityWithOwner, or train station, optional. #Color object.
   */
  color?: Color;
  /**
   * The name of the train station, optional.
   */
  station?: string;
}