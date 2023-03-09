import { Checkbox, Flex, Text, useColorMode } from "@chakra-ui/react";
import {
  bond_modal,
  bond_modal_state,
  T_BondModalValues,
} from "atom/bond/modal";
import CustomCheckBox from "common/input/CustomCheckBox";
import InputPeriod from "common/input/InputPeriod";
import BasicTooltip from "common/tooltip";
import constant from "constant";
import useBondModal from "hooks/bond/useBondModal";
import useBondModalCondition from "hooks/bond/useBondModalCondition";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import useStosReward from "hooks/stake/useStosReward";
import useInput from "hooks/useInput";
import useMediaView from "hooks/useMediaView";
import StakeGraph from "pages/components/common/modal/StakeGraph";
import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";

export default function BondModal_Period() {
  const { bp700px } = useMediaView();
  const { colorMode } = useColorMode();
  const [bondModalState, setBondModalState] = useRecoilState(bond_modal);
  const { fiveDaysLockup, fiveDaysLockupEndTime } = bondModalState;
  const { modalMaxWeeks: LOCKTOS_maxWeeks, errMsg } = constant;

  const { sTos, modalCondition, bondModalInputData } = useBondModal();
  const { leftHourAndMin, leftDays } = sTos;
  const { inputPeriodOver } = modalCondition;
  const { endTime } = bondModalInputData;

  return (
    <Flex rowGap={"9px"} flexDir={"column"} mb={"30px"}>
      <Flex>
        <Flex
          fontSize={12}
          flexDir={"column"}
          alignItems="center"
          mt="10px"
          w={"100%"}
          px={"70px"}
        >
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            // justifyContent={bp700px ? "space-between" : ""}
            // mb={bp700px ? "10px" : ""}
            mb={"9px"}
          >
            <Text
              mr={"6px"}
              color={colorMode === "light" ? "gray.800" : "white.200"}
            >
              Set Lock-Up Period
            </Text>
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
                  setBondModalState({
                    ...bondModalState,
                    fiveDaysLockup: isChecked,
                  });
                }}
              ></Checkbox>
              <Text ml={"6px"} mr="3px">
                5 Days Lock-Up
              </Text>

              <BasicTooltip label="No sTOS is given for 5 day Lock-up option" />
            </Flex>
          </Flex>
          <InputPeriod
            w={bp700px ? "310px" : "460px"}
            h={"39px"}
            pageKey={"Bond_screen"}
            recoilKey={"bond_modal"}
            atomKey={"bond_modal_period"}
            placeHolder={"1 Weeks"}
            style={{ marginLeft: "auto" }}
            isDisabled={fiveDaysLockup}
            isDisabledText={"5 Days"}
            rightUnit={"Weeks"}
            maxValue={LOCKTOS_maxWeeks}
            minValue={1}
            isError={inputPeriodOver}
            errorMsg={errMsg.periodExceed}
            leftTime={leftHourAndMin}
            leftDays={leftDays}
            endTime={fiveDaysLockup || inputPeriodOver ? undefined : endTime}
          ></InputPeriod>
        </Flex>
      </Flex>
      <Flex w={"600px"} px={bp700px ? "30px" : ""}>
        <StakeGraph
          pageKey={"Bond_screen"}
          subKey={"bond_modal"}
          periodKey={"bond_modal_period"}
          isSlideDisabled={fiveDaysLockup}
          minValue={1}
        ></StakeGraph>
      </Flex>
    </Flex>
  );
}
