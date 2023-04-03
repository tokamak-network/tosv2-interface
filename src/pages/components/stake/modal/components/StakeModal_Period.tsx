import { Checkbox, Flex, Text, useColorMode } from "@chakra-ui/react";
import InputPeriod from "common/input/InputPeriod";
import BasicTooltip from "common/tooltip";
import constant from "constant";
import useInput from "hooks/useInput";
import useMediaView from "hooks/useMediaView";
import StakeGraph, {
  PeriodKey,
} from "pages/components/common/modal/StakeGraph";
import { PageKey } from "types";
import { InputKey } from "types/atom";

type StakeModalPeriod = {
  pageKey: PageKey;
  recoilKey: InputKey;
  atomKey: string;
  periodKey: PeriodKey;
  inputPeriodOver: boolean;
  endTimeInfo: {
    leftDays: string | undefined;
    leftHourAndMin: string | undefined;
    newEndTime: string | undefined;
  };
  hasFivedaysLockup?: boolean;
};

export default function StakeModal_Period(props: StakeModalPeriod) {
  const {
    pageKey,
    recoilKey,
    atomKey,
    periodKey,
    inputPeriodOver,
    endTimeInfo: { leftDays, leftHourAndMin, newEndTime },
    hasFivedaysLockup,
  } = props;
  const { colorMode } = useColorMode();
  const { bp700px } = useMediaView();
  const { inputValue, setValue } = useInput(pageKey, recoilKey);
  const { errMsg, stakeModalMaxWeeks } = constant;

  const fiveDaysLockup = hasFivedaysLockup
    ? inputValue.stake_modal_fivedaysLockup
    : false;

  return (
    <Flex rowGap={"9px"} flexDir={"column"} mb={"30px"}>
      <Flex>
        <Flex
          fontSize={12}
          flexDir={"column"}
          alignItems="center"
          mt="10px"
          w={"100%"}
          //   px={bp700px ? "0px" : "70px"}
        >
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            // justifyContent={bp700px ? "space-between" : ""}
            // mb={bp700px ? "10px" : ""}
            mb={"9px"}
          >
            <Text
              fontWeight={600}
              mr={"6px"}
              color={colorMode === "light" ? "gray.800" : "white.200"}
            >
              Set Lock-Up Period
            </Text>
            {hasFivedaysLockup && (
              <Flex>
                <Checkbox
                  size={"lg"}
                  style={{
                    borderRadius: "4px",
                    borderColor: colorMode === "dark" ? "#535353" : "#c6cbd9",
                  }}
                  isChecked={fiveDaysLockup}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const isChecked = e.target.checked;
                    setValue({
                      ...inputValue,
                      fiveDaysLockup: isChecked,
                    });
                  }}
                ></Checkbox>
                <Text
                  ml={"6px"}
                  mr="3px"
                  color={colorMode === "dark" ? "gray.100" : "gray.1000"}
                >
                  5 Days Lock-Up
                </Text>

                <BasicTooltip label="No sTOS is given for 5 day Lock-up option" />
              </Flex>
            )}
          </Flex>
          <InputPeriod
            w={bp700px ? "310px" : "460px"}
            h={"39px"}
            pageKey={"Stake_screen"}
            recoilKey={"stake_modal"}
            atomKey={"stake_modal_period"}
            placeHolder={"1 Weeks"}
            style={{ marginLeft: "auto" }}
            isDisabled={fiveDaysLockup}
            maxValue={stakeModalMaxWeeks}
            isError={inputPeriodOver}
            errorMsg={
              inputValue.stake_modal_period === ""
                ? undefined
                : errMsg.stake.periodIsOver
            }
            leftDays={fiveDaysLockup ? undefined : leftDays}
            leftTime={fiveDaysLockup ? undefined : leftHourAndMin}
            endTime={fiveDaysLockup || inputPeriodOver ? undefined : newEndTime}
          ></InputPeriod>
        </Flex>
      </Flex>
      <Flex w={"100%"} justifyContent={"center"}>
        <StakeGraph
          pageKey={pageKey}
          subKey={recoilKey}
          periodKey={periodKey}
          isSlideDisabled={fiveDaysLockup}
          minValue={0}
        ></StakeGraph>
      </Flex>
    </Flex>
  );
}
