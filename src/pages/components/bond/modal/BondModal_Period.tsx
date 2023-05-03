import commafy from "@/utils/commafy";
import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { bond_bondModal_input } from "atom/bond/input";
import { bond_modal } from "atom/bond/modal";
import InputPeriod from "common/input/InputPeriod";
import BasicTooltip from "common/tooltip";
import constant from "constant";
import useBondModal from "hooks/bond/useBondModal";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import { useCustomColorMode } from "hooks/style/useCustomColorMode";
import useMediaView from "hooks/useMediaView";
import { useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import BondLockupGraph from "./BondLockupGraph";

function DotLine() {
  const { isDark } = useCustomColorMode();
  return (
    <Box
      w={"100%"}
      h={"1px"}
      border={isDark ? "1px solid #313442" : "1px solid #e8edf2"}
      borderStyle={"dotted"}
      opacity={0.6}
    ></Box>
  );
}

function SliderGraph() {
  const { bond_modal_period } = useRecoilValue(bond_bondModal_input);

  const CustomPoint = (props: any) => {
    const { borderWidth, borderColor, datum } = props;
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

  const graphData = [
    {
      id: "ROI",
      data: roiGraphData,
    },
    {
      id: "BondDiscount",
      data: bonddiscountGraphData,
    },
  ];

  if (roiGraphData.length === 0 || bonddiscountGraphData.length === 0) {
    return null;
  }

  return (
    <Flex pos={"absolute"} w={"101%"} h={"90px"} className={"test"}>
      <ResponsiveLine
        data={graphData}
        colors={["#50d1b2", "#ec8c56"]}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: discountRatePerBondingPrice
            ? discountRatePerBondingPrice[0] - 1
            : 0,
          max: roiPerWeeks ? roiPerWeeks[52] + 1 : 0,
        }}
        margin={{ right: 4 }}
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
        maxW={"460px"}
        className={"DotLine"}
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
  const [bondModalState, setBondModalState] = useRecoilState(bond_modal);
  const { fiveDaysLockup } = bondModalState;
  const { bondModalMaxWeeks, errMsg } = constant;

  const { isDark } = useCustomColorMode();
  const { sTos, modalCondition } = useBondModal();
  const { leftHourAndMin, leftDays } = sTos;
  const { inputPeriodOver, inputPeriodIsEmpty } = modalCondition;
  const { roiPerWeeks, discountRatePerBondingPrice } = useBondModalInputData();

  const FiveDaysLockUpCheckBox = () => (
    <Flex alignItems={"center"}>
      <Checkbox
        size={"lg"}
        style={{
          borderRadius: "4px",
          borderColor: isDark ? "#535353" : "#c6cbd9",
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
        color={isDark ? "gray.100" : "gray.1000"}
        fontSize={bp700px ? 12 : ""}
      >
        5 Days Lock-Up
      </Text>
      <BasicTooltip label="No sTOS is given for 5 day Lock-up option" />
    </Flex>
  );

  const yLegendText = useMemo(() => {
    if (roiPerWeeks && discountRatePerBondingPrice) {
      const range = roiPerWeeks[52] - discountRatePerBondingPrice[0];

      const topLabel = commafy(roiPerWeeks[52], 0);
      const lastLabel = commafy(discountRatePerBondingPrice[0], 0);
      const secondLabel = commafy(
        range * 0.6 + discountRatePerBondingPrice[0],
        0
      );
      const thridLabel = commafy(
        range * 0.3 + discountRatePerBondingPrice[0],
        0
      );

      return { topLabel, secondLabel, thridLabel, lastLabel };
    }
    return undefined;
  }, [roiPerWeeks, discountRatePerBondingPrice]);

  return (
    <Flex rowGap={"9px"} flexDir={"column"}>
      <Flex
        columnGap={"3px"}
        alignItems={"center"}
        h={"17px"}
        pl={bp700px ? "" : "70px"}
        mb={"17.5px"}
        justifyContent={"space-between"}
      >
        <Flex columnGap={"3px"}>
          <Text
            fontWeight={600}
            color={isDark ? "white.200" : "gray.800"}
            fontSize={"12px"}
          >
            Lock-Up Period
          </Text>
          <BasicTooltip label="Bonding gives LTOS that cannot be unstaked for TOS until the lock-up period ends. The longer the lock-up period, the higher the discount. To maximize ROI, only bond when the discount is positive. Otherwise, it is more profitable to purchase TOS from the open market and stake them for LTOS." />
        </Flex>
        {bp700px && <FiveDaysLockUpCheckBox />}
      </Flex>
      <Flex
        w={"100%"}
        justifyContent={"center"}
        // px={bp700px ? "10px" : ""}
        mb={"30px"}
        pos={"relative"}
        ml={bp700px ? "" : "-10px"}
        h={"90px"}
        maxH={"90px"}
        minH={"90px"}
        pl={"20px"}
        opacity={fiveDaysLockup ? 0.25 : 1}
      >
        <Flex
          top={"-8px"}
          flexDir={"column"}
          textAlign={"right"}
          fontSize={11}
          color={isDark ? "#64646f" : "#9a9aaf"}
          h={"100%"}
          maxH={"90px"}
          left={bp700px ? "-20px" : "40px"}
          pos={"absolute"}
          alignItems={"flex-end"}
          rowGap={"13px"}
          w={"35px"}
        >
          <Text>{yLegendText?.topLabel}%</Text>
          <Text>{yLegendText?.secondLabel}%</Text>
          <Text>{yLegendText?.thridLabel}%</Text>
          <Text>{yLegendText?.lastLabel}%</Text>
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
          <Flex w={"100%"} columnGap={"21px"}>
            <InputPeriod
              w={bp700px ? "100%" : "301px"}
              style={{ width: bp700px ? "100%" : "" }}
              h={"45px"}
              pageKey={"Bond_screen"}
              recoilKey={"bond_modal"}
              atomKey={"bond_modal_period"}
              placeHolder={"1 Weeks"}
              isDisabled={fiveDaysLockup}
              isDisabledText={"5 Days"}
              rightUnit={"Weeks"}
              maxValue={bondModalMaxWeeks}
              minValue={1}
              isError={inputPeriodOver || inputPeriodIsEmpty}
              errorMsg={inputPeriodOver ? errMsg.bond.periodIsOver : ""}
              leftTime={leftHourAndMin}
              leftDays={leftDays}
              // endTime={fiveDaysLockup || inputPeriodOver ? undefined : endTime}
            ></InputPeriod>
            {!bp700px && <FiveDaysLockUpCheckBox />}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
