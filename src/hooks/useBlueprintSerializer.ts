import { useEffect } from "react";
import { encode } from "../logic/serialization";
import { FactorioBlueprint } from "../types/factorio";

export const useBlueprintSerializer = (
  blueprint: FactorioBlueprint | null | undefined,
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
