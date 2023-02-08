import Image from "next/image";
import ETH_SYMBOL from "assets/icons/eth-symbol.svg";
import TOKAMAK_SYMBOL from "assets/icons/tokamak-1.svg";
import TOS_SYMBOL from "assets/icons/TOS.svg";
import { TokenTypes } from "types";
import { Flex,useColorMode } from "@chakra-ui/react";

function TokenSymbol(props: { tokenType: TokenTypes; h?: string; w?: string; imageH? :string; imageW?:string }) {
  const { tokenType, h, w,imageH, imageW } = props;
  const { colorMode } = useColorMode();

  switch (tokenType) {
    case "ETH":
      return (
        <Flex
          w={w || "46px"}
          h={h || "46px"}
          borderRadius={25}
          bgColor={"#383736"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image
            src={ETH_SYMBOL}
            alt={""}
            height={imageH|| "30px"}
            width={ imageW||"30px"}
          ></Image>
        </Flex>
      );
    case "TON":
      return (
        <Flex
          w={w || "46px"}
          h={h || "46px"}
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
          w={w || "46px"}
          h={h || "46px"}
          borderRadius={25}
          bgColor={"#007aff"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image src={TOKAMAK_SYMBOL} alt={""}></Image>
        </Flex>
      );
    case "TOS":
      return (
        <Flex
          w={w || "46px"}
          h={h || "46px"}
          borderRadius={25}
          bgColor={colorMode === 'dark'?"#1f2128":'#ffffff'}   
          alignItems={"center"}
          border={colorMode === 'dark'?"1px solid #313442":"1px solid #e8edf2"}
          justifyContent={"center"}
        >
          <Image src={TOS_SYMBOL} alt={""}></Image>
        </Flex>
      );
    default:
      return null;
  }
}

export default TokenSymbol;
