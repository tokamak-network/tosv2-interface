import type { AppProps } from "next/app";
import { Box, ChakraProvider, ColorModeScript, Flex } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "utils/getLibrary";
import test from "utils/test";
import theme from "./theme";
import NavBar from "components/navBar";
import Footer from "components/layout/Footer";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  test();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ColorModeScript initialColorMode={theme.initialColorMode} />
      <ChakraProvider resetCSS theme={theme}>
        <RecoilRoot>
          <Flex minH={"100vh"}>
            <NavBar></NavBar>
            <Flex flexDir={"column"}>
              <Component {...pageProps} />
              <Footer></Footer>
            </Flex>
          </Flex>
        </RecoilRoot>
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
