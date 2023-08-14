import type { WrappedBlueprint } from "./Blueprint";
import type { Color } from "./Color";

export interface WrappedBlueprintBook {
  blueprint_book: BlueprintBook;
}

/**
 * @see https://wiki.factorio.com/Blueprint_string_format#Blueprint_book_object
 */
 export interface BlueprintBook {
  /**
   * String, the name of the item that was saved ("blueprint-book" in vanilla).
   */
  item: string;
  /**
   * String, the name of the blueprint set by the user.
   */
  label: string;
  /**
   * The color of the label of this blueprint. Optional. #Color object.
   */
  label_color?: Color;
  /**
   * The actual content of the blueprint book, array of objects containing an "index" key and 0-based value and a "blueprint" key with a #Blueprint object as the value.
   */
  blueprints: Array<WrappedBlueprint>;
  /**
   * Index of the currently selected blueprint, 0-based.
   */
  active_index: number;
  /**
   * The map version of the map the blueprint was created in, see Version string format.
   */
  version: number;
}