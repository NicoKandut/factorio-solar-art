import { useMemo, useEffect } from "react";
import {
  entityColors,
  EntityType,
  FactorioEntity,
  FactorioPosition,
  FactorioTile,
  TileType,
} from "../types/factorio";

export const useCachedEntityCanvas = (
  entities: FactorioEntity[] | FactorioTile[],
  canvas: HTMLCanvasElement | null,
  type: EntityType | TileType,
  size: number,
  offset: { x: number; y: number },
  onComplete?: () => void
) => {
  const filteredEntities = useMemo(() => {
    return (entities as { name: string; position: FactorioPosition }[]).filter(
      (e) => e.name === type
    );
  }, [entities, type]);

  useEffect(() => {
    if (canvas && filteredEntities) {
      const context = canvas.getContext("2d");
      const additionalOffset =
        type === "roboport"
          ? -1
          : type === "stone-wall" ||
            type === "refined-concrete" ||
            type === "stone-path"
          ? 1
          : 0;

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
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
    }

    onComplete?.();
  }, [canvas, filteredEntities, offset.x, offset.y, onComplete, size, type]);
};
