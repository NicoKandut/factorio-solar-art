import { useMemo, useEffect, useState } from "react";
import {
  entityColors,
  EntityType,
  FactorioEntity,
  FactorioPosition,
  FactorioTile,
  TileType,
} from "../types/factorio";

const canvasOffset: Record<EntityType | TileType, number> = {
  roboport: -1,
  "stone-wall": 1,
  "refined-concrete": 1,
  "stone-path": 1,
  substation: 0,
  "solar-panel": 0,
  accumulator: 0,
  radar: 0,
  concrete: 1,
};

export const useCachedEntityCanvas = (
  entities: FactorioEntity[] | FactorioTile[],
  canvas: HTMLCanvasElement | null,
  type: EntityType | TileType,
  size: number,
  offset: { x: number; y: number }
) => {
  const [loading, setLoading] = useState(false);
  const filteredEntities = useMemo(() => {
    return (entities as { name: string; position: FactorioPosition }[]).filter(
      (e) => e.name === type
    );
  }, [entities, type]);

  const context = useMemo(() => {
    return canvas ? canvas.getContext("2d") : null;
  }, [canvas]);

  const width = canvas?.width ?? 0;
  const height = canvas?.height ?? 0;

  useEffect(() => {
    if (context && filteredEntities) {
      setLoading(true);
      new Promise((resolve) => {
        if (context) {
          const additionalOffset = canvasOffset[type];
          context.clearRect(0, 0, width, height);
          context.fillStyle = entityColors[type];
          filteredEntities.forEach((e) => {
            context.fillRect(
              e.position.x + offset.x + additionalOffset,
              e.position.y + offset.y + additionalOffset,
              size,
              size
            );
          });
        }

        resolve(true);
      }).then(() => setLoading(false));
    }
  }, [
    height,
    width,
    context,
    filteredEntities,
    offset.x,
    offset.y,
    size,
    type,
  ]);

  return loading;
};
