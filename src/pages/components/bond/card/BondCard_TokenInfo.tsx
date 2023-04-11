import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import TokenSymbol from "common/token/TokenSymol";
import Image from "next/image";
import { SupportedInputTokenTypes } from "types";
import ActiveArrow from "assets/icons/bond/arrow-right2_blue.svg";

type InTokenType = { inToken: SupportedInputTokenTypes };
type OutTokensType = {
  outToken0: SupportedInputTokenTypes;
  outToken1: SupportedInputTokenTypes;
};
type OtherInfo = { roi: number; ethCapacity: number };

export type TokenPairType = InTokenType & OutTokensType & OtherInfo;

function OutTokenPair(props: OutTokensType) {
  const { outToken0, outToken1 } = props;
  return (
    <Flex pos={"relative"} alignItems={""}>
      <TokenSymbol
        tokenType={outToken0}
        w={"36px"}
        h={"36px"}
        style={{
          position: "absolute",
          zIndex: 100,
          border: {},
          backgroundColor: "none",
        }}
      ></TokenSymbol>
      <TokenSymbol
        tokenType={outToken1}
        w={"36px"}
        h={"36px"}
        style={{
          position: "absolute",
          left: "30px",
          border: {},
          backgroundColor: "none",
        }}
      ></TokenSymbol>
      <Text
        color={"white.200"}
        fontSize={11}
        pos={"absolute"}
        bottom={0}
        w={"70px"}
      >
        {outToken0} + {outToken1}
      </Text>
    </Flex>
  );
}

function TokenPair(props: TokenPairType) {
  const { inToken, outToken0, outToken1 } = props;
  return (
    <Flex>
      <Flex flexDir={"column"} alignItems={"center"} rowGap={"8px"}>
        <TokenSymbol
          tokenType={inToken}
          w={"36px"}
          h={"36px"}
          imageW={"12.6px"}
          imageH={"21.6px"}
        ></TokenSymbol>
        <Text color={"white.200"} fontSize={11}>
          {inToken}
        </Text>
      </Flex>
      <Flex mx={"9px"} pb={"25px"}>
        <Image src={ActiveArrow} alt={"arrow"}></Image>
      </Flex>
      <OutTokenPair outToken0={outToken0} outToken1={outToken1}></OutTokenPair>
    </Flex>
  );
}

function BondInfo(props: InTokenType & OtherInfo) {
  const { inToken, roi, ethCapacity } = props;
  return (
    <Flex flexDir={"column"} rowGap={"12px"} textAlign={"right"}>
      <Text fontSize={12}>
        Earn up to{" "}
        <span
          style={{
            color: "#2775ff",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          {roi}
        </span>
        <span
          style={{
            color: "#2775ff",
            fontSize: "12px",
            fontWeight: 600,
            marginRight: "3px",
          }}
        >
          %
        </span>
        ROI
      </Text>
      <Flex flexDir={"column"}>
        <Text fontSize={11} color={"gray.100"}>
          Bond Capacity
        </Text>
        <Flex
          color="white.200"
          justifyContent={"flex-end"}
          columnGap={"2px"}
          alignItems={"end"}
        >
          <Box pb={"3px"} mr={"6px"}>
            <TokenSymbol
              tokenType={inToken}
              w={"16px"}
              h={"16px"}
              imageW={"5.6px"}
              imageH={"9.6px"}
            />
          </Box>
          <Text fontSize={15}>{ethCapacity}</Text>
          <Text fontSize={12} pb={"1px"}>
            ETH
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default function BondCard_TokenInfo(props: TokenPairType) {
  const { inToken, outToken0, outToken1, roi, ethCapacity } = props;
  const { colorMode } = useColorMode();

  return (
    <Flex
      w={"100%"}
      minH={"112px"}
      maxH={"112px"}
      border={"1px solid"}
      borderColor={colorMode === "dark" ? "#313442" : "#e8edf2"}
      borderRadius={10}
      mb={"18px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={"15px"}
    >
      <TokenPair
        inToken={inToken}
        outToken0={outToken0}
        outToken1={outToken1}
        roi={roi}
        ethCapacity={ethCapacity}
      />
      <BondInfo inToken={inToken} roi={roi} ethCapacity={ethCapacity} />
    </Flex>
  );
}
