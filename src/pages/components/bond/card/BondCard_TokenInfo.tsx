import { Box, Flex, Text, useColorMode } from "@chakra-ui/react";
import TokenSymbol from "common/token/TokenSymol";
import Image from "next/image";
import { SupportedInputTokenTypes } from "types";
import ActiveArrow from "assets/icons/bond/arrow-right2_blue.svg";
import { useCustomColorMode } from "hooks/style/useCustomColorMode";
import { useBondCardStyle } from "hooks/style/bond/useBondCardStyle";

type InTokenType = { inToken: SupportedInputTokenTypes };
type OutTokensType = {
  outToken0: SupportedInputTokenTypes;
  outToken1: SupportedInputTokenTypes;
};
type OtherInfo = { roi: number; ethCapacity: number; isDiscountMinus: boolean };

export type TokenPairType = InTokenType & OutTokensType & OtherInfo;

function OutTokenPair(props: OutTokensType) {
  const { outToken0, outToken1 } = props;
  const { cardTextColor } = useBondCardStyle();

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
        color={cardTextColor}
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
  const { cardTextColor } = useBondCardStyle();
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
        <Text color={cardTextColor} fontSize={11}>
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

function BondInfo(props: TokenPairType) {
  const { inToken, roi, ethCapacity, isDiscountMinus } = props;
  const { cardTextColor } = useBondCardStyle();
  const { isDark } = useCustomColorMode();

  return (
    <Flex
      flexDir={"column"}
      rowGap={"12px"}
      textAlign={"right"}
      verticalAlign={"bottom"}
      lineHeight={"18px"}
      alignItems={"end"}
    >
      {isDiscountMinus ? (
        <Text
          fontSize={12}
          color={isDark ? "white.100" : "#07070c"}
          maxW={["55px", "55px", ""]}
        >
          Negative Discount
        </Text>
      ) : (
        <Flex
          flexDir={["column", "column", "row"]}
          fontSize={12}
          color={cardTextColor}
          justifyContent={"flex-end"}
        >
          <Text>Earn up to </Text>
          <Flex justifyContent={"flex-end"}>
            <Flex ml={"3px"}>
              <Text
                style={{
                  color: "#2775ff",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                {roi}
              </Text>
              <Text
                style={{
                  color: "#2775ff",
                  fontSize: "12px",
                  fontWeight: 600,
                  marginRight: "3px",
                }}
              >
                %
              </Text>
              ROI
            </Flex>
          </Flex>
        </Flex>
      )}
      <Flex flexDir={"column"}>
        <Text fontSize={11} color={"gray.100"}>
          Bond Capacity
        </Text>
        <Flex
          color={cardTextColor}
          justifyContent={"flex-end"}
          columnGap={"2px"}
          alignItems={"flex-end"}
        >
          <Box mr={"6px"} pb={"1px"}>
            <TokenSymbol
              tokenType={inToken}
              w={"16px"}
              h={"16px"}
              imageW={"5.6px"}
              imageH={"9.6px"}
            />
          </Box>
          <Text fontSize={15} fontWeight={600}>
            {ethCapacity}
          </Text>
          <Text fontSize={12} h={"17px"}>
            ETH
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default function BondCard_TokenInfo(props: TokenPairType) {
  const { isDark } = useCustomColorMode();

  return (
    <Flex
      w={"100%"}
      minH={"112px"}
      maxH={"112px"}
      border={"1px solid"}
      borderColor={isDark ? "#313442" : "#e8edf2"}
      borderRadius={10}
      mb={"18px"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={"15px"}
    >
      <TokenPair {...props} />
      <BondInfo {...props} />
    </Flex>
  );
}
