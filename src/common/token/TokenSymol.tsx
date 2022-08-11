import Image from "next/image";
import ETH_SYMBOL from "assets/icons/eth-symbol.svg";
import TOKAMAK_SYMBOL from "assets/icons/tokamak-1.svg";
import { TokenTypes } from "types";
import { Flex } from "@chakra-ui/react";

function TokenSymbol(props: { tokenType: TokenTypes, h?: string, w?:string }) {
  const { tokenType, h, w } = props;
  switch (tokenType) {
    case "ETH":
      return (
        <Flex
          w={w|| "46px"}
          h={h||"46px"}
          borderRadius={25}
          bgColor={"#383736"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image src={ETH_SYMBOL} alt={""} height={'30px'} width={'30px'}></Image>
        </Flex>
      );
    case "TON":
      return (
        <Flex
          w={w||"46px"}
          h={h||"46px"}
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
          w={w||"46px"}
          h={h||"46px"}
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
