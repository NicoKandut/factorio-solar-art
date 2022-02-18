import { useRef } from "react";
import { useCachedEntityCanvas } from "../../hooks/useCachedEntityCanvas";
import { FactorioEntity, FactorioTile } from "../../types/factorio";
import { CenteredLoader } from "../loader/Loader";

import "./Preview.css";

interface Props {
  entities: FactorioEntity[];
  tiles: FactorioTile[];
  width: number;
  height: number;
  useSpaceExploration: boolean;
}

export const Preview = (props: Props) => {
  const { entities, tiles, width, height, useSpaceExploration } = props;

  const solarpanelsRef = useRef<HTMLCanvasElement>(null);
  const accumulatorRef = useRef<HTMLCanvasElement>(null);
  const powerpolesRef = useRef<HTMLCanvasElement>(null);
  const roboportsRef = useRef<HTMLCanvasElement>(null);
  const concreteReinforcedRef = useRef<HTMLCanvasElement>(null);
  const wallsRef = useRef<HTMLCanvasElement>(null);
  const radarRef = useRef<HTMLCanvasElement>(null);
  const stonePathRef = useRef<HTMLCanvasElement>(null);
  const chargerRef = useRef<HTMLCanvasElement>(null);

  const offset = { x: Math.floor(width / 2), y: Math.floor(height / 2) };

  const loadingStates = [
    useCachedEntityCanvas(
      entities,
      solarpanelsRef.current,
      useSpaceExploration ? "se-space-solar-panel-3" : "solar-panel",
      offset
    ),
    useCachedEntityCanvas(
      entities,
      accumulatorRef.current,
      useSpaceExploration ? "se-space-accumulator-2" : "accumulator",
      offset
    ),
    useCachedEntityCanvas(
      entities,
      powerpolesRef.current,
      useSpaceExploration ? "se-pylon-substation" : "substation",
      offset
    ),
    useCachedEntityCanvas(
      entities,
      roboportsRef.current,
      useSpaceExploration ? "se-pylon-construction" : "roboport",
      offset
    ),
    useCachedEntityCanvas(
      tiles,
      concreteReinforcedRef.current,
      "refined-concrete",
      offset
    ),
    useCachedEntityCanvas(tiles, stonePathRef.current, "stone-path", offset),
    useCachedEntityCanvas(entities, wallsRef.current, "stone-wall", offset),
    useCachedEntityCanvas(
      entities,
      radarRef.current,
      useSpaceExploration ? "se-pylon-construction-radar-roboport" : "radar",
      offset
    ),
    useCachedEntityCanvas(
      entities,
      radarRef.current,
      "se-supercharger",
      offset
    ),
  ];

  const loading = loadingStates.some((s) => s);

  return (
    <div className="stage">
      {loading ? <CenteredLoader /> : null}
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
      {useSpaceExploration ? (
        <canvas
          ref={chargerRef}
          className="layer charger"
          width={width}
          height={height}
        />
      ) : null}
    </div>
  );
};
