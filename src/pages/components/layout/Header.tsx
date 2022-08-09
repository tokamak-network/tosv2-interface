import {
  Flex,
  Text,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
  useTheme,
} from "@chakra-ui/react";
import Image from "next/image";
import WALLETDARK_ICON from "assets/icons/walletDark.svg";
import WALLETDARK_INACTIVE_ICON from "assets/icons/walletDark_inactive.svg";
import WALLETLIGHT_ICON from "assets/icons/walletLight.svg";
import WALLETLIGHT_INACTIVE_ICON from "assets/icons/WalletLight_inactive.svg";
import WALLET_BLUE from 'assets/icons/WalletBlue.svg';
import MOON_ICON from "assets/icons/moon.svg";
import SUN_ICON from "assets/icons/sun.svg";
import BUGER_ICON from "assets/icons/icon_buger.svg";
import useMediaView from "hooks/useMediaView";
import { useRecoilState } from "recoil";
import { sidebarState } from "atom//header";
import { useWeb3React } from "@web3-react/core";
import { useActiveWeb3React } from "hooks/useWeb3";
import { injected } from "connectors/";
import trimAddress from "utils/trimAddress";
import { useState } from "react";

function BurgerButton() {
  const [isOpen, setIsOpen] = useRecoilState(sidebarState);

  return (
    <Flex cursor={"pointer"} onClick={() => setIsOpen(true)}>
      <Image src={BUGER_ICON} alt={"burger_icon"}></Image>
    </Flex>
  );
}

type HeaderProps = {
  walletopen: () => void;
};

function Header(props:HeaderProps) {

  const { toggleColorMode, colorMode } = useColorMode();
  const [isHover, setIsHover] = useState<boolean>(false);
  const SwitchIcon = useColorModeValue(MOON_ICON, SUN_ICON);
  const theme = useTheme();
  const [walletState, setWalletState] = useState<string>('');
  const {onOpen} = useDisclosure();

  const { pcView } = useMediaView();
  const text = useColorModeValue("dark", "light");
  // const {  } = useActiveWeb3React();
  const { activate, active, account } = useWeb3React();
  const handleWalletModalOpen = (state: string) => {
    setWalletState(state);
    onOpen();
  };

  return (
    <Flex
      w={"100%"}
      justifyContent={["space-between", "space-between", "end"]}
      pr={[0, "11px", "35px"]}
      pt={"24px"}
      h={"96px"}
      borderBottom={colorMode === "light" ? "1px solid #e8edf2" : ""}
      bg={colorMode === "light" ? "white.100" : "black.100"}
    >
      {!pcView && <BurgerButton></BurgerButton>}
      <Flex>
        <Flex
          w={"211px"}
          h={"48px"}
          borderWidth={1}
          borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
          borderRadius={8}
          px={"20px"}
          alignItems={"center"}
          justifyContent={"space-between"}
          cursor={"pointer"}
          fontSize={16}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          _hover={{color:'blue.200', border:!account ?'1px solid #2775ff':''}}
          fontWeight={"bold"}
          // onClick={() => (account ? null : activate(injected))}
          onClick={props.walletopen}
        >
          <Image
            src={
              account
                ? colorMode === "light"
                  ? WALLETLIGHT_ICON
                  : WALLETDARK_ICON:
                  isHover? WALLET_BLUE
                : colorMode === "light"
                ? WALLETLIGHT_INACTIVE_ICON
                : WALLETDARK_INACTIVE_ICON
            }
            alt={"WALLET_ICON"}
          ></Image>
          <Text
            w={"127px"}
            color={
              account
                ? colorMode === "light"
                  ? "#16161e"
                  : "#f1f1f1":
                  isHover? 'blue.200':
                 colorMode === "light"
                ? "#7e7e8f"
                : "#707070"
            }
          >
            {account
              ? trimAddress({
                  address: account,
                  firstChar: 7,
                  lastChar: 4,
                  dots: "....",
                })
              : "Connect Wallet"}
          </Text>
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
