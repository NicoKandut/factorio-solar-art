import { useEffect } from "react";
import { encode } from "../logic/serialization";
import * as factorio from "../factorio-blueprint-utils";

export const useBlueprintSerializer = (
  blueprint: factorio.Serializable | null | undefined,
  onComplete: (value: string) => void
) => {
  useEffect(() => {
    if (blueprint) {
      new Promise<string>((resolve) => {
        resolve(encode(blueprint));
      }).then(onComplete);
    }
  }, [blueprint, onComplete]);
};
