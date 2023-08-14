import { inflate, deflate } from "pako";
import { Serializable } from "../data/Serializable";

const TEXT_DECODER = new TextDecoder();
const VERSION = "0"

export const encode = <T = Serializable> (data: T) => {
  return VERSION + Buffer.from(deflate(JSON.stringify(data))).toString("base64");
};

export const decode = <T = Serializable> (str: string): T => {
  const data: unknown = JSON.parse(TEXT_DECODER.decode(inflate(Buffer.from(str.slice(1), "base64"))));
  return data as T;
};


