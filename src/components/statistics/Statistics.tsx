import { useMemo } from "react";
import { watts } from "../../logic/numberformatting";
import { EntityType, FactorioBlueprint, TileType } from "../../types/factorio";
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
          "refined-concrete": 0,
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
      <h3 className="statistics-group-title">Items</h3>
      <span>
        {entityCount || "no"} entities, {tileCount || "no"} tiles
      </span>
      <div className="item-list">
        {Object.entries(statistics).map(
          ([key, value]) =>
            Boolean(value) && (
              <Item key={key} name={key as EntityType} count={value} />
            )
        )}
      </div>
      <h3 className="statistics-group-title">Power</h3>
      <span>
        {watts(statistics["solar-panel"] * 60e3)} (peak) from solar panels
      </span>
      <br />
      <span>
        {watts(statistics["solar-panel"] * 42e3)} (avg) from solar panels
      </span>

      <br />
      <span title="Assuming that they are all fully charged by nightfall.">
        {watts((statistics["accumulator"] / 20) * 1e6)} from accumulators at
        night
      </span>

      <h3 className="statistics-group-title">Balance</h3>
      <span>
        Ratio {ratio} ({perfectRatio} is optimal)
      </span>
      <br />
      <span>
        You need more {ratio > perfectRatio ? "solar panels" : "accumulators"}.
      </span>
    </div>
  );
};
