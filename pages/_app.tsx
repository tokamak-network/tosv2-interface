import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeScript, Flex } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "utils/getLibrary";
import test from "utils/test";
import theme from "./theme";
import NavBar from "components/navBar";

function MyApp({ Component, pageProps }: AppProps) {
  test();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <ChakraProvider resetCSS theme={theme}>
        <Flex>
          <NavBar></NavBar>
          <Component {...pageProps} />
        </Flex>
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
