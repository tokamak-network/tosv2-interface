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
import React, {
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  minValue?: number;
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
  minValue?: number;
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
    minValue,
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
          errorBorderColor={isDisabled ? "none" : "#e23738"}
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
      {isError && isDisabled === false && (
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
  const inputRef = useRef<HTMLInputElement>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    if (String(newValue).split(".").length >= 3) {
      // const index = newValue.lastIndexOf(".");
      // newValue = newValue.substring(0, index);
      return;
    }
    //@ts-ignore
    if (isNaN(event.target.value)) {
      return;
    }
    if (event.target.value.includes(" ")) {
      return;
    }
    if (newValue === ".") {
      return;
    }
    if (newValue === "-") {
      return;
    }
    return setValue({
      ...inputValue,
      [atomKey]: newValue,
    });
  };

  useEffect(() => {
    if (maxValue && atomKey) {
      return setValue({ ...inputValue, [atomKey]: String(maxValue) });
    }
  }, [maxValue, selectedModal, atomKey, setValue]);

  const leftProperty = useMemo(() => {
    // console.log("inputRef");
    //@ts-ignore
    if (inputRef.current && inputRef.current.value) {
      // if (inputRef.current.value.length === 1) {
      //   return "26px";
      // }
      // if (inputRef.current.value.length === 2) {
      //   return "35px";
      // }
      // console.log(inputRef.current.value.length * 9 + 17);

      return `${inputRef.current.value.length * 9 + 17}px`;
    }
  }, [inputRef?.current?.value]);

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
          display={"flex"}
        >
          <NumberInputField
            h={"100%"}
            placeholder={placeHolder}
            onChange={onChange}
            fontSize={14}
            border={{}}
            //@ts-ignore
            ref={inputRef}
          ></NumberInputField>
        </NumberInput>
        {value[atomKey] && rightUnit && (
          <Flex
            pos={"absolute"}
            textAlign={"center"}
            lineHeight={"45px"}
            fontSize={14}
            left={leftProperty}
            color={colorMode === "light" ? "gray.800" : "#f1f1f1"}
          >
            <Text>{rightUnit}</Text>
          </Flex>
        )}
        <InputRightElement ml={"30px"} w={"30px"} mr={"12px"}>
          <Button
            w={"30px"}
            h={"20px"}
            color={"#64646f"}
            _hover={{ color: "#2775ff" }}
            bg={"none"}
            fontSize={14}
            fontWeight={600}
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
        <Flex
          fontSize={12}
          color={"#e23738"}
          justifyContent={"flex-start"}
          pl={"6px"}
        >
          <Text>{errorMsg}</Text>
        </Flex>
      )}
    </Flex>
  );
}

export { TextInput, BalanceInput };
