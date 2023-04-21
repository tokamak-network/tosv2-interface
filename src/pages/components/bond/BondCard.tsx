import { Flex, useColorMode, useTheme, Box, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { selectedTxState } from "atom/global/tx";
import BasicButton from "common/button/BasicButton";
import useMediaView from "hooks/useMediaView";
import useModal from "hooks/useModal";
import useWallet from "hooks/useWallet";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { BondCardProps } from "types/bond";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { isProduction } from "constants/production";
import CONTRACT_ADDRESS from "services/addresses/contract";
import BondCard_TokenInfo from "./card/BondCard_TokenInfo";
import BondCard_Progress from "./card/BondCard_Progress";
import BondCard_BondInfo, {
  BondInfoDataMap,
  ContentComponent,
  TitleComponent,
} from "./card/BondCard_BondInfo";
import BondCard_Description from "./card/BondCard_Description";
import BondCard_Buttons from "./card/BondCard_Buttons";
import BondCard_Capacity from "./card/BondCard_Capacity";
import BondCard_Status from "./card/BondCard_Status";
import { getCountDown } from "@/utils/bond/card/getCountDown";

function BondCard(props: { data: BondCardProps }) {
  const { colorMode } = useColorMode();
  const { data } = props;
  const { openModal } = useModal("bond_bond_modal", data);
  const theme = useTheme();
  const { account } = useWeb3React();
  const { tryActivation } = useWallet();
  const { bp700px, pcView } = useMediaView();
  const [width] = useWindowDimensions();
  const closed = data?.status === "closed";
  const { TON_ADDRESS, WTON_ADDRESS, TOS_ADDRESS } = CONTRACT_ADDRESS;
  const txPending = useRecoilValue(selectedTxState);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [dateText, setDateText] = useState<string | undefined>(undefined);
  const [nextRoundDateInfo, setNextDateInfo] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (data?.startTime && data?.endTime && data.saleRoundTimeStamp) {
        const startTimeCountDown = getCountDown(data.startTime);
        const endTimeCountDown = getCountDown(data.endTime);
        const nextRoundStart = getCountDown(
          data.saleRoundTimeStamp[currentRound - 2]
        );

        const currentRoundDateInfo = `Until ${endTimeCountDown.days} days ${endTimeCountDown.hours}:${endTimeCountDown.mins}:${endTimeCountDown.secs}`;
        const nextRoundDateInfo = `In ${nextRoundStart.days} days ${nextRoundStart.hours}:${nextRoundStart.mins}:${nextRoundStart.secs}`;
        setNextDateInfo(nextRoundDateInfo);

        switch (data?.status) {
          case "open":
            return setDateText(
              currentRound === 1 ? currentRoundDateInfo : nextRoundDateInfo
            );
          case "will be open":
            return setDateText(
              `In ${startTimeCountDown.days} days ${startTimeCountDown.hours}:${startTimeCountDown.mins}:${startTimeCountDown.secs}`
            );
          case "closed":
            return setDateText(undefined);
          default:
            return setDateText(undefined);
        }
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [data, currentRound]);

  const bondInfodata: BondInfoDataMap = [
    {
      title: (
        <TitleComponent
          title="ROI"
          tooltip={true}
          label={
            "Return on Investment or ROI is calculated using the bond discount rate and LTOS APY. If the ROI is less than LTOS APY, it is better to buy TOS and stake for LTOS."
          }
        />
      ),
      content: <ContentComponent content="10.1%" />,
    },
    {
      title: (
        <TitleComponent
          title="Bond"
          subTitle="Market Price"
          tooltip={true}
          label={
            "Bond price represents the cost of purchasing 1 TOS. The discount is calculated relative to the market price of TOS for easy comparison"
          }
        />
      ),
      content: (
        <ContentComponent
          content={`$${data?.bondingPrice}`}
          customContentNode={
            <Flex
              alignItems={"flex-end"}
              flexDir={pcView ? "row" : "column"}
              justifyContent={"flex-end"}
            >
              <Flex columnGap={"3px"}>
                <Text>${data?.bondingPrice}</Text>
                <Text>/</Text>
                <Text fontWeight={"normal"} fontSize={12}>
                  ${data?.tosPrice}
                </Text>
              </Flex>
              <Text
                color={data?.isDiscountMinus ? "red.100" : ""}
                fontWeight={"normal"}
                fontSize={12}
                ml={"3px"}
              >
                ({data?.discountRate}% off)
              </Text>
            </Flex>
          }
          style={pcView ? {} : { height: "37px" }}
        />
      ),
    },
    {
      title: (
        <TitleComponent
          title="LTOS APY"
          tooltip={true}
          label={"LTOS Annual Percentage Yield or APY represents amount of TOS"}
        />
      ),
      content: <ContentComponent content="10.1%" />,
    },
  ];

  const bondClosedInfoData: BondInfoDataMap = [
    {
      title: <TitleComponent title="Bond Sold" />,
      content: (
        <ContentComponent
          content={`${data?.totalSold} TOS`}
          subContent={`${data?.bondCapacity} TOS`}
          subContentHighlight={true}
        />
      ),
    },
    {
      title: <TitleComponent title="Opened" />,
      content: <ContentComponent content={`${data?.startDay}`} />,
    },
    {
      title: <TitleComponent title="Closed" />,
      content: <ContentComponent content={data?.endDay} />,
    },
  ];

  const mobileH = useMemo(() => {
    return currentRound === 1 ? "562px" : "487px";
  }, [currentRound]);

  //vierport ref 1134px
  return (
    <Flex
      flexDir={"column"}
      w={["100%", "310px", "362px"]}
      h={"545px"}
      minH={[mobileH, "562px", "545px"]}
      minW={["336px", "310px", "362px"]}
      borderWidth={1}
      borderColor={colorMode === "light" ? "gray.900" : "gray.300"}
      borderRadius={10}
      pt={["20px", "20px", "27px"]}
      bg={colorMode === "light" ? "white.100" : "#1f2128"}
      px={"20px"}
      pb={"24px"}
    >
      {isProduction() === false && (
        <div
          style={{
            position: "absolute",
            marginLeft: "170px",
            color: "#2775ff",
          }}
        >
          {data?.index}
        </div>
      )}
      <BondCard_Status
        version={1.1}
        status={
          data?.status === "open" && currentRound !== 1
            ? "Add Capacity"
            : data?.status
        }
        date={dateText}
      />
      <BondCard_TokenInfo
        inToken={data?.sellTokenType}
        outToken0={"LTOS"}
        outToken1={"STOS"}
        roi={data?.roi}
        ethCapacity={data?.bondEthCapacity}
        isDiscountMinus={data?.isDiscountMinus}
      />
      <BondCard_Progress
        progress={Number(data?.currentProgressOnCurrentCapacity)}
        status={data?.status}
      />
      <Flex flexDir={"column"} rowGap={"24px"} h={"100%"}>
        <BondCard_BondInfo bondInfoData={bondInfodata} />
        {currentRound === 1 && !closed ? (
          <BondCard_Description
            description={
              "This bond mints TOS, which is staked for LTOS & sTOS. After the lock-up period, LTOS can be unstaked in exchange for TOS."
            }
            discountRate={data?.discountRate}
            // discountRate={-10}
          />
        ) : !closed ? (
          <BondCard_Capacity
            ethAmount={data?.roundEthCapacity}
            date={nextRoundDateInfo ?? "-"}
          />
        ) : (
          <Box mt={"9px"}>
            <BondCard_BondInfo bondInfoData={bondClosedInfoData} />
          </Box>
        )}
        {!closed && currentRound === 1 && (
          <BasicButton
            name={account ? (!closed ? "Bond" : "Closed") : "Connect Wallet"}
            w={["100%", "270px", "150px"]}
            h={"33px"}
            style={{
              alignSelf: "center",
              fontWeight: "normal",
            }}
            isDisabled={data?.bondButtonIsDisabled}
            isLoading={txPending}
            onClick={account ? openModal : tryActivation}
          ></BasicButton>
        )}
        {!closed && (
          <Flex mt={currentRound === 0 ? "" : "auto"}>
            <BondCard_Buttons
              currentRound={currentRound}
              lastRound={data?.totalRound}
              setCurrentNumber={setCurrentRound}
            />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default BondCard;
