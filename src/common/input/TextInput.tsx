import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { inputBalanceState, inputState } from "atom/global/input";
import useInput from "hooks/useInput";
import { max } from "moment";
import React, { SetStateAction } from "react";
import { RecoilLoadable, useRecoilState, useRecoilValue } from "recoil";
import { PageKey } from "types";
import { Stake_InputKey } from "types/atom";

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
  pageKey?: PageKey;
  recoilKey?: Stake_InputKey;
  maxValue?: string | number;
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
  pageKey?: PageKey;
  recoilKey?: Stake_InputKey;
  maxValue?: number;
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
  } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { inputValue, value, setValue } = useInput(pageKey!, recoilKey!);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...inputValue, [atomKey]: event.target.value });
  };

  return (
    <InputGroup w={w || 270} pos={"relative"} {...style}>
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
        _hover={{ borderColor: colorMode === "light" ? "#c6cbd9" : "#535353" }}
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
        value={value[atomKey]}
        onChange={onChange}
      ></Input>
      {isError && (
        <Flex
          pos="absolute"
          bottom={"-22px"}
          fontSize={12}
          color={"#e23738"}
          pl={"16px"}
        >
          <Text>{errorMsg}</Text>
        </Flex>
      )}
      <InputRightElement
        ml={"30px"}
        w={"30px"}
        fontSize={14}
        mr={"12px"}
        cursor={"pointer"}
      >
        <Flex
          w={"30px"}
          h={"20px"}
          color={"#64646f"}
          _hover={{ color: "#2775ff" }}
          onClick={() =>
            maxValue && setValue({ ...inputValue, [atomKey]: maxValue })
          }
        >
          Max
        </Flex>
      </InputRightElement>
    </InputGroup>
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
    pageKey,
    recoilKey,
    maxValue,
  } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { inputValue, value, setValue } = useInput(pageKey!, recoilKey!);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...inputValue, [atomKey]: event.target.value });
  };

  return (
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
        _hover={{ borderColor: colorMode === "light" ? "#c6cbd9" : "#535353" }}
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
        value={value[atomKey]}
      >
        <NumberInputField
          h={"100%"}
          placeholder={placeHolder}
          onChange={onChange}
          border={{}}
        ></NumberInputField>
      </NumberInput>
      <InputRightElement
        ml={"30px"}
        w={"30px"}
        fontSize={14}
        mr={"12px"}
        cursor={"pointer"}
      >
        <Flex
          w={"30px"}
          h={"20px"}
          color={"#64646f"}
          _hover={{ color: "#2775ff" }}
          onClick={() =>
            maxValue && setValue({ ...inputValue, [atomKey]: String(maxValue) })
          }
        >
          Max
        </Flex>
      </InputRightElement>
    </InputGroup>
  );
}

export { TextInput, BalanceInput };
