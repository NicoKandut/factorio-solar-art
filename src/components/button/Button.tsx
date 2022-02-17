import React, { PropsWithChildren } from "react";
import { combine } from "../../logic/classnames";
import "./Button.css";

interface Props {
  onClick: () => void;
  className?: string;
  title: string;
}

export const Button = (props: PropsWithChildren<Props>) => {
  const { children, className, onClick, title } = props;

  return (
    <button
      onClick={onClick}
      className={combine("button", className)}
      title={title}
    >
      {children}
    </button>
  );
};
