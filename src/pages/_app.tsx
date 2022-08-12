import type { AppProps } from "next/app";
import { Box, ChakraProvider, ColorModeScript, Flex } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Web3ReactProvider } from "@web3-react/core";
import { ApolloProvider } from "@apollo/client";
import getLibrary from "utils/getLibrary";
import test from "utils/test";
import theme from "theme";
import NavBar from "pages/components/navBar";
import Footer from "pages/components/layout/Footer";
import { RecoilRoot } from "recoil";
import Header from "pages/components/layout/Header";
import { WalletModal } from "common/wallet/index";
import client from "client/client";
function MyApp({ Component, pageProps }: AppProps) {
  test();
  const { onOpen, isOpen: isModalOpen, onClose } = useDisclosure();
  const handleWalletModalOpen = (state: string) => {
    onOpen();
  };

  //test

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <ColorModeScript initialColorMode={theme.initialColorMode} />
        <ChakraProvider resetCSS theme={theme}>
          <RecoilRoot>
            <Flex minH={"100vh"} w={"100%"} px={["12px", "24px", "0px"]}>
              <NavBar></NavBar>
              {/* PC VIEW = 1136px */}
              {/* TABLET VIEW = 1040px */}
              {/* MOBILE VIEW = 360px */}
              <Flex justifyContent="center" w={"100%"} alignItems="center">
                <Flex
                  maxW={["100%", "100%", "1136px"]}
                  flexDir={"column"}
                  justifyContent="center"
                  w={"100%"}
                  minH={"100vh"}
                >
                  <Header
                    walletopen={() => handleWalletModalOpen("wallet")}
                  ></Header>
                  <Component {...pageProps} />
                  <Footer></Footer>
                  <WalletModal isOpen={isModalOpen} onClose={onClose} />
                </Flex>
              </Flex>
            </Flex>
          </RecoilRoot>
        </ChakraProvider>
      </ApolloProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
