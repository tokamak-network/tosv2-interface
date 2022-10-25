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
import React, { SetStateAction, useEffect, useMemo, useState } from "react";
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
  leftDays: string;
  leftTime: string;
};

const InputPeriod: React.FC<InputProp> = (props) => {
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
    leftDays,
    leftTime,
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

  const leftProperty = useMemo(() => {
    if (value[atomKey]) {
      if (value[atomKey] < 10 || value[atomKey] === undefined) return "27px";
      if (value[atomKey] && value[atomKey] < 100) return "37px";
      return "42px";
    }
    return "27px";
  }, [value, atomKey]);

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
        <Flex
          pos={"absolute"}
          left={leftProperty}
          textAlign={"center"}
          lineHeight={"39px"}
          fontSize={14}
          color={"white.200"}
        >
          <Text>Weeks</Text>
          <Text fontSize={12} ml={"9px"} mr={"3px"} color={"#8b8b93"}>
            {leftDays} Days {leftTime}
          </Text>
        </Flex>

        <InputRightElement mr={"8px"} display="flex" alignItems={"center"}>
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

export default InputPeriod;
