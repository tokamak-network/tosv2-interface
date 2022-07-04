import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import WALLET_ICON from "assets/icons/wallet.svg";
import MOON_ICON from "assets/icons/moon.svg";

function Header() {
  return (
    <Flex w={"100%"} justifyContent={"end"} pr={"35px"} pt={"24px"}>
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
      >
        <Image src={WALLET_ICON} alt={"WALLET_ICON"}></Image>
        <Text>Connet Wallet</Text>
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
  );
}

export default Header;
