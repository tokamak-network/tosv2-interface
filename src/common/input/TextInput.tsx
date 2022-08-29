import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import { inputBalanceState, inputState } from "atom/global/input";
import useInput from "hooks/useInput";
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
  atomKey: string;
  style?: any;
  pageKey?: PageKey;
  recoilKey?: Stake_InputKey;
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
  } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { inputValue, value, setValue } = useInput(pageKey!, recoilKey!);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...inputValue, [atomKey]: event.target.value });
  };

  return (
    <InputGroup w={w || 270} {...style}>
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
        _focus={{
          outline: "none",
          color: colorMode === "light" ? "gray.800" : "#f1f1f1",
          boxShadow: "",
          borderColor: colorMode === "light" ? "#9a9aaf" : "#8a8a98",
        }}
        outline="none"
        errorBorderColor={"#e23738"}
        //@ts-ignore
        value={value?.atomKey}
        onChange={onChange}
      ></Input>
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
        >
          Max
        </Flex>
      </InputRightElement>
    </InputGroup>
  );
};

function BalanceInput(props: InputProp) {
  const {
    placeHolder,
    w,
    h,
    isDisabled,
    atomKey,
    isError,
    pageKey,
    recoilKey,
  } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const { inputValue, value, setValue } = useInput(pageKey!, recoilKey!);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...inputValue, [atomKey]: event.target.value });
  };

  console.log("--recoilKey");
  console.log(pageKey, recoilKey);

  return (
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
        //@ts-ignore
        value={value?.atomKey}
        onChange={onChange}
      ></Input>
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
        >
          Max
        </Flex>
      </InputRightElement>
    </InputGroup>
  );
}

export { TextInput, BalanceInput };
