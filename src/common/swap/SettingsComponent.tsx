import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Text,
  Flex,
  Button,
  NumberInput,
  NumberInputField,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import gear from "assets/gear.png";
import { slip, focus } from "atom/swap";
import { useRecoilValue, useRecoilState } from "recoil";
import Image from "next/image";

function SettingsComponent() {
    const [slippage, setSlippage] = useRecoilState(slip);
    const focused = useRecoilValue(focus)
    const [expanded, setExpanded] = useState<boolean>(false);
    const [invalidInput, setInvalidInput] = useState<boolean>(false);
    const [slippageAmnt, setSlippageAmnt] = useState<string>("0");

    return (
        <Flex
        border="1px solid #dfe4ee"
        h={expanded ?  "172px" : "36px"}
        borderRadius={"18px"}
        mb={ "30px"}
        px="15px"
        flexDir={"column"}
        fontFamily={""}
        w="310px"
      >
        <Flex
          justifyContent={"space-between"}
          mt="8px"
          w="280px"
          h="19px"
          alignItems={"center"}
        >
          <Text fontSize={"14px"} color='#3d495d'>Settings</Text>
          <Flex  w="14px"
            h="14px"
            _hover={{cursor:'pointer'}}
            onClick={() => setExpanded(!expanded)}>
          <Image
            src={gear}
           
          />
          </Flex>
         
        </Flex>
        {expanded && (
          <Flex flexDir={"column"} w="310px" mt="11px" textAlign={"left"} color='#3d495d'>
            <Text fontSize="16px" fontWeight={"bold"} mb="12px" h="21px">
              Transaction Settings
            </Text>
            <Text fontSize="14px" fontWeight={"normal"} mb="12px" h="19px">
              Slippage tolerance
            </Text>
            <Flex
              position={"relative"}
              border={invalidInput ? "solid 1px #e53e3e" : "solid 1px #dfe4ee"}
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
                color={"#3e495c"}
                pl={"24px"}
                border={"none"}
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
                />
              </NumberInput>
            </Flex>
          </Flex>
        )}
      </Flex>
    )
}

export default SettingsComponent;