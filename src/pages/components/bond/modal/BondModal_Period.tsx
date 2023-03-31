import { Checkbox, Flex, Text, useColorMode } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { bond_bondModal_input } from "atom/bond/input";

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
import useMediaView from "hooks/useMediaView";
import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import BondLockupGraph from "./BondLockupGraph";

function SliderGraph() {
  const { colorMode } = useColorMode();
  const { bond_modal_period } = useRecoilValue(bond_bondModal_input);

  const CustomPoint = (props: any) => {
    const { currentPoint, borderWidth, borderColor, points, datum } = props;
    const { dataIndex, id } = datum;

    if (bond_modal_period !== dataIndex) {
      return null;
    }

    return (
      <g>
        <circle
          fill="#ffffff"
          r={3}
          strokeWidth={borderWidth}
          stroke={borderColor}
        />
        <circle
          r={2}
          strokeWidth={borderWidth}
          stroke={borderColor}
          fill={id === "ROI" ? "#50d1b2" : "#ec8c56"}
        />
      </g>
    );
  };

  const roiTestData = [];
  const bonddiscountTestData = [];

  for (let i = 0; i < 53; i++) {
    roiTestData.push({ x: i, y: -10 + i, dataIndex: i, id: "ROI" });
    bonddiscountTestData.push({
      x: i,
      y: -40 + i,
      dataIndex: i,
      id: "BondDiscount",
    });
  }

  const testData = [
    {
      id: "ROI",
      data: roiTestData,
    },
    {
      id: "BondDiscount",
      data: bonddiscountTestData,
    },
  ];

  return (
    <Flex pos={"absolute"} w={"460px"} h={"90px"}>
      <ResponsiveLine
        data={testData}
        colors={["#50d1b2", "#ec8c56"]}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: -40, max: 50 }}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        axisBottom={null}
        lineWidth={1}
        pointSymbol={CustomPoint}
        // enablePoints={true}
        enableGridX={false}
        enableGridY={false}
      ></ResponsiveLine>
    </Flex>
  );
}

export default function BondModal_Period() {
  const { bp700px } = useMediaView();
  const { colorMode } = useColorMode();
  const [bondModalState, setBondModalState] = useRecoilState(bond_modal);
  const { fiveDaysLockup, fiveDaysLockupEndTime } = bondModalState;
  const { bondModalMaxWeeks, errMsg } = constant;

  const { sTos, modalCondition, bondModalInputData } = useBondModal();
  const { leftHourAndMin, leftDays } = sTos;
  const { inputPeriodOver, inputPeriodIsEmpty } = modalCondition;
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
          px={bp700px ? "0px" : "70px"}
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
              <Text
                ml={"6px"}
                mr="3px"
                color={colorMode === "dark" ? "gray.100" : "gray.1000"}
              >
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
            maxValue={bondModalMaxWeeks}
            minValue={1}
            isError={inputPeriodOver || inputPeriodIsEmpty}
            errorMsg={inputPeriodOver ? errMsg.bond.periodIsOver : ""}
            leftTime={leftHourAndMin}
            leftDays={leftDays}
            endTime={fiveDaysLockup || inputPeriodOver ? undefined : endTime}
          ></InputPeriod>
        </Flex>
      </Flex>
      <Flex
        w={"100%"}
        justifyContent={"center"}
        px={bp700px ? "10px" : ""}
        mt={"32px"}
        mb={"30px"}
        pos={"relative"}
      >
        <Flex
          pos={"absolute"}
          top={"5px"}
          left={7}
          flexDir={"column"}
          textAlign={"right"}
          fontSize={11}
          color={"#64646f"}
        >
          <Text>50%</Text>
          <Text mt={"34px"} mb={"24px"}>
            0%
          </Text>
          <Text>-40%</Text>
        </Flex>
        <SliderGraph />
        <BondLockupGraph
          pageKey={"Bond_screen"}
          subKey={"bond_modal"}
          periodKey={"bond_modal_period"}
          isSlideDisabled={fiveDaysLockup}
          minValue={1}
        ></BondLockupGraph>
      </Flex>
    </Flex>
  );
}
