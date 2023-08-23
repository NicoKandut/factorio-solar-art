import { combine } from "../../logic/classnames";
import { EntityType, TileType } from "../../types/factorio";
import { itemUrls } from "../item/Item";
import "./ItemToggle.css";

interface Props {
  item: EntityType | TileType;
  active: boolean;
  onClick: () => void;
}

export const ItemToggle = (props: Props) => {
  const { item, active, onClick } = props;

  return (
    <button
      className={combine("item-toggle", active ? "active" : "")}
      title={item}
      onClick={onClick}
    >
      <img src={itemUrls[item]} alt={item} className="item-toggle-image" />
    </button>
  );
};
