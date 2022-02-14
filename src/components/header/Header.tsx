import { combine } from "../../logic/classnames";
import { getUpdateAvailable } from "../../logic/update-state";
import { Button } from "../button/Button";
import GithubIcon from "../icon/GithubIcon";
import "./Header.css";

const Header = ({ className }: { className?: string }) => {
  return (
    <header className={combine("app-header", className)}>
      <h1 className="title">Factorio Solar Art Generator</h1>
      {getUpdateAvailable() ? (
        <span
          className="header-update"
          //@ts-expect-error
          onClick={() => window.location.reload(true)}
        >
          New version available. Click here to reload.
        </span>
      ) : (
        <span className="header-version">v1.1</span>
      )}
      <Button
        onClick={() => {
          window.location.href =
            "https://github.com/NicoKandut/factorio-solar-art/blob/main/CHANGELOG.md";
        }}
      >
        <span className="material-icons">feed</span>
      </Button>
      <Button
        onClick={() => {
          window.location.href =
            "https://github.com/NicoKandut/factorio-solar-art";
        }}
      >
        <GithubIcon />
      </Button>
      <Button
        onClick={() => {
          window.location.href =
            "https://discordapp.com/users/272673243083571202";
        }}
      >
        <span className="material-icons">discord</span>
      </Button>
    </header>
  );
};

export default Header;
