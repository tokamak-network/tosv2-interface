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
import BUGER_ICON_LIGHT from "assets/icons/icon_buger_light.svg";
import useMediaView from "hooks/useMediaView";
import { useRecoilState, useRecoilValue } from "recoil";
import { sidebarState } from "atom//header";
import { useWeb3React } from "@web3-react/core";
import { injected } from "connectors/";
import { useState } from "react";
import { selectedTxState } from "atom/global/tx";
import { accountBar } from "atom/global/sidebar";
import WalletIconLayOut from "./components/WalletIconLayout";
import NetworkIcon from "./components/NetworkIcon";
import { zIndexStyle } from "theme/styles";

function BurgerButton() {
  const [isOpen, setIsOpen] = useRecoilState(sidebarState);
  const { colorMode } = useColorMode();
  return (
    <Flex
      cursor={"pointer"}
      justifyContent={"center"}
      alignItems={"center"}
      onClick={() => setIsOpen(true)}
      w={"48px"}
      h={"48px"}
      borderWidth={1}
      borderColor={colorMode === "dark" ? "#313442" : "#e8edf2"}
      borderRadius={"8px"}
    >
      <Image
        src={colorMode === "dark" ? BUGER_ICON : BUGER_ICON_LIGHT}
        alt={"burger_icon"}
      ></Image>
    </Flex>
  );
}

function TxPending() {
  return (
    <Flex w={"100%"} alignItems={"center"}>
      <Spinner size={"md"} color={"blue.200"}></Spinner>
      <Text fontSize={16} fontWeight={"bold"} color={"#f1f1f1"} ml={"9px"}>
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

  const { pcView, tableView, mobileView, bp500px } = useMediaView();
  const text = useColorModeValue("dark", "light");
  const { activate, active, account } = useWeb3React();
  const txPending = useRecoilValue(selectedTxState);

  const [isOpendAccount, setOpenedAccountBar] = useRecoilState(accountBar);

  return (
    <Flex
      w={"100%"}
      // maxW={"1136px"}
      justifyContent={["space-between", "space-between", "end"]}
      pl={bp500px ? "12px" : tableView ? "23px" : ""}
      pr={bp500px ? "10px" : "35px"}
      pt={"24px"}
      h={"96px"}
      borderBottom={colorMode === "light" ? "1px solid #e8edf2" : ""}
      bg={colorMode === "light" ? "white.100" : "black.100"}
      position={"sticky"}
      top={0}
      zIndex={zIndexStyle.HeaderTop}
      alignItems={"center"}
    >
      {!pcView && <BurgerButton></BurgerButton>}
      <Flex>
        {!bp500px && <NetworkIcon />}
        <Flex
          w={account ? "157px" : "211px"}
          h={"48px"}
          borderWidth={1}
          borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
          borderRadius={8}
          ml={"20px"}
          pl={txPending ? "9px" : 0}
          pr={txPending ? "0px" : 0}
          justifyContent={"center"}
          cursor={"pointer"}
          fontSize={16}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          _hover={{
            color: "blue.200",
            border: !account ? "1px solid #2775ff" : "",
          }}
          fontWeight={"bold"}
          onClick={() => {
            //@ts-ignore
            if (!window.web3) {
              return window.open("https://metamask.io/download/");
            }
            if (account === undefined) {
              return props.walletopen();
            }
            setOpenedAccountBar(true);
          }}
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
