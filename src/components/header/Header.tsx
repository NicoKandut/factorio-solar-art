import { Theme } from "../../types/ui";
import { Button } from "../button/Button";
import { Item } from "../item/Item";
import "./Header.css";

interface Props {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Header = (props: Props) => {
  const { theme, setTheme } = props;

  return (
    <header className="app-header">
      <Item name={"solar-panel"} count={17} />
      <h1>Factorio Solar Art Generator</h1>
      <div className="spacer"></div>
      {theme === "dark" ? (
        <Button onClick={() => setTheme("light")}>🌞</Button>
      ) : (
        <Button onClick={() => setTheme("dark")}>🌙</Button>
      )}
    </header>
  );
};

export default Header;
