import useClient from "hooks/useClient";
import { AppProps } from "next/app";
import { useEffect } from "react";

function Entry({ Component, pageProps }: AppProps) {
  const { isConnectedToChain, networkName } = useClient();

  useEffect(() => {}, []);

  return <Component {...pageProps} />;
}

export default Entry;
