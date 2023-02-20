import { useState, useEffect } from "react";
import { Text, Flex, Box, useColorMode } from "@chakra-ui/react";
import expand from "assets/expand.png";
import maximizeDark from 'assets/maximizeDark.png' 
import Image from "next/image";
import { selectedToken0, selectedToken1, swapTX } from "atom/swap";
import { useRecoilValue, useRecoilState } from "recoil";

function ConversionComponent(props: {
  expectedAmnt: string;
  slippage: string;
  minAmount: string;
  focused: string;
  swapFromAmt2: string;
}) {
  const { expectedAmnt, slippage, minAmount, focused, swapFromAmt2 } = props;
  const [expanded, setExpanded] = useState<boolean>(false);
  const token0 = useRecoilValue(selectedToken0);
  const token1 = useRecoilValue(selectedToken1);
  const { colorMode } = useColorMode();
  return (
    <Flex
      w="100%"
      border="1px solid"
      borderColor={colorMode === "dark" ? "#313442" : "#dfe4ee"}
      borderRadius={"18px"}
      px="15px"
      mb="8px"
    >
      {!expanded ? (
        <Flex
          h="36px"
          justifyContent={"space-between"}
          alignItems="center"
          w="100%"
        >
          <Text
            fontSize={"14px"}
            color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}
          >
            Conversion
          </Text>
          <Flex
            w="14px"
            h="14px"
            _hover={{ cursor: "pointer" }}
            onClick={() => setExpanded(!expanded)}
          >
            <Image src={colorMode === 'dark'? maximizeDark: expand} />
          </Flex>
        </Flex>
      ) : (
        <Flex h={"145px"} w={"100%"} flexDirection="column">
          <Flex mt="10px" justifyContent={"space-between"} w={"100%"}>
            <Text
              fontSize={"14px"}
              color={colorMode === "dark" ? "#f1f1f1" : "#3d495d"}
            >
              Conversion
            </Text>
            <Flex
              w="14px"
              h="14px"
              _hover={{ cursor: "pointer" }}
              onClick={() => setExpanded(!expanded)}
            >
              <Image src={colorMode === 'dark'? maximizeDark: expand} />
            </Flex>
          </Flex>
          <Flex justifyContent={"space-between"} w={"100%"} mt="16px">
            <Text
              color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}
              fontSize={"14px"}
              fontWeight="bold"
            >
              Expected Output
            </Text>
            <Text
              color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}
              fontSize={"14px"}
              fontWeight="normal"
            >
              {focused === "input1"
                ? `${minAmount} ${token1.name}`
                : `${swapFromAmt2}${token1.name}`}
            </Text>
          </Flex>
          <Box
            h={"1px"}
            bg={colorMode === "dark" ? "#313442" : "#e9edf1"}
            w="280px"
            mt="14.5px"
            mb={"12.5px"}
          ></Box>
          <Flex justifyContent={"space-between"}>
            <Flex
              flexDir={"column"}
              alignItems="start"
              fontSize={"12px"}
              color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}
            >
              <Text>
                {focused === "input1"
                  ? "Minimum received after slippage"
                  : "Maximum spent after slippage"}
              </Text>
              <Text>
                {(token1.name === "WTON" && token0.name === "TON") ||
                (token1.name === "TON" && token0.name === "WTON")
                  ? `0%`
                  : slippage
                  ? `${slippage} %`
                  : focused === "input1"
                  ? `1%`
                  : `3%`}
              </Text>
            </Flex>
            <Flex
              flexDir={"column"}
              fontSize={"12px"}
              color={colorMode === "dark" ? "#f1f1f1" : "#86929d"}
            >
              <Text>{minAmount ? expectedAmnt : `0`}</Text>
              <Text>{token1.name}</Text>
            </Flex>
          </Flex>
          {/* <Flex mt='10px' justifyContent={"space-between"} fontSize='12px'>
            <Text color='#3d495d'>Gas Fee</Text>
            <Text color='#86929d'>~$7.63</Text>
          </Flex> */}
        </Flex>
      )}
    </Flex>
  );
}

export default ConversionComponent;
