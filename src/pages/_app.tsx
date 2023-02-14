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
import { useEffect } from "react";
import useClient from "hooks/useClient";
import Entry from "./entry";
import AccountDrawer from "./components/layout/AccountDrawer";
import HeadMeta from "./Header";
import NetworkModal from "./components/global/NetworkModal";
import TermsOfUse from "./components/global/TermsOfUse";
import Notice from "./components/global/Notice";
import "css/gradient.css";
import "css/modalOverlay.css";
import "css/scrollbar.css";
import CustomToast from "common/toast/CustomToast";
import SwapInterfaceModal from "common/swap/SwapInterfaceModal";
function MyApp({ Component, pageProps }: AppProps) {
  test();
  const { onOpen, isOpen: isModalOpen, onClose } = useDisclosure();
  const handleWalletModalOpen = (state: string) => {
    onOpen();
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <ColorModeScript initialColorMode={theme.initialColorMode} />
        <ChakraProvider resetCSS theme={theme}>
          <RecoilRoot>
            <HeadMeta></HeadMeta>
            <Flex minH={"100vh"} w={"100%"}>
              <NavBar></NavBar>
              {/* PC VIEW = 1440px */}
              {/* TABLET VIEW = 1040px */}
              {/* MOBILE VIEW = 360px */}
              <Flex flexDir={"column"} w={"100%"} alignItems={"center"}>
                <Header
                  walletopen={() => handleWalletModalOpen("wallet")}
                ></Header>
                <Flex
                  justifyContent="center"
                  w={"100%"}
                  alignItems="center"
                  px={["12px", "24px", "0px"]}
                >
                  <Flex
                    maxW={["100%", "976px", "1136px"]}
                    flexDir={"column"}
                    justifyContent="center"
                    w={"100%"}
                    minH={"100vh"}
                  >
                    <Entry Component={Component} {...pageProps} />
                    <Footer></Footer>
                    <WalletModal isOpen={isModalOpen} onClose={onClose} />
                    <AccountDrawer
                      walletopen={() => handleWalletModalOpen("wallet")}
                    ></AccountDrawer>
                    <NetworkModal />
                    <SwapInterfaceModal/>
                    <TermsOfUse />
                    {/* Use when it does need to pop Notice Modal up */}
                    {/* <Notice /> */}
                    <CustomToast />
                  </Flex>
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
