import {PropsWithChildren, useEffect, useState} from "react";
import {ApiPromise, WsProvider} from "@polkadot/api";
import {BlocksContext} from "./context";
import {Block} from "./interfaces";

export function BlocksProvider(props: PropsWithChildren) {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const loadBlocks = async () => {
      const provider = new WsProvider("wss://rpc.polkadot.io");
      const api = await ApiPromise.create({provider});
    };

    loadBlocks();
  }, []);

  return (
    <BlocksContext.Provider value={blocks}>
      {props.children}
    </BlocksContext.Provider>
  );
}
