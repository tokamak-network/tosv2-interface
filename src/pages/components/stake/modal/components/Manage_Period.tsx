import { Flex, Text, useColorMode } from "@chakra-ui/react";
import BasicTooltip from "common/tooltip";
import useUpdateModalData from "hooks/stake/useUpdateModalData";
import useMediaView from "hooks/useMediaView";
import Image from "next/image";
import ArrowDownImg from "assets/icons/arrow-Down.svg";
import ArrowImg from "assets/icons/arrow-right2.svg";
import InputPeriod from "common/input/InputPeriod";
import constant from "constant";
import useManageModalConditon from "hooks/stake/useManageModalCondition";
import useInput from "hooks/useInput";

export function Manage_Period() {
  const { colorMode } = useColorMode();
  const { bp700px } = useMediaView();
  const { newEndTime, leftWeeks, leftDays, leftTime } = useUpdateModalData();
  const {
    inputOver,
    inputPeriodOver,
    btnDisabled,
    zeroInputBalance,
    inputBalanceIsEmpty,
    inputPeriodIsEmpty,
    bothConditionsErr,
  } = useManageModalConditon(leftWeeks);

  const { inputValue, setResetValue, setValue } = useInput(
    "Stake_screen",
    "update_modal"
  );

  console.log(inputValue);

  return (
    <Flex flexDir={"column"}>
      <Text
        color={colorMode === "light" ? "gray.800" : "white.200"}
        fontSize={12}
        mb={"10px"}
      >
        New Lock-Up Period
      </Text>
      <Flex
        w={bp700px ? "100%" : ""}
        justifyContent={bp700px ? "space-between" : ""}
        fontSize={12}
        alignItems={bp700px ? "" : "center"}
        flexDir={bp700px ? "column" : "row"}
      >
        <Flex
          w={bp700px ? "100%" : "204px"}
          h={"39px"}
          border={
            colorMode === "dark" ? "1px solid #313442" : "1px solid #e8edf2"
          }
          borderRadius={8}
          alignItems={"center"}
          pl={"15px"}
          fontSize={14}
          color={"#64646f"}
        >
          <Text>
            {leftWeeks} {leftWeeks < 2 ? "Week" : "Weeks"}
          </Text>
          <Text fontSize={12} ml={"9px"} mr={"3px"}>
            {leftDays} Days {leftTime}
          </Text>
          <Flex ml={bp700px ? "auto" : ""} mr={bp700px ? "8px" : ""}>
            <BasicTooltip
              label={
                "This is the current Lock-Up period. The new Lock-Up period has to be equal or greater than this."
              }
            />
          </Flex>
        </Flex>
        <Flex
          mx={"14px"}
          my={bp700px ? "9px" : ""}
          justifyContent={bp700px ? "center" : ""}
        >
          <Image
            src={bp700px ? ArrowDownImg : ArrowImg}
            alt={"ArrowImg"}
          ></Image>
        </Flex>
        <InputPeriod
          w={bp700px ? "100%" : "220px"}
          h={"39px"}
          atomKey={"stake_updateModal_period"}
          pageKey={"Stake_screen"}
          recoilKey={"update_modal"}
          maxValue={constant.stakeModalMaxWeeks}
          isError={bothConditionsErr || inputPeriodOver || inputPeriodIsEmpty}
          isDisabled={leftWeeks === constant.stakeModalMaxWeeks}
          isDisabledText={constant.stakeModalMaxWeeks}
          errorMsg={
            bothConditionsErr || inputPeriodIsEmpty
              ? undefined
              : inputPeriodOver
              ? constant.errMsg.stake.periodIsOver
              : constant.errMsg.stake.newLockupPeriodIsSmaller
          }
          minValue={leftWeeks}
          leftDays={leftDays}
          leftTime={leftTime}
          endTime={
            bothConditionsErr ||
            Number(inputValue.stake_updateModal_period) < leftWeeks ||
            inputValue?.stake_updateModal_period?.length === 0 ||
            Number(inputValue.stake_updateModal_period) > 155
              ? undefined
              : newEndTime
          }
          isManageModal={true}
        ></InputPeriod>
      </Flex>
    </Flex>
  );
}
