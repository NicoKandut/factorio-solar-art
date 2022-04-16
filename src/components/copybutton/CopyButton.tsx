import { ReactNode, useEffect, useState } from "react";
import { combine } from "../../logic/classnames";
import { encode } from "../../logic/serialization";
import { FactorioBlueprint } from "../../types/factorio";
import { Button } from "../button/Button";

const stateTimeout = 1000;

interface Props {
  blueprint: FactorioBlueprint | null;
  icons: {
    success: ReactNode;
    error: ReactNode;
    default: ReactNode;
  };
  className?: string;
}

type State = "default" | "success" | "error";

export const CopyButton = (props: Props) => {
  const { blueprint, icons, className = "" } = props;

  const [state, setState] = useState<State>("default");

  useEffect(() => {
    if (state !== "default") {
      setTimeout(() => {
        setState("default");
      }, stateTimeout);
    }
  }, [state]);

  return (
    <Button
      title="Copy Blueprint"
      className={combine("copy-button", className)}
      onClick={() => {
        if (!blueprint) return;

        try {
          const importableString = encode(blueprint);
          navigator.clipboard
            .writeText(importableString)
            .then(() => setState("success"))
            .catch((e) => {
              throw e;
            });
        } catch (e) {
          if (e instanceof RangeError) {
            console.error("Blueprint is too large to process");
          } else {
            console.error("Unexpected error while copying:", e);
          }
          setState("error");
        }
      }}
    >
      {icons[state]}
    </Button>
  );
};
