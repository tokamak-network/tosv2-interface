import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Text,
  Flex,
  Button,
  NumberInput,
  NumberInputField,
  Tooltip,
  Box,
  useColorMode,
} from "@chakra-ui/react";
import gear from "assets/gear.png";
import gearDark from 'assets/gearDark.png'
import { slip, focus } from "atom/swap";
import { useRecoilValue, useRecoilState } from "recoil";
import Image from "next/image";

function SettingsComponent() {
  const [slippage, setSlippage] = useRecoilState(slip);
  const focused = useRecoilValue(focus);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [slippageAmnt, setSlippageAmnt] = useState<string>("0");
  const { colorMode } = useColorMode();

  useEffect(() => {
    setSlippageAmnt(focused === "input1" ? "1" : "3");
    setSlippage(focused === "input1" ? "1" : "3");
  }, [focused, setSlippage]);

  return (
    <Flex
      border="1px solid"
      borderColor={colorMode === "dark" ? "#313442" : "#dfe4ee"}
      borderRadius={"18px"}
      mb={"30px"}
      px="15px"
      flexDir={"column"}
      fontFamily={""}
      w="310px"
    >
      {!expanded ? (
        <Flex
          justifyContent={"space-between"}
       
          w="280px"
          h="36px"
          alignItems={"center"}
        >
          <Text
            fontSize={"14px"}
            color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}
          >
            Settings
          </Text>
          <Flex
            w="14px"
            h="14px"
            _hover={{ cursor: "pointer" }}
            onClick={() => setExpanded(!expanded)}
          >
            <Image src={colorMode === 'dark'? gearDark: gear} alt={'gear icon'} />
          </Flex>
        </Flex>
      ) : (
        <Flex flexDir={"column"} color="#3d495d" h="172px">
          <Flex mt="8px"  justifyContent={"space-between"} >
            <Text
              fontSize={"14px"}
              color={colorMode === "dark" ? "#f1f1f1" : "#3d495d"}
            >
              Settings
            </Text>
            <Flex
              w="14px"
              h="14px"
              _hover={{ cursor: "pointer" }}
              onClick={() => setExpanded(!expanded)}
            >
              <Image src={colorMode === 'dark'? gearDark: gear} alt={'gear icon'} />
            </Flex>
          </Flex>
          <Text fontSize="16px" fontWeight={"bold"} mb="12px" h="21px" mt='11px'   color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}>
            Transaction Settings
          </Text>
          <Text fontSize="14px" fontWeight={"normal"} mb="12px" h="19px"   color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}>
            Slippage tolerance
          </Text>
          <Flex
            position={"relative"}
            border={"solid 1px" }
            borderColor={invalidInput ?'#e53e3e' :colorMode === "dark" ? "#313442" : "#dfe4ee"}
            height={"56px"}
            w={"280px"}
            flexDir={"row"}
            borderRadius={"4px"}
            justifyContent={"space-between"}
            alignItems={"center"}
            pr={"18px"}
            mb="19.5px"
          >
            <NumberInput
              height={"56px"}
              w={"fit-content"}
              color={colorMode === 'dark'? '#64646f': "#3e495c"}
              pl={"24px"}
              border={"none"}
              min={0}
              fontSize={"18px"}
              borderRadius={"4px"}
              borderColor={"transparent"}
              _focus={{
                borderColor: "transparent",
              }}
              _active={{
                borderColor: "transparent",
              }}
              focusBorderColor="transparent"
              _hover={{
                borderColor: "transparent",
              }}
              defaultValue={0}
              value={`${slippageAmnt} %`}
              onChange={(e) => {
                const valueNum = e;
                setSlippageAmnt(valueNum);
                setSlippage(valueNum);
              }}
            >
              <NumberInputField
                border={"none"}
                height={"56px"}
                outline={"none"}
                borderColor={"transparent"}
                pl={"0px"}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
              />
            </NumberInput>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default SettingsComponent;
