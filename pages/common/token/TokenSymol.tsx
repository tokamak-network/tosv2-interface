import Image from "next/image";
import ETH_SYMBOL from "assets/icons/eth-symbol.svg";
import TOKAMAK_SYMBOL from "assets/icons/tokamak-1.svg";
import { TokenTypes } from "types";
import { Flex } from "@chakra-ui/react";

function TokenSymbol(props: { tokenType: TokenTypes }) {
  const { tokenType } = props;
  switch (tokenType) {
    case "ETH":
      return (
        <Flex
          w={"46px"}
          h={"46px"}
          borderRadius={25}
          bgColor={"#383736"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image src={ETH_SYMBOL} alt={""}></Image>
        </Flex>
      );
    case "TON":
      return (
        <Flex
          w={"46px"}
          h={"46px"}
          borderRadius={25}
          bgColor={"#007aff"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image src={TOKAMAK_SYMBOL} alt={""}></Image>
        </Flex>
      );
    case "WTON":
      return (
        <Flex
          w={"46px"}
          h={"46px"}
          borderRadius={25}
          bgColor={"#007aff"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image src={TOKAMAK_SYMBOL} alt={""}></Image>
        </Flex>
      );
    default:
      return null;
  }
}

export default TokenSymbol;
