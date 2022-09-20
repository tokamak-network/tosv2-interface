import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import Image from "next/image";
import WALLETDARK_ICON from "assets/icons/walletDark.svg";
import WALLETDARK_INACTIVE_ICON from "assets/icons/walletDark_inactive.svg";
import WALLETLIGHT_ICON from "assets/icons/walletLight.svg";
import WALLETLIGHT_INACTIVE_ICON from "assets/icons/walletLight_inactive.svg";
import WALLET_BLUE from "assets/icons/walletBlue.svg";
import { useState } from "react";
import trimAddress from "utils/trimAddress";

function WalletIconLayOut(props: any) {
  const { account } = useWeb3React();
  const { colorMode } = useColorMode();
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Flex
      w={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      {...props}
    >
      <Image
        src={
          account
            ? colorMode === "light"
              ? WALLETLIGHT_ICON
              : WALLETDARK_ICON
            : isHover
            ? WALLET_BLUE
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
              : "#f1f1f1"
            : isHover
            ? "blue.200"
            : colorMode === "light"
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
  );
}

export default WalletIconLayOut;
