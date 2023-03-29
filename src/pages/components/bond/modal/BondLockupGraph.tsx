import {
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useTheme,
  useColorMode,
  Link,
  Box,
  Input,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";
import constant from "constant";
import useInput from "hooks/useInput";
import { useEffect, useState } from "react";
import { PageKey } from "types";
import { InputKey } from "types/atom";

type PeriodKey =
  | "bond_modal_period"
  | "stake_modal_period"
  | "stake_updateModal_period"
  | "stake_relockModal_period";

type BalanceKey = "stake_updateModal_tos_balance";

function BondLockupGraph(props: {
  pageKey: PageKey;
  subKey: InputKey;
  periodKey: PeriodKey;
  balanceKey?: BalanceKey;
  isSlideDisabled: boolean;
  minValue?: number;
}) {
  const { pageKey, subKey, periodKey, balanceKey, isSlideDisabled, minValue } =
    props;
  const labelStyles = {
    mt: "49px",
    ml: "-1",
    fontSize: "11px",
    color: "#64646f",
  };
  const { inputValue, value, setValue } = useInput(pageKey, subKey);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const { colorMode } = useColorMode();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (sliderValue !== 0) {
      setIsChanged(true);
    }
  }, [sliderValue]);

  useEffect(() => {
    if (balanceKey && isChanged) {
      if (
        inputValue[balanceKey] === "" ||
        inputValue[balanceKey] === undefined
      ) {
        return setValue({
          ...inputValue,
          [balanceKey]: 0,
          [periodKey]: sliderValue,
        });
      }
    }
    return setValue({ ...inputValue, [periodKey]: sliderValue });
  }, [sliderValue, periodKey, balanceKey, isChanged]);

  useEffect(() => {
    if (inputValue[periodKey])
      return setSliderValue(Number(inputValue[periodKey]));
  }, [inputValue, periodKey]);

  useEffect(() => {
    if (isSlideDisabled) return setSliderValue(0);
    return setSliderValue(constant.modalMaxWeeks);
  }, [isSlideDisabled]);

  return (
    <Flex w={"460px"} h="70px" pos="relative">
      <Slider
        focusThumbOnChange={false}
        aria-label="slider-ex-1"
        defaultValue={0}
        min={0}
        max={52}
        value={sliderValue}
        onChange={(val: number) => {
          if (minValue && minValue > val) {
            return setSliderValue(minValue);
          }
          return setSliderValue(val);
        }}
        h={"10px"}
        alignSelf={"end"}
        isDisabled={isSlideDisabled}
      >
        <SliderMark value={0} {...labelStyles}>
          7d
        </SliderMark>
        <SliderMark value={9} {...labelStyles}>
          10w
        </SliderMark>
        <SliderMark value={19} {...labelStyles}>
          20w
        </SliderMark>
        <SliderMark value={29} {...labelStyles}>
          30w
        </SliderMark>
        <SliderMark value={39} {...labelStyles}>
          40w
        </SliderMark>
        <SliderMark value={52} {...labelStyles}>
          1y
        </SliderMark>
        {/* <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {sliderValue} STOS
        </SliderMark> */}

        <SliderTrack bg={colorMode === "light" ? "#e7edf3" : "#353d48"}>
          <SliderFilledTrack bg={"#2bb415"} />
          {minValue && (
            <SliderFilledTrack
              maxW={`${(minValue / 155) * 100}%`}
              bg={"#2775ff"}
            />
          )}
        </SliderTrack>
        <Tooltip
          color={colorMode === "light" ? "#d0d0da" : "#d0d0da"}
          placement="top"
          bg={"#1f2128"}
          w={"115px"}
          h={"53px"}
          borderRadius={8}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          textAlign="center"
          fontSize={"15px"}
          fontWeight={600}
          left={"70px"}
          bottom={"-18px"}
          label={
            <Flex
              flexDir={"column"}
              alignItems={"center"}
              fontSize={11}
              rowGap={"3px"}
              fontWeight={"normal"}
            >
              <Flex
                alignItems={"center"}
                columnGap={"6px"}
                justifyContent={"left"}
                w={"100%"}
              >
                <Box w={"6px"} h={"6px"} borderRadius={25} bg={"#50d1b2"}></Box>
                <Text>ROI</Text>
              </Flex>
              <Flex
                alignItems={"center"}
                columnGap={"6px"}
                justifyContent={"left"}
                w={"100%"}
              >
                <Box w={"6px"} h={"6px"} borderRadius={25} bg={"#ec8c56"}></Box>
                <Text>Bond Discount</Text>
              </Flex>
            </Flex>
          }
          isOpen={true}
        >
          <SliderThumb>
            <Box
              w={"1px"}
              h={"90px"}
              bg={"white.100"}
              opacity={0.1}
              zIndex={-100}
            ></Box>
          </SliderThumb>
        </Tooltip>
      </Slider>
    </Flex>
  );
}

export default BondLockupGraph;
