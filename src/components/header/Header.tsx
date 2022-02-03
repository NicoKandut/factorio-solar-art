import { combine } from "../../logic/classnames";
import { getUpdateAvailable } from "../../logic/update-state";
import { Item } from "../item/Item";
import "./Header.css";

const Header = ({ className }: { className?: string }) => {
  return (
    <header className={combine("app-header", className)}>
      <Item name={"solar-panel"} count={17} />
      <h1 className="title">Factorio Solar Art Generator</h1>
      {getUpdateAvailable() && (
        <span
          className="header-update"
          onClick={() => window.location.reload()}
        >
          New version available. Click here to reload.
        </span>
      )}
    </header>
  );
};

export default Header;
