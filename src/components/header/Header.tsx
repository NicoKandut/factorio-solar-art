import { combine } from "../../logic/classnames";
import { getUpdateAvailable } from "../../logic/update-state";
import "./Header.css";

const Header = ({ className }: { className?: string }) => {
  return (
    <header className={combine("app-header", className)}>
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
