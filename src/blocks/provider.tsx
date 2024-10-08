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

      await api.rpc.chain.subscribeNewHeads(async head => {
        const hash = head.hash.toString();
        const signedBlock = await api.rpc.chain.getBlock(hash);
        const apiAt = await api.at(hash);
        const events = (await apiAt.query.system.events()).toJSON() as any[];
        const timestamp = await apiAt.query.timestamp.now();

        const extrinsicsStatus = signedBlock.block.extrinsics.map(
          (extrinsic, index) => {
            const extrinsicEvents = events.filter(
              ({phase}) =>
                phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
            );

            const isSuccess = extrinsicEvents.some(
              ({event}) =>
                event.section === "system" &&
                event.method === "ExtrinsicSuccess"
            );
            const isFailed = extrinsicEvents.some(
              ({event}) =>
                event.section === "system" && event.method === "ExtrinsicFailed"
            );

            return isFailed ? "Failed" : isSuccess ? "Success" : "Processing";
          }
        );

        const blockStatus = extrinsicsStatus.includes("Failed")
          ? "Failed"
          : extrinsicsStatus.includes("Processing")
          ? "Processing"
          : "Success";

        const block: Block = {
          number: head.number.toNumber(),
          hash: hash,
          parent: head.parentHash.toString(),
          state: head.stateRoot.toString(),
          events: events.length,
          extrinsics: signedBlock.block.extrinsics.length,
          timestamp: new Date(parseInt(timestamp.toString(), 10)),
          status: blockStatus,
        };

        setBlocks(prevBlocks => [...prevBlocks, block]);
      });
    };

    loadBlocks();
  }, []);

  return (
    <BlocksContext.Provider value={blocks}>
      {props.children}
    </BlocksContext.Provider>
  );
}
