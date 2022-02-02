import { combine } from "../../logic/classnames";
import { Item } from "../item/Item";
import "./Header.css";

const Header = ({ className }: { className?: string }) => {
  return (
    <header className={combine("app-header", className)}>
      <Item name={"solar-panel"} count={17} />
      <h1 className="title">Factorio Solar Art Generator</h1>
    </header>
  );
};

export default Header;
