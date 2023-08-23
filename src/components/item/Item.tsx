import { combine } from "../../logic/classnames";
import { compactFormat } from "../../logic/numberformatting";
import { EntityType, TileType } from "../../types/factorio";
import "./Item.css";

type Items = EntityType | TileType;

interface Props {
  name: Items;
  count: number;
  className?: string;
}

export const itemUrls: Record<Items, string> = {
  "solar-panel":
    "https://wiki.factorio.com/images/thumb/Solar_panel.png/32px-Solar_panel.png",
  accumulator:
    "https://wiki.factorio.com/images/thumb/Accumulator.png/32px-Accumulator.png",
  substation:
    "https://wiki.factorio.com/images/thumb/Substation.png/32px-Substation.png",
  roboport:
    "https://wiki.factorio.com/images/thumb/Roboport.png/32px-Roboport.png",
  "stone-wall": "https://wiki.factorio.com/images/thumb/Wall.png/32px-Wall.png",
  "refined-concrete":
    "https://wiki.factorio.com/images/thumb/Refined_concrete.png/32px-Refined_concrete.png",
  radar: "https://wiki.factorio.com/images/thumb/Radar.png/32px-Radar.png",
  "stone-path":
    "https://wiki.factorio.com/images/thumb/Stone_brick.png/32px-Stone_brick.png",
  "se-space-solar-panel":
    process.env.PUBLIC_URL + "/images/se-solar-panel-1.png",
  "se-space-solar-panel-2":
    process.env.PUBLIC_URL + "/images/se-solar-panel-2.png",
  "se-space-solar-panel-3":
    process.env.PUBLIC_URL + "/images/se-solar-panel-3.png",
  "se-space-accumulator":
    process.env.PUBLIC_URL + "/images/se-accumulator-1.png",
  "se-space-accumulator-2":
    process.env.PUBLIC_URL + "/images/se-accumulator-2.png",
  "se-pylon-substation":
    process.env.PUBLIC_URL + "/images/pylon-substation.png",
  "se-pylon-construction":
    process.env.PUBLIC_URL + "/images/pylon-construction.png",
  "se-pylon-construction-radar-roboport":
    process.env.PUBLIC_URL + "/images/pylon-construction-radar.png",
  "se-supercharger": process.env.PUBLIC_URL + "/images/supercharger.png",
};

export const Item = (props: Props) => {
  const { count, name, className } = props;

  return (
    <div className={combine("item", className)} title={name}>
      <img src={itemUrls[name]} alt={name} className="item-image" />
      <span className="item-count">{compactFormat(count)}</span>
    </div>
  );
};
