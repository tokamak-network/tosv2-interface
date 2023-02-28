import { useState, useEffect,useMemo,useCallback } from "react";
import {
  Text,
  Flex,
  Box,
  useColorMode,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import {
  selectedToken0,
  selectedToken1,
  swapTX,
  slip,
  focus,
  swapToAmount,
  swapFromAmount,
} from "atom/swap";
import { useRecoilValue, useRecoilState } from "recoil";

function InputComponent(props: { expected: string; inputNum: string, maxError: boolean }) {
  const { expected, inputNum,maxError } = props;
  const { colorMode } = useColorMode();
  const [invalidInput, setInvalidInput] = useState<boolean>(false);
  const [fromAmount, setFromAmount] = useRecoilState(swapFromAmount);
  const [focused, setFocused] = useRecoilState(focus);
  const [toAmount, setToAmount] = useRecoilState(swapToAmount);

  const valueAmnt = useMemo(() => {
    if (inputNum === '1') {
        return focused === "input1" ? fromAmount : expected;
    }
    else {
        return focused === "input2" ? toAmount : expected;
    }
  }, [expected, focused, fromAmount, inputNum, toAmount]);


  const handleInputClick = useCallback(() => {
    setFocused(inputNum === "1" ? "input1" : "input2");
  }, [inputNum, setFocused]);


  return (
 
    <Flex
      position={"relative"}
      border="1px solid"
      borderColor={
        invalidInput || (focused === 'input2' && maxError) ? "#e53e3e" : colorMode === "dark" ? "#313442" : "#dfe4ee"
      }
      height={"56px"}
      w={"310px"}
      flexDir={"row"}
      borderRadius={"4px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      pr={"18px"}
    >
        
      <NumberInput
        height={"56px"}
        w={"230px"}
        color={colorMode === "dark" ? "#f1f1f1" : "#86929d"}
        pl={"24px"}
        border={"none"}
        fontSize={"18px"}
        borderRadius={"4px"}
        min={0}
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
        onClick={() => handleInputClick()}
        value={valueAmnt }
        onChange={(e) => {
          const valueNum = e;
          focused === "input1"
            ? setFromAmount(valueNum)
            : setToAmount(valueNum);
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

  );
}

export default InputComponent;
