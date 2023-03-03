import { convertTimeStamp, getDuration, getNowTimeStamp } from "@/utils/time";
import {
  Flex,
  Text,
  useMediaQuery,
  useColorMode,
  Progress,
  Box,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { selectedTxState } from "atom/global/tx";
import BasicButton from "common/button/BasicButton";
import TokenSymbol from "common/token/TokenSymol";
import useMediaView from "hooks/useMediaView";
import useModal from "hooks/useModal";
import useWallet from "hooks/useWallet";
import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { BondCardProps } from "types/bond";

import ActiveArrow from "assets/icons/bond/arrow-right2_blue.svg";
import InactiveArrow from "assets/icons/bond/arrow-right2_disabled.svg";
import RepeatIcon from "assets/icons/bond/s-repeat.svg";
import Image from "next/image";

function getStatusText() {}

function ContentComponent(props: {
  title: string;
  content: string;
  style?: any;
  ImageSrc?: any;
  setStateTitleAction?: () => void;
  isHighest?: boolean;
}) {
  const { title, content, style, ImageSrc, setStateTitleAction, isHighest } =
    props;
  const { colorMode } = useColorMode();

  if (ImageSrc) {
    return (
      <Flex
        justifyContent={"space-between"}
        fontSize={14}
        h={"20px"}
        {...style}
      >
        <Flex>
          <Text
            color={colorMode === "dark" ? "gray.100" : "gray.1000"}
            mr={"6px"}
          >
            {title}
          </Text>
          <Image
            src={ImageSrc}
            alt={"image"}
            style={{ cursor: "pointer" }}
            onClick={() => setStateTitleAction && setStateTitleAction()}
          ></Image>
        </Flex>
        <Text color={colorMode === "dark" ? "white.200" : "gray.800"}>
          {content}
        </Text>
      </Flex>
    );
  }
  return (
    <Flex justifyContent={"space-between"} fontSize={14} h={"20px"} {...style}>
      <Text color={colorMode === "dark" ? "gray.100" : "gray.1000"}>
        {title}
      </Text>
      <Text
        color={
          isHighest
            ? "blue.200"
            : colorMode === "dark"
            ? "white.200"
            : "gray.800"
        }
      >
        {content}
      </Text>
    </Flex>
  );
}

function BondCard(props: { data: BondCardProps }) {
  const { colorMode } = useColorMode();
  const { data } = props;
  const { openModal } = useModal("bond_bond_modal", data);
  const {} = useMediaView();
  const { account } = useWeb3React();
  const { tryActivation } = useWallet();
  const { bp700px } = useMediaView();
  const [titleState, setTitleState] = useState<
    "Time Starts" | "Time Ends" | "Time Left"
  >("Time Starts");

  const timeDiff = data?.endTime - getNowTimeStamp();
  const openTimeDiff = data?.startTime - getNowTimeStamp();

  const countDown = getDuration(timeDiff);
  const openCountDown = getDuration(openTimeDiff);

  const txPending = useRecoilValue(selectedTxState);

  const capacityIsZero = Number(data?.bondCapacity.replaceAll("%", "")) <= 0;
  const discountIsMinus = data?.discountRate < 0;

  const [isOpen, setIsOpen] = useState(timeDiff >= 0 || !capacityIsZero);
  const [isNotOpen, setIsNotOpen] = useState(openTimeDiff > 0);
  const bondIsDisabled = timeDiff < 0;
  const timeLeft = bondIsDisabled
    ? "0 days 0 hours 0 min"
    : `${countDown.days} days ${countDown.hours} hours ${countDown.mins} min`;
  const bondButtonIsDisabled = bondIsDisabled || capacityIsZero || isNotOpen;
  const isClosed = bondIsDisabled || capacityIsZero;

  const changeTitleState = useCallback(() => {
    switch (titleState) {
      case "Time Starts":
        return setTitleState("Time Ends");
      case "Time Ends":
        return setTitleState("Time Left");
      case "Time Left":
        return setTitleState("Time Starts");
      default:
        break;
    }
  }, [titleState]);

  //vierport ref 1134px
  return (
    <Flex
      flexDir={"column"}
      w={["100%", "310px", "362px"]}
      h={"455px"}
      minW={["336px", "310px", "362px"]}
      borderWidth={1}
      borderColor={colorMode === "light" ? "gray.900" : "gray.300"}
      borderRadius={10}
      pt={"18px"}
      bg={colorMode === "light" ? "white.100" : "#1f2128"}
      px={"20px"}
      pb={"21px"}
    >
      <Flex mb={"18px"} justifyContent={"space-between"} alignItems="center">
        <Flex>
          <TokenSymbol tokenType={data?.sellTokenType}></TokenSymbol>
          <Flex mx={"12px"}>
            <Image
              src={isClosed ? InactiveArrow : ActiveArrow}
              alt={"arrow"}
            ></Image>
          </Flex>
          <TokenSymbol tokenType={data?.buyTokenType}></TokenSymbol>
        </Flex>
        <Flex
          fontSize={12}
          color={isClosed ? "#8b8b93" : "blue.200"}
          textAlign={"center"}
          alignItems="center"
          justifyContent={"center"}
          flexDir={"column"}
        >
          {data?.isHighest && <Text>Highest</Text>}
          <Text
            color={isNotOpen ? "#5eea8d" : isClosed ? "gray.100" : "white.200"}
          >
            {isNotOpen
              ? openTimeDiff > 86400
                ? `D-${openCountDown.days}`
                : `D-${openCountDown.hours}:${openCountDown.mins}:${openCountDown.secs}`
              : isClosed
              ? "Closed"
              : `${String(data?.discountRate).split(".")[0]}% Off`}
          </Text>
        </Flex>
      </Flex>
      <Flex
        w={"100%"}
        h={"130px"}
        border={"1px solid #313442"}
        borderRadius={10}
        mb={"11px"}
        alignItems={"center"}
        justifyContent={"center"}
        rowGap={"6px"}
        flexDir={"column"}
        textAlign={"center"}
      >
        <Text color={"white.200"} fontSize={20} fontWeight={600}>
          ETH Bond {data?.version}
        </Text>
        <Text fontSize={12}>
          Buy TOS for up to {String(data?.discountRate).split(".")[0]}% off with
          your WTON and
          <br /> TOS to improve the liquidity
        </Text>
      </Flex>
      <Flex flexDir={"column"} rowGap={"5px"} mb={"21px"}>
        <Flex justifyContent={"space-between"}>
          <Flex columnGap={"6px"}>
            <Text fontSize={13} color={"white.200"}>
              Progress
            </Text>
            <Text fontSize={12}>{data?.progress}%</Text>
          </Flex>
          <Flex fontSize={11}>
            <Text color={"white.200"}>{data?.totalSold}&nbsp;</Text>
            <Text>
              / {data?.bondCapacity} {data?.buyTokenType}
            </Text>
          </Flex>
        </Flex>
        <Progress
          value={Number(data?.progress)}
          color={isClosed ? "#64646f" : "#2775ff"}
          borderRadius={100}
          h={"5px"}
        ></Progress>
      </Flex>
      <Flex flexDir={"column"} rowGap={"9px"}>
        <ContentComponent
          title={titleState}
          content={
            titleState === "Time Starts"
              ? data?.startDay
              : titleState === "Time Left"
              ? timeLeft
              : data?.endDay
          }
          ImageSrc={RepeatIcon}
          setStateTitleAction={changeTitleState}
        ></ContentComponent>
        <ContentComponent
          title="Discount (Max)"
          content={`${data?.discountRate}%`}
          isHighest={data?.isHighest}
        ></ContentComponent>
        <ContentComponent
          title="Minimum Bond Price"
          content={`${data?.bondingPrice}`}
        ></ContentComponent>
        <ContentComponent
          title="Lock-Up (Min)"
          content={"5 Days"}
        ></ContentComponent>
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
      </Flex>
    </Flex>
  );
}

export default BondCard;
