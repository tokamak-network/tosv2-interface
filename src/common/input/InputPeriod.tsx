import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorMode,
  useTheme,
} from "@chakra-ui/react";
import useInput from "hooks/useInput";
import useMediaView from "hooks/useMediaView";
import useModal from "hooks/useModal";
import React, { useEffect, useMemo, useState } from "react";
import { PageKey } from "types";
import { InputKey } from "types/atom";

type InputProp = {
  placeHolder?: string;
  w?: number | string;
  h?: number | string;
  isDisabled?: boolean;
  isManageModal?: boolean;
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
  leftDays?: string;
  leftTime?: string;
  isDisabledText?: string | number;
  endTime?: string;
};

const InputPeriod = (props: InputProp) => {
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
    isDisabledText,
    endTime,
    isManageModal,
  } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [weeksUnit, setWeeksUnit] = useState<"Week" | "Weeks">("Weeks");
  const [weekHighlight, setWeekHighlight] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const { bp700px } = useMediaView();
  const { selectedModal } = useModal();

  const { inputValue, value, setValue } = useInput(pageKey, recoilKey);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 3) {
      return;
    }
    //@ts-ignore
    if (isNaN(event.target.value)) {
      return;
    }
    if (event.target.value.includes(".")) {
      return;
    }
    if (event.target.value.includes(" ")) {
      return;
    }
    if (Number(event.target.value) === 0) {
      // console.log("-1-");

      setWeeksUnit("Weeks");
      setWeekHighlight(false);
    }
    if (Number(event.target.value) > 1) {
      // console.log("-2-");

      setWeeksUnit("Weeks");
      setWeekHighlight(true);
    }
    if (Number(event.target.value) === 1) {
      // console.log("-3-");

      setWeeksUnit("Week");
      setWeekHighlight(true);
    }
    return (
      atomKey &&
      setValue({
        ...inputValue,
        [atomKey]: event.target.value,
      })
    );
  };

  const leftProperty = useMemo(() => {
    if (value && atomKey && value[atomKey]) {
      if (value[atomKey] < 10) return "27px";
      if (value[atomKey] && value[atomKey] < 100) return "37px";
      return "42px";
    }
    return "27px";
  }, [value, atomKey]);

  useEffect(() => {
    if (
      value[atomKey] !== undefined &&
      value[atomKey] !== "" &&
      value[atomKey] !== 0
    ) {
      return setWeekHighlight(true);
    }
  }, [value, atomKey]);

  return (
    <Flex flexDir={"column"} pos={"relative"} {...style}>
      <InputGroup w={"100%"}>
        <Input
          isInvalid={isError}
          isDisabled={isDisabled}
          _disabled={{
            borderColor: colorMode === "light" ? "#e8edf2" : "#2C2C35",
          }}
          w={w || 270}
          h={h || 45}
          ml={"auto"}
          borderRadius={8}
          borderWidth={1}
          borderColor={colorMode === "light" ? "#e8edf2" : "#313442"}
          fontSize={14}
          color={
            weekHighlight === false
              ? "#64646f"
              : colorMode === "light"
              ? "gray.800"
              : isDisabled
              ? "#64646f"
              : "#f1f1f1"
          }
          _placeholder={{ color: "#64646f" }}
          // placeholder={placeHolder}
          _hover={{
            borderColor: colorMode === "light" ? "#c6cbd9" : "#535353",
          }}
          focusBorderColor="none"
          _focus={{
            outline: "none !important",
            color: colorMode === "light" ? "gray.800" : "#f1f1f1",
            boxShadow: "none !important",
            borderColor: colorMode === "light" ? "#9a9aaf" : "#8a8a98",
          }}
          outline="none"
          boxShadow={"none !important"}
          errorBorderColor={isDisabled ? "none" : "#e23738"}
          defaultValue={undefined}
          value={`${
            isDisabled
              ? isDisabledText || "-"
              : value && value[atomKey] === undefined
              ? ""
              : value && value[atomKey]
          }`}
          onChange={onChange}
          // onFocus={() => setIsFocus(true)}
          // onBlur={() => setIsFocus(false)}
        ></Input>
        <Flex
          pos={"absolute"}
          left={leftProperty}
          textAlign={"center"}
          lineHeight={h || "39px"}
          fontSize={14}
          // color={"white.200"}
        >
          {(isDisabled === false || isManageModal === true) &&
            leftDays &&
            leftTime && (
              <>
                <Text
                  // color={weekHighlight === false || isDisabled ? "#64646F" : ""}
                  color={
                    weekHighlight === false
                      ? "#64646f"
                      : colorMode === "light"
                      ? "gray.800"
                      : isDisabled
                      ? "#64646f"
                      : "#f1f1f1"
                  }
                >
                  {weeksUnit}
                </Text>
                <Text
                  fontSize={12}
                  ml={"9px"}
                  mr={"3px"}
                  color={
                    weekHighlight
                      ? colorMode === "dark"
                        ? "#8b8b93"
                        : "#7e7e8f"
                      : ""
                  }
                >
                  {leftDays} {Number(leftDays) === 1 ? "Day" : "Days"}{" "}
                  {leftTime}
                </Text>
              </>
            )}
        </Flex>

        <InputRightElement
          mr={"8px"}
          display="flex"
          alignItems={"center"}
          h={"100%"}
        >
          <Button
            w={"30px"}
            h={"20px"}
            color={colorMode === "dark" ? "#64646f" : "#7e7e8f"}
            _hover={{ color: "#2775ff" }}
            bg={"none"}
            fontSize={14}
            fontWeight={600}
            isDisabled={isDisabled}
            onClick={() => {
              if (inputValue[atomKey] === maxValue) {
                return;
              }
              maxValue && setValue({ ...inputValue, [atomKey]: maxValue });
            }}
          >
            Max
          </Button>
        </InputRightElement>
      </InputGroup>
      {isError && isDisabled === false && (
        <Flex
          w={"100%"}
          fontSize={12}
          color={"#e23738"}
          pos={"absolute"}
          mt={"40px"}
          textAlign={"right"}
          pl={"17px"}
          pt={"6px"}
          justifyContent={"left"}
        >
          <Text>{errorMsg}</Text>
        </Flex>
      )}
      {endTime && !isError && (
        <Flex
          pos={"absolute"}
          top={"48px"}
          w={w || 270}
          justifyContent={bp700px ? "flex-start" : ""}
          pl={bp700px ? "" : "17px"}
        >
          <Text>{endTime.split("(UTC")[0]}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default InputPeriod;
