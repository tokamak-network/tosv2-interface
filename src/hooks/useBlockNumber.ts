import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

export function useBlockNumber(): {
  blockNumber: number;
  blockTimeStamp: number | undefined;
} {
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [blockTimeStamp, setblockTimeStamp] = useState<number | undefined>(
    undefined
  );

  const { library } = useWeb3React();

  // console.log("lib");
  // console.log(library);

  useEffect(() => {
    if (library) {
      library.getBlockNumber().then((bn: any) => {
        setBlockNumber(bn);
      });

      library.getBlock().then((blockInfo: any) => {
        setblockTimeStamp(blockInfo.timestamp);
      });
      library.on("block", setBlockNumber);

      return () => {
        library.removeListener("block", setBlockNumber);
        // library.removeListener("blockTimeStamp", setblockTimeStamp);

        setBlockNumber(0);
        setblockTimeStamp(undefined);
      };
    }
  }, [library]);

  return { blockNumber, blockTimeStamp };
}
