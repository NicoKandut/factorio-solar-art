import * as factorio from "../../factorio-blueprint-utils/src";
import { ReactNode, useEffect, useState } from "react";
import { encode } from "../../logic/serialization";
import { Button } from "../button/Button";

const stateTimeout = 1000;

interface Props {
  blueprint: factorio.Serializable | null;
  icons: {
    success: ReactNode;
    error: ReactNode;
    default: ReactNode;
  };
}

type State = "default" | "success" | "error";

export const CopyButton = (props: Props) => {
  const { blueprint, icons } = props;

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
