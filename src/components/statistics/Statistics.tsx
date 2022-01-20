import { useMemo } from "react";
import { EntityType, FactorioBlueprint, TileType } from "../../types/types";
import { Item } from "../item/Item";
import "./Statistics.css";

interface Props {
  blueprint: FactorioBlueprint | null;
}

const perfectRatio = (25 / 21).toFixed(2);

export const Statistics = (props: Props) => {
  const { blueprint } = props;

  const statistics = useMemo(() => {
    if (blueprint) {
      return [
        ...blueprint.blueprint.entities,
        ...blueprint.blueprint.tiles,
      ].reduce(
        (acc, entity) => {
          acc[entity.name]++;
          return acc;
        },
        {
          "solar-panel": 0,
          accumulator: 0,
          substation: 0,
          roboport: 0,
          "stone-wall": 0,
          "concrete-reinforced": 0,
        } as Record<EntityType | TileType, number>
      );
    }
  }, [blueprint]);

  if (!blueprint || !statistics) {
    return <span>No statistics yet...</span>;
  }

  const entityCount = blueprint.blueprint.entities.length;
  const tileCount = blueprint.blueprint.tiles.length;

  const ratio = (statistics["accumulator"] / statistics["solar-panel"]).toFixed(
    2
  );

  return (
    <div>
      <span>
        {entityCount || "no"} entities, {tileCount || "no"} tiles
      </span>
      <div className="item-list">
        {Object.entries(statistics).map(([key, value]) => (
          <Item key={key} name={key as EntityType} count={value} />
        ))}
      </div>
      <div>
        <span>{statistics["solar-panel"] * 60} kW (peak)</span>
        <br />
        <span>{statistics["solar-panel"] * 42} kW (avg)</span>
      </div>
      <div>
        <span>
          Ratio {ratio} ({perfectRatio} is optimal)
        </span>
        <br />
        <span>
          You need more {ratio > perfectRatio ? "solar panels" : "accumulators"}
          .
        </span>
      </div>
    </div>
  );
};
