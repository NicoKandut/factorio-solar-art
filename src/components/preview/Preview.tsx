import { useRef } from "react";
import { useCachedEntityCanvas } from "../../hooks/useCachedEntityCanvas";
import { FactorioEntity, FactorioTile } from "../../types/factorio";

import "./Preview.css";

interface Props {
  entities: FactorioEntity[];
  tiles: FactorioTile[];
  width: number;
  height: number;
}

export const Preview = (props: Props) => {
  const { entities, tiles, width, height } = props;

  const solarpanelsRef = useRef<HTMLCanvasElement>(null);
  const accumulatorRef = useRef<HTMLCanvasElement>(null);
  const powerpolesRef = useRef<HTMLCanvasElement>(null);
  const roboportsRef = useRef<HTMLCanvasElement>(null);
  const concreteReinforcedRef = useRef<HTMLCanvasElement>(null);
  const wallsRef = useRef<HTMLCanvasElement>(null);
  const radarRef = useRef<HTMLCanvasElement>(null);
  const stonePathRef = useRef<HTMLCanvasElement>(null);

  const offset = { x: Math.floor(width / 2), y: Math.floor(height / 2) };

  useCachedEntityCanvas(
    entities,
    solarpanelsRef.current,
    "solar-panel",
    3,
    offset
  );
  useCachedEntityCanvas(
    entities,
    accumulatorRef.current,
    "accumulator",
    2,
    offset
  );
  useCachedEntityCanvas(
    entities,
    powerpolesRef.current,
    "substation",
    2,
    offset
  );
  useCachedEntityCanvas(entities, roboportsRef.current, "roboport", 4, offset);
  useCachedEntityCanvas(
    tiles,
    concreteReinforcedRef.current,
    "refined-concrete",
    1,
    offset
  );
  useCachedEntityCanvas(tiles, stonePathRef.current, "stone-path", 1, offset);
  useCachedEntityCanvas(entities, wallsRef.current, "stone-wall", 1, offset);
  useCachedEntityCanvas(entities, radarRef.current, "radar", 3, offset);

  return (
    <div className="stage">
      <canvas
        ref={solarpanelsRef}
        className="layer solarpanels"
        width={width}
        height={height}
      />
      <canvas
        ref={accumulatorRef}
        className="layer accumulators"
        width={width}
        height={height}
      />
      <canvas
        ref={powerpolesRef}
        className="layer powerpoles"
        width={width}
        height={height}
      />
      <canvas
        ref={radarRef}
        className="layer radar"
        width={width}
        height={height}
      />
      <canvas
        ref={roboportsRef}
        className="layer roboports"
        width={width}
        height={height}
      />
      <canvas
        ref={concreteReinforcedRef}
        className="layer refined-concrete"
        width={width}
        height={height}
      />
      <canvas
        ref={wallsRef}
        className="layer stone-wall"
        width={width}
        height={height}
      />
      <canvas
        ref={stonePathRef}
        className="layer stone-path"
        width={width}
        height={height}
      />
    </div>
  );
};
