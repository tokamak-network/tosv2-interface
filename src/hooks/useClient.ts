import { useWeb3React } from "@web3-react/core";
import { DEFAULT_NETWORK } from "constants/index";
import { useEffect, useState } from "react";
import { useActiveWeb3React } from "./useWeb3";

type UseClient = {
  isConnectedToChain: boolean | undefined;
  networkName: string | undefined;
};

function useClient() {
  const [clientData, setClientData] = useState<UseClient>({
    isConnectedToChain: undefined,
    networkName: undefined,
  });
  const { account, active, chainId } = useWeb3React();

  useEffect(() => {
    async function fetchClientData() {
      if (chainId && DEFAULT_NETWORK) {
        const networkName = DEFAULT_NETWORK === "1" ? "Mainnet" : "Sepolia";
        if (String(chainId) !== DEFAULT_NETWORK) {
          return setClientData({
            isConnectedToChain: false,
            networkName,
          });
        }
        return setClientData({
          isConnectedToChain: true,
          networkName,
        });
      }
    }
    fetchClientData().catch((e) => {
      console.log("**useClient err**");
      console.log(e);
    });
  }, [account, active, chainId]);

  return clientData;
}

export default useClient;
