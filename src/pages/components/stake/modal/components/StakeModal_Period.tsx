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
  inputPeriodIsEmpty: boolean;
  endTimeInfo: {
    leftDays: string | undefined;
    leftHourAndMin: string | undefined;
    newEndTime: string | undefined;
  };
  hasFivedaysLockup?: boolean;
};

export default function StakeModal_Period<T>(props: StakeModalPeriod) {
  const {
    pageKey,
    recoilKey,
    atomKey,
    periodKey,
    inputPeriodOver,
    inputPeriodIsEmpty,
    endTimeInfo: { leftDays, leftHourAndMin, newEndTime },
    hasFivedaysLockup,
  } = props;
  const { colorMode } = useColorMode();
  const { bp700px } = useMediaView();
  const { inputValue, setValue } = useInput(pageKey, recoilKey);
  const { errMsg, stakeModalMaxWeeks } = constant;

  const fiveDaysLockup = hasFivedaysLockup
    ? inputValue?.stake_modal_fivedaysLockup
    : false;

  return (
    <Flex rowGap={"9px"} flexDir={"column"} mb={"30px"} alignItems={"center"}>
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
                      stake_modal_fivedaysLockup: isChecked,
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
            pageKey={pageKey}
            recoilKey={recoilKey}
            atomKey={atomKey}
            style={{ marginLeft: "auto" }}
            isDisabled={fiveDaysLockup}
            maxValue={stakeModalMaxWeeks}
            isError={inputPeriodOver || inputPeriodIsEmpty}
            errorMsg={inputPeriodOver ? errMsg.stake.periodIsOver : ""}
            leftDays={fiveDaysLockup ? undefined : leftDays}
            leftTime={fiveDaysLockup ? undefined : leftHourAndMin}
            endTime={fiveDaysLockup || inputPeriodOver ? undefined : newEndTime}
          ></InputPeriod>
        </Flex>
      </Flex>
      {/* set mt 10px to make a little gap more between the graph and inputComponent for the design(78px gap) */}
      <Flex w={"600px"} justifyContent={"center"} mt={"10px"}>
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
