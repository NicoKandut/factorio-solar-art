import { useMemo } from "react";
import { watts } from "../../logic/numberformatting";
import * as factorio from "../../factorio-blueprint-utils/src";
import { Item } from "../item/Item";
import "./Statistics.css";
import { EntityType } from "../../types/factorio";
import { SE_ACCUMULATORS, SE_PANELS } from "../../logic/sePixelFactory";

interface Props {
  blueprints: Array<factorio.WrappedBlueprint>;
  useSpaceExploration: boolean;
  panel: 1 | 2 | 3;
  accumulator: 1 | 2 | 3;
}

const perfectVanillaRatio = 21 / 25;

const ratingOf = (value: number, perfectRatio: number) => {
  const diff = Math.abs(value - perfectRatio);
  if (diff < 0.1) return "perfect";
  if (diff < 0.5) return "good";
  if (diff < 1) return "fair";
  if (diff < 5) return "bad";
  else return "awful";
};

export const Statistics = (props: Props) => {
  const { blueprints, useSpaceExploration, panel, accumulator } = props;

  const statistics = useMemo(() => {
    const stats: Record<string, number> = {};

    blueprints.forEach((blueprint) => {
      blueprint.blueprint.entities.forEach((entity) => {
        stats[entity.name] = entity.name in stats ? stats[entity.name] + 1 : 0;
      });

      blueprint.blueprint.entities.forEach((entity) => {
        stats[entity.name] = entity.name in stats ? stats[entity.name] + 1 : 0;
      });
    });

    return stats;
  }, [blueprints]);

  if (blueprints.length === 0 || !statistics) {
    return null;
  }

  const accumulatorType = useSpaceExploration
    ? SE_ACCUMULATORS[accumulator]
    : "accumulator";
  const panelType = useSpaceExploration ? SE_PANELS[panel] : "solar-panel";
  const panelMax = {
    "se-space-solar-panel": 400e3,
    "se-space-solar-panel-2": 800e3,
    "se-space-solar-panel-3": 1600e3,
    "solar-panel": 60e3,
  }[panelType];
  const accumulatorMax = {
    accumulator: 5e6,
    "se-space-accumulator": 50e6,
    "se-space-accumulator-2": 250e6,
  }[accumulatorType];

  const perfectRatio = useSpaceExploration
    ? 0.168 * (panelMax / accumulatorMax) * 416.6666666
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
