import commafy from "@/utils/commafy";
import {
  Flex,
  Text,
  useColorMode,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import useInput from "hooks/useInput";
import { useEffect, useMemo, useState } from "react";
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
    bottom: "22px",
    ml: "-1",
    fontSize: "11px",
    color: "#64646f",
  };
  const { inputValue, value, setValue } = useInput(pageKey, subKey);
  const [sliderValue, setSliderValue] = useState<number | undefined>(undefined);
  const { colorMode } = useColorMode();
  const [isChanged, setIsChanged] = useState(false);

  const { bondDiscount, roi, roiPerWeeks, discountRatePerBondingPrice } =
    useBondModalInputData();

  const tooltipInfo = useMemo(() => {
    if (sliderValue === undefined) {
      return { roi: "-", discountRate: "-" };
    }
    if (isSlideDisabled && bondDiscount && roi) {
      return { roi: commafy(roi, 1), discountRate: commafy(bondDiscount, 1) };
    }
    if (roiPerWeeks && discountRatePerBondingPrice && sliderValue) {
      return {
        roi: commafy(roiPerWeeks[sliderValue], 1),
        discountRate: commafy(discountRatePerBondingPrice[sliderValue], 1),
      };
    }
    return { roi: "-", discountRate: "-" };
  }, [
    isSlideDisabled,
    sliderValue,
    bondDiscount,
    roi,
    roiPerWeeks,
    discountRatePerBondingPrice,
  ]);

  useEffect(() => {
    if (sliderValue !== 0) {
      setIsChanged(true);
    }
  }, [sliderValue]);

  useEffect(() => {
    if (balanceKey && isChanged && sliderValue) {
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
  }, [isSlideDisabled]);

  return (
    <Flex w={"100%"} h="70px" pos="relative" mt={"70px"}>
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
        <SliderMark value={1} {...labelStyles}>
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
          w={"156px"}
          h={isSlideDisabled ? "78px" : "53px"}
          borderRadius={8}
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          textAlign="center"
          fontSize={"15px"}
          fontWeight={600}
          left={
            sliderValue === undefined || sliderValue < 33 ? "90px" : "-90px"
          }
          bottom={"33px"}
          opacity={"0.75 !important"}
          label={
            <Flex
              flexDir={"column"}
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
                <Text
                  color={Number(tooltipInfo.roi) < 0 ? "red.100" : "blue.100"}
                  fontWeight={600}
                >
                  {tooltipInfo.roi} %
                </Text>
              </Flex>
              <Flex
                alignItems={"center"}
                columnGap={"6px"}
                justifyContent={"left"}
                w={"100%"}
              >
                <Box w={"6px"} h={"6px"} borderRadius={25} bg={"#ec8c56"}></Box>
                <Text>Bond Discount</Text>
                <Text
                  color={
                    Number(tooltipInfo.discountRate) < 0
                      ? "red.100"
                      : "blue.100"
                  }
                  fontWeight={600}
                >
                  {tooltipInfo.discountRate} %
                </Text>
              </Flex>
              {isSlideDisabled && (
                <Flex>
                  <Text fontSize={11} color={"#8b8b93"}>
                    Lock-Up Period :{" "}
                    <span style={{ color: "#d0d0da", fontWeight: 600 }}>
                      5 Days
                    </span>
                  </Text>
                </Flex>
              )}
            </Flex>
          }
          isOpen={true}
        >
          <SliderThumb pos={"relative"}>
            <Box
              pos={"absolute"}
              w={"1px"}
              h={"139px"}
              bottom={"9px"}
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
