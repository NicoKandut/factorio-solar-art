import { deflate, inflate } from "pako";
import { FactorioBlueprint } from "../types/types";

const VERSION = "0";
const UINT_CHUNK_SIZE = 65536;

export const uint8ToString = (array: Uint8Array) => {
  var c = [];
  for (var i = 0; i < array.length; i += UINT_CHUNK_SIZE) {
    c.push(
      String.fromCharCode.apply(
        null,
        array.subarray(i, i + UINT_CHUNK_SIZE) as unknown as number[]
      )
    );
  }
  return c.join("");
};

/**
 * Encodes a blueprint object to an importable string.
 */
export const encode = (blueprint: FactorioBlueprint) => {
  const jsonString = JSON.stringify(blueprint);
  const compressed = deflate(jsonString);
  const str = uint8ToString(compressed);
  const base64 = btoa(str);

  return VERSION + base64;
};

/**
 * Parses a string into a blueprint object.
 */
export const decode = (bluebrintString: string) => {
  const base64 = bluebrintString.substring(1);
  const charArray = atob(base64);
  const compressed = Uint8Array.from(charArray, (c) => c.charCodeAt(0));
  const jsonString = inflate(compressed, { to: "string" });

  return JSON.parse(jsonString) as FactorioBlueprint;
};
