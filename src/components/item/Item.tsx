import { shorten } from "../../logic/numberformatting";
import { EntityType, TileType } from "../../types/types";
import "./Item.css";

type Items = EntityType | TileType;

interface Props {
  name: Items;
  count: number;
}

const itemUrls: Partial<Record<Items, string>> = {
  "solar-panel":
    "https://wiki.factorio.com/images/thumb/Solar_panel.png/32px-Solar_panel.png",
  accumulator:
    "https://wiki.factorio.com/images/thumb/Accumulator.png/32px-Accumulator.png",
  substation:
    "https://wiki.factorio.com/images/thumb/Substation.png/32px-Substation.png",
  roboport:
    "https://wiki.factorio.com/images/thumb/Roboport.png/32px-Roboport.png",
};

export const Item = (props: Props) => {
  const { count, name } = props;

  return (
    <div className="item">
      <img src={itemUrls[name]} alt={name} className="item-image" />
      <span className="item-count">{shorten(count)}</span>
    </div>
  );
};
