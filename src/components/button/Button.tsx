import { PropsWithChildren } from "react";
import "./Button.css";

interface Props {
  onClick: () => void;
  title: string;
}

export const Button = (props: PropsWithChildren<Props>) => {
  const { children, onClick, title } = props;

  return (
    <button
      onClick={onClick}
      className="button"
      title={title}
    >
      {children}
    </button>
  );
};
