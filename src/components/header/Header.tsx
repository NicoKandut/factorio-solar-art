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
          //@ts-expect-error ts does not know about reload(true)
          onClick={() => window.location.reload(true)}
        >
          New version available. Click here to reload.
        </span>
      ) : (
        <span className="header-version">v1.4</span>
      )}
      <Button
        title="Changelog"
        onClick={() => {
          window.location.href =
            "https://github.com/NicoKandut/factorio-solar-art/blob/main/CHANGELOG.md";
        }}
      >
        <span className="material-icons">feed</span>
      </Button>
      <Button
        title="Github Repository"
        onClick={() => {
          window.location.href =
            "https://github.com/NicoKandut/factorio-solar-art";
        }}
      >
        <GithubIcon />
      </Button>
      <Button
        title="Discord Server"
        onClick={() => {
          window.location.href = "https://discord.gg/2Sh3QTAY";
        }}
      >
        <span className="material-icons">discord</span>
      </Button>
    </header>
  );
};

export default Header;
