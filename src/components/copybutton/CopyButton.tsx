import React, {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { combine } from "../../logic/classnames";
import { Button } from "../button/Button";
import "./CopyButton.css";

const stateTimeout = 1000;

interface Props {
  text: string;
  icons: {
    success: ReactNode;
    error: ReactNode;
    default: ReactNode;
  };
  className?: string;
}

export const CopyButton = (props: Props) => {
  const { text, icons, className = "" } = props;

  const [state, setState] = useState<"default" | "success" | "error">(
    "default"
  );

  useEffect(() => {
    if (state !== "default") {
      setTimeout(() => {
        setState("default");
      }, stateTimeout);
    }
  }, [state]);

  return (
    <Button
      className={combine("copy-button", className)}
      onClick={() => {
        navigator.clipboard
          .writeText(text)
          .then(() => setState("success"))
          .catch(() => setState("error"));
      }}
    >
      {icons[state]}
    </Button>
  );
};
