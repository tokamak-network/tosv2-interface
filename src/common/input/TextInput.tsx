import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Text,
  useColorMode,
  useFocusOnPointerDown,
  useTheme,
} from "@chakra-ui/react";
import { inputBalanceState, inputState } from "atom/global/input";
import { selectedModalState } from "atom/global/modal";
import useInput from "hooks/useInput";
import { max } from "moment";
import React, { SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { PageKey } from "types";
import { InputKey } from "types/atom";

type InputProp = {
  placeHolder?: string;
  w?: number | string;
  h?: number | string;
  isDisabled?: boolean;
  inputValue?: string | number | any;
  isError?: boolean;
  errorMsg?: string;
  atomKey: string;
  style?: any;
  pageKey: PageKey;
  recoilKey: InputKey;
  maxValue?: string | number;
  rightUnit?: string;
};

type NumberInputProp = {
  placeHolder?: string;
  w?: number | string;
  h?: number | string;
  isDisabled?: boolean;
  inputValue?: string | number | any;
  isError?: boolean;
  errorMsg?: string;
  atomKey: string;
  style?: any;
  pageKey: PageKey;
  recoilKey: InputKey;
  maxValue?: string | number;
  rightUnit?: string;
};

const TextInput: React.FC<InputProp> = (props) => {
  const {
    placeHolder,
    w,
    h,
    isDisabled,
    atomKey,
    isError,
    style,
    pageKey,
    recoilKey,
    maxValue,
    errorMsg,
    rightUnit,
  } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { inputValue, value, setValue } = useInput(pageKey, recoilKey);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setValue({
      ...inputValue,
      [atomKey]: event.target.value,
    });
  };

  return (
    <Flex flexDir={"column"} {...style}>
      <InputGroup>
        <Input
          isInvalid={isError}
          isDisabled={isDisabled}
          w={w || 270}
          h={h || 45}
          ml={"auto"}
          borderRadius={8}
          borderWidth={1}
          borderColor={colorMode === "light" ? "#e8edf2" : "#313442"}
          fontSize={14}
          color={
            colorMode === "light"
              ? "gray.800"
              : isDisabled
              ? "#64646f"
              : "#f1f1f1"
          }
          _placeholder={{ color: "#64646f" }}
          placeholder={placeHolder}
          _hover={{
            borderColor: colorMode === "light" ? "#c6cbd9" : "#535353",
          }}
          focusBorderColor="none"
          _focus={
            isError
              ? {}
              : {
                  outline: "none",
                  color: colorMode === "light" ? "gray.800" : "#f1f1f1",
                  boxShadow: "",
                  borderColor: colorMode === "light" ? "#9a9aaf" : "#8a8a98",
                }
          }
          outline="none"
          errorBorderColor={"#e23738"}
          // errorBorderColor={isDisabled === false ? "#e23738" : "#e23738"}
          value={`${isDisabled ? "-" : value[atomKey]}`}
          onChange={onChange}
        ></Input>

        <InputRightElement mr={"12px"}>
          <Button
            w={"30px"}
            h={"20px"}
            color={"#64646f"}
            _hover={{ color: "#2775ff" }}
            bg={"none"}
            fontSize={14}
            fontWeight={"normal"}
            isDisabled={isDisabled}
            onClick={() =>
              maxValue && setValue({ ...inputValue, [atomKey]: maxValue })
            }
          >
            Max
          </Button>
        </InputRightElement>
      </InputGroup>
      {isError && (
        <Flex
          fontSize={12}
          color={"#e23738"}
          justifyContent={"flex-end"}
          pos={"absolute"}
          mt={"40px"}
          textAlign={"right"}
          right={"120px"}
        >
          <Text>{errorMsg}</Text>
        </Flex>
      )}
    </Flex>
  );
};

function BalanceInput(props: NumberInputProp) {
  const {
    placeHolder,
    w,
    h,
    isDisabled,
    atomKey,
    isError,
    style,
    pageKey,
    recoilKey,
    maxValue,
    errorMsg,
    rightUnit,
  } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { inputValue, value, setValue } = useInput(pageKey!, recoilKey);
  const selectedModal = useRecoilValue(selectedModalState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...inputValue, [atomKey]: event.target.value });
  };

  useEffect(() => {
    if (maxValue) {
      return setValue({ ...inputValue, [atomKey]: maxValue.toString() });
    }
  }, [maxValue, selectedModal, atomKey]);

  return (
    <Flex flexDir={"column"} w={w || 270} {...style}>
      <InputGroup>
        <NumberInput
          isInvalid={isError}
          isDisabled={isDisabled}
          w={w || 270}
          h={h || 45}
          ml={"auto"}
          borderRadius={8}
          borderWidth={1}
          borderColor={colorMode === "light" ? "#e8edf2" : "#313442"}
          fontSize={14}
          color={colorMode === "light" ? "gray.800" : "#f1f1f1"}
          _placeholder={{ color: "#64646f" }}
          _hover={{
            borderColor: colorMode === "light" ? "#c6cbd9" : "#535353",
          }}
          focusBorderColor="none"
          placeholder={placeHolder}
          _focus={{
            outline: "none",
            color: colorMode === "light" ? "gray.800" : "#f1f1f1",
            boxShadow: "",
            borderColor: colorMode === "light" ? "#9a9aaf" : "#8a8a98",
          }}
          errorBorderColor={"#e23738"}
          outline="none"
          defaultValue={maxValue}
          value={value[atomKey]}
        >
          <NumberInputField
            h={"100%"}
            placeholder={placeHolder}
            onChange={onChange}
            border={{}}
          ></NumberInputField>
        </NumberInput>
        <InputRightElement ml={"30px"} w={"30px"} mr={"12px"}>
          <Button
            w={"30px"}
            h={"20px"}
            color={"#64646f"}
            _hover={{ color: "#2775ff" }}
            bg={"none"}
            fontSize={14}
            fontWeight={"normal"}
            isDisabled={isDisabled}
            onClick={() =>
              maxValue &&
              setValue({ ...inputValue, [atomKey]: String(maxValue) })
            }
          >
            Max
          </Button>
        </InputRightElement>
      </InputGroup>
      {isError && (
        <Flex fontSize={12} color={"#e23738"} justifyContent={"flex-end"}>
          <Text>{errorMsg}</Text>
        </Flex>
      )}
    </Flex>
  );
}

export { TextInput, BalanceInput };
