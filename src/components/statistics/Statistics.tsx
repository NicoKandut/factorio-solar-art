import { useMemo } from "react";
import { watts } from "../../logic/numberformatting";
import { EntityType, FactorioBlueprint, TileType } from "../../types/factorio";
import { Item } from "../item/Item";
import "./Statistics.css";

interface Props {
  blueprint: FactorioBlueprint | null;
  useSpaceExploration: boolean;
}

const perfectVanillaRatio = 21 / 25;
const perfectSeRatio = 0.168 * (1.6e6 / 250e6) * 416.66;

const ratingOf = (value: number, perfectRatio: number) => {
  const diff = Math.abs(value - perfectRatio);
  if (diff < 0.1) return "perfect";
  if (diff < 0.5) return "good";
  if (diff < 1) return "fair";
  if (diff < 5) return "bad";
  else return "awful";
};

export const Statistics = (props: Props) => {
  const { blueprint, useSpaceExploration } = props;

  const statistics = useMemo(() => {
    if (blueprint) {
      return [
        ...blueprint.blueprint.entities,
        ...blueprint.blueprint.tiles,
      ].reduce((acc, entity) => {
        if (!acc[entity.name]) {
          acc[entity.name] = 0;
        }

        acc[entity.name]++;
        return acc;
      }, {} as Record<EntityType | TileType, number>);
    }
  }, [blueprint]);

  if (!blueprint || !statistics) {
    return null;
  }

  const accumulatorType = useSpaceExploration
    ? "se-space-accumulator-2"
    : "accumulator";
  const panelType = useSpaceExploration
    ? "se-space-solar-panel-3"
    : "solar-panel";
  const panelMax = {
    "se-space-solar-panel-3": 1600e3,
    "solar-panel": 60e3,
  }[panelType];

  const perfectRatio = useSpaceExploration
    ? perfectSeRatio
    : perfectVanillaRatio;
  const ratio = statistics[accumulatorType] / statistics[panelType];

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
          <span>{watts(statistics[panelType] * panelMax)}</span>
        </div>
        <div className="stat-row">
          <span>Average output</span>
          <span>{watts(statistics[panelType] * panelMax * 0.7)}</span>
        </div>
      </div>

      <h3 className="statistics-group-title">Balance</h3>
      <div className="stat-group">
        <div className="stat-row">
          <span>Ratio</span>
          <span className={ratingOf(ratio, perfectRatio)}>
            {ratio.toFixed(2)} acc/panel
          </span>
        </div>
        <div className="stat-row">
          <span>Optimal ratio</span>
          <span>{perfectRatio.toFixed(2)} acc/panel</span>
        </div>
      </div>
    </div>
  );
};
