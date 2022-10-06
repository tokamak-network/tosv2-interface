import {
  Flex,
  Text,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
  useTheme,
  Spinner,
} from "@chakra-ui/react";
import Image from "next/image";
import MOON_ICON from "assets/icons/moon.svg";
import SUN_ICON from "assets/icons/sun.svg";
import BUGER_ICON from "assets/icons/icon_buger.svg";
import ETH_SYMBOL from "assets/icons/eth_24.svg";
import Tooltips_left_arrow from "assets/icons/Tooltips_left_arrow.svg";
import useMediaView from "hooks/useMediaView";
import { useRecoilState, useRecoilValue } from "recoil";
import { sidebarState } from "atom//header";
import { useWeb3React } from "@web3-react/core";
import { useActiveWeb3React } from "hooks/useWeb3";
import { injected } from "connectors/";
import { useState } from "react";
import { selectedTxState } from "atom/global/tx";
import { accountBar } from "atom/global/sidebar";
import WalletIconLayOut from "./components/WalletIconLayout";
import useClient from "hooks/useClient";

function BurgerButton() {
  const [isOpen, setIsOpen] = useRecoilState(sidebarState);

  return (
    <Flex cursor={"pointer"} onClick={() => setIsOpen(true)} ml={"12px"}>
      <Image src={BUGER_ICON} alt={"burger_icon"}></Image>
    </Flex>
  );
}

function TxPending() {
  return (
    <Flex w={"100%"} alignItems={"center"}>
      <Spinner size={"md"} color={"blue.200"}></Spinner>
      <Text fontSize={16} fontWeight={"bold"} color={"#f1f1f1"} ml={"21px"}>
        Tx Pending...
      </Text>
    </Flex>
  );
}

type HeaderProps = {
  walletopen: () => void;
};

function Header(props: HeaderProps) {
  const { toggleColorMode, colorMode } = useColorMode();
  const [isHover, setIsHover] = useState<boolean>(false);
  const SwitchIcon = useColorModeValue(MOON_ICON, SUN_ICON);
  const theme = useTheme();
  const [walletState, setWalletState] = useState<string>("");
  const { onOpen } = useDisclosure();

  const { pcView } = useMediaView();
  const text = useColorModeValue("dark", "light");
  const { activate, active, account } = useWeb3React();
  const handleWalletModalOpen = (state: string) => {
    setWalletState(state);
    onOpen();
  };

  const txPending = useRecoilValue(selectedTxState);
  const [isOpendAccount, setOpenedAccountBar] = useRecoilState(accountBar);
  const { isConnectedToChain } = useClient();

  return (
    <Flex
      w={"100%"}
      justifyContent={["space-between", "space-between", "end"]}
      pr={["10px", "11px", "35px"]}
      pt={"24px"}
      h={"96px"}
      borderBottom={colorMode === "light" ? "1px solid #e8edf2" : ""}
      bg={colorMode === "light" ? "white.100" : "black.100"}
    >
      {!pcView && <BurgerButton></BurgerButton>}
      <Flex>
        {account && (
          <Flex
            mr={"20px"}
            w={"48px"}
            h={"48px"}
            bg={isConnectedToChain ? "#f29b37" : "#080808"}
            border={isConnectedToChain ? {} : "1px solid #313442"}
            borderRadius={8}
            justifyContent={"center"}
            alignItems={"center"}
            pos={"relative"}
          >
            <Image src={ETH_SYMBOL} alt={"eth_24"}></Image>
            {isConnectedToChain === false && (
              <Flex
                pos={"absolute"}
                w={"262px"}
                h={"59px"}
                bg={"#1f2128"}
                borderRadius={3}
                fontSize={14}
                color={"#2775ff"}
                mt={"130px"}
                flexDir={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Flex
                  transform={"rotate(270deg)"}
                  position={"absolute"}
                  mb={"66px"}
                >
                  <Image
                    src={Tooltips_left_arrow}
                    alt={"tooltip_arrow"}
                  ></Image>
                </Flex>
                <Text>Please connect to Goerli testnet </Text>
                <Text>to use this service.</Text>
              </Flex>
            )}
          </Flex>
        )}
        <Flex
          w={"211px"}
          h={"48px"}
          borderWidth={1}
          borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
          borderRadius={8}
          px={"20px"}
          cursor={"pointer"}
          fontSize={16}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          _hover={{
            color: "blue.200",
            border: !account ? "1px solid #2775ff" : "",
          }}
          fontWeight={"bold"}
          // onClick={props.walletopen}
          onClick={
            account === undefined
              ? props.walletopen
              : () => setOpenedAccountBar(true)
          }
        >
          {txPending === true ? (
            <TxPending></TxPending>
          ) : (
            <WalletIconLayOut></WalletIconLayOut>
          )}
        </Flex>

        <Flex
          ml={"20px"}
          w={"48px"}
          h={"48px"}
          borderWidth={1}
          borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
          borderRadius={8}
          alignItems="center"
          justifyContent={"center"}
          cursor={"pointer"}
          onClick={toggleColorMode}
        >
          <Image
            src={colorMode === "light" ? SUN_ICON : MOON_ICON}
            alt={"MOON_ICON"}
          ></Image>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
