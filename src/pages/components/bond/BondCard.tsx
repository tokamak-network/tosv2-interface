import { convertTimeStamp, getDuration, getNowTimeStamp } from "@/utils/time";
import {
  Flex,
  Text,
  useMediaQuery,
  useColorMode,
  Progress,
  useTheme,
  Box,
  theme,
} from "@chakra-ui/react";

import { useWeb3React } from "@web3-react/core";
import { selectedTxState } from "atom/global/tx";
import BasicButton from "common/button/BasicButton";
import TokenSymbol from "common/token/TokenSymol";
import useMediaView from "hooks/useMediaView";
import useModal from "hooks/useModal";
import useWallet from "hooks/useWallet";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { BondCardProps } from "types/bond";
import RepeatIcon from "assets/icons/bond/s-repeat.svg";
import BlueTooltip from "assets/icons/bond/gage_blue_arrow.svg";
import GreenTooltip from "assets/icons/bond/gage_green_arrow.svg";

import Image from "next/image";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { isProduction } from "constants/production";
import styled from "@emotion/styled";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { accountBar } from "atom/global/sidebar";
import { selectedToken0, selectedToken1 } from "atom/swap";
import { SupportedInputTokenTypes } from "types";
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

function BondCard(props: { data: BondCardProps }) {
  const { colorMode } = useColorMode();
  const { data } = props;
  const { openModal } = useModal("bond_bond_modal", data);
  const theme = useTheme();
  const { account } = useWeb3React();
  const { tryActivation } = useWallet();
  const { bp700px } = useMediaView();
  const [width] = useWindowDimensions();
  const closed = data?.status === "closed";

  const { TON_ADDRESS, WTON_ADDRESS, TOS_ADDRESS } = CONTRACT_ADDRESS;

  const timeDiff = data?.endTime - getNowTimeStamp();
  const openTimeDiff = data?.startTime - getNowTimeStamp();

  const countDown = getDuration(timeDiff);
  const openCountDown = getDuration(openTimeDiff);

  const txPending = useRecoilValue(selectedTxState);

  const capacityIsZero = Number(data?.blueProgress) === 100;
  const discountIsMinus = data?.discountRate < 0;

  const isClosed = closed || capacityIsZero;

  const [isOpen, setIsOpen] = useState(timeDiff >= 0 || !capacityIsZero);
  const [isNotOpen, setIsNotOpen] = useState(openTimeDiff > 0);
  const timeLeft = closed
    ? "0 days 0 hours 0 min"
    : `${countDown.days} days ${countDown.hours} hours ${countDown.mins} min`;
  const bondButtonIsDisabled = closed || capacityIsZero || isNotOpen;

  const discountRate = data?.isDiscountMinus
    ? `${data?.discountRate}%`
    : `~ ${data?.discountRate}%`;

  const [currentRound, setCurrentRound] = useState<number>(1);

  const bondInfodata: BondInfoDataMap = [
    {
      title: <TitleComponent title="ROI" tooltip={true} />,
      content: <ContentComponent content="10.1%" />,
    },
    {
      title: (
        <TitleComponent title="Bond" subTitle="Market Price" tooltip={true} />
      ),
      content: (
        <ContentComponent content="$9.00" subContent="$10.00 (10.0% off)" />
      ),
    },
    {
      title: <TitleComponent title="LTOS APY" tooltip={true} />,
      content: <ContentComponent content="10.1%" />,
    },
  ];

  //vierport ref 1134px
  return (
    <Flex
      flexDir={"column"}
      w={["100%", "310px", "362px"]}
      h={"545px"}
      minH={"545px"}
      minW={["336px", "310px", "362px"]}
      borderWidth={1}
      borderColor={colorMode === "light" ? "gray.900" : "gray.300"}
      borderRadius={10}
      pt={"25px"}
      bg={colorMode === "light" ? "white.100" : "#1f2128"}
      px={"20px"}
      pb={"24px"}
    >
      <Flex mb={"18px"} justifyContent={"space-between"} alignItems="center">
        <Flex
          fontWeight={600}
          color={"white.200"}
          h={"28px"}
          alignItems={"end"}
          columnGap={"6px"}
        >
          <Text fontSize={20}>Minting Bond </Text>
          <Text fontSize={11} pb={"4px"}>
            {data?.version}
          </Text>
        </Flex>
        <Flex
          fontSize={12}
          textAlign={"right"}
          alignItems={"flex-end"}
          flexDir={"column"}
          fontWeight={data?.status === "open" ? "bold" : ""}
        >
          <Text fontSize={13}>Open</Text>
          <Text fontSize={11}>Until 13 days 12:04:03</Text>
        </Flex>
      </Flex>
      <BondCard_TokenInfo
        inToken={data.sellTokenType}
        outToken0={"LTOS"}
        outToken1={"STOS"}
      />
      <BondCard_Progress progress={data?.blueProgress} isNA={false} />
      <Flex flexDir={"column"} rowGap={"24px"} h={"100%"}>
        <BondCard_BondInfo bondInfoData={bondInfodata} />
        {currentRound === 1 ? (
          <BondCard_Description
            description={
              "This bond mints TOS, which is staked for LTOS & sTOS. After the lock-up period, LTOS can be unstaked in exchange for TOS."
            }
            discountRate={-1}
          />
        ) : (
          <BondCard_Capacity ethAmount={"36"} date={"13 days 12:04:03"} />
        )}
        {currentRound === 1 && (
          <BasicButton
            name={account ? (isOpen ? "Bond" : "Closed") : "Connect Wallet"}
            w={["100%", "270px", "150px"]}
            h={"33px"}
            style={{
              alignSelf: "center",
              marginTop: "9px",
              fontWeight: "normal",
            }}
            isDisabled={bondButtonIsDisabled}
            isLoading={txPending}
            onClick={account ? openModal : tryActivation}
          ></BasicButton>
        )}
        <BondCard_Buttons
          currentRound={currentRound}
          lastRound={27}
          setCurrentNumber={setCurrentRound}
        />
      </Flex>
    </Flex>
  );
}

export default BondCard;
