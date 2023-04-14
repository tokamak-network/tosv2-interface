import { Box, Checkbox, Flex, Text, useColorMode } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { bond_bondModal_input } from "atom/bond/input";
import { bond_modal } from "atom/bond/modal";
import InputPeriod from "common/input/InputPeriod";
import BasicTooltip from "common/tooltip";
import constant from "constant";
import useBondModal from "hooks/bond/useBondModal";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import useMediaView from "hooks/useMediaView";
import { useRecoilState, useRecoilValue } from "recoil";
import BondLockupGraph from "./BondLockupGraph";

function DotLine() {
  return (
    <Box
      w={"100%"}
      h={"1px"}
      border={"1px solid #313442"}
      borderStyle={"dotted"}
      opacity={0.6}
    ></Box>
  );
}

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

  const roiGraphData = [];
  const bonddiscountGraphData = [];
  const { roiPerWeeks, discountRatePerBondingPrice } = useBondModalInputData();

  if (roiPerWeeks && discountRatePerBondingPrice) {
    for (let i = 0; i < 53; i++) {
      roiGraphData.push({
        x: i,
        y: roiPerWeeks[i],
        dataIndex: i,
        id: "ROI",
      });
      bonddiscountGraphData.push({
        x: i,
        y: discountRatePerBondingPrice[i],
        dataIndex: i,
        id: "BondDiscount",
      });
    }
  }

  const testData = [
    {
      id: "ROI",
      data: roiGraphData,
    },
    {
      id: "BondDiscount",
      data: bonddiscountGraphData,
    },
  ];

  return (
    <Flex pos={"absolute"} w={"100%"} h={"90px"}>
      <ResponsiveLine
        data={testData}
        colors={["#50d1b2", "#ec8c56"]}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: discountRatePerBondingPrice ? discountRatePerBondingPrice[0] : 0,
          max: roiPerWeeks ? roiPerWeeks[52] : 0,
        }}
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
      <Flex
        pos={"absolute"}
        w={"100%"}
        h={"100%"}
        flexDir={"column"}
        justifyContent={"space-between"}
        zIndex={-1}
      >
        <DotLine />
        <DotLine />
        <DotLine />
        <DotLine />
      </Flex>
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
  const { roiPerWeeks, discountRatePerBondingPrice } = useBondModalInputData();

  return (
    <Flex rowGap={"9px"} flexDir={"column"}>
      <Flex
        w={"100%"}
        justifyContent={"center"}
        // px={bp700px ? "10px" : ""}
        mt={"32px"}
        mb={"30px"}
        pos={"relative"}
        ml={bp700px ? "" : "-14px"}
        h={"90px"}
        maxH={"90px"}
        minH={"90px"}
      >
        <Flex
          top={"5px"}
          flexDir={"column"}
          textAlign={"right"}
          fontSize={11}
          color={"#64646f"}
          h={"100%"}
          maxH={"90px"}
          mr={"5px"}
          mb={"32px"}
        >
          <Text h={"16px"} pt={"3px"}>
            {roiPerWeeks && roiPerWeeks[52]}%
          </Text>
          <Text mt={"40px"} mb={"22px"} h={"16px"}></Text>
          <Text h={"16px"}>
            {discountRatePerBondingPrice && discountRatePerBondingPrice[0]}%
          </Text>
        </Flex>
        <Flex pos={"relative"} w={"100%"} maxW={"460px"}>
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
      <Flex>
        <Flex
          fontSize={12}
          flexDir={"column"}
          alignItems="center"
          mt="40px"
          w={"100%"}
          px={bp700px ? "0px" : "70px"}
        >
          <Flex
            w={"100%"}
            justifyContent={"space-between"}
            // justifyContent={bp700px ? "space-between" : ""}
            // mb={bp700px ? "10px" : ""}
            mb={"8px"}
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
          <Flex w={"100%"}>
            <InputPeriod
              w={bp700px ? "100%" : "460px"}
              h={"39px"}
              pageKey={"Bond_screen"}
              recoilKey={"bond_modal"}
              atomKey={"bond_modal_period"}
              placeHolder={"1 Weeks"}
              style={{ w: "100%" }}
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
      </Flex>
    </Flex>
  );
}
