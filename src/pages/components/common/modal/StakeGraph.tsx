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

function StakeGraph(props: {
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
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
  const { inputValue, value, setValue } = useInput(pageKey, subKey);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (sliderValue !== 0) {
      setIsChanged(true);
    }
  }, [sliderValue]);

  useEffect(() => {
    if (balanceKey && isChanged) {
      console.log("go");
      if (
        inputValue[balanceKey] === "" ||
        inputValue[balanceKey] === undefined
      ) {
        console.log("go2");

        return setValue({
          ...inputValue,
          [balanceKey]: 0,
          [periodKey]: sliderValue,
        });
      }
    }
    return setValue({ ...inputValue, [periodKey]: sliderValue });
  }, [sliderValue, periodKey, balanceKey]);

  useEffect(() => {
    if (inputValue[periodKey])
      return setSliderValue(Number(inputValue[periodKey]));
  }, [inputValue, periodKey]);

  useEffect(() => {
    if (isSlideDisabled) return setSliderValue(0);
  }, [isSlideDisabled]);

  return (
    <Flex w={"100%"} h="70px" pos="relative">
      <Slider
        focusThumbOnChange={false}
        aria-label="slider-ex-1"
        defaultValue={0}
        min={1}
        max={156}
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
        // onMouseEnter={() => setShowTooltip(true)}
        // onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={0} {...labelStyles}>
          7d
        </SliderMark>
        {/* <SliderMark value={8} {...labelStyles}>
          1m
        </SliderMark>
        <SliderMark value={24} {...labelStyles}>
          6m
        </SliderMark> */}
        <SliderMark value={52} {...labelStyles}>
          1y
        </SliderMark>
        <SliderMark value={104} {...labelStyles}>
          2y
        </SliderMark>
        <SliderMark value={156} {...labelStyles}>
          3y
        </SliderMark>

        {/* <SliderMark value={25} {...labelStyles}>
          25%
        </SliderMark> */}
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
          <SliderFilledTrack bg={"#2775ff"} />
          {minValue && (
            <SliderFilledTrack
              maxW={`${(minValue / 156) * 100}%`}
              bg={"#2bb415"}
            />
          )}
        </SliderTrack>
        <Tooltip
          color={colorMode === "light" ? "#07070c" : "#f1f1f1"}
          placement="top"
          bg={"transparent"}
          w={"50px"}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          textAlign="center"
          fontSize={"15px"}
          fontWeight={600}
          isOpen={showTooltip}
          label={`${sliderValue} sTOS`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Flex>
  );
}

export default StakeGraph;
