import { useMemo, useEffect } from "react";
import {
  entityColors,
  EntityType,
  FactorioEntity,
  FactorioTile,
  TileType,
} from "../types/types";

export const useCachedEntityCanvas = (
  entities: FactorioEntity[] | FactorioTile[],
  canvas: HTMLCanvasElement | null,
  type: EntityType | TileType,
  size: number,
  offset: { x: number; y: number },
  onComplete?: () => void
) => {
  const filteredEntities = useMemo(() => {
    return entities.filter((e) => e.name === type);
  }, [entities, type]);

  useEffect(() => {
    if (canvas && filteredEntities) {
      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = entityColors[type];
        filteredEntities.forEach((e) => {
          context.fillRect(
            e.position.x + offset.x,
            e.position.y + offset.y,
            size,
            size
          );
        });
      }
    }

    onComplete?.();
  }, [canvas, filteredEntities, offset.x, offset.y, onComplete, size, type]);
};