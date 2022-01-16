import { useRef } from "react";
import { useCachedEntityCanvas } from "../../hooks/useCachedEntityCanvas";
import { FactorioEntity, FactorioTile } from "../../types/types";

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
  const tilesRef = useRef<HTMLCanvasElement>(null);

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
  useCachedEntityCanvas(tiles, tilesRef.current, "roboport", 4, offset);

  return (
    <div className="stage">
      <canvas
        ref={solarpanelsRef}
        className="solarpanels"
        width={width}
        height={height}
      />
      <canvas
        ref={accumulatorRef}
        className="accumulators"
        width={width}
        height={height}
      />
      <canvas
        ref={powerpolesRef}
        className="powerpoles"
        width={width}
        height={height}
      />
      <canvas
        ref={roboportsRef}
        className="roboports"
        width={width}
        height={height}
      />
      <canvas ref={tilesRef} className="tiles" width={width} height={height} />
    </div>
  );
};
