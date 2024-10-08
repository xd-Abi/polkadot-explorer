import {createContext} from "react";
import {Block} from "./interfaces";

export const BlocksContext = createContext<Block[]>([]);
