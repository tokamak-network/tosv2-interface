import Image from "next/image";
import ETH_SYMBOL from "assets/icons/eth-symbol.svg";
import TOKAMAK_SYMBOL from "assets/icons/tokamak-1.svg";
import TOS_SYMBOL from "assets/icons/TOS.svg";

import TOKEN_TOS_SYMBOL from "assets/icons/tokens/TOS.svg";
import LTOS_SYMBOL from "assets/icons/tokens/dark-LTOS.svg";
import LTOS_SYMBOL_BIG from "assets/icons/tokens/dark-LTOS_34w.svg";
import LTOS_SYMBOL_BIG_LIGHT from "assets/icons/tokens/bright-LTOS.svg";

import STOS_SYMBOL from "assets/icons/tokens/dark-sTOS.svg";
import STOS_SYMBOL_LIGHT from "assets/icons/tokens/bright-sTOS.svg";

import { SupportedInputTokenTypes, TokenTypes } from "types";
import { Flex, useColorMode } from "@chakra-ui/react";
import { useCustomColorMode } from "hooks/style/useCustomColorMode";

function TokenSymbol(props: {
  tokenType: SupportedInputTokenTypes;
  h?: string;
  w?: string;
  imageH?: string;
  imageW?: string;
  isTokenInput?: boolean;
  style?: {};
}) {
  const { tokenType, h, w, imageH, imageW, isTokenInput, style } = props;
  const { colorMode } = useColorMode();
  const { isDark } = useCustomColorMode();

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
          {...style}
        >
          <Image
            src={ETH_SYMBOL}
            alt={""}
            height={imageH || "30px"}
            width={imageW || "30px"}
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
          {...style}
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
          {...style}
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
          bgColor={colorMode === "dark" ? "#1f2128" : "#ffffff"}
          alignItems={"center"}
          border={
            colorMode === "dark" ? "1px solid #313442" : "1px solid #e8edf2"
          }
          justifyContent={"center"}
          {...style}
        >
          <Image
            src={isTokenInput ? TOKEN_TOS_SYMBOL : TOS_SYMBOL}
            alt={"TOS_SYMBOL"}
          ></Image>
        </Flex>
      );
    case "LTOS":
      return (
        <Flex
          w={w || "46px"}
          h={h || "46px"}
          borderRadius={25}
          bgColor={colorMode === "dark" ? "#1f2128" : "#ffffff"}
          alignItems={"center"}
          border={
            colorMode === "dark" ? "1px solid #313442" : "1px solid #e8edf2"
          }
          justifyContent={"center"}
          {...style}
        >
          <Image
            src={isDark ? LTOS_SYMBOL_BIG : LTOS_SYMBOL_BIG_LIGHT}
            alt={"LTOS_SYMBOL"}
          ></Image>
        </Flex>
      );
    case "STOS":
      return (
        <Flex
          w={w || "46px"}
          h={h || "46px"}
          borderRadius={25}
          bgColor={colorMode === "dark" ? "#1f2128" : "#ffffff"}
          alignItems={"center"}
          border={
            colorMode === "dark" ? "1px solid #313442" : "1px solid #e8edf2"
          }
          justifyContent={"center"}
          {...style}
        >
          <Image
            src={isDark ? STOS_SYMBOL : STOS_SYMBOL_LIGHT}
            alt={"STOS_SYMBOL"}
          ></Image>
        </Flex>
      );
    default:
      return null;
  }
}

export default TokenSymbol;
