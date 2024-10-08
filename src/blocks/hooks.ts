import {useContext} from "react";
import {BlocksContext} from "./context";

export function useBlocks() {
  return useContext(BlocksContext);
}
