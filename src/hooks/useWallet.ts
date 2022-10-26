import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { SUPPORTED_WALLETS } from "constants/index";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { injected } from "connectors/";

function useWallet() {
  const { activate, active, account } = useWeb3React();

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    //@ts-ignore
    if (!window.web3) {
      return window.open("https://metamask.io/download/");
    }

    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return SUPPORTED_WALLETS[key].name;
      }
      return true;
    });

    try {
      connector &&
        activate(connector, undefined, true).catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            try {
              activate(connector); // a little janky...can't use setError because the connector isn't set
            } catch {
              // activate(trazorConnector);
            }
          } else {
          }
        });
    } catch {}
  };

  return { tryActivation: () => tryActivation(injected) };
}

export default useWallet;
