import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "utils/getLibrary";
import test from "utils/test";
import theme from "./theme";

function MyApp({ Component, pageProps }: AppProps) {
  test();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ColorModeScript />
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
