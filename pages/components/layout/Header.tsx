import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import WALLET_ICON from "assets/icons/wallet.svg";
import WALLET_INACTIVE_ICON from "assets/icons/wallet_inactive.svg";
import MOON_ICON from "assets/icons/moon.svg";
import BUGER_ICON from "assets/icons/icon_buger.svg";
import useMediaView from "hooks/useMediaView";
import { useRecoilState } from "recoil";
import { sidebarState } from "atom/header";
import { useWeb3React } from "@web3-react/core";
import { useActiveWeb3React } from "hooks/useWeb3";
import { injected } from "connectors";
import trimAddress from "@/components/trimAddress";

function BurgerButton() {
  const [isOpen, setIsOpen] = useRecoilState(sidebarState);

  return (
    <Flex cursor={"pointer"} onClick={() => setIsOpen(true)}>
      <Image src={BUGER_ICON} alt={"burger_icon"}></Image>
    </Flex>
  );
}

function Header() {
  const { pcView } = useMediaView();
  // const {  } = useActiveWeb3React();
  const { activate, active, account } = useWeb3React();
  return (
    <Flex
      w={"100%"}
      justifyContent={["space-between", "space-between", "end"]}
      pr={[0, "11px", "35px"]}
      pt={"24px"}
    >
      {!pcView && <BurgerButton></BurgerButton>}
      <Flex>
        <Flex
          w={"211px"}
          h={"48px"}
          borderWidth={1}
          borderColor={"gray.300"}
          borderRadius={8}
          px={"20px"}
          alignItems={"center"}
          justifyContent={"space-between"}
          cursor={"pointer"}
          fontSize={16}
          fontWeight={"bold"}
          onClick={() => (account ? null : activate(injected))}
        >
          <Image
            src={account ? WALLET_ICON : WALLET_INACTIVE_ICON}
            alt={"WALLET_ICON"}
          ></Image>
          <Text w={"127px"} color={account ? "white.200" : "#707070"}>
            {account
              ? trimAddress({
                  address: account,
                  firstChar: 7,
                  lastChar: 4,
                  dots: "....",
                })
              : "Connet Wallet"}
          </Text>
        </Flex>
        <Flex
          ml={"20px"}
          w={"48px"}
          h={"48px"}
          borderWidth={1}
          borderColor={"gray.300"}
          borderRadius={8}
          alignItems="center"
          justifyContent={"center"}
          cursor={"pointer"}
        >
          <Image src={MOON_ICON} alt={"MOON_ICON"}></Image>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
