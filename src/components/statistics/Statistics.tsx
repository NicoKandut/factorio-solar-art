import { useMemo } from "react";
import { watts } from "../../logic/numberformatting";
import { EntityType, FactorioBlueprint, TileType } from "../../types/factorio";
import { Item } from "../item/Item";
import "./Statistics.css";

interface Props {
  blueprint: FactorioBlueprint | null;
}

const perfectRatio = 21 / 25;

const ratingOf = (value: number) => {
  const diff = Math.abs(value - perfectRatio);
  if (diff < 0.1) return "perfect";
  if (diff < 0.5) return "good";
  if (diff < 1) return "fair";
  if (diff < 5) return "bad";
  else return "awful";
};

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
    return null;
  }

  const ratio = statistics["accumulator"] / statistics["solar-panel"];

  return (
    <div className="statistics">
      <h3 className="statistics-group-title">Items</h3>
      <div className="item-list">
        {Object.entries(statistics).map(
          ([key, value]) =>
            Boolean(value) && (
              <div key={key} className="slot">
                <Item name={key as EntityType} count={value} />
              </div>
            )
        )}
      </div>
      <h3 className="statistics-group-title">Power</h3>
      <div className="stat-group">
        <div className="stat-row">
          <span>Peak output</span>
          <span>{watts(statistics["solar-panel"] * 60e3)}</span>
        </div>
        <div className="stat-row">
          <span>Average output</span>
          <span>{watts(statistics["solar-panel"] * 42e3)}</span>
        </div>
        <div className="stat-row">
          <span>At night</span>
          <span>{watts((statistics["accumulator"] / 20) * 1e6)}</span>
        </div>
      </div>

      <h3 className="statistics-group-title">Balance</h3>
      <div className="stat-group">
        <div className="stat-row">
          <span>Ratio</span>
          <span className={ratingOf(ratio)}>{ratio.toFixed(2)} acc/panel</span>
        </div>
        <div className="stat-row">
          <span>Optimal ratio</span>
          <span>{perfectRatio.toFixed(2)} acc/panel</span>
        </div>
      </div>
    </div>
  );
};
